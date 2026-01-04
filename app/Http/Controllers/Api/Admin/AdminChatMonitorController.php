<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMessage;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminChatMonitorController extends Controller
{
    public function index()
    {
        $stats = [
            'total_messages' => TeamMessage::count(),
            'messages_today' => TeamMessage::whereDate('created_at', today())->count(),
            'active_channels' => Channel::has('messages')->count(),
        ];

        return response()->json($stats);
    }

    public function logs(Request $request)
    {
        $logs = TeamMessage::with(['user', 'channel'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($logs);
    }
}
