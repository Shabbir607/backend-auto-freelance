export interface SystemStatus {
  apiStatus: 'operational' | 'degraded' | 'down';
  upworkConnected: boolean;
  fiverrConnected: boolean;
  freelancerConnected: boolean;
  lastSync: string;
}

export interface ActivityItem {
  id: string;
  teamId?: string;
  type: 'bid_placed' | 'message_received' | 'account_connected' | 'bid_won' | 'project_completed' | 'error' | 'user_joined' | 'payment_received';
  title: string;
  description: string;
  timestamp: string;
  platform?: string;
  userId?: string;
}

export interface ApiToken {
  id: string;
  teamId: string;
  name: string;
  provider: 'gemini' | 'openai' | 'anthropic';
  status: 'active' | 'expired' | 'invalid';
  lastUsed?: string;
  createdAt: string;
}

export interface PlatformStats {
  totalBids: number;
  successfulBids: number;
  totalEarnings: number;
  activeProjects: number;
  completedProjects: number;
  averageRating: number;
}

export const mockSystemStatus: SystemStatus = {
  apiStatus: 'operational',
  upworkConnected: true,
  fiverrConnected: true,
  freelancerConnected: true,
  lastSync: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
};

export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    teamId: 'team-1',
    type: 'bid_placed',
    title: 'Bid placed',
    description: 'Auto-bid placed on "React Dashboard Development" - $2,500',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    platform: 'upwork',
    userId: 'user-1',
  },
  {
    id: 'act-2',
    teamId: 'team-1',
    type: 'message_received',
    title: 'New message',
    description: 'Sarah Johnson: Thanks! When can you start?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    platform: 'upwork',
  },
  {
    id: 'act-3',
    teamId: 'team-1',
    type: 'bid_won',
    title: 'Bid won!',
    description: 'Your bid on "AI Integration Project" was accepted - $5,000',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    platform: 'fiverr',
    userId: 'user-2',
  },
  {
    id: 'act-4',
    teamId: 'team-1',
    type: 'project_completed',
    title: 'Project completed',
    description: 'Dashboard Analytics Tool marked as complete',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    userId: 'user-3',
  },
  {
    id: 'act-5',
    teamId: 'team-1',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Received $3,500 for Mobile App Development milestone',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    platform: 'upwork',
  },
  {
    id: 'act-6',
    teamId: 'team-1',
    type: 'account_connected',
    title: 'Account connected',
    description: 'Toptal account "Enterprise Solutions" connected successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    platform: 'toptal',
  },
  {
    id: 'act-7',
    teamId: 'team-1',
    type: 'bid_placed',
    title: 'Bid placed',
    description: 'Auto-bid placed on "Node.js API Development" - $4,000',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    platform: 'freelancer',
    userId: 'user-1',
  },
  {
    id: 'act-8',
    teamId: 'team-2',
    type: 'user_joined',
    title: 'New team member',
    description: 'Lisa Wang joined the team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'act-9',
    type: 'user_joined',
    title: 'New admin registered',
    description: 'Digital Nomads Agency signed up for Enterprise plan',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

export const mockApiTokens: ApiToken[] = [
  {
    id: 'token-1',
    teamId: 'team-1',
    name: 'Gemini Pro',
    provider: 'gemini',
    status: 'active',
    lastUsed: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'token-2',
    teamId: 'team-1',
    name: 'OpenAI GPT-4',
    provider: 'openai',
    status: 'active',
    lastUsed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: 'token-3',
    teamId: 'team-1',
    name: 'Claude API',
    provider: 'anthropic',
    status: 'expired',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 'token-4',
    teamId: 'team-2',
    name: 'Gemini Flash',
    provider: 'gemini',
    status: 'active',
    lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
];

export const mockPlatformStats: Record<string, PlatformStats> = {
  'team-1': {
    totalBids: 567,
    successfulBids: 89,
    totalEarnings: 125000,
    activeProjects: 4,
    completedProjects: 23,
    averageRating: 4.9,
  },
  'team-2': {
    totalBids: 312,
    successfulBids: 45,
    totalEarnings: 78000,
    activeProjects: 2,
    completedProjects: 15,
    averageRating: 4.8,
  },
};

export function getActivitiesByTeam(teamId: string): ActivityItem[] {
  return mockActivities.filter(a => a.teamId === teamId || !a.teamId);
}

export function getApiTokensByTeam(teamId: string): ApiToken[] {
  return mockApiTokens.filter(t => t.teamId === teamId);
}

export function getPlatformStats(teamId: string): PlatformStats {
  return mockPlatformStats[teamId] || {
    totalBids: 0,
    successfulBids: 0,
    totalEarnings: 0,
    activeProjects: 0,
    completedProjects: 0,
    averageRating: 0,
  };
}

export function getAllTeamsStats(): { teamId: string; stats: PlatformStats }[] {
  return Object.entries(mockPlatformStats).map(([teamId, stats]) => ({
    teamId,
    stats,
  }));
}
