import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Bot,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Target,
  Filter,
  Search,
  Calendar,
  BarChart3,
  Zap,
  Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock agent data
const mockAgentData = {
  'proposal-writer': {
    id: 'proposal-writer',
    name: 'Proposal Writer',
    description: 'Generates professional proposals tailored to job requirements',
    color: 'from-fuchsia-500 to-purple-600',
    status: 'active',
    isRunning: true,
    tasksCompleted: 456,
    successRate: 96,
    performance: 92,
    lastActive: '2 mins ago',
    createdAt: '2024-01-15',
    totalRuntime: '1,247 hours',
    config: {
      targetKeywords: 'react, typescript, node.js, full-stack',
      budgetMin: 500,
      budgetMax: 10000,
      platforms: ['upwork', 'fiverr'],
      operationalHours: '09:00 - 18:00',
      autoSubmit: false,
      maxProposalsPerDay: 20,
    },
  },
  'job-scraper': {
    id: 'job-scraper',
    name: 'Job Scraper Agent',
    description: 'Automatically scans and filters job postings across platforms',
    color: 'from-cyan-500 to-blue-600',
    status: 'active',
    isRunning: true,
    tasksCompleted: 328,
    successRate: 98,
    performance: 95,
    lastActive: '1 min ago',
    createdAt: '2024-01-10',
    totalRuntime: '2,156 hours',
    config: {
      targetKeywords: 'web development, api, saas',
      budgetMin: 1000,
      budgetMax: 50000,
      platforms: ['upwork', 'freelancer', 'toptal'],
      operationalHours: '00:00 - 23:59',
      autoSubmit: false,
      maxProposalsPerDay: 50,
    },
  },
};

const mockActivityLog = [
  { id: '1', action: 'Generated proposal for "Full Stack Developer"', status: 'success', timestamp: '2 mins ago' },
  { id: '2', action: 'Analyzed job requirements', status: 'success', timestamp: '5 mins ago' },
  { id: '3', action: 'Optimized proposal keywords', status: 'success', timestamp: '8 mins ago' },
  { id: '4', action: 'Failed to connect to Upwork API', status: 'error', timestamp: '15 mins ago' },
  { id: '5', action: 'Generated proposal for "React Native App"', status: 'success', timestamp: '20 mins ago' },
  { id: '6', action: 'Matched 5 jobs to criteria', status: 'success', timestamp: '25 mins ago' },
  { id: '7', action: 'Updated pricing strategy', status: 'success', timestamp: '30 mins ago' },
  { id: '8', action: 'Generated proposal for "E-commerce Platform"', status: 'success', timestamp: '35 mins ago' },
];

const mockPerformanceData = {
  daily: [85, 88, 92, 90, 94, 96, 92],
  weekly: [82, 85, 88, 90, 92, 94, 96],
};

export default function AgentDetailPage() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const agent = mockAgentData[agentId as keyof typeof mockAgentData] || mockAgentData['proposal-writer'];

  const [isRunning, setIsRunning] = useState(agent.isRunning);
  const [config, setConfig] = useState(agent.config);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLogs = mockActivityLog.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/app/agents')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
              agent.color
            )}>
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground text-sm">{agent.description}</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={cn(
              "text-sm px-3 py-1",
              isRunning
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-500 border-amber-500/30"
            )}
          >
            {isRunning ? 'Running' : 'Paused'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          <Button
            variant={isRunning ? "outline" : "default"}
            size="sm"
            className={cn(!isRunning && "bg-primary text-primary-foreground")}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tasks Completed</p>
              <p className="text-2xl font-bold">{agent.tasksCompleted}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Success Rate</p>
              <p className="text-2xl font-bold">{agent.successRate}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Runtime</p>
              <p className="text-2xl font-bold">{agent.totalRuntime}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Performance</p>
              <p className="text-2xl font-bold">{agent.performance}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-card border border-border p-1">
          <TabsTrigger value="performance" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="configuration" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Activity className="w-4 h-4 mr-2" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Success Rate Chart */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Success Rate (Last 7 Days)</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {mockPerformanceData.daily.map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary/20 rounded-t"
                      style={{ height: `${value}%` }}
                    >
                      <div
                        className="w-full bg-primary rounded-t transition-all"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tasks Completed Chart */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Tasks Completed (Last 7 Days)</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[45, 52, 48, 61, 55, 67, 72].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-emerald-500/20 rounded-t"
                      style={{ height: `${(value / 80) * 100}%` }}
                    >
                      <div
                        className="w-full bg-emerald-500 rounded-t transition-all"
                        style={{ height: '100%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="configuration" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-6">Agent Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Target Keywords</Label>
                <Textarea
                  value={config.targetKeywords}
                  onChange={(e) => setConfig({ ...config, targetKeywords: e.target.value })}
                  placeholder="Enter keywords separated by commas"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Target Platforms</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select platforms" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="upwork">Upwork</SelectItem>
                    <SelectItem value="fiverr">Fiverr</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Budget Range (Min)</Label>
                <Input
                  type="number"
                  value={config.budgetMin}
                  onChange={(e) => setConfig({ ...config, budgetMin: parseInt(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Budget Range (Max)</Label>
                <Input
                  type="number"
                  value={config.budgetMax}
                  onChange={(e) => setConfig({ ...config, budgetMax: parseInt(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Operational Hours</Label>
                <Input
                  value={config.operationalHours}
                  onChange={(e) => setConfig({ ...config, operationalHours: e.target.value })}
                  placeholder="09:00 - 18:00"
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Max Proposals Per Day</Label>
                <Input
                  type="number"
                  value={config.maxProposalsPerDay}
                  onChange={(e) => setConfig({ ...config, maxProposalsPerDay: parseInt(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>

              <div className="col-span-full flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Auto-Submit Proposals</p>
                  <p className="text-sm text-muted-foreground">Automatically submit proposals without review</p>
                </div>
                <Switch
                  checked={config.autoSubmit}
                  onCheckedChange={(checked) => setConfig({ ...config, autoSubmit: checked })}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button className="bg-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search activity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-background border-border">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="divide-y divide-border">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        log.status === 'success' ? "bg-emerald-500/10" : "bg-red-500/10"
                      )}>
                        {log.status === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{log.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

