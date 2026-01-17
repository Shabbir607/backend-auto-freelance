<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'slug',
        'difficulty',
        'price',
        'time_saved_value',
        'time_saved_unit',
        'roi_percentage',
        'nodes_count',
        'user_count',
        'rating',
        'json_data',
        'workflow_features',
        'workflow_nodes',
        'status',
        'json_file_name',
        'json_file_path',
        'external_id',
        'views',
        'recent_views',
        'total_views',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
        'json_data' => 'array',
        'workflow_features' => 'array',
        'workflow_nodes' => 'array',
        'roi_percentage' => 'integer',
        'nodes_count' => 'integer',
        'user_count' => 'integer',
        'time_saved_value' => 'integer',
        'views' => 'integer',
        'recent_views' => 'integer',
        'total_views' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(WorkflowCategory::class, 'category_id');
    }

    public function categories()
    {
        return $this->belongsToMany(WorkflowCategory::class, 'workflow_category_pivot', 'workflow_id', 'category_id');
    }

    public function integrations()
    {
        return $this->belongsToMany(WorkflowIntegration::class, 'workflow_integration_pivot', 'workflow_id', 'integration_id');
    }
}
