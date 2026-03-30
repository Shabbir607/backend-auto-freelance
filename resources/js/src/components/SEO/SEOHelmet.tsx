"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'EdgeLancer';
const DEFAULT_OG_IMAGE = '/og-image.png';
const TWITTER_HANDLE = '@edgelancern8n';

interface SEOHelmetProps {
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    /** Current page absolute URL (used for og:url) */
    url?: string;
    /** Explicit canonical URL — defaults to url. Strip query params by setting this. */
    canonical?: string;
    /** Extra custom <meta> tags from API — key/value pairs */
    metaTags?: Record<string, any>;
    /** JSON-LD structured data object */
    structuredData?: Record<string, any> | Record<string, any>[];
    /** Override robots directive. Default: "index, follow" */
    robots?: string;
    /** Set to "article" for blog posts, default is "website" */
    ogType?: string;
    /** Published date for articles (ISO string) */
    publishedTime?: string;
    /** Modified date for articles (ISO string) */
    modifiedTime?: string;
}

// ── Domain whitelist: maps known backend API domains to the frontend ───────────
const FRONTEND_ORIGIN = import.meta.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://edgelancer.com');
const API_DOMAINS = [
    'api.edgelancer.com',
    ...(import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.startsWith('http')
        ? [new URL(import.meta.env.VITE_API_URL).hostname]
        : []),
];

function sanitizeUrl(rawUrl: string | undefined): string {
    if (!rawUrl) return '';
    try {
        const parsed = new URL(rawUrl);
        const isApiDomain = API_DOMAINS.some(d => parsed.hostname.includes(d));
        if (isApiDomain) {
            return `${FRONTEND_ORIGIN}${parsed.pathname}${parsed.search}`;
        }
        return rawUrl;
    } catch {
        return rawUrl;
    }
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
    title,
    description = '',
    keywords = '',
    ogImage = '',
    url = '',
    canonical,
    metaTags = {},
    structuredData,
    robots = 'index, follow',
    ogType = 'website',
    publishedTime,
    modifiedTime,
}) => {
    let finalOgImage = ogImage;
    if (finalOgImage && !finalOgImage.startsWith('http')) {
        finalOgImage = `${FRONTEND_ORIGIN}${finalOgImage.startsWith('/') ? '' : '/'}${finalOgImage}`;
    } else if (!finalOgImage) {
        finalOgImage = `${FRONTEND_ORIGIN}${DEFAULT_OG_IMAGE.startsWith('/') ? '' : '/'}${DEFAULT_OG_IMAGE}`;
    }

    const safeCanonical = sanitizeUrl(canonical);
    const safeUrl = sanitizeUrl(url) || url;

    let canonicalUrl = safeCanonical || safeUrl;
    if (canonicalUrl && canonicalUrl.includes('?') && !safeCanonical) {
        canonicalUrl = canonicalUrl.split('?')[0];
    }

    const pageUrl = safeUrl || '';

    const structuredDataString = structuredData
        ? JSON.stringify(Array.isArray(structuredData) ? structuredData : structuredData)
        : null;

    return (
        <Helmet>
            {/* ── Basic ── */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={robots} />
            <meta name="googlebot" content={robots} />

            {/* ── Canonical ── */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* ── Open Graph ── */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${title} – ${SITE_NAME}`} />

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
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalOgImage} />
            <meta name="twitter:image:alt" content={`${title} – ${SITE_NAME}`} />

            {/* ── Custom meta tags from API ── */}
            {Object.entries(metaTags).map(([key, value]) => {
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
