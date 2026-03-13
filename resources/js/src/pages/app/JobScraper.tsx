import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  Star, 
  Clock, 
  DollarSign, 
  MapPin,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  Building,
  User,
  Calendar,
  Zap,
  Target,
  Shield,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  company: string;
  platform: 'upwork' | 'freelancer' | 'linkedin' | 'indeed' | 'fiverr';
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  budget: string;
  budgetType: 'hourly' | 'fixed';
  description: string;
  skills: string[];
  postedAt: string;
  clientRating?: number;
  clientSpent?: string;
  proposals?: number;
  successScore: number;
  risks: string[];
  matchScore: number;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer for SaaS Platform',
    company: 'TechStartup Inc.',
    platform: 'upwork',
    location: 'Remote',
    type: 'remote',
    budget: '$50-80/hr',
    budgetType: 'hourly',
    description: 'Looking for an experienced React developer to help build our next-generation SaaS platform. Must have experience with TypeScript, Redux, and modern React patterns.',
    skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'PostgreSQL'],
    postedAt: '2 hours ago',
    clientRating: 4.9,
    clientSpent: '$150K+',
    proposals: 12,
    successScore: 95,
    risks: [],
    matchScore: 98,
  },
  {
    id: '2',
    title: 'Full Stack Developer - E-commerce Project',
    company: 'RetailCo',
    platform: 'freelancer',
    location: 'United States',
    type: 'remote',
    budget: '$15,000',
    budgetType: 'fixed',
    description: 'Need a full-stack developer to build a complete e-commerce solution with payment integration, inventory management, and admin dashboard.',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    postedAt: '5 hours ago',
    clientRating: 4.5,
    clientSpent: '$50K+',
    proposals: 28,
    successScore: 82,
    risks: ['High competition', 'Scope may expand'],
    matchScore: 92,
  },
  {
    id: '3',
    title: 'Backend Engineer - API Development',
    company: 'FinTech Solutions',
    platform: 'linkedin',
    location: 'New York, NY',
    type: 'hybrid',
    budget: '$120-150K/year',
    budgetType: 'fixed',
    description: 'Join our team to build scalable APIs for our financial services platform. Experience with microservices and cloud infrastructure required.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes'],
    postedAt: '1 day ago',
    clientRating: undefined,
    proposals: undefined,
    successScore: 78,
    risks: ['Requires relocation', 'Long interview process'],
    matchScore: 85,
  },
  {
    id: '4',
    title: 'WordPress Developer for Blog Migration',
    company: 'ContentMedia',
    platform: 'upwork',
    location: 'Remote',
    type: 'remote',
    budget: '$500-1000',
    budgetType: 'fixed',
    description: 'Need help migrating our blog from an old CMS to WordPress. Should include SEO optimization and performance improvements.',
    skills: ['WordPress', 'PHP', 'MySQL', 'SEO'],
    postedAt: '3 hours ago',
    clientRating: 3.2,
    clientSpent: '$5K',
    proposals: 45,
    successScore: 45,
    risks: ['Low client rating', 'Budget too low for scope', 'High competition'],
    matchScore: 60,
  },
  {
    id: '5',
    title: 'Mobile App Developer - React Native',
    company: 'HealthTech Startup',
    platform: 'indeed',
    location: 'San Francisco, CA',
    type: 'remote',
    budget: '$60-90/hr',
    budgetType: 'hourly',
    description: 'Building a health tracking mobile app. Looking for someone with React Native experience and knowledge of health data APIs.',
    skills: ['React Native', 'TypeScript', 'Firebase', 'HealthKit', 'Google Fit'],
    postedAt: '6 hours ago',
    successScore: 88,
    risks: ['Requires health data compliance knowledge'],
    matchScore: 90,
  },
];

