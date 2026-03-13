import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Zap,
  Bot,
  Target,
  Send,
  Search,
  Play,
  Pause,
  Settings,
  Plus,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Activity,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Globe,
  DollarSign,
  Star,
  Eye,
  MoreVertical,
  Sparkles,
  Layers,
  FileText,
  Users,
  Calendar,
  Briefcase,
  Award,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/contexts/ToastContext';

interface BidRule {
  id: string;
  name: string;
  platform: 'upwork' | 'fiverr' | 'freelancer' | 'all';
  status: 'active' | 'paused';
  keywords: string[];
  minBudget: number;
  maxBudget: number;
  bidAmount: { type: 'fixed' | 'percentage'; value: number };
  aiPrompt: string;
  dailyLimit: number;
  bidsToday: number;
  successRate: number;
  lastBid: string;
}

interface RecentBid {
  id: string;
  jobTitle: string;
  platform: 'upwork' | 'fiverr' | 'freelancer';
  clientName: string;
  budget: string;
  bidAmount: number;
  status: 'pending' | 'viewed' | 'shortlisted' | 'rejected' | 'won';
  submittedAt: string;
  matchScore: number;
}

interface JobMatch {
  id: string;
  title: string;
  platform: 'upwork' | 'fiverr' | 'freelancer';
  clientName: string;
  budget: { min: number; max: number };
  description: string;
  skills: string[];
  postedAt: string;
  matchScore: number;
  autoBidEligible: boolean;
  clientRating: number;
  clientHireRate: number;
}

const mockBidRules: BidRule[] = [
  {
    id: 'rule-1',
    name: 'React Developer Jobs',
    platform: 'upwork',
    status: 'active',
    keywords: ['React', 'TypeScript', 'Next.js', 'Frontend'],
    minBudget: 1000,
    maxBudget: 10000,
    bidAmount: { type: 'percentage', value: 15 },
    aiPrompt: 'Write a professional proposal highlighting my 5+ years of React experience...',
    dailyLimit: 10,
    bidsToday: 7,
    successRate: 24,
    lastBid: '15 min ago',
  },
  {
    id: 'rule-2',
    name: 'Full Stack Projects',
    platform: 'all',
    status: 'active',
    keywords: ['Full Stack', 'Node.js', 'PostgreSQL', 'AWS'],
    minBudget: 2000,
    maxBudget: 15000,
    bidAmount: { type: 'fixed', value: 2500 },
    aiPrompt: 'Emphasize my full stack capabilities and previous successful projects...',
    dailyLimit: 8,
    bidsToday: 5,
    successRate: 31,
    lastBid: '45 min ago',
  },
  {
    id: 'rule-3',
    name: 'UI/UX Design',
    platform: 'fiverr',
    status: 'paused',
    keywords: ['UI Design', 'UX', 'Figma', 'Web Design'],
    minBudget: 500,
    maxBudget: 5000,
    bidAmount: { type: 'percentage', value: 20 },
    aiPrompt: 'Showcase my design portfolio and mention quick turnaround times...',
    dailyLimit: 5,
    bidsToday: 0,
    successRate: 18,
    lastBid: '2 days ago',
  },
];

