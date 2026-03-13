import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bot,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  MessageSquare,
  FileText,
  DollarSign,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Star,
  Award,
  Brain,
  Cpu,
  Send,
} from 'lucide-react';

interface AgentMetric {
  id: string;
  name: string;
  type: string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  avgResponseTime: number;
  tokensUsed: number;
  cost: number;
  satisfaction: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

const agentMetrics: AgentMetric[] = [
  {
    id: 'agent-1',
    name: 'Proposal Writer AI',
    type: 'Content Generation',
    totalRuns: 1250,
    successfulRuns: 1188,
    failedRuns: 62,
    avgResponseTime: 3.2,
    tokensUsed: 2500000,
    cost: 125.50,
    satisfaction: 4.8,
    trend: 'up',
    change: '+15%',
  },
  {
    id: 'agent-2',
    name: 'Job Matcher AI',
    type: 'Analysis',
    totalRuns: 3450,
    successfulRuns: 3381,
    failedRuns: 69,
    avgResponseTime: 1.1,
    tokensUsed: 1800000,
    cost: 89.00,
    satisfaction: 4.9,
    trend: 'up',
    change: '+22%',
  },
  {
    id: 'agent-3',
    name: 'Client Communicator',
    type: 'Communication',
    totalRuns: 890,
    successfulRuns: 845,
    failedRuns: 45,
    avgResponseTime: 2.5,
    tokensUsed: 1200000,
    cost: 62.00,
    satisfaction: 4.6,
    trend: 'stable',
    change: '+2%',
  },
  {
    id: 'agent-4',
    name: 'Contract Analyzer',
    type: 'Analysis',
    totalRuns: 420,
    successfulRuns: 403,
    failedRuns: 17,
    avgResponseTime: 4.8,
    tokensUsed: 980000,
    cost: 48.50,
    satisfaction: 4.7,
    trend: 'up',
    change: '+8%',
  },
  {
    id: 'agent-5',
    name: 'Invoice Generator',
    type: 'Document Generation',
    totalRuns: 560,
    successfulRuns: 554,
    failedRuns: 6,
    avgResponseTime: 2.1,
    tokensUsed: 450000,
    cost: 22.50,
    satisfaction: 4.9,
    trend: 'up',
    change: '+18%',
  },
  {
    id: 'agent-6',
    name: 'Lead Qualifier',
    type: 'Analysis',
    totalRuns: 780,
    successfulRuns: 702,
    failedRuns: 78,
    avgResponseTime: 1.8,
    tokensUsed: 680000,
    cost: 34.00,
    satisfaction: 4.3,
    trend: 'down',
    change: '-5%',
  },
];

const overallStats = [
  { label: 'Total AI Runs', value: '7,350', change: '+24%', trend: 'up', icon: Activity },
  { label: 'Success Rate', value: '95.2%', change: '+2.1%', trend: 'up', icon: CheckCircle },
  { label: 'Avg Response', value: '2.4s', change: '-0.3s', trend: 'up', icon: Clock },
  { label: 'Total Cost', value: '$381.50', change: '+$45', trend: 'up', icon: DollarSign },
];

const recentActivity = [
  { agent: 'Proposal Writer AI', action: 'Generated proposal for React job', time: '2 min ago', status: 'success', tokens: 1250 },
  { agent: 'Job Matcher AI', action: 'Analyzed 45 new jobs', time: '5 min ago', status: 'success', tokens: 890 },
  { agent: 'Client Communicator', action: 'Sent follow-up message', time: '12 min ago', status: 'success', tokens: 420 },
  { agent: 'Lead Qualifier', action: 'Qualified 3 new leads', time: '18 min ago', status: 'error', tokens: 0 },
  { agent: 'Contract Analyzer', action: 'Reviewed NDA document', time: '25 min ago', status: 'success', tokens: 2100 },
];

export default function AgentAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const getSuccessRate = (agent: AgentMetric) => {
    return ((agent.successfulRuns / agent.totalRuns) * 100).toFixed(1);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Activity className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Agent Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor AI agent performance and usage metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat) => (
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
          <TabsTrigger value="overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="agents">
            <Bot className="w-4 h-4 mr-2" />
            By Agent
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="w-4 h-4 mr-2" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="costs">
            <DollarSign className="w-4 h-4 mr-2" />
            Cost Analysis
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Success Rate by Agent */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Success Rate by Agent
              </h3>
              <div className="space-y-4">
                {agentMetrics.map((agent) => (
                  <div key={agent.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{agent.name}</span>
                      <span className="text-sm text-muted-foreground">{getSuccessRate(agent)}%</span>
                    </div>
                    <Progress value={parseFloat(getSuccessRate(agent))} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Token Usage */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                Token Usage Distribution
              </h3>
              <div className="space-y-4">
                {agentMetrics.map((agent) => {
                  const totalTokens = agentMetrics.reduce((sum, a) => sum + a.tokensUsed, 0);
                  const percentage = ((agent.tokensUsed / totalTokens) * 100).toFixed(1);
                  return (
                    <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{(agent.tokensUsed / 1000000).toFixed(2)}M tokens</p>
                      </div>
                      <Badge variant="outline">{percentage}%</Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Performance Trends */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Trends
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {agentMetrics.map((agent) => (
                <div key={agent.id} className="p-4 rounded-lg bg-muted/50 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {getTrendIcon(agent.trend)}
                    <span className={`text-sm font-medium ${agent.trend === 'up' ? 'text-emerald-400' : agent.trend === 'down' ? 'text-red-400' : 'text-amber-400'}`}>
                      {agent.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{agent.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* By Agent Tab */}
        <TabsContent value="agents" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentMetrics.map((agent) => (
              <Card key={agent.id} className="p-5 bg-card border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground">{agent.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(agent.trend)}
                    <span className={`text-sm font-medium ${agent.trend === 'up' ? 'text-emerald-400' : agent.trend === 'down' ? 'text-red-400' : 'text-amber-400'}`}>
                      {agent.change}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{agent.totalRuns.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Runs</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-emerald-400">{getSuccessRate(agent)}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">{agent.avgResponseTime}s</p>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">${agent.cost.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Cost</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{agent.satisfaction}</span>
                    <span className="text-xs text-muted-foreground">satisfaction</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="mt-6">
          <Card className="bg-card border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Recent Agent Activity</h3>
              <Badge variant="outline">Live</Badge>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        <div>
                          <p className="font-medium">{activity.agent}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{activity.time}</span>
                        {activity.tokens > 0 && (
                          <Badge variant="secondary">{activity.tokens.toLocaleString()} tokens</Badge>
                        )}
                        <Badge variant="outline" className={activity.status === 'success' ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Cost Summary
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                  <p className="text-3xl font-bold text-emerald-400">$381.50</p>
                  <p className="text-sm text-muted-foreground">Total Spend (7 days)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">$54.50</p>
                    <p className="text-xs text-muted-foreground">Daily Avg</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold">$0.052</p>
                    <p className="text-xs text-muted-foreground">Per Run</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border lg:col-span-2">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Cost by Agent
              </h3>
              <div className="space-y-3">
                {agentMetrics.sort((a, b) => b.cost - a.cost).map((agent) => {
                  const totalCost = agentMetrics.reduce((sum, a) => sum + a.cost, 0);
                  const percentage = ((agent.cost / totalCost) * 100).toFixed(1);
                  return (
                    <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.totalRuns.toLocaleString()} runs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <Progress value={parseFloat(percentage)} className="h-2" />
                        </div>
                        <span className="font-bold w-20 text-right">${agent.cost.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Optimize Your AI Spending</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your usage patterns, we've identified potential savings of $45/month
                </p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                View Recommendations
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { AgentAnalytics };
