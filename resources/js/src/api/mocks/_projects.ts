export type ProjectStatus = 'bidding' | 'active' | 'in_review' | 'completed';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Project {
  id: string;
  teamId: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  platform: 'upwork' | 'fiverr' | 'freelancer' | 'direct';
  status: ProjectStatus;
  priority: ProjectPriority;
  budget: number;
  deadline?: string;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
  progress: number;
  tasks: ProjectTask[];
  conversationId?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    teamId: 'team-1',
    title: 'E-commerce Platform Development',
    description: 'Build a full-featured e-commerce platform with React and Node.js. Includes payment integration, inventory management, and admin dashboard.',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@techcorp.com',
    platform: 'upwork',
    status: 'active',
    priority: 'high',
    budget: 15000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    assignedTo: ['user-1', 'user-2'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    progress: 45,
    conversationId: 'conv-1',
    tasks: [
      { id: 'task-1', title: 'Setup project structure', completed: true },
      { id: 'task-2', title: 'Design database schema', completed: true },
      { id: 'task-3', title: 'Implement authentication', completed: true },
      { id: 'task-4', title: 'Build product catalog', completed: false },
      { id: 'task-5', title: 'Payment integration', completed: false },
      { id: 'task-6', title: 'Admin dashboard', completed: false },
    ],
  },
  {
    id: 'proj-2',
    teamId: 'team-1',
    title: 'AI Chatbot Integration',
    description: 'Integrate an AI-powered chatbot into existing customer support system.',
    clientName: 'Michael Chen',
    clientEmail: 'michael@innovate.io',
    platform: 'fiverr',
    status: 'bidding',
    priority: 'medium',
    budget: 5000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    assignedTo: ['user-1'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    progress: 0,
    conversationId: 'conv-2',
    tasks: [
      { id: 'task-7', title: 'Requirements gathering', completed: false },
      { id: 'task-8', title: 'API integration design', completed: false },
    ],
  },
  {
    id: 'proj-3',
    teamId: 'team-1',
    title: 'Mobile App Development',
    description: 'React Native app for iOS and Android with real-time features.',
    clientName: 'Emma Williams',
    clientEmail: 'emma@startupx.com',
    platform: 'upwork',
    status: 'in_review',
    priority: 'high',
    budget: 25000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    assignedTo: ['user-2', 'user-3'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    progress: 90,
    conversationId: 'conv-3',
    tasks: [
      { id: 'task-9', title: 'UI/UX Design', completed: true },
      { id: 'task-10', title: 'Core functionality', completed: true },
      { id: 'task-11', title: 'Push notifications', completed: true },
      { id: 'task-12', title: 'Final testing', completed: false },
    ],
  },
  {
    id: 'proj-4',
    teamId: 'team-1',
    title: 'Dashboard Analytics Tool',
    description: 'Build a comprehensive analytics dashboard with data visualization.',
    clientName: 'David Martinez',
    clientEmail: 'david@analytics.co',
    platform: 'direct',
    status: 'completed',
    priority: 'low',
    budget: 8000,
    assignedTo: ['user-3'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    progress: 100,
    tasks: [
      { id: 'task-13', title: 'Data pipeline setup', completed: true },
      { id: 'task-14', title: 'Chart components', completed: true },
      { id: 'task-15', title: 'Export functionality', completed: true },
    ],
  },
  {
    id: 'proj-5',
    teamId: 'team-1',
    title: 'API Development for SaaS',
    description: 'RESTful API development with comprehensive documentation.',
    clientName: 'Lisa Park',
    clientEmail: 'lisa@saascompany.com',
    platform: 'freelancer',
    status: 'bidding',
    priority: 'urgent',
    budget: 12000,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    assignedTo: ['user-1'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    progress: 0,
    tasks: [],
  },
  {
    id: 'proj-6',
    teamId: 'team-1',
    title: 'WordPress Plugin Development',
    description: 'Custom WordPress plugin for membership management.',
    clientName: 'Robert Brown',
    clientEmail: 'robert@wpsite.com',
    platform: 'fiverr',
    status: 'active',
    priority: 'medium',
    budget: 3500,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    assignedTo: ['user-2'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    progress: 30,
    tasks: [
      { id: 'task-16', title: 'Plugin architecture', completed: true },
      { id: 'task-17', title: 'User management', completed: false },
      { id: 'task-18', title: 'Payment integration', completed: false },
    ],
  },
  {
    id: 'proj-7',
    teamId: 'team-2',
    title: 'Social Media Marketing Campaign',
    description: 'Full social media marketing campaign for product launch.',
    clientName: 'Jennifer Lee',
    clientEmail: 'jennifer@brand.com',
    platform: 'upwork',
    status: 'active',
    priority: 'high',
    budget: 7500,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    assignedTo: ['user-4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    progress: 60,
    tasks: [
      { id: 'task-19', title: 'Content strategy', completed: true },
      { id: 'task-20', title: 'Create content calendar', completed: true },
      { id: 'task-21', title: 'Design assets', completed: false },
    ],
  },
];

export function getProjectsByTeam(teamId: string): Project[] {
  return mockProjects.filter(p => p.teamId === teamId);
}

export function getProjectsForUser(userId: string): Project[] {
  return mockProjects.filter(p => p.assignedTo.includes(userId));
}

export function getProjectById(projectId: string): Project | undefined {
  return mockProjects.find(p => p.id === projectId);
}

export function getProjectsByStatus(teamId: string, status: ProjectStatus): Project[] {
  return mockProjects.filter(p => p.teamId === teamId && p.status === status);
}