const mockRecentBids: RecentBid[] = [
  {
    id: 'bid-1',
    jobTitle: 'Build a React Dashboard Application',
    platform: 'upwork',
    clientName: 'TechCorp Inc',
    budget: '$3,000 - $5,000',
    bidAmount: 3500,
    status: 'shortlisted',
    submittedAt: '15 min ago',
    matchScore: 94,
  },
  {
    id: 'bid-2',
    jobTitle: 'E-commerce Website Development',
    platform: 'freelancer',
    clientName: 'Fashion Brand Co',
    budget: '$2,500 - $4,000',
    bidAmount: 3200,
    status: 'viewed',
    submittedAt: '1 hour ago',
    matchScore: 87,
  },
  {
    id: 'bid-3',
    jobTitle: 'Mobile App UI Design',
    platform: 'fiverr',
    clientName: 'StartupXYZ',
    budget: '$1,000 - $2,000',
    bidAmount: 1500,
    status: 'pending',
    submittedAt: '2 hours ago',
    matchScore: 82,
  },
  {
    id: 'bid-4',
    jobTitle: 'API Integration Project',
    platform: 'upwork',
    clientName: 'DataFlow Systems',
    budget: '$1,500 - $3,000',
    bidAmount: 2000,
    status: 'rejected',
    submittedAt: '3 hours ago',
    matchScore: 75,
  },
  {
    id: 'bid-5',
    jobTitle: 'Landing Page Design & Development',
    platform: 'upwork',
    clientName: 'Marketing Agency',
    budget: '$500 - $1,000',
    bidAmount: 800,
    status: 'won',
    submittedAt: '1 day ago',
    matchScore: 91,
  },
];

const mockJobMatches: JobMatch[] = [
  {
    id: 'job-1',
    title: 'Senior React Developer for SaaS Platform',
    platform: 'upwork',
    clientName: 'CloudTech Solutions',
    budget: { min: 5000, max: 8000 },
    description: 'We need an experienced React developer to help build our new SaaS dashboard...',
    skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS'],
    postedAt: '10 min ago',
    matchScore: 96,
    autoBidEligible: true,
    clientRating: 4.9,
    clientHireRate: 85,
  },
  {
    id: 'job-2',
    title: 'Full Stack Developer for E-commerce',
    platform: 'freelancer',
    clientName: 'ShopEasy Ltd',
    budget: { min: 3000, max: 6000 },
    description: 'Looking for a full stack developer to build our new e-commerce platform...',
    skills: ['Node.js', 'React', 'PostgreSQL', 'Stripe'],
    postedAt: '25 min ago',
    matchScore: 89,
    autoBidEligible: true,
    clientRating: 4.7,
    clientHireRate: 72,
  },
  {
    id: 'job-3',
    title: 'Next.js Website Development',
    platform: 'upwork',
    clientName: 'Digital Agency Pro',
    budget: { min: 2000, max: 4000 },
    description: 'Need a Next.js expert to build a marketing website with CMS integration...',
    skills: ['Next.js', 'React', 'Sanity CMS', 'Vercel'],
    postedAt: '45 min ago',
    matchScore: 92,
    autoBidEligible: true,
    clientRating: 5.0,
    clientHireRate: 90,
  },
];

const stats = [
  { label: 'Bids Today', value: '12', change: '+3', trend: 'up', icon: Send, color: 'cyan' },
  { label: 'Win Rate', value: '24%', change: '+5%', trend: 'up', icon: Award, color: 'emerald' },
  { label: 'Jobs Matched', value: '47', change: '+12', trend: 'up', icon: Target, color: 'purple' },
  { label: 'Avg Response', value: '2.3h', change: '-0.5h', trend: 'up', icon: Clock, color: 'amber' },
];

