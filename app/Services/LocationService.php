<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Stevebauman\Location\Facades\Location;
use App\Models\IpAddress;
use Exception;

class LocationService
{
    protected Request $request;
    protected string $cacheTag = 'geoip';
    protected int $cacheTtl = 3600; // 1 hour

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Get client IP from request
     */
    public function getIp(): string
    {
        return $this->request->ip() ?? '127.0.0.1';
    }

    /**
     * Get location details based on request IP
     */
    public function getLocation(): array
    {
        $ip = $this->getIp();

        try {
            if (Cache::getStore() instanceof \Illuminate\Cache\TaggableStore) {
                return Cache::tags($this->cacheTag)
                            ->remember("geoip_{$ip}", $this->cacheTtl, fn() => $this->resolveLocation($ip));
            }

            return Cache::remember("geoip_{$ip}", $this->cacheTtl, fn() => $this->resolveLocation($ip));
        } catch (Exception $e) {
            return ['ip' => $ip, 'error' => $e->getMessage()];
        }
    }

    /**
     * Resolve location using Stevebauman/location
     */
    protected function resolveLocation(string $ip): array
    {
        try {
            $position = Location::get($ip);

            if (!$position || !$position->countryCode) {
                return $this->defaultLocation($ip);
            }

            return [
                'ip' => $ip,
                'city' => $position->cityName,
                'region' => $position->regionName,
                'country' => $position->countryName,
                'country_code' => $position->countryCode,
                'latitude' => $position->latitude,
                'longitude' => $position->longitude,
                'timezone' => $position->timezone,
                'currency' => $this->getCurrencyByCountry($position->countryCode),
                'language' => $this->getLanguageByCountry($position->countryCode),
                'provider' => $position->provider ?? null,
            ];
        } catch (Exception $e) {
            return ['ip' => $ip, 'error' => $e->getMessage()];
        }
    }

    /**
     * Create or update IP record for a given user
     */
    public function createOrUpdateForUser(int $userId): IpAddress
    {
        $ip = $this->getIp();
        
        // Check if IP already exists
        $ipRecord = IpAddress::where('ip_address', $ip)->first();

        // If IP exists, return it without updating (per user request and to avoid duplicates)
        if ($ipRecord) {
            return $ipRecord;
        }

        // If IP does not exist, create a new record
        $location = $this->getLocation();

        $ipRecord = new IpAddress();
        $ipRecord->user_id = $userId;
        $ipRecord->ip_address = $ip;
        
        $ipRecord->fill([
            'type' => 'dynamic',
            'provider' => $location['provider'] ?? null,
            'location' => json_encode([
                'city' => $location['city'] ?? null,
                'region' => $location['region'] ?? null,
                'country' => $location['country'] ?? null,
                'country_code' => $location['country_code'] ?? null,
                'latitude' => $location['latitude'] ?? null,
                'longitude' => $location['longitude'] ?? null,
                'timezone' => $location['timezone'] ?? null,
            ]),
            'is_active' => true,
            'is_assigned' => true,
            'assigned_at' => now(),
        ]);

        $ipRecord->save();

        return $ipRecord;
    }

    protected function defaultLocation(string $ip): array
    {
        return [
            'ip' => $ip,
            'city' => 'New York',
            'region' => 'New York',
            'country' => 'United States',
            'country_code' => 'US',
            'latitude' => 40.7128,
            'longitude' => -74.0060,
            'timezone' => 'America/New_York',
            'currency' => 'USD',
            'language' => 'en',
        ];
    }

    protected function getCurrencyByCountry(?string $countryCode): string
    {
        $map = [
            'US' => 'USD', 'GB' => 'GBP', 'CA' => 'CAD', 'AU' => 'AUD',
            'PK' => 'PKR', 'IN' => 'INR', 'FR' => 'EUR', 'DE' => 'EUR',
        ];
        return $map[$countryCode] ?? 'USD';
    }

    protected function getLanguageByCountry(?string $countryCode): string
    {
        $map = [
            'US' => 'en', 'GB' => 'en', 'CA' => 'en', 'AU' => 'en',
            'PK' => 'ur', 'IN' => 'hi', 'FR' => 'fr', 'DE' => 'de',
        ];

        $headerLang = $this->request->header('Accept-Language');
        if ($headerLang) {
            return substr($headerLang, 0, 2);
        }

        return $map[$countryCode] ?? 'en';
    }
}
