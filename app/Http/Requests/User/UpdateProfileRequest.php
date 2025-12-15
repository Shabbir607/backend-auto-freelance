<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Authorize the request.
     */
    public function authorize(): bool
    {
        return true; // Authenticated users can update their profile
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [
            'company_name' => 'nullable|string|max:150',
            'job_title'    => 'nullable|string|max:100',
            'bio'          => 'nullable|string',
            'phone_number' => 'nullable|string|max:30',
            'address_line1'=> 'nullable|string|max:255',
            'address_line2'=> 'nullable|string|max:255',
            'city'         => 'nullable|string|max:100',
            'state'        => 'nullable|string|max:100',
            'postal_code'  => 'nullable|string|max:30',
            'country'      => 'nullable|string|max:100',
            'avatar_url'   => 'nullable|url|max:255',
            'timezone'     => 'nullable|string|max:100',
            'language'     => 'nullable|string|max:10',
            'website_url'  => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url'  => 'nullable|url|max:255',
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'company_name.string' => 'Company name must be a valid string.',
            'company_name.max'    => 'Company name cannot exceed 150 characters.',
            'job_title.string'    => 'Job title must be a valid string.',
            'job_title.max'       => 'Job title cannot exceed 100 characters.',
            'bio.string'          => 'Bio must be text only.',
            'phone_number.max'    => 'Phone number cannot exceed 30 characters.',
            'address_line1.max'   => 'Address line 1 cannot exceed 255 characters.',
            'address_line2.max'   => 'Address line 2 cannot exceed 255 characters.',
            'city.max'            => 'City cannot exceed 100 characters.',
            'state.max'           => 'State cannot exceed 100 characters.',
            'postal_code.max'     => 'Postal code cannot exceed 30 characters.',
            'country.max'         => 'Country name cannot exceed 100 characters.',
            'avatar_url.url'      => 'Avatar URL must be a valid link.',
            'timezone.max'        => 'Timezone cannot exceed 100 characters.',
            'language.max'        => 'Language code cannot exceed 10 characters.',
            'website_url.url'     => 'Website URL must be a valid link.',
            'linkedin_url.url'    => 'LinkedIn URL must be a valid link.',
            'facebook_url.url'    => 'Facebook URL must be a valid link.',
            'twitter_url.url'     => 'Twitter URL must be a valid link.',
        ];
    }

    /**
     * Handle failed validation with a JSON response.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Invalid profile data. Please review and try again.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
