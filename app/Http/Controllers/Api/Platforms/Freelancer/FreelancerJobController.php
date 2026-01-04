<?php

namespace App\Http\Controllers\Api\Platforms\Freelancer;

use App\Http\Controllers\Controller;
use App\Services\Freelancer\FreelancerJobService;
use Illuminate\Http\Request;
use Exception;

class FreelancerJobController extends Controller
{
    protected FreelancerJobService $service;

    public function __construct(FreelancerJobService $service)
    {
        $this->service = $service;
    }

    /**
     * Helper to get the user's active Freelancer account if logged in
     */
    private function getAccount()
    {
        $user = auth('api')->user();
        if (!$user) {
            return null;
        }

        return \App\Models\PlatformAccount::where('user_id', $user->id)
            ->whereHas('platform', function($q) {
                $q->where('slug', 'freelancer');
            })
            ->where('status', 'active')
            ->first();
    }

    /**
     * GET /freelancer/jobs
     */
    public function listJobs(Request $request)
    {
        try {
            return response()->json(
                $this->service->listJobs($request->all(), $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * GET /freelancer/jobs/search
     */
    public function searchJobs(Request $request)
    {
        try {
            return response()->json(
                $this->service->searchJobs($request->all(), $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * GET /freelancer/job-bundles
     */
    public function jobBundles(Request $request)
    {
        try {
            return response()->json(
                $this->service->jobBundles($request->all(), $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * GET /freelancer/job-bundle-categories
     */
    public function jobBundleCategories(Request $request)
    {
        try {
            return response()->json(
                $this->service->jobBundleCategories($request->all(), $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * 🔥 GET /freelancer/projects
     * Accepts ALL parameters from request:
     * jobs[], limit, offset, query, min_budget, max_budget, full_description, sort
     */
    public function listProjects(Request $request)
    {
        try {
            return response()->json(
                $this->service->listProjects($request->all(), $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    /**
     * 🔥 GET /freelancer/projects/{id}
     */
    public function getProject($id)
    {
        try {
            return response()->json(
                $this->service->getProject((int) $id, $this->getAccount())
            );
        } catch (Exception $e) {
            return $this->error($e);
        }
    }

    private function error(Exception $e)
    {
        return response()->json([
            'success' => false,
            'error'   => $e->getMessage()
        ], 500);
    }
}
