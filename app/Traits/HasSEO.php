<?php

namespace App\Traits;

use Illuminate\Support\Str;
use App\Models\Blog;
use App\Models\Workflow;

trait HasSEO
{
    /**
     * Get the SEO metadata for the model.
     */
    public function getSeoMetadata()
    {
        $origin = config('app.frontend_url') ?? 'https://edgelancer.com';
        
        $title = $this->meta_title ?: ($this->title ?? 'EdgeLancer');
        $description = $this->meta_description ?: (isset($this->description) ? Str::limit(strip_tags($this->description), 160) : 'EdgeLancer Automation');
        $keywords = $this->meta_keywords ?: '';
        
        $slug = $this->slug;
        $canonical = '';
        $ogType = 'website';

        if ($this instanceof Blog) {
            $canonical = "{$origin}/blogs/{$slug}";
            $ogType = 'article';
        } elseif ($this instanceof Workflow) {
            $canonical = "{$origin}/workflow/{$slug}";
            $ogType = 'product';
        } else {
            $canonical = "{$origin}/{$slug}";
        }

        if (isset($this->canonical_url) && $this->canonical_url) {
            $canonical = $this->canonical_url;
        }

        return [
            'id' => $this->id,
            'title' => $title,
            'description' => $description,
            'keywords' => $keywords,
            'canonical' => $canonical,
            'og_type' => $ogType,
            'og_image' => $this->og_image ?: "{$origin}/og-image.png",
            'twitter_card' => 'summary_large_image',
            'robots' => 'index, follow',
            'structured_data' => $this->generateStructuredData($origin, $canonical),
            'meta_tags' => $this->generateAdditionalMetaTags(),
            'reading_time' => $this instanceof Blog ? $this->calculateReadingTime() : null,
        ];
    }

    /**
     * Generate JSON-LD structured data.
     */
    protected function generateStructuredData($origin, $canonical)
    {
        $graph = [];

        // 1. BreadcrumbList
        $graph[] = $this->getBreadcrumbSchema($origin, $canonical);

        // 2. Primary Entity Schema
        if ($this instanceof Blog) {
            $graph[] = [
                '@type' => 'BlogPosting',
                '@id' => "{$canonical}#blogposting",
                'headline' => $this->title,
                'description' => Str::limit(strip_tags($this->description), 160),
                'image' => $this->og_image ?: "{$origin}/og-image.png",
                'datePublished' => $this->published_at ? $this->published_at->toIso8601String() : $this->created_at->toIso8601String(),
                'dateModified' => $this->updated_at->toIso8601String(),
                'author' => [
                    '@type' => 'Person',
                    'name' => $this->author ? $this->author->name : 'Dev Shabbir'
                ],
                'publisher' => [
                    '@type' => 'Organization',
                    'name' => 'EdgeLancer',
                    'logo' => [
                        '@type' => 'ImageObject',
                        'url' => "{$origin}/favicon.png"
                    ]
                ],
                'mainEntityOfPage' => [
                    '@type' => 'WebPage',
                    '@id' => $canonical
                ]
            ];
        } elseif ($this instanceof Workflow) {
            $graph[] = [
                '@type' => 'Product',
                '@id' => "{$canonical}#product",
                'name' => $this->title,
                'description' => Str::limit(strip_tags($this->description), 160),
                'image' => $this->og_image ?: "{$origin}/og-image.png",
                'brand' => [
                    '@type' => 'Brand',
                    'name' => 'EdgeLancer'
                ],
                'offers' => [
                    '@type' => 'Offer',
                    'url' => $canonical,
                    'priceCurrency' => 'USD',
                    'price' => $this->price ?? '0.00',
                    'availability' => 'https://schema.org/InStock'
                ],
                'aggregateRating' => [
                    '@type' => 'AggregateRating',
                    'ratingValue' => $this->rating ?: '5.0',
                    'reviewCount' => $this->user_count ?: '10'
                ]
            ];
        }

        // 3. FAQ Schema
        if (isset($this->faqs) && count($this->faqs) > 0) {
            $faqItems = [];
            foreach ($this->faqs as $faq) {
                $faqItems[] = [
                    '@type' => 'Question',
                    'name' => $faq->question,
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => strip_tags($faq->answer)
                    ]
                ];
            }
            $graph[] = [
                '@type' => 'FAQPage',
                'mainEntity' => $faqItems
            ];
        }

        return [
            '@context' => 'https://schema.org',
            '@graph' => $graph
        ];
    }

    protected function getBreadcrumbSchema($origin, $canonical)
    {
        $items = [
            [
                '@type' => 'ListItem',
                'position' => 1,
                'name' => 'Home',
                'item' => $origin
            ]
        ];

        if ($this instanceof Blog) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => 2,
                'name' => 'Blogs',
                'item' => "{$origin}/blogs"
            ];
            if ($this->category) {
                $items[] = [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $this->category->title,
                    'item' => "{$origin}/blogs?category=" . $this->category->slug
                ];
            }
        } elseif ($this instanceof Workflow) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => 2,
                'name' => 'Workflows',
                'item' => "{$origin}/workflows"
            ];
            if ($this->category) {
                $items[] = [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $this->category->title,
                    'item' => "{$origin}/workflows?category=" . $this->category->slug
                ];
            }
        }

        $items[] = [
            '@type' => 'ListItem',
            'position' => count($items) + 1,
            'name' => $this->title,
            'item' => $canonical
        ];

        return [
            '@type' => 'BreadcrumbList',
            '@id' => "{$canonical}#breadcrumb",
            'itemListElement' => $items
        ];
    }

    protected function generateAdditionalMetaTags()
    {
        $tags = [];

        if ($this instanceof Blog) {
            $tags[] = ['name' => 'article:published_time', 'content' => $this->published_at ? $this->published_at->toIso8601String() : $this->created_at->toIso8601String()];
            $tags[] = ['name' => 'article:modified_time', 'content' => $this->updated_at->toIso8601String()];
            if ($this->category) {
                $tags[] = ['name' => 'article:section', 'content' => $this->category->title];
            }
        }

        return $tags;
    }

    protected function calculateReadingTime()
    {
        $wordsPerMinute = 200;
        $wordCount = str_word_count(strip_tags($this->content));
        $minutes = ceil($wordCount / $wordsPerMinute);
        return $minutes . ' min read';
    }
}
