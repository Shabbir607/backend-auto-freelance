<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateIpAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'     => 'nullable|exists:users,id',
            'ip_address'  => 'required|ip|unique:ip_addresses,ip_address,' . $this->uuid . ',uuid',
            'type'        => 'required|in:static,dedicated,proxy,vpn,dynamic',
            'provider'    => 'nullable|string|max:100',
            'location'    => 'nullable|string',
            'is_active'   => 'boolean',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
