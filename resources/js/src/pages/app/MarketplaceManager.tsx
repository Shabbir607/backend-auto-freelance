import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Globe,
  Plus,
  Settings,
  Shield,
  Key,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Server,
  Wifi,
  Activity,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Briefcase,
  BarChart3,
} from 'lucide-react';

// Mock platform accounts data
const mockPlatformAccounts = [
  {
    id: '1',
    platform: 'upwork',
    name: 'Upwork Pro Account',
    email: 'john@example.com',
    status: 'active',
    lastSync: '2 mins ago',
    connects: 120,
    earnings: 45000,
    activeJobs: 3,
    proxyIp: '192.168.1.100',
    proxyStatus: 'connected',
  },
  {
    id: '2',
    platform: 'fiverr',
    name: 'Fiverr Seller',
    email: 'john.fiverr@example.com',
    status: 'active',
    lastSync: '5 mins ago',
    connects: null,
    earnings: 28000,
    activeJobs: 5,
    proxyIp: '192.168.1.101',
    proxyStatus: 'connected',
  },
  {
    id: '3',
    platform: 'freelancer',
    name: 'Freelancer.com',
    email: 'john.freelancer@example.com',
    status: 'warning',
    lastSync: '1 hour ago',
    connects: 45,
    earnings: 12000,
    activeJobs: 1,
    proxyIp: '192.168.1.102',
    proxyStatus: 'disconnected',
  },
];

// Mock proxy pool data
const mockProxyPool = [
  { id: '1', ip: '192.168.1.100', location: 'US - New York', status: 'active', assignedTo: 'Upwork Pro Account', latency: '45ms' },
  { id: '2', ip: '192.168.1.101', location: 'US - Los Angeles', status: 'active', assignedTo: 'Fiverr Seller', latency: '52ms' },
  { id: '3', ip: '192.168.1.102', location: 'UK - London', status: 'inactive', assignedTo: 'Freelancer.com', latency: '120ms' },
  { id: '4', ip: '192.168.1.103', location: 'DE - Frankfurt', status: 'available', assignedTo: null, latency: '38ms' },
  { id: '5', ip: '192.168.1.104', location: 'SG - Singapore', status: 'available', assignedTo: null, latency: '85ms' },
];

const platformIcons: Record<string, string> = {
  upwork: '🟢',
  fiverr: '🟡',
  freelancer: '🔵',
};

const platformColors: Record<string, string> = {
  upwork: 'from-green-500 to-emerald-500',
  fiverr: 'from-green-400 to-lime-500',
  freelancer: 'from-blue-500 to-cyan-500',
};

