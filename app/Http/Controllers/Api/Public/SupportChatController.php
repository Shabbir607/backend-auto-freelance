<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\SupportMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SupportChatController extends Controller
{
    /**
     * Create a new support ticket (guest / user).
     * Returns a session_token the client should store and reuse.
     *
     * POST /support/ticket
     */
    public function createTicket(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $sessionToken = Str::random(48);

        $ticket = SupportTicket::create([
            'session_token' => $sessionToken,
            'name'          => $request->name,
            'email'         => $request->email,
            'subject'       => $request->subject ?? 'Support Request',
            'status'        => 'open',
        ]);

        // Save the first message right away
        SupportMessage::create([
            'ticket_id' => $ticket->id,
            'sender'    => 'user',
            'message'   => $request->message,
        ]);

        return response()->json([
            'success'       => true,
            'message'       => 'Support ticket created. Use the session_token to continue the conversation.',
            'session_token' => $sessionToken,
            'ticket_id'     => $ticket->id,
            'subject'       => $ticket->subject,
        ], 201);
    }

    /**
     * Send a message on an existing ticket.
     *
     * POST /support/ticket/{token}/message
     */
    public function sendMessage(Request $request, string $token)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = SupportTicket::where('session_token', $token)->firstOrFail();

        if ($ticket->status === 'closed') {
            return response()->json([
                'success' => false,
                'message' => 'This support ticket is closed. Please open a new one.',
            ], 422);
        }

        $msg = SupportMessage::create([
            'ticket_id' => $ticket->id,
            'sender'    => 'user',
            'message'   => $request->message,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message sent.',
            'data'    => $msg,
        ], 201);
    }

    /**
     * Get all messages for a ticket (user polling).
     *
     * GET /support/ticket/{token}/messages
     */
    public function getMessages(string $token)
    {
        $ticket = SupportTicket::where('session_token', $token)->firstOrFail();

        return response()->json([
            'success' => true,
            'ticket'  => [
                'id'      => $ticket->id,
                'subject' => $ticket->subject,
                'status'  => $ticket->status,
                'name'    => $ticket->name,
                'email'   => $ticket->email,
            ],
            'messages' => $ticket->messages,
        ]);
    }
}
