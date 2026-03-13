import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  MessageSquare,
  Briefcase,
  DollarSign,
  Users,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle,
  Clock,
  Filter,
  Archive,
  Mail,
  Smartphone,
  Globe,
  Volume2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'message' | 'job' | 'payment' | 'system' | 'alert' | 'success';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    amount?: string;
    client?: string;
    platform?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah Chen',
    description: 'Hi, I wanted to follow up on our conversation about the project...',
    time: '2 minutes ago',
    read: false,
    metadata: { client: 'Sarah Chen', platform: 'Upwork' },
  },
  {
    id: '2',
    type: 'job',
    title: 'New job match found',
    description: 'A new React Developer position matches your profile with 95% compatibility',
    time: '15 minutes ago',
    read: false,
    metadata: { platform: 'Upwork' },
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment received',
    description: 'You received a payment of $2,500 from TechCorp Inc.',
    time: '1 hour ago',
    read: false,
    metadata: { amount: '$2,500', client: 'TechCorp Inc.' },
  },
  {
    id: '4',
    type: 'success',
    title: 'Proposal accepted!',
    description: 'Your proposal for "E-commerce Platform Development" has been accepted',
    time: '2 hours ago',
    read: true,
    metadata: { client: 'Global Retail Co.' },
  },
  {
    id: '5',
    type: 'alert',
    title: 'Contract ending soon',
    description: 'Your contract with DataFlow Systems ends in 3 days',
    time: '3 hours ago',
    read: true,
    metadata: { client: 'DataFlow Systems' },
  },
  {
    id: '6',
    type: 'system',
    title: 'Auto-bidding paused',
    description: 'Auto-bidding has been paused due to reaching daily budget limit',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '7',
    type: 'message',
    title: 'New message from Mike Johnson',
    description: 'Great work on the landing page! Can we schedule a call?',
    time: '1 day ago',
    read: true,
    metadata: { client: 'Mike Johnson', platform: 'Fiverr' },
  },
  {
    id: '8',
    type: 'job',
    title: 'Bid submitted successfully',
    description: 'Your bid for "Mobile App UI Design" has been submitted',
    time: '1 day ago',
    read: true,
    metadata: { platform: 'Upwork' },
  },
];

