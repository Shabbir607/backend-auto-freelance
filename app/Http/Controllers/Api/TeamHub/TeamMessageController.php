<?php

namespace App\Http\Controllers\Api\TeamHub;

use App\Http\Controllers\Controller;
use App\Models\TeamMessage;
use App\Models\Channel;
use App\Events\MessageSent;
use App\Events\UserTyping;
use App\Events\MessageRead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TeamMessageController extends Controller
{
    public function index($channelUuid)
    {
        $channel = Channel::where('uuid', $channelUuid)->firstOrFail();
        
        $messages = TeamMessage::where('channel_id', $channel->id)
            ->with(['user'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request, $channelUuid)
    {
        $request->validate([
            'content' => 'required|string',
            'attachments' => 'nullable|array',
            'parent_message_id' => 'nullable|exists:team_messages,id',
        ]);

        $channel = Channel::where('uuid', $channelUuid)->firstOrFail();

        $message = TeamMessage::create([
            'channel_id' => $channel->id,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'attachments' => $request->attachments,
            'parent_message_id' => $request->parent_message_id,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message->load('user'), 201);
    }
}
