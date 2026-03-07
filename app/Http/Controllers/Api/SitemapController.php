<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index(Request $request)
    {
        $frontendUrl = rtrim(env('FRONTEND_URL', 'https://edgelancer.com'), '/');
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        // 1. Static Main Pages
        $staticUrls = [
            '/',
            '/blogs',
            '/workflow-library',
        ];

        foreach ($staticUrls as $url) {
            $loc = $frontendUrl . (str_starts_with($url, '/') ? $url : '/' . $url);
            $xml .= "    <url>\n";
            $xml .= "        <loc>" . htmlspecialchars($loc) . "</loc>\n";
            $xml .= "        <changefreq>daily</changefreq>\n";
            $xml .= "        <priority>1.0</priority>\n";
            $xml .= "    </url>\n";
        }

        // 2. Dynamic Blog Posts
        try {
            $blogs = DB::table('blogs')
                ->where('status', 'published')
                ->where('slug', 'not like', '%uncategorized%')
                ->get(['slug', 'updated_at'])
                ->filter(function ($blog) {
                    return !preg_match('/^[0-9]+-/', $blog->slug);
                });
            
            foreach ($blogs as $blog) {
                $xml .= "    <url>\n";
                $xml .= "        <loc>" . htmlspecialchars($frontendUrl . '/blogs/' . $blog->slug) . "</loc>\n";
                $xml .= "        <lastmod>" . date('Y-m-d\TH:i:sP', strtotime($blog->updated_at)) . "</lastmod>\n";
                $xml .= "        <changefreq>weekly</changefreq>\n";
                $xml .= "        <priority>0.9</priority>\n";
                $xml .= "    </url>\n";
            }
        } catch (\Exception $e) {
            \Log::error('Sitemap Blog Error: ' . $e->getMessage());
        }

        // 3. Dynamic Workflows
        try {
            $workflows = DB::table('workflows')
                ->where('status', 'published')
                ->where('slug', 'not like', '%uncategorized%')
                ->get(['slug', 'updated_at'])
                ->filter(function ($workflow) {
                    return !preg_match('/^[0-9]+-/', $workflow->slug);
                });
                
            foreach ($workflows as $workflow) {
                $xml .= "    <url>\n";
                $xml .= "        <loc>" . htmlspecialchars($frontendUrl . '/workflow/' . $workflow->slug) . "</loc>\n";
                $xml .= "        <lastmod>" . date('Y-m-d\TH:i:sP', strtotime($workflow->updated_at)) . "</lastmod>\n";
                $xml .= "        <changefreq>weekly</changefreq>\n";
                $xml .= "        <priority>0.8</priority>\n";
                $xml .= "    </url>\n";
            }
        } catch (\Exception $e) {
            \Log::error('Sitemap Workflow Error: ' . $e->getMessage());
        }

        $xml .= '</urlset>';

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }
}
