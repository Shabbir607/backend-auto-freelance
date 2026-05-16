import { c as create, r as reactExports, j as jsxRuntimeExports, d as distExports, t as twMerge, a as clsx, L as LoaderCircle, M as Minus, P as Plus, T as Twitter, G as Github, b as Linkedin, e as Mail, C as ChevronRight, A as ArrowRight, f as Globe, g as MapPin, h as Phone, S as Slot, i as cva, k as ChevronDown, X, l as Menu, B as BarChart3, m as Bot, n as Box, o as Cpu, F as FileCode, p as FileJson, q as GitBranch, s as MessageSquare, u as Share2, v as ShieldCheck, w as Terminal, U as Users, W as Workflow, Z as Zap, x as Loader, y as Search, z as Filter, D as Star, E as LayoutGrid, H as Clock, I as Eye, J as Layers, K as Database, N as FileText, O as Smartphone, Q as BarChart, R as Settings, V as Bell, Y as Cloud, _ as Code, $ as Server, a0 as Calendar, a1 as formatDistanceToNow, a2 as Check, a3 as Download, a4 as Copy, a5 as ExternalLink, a6 as React2, a7 as Helmet, a8 as BookOpen, a9 as ArrowLeft, aa as User, ab as format, ac as Newspaper, ad as Tag, ae as Sparkles, af as WandSparkles, ag as Overlay, ah as Portal, ai as Content, aj as Close, ak as Cross2Icon, al as Title, am as Description, an as Root, ao as TrendingUp, ap as Handle$1, aq as Position, ar as Facebook, as as MessageCircle, at as Slack, au as Send, av as ReactFlowProvider, aw as useReactFlow, ax as ReactFlow, ay as Background$1, az as CircleCheck, aA as applyNodeChanges, aB as applyEdgeChanges, aC as MarkerType, aD as Controls$1, aE as MiniMap$1, aF as Panel, aG as Maximize2, aH as Root$1, aI as Image, aJ as Fallback, aK as LayoutDashboard, aL as CircleHelp, aM as ChevronLeft, aN as Shield, aO as LogOut, aP as Root$2, aQ as Viewport, aR as Corner, aS as ScrollAreaScrollbar, aT as ScrollAreaThumb, aU as Root$3, aV as Thumb, aW as useTranslation, aX as Sun, aY as Moon, aZ as CircleAlert, a_ as FolderKanban, a$ as TriangleAlert, b0 as Info, b1 as CircleCheckBig, b2 as server_nodeExports, b3 as HelmetProvider, b4 as StaticRouter } from "./assets/vendor-oSjIcCqY.js";
import "stream";
import "util";
const mockUsers = [
  {
    id: "superadmin-1",
    email: "superadmin@nexus.ai",
    name: "System Administrator",
    role: "superadmin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "admin-1",
    email: "admin@teamone.com",
    name: "Alex Morgan",
    role: "admin",
    teamId: "team-1",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "admin-2",
    email: "admin@teamtwo.com",
    name: "Sarah Chen",
    role: "admin",
    teamId: "team-2",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    createdAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "user-1",
    email: "user@teamone.com",
    name: "Jordan Smith",
    role: "user",
    teamId: "team-1",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    createdAt: "2024-02-10T00:00:00Z"
  },
  {
    id: "user-2",
    email: "mike@teamone.com",
    name: "Mike Johnson",
    role: "user",
    teamId: "team-1",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80",
    createdAt: "2024-02-15T00:00:00Z"
  },
  {
    id: "user-3",
    email: "emma@teamone.com",
    name: "Emma Davis",
    role: "user",
    teamId: "team-1",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    createdAt: "2024-02-20T00:00:00Z"
  },
  {
    id: "user-4",
    email: "lisa@teamtwo.com",
    name: "Lisa Wang",
    role: "user",
    teamId: "team-2",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    createdAt: "2024-03-01T00:00:00Z"
  }
];
const mockTeams = [
  {
    id: "team-1",
    name: "ProDev Solutions",
    adminId: "admin-1",
    plan: "pro",
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "team-2",
    name: "Digital Nomads Agency",
    adminId: "admin-2",
    plan: "enterprise",
    createdAt: "2024-02-01T00:00:00Z"
  }
];
function getUsersByTeam(teamId) {
  return mockUsers.filter((u) => u.teamId === teamId);
}
function getTeamById(teamId) {
  return mockTeams.find((t) => t.id === teamId);
}
const mockFreelanceAccounts = [
  {
    id: "acc-1",
    teamId: "team-1",
    platform: "upwork",
    accountName: "ProDev Solutions",
    username: "prodev_alex",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 500,
    bidCount: 156,
    successRate: 34,
    aiPrompt: "Focus on web development projects with React and Node.js. Budget range: $1000-$5000. Prioritize long-term contracts.",
    proxyId: "proxy-1",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 15).toISOString(),
    assignedTo: ["user-1", "user-2"]
  },
  {
    id: "acc-2",
    teamId: "team-1",
    platform: "upwork",
    accountName: "AI Automation Expert",
    username: "ai_expert_pro",
    isActive: true,
    autoBidEnabled: false,
    dailyBudget: 300,
    bidCount: 89,
    successRate: 41,
    aiPrompt: "Target AI/ML automation projects. Minimum budget: $2000. Focus on Python and TensorFlow.",
    proxyId: "proxy-2",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 45).toISOString(),
    assignedTo: ["user-1"]
  },
  {
    id: "acc-3",
    teamId: "team-1",
    platform: "fiverr",
    accountName: "WebFlow Master",
    username: "webflow_master",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 200,
    bidCount: 234,
    successRate: 52,
    aiPrompt: "Focus on Webflow and no-code solutions. Quick turnaround projects preferred.",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    assignedTo: ["user-2", "user-3"]
  },
  {
    id: "acc-4",
    teamId: "team-1",
    platform: "freelancer",
    accountName: "Full Stack Dev",
    username: "fullstack_dev",
    isActive: false,
    autoBidEnabled: false,
    dailyBudget: 400,
    bidCount: 67,
    successRate: 28,
    lastActivity: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString(),
    assignedTo: ["user-3"]
  },
  {
    id: "acc-5",
    teamId: "team-1",
    platform: "toptal",
    accountName: "Enterprise Solutions",
    username: "enterprise_dev",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 1e3,
    bidCount: 45,
    successRate: 67,
    aiPrompt: "Target enterprise-level projects. Minimum $10,000 budget. Focus on scalable architectures.",
    proxyId: "proxy-3",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
    assignedTo: ["user-1"]
  },
  {
    id: "acc-6",
    teamId: "team-2",
    platform: "upwork",
    accountName: "Digital Nomads Main",
    username: "digitalnomads",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 750,
    bidCount: 312,
    successRate: 45,
    aiPrompt: "Focus on digital marketing and content creation projects.",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 10).toISOString(),
    assignedTo: ["user-4"]
  }
];
const mockProxies = [
  {
    id: "proxy-1",
    teamId: "team-1",
    ip: "192.168.1.100",
    port: 8080,
    username: "proxy_user_1",
    status: "active",
    assignedAccounts: ["acc-1"],
    location: "United States",
    lastChecked: new Date(Date.now() - 1e3 * 60 * 5).toISOString()
  },
  {
    id: "proxy-2",
    teamId: "team-1",
    ip: "192.168.1.101",
    port: 8080,
    username: "proxy_user_2",
    status: "active",
    assignedAccounts: ["acc-2"],
    location: "United Kingdom",
    lastChecked: new Date(Date.now() - 1e3 * 60 * 3).toISOString()
  },
  {
    id: "proxy-3",
    teamId: "team-1",
    ip: "192.168.1.102",
    port: 8080,
    username: "proxy_user_3",
    status: "error",
    assignedAccounts: ["acc-5"],
    location: "Germany",
    lastChecked: new Date(Date.now() - 1e3 * 60 * 60).toISOString()
  },
  {
    id: "proxy-4",
    teamId: "team-2",
    ip: "10.0.0.50",
    port: 3128,
    username: "dn_proxy",
    status: "active",
    assignedAccounts: [],
    location: "Canada",
    lastChecked: new Date(Date.now() - 1e3 * 60 * 2).toISOString()
  }
];
function getAccountsByTeam(teamId) {
  return mockFreelanceAccounts.filter((a) => a.teamId === teamId);
}
function getAccountsForUser(userId) {
  return mockFreelanceAccounts.filter((a) => a.assignedTo?.includes(userId));
}
function getProxiesByTeam(teamId) {
  return mockProxies.filter((p) => p.teamId === teamId);
}
const mockProjects = [
  {
    id: "proj-1",
    teamId: "team-1",
    title: "E-commerce Platform Development",
    description: "Build a full-featured e-commerce platform with React and Node.js. Includes payment integration, inventory management, and admin dashboard.",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@techcorp.com",
    platform: "upwork",
    status: "active",
    priority: "high",
    budget: 15e3,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30).toISOString(),
    assignedTo: ["user-1", "user-2"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
    progress: 45,
    conversationId: "conv-1",
    tasks: [
      { id: "task-1", title: "Setup project structure", completed: true },
      { id: "task-2", title: "Design database schema", completed: true },
      { id: "task-3", title: "Implement authentication", completed: true },
      { id: "task-4", title: "Build product catalog", completed: false },
      { id: "task-5", title: "Payment integration", completed: false },
      { id: "task-6", title: "Admin dashboard", completed: false }
    ]
  },
  {
    id: "proj-2",
    teamId: "team-1",
    title: "AI Chatbot Integration",
    description: "Integrate an AI-powered chatbot into existing customer support system.",
    clientName: "Michael Chen",
    clientEmail: "michael@innovate.io",
    platform: "fiverr",
    status: "bidding",
    priority: "medium",
    budget: 5e3,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 14).toISOString(),
    assignedTo: ["user-1"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
    progress: 0,
    conversationId: "conv-2",
    tasks: [
      { id: "task-7", title: "Requirements gathering", completed: false },
      { id: "task-8", title: "API integration design", completed: false }
    ]
  },
  {
    id: "proj-3",
    teamId: "team-1",
    title: "Mobile App Development",
    description: "React Native app for iOS and Android with real-time features.",
    clientName: "Emma Williams",
    clientEmail: "emma@startupx.com",
    platform: "upwork",
    status: "in_review",
    priority: "high",
    budget: 25e3,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7).toISOString(),
    assignedTo: ["user-2", "user-3"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60 * 5).toISOString(),
    progress: 90,
    conversationId: "conv-3",
    tasks: [
      { id: "task-9", title: "UI/UX Design", completed: true },
      { id: "task-10", title: "Core functionality", completed: true },
      { id: "task-11", title: "Push notifications", completed: true },
      { id: "task-12", title: "Final testing", completed: false }
    ]
  },
  {
    id: "proj-4",
    teamId: "team-1",
    title: "Dashboard Analytics Tool",
    description: "Build a comprehensive analytics dashboard with data visualization.",
    clientName: "David Martinez",
    clientEmail: "david@analytics.co",
    platform: "direct",
    status: "completed",
    priority: "low",
    budget: 8e3,
    assignedTo: ["user-3"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 5).toISOString(),
    progress: 100,
    tasks: [
      { id: "task-13", title: "Data pipeline setup", completed: true },
      { id: "task-14", title: "Chart components", completed: true },
      { id: "task-15", title: "Export functionality", completed: true }
    ]
  },
  {
    id: "proj-5",
    teamId: "team-1",
    title: "API Development for SaaS",
    description: "RESTful API development with comprehensive documentation.",
    clientName: "Lisa Park",
    clientEmail: "lisa@saascompany.com",
    platform: "freelancer",
    status: "bidding",
    priority: "urgent",
    budget: 12e3,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 21).toISOString(),
    assignedTo: ["user-1"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    progress: 0,
    tasks: []
  },
  {
    id: "proj-6",
    teamId: "team-1",
    title: "WordPress Plugin Development",
    description: "Custom WordPress plugin for membership management.",
    clientName: "Robert Brown",
    clientEmail: "robert@wpsite.com",
    platform: "fiverr",
    status: "active",
    priority: "medium",
    budget: 3500,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 10).toISOString(),
    assignedTo: ["user-2"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60 * 12).toISOString(),
    progress: 30,
    tasks: [
      { id: "task-16", title: "Plugin architecture", completed: true },
      { id: "task-17", title: "User management", completed: false },
      { id: "task-18", title: "Payment integration", completed: false }
    ]
  },
  {
    id: "proj-7",
    teamId: "team-2",
    title: "Social Media Marketing Campaign",
    description: "Full social media marketing campaign for product launch.",
    clientName: "Jennifer Lee",
    clientEmail: "jennifer@brand.com",
    platform: "upwork",
    status: "active",
    priority: "high",
    budget: 7500,
    deadline: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 14).toISOString(),
    assignedTo: ["user-4"],
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1e3 * 60 * 60 * 3).toISOString(),
    progress: 60,
    tasks: [
      { id: "task-19", title: "Content strategy", completed: true },
      { id: "task-20", title: "Create content calendar", completed: true },
      { id: "task-21", title: "Design assets", completed: false }
    ]
  }
];
function getProjectsByTeam(teamId) {
  return mockProjects.filter((p) => p.teamId === teamId);
}
function getProjectsForUser(userId) {
  return mockProjects.filter((p) => p.assignedTo.includes(userId));
}
const mockConversations$1 = [
  {
    id: "conv-1",
    teamId: "team-1",
    clientName: "Sarah Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    clientEmail: "sarah@techcorp.com",
    platform: "upwork",
    lastMessage: "Thanks! When can you start on the payment integration?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    unreadCount: 2,
    projectId: "proj-1",
    projectTitle: "E-commerce Platform Development",
    assignedTo: ["user-1", "user-2"],
    status: "active",
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        sender: "client",
        content: "Hi, I saw your proposal for the e-commerce project. Your portfolio looks impressive!",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString(),
        read: true
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        sender: "user",
        content: "Hello Sarah! Thank you for reaching out. I'd be happy to discuss the project details with you. I have extensive experience with e-commerce platforms.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 23).toISOString(),
        read: true
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        sender: "client",
        content: "Great! Can you handle both frontend and backend? We need React for the frontend and Node.js for the backend.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 20).toISOString(),
        read: true
      },
      {
        id: "msg-4",
        conversationId: "conv-1",
        sender: "user",
        content: "Absolutely! I specialize in full-stack development with React and Node.js. I can also set up the payment integration with Stripe.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 18).toISOString(),
        read: true
      },
      {
        id: "msg-5",
        conversationId: "conv-1",
        sender: "client",
        content: "Perfect! I've reviewed your proposal and I'm ready to move forward. Let's start with the project.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
        read: true
      },
      {
        id: "msg-6",
        conversationId: "conv-1",
        sender: "user",
        content: "Excellent! I'll start setting up the project structure today. I'll send you the initial wireframes by tomorrow.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 20).toISOString(),
        read: true
      },
      {
        id: "msg-7",
        conversationId: "conv-1",
        sender: "client",
        content: "Thanks! When can you start on the payment integration?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
        read: false
      }
    ]
  },
  {
    id: "conv-2",
    teamId: "team-1",
    clientName: "Michael Chen",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    clientEmail: "michael@innovate.io",
    platform: "fiverr",
    lastMessage: "Could you send me some portfolio examples of chatbot integrations?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 15).toISOString(),
    unreadCount: 1,
    projectId: "proj-2",
    projectTitle: "AI Chatbot Integration",
    assignedTo: ["user-1"],
    status: "active",
    messages: [
      {
        id: "msg-8",
        conversationId: "conv-2",
        sender: "client",
        content: "Hi! I need help integrating an AI chatbot into my website. Do you have experience with this?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
        read: true
      },
      {
        id: "msg-9",
        conversationId: "conv-2",
        sender: "user",
        content: "Hello Michael! Yes, I have extensive experience with AI chatbot integrations. I've worked with OpenAI, Dialogflow, and custom solutions.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
        read: true
      },
      {
        id: "msg-10",
        conversationId: "conv-2",
        sender: "client",
        content: "Could you send me some portfolio examples of chatbot integrations?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 15).toISOString(),
        read: false
      }
    ]
  },
  {
    id: "conv-3",
    teamId: "team-1",
    clientName: "Emma Williams",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    clientEmail: "emma@startupx.com",
    platform: "upwork",
    lastMessage: "The app looks great! Just a few minor tweaks needed on the profile screen.",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    unreadCount: 0,
    projectId: "proj-3",
    projectTitle: "Mobile App Development",
    assignedTo: ["user-2", "user-3"],
    status: "active",
    messages: [
      {
        id: "msg-11",
        conversationId: "conv-3",
        sender: "client",
        content: "I've reviewed the latest build. The app looks great! Just a few minor tweaks needed on the profile screen.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
        read: true
      }
    ]
  },
  {
    id: "conv-4",
    teamId: "team-1",
    clientName: "David Martinez",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    platform: "whatsapp",
    lastMessage: "Can we schedule a call tomorrow to discuss the new requirements?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 120).toISOString(),
    unreadCount: 0,
    assignedTo: ["user-3"],
    status: "active",
    messages: [
      {
        id: "msg-12",
        conversationId: "conv-4",
        sender: "client",
        content: "Hey, got your number from the Fiverr project. Hope that's okay!",
        timestamp: new Date(Date.now() - 1e3 * 60 * 150).toISOString(),
        read: true
      },
      {
        id: "msg-13",
        conversationId: "conv-4",
        sender: "user",
        content: "Hi David! No problem at all. How can I help you?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 140).toISOString(),
        read: true
      },
      {
        id: "msg-14",
        conversationId: "conv-4",
        sender: "client",
        content: "Can we schedule a call tomorrow to discuss the new requirements?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 120).toISOString(),
        read: true
      }
    ]
  },
  {
    id: "conv-5",
    teamId: "team-1",
    clientName: "Lisa Park",
    clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    clientEmail: "lisa@saascompany.com",
    platform: "email",
    lastMessage: "Looking forward to your proposal for the API development project.",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 60 * 3).toISOString(),
    unreadCount: 1,
    projectId: "proj-5",
    projectTitle: "API Development for SaaS",
    assignedTo: ["user-1"],
    status: "active",
    messages: [
      {
        id: "msg-15",
        conversationId: "conv-5",
        sender: "client",
        content: "Hi, I found your profile on Freelancer. We need a comprehensive REST API for our SaaS platform.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 5).toISOString(),
        read: true
      },
      {
        id: "msg-16",
        conversationId: "conv-5",
        sender: "client",
        content: "Looking forward to your proposal for the API development project.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 3).toISOString(),
        read: false
      }
    ]
  },
  {
    id: "conv-6",
    teamId: "team-2",
    clientName: "Jennifer Lee",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    clientEmail: "jennifer@brand.com",
    platform: "upwork",
    lastMessage: "The content calendar looks perfect! Let's proceed with the design phase.",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
    unreadCount: 0,
    projectId: "proj-7",
    projectTitle: "Social Media Marketing Campaign",
    assignedTo: ["user-4"],
    status: "active",
    messages: [
      {
        id: "msg-17",
        conversationId: "conv-6",
        sender: "client",
        content: "The content calendar looks perfect! Let's proceed with the design phase.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
        read: true
      }
    ]
  }
];
function getConversationsByTeam(teamId) {
  return mockConversations$1.filter((c) => c.teamId === teamId);
}
function getConversationsForUser(userId) {
  return mockConversations$1.filter((c) => c.assignedTo?.includes(userId));
}
const mockSocialPosts = [
  {
    id: "post-1",
    teamId: "team-1",
    content: "🚀 Excited to announce our latest project launch! We've been working hard on this e-commerce platform and it's finally live. Check it out! #webdev #ecommerce #react",
    platforms: ["twitter", "linkedin"],
    scheduledFor: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 2).toISOString(),
    status: "scheduled",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString()
  },
  {
    id: "post-2",
    teamId: "team-1",
    content: "💡 Pro tip: Always validate user input on both client and server side. Security should never be an afterthought! #coding #security #bestpractices",
    platforms: ["twitter", "facebook", "linkedin"],
    scheduledFor: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 5).toISOString(),
    status: "scheduled",
    createdBy: "user-2",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 12).toISOString()
  },
  {
    id: "post-3",
    teamId: "team-1",
    content: "Looking for a skilled React developer? Our team specializes in building scalable web applications. DM us for a free consultation! 📱💻",
    platforms: ["twitter", "linkedin"],
    scheduledFor: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 3).toISOString(),
    status: "published",
    createdBy: "admin-1",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 5).toISOString(),
    publishedAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 3).toISOString(),
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8
    }
  },
  {
    id: "post-4",
    teamId: "team-1",
    content: "🎉 Just completed another successful project! Thank you to our amazing client for the trust. Here's to many more collaborations!",
    platforms: ["facebook", "instagram"],
    scheduledFor: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 7).toISOString(),
    status: "draft",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    createdBy: "user-3",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString()
  },
  {
    id: "post-5",
    teamId: "team-1",
    content: 'New blog post: "10 Tips for Better Code Reviews" - Learn how to give and receive feedback effectively. Link in bio! 📝',
    platforms: ["twitter"],
    scheduledFor: new Date(Date.now() + 1e3 * 60 * 60 * 48).toISOString(),
    status: "scheduled",
    createdBy: "user-1",
    createdAt: new Date(Date.now() - 1e3 * 60 * 30).toISOString()
  },
  {
    id: "post-6",
    teamId: "team-2",
    content: "📈 Digital marketing trends for 2024: AI-powered content, short-form video, and personalized experiences. Are you ready?",
    platforms: ["twitter", "linkedin", "facebook"],
    scheduledFor: new Date(Date.now() + 1e3 * 60 * 60 * 24).toISOString(),
    status: "scheduled",
    createdBy: "user-4",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 6).toISOString()
  }
];
const mockSocialAccounts = [
  {
    id: "social-1",
    teamId: "team-1",
    platform: "twitter",
    accountName: "ProDev Solutions",
    username: "@prodev_solutions",
    isConnected: true,
    followers: 12500,
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80"
  },
  {
    id: "social-2",
    teamId: "team-1",
    platform: "linkedin",
    accountName: "ProDev Solutions",
    username: "prodev-solutions",
    isConnected: true,
    followers: 8200
  },
  {
    id: "social-3",
    teamId: "team-1",
    platform: "facebook",
    accountName: "ProDev Solutions",
    username: "prodevsolutions",
    isConnected: true,
    followers: 5600
  },
  {
    id: "social-4",
    teamId: "team-1",
    platform: "instagram",
    accountName: "ProDev Solutions",
    username: "@prodev.solutions",
    isConnected: false,
    followers: 0
  },
  {
    id: "social-5",
    teamId: "team-2",
    platform: "twitter",
    accountName: "Digital Nomads",
    username: "@digitalnomads_agency",
    isConnected: true,
    followers: 25e3
  }
];
function getSocialPostsByTeam(teamId) {
  return mockSocialPosts.filter((p) => p.teamId === teamId);
}
function getSocialAccountsByTeam(teamId) {
  return mockSocialAccounts.filter((a) => a.teamId === teamId);
}
const mockSystemStatus$1 = {
  apiStatus: "operational",
  upworkConnected: true,
  fiverrConnected: true,
  freelancerConnected: true,
  lastSync: new Date(Date.now() - 1e3 * 60 * 2).toISOString()
};
const mockActivities$1 = [
  {
    id: "act-1",
    teamId: "team-1",
    type: "bid_placed",
    title: "Bid placed",
    description: 'Auto-bid placed on "React Dashboard Development" - $2,500',
    timestamp: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    platform: "upwork",
    userId: "user-1"
  },
  {
    id: "act-2",
    teamId: "team-1",
    type: "message_received",
    title: "New message",
    description: "Sarah Johnson: Thanks! When can you start?",
    timestamp: new Date(Date.now() - 1e3 * 60 * 10).toISOString(),
    platform: "upwork"
  },
  {
    id: "act-3",
    teamId: "team-1",
    type: "bid_won",
    title: "Bid won!",
    description: 'Your bid on "AI Integration Project" was accepted - $5,000',
    timestamp: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
    platform: "fiverr",
    userId: "user-2"
  },
  {
    id: "act-4",
    teamId: "team-1",
    type: "project_completed",
    title: "Project completed",
    description: "Dashboard Analytics Tool marked as complete",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    userId: "user-3"
  },
  {
    id: "act-5",
    teamId: "team-1",
    type: "payment_received",
    title: "Payment received",
    description: "Received $3,500 for Mobile App Development milestone",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2).toISOString(),
    platform: "upwork"
  },
  {
    id: "act-6",
    teamId: "team-1",
    type: "account_connected",
    title: "Account connected",
    description: 'Toptal account "Enterprise Solutions" connected successfully',
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 5).toISOString(),
    platform: "toptal"
  },
  {
    id: "act-7",
    teamId: "team-1",
    type: "bid_placed",
    title: "Bid placed",
    description: 'Auto-bid placed on "Node.js API Development" - $4,000',
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 8).toISOString(),
    platform: "freelancer",
    userId: "user-1"
  },
  {
    id: "act-8",
    teamId: "team-2",
    type: "user_joined",
    title: "New team member",
    description: "Lisa Wang joined the team",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString()
  },
  {
    id: "act-9",
    type: "user_joined",
    title: "New admin registered",
    description: "Digital Nomads Agency signed up for Enterprise plan",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 2).toISOString()
  }
];
const mockApiTokens = [
  {
    id: "token-1",
    teamId: "team-1",
    name: "Gemini Pro",
    provider: "gemini",
    status: "active",
    lastUsed: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 30).toISOString()
  },
  {
    id: "token-2",
    teamId: "team-1",
    name: "OpenAI GPT-4",
    provider: "openai",
    status: "active",
    lastUsed: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 45).toISOString()
  },
  {
    id: "token-3",
    teamId: "team-1",
    name: "Claude API",
    provider: "anthropic",
    status: "expired",
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 60).toISOString()
  },
  {
    id: "token-4",
    teamId: "team-2",
    name: "Gemini Flash",
    provider: "gemini",
    status: "active",
    lastUsed: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
    createdAt: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 15).toISOString()
  }
];
const mockPlatformStats = {
  "team-1": {
    totalBids: 567,
    successfulBids: 89,
    totalEarnings: 125e3,
    activeProjects: 4,
    completedProjects: 23,
    averageRating: 4.9
  },
  "team-2": {
    totalBids: 312,
    successfulBids: 45,
    totalEarnings: 78e3,
    activeProjects: 2,
    completedProjects: 15,
    averageRating: 4.8
  }
};
function getActivitiesByTeam(teamId) {
  return mockActivities$1.filter((a) => a.teamId === teamId || !a.teamId);
}
function getApiTokensByTeam(teamId) {
  return mockApiTokens.filter((t) => t.teamId === teamId);
}
const useAppStore = create((set, get) => ({
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
  systemStatus: mockSystemStatus$1,
  selectedConversationId: null,
  sidebarCollapsed: false,
  activeRequests: 0,
  // Initialize data based on user role
  initializeForUser: (user) => {
    if (user.role === "superadmin") {
      set({
        projects: mockProjects,
        freelanceAccounts: mockFreelanceAccounts,
        proxies: mockProxies,
        conversations: mockConversations$1,
        socialPosts: mockSocialPosts,
        socialAccounts: mockSocialAccounts,
        activities: mockActivities$1,
        apiTokens: mockApiTokens,
        teamUsers: mockUsers.filter((u) => u.role !== "superadmin")
      });
    } else if (user.role === "admin" && user.teamId) {
      set({
        projects: getProjectsByTeam(user.teamId),
        freelanceAccounts: getAccountsByTeam(user.teamId),
        proxies: getProxiesByTeam(user.teamId),
        conversations: getConversationsByTeam(user.teamId),
        socialPosts: getSocialPostsByTeam(user.teamId),
        socialAccounts: getSocialAccountsByTeam(user.teamId),
        activities: getActivitiesByTeam(user.teamId),
        apiTokens: getApiTokensByTeam(user.teamId),
        teamUsers: getUsersByTeam(user.teamId)
      });
    } else if (user.role === "user") {
      set({
        projects: getProjectsForUser(user.id),
        freelanceAccounts: getAccountsForUser(user.id),
        proxies: [],
        conversations: getConversationsForUser(user.id),
        socialPosts: user.teamId ? getSocialPostsByTeam(user.teamId) : [],
        socialAccounts: user.teamId ? getSocialAccountsByTeam(user.teamId) : [],
        activities: user.teamId ? getActivitiesByTeam(user.teamId).filter((a) => a.userId === user.id || !a.userId) : [],
        apiTokens: [],
        teamUsers: []
      });
    }
  },
  // Project Actions
  addProject: (project) => {
    const newProject = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    set((state) => ({ projects: [...state.projects, newProject] }));
  },
  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map(
        (p) => p.id === id ? { ...p, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : p
      )
    }));
  },
  deleteProject: (id) => {
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) }));
  },
  updateProjectStatus: (id, status) => {
    set((state) => ({
      projects: state.projects.map(
        (p) => p.id === id ? { ...p, status, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : p
      )
    }));
  },
  toggleTaskComplete: (projectId, taskId) => {
    set((state) => ({
      projects: state.projects.map(
        (p) => p.id === projectId ? {
          ...p,
          tasks: p.tasks.map(
            (t) => t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : p
      )
    }));
  },
  // Freelance Account Actions
  addFreelanceAccount: (account) => {
    const newAccount = {
      ...account,
      id: `acc-${Date.now()}`
    };
    set((state) => ({ freelanceAccounts: [...state.freelanceAccounts, newAccount] }));
  },
  updateFreelanceAccount: (id, updates) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.map(
        (a) => a.id === id ? { ...a, ...updates } : a
      )
    }));
  },
  deleteFreelanceAccount: (id) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.filter((a) => a.id !== id)
    }));
  },
  toggleAutoBid: (id) => {
    set((state) => ({
      freelanceAccounts: state.freelanceAccounts.map(
        (a) => a.id === id ? { ...a, autoBidEnabled: !a.autoBidEnabled } : a
      )
    }));
  },
  // Proxy Actions
  addProxy: (proxy) => {
    const newProxy = {
      ...proxy,
      id: `proxy-${Date.now()}`
    };
    set((state) => ({ proxies: [...state.proxies, newProxy] }));
  },
  updateProxy: (id, updates) => {
    set((state) => ({
      proxies: state.proxies.map((p) => p.id === id ? { ...p, ...updates } : p)
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
      conversations: state.conversations.map(
        (c) => c.id === id ? {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true }))
        } : c
      )
    }));
  },
  addMessage: (conversationId, content, sender) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender,
      content,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      read: sender === "user"
    };
    set((state) => ({
      conversations: state.conversations.map(
        (c) => c.id === conversationId ? {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: content,
          lastMessageTime: newMessage.timestamp,
          unreadCount: sender === "client" ? c.unreadCount + 1 : c.unreadCount
        } : c
      )
    }));
  },
  // Social Post Actions
  addSocialPost: (post) => {
    const newPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    set((state) => ({ socialPosts: [...state.socialPosts, newPost] }));
  },
  updateSocialPost: (id, updates) => {
    set((state) => ({
      socialPosts: state.socialPosts.map((p) => p.id === id ? { ...p, ...updates } : p)
    }));
  },
  deleteSocialPost: (id) => {
    set((state) => ({ socialPosts: state.socialPosts.filter((p) => p.id !== id) }));
  },
  // Team User Actions
  addTeamUser: (user) => {
    const newUser = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    set((state) => ({ teamUsers: [...state.teamUsers, newUser] }));
  },
  updateTeamUser: (id, updates) => {
    set((state) => ({
      teamUsers: state.teamUsers.map((u) => u.id === id ? { ...u, ...updates } : u)
    }));
  },
  deleteTeamUser: (id) => {
    set((state) => ({ teamUsers: state.teamUsers.filter((u) => u.id !== id) }));
  },
  // API Token Actions
  addApiToken: (token) => {
    const newToken = {
      ...token,
      id: `token-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    set((state) => ({ apiTokens: [...state.apiTokens, newToken] }));
  },
  updateApiToken: (id, updates) => {
    set((state) => ({
      apiTokens: state.apiTokens.map((t) => t.id === id ? { ...t, ...updates } : t)
    }));
  },
  deleteApiToken: (id) => {
    set((state) => ({ apiTokens: state.apiTokens.filter((t) => t.id !== id) }));
  },
  // Activity Actions
  addActivity: (activity) => {
    const newActivity = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
      averageRating: 0
    };
  },
  getUnreadMessageCount: () => {
    return get().conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  }
}));
const SESSION_STORAGE_KEY = "nexus_session";
const API_BASE_URL$1 = "/api";
const AuthContext = reactExports.createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [team, setTeam] = reactExports.useState(null);
  const [token, setToken] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const initializeForUser = useAppStore((state) => state.initializeForUser);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    const legacyUser = localStorage.getItem("nexus_user");
    try {
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        setUser(parsedSession.user);
        setToken(parsedSession.token ?? null);
        if (parsedSession.user.teamId) {
          setTeam(getTeamById(parsedSession.user.teamId) || null);
        }
        initializeForUser(parsedSession.user);
      } else if (legacyUser) {
        const parsedUser = JSON.parse(legacyUser);
        setUser(parsedUser);
        setToken(null);
        if (parsedUser.teamId) {
          setTeam(getTeamById(parsedUser.teamId) || null);
        }
        initializeForUser(parsedUser);
      }
    } catch (e) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem("nexus_user");
      }
    }
    setIsLoading(false);
  }, [initializeForUser]);
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      if (!API_BASE_URL$1) ;
      console.debug("Login attempt:", { url: `${API_BASE_URL$1}/admin/login`, email });
      let response = await fetch(`${API_BASE_URL$1}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-key": ""
        },
        body: JSON.stringify({ email, password })
      });
      if (response.status === 404) {
        console.debug("Admin login endpoint not found, trying /login");
        response = await fetch(`${API_BASE_URL$1}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-key": ""
          },
          body: JSON.stringify({ email, password })
        });
      }
      const payload = await response.json().catch(() => ({ success: false }));
      console.debug("Login response payload:", payload);
      if (!response.ok) {
        return { success: false, message: payload?.message || "Unable to login. Please try again." };
      }
      const data = payload.data || payload;
      const authToken = data.token || payload.token;
      const adminData = data.admin || data.user || (data.email ? data : null);
      if (payload?.success && adminData && authToken) {
        const roles = adminData.roles || (adminData.role ? [adminData.role] : []);
        const mappedRole = roles.includes("superadmin") ? "superadmin" : roles.includes("admin") ? "admin" : "user";
        const authenticatedUser = {
          id: String(adminData.id || adminData.uuid),
          email: adminData.email,
          name: adminData.name || adminData.email,
          role: mappedRole,
          teamId: adminData.team_id || adminData.teamId,
          createdAt: adminData.created_at || adminData.createdAt || (/* @__PURE__ */ new Date()).toISOString()
        };
        setUser(authenticatedUser);
        setToken(authToken);
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: authenticatedUser, token: authToken }));
          localStorage.removeItem("nexus_user");
        }
        if (authenticatedUser.teamId) {
          setTeam(getTeamById(authenticatedUser.teamId) || null);
        }
        initializeForUser(authenticatedUser);
        return { success: true };
      }
      return { success: false, message: payload?.message || "Invalid email or password" };
    } catch (error) {
      console.error("Login error", error);
      return { success: false, message: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (name, email, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      if (!API_BASE_URL$1) ;
      const response = await fetch(`${API_BASE_URL$1}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-key": ""
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
      });
      const payload = await response.json().catch(() => ({ success: false }));
      if (!response.ok) {
        return { success: false, message: payload?.message || "Unable to register. Please try again." };
      }
      if (payload?.success && payload.data && payload.data.token) {
        const { uuid, name: userName, email: userEmail, role, token: authToken } = payload.data;
        const mappedRole = role === "freelancer" ? "user" : role;
        const registeredUser = {
          id: uuid,
          email: userEmail,
          name: userName,
          role: mappedRole,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        setUser(registeredUser);
        setToken(authToken);
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: registeredUser, token: authToken }));
          localStorage.removeItem("nexus_user");
        }
        if (registeredUser.teamId) {
          setTeam(getTeamById(registeredUser.teamId) || null);
        }
        initializeForUser(registeredUser);
        return { success: true };
      }
      return { success: false, message: payload?.message || "Registration failed" };
    } catch (error) {
      console.error("Registration error", error);
      return { success: false, message: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      if (token && API_BASE_URL$1) {
        const endpoint = user?.role === "admin" || user?.role === "superadmin" ? `${API_BASE_URL$1}/admin/logout` : `${API_BASE_URL$1}/logout`;
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "x-app-key": ""
          }
        }).catch(() => {
        });
      }
    } finally {
      setUser(null);
      setTeam(null);
      setToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem("nexus_user");
      }
    }
  };
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };
  const canAccessTeamSettings = user?.role === "admin" || user?.role === "superadmin";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        user,
        team,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
        canAccessTeamSettings
      },
      children
    }
  );
}
function useAuth() {
  const context2 = reactExports.useContext(AuthContext);
  if (context2 === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context2;
}
function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();
  const location = distExports.useLocation();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-[#020204]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-indigo-500 border-t-purple-500 animate-spin" }) });
  }
  if (!isAuthenticated || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "/login", state: { from: location }, replace: true });
  }
  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasRole(allowedRoles)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "/", replace: true });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Outlet, {});
}
const API_BASE_URL = "/api";
const memoryCache = /* @__PURE__ */ new Map();
async function serverFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  if (memoryCache.has(url)) return memoryCache.get(url);
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`API Status ${response.status}`);
    }
    const data = await response.json();
    memoryCache.set(url, data);
    return data;
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    throw err;
  }
}
async function fetchBlogs(page = 1, perPage = 12, search, categorySlug) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());
  const data = await serverFetch(`/blogs?${params.toString()}`, {});
  return data?.data;
}
async function fetchWorkflowCategories() {
  const data = await serverFetch("/workflow-library/categories", {});
  const result = data?.data;
  return Array.isArray(result) ? result : result?.data || [];
}
async function fetchWorkflowLibrary(page = 1, perPage = 12, search, categoryId) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());
  params.append("sort", "newest");
  const data = await serverFetch(`/workflow-library?${params.toString()}`, {});
  return data;
}
async function fetchWorkflowStats() {
  const data = await serverFetch("/workflows/stats", {});
  return data?.data || data;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const API_CONFIG = {
  BASE_URL: "/api",
  SESSION_KEY: "nexus_session",
  DEFAULT_PER_PAGE: 15,
  MAX_PER_PAGE: 100,
  TIMEOUT: 3e4
  // 30 seconds
};
const PAGINATION_CONFIG = {
  defaultPage: 1,
  defaultPerPage: API_CONFIG.DEFAULT_PER_PAGE,
  pageSizeOptions: [10, 15, 25, 50, 100]
};
const getAuthToken = () => {
  try {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem(API_CONFIG.SESSION_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.token || null;
    }
  } catch (e) {
    console.error("Error getting auth token:", e);
  }
  return null;
};
const getAuthHeaders = (includeContentType = true) => {
  const token = getAuthToken();
  const headers = {};
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
async function apiRequest(endpoint, method = "GET", body, customHeaders) {
  const isFormData = body instanceof FormData;
  const isGetRequest = method === "GET";
  const includeDefaultContentType = !isFormData && !isGetRequest;
  const headers = {
    ...getAuthHeaders(includeDefaultContentType),
    ...customHeaders
  };
  const options = {
    method,
    headers
  };
  if (body) {
    if (isFormData) {
      options.body = body;
    } else {
      options.body = typeof body === "string" ? body : JSON.stringify(body);
    }
  }
  try {
    const fullUrl = endpoint.startsWith("http") ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);
    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      const isHtml = /<[a-z][\s\S]*>/i.test(text);
      data = { message: isHtml ? `Request failed (${response.status})` : text || `Error ${response.status}` };
    }
    if (!response.ok) {
      const firstValidationError = (() => {
        if (!data?.errors || typeof data.errors !== "object") return void 0;
        const entries = Object.entries(data.errors);
        for (const [, value] of entries) {
          if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
            return value[0];
          }
          if (typeof value === "string" && value.trim()) {
            return value;
          }
        }
        return void 0;
      })();
      return {
        success: false,
        message: data.message || firstValidationError || `Request failed with status ${response.status}`,
        errors: data.errors
      };
    }
    if (data && typeof data === "object" && "success" in data && "data" in data) {
      return data;
    }
    return {
      success: true,
      data,
      message: data.message
    };
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Network error occurred"
    };
  } finally {
  }
}
const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== void 0 && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};
class BaseService {
  baseUrl;
  constructor(baseUrl = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }
  getAuthHeaders(includeContentType = true) {
    return getAuthHeaders(includeContentType);
  }
  async request(endpoint, method = "GET", body, customHeaders) {
    return apiRequest(endpoint, method, body, customHeaders);
  }
  buildUrl(endpoint, params) {
    const queryString = params ? buildQueryString(params) : "";
    return `${endpoint}${queryString}`;
  }
}
class FAQService extends BaseService {
  constructor() {
    super();
  }
  async listFAQs(page = PAGINATION_CONFIG.defaultPage, perPage = PAGINATION_CONFIG.defaultPerPage) {
    const endpoint = this.buildUrl("/admin/faqs", { page, per_page: perPage });
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }
    return response.json();
  }
  async getFAQ(id) {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQ: ${response.statusText}`);
    }
    return response.json();
  }
  async createFAQ(data) {
    const response = await fetch(`${this.baseUrl}/admin/faqs`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create FAQ");
    }
    return response.json();
  }
  async updateFAQ(id, data) {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update FAQ");
    }
    return response.json();
  }
  async deleteFAQ(id) {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete FAQ");
    }
    return response.json();
  }
  // Public/Web API endpoints (no authentication required)
  async getPublicFAQs(type, slug) {
    const endpoint = this.buildUrl("/web/faqs", { type, slug });
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }
    return response.json();
  }
}
const faqService = new FAQService();
const FAQSection = ({
  type = "page",
  slug = "home",
  title = "Frequently Asked Questions",
  className,
  data
}) => {
  const [openIndex, setOpenIndex] = reactExports.useState(0);
  const [faqs, setFaqs] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(!data);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (data) {
      setFaqs(data);
      setIsLoading(false);
    } else {
      loadFAQs();
    }
  }, [type, slug, data]);
  const loadFAQs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await faqService.getPublicFAQs(type, slug);
      if (response.success) {
        setFaqs(response.data);
      } else {
        setFaqs([]);
      }
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setFaqs([]);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn("py-24 px-6 max-w-3xl mx-auto", className), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-10 text-center", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-indigo-400" }) })
    ] });
  }
  if (error || faqs.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn("py-24 px-6 max-w-3xl mx-auto", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-8 text-center", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "border rounded-xl overflow-hidden transition-all duration-300",
      openIndex === i ? "border-indigo-500/20 bg-indigo-500/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenIndex(openIndex === i ? null : i), className: "w-full flex items-center justify-between p-5 text-left gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-200 text-[15px] leading-snug", children: faq.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
          openIndex === i ? "bg-indigo-500/15" : "bg-white/[0.05]"
        ), children: openIndex === i ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-indigo-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 text-slate-500" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
        "px-5 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out",
        openIndex === i ? "max-h-60 pb-5 opacity-100" : "max-h-0 opacity-0"
      ), children: faq.answer })
    ] }, faq.id)) })
  ] });
};
const adminBlogCategoryService = {
  // Get all blog categories
  getAll: async () => {
    const response = await apiRequest("/admin/blog-categories", "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Create a new blog category
  create: async (data) => {
    const response = await apiRequest("/admin/blog-categories", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Update a blog category
  update: async (id, data) => {
    const response = await apiRequest(`/admin/blog-categories/${id}`, "PUT", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Delete a blog category
  delete: async (id) => {
    const response = await apiRequest(`/admin/blog-categories/${id}`, "DELETE");
    return { success: response.success, message: response.message };
  }
};
const adminBlogService = {
  // Get all blogs with pagination
  getAll: async (page = 1, perPage = 20) => {
    const response = await apiRequest(`/admin/blogs?page=${page}&per_page=${perPage}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Get a single blog by ID
  getById: async (id) => {
    const response = await apiRequest(`/admin/blogs/${id}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Create a new blog
  create: async (data) => {
    const response = await apiRequest("/admin/blogs", "POST", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Create a new blog with image file
  createWithImage: async (data, imageFile) => {
    const formData = new FormData();
    formData.append("category_id", data.category_id.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("is_featured", data.is_featured ? "1" : "0");
    if (data.meta_title) formData.append("meta_title", data.meta_title);
    if (data.meta_description) formData.append("meta_description", data.meta_description);
    if (data.meta_keywords) formData.append("meta_keywords", data.meta_keywords);
    formData.append("image_url", imageFile);
    const response = await apiRequest("/admin/blogs", "POST", formData);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Update a blog
  update: async (id, data) => {
    const response = await apiRequest(`/admin/blogs/${id}`, "PUT", data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Update a blog with image file
  updateWithImage: async (id, data, imageFile) => {
    const formData = new FormData();
    if (data.category_id) formData.append("category_id", data.category_id.toString());
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.content) formData.append("content", data.content);
    if (data.status) formData.append("status", data.status);
    if (data.is_featured !== void 0) formData.append("is_featured", data.is_featured ? "1" : "0");
    if (data.meta_title) formData.append("meta_title", data.meta_title);
    if (data.meta_description) formData.append("meta_description", data.meta_description);
    if (data.meta_keywords) formData.append("meta_keywords", data.meta_keywords);
    formData.append("image_url", imageFile);
    formData.append("_method", "PUT");
    const response = await apiRequest(`/admin/blogs/${id}`, "POST", formData);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Delete a blog
  delete: async (id) => {
    const response = await apiRequest(`/admin/blogs/${id}`, "DELETE");
    return { success: response.success, message: response.message };
  },
  // Search blogs
  search: async (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (filters?.category_id) params.append("category_id", filters.category_id.toString());
    if (filters?.status && filters.status !== "all") params.append("status", filters.status);
    if (filters?.page) params.append("page", filters.page.toString());
    const response = await apiRequest(`/admin/blogs?${params.toString()}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  }
};
const blogService = {
  // Get all blogs with pagination, search, and category filter
  getAll: async (page = 1, perPage = 20, search, categorySlug) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("per_page", perPage.toString());
    if (search) params.append("search", search);
    if (categorySlug) params.append("category", categorySlug);
    const response = await apiRequest(`/blogs?${params.toString()}`, "GET");
    return { success: response.success, message: response.message, data: response.data };
  },
  // Get all blog categories
  getCategories: async () => {
    const response = await apiRequest("/blogs/categories", "GET");
    const result = response.data?.data;
    const arrayData = Array.isArray(result) ? result : result?.data || [];
    return { success: response.success, message: response.message, data: arrayData };
  },
  // Get a single blog by slug
  getBySlug: async (slug) => {
    const response = await apiRequest(`/blogs/${slug}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Get blog by slug with SEO payload preserved
  getBySlugWithSeo: async (slug) => {
    const response = await apiRequest(`/blogs/${slug}`);
    return { success: response.success, message: response.message, data: response.data };
  },
  // Get a single blog by ID
  getById: async (id) => {
    const response = await apiRequest(`/blogs/${id}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Search blogs
  search: async (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (filters?.category_id) params.append("category_id", filters.category_id.toString());
    if (filters?.status && filters.status !== "all") params.append("status", filters.status);
    if (filters?.page) params.append("page", filters.page.toString());
    const response = await apiRequest(`/blogs?${params.toString()}`, "GET");
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Get related blogs
  getRelatedBlogs: async (slug) => {
    const response = await apiRequest(`/blogs/${slug}/related`);
    return { success: response.success, message: response.message, data: response.data };
  },
  // Get related workflows for a blog
  getRelatedWorkflows: async (slug) => {
    const response = await apiRequest(`/blogs/${slug}/related-workflows`);
    return { success: response.success, message: response.message, data: response.data };
  }
};
class WorkflowService {
  // Headers are now handled centrally in apiRequest
  /**
   * GET /admin/workflows - List all workflows with pagination
   */
  async listWorkflows(page = 1, perPage = 20) {
    const response = await apiRequest(`/admin/workflows?page=${page}&per_page=${perPage}`);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data };
  }
  /**
   * POST /admin/workflows - Create a new workflow
   * Accepts JSON object OR FormData
   */
  async createWorkflow(payload) {
    const response = await apiRequest("/admin/workflows", "POST", payload);
    if (!response.success) throw new Error(response.message);
    const dataPayload = response.data.data || response.data;
    return { success: true, data: dataPayload };
  }
  /**
   * GET /admin/workflows/:id - Get a specific workflow by ID
   */
  async getWorkflow(id) {
    const response = await apiRequest(`/admin/workflows/${id}`);
    if (!response.success) throw new Error(response.message);
    const dataPayload = response.data.data || response.data;
    return { success: true, data: dataPayload };
  }
  /**
   * PUT /admin/workflows/:id - Update a specific workflow
   * Accepts JSON object OR FormData
   */
  async updateWorkflow(id, payload) {
    const response = await apiRequest(`/admin/workflows/${id}`, "PUT", payload);
    if (!response.success) throw new Error(response.message);
    const dataPayload = response.data.data || response.data;
    return { success: true, data: dataPayload };
  }
  /**
   * DELETE /admin/workflows/:id - Delete a specific workflow
   */
  async deleteWorkflow(id) {
    const response = await apiRequest(`/admin/workflows/${id}`, "DELETE");
    if (!response.success) throw new Error(response.message);
    return response.data.data || response.data;
  }
  /**
   * GET /admin/workflow-categories - List all workflow categories
   */
  async listCategories() {
    const response = await apiRequest("/admin/workflow-categories");
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }
  /**
   * GET /admin/workflow-categories/:id - Get a specific category by ID
   */
  async getCategory(id) {
    const response = await apiRequest(`/admin/workflow-categories/${id}`);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }
  /**
   * POST /admin/workflow-categories - Create a new category
   */
  async createCategory(payload) {
    const response = await apiRequest("/admin/workflow-categories", "POST", payload);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }
  /**
   * PUT /admin/workflow-categories/:id - Update a specific category
   */
  async updateCategory(id, payload) {
    const response = await apiRequest(`/admin/workflow-categories/${id}`, "PUT", payload);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }
  /**
   * DELETE /admin/workflow-categories/:id - Delete a specific category
   */
  async deleteCategory(id) {
    const response = await apiRequest(`/admin/workflow-categories/${id}`, "DELETE");
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
  /**
   * GET /workflow-library - Get public workflow library with pagination
   */
  async getWorkflowLibrary(page = 1, perPage = 12, search = "", categoryId = null, sort = "newest") {
    const params = { page, per_page: perPage, sort };
    if (search) params.search = search;
    if (categoryId) params.category_id = categoryId;
    const response = await apiRequest(`/workflows${buildQueryString(params)}`);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }
  /**
   * GET /workflows/stats - Get workflow statistics
   */
  async getWorkflowStats() {
    const response = await apiRequest("/workflows/stats");
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data || response.data };
  }
  /**
   * GET /workflow-library/categories - Get public workflow categories
   */
  async getWorkflowLibraryCategories() {
    const response = await apiRequest("/workflow-library/categories");
    if (!response.success) throw new Error(response.message);
    const result = response.data;
    const arrayData = result.data || result;
    return { success: true, data: Array.isArray(arrayData) ? arrayData : [] };
  }
  /**
   * GET /workflow-library/:slug - Get a specific workflow by slug
   */
  async getWorkflowBySlug(slug) {
    const response = await apiRequest(`/workflow-library/${slug}`);
    if (!response.success) throw new Error(response.message);
    const raw = response.data;
    const payload = raw?.data ?? raw;
    return {
      success: true,
      data: payload,
      seo: payload?.seo || raw?.seo || null,
      relatedWorkflows: raw?.relatedWorkflows || payload?.relatedWorkflows || [],
      suggestedBlogs: raw?.suggestedBlogs || payload?.suggestedBlogs || []
    };
  }
  /**
   * GET /workflows/file/:name - Get workflow JSON file by filename
   */
  async getWorkflowJsonFile(fileName, jsonFilePath) {
    if (jsonFilePath && (jsonFilePath.startsWith("http") || jsonFilePath.startsWith("https"))) {
      try {
        console.log(`Fetching from json_file_path: ${jsonFilePath}`);
        const response = await fetch(jsonFilePath, {
          headers: {
            "x-app-key": ""
          }
        });
        if (response.ok) {
          return await response.json();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      } catch (error) {
        console.warn(`Error fetching from json_file_path (${jsonFilePath}):`, error);
        if (fileName) {
          try {
            console.log(`Falling back to API with fileName: ${fileName}`);
            const url = fileName.startsWith("http") || fileName.startsWith("/") ? fileName : `/workflows/file/${fileName}`;
            const apiResponse = await apiRequest(url);
            if (!apiResponse.success) {
              throw new Error(apiResponse.message);
            }
            return apiResponse.data;
          } catch (fallbackError) {
            console.error(`Fallback to API also failed for ${fileName}:`, fallbackError);
            throw fallbackError;
          }
        }
        throw error;
      }
    }
    if (fileName) {
      try {
        const url = fileName.startsWith("http") || fileName.startsWith("/") ? fileName : `/workflows/file/${fileName}`;
        const response = await apiRequest(url);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      } catch (error) {
        console.error(`Error fetching from API (${fileName}):`, error);
        throw error;
      }
    }
    throw new Error("No file name or path provided");
  }
  /**
   * GET /workflow-library/:slug/related - Get related workflows by slug
   */
  async getRelatedWorkflows(slug) {
    const response = await apiRequest(`/workflow/${slug}/related`);
    if (!response.success) throw new Error(response.message);
    const raw = response.data;
    const related = raw?.related_workflows || raw?.data?.related_workflows || raw?.data || [];
    return {
      success: true,
      data: Array.isArray(related) ? related : []
    };
  }
  /**
   * POST /workflow/:slug/reviews - Submit a review
   */
  async submitReview(slug, data) {
    const response = await apiRequest(`/workflow/${slug}/reviews`, "POST", data);
    return { success: response.success, message: response.message || "", data: response.data };
  }
  /**
   * GET /workflow/:slug/related-blogs - Get relevant blogs by workflow slug
   */
  async getRelatedBlogs(slug) {
    const response = await apiRequest(`/workflow/${slug}/related-blogs`);
    if (!response.success) throw new Error(response.message);
    const raw = response.data;
    const blogs = raw?.data || raw?.related_blogs || [];
    return {
      success: true,
      data: Array.isArray(blogs) ? blogs : []
    };
  }
}
const workflowService = new WorkflowService();
const PublicFooter = () => {
  const [workflowCategories, setWorkflowCategories] = reactExports.useState([]);
  const [blogCategories, setBlogCategories] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const fetchData = async () => {
      try {
        const [wfRes, blogRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          blogService.getCategories()
        ]);
        if (wfRes.success && wfRes.data) {
          setWorkflowCategories(wfRes.data.slice(0, 5));
        }
        if (blogRes.success && blogRes.data) {
          setBlogCategories(blogRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch footer categories:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative bg-[#030305] border-t border-white/5 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/", className: "flex items-center gap-3 group", title: "EdgeLancer - Back to Home", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cyan-400/20 blur-lg rounded-full group-hover:bg-cyan-400/30 transition-all duration-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/favicon.png", alt: "EdgeLancer Logo", className: "w-12 h-12 object-contain relative group-hover:scale-110 transition-transform duration-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-2xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                style: { fontFamily: "'Orbitron', sans-serif" },
                children: "EdgeLancer"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-base leading-relaxed max-w-sm", children: "The world's premium destination for high-performance n8n workflows and autonomous AI strategies. We're bridging the gap between manual work and digital intelligence." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2", children: "Connect with the Future" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: [
              { Icon: Twitter, label: "Twitter", href: "https://x.com/edgelancern8n" },
              { Icon: Github, label: "GitHub", href: "https://github.com/edgelancer" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/edgelancer" },
              { Icon: Mail, label: "Email", href: "mailto:contact@edgelancer.com" }
            ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: item.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:-translate-y-1 transition-all duration-300",
                "aria-label": item.label,
                title: `Follow us on ${item.label}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.Icon, { className: "w-5 h-5" })
              },
              i
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm tracking-widest uppercase", children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: [
              { label: "Workflows", to: "/workflows" },
              { label: "Templates", to: "/templates" },
              { label: "Courses", to: "/courses" },
              { label: "Articles", to: "/blogs" },
              { label: "Dashboard", to: "/app/dashboard" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: item.to,
                className: "text-slate-400 hover:text-white flex items-center group transition-colors text-sm",
                title: `Navigate to ${item.label}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-0 group-hover:w-3 h-3 text-cyan-500 mr-0 group-hover:mr-1 transition-all duration-300" }),
                  item.label
                ]
              }
            ) }, item.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm tracking-widest uppercase", children: "Solutions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: workflowCategories.length > 0 ? workflowCategories.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: `/workflows?category=${item.slug}`,
                className: "text-slate-400 hover:text-white flex items-center group transition-colors text-sm",
                title: `View ${item.title} automation solutions`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-0 group-hover:w-3 h-3 text-indigo-500 mr-0 group-hover:mr-1 transition-all duration-300" }),
                  item.title
                ]
              }
            ) }, item.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-slate-600 text-xs italic", children: "Loading..." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm tracking-widest uppercase", children: "Resources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: [
              { label: "Help Center", to: "/support" },
              { label: "Latest Updates", to: "/blogs" },
              { label: "Course Library", to: "/courses" },
              { label: "Marketplace", to: "/templates" },
              { label: "Support Chat", to: "/contact" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: item.to,
                className: "text-slate-400 hover:text-white flex items-center group transition-colors text-sm",
                title: `Go to ${item.label}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-0 group-hover:w-3 h-3 text-purple-500 mr-0 group-hover:mr-1 transition-all duration-300" }),
                  item.label
                ]
              }
            ) }, item.label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-sm tracking-widest uppercase", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: [
              { label: "Contact Us", to: "/contact" },
              { label: "Sitemap", to: "/sitemap" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: item.to,
                className: "text-slate-400 hover:text-white flex items-center group transition-colors text-sm",
                title: `Legal Information: ${item.label}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-0 group-hover:w-3 h-3 text-emerald-500 mr-0 group-hover:mr-1 transition-all duration-300" }),
                  item.label
                ]
              }
            ) }, item.label)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 border-y border-white/5 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white tracking-tight", children: "Stay ahead of the competition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "Join 10,000+ automators getting weekly n8n strategies." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "name@company.com",
              className: "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 text-sm"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm",
              onClick: () => window.location.href = "/newsletter",
              children: [
                "Join Newsletter ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center md:items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 font-medium", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " EdgeLancer Industries. All rights reserved."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-4 text-[10px] text-slate-500 uppercase tracking-[0.2em]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
              " Worldwide Delivery"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
              " Neural Network Based"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400 border border-white/5 bg-white/5 rounded-full px-8 py-3 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:contact@edgelancer.com", className: "hover:text-cyan-400 transition-colors flex items-center gap-2", title: "Send us an email", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-cyan-500/50" }),
            "contact@edgelancer.com"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-white/10 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/contact", className: "hover:text-white transition-colors flex items-center gap-2", title: "Contact Support", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-indigo-500/50" }),
            "+1 (555) EDGE-AI"
          ] })
        ] })
      ] })
    ] })
  ] });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const navItems = [
  { label: "Home", to: "/", title: "Go to Home" },
  { label: "Workflows", to: "/workflows", title: "Browse Workflow Templates" },
  { label: "Categories", to: "/blogs", title: "Workflow Categories" },
  { label: "Templates", to: "/templates", title: "View Template Library" },
  { label: "Courses", to: "/courses", title: "Browse our Expert Courses" },
  { label: "Blogs", to: "/blogs", title: "Read our latest Blog Posts" },
  { label: "Contact", to: "/contact", title: "Contact Us" }
];
function PublicNavbar() {
  const { pathname } = distExports.useLocation();
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = reactExports.useState(false);
  const [dynamicNavItems, setDynamicNavItems] = reactExports.useState(navItems);
  const categoryIcons = [
    BarChart3,
    Bot,
    Box,
    Cpu,
    FileCode,
    FileJson,
    GitBranch,
    Globe,
    Mail,
    MessageSquare,
    Share2,
    ShieldCheck,
    Terminal,
    Users,
    Workflow,
    Zap
  ];
  const getRandomIcon = () => categoryIcons[Math.floor(Math.random() * categoryIcons.length)] || Box;
  reactExports.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await workflowService.getWorkflowLibraryCategories();
        if (response.success && response.data) {
          const categories = response.data;
          const topCategories = categories.slice(0, 6).map((cat) => ({
            label: cat.title,
            to: `/workflows?category=${cat.slug}`,
            title: `Explore ${cat.title} workflows`,
            description: cat.badge_text || `Browse our ${cat.title} templates`,
            icon: getRandomIcon()
          }));
          if (categories.length > 6) {
            topCategories.push({
              label: "View All Categories",
              to: "/workflows",
              title: "View all workflow categories",
              description: "Explore all of our available categories",
              icon: ArrowRight
            });
          }
          setDynamicNavItems((prev) => prev.map((item) => {
            if (item.label === "Categories") {
              return { ...item, children: topCategories };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error("Failed to fetch nav categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const [activeIndex, setActiveIndex] = reactExports.useState(null);
  const [hoverStyle, setHoverStyle] = reactExports.useState({});
  const navRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    const idx = dynamicNavItems.findIndex(
      (item) => item.to === pathname || item.children && item.children.some((child) => child.to === pathname)
    );
    setActiveIndex(idx !== -1 ? idx : null);
  }, [pathname, dynamicNavItems]);
  reactExports.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);
  const handleMouseEnter = (index, e) => {
    setHoveredIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect) {
      setHoverStyle({
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - navRect.left}px)`,
        opacity: 1
      });
    }
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: cn(
          "fixed z-50 transition-all duration-500 ease-out",
          "md:top-5 md:inset-x-0 md:max-w-6xl md:mx-auto md:rounded-2xl",
          "top-0 inset-x-0 w-full border-b md:border",
          isScrolled || mobileMenuOpen ? "bg-[#050507]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]" : "bg-transparent border-transparent md:bg-[#050507]/40 md:backdrop-blur-md md:border-white/5"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 md:h-14 px-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            distExports.Link,
            {
              to: "/",
              className: "flex items-center gap-3 group relative z-20",
              title: "EdgeLancer Home",
              onClick: () => setMobileMenuOpen(false),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/favicon.png",
                  alt: "Logo",
                  width: 80,
                  height: 80,
                  className: "w-20 h-20 object-contain group-hover:scale-105 transition-transform duration-300"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: navRef,
              className: "hidden md:flex relative items-center bg-white/5 rounded-full p-1 border border-white/5 shadow-inner",
              onMouseLeave: handleMouseLeave,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-1 bottom-1 left-0 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none",
                    style: hoverStyle
                  }
                ),
                dynamicNavItems.map((item, index) => {
                  const isDropdown = !!item.children;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/dropdown h-full flex items-center", children: [
                    isDropdown ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      distExports.Link,
                      {
                        to: item.to,
                        className: cn(
                          "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 flex items-center gap-1 outline-none h-full",
                          hoveredIndex === index ? "text-white" : "text-slate-400"
                        ),
                        onMouseEnter: (e) => handleMouseEnter(index, e),
                        children: [
                          item.label,
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 mt-0.5 group-hover/dropdown:rotate-180 transition-transform duration-300" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      distExports.Link,
                      {
                        to: item.to,
                        className: cn(
                          "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 block h-full flex items-center",
                          activeIndex === index ? "text-white" : "text-slate-400 hover:text-white"
                        ),
                        onMouseEnter: (e) => handleMouseEnter(index, e),
                        children: [
                          item.label,
                          activeIndex === index && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_currentColor]" })
                        ]
                      }
                    ),
                    isDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible opacity-0 translate-y-1 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-500 ease-out delay-200 group-hover/dropdown:delay-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[600px] p-4 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 backdrop-blur-2xl shadow-2xl grid grid-cols-2 gap-2", children: item.children?.map((child, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      distExports.Link,
                      {
                        to: child.to,
                        className: "flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-indigo-400 group-hover/item:border-indigo-500/30 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(child.icon, { className: "w-5 h-5" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-slate-200 group-hover/item:text-white", children: child.label }),
                            child.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 group-hover/item:text-slate-300", children: child.description })
                          ] })
                        ]
                      },
                      i
                    )) }) })
                  ] }, item.label);
                })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/contact", className: "hidden md:block group relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-50 group-hover:blur-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-full p-[1px] transition-transform duration-300 active:scale-95", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] group-hover:animate-[spin_2s_linear_infinite]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "relative h-9 rounded-full bg-slate-950/90 backdrop-blur-sm px-6 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-slate-900/90", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex items-center gap-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tracking-wide", children: "Hire Us" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                className: "md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors",
                children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "fixed inset-0 z-40 bg-[#050507] md:hidden flex flex-col pt-24 px-6 transition-all duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: dynamicNavItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-white/5 last:border-0 pb-2", children: item.children ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setMobileCategoryOpen(!mobileCategoryOpen),
                className: "w-full group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all text-left",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium text-slate-300 group-hover:text-white", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("w-5 h-5 text-slate-600 transition-transform duration-300", mobileCategoryOpen ? "rotate-180 text-indigo-400" : "") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("overflow-hidden transition-all duration-300 px-4 space-y-1", mobileCategoryOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"), children: item.children.map((child, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: child.to,
                onClick: () => setMobileMenuOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(child.icon, { className: "w-4 h-4 text-indigo-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: child.label })
                ]
              },
              i
            )) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: item.to,
              onClick: () => setMobileMenuOpen(false),
              className: "group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-medium text-slate-300 group-hover:text-white", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" })
              ]
            }
          ) }, item.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pb-10 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/contact", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full h-12 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 rounded-xl", children: "Hire Us" }) }) })
        ]
      }
    )
  ] });
}
const SpotlightCard$1 = ({ children, className = "", onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    onClick,
    className: `relative rounded-2xl border border-white/10 bg-[#12121a] backdrop-blur-xl hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col group overflow-hidden ${className}`,
    children
  }
);
const iconPool = [
  Zap,
  Bot,
  GitBranch,
  Layers,
  LayoutGrid,
  Workflow,
  Mail,
  MessageSquare,
  Globe,
  Database,
  FileText,
  Share2,
  Smartphone,
  Cpu,
  BarChart,
  Settings,
  Bell,
  Cloud,
  Code
];
const gradientPool = [
  "from-purple-500 to-indigo-500",
  "from-cyan-500 to-blue-500",
  "from-fuchsia-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-blue-400 to-indigo-600"
];
const getWorkflowVisuals = (id, index = 0) => {
  const safeId = id || index;
  const safeIdNum = typeof safeId === "string" ? parseInt(safeId, 10) : Number(safeId || 0);
  const Icon = iconPool[safeIdNum % iconPool.length];
  const gradient = gradientPool[safeIdNum % gradientPool.length];
  return { Icon, gradient };
};
const ProductionTemplates = ({
  initialWorkflows = [],
  initialCategories = []
}) => {
  const navigate = distExports.useNavigate();
  const [workflows, setWorkflows] = reactExports.useState(initialWorkflows);
  const [categories, setCategories] = reactExports.useState(initialCategories);
  const [activeCategory, setActiveCategory] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(initialWorkflows.length === 0);
  const [hasLoadedInitial, setHasLoadedInitial] = reactExports.useState(initialWorkflows.length > 0);
  const [showAllCategories, setShowAllCategories] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (initialCategories.length > 0) return;
    workflowService.getWorkflowLibraryCategories().then((res) => {
      if (res?.data) {
        setCategories(res.data);
      }
    }).catch((error) => console.error("Error loading workflow categories:", error));
  }, [initialCategories.length]);
  reactExports.useEffect(() => {
    if (hasLoadedInitial) {
      setHasLoadedInitial(false);
      return;
    }
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const templatesRes = await workflowService.getWorkflowLibrary(1, 12, searchQuery, activeCategory);
        if (templatesRes?.data) {
          const workflowsArray = Array.isArray(templatesRes.data) ? templatesRes.data : templatesRes.data.data || [];
          setWorkflows(workflowsArray);
        } else {
          setWorkflows([]);
        }
      } catch (error) {
        console.error("Error loading workflow templates:", error);
      } finally {
        setLoading(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchWorkflows();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategory]);
  const handleViewDetails = (slug) => {
    navigate(`/workflow/${slug}`);
  };
  const filteredWorkflows = workflows.filter((wf) => {
    const matchesCategory = activeCategory === null || Number(wf.category_id) === Number(activeCategory);
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || wf.title && wf.title.toLowerCase().includes(query) || wf.description && wf.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  const collapsedCategoryCount = 5;
  const visibleCategories = showAllCategories ? categories : categories.slice(0, collapsedCategoryCount);
  const hasMoreCategories = categories.length > collapsedCategoryCount;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto flex items-center justify-center h-screen relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "w-8 h-8 animate-spin text-purple-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Loading templates..." })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-white/5 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2", children: "Marketplace" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold text-white tracking-tight mb-4", children: [
            "Production ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400", children: "Templates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 max-w-xl text-lg leading-relaxed", children: "Deploy battle-tested automation architectures. Clone, configure, and run in seconds." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-80 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search templates...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full pl-12 pr-4 py-3 rounded-xl border border-slate-800 bg-[#0a0a0a] text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-xl"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4" }),
          "Categories"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2 transition-all duration-300 ${showAllCategories ? "flex-wrap overflow-visible pb-0" : "flex-nowrap overflow-x-auto pb-1"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setActiveCategory(null);
                setSearchQuery("");
              },
              className: `flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeCategory === null ? "bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-transparent border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700"}`,
              children: "All Templates"
            }
          ),
          visibleCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setActiveCategory(cat.id);
                setSearchQuery("");
              },
              className: `flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeCategory === cat.id ? "bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "bg-transparent border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700"}`,
              children: cat.title
            },
            cat.id
          )),
          hasMoreCategories && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowAllCategories(!showAllCategories),
              className: "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border bg-transparent border-slate-700 text-slate-400 hover:text-slate-300 hover:border-slate-600 hover:bg-slate-800/20",
              children: showAllCategories ? "Show Less" : `Show All (${categories.length})`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredWorkflows.map((workflow, index) => {
        const { Icon, gradient } = getWorkflowVisuals(workflow.id, index);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SpotlightCard$1,
          {
            className: "h-full",
            onClick: () => handleViewDetails(workflow.slug),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
                  Number(workflow.price) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/10 text-gray-300", children: [
                    "$",
                    workflow.price
                  ] }),
                  workflow.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
                    workflow.rating
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex-grow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1", children: workflow.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 line-clamp-2", children: workflow.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-6", children: [
                workflow.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal", children: workflow.category.title }),
                workflow.nodes_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3 h-3" }),
                  workflow.nodes_count,
                  " Nodes"
                ] }),
                workflow.difficulty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal capitalize", children: workflow.difficulty }),
                workflow.time_saved_value && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-normal", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  workflow.time_saved_value,
                  " ",
                  workflow.time_saved_unit
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/5 mt-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0,
                    " views"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      handleViewDetails(workflow.slug);
                    },
                    className: "px-4 py-1.5 text-sm rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity border-0 shadow-lg",
                    children: "Download"
                  }
                )
              ] })
            ] })
          },
          workflow.id
        );
      }) }),
      filteredWorkflows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 border border-white/5 rounded-2xl bg-[#12121a] mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg", children: "No templates found matching your criteria." }) })
    ] })
  ] });
};
const SpotlightCard = ({ children, className, spotlightColor = "rgba(99, 102, 241, 0.15)", onClick }) => {
  const divRef = reactExports.useRef(null);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = reactExports.useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: divRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick,
      className: cn(
        "relative overflow-hidden rounded-xl border border-slate-800 bg-[#0e0f14] text-slate-200 transition-all duration-300",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 h-full", children })
      ]
    }
  );
};
const BentoGrid = () => /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-32 px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 md:mb-20 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6", children: [
      "How to Setup ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-500", children: "n8n on Local System." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-slate-400", children: "If you are looking for the best workflow automation tool, learning how to setup n8n on local system is a game-changer. Experience complete privacy, zero limits, and total control." })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "md:col-span-2 md:row-span-2 p-6 md:p-10 flex flex-col justify-between group h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 md:w-14 md:h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-6 h-6 md:w-7 md:h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-bold text-white mb-4", children: "Complete Local Installation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 max-w-md text-base md:text-lg mb-4", children: "Unlike cloud-only solutions, a local n8n installation gives you complete privacy, zero limits, and total control over your data." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 max-w-md text-base md:text-lg", children: [
          "In this comprehensive guide, we'll walk you through the complete ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "n8n local setup" }),
          " process step-by-step to get your automation environment running perfectly."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 w-full h-48 bg-black/50 rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "$" }),
            " npx n8n"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "➜  Downloading packages..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", title: "n8n local host url", children: "✔  n8n ready on http://localhost:5689" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Press 'O'" }),
            " to open in browser"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "[20:14:02] INFO: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "Editor initialized perfectly" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-end group min-h-[250px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Prerequisites" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm md:text-base text-slate-400 list-disc pl-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Node.js (v18 or later)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "npm (Package Manager)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Docker (optional for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "n8n docker setup" }),
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-end group min-h-[250px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 md:w-10 md:h-10 text-emerald-500 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Method 1: npm (Fastest)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-slate-400 mb-4", children: "The quickest way to start automating locally today:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-black/50 p-2 rounded text-emerald-400 border border-emerald-500/20", children: "npx n8n" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SpotlightCard, { className: "md:col-span-2 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Method 2: Docker Deployment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm md:text-base text-slate-400 mb-4", children: [
        "For robust ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "n8n automation local deployment" }),
        ", Docker is the industry standard. It encapsulates dependencies perfectly and ensures a stable environment."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs md:text-sm bg-black/50 p-3 rounded text-blue-400 border border-blue-500/20 block overflow-x-auto whitespace-nowrap", children: "docker run -it --rm --name n8n -p 5689:5689 -v ~/.n8n:/home/node/.n8n n8nio/n8n" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-center bg-indigo-600/10 border-indigo-500/30 min-h-[250px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Why Local Setup?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-indigo-200", children: "Mastering local installation provides unparalleled benefits: workflow privacy, custom nodes, no rate limits, and zero recurring cloud costs for your system." })
    ] })
  ] })
] }) });
const getImageUrl = (url) => {
  if (!url) return null;
  if (url.includes("localhost")) return null;
  return url;
};
const calculateReadTime = (content) => {
  if (!content) return "5 min read";
  const words = content.split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};
