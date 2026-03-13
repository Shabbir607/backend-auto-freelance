import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building2,
  Star,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Send,
  FileText,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Globe,
  Target,
  Zap,
  TrendingUp,
  MessageSquare,
  UserCheck,
  FileUp,
  Award,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';

// Types
interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  salary: {
    min: number;
    max: number;
    currency: string;
    type: 'hourly' | 'fixed' | 'monthly';
  };
  skills: string[];
  category: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'expert';
  projectType: 'full-time' | 'part-time' | 'contract' | 'freelance';
  deadline: string;
  postedAt: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  applicants: number;
  views: number;
  postedBy: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  attachments?: string[];
  urgent?: boolean;
  featured?: boolean;
}

interface Application {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerTitle: string;
  coverLetter: string;
  bidAmount: number;
  bidType: 'hourly' | 'fixed';
  estimatedDuration: string;
  cv?: string;
  portfolio?: string[];
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  submittedAt: string;
  rating: number;
  completedProjects: number;
  successRate: number;
}

// Mock Data
const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Full Stack Developer for E-commerce Platform',
    description: 'We are looking for an experienced full stack developer to build a modern e-commerce platform using React, Node.js, and PostgreSQL. The ideal candidate should have experience with payment integrations and scalable architecture.',
    company: 'TechStart Inc',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    location: 'San Francisco, CA',
    locationType: 'remote',
    salary: { min: 80, max: 120, currency: 'USD', type: 'hourly' },
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
    category: 'Web Development',
    experienceLevel: 'senior',
    projectType: 'contract',
    deadline: '2024-02-15',
    postedAt: '2024-01-20T10:00:00Z',
    status: 'open',
    applicants: 24,
    views: 156,
    postedBy: { id: 'user-1', name: 'Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', role: 'CTO' },
    urgent: true,
    featured: true,
  },
  {
    id: 'job-2',
    title: 'UI/UX Designer for Mobile App',
    description: 'Design a complete mobile app UI/UX for a fitness tracking application. We need wireframes, high-fidelity mockups, and a design system.',
    company: 'FitTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80',
    location: 'New York, NY',
    locationType: 'hybrid',
    salary: { min: 5000, max: 8000, currency: 'USD', type: 'fixed' },
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    category: 'Design',
    experienceLevel: 'mid',
    projectType: 'freelance',
    deadline: '2024-02-28',
    postedAt: '2024-01-18T14:30:00Z',
    status: 'open',
    applicants: 18,
    views: 89,
    postedBy: { id: 'user-2', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', role: 'Product Manager' },
    featured: true,
  },
  {
    id: 'job-3',
    title: 'Data Scientist for ML Pipeline',
    description: 'Build and optimize machine learning pipelines for customer behavior prediction. Experience with Python, TensorFlow, and cloud platforms required.',
    company: 'DataDriven Co',
    location: 'Austin, TX',
    locationType: 'remote',
    salary: { min: 100, max: 150, currency: 'USD', type: 'hourly' },
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'AWS', 'SQL'],
    category: 'Data Science',
    experienceLevel: 'expert',
    projectType: 'contract',
    deadline: '2024-03-01',
    postedAt: '2024-01-15T09:00:00Z',
    status: 'in-progress',
    applicants: 12,
    views: 67,
    postedBy: { id: 'user-3', name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', role: 'Data Lead' },
  },
];

