import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Briefcase,
  FileText,
  MessageSquare,
  Zap,
  Star,
  Award,
  PieChart,
  LineChart,
  Globe,
} from 'lucide-react';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: typeof BarChart3;
  color: string;
}

const overviewMetrics: MetricCard[] = [
  { label: 'Total Revenue', value: '$124,560', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'Active Projects', value: '24', change: '+5', trend: 'up', icon: Briefcase, color: 'cyan' },
  { label: 'Proposals Sent', value: '156', change: '+32%', trend: 'up', icon: FileText, color: 'purple' },
  { label: 'Win Rate', value: '35%', change: '+8%', trend: 'up', icon: Target, color: 'amber' },
  { label: 'Client Satisfaction', value: '4.9/5', change: '+0.2', trend: 'up', icon: Star, color: 'yellow' },
  { label: 'Response Time', value: '1.8 hrs', change: '-0.5 hrs', trend: 'up', icon: Clock, color: 'blue' },
];

const platformPerformance = [
  { platform: 'Upwork', revenue: '$68,450', projects: 14, winRate: 38, earnings: '+22%' },
  { platform: 'Fiverr', revenue: '$32,100', projects: 8, winRate: 45, earnings: '+15%' },
  { platform: 'Freelancer', revenue: '$18,500', projects: 5, winRate: 28, earnings: '+8%' },
  { platform: 'LinkedIn', revenue: '$5,510', projects: 2, winRate: 25, earnings: '+12%' },
];

const proposalMetrics = {
  sent: 156,
  viewed: 142,
  responded: 89,
  won: 54,
  pending: 12,
  rejected: 23,
};

const revenueByMonth = [
  { month: 'Jan', revenue: 15200 },
  { month: 'Feb', revenue: 18400 },
  { month: 'Mar', revenue: 16800 },
  { month: 'Apr', revenue: 22100 },
  { month: 'May', revenue: 24560 },
  { month: 'Jun', revenue: 27500 },
];

