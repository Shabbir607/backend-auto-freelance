import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  Bot,
  Plus,
  Settings,
  Play,
  Pause,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Zap,
  Target,
  FileText,
  MessageSquare,
  Code,
  Lightbulb,
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  RefreshCw,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock data for active agents
const agentStats = {
  activeAgents: { count: 5, uptime: '99.8%' },
  tasksCompleted: { count: 1247, dailyChange: 156 },
  successRate: { value: 94.2, weeklyChange: 2.3 },
  timeSaved: { hours: 342, monthlyContext: 'This month' },
};

const activeAgents = [
  {
    id: 'proposal-writer',
    name: 'Proposal Writer',
    description: 'Generates professional proposals tailored to job requirements',
    icon: MessageSquare,
    color: 'from-fuchsia-500 to-purple-600',
    status: 'active',
    tasksCompleted: 456,
    successRate: 96,
    performance: 92,
    lastActive: '2 mins ago',
    isRunning: true,
  },
  {
    id: 'job-scraper',
    name: 'Job Scraper Agent',
    description: 'Automatically scans and filters job postings across platforms',
    icon: Target,
    color: 'from-cyan-500 to-blue-600',
    status: 'active',
    tasksCompleted: 328,
    successRate: 98,
    performance: 95,
    lastActive: '1 min ago',
    isRunning: true,
  },
  {
    id: 'proposal-review',
    name: 'Proposal Review Agent',
    description: 'Reviews and optimizes your proposals before submission',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    status: 'active',
    tasksCompleted: 234,
    successRate: 91,
    performance: 88,
    lastActive: '5 mins ago',
    isRunning: true,
  },
  {
    id: 'client-closing',
    name: 'Client Closing Agent',
    description: 'Helps craft persuasive responses to close deals',
    icon: Target,
    color: 'from-orange-500 to-red-600',
    status: 'paused',
    tasksCompleted: 145,
    successRate: 89,
    performance: 85,
    lastActive: '1 hour ago',
    isRunning: false,
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Creates marketing content, ads, and social media posts',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-600',
    status: 'active',
    tasksCompleted: 84,
    successRate: 93,
    performance: 90,
    lastActive: '10 mins ago',
    isRunning: true,
  },
];

const recentActivity = [
  {
    id: '1',
    agent: 'Proposal Writer',
    action: 'Generated proposal for "Full Stack Developer for SaaS Platform"',
    timestamp: '2 mins ago',
    status: 'success',
  },
  {
    id: '2',
    agent: 'Job Scraper Agent',
    action: 'Found 12 new opportunities matching your criteria',
    timestamp: '5 mins ago',
    status: 'success',
  },
  {
    id: '3',
    agent: 'Proposal Review Agent',
    action: 'Optimized proposal - improved win probability by 15%',
    timestamp: '8 mins ago',
    status: 'success',
  },
  {
    id: '4',
    agent: 'Content Generator',
    action: 'Created 3 social media posts for portfolio showcase',
    timestamp: '15 mins ago',
    status: 'success',
  },
  {
    id: '5',
    agent: 'Job Scraper Agent',
    action: 'Filtered 45 jobs, 8 matched budget criteria',
    timestamp: '20 mins ago',
    status: 'success',
  },
];

export default function AgentsDashboard() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState(activeAgents);

  const toggleAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? { ...agent, isRunning: !agent.isRunning, status: agent.isRunning ? 'paused' : 'active' }
        : agent
    ));
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Agents Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor and manage your active AI automation agents</p>
        </div>
        <Button
          className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
          onClick={() => navigate('/app/ai-hub')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Agents */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Agents</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{agentStats.activeAgents.count}</p>
                <span className="text-xs text-emerald-500 font-medium">{agentStats.activeAgents.uptime} uptime</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Running smoothly</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Tasks Completed */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tasks Completed</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{agentStats.tasksCompleted.count.toLocaleString()}</p>
                <span className="flex items-center text-xs font-medium text-emerald-500">
                  <ArrowUpRight className="w-3 h-3" />
                  +{agentStats.tasksCompleted.dailyChange}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Today</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </Card>

        {/* Success Rate */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Success Rate</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{agentStats.successRate.value}%</p>
                <span className="flex items-center text-xs font-medium text-emerald-500">
                  <ArrowUpRight className="w-3 h-3" />
                  +{agentStats.successRate.weeklyChange}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        {/* Time Saved */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Time Saved</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{agentStats.timeSaved.hours}</p>
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{agentStats.timeSaved.monthlyContext}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Active Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.id}
                className={cn(
                  "p-5 bg-card border-border transition-all",
                  agent.isRunning ? "hover:border-primary/50" : "opacity-75"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                      agent.color
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs mt-1",
                          agent.isRunning
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                        )}
                      >
                        {agent.isRunning ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => navigate(`/app/agents/${agent.id}`)}>
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Restart
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{agent.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tasks</p>
                    <p className="font-semibold">{agent.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success</p>
                    <p className="font-semibold text-emerald-500">{agent.successRate}%</p>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium">{agent.performance}%</span>
                  </div>
                  <Progress value={agent.performance} className="h-2" />
                </div>

                {/* Last Active & Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Last active: {agent.lastActive}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => navigate(`/app/agents/${agent.id}`)}
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant={agent.isRunning ? "outline" : "default"}
                      size="sm"
                      className={cn(
                        "h-8",
                        !agent.isRunning && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => toggleAgent(agent.id)}
                    >
                      {agent.isRunning ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="divide-y divide-border">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{activity.agent}</span>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