const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    freelancerId: 'fl-1',
    freelancerName: 'Alex Thompson',
    freelancerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    freelancerTitle: 'Senior Full Stack Developer',
    coverLetter: 'I am excited to apply for this position. With 8 years of experience in building scalable e-commerce platforms...',
    bidAmount: 95,
    bidType: 'hourly',
    estimatedDuration: '3 months',
    cv: 'alex_thompson_cv.pdf',
    portfolio: ['https://portfolio.com/project1', 'https://portfolio.com/project2'],
    status: 'pending',
    submittedAt: '2024-01-21T08:30:00Z',
    rating: 4.9,
    completedProjects: 45,
    successRate: 98,
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    freelancerId: 'fl-2',
    freelancerName: 'Jessica Park',
    freelancerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    freelancerTitle: 'Full Stack Engineer',
    coverLetter: 'I have extensive experience with React and Node.js, having built multiple e-commerce solutions...',
    bidAmount: 85,
    bidType: 'hourly',
    estimatedDuration: '2.5 months',
    cv: 'jessica_park_cv.pdf',
    status: 'shortlisted',
    submittedAt: '2024-01-21T10:15:00Z',
    rating: 4.8,
    completedProjects: 32,
    successRate: 96,
  },
  {
    id: 'app-3',
    jobId: 'job-1',
    freelancerId: 'fl-3',
    freelancerName: 'David Kim',
    freelancerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    freelancerTitle: 'Senior Software Engineer',
    coverLetter: 'As a senior engineer with a focus on scalable architectures, I am confident I can deliver...',
    bidAmount: 110,
    bidType: 'hourly',
    estimatedDuration: '2 months',
    cv: 'david_kim_cv.pdf',
    status: 'pending',
    submittedAt: '2024-01-22T14:00:00Z',
    rating: 5.0,
    completedProjects: 67,
    successRate: 99,
  },
];

const categories = [
  'All Categories',
  'Web Development',
  'Mobile Development',
  'Design',
  'Data Science',
  'DevOps',
  'Marketing',
  'Writing',
  'Video & Animation',
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'expert', label: 'Expert' },
];

const projectTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
];

