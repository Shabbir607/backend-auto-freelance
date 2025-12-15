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
                'milestones'
            ]);

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
}
