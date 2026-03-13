import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Target,
  Eye,
  ChevronRight,
  ExternalLink,
  Settings,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for performance dashboard
const performanceStats = {
  totalProfiles: 12,
  winRate: { value: 24, trend: 3.2, isUp: true },
  avgResponseTime: { value: '2.4h', trend: -15, isUp: true },
  totalRevenue: { value: 127500, monthlyChange: 12.5 },
};

const platformPerformance = [
  {
    id: 'upwork',
    name: 'Upwork',
    icon: '🟢',
    color: 'from-green-500 to-emerald-500',
    activeProfiles: 5,
    totalProfiles: 5,
    totalBids: 156,
    totalEarnings: 78500,
    winRate: 28,
    avgResponseTime: '1.8h',
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    icon: '🟡',
    color: 'from-green-400 to-lime-500',
    activeProfiles: 4,
    totalProfiles: 4,
    totalBids: 89,
    totalEarnings: 34200,
    winRate: 22,
    avgResponseTime: '2.1h',
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    icon: '🔵',
    color: 'from-blue-500 to-cyan-500',
    activeProfiles: 2,
    totalProfiles: 3,
    totalBids: 45,
    totalEarnings: 12800,
    winRate: 18,
    avgResponseTime: '3.5h',
  },
  {
    id: 'toptal',
    name: 'Toptal',
    icon: '🟣',
    color: 'from-purple-500 to-violet-500',
    activeProfiles: 1,
    totalProfiles: 1,
    totalBids: 12,
    totalEarnings: 2000,
    winRate: 35,
    avgResponseTime: '4.2h',
  },
];

const recentBids = [
  {
    id: '1',
    jobTitle: 'Full Stack Developer for SaaS Platform',
    platform: 'Upwork',
    profile: 'John D. - Senior Dev',
    priceRange: '$5,000 - $8,000',
    timeSince: '2 hours ago',
    status: 'shortlisted',
  },
  {
    id: '2',
    jobTitle: 'React Native Mobile App Development',
    platform: 'Upwork',
    profile: 'Tech Solutions Pro',
    priceRange: '$3,500 - $5,000',
    timeSince: '4 hours ago',
    status: 'viewed',
  },
  {
    id: '3',
    jobTitle: 'E-commerce Website Redesign',
    platform: 'Fiverr',
    profile: 'WebDev Expert',
    priceRange: '$1,200 - $2,000',
    timeSince: '6 hours ago',
    status: 'pending',
  },
  {
    id: '4',
    jobTitle: 'API Integration Specialist',
    platform: 'Freelancer',
    profile: 'API Master',
    priceRange: '$800 - $1,500',
    timeSince: '8 hours ago',
    status: 'pending',
  },
  {
    id: '5',
    jobTitle: 'WordPress Plugin Development',
    platform: 'Upwork',
    profile: 'WP Specialist',
    priceRange: '$600 - $1,000',
    timeSince: '12 hours ago',
    status: 'viewed',
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  viewed: { label: 'Viewed', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  shortlisted: { label: 'Shortlisted', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  rejected: { label: 'Rejected', color: 'text-red-500', bg: 'bg-red-500/10' },
};

export default function MarketplacePerformance() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Marketplace Performance
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Track your freelance marketplace metrics and performance</p>
        </div>
        <Button
          variant="outline"
          className="border-border"
          onClick={() => navigate('/app/marketplace')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Manage Accounts
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Profiles */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Profiles</p>
              <p className="text-3xl font-bold mt-1">{performanceStats.totalProfiles}</p>
              <p className="text-xs text-muted-foreground mt-1">Across all platforms</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Win Rate */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Win Rate</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{performanceStats.winRate.value}%</p>
                <span className={cn(
                  "flex items-center text-xs font-medium",
                  performanceStats.winRate.isUp ? "text-emerald-500" : "text-red-500"
                )}>
                  {performanceStats.winRate.isUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {performanceStats.winRate.trend}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs last month</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </Card>

        {/* Avg Response Time */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg Response Time</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">{performanceStats.avgResponseTime.value}</p>
                <span className={cn(
                  "flex items-center text-xs font-medium",
                  performanceStats.avgResponseTime.isUp ? "text-emerald-500" : "text-red-500"
                )}>
                  {performanceStats.avgResponseTime.isUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(performanceStats.avgResponseTime.trend)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Faster than avg</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold">${(performanceStats.totalRevenue.value / 1000).toFixed(1)}k</p>
                <span className="flex items-center text-xs font-medium text-emerald-500">
                  <ArrowUpRight className="w-3 h-3" />
                  {performanceStats.totalRevenue.monthlyChange}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Performance Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Platform Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformPerformance.map((platform) => (
            <Card
              key={platform.id}
              className="p-5 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => navigate(`/app/marketplace/${platform.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl",
                    platform.color
                  )}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">{platform.winRate}% win rate</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Active Profiles Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Active Profiles</span>
                  <span className="font-medium">{platform.activeProfiles}/{platform.totalProfiles}</span>
                </div>
                <Progress
                  value={(platform.activeProfiles / platform.totalProfiles) * 100}
                  className="h-2"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Bids</p>
                  <p className="font-semibold">{platform.totalBids}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Earnings</p>
                  <p className="font-semibold text-emerald-500">${(platform.totalEarnings / 1000).toFixed(1)}k</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Bids */}
      <Card className="bg-card border-border">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Bids</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {recentBids.map((bid) => (
              <div
                key={bid.id}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{bid.jobTitle}</h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{bid.platform}</span>
                      <span>•</span>
                      <span>{bid.profile}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground">{bid.priceRange}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={cn(
                      "text-xs",
                      statusConfig[bid.status].bg,
                      statusConfig[bid.status].color
                    )}>
                      {statusConfig[bid.status].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{bid.timeSince}</span>
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

