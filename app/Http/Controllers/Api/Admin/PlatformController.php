<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Platform;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class PlatformController extends Controller
{
    /**
     * List all platforms
     */
    public function index()
    {
        $platforms = Platform::all();

        return response()->json([
            'success' => true,
            'data' => $platforms
        ], 200);
    }

    /**
     * Store a new platform
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:platforms,slug',
            'api_base_url' => 'nullable|url|max:255',
            'auth_method' => 'nullable|string|max:50',
            'logo_url' => 'nullable|url|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
            'scopes' => 'nullable|string|max:255',
            'redirect_uri' => 'nullable|url|max:255',
            'client_id' => 'nullable|string|max:255',
            'client_secret' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $platform = Platform::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Platform created successfully',
            'data' => $platform
        ], 201);
    }

    /**
     * Show a single platform
     */
    public function show($uuid)
    {
        $platform = Platform::where('uuid', $uuid)->first();

        if (!$platform) {
            return response()->json([
                'success' => false,
                'message' => 'Platform not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $platform
        ], 200);
    }

    /**
     * Update an existing platform
     */
    public function update(Request $request, $uuid)
    {
        $platform = Platform::where('uuid', $uuid)->first();

        if (!$platform) {
            return response()->json([
                'success' => false,
                'message' => 'Platform not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'slug' => ['sometimes', 'string', 'max:255', Rule::unique('platforms')->ignore($platform->id)],
            'api_base_url' => 'nullable|url|max:255',
            'auth_method' => 'nullable|string|max:50',
            'logo_url' => 'nullable|url|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
            'scopes' => 'nullable|string|max:255',
            'redirect_uri' => 'nullable|url|max:255',
            'client_id' => 'nullable|string|max:255',
            'client_secret' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $platform->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Platform updated successfully',
            'data' => $platform
        ], 200);
    }

    /**
     * Delete a platform
     */
    public function destroy($uuid)
    {
        $platform = Platform::where('uuid', $uuid)->first();

        if (!$platform) {
            return response()->json([
                'success' => false,
                'message' => 'Platform not found'
            ], 404);
        }

        $platform->delete();

        return response()->json([
            'success' => true,
            'message' => 'Platform deleted successfully'
        ], 200);
    }

    /**
     * Generate OAuth Authorization URL
     */
    public function getAuthorizationUrl($uuid)
    {
        $platform = Platform::where('uuid', $uuid)->first();

        if (!$platform) {
            return response()->json([
                'success' => false,
                'message' => 'Platform not found'
            ], 404);
        }

        if (!$platform->api_base_url) {
            return response()->json([
                'success' => false,
                'message' => 'Platform API base URL is not set'
            ], 400);
        }

        // Get credentials from platform fields or fallback to config/services.php
        $clientId = $platform->client_id ?? config('services.platform.client_id');
        $clientSecret = $platform->client_secret ?? config('services.platform.client_secret');
        $redirectUri = $platform->redirect_uri ?? config('services.platform.redirect_uri');
        $scopes = $platform->scopes ?? 'basic';

        $url = "{$platform->api_base_url}/oauth/authorize?response_type=code&client_id={$clientId}&redirect_uri={$redirectUri}&scope={$scopes}";

        return response()->json([
            'success' => true,
            'authorization_url' => $url
        ], 200);
    }
}