const BlogsSection = ({ initialBlogs = [] }) => {
  const blogs = reactExports.useMemo(() => {
    if (initialBlogs.length <= 6) return initialBlogs;
    const shuffled = [...initialBlogs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [initialBlogs]);
  if (blogs.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Latest from the Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Tips, tutorials, and insights on workflow automation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        distExports.Link,
        {
          to: "/blogs",
          title: "View all blog posts",
          className: "text-indigo-400 hover:text-indigo-300 h-auto text-sm md:text-base group flex items-center",
          children: [
            "View all posts ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/blogs/${blog.slug}`, "aria-label": `Read: ${blog.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SpotlightCard, { className: "group cursor-pointer h-full flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden rounded-t-xl bg-slate-900", children: [
        getImageUrl(blog.image_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getImageUrl(blog.image_url),
            alt: blog.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-slate-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-transparent to-transparent" }),
        blog.category?.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
          blog.category.title
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2", children: blog.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4", children: blog.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-4 text-xs text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            calculateReadTime(blog.content)
          ] })
        ] })
      ] })
    ] }) }, blog.id)) })
  ] }) });
};
const CategoriesSection = ({ initialCategories = [] }) => {
  const navigate = distExports.useNavigate();
  const [categories, setCategories] = reactExports.useState(initialCategories);
  const [loading, setLoading] = reactExports.useState(initialCategories.length === 0);
  const categoryIcons = [
    BarChart3,
    Bot,
    FileCode,
    FileJson,
    GitBranch,
    Globe,
    Mail,
    MessageSquare,
    Share2,
    ShieldCheck,
    Terminal,
    Users,
    Workflow,
    Zap
  ];
  const getIconForCategory = (cat, index) => {
    if (!cat.title) return categoryIcons[index % categoryIcons.length];
    const hash = cat.title.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return categoryIcons[hash % categoryIcons.length];
  };
  reactExports.useEffect(() => {
    if (initialCategories.length > 0) {
      const withIcons = initialCategories.slice(0, 9).map((cat, index) => ({
        ...cat,
        icon: getIconForCategory(cat, index)
      }));
      setCategories(withIcons);
      setLoading(false);
      return;
    }
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await workflowService.getWorkflowLibraryCategories();
        if (response.success && response.data) {
          const sortedCategories = [...response.data].sort((a, b) => {
            const countA = typeof a.workflows_count === "number" ? a.workflows_count : 0;
            const countB = typeof b.workflows_count === "number" ? b.workflows_count : 0;
            return countB - countA;
          });
          const categoriesWithIcons = sortedCategories.slice(0, 9).map((cat, index) => ({
            ...cat,
            icon: getIconForCategory(cat, index)
          }));
          setCategories(categoriesWithIcons);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [initialCategories.length]);
  const handleCategoryClick = (slug) => {
    navigate(`/workflows?category=${slug}`);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Browse by Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Find a starting point for your next automation." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 md:p-6 bg-[#0e0f14] rounded-xl border border-slate-800 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-slate-800 rounded-lg mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-slate-800 rounded mb-2 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-slate-800 rounded w-full" })
      ] }, i)) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Browse by Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Find a starting point for your next automation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        distExports.Link,
        {
          to: "/workflows",
          title: "View all workflow categories and templates",
          className: "text-indigo-400 hover:text-indigo-300 p-0 hover:bg-transparent md:hover:bg-accent md:p-4 h-auto text-sm md:text-base group flex items-center",
          children: [
            "View all categories ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: categories.map((cat) => {
      const Icon = cat.icon || Workflow;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SpotlightCard,
        {
          className: "group p-5 md:p-6 cursor-pointer",
          onClick: () => handleCategoryClick(cat.slug),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-slate-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: cat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: cat.badge_text || `Discover ${cat.title.toLowerCase()} automation workflows` })
          ]
        },
        cat.id
      );
    }) })
  ] }) });
};
const CodeDemoSection = () => /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 md:py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 order-2 lg:order-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: [
      "Download & Import ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Ready-to-Use ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-500", children: "n8n Workflows." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-slate-400 leading-relaxed", children: "Instantly grab powerful workflow JSON templates that get the best views. Our analysis gives you complete workflow details, custom nodes, and a seamless import experience right into your secure n8n editor." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: [
      { title: "One-Click Import", desc: "Simply copy our JSON templates directly into your n8n workspace." },
      { title: "Complete Node Analysis", desc: "Every template includes complete descriptions and analysis of nodes." },
      { title: "Free Download", desc: "Download JSON files to keep backups before launching in n8n." }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-indigo-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white text-sm md:text-base", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-slate-400", children: item.desc })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        "Download JSON Template"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
        "Copy to Clipboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "http://localhost:5689", title: "n8n local host url", target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 px-6 py-3 rounded-xl font-medium transition-colors border border-white/10 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
        "Open Local n8n Editor"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden flex flex-col h-[450px] md:h-[550px] w-full order-1 lg:order-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-10 border-b border-white/5 flex items-center px-4 bg-[#0e0e0e] justify-between shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 font-mono", children: "workflow-analysis.json" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 border-r border-white/5 bg-[#0a0a0a] p-4 hidden md:block shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-slate-400 uppercase mb-3", children: "Templates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-indigo-400 bg-indigo-500/10 p-2 rounded cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-4 h-4" }),
            " workflow-analysis.json"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-400 p-2 cursor-pointer hover:text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "w-4 h-4" }),
            " README.md"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4 md:p-6 font-mono text-xs md:text-sm overflow-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-300 whitespace-pre", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: '// How to use: Download this JSON and click "Import from File" or paste it directly in your n8n editor.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"Complete SEO & Data Analysis Workflow"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"nodes"' }),
        ": [",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"parameters"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"method"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"GET"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"url"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"https://api.edgelancer.com/api/workflow/top-view"' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        "}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"id"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"4a2c9183-b715"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"Fetch Top Views API"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"type"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"n8n-nodes-base.httpRequest"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"typeVersion"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "4.1" }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"position"' }),
        ": [",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "460" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "260" }),
        "]",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"parameters"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"content"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"## Complete Workflow Details\\n\\nThis template analyzes the data fetched and returns custom tags to be previewed."' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        "}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"id"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"9922ffaa-bb11"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"Sticky Note"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"type"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"n8n-nodes-base.stickyNote"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"typeVersion"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "1" }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"position"' }),
        ": [",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "240" }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "120" }),
        "]",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "}",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ],",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"pinData"' }),
        ": ",
        "{}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"connections"' }),
        ": ",
        "{}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"active"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "false" }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"settings"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"executionOrder"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"v1"' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        "}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"versionId"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"342111-a8ab-10222"' }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"tags"' }),
        ": [",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "{",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"analysis"' }),
        " ",
        "}",
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "    ",
        "{",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: '"high-views"' }),
        " ",
        "}",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "  ]",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "}"
      ] }) })
    ] })
  ] })
] }) });
const CTASection = () => {
  distExports.useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 md:py-40 text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter", children: "Ready for Boost your business?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto", children: "Perfect if anyone wants to build a custom automation tool." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/contact", title: "Get Started with EdgeLancer for Free", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "h-12 md:h-14 px-8 md:px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-base md:text-lg shadow-2xl shadow-indigo-500/20 font-bold w-full", children: [
          "Get Started Free ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/contact", title: "Contact our Sales Team", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "h-12 md:h-14 px-8 md:px-10 border-slate-700 text-white hover:bg-white/5 rounded-full text-base md:text-lg font-bold w-full bg-transparent", children: "Contact Sales" }) })
      ] })
    ] })
  ] });
};
const Counter = ({ end, duration = 2e3, decimals = 0 }) => {
  const [count, setCount] = reactExports.useState(end);
  reactExports.useEffect(() => {
    setCount(0);
    let startTime = null;
    let animationFrameId;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      const currentVal = ease * end;
      setCount(currentVal);
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Number(count).toFixed(decimals) });
};
const Hero = ({ initialStats = [] }) => {
  const [stats, setStats] = reactExports.useState(initialStats.length > 0 ? initialStats : [
    { label: "Workflow Views", value: 10, suffix: "M+", decimals: 0 },
    { label: "Active Users", value: 50, suffix: "K+", decimals: 0 },
    { label: "Total Workflows", value: 500, suffix: "+", decimals: 0 }
  ]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [searchLoading, setSearchLoading] = reactExports.useState(false);
  const [showResults, setShowResults] = reactExports.useState(false);
  const navigate = distExports.useNavigate();
  reactExports.useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchLoading(true);
    const handler = setTimeout(async () => {
      try {
        const res = await workflowService.getWorkflowLibrary(1, 8, searchQuery);
        if (res?.data) {
          setSearchResults(res.data);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      } catch (e) {
        setSearchResults([]);
        setShowResults(false);
      } finally {
        setSearchLoading(false);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);
  reactExports.useEffect(() => {
    if (initialStats.length > 0) return;
    const fetchStats = async () => {
      try {
        const response = await workflowService.getWorkflowStats();
        if (response.success && response.data) {
          const { total_workflows, total_visits, active_users_today } = response.data;
          setStats([
            { label: "Workflow Views", value: total_visits, suffix: "", decimals: 0 },
            { label: "Active Users", value: active_users_today, suffix: "", decimals: 0 },
            { label: "Total Workflows", value: total_workflows, suffix: "+", decimals: 0 }
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, [initialStats.length]);
  return (
    // UPDATED: Reduced padding-top from 'pt-24 md:pt-24' to 'pt-12 md:pt-16'
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative w-full min-h-[90vh] md:h-screen flex flex-col justify-center pt-12 md:pt-16 bg-[#050505] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto relative z-10 w-full px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-5", children: [
          "Ready-to-Use ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400", children: "Workflow Templates" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 px-4", children: "Start automating in seconds with our library of proven workflow templates. Customize them to fit your exact needs." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto relative mb-8 group px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 w-5 h-5 text-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search workflows...",
                className: "w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-[#0a0a0a] border border-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-2xl text-base",
                "aria-label": "Search workflows",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                onFocus: () => {
                  if (searchResults.length > 0) setShowResults(true);
                },
                onBlur: () => setTimeout(() => setShowResults(false), 200),
                autoComplete: "off"
              }
            ),
            showResults && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-14 z-20 bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl mt-2 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2", children: searchLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-slate-400 text-center text-sm", children: "Searching..." }) : searchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-slate-400 text-center text-sm", children: "No workflows found" }) : searchResults.map((wf) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "w-full text-left px-4 py-3 hover:bg-purple-900/10 transition-colors flex flex-col border-b border-slate-800 last:border-b-0",
                title: `View details for ${wf.title}`,
                onClick: () => navigate(`/workflow/${wf.slug}`),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-200 text-base", children: wf.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 line-clamp-1", children: wf.description })
                ]
              },
              wf.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs md:text-sm mb-10 font-medium px-4", children: "Connect your favorite apps, build powerful workflows, and let AI handle repetitive tasks." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8 md:gap-20 border-t border-white/5 pt-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center p-2 min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { end: stat.value, decimals: stat.decimals }),
            stat.suffix
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-wider text-center", children: stat.label })
        ] }, i)) })
      ] }) })
    ] })
  );
};
const Starfield = reactExports.lazy(() => import("./assets/Starfield-k9fR3Agq.js").then((m) => ({ default: m.Starfield })));
function LazyStarfield() {
  const [isMounted, setIsMounted] = React2.useState(false);
  React2.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, {}) });
}
const SITE_NAME = "EdgeLancer";
const DEFAULT_OG_IMAGE = "https://edgelancer.com/og-image.png";
const TWITTER_HANDLE = "@edgelancer";
const sanitizeUrl = (url) => {
  if (!url) return "";
  try {
    return url;
  } catch (e) {
    return url;
  }
};
const SEOHelmet = ({
  title,
  description = "Download ready-to-use n8n workflow automation templates and AI agents.",
  keywords,
  ogImage,
  url,
  canonical,
  metaTags = [],
  structuredData,
  ogType = "website",
  publishedTime,
  modifiedTime,
  robots = "index, follow"
}) => {
  const pageUrl = reactExports.useMemo(() => sanitizeUrl(url || (typeof window !== "undefined" ? window.location.href : "")), [url]);
  const canonicalUrl = reactExports.useMemo(() => sanitizeUrl(canonical || pageUrl), [canonical, pageUrl]);
  const finalOgImage = reactExports.useMemo(() => sanitizeUrl(ogImage || DEFAULT_OG_IMAGE), [ogImage]);
  const finalRobots = reactExports.useMemo(() => {
    if (typeof window !== "undefined" && (window.location.hostname.includes("hstgr.cloud") || window.location.hostname.includes("srv1381478"))) {
      return "noindex, follow";
    }
    return robots;
  }, [robots]);
  const structuredDataString = reactExports.useMemo(() => {
    if (!structuredData) return null;
    try {
      return JSON.stringify(structuredData);
    } catch (e) {
      console.error("Error stringifying structured data:", e);
      return null;
    }
  }, [structuredData]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: title ? title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}` : SITE_NAME }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "robots", content: finalRobots }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "googlebot", content: finalRobots }),
    canonicalUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title || SITE_NAME }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: pageUrl }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: finalOgImage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image:alt", content: `${title || SITE_NAME} – ${SITE_NAME}` }),
    ogType === "article" && publishedTime && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:published_time", content: publishedTime }),
    ogType === "article" && modifiedTime && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:modified_time", content: modifiedTime }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:site", content: TWITTER_HANDLE }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:creator", content: TWITTER_HANDLE }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: title || SITE_NAME }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: finalOgImage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image:alt", content: `${title || SITE_NAME} – ${SITE_NAME}` }),
    Array.isArray(metaTags) ? metaTags.map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: tag.name || tag.property, content: tag.content }, idx)) : Object.entries(metaTags).map(([key, value]) => {
      if (!value || typeof value !== "string") return null;
      const isProperty = key.startsWith("og:") || key.startsWith("fb:") || key.startsWith("article:");
      return isProperty ? /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: key, content: value }, key) : /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: key, content: value }, key);
    }),
    structuredDataString && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: structuredDataString }
      }
    )
  ] });
};
const SSRContext = reactExports.createContext({});
const useSSRContext = () => reactExports.useContext(SSRContext);
function HomePage() {
  const ssrData = useSSRContext();
  const [stats, setStats] = reactExports.useState(() => {
    if (!ssrData.stats) return [];
    return [
      { label: "Workflow Views", value: ssrData.stats.total_visits || 0, suffix: "", decimals: 0 },
      { label: "Active Users", value: ssrData.stats.active_users_today || 0, suffix: "", decimals: 0 },
      { label: "Total Workflows", value: ssrData.stats.total_workflows || 0, suffix: "+", decimals: 0 }
    ];
  });
  const [categories, setCategories] = reactExports.useState(ssrData.categories || []);
  const [initialWorkflows, setInitialWorkflows] = reactExports.useState(ssrData.workflows || []);
  const [blogs, setBlogs] = reactExports.useState(ssrData.blogs || []);
  const [isLoading, setIsLoading] = reactExports.useState(typeof window !== "undefined" && !ssrData.stats);
  reactExports.useEffect(() => {
    async function loadData() {
      try {
        const [statsData, categoriesData, workflowsData, blogsData] = await Promise.all([
          fetchWorkflowStats(),
          fetchWorkflowCategories(),
          fetchWorkflowLibrary(1, 12),
          fetchBlogs(1, 20)
        ]);
        if (statsData) {
          setStats([
            { label: "Workflow Views", value: statsData.total_visits || 0, suffix: "", decimals: 0 },
            { label: "Active Users", value: statsData.active_users_today || 0, suffix: "", decimals: 0 },
            { label: "Total Workflows", value: statsData.total_workflows || 0, suffix: "+", decimals: 0 }
          ]);
        }
        setCategories(categoriesData || []);
        setInitialWorkflows(workflowsData?.data || []);
        setBlogs(blogsData?.data || []);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#020204] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen$1, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020204] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHelmet,
      {
        title: ssrData.seo?.title || "EdgeLancer – n8n Workflow Automation Templates & AI Agents",
        description: ssrData.seo?.description || "Download ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer.",
        keywords: ssrData.seo?.keywords,
        ogImage: ssrData.seo?.og_image,
        metaTags: ssrData.seo?.meta_tags,
        structuredData: ssrData.seo?.structured_data,
        canonical: ssrData.seo?.canonical
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LazyStarfield, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 opacity-[0.03] pointer-events-none z-[1]", style: { backgroundImage: "url('/noise.svg')" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { id: "main-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { initialStats: stats }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductionTemplates, { initialWorkflows, initialCategories: categories }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesSection, { initialCategories: categories }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BlogsSection, { initialBlogs: blogs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BentoGrid, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodeDemoSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CTASection, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
      __html: `
                @keyframes dash {
                  to { stroke-dashoffset: -40; }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
            `
    } })
  ] });
}
function LoadingScreen$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" }) });
}
function PublicNavbarLayout({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("min-h-screen bg-[#0a0a0f]", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { id: "main-content", className: "pt-16 md:pt-20", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Card = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-primary/10", className),
      ...props
    }
  );
}
class PageService extends BaseService {
  constructor() {
    super();
  }
  async listPages() {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }
    return response.json();
  }
  async getUserPages() {
    const response = await fetch(`${this.baseUrl}/user/pages`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user pages: ${response.statusText}`);
    }
    return response.json();
  }
  async getPageBySlug(slug) {
    const response = await fetch(`${this.baseUrl}/pages/${slug}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return response.json();
  }
  async getPageBody(slug) {
    const response = await fetch(`${this.baseUrl}/pagebody/${slug}`, {
      method: "GET",
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page body: ${response.statusText}`);
    }
    return response.json();
  }
  async getPage(id) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    return response.json();
  }
  async createPage(data) {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create page");
    }
    return response.json();
  }
  async updatePage(id, data) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update page");
    }
    return response.json();
  }
  async deletePage(id) {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders()
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete page");
    }
    return response.json();
  }
  validSlugs = null;
  async getValidSlugs() {
    if (this.validSlugs) {
      return this.validSlugs;
    }
    try {
      const response = await fetch(`${this.baseUrl}/page-slugs`, {
        headers: {
          "Accept": "application/json"
          // No auth headers needed for public endpoint, but consistent header helper is fine if public
        }
      });
      if (!response.ok) {
        console.warn("Failed to fetch page slugs");
        return [];
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        this.validSlugs = result.data;
        return result.data;
      }
      return [];
    } catch (error) {
      console.warn("Error fetching page slugs", error);
      return [];
    }
  }
}
const pageService = new PageService();
function usePageMeta(config) {
  const [page, setPage] = reactExports.useState(null);
  const [seo, setSeo] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const fetchPage = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!config.slug) {
        setPage(null);
        setSeo(null);
        setLoading(false);
        return;
      }
      const validSlugs = await pageService.getValidSlugs();
      if (validSlugs && validSlugs.length > 0 && !validSlugs.includes(config.slug)) {
        setPage(null);
        setSeo(null);
        setLoading(false);
        return;
      }
      const response = await pageService.getPageBody(config.slug);
      if (response.success && response.data && response.data.is_active) {
        setPage(response.data);
        setSeo(response.seo || null);
      } else {
        setPage(null);
        setSeo(null);
      }
    } catch (err) {
      console.error("Error fetching page metadata:", err);
      setPage(null);
      setSeo(null);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchPage();
  }, [config.slug]);
  const title = seo?.title || page?.meta_title || page?.title || config.defaultTitle || "EdgeLancer";
  const description = seo?.description || page?.meta_description || config.defaultDescription || "";
  const keywords = seo?.keywords || page?.meta_keywords || "";
  const ogImage = seo?.og_image || page?.og_image || "";
  const canonical = seo?.canonical || void 0;
  const metaTags = { ...page?.meta_tags || {}, ...seo?.meta_tags || {} };
  const structuredData = seo?.structured_data || (page?.meta_tags?.["@context"] ? page?.meta_tags : void 0);
  return {
    page,
    seo,
    loading,
    error,
    updateMeta: fetchPage,
    resolved: { title, description, keywords, ogImage, canonical, metaTags, structuredData }
  };
}
const BlogCard = reactExports.memo(({ blog, priority = false }) => {
  const getImageUrl2 = (url) => {
    if (!url) return null;
    if (url.includes("localhost")) return null;
    return url;
  };
  const getAuthorInitial = (name) => (name || "N").charAt(0).toUpperCase();
  const calculateReadTime2 = (content) => {
    if (!content) return "5 min read";
    const words = content.split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/blogs/${blog.slug}`, "aria-label": `Read article: ${blog.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-slate-900", children: [
      getImageUrl2(blog.image_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getImageUrl2(blog.image_url),
          alt: blog.title,
          width: "600",
          height: "338",
          fetchPriority: priority ? "high" : "low",
          loading: priority ? "eager" : "lazy",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-slate-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-4 left-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1" }),
        blog.category?.title || "General"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors", children: blog.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 mb-4 line-clamp-2", children: blog.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold shrink-0", children: getAuthorInitial(blog.author?.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-400 truncate", children: blog.author?.name || "Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
            formatDistanceToNow(new Date(blog.published_at || blog.created_at), { addSuffix: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            calculateReadTime2(blog.content)
          ] })
        ] })
      ] })
    ] })
  ] }) });
});
function BlogPage({ categorySlug }) {
  usePageMeta({
    slug: "blogs",
    defaultTitle: "Blog - EdgeLancer",
    defaultDescription: "Read the latest articles, tutorials, and insights about workflow automation and AI."
  });
  const ssrData = useSSRContext();
  const [searchParams] = distExports.useSearchParams();
  const [blogs, setBlogs] = reactExports.useState(ssrData?.blogs?.data || ssrData?.blogs || []);
  const [categories, setCategories] = reactExports.useState(ssrData?.categories || []);
  const [loading, setLoading] = reactExports.useState(!ssrData?.blogs);
  const [categoriesLoading, setCategoriesLoading] = reactExports.useState(!ssrData?.categories);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState(categorySlug || searchParams.get("category") || "all");
  const [page, setPage] = reactExports.useState(ssrData?.blogs?.current_page || 1);
  const [totalPages, setTotalPages] = reactExports.useState(ssrData?.blogs?.last_page || 1);
  const [totalBlogs, setTotalBlogs] = reactExports.useState(ssrData?.blogs?.total || 0);
  const [globalTotal, setGlobalTotal] = reactExports.useState(ssrData?.blogs?.total || 0);
  reactExports.useEffect(() => {
    setActiveCategory(categorySlug || searchParams.get("category") || "all");
  }, [searchParams, categorySlug]);
  reactExports.useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const result = await blogService.getCategories();
        if (result.success && result.data) setCategories(result.data);
      } catch (e) {
        console.error(e);
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);
  reactExports.useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const categorySlugValue = activeCategory === "all" ? void 0 : activeCategory;
        const result = await blogService.getAll(page, 12, searchQuery, categorySlugValue);
        if (result.success && result.data) {
          setBlogs(result.data.data || []);
          setTotalPages(result.data.last_page || 1);
          setTotalBlogs(result.data.total || 0);
          if (!categorySlugValue && !searchQuery) {
            setGlobalTotal(result.data.total || 0);
          }
        } else {
          setBlogs([]);
        }
      } catch (e) {
        console.error(e);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadBlogs, 350);
    return () => clearTimeout(timer);
  }, [page, activeCategory, searchQuery]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);
  const featuredBlogs = blogs.filter((blog) => blog.is_featured);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-16 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none transform-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto text-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-6 bg-white/5 text-cyan-400 border-cyan-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 mr-1" }),
          "Blog & Resources"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight", children: "Insights & Updates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-slate-300 max-w-2xl mx-auto mb-10", children: "Tips, strategies, and news to help you grow your freelance business with AI automation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              "aria-label": "Search articles",
              placeholder: "Search articles...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl"
            }
          )
        ] }) })
      ] })
    ] }),
    (loading || featuredBlogs.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-8", children: "Featured Articles" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-8", children: featuredBlogs.slice(0, 2).map((blog, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { blog, priority: idx === 0 }, blog.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", role: "group", "aria-label": "Blog categories", children: categoriesLoading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-12 bg-white/5 rounded-lg" }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setActiveCategory("all");
                setPage(1);
              },
              className: `w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === "all" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "All Posts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-white/10", children: globalTotal > 0 ? globalTotal : totalBlogs })
              ]
            }
          ),
          categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setActiveCategory(cat.slug);
                setPage(1);
              },
              className: `w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === cat.slug ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: cat.title })
            },
            cat.id
          ))
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "All Blogs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }) })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/10] bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-3/4 h-5 bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-4 bg-white/5" })
          ] })
        ] }, idx)) }) : blogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50", children: "No posts found. Try another category or search term." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { blog }, blog.id)) }),
        !loading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "border-white/20 text-white hover:bg-white/5",
              disabled: page === 1,
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "border-white/20 text-white hover:bg-white/5",
              disabled: page >= totalPages,
              onClick: () => setPage((p) => p + 1),
              children: "Next"
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Subscribe to Newsletter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mb-8", children: "Get the latest articles and insights delivered to your inbox." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "email",
            "aria-label": "Email address",
            placeholder: "Your email address",
            className: "h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 flex-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 px-8", children: "Subscribe" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { type: "page", slug: "blogs" })
  ] });
}
function BlogSlugPage() {
  const { slug } = distExports.useParams();
  const ssrData = useSSRContext();
  const [blog, setBlog] = reactExports.useState(ssrData.blog || null);
  const [seo, setSeo] = reactExports.useState(ssrData.seo);
  const [loading, setLoading] = reactExports.useState(!ssrData.blog);
  const [error, setError] = reactExports.useState("");
  const [relatedBlogs, setRelatedBlogs] = reactExports.useState(ssrData.relatedBlogs || []);
  const [relatedWorkflows, setRelatedWorkflows] = reactExports.useState(ssrData.relatedWorkflows || []);
  const [failedRelatedBlogImages, setFailedRelatedBlogImages] = reactExports.useState({});
  const [isCopied, setIsCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const result = await blogService.getBySlugWithSeo(slug);
      if (result.success && result.data) {
        setBlog(result.data.blog);
        setSeo(result.data.seo);
        if (result.data.relatedBlogs) setRelatedBlogs(result.data.relatedBlogs);
        if (result.data.relatedWorkflows) setRelatedWorkflows(result.data.relatedWorkflows);
        setError("");
      } else {
        setError(result.message || "Article not found");
        setBlog(null);
      }
      setLoading(false);
    };
    const loadRelated = async () => {
      if (!slug) return;
      try {
        const result = await blogService.getRelatedBlogs(slug);
        if (result.success && result.data) {
          setRelatedBlogs(result.data);
        }
      } catch (err) {
        console.error("Error loading related blogs:", err);
      }
    };
    const loadRelatedWorkflows = async () => {
      if (!slug) return;
      try {
        const result = await blogService.getRelatedWorkflows(slug);
        if (result.success && result.data) {
          setRelatedWorkflows(result.data);
        }
      } catch (err) {
        console.error("Error loading related workflows:", err);
      }
    };
    load();
    loadRelated();
    loadRelatedWorkflows();
  }, [slug]);
  const handleShare = async () => {
    if (!blog) return;
    const shareData = {
      title: blog.title,
      text: blog.description || "Check out this amazing article!",
      url: window.location.href
    };
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2e3);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };
  const publishedDate = blog?.published_at || blog?.created_at;
  const getRelatedBlogKey = (rBlog) => String(rBlog?.id ?? rBlog?.slug ?? rBlog?.title ?? "related-blog");
  const getRelatedBlogFallbackIcon = (rBlog) => {
    const fallbackIcons = [Newspaper, Sparkles, FileText, Bot, WandSparkles];
    const key = getRelatedBlogKey(rBlog);
    const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return fallbackIcons[hash % fallbackIcons.length];
  };
  const readingTime = blog?.content ? Math.ceil(blog.content.replace(/<[^>]+>/g, "").split(" ").length / 200) : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicNavbarLayout, { className: "bg-[#030303] selection:bg-indigo-500/30 selection:text-indigo-200", children: [
    blog && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHelmet,
      {
        title: seo?.title || blog.title,
        description: seo?.description || blog.description,
        keywords: seo?.keywords || blog.meta_keywords,
        ogImage: seo?.og_image || blog.image_url || void 0,
        ogType: "article",
        publishedTime: blog.published_at,
        modifiedTime: blog.updated_at,
        structuredData: seo?.structured_data,
        metaTags: seo?.meta_tags,
        robots: seo?.robots
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] opacity-70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] opacity-60" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 animate-in fade-in duration-700", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-pulse max-w-3xl mx-auto mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 bg-white/5 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full bg-white/5 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-3/4 bg-white/5 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/2 bg-white/5 rounded-lg mt-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-3xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6 bg-white/5" })
        ] })
      ] }),
      !loading && error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-32 text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-red-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white", children: "Article Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 max-w-md", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/blogs", children: "Explore Other Articles" }) })
      ] }),
      !loading && blog && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "space-y-8 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: "/blogs",
              className: "inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }) }),
                "Back to Articles"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            blog.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-bold rounded-full", children: blog.category.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]", children: blog.title }),
            blog.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-slate-400 leading-relaxed font-light", children: blog.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/5 border border-white/10 rounded-full py-1.5 pl-1.5 pr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-200", children: blog.author?.name || "EdgeLancer Team" })
            ] }),
            publishedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-slate-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: publishedDate, className: "font-medium", children: format(new Date(publishedDate), "MMM d, yyyy") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-slate-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                readingTime,
                " min read"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4 ml-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-slate-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                blog.views?.toLocaleString() ?? 0,
                " views"
              ] })
            ] })
          ] })
        ] }) }),
        blog.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto w-full mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] bg-[#0a0a0f] group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: blog.image_url,
              alt: blog.title,
              className: "w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                .blog-content {
                  font-size: 1.125rem;
                  line-height: 1.8;
                }

                /* --- FIX FOR DULL TEXT INJECTED FROM CMS --- */
                /* Force standard text elements to be readable light grey, overriding inline styles */
                .blog-content p,
                .blog-content li,
                .blog-content div:not(.table-container) {
                  color: #cbd5e1 !important; /* slate-300 */
                }

                /* Force inline spans to inherit the corrected light grey color */
                .blog-content span:not([class]) {
                  color: inherit !important;
                }

                /* Ensure Headings are bright white */
                .blog-content h1, .blog-content h2, .blog-content h3,
                .blog-content h4, .blog-content h5, .blog-content h6 {
                  color: #ffffff !important;
                  font-weight: 700;
                  letter-spacing: -0.025em;
                }

                /* Specific Heading spacing */
                .blog-content h2 {
                  font-size: 2rem;
                  margin-top: 3.5rem;
                  margin-bottom: 1.5rem;
                  padding-bottom: 0.75rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .blog-content h3 {
                  font-size: 1.5rem;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }

                .blog-content p, .blog-content ul, .blog-content ol {
                  margin-bottom: 1.5rem;
                }

                /* Ensure Bold text pops */
                .blog-content strong,
                .blog-content b {
                  color: #ffffff !important;
                  font-weight: 600;
                }

                /* Lists */
                .blog-content ul, .blog-content ol {
                  padding-left: 1.5rem;
                }
                .blog-content li {
                  margin-bottom: 0.75rem;
                }
                .blog-content li::marker {
                  color: #6366f1;
                }

                /* Tables */
                .blog-content .table-container,
                .blog-content table {
                  width: 100%;
                  border-collapse: separate;
                  border-spacing: 0;
                  margin: 2.5rem 0;
                  border-radius: 1rem;
                  overflow: hidden;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  background: rgba(255, 255, 255, 0.02);
                }
                .blog-content th {
                  background-color: rgba(0, 0, 0, 0.4);
                  color: #e2e8f0;
                  font-weight: 600;
                  text-align: left;
                  padding: 1rem 1.25rem;
                  font-size: 0.875rem;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .blog-content td {
                  padding: 1rem 1.25rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                  font-size: 0.95rem;
                  color: #cbd5e1; /* slate-300 */
                }
                .blog-content tr:last-child td {
                  border-bottom: none;
                }
                .blog-content tbody tr:hover td {
                  background-color: rgba(255, 255, 255, 0.03);
                }

                /* Code Blocks & Inline Code */
                .blog-content pre {
                  background: #0d1117; /* deep dark slate */
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 0.75rem;
                  padding: 1.25rem;
                  overflow-x: auto;
                  margin: 2rem 0;
                  color: #e2e8f0;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                  font-size: 0.875rem;
                  line-height: 1.6;
                  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
                }

                /* Protect syntax highlighting colors inside code blocks */
                .blog-content pre *, .blog-content code * {
                  color: inherit !important;
                }

                .blog-content :not(pre) > code {
                  background-color: rgba(99, 102, 241, 0.15);
                  color: #a5b4fc !important;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.375rem;
                  font-family: inherit;
                  font-size: 0.875em;
                  border: 1px solid rgba(99, 102, 241, 0.2);
                }

                /* Links */
                .blog-content a:not(.download-workflow-btn) {
                  color: #818cf8 !important; /* indigo-400 */
                  text-decoration: none;
                  border-bottom: 1px dashed rgba(129, 140, 248, 0.4);
                  transition: all 0.2s ease;
                }
                .blog-content a:not(.download-workflow-btn):hover {
                  color: #a5b4fc !important;
                  border-bottom-color: #a5b4fc;
                }

                /* Injected Download Button */
                .blog-content .download-workflow-btn {
                  display: inline-flex;
                  align-items: center;
                  gap: 0.6rem;
                  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
                  color: #ffffff !important;
                  font-size: 0.95rem;
                  font-weight: 600;
                  padding: 0.875rem 1.5rem;
                  border-radius: 0.75rem;
                  text-decoration: none !important;
                  margin: 2rem 0;
                  box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.4);
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .blog-content .download-workflow-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 25px -2px rgba(79, 70, 229, 0.5);
                }
                .blog-content .download-workflow-btn svg {
                  stroke: #ffffff;
                }

                /* Blockquotes */
                .blog-content blockquote {
                  border-left: 4px solid #6366f1;
                  background: linear-gradient(to right, rgba(99, 102, 241, 0.1), transparent);
                  padding: 1rem 1.5rem;
                  margin: 2rem 0;
                  border-radius: 0 0.75rem 0.75rem 0;
                  font-style: italic;
                  color: #cbd5e1;
                }

                /* Override light backgrounds */
                .blog-content [style*="background-color: white"],
                .blog-content [style*="background-color: #fff"],
                .blog-content [style*="background: white"],
                .blog-content .bg-white {
                  background-color: transparent !important;
                  background: transparent !important;
                }
              ` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "blog-content w-full",
              dangerouslySetInnerHTML: {
                __html: (blog.content || "").replace(/http:\/\/localhost:3000\/templates\//g, "https://edgelancer.com/workflow/").replace(/http:\/\/localhost:3000\/workflow\//g, "https://edgelancer.com/workflow/").replace(/http:\/\/localhost:3000\//g, "https://edgelancer.com/workflow/").replace(/http:\/\/localhost:3000/g, "https://edgelancer.com/workflow").replace(
                  /<a([^>]*?)href="([^"]*)"([^>]*?)>(.*?)<\/a>/gi,
                  (match, p1, p2, p3, p4) => {
                    if (p4.includes("http") || p2.includes("/webhook/")) {
                      return `<a${p1}href="${p2}"${p3} class="download-workflow-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <span>Download Workflow</span>
                          </a>`;
                    }
                    return match;
                  }
                )
              }
            }
          ),
          blog.faqs && blog.faqs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 pt-16 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { data: blog.faqs, title: "Frequently Asked Questions", className: "py-0" }) })
        ] }),
        (relatedWorkflows.length > 0 || relatedBlogs.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 pt-16 border-t border-white/5 space-y-20", children: [
          relatedWorkflows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-in fade-in slide-in-from-bottom-8 duration-1000", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between gap-6 mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-3.5 h-3.5 text-cyan-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-cyan-400 uppercase tracking-widest", children: "Automation" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white tracking-tight", children: "Automate this with Workflows" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg font-light max-w-2xl", children: "Ready-to-use n8n templates designed to implement the strategies discussed in this article instantly." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                distExports.Link,
                {
                  to: "/workflow-library",
                  className: "group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-2xl text-white font-semibold transition-all",
                  children: [
                    "Explore Library",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: relatedWorkflows.slice(0, 4).map((workflow) => {
              const price = parseFloat(workflow.price || "0");
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  id: `related-workflow-card-${workflow.id}`,
                  className: "group flex flex-col bg-[#0a0a0e] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-slate-900 flex shrink-0 aspect-[16/10] w-full", children: [
                      workflow.og_image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: workflow.og_image,
                          alt: workflow.title,
                          className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-16 h-16 text-slate-700/50 group-hover:scale-110 group-hover:text-cyan-500/30 transition-all duration-700" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 flex flex-col gap-2", children: price === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500 text-white border-0 shadow-lg px-3 py-1 font-bold text-[10px] uppercase", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-white text-black border-0 shadow-lg px-3 py-1 font-bold text-[10px]", children: [
                        "$",
                        workflow.price
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col flex-1 justify-between gap-6 relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/80", children: workflow.category?.title || "Workflow Template" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
                            workflow.rating || "5.0"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white group-hover:text-cyan-400 transition-colors leading-[1.25] text-xl md:text-2xl line-clamp-2", children: workflow.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-light leading-relaxed text-sm md:text-base line-clamp-2", children: workflow.description })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-6 border-y border-white/5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-slate-500 font-bold", children: "Complexity" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-300 font-medium text-xs capitalize", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5 text-cyan-500/50" }),
                              workflow.difficulty || "Beginner"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-slate-500 font-bold", children: "Automation Nodes" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-300 font-medium text-xs", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3.5 h-3.5 text-cyan-500/50" }),
                              workflow.nodes_count || 12,
                              " Nodes"
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-500 text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-[#0a0a0e] bg-slate-800" }, i)) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
                              (workflow.views || workflow.total_views || 100).toLocaleString(),
                              "+ active users"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            distExports.Link,
                            {
                              to: `/workflow/${workflow.slug}`,
                              className: "w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-0.5" })
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ]
                },
                workflow.id
              );
            }) })
          ] }),
          relatedBlogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-white mb-2 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-8 h-8 text-indigo-400" }),
                  "Continue Reading"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Deepen your knowledge with related articles" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                distExports.Link,
                {
                  to: "/blogs",
                  className: "group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors",
                  children: [
                    "All Articles ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: relatedBlogs.slice(0, 4).map((rBlog) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              distExports.Link,
              {
                to: `/blogs/${rBlog.slug}`,
                className: "group flex flex-col sm:flex-row gap-5 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full sm:w-40 aspect-video sm:aspect-square overflow-hidden rounded-2xl shrink-0 border border-white/10 bg-[#050507]", children: (() => {
                    const imageSrc = rBlog.image_url || rBlog.image;
                    const imageKey = getRelatedBlogKey(rBlog);
                    const showImage = Boolean(imageSrc) && !failedRelatedBlogImages[imageKey];
                    const FallbackIcon = getRelatedBlogFallbackIcon(rBlog);
                    if (!showImage) {
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FallbackIcon, { className: "w-8 h-8 text-indigo-500/50" }) });
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageSrc,
                        alt: rBlog.title,
                        onError: () => setFailedRelatedBlogImages((prev) => ({ ...prev, [imageKey]: true })),
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      }
                    );
                  })() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center flex-1 min-w-0 py-2 pr-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2", children: rBlog.category?.title || "Article" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight mb-2 line-clamp-2", children: rBlog.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm line-clamp-2 leading-relaxed", children: rBlog.description })
                  ] })
                ]
              },
              rBlog.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto w-full mt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-5 h-5 text-indigo-400" }),
              "Topics & Guidelines"
            ] }),
            blog.meta_keywords ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: blog.meta_keywords.split(",").map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              distExports.Link,
              {
                to: `/blogs?tag=${tag.trim()}`,
                className: "text-xs font-medium px-4 py-2 rounded-full bg-[#111] text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all border border-white/5 hover:border-indigo-500/30 shadow-sm",
                children: tag.trim()
              },
              idx
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "No specific tags for this article." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 font-medium", children: "Found this helpful?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleShare,
                className: "w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white gap-2 h-12 px-6 rounded-xl transition-all shadow-lg",
                children: isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-400" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: "Copied!" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-slate-300" }),
                  " Share Article"
                ] })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden flex justify-center pt-16 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/blogs", className: "flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Back to all articles"
        ] }) })
      ] })
    ] })
  ] });
}
function WorkflowsPage() {
  usePageMeta({
    slug: "workflows",
    defaultTitle: "Workflow Templates - EdgeLancer",
    defaultDescription: "Browse and download ready-to-use workflow templates for automation, AI, marketing, and more."
  });
  const ssrData = useSSRContext();
  const [searchParams] = distExports.useSearchParams();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const initialCategories = reactExports.useMemo(() => {
    return ssrData?.categories || [];
  }, [ssrData]);
  const initialWorkflows = reactExports.useMemo(() => {
    return ssrData?.workflows?.data || ssrData?.workflows || [];
  }, [ssrData]);
  const initialTotalPages = reactExports.useMemo(() => {
    return ssrData?.workflows?.last_page || 1;
  }, [ssrData]);
  const initialTotalWorkflows = reactExports.useMemo(() => {
    return ssrData?.workflows?.total || 0;
  }, [ssrData]);
  const [categories, setCategories] = reactExports.useState(initialCategories);
  const [workflows, setWorkflows] = reactExports.useState(initialWorkflows);
  const [loading, setLoading] = reactExports.useState(!ssrData?.workflows);
  const [page, setPage] = reactExports.useState(ssrData?.workflows?.current_page || 1);
  const [totalPages, setTotalPages] = reactExports.useState(initialTotalPages);
  const [showAllCategories, setShowAllCategories] = reactExports.useState(false);
  const [totalWorkflows, setTotalWorkflows] = reactExports.useState(initialTotalWorkflows);
  const iconPool2 = [
    Zap,
    Bot,
    GitBranch,
    Layers,
    LayoutGrid,
    Workflow,
    Mail,
    MessageSquare,
    Globe,
    Database,
    FileText,
    Share2,
    Smartphone,
    Cpu,
    BarChart,
    Settings,
    Bell,
    Cloud,
    Code
  ];
  const gradientPool2 = [
    "from-purple-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
    "from-fuchsia-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-blue-400 to-indigo-600"
  ];
  const getWorkflowVisuals2 = (id) => {
    const safeId = id || Math.floor(Math.random() * 100);
    const Icon = iconPool2[safeId % iconPool2.length];
    const gradient = gradientPool2[safeId % gradientPool2.length];
    return { Icon, gradient };
  };
  reactExports.useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await workflowService.getWorkflowLibraryCategories();
        if (res.success && res.data) {
          setCategories(res.data);
          const slug = searchParams.get("category");
          if (slug) {
            const found = res.data.find((c) => c.slug === slug);
            if (found) setActiveCategory(found.id);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCats();
  }, [searchParams]);
  reactExports.useEffect(() => {
    const loadWorkflows = async () => {
      setLoading(true);
      try {
        const categoryId = activeCategory === "all" ? null : activeCategory;
        const res = await workflowService.getWorkflowLibrary(page, 12, searchQuery, categoryId);
        if (res.data) {
          setWorkflows(res.data.data || res.data || []);
          setTotalPages(res.data.last_page || 1);
          setTotalWorkflows(res.data.total || 0);
        } else {
          setWorkflows([]);
          setTotalPages(1);
          setTotalWorkflows(0);
        }
      } catch (e) {
        console.error(e);
        setWorkflows([]);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(loadWorkflows, 350);
    return () => clearTimeout(timer);
  }, [page, activeCategory, searchQuery]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [searchQuery, activeCategory]);
  const featuredWorkflows = workflows.slice(0, 4);
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-16 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none transform-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto text-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mb-6 bg-white/5 text-cyan-400 border-cyan-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3 h-3 mr-1" }),
          totalWorkflows > 0 ? `${totalWorkflows}+ Templates` : "Loading Templates..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight", children: [
          "Ready-to-Use",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400", children: "Workflow Templates" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-slate-300 max-w-2xl mx-auto mb-10", children: "Start automating in seconds with our library of proven workflow templates." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "text",
              "aria-label": "Search workflows",
              placeholder: "Search workflows...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl"
            }
          )
        ] }) })
      ] })
    ] }),
    (loading || featuredWorkflows.length > 0) && !searchQuery && activeCategory === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-8", children: "Featured Workflows" }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-8", children: featuredWorkflows.slice(0, 2).map((workflow, idx) => {
        const { Icon, gradient } = getWorkflowVisuals2(workflow.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/workflow/${workflow.slug}`, "aria-label": `Open workflow: ${workflow.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-slate-900 p-6 flex items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-br ${gradient} opacity-25` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4 z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white group-hover:text-cyan-400 transition-colors", children: workflow.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300", children: workflow.category?.title || "Workflow Template" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 mb-4 line-clamp-2", children: workflow.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                " ",
                workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0,
                " uses"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-500 fill-current" }),
                " ",
                workflow.rating || "5.0"
              ] })
            ] })
          ] })
        ] }) }, `featured-${workflow.id}`);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", role: "group", "aria-label": "Workflow categories", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveCategory("all"),
              className: cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all",
                activeCategory === "all" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "All Templates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-white/10", children: totalWorkflows })
              ]
            }
          ),
          visibleCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveCategory(cat.id),
              className: cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all",
                activeCategory === cat.id ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: cat.title })
            },
            cat.id
          )),
          categories.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowAllCategories(!showAllCategories),
              className: "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all text-cyan-400 hover:text-cyan-300 bg-white/5 border border-white/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: showAllCategories ? "Show Less" : "Show All" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: showAllCategories ? "▲" : "▼" })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "All Workflows" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }) })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[16/10] bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-3/4 h-5 bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-4 bg-white/5" })
          ] })
        ] }, idx)) }) : workflows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50", children: "No templates found. Try another category or search term." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: workflows.map((workflow) => {
          const { Icon, gradient } = getWorkflowVisuals2(workflow.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/workflow/${workflow.slug}`, "aria-label": `Open workflow: ${workflow.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end pl-2", children: [
                Number(workflow.price) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-white/10 text-gray-300 text-xs", children: [
                  "$",
                  workflow.price
                ] }),
                workflow.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
                  workflow.rating
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex-grow", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors", children: workflow.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 line-clamp-2", children: workflow.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-6", children: [
              workflow.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-xs font-normal", children: workflow.category.title }),
              workflow.nodes_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-xs font-normal gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3 h-3" }),
                workflow.nodes_count,
                " Nodes"
              ] }),
              workflow.difficulty && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-xs font-normal capitalize", children: workflow.difficulty }),
              workflow.time_saved_value && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-cyan-500/20 text-cyan-400 text-xs font-normal gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                workflow.time_saved_value,
                " ",
                workflow.time_saved_unit
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/5 mt-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0,
                  " views"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cyan-400 font-medium flex items-center gap-1", children: [
                "Download ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }) }) }, workflow.id);
        }) }),
        !loading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-white/20 text-white hover:bg-white/5", disabled: page === 1, onClick: () => setPage((p) => Math.max(1, p - 1)), children: "Previous" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-white/20 text-white hover:bg-white/5", disabled: page >= totalPages, onClick: () => setPage((p) => p + 1), children: "Next" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Setup Guide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 mb-8", children: "Open a workflow, inspect the JSON config, and follow the setup steps to import it into n8n." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-cyan-400 mb-2", children: "1. Download" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-300", children: "Use the workflow page to download the JSON package." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-cyan-400 mb-2", children: "2. Import" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-300", children: "Import into n8n from file and map your credentials." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-cyan-400 mb-2", children: "3. Run" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-300", children: "Test the workflow once, then enable it for production use." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { type: "page", slug: "workflows" })
  ] });
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const LucideIconMap = {
  "lucide-share-2": Share2,
  "lucide-star": Star,
  "lucide-users": Users,
  "lucide-clock": Clock,
  "lucide-trending-up": TrendingUp,
  "lucide-code": Code
};
const N8nNode = ({ data }) => {
  const getNodeStyle = (type) => {
    const baseType = type.toLowerCase();
    if (baseType.includes("trigger") || baseType.includes("webhook")) {
      return { icon: Zap, gradient: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/20", border: "border-emerald-500/50", bg: "bg-emerald-950/90" };
    }
    if (baseType.includes("agent") || baseType.includes("ai") || baseType.includes("langchain")) {
      return { icon: Cpu, gradient: "from-fuchsia-500 to-pink-500", shadow: "shadow-fuchsia-500/20", border: "border-fuchsia-500/50", bg: "bg-fuchsia-950/90" };
    }
    if (baseType.includes("drive") || baseType.includes("sheets") || baseType.includes("postgres")) {
      return { icon: Database, gradient: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20", border: "border-blue-500/50", bg: "bg-blue-950/90" };
    }
    if (baseType.includes("switch") || baseType.includes("if") || baseType.includes("merge")) {
      return { icon: GitBranch, gradient: "from-orange-500 to-amber-400", shadow: "shadow-orange-500/20", border: "border-orange-500/50", bg: "bg-orange-950/90" };
    }
    if (baseType.includes("http") || baseType.includes("request")) {
      return { icon: Globe, gradient: "from-violet-500 to-indigo-400", shadow: "shadow-violet-500/20", border: "border-violet-500/50", bg: "bg-violet-950/90" };
    }
    return { icon: Box, gradient: "from-slate-500 to-gray-400", shadow: "shadow-slate-500/20", border: "border-slate-500/50", bg: "bg-slate-900/90" };
  };
  const { icon: IconComponent, gradient, shadow, border, bg } = getNodeStyle(data.type || "");
  const isSticky = data.type && data.type.includes("stickyNote");
  if (isSticky) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 md:p-8 rounded-3xl border border-yellow-500/10 relative overflow-hidden group transition-all duration-300",
        style: { width: data.width || 300, height: data.height || "auto", backgroundColor: "rgba(255, 200, 0, 0.02)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-[60%] h-[60%] bg-yellow-500/5 blur-[60px] pointer-events-none rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 text-yellow-200/50 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold mb-3", children: "Annotation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative z-10 text-yellow-100/80 whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed",
              dangerouslySetInnerHTML: { __html: data.content?.replace(/\n/g, "<br/>") }
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative group min-w-[220px] md:min-w-[260px] rounded-2xl border ${border} ${bg} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl ${shadow}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Handle$1,
      {
        type: "target",
        position: Position.Left,
        className: "!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-full rounded-t-2xl bg-gradient-to-r ${gradient} opacity-80` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-5 flex items-start gap-3 md:gap-4 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center flex-shrink-0 text-white`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-5 h-5 md:w-6 md:h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm font-bold text-white tracking-wide truncate pr-1 drop-shadow-md", children: data.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1.5 md:mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] md:text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded-md border border-white/5 truncate max-w-full", children: data.subLabel || "NODE" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Handle$1,
      {
        type: "source",
        position: Position.Right,
        className: "!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
      }
    )
  ] });
};
const WorkflowPreview = ({ nodes, edges }) => {
  const nodeTypes = reactExports.useMemo(() => ({ custom: N8nNode }), []);
  const { fitView } = useReactFlow();
  reactExports.useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [nodes, fitView]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-[#0a0a0a] relative overflow-hidden pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReactFlow,
      {
        nodes,
        edges,
        nodeTypes,
        fitView: true,
        proOptions: { hideAttribution: true },
        className: "bg-transparent",
        minZoom: 0.1,
        maxZoom: 1.5,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Background$1, { color: "#333", gap: 20, size: 1, className: "opacity-20" })
      }
    )
  ] });
};
function SocialShareDialog({ isOpen, onClose, workflow, nodes = [], edges = [] }) {
  const [copied, setCopied] = reactExports.useState(false);
  if (!workflow) return null;
  const [shareUrl, setShareUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (typeof window !== "undefined" && workflow) {
      setShareUrl(`${window.location.origin}/workflow/${workflow.slug}`);
    }
  }, [workflow?.slug]);
  const shareText = `Check out this automation workflow: ${workflow.title} on EdgeLancer!`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const socialPlatforms = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] border-[#1DA1F2]/20",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] border-[#0A66C2]/20",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] border-[#1877F2]/20",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-[#25D366]/20 hover:text-[#25D366] border-[#25D366]/20",
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    },
    {
      name: "Slack",
      icon: Slack,
      color: "hover:bg-[#4A154B]/20 hover:text-[#4A154B] border-[#4A154B]/20",
      action: () => {
        navigator.clipboard.writeText(shareText + " " + shareUrl);
        alert("Copied to clipboard for Slack!");
      }
    },
    {
      name: "Teams",
      icon: Users,
      color: "hover:bg-[#6264A7]/20 hover:text-[#6264A7] border-[#6264A7]/20",
      url: `https://teams.microsoft.com/share?href=${encodedUrl}&msg=${encodedText}`
    },
    {
      name: "Telegram",
      icon: Send,
      color: "hover:bg-[#0088cc]/20 hover:text-[#0088cc] border-[#0088cc]/20",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-500/20 hover:text-gray-300 border-gray-500/20",
      url: `mailto:?subject=${encodeURIComponent(workflow.title)}&body=${encodedText}%0A%0A${encodedUrl}`
    }
  ];
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md bg-[#0a0a0f] border-white/10 text-white sm:max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5 text-purple-400" }),
      "Share Workflow"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 relative w-full bg-[#050505]", children: [
          nodes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowPreview, { nodes, edges }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-slate-400 text-sm", children: workflow.og_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: workflow.og_image, alt: workflow.title, className: "w-full h-full object-cover opacity-50" }) : "No preview available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#0a0a0f] border-t border-white/5 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-gray-200 mb-1 line-clamp-1", children: workflow.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 line-clamp-2", children: workflow.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500" }),
            "EdgeLancer Automation"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-4 gap-3", children: socialPlatforms.map((platform) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: platform.action ? platform.action : () => platform.url && window.open(platform.url, "_blank"),
          title: `Share on ${platform.name}`,
          className: `flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:scale-105 active:scale-95 group ${platform.color}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(platform.icon, { className: "w-5 h-5 transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-gray-400 group-hover:text-current", children: platform.name })
          ]
        },
        platform.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-gray-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: shareUrl,
            readOnly: true,
            className: "pl-10 pr-24 bg-white/5 border-white/10 text-gray-300 h-11 focus:ring-purple-500/20 focus:border-purple-500/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: handleCopy,
            className: `absolute right-1 top-1 h-9 px-4 transition-all ${copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-white/10 text-white hover:bg-white/20"}`,
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Copied"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Copy"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
const WorkflowReviewsSection = ({ workflowSlug, reviews = [], totalReviews = 0, averageRating = 0 }) => {
  const [rating, setRating] = reactExports.useState(0);
  const [hoverRating, setHoverRating] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if ((!name || !email) && !localStorage.getItem("token")) {
      if (!name.trim() || !email.trim()) {
        setError("Name and Email are required");
        return;
      }
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        rating,
        comment,
        name,
        email
      };
      const response = await workflowService.submitReview(workflowSlug, payload);
      if (response.success) {
        setSubmitted(true);
        setRating(0);
        setComment("");
        setName("");
        setEmail("");
      } else {
        setError(response.message || "Failed to submit review");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 md:mt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-amber-500 fill-amber-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white", children: "Reviews & Ratings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-6", children: reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 italic", children: "No reviews yet. Be the first to share your experience!" }) : reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-white flex items-center gap-2", children: [
                review.name || "Anonymous",
                review.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  " Verified"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400", children: new Date(review.created_at).toLocaleDateString() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-4 h-4 ${s <= review.rating ? "text-amber-500 fill-amber-500" : "text-slate-700"}` }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm leading-relaxed", children: review.comment })
      ] }, review.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-purple-400" }),
          "Write a Review"
        ] }),
        submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-green-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-1", children: "Review Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "Thank you for your feedback." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", onClick: () => setSubmitted(false), className: "mt-2 text-purple-400", children: "Write another" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
                "Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors",
                  placeholder: "John Doe"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
                "Email ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors",
                  placeholder: "john@example.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
              "Rating ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onMouseEnter: () => setHoverRating(s),
                onMouseLeave: () => setHoverRating(0),
                onClick: () => setRating(s),
                className: "focus:outline-none transition-transform hover:scale-110",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-6 h-6 transition-colors ${s <= (hoverRating || rating) ? "text-amber-500 fill-amber-500" : "text-slate-700"}`
                  }
                )
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: "Comment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: comment,
                onChange: (e) => setComment(e.target.value),
                rows: 4,
                className: "w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors resize-none",
                placeholder: "Share your experience with this workflow..."
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-xs", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium",
              children: [
                isSubmitting ? "Submitting..." : "Post Review",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 ml-2" })
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
const WorkflowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, nodeTypes, fullScreenToggle, isFullscreen }) => {
  const { fitView } = useReactFlow();
  reactExports.useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [nodes, fitView]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-[#050505] relative group overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ReactFlow,
      {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        nodeTypes,
        minZoom: 0.1,
        maxZoom: 1.5,
        panOnScroll: false,
        zoomOnScroll: false,
        preventScrolling: false,
        defaultEdgeOptions: {
          type: "smoothstep",
          animated: true,
          style: { stroke: "#64748b", strokeWidth: 2 }
        },
        proOptions: { hideAttribution: true },
        className: "bg-transparent",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Background$1, { color: "#333", gap: 20, size: 1, className: "opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controls$1,
            {
              className: "!bg-[#111] !border !border-white/10 !rounded-xl !p-1 !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!text-slate-300 hover:[&>button]:!text-white [&>button_svg]:!fill-current !bottom-4 !left-4 md:!bottom-8 md:!left-4",
              showInteractive: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniMap$1,
            {
              nodeColor: () => "#333",
              maskColor: "rgba(0,0,0, 0.6)",
              className: "!bg-[#111] !border !border-white/10 !rounded-xl !overflow-hidden !shadow-2xl !bottom-8 !right-8 hidden lg:block"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { position: "top-right", className: "flex gap-2 p-2 sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: fullScreenToggle,
              className: "flex items-center gap-2 px-3 py-2 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-xl hover:shadow-purple-500/20 group",
              children: [
                isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4 group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium hidden sm:inline", children: isFullscreen ? "Exit Focus" : "Focus Mode" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
};
function WorkflowDetailsPage() {
  const { slug } = distExports.useParams();
  const navigate = distExports.useNavigate();
  const ssrData = useSSRContext();
  const [workflow, setWorkflow] = reactExports.useState(ssrData.workflow || null);
  const [seo, setSeo] = reactExports.useState(ssrData.seo);
  const [loading, setLoading] = reactExports.useState(!ssrData.workflow);
  const [error, setError] = reactExports.useState(null);
  const [n8nJson, setN8nJson] = reactExports.useState(ssrData.workflow?.json_data ? typeof ssrData.workflow.json_data === "string" ? JSON.parse(ssrData.workflow.json_data) : ssrData.workflow.json_data : null);
  const [activeTab, setActiveTab] = reactExports.useState("visual");
  const [isShareOpen, setIsShareOpen] = reactExports.useState(false);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [relatedWorkflows, setRelatedWorkflows] = reactExports.useState(ssrData.relatedWorkflows || []);
  const [relevantBlogs, setRelevantBlogs] = reactExports.useState(ssrData.suggestedBlogs || ssrData.relevantBlogs || []);
  const [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  const [nodes, setNodes] = reactExports.useState([]);
  const [edges, setEdges] = reactExports.useState([]);
  const onNodesChange = reactExports.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = reactExports.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const nodeTypes = reactExports.useMemo(() => ({ custom: N8nNode }), []);
  reactExports.useEffect(() => {
    if (n8nJson) {
      processN8nData(n8nJson);
    }
  }, []);
  reactExports.useEffect(() => {
    if (slug) {
      loadAllData();
    }
  }, [slug]);
  const loadAllData = async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await workflowService.getWorkflowBySlug(slug);
      const wfData = response.data;
      if (wfData?.id) {
        setWorkflow(wfData);
        setSeo(response.seo || null);
        setRelatedWorkflows(response.relatedWorkflows || []);
        setRelevantBlogs(response.suggestedBlogs || []);
        let finalJson = null;
        if (wfData.json_data) {
          finalJson = typeof wfData.json_data === "string" ? JSON.parse(wfData.json_data) : wfData.json_data;
        }
        setN8nJson(finalJson);
        if (finalJson) processN8nData(finalJson);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to load workflow details");
    } finally {
      setLoading(false);
    }
  };
  const processN8nData = (data) => {
    if (!data || !data.nodes) return;
    const SPACING_X = 2.5;
    const SPACING_Y = 2.5;
    const newNodes = data.nodes.map((node) => {
      const isSticky = node.type.includes("stickyNote");
      return {
        id: node.name,
        type: "custom",
        position: {
          x: node.position[0] * SPACING_X,
          y: node.position[1] * SPACING_Y
        },
        zIndex: isSticky ? -1 : 10,
        data: {
          label: node.name,
          type: node.type,
          subLabel: node.type.split(".").pop(),
          content: node.parameters?.content,
          width: node.parameters?.width ? node.parameters.width * (SPACING_X * 0.9) : void 0,
          height: node.parameters?.height ? node.parameters.height * (SPACING_Y * 0.9) : void 0
        },
        draggable: !isSticky,
        selectable: !isSticky
      };
    });
    const newEdges = [];
    if (data.connections) {
      Object.keys(data.connections).forEach((source) => {
        Object.keys(data.connections[source]).forEach((type) => {
          data.connections[source][type].forEach((conn) => {
            conn.forEach((c) => {
              newEdges.push({
                id: `e-${source}-${c.node}-${c.index}`,
                source,
                target: c.node,
                type: "smoothstep",
                animated: true,
                style: { stroke: "#94a3b8", strokeWidth: 2 },
                markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" }
              });
            });
          });
        });
      });
    }
    setNodes(newNodes);
    setEdges(newEdges);
  };
  const handleDownload = () => {
    if (!n8nJson) return;
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const jsonWithOwnership = {
      ...n8nJson,
      meta: {
        ...n8nJson.meta,
        owner: "EdgeLancer",
        author: "EdgeLancer Authority",
        copyright: `© ${currentYear} EdgeLancer. All Rights Reserved.`,
        license: "Personal Use Only",
        source: window.location.origin,
        timestamp,
        protectedBy: "EdgeLancer Security Layer"
      }
    };
    const blob = new Blob([JSON.stringify(jsonWithOwnership, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = workflow?.slug ? `${workflow.slug}.json` : "workflow.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const openSetupGuide = () => {
    setActiveTab("setup");
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-4 border-slate-800 border-t-purple-500 animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-medium animate-pulse", children: "Loading Workspace..." })
  ] });
  if (error || !workflow) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white text-center p-20", children: error || "Not found" });
  const CategoryIcon = LucideIconMap[workflow.category?.icon] || Users;
  const features = Array.isArray(workflow.workflow_features) ? workflow.workflow_features : typeof workflow.workflow_features === "string" ? JSON.parse(workflow.workflow_features) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col transition-all duration-300 ${isFullscreen ? "h-screen overflow-hidden" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHelmet,
      {
        title: seo?.title,
        description: seo?.description,
        keywords: seo?.keywords,
        ogImage: seo?.og_image,
        canonical: seo?.canonical,
        ogType: seo?.og_type,
        structuredData: seo?.structured_data,
        metaTags: seo?.meta_tags,
        robots: seo?.robots
      }
    ),
    !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex-1 relative z-10 mx-auto w-full transition-all duration-500 ${isFullscreen ? "h-full p-0" : "max-w-7xl px-4 md:px-6 py-4 md:py-8 pt-20 lg:pt-24"}`, children: [
      !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }) }),
              "Back to Library"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/", className: "hover:text-purple-400 transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/workflows", className: "hover:text-purple-400 transition-colors", children: "Workflows" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 truncate max-w-[200px] md:max-w-none", children: workflow.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-start justify-between gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { className: "w-8 h-8 text-purple-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white tracking-tight mb-2", children: workflow.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium", children: workflow.category?.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
                    "Verified for n8n v1.x+"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-blue-500" }),
                    "Updated ",
                    workflow.updated_at ? formatDistanceToNow(new Date(workflow.updated_at), { addSuffix: true }) : "recently"
                  ] })
                ] })
              ] })
            ] }),
            workflow.content ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "prose prose-invert prose-slate max-w-4xl mt-8 prose-headings:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-400 prose-p:leading-relaxed prose-li:text-slate-400 prose-strong:text-purple-400 docs-rendered-content",
                dangerouslySetInnerHTML: { __html: workflow.content }
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg leading-relaxed max-w-3xl border-l-2 border-purple-500/30 pl-4", children: workflow.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: openSetupGuide,
                className: "h-12 px-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/15 text-indigo-300 font-medium transition-all flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-4 h-4" }),
                  "Setup Guide"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setIsShareOpen(true),
                className: "h-12 px-6 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] text-slate-300 font-medium transition-all flex items-center gap-2 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 group-hover:text-white" }),
                  "Share"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleDownload,
                className: "h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                  "Download JSON"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-1 ${isFullscreen ? "h-full" : "lg:grid-cols-3 gap-8"} h-full min-h-[600px] pb-12`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `lg:col-span-2 flex flex-col ${isFullscreen ? "h-full" : ""}`, children: [
          !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/5 w-fit mb-4", children: [
            { id: "visual", label: "Flow Visualizer", icon: Workflow },
            { id: "config", label: "JSON Config", icon: FileJson },
            { id: "docs", label: "Documentation", icon: MessageSquare },
            { id: "setup", label: "Setup Guide", icon: Terminal }
          ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab(tab.id),
              className: `px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${activeTab === tab.id ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-slate-300 hover:bg-white/5"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-4 h-4" }),
                tab.label
              ]
            },
            tab.id
          )) }),
          !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.04] p-5 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-3.5 h-3.5" }),
                "Setup Guide"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-lg", children: "Need help importing this workflow into n8n?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm md:text-base max-w-3xl", children: "Open the Setup Guide tab for import options, local install commands, and the recommended environment requirements." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: openSetupGuide,
                className: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors",
                children: "Open Setup Guide"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl ${isFullscreen ? "fixed inset-0 z-[100] rounded-none border-0" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute inset-0 transition-opacity duration-300 ${activeTab === "visual" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`, children: [
              isClient && activeTab === "visual" && /* @__PURE__ */ jsxRuntimeExports.jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WorkflowCanvas,
                {
                  nodes,
                  edges,
                  onNodesChange,
                  onEdgesChange,
                  nodeTypes,
                  isFullscreen,
                  fullScreenToggle: () => setIsFullscreen(!isFullscreen)
                }
              ) }),
              !isClient && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-[#050505] p-8 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8 group max-w-md w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]", children: [
                  workflow.og_image || workflow.category?.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: workflow.og_image || workflow.category?.image_url,
                      alt: workflow.title,
                      className: "w-full h-full object-cover opacity-40 grayscale"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-12 h-12 text-slate-800" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white tracking-widest uppercase", children: "Initializing Canvas" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto space-y-4 sr-only md:not-sr-only opacity-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-slate-400 text-sm font-medium", children: [
                    "Workflow Architecture: ",
                    workflow.title
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-600 text-xs leading-relaxed", children: [
                    "This n8n automation consists of ",
                    workflow.nodes_count || "several",
                    " specialized nodes orchestrated to handle ",
                    workflow.category?.title || "complex business logic",
                    " autonomously. The visual layer is currently hydrating for high-performance interaction."
                  ] })
                ] })
              ] })
            ] }),
            activeTab === "config" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#0a0a0a]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-4 border-b border-white/5 bg-[#111]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-300", children: "Raw JSON Configuration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  navigator.clipboard.writeText(JSON.stringify(n8nJson, null, 2));
                  alert("Copied to clipboard");
                }, className: "text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                  " Copy"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-4 custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono text-emerald-400/90 whitespace-pre-wrap", children: JSON.stringify(n8nJson, null, 2) }) })
            ] }),
            activeTab === "docs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                                        .docs-content { font-size: 1rem; line-height: 1.8; color: #94a3b8; }
                                        .docs-section { margin-bottom: 3rem; }
                                        .docs-section-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; display: flex; items-center; gap: 0.75rem; }
                                        .docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                                        .docs-card { padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); rounded: 1rem; }
                                    ` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-content max-w-4xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-6 h-6 text-purple-500" }),
                    " Overview"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", children: workflow.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-grid", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Nodes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-white", children: workflow.nodes_count })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Difficulty" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-white capitalize", children: workflow.difficulty })
                    ] }),
                    workflow.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Rating" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-white", children: [
                        workflow.rating,
                        " / 5.0"
                      ] })
                    ] })
                  ] })
                ] }),
                features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-amber-500" }),
                    " Key Features"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-emerald-500 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-6 h-6 text-blue-500" }),
                    " Usage Guide"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-6 list-none p-0", children: [
                    { step: "Download JSON", desc: "Click the download button above to get the latest workflow configuration." },
                    { step: "Import to n8n", desc: 'Go to your n8n workspace, click "Add Workflow" and select "Import from File".' },
                    { step: "Set Credentials", desc: "Configure necessary API keys and credentials for each integration node." },
                    { step: "Test & Go Live", desc: "Execute the workflow manually to verify logic before turning on the trigger." }
                  ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-purple-400 shrink-0", children: i + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold mb-1", children: item.step }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: item.desc })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            activeTab === "setup" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Setup n8n Locally" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg leading-relaxed", children: "Running n8n on your own machine gives you total privacy, zero limits, and complete control over your automation data." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-[#0a0a0a] border border-white/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-white font-bold mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-yellow-500" }),
                    " Method 1: npm (Fastest)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mb-6", children: "Install n8n using your existing Node.js environment." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl bg-black font-mono text-sm text-emerald-400 border border-emerald-500/20", children: "npx n8n" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-[#0a0a0a] border border-white/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-white font-bold mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-5 h-5 text-blue-500" }),
                    " Method 2: Docker"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mb-6", children: "Isolated and persistent environment for complex workflows." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl bg-black font-mono text-sm text-blue-400 border border-blue-500/20", children: "docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/10 rounded-2xl p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-white font-bold mb-6 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" }),
                  " Recommended Hardware"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "CPU" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: "1 vCPU (2+ Rec)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "RAM" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: "1GB (4GB+ Rec)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "Disk" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-medium", children: "10GB Standard" })
                  ] })
                ] })
              ] })
            ] }) })
          ] })
        ] }),
        !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-[#0a0a0a] border-white/10 hover:border-purple-500/30 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-white font-bold mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5 text-slate-500" }),
              " Specifications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" }),
                  " Nodes"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold font-mono", children: workflow.nodes_count })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                  " Complexity"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold capitalize", children: workflow.difficulty })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                  " Efficiency"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold", children: "Scalable" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                  " Security"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 font-bold", children: "Verified" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-[#0a0a0a] border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold mb-4", children: "Premium Support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-6 leading-relaxed", children: "Need help customizing this workflow? Our experts are available for hire." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full border-white/10 hover:bg-white/5 text-slate-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/contact", children: "Chat with Expert" }) })
          ] })
        ] })
      ] }),
      !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 pt-16 border-t border-white/5", children: workflow?.faqs && workflow.faqs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { data: workflow.faqs, title: "Frequently Asked Questions", className: "py-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, { type: "page", slug: "workflows", className: "py-0" }) }),
      !isFullscreen && (relatedWorkflows.length > 0 || relevantBlogs.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 pt-16 border-t border-white/5 space-y-24 mb-16", children: [
        relatedWorkflows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between gap-6 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "w-3.5 h-3.5 text-cyan-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-cyan-400 uppercase tracking-widest", children: "Similar Workflows" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white tracking-tight", children: "Explore Related Automation Templates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-lg font-light max-w-2xl", children: "Find more ready-to-use workflows in the same category to further automate your business." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 sm:flex-row items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 border-0 rounded-2xl px-6 py-6 h-auto font-bold text-white shadow-lg shadow-indigo-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/workflows", children: "Browse Core Templates" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: relatedWorkflows.slice(0, 6).map((rWorkflow) => {
            const price = parseFloat(rWorkflow.price || "0");
            const CardCategoryIcon = LucideIconMap[rWorkflow.category?.icon] || Users;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "group flex flex-col bg-[#0a0a0f] border border-white/5 rounded-[1.5rem] p-6 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center text-indigo-400 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardCategoryIcon, { className: "w-6 h-6" }) }),
                    price === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold px-2.5 py-1", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2.5 py-1", children: [
                      "$",
                      rWorkflow.price
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight text-lg line-clamp-2", children: rWorkflow.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 font-light leading-relaxed text-sm line-clamp-2", children: rWorkflow.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize", children: rWorkflow.category?.title || "Workflow" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg", children: [
                      rWorkflow.nodes_count || 12,
                      " Nodes"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize", children: rWorkflow.difficulty || "Beginner" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-5 border-t border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-500 text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-slate-600" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        (rWorkflow.views || rWorkflow.total_views || 100).toLocaleString(),
                        " views"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: `/workflow/${rWorkflow.slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6 h-10 font-bold text-xs shadow-lg shadow-cyan-500/10", children: "Download" }) })
                  ] })
                ]
              },
              rWorkflow.id
            );
          }) })
        ] }),
        relevantBlogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-white mb-2 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-8 h-8 text-indigo-400" }),
                "Build Your Automation Stack"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Deepen your knowledge with related guides and tutorials in this cluster." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/blogs", className: "text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors flex items-center gap-1 group", children: [
              "View Complete Knowledge Base",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: relevantBlogs.slice(0, 4).map((rBlog) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            distExports.Link,
            {
              to: `/blogs/${rBlog.slug}`,
              className: "group flex flex-col sm:flex-row gap-5 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full sm:w-40 aspect-video sm:aspect-square overflow-hidden rounded-2xl shrink-0 border border-white/10 bg-[#050507]", children: rBlog.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: rBlog.image_url, alt: rBlog.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-8 h-8 text-indigo-500/50" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2", children: rBlog.category?.title || "Article" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight", children: rBlog.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm line-clamp-2 mt-2", children: rBlog.description })
                ] })
              ]
            },
            rBlog.id
          )) })
        ] })
      ] }),
      !isFullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 border-t border-white/5 pt-20 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowReviewsSection, { workflowSlug: workflow.slug }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SocialShareDialog,
      {
        isOpen: isShareOpen,
        onClose: () => setIsShareOpen(false),
        workflow,
        nodes,
        edges
      }
    )
  ] });
}
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = Root$1.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = Content.displayName;
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function Sidebar() {
  const location = distExports.useLocation();
  const pathname = location.pathname;
  const { user, logout, hasRole } = useAuth();
  const { sidebarCollapsed, toggleSidebar, getUnreadMessageCount } = useAppStore();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  getUnreadMessageCount();
  const navItems2 = [
    { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/workflows", label: "Workflows", icon: Workflow, roles: ["admin", "superadmin"] },
    { path: "/app/workflow-templates", label: "Templates Library", icon: GitBranch, roles: ["admin", "superadmin"] },
    { path: "/app/blogs", label: "Blog Management", icon: BookOpen, roles: ["admin", "superadmin"] },
    { path: "/app/pages", label: "Page Management", icon: FileText, roles: ["admin", "superadmin"] },
    { path: "/app/faqs", label: "FAQ Management", icon: CircleHelp, roles: ["admin", "superadmin"] },
    { path: "/app/courses", label: "Course Management", icon: BookOpen, roles: ["admin", "superadmin"] },
    { path: "/app/course-reviews", label: "Course Reviews", icon: MessageSquare, roles: ["admin", "superadmin"] },
    { path: "/app/contact-enquiries", label: "Contact Enquiries", icon: Mail, roles: ["admin", "superadmin"] },
    { path: "/app/newsletter-subscribers", label: "Newsletter Subscribers", icon: Users, roles: ["admin", "superadmin"] },
    { path: "/app/support-chat", label: "Support Chat", icon: MessageSquare, roles: ["admin", "superadmin"] }
  ];
  const filteredNavItems = navItems2.filter(
    (item) => !item.roles || hasRole(item.roles)
  );
  const SidebarContent = ({ isMobile = false }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-nexus-border", children: [
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Link, { to: "/app", className: "flex items-center gap-2", title: "EdgeLancer Dashboard Home", onClick: () => isMobile && setMobileOpen(false), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/favicon.png", alt: "Logo", title: "/", className: "w-8 h-8 object-contain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexus-blue to-nexus-purple", children: "EdgeLancer" })
      ] }),
      sidebarCollapsed && !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/favicon.png", alt: "Logo", title: "/", className: "w-8 h-8 object-contain mx-auto" }),
      !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggleSidebar,
          className: cn(
            "p-1.5 hover:bg-nexus-border rounded-md transition-colors",
            sidebarCollapsed && "absolute right-2"
          ),
          children: sidebarCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setMobileOpen(false),
          className: "p-1.5 hover:bg-nexus-border rounded-md transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    user?.role === "superadmin" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("px-3 pt-4", sidebarCollapsed && !isMobile && "px-2"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      distExports.Link,
      {
        to: "/superadmin",
        onClick: () => isMobile && setMobileOpen(false),
        title: "Go to Super Admin Dashboard",
        className: cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
          "bg-gradient-to-r from-nexus-blue/20 to-nexus-purple/20 border border-nexus-purple/30",
          "hover:from-nexus-blue/30 hover:to-nexus-purple/30",
          sidebarCollapsed && !isMobile && "justify-center px-2"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-nexus-purple flex-shrink-0" }),
          (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-nexus-purple", children: "Super Admin" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-4 px-3 space-y-1 overflow-y-auto", children: filteredNavItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.path || item.path !== "/app" && pathname.startsWith(item.path);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        distExports.Link,
        {
          to: item.path,
          onClick: () => isMobile && setMobileOpen(false),
          title: `Go to ${item.label}`,
          className: cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
            "hover:bg-nexus-border",
            isActive && "bg-nexus-border gradient-border",
            sidebarCollapsed && !isMobile && "justify-center"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(
              "w-5 h-5 flex-shrink-0",
              isActive && "text-nexus-blue"
            ) }),
            (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                "flex-1 font-medium text-sm",
                isActive ? "text-white" : "text-nexus-muted"
              ), children: item.label }),
              item.badge !== void 0 && item.badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "gradient-primary text-white border-0 px-2 py-0 h-5 text-xs",
                  children: item.badge
                }
              )
            ] })
          ]
        },
        item.path
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "p-4 border-t border-nexus-border",
      sidebarCollapsed && !isMobile && "px-2"
    ), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "flex items-center gap-3",
      sidebarCollapsed && !isMobile && "justify-center"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 ring-2 ring-nexus-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user?.avatar }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-nexus-border text-sm", children: user?.name?.charAt(0) || "U" })
      ] }),
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: user?.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted capitalize", children: user?.role })
      ] }),
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: logout,
          className: "p-2 hover:bg-nexus-border rounded-md transition-colors text-nexus-muted hover:text-white",
          title: "Logout",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
        }
      )
    ] }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "fixed top-4 left-4 z-50 lg:hidden bg-nexus-card border border-nexus-border",
        onClick: () => setMobileOpen(true),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "left", className: "p-0 w-64 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { isMobile: true }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "aside",
      {
        className: cn(
          "hidden lg:flex h-screen bg-nexus-card border-r border-nexus-border flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {})
      }
    )
  ] });
}
const mockNotifications = [
  {
    id: "notif-1",
    type: "mention",
    title: "@Sarah mentioned you",
    description: 'in #proj-ecommerce: "Can you review the API changes?"',
    timestamp: "2024-03-20T09:55:00Z",
    read: false,
    link: "/app/projects/proj-1"
  },
  {
    id: "notif-2",
    type: "message",
    title: "New client message",
    description: 'John Doe: "Thanks! When can you start?"',
    timestamp: "2024-03-20T09:45:00Z",
    read: false,
    link: "/app/crm"
  },
  {
    id: "notif-3",
    type: "project",
    title: "Project assigned",
    description: 'You have been assigned to "Mobile App Redesign"',
    timestamp: "2024-03-20T09:00:00Z",
    read: false,
    link: "/app/projects/proj-3"
  },
  {
    id: "notif-4",
    type: "meeting",
    title: "Meeting in 30 minutes",
    description: "Sprint Planning with the team",
    timestamp: "2024-03-20T08:30:00Z",
    read: true,
    link: "/app/calendar"
  },
  {
    id: "notif-5",
    type: "system",
    title: "Auto-bid successful",
    description: 'Bid placed on "React Dashboard Development" - $2,500',
    timestamp: "2024-03-20T08:00:00Z",
    read: true
  }
];
const ScrollArea = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Root$2,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
    ]
  }
));
ScrollArea.displayName = Root$2.displayName;
const ScrollBar = reactExports.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$3,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root$3.displayName;
const ThemeContext = reactExports.createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState("dark");
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
  }, []);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setThemeState((prev) => prev === "dark" ? "light" : "dark");
  };
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggleTheme, setTheme }, children });
}
function useTheme() {
  const context2 = reactExports.useContext(ThemeContext);
  if (!context2) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context2;
}
const notificationIcons = {
  message: MessageSquare,
  mention: MessageSquare,
  project: FolderKanban,
  meeting: Calendar,
  system: CircleAlert
};
const notificationColors = {
  message: "bg-blue-500",
  mention: "bg-purple-500",
  project: "bg-green-500",
  meeting: "bg-orange-500",
  system: "bg-gray-500"
};
function NotificationItem({ notification, onClose }) {
  const Icon = notificationIcons[notification.type] || CircleAlert;
  const colorClass = notificationColors[notification.type] || "bg-gray-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    distExports.Link,
    {
      to: notification.link || "#",
      onClick: onClose,
      className: cn(
        "flex items-start gap-3 p-3 hover:bg-nexus-border/50 transition-colors rounded-lg",
        !notification.read && "bg-nexus-blue/5"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", colorClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm", !notification.read ? "font-medium text-white" : "text-nexus-muted"), children: notification.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted line-clamp-2 mt-0.5", children: notification.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted/60 mt-1", children: formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true }) })
        ] }),
        !notification.read && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-nexus-blue flex-shrink-0 mt-2" })
      ]
    }
  );
}
function Header() {
  const { t } = useTranslation();
  const { team } = useAuth();
  const { getUnreadMessageCount } = useAppStore();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = reactExports.useState(false);
  const [notifications, setNotifications] = reactExports.useState(mockNotifications);
  const [searchFocused, setSearchFocused] = reactExports.useState(false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = reactExports.useState(true);
  const dropdownRef = reactExports.useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  getUnreadMessageCount();
  reactExports.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.7;
      if (shouldAddNotification && notifications.length < 20) {
        const newNotification = {
          id: `notif-${Date.now()}`,
          type: ["message", "mention", "project", "meeting", "system"][Math.floor(Math.random() * 5)],
          title: ["New client message", "@Team mentioned you", "Task completed", "Meeting starting soon", "Auto-bid successful"][Math.floor(Math.random() * 5)],
          description: "This is a simulated real-time notification for demo purposes.",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          read: false
        };
        setNotifications((prev) => [newNotification, ...prev]);
        import("./assets/sounds-C4AiJmeH.js").then(({ playNotificationSound }) => {
          playNotificationSound("newMessage");
        });
      }
    }, 2e4);
    return () => clearInterval(interval);
  }, [notifications.length]);
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const clearNotification = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 border-b border-nexus-border glass-header flex items-center justify-between px-4 md:px-6 fixed lg:relative top-0 left-0 right-0 z-40 bg-nexus-card/95 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-4 flex-1 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "relative flex-1 transition-all duration-200",
      searchFocused && "scale-105"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search...",
          className: "pl-10 bg-nexus-black border-nexus-border focus:border-nexus-blue transition-colors",
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 lg:hidden" }),
    team && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-nexus-muted", children: "Team:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: team.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize text-xs", children: team.plan })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-nexus-border/50 border border-nexus-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: cn(
          "w-4 h-4 transition-colors",
          aiAssistantEnabled ? "text-cyan-400" : "text-nexus-muted"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-nexus-muted hidden md:inline", children: "AI Assistant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: aiAssistantEnabled,
            onCheckedChange: setAiAssistantEnabled,
            className: "data-[state=checked]:bg-cyan-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggleTheme,
          className: "p-2 hover:bg-nexus-border rounded-lg transition-colors",
          title: "Toggle theme",
          children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-5 h-5 text-nexus-muted hover:text-yellow-400 transition-colors" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-5 h-5 text-nexus-muted hover:text-blue-400 transition-colors" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 hover:bg-nexus-border rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-5 h-5 text-nexus-muted" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: "/app/projects", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gradient-primary text-white border-0 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Project" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: dropdownRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowNotifications(!showNotifications),
            className: cn(
              "p-2 hover:bg-nexus-border rounded-lg transition-colors relative",
              showNotifications && "bg-nexus-border"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: cn(
                "w-5 h-5 transition-colors",
                showNotifications ? "text-nexus-blue" : "text-nexus-muted"
              ) }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 gradient-primary rounded-full text-xs flex items-center justify-center text-white font-medium animate-pulse", children: unreadCount > 9 ? "9+" : unreadCount })
            ]
          }
        ),
        showNotifications && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-nexus-card border border-nexus-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-nexus-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white", children: "Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: markAllAsRead,
                  className: "text-xs text-nexus-blue hover:text-nexus-blue/80 transition-colors",
                  children: "Mark all as read"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                distExports.Link,
                {
                  to: "/app/notifications",
                  onClick: () => setShowNotifications(false),
                  className: "text-xs text-nexus-muted hover:text-white transition-colors",
                  children: "View all"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-96", children: notifications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 space-y-1", children: notifications.slice(0, 10).map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationItem,
              {
                notification,
                onClose: () => setShowNotifications(false)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => clearNotification(notification.id, e),
                className: "absolute top-2 right-2 p-1 rounded-full bg-nexus-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nexus-border",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-nexus-muted" })
              }
            )
          ] }, notification.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-12 h-12 text-nexus-muted/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-nexus-muted", children: "No notifications yet" })
          ] }) }),
          notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-nexus-border bg-nexus-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            distExports.Link,
            {
              to: "/app/notifications",
              onClick: () => setShowNotifications(false),
              className: "block w-full text-center text-sm text-nexus-blue hover:text-nexus-blue/80 transition-colors",
              children: "View all notifications"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
function DashboardLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen overflow-hidden bg-nexus-black", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden w-full lg:w-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto pt-16 lg:pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Outlet, {}) })
    ] })
  ] });
}
const LoadingScreen = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#020204]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-indigo-400 font-medium tracking-widest text-xs uppercase animate-pulse", children: "Loading EdgeLancer" })
    ] })
  ] }) });
};
const LoginPage = reactExports.lazy(() => import("./assets/LoginPage-DSodH0NX.js"));
const SignupPage = reactExports.lazy(() => import("./assets/SignupPage-DjYgtDsv.js"));
const ContactPage = reactExports.lazy(() => import("./assets/ContactPage-D4t1dA6f.js"));
const SitemapPage = reactExports.lazy(() => import("./assets/SitemapPage-Bdb-quTL.js"));
const CoursesListPage = reactExports.lazy(() => import("./assets/CoursesListPage-CS4nbr8m.js"));
const CourseDetailsPage = reactExports.lazy(() => import("./assets/CourseDetailsPage-D7F33wmX.js"));
const LessonViewerPage = reactExports.lazy(() => import("./assets/LessonViewerPage-Cvn6Ap8o.js"));
const NotFoundPage = reactExports.lazy(() => import("./assets/NotFoundPage-VbeknB5R.js"));
const SecureInterviewClient = reactExports.lazy(() => import("./assets/SecureInterviewClient-CByxj-oI.js"));
const AdminDashboard = reactExports.lazy(() => import("./assets/Dashboard-Cb2mVMh7.js"));
const BlogsManagement = reactExports.lazy(() => import("./assets/BlogManagement-BhlA4_cP.js"));
const PagesManagement = reactExports.lazy(() => import("./assets/PageManagement-BAgXiXaF.js"));
const FAQsManagement = reactExports.lazy(() => import("./assets/FAQManagement-C2ayKQaV.js"));
const CourseManagement = reactExports.lazy(() => import("./assets/AdminCoursesPage-DidbUXDR.js"));
const CourseReviews = reactExports.lazy(() => import("./assets/AdminCourseReviewsPage-DI7DEvaO.js"));
const ContactEnquiries = reactExports.lazy(() => import("./assets/ContactEnquiries-fovHQw2d.js"));
const NewsletterSubscribers = reactExports.lazy(() => import("./assets/NewsletterSubscribers-CqU6EZmQ.js"));
const SupportChatAdmin = reactExports.lazy(() => import("./assets/SupportChatAdmin-CwSIExY6.js"));
const AutomationHub = reactExports.lazy(() => import("./assets/AutomationHub-DNQPwsT_.js"));
const WorkflowTemplates = reactExports.lazy(() => import("./assets/WorkflowTemplates-DYCBjarF.js"));
const SuperAdminDashboard = reactExports.lazy(() => import("./assets/SuperAdminDashboard-Dp_126a1.js"));
const LazyLoad = ({ children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {}), children });
function AppRoutes() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/signup", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignupPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/blogs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/blogs/:slug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSlugPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/contact", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/sitemap", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SitemapPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/workflow/:slug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowDetailsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/workflow", element: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "/workflows", replace: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/workflow-library", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/templates", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/workflows", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/courses", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoursesListPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/courses/:slug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseDetailsPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/courses/:courseSlug/:lessonSlug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LessonViewerPage, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/workflow-categories/:slug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/blog-categories/:slug", element: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPage, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/interview/:token", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecureInterviewClient, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/app", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { allowedRoles: ["admin", "superadmin"] }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Route, { element: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Navigate, { to: "dashboard", replace: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "blogs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogsManagement, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "pages", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PagesManagement, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "faqs", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQsManagement, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "courses", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseManagement, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "course-reviews", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseReviews, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "contact-enquiries", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactEnquiries, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "newsletter-subscribers", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSubscribers, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "support-chat", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SupportChatAdmin, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "workflows", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutomationHub, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "workflow-templates", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowTemplates, {}) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "/superadmin", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { allowedRoles: ["superadmin"] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminDashboard, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyLoad, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFoundPage, {}) }) })
  ] });
}
const ConfirmationContext = reactExports.createContext(void 0);
function ConfirmationProvider({ children }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [options, setOptions] = reactExports.useState({
    title: "Confirm Action",
    description: "Are you sure?"
  });
  const [resolveCallback, setResolveCallback] = reactExports.useState(null);
  const confirm = (confirmOptions) => {
    return new Promise((resolve) => {
      setOptions(confirmOptions);
      setResolveCallback(() => resolve);
      setIsOpen(true);
    });
  };
  const handleConfirm = async () => {
    setIsLoading(true);
    if (resolveCallback) {
      resolveCallback(true);
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
    }, 300);
  };
  const handleCancel = () => {
    if (resolveCallback) {
      resolveCallback(false);
    }
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ConfirmationContext.Provider, { value: { confirm }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmationDialogInternal,
      {
        isOpen,
        setIsOpen,
        isLoading,
        options,
        handleConfirm,
        handleCancel
      }
    )
  ] });
}
function ConfirmationDialogInternal({
  isOpen,
  setIsOpen,
  isLoading,
  options,
  handleConfirm,
  handleCancel
}) {
  const [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        options.isDangerous && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: options.isDangerous ? "text-red-600" : "", children: options.title })
      ] }),
      options.description && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "mt-2", children: options.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleCancel,
          disabled: isLoading,
          children: options.cancelText || "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleConfirm,
          disabled: isLoading,
          className: options.isDangerous ? "bg-red-600 hover:bg-red-700 text-white" : "",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            options.confirmText || "Confirm"
          ] }) : options.confirmText || "Confirm"
        }
      )
    ] })
  ] }) });
}
function useConfirmation() {
  const context2 = reactExports.useContext(ConfirmationContext);
  if (!context2) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context2;
}
const ToastContext = reactExports.createContext(void 0);
function ToastProvider({ children }) {
  const [toasts, setToasts] = reactExports.useState([]);
  const showToast = reactExports.useCallback((message, type = "info", duration = 4e3) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);
  const hideToast = reactExports.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToastContext.Provider, { value: { showToast, hideToast }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToastContainer, { toasts, onClose: hideToast })
  ] });
}
function useToast() {
  const context2 = reactExports.useContext(ToastContext);
  if (context2 === void 0) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context2;
}
function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm", children: toasts.map((toast) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToastItem, { toast, onClose }, toast.id)) });
}
function ToastItem({ toast, onClose }) {
  const icons = {
    success: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-500" }),
    error: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-500" }),
    warning: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-orange-500" }),
    info: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-blue-500" })
  };
  const bgColors = {
    success: "border-green-500/30 bg-green-500/10",
    error: "border-red-500/30 bg-red-500/10",
    warning: "border-orange-500/30 bg-orange-500/10",
    info: "border-blue-500/30 bg-blue-500/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-start gap-3 p-4 rounded-lg border ${bgColors[toast.type]} bg-nexus-card backdrop-blur-sm slide-in-bottom`,
      children: [
        icons[toast.type],
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm text-nexus-text", children: toast.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onClose(toast.id),
            className: "text-nexus-muted hover:text-nexus-text transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
const mockUser = {
  id: "user-1",
  name: "Alex Morgan",
  email: "alex@nexusai.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
};
const mockAccounts = [
  {
    id: "acc-1",
    platform: "upwork",
    accountName: "ProDev Solutions",
    username: "prodev_alex",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 500,
    bidCount: 23,
    successRate: 34,
    aiPrompt: "Focus on web development projects with React and Node.js. Budget range: $1000-$5000.",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 15).toISOString()
  },
  {
    id: "acc-2",
    platform: "upwork",
    accountName: "AI Automation Expert",
    username: "ai_expert_pro",
    isActive: true,
    autoBidEnabled: false,
    dailyBudget: 300,
    bidCount: 18,
    successRate: 41,
    aiPrompt: "Target AI/ML automation projects. Minimum budget: $2000.",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 45).toISOString()
  },
  {
    id: "acc-3",
    platform: "fiverr",
    accountName: "WebFlow Master",
    username: "webflow_master",
    isActive: true,
    autoBidEnabled: true,
    dailyBudget: 200,
    bidCount: 31,
    successRate: 52,
    aiPrompt: "Focus on Webflow and no-code solutions.",
    lastActivity: new Date(Date.now() - 1e3 * 60 * 5).toISOString()
  },
  {
    id: "acc-4",
    platform: "fiverr",
    accountName: "Full Stack Dev",
    username: "fullstack_dev",
    isActive: false,
    autoBidEnabled: false,
    dailyBudget: 400,
    bidCount: 12,
    successRate: 28,
    lastActivity: new Date(Date.now() - 1e3 * 60 * 60 * 24).toISOString()
  }
];
const mockConversations = [
  {
    id: "conv-1",
    clientName: "Sarah Johnson",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    platform: "upwork",
    lastMessage: "Thanks! When can you start?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    unreadCount: 2,
    projectTitle: "E-commerce Platform Development",
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        sender: "client",
        content: "Hi, I saw your proposal for the e-commerce project.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        sender: "user",
        content: "Hello Sarah! Yes, I'd be happy to discuss the project details with you.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 25).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        sender: "client",
        content: "Great! Can you handle both frontend and backend?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 20).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-4",
        conversationId: "conv-1",
        sender: "user",
        content: "Absolutely! I specialize in full-stack development with React and Node.js.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 10).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-5",
        conversationId: "conv-1",
        sender: "client",
        content: "Thanks! When can you start?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
        platform: "upwork",
        read: false
      }
    ]
  },
  {
    id: "conv-2",
    clientName: "Michael Chen",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    platform: "fiverr",
    lastMessage: "Could you send me some portfolio examples?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 15).toISOString(),
    unreadCount: 1,
    projectTitle: "AI Chatbot Integration",
    messages: [
      {
        id: "msg-6",
        conversationId: "conv-2",
        sender: "client",
        content: "Hi! I need help integrating an AI chatbot into my website.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 20).toISOString(),
        platform: "fiverr",
        read: true
      },
      {
        id: "msg-7",
        conversationId: "conv-2",
        sender: "client",
        content: "Could you send me some portfolio examples?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 15).toISOString(),
        platform: "fiverr",
        read: false
      }
    ]
  },
  {
    id: "conv-3",
    clientName: "Emma Williams",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    platform: "upwork",
    lastMessage: "Perfect! Let's move forward with the contract.",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    unreadCount: 0,
    projectTitle: "Mobile App Development",
    messages: [
      {
        id: "msg-8",
        conversationId: "conv-3",
        sender: "client",
        content: "I need a React Native app for iOS and Android.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 90).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-9",
        conversationId: "conv-3",
        sender: "user",
        content: "I can definitely help with that. What's your timeline?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 80).toISOString(),
        platform: "upwork",
        read: true
      },
      {
        id: "msg-10",
        conversationId: "conv-3",
        sender: "client",
        content: "Perfect! Let's move forward with the contract.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
        platform: "upwork",
        read: true
      }
    ]
  },
  {
    id: "conv-4",
    clientName: "David Martinez",
    platform: "whatsapp",
    lastMessage: "Can we schedule a call tomorrow?",
    lastMessageTime: new Date(Date.now() - 1e3 * 60 * 120).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: "msg-11",
        conversationId: "conv-4",
        sender: "client",
        content: "Hey, got your number from the Fiverr project.",
        timestamp: new Date(Date.now() - 1e3 * 60 * 150).toISOString(),
        platform: "whatsapp",
        read: true
      },
      {
        id: "msg-12",
        conversationId: "conv-4",
        sender: "client",
        content: "Can we schedule a call tomorrow?",
        timestamp: new Date(Date.now() - 1e3 * 60 * 120).toISOString(),
        platform: "whatsapp",
        read: true
      }
    ]
  }
];
const mockSystemStatus = {
  apiStatus: "operational",
  upworkConnected: true,
  fiverrConnected: true,
  whatsappConnected: true,
  activeBids: 47,
  activeConversations: 12,
  lastSync: new Date(Date.now() - 1e3 * 60 * 2).toISOString()
};
const mockActivities = [
  {
    id: "act-1",
    type: "bid_placed",
    title: "Bid placed",
    description: 'Auto-bid placed on "React Dashboard Development" - $2,500',
    timestamp: new Date(Date.now() - 1e3 * 60 * 5).toISOString(),
    platform: "upwork"
  },
  {
    id: "act-2",
    type: "message_received",
    title: "New message",
    description: "Sarah Johnson: Thanks! When can you start?",
    timestamp: new Date(Date.now() - 1e3 * 60 * 10).toISOString(),
    platform: "upwork"
  },
  {
    id: "act-3",
    type: "bid_won",
    title: "Bid won!",
    description: 'Your bid on "AI Integration Project" was accepted',
    timestamp: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
    platform: "fiverr"
  },
  {
    id: "act-4",
    type: "account_connected",
    title: "Account connected",
    description: "WebFlow Master account successfully connected",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60).toISOString(),
    platform: "fiverr"
  }
];
const AppContext = reactExports.createContext(void 0);
function AppProvider({ children }) {
  const [user] = reactExports.useState(mockUser);
  const [accounts, setAccounts] = reactExports.useState(mockAccounts);
  const [conversations, setConversations] = reactExports.useState(mockConversations);
  const [systemStatus, setSystemStatus] = reactExports.useState(mockSystemStatus);
  const [activities, setActivities] = reactExports.useState(mockActivities);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      const randomConvo = conversations[Math.floor(Math.random() * conversations.length)];
      if (randomConvo && Math.random() > 0.7) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          conversationId: randomConvo.id,
          sender: "client",
          content: getRandomClientMessage(),
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          platform: randomConvo.platform,
          read: false
        };
        setConversations((prev) => prev.map((conv) => {
          if (conv.id === randomConvo.id) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.content,
              lastMessageTime: newMessage.timestamp,
              unreadCount: conv.unreadCount + 1
            };
          }
          return conv;
        }));
        const newActivity = {
          id: `activity-${Date.now()}`,
          type: "message_received",
          title: "New message",
          description: `${randomConvo.clientName}: ${newMessage.content.substring(0, 50)}...`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          platform: randomConvo.platform
        };
        setActivities((prev) => [newActivity, ...prev.slice(0, 19)]);
      }
    }, 18e3);
    return () => clearInterval(interval);
  }, [conversations]);
  const updateAccount = (id, updates) => {
    setAccounts((prev) => prev.map((acc) => acc.id === id ? { ...acc, ...updates } : acc));
  };
  const addActivity = (activity) => {
    setActivities((prev) => [activity, ...prev.slice(0, 19)]);
  };
  const markConversationRead = (conversationId) => {
    setConversations((prev) => prev.map(
      (conv) => conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppContext.Provider, { value: {
    user,
    accounts,
    conversations,
    systemStatus,
    activities,
    updateAccount,
    addActivity,
    markConversationRead
  }, children });
}
function getRandomClientMessage() {
  const messages = [
    "Hi, I'm interested in your services. Can we discuss the project?",
    "What's your availability for this week?",
    "Could you provide a quote for this work?",
    "I have some questions about the proposal.",
    "When can you start on this project?",
    "Can you share some examples of similar work?",
    "I'd like to schedule a call to discuss details.",
    "What's your timeline for delivery?"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
function App({ initialData }) {
  const ssrData = initialData || (typeof window !== "undefined" ? window.__SSR_DATA__ : null) || (typeof globalThis !== "undefined" ? globalThis.context : null) || {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SSRContext.Provider, { value: ssrData, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToastProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmationProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppRoutes, {}) }) }) }) }) }) }) });
}
function render(url, context2 = {}) {
  const helmetContext = {};
  if (typeof globalThis !== "undefined") {
    globalThis.context = context2;
  }
  const html = server_nodeExports.renderToString(
    /* @__PURE__ */ jsxRuntimeExports.jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, { initialData: context2 }) }) })
  );
  const { helmet } = helmetContext;
  const bridgeResponse = {
    html,
    head: helmet ? `
            ${helmet.title?.toString() || ""}
            ${helmet.meta?.toString() || ""}
            ${helmet.link?.toString() || ""}
            ${helmet.script?.toString() || ""}
            ${helmet.noscript?.toString() || ""}
            ${helmet.style?.toString() || ""}
        ` : ""
  };
  return JSON.stringify(bridgeResponse);
}
if (typeof context !== "undefined") {
  const response = render(context.url || "/", context);
  dispatch(response);
}
export {
  PAGINATION_CONFIG as A,
  Button as B,
  Card as C,
  Dialog as D,
  mockPlatformStats as E,
  FAQSection as F,
  mockUsers as G,
  Avatar as H,
  Input as I,
  AvatarImage as J,
  AvatarFallback as K,
  mockTeams as L,
  mockActivities$1 as M,
  PublicFooter as P,
  SEOHelmet as S,
  useToast as a,
  PublicNavbarLayout as b,
  cn as c,
  Badge as d,
  render as default,
  CardContent as e,
  PublicNavbar as f,
  ScrollArea as g,
  adminBlogService as h,
  faqService as i,
  DialogContent as j,
  DialogHeader as k,
  DialogTitle as l,
  DialogDescription as m,
  DialogFooter as n,
  adminBlogCategoryService as o,
  pageService as p,
  useConfirmation as q,
  CardHeader as r,
  CardDescription as s,
  CardTitle as t,
  useAuth as u,
  Switch as v,
  workflowService as w,
  buildQueryString as x,
  apiRequest as y,
  Skeleton as z
};
