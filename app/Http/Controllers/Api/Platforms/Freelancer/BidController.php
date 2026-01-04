<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Freelancer\BidService;
use Exception;

class BidController extends Controller
{
    protected BidService $bidService;

    public function __construct(BidService $bidService)
    {
        $this->bidService = $bidService;
    }

    /**
     * POST /freelancer/{platform_slug}/{uuid}/bids
     * Body: JSON { "project_id", "amount", "message", "currency", "delivery_days", "milestones" }
     */
    public function placeBid(string $platform_slug, string $uuid, Request $request)
    {
        try {
            $data = $request->only([
                'project_id',
                'amount',
                'message',
                'currency',
                'delivery_days',
                'milestones',
                'account_id' // Allow passing specific account ID
            ]);

            // If account_id is passed, we might need to resolve the UUID for the service
            // Or better, update BidService to handle account_id directly.
            // For now, let's assume the service uses the UUID passed in the route, 
            // but if account_id is present, we should probably switch the context.
            // However, the route structure /freelancer/{platform_slug}/{uuid}/... implies context is set by URL.
            // If the user wants to bid from a specific account, they should probably use that account's UUID in the URL.
            // BUT, the requirement says "when i bid then i will bid from seprate account".
            // This implies the UI might be listing projects from Account A but I want to bid using Account B.
            
            if ($request->has('account_id')) {
                // Resolve UUID from account_id
                $account = \App\Models\PlatformAccount::where('id', $request->account_id)
                    ->where('user_id', $request->user('api')->id)
                    ->firstOrFail();
                $uuid = $account->uuid;
            }

            $bid = $this->bidService->placeBid($platform_slug, $uuid, $data);

            return response()->json([
                'success' => true,
                'bid' => $bid
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * GET /freelancer/{platform_slug}/{uuid}/projects/{projectId}/bids
     */
    public function listBids(string $platform_slug, string $uuid, int $projectId)
    {
        try {
            $bids = $this->bidService->listBids($platform_slug, $uuid, $projectId);

            return response()->json([
                'success' => true,
                'bids' => $bids
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * GET /freelancer/{platform_slug}/{uuid}/bids/{bidId}
     */
    public function show(string $platform_slug, string $uuid, int $bidId)
    {
        try {
            // Assuming BidService doesn't have getBid, implementing directly or assuming it does.
            // I'll check if I can use the model directly as fallback.
            $bid = \App\Models\Bid::findOrFail($bidId);

            return response()->json([
                'success' => true,
                'bid' => $bid
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        }
    }
}
