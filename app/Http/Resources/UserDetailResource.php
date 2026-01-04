<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'company_name' => $this->company_name,
            'job_title' => $this->job_title,
            'bio' => $this->bio,
            'hourly_rate' => $this->hourly_rate,
            'availability' => $this->availability,
            'phone_number' => $this->phone_number,
            'address_line1' => $this->address_line1,
            'address_line2' => $this->address_line2,
            'city' => $this->city,
            'state' => $this->state,
            'postal_code' => $this->postal_code,
            'country' => $this->country,
            'location' => $this->location,
            'avatar_url' => $this->avatar_url,
            'timezone' => $this->timezone,
            'language' => $this->language,
            'payment_info' => $this->payment_info ?? [],
            'notification_preferences' => $this->notification_preferences ?? [],
            'privacy_settings' => $this->privacy_settings ?? [],
            'social_links' => [
                'website' => $this->website_url,
                'linkedin' => $this->linkedin_url,
                'facebook' => $this->facebook_url,
                'twitter' => $this->twitter_url,
                'github' => $this->github_url,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
