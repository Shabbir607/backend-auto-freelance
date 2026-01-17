<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\ThreadService;
use App\Models\PlatformAccount;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ThreadController extends Controller
{
    protected ThreadService $service;

    // Cache for account instance per request
    protected ?PlatformAccount $cachedAccount = null;

    public function __construct(ThreadService $service)
    {
        $this->service = $service;
    }

    /**
     * Fetch list of threads from ALL accounts
     */
    public function listThreads(Request $request): JsonResponse
    {
        try {
            return response()->json(
                $this->service->listThreads($request->all())
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to list threads',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific account by UUID (Passport authenticated user)
     */
    private function getAccount(Request $request): PlatformAccount
    {
        if ($this->cachedAccount) {
            return $this->cachedAccount;
        }

        // Validate UUID
        $request->validate([
            'account_uuid' => 'required|uuid|exists:platform_accounts,uuid'
        ]);

        $user = $request->user(); // Passport-authenticated user

        if (!$user) {
            abort(401, "Unauthenticated.");
        }

        try {
            $this->cachedAccount = $user
                ->platformAccounts()
                ->where('uuid', $request->account_uuid)
                ->whereHas("platform", fn($q) => $q->where("slug", "freelancer"))
                ->firstOrFail();

            return $this->cachedAccount;
        } catch (\Throwable $e) {
            abort(404, "Platform account not found or unauthorized.");
        }
    }

    public function getThread(Request $request, string $threadId): JsonResponse
    {
        try {
            return response()->json(
                $this->service->getThread(
                    $this->getAccount($request),
                    $threadId,
                    $request->all()
                )
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch thread',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function createThread(Request $request): JsonResponse
    {
        try {
            // Validate required fields
            $validated = $request->validate([
                'account_uuid' => 'required|uuid|exists:platform_accounts,uuid',
                'members' => 'required|array|min:1',
                'members.*' => 'required|integer',
                'context_type' => 'nullable|string',
                'context' => 'nullable|integer',
                'message' => 'nullable|string',
            ]);

            return response()->json(
                $this->service->createThread(
                    $this->getAccount($request),
                    $validated
                )
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create thread',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function sendMessage(Request $request, string $threadId): JsonResponse
    {
        try {
            return response()->json(
                $this->service->sendMessage(
                    $this->getAccount($request),
                    $threadId,
                    $request->all()
                )
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to send message',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            return response()->json(
                $this->service->updateThread(
                    $this->getAccount($request),
                    $request->all()
                )
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update thread',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function typing(Request $request, string $threadId): JsonResponse
    {
        try {
            return response()->json(
                $this->service->typing(
                    $this->getAccount($request),
                    $threadId
                )
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to send typing status',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request): JsonResponse
    {
        try {
            return response()->json(
                $this->service->search($request->all())
            );
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to search threads',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
