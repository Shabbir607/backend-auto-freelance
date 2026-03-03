<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use App\Models\SupportMessage;
use Illuminate\Http\Request;

class SupportChatController extends Controller
{
    /**
     * List all support tickets with last message preview.
     *
     * GET /admin/support/tickets
     * Query params: ?status=open|closed
     */
    public function index(Request $request)
    {
        $query = SupportTicket::with(['messages' => function ($q) {
            $q->latest()->limit(1);
        }])->latest();

        if ($request->has('status') && in_array($request->status, ['open', 'closed'])) {
            $query->where('status', $request->status);
        }

        $tickets = $query->paginate(20);

        return response()->json($tickets);
    }

    /**
     * View a single ticket with all its messages.
     *
     * GET /admin/support/tickets/{id}
     */
    public function show(string $id)
    {
        $ticket = SupportTicket::with('messages')->findOrFail($id);

        return response()->json([
            'success' => true,
            'ticket'  => $ticket,
        ]);
    }

    /**
     * Admin sends a reply to a ticket.
     *
     * POST /admin/support/tickets/{id}/reply
     */
    public function reply(Request $request, string $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = SupportTicket::findOrFail($id);

        if ($ticket->status === 'closed') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot reply to a closed ticket. Please reopen it first.',
            ], 422);
        }

        $msg = SupportMessage::create([
            'ticket_id' => $ticket->id,
            'sender'    => 'admin',
            'message'   => $request->message,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reply sent.',
            'data'    => $msg,
        ], 201);
    }

    /**
     * Close a support ticket.
     *
     * PUT /admin/support/tickets/{id}/close
     */
    public function close(string $id)
    {
        $ticket = SupportTicket::findOrFail($id);

        $ticket->update([
            'status'    => 'closed',
            'closed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ticket closed.',
            'ticket'  => $ticket,
        ]);
    }

    /**
     * Reopen a closed support ticket.
     *
     * PUT /admin/support/tickets/{id}/reopen
     */
    public function reopen(string $id)
    {
        $ticket = SupportTicket::findOrFail($id);

        $ticket->update([
            'status'    => 'open',
            'closed_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ticket reopened.',
            'ticket'  => $ticket,
        ]);
    }

    /**
     * Delete a support ticket and all its messages.
     *
     * DELETE /admin/support/tickets/{id}
     */
    public function destroy(string $id)
    {
        $ticket = SupportTicket::findOrFail($id);
        $ticket->delete(); // cascade deletes messages via FK

        return response()->json([
            'success' => true,
            'message' => 'Ticket deleted.',
        ]);
    }

    /**
     * Summary stats for the admin dashboard.
     *
     * GET /admin/support/stats
     */
    public function stats()
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'total'  => SupportTicket::count(),
                'open'   => SupportTicket::where('status', 'open')->count(),
                'closed' => SupportTicket::where('status', 'closed')->count(),
            ],
        ]);
    }
}
