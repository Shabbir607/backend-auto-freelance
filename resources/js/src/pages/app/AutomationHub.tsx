import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
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
  Zap,
  Bot,
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
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
  Mail,
  MessageSquare,
  Send,
  Target,
  Filter,
  Globe,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Star,
  Eye,
  MoreVertical,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/contexts/ToastContext';

interface Automation {
  id: string;
  name: string;
  description: string;
  type: 'job-monitoring' | 'auto-bidding' | 'client-communication' | 'invoicing' | 'reporting' | 'lead-nurturing';
  status: 'active' | 'paused' | 'error';
  runsToday: number;
  successRate: number;
  lastRun: string;
  triggers: string[];
  actions: string[];
  icon: typeof Zap;
  color: string;
}

const automations: Automation[] = [
  {
    id: 'auto-1',
    name: 'Upwork Job Monitor',
    description: 'Continuously scans Upwork for jobs matching your skills and preferences',
    type: 'job-monitoring',
    status: 'active',
    runsToday: 156,
    successRate: 99,
    lastRun: '2 minutes ago',
    triggers: ['Every 15 minutes', 'New job posted'],
    actions: ['Scan jobs', 'Filter matches', 'Score relevance', 'Send notification'],
    icon: Target,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'auto-2',
    name: 'AI Proposal Generator',
    description: 'Automatically generates personalized proposals using AI based on job requirements',
    type: 'auto-bidding',
    status: 'active',
    runsToday: 45,
    successRate: 96,
    lastRun: '5 minutes ago',
    triggers: ['Job added to queue', 'Manual trigger'],
    actions: ['Analyze job', 'Match portfolio', 'Generate proposal', 'Queue for review'],
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'auto-3',
    name: 'Client Message Auto-Reply',
    description: 'Responds to client messages during off-hours with intelligent AI responses',
    type: 'client-communication',
    status: 'active',
    runsToday: 28,
    successRate: 94,
    lastRun: '15 minutes ago',
    triggers: ['New message received', 'Outside business hours'],
    actions: ['Analyze message', 'Generate response', 'Send reply', 'Flag for follow-up'],
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'auto-4',
    name: 'Invoice Automation',
    description: 'Generates and sends invoices automatically when milestones are completed',
    type: 'invoicing',
    status: 'active',
    runsToday: 8,
    successRate: 100,
    lastRun: '1 hour ago',
    triggers: ['Milestone completed', 'Monthly schedule'],
    actions: ['Generate invoice', 'Calculate totals', 'Send to client', 'Track payment'],
    icon: FileText,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'auto-5',
    name: 'Daily Performance Report',
    description: 'Compiles and sends daily performance metrics and analytics reports',
    type: 'reporting',
    status: 'paused',
    runsToday: 0,
    successRate: 98,
    lastRun: '1 day ago',
    triggers: ['Daily at 6 PM'],
    actions: ['Fetch data', 'Compile report', 'Generate charts', 'Send email'],
    icon: BarChart3,
    color: 'from-fuchsia-500 to-rose-500',
  },
  {
    id: 'auto-6',
    name: 'Lead Follow-up Sequence',
    description: 'Nurtures leads with automated email sequences and engagement tracking',
    type: 'lead-nurturing',
    status: 'error',
    runsToday: 12,
    successRate: 78,
    lastRun: '30 minutes ago',
    triggers: ['New lead captured', 'Sequence trigger'],
    actions: ['Add to sequence', 'Send email', 'Track engagement', 'Score lead'],
    icon: Mail,
    color: 'from-indigo-500 to-violet-500',
  },
];

const automationStats = [
  { label: 'Total Automations', value: '12', change: '+2', trend: 'up', icon: Workflow },
  { label: 'Active Now', value: '9', change: '+1', trend: 'up', icon: Activity },
  { label: 'Runs Today', value: '249', change: '+18%', trend: 'up', icon: RefreshCw },
  { label: 'Avg Success Rate', value: '94%', change: '+3%', trend: 'up', icon: CheckCircle },
];