export default function AgencyJobBoard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  // Form states for creating job
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: '',
    skills: '',
    experienceLevel: 'mid',
    projectType: 'contract',
    locationType: 'remote',
    location: '',
    salaryMin: '',
    salaryMax: '',
    salaryType: 'hourly',
    deadline: '',
  });

  // Form states for applying
  const [application, setApplication] = useState({
    coverLetter: '',
    bidAmount: '',
    bidType: 'hourly',
    estimatedDuration: '',
    cv: null as File | null,
  });

  const isAgency = user?.role === 'admin' || user?.role === 'superadmin';

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateJob = () => {
    const job: Job = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      description: newJob.description,
      company: 'Your Agency',
      location: newJob.location,
      locationType: newJob.locationType as any,
      salary: {
        min: parseInt(newJob.salaryMin) || 0,
        max: parseInt(newJob.salaryMax) || 0,
        currency: 'USD',
        type: newJob.salaryType as any,
      },
      skills: newJob.skills.split(',').map(s => s.trim()),
      category: newJob.category,
      experienceLevel: newJob.experienceLevel as any,
      projectType: newJob.projectType as any,
      deadline: newJob.deadline,
      postedAt: new Date().toISOString(),
      status: 'open',
      applicants: 0,
      views: 0,
      postedBy: {
        id: user?.id || '',
        name: user?.name || '',
        avatar: user?.avatar || '',
        role: user?.role || '',
      },
    };
    setJobs(prev => [job, ...prev]);
    setShowCreateJobModal(false);
    setNewJob({
      title: '',
      description: '',
      category: '',
      skills: '',
      experienceLevel: 'mid',
      projectType: 'contract',
      locationType: 'remote',
      location: '',
      salaryMin: '',
      salaryMax: '',
      salaryType: 'hourly',
      deadline: '',
    });
    showToast({ title: 'Job Posted', description: 'Your job has been posted successfully!', type: 'success' });
  };

  const handleApply = () => {
    if (!selectedJob) return;
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId: selectedJob.id,
      freelancerId: user?.id || '',
      freelancerName: user?.name || '',
      freelancerAvatar: user?.avatar || '',
      freelancerTitle: 'Freelancer',
      coverLetter: application.coverLetter,
      bidAmount: parseInt(application.bidAmount) || 0,
      bidType: application.bidType as any,
      estimatedDuration: application.estimatedDuration,
      cv: application.cv?.name,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      rating: 4.5,
      completedProjects: 10,
      successRate: 95,
    };
    setApplications(prev => [...prev, newApplication]);
    setShowApplyModal(false);
    setApplication({ coverLetter: '', bidAmount: '', bidType: 'hourly', estimatedDuration: '', cv: null });
    showToast({ title: 'Application Submitted', description: 'Your proposal has been sent!', type: 'success' });
  };

  const handleApplicationAction = (appId: string, action: 'shortlist' | 'accept' | 'reject') => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: action === 'shortlist' ? 'shortlisted' : action === 'accept' ? 'accepted' : 'rejected' };
      }
      return app;
    }));
    showToast({ title: 'Application Updated', description: `Application has been ${action}ed`, type: 'success' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'in-progress': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'completed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shortlisted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'accepted': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Board</h1>
          <p className="text-muted-foreground">
            {isAgency ? 'Post jobs and manage applications' : 'Find and apply for freelance opportunities'}
          </p>
        </div>
        {isAgency && (
          <Button onClick={() => setShowCreateJobModal(true)} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'open').length}</p>
              <p className="text-sm text-muted-foreground">Open Jobs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.length}</p>
              <p className="text-sm text-muted-foreground">Applications</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">$45K</p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          {isAgency && <TabsTrigger value="my-jobs">My Posted Jobs</TabsTrigger>}
          {isAgency && <TabsTrigger value="applications">Applications</TabsTrigger>}
          {!isAgency && <TabsTrigger value="my-applications">My Applications</TabsTrigger>}
        </TabsList>

        {/* Browse Jobs Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Filters */}
          <Card className="p-4 bg-card border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, skills, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Job List */}
          <div className="grid gap-4">
            {filteredJobs.map(job => (
              <Card
                key={job.id}
                className="p-6 bg-card border-border hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => { setSelectedJob(job); setShowJobModal(true); }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {job.companyLogo && (
                    <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-lg border border-border" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {job.urgent && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>}
                          {job.featured && <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Featured</Badge>}
                        </div>
                        <p className="text-muted-foreground mt-1">{job.company}</p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.slice(0, 5).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {job.skills.length > 5 && (
                        <Badge variant="outline" className="text-xs">+{job.skills.length - 5}</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location} • {job.locationType}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${job.salary.min}-${job.salary.max}/{job.salary.type === 'hourly' ? 'hr' : job.salary.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Posted Jobs Tab (Agency) */}
        {isAgency && (
          <TabsContent value="my-jobs" className="space-y-4">
            <div className="grid gap-4">
              {jobs.map(job => (
                <Card key={job.id} className="p-6 bg-card border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{job.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit Job</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-400"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span>{job.views} views</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Applications Tab (Agency) */}
        {isAgency && (
          <TabsContent value="applications" className="space-y-4">
            <div className="grid gap-4">
              {applications.map(app => (
                <Card key={app.id} className="p-6 bg-card border-border">
                  <div className="flex items-start gap-4">
                    <img src={app.freelancerAvatar} alt={app.freelancerName} className="w-12 h-12 rounded-full border border-border" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{app.freelancerName}</h3>
                          <p className="text-sm text-muted-foreground">{app.freelancerTitle}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {app.rating}
                        </span>
                        <span>{app.completedProjects} projects</span>
                        <span className="text-emerald-400">{app.successRate}% success</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{app.coverLetter}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium">${app.bidAmount}/{app.bidType === 'hourly' ? 'hr' : 'fixed'}</span>
                          <span className="text-muted-foreground">Duration: {app.estimatedDuration}</span>
                          {app.cv && (
                            <Button variant="ghost" size="sm" className="h-7">
                              <FileText className="w-4 h-4 mr-1" />
                              View CV
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {app.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleApplicationAction(app.id, 'shortlist')}>
                                Shortlist
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400" onClick={() => handleApplicationAction(app.id, 'reject')}>
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === 'shortlisted' && (
                            <>
                              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" onClick={() => handleApplicationAction(app.id, 'accept')}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400" onClick={() => handleApplicationAction(app.id, 'reject')}>
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* My Applications Tab (Freelancer) */}
        {!isAgency && (
          <TabsContent value="my-applications" className="space-y-4">
            <div className="grid gap-4">
              {applications.map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <Card key={app.id} className="p-6 bg-card border-border">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{job?.title || 'Job'}</h3>
                        <p className="text-sm text-muted-foreground">{job?.company}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <span>Bid: ${app.bidAmount}/{app.bidType === 'hourly' ? 'hr' : 'fixed'}</span>
                      <span>Duration: {app.estimatedDuration}</span>
                      <span className="text-muted-foreground">Submitted {new Date(app.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Job Detail Modal */}
      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  {selectedJob.companyLogo && (
                    <img src={selectedJob.companyLogo} alt={selectedJob.company} className="w-16 h-16 rounded-lg border border-border" />
                  )}
                  <div>
                    <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedJob.company} • {selectedJob.location}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(selectedJob.status)}>{selectedJob.status}</Badge>
                  <Badge variant="outline">{selectedJob.locationType}</Badge>
                  <Badge variant="outline">{selectedJob.experienceLevel} level</Badge>
                  <Badge variant="outline">{selectedJob.projectType}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Budget</h4>
                    <p className="text-muted-foreground">
                      ${selectedJob.salary.min} - ${selectedJob.salary.max} {selectedJob.salary.currency}/{selectedJob.salary.type === 'hourly' ? 'hr' : selectedJob.salary.type}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Deadline</h4>
                    <p className="text-muted-foreground">{new Date(selectedJob.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setShowJobModal(false)}>Close</Button>
                {!isAgency && selectedJob.status === 'open' && (
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
                    onClick={() => { setShowJobModal(false); setShowApplyModal(true); }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Proposal</DialogTitle>
            <DialogDescription>Apply for: {selectedJob?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Cover Letter</Label>
              <Textarea
                placeholder="Explain why you're the best fit for this job..."
                value={application.coverLetter}
                onChange={(e) => setApplication(prev => ({ ...prev, coverLetter: e.target.value }))}
                rows={6}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Bid Amount ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 85"
                  value={application.bidAmount}
                  onChange={(e) => setApplication(prev => ({ ...prev, bidAmount: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Bid Type</Label>
                <Select value={application.bidType} onValueChange={(v) => setApplication(prev => ({ ...prev, bidType: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Estimated Duration</Label>
              <Input
                placeholder="e.g. 2-3 months"
                value={application.estimatedDuration}
                onChange={(e) => setApplication(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Upload CV/Resume</Label>
              <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApplication(prev => ({ ...prev, cv: e.target.files?.[0] || null }))}
                  className="hidden"
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {application.cv ? application.cv.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowApplyModal(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
              onClick={handleApply}
              disabled={!application.coverLetter || !application.bidAmount}
            >
              Submit Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Job Modal */}
      <Dialog open={showCreateJobModal} onOpenChange={setShowCreateJobModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>Create a new job posting for freelancers</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>Job Title</Label>
              <Input
                placeholder="e.g. Full Stack Developer for E-commerce Platform"
                value={newJob.title}
                onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the job requirements, responsibilities, and expectations..."
                value={newJob.description}
                onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                rows={5}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={newJob.category} onValueChange={(v) => setNewJob(prev => ({ ...prev, category: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== 'All Categories').map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select value={newJob.experienceLevel} onValueChange={(v) => setNewJob(prev => ({ ...prev, experienceLevel: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Required Skills (comma separated)</Label>
              <Input
                placeholder="e.g. React, Node.js, PostgreSQL, TypeScript"
                value={newJob.skills}
                onChange={(e) => setNewJob(prev => ({ ...prev, skills: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Project Type</Label>
                <Select value={newJob.projectType} onValueChange={(v) => setNewJob(prev => ({ ...prev, projectType: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Location Type</Label>
                <Select value={newJob.locationType} onValueChange={(v) => setNewJob(prev => ({ ...prev, locationType: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="e.g. San Francisco, CA"
                value={newJob.location}
                onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Min Budget ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={newJob.salaryMin}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salaryMin: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Max Budget ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 100"
                  value={newJob.salaryMax}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salaryMax: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Payment Type</Label>
                <Select value={newJob.salaryType} onValueChange={(v) => setNewJob(prev => ({ ...prev, salaryType: v }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Application Deadline</Label>
              <Input
                type="date"
                value={newJob.deadline}
                onChange={(e) => setNewJob(prev => ({ ...prev, deadline: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowCreateJobModal(false)}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
              onClick={handleCreateJob}
              disabled={!newJob.title || !newJob.description || !newJob.category}
            >
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
