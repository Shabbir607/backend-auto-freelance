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
    public function index($platform_slug = 'freelancer')
    {
        try {
            $accounts = $this->accountService->listAccounts($platform_slug);
            return response()->json(['success' => true, 'data' => $accounts]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Create a new account
    public function createAccount(Request $request, $platform_slug = 'freelancer')
    {
        try {
            $account = $this->accountService->createAccount(
                $platform_slug,
                $request->input('username'),
                $request->input('email'),
                $request->input('ip_address') 
            );
            return response()->json(['success' => true, 'data' => $account]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Fetch account profile from Freelancer using assigned IP
    public function fetchProfile(Request $request, $platform_slug = 'freelancer')
    {
        try {
            $accountId = $request->query('uuid') ?? $request->input('uuid');
            
            $query = PlatformAccount::where('user_id', auth()->id());

            if ($accountId) {
                $query->where('uuid', $accountId);
            }

            $account = $query->firstOrFail();

            $profile = $this->accountService->fetchProfile($account);

            return response()->json(['success' => true, 'data' => $profile]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Update account
    public function updateAccount(Request $request, $platform_slug = 'freelancer')
    {
        try {
            $accountId = $request->input('uuid') ?? $request->input('id');
            $account = PlatformAccount::where('uuid', $accountId)
                ->orWhere('id', $accountId)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $updatedAccount = $this->accountService->updateAccount($account, $request->all());

            return response()->json(['success' => true, 'data' => $updatedAccount]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    // Delete account
    public function deleteAccount(Request $request, $platform_slug = 'freelancer')
    {
        try {
            $accountId = $request->input('uuid') ?? $request->input('id');
            $account = PlatformAccount::where('uuid', $accountId)
                ->orWhere('id', $accountId)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $deleted = $this->accountService->deleteAccount($account);

            return response()->json(['success' => $deleted]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function reputations(Request $request)
    {
        try {
            $request->validate([
                'users' => 'nullable|array',
                'users.*' => 'integer'
            ]);

            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $userIds = $request->input('users');

            if (empty($userIds)) {
                if (!$account->external_account_id) {
                    // Try to fetch profile to get external ID
                    try {
                        $profile = $this->accountService->fetchProfile($account);
                        // fetchProfile updates the account model
                        $account->refresh();
                    } catch (Exception $e) {
                        return response()->json(['success' => false, 'error' => 'User ID required and could not be determined.'], 400);
                    }
                }
                $userIds = [$account->external_account_id];
            }

            $reputations = $this->accountService->getReputations($account, $userIds);
            return response()->json(['success' => true, 'data' => $reputations]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function portfolios(Request $request)
    {
        try {
            $request->validate([
                'users' => 'nullable|array',
                'users.*' => 'integer'
            ]);

            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $userIds = $request->input('users');

            if (empty($userIds)) {
                if (!$account->external_account_id) {
                    try {
                        $profile = $this->accountService->fetchProfile($account);
                        $account->refresh();
                    } catch (Exception $e) {
                        return response()->json(['success' => false, 'error' => 'User ID required and could not be determined.'], 400);
                    }
                }
                $userIds = [$account->external_account_id];
            }

            $portfolios = $this->accountService->getPortfolios($account, $userIds);
            return response()->json(['success' => true, 'data' => $portfolios]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
    public function getUser(Request $request)
    {
        try {
            $uuid = $request->route('uuid');
            $userId = $request->route('userId');

            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $user = $this->accountService->getUser($account, $userId);
            return response()->json(['success' => true, 'data' => $user]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function searchUsers(Request $request)
    {
        try {
            $request->validate([
                'usernames' => 'required|array',
                'usernames.*' => 'string'
            ]);

            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $users = $this->accountService->searchUsers($account, $request->usernames);
            return response()->json(['success' => true, 'data' => $users]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
    public function searchDirectory(Request $request)
    {
        try {
            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $results = $this->accountService->searchDirectory($account, $request->all());
            return response()->json(['success' => true, 'data' => $results]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function getLoginDevices(Request $request)
    {
        try {
            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $devices = $this->accountService->getLoginDevices($account);
            return response()->json(['success' => true, 'data' => $devices]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function addUserSkills(Request $request)
    {
        try {
            $request->validate(['jobs' => 'required|array']);
            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $result = $this->accountService->addUserSkills($account, $request->jobs);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function setUserSkills(Request $request)
    {
        try {
            $request->validate(['jobs' => 'required|array']);
            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $result = $this->accountService->setUserSkills($account, $request->jobs);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function deleteUserSkills(Request $request)
    {
        try {
            $request->validate(['jobs' => 'required|array']);
            $uuid = $request->route('uuid');
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $result = $this->accountService->deleteUserSkills($account, $request->jobs);
            return response()->json(['success' => true, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
