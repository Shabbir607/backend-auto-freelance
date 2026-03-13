export type Platform = 'upwork' | 'fiverr' | 'freelancer' | 'toptal';

export interface FreelanceAccount {
  id: string;
  teamId: string;
  platform: Platform;
  accountName: string;
  username: string;
  isActive: boolean;
  autoBidEnabled: boolean;
  dailyBudget: number;
  bidCount: number;
  successRate: number;
  aiPrompt?: string;
  proxyId?: string;
  lastActivity: string;
  assignedTo?: string[];
}

export interface Proxy {
  id: string;
  teamId: string;
  ip: string;
  port: number;
  username: string;
  status: 'active' | 'inactive' | 'error';
  assignedAccounts: string[];
  location: string;
  lastChecked: string;
}

export const mockFreelanceAccounts: FreelanceAccount[] = [
  {
    id: 'acc-1',
    teamId: 'team-1',
    platform: 'upwork',
    accountName: 'ProDev Solutions',
    username: 'prodev_alex',
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 500,
    bidCount: 156,
    successRate: 34,
    aiPrompt: 'Focus on web development projects with React and Node.js. Budget range: $1000-$5000. Prioritize long-term contracts.',
    proxyId: 'proxy-1',
    lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    assignedTo: ['user-1', 'user-2'],
  },
  {
    id: 'acc-2',
    teamId: 'team-1',
    platform: 'upwork',
    accountName: 'AI Automation Expert',
    username: 'ai_expert_pro',
    isActive: true,
    autoBidEnabled: false,
    dailyBudget: 300,
    bidCount: 89,
    successRate: 41,
    aiPrompt: 'Target AI/ML automation projects. Minimum budget: $2000. Focus on Python and TensorFlow.',
    proxyId: 'proxy-2',
    lastActivity: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    assignedTo: ['user-1'],
  },
  {
    id: 'acc-3',
    teamId: 'team-1',
    platform: 'fiverr',
    accountName: 'WebFlow Master',
    username: 'webflow_master',
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 200,
    bidCount: 234,
    successRate: 52,
    aiPrompt: 'Focus on Webflow and no-code solutions. Quick turnaround projects preferred.',
    lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    assignedTo: ['user-2', 'user-3'],
  },
  {
    id: 'acc-4',
    teamId: 'team-1',
    platform: 'freelancer',
    accountName: 'Full Stack Dev',
    username: 'fullstack_dev',
    isActive: false,
    autoBidEnabled: false,
    dailyBudget: 400,
    bidCount: 67,
    successRate: 28,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    assignedTo: ['user-3'],
  },
  {
    id: 'acc-5',
    teamId: 'team-1',
    platform: 'toptal',
    accountName: 'Enterprise Solutions',
    username: 'enterprise_dev',
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 1000,
    bidCount: 45,
    successRate: 67,
    aiPrompt: 'Target enterprise-level projects. Minimum $10,000 budget. Focus on scalable architectures.',
    proxyId: 'proxy-3',
    lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    assignedTo: ['user-1'],
  },
  {
    id: 'acc-6',
    teamId: 'team-2',
    platform: 'upwork',
    accountName: 'Digital Nomads Main',
    username: 'digitalnomads',
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 750,
    bidCount: 312,
    successRate: 45,
    aiPrompt: 'Focus on digital marketing and content creation projects.',
    lastActivity: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    assignedTo: ['user-4'],
  },
];

export const mockProxies: Proxy[] = [
  {
    id: 'proxy-1',
    teamId: 'team-1',
    ip: '192.168.1.100',
    port: 8080,
    username: 'proxy_user_1',
    status: 'active',
    assignedAccounts: ['acc-1'],
    location: 'United States',
    lastChecked: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'proxy-2',
    teamId: 'team-1',
    ip: '192.168.1.101',
    port: 8080,
    username: 'proxy_user_2',
    status: 'active',
    assignedAccounts: ['acc-2'],
    location: 'United Kingdom',
    lastChecked: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    id: 'proxy-3',
    teamId: 'team-1',
    ip: '192.168.1.102',
    port: 8080,
    username: 'proxy_user_3',
    status: 'error',
    assignedAccounts: ['acc-5'],
    location: 'Germany',
    lastChecked: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'proxy-4',
    teamId: 'team-2',
    ip: '10.0.0.50',
    port: 3128,
    username: 'dn_proxy',
    status: 'active',
    assignedAccounts: [],
    location: 'Canada',
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

export function getAccountsByTeam(teamId: string): FreelanceAccount[] {
  return mockFreelanceAccounts.filter(a => a.teamId === teamId);
}

export function getAccountsForUser(userId: string): FreelanceAccount[] {
  return mockFreelanceAccounts.filter(a => a.assignedTo?.includes(userId));
}

export function getProxiesByTeam(teamId: string): Proxy[] {
  return mockProxies.filter(p => p.teamId === teamId);
}
