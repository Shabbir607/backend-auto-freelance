import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Key,
  Plus,
  Copy,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Settings,
  Code,
  Terminal,
  Lock,
  Unlock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface APIKey {
  id: string;
  name: string;
  key: string;
  type: 'production' | 'development' | 'test';
  status: 'active' | 'inactive' | 'expired';
  permissions: string[];
  lastUsed: string;
  createdAt: string;
  expiresAt: string;
  requestCount: number;
  rateLimit: number;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  lastTriggered: string;
  successRate: number;
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'nx_prod_sk_live_xxxxxxxxxxxxxxxxxxxx',
    type: 'production',
    status: 'active',
    permissions: ['read', 'write', 'delete'],
    lastUsed: '2 minutes ago',
    createdAt: '2024-01-15',
    expiresAt: '2025-01-15',
    requestCount: 125430,
    rateLimit: 10000,
  },
  {
    id: '2',
    name: 'Development Key',
    key: 'nx_dev_sk_test_xxxxxxxxxxxxxxxxxxxx',
    type: 'development',
    status: 'active',
    permissions: ['read', 'write'],
    lastUsed: '1 hour ago',
    createdAt: '2024-02-01',
    expiresAt: '2025-02-01',
    requestCount: 8532,
    rateLimit: 5000,
  },
  {
    id: '3',
    name: 'Test Key',
    key: 'nx_test_sk_xxxxxxxxxxxxxxxxxxxx',
    type: 'test',
    status: 'inactive',
    permissions: ['read'],
    lastUsed: '3 days ago',
    createdAt: '2024-03-01',
    expiresAt: '2024-09-01',
    requestCount: 452,
    rateLimit: 1000,
  },
];

const mockWebhooks: Webhook[] = [
  {
    id: '1',
    name: 'New Lead Notification',
    url: 'https://api.yoursite.com/webhooks/leads',
    events: ['lead.created', 'lead.updated'],
    status: 'active',
    lastTriggered: '5 minutes ago',
    successRate: 99.2,
  },
  {
    id: '2',
    name: 'Proposal Events',
    url: 'https://api.yoursite.com/webhooks/proposals',
    events: ['proposal.sent', 'proposal.accepted', 'proposal.rejected'],
    status: 'active',
    lastTriggered: '1 hour ago',
    successRate: 98.7,
  },
  {
    id: '3',
    name: 'Message Sync',
    url: 'https://api.yoursite.com/webhooks/messages',
    events: ['message.received', 'message.sent'],
    status: 'inactive',
    lastTriggered: '2 days ago',
    successRate: 95.4,
  },
];

const apiEvents = [
  { event: 'API Request', endpoint: '/api/v1/leads', status: 'success', time: '2s ago', duration: '45ms' },
  { event: 'Webhook Delivery', endpoint: 'lead.created', status: 'success', time: '5s ago', duration: '120ms' },
  { event: 'API Request', endpoint: '/api/v1/proposals', status: 'success', time: '12s ago', duration: '67ms' },
  { event: 'API Request', endpoint: '/api/v1/messages', status: 'error', time: '30s ago', duration: '2100ms' },
  { event: 'Webhook Delivery', endpoint: 'proposal.sent', status: 'success', time: '1m ago', duration: '89ms' },
];

