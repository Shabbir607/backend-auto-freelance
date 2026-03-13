import { create } from 'zustand';
import { User, mockUsers, mockTeams, Team, getUsersByTeam } from '@/api/mocks/_auth';
import { FreelanceAccount, Proxy, mockFreelanceAccounts, mockProxies, getAccountsByTeam, getAccountsForUser, getProxiesByTeam } from '@/api/mocks/_freelanceAccounts';
import { Project, mockProjects, getProjectsByTeam, getProjectsForUser } from '@/api/mocks/_projects';
import { Conversation, mockConversations, getConversationsByTeam, getConversationsForUser } from '@/api/mocks/_messages';
import { SocialPost, SocialAccount, mockSocialPosts, mockSocialAccounts, getSocialPostsByTeam, getSocialAccountsByTeam } from '@/api/mocks/_social';
import { ActivityItem, ApiToken, mockActivities, mockApiTokens, mockSystemStatus, SystemStatus, PlatformStats, mockPlatformStats, getActivitiesByTeam, getApiTokensByTeam } from '@/api/mocks/_system';

interface AppState {
  // Data
  projects: Project[];
  freelanceAccounts: FreelanceAccount[];
  proxies: Proxy[];
  conversations: Conversation[];
  socialPosts: SocialPost[];
  socialAccounts: SocialAccount[];
  activities: ActivityItem[];
  apiTokens: ApiToken[];
  teamUsers: User[];
  systemStatus: SystemStatus;

  // UI State
  selectedConversationId: string | null;
  sidebarCollapsed: boolean;
  activeRequests: number;

  // Actions
  initializeForUser: (user: User) => void;
  incrementActiveRequests: () => void;
  decrementActiveRequests: () => void;

  // Project Actions
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  toggleTaskComplete: (projectId: string, taskId: string) => void;

  // Freelance Account Actions
  addFreelanceAccount: (account: Omit<FreelanceAccount, 'id'>) => void;
  updateFreelanceAccount: (id: string, updates: Partial<FreelanceAccount>) => void;
  deleteFreelanceAccount: (id: string) => void;
  toggleAutoBid: (id: string) => void;

  // Proxy Actions
  addProxy: (proxy: Omit<Proxy, 'id'>) => void;
  updateProxy: (id: string, updates: Partial<Proxy>) => void;
  deleteProxy: (id: string) => void;

  // Conversation Actions
  selectConversation: (id: string | null) => void;
  markConversationRead: (id: string) => void;
  addMessage: (conversationId: string, content: string, sender: 'user' | 'client') => void;

  // Social Post Actions
  addSocialPost: (post: Omit<SocialPost, 'id' | 'createdAt'>) => void;
  updateSocialPost: (id: string, updates: Partial<SocialPost>) => void;
  deleteSocialPost: (id: string) => void;

  // Team User Actions
  addTeamUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateTeamUser: (id: string, updates: Partial<User>) => void;
  deleteTeamUser: (id: string) => void;

  // API Token Actions
  addApiToken: (token: Omit<ApiToken, 'id' | 'createdAt'>) => void;
  updateApiToken: (id: string, updates: Partial<ApiToken>) => void;
  deleteApiToken: (id: string) => void;

  // Activity Actions
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;

  // UI Actions
  toggleSidebar: () => void;

  // Stats
  getPlatformStats: (teamId: string) => PlatformStats;
  getUnreadMessageCount: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  projects: [],
  freelanceAccounts: [],
  proxies: [],
  conversations: [],
  socialPosts: [],
  socialAccounts: [],
  activities: [],
  apiTokens: [],
  teamUsers: [],
  systemStatus: mockSystemStatus,
  selectedConversationId: null,
  sidebarCollapsed: false,
  activeRequests: 0,

  // Initialize data based on user role
  initializeForUser: (user: User) => {
    if (user.role === 'superadmin') {
      set({
        projects: mockProjects,
        freelanceAccounts: mockFreelanceAccounts,
        proxies: mockProxies,
        conversations: mockConversations,
        socialPosts: mockSocialPosts,
        socialAccounts: mockSocialAccounts,
        activities: mockActivities,
        apiTokens: mockApiTokens,
        teamUsers: mockUsers.filter(u => u.role !== 'superadmin'),
      });
    } else if (user.role === 'admin' && user.teamId) {
      set({
        projects: getProjectsByTeam(user.teamId),
        freelanceAccounts: getAccountsByTeam(user.teamId),
        proxies: getProxiesByTeam(user.teamId),
        conversations: getConversationsByTeam(user.teamId),
        socialPosts: getSocialPostsByTeam(user.teamId),
        socialAccounts: getSocialAccountsByTeam(user.teamId),
        activities: getActivitiesByTeam(user.teamId),
        apiTokens: getApiTokensByTeam(user.teamId),
        teamUsers: getUsersByTeam(user.teamId),
      });
    } else if (user.role === 'user') {
      set({
        projects: getProjectsForUser(user.id),
        freelanceAccounts: getAccountsForUser(user.id),
        proxies: [],
        conversations: getConversationsForUser(user.id),
        socialPosts: user.teamId ? getSocialPostsByTeam(user.teamId) : [],
        socialAccounts: user.teamId ? getSocialAccountsByTeam(user.teamId) : [],
        activities: user.teamId ? getActivitiesByTeam(user.teamId).filter(a => a.userId === user.id || !a.userId) : [],
        apiTokens: [],
        teamUsers: [],
      });
    }
  },

