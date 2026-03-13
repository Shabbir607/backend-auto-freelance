import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, FileText, Megaphone, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation, Platform } from '@/types';
import { cn } from '@/lib/utils';

export default function CRM() {
  const { conversations, markConversationRead } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0] || null
  );
  const [messageText, setMessageText] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all');
  const [aiDraft, setAiDraft] = useState('');
  const [showAiDraft, setShowAiDraft] = useState(false);

  const filteredConversations = conversations.filter(
    conv => filterPlatform === 'all' || conv.platform === filterPlatform
  );

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    markConversationRead(conv.id);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // In a real app, this would send the message
    setMessageText('');
  };

  const generateAiReply = () => {
    setShowAiDraft(true);
    // Simulate AI generation
    setTimeout(() => {
      setAiDraft(
        "Thank you for your interest! I'd be happy to discuss the project in detail. Based on your requirements, I can deliver a high-quality solution within your timeline. Would you like to schedule a call to go over the specifics?"
      );
    }, 1000);
  };

  const acceptAiDraft = () => {
    setMessageText(aiDraft);
    setShowAiDraft(false);
    setAiDraft('');
  };

  return (
    <div className="h-screen flex">
      {/* Conversation List */}
      <div className="w-80 border-r border-[#2A2A33] bg-[#1A1A23] flex flex-col">
        <div className="p-4 border-b border-[#2A2A33] space-y-4">
          <h2 className="text-xl font-bold">Messages</h2>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-[#0D0D15] border-[#2A2A33]"
            />
          </div>

          {/* Platform Filters */}
          <div className="flex gap-2">
            <FilterButton
              active={filterPlatform === 'all'}
              onClick={() => setFilterPlatform('all')}
            >
              All
            </FilterButton>
            <FilterButton
              active={filterPlatform === 'upwork'}
              onClick={() => setFilterPlatform('upwork')}
            >
              Upwork
            </FilterButton>
            <FilterButton
              active={filterPlatform === 'fiverr'}
              onClick={() => setFilterPlatform('fiverr')}
            >
              Fiverr
            </FilterButton>
            <FilterButton
              active={filterPlatform === 'whatsapp'}
              onClick={() => setFilterPlatform('whatsapp')}
            >
              WhatsApp
            </FilterButton>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={cn(
                  "w-full p-3 rounded-lg mb-2 text-left transition-all hover:bg-[#2A2A33]",
                  selectedConversation?.id === conv.id && "bg-[#2A2A33] gradient-border"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conv.clientAvatar} />
                    <AvatarFallback>{conv.clientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">{conv.clientName}</p>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 h-5 px-2">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs capitalize">
                        {conv.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
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

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-[#0D0D15]">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-[#2A2A33] px-6 flex items-center justify-between bg-[#1A1A23]">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.clientAvatar} />
                  <AvatarFallback>{selectedConversation.clientName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedConversation.clientName}</p>
                  {selectedConversation.projectTitle && (
                    <p className="text-xs text-muted-foreground">{selectedConversation.projectTitle}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="capitalize">
                {selectedConversation.platform}
              </Badge>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4 max-w-4xl mx-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender === 'user' && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="w-8 h-8">
                      {message.sender === 'client' ? (
                        <>
                          <AvatarImage src={selectedConversation.clientAvatar} />
                          <AvatarFallback>{selectedConversation.clientName[0]}</AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback>You</AvatarFallback>
                      )}
                    </Avatar>
                    <div className={cn(
                      "max-w-[70%] space-y-1",
                      message.sender === 'user' && "items-end"
                    )}>
                      <div className={cn(
                        "p-3 rounded-lg",
                        message.sender === 'client'
                          ? "bg-[#1A1A23] border border-[#2A2A33]"
                          : "bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-500/30"
                      )}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono px-1">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-[#2A2A33] p-4 bg-[#1A1A23]">
              <div className="max-w-4xl mx-auto space-y-3">
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-[#0D0D15] border-[#2A2A33] min-h-[80px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAiReply}
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Assist
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* AI Assistant Sidebar */}
      <div className="w-80 border-l border-[#2A2A33] bg-[#1A1A23] p-4 space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          AI Assistant
        </h3>

        {showAiDraft && (
          <Card className="p-4 bg-[#0D0D15] border-cyan-500/30 space-y-3">
            <p className="text-sm font-medium text-cyan-400">Generated Reply</p>
            <p className="text-sm">{aiDraft || 'Generating...'}</p>
            {aiDraft && (
              <div className="flex gap-2">
                <Button size="sm" onClick={acceptAiDraft} className="flex-1">
                  Use This
                </Button>
                <Button size="sm" variant="outline" onClick={generateAiReply}>
                  Regenerate
                </Button>
              </div>
            )}
          </Card>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Quick Actions</p>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <FileText className="w-4 h-4" />
            Generate Proposal
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <Megaphone className="w-4 h-4" />
            Create Ad
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <Search className="w-4 h-4" />
            Analyze Scope
          </Button>
        </div>

        {selectedConversation && (
          <Card className="p-4 bg-[#0D0D15] border-[#2A2A33] space-y-2">
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
              {selectedConversation.projectTitle && (
                <div className="pt-2 border-t border-[#2A2A33]">
                  <span className="text-muted-foreground">Project:</span>
                  <p className="mt-1">{selectedConversation.projectTitle}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-md text-xs font-medium transition-all",
        active
          ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white"
          : "bg-[#0D0D15] text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
