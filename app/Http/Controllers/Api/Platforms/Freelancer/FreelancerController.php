<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Freelancer\FreelancerService;
use App\Models\PlatformAccount;
use App\Models\Platform;
use App\Models\IpAddress;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Exception;

class FreelancerController extends Controller
{
    protected FreelancerService $freelancer;

    public function __construct(FreelancerService $freelancer)
    {
        $this->freelancer = $freelancer;
    }

    // ----------------------------
    // Accounts / OAuth
    // ----------------------------

    public function index(Request $request)
    {
        $user = $request->user('api');
        $accounts = PlatformAccount::where('user_id', $user->id)
            ->with(['platform', 'ip'])
            ->get();

        return response()->json(['success' => true, 'accounts' => $accounts]);
    }

    public function createAccount(Request $request)
    {
        $user = $request->user('api');

        $v = Validator::make($request->all(), [
            'platform_id' => 'required|exists:platforms,id',
            'ip_id' => 'nullable|exists:ip_addresses,id',
            'account_username' => 'nullable|string|max:150',
            'account_email' => 'nullable|email|max:180',
        ]);

        if ($v->fails()) {
            return response()->json(['success' => false, 'errors' => $v->errors()], 422);
        }

        $data = $v->validated();
        $data['user_id'] = $user->id;
        $data['uuid'] = (string) Str::uuid();
        $data['status'] = 'pending';
        $data['verified'] = false;

        // Assign IP if provided
        if (!empty($data['ip_id'])) {
            $ip = IpAddress::find($data['ip_id']);
            if (!$ip) return response()->json(['success' => false, 'error' => 'IP not found'], 404);
            if ($ip->is_assigned) return response()->json(['success' => false, 'error' => 'IP already assigned'], 400);
            $ip->update(['is_assigned' => true, 'assigned_at' => now(), 'user_id' => $user->id]);
        }

        $account = PlatformAccount::create($data);
        return response()->json(['success' => true, 'account' => $account], 201);
    }



}
