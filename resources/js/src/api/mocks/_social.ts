export type SocialPlatform = 'twitter' | 'facebook' | 'linkedin' | 'instagram';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface SocialPost {
  id: string;
  teamId: string;
  content: string;
  platforms: SocialPlatform[];
  scheduledFor: string;
  status: PostStatus;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
  publishedAt?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface SocialAccount {
  id: string;
  teamId: string;
  platform: SocialPlatform;
  accountName: string;
  username: string;
  isConnected: boolean;
  followers: number;
  avatar?: string;
}

export const mockSocialPosts: SocialPost[] = [
  {
    id: 'post-1',
    teamId: 'team-1',
    content: '🚀 Excited to announce our latest project launch! We\'ve been working hard on this e-commerce platform and it\'s finally live. Check it out! #webdev #ecommerce #react',
    platforms: ['twitter', 'linkedin'],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: 'scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    createdBy: 'user-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'post-2',
    teamId: 'team-1',
    content: '💡 Pro tip: Always validate user input on both client and server side. Security should never be an afterthought! #coding #security #bestpractices',
    platforms: ['twitter', 'facebook', 'linkedin'],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: 'scheduled',
    createdBy: 'user-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'post-3',
    teamId: 'team-1',
    content: 'Looking for a skilled React developer? Our team specializes in building scalable web applications. DM us for a free consultation! 📱💻',
    platforms: ['twitter', 'linkedin'],
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: 'published',
    createdBy: 'admin-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
    },
  },
  {
    id: 'post-4',
    teamId: 'team-1',
    content: '🎉 Just completed another successful project! Thank you to our amazing client for the trust. Here\'s to many more collaborations!',
    platforms: ['facebook', 'instagram'],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: 'draft',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    createdBy: 'user-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'post-5',
    teamId: 'team-1',
    content: 'New blog post: "10 Tips for Better Code Reviews" - Learn how to give and receive feedback effectively. Link in bio! 📝',
    platforms: ['twitter'],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    status: 'scheduled',
    createdBy: 'user-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'post-6',
    teamId: 'team-2',
    content: '📈 Digital marketing trends for 2024: AI-powered content, short-form video, and personalized experiences. Are you ready?',
    platforms: ['twitter', 'linkedin', 'facebook'],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    status: 'scheduled',
    createdBy: 'user-4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

export const mockSocialAccounts: SocialAccount[] = [
  {
    id: 'social-1',
    teamId: 'team-1',
    platform: 'twitter',
    accountName: 'ProDev Solutions',
    username: '@prodev_solutions',
    isConnected: true,
    followers: 12500,
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80',
  },
  {
    id: 'social-2',
    teamId: 'team-1',
    platform: 'linkedin',
    accountName: 'ProDev Solutions',
    username: 'prodev-solutions',
    isConnected: true,
    followers: 8200,
  },
  {
    id: 'social-3',
    teamId: 'team-1',
    platform: 'facebook',
    accountName: 'ProDev Solutions',
    username: 'prodevsolutions',
    isConnected: true,
    followers: 5600,
  },
  {
    id: 'social-4',
    teamId: 'team-1',
    platform: 'instagram',
    accountName: 'ProDev Solutions',
    username: '@prodev.solutions',
    isConnected: false,
    followers: 0,
  },
  {
    id: 'social-5',
    teamId: 'team-2',
    platform: 'twitter',
    accountName: 'Digital Nomads',
    username: '@digitalnomads_agency',
    isConnected: true,
    followers: 25000,
  },
];

export function getSocialPostsByTeam(teamId: string): SocialPost[] {
  return mockSocialPosts.filter(p => p.teamId === teamId);
}

export function getSocialAccountsByTeam(teamId: string): SocialAccount[] {
  return mockSocialAccounts.filter(a => a.teamId === teamId);
}

export function getScheduledPosts(teamId: string): SocialPost[] {
  return mockSocialPosts.filter(p => p.teamId === teamId && p.status === 'scheduled');
}

export function getPostsByDate(teamId: string, date: Date): SocialPost[] {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return mockSocialPosts.filter(p => {
    const postDate = new Date(p.scheduledFor);
    return p.teamId === teamId && postDate >= startOfDay && postDate <= endOfDay;
  });
}