const recentRuns = [
  { id: '1', automation: 'Upwork Job Monitor', status: 'success', time: '2 min ago', duration: '1.2s', itemsProcessed: 45 },
  { id: '2', automation: 'AI Proposal Generator', status: 'success', time: '5 min ago', duration: '3.4s', itemsProcessed: 1 },
  { id: '3', automation: 'Client Message Auto-Reply', status: 'success', time: '15 min ago', duration: '0.8s', itemsProcessed: 3 },
  { id: '4', automation: 'Lead Follow-up Sequence', status: 'error', time: '30 min ago', duration: '2.1s', itemsProcessed: 0 },
  { id: '5', automation: 'Invoice Automation', status: 'success', time: '1 hr ago', duration: '2.5s', itemsProcessed: 2 },
];

export default function AutomationHub() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('automations');
  const [automationList, setAutomationList] = useState(automations);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredAutomations = automationList.filter((auto) =>
    auto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    auto.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAutomation = (automationId: string) => {
    setAutomationList(prev => prev.map(auto => {
      if (auto.id === automationId) {
        const newStatus = auto.status === 'active' ? 'paused' : 'active';
        showToast(`Automation ${newStatus === 'active' ? 'started' : 'paused'}`, 'success');
        return { ...auto, status: newStatus };
      }
      return auto;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'paused': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Automation Hub
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage all your automated workflows and processes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {automationStats.map((stat) => (
          <Card key={stat.label} className="p-4 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
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
          <TabsTrigger value="automations">
            <Workflow className="w-4 h-4 mr-2" />
            Automations
          </TabsTrigger>
          <TabsTrigger value="runs">
            <Activity className="w-4 h-4 mr-2" />
            Recent Runs
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Automations Tab */}
        <TabsContent value="automations" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAutomations.map((automation) => (
              <Card
                key={automation.id}
                className="p-5 bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedAutomation(automation);
                  setIsDetailOpen(true);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${automation.color} flex items-center justify-center`}>
                    <automation.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(automation.status)}>
                      {automation.status}
                    </Badge>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={automation.status === 'active'}
                        onCheckedChange={() => {
                          handleToggleAutomation(automation.id);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">{automation.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {automation.description}
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{automation.runsToday}</p>
                    <p className="text-xs text-muted-foreground">Runs</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-emerald-400">{automation.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-xs font-medium">{automation.lastRun}</p>
                    <p className="text-xs text-muted-foreground">Last Run</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Runs Tab */}
        <TabsContent value="runs" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Recent Automation Runs</h3>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-border">
                {recentRuns.map((run) => (
                  <div key={run.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${run.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <div>
                          <p className="font-medium">{run.automation}</p>
                          <p className="text-sm text-muted-foreground">{run.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{run.duration}</p>
                          <p className="text-xs text-muted-foreground">Duration</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{run.itemsProcessed}</p>
                          <p className="text-xs text-muted-foreground">Items</p>
                        </div>
                        <Badge variant="outline" className={run.status === 'success' ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}>
                          {run.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Performance Overview
              </h3>
              <div className="space-y-4">
                {automationList.slice(0, 4).map((auto) => (
                  <div key={auto.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{auto.name}</span>
                      <span className="text-sm text-muted-foreground">{auto.successRate}%</span>
                    </div>
                    <Progress value={auto.successRate} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Run Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-sm text-muted-foreground">Total Runs (7 days)</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-emerald-400">96.4%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold">1.8s</p>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold">42hr</p>
                  <p className="text-sm text-muted-foreground">Time Saved</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Automation Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedAutomation && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedAutomation.color} flex items-center justify-center`}>
                    <selectedAutomation.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl flex items-center gap-2">
                      {selectedAutomation.name}
                      <Badge variant="outline" className={getStatusColor(selectedAutomation.status)}>
                        {selectedAutomation.status}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedAutomation.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{selectedAutomation.runsToday}</p>
                    <p className="text-xs text-muted-foreground">Runs Today</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-emerald-400">{selectedAutomation.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">{selectedAutomation.lastRun}</p>
                    <p className="text-xs text-muted-foreground">Last Run</p>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Triggers
                  </h4>
                  <div className="space-y-2">
                    {selectedAutomation.triggers.map((trigger, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 text-emerald-400" />
                    Actions
                  </h4>
                  <div className="space-y-2">
                    {selectedAutomation.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-xs text-emerald-400">
                          {index + 1}
                        </span>
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
                  onClick={() => {
                    handleToggleAutomation(selectedAutomation.id);
                    setIsDetailOpen(false);
                  }}
                >
                  {selectedAutomation.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


