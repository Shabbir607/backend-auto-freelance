<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class TeamController extends Controller
{
    /**
     * Get current user's team
     */
    public function index()
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user || !$user->team_id) {
                return response()->json([
                    'message' => 'User is not part of any team'
                ], 403);
            }

            $team = Team::with(['members', 'channels', 'invitations'])
                ->findOrFail($user->team_id);

            return response()->json($team, 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to load team',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Create a new team
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            if (!$user->hasRole([ 'agency','admin', 'super admin'])) {
                return response()->json([
                    'message' => 'Only admins can create teams'
                ], 403);
            }

            if ($user->team_id) {
                return response()->json([
                    'message' => 'User is already part of a team'
                ], 400);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            DB::beginTransaction();

            $team = Team::create([
                'name' => $validated['name'],
                'admin_id' => $user->id,
            ]);

            $user->update(['team_id' => $team->id]);

            // Default "general" channel
            $team->channels()->create([
                'uuid' => (string) Str::uuid(),
                'name' => 'general',
                'description' => 'General discussion',
                'is_private' => false,
            ]);

            DB::commit();

            return response()->json(
                $team->load('channels'),
                201
            );

        } catch (Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create team',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Invite a member to the team
     */
    public function inviteMember(Request $request)
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user || !$user->hasRole([ 'agency','admin', 'super admin'])) {
                return response()->json([
                    'message' => 'Only admins can invite members'
                ], 403);
            }

            $team = $user->team;

            if (!$team) {
                return response()->json([
                    'message' => 'User is not part of any team'
                ], 403);
            }

            $validated = $request->validate([
                'email' => 'required|email',
                'role' => 'nullable|in:member,admin',
            ]);

            // User already in team
            $existingUser = User::where('email', $validated['email'])->first();
            if ($existingUser && $existingUser->team_id === $team->id) {
                return response()->json([
                    'message' => 'User is already in the team'
                ], 400);
            }

            // Pending invitation check
            $alreadyInvited = TeamInvitation::where('team_id', $team->id)
                ->where('email', $validated['email'])
                ->where('status', 'pending')
                ->exists();

            if ($alreadyInvited) {
                return response()->json([
                    'message' => 'Invitation already sent'
                ], 400);
            }

            $invitation = TeamInvitation::create([
                'team_id' => $team->id,
                'email' => $validated['email'],
                'role' => $validated['role'] ?? 'member',
                'token' => (string) Str::uuid(),
                'status' => 'pending',
            ]);

            $invitationUrl =
                config('app.frontend_url', 'http://localhost:5173')
                . '/join-team?token='
                . $invitation->token;

            return response()->json([
                'message' => 'Invitation sent',
                'invitation' => $invitation,
                'invitation_url' => $invitationUrl
            ], 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to send invitation',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Accept a team invitation
     */
    public function acceptInvitation(Request $request)
    {
        try {
            $validated = $request->validate([
                'token' => 'required|string',
            ]);

            $invitation = TeamInvitation::where('token', $validated['token'])
                ->where('status', 'pending')
                ->first();

            if (!$invitation) {
                return response()->json([
                    'message' => 'Invalid or expired invitation'
                ], 404);
            }

            $user = Auth::user()?->fresh();

            if (!$user || $user->email !== $invitation->email) {
                return response()->json([
                    'message' => 'Invitation email mismatch'
                ], 403);
            }

            if ($user->team_id) {
                return response()->json([
                    'message' => 'You are already part of a team'
                ], 400);
            }

            DB::beginTransaction();

            $user->update([
                'team_id' => $invitation->team_id
            ]);

            $invitation->update([
                'status' => 'accepted'
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Joined team successfully'
            ], 200);

        } catch (Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to join team',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
