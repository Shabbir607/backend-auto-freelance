<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\TeamMessage;
use App\Models\Channel;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Models\MessageReaction;
use App\Models\MessageRead;

class TeamMessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get messages for a channel with cursor-based pagination
     */
    public function index(Request $request, $channelUuid)
    {
        try {
            // Use cache for channel ID to avoid repeated DB query
            $channelIdCacheKey = 'channel_id_' . $channelUuid;
            $channelId = Cache::remember($channelIdCacheKey, now()->addMinutes(10), function () use ($channelUuid) {
                return Channel::where('uuid', $channelUuid)->value('id');
            });

            if (!$channelId) {
                return response()->json(['error' => 'Channel not found'], 404);
            }

            // Get pagination parameters
            $limit = $request->query('limit', 50); // Default 50 messages per page
            $cursor = $request->query('cursor'); // Timestamp cursor for pagination

            // Build query
            $query = TeamMessage::where('channel_id', $channelId)
                ->with(['user:id']); // load only user id

            // If cursor is provided, fetch messages created before the cursor (older messages)
            if ($cursor) {
                $query->where('created_at', '<', $cursor);
            }

            // Fetch messages in descending order (newest first)
            // We fetch limit + 1 to check if there are more messages
            $messages = $query->orderBy('created_at', 'desc')
                ->limit($limit + 1)
                ->get(['id', 'channel_id', 'user_id', 'content', 'attachments', 'parent_message_id', 'created_at', 'updated_at']);

            // Check if there are more messages
            $hasMore = $messages->count() > $limit;
            
            // If we have more than limit, keep only the first $limit items
            if ($hasMore) {
                $messages = $messages->slice(0, $limit)->values();
            }

            // Reverse to return in chronological order (oldest to newest in the current page)
            $messages = $messages->reverse()->values();

            // Determine next cursor (oldest message's timestamp in this batch)
            $nextCursor = null;
            if ($hasMore && $messages->count() > 0) {
                // The cursor should be the timestamp of the oldest message in current batch
                $nextCursor = $messages->first()->created_at->toIso8601String();
            }

            // Lazy load UUIDs in batch to reduce N+1 queries
            $userIds = $messages->pluck('user_id')->unique()->toArray();
            $userDetails = \App\Models\UserDetail::whereIn('user_id', $userIds)
                ->pluck('uuid', 'user_id');

            $messagesData = $messages->map(function ($msg) use ($userDetails) {
                return [
                    'id' => $msg->id,
                    'channel_id' => $msg->channel_id,
                    'user' => [
                        'uuid' => $userDetails[$msg->user_id] ?? null,
                    ],
                    'content' => $msg->content,
                    'attachments' => $msg->attachments,
                    'parent_message_id' => $msg->parent_message_id,
                    'created_at' => $msg->created_at,
                    'updated_at' => $msg->updated_at,
                ];
            });

            return response()->json([
                'data' => $messagesData,
                'next_cursor' => $nextCursor,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching channel messages: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch messages'], 500);
        }
    }

    /**
     * Store a new message
     */
    public function store(Request $request, $channelUuid)
    {
        try {
            $request->validate([
                'content' => 'required|string',
                'attachments' => 'nullable|array',
                'parent_message_id' => 'nullable|exists:team_messages,id',
            ]);

            // Get channel ID (cached)
            $channelId = Cache::remember('channel_id_' . $channelUuid, now()->addMinutes(10), function () use ($channelUuid) {
                return Channel::where('uuid', $channelUuid)->value('id');
            });

            if (!$channelId) {
                return response()->json(['error' => 'Channel not found'], 404);
            }

            $user = Auth::user();

            // Ensure UserDetail exists
            $userDetail = $user->userDetail;
            if (!$userDetail) {
                $userDetail = $user->userDetail()->create([]);
            }

            // Create message
            $message = TeamMessage::create([
                'channel_id' => $channelId,
                'user_id' => $user->id,
                'content' => $request->content,
                'attachments' => $request->attachments,
                'parent_message_id' => $request->parent_message_id,
            ]);

            // Clear messages cache for this channel
            Cache::forget('channel_messages_' . $channelId);

            broadcast(new MessageSent($message))->toOthers();

            return response()->json([
                'id' => $message->id,
                'channel_id' => $message->channel_id,
                'user' => [
                    'uuid' => $userDetail->uuid,
                ],
                'content' => $message->content,
                'attachments' => $message->attachments,
                'parent_message_id' => $message->parent_message_id,
                'created_at' => $message->created_at,
                'updated_at' => $message->updated_at,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'messages' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error storing message: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to store message'], 500);
        }
    }


    /**
     * Mark messages in a channel as read
     */
    public function markAsRead(Request $request, $channelUuid)
    {
        try {
            $channelId = Cache::remember('channel_id_' . $channelUuid, now()->addMinutes(10), function () use ($channelUuid) {
                return Channel::where('uuid', $channelUuid)->value('id');
            });

            if (!$channelId) {
                return response()->json(['error' => 'Channel not found'], 404);
            }

            $user = Auth::user();
            $lastMessageId = TeamMessage::where('channel_id', $channelId)->latest('id')->value('id');

            if ($lastMessageId) {
                MessageRead::updateOrCreate(
                    ['channel_id' => $channelId, 'user_id' => $user->id],
                    ['last_read_message_id' => $lastMessageId, 'read_at' => now()]
                );
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error marking as read: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to mark as read'], 500);
        }
    }

    /**
     * React to a message
     */
    public function react(Request $request, $messageId)
    {
        try {
            $request->validate([
                'emoji' => 'required|string',
            ]);

            $message = TeamMessage::findOrFail($messageId);
            $user = Auth::user();

            $reaction = MessageReaction::firstOrCreate([
                'team_message_id' => $message->id,
                'user_id' => $user->id,
                'emoji' => $request->emoji,
            ]);

            // Clear cache for this channel
            Cache::forget('channel_messages_' . $message->channel_id);

            // TODO: Broadcast reaction event

            return response()->json($reaction, 201);
        } catch (\Exception $e) {
            Log::error('Error reacting to message: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to react'], 500);
        }
    }

    /**
     * Remove reaction
     */
    public function unreact(Request $request, $messageId)
    {
        try {
            $request->validate([
                'emoji' => 'required|string',
            ]);

            $message = TeamMessage::findOrFail($messageId);
            $user = Auth::user();

            MessageReaction::where('team_message_id', $message->id)
                ->where('user_id', $user->id)
                ->where('emoji', $request->emoji)
                ->delete();

            // Clear cache for this channel
            Cache::forget('channel_messages_' . $message->channel_id);

            // TODO: Broadcast unreaction event

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error unreacting: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to unreact'], 500);
        }
    }

    /**
     * Get replies for a message
     */
    public function replies($messageId)
    {
        try {
            $replies = TeamMessage::where('parent_message_id', $messageId)
                ->with(['user:id', 'reactions'])
                ->orderBy('created_at', 'asc')
                ->get();

            // Similar user loading logic as index...
            $userIds = $replies->pluck('user_id')->unique()->toArray();
            $userDetails = \App\Models\UserDetail::whereIn('user_id', $userIds)
                ->pluck('uuid', 'user_id');

            $replies = $replies->map(function ($msg) use ($userDetails) {
                return [
                    'id' => $msg->id,
                    'channel_id' => $msg->channel_id,
                    'user' => [
                        'uuid' => $userDetails[$msg->user_id] ?? null,
                    ],
                    'content' => $msg->content,
                    'attachments' => $msg->attachments,
                    'reactions' => $msg->reactions,
                    'created_at' => $msg->created_at,
                    'updated_at' => $msg->updated_at,
                ];
            });

            return response()->json($replies);
        } catch (\Exception $e) {
            Log::error('Error fetching replies: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch replies'], 500);
        }
    }
}
