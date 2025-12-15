<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\UtilityService;
use Exception;

class UtilityController extends Controller
{
    protected $utilityService;

    public function __construct(UtilityService $utilityService)
    {
        $this->utilityService = $utilityService;
    }

    public function categories($platform_slug)
    {
        try {
            $categories = $this->utilityService->getCategories($platform_slug);
            return response()->json($categories);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function countries($platform_slug)
    {
        try {
            $countries = $this->utilityService->getCountries($platform_slug);
            return response()->json($countries);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function currencies($platform_slug)
    {
        try {
            $currencies = $this->utilityService->getCurrencies($platform_slug);
            return response()->json($currencies);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
