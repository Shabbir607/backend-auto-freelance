"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface Section {
  id: string;
  title: string;
}

export function BlogScrollProgress() {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Extract h2 headings from blog content
    const contentEl = document.querySelector(".blog-content");
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll("h2");
    const extracted: Section[] = [];

    headings.forEach((h, i) => {
      const id = h.id || `section-${i}`;
      if (!h.id) h.id = id;
      const text = h.textContent?.trim() || `Section ${i + 1}`;
      // Clean up emoji / special chars for the nav label
      extracted.push({ id, title: text.replace(/^[\s🚀🎯🎓💡⚡]+/, "") });
    });

    setSections(extracted);
    if (extracted.length > 0) setActiveId(extracted[0].id);

    // Intersection Observer to track active section
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => observerRef.current?.observe(h));

    return () => observerRef.current?.disconnect();
  }, []);

  // Overall scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (sections.length < 2) return null;

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <nav
      aria-label="Article sections"
      className="hidden xl:flex flex-col gap-0 sticky top-32 w-56 shrink-0 select-none"
    >
      {/* Overall progress line background */}
      <div className="absolute left-[7px] top-[4px] bottom-[4px] w-[2px] bg-white/[0.06] rounded-full" />

      {/* Animated active progress fill */}
      <div
        className="absolute left-[7px] top-[4px] w-[2px] rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400 transition-all duration-500 ease-out"
        style={{
          height:
            sections.length > 1
              ? `${(activeIndex / (sections.length - 1)) * 100}%`
              : "0%",
        }}
      />

      {sections.map((section, i) => {
        const isActive = section.id === activeId;
        const isPast = i <= activeIndex;

        return (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={cn(
              "relative pl-7 py-2.5 text-left text-[12px] leading-snug transition-all duration-300 group",
              isActive
                ? "text-white font-semibold"
                : isPast
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-600 hover:text-slate-400"
            )}
          >
            {/* Dot */}
            <span
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                isActive
                  ? "w-4 h-4 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] ring-2 ring-indigo-500/30"
                  : isPast
                    ? "w-2.5 h-2.5 bg-indigo-500/60 left-[3px]"
                    : "w-2 h-2 bg-white/10 left-[3px] group-hover:bg-white/20"
              )}
            />

            <span className="line-clamp-2">{section.title}</span>
          </button>
        );
      })}

      {/* Minimal progress bar */}
      <div className="mt-8 pl-7">
        <div className="w-full h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background: `linear-gradient(90deg, #6366f1 0%, #8b5cf6 ${50 + progress * 30}%, #06b6d4 100%)`,
              boxShadow: progress > 0.05 ? '0 0 8px rgba(99,102,241,0.5)' : 'none',
            }}
          />
        </div>
      </div>
    </nav>
  );
}
