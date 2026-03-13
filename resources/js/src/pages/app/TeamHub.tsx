import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Hash,
  Lock,
  Plus,
  Search,
  Send,
  Smile,
  Paperclip,
  MoreHorizontal,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  X,
  AtSign,
  Sparkles,
  Mic,
  Circle,
  Video,
  Phone,
  PhoneOff,
  VideoOff,
  MicOff,
  Monitor,
  Settings,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import {
  mockChannels,
  mockDirectMessages,
  mockTeamMessages,
  mockTeamMembers,
  mockThreads,
  Channel,
  TeamMessage,
  TeamMember,
  Thread,
  getChannelMessages,
  getThreadForMessage,
} from '@/api/mocks/_teamHub';

const statusColors: Record<string, string> = {
  online: 'bg-emerald-500',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
  offline: 'bg-gray-500',
};

function formatMessageDate(timestamp: string): string {
  const date = new Date(timestamp);
  if (isToday(date)) return format(date, 'h:mm a');
  if (isYesterday(date)) return `Yesterday at ${format(date, 'h:mm a')}`;
  return format(date, 'MMM d, h:mm a');
}

function ChannelItem({
  channel,
  isActive,
  onClick
}: {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}) {
  const unreadCount = Math.floor(Math.random() * 5);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
        isActive ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {channel.isPrivate ? (
        <Lock className="w-4 h-4 flex-shrink-0" />
      ) : (
        <Hash className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="flex-1 text-left truncate">{channel.name}</span>
      {unreadCount > 0 && (
        <Badge className="bg-primary text-primary-foreground px-1.5 py-0 h-5 text-xs">
          {unreadCount}
        </Badge>
      )}
    </button>
  );
}

function DMItem({
  member,
  isActive,
  onClick,
  unreadCount = 0,
}: {
  member: TeamMember;
  isActive: boolean;
  onClick: () => void;
  unreadCount?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
        isActive ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="relative">
        <Avatar className="w-5 h-5">
          <AvatarImage src={member.avatar} />
          <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card",
          statusColors[member.status]
        )} />
      </div>
      <span className="flex-1 text-left truncate">{member.name}</span>
      {unreadCount > 0 && (
        <Badge className="bg-primary text-primary-foreground px-1.5 py-0 h-5 text-xs">
          {unreadCount}
        </Badge>
      )}
    </button>
  );
}

