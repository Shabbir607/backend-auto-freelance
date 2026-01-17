<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorkflowIntegration;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WorkflowIntegrationController extends Controller
{
    public function index()
    {
        $integrations = WorkflowIntegration::all();
        return response()->json($integrations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $integration = WorkflowIntegration::create($validated);

        return response()->json($integration, 201);
    }

    public function show($id)
    {
        $integration = WorkflowIntegration::findOrFail($id);
        return response()->json($integration);
    }

    public function update(Request $request, $id)
    {
        $integration = WorkflowIntegration::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:255',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $integration->update($validated);

        return response()->json($integration);
    }

    public function destroy($id)
    {
        $integration = WorkflowIntegration::findOrFail($id);
        $integration->delete();

        return response()->json(null, 204);
    }
}