export default function AutoBiddingDashboard() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [bidRules, setBidRules] = useState<BidRule[]>(mockBidRules);
  const [recentBids, setRecentBids] = useState<RecentBid[]>(mockRecentBids);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>(mockJobMatches);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoBiddingEnabled, setIsAutoBiddingEnabled] = useState(true);

  const [newRule, setNewRule] = useState({
    name: '',
    platform: 'all',
    keywords: '',
    minBudget: 500,
    maxBudget: 5000,
    bidType: 'percentage',
    bidValue: 15,
    dailyLimit: 10,
    aiPrompt: '',
  });

  const handleToggleRule = (ruleId: string) => {
    setBidRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        const newStatus = rule.status === 'active' ? 'paused' : 'active';
        showToast(`Rule ${newStatus === 'active' ? 'activated' : 'paused'}`, 'success');
        return { ...rule, status: newStatus };
      }
      return rule;
    }));
  };

  const handleCreateRule = () => {
    showToast('Bidding rule created successfully', 'success');
    setIsCreateRuleOpen(false);
    setNewRule({
      name: '',
      platform: 'all',
      keywords: '',
      minBudget: 500,
      maxBudget: 5000,
      bidType: 'percentage',
      bidValue: 15,
      dailyLimit: 10,
      aiPrompt: '',
    });
  };

  const handleManualBid = (job: JobMatch) => {
    showToast(`Bid submitted for "${job.title}"`, 'success');
    setSelectedJob(null);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'upwork': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'fiverr': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'freelancer': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'all': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'viewed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shortlisted': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'won': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Auto-Bidding Dashboard
          </h1>
          <p className="text-muted-foreground">Manage automated job bidding across platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <span className="text-sm text-muted-foreground">Auto-Bidding</span>
            <Switch
              checked={isAutoBiddingEnabled}
              onCheckedChange={(checked) => {
                setIsAutoBiddingEnabled(checked);
                showToast(`Auto-bidding ${checked ? 'enabled' : 'disabled'}`, 'success');
              }}
            />
          </div>
          <Button
            onClick={() => setIsCreateRuleOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Rule
          </Button>
        </div>
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rules">
            <Settings className="w-4 h-4 mr-2" />
            Bidding Rules
          </TabsTrigger>
          <TabsTrigger value="matches">
            <Target className="w-4 h-4 mr-2" />
            Job Matches
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="w-4 h-4 mr-2" />
            Bid History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Rules Summary */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Active Rules
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('rules')}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {bidRules.filter(r => r.status === 'active').slice(0, 3).map((rule) => (
                  <div key={rule.id} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{rule.name}</p>
                        <p className="text-xs text-muted-foreground">{rule.bidsToday}/{rule.dailyLimit} bids today</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getPlatformColor(rule.platform)}>
                      {rule.platform}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Bids */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Recent Bids
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('history')}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {recentBids.slice(0, 4).map((bid) => (
                  <div key={bid.id} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{bid.jobTitle}</p>
                      <p className="text-xs text-muted-foreground">{bid.clientName} • {bid.submittedAt}</p>
                    </div>
                    <Badge variant="outline" className={getBidStatusColor(bid.status)}>
                      {bid.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Job Matches */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Top Job Matches
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('matches')}>
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {jobMatches.slice(0, 3).map((job) => (
                <div key={job.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={getPlatformColor(job.platform)}>
                      {job.platform}
                    </Badge>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Target className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.matchScore}%</span>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{job.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">${job.budget.min} - ${job.budget.max}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {job.clientRating}
                    <span>•</span>
                    {job.clientHireRate}% hire rate
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Bidding Rules Tab */}
        <TabsContent value="rules" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-border">
                {bidRules.map((rule) => (
                  <div key={rule.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center`}>
                        <Target className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Badge variant="outline" className={getPlatformColor(rule.platform)}>
                            {rule.platform}
                          </Badge>
                          <Badge variant="outline" className={rule.status === 'active' 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }>
                            {rule.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {rule.keywords.slice(0, 4).map((kw) => (
                            <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>${rule.minBudget} - ${rule.maxBudget}</span>
                          <span>•</span>
                          <span>{rule.bidsToday}/{rule.dailyLimit} bids</span>
                          <span>•</span>
                          <span>{rule.successRate}% success rate</span>
                          <span>•</span>
                          <span>Last bid: {rule.lastBid}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.status === 'active'}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Job Matches Tab */}
        <TabsContent value="matches" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search jobs..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-border">
                {jobMatches.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getPlatformColor(job.platform)}>
                            {job.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{job.postedAt}</span>
                          {job.autoBidEligible && (
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                              <Zap className="w-3 h-3 mr-1" />
                              Auto-Bid Ready
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold mb-1">{job.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{job.clientName}</p>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-emerald-400">${job.budget.min} - ${job.budget.max}</span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            {job.clientRating}
                          </span>
                          <span className="text-muted-foreground">{job.clientHireRate}% hire rate</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-emerald-400" />
                          <span className="text-lg font-bold text-emerald-400">{job.matchScore}%</span>
                          <span className="text-xs text-muted-foreground">match</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0" onClick={() => setSelectedJob(job)}>
                            <Send className="w-4 h-4 mr-2" />
                            Bid
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Bid History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Bid History</h3>
              <p className="text-sm text-muted-foreground">Track all your submitted proposals</p>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-border">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{bid.jobTitle}</h4>
                          <Badge variant="outline" className={getPlatformColor(bid.platform)}>
                            {bid.platform}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{bid.clientName}</span>
                          <span>•</span>
                          <span>Budget: {bid.budget}</span>
                          <span>•</span>
                          <span>Your bid: ${bid.bidAmount}</span>
                          <span>•</span>
                          <span>{bid.submittedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{bid.matchScore}% match</p>
                        </div>
                        <Badge variant="outline" className={getBidStatusColor(bid.status)}>
                          {bid.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Rule Dialog */}
      <Dialog open={isCreateRuleOpen} onOpenChange={setIsCreateRuleOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Bidding Rule</DialogTitle>
            <DialogDescription>
              Set up automated bidding for jobs matching your criteria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rule Name *</label>
              <Input
                placeholder="e.g., React Developer Jobs"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={newRule.platform} onValueChange={(v) => setNewRule({ ...newRule, platform: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Keywords (comma separated)</label>
              <Input
                placeholder="e.g., React, TypeScript, Frontend"
                value={newRule.keywords}
                onChange={(e) => setNewRule({ ...newRule, keywords: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Min Budget ($)</label>
                <Input
                  type="number"
                  value={newRule.minBudget}
                  onChange={(e) => setNewRule({ ...newRule, minBudget: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Budget ($)</label>
                <Input
                  type="number"
                  value={newRule.maxBudget}
                  onChange={(e) => setNewRule({ ...newRule, maxBudget: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Bid Type</label>
                <Select value={newRule.bidType} onValueChange={(v) => setNewRule({ ...newRule, bidType: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage of Budget</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {newRule.bidType === 'percentage' ? 'Bid Percentage (%)' : 'Bid Amount ($)'}
                </label>
                <Input
                  type="number"
                  value={newRule.bidValue}
                  onChange={(e) => setNewRule({ ...newRule, bidValue: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Daily Bid Limit</label>
              <Slider
                value={[newRule.dailyLimit]}
                onValueChange={(v) => setNewRule({ ...newRule, dailyLimit: v[0] })}
                max={20}
                min={1}
                step={1}
              />
              <p className="text-xs text-muted-foreground mt-1">{newRule.dailyLimit} bids per day</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">AI Proposal Instructions</label>
              <Textarea
                placeholder="Instructions for AI to generate personalized proposals..."
                rows={4}
                value={newRule.aiPrompt}
                onChange={(e) => setNewRule({ ...newRule, aiPrompt: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRuleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRule} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
              Create Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Detail / Bid Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={getPlatformColor(selectedJob.platform)}>
                    {selectedJob.platform}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{selectedJob.postedAt}</span>
                </div>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>{selectedJob.clientName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-3 bg-muted/50">
                    <p className="text-lg font-bold text-emerald-400">{selectedJob.matchScore}%</p>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </Card>
                  <Card className="p-3 bg-muted/50">
                    <p className="text-lg font-bold">${selectedJob.budget.min}-${selectedJob.budget.max}</p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </Card>
                  <Card className="p-3 bg-muted/50">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <p className="text-lg font-bold">{selectedJob.clientRating}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Client Rating</p>
                  </Card>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Your Bid Amount</h4>
                  <Input type="number" placeholder="Enter your bid amount" defaultValue={Math.round((selectedJob.budget.min + selectedJob.budget.max) / 2)} />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cover Letter</h4>
                  <Textarea placeholder="Write your proposal or let AI generate one..." rows={4} />
                  <Button variant="outline" size="sm" className="mt-2">
                    <Bot className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedJob(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleManualBid(selectedJob)} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Bid
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
