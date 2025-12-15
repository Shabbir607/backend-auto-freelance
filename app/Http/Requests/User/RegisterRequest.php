<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    /**
     * Authorize the request
     */
    public function authorize(): bool
    {
        return true; // Allow public registration
    }

    /**
     * Validation rules
     */
    public function rules(): array
    {
        return [
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|string|min:6',
        ];
    }

    /**
     * Custom error messages
     */
    public function messages(): array
    {
        return [
            'name.required'         => 'Please provide your full name.',
            'name.string'           => 'Name must be a valid string.',
            'email.required'        => 'Email address is required.',
            'email.email'           => 'Please provide a valid email address.',
            'email.unique'          => 'This email is already registered.',
            'password.required'     => 'Password is required.',
        ];
    }

    /**
     * Custom failed validation response (JSON)
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Invalid input. Please correct the highlighted fields.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
