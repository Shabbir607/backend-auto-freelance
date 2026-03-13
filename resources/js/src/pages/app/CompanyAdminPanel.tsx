import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Star,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Zap,
  Bot,
  BarChart3,
  Activity,
  Shield,
  UserPlus,
  UserCheck,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Workflow,
  Send,
} from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

// Types
interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  employees: number;
  activeJobs: number;
  totalHires: number;
  subscription: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastActivity: string;
  settings: {
    autoApproveApplications: boolean;
    emailNotifications: boolean;
    autoBidding: boolean;
    aiAssistant: boolean;
  };
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'recruiter' | 'viewer';
  department: string;
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActive: string;
}

interface BillingInfo {
  plan: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod: string;
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
  }>;
}

interface AutomationRule {
  id: string;
  name: string;
  type: 'job-posting' | 'application-review' | 'interview-scheduling' | 'offer-letter';
  status: 'active' | 'paused';
  runsToday: number;
  successRate: number;
  lastRun: string;
}

// Mock Data
const mockCompany: Company = {
  id: 'company-1',
  name: 'TechStart Inc',
  logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
  industry: 'Technology',
  website: 'https://techstart.io',
  email: 'contact@techstart.io',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, San Francisco, CA 94105',
  description: 'Leading technology company specializing in AI-powered automation solutions for businesses.',
  employees: 150,
  activeJobs: 12,
  totalHires: 45,
  subscription: 'enterprise',
  status: 'active',
  createdAt: '2023-06-15',
  lastActivity: '2 minutes ago',
  settings: {
    autoApproveApplications: false,
    emailNotifications: true,
    autoBidding: true,
    aiAssistant: true,
  },
};

const mockTeamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Sarah Mitchell',
    email: 'sarah@techstart.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    role: 'admin',
    department: 'Executive',
    status: 'active',
    joinedAt: '2023-06-15',
    lastActive: '5 minutes ago',
  },
  {
    id: 'member-2',
    name: 'Marcus Johnson',
    email: 'marcus@techstart.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    role: 'manager',
    department: 'Engineering',
    status: 'active',
    joinedAt: '2023-07-20',
    lastActive: '1 hour ago',
  },
  {
    id: 'member-3',
    name: 'Emily Chen',
    email: 'emily@techstart.io',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    role: 'recruiter',
    department: 'HR',
    status: 'active',
    joinedAt: '2023-08-10',
    lastActive: '30 minutes ago',
  },
  {
    id: 'member-4',
    name: 'David Park',
    email: 'david@techstart.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    role: 'viewer',
    department: 'Marketing',
    status: 'pending',
    joinedAt: '2024-01-15',
    lastActive: 'Never',
  },
];

const mockBillingInfo: BillingInfo = {
  plan: 'Enterprise',
  price: 499,
  billingCycle: 'monthly',
  nextBillingDate: '2024-02-15',
  paymentMethod: '**** **** **** 4242',
  invoices: [
    { id: 'inv-1', date: '2024-01-15', amount: 499, status: 'paid' },
    { id: 'inv-2', date: '2023-12-15', amount: 499, status: 'paid' },
    { id: 'inv-3', date: '2023-11-15', amount: 499, status: 'paid' },
  ],
};

const mockAutomationRules: AutomationRule[] = [
  {
    id: 'rule-1',
    name: 'Auto-Post to Job Boards',
    type: 'job-posting',
    status: 'active',
    runsToday: 8,
    successRate: 98,
    lastRun: '10 minutes ago',
  },
  {
    id: 'rule-2',
    name: 'AI Application Screening',
    type: 'application-review',
    status: 'active',
    runsToday: 156,
    successRate: 95,
    lastRun: '2 minutes ago',
  },
  {
    id: 'rule-3',
    name: 'Smart Interview Scheduler',
    type: 'interview-scheduling',
    status: 'active',
    runsToday: 12,
    successRate: 100,
    lastRun: '1 hour ago',
  },
  {
    id: 'rule-4',
    name: 'Automated Offer Letters',
    type: 'offer-letter',
    status: 'paused',
    runsToday: 0,
    successRate: 92,
    lastRun: '2 days ago',
  },
];

const dashboardStats = [
  { label: 'Active Jobs', value: '12', change: '+3', trend: 'up', icon: Briefcase, color: 'cyan' },
  { label: 'Total Applications', value: '486', change: '+28%', trend: 'up', icon: FileText, color: 'purple' },
  { label: 'Hired This Month', value: '8', change: '+60%', trend: 'up', icon: UserCheck, color: 'green' },
  { label: 'Avg. Time to Hire', value: '12 days', change: '-3 days', trend: 'up', icon: Clock, color: 'orange' },
];

