<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\MessagingService;
use Illuminate\Http\Request;

class MessagingController extends Controller
{
    protected MessagingService $service;

    public function __construct(MessagingService $service)
    {
        $this->service = $service;
    }

    /**
     * List messages for all authenticated Freelancer accounts
     */
    public function listMessages(Request $request)
    {
        $accounts = auth()->user()->freelancerAccounts; // collection of all accounts
        $result = [];

        foreach ($accounts as $account) {
            $result[$account->account_username] = $this->service->listMessages($account, $request->all());
        }

        return response()->json($result);
    }

    /**
     * Get message details from a specific account
     * Optional: accept `account_id` to fetch from a specific account
     */
    public function getMessage(Request $request, string $messageId)
    {
        $accountId = $request->query('account_id'); 
        $account = $accountId 
            ? auth()->user()->freelancerAccounts()->findOrFail($accountId) 
            : auth()->user()->freelancerAccounts()->firstOrFail();

        return response()->json(
            $this->service->getMessage($account, $messageId, $request->all())
        );
    }

    public function attachmentUrl(Request $request, string $messageId, string $filename)
    {
        $accountId = $request->query('account_id'); 
        $account = $accountId 
            ? auth()->user()->freelancerAccounts()->findOrFail($accountId) 
            : auth()->user()->freelancerAccounts()->firstOrFail();

        return response()->json(
            $this->service->getAttachmentUrl($account, $messageId, $filename)
        );
    }

    public function attachmentDownload(Request $request, string $messageId, string $filename)
    {
        $accountId = $request->query('account_id'); 
        $account = $accountId 
            ? auth()->user()->freelancerAccounts()->findOrFail($accountId) 
            : auth()->user()->freelancerAccounts()->firstOrFail();

        $url = $this->service->getAttachmentDownloadUrl($account, $messageId, $filename);

        return redirect()->away($url);
    }

    public function attachmentThumbnail(Request $request, string $messageId, string $filename)
    {
        $accountId = $request->query('account_id'); 
        $account = $accountId 
            ? auth()->user()->freelancerAccounts()->findOrFail($accountId) 
            : auth()->user()->freelancerAccounts()->firstOrFail();

        return response()->json(
            $this->service->getThumbnail(
                $account,
                $messageId,
                $filename,
                (int) ($request->width ?? 200),
                (int) ($request->height ?? 200),
                $request->input('method', 'fill')
            )
        );
    }

    public function search(Request $request)
    {
        $accounts = auth()->user()->freelancerAccounts;
        $result = [];

        foreach ($accounts as $account) {
            $result[$account->account_username] = $this->service->searchMessages($account, $request->all());
        }

        return response()->json($result);
    }
}
