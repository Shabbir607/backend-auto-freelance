<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ChannelController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        if (!$user->team_id) {
            return response()->json(['message' => 'User is not part of any team'], 404);
        }

        // Assuming user belongs to a team, fetch channels for that team
        // For now, fetching all channels as per previous implementation, but adding last message and unread count
        
        // Better query for unread count
        $channels = Channel::where('team_id', $user->team_id) // Filter by user's team_id
            ->select('channels.*')
            ->with(['lastMessage.user']) // Eager load last message and its user
            ->get();
            
        foreach ($channels as $channel) {
            $lastRead = DB::table('channel_read_status')
                ->where('channel_id', $channel->id)
                ->where('user_id', $user->id)
                ->first();
                
            $lastReadId = $lastRead ? $lastRead->last_read_message_id : 0;
            
            $channel->unread_count = $channel->messages()
                ->where('id', '>', $lastReadId)
                ->count();
                
            // Ensure last_message is always present, even if null
            $channel->last_message = $channel->lastMessage; // Use the eager loaded lastMessage
        }

        return response()->json($channels);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_private' => 'boolean',
        ]);

        $user = Auth::user();

        if (!$user->hasRole(['admin', 'super admin'])) {
            return response()->json(['message' => 'Only admins can create channels'], 403);
        }

        if (!$user->team_id) {
            return response()->json(['message' => 'User is not part of any team'], 404);
        }

        $channel = Channel::create([
            'uuid' => (string) Str::uuid(),
            'team_id' => $user->team_id,
            'name' => $request->name,
            'description' => $request->description,
            'is_private' => $request->is_private ?? false,
        ]);

        return response()->json($channel, 201);
    }

    public function show($uuid)
    {
        $user = Auth::user();
        
        if (!$user->team_id) {
            return response()->json(['message' => 'User is not part of any team'], 404);
        }

        $channel = Channel::where('uuid', $uuid)->where('team_id', $user->team_id)->firstOrFail();

        return response()->json($channel);
    }
}
