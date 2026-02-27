<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;

class BlogController extends Controller
{
    /**
     * List published blogs
     */
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 12);
        $search = $request->get('search', '');
        $category = $request->get('category', '');

        $cacheKey = "blogs_list_p{$page}_pp{$perPage}_s{$search}_c{$category}";

        $blogs = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($request, $perPage) {
            return Blog::published()
                ->with(['category', 'author:id,name,email']) // Select limited author fields for public
                ->when($request->search, function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%")
                          ->orWhere('description', 'like', "%{$search}%");
                })
                ->when($request->category, function ($query, $categorySlug) {
                    $query->whereHas('category', function ($q) use ($categorySlug) {
                        $q->where('slug', $categorySlug);
                    });
                })
                ->orderByDesc('is_featured') // Featured first
                ->orderByDesc('published_at')
                ->paginate($perPage);
        });

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    /**
     * Show single blog details
     */
    public function show($slug)
    {
        $cacheKey = "blog_details_{$slug}";

        $response = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($slug) {
            $blog = Blog::published()
                ->with(['category', 'author:id,name,email', 'faqs' => function ($query) {
                    $query->where('status', true)->orderBy('sort_order');
                }])
                ->where('slug', $slug)
                ->first();

            if (!$blog) {
                return null;
            }

            // SEO Expert: Dynamic Calculations
            $content = $blog->content ?? '';
            $wordCount = str_word_count(strip_tags($content));
            $readingTime = ceil($wordCount / 200); // Average 200 wpm

            $seo = [
                'id' => $blog->id,
                'title' => $blog->meta_title ?? $blog->title,
                'description' => $blog->meta_description ?? Str::limit(strip_tags($blog->description), 160),
                'keywords' => $blog->meta_keywords,
                'canonical' => 'https://edgelancer.com/blogs/' . $blog->slug,
                'og_type' => 'article',
                'og_image' => $blog->image,
                'twitter_card' => 'summary_large_image',
                'twitter_site' => '@edgelancer',
                'twitter_image' => $blog->image,
                'robots' => 'index, follow',
                'reading_time' => $readingTime . ' min read',
                'meta_tags' => [
                    ['name' => 'article:published_time', 'content' => $blog->published_at?->toIso8601String()],
                    ['name' => 'article:modified_time', 'content' => $blog->updated_at?->toIso8601String()],
                    ['name' => 'article:section', 'content' => $blog->category->title ?? 'Technology'],
                ], 
                'structured_data' => [
                    '@context' => 'https://schema.org',
                    '@graph' => [
                        // 1. BlogPosting
                        [
                            '@type' => 'BlogPosting',
                            '@id' => 'https://edgelancer.com/blogs/' . $blog->slug . '#blogposting',
                            'headline' => $blog->title,
                            'description' => $blog->meta_description ?? Str::limit(strip_tags($blog->description), 160),
                            'image' => $blog->image,
                            'datePublished' => $blog->published_at?->toIso8601String(),
                            'dateModified' => $blog->updated_at?->toIso8601String(),
                            'author' => [
                                '@type' => 'Person',
                                'name' => $blog->author->name ?? 'Admin',
                            ],
                            'publisher' => [
                                '@type' => 'Organization',
                                'name' => 'Edgelancer',
                                'logo' => [
                                    '@type' => 'ImageObject',
                                    'url' => 'https://edgelancer.com/favicon.png'
                                ]
                            ],
                            'mainEntityOfPage' => [
                                '@type' => 'WebPage',
                                '@id' => 'https://edgelancer.com/blogs/' . $blog->slug
                            ],
                            'wordCount' => $wordCount,
                            'timeRequired' => "PT{$readingTime}M"
                        ],
                        // 2. BreadcrumbList
                        [
                            '@type' => 'BreadcrumbList',
                            '@id' => 'https://edgelancer.com/blogs/' . $blog->slug . '#breadcrumb',
                            'itemListElement' => [
                                [
                                    '@type' => 'ListItem',
                                    'position' => 1,
                                    'name' => 'Home',
                                    'item' => url('/')
                                ],
                                [
                                    '@type' => 'ListItem',
                                    'position' => 2,
                                    'name' => 'Blogs',
                                    'item' => 'https://edgelancer.com/blogs'
                                ],
                                [
                                    '@type' => 'ListItem',
                                    'position' => 3,
                                    'name' => $blog->category->title ?? 'Category',
                                    'item' => 'https://edgelancer.com/blogs?category=' . ($blog->category->slug ?? 'all')
                                ],
                                [
                                    '@type' => 'ListItem',
                                    'position' => 4,
                                    'name' => $blog->title,
                                    'item' => 'https://edgelancer.com/blogs/' . $blog->slug
                                ]
                            ]
                        ]
                    ]
                ]
            ];

            // 3. Add FAQ Schema if exists
            if ($blog->faqs && $blog->faqs->count() > 0) {
                $faqSchema = [
                    '@type' => 'FAQPage',
                    'mainEntity' => []
                ];

                foreach ($blog->faqs as $faq) {
                    $faqSchema['mainEntity'][] = [
                        '@type' => 'Question',
                        'name' => $faq->question,
                        'acceptedAnswer' => [
                            '@type' => 'Answer',
                            'text' => $faq->answer
                        ]
                    ];
                }

                $seo['structured_data']['@graph'][] = $faqSchema;
            }

            return [
                'success' => true,
                'data' => $blog,
                'seo' => $seo
            ];
        });

        if (!$response) {
            abort(404, 'Blog not found');
        }

        // Increment Views (Optimistic / Async)
        // Fire and forget view increment on the DB directly to avoid clearing cache
        // But doing it here means every hit hits the DB. 
        // For "milliseconds" speed, we might want to defer this or sample it.
        // For now, let's keep it direct update. It's a lightweight query.
        Blog::where('slug', $slug)->increment('views');

        return response()->json($response);
    }
    
    /**
     * List categories
     */
    public function categories(Request $request)
    {
        $search = $request->input('search', '');
        $cacheKey = "blog_categories_s{$search}";

        $categories = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($search) {
            $query = BlogCategory::where('is_active', true);

            if ($search) {
                $query->where('title', 'like', "%{$search}%");
            }

            return $query->orderBy('sort_order')
                ->orderBy('title')
                ->get();
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function share(Request $request)
    {
        $request->validate([
            'slug' => 'required|string|exists:blogs,slug',
        ]);

        $slug = $request->input('slug');
        $cacheKey = "blog_share_{$slug}";

        $response = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($slug) {
            // Get the blog
            $blog = Blog::published()
                ->with(['author:id,name,email'])
                ->where('slug', $slug)
                ->first(); // We validated existence, so first() should work, or handle null

            if (!$blog) return null;

            // Full frontend and image URLs
            $frontendBaseUrl = 'https://edgelancer.com';
            $url = $frontendBaseUrl . '/blogs/' . $blog->slug;
            $title = $blog->meta_title ?? $blog->title;
            // Decode potential HTML entities if any, strip tags
            $description = $blog->meta_description ?? strip_tags($blog->description);
            $image = $blog->image_url ?? $blog->image; // image_url accessor if exists

            // Social share links
            $socialLinks = [
                'facebook' => "https://www.facebook.com/sharer/sharer.php?u={$url}&quote=" . urlencode($title . ' - ' . $description),
                'twitter' => "https://twitter.com/intent/tweet?url={$url}&text=" . urlencode($title . ' - ' . $description),
                'linkedin' => "https://www.linkedin.com/shareArticle?mini=true&url={$url}&title=" . urlencode($title) . "&summary=" . urlencode($description),
                'whatsapp' => "https://api.whatsapp.com/send?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
                'whatsapp_business' => "https://wa.me/?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
                'telegram' => "https://t.me/share/url?url={$url}&text=" . urlencode($title . ' - ' . $description),
                'reddit' => "https://www.reddit.com/submit?url={$url}&title=" . urlencode($title . ' - ' . $description),
                'pinterest' => "https://pinterest.com/pin/create/button/?url={$url}&media={$image}&description=" . urlencode($title . ' - ' . $description),
                'tumblr' => "https://www.tumblr.com/widgets/share/tool?canonicalUrl={$url}&title=" . urlencode($title) . "&caption=" . urlencode($description) . "&content=" . urlencode($image),
                'email' => "mailto:?subject=" . urlencode($title) . "&body=" . urlencode($description . ' ' . $url),
                'tiktok' => "https://www.tiktok.com/share/video?url={$url}",
                'sms' => "sms:?body=" . urlencode($title . ' - ' . $description . ' ' . $url),
                'copy_link' => $url,
                'google_drive' => "https://drive.google.com/drive/u/0/my-drive",
                'notes' => "x-apple-notes://",
                'hike' => "hike://forward?text=" . urlencode($title . ' - ' . $description . ' ' . $url),
                'wechat' => "weixin://dl/chat",
                'line' => "https://social-plugins.line.me/lineit/share?url={$url}&text=" . urlencode($title . ' - ' . $description),
                'messenger' => "fb-messenger://share?link={$url}&app_id=1234567890",
            ];

            return [
                'success' => true,
                'blog_id' => $blog->id,
                'title' => $title,
                'description' => $description,
                'image_url' => $image,
                'shareable_url' => $url,
                'social_links' => $socialLinks
            ];
        });

        if (!$response) {
            abort(404, 'Blog not found');
        }

        return response()->json($response);
    }

}
