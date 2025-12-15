<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\PlatformAccount;
use App\Models\IpAddress;

class VerifyAccountIp
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        $accountUuid = $request->route('uuid');      // PlatformAccount UUID
        $ipUuid = $request->route('ip_uuid');       // Assigned IP UUID

        if (!$accountUuid || !$ipUuid) {
            abort(400, 'Account UUID and IP UUID are required.');
        }

        // Fetch IP and verify it belongs to authenticated user
        $ip = IpAddress::where('uuid', $ipUuid)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if (!$ip->is_assigned) {
            abort(403, 'This IP is not assigned to any account.');
        }

        // Fetch PlatformAccount and ensure it belongs to authenticated user
        $account = PlatformAccount::with('ipAddress')
            ->where('uuid', $accountUuid)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if (!$account->ipAddress || $account->ipAddress->uuid !== $ip->uuid) {
            abort(403, 'This IP is not authorized for this account.');
        }

        // Optional: enforce that the request is coming from this IP
        $clientIp = $request->header('X-Forwarded-For') ?? $request->ip();
        if ($clientIp !== $ip->ip_address) {
            abort(403, 'Request is coming from an unauthorized IP.');
        }

        return $next($request);
    }
}
