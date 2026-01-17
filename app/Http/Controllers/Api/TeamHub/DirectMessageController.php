<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DirectMessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * List my DM channels
     */
    public function index()
    {
        try {
            $user = Auth::user();
            
            // Get channels of type 'dm' where the user is a member
            $channels = $user->channels()
                ->where('type', 'dm')
                ->with(['members' => function ($query) use ($user) {
                    $query->where('user_id', '!=', $user->id); // Get the other user
                }, 'lastMessage'])
                ->get();

            $channels = $channels->map(function ($channel) {
                $otherUser = $channel->members->first();
                return [
                    'uuid' => $channel->uuid,
                    'name' => $otherUser ? $otherUser->name : 'Unknown User', // DM name is usually the other person's name
                    'other_user' => $otherUser ? [
                        'id' => $otherUser->id,
                        'name' => $otherUser->name,
                        'avatar' => $otherUser->detail->avatar_url ?? null,
                    ] : null,
                    'last_message' => $channel->lastMessage ? [
                        'content' => $channel->lastMessage->content,
                        'created_at' => $channel->lastMessage->created_at,
                    ] : null,
                    'updated_at' => $channel->updated_at,
                ];
            });

            return response()->json($channels);
        } catch (\Exception $e) {
            Log::error('Error fetching DMs: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch DMs'], 500);
        }
    }

    /**
     * Start or get a DM with a user
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            $currentUser = Auth::user();
            $otherUserId = $request->user_id;

            if ($currentUser->id == $otherUserId) {
                return response()->json(['error' => 'Cannot DM yourself'], 422);
            }

            // Check if a DM channel already exists between these two users
            // This is a bit complex with standard SQL, simplified logic:
            // Find channels where both users are members and type is 'dm'
            
            $existingChannel = Channel::where('type', 'dm')
                ->whereHas('members', function ($q) use ($currentUser) {
                    $q->where('user_id', $currentUser->id);
                })
                ->whereHas('members', function ($q) use ($otherUserId) {
                    $q->where('user_id', $otherUserId);
                })
                ->first();

            if ($existingChannel) {
                return response()->json(['uuid' => $existingChannel->uuid]);
            }

            // Create new DM channel
            $channel = Channel::create([
                'type' => 'dm',
                'name' => 'DM', // Placeholder, name is dynamic based on user
                'team_id' => $currentUser->team_id ?? 1, // Fallback or logic for team
                'created_by' => $currentUser->id,
                'is_private' => true,
            ]);

            // Add members
            $channel->members()->attach([$currentUser->id, $otherUserId]);

            return response()->json(['uuid' => $channel->uuid], 201);

        } catch (\Exception $e) {
            Log::error('Error creating DM: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create DM'], 500);
        }
    }
}
