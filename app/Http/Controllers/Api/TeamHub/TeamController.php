<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        if (!$user->team_id) {
            return response()->json(['message' => 'User is not part of any team'], 404);
        }

        $team = Team::with(['members', 'channels', 'invitations'])->find($user->team_id);

        return response()->json($team);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        if (!$user->hasRole(['admin', 'super admin'])) {
            return response()->json(['message' => 'Only admins can create teams'], 403);
        }

        if ($user->team_id) {
            return response()->json(['message' => 'User is already part of a team'], 400);
        }

        DB::beginTransaction();

        try {
            $team = Team::create([
                'name' => $request->name,
                'admin_id' => $user->id,
            ]);

            $user->team_id = $team->id;
            $user->save();

            // Create default 'general' channel
            $team->channels()->create([
                'name' => 'general',
                'description' => 'General discussion',
                'uuid' => (string) Str::uuid(),
            ]);

            DB::commit();

            return response()->json($team->load('channels'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create team', 'error' => $e->getMessage()], 500);
        }
    }

    public function inviteMember(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'in:member,admin',
        ]);

        $user = Auth::user();
        
        if (!$user->hasRole(['admin', 'super admin'])) {
            return response()->json(['message' => 'Only admins can invite members'], 403);
        }

        $team = $user->team;

        if (!$team) {
            return response()->json(['message' => 'User is not part of any team'], 404);
        }

        // Check if user is already in the team
        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser && $existingUser->team_id === $team->id) {
            return response()->json(['message' => 'User is already in the team'], 400);
        }

        // Check if invitation already exists
        $existingInvitation = TeamInvitation::where('team_id', $team->id)
            ->where('email', $request->email)
            ->where('status', 'pending')
            ->first();

        if ($existingInvitation) {
            return response()->json(['message' => 'Invitation already sent'], 400);
        }

        $invitation = TeamInvitation::create([
            'team_id' => $team->id,
            'email' => $request->email,
            'role' => $request->role ?? 'member',
            'token' => (string) Str::uuid(),
            'status' => 'pending',
        ]);

        // In a real app, send email here
        
        $invitationUrl = config('app.frontend_url', 'http://localhost:5173') . '/join-team?token=' . $invitation->token;

        return response()->json([
            'message' => 'Invitation sent', 
            'invitation' => $invitation,
            'invitation_url' => $invitationUrl
        ]);
    }

    public function acceptInvitation(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $invitation = TeamInvitation::where('token', $request->token)
            ->where('status', 'pending')
            ->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invalid or expired invitation'], 404);
        }

        $user = Auth::user();

        if ($user->email !== $invitation->email) {
            return response()->json(['message' => 'This invitation is for a different email address'], 403);
        }

        if ($user->team_id) {
            return response()->json(['message' => 'You are already part of a team'], 400);
        }

        DB::beginTransaction();

        try {
            $user->team_id = $invitation->team_id;
            $user->save();

            $invitation->status = 'accepted';
            $invitation->save();

            DB::commit();

            return response()->json(['message' => 'Joined team successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to join team', 'error' => $e->getMessage()], 500);
        }
    }
}
