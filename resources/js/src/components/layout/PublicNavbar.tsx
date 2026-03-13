"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Box,
  ChevronDown,
  ChevronRight,
  Cpu,
  FileCode,
  FileJson,
  GitBranch,
  Globe,
  Mail,
  Menu,
  MessageSquare,
  Share2,
  ShieldCheck,
  Terminal,
  Users,
  Workflow,
  X,
  Zap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// --- Types ---
import { workflowService } from "@/services/workflowService";

export interface NavItem {
  label: string;
  title?: string;
  to?: string;
  children?: NavItemChild[];
}

export interface NavItemChild {
  label: string;
  title?: string;
  to: string;
  description?: string;
  icon: any;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", title: "Go to Home" },
  { label: "Workflows", to: "/workflows", title: "Browse Workflow Templates" },
  { label: "Templates", to: "/templates", title: "View Template Library" },
  { label: "Courses", to: "/courses", title: "Browse our Expert Courses" },
  { label: "Blogs", to: "/blogs", title: "Read our latest Blog Posts" },
  { label: "Contact", to: "/contact", title: "Contact Us" },
];

export function PublicNavbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState<NavItem[]>(navItems);

  const categoryIcons = [
    BarChart3, Bot, Box, Cpu, FileCode, FileJson, GitBranch, Globe,
    Mail, MessageSquare, Share2, ShieldCheck, Terminal, Users, Workflow, Zap
  ];

  const getRandomIcon = () => categoryIcons[Math.floor(Math.random() * categoryIcons.length)] || Box;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await workflowService.getWorkflowLibraryCategories();
        if (response.success && response.data) {
          const categories = response.data;
          const topCategories = categories.slice(0, 6).map(cat => ({
            label: cat.title,
            to: `/workflows?category=${cat.slug}`,
            title: `Explore ${cat.title} workflows`,
            description: cat.badge_text || `Browse our ${cat.title} templates`,
            icon: getRandomIcon()
          }));

          if (categories.length > 6) {
            topCategories.push({
              label: "View All Categories",
              to: "/workflows",
              title: "View all workflow categories",
              description: "Explore all of our available categories",
              icon: ArrowRight
            });
          }

          setDynamicNavItems(prev => prev.map(item => {
            if (item.label === "Categories") {
              return { ...item, children: topCategories };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error("Failed to fetch nav categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const idx = dynamicNavItems.findIndex(item =>
      item.to === pathname ||
      (item.children && item.children.some(child => child.to === pathname))
    );
    setActiveIndex(idx !== -1 ? idx : null);
  }, [pathname, dynamicNavItems]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLElement>) => {
    setHoveredIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect) {
      setHoverStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - navRect.left}px)`,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
      <nav
        className={cn(
          "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "md:top-5 md:inset-x-0 md:max-w-6xl md:mx-auto md:rounded-2xl",
          "top-0 inset-x-0 w-full border-b md:border",
          isScrolled || mobileMenuOpen
            ? "bg-[#050507]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-transparent md:bg-[#050507]/40 md:backdrop-blur-md md:border-white/5",
        )}
      >
        <div className="h-16 md:h-14 px-4 flex items-center justify-between">
          {/* --- LOGO --- */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative z-20"
            title="EdgeLancer Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/favicon.png"
              alt="Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* --- DESKTOP NAV --- */}
          <div
            ref={navRef}
            className="hidden md:flex relative items-center bg-white/5 rounded-full p-1 border border-white/5 shadow-inner"
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="absolute top-1 bottom-1 left-0 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={hoverStyle}
            />

            {dynamicNavItems.map((item, index) => {
              const isDropdown = !!item.children;

              return (
                <div key={item.label} className="relative group/dropdown h-full flex items-center">
                  {isDropdown ? (
                    <button
                      className={cn(
                        "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-default outline-none h-full",
                        hoveredIndex === index ? "text-white" : "text-slate-400"
                      )}
                      onMouseEnter={(e) => handleMouseEnter(index, e)}
                    >
                      {item.label}
                      <ChevronDown className="w-3 h-3 mt-0.5 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                    </button>
                  ) : (
                    <Link
                      to={item.to!}
                      className={cn(
                        "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 block h-full flex items-center",
                        activeIndex === index ? "text-white" : "text-slate-400 hover:text-white"
                      )}
                      onMouseEnter={(e) => handleMouseEnter(index, e)}
                    >
                      {item.label}
                      {activeIndex === index && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_currentColor]" />
                      )}
                    </Link>
                  )}

                  {isDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible opacity-0 translate-y-1 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-500 ease-out delay-200 group-hover/dropdown:delay-0">
                      <div className="w-[600px] p-4 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 backdrop-blur-2xl shadow-2xl grid grid-cols-2 gap-2">
                        {item.children?.map((child, i) => (
                          <Link
                            key={i}
                            to={child.to}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-indigo-400 group-hover/item:border-indigo-500/30 transition-all">
                              <child.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-200 group-hover/item:text-white">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-slate-400 group-hover/item:text-slate-300">{child.description}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-3">


            <Link to="/contact" className="hidden md:block group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-50 group-hover:blur-xl" />
              <div className="relative overflow-hidden rounded-full p-[1px] transition-transform duration-300 active:scale-95">
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] group-hover:animate-[spin_2s_linear_infinite]" />
                <Button className="relative h-9 rounded-full bg-slate-950/90 backdrop-blur-sm px-6 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-slate-900/90">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                  <span className="relative flex items-center gap-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                    <span className="tracking-wide">Hire Us</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#050507] md:hidden flex flex-col pt-24 px-6 transition-all duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2">
          {dynamicNavItems.map((item, idx) => (
            <div key={item.label} className="border-b border-white/5 last:border-0 pb-2">
              {item.children ? (
                <>
                  <button
                    onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                    className="w-full group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all text-left"
                  >
                    <span className="text-lg font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                    <ChevronDown className={cn("w-5 h-5 text-slate-600 transition-transform duration-300", mobileCategoryOpen ? "rotate-180 text-indigo-400" : "")} />
                  </button>
                  <div className={cn("overflow-hidden transition-all duration-300 px-4 space-y-1", mobileCategoryOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0")}>
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        to={child.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                      >
                        <child.icon className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.to!}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all"
                >
                  <span className="text-lg font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pb-10 space-y-4">
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 rounded-xl">
              Hire Us
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PublicNavbar;