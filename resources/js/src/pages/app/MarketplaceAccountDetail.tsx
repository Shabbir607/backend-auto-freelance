import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Globe,
  Settings,
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Key,
  Server,
  Wifi,
  RefreshCw,
  BarChart3,
  Save,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock platform data
const mockPlatformData = {
  upwork: {
    id: 'upwork',
    name: 'Upwork',
    icon: '🟢',
    color: 'from-green-500 to-emerald-500',
    totalEarnings: 78500,
    monthlyEarnings: 12500,
    totalBids: 156,
    winRate: 28,
    avgResponseTime: '1.8h',
    activeJobs: 3,
    completedJobs: 45,
    profiles: [
      { id: '1', name: 'John D. - Senior Developer', email: 'john@example.com', status: 'active', earnings: 45000, connects: 120, rating: 4.9 },
      { id: '2', name: 'Tech Solutions Pro', email: 'tech@example.com', status: 'active', earnings: 23500, connects: 85, rating: 4.8 },
      { id: '3', name: 'WebDev Expert', email: 'webdev@example.com', status: 'active', earnings: 8000, connects: 60, rating: 4.7 },
      { id: '4', name: 'API Specialist', email: 'api@example.com', status: 'paused', earnings: 2000, connects: 45, rating: 4.6 },
      { id: '5', name: 'Mobile Dev Pro', email: 'mobile@example.com', status: 'active', earnings: 0, connects: 100, rating: 0 },
    ],
    apiCredentials: {
      apiKey: 'upw_sk_live_xxxxxxxxxxxxx',
      clientId: 'upw_client_xxxxx',
      lastRotated: '2024-01-15',
    },
    proxyConfig: {
      ip: '192.168.1.100',
      port: '8080',
      location: 'US - New York',
      status: 'connected',
      latency: '45ms',
    },
  },
  fiverr: {
    id: 'fiverr',
    name: 'Fiverr',
    icon: '🟡',
    color: 'from-green-400 to-lime-500',
    totalEarnings: 34200,
    monthlyEarnings: 5800,
    totalBids: 89,
    winRate: 22,
    avgResponseTime: '2.1h',
    activeJobs: 5,
    completedJobs: 28,
    profiles: [
      { id: '1', name: 'Fiverr Pro Account', email: 'fiverr@example.com', status: 'active', earnings: 34200, connects: null, rating: 4.9 },
    ],
    apiCredentials: {
      apiKey: 'fvr_sk_live_xxxxxxxxxxxxx',
      clientId: 'fvr_client_xxxxx',
      lastRotated: '2024-01-10',
    },
    proxyConfig: {
      ip: '192.168.1.101',
      port: '8080',
      location: 'US - Los Angeles',
      status: 'connected',
      latency: '52ms',
    },
  },
};

const mockEarningsHistory = [
  { month: 'Jan', earnings: 8500 },
  { month: 'Feb', earnings: 9200 },
  { month: 'Mar', earnings: 11000 },
  { month: 'Apr', earnings: 10500 },
  { month: 'May', earnings: 12500 },
  { month: 'Jun', earnings: 14800 },
];

export default function MarketplaceAccountDetail() {
  const { platformId } = useParams();
  const navigate = useNavigate();
  const platform = mockPlatformData[platformId as keyof typeof mockPlatformData] || mockPlatformData.upwork;

  const [showApiKey, setShowApiKey] = useState(false);
  const [profiles, setProfiles] = useState(platform.profiles);

  const toggleProfileStatus = (profileId: string) => {
    setProfiles(prev => prev.map(profile =>
      profile.id === profileId
        ? { ...profile, status: profile.status === 'active' ? 'paused' : 'active' } as typeof profile
        : profile
    ));
  };

  const maxEarnings = Math.max(...mockEarningsHistory.map(d => d.earnings));

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/app/marketplace-performance')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl",
              platform.color
            )}>
              {platform.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{platform.name}</h1>
              <p className="text-muted-foreground text-sm">{platform.profiles.length} profiles connected</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Platform
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-emerald-500">${platform.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Win Rate</p>
              <p className="text-2xl font-bold">{platform.winRate}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Active Jobs</p>
              <p className="text-2xl font-bold">{platform.activeJobs}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Avg Response</p>
              <p className="text-2xl font-bold">{platform.avgResponseTime}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border border-border p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="profiles" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Users className="w-4 h-4 mr-2" />
            Profiles
          </TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Key className="w-4 h-4 mr-2" />
            API Credentials
          </TabsTrigger>
          <TabsTrigger value="proxy" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Server className="w-4 h-4 mr-2" />
            Proxy Config
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Chart */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Earnings History (Last 6 Months)</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {mockEarningsHistory.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-emerald-500/20 rounded-t relative"
                      style={{ height: `${(data.earnings / maxEarnings) * 100}%` }}
                    >
                      <div
                        className="w-full bg-emerald-500 rounded-t absolute bottom-0"
                        style={{ height: '100%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-lg font-bold text-emerald-500">${platform.monthlyEarnings.toLocaleString()}</span>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="font-medium">{platform.winRate}%</span>
                  </div>
                  <Progress value={platform.winRate} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Bids</span>
                    <span className="font-medium">{platform.totalBids}</span>
                  </div>
                  <Progress value={(platform.totalBids / 200) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Completed Jobs</span>
                    <span className="font-medium">{platform.completedJobs}</span>
                  </div>
                  <Progress value={(platform.completedJobs / 50) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Profiles Tab */}
        <TabsContent value="profiles" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Connected Profiles ({profiles.length})</h3>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Profile
            </Button>
          </div>
          <div className="grid gap-4">
            {profiles.map((profile) => (
              <Card key={profile.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{profile.name}</h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            profile.status === 'active'
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          )}
                        >
                          {profile.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Earnings</p>
                      <p className="font-semibold text-emerald-500">${profile.earnings.toLocaleString()}</p>
                    </div>
                    {profile.connects !== null && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Connects</p>
                        <p className="font-semibold">{profile.connects}</p>
                      </div>
                    )}
                    {profile.rating > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-semibold">⭐ {profile.rating}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={profile.status === 'active'}
                        onCheckedChange={() => toggleProfileStatus(profile.id)}
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Credentials Tab */}
        <TabsContent value="credentials" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-6">API Credentials</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value={platform.apiCredentials.apiKey}
                    readOnly
                    className="bg-background border-border font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Client ID</Label>
                <Input
                  value={platform.apiCredentials.clientId}
                  readOnly
                  className="bg-background border-border font-mono"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Last Rotated</p>
                  <p className="text-sm text-muted-foreground">{platform.apiCredentials.lastRotated}</p>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Rotate Keys
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Proxy Config Tab */}
        <TabsContent value="proxy" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-6">Proxy Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>IP Address</Label>
                <Input
                  value={platform.proxyConfig.ip}
                  className="bg-background border-border font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <Input
                  value={platform.proxyConfig.port}
                  className="bg-background border-border font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={platform.proxyConfig.location}
                  readOnly
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Latency</Label>
                <Input
                  value={platform.proxyConfig.latency}
                  readOnly
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 mt-6">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  platform.proxyConfig.status === 'connected' ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                  <Wifi className={cn(
                    "w-5 h-5",
                    platform.proxyConfig.status === 'connected' ? "text-emerald-500" : "text-red-500"
                  )} />
                </div>
                <div>
                  <p className="font-medium">Connection Status</p>
                  <p className={cn(
                    "text-sm",
                    platform.proxyConfig.status === 'connected' ? "text-emerald-500" : "text-red-500"
                  )}>
                    {platform.proxyConfig.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Test Connection
              </Button>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

