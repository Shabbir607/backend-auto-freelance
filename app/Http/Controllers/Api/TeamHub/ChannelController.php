<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class ChannelController extends Controller
{
    /**
     * List channels for authenticated user's team
     */
    public function index()
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user || !$user->team_id) {
                return response()->json(['message' => 'User is not part of any team'], 403);
            }

            $channels = Channel::where('team_id', $user->team_id)
                ->where(function ($query) use ($user) {
                    $query->where('is_private', false)
                        ->orWhereHas('members', fn($q) => $q->where('user_id', $user->id));
                })
                ->with(['members', 'lastMessage.user'])
                ->latest()
                ->get();

            foreach ($channels as $channel) {
                $lastReadId = DB::table('channel_read_status')
                    ->where('channel_id', $channel->id)
                    ->where('user_id', $user->id)
                    ->value('last_read_message_id') ?? 0;

                $channel->unread_count = $channel->messages()
                    ->where('id', '>', $lastReadId)
                    ->count();

                $channel->last_message = $channel->lastMessage;
            }

            return response()->json($channels, 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to load channels',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Create a new channel
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user || !$user->team_id) {
                return response()->json(['message' => 'User is not part of any team'], 403);
            }

            if (!$user->hasRole(['agency', 'admin', 'super admin'])) {
                return response()->json(['message' => 'Only admins can create channels'], 403);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'is_private' => 'sometimes|boolean',
            ]);

            $channel = Channel::create([
                'uuid' => (string) Str::uuid(),
                'team_id' => $user->team_id,
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'is_private' => $validated['is_private'] ?? false,
                'created_by' => $user->id,
            ]);

            return response()->json($channel, 201);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to create channel',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Show a single channel
     */
    public function show(string $uuid)
    {
        try {
            $user = Auth::user()?->fresh();

            if (!$user || !$user->team_id) {
                return response()->json(['message' => 'User is not part of any team'], 403);
            }

            $channel = Channel::where('uuid', $uuid)
                ->where('team_id', $user->team_id)
                ->with('members')
                ->firstOrFail();

            return response()->json($channel, 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Channel not found or access denied',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 404);
        }
    }

    /**
     * Update a channel
     */
    public function update(Request $request, string $uuid)
    {
        try {
            $user = Auth::user()?->fresh();

            $channel = Channel::where('uuid', $uuid)
                ->where('team_id', $user->team_id)
                ->firstOrFail();

            if ($channel->created_by !== $user->id && !$user->hasRole(['agency', 'admin', 'super admin'])) {
                return response()->json(['message' => 'Unauthorized to update this channel'], 403);
            }

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'is_private' => 'sometimes|boolean',
            ]);

            $channel->update($validated);

            return response()->json($channel, 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to update channel',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Delete a channel
     */
    public function destroy(string $uuid)
    {
        try {
            $user = Auth::user()?->fresh();

            $channel = Channel::where('uuid', $uuid)
                ->where('team_id', $user->team_id)
                ->firstOrFail();

            if ($channel->created_by !== $user->id && !$user->hasRole(['agency', 'admin', 'super admin'])) {
                return response()->json(['message' => 'Unauthorized to delete this channel'], 403);
            }

            $channel->delete();

            return response()->json(['message' => 'Channel deleted successfully'], 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Failed to delete channel',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

 /**
 * Add a member to a channel using their UserDetail UUID
 */
public function addMember(Request $request, string $uuid)
{
    try {
        $user = Auth::user()?->fresh();

        $channel = Channel::where('uuid', $uuid)
            ->where('team_id', $user->team_id)
            ->firstOrFail();

        if ($channel->created_by !== $user->id && !$user->hasRole(['agency', 'admin', 'super admin'])) {
            return response()->json(['message' => 'Unauthorized to add members'], 403);
        }

        $validated = $request->validate([
            'user_detail_uuid' => 'required|exists:user_details,uuid',
        ]);

        // Find the user by UserDetail UUID
        $member = \App\Models\UserDetail::where('uuid', $validated['user_detail_uuid'])->first()?->user;

        if (!$member) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($channel->members()->where('user_id', $member->id)->exists()) {
            return response()->json(['message' => 'User already a member'], 400);
        }

        $channel->members()->attach($member->id);

        return response()->json([
            'message' => 'Member added successfully',
            'member' => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
            ]
        ], 200);

    } catch (Throwable $e) {
        return response()->json([
            'message' => 'Failed to add member',
            'error' => config('app.debug') ? $e->getMessage() : null
        ], 500);
    }
}

/**
 * Remove a member from a channel using their UserDetail UUID
 */
public function removeMember(Request $request, string $uuid)
{
    try {
        $user = Auth::user()?->fresh();

        $channel = Channel::where('uuid', $uuid)
            ->where('team_id', $user->team_id)
            ->firstOrFail();

        if ($channel->created_by !== $user->id && !$user->hasRole(['agency', 'admin', 'super admin'])) {
            return response()->json(['message' => 'Unauthorized to remove members'], 403);
        }

        $validated = $request->validate([
            'user_detail_uuid' => 'required|exists:user_details,uuid',
        ]);

        // Find the user by UserDetail UUID
        $member = \App\Models\UserDetail::where('uuid', $validated['user_detail_uuid'])->first()?->user;

        if (!$member) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!$channel->members()->where('user_id', $member->id)->exists()) {
            return response()->json(['message' => 'User is not a member'], 400);
        }

        $channel->members()->detach($member->id);

        return response()->json([
            'message' => 'Member removed successfully',
            'member' => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
            ]
        ], 200);

    } catch (Throwable $e) {
        return response()->json([
            'message' => 'Failed to remove member',
            'error' => config('app.debug') ? $e->getMessage() : null
        ], 500);
    
        }
}
}

