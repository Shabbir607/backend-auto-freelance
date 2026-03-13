export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hourlyRate: number;
  rating: number;
  totalJobs: number;
  totalEarnings: number;
  skills: string[];
  bio: string;
  location: string;
  availability: 'available' | 'busy' | 'unavailable';
  responseTime: string;
  languages: string[];
}

export const mockFreelancers: Freelancer[] = [
  {
    id: 'fl-1',
    name: 'Alex Morgan',
    title: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    hourlyRate: 85,
    rating: 4.9,
    totalJobs: 156,
    totalEarnings: 245000,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    bio: 'Senior full-stack developer with 8+ years of experience building scalable web applications.',
    location: 'San Francisco, USA',
    availability: 'available',
    responseTime: '< 1 hour',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'fl-2',
    name: 'Sarah Chen',
    title: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    hourlyRate: 75,
    rating: 5.0,
    totalJobs: 203,
    totalEarnings: 312000,
    skills: ['Figma', 'UI Design', 'UX Research', 'Design Systems', 'Prototyping'],
    bio: 'Award-winning designer specializing in creating beautiful, user-centered digital experiences.',
    location: 'Toronto, Canada',
    availability: 'busy',
    responseTime: '< 2 hours',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'fl-3',
    name: 'Mike Johnson',
    title: 'Mobile Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    hourlyRate: 90,
    rating: 4.8,
    totalJobs: 89,
    totalEarnings: 178000,
    skills: ['React Native', 'iOS', 'Android', 'Flutter', 'Firebase'],
    bio: 'Mobile app specialist with expertise in cross-platform development and native iOS/Android.',
    location: 'London, UK',
    availability: 'available',
    responseTime: '< 30 minutes',
    languages: ['English'],
  },
  {
    id: 'fl-4',
    name: 'Emma Davis',
    title: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    hourlyRate: 95,
    rating: 4.9,
    totalJobs: 124,
    totalEarnings: 289000,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL'],
    bio: 'Data scientist helping businesses make data-driven decisions with ML and AI solutions.',
    location: 'Berlin, Germany',
    availability: 'available',
    responseTime: '< 1 hour',
    languages: ['English', 'German'],
  },
  {
    id: 'fl-5',
    name: 'David Kim',
    title: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    hourlyRate: 100,
    rating: 4.7,
    totalJobs: 67,
    totalEarnings: 198000,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    bio: 'DevOps expert specializing in cloud infrastructure, automation, and scalable architectures.',
    location: 'Seoul, South Korea',
    availability: 'busy',
    responseTime: '< 3 hours',
    languages: ['English', 'Korean'],
  },
  {
    id: 'fl-6',
    name: 'Lisa Wang',
    title: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    hourlyRate: 80,
    rating: 4.8,
    totalJobs: 112,
    totalEarnings: 215000,
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis'],
    bio: 'Backend specialist focused on building robust APIs and microservices architectures.',
    location: 'Singapore',
    availability: 'available',
    responseTime: '< 1 hour',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'fl-7',
    name: 'James Wilson',
    title: 'Blockchain Developer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    hourlyRate: 120,
    rating: 4.7,
    totalJobs: 45,
    totalEarnings: 180000,
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi'],
    bio: 'Blockchain expert specializing in DeFi protocols and smart contract development.',
    location: 'Miami, USA',
    availability: 'busy',
    responseTime: '< 4 hours',
    languages: ['English'],
  },
  {
    id: 'fl-8',
    name: 'Priya Sharma',
    title: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    hourlyRate: 55,
    rating: 4.9,
    totalJobs: 178,
    totalEarnings: 145000,
    skills: ['Selenium', 'Cypress', 'Jest', 'API Testing', 'Performance Testing'],
    bio: 'Quality assurance specialist ensuring bug-free releases through comprehensive testing.',
    location: 'Mumbai, India',
    availability: 'available',
    responseTime: '< 2 hours',
    languages: ['English', 'Hindi'],
  },
  {
    id: 'fl-9',
    name: 'Carlos Rodriguez',
    title: 'WordPress Expert',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&q=80',
    hourlyRate: 45,
    rating: 4.6,
    totalJobs: 234,
    totalEarnings: 125000,
    skills: ['WordPress', 'PHP', 'WooCommerce', 'Elementor', 'SEO'],
    bio: 'WordPress developer with expertise in custom themes, plugins, and e-commerce solutions.',
    location: 'Mexico City, Mexico',
    availability: 'available',
    responseTime: '< 1 hour',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'fl-10',
    name: 'Anna Kowalski',
    title: 'Technical Writer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    hourlyRate: 50,
    rating: 5.0,
    totalJobs: 156,
    totalEarnings: 98000,
    skills: ['Technical Writing', 'API Documentation', 'User Guides', 'Markdown', 'Git'],
    bio: 'Technical writer creating clear, comprehensive documentation for software products.',
    location: 'Warsaw, Poland',
    availability: 'available',
    responseTime: '< 2 hours',
    languages: ['English', 'Polish', 'German'],
  },
];

export function getFreelancersBySkill(skill: string): Freelancer[] {
  return mockFreelancers.filter(f => f.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
}

export function getFreelancersByRate(min: number, max: number): Freelancer[] {
  return mockFreelancers.filter(f => f.hourlyRate >= min && f.hourlyRate <= max);
}

export function getAvailableFreelancers(): Freelancer[] {
  return mockFreelancers.filter(f => f.availability === 'available');
}
