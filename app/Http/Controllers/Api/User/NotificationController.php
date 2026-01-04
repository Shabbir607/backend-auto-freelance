<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $notifications]);
    }

    public function markAsRead(Request $request, $uuid)
    {
        $notification = Notification::where('uuid', $uuid)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $notification->update(['read' => true]);

        return response()->json(['success' => true, 'data' => $notification]);
    }

    public function markAllAsRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)
            ->where('read', false)
            ->update(['read' => true]);

        return response()->json(['success' => true, 'message' => 'All notifications marked as read']);
    }
}
