<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Models\User;
use App\Models\UserDetail;
use App\Services\LocationService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Throwable;

class AuthController extends Controller
{
    protected LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Register a new user
     */
    public function register(RegisterRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Assign role based on request, default to freelancer if invalid or missing
            $role = $request->role === 'recruiter' ? 'recruiter' : 'freelancer';
            $user->assignRole($role);

            $details = UserDetail::create(['user_id' => $user->id]);

            // Generate or update IP record
            $ipModel = $this->locationService->createOrUpdateForUser($user->id);
            $details->update(['last_login_ip' => $ipModel->ip]);

            $token = $user->createToken('Personal Access Token')->accessToken;

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful.',
                'data'    => $this->formatUserResponse($user, $details, $token),
            ], 201);
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('User registration failed: '.$e->getMessage(), ['trace' => $e->getTraceAsString()]);

            return $this->errorResponse('Unable to register user at the moment.', $e);
        }
    }

    /**
     * Login existing user
     */
    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.',
                ], 401);
            }

            // Get or create UserDetail
            $details = $user->userDetail;
            if (!$details) {
                // Create default UserDetail if not found
                $details = $user->userDetail()->create([
                    // You can prefill fields if needed
                    'last_login_at' => now(),
                    'uuid' => \Illuminate\Support\Str::uuid(),
                ]);
            } else {
                // Update last login timestamp
                $details->update(['last_login_at' => now()]);
            }

            // Generate or update IP record
            $ipModel = $this->locationService->createOrUpdateForUser($user->id);
            $details->update(['last_login_ip' => $ipModel->ip]);

            
            // Generate access token
            $token = $user->createToken('Personal Access Token')->accessToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'data'    => $this->formatUserResponse($user, $details, $token),
            ]);
        } catch (Throwable $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred during login.',
            ], 500);
        }
    }


    /**
     * Logout authenticated user
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully.',
            ]);
        } catch (Throwable $e) {
            Log::error('Logout error: '.$e->getMessage());
            return $this->errorResponse('Failed to logout user.', $e);
        }
    }

    /**
     * Get authenticated user profile
     */
    public function profile(Request $request)
    {
        try {
           
            $user = $request->user()->load(['userDetail', 'skills', 'portfolios']);

            if (!$user->userDetail) {
                $user->userDetail()->create([]);
                $user->load('userDetail');
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile fetched successfully.',
                'data'    => $this->formatUserResponse($user, $user->userDetail),
            ]);
        } catch (Throwable $e) {
            Log::error('Profile fetch error: '.$e->getMessage());
            return $this->errorResponse('Unable to fetch profile.', $e);
        }
    }

    /**
     * Update authenticated user's profile
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            $user = $request->user();
            $details = $user->userDetail;

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Profile details not found for this user.',
                ], 404);
            }

            $details->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully.',
                'data'    => $this->formatUserResponse($user, $details),
            ]);
        } catch (Throwable $e) {
            Log::error('Profile update error: '.$e->getMessage());
            return $this->errorResponse('Failed to update profile.', $e);
        }
    }

    /**
     * Format a clean API-safe user response.
     */
    private function formatUserResponse(User $user, ?UserDetail $details = null, ?string $token = null): array
    {
        return [
            'uuid'    => $details->uuid ?? null,
            'name'    => $user->name,
            'email'   => $user->email,
            'role'    => $user->getRoleNames()->first(),
            'details' => [
                'phone_number'   => $details->phone_number ?? null,
                'avatar_url'     => $details->avatar_url ?? null,
                'timezone'       => $details->timezone ?? 'UTC',
                'language'       => $details->language ?? 'en',
                'last_login_at'  => $details->last_login_at ?? null,
                'last_login_ip'  => $details->last_login_ip ?? null,
                'email_verified_at' => $details->email_verified_at ?? null,
                'company_name'   => $details->company_name ?? null,
                'job_title'      => $details->job_title ?? null,
                'bio'            => $details->bio ?? null,
                'address_line1'  => $details->address_line1 ?? null,
                'address_line2'  => $details->address_line2 ?? null,
                'city'           => $details->city ?? null,
                'state'          => $details->state ?? null,
                'postal_code'    => $details->postal_code ?? null,
                'country'        => $details->country ?? null,
                'website_url'    => $details->website_url ?? null,
                'linkedin_url'   => $details->linkedin_url ?? null,
                'facebook_url'   => $details->facebook_url ?? null,
                'twitter_url'    => $details->twitter_url ?? null,
            ],
            'skills' => $user->skills->map(function ($skill) {
                return [
                    'id'    => $skill->id,
                    'name'  => $skill->name,
                    'level' => $skill->level,
                ];
            }),
            'portfolios' => $user->portfolios->map(function ($portfolio) {
                return [
                    'id'          => $portfolio->id,
                    'title'       => $portfolio->title,
                    'description' => $portfolio->description,
                    'image_url'   => $portfolio->image_url,
                    'link_url'    => $portfolio->link_url,
                    'is_public'   => $portfolio->is_public,
                ];
            }),
            'token'   => $token,
        ];
    }

    /**
     * Standardized error response handler
     */
    private function errorResponse(string $message, Throwable $e, int $status = 500)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'error'   => [
                'type'    => class_basename($e),
                'message' => $e->getMessage(),
            ]
        ], $status);
    }
}
