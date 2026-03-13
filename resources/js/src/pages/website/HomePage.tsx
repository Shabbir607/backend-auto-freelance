import { useEffect, useState } from 'react';
import { fetchBlogs, fetchWorkflowCategories, fetchWorkflowLibrary, fetchWorkflowStats } from '@/lib/serverApi';

import { FAQSection } from '@/components/FAQSection';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { ProductionTemplates } from '@/components/ProductionTemplates';

import { BentoGrid } from '@/components/home/BentoGrid';
import { BlogsSection } from '@/components/home/BlogsSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { CodeDemoSection } from '@/components/home/CodeDemoSection';
import { CTASection } from '@/components/home/CTASection';
import { Hero } from '@/components/home/Hero';
import { LazyStarfield } from '@/components/home/LazyStarfield';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';
import { useSSRContext } from '@/contexts/SSRContext';

export default function HomePage() {
    const ssrData = useSSRContext();

    const [stats, setStats] = useState<any[]>(ssrData.stats || []);
    const [categories, setCategories] = useState<any[]>(ssrData.categories || []);
    const [initialWorkflows, setInitialWorkflows] = useState<any[]>(ssrData.workflows || []);
    const [blogs, setBlogs] = useState<any[]>(ssrData.blogs || []);
    const [isLoading, setIsLoading] = useState(!ssrData.stats);

    useEffect(() => {
        async function loadData() {
            try {
                const [statsData, categoriesData, workflowsData, blogsData] = await Promise.all([
                    fetchWorkflowStats(),
                    fetchWorkflowCategories(),
                    fetchWorkflowLibrary(1, 12),
                    fetchBlogs(1, 20)
                ]);

                if (statsData) {
                    setStats([
                        { label: "Workflow Views", value: statsData.total_visits || 0, suffix: "", decimals: 0 },
                        { label: "Active Users", value: statsData.active_users_today || 0, suffix: "", decimals: 0 },
                        { label: "Total Workflows", value: statsData.total_workflows || 0, suffix: "+", decimals: 0 },
                    ]);
                }

                setCategories(categoriesData || []);
                setInitialWorkflows(workflowsData?.data || []);
                setBlogs(blogsData?.data || []);
            } catch (error) {
                console.error("Failed to fetch homepage data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen bg-[#020204] flex items-center justify-center"><LoadingScreen /></div>;
    }

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "EdgeLancer",
        url: "https://edgelancer.com",
        logo: "https://edgelancer.com/favicon.png",
        description: "Download ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer.",
        sameAs: [
            "https://twitter.com/edgelancer",
            "https://github.com/edgelancer",
            "https://linkedin.com/company/edgelancer",
        ],
    };

    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "EdgeLancer",
        url: "https://edgelancer.com",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://edgelancer.com/workflows?search={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <div className="min-h-screen bg-[#020204] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            <SEOHelmet
                title="Download Premium n8n Workflow Templates - EdgeLancer"
                description="Ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer."
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <LazyStarfield />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[1]" />

            <div className="relative z-10">
                <PublicNavbar />
                <main id="main-content">
                    <Hero initialStats={stats} />
                    <ProductionTemplates initialWorkflows={initialWorkflows} initialCategories={categories} />
                    <CategoriesSection initialCategories={categories} />

                    <BlogsSection initialBlogs={blogs} />

                    <BentoGrid />
                    <CodeDemoSection />

                    <FAQSection />

                    <CTASection />
                </main>
                <PublicFooter />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes dash {
                  to { stroke-dashoffset: -40; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
            `}} />
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );
}
