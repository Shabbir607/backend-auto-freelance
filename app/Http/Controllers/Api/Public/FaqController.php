<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Blog;
use App\Models\Workflow;

class FaqController extends Controller
{
    /**
     * Map of allowed faqable types
     */
    private const FAQABLE_MAP = [
        'page'     => Page::class,
        'blog'     => Blog::class,
        'workflow' => Workflow::class,
    ];

    /**
     * Fetch FAQs based on type and slug (public endpoint)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        // Validate query parameters
        $validated = $request->validate([
            'type' => 'required|string|in:' . implode(',', array_keys(self::FAQABLE_MAP)),
            'slug' => 'required|string',
        ]);

        $modelClass = self::FAQABLE_MAP[$validated['type']];

        // Find the parent by slug
        $parent = $modelClass::where('slug', $validated['slug'])->first();

        if (!$parent) {
            return response()->json([
                'success' => true,
                'data' => [],
                'message' => 'Parent entity not found',
            ]);
        }

        // Only fetch active FAQs for this parent
        $faqs = $parent->faqs()
            ->where('status', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($faq) {
                return [
                    'id'       => $faq->id,
                    'question' => $faq->question,
                    'answer'   => $faq->answer,
                    'order'    => $faq->sort_order,
                    'status'   => (bool)$faq->status,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $faqs,
        ]);
    }
}
