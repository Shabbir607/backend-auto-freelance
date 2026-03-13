import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Mic,
  Image,
  File,
  CheckCheck,
  Check,
  Clock,
  MessageSquare,
  Users,
  Settings,
  QrCode,
  Smartphone,
  Wifi,
  WifiOff,
  Sparkles,
  Bot,
  RefreshCw,
  Plus,
  ArrowRight,
  ArrowLeft,
  Activity,
  Zap,
  Link2,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Mock Developer Groups for WhatsApp Bridge
const mockDevGroups = [
  {
    id: '1',
    name: 'E-Commerce Platform Dev',
    clientName: 'John Smith',
    clientProject: 'E-Commerce Dashboard',
    whatsappGroupId: 'WAG-001-ECOM',
    whatsappGroupName: 'E-Commerce Dev Team',
    developers: [
      { id: 'd1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', status: 'online', role: 'Lead Developer' },
      { id: 'd2', name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', status: 'online', role: 'Frontend Dev' },
      { id: 'd3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', status: 'away', role: 'Backend Dev' },
    ],
    messageCount: 156,
    lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    syncStatus: 'synced',
    isActive: true,
  },
  {
    id: '2',
    name: 'Mobile App Team',
    clientName: 'Sarah Johnson',
    clientProject: 'iOS/Android App',
    whatsappGroupId: 'WAG-002-MOBILE',
    whatsappGroupName: 'Mobile App Developers',
    developers: [
      { id: 'd4', name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', status: 'online', role: 'iOS Developer' },
      { id: 'd5', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', status: 'offline', role: 'Android Developer' },
    ],
    messageCount: 89,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    syncStatus: 'synced',
    isActive: true,
  },
  {
    id: '3',
    name: 'API Integration Squad',
    clientName: 'Mike Wilson',
    clientProject: 'Backend API',
    whatsappGroupId: 'WAG-003-API',
    whatsappGroupName: 'API Team Chat',
    developers: [
      { id: 'd6', name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80', status: 'online', role: 'API Lead' },
      { id: 'd7', name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80', status: 'online', role: 'Backend Dev' },
      { id: 'd8', name: 'Tom Davis', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80', status: 'away', role: 'DevOps' },
      { id: 'd9', name: 'Anna Martinez', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', status: 'online', role: 'QA Engineer' },
    ],
    messageCount: 234,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    syncStatus: 'pending',
    isActive: true,
  },
];

// Mock synced messages
const mockSyncedMessages = [
  {
    id: 'm1',
    from: 'Alex Chen',
    content: 'Just pushed the latest changes to the staging branch',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    direction: 'dev_to_client',
    synced: true,
  },
  {
    id: 'm2',
    from: 'Client (John Smith)',
    content: 'Great work! Can you also add the export feature?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    direction: 'client_to_dev',
    synced: true,
  },
  {
    id: 'm3',
    from: 'Sarah Kim',
    content: 'On it! Should be ready by EOD',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    direction: 'dev_to_client',
    synced: true,
  },
  {
    id: 'm4',
    from: 'Mike Johnson',
    content: 'I can help with the backend part',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    direction: 'dev_to_client',
    synced: true,
  },
];

// Mock WhatsApp contacts (legacy - keeping for compatibility)
const mockContacts = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 234 567 8901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    lastMessage: 'Thanks for the update on the project!',
    lastMessageTime: '2:30 PM',
    unread: 2,
    online: true,
    typing: false,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 234 567 8902',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    lastMessage: 'Can we schedule a call tomorrow?',
    lastMessageTime: '1:45 PM',
    unread: 0,
    online: true,
    typing: true,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    phone: '+1 234 567 8903',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    lastMessage: 'The designs look great!',
    lastMessageTime: '12:20 PM',
    unread: 0,
    online: false,
    typing: false,
  },
  {
    id: '4',
    name: 'Emily Davis',
    phone: '+1 234 567 8904',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    lastMessage: 'Invoice sent ✓',
    lastMessageTime: '11:00 AM',
    unread: 1,
    online: false,
    typing: false,
  },
  {
    id: '5',
    name: 'Tech Startup Group',
    phone: 'Group · 5 participants',
    avatar: null,
    lastMessage: 'Alex: Meeting at 3pm',
    lastMessageTime: '10:30 AM',
    unread: 5,
    online: false,
    typing: false,
    isGroup: true,
  },
];

// Mock messages
const mockMessages = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How\'s the project going?',
    timestamp: '2:15 PM',
    status: 'read',
    isMe: false,
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Going great! Just finished the dashboard component.',
    timestamp: '2:18 PM',
    status: 'read',
    isMe: true,
  },
  {
    id: '3',
    senderId: '1',
    content: 'That\'s awesome! Can you share a preview?',
    timestamp: '2:20 PM',
    status: 'read',
    isMe: false,
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Sure! Here\'s a screenshot of the current progress.',
    timestamp: '2:22 PM',
    status: 'read',
    isMe: true,
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
      name: 'dashboard-preview.png',
    },
  },
  {
    id: '5',
    senderId: '1',
    content: 'Wow, this looks amazing! The client is going to love it.',
    timestamp: '2:25 PM',
    status: 'read',
    isMe: false,
  },
  {
    id: '6',
    senderId: 'me',
    content: 'Thanks! I\'ll have the full version ready by tomorrow.',
    timestamp: '2:28 PM',
    status: 'delivered',
    isMe: true,
  },
  {
    id: '7',
    senderId: '1',
    content: 'Thanks for the update on the project!',
    timestamp: '2:30 PM',
    status: 'delivered',
    isMe: false,
  },
];

export default function WhatsAppChat() {
  const { t } = useTranslation();
  const [devGroups, setDevGroups] = useState(mockDevGroups);
  const [selectedGroup, setSelectedGroup] = useState<typeof mockDevGroups[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [syncedMessages, setSyncedMessages] = useState(mockSyncedMessages);
  const [showMobileList, setShowMobileList] = useState(true);

  // Metrics
  const activeDevGroups = devGroups.filter(g => g.isActive).length;
  const totalMessagesSynced = devGroups.reduce((sum, g) => sum + g.messageCount, 0);
  const syncSuccessRate = 98.5;
  const avgResponseTime = '2.3 min';

  // Simulate real-time message sync
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && selectedGroup) {
        const newMessage = {
          id: `m-${Date.now()}`,
          from: ['Alex Chen', 'Sarah Kim', 'Client (John Smith)'][Math.floor(Math.random() * 3)],
          content: [
            'Working on the feature now',
            'Just deployed to staging',
            'Can you review the PR?',
            'Looks good, approved!',
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          direction: Math.random() > 0.5 ? 'dev_to_client' : 'client_to_dev',
          synced: true,
        };
        setSyncedMessages(prev => [newMessage, ...prev.slice(0, 19)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [selectedGroup]);

  const filteredGroups = devGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectGroup = (group: typeof mockDevGroups[0]) => {
    setSelectedGroup(group);
    setShowMobileList(false);
  };

  const handleBackToList = () => {
    setShowMobileList(true);
    setSelectedGroup(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">WhatsApp Developer Bridge</h1>
          <p className="text-nexus-muted text-sm">Sync client communications with developer groups</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "border",
              isConnected
                ? "border-green-500/30 text-green-400 bg-green-500/10"
                : "border-red-500/30 text-red-400 bg-red-500/10"
            )}
          >
            <div className={cn(
              "w-2 h-2 rounded-full mr-2",
              isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
            )} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button className="gradient-primary text-white border-0 gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Group</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 md:p-5 bg-nexus-card border-nexus-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-nexus-muted">Active Dev Groups</p>
              <p className="text-xl md:text-2xl font-bold mt-1">{activeDevGroups}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 bg-nexus-card border-nexus-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-nexus-muted">Messages Synced</p>
              <p className="text-xl md:text-2xl font-bold mt-1">{totalMessagesSynced}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 bg-nexus-card border-nexus-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-nexus-muted">Sync Success Rate</p>
              <p className="text-xl md:text-2xl font-bold mt-1 text-[#39FF14]">{syncSuccessRate}%</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 md:p-5 bg-nexus-card border-nexus-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-nexus-muted">Avg Response Time</p>
              <p className="text-xl md:text-2xl font-bold mt-1">{avgResponseTime}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <Card className={cn(
          "lg:col-span-1 bg-nexus-card border-nexus-border overflow-hidden",
          !showMobileList && "hidden lg:block"
        )}>
          <div className="p-4 border-b border-nexus-border">
            <h2 className="font-semibold mb-3">Developer Groups</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-nexus-black border-nexus-border"
              />
            </div>
          </div>
          <ScrollArea className="h-[400px] md:h-[500px]">
            <div className="p-2">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => handleSelectGroup(group)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all mb-2",
                    selectedGroup?.id === group.id
                      ? "bg-nexus-blue/10 border border-nexus-blue/30"
                      : "hover:bg-nexus-border/50"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{group.name}</h3>
                      <p className="text-xs text-nexus-muted truncate">Client: {group.clientName}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs ml-2 flex-shrink-0",
                        group.syncStatus === 'synced'
                          ? "border-green-500/30 text-green-400"
                          : "border-yellow-500/30 text-yellow-400"
                      )}
                    >
                      {group.syncStatus === 'synced' ? 'Synced' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-nexus-muted">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.developers.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {group.messageCount}
                      </span>
                    </div>
                    <span>{formatDistanceToNow(new Date(group.lastActivity), { addSuffix: true })}</span>
                  </div>
                  {/* Developer Avatars */}
                  <div className="flex items-center mt-2 -space-x-2">
                    {group.developers.slice(0, 4).map((dev) => (
                      <Avatar key={dev.id} className="w-6 h-6 border-2 border-nexus-card">
                        <AvatarImage src={dev.avatar} />
                        <AvatarFallback className="text-xs bg-nexus-border">
                          {dev.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {group.developers.length > 4 && (
                      <div className="w-6 h-6 rounded-full bg-nexus-border flex items-center justify-center text-xs border-2 border-nexus-card">
                        +{group.developers.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Group Detail View */}
        <Card className={cn(
          "lg:col-span-2 bg-nexus-card border-nexus-border overflow-hidden",
          showMobileList && !selectedGroup && "hidden lg:block"
        )}>
          {selectedGroup ? (
            <>
              {/* Detail Header */}
              <div className="p-4 border-b border-nexus-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={handleBackToList}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex-1">
                    <h2 className="font-semibold text-white">{selectedGroup.name}</h2>
                    <p className="text-sm text-nexus-muted">Project: {selectedGroup.clientProject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-nexus-border gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Open WhatsApp</span>
                    </Button>
                    <Button variant="outline" size="sm" className="border-nexus-border gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">View in Chat</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <div className="px-4 border-b border-nexus-border">
                  <TabsList className="bg-transparent h-12 p-0 gap-4">
                    <TabsTrigger
                      value="overview"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-0"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="messages"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-0"
                    >
                      Synced Messages
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 rounded-none px-0"
                    >
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[400px] md:h-[450px]">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-4 m-0 space-y-6">
                    {/* Group Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-nexus-muted">WhatsApp Group Name</Label>
                          <p className="font-medium text-white">{selectedGroup.whatsappGroupName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-nexus-muted">Group ID</Label>
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono text-cyan-400 bg-nexus-black px-2 py-1 rounded">
                              {selectedGroup.whatsappGroupId}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-nexus-muted">Client</Label>
                          <p className="font-medium text-white">{selectedGroup.clientName}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-nexus-muted">Project</Label>
                          <p className="font-medium text-white">{selectedGroup.clientProject}</p>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Developers */}
                    <div>
                      <Label className="text-xs text-nexus-muted mb-3 block">Assigned Developers</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedGroup.developers.map((dev) => (
                          <div
                            key={dev.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-nexus-black border border-nexus-border"
                          >
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={dev.avatar} />
                                <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className={cn(
                                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-nexus-black",
                                dev.status === 'online' ? "bg-green-500" :
                                  dev.status === 'away' ? "bg-yellow-500" : "bg-gray-500"
                              )} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white text-sm truncate">{dev.name}</p>
                              <p className="text-xs text-nexus-muted truncate">{dev.role}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs capitalize",
                                dev.status === 'online' ? "border-green-500/30 text-green-400" :
                                  dev.status === 'away' ? "border-yellow-500/30 text-yellow-400" :
                                    "border-gray-500/30 text-gray-400"
                              )}
                            >
                              {dev.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message Flow Configuration */}
                    <div>
                      <Label className="text-xs text-nexus-muted mb-3 block">Message Flow</Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-nexus-black border border-nexus-border">
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <ArrowDownRight className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">Client → Developers</p>
                            <p className="text-xs text-nexus-muted">Messages from the client are sent to the WhatsApp group</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-nexus-black border border-nexus-border">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white text-sm">Developers → Client</p>
                            <p className="text-xs text-nexus-muted">WhatsApp messages are synced to the client's Unified Chat</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Synced Messages Tab */}
                  <TabsContent value="messages" className="p-4 m-0">
                    <div className="space-y-3">
                      {syncedMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "p-3 rounded-lg border",
                            msg.direction === 'client_to_dev'
                              ? "bg-cyan-500/5 border-cyan-500/20"
                              : "bg-purple-500/5 border-purple-500/20"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  msg.direction === 'client_to_dev'
                                    ? "border-cyan-500/30 text-cyan-400"
                                    : "border-purple-500/30 text-purple-400"
                                )}
                              >
                                {msg.direction === 'client_to_dev' ? 'Client → Dev' : 'Dev → Client'}
                              </Badge>
                              <span className="text-sm font-medium text-white">{msg.from}</span>
                            </div>
                            <span className="text-xs text-nexus-muted">
                              {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{msg.content}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <CheckCheck className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">Synced</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="p-4 m-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-nexus-black border border-nexus-border">
                        <div>
                          <p className="font-medium text-white">Auto-sync Messages</p>
                          <p className="text-xs text-nexus-muted">Automatically sync new messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-nexus-black border border-nexus-border">
                        <div>
                          <p className="font-medium text-white">Notification Alerts</p>
                          <p className="text-xs text-nexus-muted">Get notified for new messages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-nexus-black border border-nexus-border">
                        <div>
                          <p className="font-medium text-white">AI Response Suggestions</p>
                          <p className="text-xs text-nexus-muted">Get AI-powered reply suggestions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-nexus-black border border-nexus-border">
                        <div>
                          <p className="font-medium text-white">Message Filtering</p>
                          <p className="text-xs text-nexus-muted">Filter out non-essential messages</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-nexus-border">
                      <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Group
                      </Button>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </>
          ) : (
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp Developer Bridge</h3>
                <p className="text-nexus-muted mb-4">Select a group to view details and manage sync settings</p>
                <Button className="gradient-primary text-white border-0 gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Group
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
