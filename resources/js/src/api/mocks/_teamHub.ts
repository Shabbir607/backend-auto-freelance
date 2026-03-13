export interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  members: string[];
  createdAt: string;
  projectId?: string;
}

export interface DirectMessage {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface TeamMessage {
  id: string;
  channelId?: string;
  dmId?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  threadId?: string;
  reactions: { emoji: string; users: string[] }[];
  isEdited: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

export interface Thread {
  id: string;
  parentMessageId: string;
  channelId: string;
  messages: TeamMessage[];
  participantCount: number;
  lastReplyAt: string;
}

export const mockChannels: Channel[] = [
  {
    id: 'ch-general',
    name: 'general',
    description: 'Company-wide announcements and discussions',
    isPrivate: false,
    members: ['user-1', 'user-2', 'user-3', 'user-4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'ch-random',
    name: 'random',
    description: 'Non-work banter and water cooler conversation',
    isPrivate: false,
    members: ['user-1', 'user-2', 'user-3', 'user-4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'ch-proj-ecommerce',
    name: 'proj-ecommerce',
    description: 'E-commerce Platform Redesign project channel',
    isPrivate: true,
    members: ['user-1', 'user-2'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    projectId: 'proj-1',
  },
  {
    id: 'ch-proj-mobile',
    name: 'proj-mobile-app',
    description: 'Mobile App Development project channel',
    isPrivate: true,
    members: ['user-1', 'user-3'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    projectId: 'proj-2',
  },
  {
    id: 'ch-design',
    name: 'design',
    description: 'Design discussions and feedback',
    isPrivate: false,
    members: ['user-1', 'user-2', 'user-4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: 'ch-dev',
    name: 'development',
    description: 'Technical discussions and code reviews',
    isPrivate: false,
    members: ['user-1', 'user-2', 'user-3'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
];

export const mockDirectMessages: DirectMessage[] = [
  {
    id: 'dm-1',
    participants: ['user-1', 'user-2'],
    lastMessage: 'Can you review the latest PR?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 2,
  },
  {
    id: 'dm-2',
    participants: ['user-1', 'user-3'],
    lastMessage: 'Meeting at 3pm confirmed',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
  },
  {
    id: 'dm-3',
    participants: ['user-1', 'user-4'],
    lastMessage: 'Thanks for the feedback!',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    unreadCount: 0,
  },
];

export const mockTeamMessages: TeamMessage[] = [
  {
    id: 'msg-1',
    channelId: 'ch-general',
    userId: 'user-2',
    userName: 'Sarah Chen',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'Good morning team! 👋 Just pushed the latest updates to the staging environment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    reactions: [{ emoji: '👍', users: ['user-1', 'user-3'] }, { emoji: '🎉', users: ['user-4'] }],
    isEdited: false,
  },
  {
    id: 'msg-2',
    channelId: 'ch-general',
    userId: 'user-3',
    userName: 'Mike Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'Awesome! I\'ll start testing right away. @Sarah can you share the test credentials?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    reactions: [],
    isEdited: false,
  },
  {
    id: 'msg-3',
    channelId: 'ch-general',
    userId: 'user-2',
    userName: 'Sarah Chen',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'Sure! Check your DMs 🔐',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    reactions: [{ emoji: '✅', users: ['user-3'] }],
    isEdited: false,
  },
  {
    id: 'msg-4',
    channelId: 'ch-general',
    userId: 'user-1',
    userName: 'Alex Morgan',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'Team standup in 30 minutes! Please prepare your updates.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    reactions: [{ emoji: '👀', users: ['user-2', 'user-3', 'user-4'] }],
    isEdited: false,
  },
  {
    id: 'msg-5',
    channelId: 'ch-proj-ecommerce',
    userId: 'user-2',
    userName: 'Sarah Chen',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'The client approved the new checkout flow designs! 🎉',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    reactions: [{ emoji: '🎉', users: ['user-1'] }, { emoji: '🚀', users: ['user-1'] }],
    isEdited: false,
  },
  {
    id: 'msg-6',
    channelId: 'ch-dev',
    userId: 'user-3',
    userName: 'Mike Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'Has anyone worked with the new React 19 features? Looking for some guidance on the use() hook.',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    reactions: [],
    isEdited: false,
  },
];

export const mockThreads: Thread[] = [
  {
    id: 'thread-1',
    parentMessageId: 'msg-1',
    channelId: 'ch-general',
    messages: [
      {
        id: 'thread-msg-1',
        threadId: 'thread-1',
        userId: 'user-3',
        userName: 'Mike Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        content: 'Great work! What\'s the main change in this update?',
        timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        reactions: [],
        isEdited: false,
      },
      {
        id: 'thread-msg-2',
        threadId: 'thread-1',
        userId: 'user-2',
        userName: 'Sarah Chen',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        content: 'Mainly performance improvements and the new dashboard widgets.',
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        reactions: [{ emoji: '👍', users: ['user-3'] }],
        isEdited: false,
      },
    ],
    participantCount: 2,
    lastReplyAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
  },
];

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  statusMessage?: string;
  role: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'user-1',
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    status: 'online',
    role: 'Team Lead',
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    status: 'online',
    statusMessage: 'In a meeting',
    role: 'UI/UX Designer',
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    status: 'away',
    role: 'Mobile Developer',
  },
  {
    id: 'user-4',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    status: 'busy',
    statusMessage: 'Deep work - no interruptions',
    role: 'Data Scientist',
  },
];

export function getChannelMessages(channelId: string): TeamMessage[] {
  return mockTeamMessages.filter(m => m.channelId === channelId);
}

export function getThreadForMessage(messageId: string): Thread | undefined {
  return mockThreads.find(t => t.parentMessageId === messageId);
}
