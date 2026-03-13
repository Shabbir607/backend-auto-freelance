import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PlatformAccount, Conversation, SystemStatus, ActivityItem } from '@/types';
import { mockUser, mockAccounts, mockConversations, mockSystemStatus, mockActivities } from '@/lib/mockData';

interface AppContextType {
  user: User;
  accounts: PlatformAccount[];
  conversations: Conversation[];
  systemStatus: SystemStatus;
  activities: ActivityItem[];
  updateAccount: (id: string, updates: Partial<PlatformAccount>) => void;
  addActivity: (activity: ActivityItem) => void;
  markConversationRead: (conversationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(mockUser);
  const [accounts, setAccounts] = useState<PlatformAccount[]>(mockAccounts);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>(mockSystemStatus);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);

  // Simulate real-time message updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomConvo = conversations[Math.floor(Math.random() * conversations.length)];
      if (randomConvo && Math.random() > 0.7) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          conversationId: randomConvo.id,
          sender: 'client' as const,
          content: getRandomClientMessage(),
          timestamp: new Date().toISOString(),
          platform: randomConvo.platform,
          read: false,
        };

        setConversations(prev => prev.map(conv => {
          if (conv.id === randomConvo.id) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.content,
              lastMessageTime: newMessage.timestamp,
              unreadCount: conv.unreadCount + 1,
            };
          }
          return conv;
        }));

        const newActivity: ActivityItem = {
          id: `activity-${Date.now()}`,
          type: 'message_received',
          title: 'New message',
          description: `${randomConvo.clientName}: ${newMessage.content.substring(0, 50)}...`,
          timestamp: new Date().toISOString(),
          platform: randomConvo.platform,
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
      }
    }, 18000); // Every 18 seconds

    return () => clearInterval(interval);
  }, [conversations]);

  const updateAccount = (id: string, updates: Partial<PlatformAccount>) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...updates } : acc));
  };

  const addActivity = (activity: ActivityItem) => {
    setActivities(prev => [activity, ...prev.slice(0, 19)]);
  };

  const markConversationRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      accounts,
      conversations,
      systemStatus,
      activities,
      updateAccount,
      addActivity,
      markConversationRead,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

function getRandomClientMessage(): string {
  const messages = [
    "Hi, I'm interested in your services. Can we discuss the project?",
    "What's your availability for this week?",
    "Could you provide a quote for this work?",
    "I have some questions about the proposal.",
    "When can you start on this project?",
    "Can you share some examples of similar work?",
    "I'd like to schedule a call to discuss details.",
    "What's your timeline for delivery?",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
