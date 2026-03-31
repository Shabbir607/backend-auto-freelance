"use client";

import { BlogCategory, blogService } from '@/services/blogService';
import { WorkflowCategory, workflowService } from '@/services/workflowService';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const PublicFooter = () => {
  const [workflowCategories, setWorkflowCategories] = useState<WorkflowCategory[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>(() => {
    // SSR Fallback categories
    return [
      { id: 1, title: 'n8n Guides', slug: 'n8n-guides' },
      { id: 2, title: 'AI Automation', slug: 'ai-automation' },
      { id: 3, title: 'CRM Integration', slug: 'crm-integration' },
      { id: 4, title: 'Web Scraping', slug: 'web-scraping' },
    ] as BlogCategory[];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wfRes, blogRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          blogService.getCategories()
        ]);
        if (wfRes.success && wfRes.data) {
          setWorkflowCategories(wfRes.data.slice(0, 4));
        }
        if (blogRes.success && blogRes.data) {
          setBlogCategories(blogRes.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch footer categories:", error);
      }
    };
    fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <footer className="relative bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/4 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-3 space-y-6">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer" title="EdgeLancer - Back to Top">
              <img src="/favicon.png" alt="EdgeLancer Logo" width={40} height={40} className="object-contain group-hover:scale-105 transition-transform duration-300" />
              <span
                className="text-1xl md:text-1xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                EdgeLancer
              </span>            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering the next generation of creators with autonomous AI workflows. Join the neural revolution.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, label: "Twitter", href: "https://x.com/edgelancern8n" },
                { Icon: Github, label: "GitHub", href: "https://github.com/edgelancer" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/edgelancer" },
                { Icon: Mail, label: "Email", href: "mailto:contact@edgelancer.com" }
              ].map((item, i) => (
                <a key={i} href={item.href} className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all" aria-label={item.label} title={`Follow us on ${item.label}`}>
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-6">Platform</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Workflows', href: '/workflows' },
                { label: 'Templates', href: '/templates' },
                { label: 'Blog', href: '/blogs' },

              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white flex items-center group transition-colors" title={`Go to ${item.label}`}>
                    <span className="w-0 group-hover:w-2 h-px bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Workflows (Dynamic) - Removed per instructions */}

          {/* Blogs (Dynamic) */}
          <div className="md:col-span-2">
            <h3 className="text-white font-medium mb-6">Resources</h3>
            <ul className="space-y-4">
              {blogCategories.length > 0 ? (
                blogCategories.map((item) => (
                  <li key={item.id}>
                    <Link to={`/blogs?category=${item.slug}`} className="text-gray-400 hover:text-white flex items-center group transition-colors" title={`Browse ${item.title} blogs`}>
                      <span className="w-0 group-hover:w-2 h-px bg-purple-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : loading ? (
                <li className="text-gray-400 text-sm italic">Loading...</li>
              ) : (
                <li className="text-gray-500 text-sm italic">Coming soon...</li>
              )}
            </ul>
          </div>

          {/* Interactive Newsletter */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-white font-medium">Get Product Updates</h3>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center" aria-label="Subscribe to updates">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} EdgeLancer  Built for the future.
          </p>
          <div className="flex gap-6 text-xs text-gray-400 items-center">
            <a href="mailto:contact@edgelancer.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1" title="Email us at contact@edgelancer.com">
              <Mail className="w-3.5 h-3.5" />
              contact@edgelancer.com
            </a>
            <Link to="/sitemap" className="hover:text-white transition-colors" title="View Site Structure">Sitemap</Link>
            <Link to="/contact" className="hover:text-white transition-colors" title="Get in touch with us">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;