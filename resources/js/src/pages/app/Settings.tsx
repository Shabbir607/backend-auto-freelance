import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Shield, CreditCard, Globe, Key, Plus, Trash2, MoreHorizontal, CheckCircle, AlertCircle, Moon, Sun, Languages, Settings as SettingsIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { proxies, apiTokens, addProxy, deleteProxy, addApiToken, deleteApiToken } = useAppStore();
  const { team, hasRole } = useAuth();
  const { showToast } = useToast();

  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [tokenModalOpen, setTokenModalOpen] = useState(false);

  const [proxyForm, setProxyForm] = useState({
    ip: '',
    port: '',
    username: '',
    location: '',
  });

  const [tokenForm, setTokenForm] = useState({
    name: '',
    provider: 'gemini' as 'gemini' | 'openai' | 'anthropic',
  });

  if (!hasRole(['admin', 'superadmin'])) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <Card className="p-8 bg-nexus-card border-nexus-border text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-nexus-muted">
            You don't have permission to access settings.
          </p>
        </Card>
      </div>
    );
  }

  const handleAddProxy = () => {
    if (!proxyForm.ip || !proxyForm.port) {
      showToast('Please fill in IP and port', 'error');
      return;
    }
    if (!team) return;

    addProxy({
      teamId: team.id,
      ip: proxyForm.ip,
      port: parseInt(proxyForm.port),
      username: proxyForm.username,
      status: 'active',
      assignedAccounts: [],
      location: proxyForm.location || 'Unknown',
      lastChecked: new Date().toISOString(),
    });

    showToast('Proxy added successfully', 'success');
    setProxyModalOpen(false);
    setProxyForm({ ip: '', port: '', username: '', location: '' });
  };

  const handleAddToken = () => {
    if (!tokenForm.name) {
      showToast('Please enter a token name', 'error');
      return;
    }
    if (!team) return;

    addApiToken({
      teamId: team.id,
      name: tokenForm.name,
      provider: tokenForm.provider,
      status: 'active',
    });

    showToast('API token added successfully', 'success');
    setTokenModalOpen(false);
    setTokenForm({ name: '', provider: 'gemini' });
  };

  const handleDeleteProxy = (proxyId: string) => {
    if (confirm('Are you sure you want to delete this proxy?')) {
      deleteProxy(proxyId);
      showToast('Proxy deleted', 'success');
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    if (confirm('Are you sure you want to delete this API token?')) {
      deleteApiToken(tokenId);
      showToast('API token deleted', 'success');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">Settings</h1>
        <p className="text-nexus-muted text-sm">
          Manage your team's subscription, proxies, and API tokens
        </p>
      </div>

      <Tabs defaultValue="billing" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="billing" className="data-[state=active]:bg-nexus-border text-xs sm:text-sm">
            <CreditCard className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{t('settings.billing')}</span>
          </TabsTrigger>
          <TabsTrigger value="proxies" className="data-[state=active]:bg-nexus-border text-xs sm:text-sm">
            <Globe className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{t('settings.proxies')}</span>
          </TabsTrigger>
          <TabsTrigger value="tokens" className="data-[state=active]:bg-nexus-border text-xs sm:text-sm">
            <Key className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{t('settings.apiTokens')}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-nexus-border text-xs sm:text-sm">
            <SettingsIcon className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
                <p className="text-sm text-nexus-muted">Manage your subscription and billing</p>
              </div>
              <Badge className="gradient-primary text-white border-0 capitalize">
                {team?.plan || 'Free'} Plan
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-nexus-black rounded-lg">
                <p className="text-sm text-nexus-muted mb-1">Monthly Price</p>
                <p className="text-2xl font-bold">
                  ${team?.plan === 'enterprise' ? '399' : team?.plan === 'pro' ? '149' : '49'}
                </p>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg">
                <p className="text-sm text-nexus-muted mb-1">Billing Cycle</p>
                <p className="text-2xl font-bold">Monthly</p>
              </div>
              <div className="p-4 bg-nexus-black rounded-lg">
                <p className="text-sm text-nexus-muted mb-1">Next Payment</p>
                <p className="text-2xl font-bold">Jan 15, 2025</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Usage This Month</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-nexus-muted">Auto-Bids</span>
                    <span>847 / Unlimited</span>
                  </div>
                  <div className="h-2 bg-nexus-border rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-nexus-muted">Team Members</span>
                    <span>3 / 5</span>
                  </div>
                  <div className="h-2 bg-nexus-border rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-nexus-muted">Platform Accounts</span>
                    <span>5 / 10</span>
                  </div>
                  <div className="h-2 bg-nexus-border rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="gradient-primary text-white border-0">
                Upgrade Plan
              </Button>
              <Button variant="outline">
                Manage Subscription
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Proxies Tab */}
        <TabsContent value="proxies" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Proxy Configuration</h2>
              <p className="text-sm text-nexus-muted">Manage proxies for your platform accounts</p>
            </div>
            <Button
              className="gradient-primary text-white border-0 gap-2"
              onClick={() => setProxyModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Proxy
            </Button>
          </div>

          <Card className="bg-nexus-card border-nexus-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nexus-border bg-nexus-black/50">
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">IP Address</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Port</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Location</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Assigned</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Last Checked</th>
                    <th className="text-left p-4 text-sm font-medium text-nexus-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proxies.map((proxy) => (
                    <tr key={proxy.id} className="border-b border-nexus-border hover:bg-nexus-border/30 transition-colors">
                      <td className="p-4 font-mono text-sm">{proxy.ip}</td>
                      <td className="p-4 font-mono text-sm">{proxy.port}</td>
                      <td className="p-4 text-sm">{proxy.location}</td>
                      <td className="p-4">
                        <Badge className={
                          proxy.status === 'active'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : proxy.status === 'error'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : 'bg-nexus-border text-nexus-muted'
                        }>
                          {proxy.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{proxy.assignedAccounts.length} accounts</td>
                      <td className="p-4 text-sm text-nexus-muted">
                        {formatDistanceToNow(new Date(proxy.lastChecked), { addSuffix: true })}
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-nexus-card border-nexus-border">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Test Connection</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteProxy(proxy.id)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* API Tokens Tab */}
        <TabsContent value="tokens" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">API Tokens</h2>
              <p className="text-sm text-nexus-muted">Manage your AI provider API tokens</p>
            </div>
            <Button
              className="gradient-primary text-white border-0 gap-2"
              onClick={() => setTokenModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Token
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiTokens.map((token) => (
              <Card key={token.id} className="p-4 bg-nexus-card border-nexus-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {token.status === 'active' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium">{token.name}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-nexus-card border-nexus-border">
                      <DropdownMenuItem>Update Token</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteToken(token.id)}
                        className="text-red-500 focus:text-red-500"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-nexus-muted">Provider</span>
                    <Badge variant="outline" className="capitalize">{token.provider}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nexus-muted">Status</span>
                    <Badge className={
                      token.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }>
                      {token.status}
                    </Badge>
                  </div>
                  {token.lastUsed && (
                    <div className="flex justify-between">
                      <span className="text-nexus-muted">Last Used</span>
                      <span>{formatDistanceToNow(new Date(token.lastUsed), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="p-6 bg-nexus-card border-nexus-border">
            <h3 className="text-lg font-semibold mb-6">Appearance</h3>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-nexus-blue" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{t('settings.theme')}</p>
                    <p className="text-sm text-nexus-muted">
                      {theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-nexus-muted" />
                  <div>
                    <p className="font-medium">{t('settings.language')}</p>
                    <p className="text-sm text-nexus-muted">Select your preferred language</p>
                  </div>
                </div>
                <Select
                  value={i18n.language}
                  onValueChange={(value) => i18n.changeLanguage(value)}
                >
                  <SelectTrigger className="w-40 bg-nexus-black border-nexus-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-nexus-card border-nexus-border">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-nexus-card border-nexus-border">
            <h3 className="text-lg font-semibold mb-6">Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Notifications</p>
                  <p className="text-sm text-nexus-muted">Play sounds for new messages and alerts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Desktop Notifications</p>
                  <p className="text-sm text-nexus-muted">Show browser notifications</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-nexus-muted">Receive email for important updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Proxy Modal */}
      <Dialog open={proxyModalOpen} onOpenChange={setProxyModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border">
          <DialogHeader>
            <DialogTitle>Add Proxy</DialogTitle>
            <DialogDescription>Configure a new proxy for your accounts</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>IP Address</Label>
                <Input
                  value={proxyForm.ip}
                  onChange={(e) => setProxyForm(prev => ({ ...prev, ip: e.target.value }))}
                  className="bg-nexus-black border-nexus-border"
                  placeholder="192.168.1.1"
                />
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <Input
                  value={proxyForm.port}
                  onChange={(e) => setProxyForm(prev => ({ ...prev, port: e.target.value }))}
                  className="bg-nexus-black border-nexus-border"
                  placeholder="8080"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Username (optional)</Label>
              <Input
                value={proxyForm.username}
                onChange={(e) => setProxyForm(prev => ({ ...prev, username: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
                placeholder="proxy_user"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={proxyForm.location}
                onChange={(e) => setProxyForm(prev => ({ ...prev, location: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
                placeholder="United States"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setProxyModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddProxy} className="gradient-primary text-white border-0">Add Proxy</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Token Modal */}
      <Dialog open={tokenModalOpen} onOpenChange={setTokenModalOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border">
          <DialogHeader>
            <DialogTitle>Add API Token</DialogTitle>
            <DialogDescription>Add a new AI provider API token</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Token Name</Label>
              <Input
                value={tokenForm.name}
                onChange={(e) => setTokenForm(prev => ({ ...prev, name: e.target.value }))}
                className="bg-nexus-black border-nexus-border"
                placeholder="My Gemini Token"
              />
            </div>
            <div className="space-y-2">
              <Label>Provider</Label>
              <div className="flex gap-2">
                {(['gemini', 'openai', 'anthropic'] as const).map((provider) => (
                  <button
                    key={provider}
                    onClick={() => setTokenForm(prev => ({ ...prev, provider }))}
                    className={`px-4 py-2 rounded-lg border transition-all capitalize ${tokenForm.provider === provider
                        ? 'border-nexus-blue bg-nexus-blue/20'
                        : 'border-nexus-border hover:border-nexus-blue/50'
                      }`}
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setTokenModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddToken} className="gradient-primary text-white border-0">Add Token</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