export default function APIManagement() {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [newKeyDialogOpen, setNewKeyDialogOpen] = useState(false);
  const [newWebhookDialogOpen, setNewWebhookDialogOpen] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
        return 'text-nexus-green bg-nexus-green/10';
      case 'inactive':
        return 'text-nexus-muted bg-nexus-muted/10';
      case 'expired':
      case 'error':
        return 'text-nexus-red bg-nexus-red/10';
      default:
        return 'text-nexus-muted bg-nexus-muted/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-nexus-green/20 text-nexus-green border-nexus-green/30';
      case 'development':
        return 'bg-nexus-blue/20 text-nexus-blue border-nexus-blue/30';
      case 'test':
        return 'bg-nexus-purple/20 text-nexus-purple border-nexus-purple/30';
      default:
        return 'bg-nexus-muted/20 text-nexus-muted border-nexus-muted/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Management</h1>
          <p className="text-nexus-muted mt-1">Manage API keys, webhooks, and integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-nexus-border">
            <Code className="w-4 h-4 mr-2" />
            API Docs
          </Button>
          <Button className="gradient-primary">
            <Terminal className="w-4 h-4 mr-2" />
            API Playground
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Total Requests (24h)</p>
              <p className="text-2xl font-bold mt-1">1.2M</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-nexus-blue" />
            </div>
          </div>
          <p className="text-xs text-nexus-green mt-2">↑ 12% from yesterday</p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Success Rate</p>
              <p className="text-2xl font-bold mt-1">99.8%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-nexus-green" />
            </div>
          </div>
          <p className="text-xs text-nexus-green mt-2">↑ 0.2% from yesterday</p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Avg Response Time</p>
              <p className="text-2xl font-bold mt-1">45ms</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-nexus-purple" />
            </div>
          </div>
          <p className="text-xs text-nexus-green mt-2">↓ 5ms improvement</p>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Active Webhooks</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-fuchsia/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-nexus-fuchsia" />
            </div>
          </div>
          <p className="text-xs text-nexus-muted mt-2">2 pending verification</p>
        </Card>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="api-keys" className="data-[state=active]:bg-nexus-border">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="data-[state=active]:bg-nexus-border">
            <Globe className="w-4 h-4 mr-2" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-nexus-border">
            <Activity className="w-4 h-4 mr-2" />
            Activity Log
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-nexus-border">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">API Keys</h2>
              <p className="text-sm text-nexus-muted">Manage your API keys for authentication</p>
            </div>
            <Dialog open={newKeyDialogOpen} onOpenChange={setNewKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Key
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexus-card border-nexus-border">
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new API key for your application.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Key Name</label>
                    <Input placeholder="My API Key" className="bg-nexus-black border-nexus-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Environment</label>
                    <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                      <option value="production">Production</option>
                      <option value="development">Development</option>
                      <option value="test">Test</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permissions</label>
                    <div className="space-y-2">
                      {['read', 'write', 'delete'].map((perm) => (
                        <div key={perm} className="flex items-center gap-2">
                          <input type="checkbox" id={perm} className="rounded" defaultChecked={perm === 'read'} />
                          <label htmlFor={perm} className="text-sm capitalize">{perm}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewKeyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary" onClick={() => setNewKeyDialogOpen(false)}>
                    Generate Key
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted">Name</TableHead>
                  <TableHead className="text-nexus-muted">Key</TableHead>
                  <TableHead className="text-nexus-muted">Type</TableHead>
                  <TableHead className="text-nexus-muted">Status</TableHead>
                  <TableHead className="text-nexus-muted">Last Used</TableHead>
                  <TableHead className="text-nexus-muted">Requests</TableHead>
                  <TableHead className="text-nexus-muted text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAPIKeys.map((apiKey) => (
                  <TableRow key={apiKey.id} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-nexus-muted" />
                        {apiKey.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <code className="bg-nexus-black px-2 py-1 rounded">
                          {showKeys[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-1 hover:bg-nexus-border rounded"
                        >
                          {showKeys[apiKey.id] ? (
                            <EyeOff className="w-4 h-4 text-nexus-muted" />
                          ) : (
                            <Eye className="w-4 h-4 text-nexus-muted" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="p-1 hover:bg-nexus-border rounded"
                        >
                          <Copy className="w-4 h-4 text-nexus-muted" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('text-xs', getTypeColor(apiKey.type))}>
                        {apiKey.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          apiKey.status === 'active' ? 'bg-nexus-green' : 
                          apiKey.status === 'inactive' ? 'bg-nexus-muted' : 'bg-nexus-red'
                        )} />
                        <span className="text-sm capitalize">{apiKey.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-nexus-muted text-sm">{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <span className="text-sm">{apiKey.requestCount.toLocaleString()}</span>
                      <span className="text-xs text-nexus-muted"> / {apiKey.rateLimit.toLocaleString()}/h</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-nexus-red hover:text-nexus-red">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Webhooks</h2>
              <p className="text-sm text-nexus-muted">Configure webhooks for real-time event notifications</p>
            </div>
            <Dialog open={newWebhookDialogOpen} onOpenChange={setNewWebhookDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-nexus-card border-nexus-border">
                <DialogHeader>
                  <DialogTitle>Add New Webhook</DialogTitle>
                  <DialogDescription>
                    Configure a webhook endpoint to receive real-time notifications.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook Name</label>
                    <Input placeholder="My Webhook" className="bg-nexus-black border-nexus-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Endpoint URL</label>
                    <Input placeholder="https://api.example.com/webhook" className="bg-nexus-black border-nexus-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Events</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['lead.created', 'lead.updated', 'proposal.sent', 'proposal.accepted', 'message.received', 'message.sent'].map((event) => (
                        <div key={event} className="flex items-center gap-2">
                          <input type="checkbox" id={event} className="rounded" />
                          <label htmlFor={event} className="text-sm">{event}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewWebhookDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary" onClick={() => setNewWebhookDialogOpen(false)}>
                    Create Webhook
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockWebhooks.map((webhook) => (
              <Card key={webhook.id} className="bg-nexus-card border-nexus-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-3 h-3 rounded-full',
                        webhook.status === 'active' ? 'bg-nexus-green animate-pulse' : 'bg-nexus-muted'
                      )} />
                      <h3 className="font-semibold">{webhook.name}</h3>
                      <Badge className={cn(
                        'text-xs',
                        webhook.status === 'active' 
                          ? 'bg-nexus-green/10 text-nexus-green'
                          : 'bg-nexus-muted/10 text-nexus-muted'
                      )}>
                        {webhook.status}
                      </Badge>
                    </div>
                    <code className="text-xs text-nexus-muted block mt-2 bg-nexus-black px-2 py-1 rounded">
                      {webhook.url}
                    </code>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs border-nexus-border">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-right">
                      <p className="text-sm text-nexus-muted">Success Rate</p>
                      <p className={cn(
                        'text-lg font-semibold',
                        webhook.successRate >= 98 ? 'text-nexus-green' : 
                        webhook.successRate >= 95 ? 'text-nexus-yellow' : 'text-nexus-red'
                      )}>
                        {webhook.successRate}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-nexus-muted">Last Triggered</p>
                      <p className="text-sm">{webhook.lastTriggered}</p>
                    </div>
                    <div className="flex gap-2">
                      <Switch checked={webhook.status === 'active'} />
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-nexus-red hover:text-nexus-red">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Activity Log</h2>
              <p className="text-sm text-nexus-muted">Recent API requests and webhook deliveries</p>
            </div>
            <Button variant="outline" className="border-nexus-border">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card className="bg-nexus-card border-nexus-border">
            <Table>
              <TableHeader>
                <TableRow className="border-nexus-border hover:bg-transparent">
                  <TableHead className="text-nexus-muted">Event</TableHead>
                  <TableHead className="text-nexus-muted">Endpoint</TableHead>
                  <TableHead className="text-nexus-muted">Status</TableHead>
                  <TableHead className="text-nexus-muted">Duration</TableHead>
                  <TableHead className="text-nexus-muted">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiEvents.map((event, i) => (
                  <TableRow key={i} className="border-nexus-border hover:bg-nexus-border/30">
                    <TableCell className="font-medium">{event.event}</TableCell>
                    <TableCell className="font-mono text-xs">{event.endpoint}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        'text-xs',
                        event.status === 'success' 
                          ? 'bg-nexus-green/10 text-nexus-green'
                          : 'bg-nexus-red/10 text-nexus-red'
                      )}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-nexus-muted">{event.duration}</TableCell>
                    <TableCell className="text-nexus-muted">{event.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h2 className="text-lg font-semibold mb-4">API Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rate Limiting</p>
                  <p className="text-sm text-nexus-muted">Limit API requests per hour</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    defaultValue="10000" 
                    className="w-32 bg-nexus-black border-nexus-border" 
                  />
                  <span className="text-sm text-nexus-muted">requests/hour</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP Whitelist</p>
                  <p className="text-sm text-nexus-muted">Restrict API access to specific IPs</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Request Logging</p>
                  <p className="text-sm text-nexus-muted">Log all API requests for debugging</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Webhook Retries</p>
                  <p className="text-sm text-nexus-muted">Automatically retry failed webhook deliveries</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    defaultValue="3" 
                    className="w-20 bg-nexus-black border-nexus-border" 
                  />
                  <span className="text-sm text-nexus-muted">retries</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-nexus-card border-nexus-border p-6">
            <h2 className="text-lg font-semibold mb-4">Security</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-nexus-muted">Require 2FA for API key management</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Key Expiration</p>
                  <p className="text-sm text-nexus-muted">Auto-expire API keys after a period</p>
                </div>
                <select className="bg-nexus-black border border-nexus-border rounded-md px-3 py-2">
                  <option value="never">Never</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