const notificationPreferences = [
  { category: 'Messages', email: true, push: true, inApp: true },
  { category: 'Job Matches', email: true, push: true, inApp: true },
  { category: 'Payments', email: true, push: true, inApp: true },
  { category: 'Proposals', email: true, push: false, inApp: true },
  { category: 'Contracts', email: true, push: true, inApp: true },
  { category: 'System Alerts', email: false, push: true, inApp: true },
  { category: 'Marketing', email: false, push: false, inApp: false },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'job':
        return Briefcase;
      case 'payment':
        return DollarSign;
      case 'success':
        return CheckCircle;
      case 'alert':
        return AlertTriangle;
      case 'system':
        return Info;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-nexus-blue bg-nexus-blue/10';
      case 'job':
        return 'text-nexus-purple bg-nexus-purple/10';
      case 'payment':
        return 'text-nexus-green bg-nexus-green/10';
      case 'success':
        return 'text-nexus-green bg-nexus-green/10';
      case 'alert':
        return 'text-nexus-yellow bg-nexus-yellow/10';
      case 'system':
        return 'text-nexus-muted bg-nexus-muted/10';
      default:
        return 'text-nexus-muted bg-nexus-muted/10';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' && n.read) return false;
    if (selectedType && n.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-nexus-red text-white">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-nexus-muted mt-1">Stay updated with all your activity</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-nexus-border" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" className="border-nexus-border text-nexus-red hover:text-nexus-red" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-nexus-card border border-nexus-border">
          <TabsTrigger value="notifications" className="data-[state=active]:bg-nexus-border">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-nexus-border">
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-nexus-card border border-nexus-border rounded-lg p-1">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'gradient-primary' : ''}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('unread')}
                className={filter === 'unread' ? 'gradient-primary' : ''}
              >
                Unread ({unreadCount})
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {['message', 'job', 'payment', 'success', 'alert', 'system'].map((type) => {
                const Icon = getTypeIcon(type);
                return (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={cn(
                      'border-nexus-border capitalize',
                      selectedType === type && 'bg-nexus-border'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {type}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Notification List */}
          <Card className="bg-nexus-card border-nexus-border">
            <ScrollArea className="h-[600px]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 rounded-full bg-nexus-border flex items-center justify-center mb-4">
                    <BellOff className="w-8 h-8 text-nexus-muted" />
                  </div>
                  <p className="text-nexus-muted">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-nexus-border">
                  {filteredNotifications.map((notification) => {
                    const Icon = getTypeIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-4 hover:bg-nexus-border/30 transition-colors cursor-pointer',
                          !notification.read && 'bg-nexus-blue/5'
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-4">
                          <div className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                            getTypeColor(notification.type)
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={cn(
                                  'font-medium',
                                  !notification.read && 'text-white'
                                )}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-nexus-muted mt-0.5 line-clamp-2">
                                  {notification.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-nexus-blue" />
                                )}
                                <span className="text-xs text-nexus-muted whitespace-nowrap">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                            {notification.metadata && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {notification.metadata.client && (
                                  <Badge variant="outline" className="text-xs border-nexus-border">
                                    <Users className="w-3 h-3 mr-1" />
                                    {notification.metadata.client}
                                  </Badge>
                                )}
                                {notification.metadata.platform && (
                                  <Badge variant="outline" className="text-xs border-nexus-border">
                                    <Globe className="w-3 h-3 mr-1" />
                                    {notification.metadata.platform}
                                  </Badge>
                                )}
                                {notification.metadata.amount && (
                                  <Badge className="text-xs bg-nexus-green/10 text-nexus-green">
                                    {notification.metadata.amount}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-nexus-red hover:text-nexus-red"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          {/* Global Settings */}
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h2 className="text-lg font-semibold mb-4">Global Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Do Not Disturb</p>
                  <p className="text-sm text-nexus-muted">Pause all notifications</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Notifications</p>
                  <p className="text-sm text-nexus-muted">Play sound for new notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Desktop Notifications</p>
                  <p className="text-sm text-nexus-muted">Show notifications in system tray</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Category Preferences */}
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Categories</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-nexus-border">
                    <th className="text-left py-3 text-nexus-muted font-medium">Category</th>
                    <th className="text-center py-3 text-nexus-muted font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </th>
                    <th className="text-center py-3 text-nexus-muted font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Push
                      </div>
                    </th>
                    <th className="text-center py-3 text-nexus-muted font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <Bell className="w-4 h-4" />
                        In-App
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notificationPreferences.map((pref) => (
                    <tr key={pref.category} className="border-b border-nexus-border last:border-0">
                      <td className="py-4">{pref.category}</td>
                      <td className="text-center py-4">
                        <Switch defaultChecked={pref.email} />
                      </td>
                      <td className="text-center py-4">
                        <Switch defaultChecked={pref.push} />
                      </td>
                      <td className="text-center py-4">
                        <Switch defaultChecked={pref.inApp} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quiet Hours */}
          <Card className="bg-nexus-card border-nexus-border p-6">
            <h2 className="text-lg font-semibold mb-4">Quiet Hours</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Quiet Hours</p>
                  <p className="text-sm text-nexus-muted">Silence notifications during specific hours</p>
                </div>
                <Switch />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-nexus-muted mb-1 block">Start Time</label>
                  <input
                    type="time"
                    defaultValue="22:00"
                    className="w-full bg-nexus-black border border-nexus-border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm text-nexus-muted mb-1 block">End Time</label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full bg-nexus-black border border-nexus-border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
