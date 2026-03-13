import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/contexts/ToastContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, FileText, Search, Bot, RefreshCw, Menu, X, ChevronLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation, MessagePlatform, aiReplyTemplates } from '@/api/mocks/_messages';
import { cn } from '@/lib/utils';

type FilterPlatform = MessagePlatform | 'all';

export default function UnifiedCrm() {
  const { conversations, selectedConversationId, selectConversation, addMessage, markConversationRead } = useAppStore();
  const { showToast } = useToast();

  const [messageText, setMessageText] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<FilterPlatform>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const filteredConversations = conversations.filter(conv => {
    const matchesPlatform = filterPlatform === 'all' || conv.platform === filterPlatform;
    const matchesSearch = !searchQuery ||
      conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch && conv.status === 'active';
  });

  const handleSelectConversation = (conv: Conversation) => {
    selectConversation(conv.id);
    setShowSidebar(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return;
    addMessage(selectedConversationId, messageText, 'user');
    setMessageText('');
    showToast('Message sent!', 'success');
  };

  const generateAiReply = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomTemplate = aiReplyTemplates[Math.floor(Math.random() * aiReplyTemplates.length)];
      setAiDraft(randomTemplate);
      setIsGenerating(false);
    }, 1500);
  };

  const acceptAiDraft = () => {
    setMessageText(aiDraft);
    setAiDraft('');
    showToast('Draft inserted', 'success');
  };

  const platforms: { value: FilterPlatform; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'upwork', label: 'Upwork' },
    { value: 'fiverr', label: 'Fiverr' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-background relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSidebar(true)}
          className="gap-2"
        >
          <Menu className="w-4 h-4" />
          <span className="font-semibold truncate">
            {selectedConversation?.clientName || 'Messages'}
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAiPanel(!showAiPanel)}
        >
          <Bot className="w-4 h-4" />
        </Button>
      </div>

      {/* Conversation List - Responsive */}
      <div className={cn(
        "w-full md:w-80 border-r border-border bg-card flex flex-col transition-all duration-300",
        "md:relative absolute inset-0 z-50 md:z-0",
        showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(false)}
              className="md:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>

          {/* Platform Filters */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.value}
                onClick={() => setFilterPlatform(platform.value)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  filterPlatform === platform.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={cn(
                  "w-full p-3 rounded-lg mb-2 text-left transition-all hover:bg-muted/50",
                  selectedConversationId === conv.id && "bg-muted border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conv.clientAvatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">{conv.clientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">{conv.clientName}</p>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground h-5 px-2 text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs capitalize border-border text-muted-foreground">
                        {conv.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conv.lastMessageTime), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-background min-w-0">
        {selectedConversation ? (
          <>
            {/* Chat Header - Desktop */}
            <div className="hidden md:flex h-16 border-b border-border px-6 items-center justify-between bg-card">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={selectedConversation.clientAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{selectedConversation.clientName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate">{selectedConversation.clientName}</p>
                  {selectedConversation.projectTitle && (
                    <p className="text-xs text-muted-foreground truncate">{selectedConversation.projectTitle}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="capitalize border-border flex-shrink-0">
                {selectedConversation.platform}
              </Badge>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 md:p-6 bg-background">
              <div className="space-y-4 max-w-3xl mx-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2 md:gap-3",
                      message.sender === 'user' && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0">
                      {message.sender === 'client' ? (
                        <>
                          <AvatarImage src={selectedConversation.clientAvatar} />
                          <AvatarFallback className="bg-muted text-xs">{selectedConversation.clientName[0]}</AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">You</AvatarFallback>
                      )}
                    </Avatar>
                    <div className={cn("max-w-[80%] md:max-w-[70%] space-y-1", message.sender === 'user' && "items-end")}>
                      <div className={cn(
                        "p-2.5 md:p-3 rounded-lg",
                        message.sender === 'client'
                          ? "bg-card border border-border"
                          : "bg-primary/10 border border-primary/20"
                      )}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground px-1">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-border p-3 md:p-4 bg-card">
              <div className="max-w-3xl mx-auto space-y-3">
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-background border-border min-h-[60px] md:min-h-[80px] resize-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex justify-between items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAiReply}
                    disabled={isGenerating}
                    className="gap-2 border-border"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'AI Assist'}</span>
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-primary text-primary-foreground gap-2"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-background p-4">
            <p className="text-center">Select a conversation to start messaging</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:hidden"
              onClick={() => setShowSidebar(true)}
            >
              View Conversations
            </Button>
          </div>
        )}
      </div>

      {/* AI Assistant Sidebar - Responsive */}
      <div className={cn(
        "w-full md:w-80 border-l border-border bg-card p-4 space-y-4 transition-all duration-300",
        "md:relative absolute inset-0 z-50 md:z-0",
        showAiPanel ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAiPanel(false)}
            className="md:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {aiDraft && (
          <Card className="p-4 bg-background border-primary/30 space-y-3">
            <p className="text-sm font-medium text-primary">Generated Reply</p>
            <p className="text-sm">{aiDraft}</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={acceptAiDraft} className="flex-1 bg-primary text-primary-foreground">
                Use This
              </Button>
              <Button size="sm" variant="outline" onClick={generateAiReply} className="border-border">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Quick Actions</p>
          <Button variant="outline" className="w-full justify-start gap-2 border-border" size="sm">
            <FileText className="w-4 h-4" />
            Generate Dev Doc
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-border" size="sm">
            <FileText className="w-4 h-4" />
            Create Proposal
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-border" size="sm">
            <Search className="w-4 h-4" />
            Analyze Scope
          </Button>
        </div>

        {selectedConversation && (
          <Card className="p-4 bg-background border-border space-y-2">
            <p className="text-sm font-medium">Conversation Info</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform:</span>
                <span className="capitalize">{selectedConversation.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Messages:</span>
                <span>{selectedConversation.messages.length}</span>
              </div>
              {selectedConversation.clientEmail && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="truncate ml-2">{selectedConversation.clientEmail}</span>
                </div>
              )}
              {selectedConversation.projectTitle && (
                <div className="pt-2 border-t border-border">
                  <span className="text-muted-foreground">Project:</span>
                  <p className="mt-1">{selectedConversation.projectTitle}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Overlay for AI panel on mobile */}
      {showAiPanel && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowAiPanel(false)}
        />
      )}
    </div>
  );
}
