import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Users,
  Target,
  Briefcase,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Share2,
  Printer,
  RefreshCw,
  Eye,
  Sparkles,
  Globe,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  nextRun: string;
  recipients: number;
  status: 'active' | 'paused';
}

const metrics: ReportMetric[] = [
  { label: 'Total Revenue', value: '$45,230', change: 12.5, trend: 'up', icon: DollarSign, color: 'nexus-green' },
  { label: 'Proposals Sent', value: '342', change: 8.3, trend: 'up', icon: FileText, color: 'nexus-blue' },
  { label: 'Win Rate', value: '34%', change: -2.1, trend: 'down', icon: Target, color: 'nexus-purple' },
  { label: 'Active Clients', value: '48', change: 15.2, trend: 'up', icon: Users, color: 'nexus-fuchsia' },
];

const platformData = [
  { platform: 'Upwork', revenue: 28500, proposals: 156, winRate: 38, clients: 24 },
  { platform: 'Fiverr', revenue: 12300, proposals: 89, winRate: 28, clients: 15 },
  { platform: 'Freelancer', revenue: 4430, proposals: 97, winRate: 32, clients: 9 },
];

const monthlyData = [
  { month: 'Jan', revenue: 3200, proposals: 28 },
  { month: 'Feb', revenue: 4100, proposals: 32 },
  { month: 'Mar', revenue: 3800, proposals: 29 },
  { month: 'Apr', revenue: 5200, proposals: 41 },
  { month: 'May', revenue: 4900, proposals: 38 },
  { month: 'Jun', revenue: 6100, proposals: 45 },
];

const scheduledReports: ScheduledReport[] = [
  { id: '1', name: 'Weekly Revenue Summary', frequency: 'Weekly', nextRun: 'Monday, 9:00 AM', recipients: 3, status: 'active' },
  { id: '2', name: 'Monthly Performance Report', frequency: 'Monthly', nextRun: 'Apr 1, 9:00 AM', recipients: 5, status: 'active' },
  { id: '3', name: 'Client Activity Report', frequency: 'Daily', nextRun: 'Tomorrow, 8:00 AM', recipients: 2, status: 'active' },
  { id: '4', name: 'Platform Comparison', frequency: 'Weekly', nextRun: 'Sunday, 6:00 PM', recipients: 1, status: 'paused' },
];

const reportTemplates = [
  { id: '1', name: 'Executive Summary', description: 'High-level overview of all metrics', icon: BarChart3 },
  { id: '2', name: 'Revenue Analysis', description: 'Detailed revenue breakdown by source', icon: DollarSign },
  { id: '3', name: 'Proposal Performance', description: 'Win/loss analysis and patterns', icon: Target },
  { id: '4', name: 'Client Retention', description: 'Client churn and retention metrics', icon: Users },
  { id: '5', name: 'Platform ROI', description: 'ROI analysis across platforms', icon: TrendingUp },
  { id: '6', name: 'Time Tracking', description: 'Hours logged and productivity', icon: Clock },
];

export default function ReportsCenter() {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports Center</h1>
          <p className="text-nexus-muted mt-1">Analytics, insights, and performance reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 bg-nexus-card border-nexus-border">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent className="bg-nexus-card border-nexus-border">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="365d">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-nexus-border">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="bg-nexus-card border-nexus-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-nexus-muted">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className={cn(
                    'flex items-center gap-1 mt-2 text-xs',
                    metric.trend === 'up' ? 'text-nexus-green' : 'text-nexus-red'
                  )}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{Math.abs(metric.change)}% vs last period</span>
                  </div>
                </div>
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${metric.color}/10`)}>
                  <Icon className={cn('w-5 h-5', `text-${metric.color}`)} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="overview" className="data-[state=active]:bg-nexus-border">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="platforms" className="data-[state=active]:bg-nexus-border">
            <Globe className="w-4 h-4 mr-2" />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-nexus-border">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-nexus-border">
            <Clock className="w-4 h-4 mr-2" />
            Scheduled
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="bg-nexus-card border-nexus-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Revenue Trend</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <LineChart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="h-64 flex items-end gap-4">
                {monthlyData.map((data, i) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-nexus-blue to-nexus-purple rounded-t"
                      style={{ height: `${(data.revenue / 6100) * 200}px` }}
                    />
                    <span className="text-xs text-nexus-muted">{data.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Proposals Chart */}
            <Card className="bg-nexus-card border-nexus-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Proposal Activity</h3>
                <Badge className="bg-nexus-green/10 text-nexus-green">
                  +23% this month
                </Badge>
              </div>
              <div className="h-64 flex items-end gap-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-nexus-green to-nexus-cyan rounded-t"
                      style={{ height: `${(data.proposals / 45) * 200}px` }}
                    />
                    <span className="text-xs text-nexus-muted">{data.month}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="bg-nexus-card border-nexus-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-nexus-purple" />
              <h3 className="font-semibold">AI-Generated Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-nexus-green" />
                  <span className="text-sm font-medium">Top Performer</span>
                </div>
                <p className="text-sm text-nexus-muted">
                  Your Upwork account has 38% higher win rate. Consider allocating more bids there.
                </p>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-nexus-blue" />
                  <span className="text-sm font-medium">Best Timing</span>
                </div>
                <p className="text-sm text-nexus-muted">
                  Proposals sent between 9-11 AM get 45% more responses. Adjust your schedule!
                </p>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-nexus-fuchsia" />
                  <span className="text-sm font-medium">Opportunity</span>
                </div>
                <p className="text-sm text-nexus-muted">
                  React projects have 52% higher win rate. Focus on these for better results.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid gap-4">
            {platformData.map((platform) => (
              <Card key={platform.platform} className="bg-nexus-card border-nexus-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-nexus-border flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{platform.platform}</h3>
                      <p className="text-sm text-nexus-muted">{platform.clients} active clients</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-nexus-border">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-nexus-muted mb-1">Revenue</p>
                    <p className="text-xl font-bold">${platform.revenue.toLocaleString()}</p>
                    <Progress value={(platform.revenue / 28500) * 100} className="h-1.5 mt-2" />
                  </div>
                  <div>
                    <p className="text-xs text-nexus-muted mb-1">Proposals</p>
                    <p className="text-xl font-bold">{platform.proposals}</p>
                    <Progress value={(platform.proposals / 156) * 100} className="h-1.5 mt-2" />
                  </div>
                  <div>
                    <p className="text-xs text-nexus-muted mb-1">Win Rate</p>
                    <p className="text-xl font-bold">{platform.winRate}%</p>
                    <Progress value={platform.winRate} className="h-1.5 mt-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="bg-nexus-card border-nexus-border p-5 hover:border-nexus-muted transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-nexus-border flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-nexus-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-nexus-muted mt-1">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 border-nexus-border">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1 gradient-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Scheduled Reports</h2>
              <p className="text-sm text-nexus-muted">Automated reports sent to your email</p>
            </div>
            <Button className="gradient-primary">
              <Clock className="w-4 h-4 mr-2" />
              Schedule New Report
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <Card key={report.id} className="bg-nexus-card border-nexus-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      report.status === 'active' ? 'bg-nexus-green' : 'bg-nexus-muted'
                    )} />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-3 text-sm text-nexus-muted mt-1">
                        <span className="flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" />
                          {report.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.nextRun}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {report.recipients} recipients
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      report.status === 'active' 
                        ? 'bg-nexus-green/10 text-nexus-green'
                        : 'bg-nexus-muted/10 text-nexus-muted'
                    )}>
                      {report.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Printer className="w-4 h-4" />
                    </Button>
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
