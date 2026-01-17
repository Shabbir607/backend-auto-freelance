<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Services\TranslationService;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    /**
     * Initialize language settings for the client.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function init(Request $request)
    {
        $data = $this->translationService->getLocaleData($request);

        // Calculate cache control headers for performance
        // If language was explicit, we can cache longer. If auto-detected, maybe less.
        $headers = [
            'Cache-Control' => 'public, max-age=3600', // Cache for 1 hour
            'Vary' => 'Accept-Language',
        ];

        return response()->json([
            'success' => true,
            'data' => $data,
        ], 200, $headers);
    }
}