const topClients = [
  { name: 'TechStart Inc', revenue: '$28,500', projects: 6, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80' },
  { name: 'Creative Labs', revenue: '$18,200', projects: 4, avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&q=80' },
  { name: 'DataDriven Co', revenue: '$14,800', projects: 3, avatar: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&q=80' },
  { name: 'GrowthHub', revenue: '$12,100', projects: 3, avatar: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=100&q=80' },
];

const skillPerformance = [
  { skill: 'React Development', jobs: 45, revenue: '$52,400', winRate: 42 },
  { skill: 'Node.js Backend', jobs: 28, revenue: '$31,200', winRate: 38 },
  { skill: 'UI/UX Design', jobs: 18, revenue: '$21,800', winRate: 45 },
  { skill: 'TypeScript', jobs: 22, revenue: '$24,600', winRate: 40 },
  { skill: 'Full Stack', jobs: 15, revenue: '$18,500', winRate: 35 },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const maxRevenue = Math.max(...revenueByMonth.map(r => r.revenue));

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track your freelance performance and revenue metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="365d">Last year</SelectItem>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {overviewMetrics.map((metric) => (
          <Card key={metric.label} className="p-4 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-${metric.color}-500/10 flex items-center justify-center`}>
                <metric.icon className={`w-4 h-4 text-${metric.color}-400`} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>
            <p className="text-xl font-bold">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">
            <Activity className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="proposals">
            <FileText className="w-4 h-4 mr-2" />
            Proposals
          </TabsTrigger>
          <TabsTrigger value="platforms">
            <Globe className="w-4 h-4 mr-2" />
            Platforms
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Revenue Trend
              </h3>
              <div className="space-y-3">
                {revenueByMonth.map((data) => (
                  <div key={data.month} className="flex items-center gap-4">
                    <span className="w-8 text-sm text-muted-foreground">{data.month}</span>
                    <div className="flex-1">
                      <Progress
                        value={(data.revenue / maxRevenue) * 100}
                        className="h-6"
                      />
                    </div>
                    <span className="w-20 text-sm font-medium text-right">${(data.revenue / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Clients */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Top Clients
              </h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground w-6">#{index + 1}</span>
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-10 h-10 rounded-lg object-cover border border-border"
                      />
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.projects} projects</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-400">{client.revenue}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Skill Performance */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Performance by Skill
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {skillPerformance.map((skill) => (
                <div key={skill.skill} className="p-4 rounded-lg bg-muted/50">
                  <p className="font-medium mb-2">{skill.skill}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold">{skill.jobs}</p>
                      <p className="text-xs text-muted-foreground">Jobs</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-400">{skill.winRate}%</p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">${(parseInt(skill.revenue.replace('$', '').replace(',', '')) / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
              <DollarSign className="w-8 h-8 text-emerald-400 mb-4" />
              <p className="text-3xl font-bold text-emerald-400">$124,560</p>
              <p className="text-muted-foreground">Total Revenue</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
                +18.2% from last period
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
              <Briefcase className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-3xl font-bold text-cyan-400">$5,190</p>
              <p className="text-muted-foreground">Avg per Project</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-cyan-400">
                <ArrowUpRight className="w-4 h-4" />
                +12% from last period
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-3xl font-bold text-purple-400">$156/hr</p>
              <p className="text-muted-foreground">Effective Hourly</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-purple-400">
                <ArrowUpRight className="w-4 h-4" />
                +8% from last period
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4">Revenue by Platform</h3>
            <div className="space-y-4">
              {platformPerformance.map((platform) => {
                const totalRevenue = platformPerformance.reduce((sum, p) =>
                  sum + parseInt(p.revenue.replace('$', '').replace(',', '')), 0
                );
                const percentage = (parseInt(platform.revenue.replace('$', '').replace(',', '')) / totalRevenue) * 100;
                return (
                  <div key={platform.platform}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{platform.platform}</span>
                      <span className="font-bold">{platform.revenue}</span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(1)}% of total revenue</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Proposals Tab */}
        <TabsContent value="proposals" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-6 h-6 text-primary" />
                <Badge>Total</Badge>
              </div>
              <p className="text-3xl font-bold">{proposalMetrics.sent}</p>
              <p className="text-sm text-muted-foreground">Proposals Sent</p>
            </Card>
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-6 h-6 text-cyan-400" />
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                  {((proposalMetrics.viewed / proposalMetrics.sent) * 100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-3xl font-bold">{proposalMetrics.viewed}</p>
              <p className="text-sm text-muted-foreground">Viewed</p>
            </Card>
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                  {((proposalMetrics.responded / proposalMetrics.sent) * 100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-3xl font-bold">{proposalMetrics.responded}</p>
              <p className="text-sm text-muted-foreground">Responded</p>
            </Card>
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                  {((proposalMetrics.won / proposalMetrics.sent) * 100).toFixed(0)}%
                </Badge>
              </div>
              <p className="text-3xl font-bold text-emerald-400">{proposalMetrics.won}</p>
              <p className="text-sm text-muted-foreground">Won</p>
            </Card>
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-6 h-6 text-amber-400" />
                <Badge variant="outline" className="border-amber-500/30 text-amber-400">Pending</Badge>
              </div>
              <p className="text-3xl font-bold">{proposalMetrics.pending}</p>
              <p className="text-sm text-muted-foreground">Awaiting Response</p>
            </Card>
            <Card className="p-5 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-6 h-6 text-primary" />
                <Badge variant="outline">Win Rate</Badge>
              </div>
              <p className="text-3xl font-bold text-primary">
                {((proposalMetrics.won / proposalMetrics.sent) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </Card>
          </div>

          {/* Proposal Funnel */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Proposal Funnel
            </h3>
            <div className="space-y-3">
              {[
                { stage: 'Sent', value: proposalMetrics.sent, color: 'bg-primary' },
                { stage: 'Viewed', value: proposalMetrics.viewed, color: 'bg-cyan-500' },
                { stage: 'Responded', value: proposalMetrics.responded, color: 'bg-purple-500' },
                { stage: 'Won', value: proposalMetrics.won, color: 'bg-emerald-500' },
              ].map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">{stage.stage}</span>
                  <div className="flex-1">
                    <div
                      className={`h-8 ${stage.color} rounded-lg flex items-center justify-end px-3`}
                      style={{ width: `${(stage.value / proposalMetrics.sent) * 100}%` }}
                    >
                      <span className="text-white text-sm font-medium">{stage.value}</span>
                    </div>
                  </div>
                  <span className="w-16 text-sm text-muted-foreground text-right">
                    {((stage.value / proposalMetrics.sent) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformPerformance.map((platform) => (
              <Card key={platform.platform} className="p-5 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{platform.platform}</p>
                    <p className="text-xs text-muted-foreground">{platform.projects} projects</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="font-bold text-emerald-400">{platform.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="font-medium">{platform.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Growth</span>
                    <span className="text-emerald-400">{platform.earnings}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


