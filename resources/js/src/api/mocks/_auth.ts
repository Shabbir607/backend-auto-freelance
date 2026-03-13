export type UserRole = 'superadmin' | 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  teamId?: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  adminId: string;
  plan: 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 'superadmin-1',
    email: 'superadmin@nexus.ai',
    name: 'System Administrator',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'admin-1',
    email: 'admin@teamone.com',
    name: 'Alex Morgan',
    role: 'admin',
    teamId: 'team-1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'admin-2',
    email: 'admin@teamtwo.com',
    name: 'Sarah Chen',
    role: 'admin',
    teamId: 'team-2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-1',
    email: 'user@teamone.com',
    name: 'Jordan Smith',
    role: 'user',
    teamId: 'team-1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'mike@teamone.com',
    name: 'Mike Johnson',
    role: 'user',
    teamId: 'team-1',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'emma@teamone.com',
    name: 'Emma Davis',
    role: 'user',
    teamId: 'team-1',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'user-4',
    email: 'lisa@teamtwo.com',
    name: 'Lisa Wang',
    role: 'user',
    teamId: 'team-2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    createdAt: '2024-03-01T00:00:00Z',
  },
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'ProDev Solutions',
    adminId: 'admin-1',
    plan: 'pro',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'team-2',
    name: 'Digital Nomads Agency',
    adminId: 'admin-2',
    plan: 'enterprise',
    createdAt: '2024-02-01T00:00:00Z',
  },
];

export const mockCredentials: Record<string, { password: string; userId: string }> = {
  'superadmin@nexus.ai': { password: 'password', userId: 'superadmin-1' },
  'admin@teamone.com': { password: 'password', userId: 'admin-1' },
  'admin@teamtwo.com': { password: 'password', userId: 'admin-2' },
  'user@teamone.com': { password: 'password', userId: 'user-1' },
  'mike@teamone.com': { password: 'password', userId: 'user-2' },
  'emma@teamone.com': { password: 'password', userId: 'user-3' },
  'lisa@teamtwo.com': { password: 'password', userId: 'user-4' },
};

export function authenticateUser(email: string, password: string): User | null {
  const cred = mockCredentials[email];
  if (cred && cred.password === password) {
    return mockUsers.find(u => u.id === cred.userId) || null;
  }
  return null;
}

export function getUsersByTeam(teamId: string): User[] {
  return mockUsers.filter(u => u.teamId === teamId);
}

export function getTeamById(teamId: string): Team | undefined {
  return mockTeams.find(t => t.id === teamId);
}
