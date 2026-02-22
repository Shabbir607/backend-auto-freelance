<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkflowView extends Model
{
    protected $fillable = ['workflow_id', 'ip_address'];

    public function workflow()
    {
        return $this->belongsTo(\App\Models\Workflow::class);
    }
}
