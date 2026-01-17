<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkflowRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Get the workflow ID from the route, assuming the route parameter is 'workflow'
        $workflowId = $this->route('workflow') ? $this->route('workflow')->id : $this->route('id');
        
        // If route uses simple {id} param
        if (!$workflowId && $this->route('id')) {
             $workflowId = $this->route('id');
        }

        return [
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                \Illuminate\Validation\Rule::unique('workflows', 'title')->ignore($workflowId),
            ],
            'category_id' => 'sometimes|required|exists:workflow_categories,id',
            'description' => 'sometimes|required|string',
            'difficulty' => 'sometimes|required|in:beginner,intermediate,advanced',
            'price' => 'nullable|numeric|min:0',
            'time_saved_value' => 'sometimes|required|integer|min:0',
            'time_saved_unit' => 'sometimes|required|in:minutes,hours,days',
            'roi_percentage' => 'nullable|integer|min:0',
            'nodes_count' => 'nullable|integer|min:0',
            'user_count' => 'nullable|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'status' => 'sometimes|required|in:draft,published',
            
            // JSON Data or File
            'json_file' => 'nullable|file|mimes:json|max:10240',
            'json_data' => 'nullable|array',
            
            'workflow_features' => 'nullable|array',
            'workflow_nodes' => 'nullable|array',
            
            'integration_ids' => 'nullable|array',
            'integration_ids.*' => 'exists:workflow_integrations,id',

            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:workflow_categories,id',
        ];
    }
}
