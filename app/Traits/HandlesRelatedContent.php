<?php

namespace App\Traits;

use App\Models\Blog;
use App\Models\Workflow;
use Illuminate\Support\Str;

trait HandlesRelatedContent
{
    /**
     * Get related workflows for a blog post based on keywords.
     */
    protected function getWorkflowsRelatedToBlog(Blog $blog, $limit = 4)
    {
        return $this->getRelatedWorkflows($blog, $limit);
    }

    /**
     * Get related workflows for another workflow based on keywords.
     */
    protected function getWorkflowsRelatedToWorkflow(Workflow $workflow, $limit = 4)
    {
        return $this->getRelatedWorkflows($workflow, $limit, $workflow->id);
    }

    /**
     * Get suggested blogs for a workflow based on keywords.
     */
    protected function getBlogsRelatedToWorkflow(Workflow $workflow, $limit = 6)
    {
        $keywords = $this->extractKeywords($workflow->title);

        $query = Blog::where('status', 'published');

        if (!empty($keywords)) {
            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhere('title', 'like', '%' . $keyword . '%')
                      ->orWhere('description', 'like', '%' . $keyword . '%');
                }
            });
        }

        $results = $query->take($limit)->get();

        // If not enough results, fill with featured/latest blogs
        if ($results->count() < $limit) {
            $filler = Blog::where('status', 'published')
                ->whereNotIn('id', $results->pluck('id'))
                ->orderBy('is_featured', 'desc')
                ->latest()
                ->take($limit - $results->count())
                ->get();
            $results = $results->concat($filler);
        }

        return $results;
    }

    /**
     * Internal helper to fetch workflows by keywords.
     */
    private function getRelatedWorkflows($source, $limit, $excludeId = null)
    {
        $keywords = $this->extractKeywords($source->title);

        $query = Workflow::where('status', 'published');
        
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        if (!empty($keywords)) {
            $query->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $q->orWhere('title', 'like', '%' . $keyword . '%')
                      ->orWhere('description', 'like', '%' . $keyword . '%');
                }
            });
        } elseif ($source instanceof Blog && $source->category) {
            // Fallback to category search if no keywords found (only for blogs)
            $categoryName = $source->category->title;
            $query->orWhereHas('category', function($q) use ($categoryName) {
                $q->where('title', 'like', '%' . $categoryName . '%');
            });
        }

        $results = $query->take($limit)->get();

        // If not enough results, fill with random latest workflows
        if ($results->count() < $limit) {
            $filler = Workflow::where('status', 'published')
                ->whereNotIn('id', array_merge($results->pluck('id')->toArray(), $excludeId ? [$excludeId] : []))
                ->latest()
                ->take($limit - $results->count())
                ->get();
            $results = $results->concat($filler);
        }

        return $results;
    }

    /**
     * Extract significant keywords from a string.
     */
    private function extractKeywords($string)
    {
        // Remove special characters and numbers
        $clean = preg_replace('/[0-9\W_]+/', ' ', $string);
        $words = explode(' ', strtolower($clean));
        
        // Filter out short words and common stop words
        $stopWords = ['with', 'from', 'this', 'that', 'your', 'guide', 'best', 'using', 'between', 'instances', 'instances', 'than', 'them', 'they']; 
        
        $keywords = array_filter($words, function($word) use ($stopWords) {
            return strlen($word) > 3 && !in_array($word, $stopWords);
        });

        return array_unique($keywords);
    }
}
