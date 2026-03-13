import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronRight,
  Star,
  Target,
  Zap,
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  Bot,
  Globe,
  Activity,
  Eye,
  Send,
  Award,
  Building2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Stats
const stats = [
  { label: 'Active Jobs', value: '12', change: '+3', trend: 'up', icon: Briefcase, color: 'cyan' },
  { label: 'Total Freelancers', value: '156', change: '+24', trend: 'up', icon: Users, color: 'purple' },
  { label: 'Monthly Revenue', value: '$89,400', change: '+18%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'Completion Rate', value: '94%', change: '+2%', trend: 'up', icon: Target, color: 'yellow' },
];

// Recent Jobs
const recentJobs = [
  {
    id: 'job-1',
    title: 'Full Stack Developer for E-commerce',
    applicants: 24,
    views: 156,
    status: 'open',
    postedAt: '2 days ago',
    budget: '$80-120/hr',
  },
  {
    id: 'job-2',
    title: 'UI/UX Designer for Mobile App',
    applicants: 18,
    views: 89,
    status: 'open',
    postedAt: '5 days ago',
    budget: '$5,000-8,000',
  },
  {
    id: 'job-3',
    title: 'Data Scientist for ML Pipeline',
    applicants: 12,
    views: 67,
    status: 'in-progress',
    postedAt: '1 week ago',
    budget: '$100-150/hr',
  },
];

// Top Freelancers
const topFreelancers = [
  {
    id: 'fl-1',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    title: 'Full Stack Developer',
    rating: 4.9,
    projects: 45,
    earnings: '$125,000',
  },
  {
    id: 'fl-2',
    name: 'Jessica Park',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    title: 'UI/UX Designer',
    rating: 4.8,
    projects: 32,
    earnings: '$89,500',
  },
  {
    id: 'fl-3',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    title: 'Mobile Developer',
    rating: 5.0,
    projects: 67,
    earnings: '$198,000',
  },
];

// Recent Applications
const recentApplications = [
  {
    id: 'app-1',
    freelancer: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    job: 'Full Stack Developer',
    bid: '$95/hr',
    submittedAt: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'app-2',
    freelancer: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    job: 'UI/UX Designer',
    bid: '$6,500 fixed',
    submittedAt: '5 hours ago',
    status: 'shortlisted',
  },
  {
    id: 'app-3',
    freelancer: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    job: 'Data Scientist',
    bid: '$120/hr',
    submittedAt: '1 day ago',
    status: 'pending',
  },
];

// Automation Stats
const automationStats = [
  { label: 'Auto-Responses Sent', value: 456, icon: Bot },
  { label: 'Proposals Generated', value: 89, icon: FileText },
  { label: 'Interviews Scheduled', value: 23, icon: Calendar },
  { label: 'Workflows Active', value: 12, icon: Zap },
];

export default function AgencyDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'in-progress': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shortlisted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Agency Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || 'Admin'}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/job-board">
            <Button variant="outline">
              <Briefcase className="w-4 h-4 mr-2" />
              View Jobs
            </Button>
          </Link>
          <Link to="/app/job-board">
            <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <Card className="lg:col-span-2 bg-card border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Recent Job Postings</h3>
            <Link to="/app/job-board">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <ScrollArea className="h-[320px]">
            <div className="p-5 space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{job.budget}</p>
                    </div>
                    <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {job.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.postedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Top Freelancers */}
        <Card className="bg-card border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Top Freelancers</h3>
            <Link to="/freelancers">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <ScrollArea className="h-[320px]">
            <div className="p-5 space-y-4">
              {topFreelancers.map((freelancer, index) => (
                <div key={freelancer.id} className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-12 h-12 rounded-full border border-border"
                    />
                    {index < 3 && (
                      <div className={cn(
                        "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                      )}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{freelancer.name}</p>
                    <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {freelancer.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">{freelancer.projects} projects</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-emerald-400">{freelancer.earnings}</p>
                    <p className="text-xs text-muted-foreground">Total earned</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Recent Applications & Automation */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="bg-card border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Recent Applications</h3>
            <Link to="/app/job-board">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="p-5 space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <img src={app.avatar} alt={app.freelancer} className="w-10 h-10 rounded-full border border-border" />
                <div className="flex-1">
                  <p className="font-medium">{app.freelancer}</p>
                  <p className="text-sm text-muted-foreground">Applied for {app.job}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{app.bid}</p>
                  <Badge className={cn('mt-1', getStatusColor(app.status))}>{app.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Automation Stats */}
        <Card className="bg-card border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Automation Overview</h3>
            <Link to="/app/workflows">
              <Button variant="ghost" size="sm">
                Manage
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              {automationStats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <stat.icon className="w-8 h-8 text-primary mb-3" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">AI Automation Active</p>
                  <p className="text-sm text-muted-foreground">All systems running smoothly</p>
                </div>
                <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border p-5">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/app/job-board">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
              <Plus className="w-6 h-6" />
              <span>Post Job</span>
            </Button>
          </Link>
          <Link to="/app/workflows">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
              <Zap className="w-6 h-6" />
              <span>Create Workflow</span>
            </Button>
          </Link>
          <Link to="/freelancers">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span>Find Freelancers</span>
            </Button>
          </Link>
          <Link to="/app/invoices">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span>View Invoices</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
