import { FAQSection } from "@/components/FAQSection";
import { PublicFooter } from "@/components/layout/PublicFooter";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHelmet } from "@/components/SEO/SEOHelmet";
import { Blog, blogService } from "@/services/blogService";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Calendar, Eye, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";


function BlogCard({ blog }: { blog: Blog }) {
  const dateToShow = blog.published_at || blog.created_at;
  const authorLetter = (blog.author?.name || "N").charAt(0).toUpperCase();

  return (
    <Card className="bg-[#0c0d12] border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {blog.image_url ? (
          <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview coming soon
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2 items-center">
          <Badge className="bg-white/10 text-white border-white/10">
            {blog.category?.title || "General"}
          </Badge>
          {blog.is_featured && (
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Featured</Badge>
          )}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-slate-400 line-clamp-3">{blog.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">

          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateToShow ? formatDistanceToNow(new Date(dateToShow), { addSuffix: true }) : "Just now"}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600" />

        </div>
        <div className="flex items-center justify-between pt-2">

          <Link to={`/blogs/${blog.slug}`} className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-2">
            Read blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadBlogs = useCallback(async (currentPage = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await blogService.getAll(currentPage, 9);
      if (result.success && result.data) {
        const paginated = result.data;
        setBlogs(prev => append ? [...prev, ...(paginated.data || [])] : (paginated.data || []));
        setTotalPages(paginated.last_page || 1);
        setError("");
      } else if (!append) {
        setError(result.message || "Unable to load blogs right now.");
        setBlogs([]);
      }
    } catch (e) {
      console.error(e);
      if (!append) setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadBlogs(1, false);
  }, [loadBlogs]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !isLoadingMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadBlogs(nextPage, true);
    }
  }, [page, totalPages, isLoadingMore, loading, loadBlogs]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !isLoadingMore && !loading) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleLoadMore, page, totalPages, isLoadingMore, loading]);

  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        (blog.meta_keywords || "").toLowerCase().includes(q)
    );
  }, [blogs, search]);

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100">
      <SEOHelmet
        title="Field Notes & Insights – EdgeLancer Blog"
        description="Track the latest product drops, automation tactics, and stories from operators building with EdgeLancer."
      />
      <PublicNavbar />

      <main className="pt-28 pb-16 px-5 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-12">
        <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0a0c16] via-[#0a0c14] to-[#0d0f1a] p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#4338ca1a,transparent_45%),radial-gradient(circle_at_bottom_right,#0ea5e91a,transparent_45%)]" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <Badge className="bg-white/10 text-white border-white/10">Latest from the EdgeLancer team</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">Insights, releases, and field notes.</h1>
            <p className="text-slate-300 text-lg">
              Track the latest product drops, automation tactics, and stories from operators building with EdgeLancer.
            </p>
            <div className="max-w-xl">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title, topic, or keyword"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-slate-400">Curated stories for builders and operators.</p>
              <h2 className="text-2xl font-semibold text-white">Latest posts</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>
                {blogs.length} articles available
              </span>
            </div>
          </div>

          {error && (
            <Card className="border-amber-500/30 bg-amber-500/10 text-amber-100 p-4">
              {error}
            </Card>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="p-4 bg-[#0c0d12] border-white/5">
                  <Skeleton className="w-full h-40 mb-4 bg-white/5" />
                  <Skeleton className="w-3/4 h-5 mb-2 bg-white/5" />
                  <Skeleton className="w-full h-4 mb-2 bg-white/5" />
                  <Skeleton className="w-1/2 h-4 bg-white/5" />
                </Card>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-[#0c0d12]/50">
              No posts found. Try another keyword.
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Sentinel for Infinite Scroll */}
              <div ref={observerTarget} className="h-4 w-full" />

              {/* Loading Status */}
              {(isLoadingMore || (page < totalPages)) && (
                <div className="flex flex-col items-center justify-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="relative">
                    <div className="w-12 h-12 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin" />
                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Retrieving Insights</p>
                    <p className="text-slate-600 text-[10px] mt-1">Analyzing our latest field notes and research...</p>
                  </div>
                </div>
              )}

              {page >= totalPages && filteredBlogs.length > 0 && (
                <div className="text-center py-12 border-t border-white/5 mt-8">
                  <p className="text-slate-500 italic text-sm">
                    You've reached the end of our current stories. Check back soon for more field notes!
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <FAQSection type="page" slug="blogs" />

        <section className="border border-white/5 rounded-2xl bg-[#0a0c14] p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <p className="text-sm text-slate-400 uppercase tracking-[0.2em]">Stay ahead</p>
            <h3 className="text-2xl font-semibold text-white">Get launches and playbooks in your inbox.</h3>
            <p className="text-slate-400">Monthly drop of product updates, deep dives, and automation recipes crafted by the EdgeLancer team.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input placeholder="you@example.com" className="bg-white/5 border-white/10 text-white h-11" />
            <Button className="h-11 px-6 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">Subscribe</Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
