<?php

namespace App\Http\Controllers\Api\ProjectManagement;

use App\Http\Controllers\Controller;
use App\Models\OAuthState;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect user to Google OAuth consent screen
     * Requires authentication - user must be logged in
     */
    public function redirect(Request $request)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Generate unique state token for this user
            $oauthState = OAuthState::generateForUser($user->id, 'google');

            // Build Google OAuth URL with state parameter
            $url = Socialite::driver('google')
                ->stateless()
                ->with([
                    'state' => $oauthState->state,
                    'access_type' => 'offline',
                    'prompt' => 'consent', // Force consent to get refresh token
                ])
                ->scopes(['https://www.googleapis.com/auth/calendar'])
                ->redirect()
                ->getTargetUrl();

            return response()->json([
                'success' => true,
                'url' => $url,
                'state' => $oauthState->state,
            ]);
        } catch (\Exception $e) {
            Log::error('Google OAuth redirect error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Failed to generate OAuth URL',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle OAuth callback from Google
     * Public route - no authentication required
     */
    public function callback(Request $request)
    {
        try {
            // Validate required parameters
            $code = $request->input('code');
            $state = $request->input('state');

            if (!$code) {
                return response()->json([
                    'error' => 'Authorization code not provided'
                ], 400);
            }

            if (!$state) {
                return response()->json([
                    'error' => 'State parameter not provided'
                ], 400);
            }

            // Validate state and get associated user
            $user = OAuthState::validateAndGetUser($state);

            if (!$user) {
                return response()->json([
                    'error' => 'Invalid or expired state token'
                ], 400);
            }

            // Exchange authorization code for tokens
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();

            // Get token details
            $token = $googleUser->token;
            $refreshToken = $googleUser->refreshToken;
            $expiresIn = $googleUser->expiresIn;

            // Save tokens to user record
            $user->google_access_token = $token;
            $user->google_refresh_token = $refreshToken ?? $user->google_refresh_token; // Keep old if not provided
            $user->google_token_expires_in = $expiresIn;
            $user->google_calendar_email = $googleUser->email;
            $user->save();

            Log::info('Google Calendar connected successfully', [
                'user_id' => $user->id,
                'email' => $googleUser->email
            ]);

            // Return success response with redirect URL for frontend
            return response()->json([
                'success' => true,
                'message' => 'Google Calendar connected successfully',
                'user' => [
                    'email' => $user->email,
                    'google_calendar_email' => $googleUser->email,
                    'has_calendar' => true,
                ],
                // Frontend can use this to redirect user back to app
                'redirect_url' => config('app.url') . '/settings?google_calendar=connected'
            ]);
        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            Log::error('Google OAuth invalid state: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Invalid OAuth state',
                'message' => 'The OAuth state is invalid or has expired. Please try again.'
            ], 400);
        } catch (\Exception $e) {
            Log::error('Google OAuth callback error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'OAuth callback failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Disconnect Google Calendar
     * Requires authentication
     */
    public function disconnect(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Clear Google tokens
            $user->google_access_token = null;
            $user->google_refresh_token = null;
            $user->google_token_expires_in = null;
            $user->google_calendar_email = null;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Google Calendar disconnected successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Google Calendar disconnect error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to disconnect Google Calendar',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Google Calendar connection status
     * Requires authentication
     */
    public function status(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }

            return response()->json([
                'success' => true,
                'connected' => $user->hasGoogleCalendar(),
                'email' => $user->google_calendar_email,
            ]);
        } catch (\Exception $e) {
            Log::error('Google Calendar status error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to get connection status',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
