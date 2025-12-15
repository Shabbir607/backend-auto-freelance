<?php

namespace App\Services\Freelancer;

use App\Models\FreelancerMessage;
use App\Models\PlatformAccount;
use Exception;

class MessagingService
{
    protected AuthService $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    /** LIST MESSAGES (Local) */
    public function listMessages(PlatformAccount $account, array $params)
    {
        // Find thread by context or ID if provided, otherwise list all messages for account?
        // Usually messages are listed per thread.
        // The API route was /messages/0.1/messages/ which lists all messages for the user/account.
        
        $query = FreelancerMessage::whereHas('thread', function($q) use ($account) {
            $q->where('platform_account_id', $account->id);
        });

        if (isset($params['thread_id'])) {
            $query->where('freelancer_thread_id', $params['thread_id']); // This assumes we store local ID in params, or need to join
        }

        return $query->orderByDesc('sent_at')->paginate($params['limit'] ?? 20);
    }

    /** GET MESSAGE BY ID (Local) */
    public function getMessage(PlatformAccount $account, int $messageId, array $params = [])
    {
        $message = FreelancerMessage::where('freelancer_message_id', $messageId)
            ->whereHas('thread', function($q) use ($account) {
                $q->where('platform_account_id', $account->id);
            })
            ->first();

        if ($message) {
            return $message;
        }

        return $this->auth->request(
            $account,
            "GET",
            "/messages/0.1/messages/{$messageId}/",
            ['query' => $params]
        );
    }

    /** GET ATTACHMENT DIRECT DOWNLOAD URL */
    public function getAttachmentDownloadUrl(PlatformAccount $account, int $messageId, string $filename)
    {
        return "{$this->auth->getBaseUrl()}/messages/0.1/messages/{$messageId}/{$filename}";
    }

    /** GET ATTACHMENT JSON URL */
    public function getAttachmentUrl(PlatformAccount $account, int $messageId, string $filename)
    {
        return $this->auth->request(
            $account,
            "GET",
            "/messages/0.1/messages/{$messageId}/attachments/{$filename}",
        );
    }

    /** GET THUMBNAIL */
    public function getThumbnail(
        PlatformAccount $account,
        int $messageId,
        string $filename,
        int $width,
        int $height,
        string $method = 'fill'
    ) {
        return $this->auth->request(
            $account,
            "GET",
            "/messages/0.1/messages/{$messageId}/{$filename}/thumbnail",
            [
                'query' => [
                    'width'  => $width,
                    'height' => $height,
                    'resizing_method' => $method
                ]
            ]
        );
    }

    /** SEARCH MESSAGES (Local) */
    public function searchMessages(PlatformAccount $account, array $params)
    {
        $searchTerm = $params['q'] ?? '';

        return FreelancerMessage::whereHas('thread', function($q) use ($account) {
                $q->where('platform_account_id', $account->id);
            })
            ->where('body', 'like', "%{$searchTerm}%")
            ->paginate($params['limit'] ?? 20);
    }
}
