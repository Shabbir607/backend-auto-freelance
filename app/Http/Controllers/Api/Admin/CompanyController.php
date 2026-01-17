<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;

class CompanyController extends Controller
{
    /**
     * Display a listing of the companies (agencies).
     */
    public function index(Request $request)
    {
        try {
            $query = User::role('agency');

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('email', 'like', '%' . $request->search . '%');
            }

            $companies = $query->paginate(15);

            return response()->json(['success' => true, 'data' => $companies]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified company.
     */
    public function show($id)
    {
        try {
            $company = User::role('agency')->findOrFail($id);
            return response()->json(['success' => true, 'data' => $company]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => 'Company not found or error retrieving details.'], 404);
        }
    }

    /**
     * Update the specified company.
     */
    public function update(Request $request, $id)
    {
        try {
            $company = User::role('agency')->findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                // Add other fields as necessary
            ]);

            $company->update($validated);

            return response()->json(['success' => true, 'data' => $company, 'message' => 'Company updated successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified company from storage.
     */
    public function destroy($id)
    {
        try {
            $company = User::role('agency')->findOrFail($id);
            $company->delete();

            return response()->json(['success' => true, 'message' => 'Company deleted successfully.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
