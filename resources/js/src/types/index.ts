export type UserRole = 'user' | 'admin' | 'superadmin';

export type Platform = 'upwork' | 'fiverr' | 'whatsapp';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface PlatformAccount {
  id: string;
  platform: Platform;
  accountName: string;
  username: string;
  isActive: boolean;
  autoBidEnabled: boolean;
  dailyBudget: number;
  bidCount: number;
  successRate: number;
  aiPrompt?: string;
  lastActivity: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'user';
  content: string;
  timestamp: string;
  platform: Platform;
  read: boolean;
}

export interface Conversation {
  id: string;
  clientName: string;
  clientAvatar?: string;
  platform: Platform;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  projectTitle?: string;
}

export interface SystemStatus {
  apiStatus: 'operational' | 'degraded' | 'down';
  upworkConnected: boolean;
  fiverrConnected: boolean;
  whatsappConnected: boolean;
  activeBids: number;
  activeConversations: number;
  lastSync: string;
}

export interface ActivityItem {
  id: string;
  type: 'bid_placed' | 'message_received' | 'account_connected' | 'bid_won' | 'error';
  title: string;
  description: string;
  timestamp: string;
  platform?: Platform;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'sales' | 'analysis' | 'content';
}
