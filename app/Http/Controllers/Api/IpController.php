<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IpService;
use Illuminate\Http\Request;

class IpController extends Controller
{
    protected $ipService;

    public function __construct(IpService $ipService)
    {
        $this->ipService = $ipService;
    }

    /**
     * Generate a random valid public IP
     */
    public function generate()
    {
        $ipDetails = $this->ipService->generateValidPublicIp();

        return response()->json([
            'success' => true,
            'data' => $ipDetails
        ]);
    }


    /**
     * Validate an IP address
     */
    public function validateIp(Request $request)
    {
        $request->validate([
            'ip' => 'required|ip'
        ]);

        $result = $this->ipService->validateIp($request->ip);

        return response()->json([
            'success' => true,
            'data' => $result
        ]);
    }
}
