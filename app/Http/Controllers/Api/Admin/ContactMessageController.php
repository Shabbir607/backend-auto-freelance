<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactReplyMail;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = ContactMessage::latest()->paginate(20);
        return response()->json($messages);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $message = ContactMessage::findOrFail($id);
        
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return response()->json($message);
    }

    /**
     * Reply to a contact message.
     */
    public function reply(Request $request, string $id)
    {
        $request->validate([
            'reply_message' => 'required|string',
        ]);

        $contactMessage = ContactMessage::findOrFail($id);

        // Send Email
        Mail::to($contactMessage->email)->send(new ContactReplyMail($request->reply_message, $contactMessage->subject));

        // Update record
        $contactMessage->update([
            'reply_status' => true,
            'reply_message' => $request->reply_message,
            'replied_at' => now(),
        ]);

        return response()->json(['message' => 'Reply sent successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return response()->json(['message' => 'Message deleted successfully']);
    }
}
