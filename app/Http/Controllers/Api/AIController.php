<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Services\OpenWebUIService;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Http\Request;

class AIController extends Controller
{
    protected OpenWebUIService $ai;

    public function __construct(OpenWebUIService $ai)
    {
        $this->ai = $ai;
    }

    /**
     * Handle normal chat response
     */
    public function chat(Request $request)
    {
        $prompt = $request->input('prompt');

        if (!$prompt) {
            return response()->json(['error' => 'Prompt is required'], 422);
        }

        return response()->json($this->ai->chat($prompt));
    }

    /**
     * Handle streaming response
     */
    public function stream(Request $request)
    {
        $prompt = $request->input('prompt');

        if (!$prompt) {
            return response()->json(['error' => 'Prompt is required'], 422);
        }

        $response = new StreamedResponse(function () use ($prompt) {
            $stream = $this->ai->stream($prompt);

            foreach ($stream as $chunk) {
                echo "data: " . $chunk . "\n\n";
                ob_flush();
                flush();
            }

            echo "data: [DONE]\n\n";
            ob_flush();
            flush();
        });

        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('X-Accel-Buffering', 'no'); // Important for NGINX
        $response->headers->set('Connection', 'keep-alive');

        return $response;
    }
}