  // Project Actions
  addProject: (project) => {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ projects: [...state.projects, newProject] }));
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
    }));
  },

  deleteProject: (id) => {
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) }));
  },

  updateProjectStatus: (id, status) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
      ),
    }));
  },

  toggleTaskComplete: (projectId, taskId) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
            updatedAt: new Date().toISOString(),
          }
          : p
      ),
    }));
  },

  // Freelance Account Actions
  addFreelanceAccount: (account) => {
    const newAccount: FreelanceAccount = {
      ...account,
      id: `acc-${Date.now()}`,
    };
    set((state) => ({ freelanceAccounts: [...state.freelanceAccounts, newAccount] }));
  },

  updateFreelanceAccount: (id, updates) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    }));
  },

  deleteFreelanceAccount: (id) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.filter((a) => a.id !== id),
    }));
  },

  toggleAutoBid: (id) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.map((a) =>
        a.id === id ? { ...a, autoBidEnabled: !a.autoBidEnabled } : a
      ),
    }));
  },

  // Proxy Actions
  addProxy: (proxy) => {
    const newProxy: Proxy = {
      ...proxy,
      id: `proxy-${Date.now()}`,
    };
    set((state) => ({ proxies: [...state.proxies, newProxy] }));
  },

  updateProxy: (id, updates) => {
    set((state) => ({
      proxies: state.proxies.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  },

  deleteProxy: (id) => {
    set((state) => ({ proxies: state.proxies.filter((p) => p.id !== id) }));
  },

  // Conversation Actions
  selectConversation: (id) => {
    set({ selectedConversationId: id });
    if (id) {
      get().markConversationRead(id);
    }
  },

  markConversationRead: (id) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id
          ? {
            ...c,
            unreadCount: 0,
            messages: c.messages.map((m) => ({ ...m, read: true })),
          }
          : c
      ),
    }));
  },

  addMessage: (conversationId, content, sender) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender,
      content,
      timestamp: new Date().toISOString(),
      read: sender === 'user',
    };

    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: content,
            lastMessageTime: newMessage.timestamp,
            unreadCount: sender === 'client' ? c.unreadCount + 1 : c.unreadCount,
          }
          : c
      ),
    }));
  },

  // Social Post Actions
  addSocialPost: (post) => {
    const newPost: SocialPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ socialPosts: [...state.socialPosts, newPost] }));
  },

  updateSocialPost: (id, updates) => {
    set((state) => ({
      socialPosts: state.socialPosts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  },

  deleteSocialPost: (id) => {
    set((state) => ({ socialPosts: state.socialPosts.filter((p) => p.id !== id) }));
  },

  // Team User Actions
  addTeamUser: (user) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ teamUsers: [...state.teamUsers, newUser] }));
  },

  updateTeamUser: (id, updates) => {
    set((state) => ({
      teamUsers: state.teamUsers.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    }));
  },

  deleteTeamUser: (id) => {
    set((state) => ({ teamUsers: state.teamUsers.filter((u) => u.id !== id) }));
  },

  // API Token Actions
  addApiToken: (token) => {
    const newToken: ApiToken = {
      ...token,
      id: `token-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ apiTokens: [...state.apiTokens, newToken] }));
  },

  updateApiToken: (id, updates) => {
    set((state) => ({
      apiTokens: state.apiTokens.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  },

  deleteApiToken: (id) => {
    set((state) => ({ apiTokens: state.apiTokens.filter((t) => t.id !== id) }));
  },

  // Activity Actions
  addActivity: (activity) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({ activities: [newActivity, ...state.activities] }));
  },

  // UI Actions
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  incrementActiveRequests: () => {
    set((state) => ({ activeRequests: state.activeRequests + 1 }));
  },

  decrementActiveRequests: () => {
    set((state) => ({ activeRequests: Math.max(0, state.activeRequests - 1) }));
  },

  // Stats
  getPlatformStats: (teamId) => {
    return mockPlatformStats[teamId] || {
      totalBids: 0,
      successfulBids: 0,
      totalEarnings: 0,
      activeProjects: 0,
      completedProjects: 0,
      averageRating: 0,
    };
  },

  getUnreadMessageCount: () => {
    return get().conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  },
}));