const platformColors: Record<string, string> = {
  upwork: 'bg-green-500/20 text-green-400 border-green-500/30',
  freelancer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  linkedin: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  indeed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  fiverr: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export default function JobScraper() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh simulation
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPlatform = platformFilter === 'all' || job.platform === platformFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    return matchesSearch && matchesPlatform && matchesType;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Job Scraper</h1>
          <p className="text-nexus-muted mt-1">
            Aggregated job listings from multiple platforms • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            <Label className="text-sm text-nexus-muted">Auto-refresh</Label>
          </div>
          <Button 
            variant="outline" 
            className="border-nexus-border"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.length}</p>
              <p className="text-xs text-nexus-muted">Total Jobs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Target className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.matchScore >= 80).length}</p>
              <p className="text-xs text-nexus-muted">High Match</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-xs text-nexus-muted">Avg Success</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{jobs.filter(j => j.risks.length > 0).length}</p>
              <p className="text-xs text-nexus-muted">With Risks</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-nexus-card border-nexus-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-muted" />
            <Input
              placeholder="Search jobs, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-nexus-black border-nexus-border"
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-40 bg-nexus-black border-nexus-border">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="upwork">Upwork</SelectItem>
              <SelectItem value="freelancer">Freelancer</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="indeed">Indeed</SelectItem>
              <SelectItem value="fiverr">Fiverr</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-40 bg-nexus-black border-nexus-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className={cn(
                "p-4 bg-nexus-card border-nexus-border hover:border-cyan-500/30 transition-all cursor-pointer",
                selectedJob?.id === job.id && "border-cyan-500/50 bg-cyan-500/5"
              )}
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={platformColors[job.platform]}>
                      {job.platform.charAt(0).toUpperCase() + job.platform.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="border-nexus-border">
                      {job.type}
                    </Badge>
                    <span className="text-xs text-nexus-muted">{job.postedAt}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1 hover:text-cyan-400 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-nexus-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.budget}
                    </span>
                  </div>

                  <p className="text-sm text-nexus-muted line-clamp-2 mb-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} className="bg-nexus-border text-nexus-muted border-0 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge className="bg-nexus-border text-nexus-muted border-0 text-xs">
                        +{job.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Scores */}
                <div className="flex md:flex-col items-center gap-3">
                  <div className={cn("p-3 rounded-lg border text-center", getScoreBg(job.successScore))}>
                    <p className={cn("text-2xl font-bold", getScoreColor(job.successScore))}>
                      {job.successScore}%
                    </p>
                    <p className="text-xs text-nexus-muted">Success</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-center">
                    <p className="text-2xl font-bold text-cyan-400">{job.matchScore}%</p>
                    <p className="text-xs text-nexus-muted">Match</p>
                  </div>
                </div>
              </div>

              {/* Risk Indicators */}
              {job.risks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-nexus-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    {job.risks.map((risk, index) => (
                      <Badge key={index} className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs">
                        {risk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}

          {filteredJobs.length === 0 && (
            <Card className="p-12 bg-nexus-card border-nexus-border text-center">
              <Search className="w-12 h-12 text-nexus-muted mx-auto mb-4" />
              <p className="text-nexus-muted">No jobs match your search criteria</p>
            </Card>
          )}
        </div>

        {/* Job Details Panel */}
        <div className="lg:col-span-1">
          {selectedJob ? (
            <Card className="p-6 bg-nexus-card border-nexus-border sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className={platformColors[selectedJob.platform]}>
                  {selectedJob.platform.charAt(0).toUpperCase() + selectedJob.platform.slice(1)}
                </Badge>
                <Button size="sm" className="gradient-primary text-white border-0">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Apply
                </Button>
              </div>

              <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
              <p className="text-nexus-muted text-sm mb-4">{selectedJob.company}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-nexus-muted" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-nexus-muted" />
                  <span>{selectedJob.budget} ({selectedJob.budgetType})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-nexus-muted" />
                  <span>Posted {selectedJob.postedAt}</span>
                </div>
                {selectedJob.clientRating && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{selectedJob.clientRating} client rating</span>
                  </div>
                )}
                {selectedJob.proposals !== undefined && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-nexus-muted" />
                    <span>{selectedJob.proposals} proposals</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-nexus-muted">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <Badge key={index} className="bg-nexus-border text-white border-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Predictive Insights */}
              <div className="p-4 rounded-lg bg-nexus-black border border-nexus-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Predictive Insights
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-nexus-muted">Success Score</span>
                      <span className={cn("font-semibold", getScoreColor(selectedJob.successScore))}>
                        {selectedJob.successScore}%
                      </span>
                    </div>
                    <Progress value={selectedJob.successScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-nexus-muted">Profile Match</span>
                      <span className="font-semibold text-cyan-400">{selectedJob.matchScore}%</span>
                    </div>
                    <Progress value={selectedJob.matchScore} className="h-2" />
                  </div>
                </div>

                {selectedJob.risks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-nexus-border">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      Risk Factors
                    </h4>
                    <ul className="space-y-1">
                      {selectedJob.risks.map((risk, index) => (
                        <li key={index} className="text-sm text-yellow-400 flex items-center gap-2">
                          <XCircle className="w-3 h-3" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.risks.length === 0 && (
                  <div className="mt-4 pt-4 border-t border-nexus-border">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">No significant risks detected</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-12 bg-nexus-card border-nexus-border text-center">
              <Briefcase className="w-12 h-12 text-nexus-muted mx-auto mb-4" />
              <p className="text-nexus-muted">Select a job to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
