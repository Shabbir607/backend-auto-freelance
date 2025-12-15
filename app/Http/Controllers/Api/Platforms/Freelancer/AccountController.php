<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Freelancer\AccountService;
use App\Models\PlatformAccount;
use Exception;

class AccountController extends Controller
{
    protected $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    // List all accounts
    public function index($platform_slug)
    {
        try {
            $accounts = $this->accountService->listAccounts($platform_slug);
            return response()->json(['success' => true, 'data' => $accounts]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Create a new account
    public function createAccount(Request $request, $platform_slug)
    {
        try {
            $account = $this->accountService->createAccount(
                $platform_slug,
                $request->input('username'),
                $request->input('email'),
                $request->input('ip_address') // IP must be passed
            );
            return response()->json(['success' => true, 'data' => $account]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Fetch account profile from Freelancer using assigned IP
    public function fetchProfile(Request $request, $platform_slug, $accountId)
    {
        try {
            $account = PlatformAccount::where('id', $accountId)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $profile = $this->accountService->fetchProfile($account);

            return response()->json(['success' => true, 'data' => $profile]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Update account
    public function updateAccount(Request $request, $platform_slug, $accountId)
    {
        try {
            $account = PlatformAccount::where('id', $accountId)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $updatedAccount = $this->accountService->updateAccount($account, $request->all());

            return response()->json(['success' => true, 'data' => $updatedAccount]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Delete account
    public function deleteAccount($platform_slug, $accountId)
    {
        try {
            $account = PlatformAccount::where('id', $accountId)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $deleted = $this->accountService->deleteAccount($account);

            return response()->json(['success' => $deleted]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
