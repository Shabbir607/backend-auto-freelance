<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateNotificationPreferencesRequest;
use App\Http\Requests\User\UpdatePaymentInfoRequest;
use App\Http\Requests\User\UpdatePrivacySettingsRequest;
use App\Http\Resources\UserDetailResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileSettingsController extends Controller
{
    /**
     * Get all profile settings.
     */
    public function show(Request $request)
    {
        try {
            $user = $request->user();
           
            $details = $user->userDetail()->firstOrCreate([
                'user_id' => $user->id
            ]);

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to create or retrieve user details',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile settings retrieved successfully',
                'data' => new UserDetailResource($details)
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve profile settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update payment information.
     */
    public function updatePaymentInfo(UpdatePaymentInfoRequest $request)
    {
        try {
            $user = $request->user();
           
            $details = $user->userDetail()->firstOrCreate([
                'user_id' => $user->id
            ]);

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to create or retrieve user details',
                ], 500);
            }

            $paymentInfo = $request->validated();
            
            // Merge with existing payment info safely
            $currentPaymentInfo = $details->payment_info ?? [];
            $details->payment_info = array_merge($currentPaymentInfo, $paymentInfo);
            $details->save();

            return response()->json([
                'success' => true,
                'message' => 'Payment information updated successfully',
                'data' => new UserDetailResource($details)
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update payment information',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update notification preferences.
     */
    public function updateNotificationPreferences(UpdateNotificationPreferencesRequest $request)
    {
        try {
            $user = $request->user();
            $details = $user->userDetail()->firstOrCreate([
                'user_id' => $user->id
            ]);

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to create or retrieve user details',
                ], 500);
            }

            $preferences = $request->validated();
            
            // Merge with existing preferences
            $currentPreferences = $details->notification_preferences ?? [];
            $details->notification_preferences = array_merge($currentPreferences, $preferences);
            $details->save();

            return response()->json([
                'success' => true,
                'message' => 'Notification preferences updated successfully',
                'data' => new UserDetailResource($details)
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification preferences',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update privacy settings.
     */
    public function updatePrivacySettings(UpdatePrivacySettingsRequest $request)
    {
        try {
            $user = $request->user();
            $details = $user->userDetail()->firstOrCreate([
                'user_id' => $user->id
            ]);

            if (!$details) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to create or retrieve user details',
                ], 500);
            }

            $settings = $request->validated();
            
            // Merge with existing settings
            $currentSettings = $details->privacy_settings ?? [];
            $details->privacy_settings = array_merge($currentSettings, $settings);
            $details->save();

            return response()->json([
                'success' => true,
                'message' => 'Privacy settings updated successfully',
                'data' => new UserDetailResource($details)
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update privacy settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
