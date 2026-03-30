"use client";

import { mockNotifications, Notification } from '@/api/mocks/_notifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';
import { formatDistanceToNow } from 'date-fns';
import { AlertCircle, Bell, Bot, Calendar, FolderKanban, HelpCircle, MessageSquare, Moon, Plus, Search, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const notificationIcons: Record<string, React.ElementType> = {
  message: MessageSquare,
  mention: MessageSquare,
  project: FolderKanban,
  meeting: Calendar,
  system: AlertCircle,
};

const notificationColors: Record<string, string> = {
  message: 'bg-blue-500',
  mention: 'bg-purple-500',
  project: 'bg-green-500',
  meeting: 'bg-orange-500',
  system: 'bg-gray-500',
};

function NotificationItem({ notification, onClose }: { notification: Notification; onClose: () => void }) {
  const Icon = notificationIcons[notification.type] || AlertCircle;
  const colorClass = notificationColors[notification.type] || 'bg-gray-500';

  return (
    <Link
      to={notification.link || '#'}
      onClick={onClose}
      className={cn(
        "flex items-start gap-3 p-3 hover:bg-nexus-border/50 transition-colors rounded-lg",
        !notification.read && "bg-nexus-blue/5"
      )}
    >
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", colorClass)}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm", !notification.read ? "font-medium text-white" : "text-nexus-muted")}>
          {notification.title}
        </p>
        <p className="text-xs text-nexus-muted line-clamp-2 mt-0.5">
          {notification.description}
        </p>
        <p className="text-xs text-nexus-muted/60 mt-1">
          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
        </p>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-nexus-blue flex-shrink-0 mt-2" />
      )}
    </Link>
  );
}

export function Header() {
  const { t } = useTranslation();
  const { team } = useAuth();
  const { getUnreadMessageCount } = useAppStore();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchFocused, setSearchFocused] = useState(false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const messageCount = getUnreadMessageCount();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.7;
      if (shouldAddNotification && notifications.length < 20) {
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          type: ['message', 'mention', 'project', 'meeting', 'system'][Math.floor(Math.random() * 5)] as Notification['type'],
          title: ['New client message', '@Team mentioned you', 'Task completed', 'Meeting starting soon', 'Auto-bid successful'][Math.floor(Math.random() * 5)],
          description: 'This is a simulated real-time notification for demo purposes.',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
        // Lazy load sound player only when needed
        import('@/lib/sounds').then(({ playNotificationSound }) => {
          playNotificationSound('newMessage');
        });
      }
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [notifications.length]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="h-16 border-b border-nexus-border glass-header flex items-center justify-between px-4 md:px-6 fixed lg:relative top-0 left-0 right-0 z-40 bg-nexus-card/95 backdrop-blur-xl">
      {/* Search - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
        <div className={cn(
          "relative flex-1 transition-all duration-200",
          searchFocused && "scale-105"
        )}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-nexus-black border-nexus-border focus:border-nexus-blue transition-colors"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Mobile spacer for hamburger menu */}
      <div className="w-12 lg:hidden" />

      {/* Team Name */}
      {team && (
        <div className="hidden lg:flex items-center gap-2 px-4">
          <span className="text-sm text-nexus-muted">Team:</span>
          <span className="text-sm font-medium">{team.name}</span>
          <Badge variant="outline" className="capitalize text-xs">
            {team.plan}
          </Badge>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* AI Assistant Toggle - Hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-nexus-border/50 border border-nexus-border">
          <Bot className={cn(
            "w-4 h-4 transition-colors",
            aiAssistantEnabled ? "text-cyan-400" : "text-nexus-muted"
          )} />
          <span className="text-xs font-medium text-nexus-muted hidden md:inline">AI Assistant</span>
          <Switch
            checked={aiAssistantEnabled}
            onCheckedChange={setAiAssistantEnabled}
            className="data-[state=checked]:bg-cyan-500"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-nexus-border rounded-lg transition-colors"
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-nexus-muted hover:text-yellow-400 transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-nexus-muted hover:text-blue-400 transition-colors" />
          )}
        </button>

        {/* Help Button */}
        <button className="p-2 hover:bg-nexus-border rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5 text-nexus-muted" />
        </button>

        {/* New Project Button */}
        <Link to="/app/projects">
          <Button size="sm" className="gradient-primary text-white border-0 gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </Link>

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "p-2 hover:bg-nexus-border rounded-lg transition-colors relative",
              showNotifications && "bg-nexus-border"
            )}
          >
            <Bell className={cn(
              "w-5 h-5 transition-colors",
              showNotifications ? "text-nexus-blue" : "text-nexus-muted"
            )} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 gradient-primary rounded-full text-xs flex items-center justify-center text-white font-medium animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-nexus-card border border-nexus-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-nexus-border">
                <h3 className="font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-nexus-blue hover:text-nexus-blue/80 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                  <Link
                    to="/app/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-nexus-muted hover:text-white transition-colors"
                  >
                    View all
                  </Link>
                </div>
              </div>

              {/* Notification List */}
              <ScrollArea className="max-h-96">
                {notifications.length > 0 ? (
                  <div className="p-2 space-y-1">
                    {notifications.slice(0, 10).map(notification => (
                      <div key={notification.id} className="relative group">
                        <NotificationItem
                          notification={notification}
                          onClose={() => setShowNotifications(false)}
                        />
                        <button
                          onClick={(e) => clearNotification(notification.id, e)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-nexus-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nexus-border"
                        >
                          <X className="w-3 h-3 text-nexus-muted" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-nexus-muted/30 mx-auto mb-3" />
                    <p className="text-sm text-nexus-muted">No notifications yet</p>
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-nexus-border bg-nexus-black/50">
                  <Link
                    to="/app/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="block w-full text-center text-sm text-nexus-blue hover:text-nexus-blue/80 transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
