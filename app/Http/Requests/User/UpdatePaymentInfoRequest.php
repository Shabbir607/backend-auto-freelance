<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentInfoRequest extends FormRequest
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
            'payment_method' => 'required|string|in:bank,paypal,stripe,wise',
            'bank_name' => 'required_if:payment_method,bank|nullable|string|max:255',
            'account_number' => 'required_if:payment_method,bank|nullable|string|max:255',
            'routing_number' => 'required_if:payment_method,bank|nullable|string|max:255',
            'paypal_email' => 'required_if:payment_method,paypal|nullable|email|max:255',
            'stripe_connected' => 'boolean',
        ];
    }
}
