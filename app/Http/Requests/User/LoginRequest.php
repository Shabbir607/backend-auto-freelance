<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [
            'email'     => 'required|email',
            'password'  => 'required|string|min:6',
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'email.required'    => 'Please enter your email address.',
            'email.email'       => 'Please provide a valid email address.',
            'password.required' => 'Password is required to log in.',
            'password.string'   => 'Password must be a valid string.',
            'password.min'      => 'Password must be at least 6 characters long.',
        ];
    }

    /**
     * Custom failed validation response for API (JSON).
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Invalid login data. Please check your credentials.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
