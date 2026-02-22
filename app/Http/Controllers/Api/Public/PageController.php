<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function show(Request $req)
    {
        // ... (existing show implementation)
        $originalSlug = $req->slug;

        if (!$originalSlug) {
            return response()->json([
                'success' => false,
                'message' => 'Slug is required.',
            ], 400);
        }

        // Normalize slug
        $normalizedSlug = trim($originalSlug);
        $normalizedSlug = urldecode($normalizedSlug);
        $normalizedSlug = Str::slug($normalizedSlug); // about-us test -> about-us-test

        // Cache key based on slug
        $cacheKey = "page_details_{$normalizedSlug}";

        $response = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($originalSlug, $normalizedSlug) {
            // ✅ Try multiple slug matching strategies
            $page = Page::where('is_active', true)
                ->where(function ($query) use ($originalSlug, $normalizedSlug) {
                    $query->where('slug', $originalSlug)      // exact match (DB has spaces)
                          ->orWhere('slug', $normalizedSlug)  // normalized match
                          ->orWhereRaw("REPLACE(slug, ' ', '-') = ?", [$normalizedSlug]); // smart match
                })
                ->with(['faqs' => function ($query) {
                    $query->where('status', true)->orderBy('sort_order');
                }])
                ->first();

            // ❌ Page not found
            if (!$page) {
                return null;
            }

            // ✅ SEO meta tags
            $metaTags = $page->meta_tags ?? [];

            $seo = [
                'id' => $page->id,
                'title' => $page->meta_title ?? $page->title,
                'description' => $page->meta_description,
                'keywords' => $page->meta_keywords,
                'canonical' => url(Str::slug($page->slug)), // canonical should be SEO slug
                'og_image' => $page->og_image,
                'meta_tags' => $metaTags,
                'structured_data' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'WebPage',
                    'name' => $page->title,
                    'description' => $page->meta_description,
                    'url' => url(Str::slug($page->slug)),
                ]
            ];

            return [
                'success' => true,
                'data' => $page,
                'seo' => $seo,
            ];
        });

        if (!$response) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found.',
                'slug' => $originalSlug,
                'normalized_slug' => $normalizedSlug,
            ], 404);
        }

        return response()->json($response);
    }

    /**
     * Get list of all active page slugs
     */
    public function slugs()
    {
        // Cache for 1 hour to reduce DB load
        $slugs = \Illuminate\Support\Facades\Cache::remember('public_page_slugs', 3600, function () {
            return Page::where('is_active', true)->pluck('slug')->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $slugs
        ]);
    }
}
