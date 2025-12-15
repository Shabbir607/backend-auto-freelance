<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIpAddressRequest;
use App\Http\Requests\UpdateIpAddressRequest;
use App\Models\IpAddress;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class IpAddressController extends Controller
{
    /**
     * List IPs belonging to authenticated user
     */
    public function index()
    {
        $userId = auth('api')->id();

        $ips = IpAddress::where('user_id', $userId)
                        ->latest()
                        ->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $ips
        ]);
    }


    /**
     * Create IP for authenticated user
     */
    public function store(StoreIpAddressRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth('api')->id();  // Force ownership

        $ip = IpAddress::create($data);

        return response()->json([
            'success' => true,
            'message' => 'IP Address created successfully',
            'data' => $ip,
        ], 201);
    }

    /**
     * Show single IP (must belong to authenticated user)
     */
    public function show($uuid)
    {
        $userId = auth('api')->id();

        $ip = IpAddress::where('uuid', $uuid)
                        ->where('user_id', $userId)
                        ->first();
        if (!$ip) {
            $Id = intval($uuid);
            $ip = IpAddress::where('id', $Id)
                             ->first();
            }
            else{
                return response()->json([
                'success' => false,
                'message' => 'IP address not found or not owned by this user'
            ], 404);
            }

        return response()->json([
            'success' => true,
            'data' => $ip
        ]);
    }


    /**
     * Update IP (must belong to authenticated user)
     */
    public function update(UpdateIpAddressRequest $request, $uuid)
    {
        $userId = auth('api')->id();

        $ip = IpAddress::where('uuid', $uuid)
                        ->where('user_id', $userId)
                        ->first();

        if (!$ip) {
            $Id = intval($uuid);
            $ip = IpAddress::where('id', $Id)
                             ->first();
            }
            else{
                return response()->json([
                'success' => false,
                'message' => 'IP address not found or not owned by this user'
            ], 404);
            }

        $ip->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'IP Address updated successfully',
            'data' => $ip,
        ]);
    }


    /**
     * Delete IP (must belong to authenticated user)
     */
    public function destroy($uuid)
    {
        $userId = auth('api')->id();

        $ip = IpAddress::where('uuid', $uuid)
                        ->where('user_id', $userId)
                        ->first();

        if (!$ip) {
            $Id = intval($uuid);
            $ip = IpAddress::where('id', $Id)
                             ->first();
            }
            else{
                return response()->json([
                'success' => false,
                'message' => 'IP address not found or not owned by this user'
            ], 404);
            }

        $ip->delete();

        return response()->json([
            'success' => true,
            'message' => 'IP Address deleted successfully',
        ]);
    }

/**
 * Fetch Webshare proxies using user's API key and store in local DB
 */
public function fetchWebshareProxies(Request $request)
{
    $request->validate([
        'api_key' => 'required|string',
    ]);

    $userId = auth('api')->id();
    $apiKey = $request->input('api_key');

    $client = new \GuzzleHttp\Client([
        'base_uri' => 'https://proxy.webshare.io/api/v2/',
        'timeout'  => 25,
        'headers' => [
            'Authorization' => "Token {$apiKey}",
            'Accept'        => 'application/json',
        ],
    ]);

    $page = 1;
    $pageSize = 100;
    $saved = [];

    try {
        do {
            // Proper Webshare endpoint
            $response = $client->get("proxy/list/?mode=direct&page={$page}&page_size={$pageSize}");
            $json = json_decode($response->getBody()->getContents(), true);

            if (empty($json['results'])) {
                break;
            }

            foreach ($json['results'] as $proxy) {
                // Skip duplicates
                if (IpAddress::where('ip_address', $proxy['proxy_address'])->exists()) {
                    continue;
                }

                $saved[] = IpAddress::create([
                    'uuid'       => Str::uuid(),
                    'user_id'    => $userId,
                    'ip_address' => $proxy['proxy_address'],
                    'port'       => $proxy['port'] ?? null,
                    'username'   => $proxy['username'] ?? null,
                    'password'   => $proxy['password'] ?? null,
                    'type'       => 'proxy',
                    'provider'   => 'Webshare',
                    'location'   => json_encode([
                        'country' => $proxy['country_code'] ?? null,
                        'city'    => $proxy['city_name'] ?? null,
                    ]),
                    'is_active'   => true,
                    'is_assigned' => false,
                ]);
            }

            $page++;

        } while (!empty($json['next'])); // Webshare pagination

        return response()->json([
            'success' => true,
            'message' => 'Webshare proxies fetched and stored successfully',
            'saved_count' => count($saved),
            'data' => $saved,
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch proxies: ' . $e->getMessage(),
        ], 500);
    }
}

}
