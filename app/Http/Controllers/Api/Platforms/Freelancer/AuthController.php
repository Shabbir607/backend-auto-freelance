<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Freelancer\AuthService;
use App\Models\IpAddress;
use Illuminate\Support\Facades\DB;
use Exception;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Redirect to OAuth provider with assigned IP.
     */
    public function redirectToProvider(Request $request, string $platform_slug, ?string $ipUuid = null)
    {
        try {
            $user = auth('api')->user();

            // Get or create IP using UUID
            if ($ipUuid) {
                $ipModel = IpAddress::where('uuid', $ipUuid)
                    ->where('user_id', $user->id)
                    ->firstOrFail();
            } else {
                $ipModel = IpAddress::firstOrCreate(
                    ['ip_address' => $request->ip(), 'user_id' => $user->id],
                    ['is_assigned' => false]
                );
            }

            // Generate unique session ID
            $sessionId = uniqid('oauth_', true);

            // Store session in DB with UUID references
            DB::table('sessions')->insert([
                'id' => $sessionId,
                'user_id' => $user->id,
                'ip_address' => $ipModel->ip_address,
                'user_agent' => $request->userAgent(),
                'payload' => json_encode([
                    'platform_slug' => $platform_slug,
                    'ip_uuid' => $ipModel->uuid,
                    'user_uuid' => $user->userDetail->uuid
                ]),
                'last_activity' => now()->timestamp
            ]);

            // Generate OAuth redirect URL with session as state
            $url = $this->authService->getRedirectUrl($platform_slug, $ipModel->uuid, $sessionId);

            return response()->json([
                'success' => true,
                'url' => $url,
                'session_id' => $sessionId
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Handle OAuth callback.
     */
    public function handleCallback(Request $request)
    {
        try {
            $code  = $request->input('code');
            $state = $request->input('state');

            if (!$code || !$state) {
                return response()->json(['error' => 'Authorization code or state missing'], 400);
            }

            // Retrieve session from DB
            $session = DB::table('sessions')->where('id', $state)->first();
            if (!$session) {
                return response()->json(['error' => 'Invalid or expired session'], 400);
            }

            $payload = json_decode($session->payload, true);
            $ipUuid = $payload['ip_uuid'] ?? null;
            $platformSlug = $payload['platform_slug'] ?? 'freelancer';
            $userId = $session->user_id;

            if (!$ipUuid) {
                return response()->json(['error' => 'IP UUID not found in session'], 400);
            }
            // Use DB transaction for safety
            $account = DB::transaction(function () use ($platformSlug, $code, $userId, $ipUuid, $state) {
                $account = $this->authService->handleCallback($platformSlug, $code, $userId, $ipUuid);

                // Delete temporary session
                DB::table('sessions')->where('id', $state)->delete();

                return $account;
            });

            return response()->json([
                'success' => true,
                'account' => [
                    'username' => $account->account_username,
                    'email' => $account->account_email,
                    'platform' => $platformSlug,
                    'ip' => $account->ipAddress->ip_address
                ]
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