export default function CompanyAdminPanel() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [company, setCompany] = useState<Company>(mockCompany);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('recruiter');

  const handleToggleAutomation = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => {
      if (rule.id === ruleId) {
        const newStatus = rule.status === 'active' ? 'paused' : 'active';
        showToast(`Automation ${newStatus === 'active' ? 'enabled' : 'disabled'}`, 'success');
        return { ...rule, status: newStatus };
      }
      return rule;
    }));
  };

  const handleInviteMember = () => {
    if (!inviteEmail) return;
    showToast(`Invitation sent to ${inviteEmail}`, 'success');
    setInviteEmail('');
    setIsInviteMemberOpen(false);
  };

  const handleUpdateSettings = (key: keyof typeof company.settings) => {
    setCompany(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: !prev.settings[key],
      },
    }));
    showToast('Settings updated', 'success');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'manager': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'recruiter': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'viewer': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'inactive':
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-xl border border-border object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {company.name}
              <Badge variant="outline" className={getStatusColor(company.status)}>
                {company.status}
              </Badge>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              {company.industry} • {company.employees} employees
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsEditCompanyOpen(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => (
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
          <TabsTrigger value="team">
            <Users className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="automation">
            <Workflow className="w-4 h-4 mr-2" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="billing">
            <DollarSign className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Company Info */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Company Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={company.website} className="text-primary hover:underline">{company.website}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{company.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{company.address}</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">{company.description}</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-xs">Post Job</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  <span className="text-xs">Invite Team</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">View Applications</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <span className="text-xs">AI Assistant</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-xs">Export Data</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-xs">Analytics</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </h3>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { icon: UserCheck, text: 'Hired John Doe for Senior Developer position', time: '2 hours ago', color: 'emerald' },
                { icon: FileText, text: '15 new applications received for UI Designer role', time: '4 hours ago', color: 'purple' },
                { icon: Briefcase, text: 'Posted new job: Product Manager', time: '1 day ago', color: 'cyan' },
                { icon: Bot, text: 'AI screened 45 applications automatically', time: '1 day ago', color: 'orange' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className={`w-10 h-10 rounded-lg bg-${activity.color}-500/20 flex items-center justify-center`}>
                    <activity.icon className={`w-5 h-5 text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Button onClick={() => setIsInviteMemberOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-border">
                {teamMembers
                  .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((member) => (
                    <div key={member.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full border border-border"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{member.name}</h4>
                            <Badge variant="outline" className={getRoleColor(member.role)}>
                              {member.role}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{member.department}</span>
                            <span>•</span>
                            <span>Last active: {member.lastActive}</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {automationRules.map((rule) => (
              <Card key={rule.id} className="p-5 bg-card border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                      <Workflow className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{rule.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{rule.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <Switch
                    checked={rule.status === 'active'}
                    onCheckedChange={() => handleToggleAutomation(rule.id)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{rule.runsToday}</p>
                    <p className="text-xs text-muted-foreground">Runs Today</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-emerald-400">{rule.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs font-medium">{rule.lastRun}</p>
                    <p className="text-xs text-muted-foreground">Last Run</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border-cyan-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">AI Automation Suite</h3>
                <p className="text-sm text-muted-foreground">
                  Automate your entire hiring workflow with AI-powered screening, scheduling, and communication.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Create Automation
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border lg:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Current Plan
              </h3>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/20 mb-4">
                <div>
                  <p className="text-lg font-bold">{mockBillingInfo.plan}</p>
                  <p className="text-sm text-muted-foreground">
                    ${mockBillingInfo.price}/{mockBillingInfo.billingCycle}
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                  Active
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Next billing date</p>
                  <p className="font-medium">{mockBillingInfo.nextBillingDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment method</p>
                  <p className="font-medium">{mockBillingInfo.paymentMethod}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Update Payment</Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Recent Invoices</h3>
              <div className="space-y-3">
                {mockBillingInfo.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">${invoice.amount}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(invoice.status === 'paid' ? 'active' : 'pending')}>
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Automation Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Approve Applications</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve applications that meet your criteria
                  </p>
                </div>
                <Switch
                  checked={company.settings.autoApproveApplications}
                  onCheckedChange={() => handleUpdateSettings('autoApproveApplications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new applications
                  </p>
                </div>
                <Switch
                  checked={company.settings.emailNotifications}
                  onCheckedChange={() => handleUpdateSettings('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Bidding</p>
                  <p className="text-sm text-muted-foreground">
                    Let AI automatically bid on matching talent
                  </p>
                </div>
                <Switch
                  checked={company.settings.autoBidding}
                  onCheckedChange={() => handleUpdateSettings('autoBidding')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Assistant</p>
                  <p className="text-sm text-muted-foreground">
                    Enable AI assistant for screening and communication
                  </p>
                </div>
                <Switch
                  checked={company.settings.aiAssistant}
                  onCheckedChange={() => handleUpdateSettings('aiAssistant')}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security & Access
            </h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Two-Factor Authentication
                <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-0">Enabled</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                API Access
                <ChevronRight className="ml-auto w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Activity Log
                <ChevronRight className="ml-auto w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteMemberOpen} onOpenChange={setIsInviteMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your company workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteMemberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember} className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
              <Send className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
