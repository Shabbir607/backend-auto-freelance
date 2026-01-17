<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\ContestService;
use Illuminate\Http\Request;

class ContestController extends Controller
{
    protected ContestService $contestService;

    public function __construct(ContestService $contestService)
    {
        $this->contestService = $contestService;
    }

    public function index(Request $request, string $platformSlug, string $uuid)
    {
        $params = $request->all();
        $result = $this->contestService->listContests($platformSlug, $request->user()->id, $params);
        return response()->json($result);
    }

    public function store(Request $request, string $platformSlug, string $uuid)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'currency' => 'required|array',
            'budget' => 'required|array',
            'jobs' => 'required|array',
            'duration' => 'required|integer',
        ]);

        $result = $this->contestService->createContest($platformSlug, $request->user()->id, $data);
        return response()->json($result);
    }

    public function show(Request $request, string $platformSlug, string $uuid, int $contestId)
    {
        $result = $this->contestService->getContest($platformSlug, $request->user()->id, $contestId);
        return response()->json($result);
    }

    public function update(Request $request, string $platformSlug, string $uuid, int $contestId)
    {
        $data = $request->all();
        $result = $this->contestService->updateContest($platformSlug, $request->user()->id, $contestId, $data);
        return response()->json($result);
    }

    public function searchActive(Request $request, string $platformSlug, string $uuid)
    {
        $params = $request->all();
        $result = $this->contestService->searchActiveContests($platformSlug, $request->user()->id, $params);
        return response()->json($result);
    }

    public function searchAll(Request $request, string $platformSlug, string $uuid)
    {
        $params = $request->all();
        $result = $this->contestService->searchAllContests($platformSlug, $request->user()->id, $params);
        return response()->json($result);
    }
}
