import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  MessageSquare,
  Target,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  FileText,
  HelpCircle,
  Workflow,
  Circle,
  Play,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { adminBlogService } from '@/services/blogService';
import { workflowService } from '@/services/workflowService';
import { courseService } from '@/services/courseService';
import { faqService } from '@/services/faqService';
import { pageService } from '@/services/pageService';
import { contactService } from '@/services/contactService';
import { newsletterService } from '@/services/newsletterService';
import { useToast } from '@/contexts/ToastContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    workflows: 0,
    blogs: 0,
    courses: 0,
    faqs: 0,
    pages: 0,
    contactEnquiries: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      try {
        const [
          workflowsRes,
          blogsRes,
          coursesRes,
          faqsRes,
          pagesRes,
          contactRes,
          subscribersRes
        ] = await Promise.allSettled([
          workflowService.listWorkflows(1, 1),
          adminBlogService.getAll(1, 1),
          courseService.getAdminCourses({ page: 1, per_page: 1 }),
          faqService.listFAQs(1, 1),
          pageService.listPages(),
          contactService.getAllMessages(1),
          newsletterService.getAllSubscribers(1)
        ]);

        setStats({
          workflows: workflowsRes.status === 'fulfilled' ? workflowsRes.value.data?.total || 0 : 0,
          blogs: blogsRes.status === 'fulfilled' ? blogsRes.value.data?.total || 0 : 0,
          courses: coursesRes.status === 'fulfilled' ? coursesRes.value.data?.total || 0 : 0,
          faqs: faqsRes.status === 'fulfilled' ? faqsRes.value.data?.total || 0 : 0,
          pages: pagesRes.status === 'fulfilled' ? pagesRes.value.data?.length || 0 : 0,
          // Handle potential inconsistencies in pagination wrappers for these services
          contactEnquiries: contactRes.status === 'fulfilled' ? ((contactRes.value.data as any)?.total || (Array.isArray(contactRes.value.data) ? contactRes.value.data.length : 0)) : 0,
          subscribers: subscribersRes.status === 'fulfilled' ? ((subscribersRes.value.data as any)?.total || (Array.isArray(subscribersRes.value.data) ? subscribersRes.value.data.length : 0)) : 0,
        });

      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        showToast('Failed to load dashboard statistics', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [showToast]);

  const statCards = [
    {
      label: 'Workflows',
      value: stats.workflows,
      icon: Workflow,
      link: '/app/workflows',
      color: 'text-blue-500',
      bgPrefix: 'bg-blue-500/10'
    },
    {
      label: 'Published Blogs',
      value: stats.blogs,
      icon: BookOpen,
      link: '/app/blogs',
      color: 'text-emerald-500',
      bgPrefix: 'bg-emerald-500/10'
    },
    {
      label: 'Available Courses',
      value: stats.courses,
      icon: Target,
      link: '/app/courses',
      color: 'text-purple-500',
      bgPrefix: 'bg-purple-500/10'
    },
    {
      label: 'FAQs',
      value: stats.faqs,
      icon: HelpCircle,
      link: '/app/faqs',
      color: 'text-amber-500',
      bgPrefix: 'bg-amber-500/10'
    },
    {
      label: 'Static Pages',
      value: stats.pages,
      icon: FileText,
      link: '/app/pages',
      color: 'text-indigo-500',
      bgPrefix: 'bg-indigo-500/10'
    },
    {
      label: 'Contact Enquiries',
      value: stats.contactEnquiries,
      icon: MessageSquare,
      link: '/app/contact-enquiries',
      color: 'text-pink-500',
      bgPrefix: 'bg-pink-500/10'
    },
    {
      label: 'Newsletter Subscribers',
      value: stats.subscribers,
      icon: Users,
      link: '/app/newsletter-subscribers',
      color: 'text-orange-500',
      bgPrefix: 'bg-orange-500/10'
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-muted-foreground text-sm">
            Here's an overview of your platform contents.
          </p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1">
          <Circle className="w-2 h-2 fill-emerald-500 mr-2" />
          System Online
        </Badge>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} to={stat.link}>
                  <Card className="p-5 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full group">
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn("p-3 rounded-xl transition-colors duration-300 group-hover:bg-primary/20", stat.bgPrefix)}>
                          <Icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform h-8 w-8">
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <div>
                        <p className="text-3xl font-bold tracking-tight mb-1">{stat.value.toLocaleString()}</p>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