export default function MarketplaceManager() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(mockPlatformAccounts);
  const [proxies, setProxies] = useState(mockProxyPool);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showAddProxyModal, setShowAddProxyModal] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});

  const toggleApiKeyVisibility = (accountId: string) => {
    setShowApiKeys(prev => ({ ...prev, [accountId]: !prev[accountId] }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30">Active</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">Warning</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/30">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  const getProxyStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30"><Wifi className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Disconnected</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketplace Manager</h1>
          <p className="text-nexus-muted">Manage your freelance platform accounts and integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-nexus-border text-white hover:bg-white/5"
            onClick={() => navigate('/app/marketplace-performance')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Performance
          </Button>
          <Button variant="outline" className="border-nexus-border text-white hover:bg-white/5">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
          <Dialog open={showAddAccountModal} onOpenChange={setShowAddAccountModal}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-nexus-card border-nexus-border max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Connect Platform Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-white">Platform</Label>
                  <Select>
                    <SelectTrigger className="bg-nexus-black border-nexus-border text-white">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-nexus-card border-nexus-border">
                      <SelectItem value="upwork">Upwork</SelectItem>
                      <SelectItem value="fiverr">Fiverr</SelectItem>
                      <SelectItem value="freelancer">Freelancer.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Account Name</Label>
                  <Input placeholder="My Upwork Account" className="bg-nexus-black border-nexus-border text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Email</Label>
                  <Input type="email" placeholder="email@example.com" className="bg-nexus-black border-nexus-border text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">API Key / OAuth Token</Label>
                  <Input type="password" placeholder="Enter API key or token" className="bg-nexus-black border-nexus-border text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Assign Proxy IP</Label>
                  <Select>
                    <SelectTrigger className="bg-nexus-black border-nexus-border text-white">
                      <SelectValue placeholder="Select proxy" />
                    </SelectTrigger>
                    <SelectContent className="bg-nexus-card border-nexus-border">
                      {proxies.filter(p => p.status === 'available').map(proxy => (
                        <SelectItem key={proxy.id} value={proxy.id}>{proxy.ip} - {proxy.location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddAccountModal(false)} className="border-nexus-border text-white">
                    Cancel
                  </Button>
                  <Button className="gradient-primary text-white border-0">
                    Connect Account
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Connected Accounts', value: accounts.length, icon: Globe, color: 'text-cyan-400' },
          { label: 'Total Earnings', value: `$${accounts.reduce((sum, a) => sum + a.earnings, 0).toLocaleString()}`, icon: DollarSign, color: 'text-[#39FF14]' },
          { label: 'Active Jobs', value: accounts.reduce((sum, a) => sum + a.activeJobs, 0), icon: Briefcase, color: 'text-purple-400' },
          { label: 'Active Proxies', value: proxies.filter(p => p.status === 'active').length, icon: Server, color: 'text-orange-400' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-nexus-card border-nexus-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-nexus-muted text-xs md:text-sm">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="accounts" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border p-1">
          <TabsTrigger value="accounts" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-nexus-muted">
            <Globe className="w-4 h-4 mr-2" />
            Platform Accounts
          </TabsTrigger>
          <TabsTrigger value="proxies" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-nexus-muted">
            <Server className="w-4 h-4 mr-2" />
            IP Management
          </TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-nexus-muted">
            <Key className="w-4 h-4 mr-2" />
            API Credentials
          </TabsTrigger>
        </TabsList>

        {/* Platform Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="bg-nexus-card border-nexus-border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platformColors[account.platform]} flex items-center justify-center text-2xl`}>
                      {platformIcons[account.platform]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{account.name}</h3>
                        {getStatusBadge(account.status)}
                      </div>
                      <p className="text-nexus-muted text-sm mt-1">{account.email}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-nexus-muted" />
                          <span className="text-nexus-muted">Last sync: {account.lastSync}</span>
                        </div>
                        {getProxyStatusBadge(account.proxyStatus)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-white hover:bg-white/5">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-white hover:bg-white/5">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-red-500 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-nexus-border">
                  <div>
                    <p className="text-nexus-muted text-sm">Earnings</p>
                    <p className="text-xl font-semibold text-[#39FF14]">${account.earnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-nexus-muted text-sm">Active Jobs</p>
                    <p className="text-xl font-semibold text-white">{account.activeJobs}</p>
                  </div>
                  {account.connects !== null && (
                    <div>
                      <p className="text-nexus-muted text-sm">Connects</p>
                      <p className="text-xl font-semibold text-white">{account.connects}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-nexus-muted text-sm">Proxy IP</p>
                    <p className="text-sm font-mono text-cyan-400">{account.proxyIp}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* IP Management Tab */}
        <TabsContent value="proxies" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Proxy Pool</h3>
              <p className="text-nexus-muted text-sm">Manage dedicated proxy IPs for each platform account</p>
            </div>
            <Dialog open={showAddProxyModal} onOpenChange={setShowAddProxyModal}>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proxy
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexus-card border-nexus-border max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Proxy</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-white">Proxy IP Address</Label>
                    <Input placeholder="192.168.1.xxx" className="bg-nexus-black border-nexus-border text-white font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Port</Label>
                    <Input placeholder="8080" className="bg-nexus-black border-nexus-border text-white font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Location</Label>
                    <Select>
                      <SelectTrigger className="bg-nexus-black border-nexus-border text-white">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-nexus-card border-nexus-border">
                        <SelectItem value="us-ny">US - New York</SelectItem>
                        <SelectItem value="us-la">US - Los Angeles</SelectItem>
                        <SelectItem value="uk-london">UK - London</SelectItem>
                        <SelectItem value="de-frankfurt">DE - Frankfurt</SelectItem>
                        <SelectItem value="sg-singapore">SG - Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Username (Optional)</Label>
                    <Input placeholder="proxy_user" className="bg-nexus-black border-nexus-border text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Password (Optional)</Label>
                    <Input type="password" placeholder="••••••••" className="bg-nexus-black border-nexus-border text-white" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowAddProxyModal(false)} className="border-nexus-border text-white">
                      Cancel
                    </Button>
                    <Button className="gradient-primary text-white border-0">
                      Add Proxy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-nexus-card border-nexus-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nexus-border">
                    <th className="text-left p-4 text-nexus-muted font-medium text-sm">IP Address</th>
                    <th className="text-left p-4 text-nexus-muted font-medium text-sm">Location</th>
                    <th className="text-left p-4 text-nexus-muted font-medium text-sm">Status</th>
                    <th className="text-left p-4 text-nexus-muted font-medium text-sm">Assigned To</th>
                    <th className="text-left p-4 text-nexus-muted font-medium text-sm">Latency</th>
                    <th className="text-right p-4 text-nexus-muted font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proxies.map((proxy) => (
                    <tr key={proxy.id} className="border-b border-nexus-border/50 hover:bg-white/5">
                      <td className="p-4">
                        <span className="font-mono text-cyan-400">{proxy.ip}</span>
                      </td>
                      <td className="p-4 text-white">{proxy.location}</td>
                      <td className="p-4">
                        {proxy.status === 'active' && <Badge className="bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30">Active</Badge>}
                        {proxy.status === 'inactive' && <Badge className="bg-red-500/10 text-red-500 border-red-500/30">Inactive</Badge>}
                        {proxy.status === 'available' && <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">Available</Badge>}
                      </td>
                      <td className="p-4 text-white">{proxy.assignedTo || <span className="text-nexus-muted">Unassigned</span>}</td>
                      <td className="p-4">
                        <span className={`font-mono ${parseInt(proxy.latency) < 60 ? 'text-[#39FF14]' : parseInt(proxy.latency) < 100 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {proxy.latency}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-white hover:bg-white/5">
                            <Activity className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-white hover:bg-white/5">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-nexus-muted hover:text-red-500 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* API Credentials Tab */}
        <TabsContent value="credentials" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Secure Credential Storage</h3>
                <p className="text-nexus-muted text-sm">All API keys and OAuth tokens are encrypted at rest</p>
              </div>
            </div>

            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="p-4 bg-nexus-black rounded-lg border border-nexus-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platformColors[account.platform]} flex items-center justify-center text-lg`}>
                        {platformIcons[account.platform]}
                      </div>
                      <div>
                        <p className="font-medium text-white">{account.name}</p>
                        <p className="text-sm text-nexus-muted">{account.platform.charAt(0).toUpperCase() + account.platform.slice(1)} API</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-nexus-muted text-sm">API Key:</span>
                        <code className="font-mono text-sm bg-white/5 px-2 py-1 rounded text-cyan-400">
                          {showApiKeys[account.id] ? 'sk_live_abc123xyz789...' : '••••••••••••••••'}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleApiKeyVisibility(account.id)}
                          className="text-nexus-muted hover:text-white"
                        >
                          {showApiKeys[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="border-nexus-border text-white hover:bg-white/5">
                        <RefreshCw className="w-3 h-3 mr-2" />
                        Rotate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
