export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'project' | 'meeting' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
  userId?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'mention',
    title: '@Sarah mentioned you',
    description: 'in #proj-ecommerce: "Can you review the API changes?"',
    timestamp: "2024-03-20T09:55:00Z",
    read: false,
    link: '/app/projects/proj-1',
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New client message',
    description: 'John Doe: "Thanks! When can you start?"',
    timestamp: "2024-03-20T09:45:00Z",
    read: false,
    link: '/app/crm',
  },
  {
    id: 'notif-3',
    type: 'project',
    title: 'Project assigned',
    description: 'You have been assigned to "Mobile App Redesign"',
    timestamp: "2024-03-20T09:00:00Z",
    read: false,
    link: '/app/projects/proj-3',
  },
  {
    id: 'notif-4',
    type: 'meeting',
    title: 'Meeting in 30 minutes',
    description: 'Sprint Planning with the team',
    timestamp: "2024-03-20T08:30:00Z",
    read: true,
    link: '/app/calendar',
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Auto-bid successful',
    description: 'Bid placed on "React Dashboard Development" - $2,500',
    timestamp: "2024-03-20T08:00:00Z",
    read: true,
  },
];

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter(n => !n.read);
}

export function getUnreadCount(): number {
  return mockNotifications.filter(n => !n.read).length;
}
