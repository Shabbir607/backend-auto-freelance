<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkflowIntegration extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'url',
    ];

    public function workflows()
    {
        return $this->belongsToMany(Workflow::class, 'workflow_integration_pivot', 'integration_id', 'workflow_id');
    }
}
