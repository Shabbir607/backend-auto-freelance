<?php

namespace App\Events;

use App\Models\FreelancerMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class FreelancerNewMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public FreelancerMessage $message;

    public function __construct(FreelancerMessage $message)
    {
        // Preload relations before broadcasting
        $this->message = $message->loadMissing([
            'thread',
            'thread.account',
        ]);
    }

    public function broadcastOn(): Channel
    {
        // Private channel for the user receiving the message
        return new PrivateChannel('user.' . $this->message->thread->user_id);
    }

    public function broadcastWith(): array
    {
        return [
            'type' => 'freelancer.message.new',
            'message' => $this->message,
            'thread_id' => $this->message->thread->freelancer_thread_id,
            'account_username' => $this->message->thread->account->account_username,
            'sent_at' => $this->message->sent_at->toIso8601String(),
        ];
    }
}
