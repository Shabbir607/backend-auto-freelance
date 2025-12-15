<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Events\FreelancerNewMessage;
use App\Models\FreelancerMessage;
use App\Models\FreelancerThread;
use App\Models\FreelancerWebhookEvent;
use App\Models\PlatformAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class WebhookController extends Controller
{
    /**
     * Handle incoming Freelancer.com webhook events.
     */
    public function handle(Request $request)
    {
        $eventType  = $request->header('X-Freelancer-Event');
        $signature  = $request->header('X-Freelancer-Signature');
        $payload    = $request->json()->all();

        Log::info('Freelancer Webhook Received', [
            'event' => $eventType,
            'signature' => $signature
        ]);

        // We only handle message events for now
        if ($eventType !== 'message.sent') {
            Log::info('Webhook Ignored: Unsupported Event', [
                'event' => $eventType
            ]);
            return response()->json(['status' => 'ignored']);
        }

        /** ------------------------------
         * Validate Owner (Platform Account)
         * ------------------------------ */
        $ownerId = $payload['owner']['id'] ?? null;

        if (!$ownerId) {
            Log::warning('Webhook Error: Missing Owner ID');
            return response()->json(['error' => 'owner_id_missing'], 400);
        }

        /** ------------------------------
         * Resolve Platform Account
         * ------------------------------ */
        $account = PlatformAccount::where('platform_user_id', $ownerId)
            ->whereHas('platform', function ($q) {
                $q->where('slug', 'freelancer');
            })
            ->first();

        if (!$account) {
            Log::warning('Webhook Error: Platform Account Not Found', [
                'platform_user_id' => $ownerId
            ]);
            return response()->json(['error' => 'account_not_found'], 404);
        }

        /** ------------------------------
         * Validate Required Payload Data
         * ------------------------------ */
        $threadData  = $payload['thread']  ?? null;
        $messageData = $payload['message'] ?? null;

        if (!$threadData || !$messageData) {
            Log::warning('Webhook Error: Invalid Payload Structure');
            return response()->json(['error' => 'invalid_payload'], 400);
        }

        /** ------------------------------
         * Sync Thread
         * ------------------------------ */
        $thread = FreelancerThread::updateOrCreate(
            [
                'platform_account_id' => $account->id,
                'freelancer_thread_id' => $threadData['id']
            ],
            [
                'user_id'       => $account->user_id,
                'participants'  => $threadData['members'] ?? [],
                'context_type'  => $threadData['context']['type'] ?? null,
                'context_id'    => $threadData['context']['id'] ?? null,
                'last_message_at' => now(),
                'metadata'      => $threadData
            ]
        );

        /** ------------------------------
         * Sync Message
         * ------------------------------ */
        $message = FreelancerMessage::updateOrCreate(
            [
                'freelancer_message_id' => $messageData['id'],
            ],
            [
                'freelancer_thread_id' => $thread->id,
                'freelancer_sender_id' => $messageData['from']['id'],
                'body'                 => $messageData['message'] ?? null,
                'attachments'          => $messageData['attachments'] ?? null,
                'sent_at'              => isset($messageData['timestamp'])
                                            ? Carbon::parse($messageData['timestamp'])
                                            : now(),
                'is_read'              => false,
                'metadata'             => $messageData,
            ]
        );

        /** ------------------------------
         * Log Webhook Event
         * ------------------------------ */
        FreelancerWebhookEvent::create([
            'platform_account_id' => $account->id,
            'event_type'          => $eventType,
            'payload'             => $payload,
            'signature'           => $signature,
            'processed'           => true,
            'processed_at'        => now(),
        ]);

        /** ------------------------------
         * Broadcast Message to User
         * ------------------------------ */
        broadcast(new FreelancerNewMessage($message))->toOthers();

        Log::info('Freelancer Webhook Processed Successfully', [
            'thread_id'  => $thread->freelancer_thread_id,
            'message_id' => $message->freelancer_message_id
        ]);

        return response()->json(['status' => 'ok']);
    }
}
