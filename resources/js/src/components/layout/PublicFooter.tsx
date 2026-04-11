"use client";

import { BlogCategory, blogService } from '@/services/blogService';
import { WorkflowCategory, workflowService } from '@/services/workflowService';
import { ArrowRight, Github, Linkedin, Mail, Twitter, ChevronRight, MapPin, Phone, Globe, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const PublicFooter = () => {
  const [workflowCategories, setWorkflowCategories] = useState<WorkflowCategory[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wfRes, blogRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          blogService.getCategories()
        ]);
        if (wfRes.success && wfRes.data) {
          setWorkflowCategories(wfRes.data.slice(0, 5));
        }
        if (blogRes.success && blogRes.data) {
          setBlogCategories(blogRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch footer categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="relative bg-[#030305] border-t border-white/5 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand & Mission Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group" title="EdgeLancer - Back to Home">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full group-hover:bg-cyan-400/30 transition-all duration-300" />
                <img src="/favicon.png" alt="EdgeLancer Logo" className="w-12 h-12 object-contain relative group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span
                className="text-2xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                EdgeLancer
              </span>
            </Link>

            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              The world's premium destination for high-performance n8n workflows and autonomous AI strategies. We're bridging the gap between manual work and digital intelligence.
            </p>

            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                Connect with the Future
              </h4>
              <div className="flex gap-4">
                {[
                  { Icon: Twitter, label: "Twitter", href: "https://x.com/edgelancern8n" },
                  { Icon: Github, label: "GitHub", href: "https://github.com/edgelancer" },
                  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/edgelancer" },
                  { Icon: Mail, label: "Email", href: "mailto:contact@edgelancer.com" }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:-translate-y-1 transition-all duration-300"
                    aria-label={item.label}
                    title={`Follow us on ${item.label}`}
                  >
                    <item.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-column Links Section */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">

            {/* Platform Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Platform</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Workflows', to: '/workflows' },
                  { label: 'Templates', to: '/templates' },
                  { label: 'Courses', to: '/courses' },
                  { label: 'Articles', to: '/blogs' },
                  { label: 'Dashboard', to: '/app/dashboard' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white flex items-center group transition-colors text-sm"
                      title={`Navigate to ${item.label}`}
                    >
                      <ChevronRight className="w-0 group-hover:w-3 h-3 text-cyan-500 mr-0 group-hover:mr-1 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Column (Dynamic) */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Solutions</h3>
              <ul className="space-y-4">
                {workflowCategories.length > 0 ? (
                  workflowCategories.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/workflows?category=${item.slug}`}
                        className="text-slate-400 hover:text-white flex items-center group transition-colors text-sm"
                        title={`View ${item.title} automation solutions`}
                      >
                        <ChevronRight className="w-0 group-hover:w-3 h-3 text-indigo-500 mr-0 group-hover:mr-1 transition-all duration-300" />
                        {item.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-600 text-xs italic">Loading...</li>
                )}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Resources</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Help Center', to: '/support' },
                  { label: 'Latest Updates', to: '/blogs' },
                  { label: 'Course Library', to: '/courses' },
                  { label: 'Marketplace', to: '/templates' },
                  { label: 'Support Chat', to: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white flex items-center group transition-colors text-sm"
                      title={`Go to ${item.label}`}
                    >
                      <ChevronRight className="w-0 group-hover:w-3 h-3 text-purple-500 mr-0 group-hover:mr-1 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-6">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">Company</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Sitemap', to: '/sitemap' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white flex items-center group transition-colors text-sm"
                      title={`Legal Information: ${item.label}`}
                    >
                      <ChevronRight className="w-0 group-hover:w-3 h-3 text-emerald-500 mr-0 group-hover:mr-1 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Newsletter & Featured Sub-section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 border-y border-white/5 mb-12">
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Stay ahead of the competition</h3>
            <p className="text-slate-400 text-sm">Join 10,000+ automators getting weekly n8n strategies.</p>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 text-sm"
                />
              </div>
              <button
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm"
                onClick={() => window.location.href = '/newsletter'}
              >
                Join Newsletter <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} EdgeLancer Industries. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] text-slate-500 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Worldwide Delivery</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Neural Network Based</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400 border border-white/5 bg-white/5 rounded-full px-8 py-3 backdrop-blur-sm">
            <a href="mailto:contact@edgelancer.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2" title="Send us an email">
              <Mail className="w-4 h-4 text-cyan-500/50" />
              contact@edgelancer.com
            </a>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2" title="Contact Support">
              <Phone className="w-4 h-4 text-indigo-500/50" />
              +1 (555) EDGE-AI
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;