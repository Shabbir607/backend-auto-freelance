<?php

namespace App\Notifications;

use App\Models\TeamMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(TeamMessage $message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message_id' => $this->message->id,
            'message_uuid' => $this->message->uuid,
            'content' => $this->message->content,
            'sender_id' => $this->message->user_id,
            'sender_name' => $this->message->user->name,
            'channel_id' => $this->message->channel_id,
            'channel_uuid' => $this->message->channel->uuid,
            'type' => 'message',
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message_id' => $this->message->id,
            'message_uuid' => $this->message->uuid,
            'content' => $this->message->content,
            'sender_id' => $this->message->user_id,
            'sender_name' => $this->message->user->name,
            'channel_id' => $this->message->channel_id,
            'channel_uuid' => $this->message->channel->uuid,
            'type' => 'message',
        ]);
    }
}
