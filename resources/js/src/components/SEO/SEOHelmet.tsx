import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'EdgeLancer';
const DEFAULT_OG_IMAGE = 'https://edgelancer.com/og-image.png';
const TWITTER_HANDLE = '@edgelancer';

// Domain sanitization helper
const sanitizeUrl = (url?: string) => {
    if (!url) return '';
    try {
        // Replace development/hardcoded URLs with current production URL if needed
        // but generally we trust the backend to provide correct URLs now.
        return url;
    } catch (e) {
        return url;
    }
};

interface SEOHelmetProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    /** Current page absolute URL (used for og:url) */
    url?: string;
    /** Explicit canonical URL — defaults to url. Strip query params by setting this. */
    canonical?: string;
    /** Extra custom <meta> tags from API — key/value pairs */
    metaTags?: Record<string, any> | any[];
    /** Structured data (JSON-LD) object */
    structuredData?: Record<string, any>;
    /** Open Graph type - defaults to website */
    ogType?: 'website' | 'article' | 'product';
    /** Published/Modified times for articles */
    publishedTime?: string;
    modifiedTime?: string;
    /** Robots directives */
    robots?: string;
}

const FRONTEND_ORIGIN = import.meta.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://edgelancer.com');

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
    title,
    description = 'Download ready-to-use n8n workflow automation templates and AI agents.',
    keywords,
    ogImage,
    url,
    canonical,
    metaTags = [],
    structuredData,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    robots = 'index, follow'
}) => {
    const pageUrl = useMemo(() => sanitizeUrl(url || (typeof window !== 'undefined' ? window.location.href : '')), [url]);
    const canonicalUrl = useMemo(() => {
        if (canonical) return sanitizeUrl(canonical);
        // Default canonical URL should strip query parameters and hashes to prevent duplicate indexing issues
        return sanitizeUrl(pageUrl.split('?')[0].split('#')[0]);
    }, [canonical, pageUrl]);
    const finalOgImage = useMemo(() => sanitizeUrl(ogImage || DEFAULT_OG_IMAGE), [ogImage]);
    const finalRobots = useMemo(() => {
        // If we are on a preview/test domain, force noindex
        if (typeof window !== 'undefined' && (window.location.hostname.includes('hstgr.cloud') || window.location.hostname.includes('srv1381478'))) {
            return 'noindex, follow';
        }
        return robots;
    }, [robots]);

    const structuredDataString = useMemo(() => {
        if (!structuredData) return null;
        try {
            return JSON.stringify(structuredData);
        } catch (e) {
            console.error('Error stringifying structured data:', e);
            return null;
        }
    }, [structuredData]);

    return (
        <Helmet>
            {/* ── Basic ── */}
            <title>{title ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`) : SITE_NAME}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={finalRobots} />
            <meta name="googlebot" content={finalRobots} />

            {/* ── Canonical ── */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* ── Open Graph ── */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title || SITE_NAME} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${title || SITE_NAME} – ${SITE_NAME}`} />

            {/* ── Article-specific OG tags ── */}
            {ogType === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {ogType === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}

            {/* ── Twitter Card ── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={title || SITE_NAME} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalOgImage} />
            <meta name="twitter:image:alt" content={`${title || SITE_NAME} – ${SITE_NAME}`} />

            {/* ── Custom meta tags from API ── */}
            {Array.isArray(metaTags) ? metaTags.map((tag, idx) => (
                <meta key={idx} name={tag.name || tag.property} content={tag.content} />
            )) : Object.entries(metaTags).map(([key, value]) => {
                if (!value || typeof value !== 'string') return null;
                const isProperty = key.startsWith('og:') || key.startsWith('fb:') || key.startsWith('article:');
                return isProperty
                    ? <meta key={key} property={key} content={value} />
                    : <meta key={key} name={key} content={value} />;
            })}

            {/* ── JSON-LD Structured Data ── */}
            {structuredDataString && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: structuredDataString }}
                />
            )}
        </Helmet>
    );
};

export default SEOHelmet;
