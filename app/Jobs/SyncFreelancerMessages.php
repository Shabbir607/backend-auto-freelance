<?php

namespace App\Jobs;

use App\Events\FreelancerNewMessage;
use App\Models\FreelancerMessage;
use App\Models\FreelancerThread;
use App\Services\Freelancer\AuthService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncFreelancerMessages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected FreelancerThread $thread;

    public function __construct(FreelancerThread $thread)
    {
        $this->thread = $thread;
    }

    public function handle(AuthService $authService)
    {
        try {
            $response = $authService->request(
                $this->thread->account, // Assuming relation exists
                'GET',
                "/messages/0.1/threads/{$this->thread->freelancer_thread_id}/messages/",
                ['query' => ['limit' => 50]]
            );

            if (!isset($response['result']['messages'])) {
                return;
            }

            // Process messages in reverse order (oldest first) if needed, 
            // but for updateOrCreate it doesn't matter much unless we broadcast.
            $messages = $response['result']['messages'];

            foreach ($messages as $messageData) {
                $exists = FreelancerMessage::where('freelancer_message_id', $messageData['id'])->exists();

                $message = FreelancerMessage::updateOrCreate(
                    [
                        'freelancer_message_id' => $messageData['id'],
                    ],
                    [
                        'freelancer_thread_id' => $this->thread->id,
                        'freelancer_sender_id' => $messageData['from_user'],
                        'body'                 => $messageData['message'] ?? null,
                        'attachments'          => $messageData['attachments'] ?? null,
                        'sent_at'              => isset($messageData['timestamp'])
                                                    ? Carbon::createFromTimestamp($messageData['timestamp'])
                                                    : now(),
                        'is_read'              => true, // Assuming synced messages are read? Or check API field
                        'metadata'             => $messageData,
                    ]
                );

                // If it's a new message and we want to notify (maybe not for bulk sync, but for recent)
                if (!$exists) {
                    // broadcast(new FreelancerNewMessage($message))->toOthers();
                }
            }

        } catch (\Throwable $e) {
            Log::error("SyncFreelancerMessages failed for thread {$this->thread->id}: " . $e->getMessage());
        }
    }
}
