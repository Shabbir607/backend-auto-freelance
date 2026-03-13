"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supportChatService, SupportTicketMessage } from '@/services/supportChatService';
import {
  Bot,
  Circle,
  MessageCircle,
  Minimize2,
  RefreshCcw,
  Send,
  X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface SupportChatFloatProps {
  autoShowDelay?: number;
  idleHideDelay?: number;
  position?: 'bottom-right' | 'bottom-left';
}

export default function SupportChatFloat({
  autoShowDelay = 6000,
  idleHideDelay = 30000,
  position = 'bottom-right'
}: SupportChatFloatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageText, setMessageText] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([{
      id: 'bot-welcome',
      content: 'Hi there! 👋 Welcome to EdgeLancer Support. Please enter your details to start.',
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }]);
  }, []);

  const [showPreChat, setShowPreChat] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', subject: '', message: '' });
  const [autoShowDisabled, setAutoShowDisabled] = useState(false);
  const [isSubmittingPreChat, setIsSubmittingPreChat] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [ticketStatus, setTicketStatus] = useState<'open' | 'closed'>('open');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoShowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('edgelancer_support_token');
    if (savedToken) {
      setSessionToken(savedToken);
      setShowPreChat(false);
      pollMessages(savedToken);
    }
  }, []);

  // Maps backend string to frontend roles
  const toChatMessage = (item: SupportTicketMessage, index: number): Message => {
    const senderRaw = String(item.sender_type || item.sender || '').toLowerCase();

    let mappedSender: Message['sender'] = 'bot';
    if (senderRaw.includes('user') || senderRaw.includes('customer')) {
      mappedSender = 'user';
    } else if (senderRaw.includes('agent') || senderRaw.includes('admin')) {
      mappedSender = 'agent';
    }

    const content = String(item.message || item.content || '').trim();
    const tsRaw = item.created_at || item.timestamp;
    const timestamp = tsRaw ? new Date(tsRaw) : new Date();

    return {
      id: String(item.id ?? `api-msg-${timestamp.getTime()}-${index}`),
      content,
      sender: mappedSender,
      timestamp,
      status: mappedSender === 'user' ? 'read' : 'read',
    };
  };

  // Poll Backend
  const pollMessages = async (token: string) => {
    if (!token) return;
    try {
      const response = await supportChatService.getMessages(token);
      const resData = response.data || (response as any);

      if (resData.success) {
        if (resData.ticket?.status) {
          setTicketStatus(resData.ticket.status);
        }

        const rawMessages = resData.messages || [];
        const apiMessages = rawMessages.map(toChatMessage).filter((m: Message) => m.content.length > 0);

        if (apiMessages.length > 0) {
          setMessages(prev => {
            const newMessages = [...prev];

            apiMessages.forEach((apiMsg: Message) => {
              const exactMatchIndex = newMessages.findIndex(m => String(m.id) === String(apiMsg.id));

              if (exactMatchIndex >= 0) {
                newMessages[exactMatchIndex] = apiMsg;
              } else {
                const optimisticIndex = newMessages.findIndex(
                  m => String(m.id).startsWith('temp-') && m.content === apiMsg.content
                );

                if (optimisticIndex >= 0) {
                  newMessages[optimisticIndex] = apiMsg;
                } else {
                  newMessages.push(apiMsg);
                }
              }
            });

            return newMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          });
        }
      } else {
        handleEndSession();
      }
    } catch (error) {
      console.error('Failed to poll messages:', error);
    }
  };

  // Timers and Auto-scroll
  useEffect(() => {
    if (autoShowDisabled) return;
    autoShowTimerRef.current = setTimeout(() => setIsVisible(true), autoShowDelay);
    return () => clearTimeout(autoShowTimerRef.current as ReturnType<typeof setTimeout>);
  }, [autoShowDelay, autoShowDisabled]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsMinimized(true), idleHideDelay);
    };
    resetIdleTimer();
    const handleActivity = () => resetIdleTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    return () => {
      clearTimeout(idleTimerRef.current as ReturnType<typeof setTimeout>);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isOpen, isMinimized, idleHideDelay]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!sessionToken || showPreChat || ticketStatus === 'closed') return;
    pollingTimerRef.current = setInterval(() => pollMessages(sessionToken), 4000);
    return () => clearInterval(pollingTimerRef.current as ReturnType<typeof setInterval>);
  }, [sessionToken, showPreChat, ticketStatus]);

  // Submit PreChat Form
  const handlePreChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.message) {
      setIsSubmittingPreChat(true);

      try {
        const response = await supportChatService.createTicket({
          name: userInfo.name,
          email: userInfo.email,
          subject: userInfo.subject || 'Support Request',
          message: userInfo.message,
        } as any);

        const resData = response.data || (response as any);

        if (resData.success && resData.session_token) {
          const token = resData.session_token;
          setSessionToken(token);
          localStorage.setItem('edgelancer_support_token', token);
          setShowPreChat(false);

          setMessages([{
            id: `welcome-${Date.now()}`,
            content: `Ticket created! We've received your message, ${userInfo.name}. An agent will reply shortly.`,
            sender: 'bot',
            timestamp: new Date(),
            status: 'read'
          }]);

          await pollMessages(token);
        } else {
          throw new Error(resData.message || 'Failed to create ticket');
        }
      } catch (err: any) {
        setMessages(prev => [...prev, {
          id: `err-${Date.now()}`,
          content: err.message || 'Sorry, there was an issue connecting. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
          status: 'read'
        }]);
      } finally {
        setIsSubmittingPreChat(false);
      }
    }
  };

  // Send Message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !sessionToken || ticketStatus === 'closed') return;

    const messageContent = messageText.trim();
    const tempId = `temp-${Date.now()}`;
    const newMessage: Message = {
      id: tempId,
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    try {
      const response = await supportChatService.sendMessage(sessionToken, { message: messageContent });
      const resData = response.data || (response as any);

      if (!resData.success) {
        setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'sent' } : m));
        setMessages(prev => [...prev, {
          id: `sys-err-${Date.now()}`,
          content: resData.message || "Message failed. This ticket may be closed.",
          sender: 'bot',
          timestamp: new Date(),
          status: 'read'
        }]);
        if (resData.message?.includes('closed')) setTicketStatus('closed');
      } else {
        setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'sent' } : m));
        await pollMessages(sessionToken); // Poll immediately to get exact IDs/timestamps without fake typing delay
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `sys-err-${Date.now()}`,
        content: "Network error sending message. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        status: 'read'
      }]);
    }
  };

  const handleEndSession = () => {
    localStorage.removeItem('edgelancer_support_token');
    setSessionToken(null);
    setShowPreChat(true);
    setTicketStatus('open');
    setUserInfo({ name: '', email: '', subject: '', message: '' });
    setMessages([{
      id: 'bot-welcome-new',
      content: 'Session ended. Please enter your details to start a new chat.',
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const positionClasses = position === 'bottom-right' ? 'right-4 sm:right-6' : 'left-4 sm:left-6';

  if (!isVisible && !isOpen) return null;

  return (
    <div className={cn("fixed bottom-4 sm:bottom-6 z-50", positionClasses)}>
      {isOpen && !isMinimized && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[calc(100vh-120px)] bg-nexus-card border border-nexus-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">EdgeLancer Support</h3>
                  <div className="flex items-center gap-1.5">
                    <Circle className={cn("w-2 h-2", ticketStatus === 'open' ? "fill-green-400 text-green-400" : "fill-red-400 text-red-400")} />
                    <span className="text-xs text-white/80">
                      {ticketStatus === 'open' ? 'Online • Ready to help' : 'Ticket Closed'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!showPreChat && (
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20" onClick={handleEndSession} title="Start New Chat">
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                )}
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20" onClick={() => setIsMinimized(true)}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Body */}
          {showPreChat ? (
            <div className="p-4 flex-1 overflow-y-auto">
              <form onSubmit={handlePreChatSubmit} className="space-y-4">
                <div>
                  <p className="text-sm text-nexus-muted mb-4">Please provide your details to start the conversation.</p>
                  <div className="space-y-3">
                    <Input placeholder="Your name" aria-label="Your name" value={userInfo.name} onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))} className="bg-nexus-black border-nexus-border" required />
                    <Input type="email" placeholder="Your email" aria-label="Your email" value={userInfo.email} onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))} className="bg-nexus-black border-nexus-border" required />
                    <Input placeholder="Subject (Optional)" aria-label="Subject" value={userInfo.subject} onChange={(e) => setUserInfo(prev => ({ ...prev, subject: e.target.value }))} className="bg-nexus-black border-nexus-border" />
                    <textarea
                      placeholder="How can we help you?"
                      aria-label="Your message"
                      value={userInfo.message}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full min-h-[80px] p-3 text-sm rounded-md bg-nexus-black border border-nexus-border focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmittingPreChat} className="w-full gradient-primary text-white border-0">
                  {isSubmittingPreChat ? 'Connecting...' : 'Start Chat'}
                </Button>
              </form>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 h-[350px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex gap-2", message.sender === 'user' ? "flex-row-reverse" : "flex-row")}>

                      {/* Avatar System */}
                      {message.sender !== 'user' && (
                        <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
                          <AvatarFallback className={cn(
                            "text-white text-[10px] font-bold",
                            message.sender === 'agent' ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-slate-600 to-slate-800"
                          )}>
                            {message.sender === 'agent' ? 'CS' : 'SYS'}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {/* Message Bubble */}
                      <div className={cn(
                        "max-w-[80%] px-4 py-2",
                        message.sender === 'user'
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl rounded-br-sm"
                          : message.sender === 'agent'
                            ? "bg-nexus-border text-white rounded-2xl rounded-bl-sm"
                            : "bg-transparent border border-nexus-border/50 text-nexus-muted rounded-xl"
                      )}>
                        {message.sender === 'agent' && <p className="text-[10px] text-cyan-400 font-medium mb-0.5">Support Agent</p>}
                        <p className={cn("text-sm whitespace-pre-wrap", message.sender === 'bot' && "text-xs italic")}>{message.content}</p>

                        {/* Timestamps & Read Receipts */}
                        <p className={cn("text-[10px] mt-1 flex items-center gap-1", message.sender === 'user' ? "justify-end text-white/70" : "justify-start text-nexus-muted")}>
                          {formatTime(message.timestamp)}
                          {message.sender === 'user' && message.status && (
                            <span className="ml-1 text-[12px]">
                              {message.status === 'sending' && '○'}
                              {message.status === 'sent' && '✓'}
                              {message.status === 'read' && '✓✓'}
                            </span>
                          )}
                        </p>
                      </div>

                    </div>
                  ))}
                  <div ref={messagesEndRef} className="h-1" />
                </div>
              </ScrollArea>

              {/* Footer / Input */}
              <div className="p-3 border-t border-nexus-border bg-nexus-card shrink-0">
                {ticketStatus === 'closed' ? (
                  <div className="text-center text-xs text-nexus-muted py-2 bg-nexus-black rounded-lg border border-nexus-border">
                    This conversation has been closed. <button onClick={handleEndSession} className="text-cyan-400 hover:underline">Start a new one</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Reply here..." aria-label="Chat message" className="flex-1 h-9 bg-nexus-black border-nexus-border text-sm" />
                    <Button size="icon" aria-label="Send message" className="h-9 w-9 gradient-primary text-white border-0" onClick={handleSendMessage} disabled={!messageText.trim()}><Send className="w-4 h-4" /></Button>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="px-4 py-2 bg-nexus-black/80 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-nexus-muted">Powered by EdgeLancer</span>
              <button className="text-[10px] text-nexus-muted hover:text-white transition-colors" onClick={() => setAutoShowDisabled(true)}>Disable auto-show</button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Floating Button */}
      {isOpen && isMinimized && (
        <button onClick={() => setIsMinimized(false)} className="mb-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all animate-in slide-in-from-bottom-2">
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Support Chat</span>
          <Badge className="bg-white/20 text-white border-0 text-xs">{messages.filter(m => m.sender === 'agent').length}</Badge>
        </button>
      )}

      {/* Default Floating Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-in zoom-in-50" aria-label="Open support chat">
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-ping opacity-30" />
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-nexus-card border border-nexus-border rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Need help? Chat with us!</span>
        </button>
      )}
    </div>
  );
}