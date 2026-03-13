import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Star,
  ChevronRight,
  Eye,
  Send,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  Award,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface Application {
  id: string;
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    salary: string;
    status: 'open' | 'closed';
  };
  coverLetter: string;
  bidAmount: number;
  bidType: 'hourly' | 'fixed';
  estimatedDuration: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  viewedAt?: string;
  lastActivity?: string;
  interviewScheduled?: string;
  messages: number;
}

const mockApplications: Application[] = [
  {
    id: 'app-1',
    job: {
      id: 'job-1',
      title: 'Full Stack Developer for E-commerce Platform',
      company: 'TechStart Inc',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
      location: 'San Francisco, CA',
      salary: '$80-120/hr',
      status: 'open',
    },
    coverLetter: 'I am excited to apply for this position...',
    bidAmount: 95,
    bidType: 'hourly',
    estimatedDuration: '3 months',
    status: 'shortlisted',
    submittedAt: '2024-01-20T10:00:00Z',
    viewedAt: '2024-01-21T08:30:00Z',
    lastActivity: '2024-01-22T14:00:00Z',
    interviewScheduled: '2024-01-25T15:00:00Z',
    messages: 3,
  },
  {
    id: 'app-2',
    job: {
      id: 'job-2',
      title: 'React Native Mobile App Development',
      company: 'MobileFirst Labs',
      companyLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80',
      location: 'Remote',
      salary: '$5,000-8,000 fixed',
      status: 'open',
    },
    coverLetter: 'With 5 years of React Native experience...',
    bidAmount: 6500,
    bidType: 'fixed',
    estimatedDuration: '6 weeks',
    status: 'pending',
    submittedAt: '2024-01-18T14:30:00Z',
    viewedAt: '2024-01-19T09:00:00Z',
    messages: 0,
  },
  {
    id: 'app-3',
    job: {
      id: 'job-3',
      title: 'UI/UX Designer for SaaS Dashboard',
      company: 'CloudSoft Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&q=80',
      location: 'New York, NY',
      salary: '$70-100/hr',
      status: 'open',
    },
    coverLetter: 'I specialize in creating intuitive dashboards...',
    bidAmount: 85,
    bidType: 'hourly',
    estimatedDuration: '2 months',
    status: 'accepted',
    submittedAt: '2024-01-15T09:00:00Z',
    viewedAt: '2024-01-15T12:00:00Z',
    lastActivity: '2024-01-20T10:00:00Z',
    messages: 8,
  },
  {
    id: 'app-4',
    job: {
      id: 'job-4',
      title: 'Python Backend Developer',
      company: 'DataFlow Inc',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&q=80',
      location: 'Austin, TX',
      salary: '$90-130/hr',
      status: 'closed',
    },
    coverLetter: 'As a Python expert with extensive backend experience...',
    bidAmount: 110,
    bidType: 'hourly',
    estimatedDuration: '4 months',
    status: 'rejected',
    submittedAt: '2024-01-10T16:00:00Z',
    viewedAt: '2024-01-11T11:00:00Z',
    lastActivity: '2024-01-12T09:00:00Z',
    messages: 1,
  },
];

const stats = [
  { label: 'Total Applications', value: '24', change: '+8', trend: 'up', icon: Briefcase, color: 'cyan' },
  { label: 'Interview Scheduled', value: '3', change: '+2', trend: 'up', icon: Calendar, color: 'purple' },
  { label: 'Success Rate', value: '42%', change: '+5%', trend: 'up', icon: Target, color: 'emerald' },
  { label: 'Avg Response Time', value: '18hrs', change: '-4hrs', trend: 'up', icon: Clock, color: 'yellow' },
];

