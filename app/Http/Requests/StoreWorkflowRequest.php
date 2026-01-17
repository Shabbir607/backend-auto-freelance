<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreWorkflowRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255|unique:workflows,title',
            'category_id' => 'required|exists:workflow_categories,id',
            'description' => 'required|string',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'price' => 'nullable|numeric|min:0',
            'time_saved_value' => 'required|integer|min:0',
            'time_saved_unit' => 'required|in:minutes,hours,days',
            'roi_percentage' => 'nullable|integer|min:0',
            'nodes_count' => 'nullable|integer|min:0',
            'user_count' => 'nullable|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'status' => 'required|in:draft,published',

            // JSON Data or File
            'json_file' => 'nullable|file|mimes:json|max:10240',
            'json_data' => 'required_without:json_file|nullable|array',

            'workflow_features' => 'nullable|array',
            'workflow_nodes' => 'nullable|array',

            'integration_ids' => 'nullable|array',
            'integration_ids.*' => 'exists:workflow_integrations,id',
            
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:workflow_categories,id',
        ];
    }

    /**
     * Custom validation error response (IMPORTANT)
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422)
        );
    }

    /**
     * Optional: Custom human-readable messages
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Workflow title is required.',
            'category_id.required' => 'Workflow category is required.',
            'category_id.exists' => 'Selected category does not exist.',
            'json_data.required_without' => 'JSON data is required if no JSON file is uploaded.',
            'json_file.mimes' => 'Only JSON files are allowed.',
            'time_saved_value.required' => 'Time saved value is required.',
            'time_saved_unit.required' => 'Time saved unit is required.',
        ];
    }
}
