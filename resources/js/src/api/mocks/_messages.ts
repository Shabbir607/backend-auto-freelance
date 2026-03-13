export type MessagePlatform = 'upwork' | 'fiverr' | 'whatsapp' | 'email' | 'direct';

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'user';
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  teamId: string;
  clientName: string;
  clientAvatar?: string;
  clientEmail?: string;
  platform: MessagePlatform;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  projectId?: string;
  projectTitle?: string;
  assignedTo?: string[];
  status: 'active' | 'archived' | 'spam';
}

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    teamId: 'team-1',
    clientName: 'Sarah Johnson',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    clientEmail: 'sarah@techcorp.com',
    platform: 'upwork',
    lastMessage: 'Thanks! When can you start on the payment integration?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 2,
    projectId: 'proj-1',
    projectTitle: 'E-commerce Platform Development',
    assignedTo: ['user-1', 'user-2'],
    status: 'active',
    messages: [
      {
        id: 'msg-1',
        conversationId: 'conv-1',
        sender: 'client',
        content: 'Hi, I saw your proposal for the e-commerce project. Your portfolio looks impressive!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true,
      },
      {
        id: 'msg-2',
        conversationId: 'conv-1',
        sender: 'user',
        content: 'Hello Sarah! Thank you for reaching out. I\'d be happy to discuss the project details with you. I have extensive experience with e-commerce platforms.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
        read: true,
      },
      {
        id: 'msg-3',
        conversationId: 'conv-1',
        sender: 'client',
        content: 'Great! Can you handle both frontend and backend? We need React for the frontend and Node.js for the backend.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        read: true,
      },
      {
        id: 'msg-4',
        conversationId: 'conv-1',
        sender: 'user',
        content: 'Absolutely! I specialize in full-stack development with React and Node.js. I can also set up the payment integration with Stripe.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        read: true,
      },
      {
        id: 'msg-5',
        conversationId: 'conv-1',
        sender: 'client',
        content: 'Perfect! I\'ve reviewed your proposal and I\'m ready to move forward. Let\'s start with the project.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: true,
      },
      {
        id: 'msg-6',
        conversationId: 'conv-1',
        sender: 'user',
        content: 'Excellent! I\'ll start setting up the project structure today. I\'ll send you the initial wireframes by tomorrow.',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        read: true,
      },
      {
        id: 'msg-7',
        conversationId: 'conv-1',
        sender: 'client',
        content: 'Thanks! When can you start on the payment integration?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
      },
    ],
  },
  {
    id: 'conv-2',
    teamId: 'team-1',
    clientName: 'Michael Chen',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    clientEmail: 'michael@innovate.io',
    platform: 'fiverr',
    lastMessage: 'Could you send me some portfolio examples of chatbot integrations?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    unreadCount: 1,
    projectId: 'proj-2',
    projectTitle: 'AI Chatbot Integration',
    assignedTo: ['user-1'],
    status: 'active',
    messages: [
      {
        id: 'msg-8',
        conversationId: 'conv-2',
        sender: 'client',
        content: 'Hi! I need help integrating an AI chatbot into my website. Do you have experience with this?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: true,
      },
      {
        id: 'msg-9',
        conversationId: 'conv-2',
        sender: 'user',
        content: 'Hello Michael! Yes, I have extensive experience with AI chatbot integrations. I\'ve worked with OpenAI, Dialogflow, and custom solutions.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: true,
      },
      {
        id: 'msg-10',
        conversationId: 'conv-2',
        sender: 'client',
        content: 'Could you send me some portfolio examples of chatbot integrations?',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        read: false,
      },
    ],
  },
  {
    id: 'conv-3',
    teamId: 'team-1',
    clientName: 'Emma Williams',
    clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    clientEmail: 'emma@startupx.com',
    platform: 'upwork',
    lastMessage: 'The app looks great! Just a few minor tweaks needed on the profile screen.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 0,
    projectId: 'proj-3',
    projectTitle: 'Mobile App Development',
    assignedTo: ['user-2', 'user-3'],
    status: 'active',
    messages: [
      {
        id: 'msg-11',
        conversationId: 'conv-3',
        sender: 'client',
        content: 'I\'ve reviewed the latest build. The app looks great! Just a few minor tweaks needed on the profile screen.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: true,
      },
    ],
  },
  {
    id: 'conv-4',
    teamId: 'team-1',
    clientName: 'David Martinez',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    platform: 'whatsapp',
    lastMessage: 'Can we schedule a call tomorrow to discuss the new requirements?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    unreadCount: 0,
    assignedTo: ['user-3'],
    status: 'active',
    messages: [
      {
        id: 'msg-12',
        conversationId: 'conv-4',
        sender: 'client',
        content: 'Hey, got your number from the Fiverr project. Hope that\'s okay!',
        timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        read: true,
      },
      {
        id: 'msg-13',
        conversationId: 'conv-4',
        sender: 'user',
        content: 'Hi David! No problem at all. How can I help you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
        read: true,
      },
      {
        id: 'msg-14',
        conversationId: 'conv-4',
        sender: 'client',
        content: 'Can we schedule a call tomorrow to discuss the new requirements?',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        read: true,
      },
    ],
  },
  {
    id: 'conv-5',
    teamId: 'team-1',
    clientName: 'Lisa Park',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    clientEmail: 'lisa@saascompany.com',
    platform: 'email',
    lastMessage: 'Looking forward to your proposal for the API development project.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    unreadCount: 1,
    projectId: 'proj-5',
    projectTitle: 'API Development for SaaS',
    assignedTo: ['user-1'],
    status: 'active',
    messages: [
      {
        id: 'msg-15',
        conversationId: 'conv-5',
        sender: 'client',
        content: 'Hi, I found your profile on Freelancer. We need a comprehensive REST API for our SaaS platform.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        read: true,
      },
      {
        id: 'msg-16',
        conversationId: 'conv-5',
        sender: 'client',
        content: 'Looking forward to your proposal for the API development project.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        read: false,
      },
    ],
  },
  {
    id: 'conv-6',
    teamId: 'team-2',
    clientName: 'Jennifer Lee',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    clientEmail: 'jennifer@brand.com',
    platform: 'upwork',
    lastMessage: 'The content calendar looks perfect! Let\'s proceed with the design phase.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
    projectId: 'proj-7',
    projectTitle: 'Social Media Marketing Campaign',
    assignedTo: ['user-4'],
    status: 'active',
    messages: [
      {
        id: 'msg-17',
        conversationId: 'conv-6',
        sender: 'client',
        content: 'The content calendar looks perfect! Let\'s proceed with the design phase.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: true,
      },
    ],
  },
];

export function getConversationsByTeam(teamId: string): Conversation[] {
  return mockConversations.filter(c => c.teamId === teamId);
}

export function getConversationsForUser(userId: string): Conversation[] {
  return mockConversations.filter(c => c.assignedTo?.includes(userId));
}

export function getConversationById(conversationId: string): Conversation | undefined {
  return mockConversations.find(c => c.id === conversationId);
}

export function getUnreadCount(teamId: string): number {
  return mockConversations
    .filter(c => c.teamId === teamId)
    .reduce((sum, c) => sum + c.unreadCount, 0);
}

export const aiReplyTemplates = [
  "Thank you for your message! I'd be happy to help with that. Let me review the details and get back to you shortly.",
  "I appreciate you reaching out. Based on your requirements, I can definitely assist with this project. Would you like to schedule a call to discuss further?",
  "Thanks for the update! I'll incorporate those changes and have a revised version ready for you by tomorrow.",
  "Great question! Let me provide some clarity on that. The approach I recommend would be...",
  "I understand your concerns. Let me address each point and propose a solution that works for both of us.",
];