function MessageItem({
  message,
  onReplyInThread,
  showThread = true,
}: {
  message: TeamMessage;
  onReplyInThread: (message: TeamMessage) => void;
  showThread?: boolean;
}) {
  const [showActions, setShowActions] = useState(false);
  const thread = showThread ? getThreadForMessage(message.id) : undefined;

  return (
    <div
      className="group px-4 py-2 hover:bg-muted/50 transition-colors"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-9 h-9 mt-0.5">
          <AvatarImage src={message.userAvatar} />
          <AvatarFallback>{message.userName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">{message.userName}</span>
            <span className="text-xs text-muted-foreground">{formatMessageDate(message.timestamp)}</span>
            {message.isEdited && <span className="text-xs text-muted-foreground">(edited)</span>}
          </div>
          <p className="text-sm mt-0.5 whitespace-pre-wrap">{message.content}</p>

          {/* Reactions */}
          {message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 text-xs transition-colors"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-muted-foreground">{reaction.users.length}</span>
                </button>
              ))}
            </div>
          )}

          {/* Thread Preview */}
          {thread && (
            <button
              onClick={() => onReplyInThread(message)}
              className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted text-xs transition-colors"
            >
              <div className="flex -space-x-1">
                {thread.messages.slice(0, 3).map((m, idx) => (
                  <Avatar key={idx} className="w-5 h-5 border border-card">
                    <AvatarImage src={m.userAvatar} />
                    <AvatarFallback className="text-[8px]">{m.userName[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-primary font-medium">
                {thread.messages.length} {thread.messages.length === 1 ? 'reply' : 'replies'}
              </span>
              <span className="text-muted-foreground">
                Last reply {formatDistanceToNow(new Date(thread.lastReplyAt), { addSuffix: true })}
              </span>
            </button>
          )}
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 hover:bg-muted rounded transition-colors">
              <Smile className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => onReplyInThread(message)}
              className="p-1.5 hover:bg-muted rounded transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted rounded transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadPanel({
  message,
  thread,
  onClose
}: {
  message: TeamMessage;
  thread?: Thread;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [replyText, setReplyText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simulate typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(Math.random() > 0.7);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border">
        <h3 className="font-semibold truncate">{t('teamHub.threads')}</h3>
        <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Parent Message */}
      <div className="border-b border-border">
        <MessageItem message={message} onReplyInThread={() => { }} showThread={false} />
      </div>

      {/* Thread Messages */}
      <ScrollArea className="flex-1">
        <div className="py-2">
          {thread?.messages.map(msg => (
            <MessageItem key={msg.id} message={msg} onReplyInThread={() => { }} showThread={false} />
          ))}
          {isTyping && (
            <div className="px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="hidden sm:inline">Someone is typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Reply Input */}
      <div className="p-3 md:p-4 border-t border-border">
        <div className="relative">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply in thread..."
            className="min-h-[60px] md:min-h-[80px] pr-12 bg-background border-border resize-none text-sm"
          />
          <Button
            size="sm"
            className="absolute bottom-2 right-2 bg-primary text-primary-foreground h-7 w-7 p-0"
            disabled={!replyText.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default function TeamHub() {
  const { t } = useTranslation();
  const [channelsExpanded, setChannelsExpanded] = useState(true);
  const [dmsExpanded, setDmsExpanded] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(mockChannels[0]);
  const [selectedDM, setSelectedDM] = useState<TeamMember | null>(null);
  const [messageText, setMessageText] = useState('');
  const [threadMessage, setThreadMessage] = useState<TeamMessage | null>(null);
  const [showAICommand, setShowAICommand] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordingDuration, setVoiceRecordingDuration] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = selectedChannel ? getChannelMessages(selectedChannel.id) : [];
  const thread = threadMessage ? getThreadForMessage(threadMessage.id) : undefined;

  // Call duration timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  // Voice recording timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isVoiceRecording) {
      interval = setInterval(() => {
        setVoiceRecordingDuration(prev => {
          if (prev >= 60) {
            setIsVoiceRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVoiceRecording]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = (type: 'video' | 'audio') => {
    setCallType(type);
    setShowCallModal(true);
    setIsInCall(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsInCall(false);
    setShowCallModal(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsRecording(false);
    setCallDuration(0);
  };

  const toggleVoiceRecording = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setVoiceRecordingDuration(0);
    } else {
      setIsVoiceRecording(true);
      setVoiceRecordingDuration(0);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Handle /ai command
    if (messageText.startsWith('/ai ')) {
      setShowAICommand(true);
      // Simulate AI response
      setTimeout(() => {
        setShowAICommand(false);
      }, 2000);
    }
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      {/* Mobile Header - Show when sidebar is hidden */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="gap-2"
        >
          <Hash className="w-4 h-4" />
          <span className="font-semibold">
            {selectedChannel?.name || selectedDM?.name || 'Team Hub'}
          </span>
        </Button>
        <div className="flex items-center gap-2">
          {(selectedChannel || selectedDM) && (
            <>
              <Button variant="ghost" size="sm" onClick={() => startCall('audio')}>
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => startCall('video')}>
                <Video className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Sidebar - Responsive */}
      <div className={cn(
        "w-full md:w-64 border-r border-border flex flex-col bg-card transition-all duration-300",
        "md:relative absolute inset-0 z-50 md:z-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-3 border-b border-border">
          <h2 className="font-semibold">Team Hub</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9 h-8 text-sm bg-background border-border"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Channels Section */}
            <div className="mb-4">
              <button
                onClick={() => setChannelsExpanded(!channelsExpanded)}
                className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-1">
                  {channelsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  {t('teamHub.channels')}
                </span>
                <Plus className="w-3 h-3" />
              </button>
              {channelsExpanded && (
                <div className="mt-1 space-y-0.5">
                  {mockChannels.map(channel => (
                    <ChannelItem
                      key={channel.id}
                      channel={channel}
                      isActive={selectedChannel?.id === channel.id && !selectedDM}
                      onClick={() => {
                        setSelectedChannel(channel);
                        setSelectedDM(null);
                        setThreadMessage(null);
                        setSidebarOpen(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Direct Messages Section */}
            <div>
              <button
                onClick={() => setDmsExpanded(!dmsExpanded)}
                className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-1">
                  {dmsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  {t('teamHub.directMessages')}
                </span>
                <Plus className="w-3 h-3" />
              </button>
              {dmsExpanded && (
                <div className="mt-1 space-y-0.5">
                  {mockTeamMembers.map(member => (
                    <DMItem
                      key={member.id}
                      member={member}
                      isActive={selectedDM?.id === member.id}
                      onClick={() => {
                        setSelectedDM(member);
                        setSelectedChannel(null);
                        setThreadMessage(null);
                        setSidebarOpen(false);
                      }}
                      unreadCount={mockDirectMessages.find(dm => dm.participants.includes(member.id))?.unreadCount}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header - Desktop Only */}
        <div className="hidden md:flex h-14 px-4 items-center justify-between border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            {selectedChannel ? (
              <>
                {selectedChannel.isPrivate ? (
                  <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <Hash className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="font-semibold truncate">{selectedChannel.name}</span>
                <span className="text-sm text-muted-foreground hidden lg:inline truncate">
                  {selectedChannel.description}
                </span>
              </>
            ) : selectedDM ? (
              <>
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarImage src={selectedDM.avatar} />
                  <AvatarFallback>{selectedDM.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold truncate">{selectedDM.name}</span>
                <div className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  statusColors[selectedDM.status]
                )} />
              </>
            ) : null}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-emerald-500" onClick={() => startCall('audio')} title="Start audio call">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => startCall('video')} title="Start video call">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <AtSign className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="py-4">
            {messages.map(message => (
              <MessageItem
                key={message.id}
                message={message}
                onReplyInThread={setThreadMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-3 md:p-4 border-t border-border">
          {showAICommand && (
            <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary">AI is generating a response...</span>
            </div>
          )}

          {/* Voice Recording UI */}
          {isVoiceRecording ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Circle className="w-3 h-3 text-red-500 fill-red-500 animate-pulse flex-shrink-0" />
                <span className="text-sm text-red-400 truncate">Recording...</span>
                <span className="text-sm font-mono text-red-400 flex-shrink-0">{formatCallDuration(voiceRecordingDuration)}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => { setIsVoiceRecording(false); setVoiceRecordingDuration(0); }}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground"
                  onClick={toggleVoiceRecording}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${selectedChannel ? `#${selectedChannel.name}` : selectedDM?.name || ''}...`}
                className="min-h-[44px] max-h-32 pr-24 md:pr-32 bg-background border-border resize-none text-sm"
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <button
                  className="p-1.5 hover:bg-muted rounded transition-colors"
                  onClick={toggleVoiceRecording}
                  title="Record voice message"
                >
                  <Mic className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded transition-colors hidden sm:inline-flex">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 hover:bg-muted rounded transition-colors hidden sm:inline-flex">
                  <Smile className="w-4 h-4 text-muted-foreground" />
                </button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground h-7 px-2"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thread Panel - Responsive */}
      {threadMessage && (
        <div className={cn(
          "w-full md:w-96 border-l border-border bg-card flex flex-col",
          "md:relative absolute inset-0 z-50 md:z-0"
        )}>
          <ThreadPanel
            message={threadMessage}
            thread={thread}
            onClose={() => setThreadMessage(null)}
          />
        </div>
      )}

      {/* Video/Audio Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            {/* Call Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className={cn(
                  "w-3 h-3 rounded-full animate-pulse flex-shrink-0",
                  isRecording ? "bg-red-500" : "bg-emerald-500"
                )} />
                <span className="text-white font-medium truncate">
                  {callType === 'video' ? 'Video Call' : 'Audio Call'} with {selectedChannel?.name || selectedDM?.name}
                </span>
                <span className="text-muted-foreground font-mono text-sm flex-shrink-0">{formatCallDuration(callDuration)}</span>
                {isRecording && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 hidden sm:inline-flex">
                    Recording
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground flex-shrink-0" onClick={endCall}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Video Area */}
            <div className="aspect-video bg-card rounded-xl overflow-hidden mb-4 relative">
              {callType === 'video' && !isVideoOff ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                    </div>
                    <p className="text-white text-base md:text-lg font-medium">{selectedChannel?.name || selectedDM?.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">Connected via Jitsi Meet</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      {isVideoOff ? (
                        <VideoOff className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground" />
                      ) : (
                        <Phone className="w-10 h-10 md:w-12 md:h-12 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-white text-base md:text-lg font-medium">{selectedChannel?.name || selectedDM?.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {callType === 'audio' ? 'Audio call in progress' : 'Video is off'}
                    </p>
                  </div>
                </div>
              )}

              {/* Self View (Picture-in-Picture) */}
              {callType === 'video' && !isVideoOff && (
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-32 h-24 md:w-48 md:h-36 bg-background rounded-lg border border-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm md:text-base">You</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-full w-12 h-12 md:w-14 md:h-14",
                  isMuted ? "bg-red-500/20 border-red-500 text-red-400" : "border-border"
                )}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
              </Button>

              {callType === 'video' && (
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    "rounded-full w-12 h-12 md:w-14 md:h-14",
                    isVideoOff ? "bg-red-500/20 border-red-500 text-red-400" : "border-border"
                  )}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5 md:w-6 md:h-6" /> : <Video className="w-5 h-5 md:w-6 md:h-6" />}
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-full w-12 h-12 md:w-14 md:h-14",
                  isRecording ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" : "border-border"
                )}
                onClick={() => setIsRecording(!isRecording)}
                title={isRecording ? "Stop recording" : "Start recording"}
              >
                <Circle className={cn("w-5 h-5 md:w-6 md:h-6", isRecording && "fill-red-500")} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 md:w-14 md:h-14 border-border hidden sm:flex"
                title="Share screen"
              >
                <Monitor className="w-5 h-5 md:w-6 md:h-6" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 md:w-14 md:h-14 border-border hidden sm:flex"
                title="Settings"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </Button>

              <Button
                size="lg"
                className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-red-500 hover:bg-red-600 text-white"
                onClick={endCall}
              >
                <PhoneOff className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>

            {/* Call Info */}
            <div className="mt-4 text-center px-4">
              <p className="text-xs text-muted-foreground">
                Powered by Jitsi Meet • End-to-end encrypted
                <span className="hidden sm:inline"> • {isRecording ? 'Recording will be saved after call ends' : 'Click record to save this meeting'}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
