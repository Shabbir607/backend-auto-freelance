<?php

namespace App\Services;

class IpService
{
    protected $countriesData;

    public function __construct()
    {
        $path = storage_path('app/private/countries.json');

        if (!file_exists($path)) {
            throw new \Exception("Countries JSON file not found at {$path}");
        }

        $json = file_get_contents($path);
        $this->countriesData = json_decode($json, true);

        if (!$this->countriesData) {
            throw new \Exception("Invalid JSON in countries file.");
        }
    }

    /**
     * Generate valid public IPv4 with realistic country/city
     */
    public function generateValidPublicIp(): array
    {
        do {
            $ip = rand(1, 255) . '.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 254);
        } while (
            !filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)
        );

        // Pick random country and city from JSON
        $country = array_rand($this->countriesData);
        $cities = $this->countriesData[$country];
        $city = $cities[array_rand($cities)];

        // Random fake ISP and coordinates
        $isps = ["Vodafone","Telenor","AT&T","Verizon","T-Mobile","Jazz","Zong","China Mobile","SoftBank","NTT","Orange"];
        $isp = $isps[array_rand($isps)];

        return [
            'ip'        => $ip,
            'country'   => $country,
            'city'      => $city,
            'isp'       => $isp,
            'latitude'  => round(rand(-90000, 90000) / 1000, 6),   // -90 to 90
            'longitude' => round(rand(-180000, 180000) / 1000, 6) // -180 to 180
        ];
    }

    /**
     * Validate IP
     */
    public function validateIp(string $ip): array
    {
        $isValid = filter_var($ip, FILTER_VALIDATE_IP) !== false;
        $isPublic = filter_var(
            $ip,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
        ) !== false;

        return [
            'ip' => $ip,
            'valid' => $isValid,
            'public' => $isPublic,
            'type' => $isValid ? 'IPv4/IPv6' : 'Invalid',
        ];
    }
}
