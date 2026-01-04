<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\AccountFilter;
use App\Models\PlatformAccount;
use Illuminate\Http\Request;
use Exception;

class AccountFilterController extends Controller
{
    /**
     * List filters for a specific account
     */
    public function index(Request $request, $platform_slug, $uuid)
    {
        
        try {
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $filters = AccountFilter::where('platform_account_id', $account->id)->get();

            return response()->json(['success' => true, 'data' => $filters]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Create a new filter
     */
    public function store(Request $request, $platform_slug, $uuid)
    {
        try {
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $request->validate([
                'name' => 'required|string',
                'filter_params' => 'required|array',
            ]);

            $filter = AccountFilter::create([
                'platform_account_id' => $account->id,
                'name' => $request->name,
                'filter_params' => $request->filter_params,
                'is_active' => $request->is_active ?? true,
            ]);

            return response()->json(['success' => true, 'data' => $filter]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update a filter
     */
    public function update(Request $request, $platform_slug, $uuid)
    {
        try {
            $filterId = $request->route('filterId');
            
            $filter = AccountFilter::where('id', $filterId)
                ->whereHas('account', function ($q) {
                    $q->where('user_id', auth()->id());
                })
                ->firstOrFail();

            $filter->update($request->only(['name', 'filter_params', 'is_active']));

            return response()->json(['success' => true, 'data' => $filter]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Delete a filter
     */
    public function destroy(Request $request, $platform_slug, $uuid)
    {
        try {
            $filterId = $request->route('filterId');

            $filter = AccountFilter::where('id', $filterId)
                ->whereHas('account', function ($q) {
                    $q->where('user_id', auth()->id());
                })
                ->firstOrFail();

            $filter->delete();

            return response()->json(['success' => true, 'message' => 'Filter deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Add demo filters for an account
     */
    public function addDemoFilters(Request $request, $platform_slug, $uuid)
    {
        try {
            $account = PlatformAccount::where('uuid', $uuid)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            $demoFilters = [
                [
                    'name' => 'High Budget Web Dev',
                    'filter_params' => [
                        'min_budget' => 500,
                        'jobs' => [3, 7] // PHP, MySQL
                    ],
                    'is_active' => true
                ],
                [
                    'name' => 'Recent Python Jobs',
                    'filter_params' => [
                        'jobs' => [10], // Python
                        'sort_field' => 'time_updated'
                    ],
                    'is_active' => false
                ]
            ];

            foreach ($demoFilters as $filterData) {
                AccountFilter::create([
                    'platform_account_id' => $account->id,
                    'name' => $filterData['name'],
                    'filter_params' => $filterData['filter_params'],
                    'is_active' => $filterData['is_active']
                ]);
            }

            return response()->json(['success' => true, 'message' => 'Demo filters added']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
