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
} from '@/components/ui/dialog';
import {
  Search,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Zap,
  Globe,
  Webhook,
  Key,
  Link2,
  Unlink,
  Clock,
  Activity,
  ArrowRight,
  Shield,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  Database,
  Cloud,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  features: string[];
  popular: boolean;
  new: boolean;
}

const integrations: Integration[] = [
  {
    id: 'upwork',
    name: 'Upwork',
    description: 'Connect your Upwork account for auto-bidding and job management',
    category: 'Freelance Platforms',
    icon: '🟢',
    status: 'connected',
    lastSync: '2 minutes ago',
    features: ['Auto-bidding', 'Job scraping', 'Message sync', 'Profile sync'],
    popular: true,
    new: false,
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    description: 'Sync your Fiverr gigs and manage orders from one place',
    category: 'Freelance Platforms',
    icon: '🟢',
    status: 'connected',
    lastSync: '5 minutes ago',
    features: ['Gig management', 'Order tracking', 'Message sync', 'Analytics'],
    popular: true,
    new: false,
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Manage Freelancer.com projects and bids',
    category: 'Freelance Platforms',
    icon: '🔵',
    status: 'disconnected',
    features: ['Project bidding', 'Contest management', 'Milestone tracking'],
    popular: true,
    new: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates directly in Slack',
    category: 'Communication',
    icon: '💬',
    status: 'connected',
    lastSync: '1 minute ago',
    features: ['Notifications', 'Team alerts', 'Bot commands'],
    popular: true,
    new: false,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Sync emails and automate email responses',
    category: 'Communication',
    icon: '📧',
    status: 'connected',
    lastSync: '30 seconds ago',
    features: ['Email sync', 'Auto-responses', 'Template emails'],
    popular: true,
    new: false,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Connect WhatsApp for client communication',
    category: 'Communication',
    icon: '📱',
    status: 'error',
    features: ['Message sync', 'Auto-replies', 'Broadcast lists'],
    popular: true,
    new: false,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync meetings and deadlines with your calendar',
    category: 'Productivity',
    icon: '📅',
    status: 'connected',
    lastSync: '15 minutes ago',
    features: ['Event sync', 'Deadline reminders', 'Meeting scheduling'],
    popular: true,
    new: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync projects and tasks with Notion workspaces',
    category: 'Productivity',
    icon: '📝',
    status: 'disconnected',
    features: ['Database sync', 'Page creation', 'Task management'],
    popular: false,
    new: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and manage invoices',
    category: 'Payments',
    icon: '💳',
    status: 'connected',
    lastSync: '1 hour ago',
    features: ['Payment processing', 'Invoice generation', 'Subscription management'],
    popular: true,
    new: false,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Accept payments via PayPal',
    category: 'Payments',
    icon: '💰',
    status: 'disconnected',
    features: ['Payment processing', 'Invoicing', 'Refunds'],
    popular: false,
    new: false,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps via Zapier',
    category: 'Automation',
    icon: '⚡',
    status: 'connected',
    lastSync: '10 minutes ago',
    features: ['Custom workflows', 'Multi-app triggers', 'Scheduled tasks'],
    popular: true,
    new: false,
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Build complex automation scenarios',
    category: 'Automation',
    icon: '🔄',
    status: 'disconnected',
    features: ['Visual builder', 'Data transformation', 'Error handling'],
    popular: false,
    new: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync development projects and issues',
    category: 'Development',
    icon: '🐙',
    status: 'connected',
    lastSync: '3 hours ago',
    features: ['Repo sync', 'Issue tracking', 'PR notifications'],
    popular: false,
    new: false,
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project management and issue tracking',
    category: 'Development',
    icon: '🔷',
    status: 'disconnected',
    features: ['Issue sync', 'Sprint tracking', 'Workflow automation'],
    popular: false,
    new: false,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI-powered features with GPT models',
    category: 'AI & ML',
    icon: '🤖',
    status: 'connected',
    lastSync: 'Always active',
    features: ['Proposal generation', 'Smart responses', 'Content creation'],
    popular: true,
    new: false,
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Claude AI for advanced reasoning tasks',
    category: 'AI & ML',
    icon: '🧠',
    status: 'disconnected',
    features: ['Long-form content', 'Analysis', 'Code review'],
    popular: false,
    new: true,
  },
];

const categories = [
  { id: 'all', label: 'All Integrations', count: integrations.length },
  { id: 'Freelance Platforms', label: 'Freelance Platforms', count: integrations.filter(i => i.category === 'Freelance Platforms').length },
  { id: 'Communication', label: 'Communication', count: integrations.filter(i => i.category === 'Communication').length },
  { id: 'Productivity', label: 'Productivity', count: integrations.filter(i => i.category === 'Productivity').length },
  { id: 'Payments', label: 'Payments', count: integrations.filter(i => i.category === 'Payments').length },
  { id: 'Automation', label: 'Automation', count: integrations.filter(i => i.category === 'Automation').length },
  { id: 'Development', label: 'Development', count: integrations.filter(i => i.category === 'Development').length },
  { id: 'AI & ML', label: 'AI & ML', count: integrations.filter(i => i.category === 'AI & ML').length },
];

