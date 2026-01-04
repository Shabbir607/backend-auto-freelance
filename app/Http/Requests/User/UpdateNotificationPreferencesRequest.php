<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationPreferencesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email_new_messages' => 'boolean',
            'email_project_updates' => 'boolean',
            'email_payments' => 'boolean',
            'email_marketing' => 'boolean',
            'push_new_messages' => 'boolean',
            'push_project_updates' => 'boolean',
            'push_payments' => 'boolean',
            'in_app_all' => 'boolean',
        ];
    }
}
