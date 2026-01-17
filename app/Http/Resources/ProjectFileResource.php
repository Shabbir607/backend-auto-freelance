<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectFileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'path'      => $this->path,
            'type'      => $this->type,
            'size'      => $this->size,
            'uploaded_at' => $this->created_at,
            'uploader'  => $this->whenLoaded('uploader', function () {
                return [
                    'id'   => $this->uploader->id,
                    'name' => $this->uploader->name,
                    'role' => $this->uploader->role,
                ];
            }),
        ];
    }
}
