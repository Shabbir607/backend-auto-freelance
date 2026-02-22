<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Model;

class FaqController extends Controller
{
    /**
     * Polymorphic type map
     */
    private const FAQABLE_MAP = [
        'blog'     => \App\Models\Blog::class,
        'workflow' => \App\Models\Workflow::class,
        'page'     => \App\Models\Page::class,
    ];

    /**
     * List FAQs (with filters & pagination)
     */
    public function index(Request $request)
    {
        $faqs = Faq::query()
            ->when($request->filled('faqable_type'), function ($q) use ($request) {
                if (isset(self::FAQABLE_MAP[$request->faqable_type])) {
                    $q->where('faqable_type', self::FAQABLE_MAP[$request->faqable_type]);
                }
            })
            ->when($request->filled('faqable_id'), fn ($q) =>
                $q->where('faqable_id', $request->faqable_id)
            )
            ->when($request->filled('status'), fn ($q) =>
                $q->where('status', $request->boolean('status'))
            )
            ->orderBy('sort_order')
            ->latest()
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $faqs,
        ]);
    }

    /**
     * Store a newly created FAQ
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question'      => 'required|string|max:500',
            'answer'        => 'required|string',
            'faqable_type'  => ['required', Rule::in(array_keys(self::FAQABLE_MAP))],
            'faqable_id'    => 'required|integer|min:1',
            'status'        => 'sometimes|boolean',
            'sort_order'    => 'sometimes|integer|min:0',
        ]);

        $modelClass = self::FAQABLE_MAP[$validated['faqable_type']];

        // Ensure related model exists
        if (! $modelClass::whereKey($validated['faqable_id'])->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid faqable_id for selected faqable_type',
            ], 422);
        }

        $faq = Faq::create([
            'question'      => $validated['question'],
            'answer'        => $validated['answer'],
            'faqable_type'  => $modelClass,
            'faqable_id'    => $validated['faqable_id'],
            'status'        => $validated['status'] ?? true,
            'sort_order'    => $validated['sort_order'] ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'data' => $faq,
            'message' => 'FAQ created successfully',
        ], 201);
    }

    /**
     * Show single FAQ
     */
    public function show(Faq $faq)
    {
        return response()->json([
            'success' => true,
            'data' => $faq,
        ]);
    }

    /**
     * Update FAQ
     */
    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question'   => 'sometimes|required|string|max:500',
            'answer'     => 'sometimes|required|string',
            'status'     => 'sometimes|boolean',
            'sort_order' => 'sometimes|integer|min:0',
        ]);

        $faq->update($validated);

        return response()->json([
            'success' => true,
            'data' => $faq,
            'message' => 'FAQ updated successfully',
        ]);
    }

    /**
     * Delete FAQ
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->json([
            'success' => true,
            'message' => 'FAQ deleted successfully',
        ]);
    }
}
