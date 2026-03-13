import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  MoreVertical,
  Paperclip,
  Send,
  Sparkles,
  Bot,
  MessageSquare,
  Mail,
  Globe,
  Star,
  Archive,
  Trash2,
  Tag,
  Clock,
  CheckCheck,
  Check,
  RefreshCw,
  ChevronRight,
  User,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  ExternalLink,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from 'lucide-react';

// Platform icons - unified color scheme
const platformIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  upwork: { icon: <Globe className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  fiverr: { icon: <Globe className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  email: { icon: <Mail className="w-4 h-4" />, color: 'text-primary', bg: 'bg-primary/10' },
  whatsapp: { icon: <MessageSquare className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

// Mock conversations
const mockConversations = [
  {
    id: '1',
    platform: 'upwork',
    client: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      company: 'TechStartup Inc',
    },
    project: 'React Dashboard Development',
    lastMessage: 'Thanks for the update! The progress looks great.',
    lastMessageTime: '2 mins ago',
    unread: 2,
    starred: true,
    budget: '$5,000',
    status: 'active',
  },
  {
    id: '2',
    platform: 'fiverr',
    client: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      company: 'Design Agency',
    },
    project: 'Logo Design Package',
    lastMessage: 'Can you make the colors more vibrant?',
    lastMessageTime: '15 mins ago',
    unread: 1,
    starred: false,
    budget: '$500',
    status: 'active',
  },
  {
    id: '3',
    platform: 'email',
    client: {
      name: 'Mike Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      company: 'Enterprise Corp',
    },
    project: 'API Integration',
    lastMessage: 'Please find the API documentation attached.',
    lastMessageTime: '1 hour ago',
    unread: 0,
    starred: true,
    budget: '$3,500',
    status: 'pending',
  },
  {
    id: '4',
    platform: 'whatsapp',
    client: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      company: 'Freelance',
    },
    project: 'Mobile App UI',
    lastMessage: 'The mockups are approved! 🎉',
    lastMessageTime: '3 hours ago',
    unread: 0,
    starred: false,
    budget: '$2,000',
    status: 'completed',
  },
];

// Mock messages
const mockMessages = [
  {
    id: '1',
    senderId: 'client',
    content: 'Hi! I saw your profile and I\'m impressed with your work.',
    timestamp: '10:00 AM',
    status: 'read',
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Thank you! I\'d love to hear more about your project.',
    timestamp: '10:05 AM',
    status: 'read',
  },
  {
    id: '3',
    senderId: 'client',
    content: 'We need a React dashboard for our analytics platform. It should have real-time data visualization, user management, and reporting features.',
    timestamp: '10:10 AM',
    status: 'read',
  },
  {
    id: '4',
    senderId: 'me',
    content: 'That sounds like an exciting project! I have extensive experience building similar dashboards. Could you share more details about the data sources and any specific design requirements?',
    timestamp: '10:15 AM',
    status: 'read',
  },
  {
    id: '5',
    senderId: 'client',
    content: 'Sure! We\'ll be pulling data from our REST API. For design, we want something modern and clean, similar to Linear or Vercel\'s dashboard.',
    timestamp: '10:20 AM',
    status: 'read',
  },
  {
    id: '6',
    senderId: 'me',
    content: 'Perfect! I can definitely create something in that style. Based on the scope, I estimate this would take about 4-6 weeks. Would you like me to prepare a detailed proposal?',
    timestamp: '10:25 AM',
    status: 'read',
  },
  {
    id: '7',
    senderId: 'client',
    content: 'Thanks for the update! The progress looks great.',
    timestamp: '2:30 PM',
    status: 'delivered',
  },
];

// AI response suggestions
const aiSuggestions = [
  {
    id: '1',
    content: "Thank you for the feedback! I'll incorporate those changes in the next revision. Should have it ready by tomorrow.",
    tone: 'professional',
  },
  {
    id: '2',
    content: "Great to hear you're happy with the progress! Let me know if you'd like to schedule a call to discuss the next phase.",
    tone: 'friendly',
  },
  {
    id: '3',
    content: "I appreciate the update. I'll review the requirements and get back to you with a timeline shortly.",
    tone: 'formal',
  },
];

