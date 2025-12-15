<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreIpAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'     => 'nullable|exists:users,id',
            'ip_address'  => 'required|ip|unique:ip_addresses,ip_address',
            'type'        => 'required|in:static,dedicated,proxy,vpn,dynamic',
            'provider'    => 'nullable|string|max:100',
            'location'    => 'nullable|string',
            'is_active'   => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'ip_address.required' => 'IP address is required.',
            'ip_address.ip' => 'Invalid IP format.',
            'ip_address.unique' => 'This IP address already exists.',
            'type.in' => 'Type must be one of: static, dedicated, proxy, vpn, dynamic.',
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
