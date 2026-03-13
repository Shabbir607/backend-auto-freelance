export interface Job {
  id: string;
  title: string;
  description: string;
  platform: 'upwork' | 'fiverr' | 'freelancer' | 'toptal';
  budgetMin: number;
  budgetMax: number;
  skills: string[];
  postedAt: string;
  clientName: string;
  clientRating: number;
  clientCountry: string;
  proposals: number;
  duration: string;
  experienceLevel: 'entry' | 'intermediate' | 'expert';
}

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'React Dashboard Development with TypeScript',
    description: 'Looking for an experienced React developer to build a comprehensive admin dashboard. Must have experience with TypeScript, Tailwind CSS, and data visualization libraries.',
    platform: 'upwork',
    budgetMin: 2500,
    budgetMax: 5000,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    clientName: 'TechCorp Inc.',
    clientRating: 4.9,
    clientCountry: 'United States',
    proposals: 12,
    duration: '1-3 months',
    experienceLevel: 'expert',
  },
  {
    id: 'job-2',
    title: 'AI Chatbot Integration for E-commerce',
    description: 'Need a developer to integrate an AI-powered chatbot into our Shopify store. Experience with OpenAI API and Node.js required.',
    platform: 'fiverr',
    budgetMin: 3000,
    budgetMax: 7000,
    skills: ['Python', 'OpenAI', 'Node.js', 'Shopify'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    clientName: 'ShopSmart',
    clientRating: 4.7,
    clientCountry: 'Canada',
    proposals: 8,
    duration: '2-4 weeks',
    experienceLevel: 'intermediate',
  },
  {
    id: 'job-3',
    title: 'Mobile App Development - React Native',
    description: 'Building a cross-platform mobile app for iOS and Android. Features include real-time messaging, push notifications, and payment integration.',
    platform: 'upwork',
    budgetMin: 10000,
    budgetMax: 15000,
    skills: ['React Native', 'Firebase', 'Stripe', 'Redux'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    clientName: 'StartupX',
    clientRating: 5.0,
    clientCountry: 'United Kingdom',
    proposals: 25,
    duration: '3-6 months',
    experienceLevel: 'expert',
  },
  {
    id: 'job-4',
    title: 'WordPress Plugin Development',
    description: 'Custom WordPress plugin for membership management with payment gateway integration.',
    platform: 'freelancer',
    budgetMin: 1500,
    budgetMax: 3000,
    skills: ['PHP', 'WordPress', 'MySQL', 'JavaScript'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    clientName: 'BlogMaster',
    clientRating: 4.5,
    clientCountry: 'Australia',
    proposals: 15,
    duration: '2-4 weeks',
    experienceLevel: 'intermediate',
  },
  {
    id: 'job-5',
    title: 'Full-Stack SaaS Application',
    description: 'Building a complete SaaS platform with user authentication, subscription billing, and admin dashboard.',
    platform: 'toptal',
    budgetMin: 20000,
    budgetMax: 35000,
    skills: ['Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    clientName: 'Enterprise Solutions',
    clientRating: 4.8,
    clientCountry: 'Germany',
    proposals: 5,
    duration: '4-6 months',
    experienceLevel: 'expert',
  },
  {
    id: 'job-6',
    title: 'UI/UX Design for Mobile App',
    description: 'Need a talented designer to create modern UI/UX for a fitness tracking app. Deliverables include wireframes, mockups, and design system.',
    platform: 'fiverr',
    budgetMin: 2000,
    budgetMax: 4000,
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    clientName: 'FitLife',
    clientRating: 4.6,
    clientCountry: 'United States',
    proposals: 30,
    duration: '2-3 weeks',
    experienceLevel: 'intermediate',
  },
  {
    id: 'job-7',
    title: 'Backend API Development with Python',
    description: 'Looking for a Python developer to build RESTful APIs using FastAPI. Must have experience with PostgreSQL and Redis.',
    platform: 'upwork',
    budgetMin: 4000,
    budgetMax: 8000,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    clientName: 'DataFlow Inc',
    clientRating: 4.8,
    clientCountry: 'Netherlands',
    proposals: 18,
    duration: '2-3 months',
    experienceLevel: 'expert',
  },
  {
    id: 'job-8',
    title: 'Vue.js Frontend Developer',
    description: 'Need a Vue.js expert to build a customer portal with real-time features. Experience with Vuex and Vue Router required.',
    platform: 'freelancer',
    budgetMin: 3500,
    budgetMax: 6000,
    skills: ['Vue.js', 'Vuex', 'TypeScript', 'Tailwind CSS'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    clientName: 'CloudServe',
    clientRating: 4.5,
    clientCountry: 'Singapore',
    proposals: 22,
    duration: '6-8 weeks',
    experienceLevel: 'intermediate',
  },
  {
    id: 'job-9',
    title: 'Machine Learning Model Development',
    description: 'Build a recommendation engine using collaborative filtering. Experience with TensorFlow or PyTorch required.',
    platform: 'toptal',
    budgetMin: 15000,
    budgetMax: 25000,
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    clientName: 'AI Solutions',
    clientRating: 5.0,
    clientCountry: 'United States',
    proposals: 8,
    duration: '3-4 months',
    experienceLevel: 'expert',
  },
  {
    id: 'job-10',
    title: 'Shopify Store Customization',
    description: 'Customize an existing Shopify store with custom theme modifications and app integrations.',
    platform: 'fiverr',
    budgetMin: 800,
    budgetMax: 1500,
    skills: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    clientName: 'Fashion Forward',
    clientRating: 4.3,
    clientCountry: 'France',
    proposals: 45,
    duration: '1-2 weeks',
    experienceLevel: 'entry',
  },
];

export function getJobsByPlatform(platform: string): Job[] {
  if (platform === 'all') return mockJobs;
  return mockJobs.filter(j => j.platform === platform);
}

export function getJobsBySkill(skill: string): Job[] {
  return mockJobs.filter(j => j.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
}

export function getJobsByBudget(min: number, max: number): Job[] {
  return mockJobs.filter(j => j.budgetMin >= min && j.budgetMax <= max);
}
