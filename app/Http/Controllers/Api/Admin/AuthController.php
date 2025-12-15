<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Admin Login
    public function login(Request $request)
    {
        // Validate input with professional error response
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $admin = User::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password) || !$admin->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid admin credentials'
            ], 401);
        }

        $token = $admin->createToken('Admin Access Token')->accessToken;

         return response()->json([
        'success' => true,
        'message' => 'Login successful',
        'data' => [
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'roles' => $admin->getRoleNames(), 
            ],
            'token' => $token
        ]
    ]);
    }

    // Admin Logout
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Admin logged out successfully'
        ]);
    }

    // List all users (admin only)
    public function listUsers()
    {
        $users = User::with('roles')->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}