export default function IntegrationHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = searchQuery === '' ||
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'connected':
        return { icon: CheckCircle, color: 'text-nexus-green', bg: 'bg-nexus-green/10', label: 'Connected' };
      case 'disconnected':
        return { icon: XCircle, color: 'text-nexus-muted', bg: 'bg-nexus-muted/10', label: 'Not Connected' };
      case 'error':
        return { icon: AlertCircle, color: 'text-nexus-red', bg: 'bg-nexus-red/10', label: 'Error' };
      default:
        return { icon: XCircle, color: 'text-nexus-muted', bg: 'bg-nexus-muted/10', label: 'Unknown' };
    }
  };

  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const status = getStatusConfig(integration.status);
    const StatusIcon = status.icon;

    return (
      <Card className="bg-nexus-card border-nexus-border p-5 hover:border-nexus-muted transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-nexus-border flex items-center justify-center text-2xl">
              {integration.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{integration.name}</h3>
                {integration.popular && (
                  <Badge className="bg-nexus-blue/10 text-nexus-blue text-xs">Popular</Badge>
                )}
                {integration.new && (
                  <Badge className="bg-nexus-green/10 text-nexus-green text-xs">New</Badge>
                )}
              </div>
              <p className="text-sm text-nexus-muted">{integration.category}</p>
            </div>
          </div>
          <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full text-xs', status.bg)}>
            <StatusIcon className={cn('w-3 h-3', status.color)} />
            <span className={status.color}>{status.label}</span>
          </div>
        </div>

        <p className="text-sm text-nexus-muted mb-4">{integration.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {integration.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="outline" className="border-nexus-border text-xs">
              {feature}
            </Badge>
          ))}
          {integration.features.length > 3 && (
            <Badge variant="outline" className="border-nexus-border text-xs">
              +{integration.features.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-nexus-border">
          {integration.status === 'connected' && integration.lastSync && (
            <span className="text-xs text-nexus-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Last sync: {integration.lastSync}
            </span>
          )}
          {integration.status !== 'connected' && <span />}
          <div className="flex gap-2">
            {integration.status === 'connected' ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-nexus-border"
                  onClick={() => {
                    setSelectedIntegration(integration);
                    setConfigDialogOpen(true);
                  }}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button variant="outline" size="sm" className="border-nexus-border">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </>
            ) : integration.status === 'error' ? (
              <Button size="sm" className="bg-nexus-red/10 text-nexus-red hover:bg-nexus-red/20">
                <AlertCircle className="w-4 h-4 mr-1" />
                Fix Connection
              </Button>
            ) : (
              <Button size="sm" className="gradient-primary">
                <Link2 className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Integration Hub</h1>
          <p className="text-nexus-muted mt-1">Connect and manage your third-party integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-nexus-border">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </Button>
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Request Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Total Integrations</p>
              <p className="text-2xl font-bold mt-1">{integrations.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-blue/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-nexus-blue" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Connected</p>
              <p className="text-2xl font-bold mt-1">{connectedCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-green/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-nexus-green" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">Needs Attention</p>
              <p className="text-2xl font-bold mt-1">{errorCount}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-red/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-nexus-red" />
            </div>
          </div>
        </Card>

        <Card className="bg-nexus-card border-nexus-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-nexus-muted">API Calls (24h)</p>
              <p className="text-2xl font-bold mt-1">12.5K</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-nexus-purple/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-nexus-purple" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-2">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-nexus-card border-nexus-border"
            />
          </div>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  selectedCategory === category.id
                    ? 'bg-nexus-border text-white'
                    : 'text-nexus-muted hover:text-white hover:bg-nexus-border/50'
                )}
              >
                <span>{category.label}</span>
                <Badge variant="outline" className="border-nexus-border text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="bg-nexus-card border border-nexus-border mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-nexus-border">
                All
              </TabsTrigger>
              <TabsTrigger value="connected" className="data-[state=active]:bg-nexus-border">
                <CheckCircle className="w-4 h-4 mr-2" />
                Connected
              </TabsTrigger>
              <TabsTrigger value="available" className="data-[state=active]:bg-nexus-border">
                <Plus className="w-4 h-4 mr-2" />
                Available
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connected" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredIntegrations
                  .filter((i) => i.status === 'connected')
                  .map((integration) => (
                    <IntegrationCard key={integration.id} integration={integration} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="available" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredIntegrations
                  .filter((i) => i.status === 'disconnected')
                  .map((integration) => (
                    <IntegrationCard key={integration.id} integration={integration} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-2xl">{selectedIntegration?.icon}</span>
              {selectedIntegration?.name} Settings
            </DialogTitle>
            <DialogDescription>
              Configure your {selectedIntegration?.name} integration
            </DialogDescription>
          </DialogHeader>

          {selectedIntegration && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between p-4 bg-nexus-black rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-nexus-green" />
                  <div>
                    <p className="font-medium">Connection Status</p>
                    <p className="text-sm text-nexus-muted">Last sync: {selectedIntegration.lastSync}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-nexus-border">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Features</h4>
                {selectedIntegration.features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span className="text-sm">{feature}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Sync Settings</h4>
                <div className="space-y-2">
                  <label className="text-sm text-nexus-muted">Sync Frequency</label>
                  <select className="w-full bg-nexus-black border border-nexus-border rounded-md p-2">
                    <option>Real-time</option>
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Manual only</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-nexus-border">
                <Button variant="outline" className="w-full border-nexus-red text-nexus-red hover:bg-nexus-red/10">
                  <Unlink className="w-4 h-4 mr-2" />
                  Disconnect Integration
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary" onClick={() => setConfigDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