export default function FreelancerApplications() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'active' && ['pending', 'shortlisted'].includes(app.status)) ||
      (activeTab === 'accepted' && app.status === 'accepted') ||
      (activeTab === 'archived' && ['rejected', 'withdrawn'].includes(app.status));
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shortlisted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'withdrawn': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shortlisted': return <Star className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'withdrawn': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
          <Briefcase className="w-4 h-4 mr-2" />
          Browse Jobs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
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

      {/* Application Funnel */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold mb-4">Application Funnel</h3>
        <div className="space-y-3">
          {[
            { stage: 'Applied', count: 24, percentage: 100, color: 'cyan' },
            { stage: 'Viewed', count: 18, percentage: 75, color: 'blue' },
            { stage: 'Shortlisted', count: 8, percentage: 33, color: 'purple' },
            { stage: 'Interview', count: 5, percentage: 21, color: 'yellow' },
            { stage: 'Accepted', count: 3, percentage: 12, color: 'emerald' },
          ].map((item) => (
            <div key={item.stage} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">{item.stage}</div>
              <div className="flex-1">
                <Progress value={item.percentage} className="h-2" />
              </div>
              <div className="w-16 text-right text-sm font-medium">{item.count}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All ({mockApplications.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({mockApplications.filter(a => ['pending', 'shortlisted'].includes(a.status)).length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({mockApplications.filter(a => a.status === 'accepted').length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({mockApplications.filter(a => ['rejected', 'withdrawn'].includes(a.status)).length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card
            key={app.id}
            className="p-6 bg-card border-border hover:border-primary/30 transition-all cursor-pointer"
            onClick={() => { setSelectedApplication(app); setShowDetailModal(true); }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <img
                src={app.job.companyLogo}
                alt={app.job.company}
                className="w-14 h-14 rounded-lg border border-border"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{app.job.title}</h3>
                    <p className="text-sm text-muted-foreground">{app.job.company}</p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {getStatusIcon(app.status)}
                    <span className="ml-1">{app.status}</span>
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {app.job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Your bid: ${app.bidAmount}/{app.bidType === 'hourly' ? 'hr' : 'fixed'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Applied {new Date(app.submittedAt).toLocaleDateString()}
                  </span>
                  {app.messages > 0 && (
                    <span className="flex items-center gap-1 text-primary">
                      <MessageSquare className="w-4 h-4" />
                      {app.messages} messages
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {app.interviewScheduled && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Calendar className="w-3 h-3 mr-1" />
                    Interview Scheduled
                  </Badge>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Submitted
                </span>
                {app.viewedAt && (
                  <>
                    <span className="w-8 h-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-blue-400" />
                      Viewed {new Date(app.viewedAt).toLocaleDateString()}
                    </span>
                  </>
                )}
                {app.status === 'shortlisted' && (
                  <>
                    <span className="w-8 h-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      Shortlisted
                    </span>
                  </>
                )}
                {app.interviewScheduled && (
                  <>
                    <span className="w-8 h-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      Interview {new Date(app.interviewScheduled).toLocaleDateString()}
                    </span>
                  </>
                )}
                {app.status === 'accepted' && (
                  <>
                    <span className="w-8 h-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      Hired!
                    </span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card className="p-12 bg-card border-border text-center">
            <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or browse for new jobs</p>
          </Card>
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedApplication.job.companyLogo}
                    alt={selectedApplication.job.company}
                    className="w-16 h-16 rounded-lg border border-border"
                  />
                  <div>
                    <DialogTitle>{selectedApplication.job.title}</DialogTitle>
                    <DialogDescription>
                      {selectedApplication.job.company} • {selectedApplication.job.location}
                    </DialogDescription>
                    <Badge className={cn('mt-2', getStatusColor(selectedApplication.status))}>
                      {getStatusIcon(selectedApplication.status)}
                      <span className="ml-1 capitalize">{selectedApplication.status}</span>
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Your Proposal</h4>
                  <Card className="p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground">{selectedApplication.coverLetter}</p>
                  </Card>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bid Amount</p>
                    <p className="font-semibold">${selectedApplication.bidAmount}/{selectedApplication.bidType === 'hourly' ? 'hr' : 'fixed'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{selectedApplication.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Applied On</p>
                    <p className="font-semibold">{new Date(selectedApplication.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedApplication.interviewScheduled && (
                  <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="font-semibold">Interview Scheduled</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedApplication.interviewScheduled).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <div>
                  <h4 className="font-semibold mb-3">Activity Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Send className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium">Application Submitted</p>
                        <p className="text-muted-foreground">{new Date(selectedApplication.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedApplication.viewedAt && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Viewed by Employer</p>
                          <p className="text-muted-foreground">{new Date(selectedApplication.viewedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {selectedApplication.status === 'shortlisted' && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium">Added to Shortlist</p>
                          <p className="text-muted-foreground">You're being considered!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>Close</Button>
                {selectedApplication.messages > 0 && (
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages ({selectedApplication.messages})
                  </Button>
                )}
                {selectedApplication.status === 'pending' && (
                  <Button variant="ghost" className="text-red-400">
                    Withdraw Application
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
