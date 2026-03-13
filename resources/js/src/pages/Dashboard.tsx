import { Activity, TrendingUp, Zap, MessageSquare } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const { systemStatus, accounts, activities } = useApp();

  const activeAccounts = accounts.filter(acc => acc.isActive).length;
  const autoBidAccounts = accounts.filter(acc => acc.autoBidEnabled).length;

  const stats = [
    {
      label: 'Active Bids',
      value: systemStatus.activeBids,
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Active Conversations',
      value: systemStatus.activeConversations,
      icon: MessageSquare,
      color: 'from-fuchsia-500 to-pink-500',
    },
    {
      label: 'Connected Accounts',
      value: activeAccounts,
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Auto-Bid Enabled',
      value: autoBidAccounts,
      icon: Activity,
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Command Center</h1>
        <p className="text-muted-foreground">
          System operational • Last sync {formatDistanceToNow(new Date(systemStatus.lastSync), { addSuffix: true })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 bg-[#1A1A23] border-[#2A2A33] hover:border-cyan-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
          <h2 className="text-xl font-bold mb-6">System Status</h2>
          <div className="space-y-4">
            <StatusRow
              label="API Status"
              status={systemStatus.apiStatus}
              isGood={systemStatus.apiStatus === 'operational'}
            />
            <StatusRow
              label="Upwork Connection"
              status={systemStatus.upworkConnected ? 'Connected' : 'Disconnected'}
              isGood={systemStatus.upworkConnected}
            />
            <StatusRow
              label="Fiverr Connection"
              status={systemStatus.fiverrConnected ? 'Connected' : 'Disconnected'}
              isGood={systemStatus.fiverrConnected}
            />
            <StatusRow
              label="WhatsApp Connection"
              status={systemStatus.whatsappConnected ? 'Connected' : 'Disconnected'}
              isGood={systemStatus.whatsappConnected}
            />
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="slide-in-bottom"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ActivityItem activity={activity} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Connected Accounts Overview */}
      <Card className="p-6 bg-[#1A1A23] border-[#2A2A33]">
        <h2 className="text-xl font-bold mb-6">Connected Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="p-4 rounded-lg bg-[#0D0D15] border border-[#2A2A33] hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant={account.isActive ? 'default' : 'secondary'}
                  className={account.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                >
                  {account.platform}
                </Badge>
                {account.autoBidEnabled && (
                  <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow" />
                )}
              </div>
              <p className="font-medium mb-1 truncate">{account.accountName}</p>
              <p className="text-xs text-muted-foreground font-mono">@{account.username}</p>
              <div className="mt-3 pt-3 border-t border-[#2A2A33] flex justify-between text-xs">
                <span className="text-muted-foreground">Bids: {account.bidCount}</span>
                <span className="text-green-400">{account.successRate}% win</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatusRow({ label, status, isGood }: { label: string; status: string; isGood: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isGood ? 'bg-green-400 pulse-glow' : 'bg-red-400'}`} />
        <span className={`text-sm font-medium capitalize ${isGood ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const getIcon = () => {
    switch (activity.type) {
      case 'bid_placed': return '🎯';
      case 'message_received': return '💬';
      case 'bid_won': return '🎉';
      case 'account_connected': return '🔗';
      case 'error': return '⚠️';
      default: return '📌';
    }
  };

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-[#2A2A33] transition-colors">
      <div className="text-xl">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1">{activity.title}</p>
        <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
        </p>
      </div>
      {activity.platform && (
        <Badge variant="outline" className="capitalize text-xs">
          {activity.platform}
        </Badge>
      )}
    </div>
  );
}
