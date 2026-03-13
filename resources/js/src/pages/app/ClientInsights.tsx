import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Star,
  MessageSquare,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  Globe,
  BarChart3,
  PieChart,
  Zap,
  RefreshCw,
  Download,
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar: string;
  totalRevenue: number;
  projectsCompleted: number;
  avgRating: number;
  responseTime: string;
  platform: string;
  status: 'active' | 'inactive' | 'prospect';
  lastContact: string;
  lifetimeValue: number;
  riskScore: 'low' | 'medium' | 'high';
  industry: string;
  location: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    company: 'TechStart Inc',
    email: 'sarah@techstart.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    totalRevenue: 45600,
    projectsCompleted: 12,
    avgRating: 4.9,
    responseTime: '2 hrs',
    platform: 'Upwork',
    status: 'active',
    lastContact: '2 days ago',
    lifetimeValue: 68400,
    riskScore: 'low',
    industry: 'Technology',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    company: 'Creative Labs',
    email: 'marcus@creativelabs.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    totalRevenue: 32400,
    projectsCompleted: 8,
    avgRating: 4.7,
    responseTime: '4 hrs',
    platform: 'Fiverr',
    status: 'active',
    lastContact: '1 week ago',
    lifetimeValue: 48600,
    riskScore: 'medium',
    industry: 'Marketing',
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Emily Chen',
    company: 'DataDriven Co',
    email: 'emily@datadriven.co',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    totalRevenue: 28900,
    projectsCompleted: 6,
    avgRating: 5.0,
    responseTime: '1 hr',
    platform: 'LinkedIn',
    status: 'prospect',
    lastContact: '3 days ago',
    lifetimeValue: 43350,
    riskScore: 'low',
    industry: 'Analytics',
    location: 'Seattle, WA',
  },
  {
    id: '4',
    name: 'David Park',
    company: 'StartupXYZ',
    email: 'david@startupxyz.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    totalRevenue: 15200,
    projectsCompleted: 4,
    avgRating: 4.5,
    responseTime: '6 hrs',
    platform: 'Upwork',
    status: 'inactive',
    lastContact: '3 weeks ago',
    lifetimeValue: 22800,
    riskScore: 'high',
    industry: 'E-commerce',
    location: 'Austin, TX',
  },
];

const insights = [
  {
    title: 'Total Clients',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'cyan',
  },
  {
    title: 'Revenue (30d)',
    value: '$45,200',
    change: '+18%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Avg. Response Time',
    value: '2.4 hrs',
    change: '-15%',
    trend: 'up',
    icon: Clock,
    color: 'purple',
  },
  {
    title: 'Client Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'yellow',
  },
];

const retentionData = [
  { month: 'Jan', rate: 92 },
  { month: 'Feb', rate: 94 },
  { month: 'Mar', rate: 91 },
  { month: 'Apr', rate: 96 },
  { month: 'May', rate: 95 },
  { month: 'Jun', rate: 97 },
];

export default function ClientInsights() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(mockClients[0]);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'prospect': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Client Insights</h1>
          <p className="text-muted-foreground">Analyze client relationships and revenue patterns</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <Card key={insight.title} className="p-5 bg-card border-border">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${insight.color}-500/20 flex items-center justify-center`}>
                <insight.icon className={`w-5 h-5 text-${insight.color}-400`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${insight.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {insight.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {insight.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{insight.value}</p>
            <p className="text-sm text-muted-foreground">{insight.title}</p>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedClient?.id === client.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-10 h-10 rounded-full border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{client.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{client.company}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">${client.totalRevenue.toLocaleString()}</span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        {client.avgRating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Client Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedClient && (
            <>
              {/* Client Profile */}
              <Card className="bg-card border-border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedClient.avatar}
                      alt={selectedClient.name}
                      className="w-16 h-16 rounded-full border-2 border-border"
                    />
                    <div>
                      <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                      <p className="text-muted-foreground">{selectedClient.company}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className={getStatusColor(selectedClient.status)}>
                          {selectedClient.status}
                        </Badge>
                        <Badge variant="outline">
                          <Globe className="w-3 h-3 mr-1" />
                          {selectedClient.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedClient.industry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedClient.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Last contact: {selectedClient.lastContact}</span>
                  </div>
                </div>
              </Card>

              {/* Client Metrics */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-card border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-xl font-bold">${selectedClient.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">75% of lifetime target</p>
                </Card>

                <Card className="bg-card border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Projects Completed</p>
                      <p className="text-xl font-bold">{selectedClient.projectsCompleted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{selectedClient.avgRating} avg rating</span>
                  </div>
                </Card>

                <Card className="bg-card border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lifetime Value</p>
                      <p className="text-xl font-bold">${selectedClient.lifetimeValue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Risk Score:</span>
                    <span className={`text-sm font-medium ${getRiskColor(selectedClient.riskScore)}`}>
                      {selectedClient.riskScore.charAt(0).toUpperCase() + selectedClient.riskScore.slice(1)}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Activity & Recommendations */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card border-border p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    Revenue Trend
                  </h3>
                  <div className="space-y-3">
                    {[
                      { month: 'Jan', amount: 4500 },
                      { month: 'Feb', amount: 6200 },
                      { month: 'Mar', amount: 5800 },
                      { month: 'Apr', amount: 7100 },
                      { month: 'May', amount: 8400 },
                      { month: 'Jun', amount: 9200 },
                    ].map((item) => (
                      <div key={item.month} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-10">{item.month}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full"
                            style={{ width: `${(item.amount / 10000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-16 text-right">${item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-card border-border p-5">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {[
                      { text: 'Send follow-up message', priority: 'high', action: 'Schedule' },
                      { text: 'Propose upsell opportunity', priority: 'medium', action: 'View' },
                      { text: 'Update project timeline', priority: 'low', action: 'Review' },
                    ].map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            rec.priority === 'high' ? 'bg-red-400' :
                            rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                          }`} />
                          <span className="text-sm">{rec.text}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          {rec.action}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
