<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserTyping implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $channelUuid;
    public $user;

    /**
     * Create a new event instance.
     */
    public function __construct($channelUuid, $user)
    {
        $this->channelUuid = $channelUuid;
        $this->user = [
            'id' => $user->id,
            'name' => $user->name,
            'avatar' => $user->avatar, // Assuming avatar accessor or field exists
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('team.channel.' . $this->channelUuid),
        ];
    }

    public function broadcastAs()
    {
        return 'user.typing';
    }
}
