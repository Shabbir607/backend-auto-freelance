<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Freelancer\ProjectService;
use Exception;

class ProjectController extends Controller
{
    protected ProjectService $projects;

    public function __construct(ProjectService $projects)
    {
        $this->projects = $projects;
    }

    /**
     * GET projects
     */
    public function listProjects(Request $request, $platform_slug)
    {
        try {
            $userId = $request->user('api')->id;

            $filters = $request->all();

            $projects = $this->projects->listProjects($platform_slug, $userId, $filters);

            return response()->json(['success' => true, 'data' => $projects]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * POST create project
     */
    public function createProject(Request $request, $platform_slug)
    {
        try {
            $userId = $request->user('api')->id;

            $project = $this->projects->createProject($platform_slug, $userId, $request->all());

            return response()->json(['success' => true, 'data' => $project]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * GET single project
     */
    public function getProject(Request $request, $platform_slug, $projectId)
    {
        try {
            $userId = $request->user('api')->id;

            $project = $this->projects->getProject($platform_slug, $userId, $projectId);

            return response()->json(['success' => true, 'data' => $project]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
