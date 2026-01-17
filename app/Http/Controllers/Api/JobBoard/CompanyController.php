<?php

namespace App\Http\Controllers\Api\JobBoard;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Company::query();

        if ($request->has('keyword')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->keyword . '%');
            });
        }

        $companies = $query->with(['user', 'industry', 'organization', 'team_size'])->paginate(10);

        return response()->json($companies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'industry_type_id' => 'required|exists:industry_types,id',
            'organization_type_id' => 'required|exists:organization_types,id',
            'team_size_id' => 'nullable|exists:team_sizes,id',
            'establishment_date' => 'nullable|date',
            'website' => 'nullable|url',
        ]);

        $company = Company::create($validated);

        return response()->json($company, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $company = Company::with(['user', 'industry', 'organization', 'team_size', 'jobs'])->findOrFail($id);
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'industry_type_id' => 'sometimes|exists:industry_types,id',
            'organization_type_id' => 'sometimes|exists:organization_types,id',
            'team_size_id' => 'nullable|exists:team_sizes,id',
            'establishment_date' => 'nullable|date',
            'website' => 'nullable|url',
            'bio' => 'nullable|string',
            'vision' => 'nullable|string',
        ]);

        $company->update($validated);

        return response()->json($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();

        return response()->json(['message' => 'Company deleted successfully']);
    }
}
