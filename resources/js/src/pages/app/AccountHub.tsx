import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Globe, Zap, TrendingUp, MoreHorizontal, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const platformLogos: Record<string, string> = {
  upwork: '🟢',
  fiverr: '🟡',
  freelancer: '🔵',
  toptal: '🟣',
};

export default function AccountHub() {
  const { freelanceAccounts, updateFreelanceAccount, toggleAutoBid } = useAppStore();
  const { showToast } = useToast();

  const handleToggleActive = (accountId: string, currentValue: boolean) => {
    updateFreelanceAccount(accountId, { isActive: !currentValue });
    showToast(!currentValue ? 'Account activated' : 'Account deactivated', 'success');
  };

  const totalBids = freelanceAccounts.reduce((sum, acc) => sum + acc.bidCount, 0);
  const avgSuccessRate = freelanceAccounts.length > 0
    ? Math.round(freelanceAccounts.reduce((sum, acc) => sum + acc.successRate, 0) / freelanceAccounts.length)
    : 0;
  const activeAccounts = freelanceAccounts.filter(acc => acc.isActive).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Account Hub</h1>
          <p className="text-nexus-muted text-sm">
            Manage all your freelance platform accounts
          </p>
        </div>
        <Button className="gradient-primary text-white border-0 gap-2">
          <Plus className="w-4 h-4" />
          Connect Account
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{freelanceAccounts.length}</p>
              <p className="text-xs text-nexus-muted">Total Accounts</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Zap className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeAccounts}</p>
              <p className="text-xs text-nexus-muted">Active Accounts</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalBids}</p>
              <p className="text-xs text-nexus-muted">Total Bids</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-nexus-card border-nexus-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgSuccessRate}%</p>
              <p className="text-xs text-nexus-muted">Avg Success Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelanceAccounts.map((account) => (
          <Card
            key={account.id}
            className="p-6 bg-nexus-card border-nexus-border hover:border-nexus-blue/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{platformLogos[account.platform]}</div>
                <div>
                  <h3 className="font-semibold">{account.accountName}</h3>
                  <p className="text-xs text-nexus-muted font-mono">@{account.username}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-nexus-card border-nexus-border">
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Platform
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Account</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexus-muted">Status</span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={account.isActive}
                    onCheckedChange={() => handleToggleActive(account.id, account.isActive)}
                  />
                  <Badge
                    className={account.isActive
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-nexus-border text-nexus-muted'
                    }
                  >
                    {account.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-nexus-muted">Auto-Bid</span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={account.autoBidEnabled}
                    onCheckedChange={() => {
                      toggleAutoBid(account.id);
                      showToast(
                        account.autoBidEnabled ? 'Auto-bid disabled' : 'Auto-bid enabled',
                        'success'
                      );
                    }}
                    disabled={!account.isActive}
                  />
                  {account.autoBidEnabled && <Zap className="w-4 h-4 text-nexus-blue" />}
                </div>
              </div>

              <div className="pt-4 border-t border-nexus-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-nexus-muted">Daily Budget</span>
                  <span className="font-mono font-medium">${account.dailyBudget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-nexus-muted">Total Bids</span>
                  <span className="font-medium">{account.bidCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-nexus-muted">Success Rate</span>
                  <span className="text-green-500 font-medium">{account.successRate}%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-nexus-border">
                <p className="text-xs text-nexus-muted">
                  Last activity: {formatDistanceToNow(new Date(account.lastActivity), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Account Card */}
        <Card className="p-6 bg-nexus-card/50 border-nexus-border border-dashed flex items-center justify-center min-h-[300px] cursor-pointer hover:border-nexus-blue/50 transition-all">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-nexus-border flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-nexus-muted" />
            </div>
            <p className="font-medium mb-1">Connect New Account</p>
            <p className="text-xs text-nexus-muted">Add Upwork, Fiverr, or other platforms</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