export default function UnifiedChat() {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      status: 'sent',
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setSelectedSuggestion(null);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
    setSelectedSuggestion(suggestion);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || conv.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row">
      {/* Conversations Sidebar - Hidden on mobile when conversation selected */}
      <div className={cn(
        "w-full lg:w-96 border-r border-border flex flex-col bg-card",
        selectedConversation && "hidden lg:flex"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-xl font-bold">Unified Inbox</h2>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          {/* Platform Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={platformFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPlatformFilter('all')}
              className={platformFilter === 'all' ? 'bg-primary text-primary-foreground' : 'border-border'}
            >
              All
            </Button>
            {Object.entries(platformIcons).map(([platform, { icon, color }]) => (
              <Button
                key={platform}
                variant={platformFilter === platform ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPlatformFilter(platform)}
                className={platformFilter === platform ? 'bg-primary text-primary-foreground' : `border-border ${color}`}
              >
                {icon}
                <span className="ml-1.5 capitalize">{platform}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={cn(
                "p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors",
                selectedConversation?.id === conv.id && "bg-muted/50 border-l-2 border-l-primary"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src={conv.client.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {conv.client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn("absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-card", platformIcons[conv.platform].bg)}>
                    <span className={platformIcons[conv.platform].color}>{platformIcons[conv.platform].icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{conv.client.name}</span>
                      {conv.starred && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-primary truncate">{conv.project}</p>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs flex-shrink-0">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-background",
        !selectedConversation && "hidden lg:flex"
      )}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                {/* Back button for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.client.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedConversation.client.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm lg:text-base">{selectedConversation.client.name}</h3>
                    <span className="hidden sm:inline">{getStatusBadge(selectedConversation.status)}</span>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate max-w-[150px] lg:max-w-none">{selectedConversation.project}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 lg:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAiPanel(!showAiPanel)}
                  className={cn(
                    "border-border hidden sm:flex",
                    showAiPanel ? 'bg-primary/10 text-primary border-primary/30' : ''
                  )}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAiPanel(!showAiPanel)}
                  className={cn(
                    "sm:hidden",
                    showAiPanel ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                  <Star className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                  <Archive className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] lg:max-w-[70%] rounded-2xl p-4",
                          message.senderId === 'me'
                            ? 'bg-primary/10 border border-primary/20'
                            : 'bg-card border border-border'
                        )}
                      >
                        <p>{message.content}</p>
                        <div className={`flex items-center gap-1 mt-2 ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          {message.senderId === 'me' && (
                            message.status === 'read' ? (
                              <CheckCheck className="w-3 h-3 text-primary" />
                            ) : (
                              <Check className="w-3 h-3 text-muted-foreground" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* AI Assistant Panel */}
              {showAiPanel && (
                <div className="w-80 border-l border-border bg-card p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AI Assistant</h4>
                      <p className="text-xs text-muted-foreground">Contextual suggestions</p>
                    </div>
                  </div>

                  {/* Client Context */}
                  <Card className="bg-background border-border p-3 mb-4">
                    <h5 className="text-sm font-medium mb-2">Client Context</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedConversation.client.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedConversation.project}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-emerald-500">{selectedConversation.budget}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Suggested Responses */}
                  <h5 className="text-sm font-medium mb-3">Suggested Responses</h5>
                  <div className="space-y-3 flex-1 overflow-auto">
                    {aiSuggestions.map((suggestion) => (
                      <Card
                        key={suggestion.id}
                        className={cn(
                          "bg-background border-border p-3 cursor-pointer hover:border-primary/50 transition-colors",
                          selectedSuggestion === suggestion.content && 'border-primary'
                        )}
                        onClick={() => handleUseSuggestion(suggestion.content)}
                      >
                        <p className="text-sm mb-2">{suggestion.content}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                            {suggestion.tone}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-emerald-500">
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-500">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-4 border-border">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Generate More
                  </Button>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-background border-border"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary text-primary-foreground"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unified Inbox</h3>
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
