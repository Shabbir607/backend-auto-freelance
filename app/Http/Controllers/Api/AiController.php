<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AiService;
use Illuminate\Http\Request;

class AiController extends Controller
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function run(Request $request)
    {
        $request->validate([
            'provider' => 'required|string|in:ollama,gemini,openai,grok',
            'model'    => 'required|string',
            'prompt'   => 'required|string',
            'options'  => 'nullable|array',
        ]);

        try {
            $response = $this->aiService->run(
                $request->input('provider'),
                $request->input('model'),
                $request->input('prompt'),
                $request->input('options', [])
            );

            return response()->json(['response' => $response]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
