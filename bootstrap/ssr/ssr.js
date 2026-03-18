import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense, memo } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Link, useLocation, useNavigate, useParams, Outlet, Routes, Route, Navigate } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertTriangle, Loader2, X, Info, AlertCircle, CheckCircle, Bot, Circle, RefreshCcw, Minimize2, Send, MessageCircle, Minus, Plus, Twitter, Github, Linkedin, Mail, ArrowRight, ChevronDown, Menu, ChevronRight, BarChart3, Box, Cpu, FileCode, FileJson, GitBranch, Globe, MessageSquare, Share2, ShieldCheck, Terminal, Users, Workflow, Zap, Loader, Search, Filter, Star, LayoutGrid, Clock, Eye, Layers, Database, FileText, Smartphone, BarChart, Settings, Bell, Cloud, Code, Server, Calendar, Check, Download, Copy, ExternalLink, BookOpen, ArrowLeft, User, Newspaper, TrendingUp, Facebook, Slack, CheckCircle2, Sparkles, Maximize2, Radio, Truck, Wrench, Home, Activity, PieChart, CreditCard, ShoppingBag, Headphones, Image, Video, Brain, Target, DollarSign, Shield, PenTool, Code2, Megaphone, Briefcase, LayoutDashboard, HelpCircle, ChevronLeft, LogOut, Sun, Moon, FolderKanban } from "lucide-react";
import { create } from "zustand";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { formatDistanceToNow, format } from "date-fns";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactFlow, { Handle, Position, ReactFlowProvider, useReactFlow, Background, applyNodeChanges, applyEdgeChanges, MarkerType, Controls, MiniMap, Panel } from "reactflow";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTranslation } from "react-i18next";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
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
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
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
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
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
}) => /* @__PURE__ */ jsx(
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
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const ConfirmationContext = createContext(void 0);
function ConfirmationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    title: "Confirm Action",
    description: "Are you sure?"
  });
  const [resolveCallback, setResolveCallback] = useState(null);
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
  return /* @__PURE__ */ jsxs(ConfirmationContext.Provider, { value: { confirm }, children: [
    children,
    /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          options.isDangerous && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-red-500" }) }),
          /* @__PURE__ */ jsx(DialogTitle, { className: options.isDangerous ? "text-red-600" : "", children: options.title })
        ] }),
        options.description && /* @__PURE__ */ jsx(DialogDescription, { className: "mt-2", children: options.description })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            onClick: handleCancel,
            disabled: isLoading,
            children: options.cancelText || "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleConfirm,
            disabled: isLoading,
            className: options.isDangerous ? "bg-red-600 hover:bg-red-700 text-white" : "",
            children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
              options.confirmText || "Confirm"
            ] }) : options.confirmText || "Confirm"
          }
        )
      ] })
    ] }) })
  ] });
}
function useConfirmation() {
  const context2 = useContext(ConfirmationContext);
  if (!context2) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context2;
}
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
const mockConversations = [
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
  return mockConversations.filter((c) => c.teamId === teamId);
}
function getConversationsForUser(userId) {
  return mockConversations.filter((c) => c.assignedTo?.includes(userId));
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
const mockSystemStatus = {
  apiStatus: "operational",
  upworkConnected: true,
  fiverrConnected: true,
  freelancerConnected: true,
  lastSync: new Date(Date.now() - 1e3 * 60 * 2).toISOString()
};
const mockActivities = [
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
  return mockActivities.filter((a) => a.teamId === teamId || !a.teamId);
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
  systemStatus: mockSystemStatus,
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
        conversations: mockConversations,
        socialPosts: mockSocialPosts,
        socialAccounts: mockSocialAccounts,
        activities: mockActivities,
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
const API_BASE_URL$1 = "http://127.0.0.1:8000/api";
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initializeForUser = useAppStore((state) => state.initializeForUser);
  useEffect(() => {
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
          "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
        },
        body: JSON.stringify({ email, password })
      });
      if (response.status === 404) {
        console.debug("Admin login endpoint not found, trying /login");
        response = await fetch(`${API_BASE_URL$1}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
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
          "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
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
  const logout = () => {
    setUser(null);
    setTeam(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem("nexus_user");
    }
  };
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };
  const canAccessTeamSettings = user?.role === "admin" || user?.role === "superadmin";
  return /* @__PURE__ */ jsx(
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
  const context2 = useContext(AuthContext);
  if (context2 === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context2;
}
const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
  }, []);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme, setTheme }, children });
}
function useTheme() {
  const context2 = useContext(ThemeContext);
  if (!context2) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context2;
}
const ToastContext = createContext(void 0);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "info", duration = 4e3) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);
  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast, hideToast }, children: [
    children,
    /* @__PURE__ */ jsx(ToastContainer, { toasts, onClose: hideToast })
  ] });
}
function useToast() {
  const context2 = useContext(ToastContext);
  if (context2 === void 0) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context2;
}
function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm", children: toasts.map((toast) => /* @__PURE__ */ jsx(ToastItem, { toast, onClose }, toast.id)) });
}
function ToastItem({ toast, onClose }) {
  const icons = {
    success: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }),
    error: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-red-500" }),
    warning: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-orange-500" }),
    info: /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" })
  };
  const bgColors = {
    success: "border-green-500/30 bg-green-500/10",
    error: "border-red-500/30 bg-red-500/10",
    warning: "border-orange-500/30 bg-orange-500/10",
    info: "border-blue-500/30 bg-blue-500/10"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex items-start gap-3 p-4 rounded-lg border ${bgColors[toast.type]} bg-nexus-card backdrop-blur-sm slide-in-bottom`,
      children: [
        icons[toast.type],
        /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm text-nexus-text", children: toast.message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onClose(toast.id),
            className: "text-nexus-muted hover:text-nexus-text transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
const SSRContext = createContext({});
const useSSRContext = () => useContext(SSRContext);
const LoadingScreen$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-[#020204]", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 text-indigo-400 font-medium tracking-widest text-xs uppercase animate-pulse", children: "Loading EdgeLancer" })
    ] })
  ] }) });
};
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
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
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
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
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000/api",
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
  const appKey = "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8";
  {
    headers["X-App-Key"] = appKey;
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
      data = { message: text || `Error ${response.status}` };
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
    const resultData = data;
    return {
      success: true,
      data: resultData,
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
const supportChatService = {
  // POST /support/ticket
  createTicket: async (data) => {
    const response = await apiRequest("/support/ticket", "POST", data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // POST /support/ticket/{token}/message
  sendMessage: async (token, data) => {
    const response = await apiRequest(`/support/ticket/${token}/message`, "POST", data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // GET /support/ticket/{token}/messages
  getMessages: async (token) => {
    const response = await apiRequest(`/support/ticket/${token}/messages`, "GET");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  }
};
const ADMIN_SUPPORT_BASE = "/support";
const adminSupportChatService = {
  // GET /admin/support/stats
  getStats: async () => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/stats`, "GET");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // GET /admin/support/tickets
  getTickets: async (page = 1) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets?page=${page}`, "GET");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // GET /admin/support/tickets/{id}
  getTicketById: async (id) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets/${id}`, "GET");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // POST /admin/support/tickets/{id}/reply
  replyToTicket: async (id, data) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets/${id}/reply`, "POST", data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // PUT /admin/support/tickets/{id}/close
  closeTicket: async (id) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets/${id}/close`, "PUT");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // PUT /admin/support/tickets/{id}/reopen
  reopenTicket: async (id) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets/${id}/reopen`, "PUT");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  },
  // DELETE /admin/support/tickets/{id}
  deleteTicket: async (id) => {
    const response = await apiRequest(`${ADMIN_SUPPORT_BASE}/tickets/${id}`, "DELETE");
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors
    };
  }
};
function SupportChatFloat({
  autoShowDelay = 6e3,
  idleHideDelay = 3e4,
  position = "bottom-right"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([{
      id: "bot-welcome",
      content: "Hi there! 👋 Welcome to EdgeLancer Support. Please enter your details to start.",
      sender: "bot",
      timestamp: /* @__PURE__ */ new Date(),
      status: "read"
    }]);
  }, []);
  const [showPreChat, setShowPreChat] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", subject: "", message: "" });
  const [autoShowDisabled, setAutoShowDisabled] = useState(false);
  const [isSubmittingPreChat, setIsSubmittingPreChat] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [ticketStatus, setTicketStatus] = useState("open");
  const messagesEndRef = useRef(null);
  const idleTimerRef = useRef(null);
  const autoShowTimerRef = useRef(null);
  const pollingTimerRef = useRef(null);
  useEffect(() => {
    const savedToken = localStorage.getItem("edgelancer_support_token");
    if (savedToken) {
      setSessionToken(savedToken);
      setShowPreChat(false);
      pollMessages(savedToken);
    }
  }, []);
  const toChatMessage = (item, index) => {
    const senderRaw = String(item.sender_type || item.sender || "").toLowerCase();
    let mappedSender = "bot";
    if (senderRaw.includes("user") || senderRaw.includes("customer")) {
      mappedSender = "user";
    } else if (senderRaw.includes("agent") || senderRaw.includes("admin")) {
      mappedSender = "agent";
    }
    const content = String(item.message || item.content || "").trim();
    const tsRaw = item.created_at || item.timestamp;
    const timestamp = tsRaw ? new Date(tsRaw) : /* @__PURE__ */ new Date();
    return {
      id: String(item.id ?? `api-msg-${timestamp.getTime()}-${index}`),
      content,
      sender: mappedSender,
      timestamp,
      status: mappedSender === "user" ? "read" : "read"
    };
  };
  const pollMessages = async (token) => {
    if (!token) return;
    try {
      const response = await supportChatService.getMessages(token);
      const resData = response.data || response;
      if (resData.success) {
        if (resData.ticket?.status) {
          setTicketStatus(resData.ticket.status);
        }
        const rawMessages = resData.messages || [];
        const apiMessages = rawMessages.map(toChatMessage).filter((m) => m.content.length > 0);
        if (apiMessages.length > 0) {
          setMessages((prev) => {
            const newMessages = [...prev];
            apiMessages.forEach((apiMsg) => {
              const exactMatchIndex = newMessages.findIndex((m) => String(m.id) === String(apiMsg.id));
              if (exactMatchIndex >= 0) {
                newMessages[exactMatchIndex] = apiMsg;
              } else {
                const optimisticIndex = newMessages.findIndex(
                  (m) => String(m.id).startsWith("temp-") && m.content === apiMsg.content
                );
                if (optimisticIndex >= 0) {
                  newMessages[optimisticIndex] = apiMsg;
                } else {
                  newMessages.push(apiMsg);
                }
              }
            });
            return newMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          });
        }
      } else {
        handleEndSession();
      }
    } catch (error) {
      console.error("Failed to poll messages:", error);
    }
  };
  useEffect(() => {
    if (autoShowDisabled) return;
    autoShowTimerRef.current = setTimeout(() => setIsVisible(true), autoShowDelay);
    return () => clearTimeout(autoShowTimerRef.current);
  }, [autoShowDelay, autoShowDisabled]);
  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsMinimized(true), idleHideDelay);
    };
    resetIdleTimer();
    const handleActivity = () => resetIdleTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [isOpen, isMinimized, idleHideDelay]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (!sessionToken || showPreChat || ticketStatus === "closed") return;
    pollingTimerRef.current = setInterval(() => pollMessages(sessionToken), 4e3);
    return () => clearInterval(pollingTimerRef.current);
  }, [sessionToken, showPreChat, ticketStatus]);
  const handlePreChatSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email && userInfo.message) {
      setIsSubmittingPreChat(true);
      try {
        const response = await supportChatService.createTicket({
          name: userInfo.name,
          email: userInfo.email,
          subject: userInfo.subject || "Support Request",
          message: userInfo.message
        });
        const resData = response.data || response;
        if (resData.success && resData.session_token) {
          const token = resData.session_token;
          setSessionToken(token);
          localStorage.setItem("edgelancer_support_token", token);
          setShowPreChat(false);
          setMessages([{
            id: `welcome-${Date.now()}`,
            content: `Ticket created! We've received your message, ${userInfo.name}. An agent will reply shortly.`,
            sender: "bot",
            timestamp: /* @__PURE__ */ new Date(),
            status: "read"
          }]);
          await pollMessages(token);
        } else {
          throw new Error(resData.message || "Failed to create ticket");
        }
      } catch (err) {
        setMessages((prev) => [...prev, {
          id: `err-${Date.now()}`,
          content: err.message || "Sorry, there was an issue connecting. Please try again.",
          sender: "bot",
          timestamp: /* @__PURE__ */ new Date(),
          status: "read"
        }]);
      } finally {
        setIsSubmittingPreChat(false);
      }
    }
  };
  const handleSendMessage = async () => {
    if (!messageText.trim() || !sessionToken || ticketStatus === "closed") return;
    const messageContent = messageText.trim();
    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      id: tempId,
      content: messageContent,
      sender: "user",
      timestamp: /* @__PURE__ */ new Date(),
      status: "sending"
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
    try {
      const response = await supportChatService.sendMessage(sessionToken, { message: messageContent });
      const resData = response.data || response;
      if (!resData.success) {
        setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: "sent" } : m));
        setMessages((prev) => [...prev, {
          id: `sys-err-${Date.now()}`,
          content: resData.message || "Message failed. This ticket may be closed.",
          sender: "bot",
          timestamp: /* @__PURE__ */ new Date(),
          status: "read"
        }]);
        if (resData.message?.includes("closed")) setTicketStatus("closed");
      } else {
        setMessages((prev) => prev.map((m) => m.id === tempId ? { ...m, status: "sent" } : m));
        await pollMessages(sessionToken);
      }
    } catch (error) {
      setMessages((prev) => [...prev, {
        id: `sys-err-${Date.now()}`,
        content: "Network error sending message. Please try again.",
        sender: "bot",
        timestamp: /* @__PURE__ */ new Date(),
        status: "read"
      }]);
    }
  };
  const handleEndSession = () => {
    localStorage.removeItem("edgelancer_support_token");
    setSessionToken(null);
    setShowPreChat(true);
    setTicketStatus("open");
    setUserInfo({ name: "", email: "", subject: "", message: "" });
    setMessages([{
      id: "bot-welcome-new",
      content: "Session ended. Please enter your details to start a new chat.",
      sender: "bot",
      timestamp: /* @__PURE__ */ new Date(),
      status: "read"
    }]);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const positionClasses = position === "bottom-right" ? "right-4 sm:right-6" : "left-4 sm:left-6";
  if (!isVisible && !isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: cn("fixed bottom-4 sm:bottom-6 z-50", positionClasses), children: [
    isOpen && !isMinimized && /* @__PURE__ */ jsxs("div", { className: "mb-4 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[calc(100vh-120px)] bg-nexus-card border border-nexus-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "p-4 bg-gradient-to-r from-cyan-500 to-purple-500 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "EdgeLancer Support" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Circle, { className: cn("w-2 h-2", ticketStatus === "open" ? "fill-green-400 text-green-400" : "fill-red-400 text-red-400") }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80", children: ticketStatus === "open" ? "Online • Ready to help" : "Ticket Closed" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          !showPreChat && /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-white/80 hover:text-white hover:bg-white/20", onClick: handleEndSession, title: "Start New Chat", children: /* @__PURE__ */ jsx(RefreshCcw, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-white/80 hover:text-white hover:bg-white/20", onClick: () => setIsMinimized(true), children: /* @__PURE__ */ jsx(Minimize2, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-white/80 hover:text-white hover:bg-white/20", onClick: () => setIsOpen(false), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
        ] })
      ] }) }),
      showPreChat ? /* @__PURE__ */ jsx("div", { className: "p-4 flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxs("form", { onSubmit: handlePreChatSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-nexus-muted mb-4", children: "Please provide your details to start the conversation." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(Input, { placeholder: "Your name", "aria-label": "Your name", value: userInfo.name, onChange: (e) => setUserInfo((prev) => ({ ...prev, name: e.target.value })), className: "bg-nexus-black border-nexus-border", required: true }),
            /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Your email", "aria-label": "Your email", value: userInfo.email, onChange: (e) => setUserInfo((prev) => ({ ...prev, email: e.target.value })), className: "bg-nexus-black border-nexus-border", required: true }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Subject (Optional)", "aria-label": "Subject", value: userInfo.subject, onChange: (e) => setUserInfo((prev) => ({ ...prev, subject: e.target.value })), className: "bg-nexus-black border-nexus-border" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "How can we help you?",
                "aria-label": "Your message",
                value: userInfo.message,
                onChange: (e) => setUserInfo((prev) => ({ ...prev, message: e.target.value })),
                className: "w-full min-h-[80px] p-3 text-sm rounded-md bg-nexus-black border border-nexus-border focus:outline-none focus:ring-1 focus:ring-cyan-500",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingPreChat, className: "w-full gradient-primary text-white border-0", children: isSubmittingPreChat ? "Connecting..." : "Start Chat" })
      ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 h-[350px] p-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          messages.map((message) => /* @__PURE__ */ jsxs("div", { className: cn("flex gap-2", message.sender === "user" ? "flex-row-reverse" : "flex-row"), children: [
            message.sender !== "user" && /* @__PURE__ */ jsx(Avatar, { className: "w-8 h-8 flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(AvatarFallback, { className: cn(
              "text-white text-[10px] font-bold",
              message.sender === "agent" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-slate-600 to-slate-800"
            ), children: message.sender === "agent" ? "CS" : "SYS" }) }),
            /* @__PURE__ */ jsxs("div", { className: cn(
              "max-w-[80%] px-4 py-2",
              message.sender === "user" ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl rounded-br-sm" : message.sender === "agent" ? "bg-nexus-border text-white rounded-2xl rounded-bl-sm" : "bg-transparent border border-nexus-border/50 text-nexus-muted rounded-xl"
            ), children: [
              message.sender === "agent" && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-cyan-400 font-medium mb-0.5", children: "Support Agent" }),
              /* @__PURE__ */ jsx("p", { className: cn("text-sm whitespace-pre-wrap", message.sender === "bot" && "text-xs italic"), children: message.content }),
              /* @__PURE__ */ jsxs("p", { className: cn("text-[10px] mt-1 flex items-center gap-1", message.sender === "user" ? "justify-end text-white/70" : "justify-start text-nexus-muted"), children: [
                formatTime(message.timestamp),
                message.sender === "user" && message.status && /* @__PURE__ */ jsxs("span", { className: "ml-1 text-[12px]", children: [
                  message.status === "sending" && "○",
                  message.status === "sent" && "✓",
                  message.status === "read" && "✓✓"
                ] })
              ] })
            ] })
          ] }, message.id)),
          /* @__PURE__ */ jsx("div", { ref: messagesEndRef, className: "h-1" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-nexus-border bg-nexus-card shrink-0", children: ticketStatus === "closed" ? /* @__PURE__ */ jsxs("div", { className: "text-center text-xs text-nexus-muted py-2 bg-nexus-black rounded-lg border border-nexus-border", children: [
          "This conversation has been closed. ",
          /* @__PURE__ */ jsx("button", { onClick: handleEndSession, className: "text-cyan-400 hover:underline", children: "Start a new one" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Input, { value: messageText, onChange: (e) => setMessageText(e.target.value), onKeyDown: handleKeyDown, placeholder: "Reply here...", "aria-label": "Chat message", className: "flex-1 h-9 bg-nexus-black border-nexus-border text-sm" }),
          /* @__PURE__ */ jsx(Button, { size: "icon", "aria-label": "Send message", className: "h-9 w-9 gradient-primary text-white border-0", onClick: handleSendMessage, disabled: !messageText.trim(), children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-4 py-2 bg-nexus-black/80 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-nexus-muted", children: "Powered by EdgeLancer" }),
        /* @__PURE__ */ jsx("button", { className: "text-[10px] text-nexus-muted hover:text-white transition-colors", onClick: () => setAutoShowDisabled(true), children: "Disable auto-show" })
      ] }) })
    ] }),
    isOpen && isMinimized && /* @__PURE__ */ jsxs("button", { onClick: () => setIsMinimized(false), className: "mb-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all animate-in slide-in-from-bottom-2", children: [
      /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4 text-white" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: "Support Chat" }),
      /* @__PURE__ */ jsx(Badge, { className: "bg-white/20 text-white border-0 text-xs", children: messages.filter((m) => m.sender === "agent").length })
    ] }),
    !isOpen && /* @__PURE__ */ jsxs("button", { onClick: () => setIsOpen(true), className: "group relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-in zoom-in-50", "aria-label": "Open support chat", children: [
      /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6 text-white" }),
      /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-ping opacity-30" }),
      /* @__PURE__ */ jsx("span", { className: "absolute right-full mr-3 px-3 py-1.5 bg-nexus-card border border-nexus-border rounded-lg text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: "Need help? Chat with us!" })
    ] })
  ] });
}
const GlobalLoadingOverlay = () => {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] pointer-events-none flex items-start justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full h-1 bg-indigo-500/10 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-indigo-500 origin-left animate-[loading_2s_ease-in-out_infinite]" }) }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: {
      __html: `
                @keyframes loading {
                    0% { transform: scaleX(0); transform-origin: left; }
                    45% { transform: scaleX(1); transform-origin: left; }
                    50% { transform: scaleX(1); transform-origin: right; }
                    100% { transform: scaleX(0); transform-origin: right; }
                }
            `
    } })
  ] });
};
const API_BASE_URL = "http://127.0.0.1:8000/api";
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
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState(null);
  useEffect(() => {
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
    return /* @__PURE__ */ jsxs("section", { className: cn("py-24 px-6 max-w-3xl mx-auto", className), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-10 text-center", children: title }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-400" }) })
    ] });
  }
  if (error || faqs.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: cn("py-24 px-6 max-w-3xl mx-auto", className), children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-8 text-center", children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: cn(
      "border rounded-xl overflow-hidden transition-all duration-300",
      openIndex === i ? "border-indigo-500/20 bg-indigo-500/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
    ), children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setOpenIndex(openIndex === i ? null : i), className: "w-full flex items-center justify-between p-5 text-left gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-200 text-[15px] leading-snug", children: faq.question }),
        /* @__PURE__ */ jsx("div", { className: cn(
          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
          openIndex === i ? "bg-indigo-500/15" : "bg-white/[0.05]"
        ), children: openIndex === i ? /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5 text-indigo-400" }) : /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 text-slate-500" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: cn(
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
    return { success: response.success, message: response.message, data: response.data?.data };
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
    return { success: response.success, message: response.message, data: response.data ? { blog: response.data.data, seo: response.data.seo } : void 0 };
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
    return { success: response.success, message: response.message, data: response.data?.data };
  },
  // Get related workflows for a blog
  getRelatedWorkflows: async (slug) => {
    const response = await apiRequest(`/blogs/${slug}/related-workflows`);
    return { success: response.success, message: response.message, data: response.data?.data };
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
    const response = await apiRequest(`/workflow-library${buildQueryString(params)}`);
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
    const result = response.data?.data;
    const arrayData = Array.isArray(result) ? result : result?.data || [];
    return { success: true, data: arrayData };
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
      seo: payload?.seo || raw?.seo || null
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
            "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
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
  const [workflowCategories, setWorkflowCategories] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wfRes, blogRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          blogService.getCategories()
        ]);
        if (wfRes.success && wfRes.data) {
          setWorkflowCategories(wfRes.data.slice(0, 4));
        }
        if (blogRes.success && blogRes.data) {
          setBlogCategories(blogRes.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch footer categories:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-[#050508] border-t border-white/5 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/4 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-12 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 space-y-6", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group cursor-pointer", title: "EdgeLancer - Back to Top", children: [
            /* @__PURE__ */ jsx("img", { src: "/favicon.png", alt: "EdgeLancer Logo", width: 40, height: 40, className: "object-contain group-hover:scale-105 transition-transform duration-300" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-1xl md:text-1xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]",
                style: { fontFamily: "'Orbitron', sans-serif" },
                children: "EdgeLancer"
              }
            ),
            "            "
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Empowering the next generation of creators with autonomous AI workflows. Join the neural revolution." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [
            { Icon: Twitter, label: "Twitter", href: "https://x.com/edgelancern8n" },
            { Icon: Github, label: "GitHub", href: "https://github.com/edgelancer" },
            { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/edgelancer" },
            { Icon: Mail, label: "Email", href: "mailto:contact@edgelancer.com" }
          ].map((item, i) => /* @__PURE__ */ jsx("a", { href: item.href, className: "p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all", "aria-label": item.label, title: `Follow us on ${item.label}`, children: /* @__PURE__ */ jsx(item.Icon, { className: "w-5 h-5" }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-medium mb-6", children: "Platform" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            { label: "Home", href: "/" },
            { label: "Workflows", href: "/workflows" },
            { label: "Templates", href: "/templates" },
            { label: "Blog", href: "/blogs" }
          ].map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: item.href, className: "text-gray-400 hover:text-white flex items-center group transition-colors", title: `Go to ${item.label}`, children: [
            /* @__PURE__ */ jsx("span", { className: "w-0 group-hover:w-2 h-px bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300" }),
            item.label
          ] }) }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-medium mb-6", children: "Resources" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: blogCategories.length > 0 ? blogCategories.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: `/blogs?category=${item.slug}`, className: "text-gray-400 hover:text-white flex items-center group transition-colors", title: `Browse ${item.title} blogs`, children: [
            /* @__PURE__ */ jsx("span", { className: "w-0 group-hover:w-2 h-px bg-purple-500 mr-0 group-hover:mr-2 transition-all duration-300" }),
            item.title
          ] }) }, item.id)) : /* @__PURE__ */ jsx("li", { className: "text-gray-400 text-sm italic", children: "Loading..." }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 space-y-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-medium", children: "Get Product Updates" }),
          /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Enter your email",
                "aria-label": "Email address for newsletter",
                className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-600"
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "absolute right-2 top-2 bottom-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center", "aria-label": "Subscribe to updates", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " EdgeLancer  Built for the future."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-xs text-gray-400 items-center", children: [
          /* @__PURE__ */ jsxs("a", { href: "mailto:contact@edgelancer.com", className: "hover:text-cyan-400 transition-colors flex items-center gap-1", title: "Email us at contact@edgelancer.com", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }),
            "contact@edgelancer.com"
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/sitemap", className: "hover:text-white transition-colors", title: "View Site Structure", children: "Sitemap" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-white transition-colors", title: "Get in touch with us", children: "Contact" })
        ] })
      ] })
    ] })
  ] });
};
const navItems = [
  { label: "Home", to: "/", title: "Go to Home" },
  { label: "Workflows", to: "/workflows", title: "Browse Workflow Templates" },
  { label: "Templates", to: "/templates", title: "View Template Library" },
  { label: "Courses", to: "/courses", title: "Browse our Expert Courses" },
  { label: "Blogs", to: "/blogs", title: "Read our latest Blog Posts" },
  { label: "Contact", to: "/contact", title: "Contact Us" }
];
function PublicNavbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState(navItems);
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
  useEffect(() => {
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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const idx = dynamicNavItems.findIndex(
      (item) => item.to === pathname || item.children && item.children.some((child) => child.to === pathname)
    );
    setActiveIndex(idx !== -1 ? idx : null);
  }, [pathname, dynamicNavItems]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: cn(
          "fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "md:top-5 md:inset-x-0 md:max-w-6xl md:mx-auto md:rounded-2xl",
          "top-0 inset-x-0 w-full border-b md:border",
          isScrolled || mobileMenuOpen ? "bg-[#050507]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]" : "bg-transparent border-transparent md:bg-[#050507]/40 md:backdrop-blur-md md:border-white/5"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "h-16 md:h-14 px-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "flex items-center gap-3 group relative z-20",
              title: "EdgeLancer Home",
              onClick: () => setMobileMenuOpen(false),
              children: /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: navRef,
              className: "hidden md:flex relative items-center bg-white/5 rounded-full p-1 border border-white/5 shadow-inner",
              onMouseLeave: handleMouseLeave,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-1 bottom-1 left-0 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none",
                    style: hoverStyle
                  }
                ),
                dynamicNavItems.map((item, index) => {
                  const isDropdown = !!item.children;
                  return /* @__PURE__ */ jsxs("div", { className: "relative group/dropdown h-full flex items-center", children: [
                    isDropdown ? /* @__PURE__ */ jsxs(
                      "button",
                      {
                        className: cn(
                          "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 flex items-center gap-1 cursor-default outline-none h-full",
                          hoveredIndex === index ? "text-white" : "text-slate-400"
                        ),
                        onMouseEnter: (e) => handleMouseEnter(index, e),
                        children: [
                          item.label,
                          /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3 mt-0.5 group-hover/dropdown:rotate-180 transition-transform duration-300" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: item.to,
                        className: cn(
                          "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200 block h-full flex items-center",
                          activeIndex === index ? "text-white" : "text-slate-400 hover:text-white"
                        ),
                        onMouseEnter: (e) => handleMouseEnter(index, e),
                        children: [
                          item.label,
                          activeIndex === index && /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full shadow-[0_0_8px_currentColor]" })
                        ]
                      }
                    ),
                    isDropdown && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 pt-2 invisible opacity-0 translate-y-1 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-500 ease-out delay-200 group-hover/dropdown:delay-0", children: /* @__PURE__ */ jsx("div", { className: "w-[600px] p-4 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 backdrop-blur-2xl shadow-2xl grid grid-cols-2 gap-2", children: item.children?.map((child, i) => /* @__PURE__ */ jsxs(
                      Link,
                      {
                        to: child.to,
                        className: "flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item",
                        children: [
                          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-indigo-400 group-hover/item:border-indigo-500/30 transition-all", children: /* @__PURE__ */ jsx(child.icon, { className: "w-5 h-5" }) }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-slate-200 group-hover/item:text-white", children: child.label }),
                            child.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400 group-hover/item:text-slate-300", children: child.description })
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
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "hidden md:block group relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-50 group-hover:blur-xl" }),
              /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-full p-[1px] transition-transform duration-300 active:scale-95", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] group-hover:animate-[spin_2s_linear_infinite]" }),
                /* @__PURE__ */ jsxs(Button, { className: "relative h-9 rounded-full bg-slate-950/90 backdrop-blur-sm px-6 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-slate-900/90", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" }),
                  /* @__PURE__ */ jsxs("span", { className: "relative flex items-center gap-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent", children: [
                    /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "Hire Us" }),
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 group-hover:translate-x-1" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                className: "md:hidden relative z-50 p-2 text-slate-300 hover:text-white transition-colors",
                children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "fixed inset-0 z-40 bg-[#050507] md:hidden flex flex-col pt-24 px-6 transition-all duration-300 ease-in-out overflow-y-auto",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: dynamicNavItems.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "border-b border-white/5 last:border-0 pb-2", children: item.children ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setMobileCategoryOpen(!mobileCategoryOpen),
                className: "w-full group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all text-left",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-slate-300 group-hover:text-white", children: item.label }),
                  /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-5 h-5 text-slate-600 transition-transform duration-300", mobileCategoryOpen ? "rotate-180 text-indigo-400" : "") })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: cn("overflow-hidden transition-all duration-300 px-4 space-y-1", mobileCategoryOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"), children: item.children.map((child, i) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: child.to,
                onClick: () => setMobileMenuOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5",
                children: [
                  /* @__PURE__ */ jsx(child.icon, { className: "w-4 h-4 text-indigo-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm", children: child.label })
                ]
              },
              i
            )) })
          ] }) : /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              onClick: () => setMobileMenuOpen(false),
              className: "group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-slate-300 group-hover:text-white", children: item.label }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" })
              ]
            }
          ) }, item.label)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pb-10 space-y-4", children: /* @__PURE__ */ jsx(Link, { to: "/contact", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsx(Button, { className: "w-full h-12 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20 rounded-xl", children: "Hire Us" }) }) })
        ]
      }
    )
  ] });
}
const SpotlightCard$1 = ({ children, className = "", onClick }) => /* @__PURE__ */ jsx(
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
  const Icon = iconPool[safeId % iconPool.length];
  const gradient = gradientPool[safeId % gradientPool.length];
  return { Icon, gradient };
};
const ProductionTemplates = ({
  initialWorkflows = [],
  initialCategories = []
}) => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(initialWorkflows.length === 0);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(initialWorkflows.length > 0);
  useEffect(() => {
    if (initialCategories.length > 0) return;
    workflowService.getWorkflowLibraryCategories().then((res) => {
      if (res?.data) {
        setCategories(res.data);
      }
    }).catch((error) => console.error("Error loading workflow categories:", error));
  }, [initialCategories.length]);
  useEffect(() => {
    if (hasLoadedInitial) {
      setHasLoadedInitial(false);
      return;
    }
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const templatesRes = await workflowService.getWorkflowLibrary(1, 12, searchQuery, activeCategory);
        if (templatesRes?.data) {
          setWorkflows(templatesRes.data);
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
  const visibleCategories = categories.slice(0, 8);
  if (loading) {
    return /* @__PURE__ */ jsxs("section", { className: "relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto flex items-center justify-center h-screen relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx(Loader, { className: "w-8 h-8 animate-spin text-purple-500" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Loading templates..." })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("section", { className: "relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-white/5 pb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2", children: "Marketplace" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-bold text-white tracking-tight mb-4", children: [
            "Production ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400", children: "Templates" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-xl text-lg leading-relaxed", children: "Deploy battle-tested automation architectures. Clone, configure, and run in seconds." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-80 group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
            /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }),
          "Categories"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap transition-all duration-300", children: [
          /* @__PURE__ */ jsx(
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
          visibleCategories.map((cat) => /* @__PURE__ */ jsx(
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
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredWorkflows.map((workflow, index) => {
        const { Icon, gradient } = getWorkflowVisuals(workflow.id, index);
        return /* @__PURE__ */ jsx(
          SpotlightCard$1,
          {
            className: "h-full",
            onClick: () => handleViewDetails(workflow.slug),
            children: /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col h-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
                  Number(workflow.price) === 0 ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors", children: "Free" }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/10 text-gray-300", children: [
                    "$",
                    workflow.price
                  ] }),
                  workflow.rating && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20", children: [
                    /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-current" }),
                    workflow.rating
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex-grow", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1", children: workflow.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 line-clamp-2", children: workflow.description })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-6", children: [
                workflow.category && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal", children: workflow.category.title }),
                workflow.nodes_count > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal", children: [
                  /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3 h-3" }),
                  workflow.nodes_count,
                  " Nodes"
                ] }),
                workflow.difficulty && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal capitalize", children: workflow.difficulty }),
                workflow.time_saved_value && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-normal", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                  workflow.time_saved_value,
                  " ",
                  workflow.time_saved_unit
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/5 mt-auto", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [
                  /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0,
                    " views"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
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
      filteredWorkflows.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12 border border-white/5 rounded-2xl bg-[#12121a] mt-8", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg", children: "No templates found matching your criteria." }) })
    ] })
  ] });
};
const SpotlightCard = ({ children, className, spotlightColor = "rgba(99, 102, 241, 0.15)", onClick }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10",
            style: {
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative z-20 h-full", children })
      ]
    }
  );
};
const BentoGrid = () => /* @__PURE__ */ jsx("section", { className: "py-16 md:py-32 px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-12 md:mb-20 max-w-3xl", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6", children: [
      "How to Setup ",
      /* @__PURE__ */ jsx("span", { className: "text-indigo-500", children: "n8n on Local System." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-slate-400", children: "If you are looking for the best workflow automation tool, learning how to setup n8n on local system is a game-changer. Experience complete privacy, zero limits, and total control." })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px]", children: [
    /* @__PURE__ */ jsxs(SpotlightCard, { className: "md:col-span-2 md:row-span-2 p-6 md:p-10 flex flex-col justify-between group h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 md:w-14 md:h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400", children: /* @__PURE__ */ jsx(Terminal, { className: "w-6 h-6 md:w-7 md:h-7" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-white mb-4", children: "Complete Local Installation" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-md text-base md:text-lg mb-4", children: "Unlike cloud-only solutions, a local n8n installation gives you complete privacy, zero limits, and total control over your data." }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-400 max-w-md text-base md:text-lg", children: [
          "In this comprehensive guide, we'll walk you through the complete ",
          /* @__PURE__ */ jsx("strong", { children: "n8n local setup" }),
          " process step-by-step to get your automation environment running perfectly."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 w-full h-48 bg-black/50 rounded-lg border border-white/10 p-4 font-mono text-xs md:text-sm overflow-hidden relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-slate-400", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "$" }),
            " npx n8n"
          ] }),
          /* @__PURE__ */ jsx("div", { children: "➜  Downloading packages..." }),
          /* @__PURE__ */ jsx("div", { className: "text-white", title: "n8n local host url", children: "✔  n8n ready on http://localhost:5689" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-green-400", children: "Press 'O'" }),
            " to open in browser"
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            "[20:14:02] INFO: ",
            /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "Editor initialized perfectly" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-end group min-h-[250px]", children: [
      /* @__PURE__ */ jsx(Settings, { className: "w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Prerequisites" }),
      /* @__PURE__ */ jsxs("ul", { className: "text-sm md:text-base text-slate-400 list-disc pl-4 space-y-1", children: [
        /* @__PURE__ */ jsx("li", { children: "Node.js (v18 or later)" }),
        /* @__PURE__ */ jsx("li", { children: "npm (Package Manager)" }),
        /* @__PURE__ */ jsxs("li", { children: [
          "Docker (optional for ",
          /* @__PURE__ */ jsx("em", { children: "n8n docker setup" }),
          ")"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-end group min-h-[250px]", children: [
      /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 md:w-10 md:h-10 text-emerald-500 mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Method 1: npm (Fastest)" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base text-slate-400 mb-4", children: "The quickest way to start automating locally today:" }),
      /* @__PURE__ */ jsx("code", { className: "text-xs bg-black/50 p-2 rounded text-emerald-400 border border-emerald-500/20", children: "npx n8n" })
    ] }),
    /* @__PURE__ */ jsx(SpotlightCard, { className: "md:col-span-2 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 group", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsx(Server, { className: "w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Method 2: Docker Deployment" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm md:text-base text-slate-400 mb-4", children: [
        "For robust ",
        /* @__PURE__ */ jsx("strong", { children: "n8n automation local deployment" }),
        ", Docker is the industry standard. It encapsulates dependencies perfectly and ensures a stable environment."
      ] }),
      /* @__PURE__ */ jsx("code", { className: "text-xs md:text-sm bg-black/50 p-3 rounded text-blue-400 border border-blue-500/20 block overflow-x-auto whitespace-nowrap", children: "docker run -it --rm --name n8n -p 5689:5689 -v ~/.n8n:/home/node/.n8n n8nio/n8n" })
    ] }) }),
    /* @__PURE__ */ jsxs(SpotlightCard, { className: "p-6 md:p-8 flex flex-col justify-center bg-indigo-600/10 border-indigo-500/30 min-h-[250px]", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-white mb-2", children: "Why Local Setup?" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base text-indigo-200", children: "Mastering local installation provides unparalleled benefits: workflow privacy, custom nodes, no rate limits, and zero recurring cloud costs for your system." })
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
  const blogs = useMemo(() => {
    if (initialBlogs.length <= 6) return initialBlogs;
    const shuffled = [...initialBlogs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [initialBlogs]);
  if (blogs.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Latest from the Blog" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Tips, tutorials, and insights on workflow automation." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/blogs",
          title: "View all blog posts",
          className: "text-indigo-400 hover:text-indigo-300 h-auto text-sm md:text-base group flex items-center",
          children: [
            "View all posts ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: blogs.map((blog) => /* @__PURE__ */ jsx(Link, { to: `/blogs/${blog.slug}`, "aria-label": `Read: ${blog.title}`, children: /* @__PURE__ */ jsxs(SpotlightCard, { className: "group cursor-pointer h-full flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] overflow-hidden rounded-t-xl bg-slate-900", children: [
        getImageUrl(blog.image_url) ? /* @__PURE__ */ jsx(
          "img",
          {
            src: getImageUrl(blog.image_url),
            alt: blog.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "w-8 h-8 text-slate-600" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-transparent to-transparent" }),
        blog.category?.title && /* @__PURE__ */ jsxs("span", { className: "absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3" }),
          blog.category.title
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2", children: blog.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4", children: blog.description }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-4 text-xs text-slate-500", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
            formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
            calculateReadTime(blog.content)
          ] })
        ] })
      ] })
    ] }) }, blog.id)) })
  ] }) });
};
const CategoriesSection = ({ initialCategories = [] }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(initialCategories.length === 0);
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
  useEffect(() => {
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
    return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Browse by Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Find a starting point for your next automation." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsxs("div", { className: "p-5 md:p-6 bg-[#0e0f14] rounded-xl border border-slate-800 animate-pulse", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-slate-800 rounded-lg mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "h-6 bg-slate-800 rounded mb-2 w-3/4" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-slate-800 rounded w-full" })
      ] }, i)) })
    ] }) });
  }
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-2", children: "Browse by Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm md:text-base", children: "Find a starting point for your next automation." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/workflows",
          title: "View all workflow categories and templates",
          className: "text-indigo-400 hover:text-indigo-300 p-0 hover:bg-transparent md:hover:bg-accent md:p-4 h-auto text-sm md:text-base group flex items-center",
          children: [
            "View all categories ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: categories.map((cat) => {
      const Icon = cat.icon || Workflow;
      return /* @__PURE__ */ jsxs(
        SpotlightCard,
        {
          className: "group p-5 md:p-6 cursor-pointer",
          onClick: () => handleCategoryClick(cat.slug),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-colors", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" }) }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-slate-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: cat.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 leading-relaxed", children: cat.badge_text || `Discover ${cat.title.toLowerCase()} automation workflows` })
          ]
        },
        cat.id
      );
    }) })
  ] }) });
};
const CodeDemoSection = () => /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
  /* @__PURE__ */ jsxs("div", { className: "space-y-8 order-2 lg:order-1", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: [
      "Download & Import ",
      /* @__PURE__ */ jsx("br", {}),
      "Ready-to-Use ",
      /* @__PURE__ */ jsx("span", { className: "text-indigo-500", children: "n8n Workflows." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-slate-400 leading-relaxed", children: "Instantly grab powerful workflow JSON templates that get the best views. Our analysis gives you complete workflow details, custom nodes, and a seamless import experience right into your secure n8n editor." }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
      { title: "One-Click Import", desc: "Simply copy our JSON templates directly into your n8n workspace." },
      { title: "Complete Node Analysis", desc: "Every template includes complete descriptions and analysis of nodes." },
      { title: "Free Download", desc: "Download JSON files to keep backups before launching in n8n." }
    ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-1 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-indigo-400" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white text-sm md:text-base", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-slate-400", children: item.desc })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 pt-4", children: [
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors", children: [
        /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
        "Download JSON Template"
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-white/10", children: [
        /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }),
        "Copy to Clipboard"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "http://localhost:5689", title: "n8n local host url", target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 px-6 py-3 rounded-xl font-medium transition-colors border border-white/10 text-sm", children: [
        /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" }),
        "Open Local n8n Editor"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden flex flex-col h-[450px] md:h-[550px] w-full order-1 lg:order-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "h-10 border-b border-white/5 flex items-center px-4 bg-[#0e0e0e] justify-between shrink-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" }),
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-slate-700" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400 font-mono", children: "workflow-analysis.json" }),
      /* @__PURE__ */ jsx("div", { className: "w-10" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-48 border-r border-white/5 bg-[#0a0a0a] p-4 hidden md:block shrink-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-slate-400 uppercase mb-3", children: "Templates" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-indigo-400 bg-indigo-500/10 p-2 rounded cursor-pointer", children: [
            /* @__PURE__ */ jsx(FileJson, { className: "w-4 h-4" }),
            " workflow-analysis.json"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-400 p-2 cursor-pointer hover:text-white", children: [
            /* @__PURE__ */ jsx(FileCode, { className: "w-4 h-4" }),
            " README.md"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 p-4 md:p-6 font-mono text-xs md:text-sm overflow-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("div", { className: "text-slate-300 whitespace-pre", children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: '// How to use: Download this JSON and click "Import from File" or paste it directly in your n8n editor.' }),
        /* @__PURE__ */ jsx("br", {}),
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"Complete SEO & Data Analysis Workflow"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"nodes"' }),
        ": [",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"parameters"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"method"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"GET"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"url"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"https://api.edgelancer.com/api/workflow/top-view"' }),
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        "}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"id"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"4a2c9183-b715"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"Fetch Top Views API"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"type"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"n8n-nodes-base.httpRequest"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"typeVersion"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "4.1" }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"position"' }),
        ": [",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "460" }),
        ", ",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "260" }),
        "]",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"parameters"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "        ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"content"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"## Complete Workflow Details\\n\\nThis template analyzes the data fetched and returns custom tags to be previewed."' }),
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        "}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"id"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"9922ffaa-bb11"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"Sticky Note"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"type"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"n8n-nodes-base.stickyNote"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"typeVersion"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "1" }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "      ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"position"' }),
        ": [",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "240" }),
        ", ",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "120" }),
        "]",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "}",
        /* @__PURE__ */ jsx("br", {}),
        "  ],",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"pinData"' }),
        ": ",
        "{}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"connections"' }),
        ": ",
        "{}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"active"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-orange-400", children: "false" }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"settings"' }),
        ": ",
        "{",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"executionOrder"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"v1"' }),
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        "}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"versionId"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"342111-a8ab-10222"' }),
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "  ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"tags"' }),
        ": [",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "{",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"analysis"' }),
        " ",
        "}",
        ",",
        /* @__PURE__ */ jsx("br", {}),
        "    ",
        "{",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: '"name"' }),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-green-400", children: '"high-views"' }),
        " ",
        "}",
        /* @__PURE__ */ jsx("br", {}),
        "  ]",
        /* @__PURE__ */ jsx("br", {}),
        "}"
      ] }) })
    ] })
  ] })
] }) });
const CTASection = () => {
  useNavigate();
  return /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-40 text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter", children: "Ready for Boost your business?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto", children: "Perfect if anyone wants to build a custom automation tool." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0", children: [
        /* @__PURE__ */ jsx(Link, { to: "/contact", title: "Get Started with EdgeLancer for Free", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "h-12 md:h-14 px-8 md:px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-base md:text-lg shadow-2xl shadow-indigo-500/20 font-bold w-full", children: [
          "Get Started Free ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 ml-2" })
        ] }) }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", title: "Contact our Sales Team", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "h-12 md:h-14 px-8 md:px-10 border-slate-700 text-white hover:bg-white/5 rounded-full text-base md:text-lg font-bold w-full bg-transparent", children: "Contact Sales" }) })
      ] })
    ] })
  ] });
};
const Counter = ({ end, duration = 2e3, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(Fragment, { children: count.toFixed(decimals) });
};
const Hero = ({ initialStats = [] }) => {
  const [stats, setStats] = useState(initialStats.length > 0 ? initialStats : [
    { label: "Workflow Views", value: 10, suffix: "M+", decimals: 0 },
    { label: "Active Users", value: 50, suffix: "K+", decimals: 0 },
    { label: "Total Workflows", value: 500, suffix: "+", decimals: 0 }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
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
  useEffect(() => {
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
    /* @__PURE__ */ jsxs("section", { className: "relative w-full min-h-[90vh] md:h-screen flex flex-col justify-center pt-12 md:pt-16 bg-[#050505] overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto relative z-10 w-full px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-5", children: [
          "Ready-to-Use ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400", children: "Workflow Templates" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 px-4", children: "Start automating in seconds with our library of proven workflow templates. Customize them to fit your exact needs." }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto relative mb-8 group px-2", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-4 w-5 h-5 text-slate-400" }),
            /* @__PURE__ */ jsx(
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
            showResults && /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-14 z-20 bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl mt-2 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2", children: searchLoading ? /* @__PURE__ */ jsx("div", { className: "p-4 text-slate-400 text-center text-sm", children: "Searching..." }) : searchResults.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-slate-400 text-center text-sm", children: "No workflows found" }) : searchResults.map((wf) => /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full text-left px-4 py-3 hover:bg-purple-900/10 transition-colors flex flex-col border-b border-slate-800 last:border-b-0",
                title: `View details for ${wf.title}`,
                onClick: () => navigate(`/workflow/${wf.slug}`),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-200 text-base", children: wf.title }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 line-clamp-1", children: wf.description })
                ]
              },
              wf.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs md:text-sm mb-10 font-medium px-4", children: "Connect your favorite apps, build powerful workflows, and let AI handle repetitive tasks." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-8 md:gap-20 border-t border-white/5 pt-8", children: stats.map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center p-2 min-w-[120px]", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums", children: [
            /* @__PURE__ */ jsx(Counter, { end: stat.value, decimals: stat.decimals }),
            stat.suffix
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-wider text-center", children: stat.label })
        ] }, i)) })
      ] }) })
    ] })
  );
};
const Starfield = lazy(() => import("./assets/Starfield-Dhj2bYIO.js").then((m) => ({ default: m.Starfield })));
function LazyStarfield() {
  return /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Starfield, {}) });
}
const SITE_NAME = "EdgeLancer";
const DEFAULT_OG_IMAGE = "/og-image.png";
const TWITTER_HANDLE = "@edgelancern8n";
const FRONTEND_ORIGIN = "https://edgelancer.com";
const API_DOMAINS = [
  "api.edgelancer.com"
];
function sanitizeUrl(rawUrl) {
  if (!rawUrl) return "";
  try {
    const parsed = new URL(rawUrl);
    const isApiDomain = API_DOMAINS.some((d) => parsed.hostname.includes(d));
    if (isApiDomain) {
      return `${FRONTEND_ORIGIN}${parsed.pathname}${parsed.search}`;
    }
    return rawUrl;
  } catch {
    return rawUrl;
  }
}
const SEOHelmet = ({
  title,
  description = "",
  keywords = "",
  ogImage = "",
  url = typeof window !== "undefined" ? window.location.href : "",
  canonical,
  metaTags = {},
  structuredData,
  robots = "index, follow",
  ogType = "website",
  publishedTime,
  modifiedTime
}) => {
  let finalOgImage = ogImage;
  if (typeof window !== "undefined") {
    if (finalOgImage && !finalOgImage.startsWith("http")) {
      finalOgImage = `${window.location.origin}${finalOgImage.startsWith("/") ? "" : "/"}${finalOgImage}`;
    } else if (!finalOgImage) {
      finalOgImage = `${window.location.origin}${DEFAULT_OG_IMAGE}`;
    }
  }
  const safeCanonical = sanitizeUrl(canonical);
  const safeUrl = sanitizeUrl(url) || url;
  let canonicalUrl = safeCanonical || safeUrl;
  if (canonicalUrl && canonicalUrl.includes("?") && !safeCanonical) {
    canonicalUrl = canonicalUrl.split("?")[0];
  }
  const pageUrl = safeUrl || (typeof window !== "undefined" ? window.location.href : "");
  const structuredDataString = structuredData ? JSON.stringify(Array.isArray(structuredData) ? structuredData : structuredData) : null;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots }),
    /* @__PURE__ */ jsx("meta", { name: "googlebot", content: robots }),
    canonicalUrl && /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: pageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: finalOgImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: `${title} – ${SITE_NAME}` }),
    ogType === "article" && publishedTime && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: publishedTime }),
    ogType === "article" && modifiedTime && /* @__PURE__ */ jsx("meta", { property: "article:modified_time", content: modifiedTime }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: TWITTER_HANDLE }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:creator", content: TWITTER_HANDLE }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: finalOgImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: `${title} – ${SITE_NAME}` }),
    Object.entries(metaTags).map(([key, value]) => {
      if (!value || typeof value !== "string") return null;
      const isProperty = key.startsWith("og:") || key.startsWith("fb:") || key.startsWith("article:");
      return isProperty ? /* @__PURE__ */ jsx("meta", { property: key, content: value }, key) : /* @__PURE__ */ jsx("meta", { name: key, content: value }, key);
    }),
    structuredDataString && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: structuredDataString }
      }
    )
  ] });
};
function HomePage() {
  const ssrData = useSSRContext();
  const [stats, setStats] = useState(ssrData.stats || []);
  const [categories, setCategories] = useState(ssrData.categories || []);
  const [initialWorkflows, setInitialWorkflows] = useState(ssrData.workflows || []);
  const [blogs, setBlogs] = useState(ssrData.blogs || []);
  const [isLoading, setIsLoading] = useState(!ssrData.stats);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#020204] flex items-center justify-center", children: /* @__PURE__ */ jsx(LoadingScreen, {}) });
  }
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EdgeLancer",
    url: "https://edgelancer.com",
    logo: "https://edgelancer.com/favicon.png",
    description: "Download ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer.",
    sameAs: [
      "https://twitter.com/edgelancer",
      "https://github.com/edgelancer",
      "https://linkedin.com/company/edgelancer"
    ]
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EdgeLancer",
    url: "https://edgelancer.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://edgelancer.com/workflows?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#020204] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(
      SEOHelmet,
      {
        title: "Download Premium n8n Workflow Templates - EdgeLancer",
        description: "Ready-to-use n8n workflow automation templates. Connect apps, automate tasks, and build powerful AI agents with EdgeLancer."
      }
    ),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(organizationJsonLd) }
      }
    ),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(websiteJsonLd) }
      }
    ),
    /* @__PURE__ */ jsx(LazyStarfield, {}),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[1]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx(PublicNavbar, {}),
      /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
        /* @__PURE__ */ jsx(Hero, { initialStats: stats }),
        /* @__PURE__ */ jsx(ProductionTemplates, { initialWorkflows, initialCategories: categories }),
        /* @__PURE__ */ jsx(CategoriesSection, { initialCategories: categories }),
        /* @__PURE__ */ jsx(BlogsSection, { initialBlogs: blogs }),
        /* @__PURE__ */ jsx(BentoGrid, {}),
        /* @__PURE__ */ jsx(CodeDemoSection, {}),
        /* @__PURE__ */ jsx(FAQSection, {}),
        /* @__PURE__ */ jsx(CTASection, {})
      ] }),
      /* @__PURE__ */ jsx(PublicFooter, {})
    ] }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: {
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
function LoadingScreen() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700", children: /* @__PURE__ */ jsx("div", { className: "w-24 h-24 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" }) });
}
function PublicNavbarLayout({ children, className }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("min-h-screen bg-[#0a0a0f]", className), children: [
    /* @__PURE__ */ jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: "pt-16 md:pt-20", children }),
    /* @__PURE__ */ jsx(PublicFooter, {})
  ] });
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-primary/10", className),
      ...props
    }
  );
}
const BlogCard = memo(({ blog }) => {
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
  return /* @__PURE__ */ jsx(Link, { to: `/blogs/${blog.slug}`, "aria-label": `Read article: ${blog.title}`, children: /* @__PURE__ */ jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] overflow-hidden bg-slate-900", children: [
      getImageUrl2(blog.image_url) ? /* @__PURE__ */ jsx(
        "img",
        {
          src: getImageUrl2(blog.image_url),
          alt: blog.title,
          loading: "lazy",
          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsx(Eye, { className: "w-8 h-8 text-slate-600" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" }),
      /* @__PURE__ */ jsxs(Badge, { className: "absolute top-4 left-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30", children: [
        /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3 mr-1" }),
        blog.category?.title || "General"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors", children: blog.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 mb-4 line-clamp-2", children: blog.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold", children: getAuthorInitial(blog.author?.name) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-400", children: blog.author?.name || "Admin" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
            formatDistanceToNow(new Date(blog.published_at || blog.created_at), { addSuffix: true })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
            calculateReadTime2(blog.content)
          ] })
        ] })
      ] })
    ] })
  ] }) });
});
function BlogPage({ categorySlug }) {
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const ssrData = useSSRContext();
  const [blogs, setBlogs] = useState(ssrData.blogs?.data || ssrData.blogs || []);
  const [categories, setCategories] = useState(ssrData.categories || []);
  const [loading, setLoading] = useState(!ssrData.blogs);
  const [categoriesLoading, setCategoriesLoading] = useState(!ssrData.categories);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(categorySlug || searchParams.get("category") || "all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(ssrData.blogs?.last_page || 1);
  const [totalBlogs, setTotalBlogs] = useState(ssrData.blogs?.total || 0);
  const [globalTotal, setGlobalTotal] = useState(ssrData.blogs?.total || 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(ssrData.blogs ? ssrData.blogs.current_page < ssrData.blogs.last_page : true);
  const observerTarget = useRef(null);
  useEffect(() => {
    setActiveCategory(categorySlug || searchParams.get("category") || "all");
  }, [searchParams, categorySlug]);
  useEffect(() => {
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
  const loadBlogs = useCallback(async (currentPage = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const cSlug = activeCategory === "all" ? void 0 : activeCategory;
      const result = await blogService.getAll(currentPage, 12, searchQuery, cSlug);
      if (result.success && result.data) {
        const data = result.data;
        setBlogs((prev) => append ? [...prev, ...data.data || []] : data.data || []);
        setTotalPages(data.last_page || 1);
        setTotalBlogs(data.total || 0);
        setHasMore((data.current_page || currentPage) < (data.last_page || 1));
        if (!cSlug && !searchQuery) {
          setGlobalTotal(result.data.total || 0);
        }
      } else {
        if (!append) setBlogs([]);
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      if (!append) setBlogs([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [activeCategory, searchQuery]);
  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      loadBlogs(1, false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, loadBlogs]);
  const fetchMoreBlogs = useCallback(() => {
    if (isLoadingMore || !hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadBlogs(nextPage, true);
  }, [page, hasMore, isLoadingMore, loading, loadBlogs]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore) {
          fetchMoreBlogs();
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [fetchMoreBlogs, hasMore, loading, isLoadingMore]);
  const featuredBlogs = blogs.filter((blog) => blog.is_featured);
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsx(SEOHelmet, { title: "Automation & AI Blog", description: "Latest insights on automation, n8n, and AI workflows." }),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-16 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none transform-gpu", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto text-center relative", children: [
        /* @__PURE__ */ jsxs(Badge, { className: "mb-6 bg-white/5 text-cyan-400 border-cyan-500/30 font-medium px-4 py-1.5 rounded-full backdrop-blur-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-3 h-3 mr-2" }),
          "Blog & Resources"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight", children: "Insights & Updates" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-300 max-w-2xl mx-auto mb-10", children: "Tips, strategies, and news to help you grow your freelance business with AI automation." }),
        /* @__PURE__ */ jsx("div", { className: "max-w-xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              "aria-label": "Search articles",
              placeholder: "Search articles...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl transition-all"
            }
          )
        ] }) })
      ] })
    ] }),
    (loading || featuredBlogs.length > 0) && /* @__PURE__ */ jsx("section", { className: "py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-6 h-6 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Featured Articles" })
      ] }),
      loading ? /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "w-full aspect-[16/9] rounded-xl bg-white/5" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: featuredBlogs.slice(0, 2).map((blog) => /* @__PURE__ */ jsx(BlogCard, { blog }, blog.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-cyan-400" }),
          "Categories"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", role: "group", "aria-label": "Blog categories", children: categoriesLoading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-12 bg-white/5 rounded-lg" }, i)) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setActiveCategory("all");
                setPage(1);
              },
              className: `w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === "all" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "All Posts" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-white/10", children: globalTotal || totalBlogs })
              ]
            }
          ),
          categories.map((cat) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setActiveCategory(cat.slug);
                setPage(1);
              },
              className: `w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === cat.slug ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"}`,
              children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: cat.title })
            },
            cat.id
          ))
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 border-b border-white/5 pb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "All Articles" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-slate-400 font-medium", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] })
        ] }),
        loading && blogs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: Array.from({ length: 4 }).map((_, idx) => /* @__PURE__ */ jsxs(Card, { className: "bg-[#12121a] border-white/5 overflow-hidden", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "w-full aspect-[16/10] bg-white/5" }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "w-3/4 h-5 bg-white/5" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-4 bg-white/5" })
          ] })
        ] }, idx)) }) : blogs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center text-slate-400 py-16 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg", children: "No articles found matching your criteria." })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6", children: blogs.map((blog) => /* @__PURE__ */ jsx(BlogCard, { blog }, blog.id)) }),
          /* @__PURE__ */ jsx("div", { ref: observerTarget, className: "py-20 flex flex-col items-center justify-center gap-6", children: isLoadingMore ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" }),
              /* @__PURE__ */ jsx(Loader2, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse", children: "Scanning Decades of Data" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] mt-2", children: "Connecting to verified oracle nodes..." })
            ] })
          ] }) : !hasMore && blogs.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto overflow-hidden group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-[2rem] opacity-50 transition-opacity group-hover:opacity-80" }),
            /* @__PURE__ */ jsx(Star, { className: "w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Deep Index Reached" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
              "You have retrieved all ",
              blogs.length,
              " articles currently available."
            ] })
          ] }) : null })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 bg-gradient-to-b from-transparent to-white/[0.02] border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Subscribe to Newsletter" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-8", children: "Get the latest articles and insights delivered to your inbox." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "email",
            "aria-label": "Email address",
            placeholder: "your@email.com",
            className: "h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 flex-1 rounded-xl focus:border-cyan-500/50 transition-all border-2"
          }
        ),
        /* @__PURE__ */ jsx(Button, { className: "h-14 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 px-8 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95", children: "Subscribe" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-slate-500 text-xs font-medium", children: "No spam, ever. Unsubscribe with one click." })
    ] }) }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "blogs" })
  ] });
}
function BlogSlugPage() {
  const { slug } = useParams();
  const ssrData = useSSRContext();
  const [blog, setBlog] = useState(ssrData.blog || null);
  const [seo, setSeo] = useState(ssrData.seo);
  const [loading, setLoading] = useState(!ssrData.blog);
  const [error, setError] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState(ssrData.relatedBlogs || []);
  const [relatedWorkflows, setRelatedWorkflows] = useState(ssrData.relatedWorkflows || []);
  const [failedRelatedBlogImages, setFailedRelatedBlogImages] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const result = await blogService.getBySlugWithSeo(slug);
        if (result.success && result.data) {
          setBlog(result.data.blog);
          setSeo(result.data.seo);
          setError("");
        } else {
          setError(result.message || "Article not found");
          setBlog(null);
        }
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
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
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const metaTitleText = seo?.title || blog?.meta_title || blog?.title || "Blog Post - EdgeLancer";
  const metaTitle = metaTitleText.toLowerCase().includes("n8n") ? metaTitleText : `${metaTitleText} - n8n Automation Guide (${currentYear})`;
  const metaDesc = seo?.description || blog?.meta_description || blog?.description || "Read this article on EdgeLancer blog.";
  const schemaData = blog ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== "undefined" ? window.location.href : `https://edgelancer.com/blogs/${blog.slug}`
    },
    "headline": metaTitle,
    "description": metaDesc,
    "image": seo?.og_image || blog.image_url || "https://edgelancer.com/og-image.png",
    "author": {
      "@type": "Person",
      "name": blog.author?.name || "EdgeLancer Team",
      "url": "https://edgelancer.com/about"
      // Placeholder unless author profile URL exists
    },
    "publisher": {
      "@type": "Organization",
      "name": "EdgeLancer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edgelancer.com/logo.png"
      }
    },
    "datePublished": blog.published_at || blog.created_at,
    "dateModified": blog.updated_at || blog.published_at || blog.created_at
  } : void 0;
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
  const readingTime = blog?.content ? Math.ceil(blog.content.replace(/<[^>]+>/g, "").split(" ").length / 200) : 1;
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { className: "bg-[#030303] selection:bg-indigo-500/30 selection:text-indigo-200", children: [
    /* @__PURE__ */ jsx(
      SEOHelmet,
      {
        title: metaTitle,
        description: metaDesc,
        keywords: seo?.keywords || blog?.meta_keywords,
        ogImage: seo?.og_image || blog?.image_url || void 0,
        ogType: "article",
        publishedTime: blog?.published_at || blog?.created_at,
        modifiedTime: blog?.updated_at,
        structuredData: schemaData || seo?.structured_data
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] opacity-70" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] opacity-60" })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 animate-in fade-in duration-700", children: [
      loading && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-pulse max-w-3xl mx-auto mt-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-24 bg-white/5 rounded-full" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-14 w-full bg-white/5 rounded-xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-14 w-3/4 bg-white/5 rounded-xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/2 bg-white/5 rounded-lg mt-4" })
        ] }),
        /* @__PURE__ */ jsx(Skeleton, { className: "aspect-video w-full rounded-3xl bg-white/5" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full bg-white/5" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full bg-white/5" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6 bg-white/5" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4/6 bg-white/5" })
        ] })
      ] }),
      !loading && error && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-32 text-center space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-red-400" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white", children: "Article Not Found" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-md", children: error }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 mt-4", children: /* @__PURE__ */ jsx(Link, { to: "/blogs", children: "Explore Other Articles" }) })
      ] }),
      !loading && blog && /* @__PURE__ */ jsxs("article", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto w-full", children: /* @__PURE__ */ jsxs("header", { className: "space-y-8 mb-12", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/blogs",
              className: "inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group mb-6",
              children: [
                /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }) }),
                "Back to Articles"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            blog.category && /* @__PURE__ */ jsx(Badge, { className: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-bold rounded-full", children: blog.category.title }),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]", children: blog.title }),
            blog.description && /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-slate-400 leading-relaxed font-light", children: blog.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white/5 border border-white/10 rounded-full py-1.5 pl-1.5 pr-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-200", children: blog.author?.name || "EdgeLancer Team" })
            ] }),
            publishedDate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsx("time", { dateTime: publishedDate, className: "font-medium", children: publishedDate ? format(new Date(publishedDate), "MMM d, yyyy") : "Recently" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                readingTime,
                " min read"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4 ml-auto", children: [
              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                blog.views?.toLocaleString() ?? 0,
                " views"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: handleShare, className: "rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white", children: isCopied ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" }) })
          ] })
        ] }) }),
        blog.image_url && /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto w-full mb-16", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] bg-[#0a0a0f] group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: blog.image_url,
              alt: blog.title,
              className: "w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto w-full", children: [
          /* @__PURE__ */ jsx("style", { children: `
                                .blog-content {
                                    font-size: 1.125rem;
                                    line-height: 1.85;
                                    word-break: break-word;
                                }
                                
                                .blog-content p,
                                .blog-content li,
                                .blog-content div:not(.table-container) {
                                    color: #d1d5db !important;
                                }

                                .blog-content h1, .blog-content h2, .blog-content h3, 
                                .blog-content h4, .blog-content h5, .blog-content h6 {
                                    color: #ffffff !important;
                                    font-weight: 700;
                                    letter-spacing: -0.025em;
                                    scroll-margin-top: 5rem;
                                }

                                .blog-content h2 {
                                    font-size: 1.75rem;
                                    margin-top: 3.5rem;
                                    margin-bottom: 1.25rem;
                                    padding-bottom: 0.875rem;
                                    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
                                    position: relative;
                                }
                                .blog-content h2::before {
                                    content: '';
                                    position: absolute;
                                    bottom: -1px;
                                    left: 0;
                                    width: 3rem;
                                    height: 2px;
                                    background: linear-gradient(to right, #6366f1, transparent);
                                    border-radius: 2px;
                                }
                                .blog-content h3 {
                                    font-size: 1.375rem;
                                    margin-top: 2.5rem;
                                    margin-bottom: 1rem;
                                    color: #e0e7ff !important;
                                }

                                .blog-content strong, 
                                .blog-content b {
                                    color: #ffffff !important;
                                    font-weight: 600;
                                }
                                
                                .blog-content ul {
                                    padding-left: 0;
                                    list-style: none;
                                }
                                .blog-content ul > li {
                                    position: relative;
                                    padding-left: 1.75rem;
                                    margin-bottom: 0.875rem;
                                }
                                .blog-content ul > li::before {
                                    content: '';
                                    position: absolute;
                                    left: 0;
                                    top: 0.65em;
                                    width: 6px;
                                    height: 6px;
                                    border-radius: 50%;
                                    background: #6366f1;
                                    box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
                                }

                                .blog-content ol {
                                    padding-left: 0;
                                    list-style: none;
                                    counter-reset: step-counter;
                                }
                                .blog-content ol > li {
                                    position: relative;
                                    padding-left: 3rem;
                                    margin-bottom: 1.25rem;
                                    counter-increment: step-counter;
                                }
                                .blog-content ol > li::before {
                                    content: counter(step-counter);
                                    position: absolute;
                                    left: 0;
                                    top: 0.1em;
                                    width: 2rem;
                                    height: 2rem;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 0.5rem;
                                    background: rgba(99, 102, 241, 0.12);
                                    border: 1px solid rgba(99, 102, 241, 0.25);
                                    color: #818cf8;
                                    font-size: 0.85rem;
                                    font-weight: 700;
                                }

                                .blog-content a:not(.download-workflow-btn) {
                                    color: #818cf8 !important;
                                    text-decoration: none;
                                    border-bottom: 1px solid rgba(129, 140, 248, 0.3);
                                    transition: all 0.2s ease;
                                }
                                .blog-content a:not(.download-workflow-btn):hover {
                                    color: #a5b4fc !important;
                                    border-bottom-color: #a5b4fc;
                                }

                                .blog-content .download-workflow-btn {
                                    display: inline-flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 0.65rem;
                                    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #3b82f6 100%);
                                    color: #ffffff !important;
                                    font-size: 1rem;
                                    font-weight: 600;
                                    padding: 1rem 2rem;
                                    border-radius: 0.875rem;
                                    text-decoration: none !important;
                                    margin: 2rem 0;
                                    box-shadow: 0 4px 24px -4px rgba(79, 70, 229, 0.45);
                                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                                }
                                .blog-content .download-workflow-btn:hover {
                                    transform: translateY(-2px);
                                    box-shadow: 0 8px 30px -4px rgba(79, 70, 229, 0.55);
                                }

                                .blog-content blockquote {
                                    border-left: 3px solid #6366f1;
                                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02));
                                    padding: 1.25rem 1.75rem;
                                    margin: 2rem 0;
                                    border-radius: 0 0.875rem 0.875rem 0;
                                    font-style: italic;
                                    color: #cbd5e1;
                                }

                                .blog-content img {
                                    border-radius: 1rem;
                                    border: 1px solid rgba(255, 255, 255, 0.06);
                                    margin: 2rem auto;
                                    display: block;
                                }
                            ` }),
          /* @__PURE__ */ jsx(
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
          blog.author && /* @__PURE__ */ jsxs("div", { className: "mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-white/[0.02] p-8 rounded-3xl", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20", children: /* @__PURE__ */ jsx(User, { className: "w-10 h-10 text-white" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: blog.author.name }),
              /* @__PURE__ */ jsx("p", { className: "text-indigo-400 text-sm font-semibold mb-3 uppercase tracking-wider", children: "Automation Expert & Content Creator" }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-400 leading-relaxed font-light", children: [
                blog.author.name,
                " specializes in building complex n8n workflows and AI agents. With extensive hands-on experience in workflow automation, they write practical guides to help businesses scale operations efficiently without code."
              ] })
            ] })
          ] }),
          blog.faqs && blog.faqs.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-16 pt-12 border-t border-white/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "prose prose-invert max-w-none", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-8 border-b border-indigo-500/15 pb-4 inline-block", children: "Key Questions Answered" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-8 pl-4 border-l-[3px] border-indigo-500/30", children: blog.faqs.map((faq, idx) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-indigo-300 m-0 p-0", children: [
                  "Q: ",
                  faq.question
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-slate-300 leading-relaxed m-0 p-0", children: [
                  "A: ",
                  faq.answer
                ] })
              ] }, `faq-prose-${idx}`)) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(FAQSection, { data: blog.faqs, title: "Frequently Asked Questions (Accordion)", className: "py-0" }) })
          ] }),
          !blog.faqs?.length && /* @__PURE__ */ jsxs("div", { className: "mt-16 pt-12 border-t border-white/10 prose prose-invert max-w-none", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-6 border-b border-indigo-500/15 pb-4 inline-block", children: "Quick AI Summary Overview" }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-300 leading-relaxed pl-4 border-l-[3px] border-indigo-500/30", children: [
              /* @__PURE__ */ jsx("strong", { children: "Q: How does this workflow automation help?" }),
              /* @__PURE__ */ jsx("br", {}),
              "A: This `",
              blog.title,
              "` guide provides step-by-step instructions for automating tasks via n8n. It reduces manual data entry and improves operational efficiency.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { children: "Q: Which tools are integrated?" }),
              /* @__PURE__ */ jsx("br", {}),
              "A: By leveraging n8n, this strategy connects multiple external apps through standardized API nodes, making it a robust alternative to Zapier or Make.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { children: "Q: Do I need coding experience?" }),
              /* @__PURE__ */ jsx("br", {}),
              "A: While n8n supports custom JavaScript nodes, the core concepts detailed here rely on visual workflow mapping suitable for non-developers and automation experts alike."
            ] })
          ] })
        ] }),
        (relatedWorkflows.length > 0 || relatedBlogs.length > 0) && /* @__PURE__ */ jsxs("div", { className: "mt-24 pt-16 border-t border-white/5 space-y-20", children: [
          relatedWorkflows.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-end justify-between gap-6 mb-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20", children: [
                  /* @__PURE__ */ jsx(Workflow, { className: "w-3.5 h-3.5 text-cyan-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-cyan-400 uppercase tracking-widest", children: "Automation" })
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white tracking-tight", children: "Automate this with n8n Workflows" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg font-light max-w-2xl", children: "Ready-to-use templates designed to implement these strategies instantly. Connect apps like Typeform, Google Sheets, and Slack without code." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 sm:flex-row items-center", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 border-0 rounded-2xl px-6 py-6 h-auto font-bold text-white shadow-lg shadow-indigo-500/20", children: /* @__PURE__ */ jsx(Link, { to: "/workflows", children: "Browse Core Templates" }) }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: relatedWorkflows.slice(0, 4).map((workflow) => {
              const price = parseFloat(workflow.price || "0");
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  id: `related-workflow-card-${workflow.id}`,
                  className: "group flex flex-col bg-[#0a0a0e] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-slate-900 flex shrink-0 aspect-[16/10] w-full", children: [
                      workflow.og_image ? /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: workflow.og_image,
                          alt: workflow.title,
                          className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        }
                      ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-12", children: /* @__PURE__ */ jsx(Workflow, { className: "w-16 h-16 text-slate-700/50 group-hover:scale-110 group-hover:text-cyan-500/30 transition-all duration-700" }) }),
                      /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 flex flex-col gap-2", children: price === 0 ? /* @__PURE__ */ jsx(Badge, { className: "bg-emerald-500 text-white border-0 shadow-lg px-3 py-1 font-bold text-[10px] uppercase", children: "Free" }) : /* @__PURE__ */ jsxs(Badge, { className: "bg-white text-black border-0 shadow-lg px-3 py-1 font-bold text-[10px]", children: [
                        "$",
                        workflow.price
                      ] }) }),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-8 flex flex-col flex-1 justify-between gap-6 relative", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/80", children: workflow.category?.title || "Workflow Template" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20", children: [
                            /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-current" }),
                            workflow.rating || "5.0"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white group-hover:text-cyan-400 transition-colors leading-[1.25] text-xl md:text-2xl line-clamp-2", children: workflow.title }),
                        /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-light leading-relaxed text-sm md:text-base line-clamp-2", children: workflow.description })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 py-6 border-y border-white/5", children: [
                          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase tracking-widest text-slate-400 font-bold", children: "Complexity" }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-slate-300 font-medium text-xs capitalize", children: [
                              /* @__PURE__ */ jsx(Bot, { className: "w-3.5 h-3.5 text-cyan-500/50" }),
                              workflow.difficulty || "Beginner"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase tracking-widest text-slate-400 font-bold", children: "Automation Nodes" }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-slate-300 font-medium text-xs", children: [
                              /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3.5 h-3.5 text-cyan-500/50" }),
                              workflow.nodes_count || 12,
                              " Nodes"
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-slate-400 text-xs", children: /* @__PURE__ */ jsxs("span", { className: "ml-1", children: [
                            (workflow.views || workflow.total_views || 100).toLocaleString(),
                            "+ active users"
                          ] }) }),
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              to: `/workflow/${workflow.slug}`,
                              className: "w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
                              children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 transition-transform group-hover:translate-x-0.5" })
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
          relatedBlogs.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold text-white mb-2 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(Newspaper, { className: "w-8 h-8 text-indigo-400" }),
                  "Build Your Automation Stack"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: "Deepen your knowledge with related guides and tutorials in this cluster." })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/blogs", className: "text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors flex items-center gap-1 group", children: [
                "View Complete Knowledge Base",
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: relatedBlogs.slice(0, 4).map((rBlog) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/blogs/${rBlog.slug}`,
                className: "group flex flex-col sm:flex-row gap-5 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "relative w-full sm:w-40 aspect-video sm:aspect-square overflow-hidden rounded-2xl shrink-0 border border-white/10 bg-[#050507]", children: rBlog.image_url ? /* @__PURE__ */ jsx("img", { src: rBlog.image_url, alt: rBlog.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900", children: /* @__PURE__ */ jsx(Newspaper, { className: "w-8 h-8 text-indigo-500/50" }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2", children: rBlog.category?.title || "Article" }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight", children: rBlog.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm line-clamp-2 mt-2", children: rBlog.description })
                  ] })
                ]
              },
              rBlog.id
            )) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "blogs" })
  ] });
}
function WorkflowsPage({ categorySlug }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const [searchQuery, setSearchQuery] = useState("");
  const ssrData = useSSRContext();
  const [categories, setCategories] = useState(ssrData.categories || []);
  const [workflows, setWorkflows] = useState(ssrData.workflows?.data || ssrData.workflows || []);
  const [loading, setLoading] = useState(!ssrData.workflows);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(ssrData.workflows?.last_page || 1);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(ssrData.workflows ? ssrData.workflows.current_page < ssrData.workflows.last_page : true);
  const [totalWorkflows, setTotalWorkflows] = useState(ssrData.workflows?.total || 0);
  const observerTarget = useRef(null);
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
    const hash = id || 0;
    const Icon = iconPool2[hash % iconPool2.length];
    const gradient = gradientPool2[hash % gradientPool2.length];
    return { Icon, gradient };
  };
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await workflowService.getWorkflowLibraryCategories();
        if (res.success && res.data) {
          setCategories(res.data);
          const slug = categorySlug || searchParams.get("category");
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
  }, [searchParams, categorySlug]);
  const loadWorkflows = useCallback(async (currentPage = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const categoryId = activeCategory === "all" ? null : activeCategory;
      const res = await workflowService.getWorkflowLibrary(currentPage, 12, searchQuery, categoryId);
      if (res.data) {
        setWorkflows((prev) => append ? [...prev, ...res.data] : res.data);
        setTotalPages(res.last_page || 1);
        setTotalWorkflows(res.total || 0);
        setHasMore((res.current_page || currentPage) < (res.last_page || 1));
      } else {
        if (!append) {
          setWorkflows([]);
          setTotalPages(1);
          setTotalWorkflows(0);
        }
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [activeCategory, searchQuery]);
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const timer = setTimeout(() => {
      loadWorkflows(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, loadWorkflows]);
  const handlePageChange = useCallback(() => {
    if (isLoadingMore || !hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadWorkflows(nextPage, true);
  }, [page, hasMore, isLoadingMore, loading, loadWorkflows]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore) {
          handlePageChange();
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [handlePageChange, hasMore, loading, isLoadingMore]);
  const featuredWorkflows = workflows.slice(0, 4);
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsx(
      SEOHelmet,
      {
        title: `${activeCategory === "all" ? "All n8n Workflow Templates" : categories.find((c) => c.id === activeCategory)?.title + " Templates"} - EdgeLancer`,
        description: "Browse and download ready-to-use n8n workflow templates for marketing, sales, web scrapers and more."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-fuchsia-500/10 rounded-full blur-[80px] md:blur-[120px]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center relative", children: [
        /* @__PURE__ */ jsxs(Badge, { className: "mb-4 md:mb-6 bg-white/5 text-purple-400 border-purple-500/30 hover:bg-white/10 backdrop-blur-sm text-xs md:text-sm", children: [
          /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3 mr-1" }),
          totalWorkflows > 0 ? `${totalWorkflows}+ Templates` : "Loading Templates..."
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Ready-to-Use" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400", children: "Workflow Templates" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 px-2", children: "Start automating in seconds with our library of proven workflow templates." }),
        /* @__PURE__ */ jsx("div", { className: "max-w-xl mx-auto px-2 sm:px-0", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "Search workflows...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-12 h-12 md:h-14 bg-[#12121a] border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-purple-500/50 text-base md:text-lg rounded-xl shadow-xl"
            }
          )
        ] }) })
      ] })
    ] }),
    featuredWorkflows.length > 0 && !searchQuery && activeCategory === "all" && /* @__PURE__ */ jsx("section", { className: "py-8 md:py-12 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 md:mb-6", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-5 h-5 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base md:text-lg font-semibold text-white", children: "Featured Workflows" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: featuredWorkflows.map((workflow) => {
        const { Icon, gradient } = getWorkflowVisuals2(workflow.id);
        return /* @__PURE__ */ jsx(
          Card,
          {
            onClick: () => navigate(`/workflow/${workflow.slug}`),
            className: "bg-[#12121a] border-white/5 p-4 hover:border-white/20 transition-all cursor-pointer group",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium text-white truncate group-hover:text-purple-400 transition-colors text-sm md:text-base", children: workflow.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                  workflow.views ? workflow.views.toLocaleString() : workflow.user_count?.toLocaleString() || 0,
                  " uses"
                ] })
              ] })
            ] })
          },
          `featured-${workflow.id}`
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-6 md:py-8 px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6 md:gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:w-64 flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "static lg:sticky lg:top-24 bg-[#12121a] border border-white/5 rounded-xl p-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base", children: [
          /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }),
          "Categories"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveCategory("all"),
              className: cn(
                "whitespace-nowrap lg:w-full flex items-center justify-center lg:justify-between px-4 lg:px-3 py-2 rounded-lg text-sm transition-all shrink-0",
                activeCategory === "all" ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 lg:bg-transparent"
              ),
              children: /* @__PURE__ */ jsx("span", { children: "All Templates" })
            }
          ),
          (showAllCategories ? categories : categories.slice(0, 8)).map((category) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveCategory(category.id),
              className: cn(
                "whitespace-nowrap lg:w-full flex items-center justify-center lg:justify-between px-4 lg:px-3 py-2 rounded-lg text-sm transition-all shrink-0",
                activeCategory === category.id ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 lg:bg-transparent"
              ),
              children: /* @__PURE__ */ jsx("span", { children: category.title })
            },
            category.id
          )),
          categories.length > 8 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowAllCategories(!showAllCategories),
              className: "whitespace-nowrap lg:w-full flex items-center justify-center px-4 lg:px-3 py-2 lg:mt-2 rounded-lg text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-all outline-none border border-white/5 lg:bg-[#12121a] shrink-0",
              children: showAllCategories ? "Show Less" : "Show All"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", style: { scrollMarginTop: "100px" }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 md:mb-6", children: /* @__PURE__ */ jsxs("h2", { className: "text-lg md:text-xl font-semibold text-white", children: [
          activeCategory === "all" ? "All Templates" : categories.find((c) => c.id === activeCategory)?.title,
          /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs md:text-sm text-gray-400", children: [
            "(",
            loading ? "..." : totalWorkflows,
            ")"
          ] })
        ] }) }),
        loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 min-h-[400px] md:min-h-[600px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" }),
            /* @__PURE__ */ jsx(Loader2, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center mt-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse", children: "Scanning Decades of Data" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] mt-2", children: "Connecting to verified oracle nodes..." })
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4 md:gap-6", children: workflows.map((workflow) => {
            const { Icon, gradient } = getWorkflowVisuals2(workflow.id);
            return /* @__PURE__ */ jsx(
              Card,
              {
                onClick: () => navigate(`/workflow/${workflow.slug}`),
                className: "bg-[#12121a] border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer",
                children: /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-6 flex flex-col h-full", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                    /* @__PURE__ */ jsx("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 shrink-0`, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 md:w-6 md:h-6 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 md:gap-2 flex-wrap justify-end pl-2", children: [
                      Number(workflow.price) === 0 ? /* @__PURE__ */ jsx(Badge, { className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] md:text-xs", children: "Free" }) : /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-white/10 text-gray-300 text-[10px] md:text-xs", children: [
                        "$",
                        workflow.price
                      ] }),
                      workflow.rating && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1 text-[10px] md:text-xs", children: [
                        /* @__PURE__ */ jsx(Star, { className: "w-2.5 h-2.5 md:w-3 md:h-3 fill-current" }),
                        workflow.rating
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex-grow", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-white mb-1.5 md:mb-2 group-hover:text-cyan-400 transition-colors", children: workflow.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 line-clamp-2", children: workflow.description })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6", children: [
                    workflow.category && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-[10px] md:text-xs font-normal", children: workflow.category.title }),
                    workflow.nodes_count > 0 && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-[10px] md:text-xs font-normal gap-1", children: [
                      /* @__PURE__ */ jsx(LayoutGrid, { className: "w-3 h-3" }),
                      workflow.nodes_count,
                      " Nodes"
                    ] }),
                    workflow.difficulty && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-white/10 text-gray-400 text-[10px] md:text-xs font-normal capitalize", children: workflow.difficulty }),
                    workflow.time_saved_value && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-normal gap-1", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                      workflow.time_saved_value,
                      " ",
                      workflow.time_saved_unit
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 md:pt-4 border-t border-white/5 mt-auto", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-gray-400", children: [
                      /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3 md:w-4 md:h-4" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        workflow.views?.toLocaleString() || 0,
                        " views"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        size: "sm",
                        className: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 text-xs md:text-sm h-8 md:h-9",
                        children: "View"
                      }
                    )
                  ] })
                ] })
              },
              workflow.id
            );
          }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: observerTarget,
              className: "py-20 flex flex-col items-center justify-center gap-6",
              children: isLoadingMore ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" }),
                  /* @__PURE__ */ jsx(Loader2, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse", children: "Scanning Decades of Data" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] mt-2", children: "Connecting to verified oracle nodes..." })
                ] })
              ] }) : !hasMore && workflows.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-[2rem] opacity-50" }),
                /* @__PURE__ */ jsx(Star, { className: "w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Deep Index Reached" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
                  "You have retrieved all ",
                  workflows.length,
                  " workflows currently available."
                ] })
              ] }) : null
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "workflows" })
  ] });
}
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "p-6 md:p-8 rounded-3xl border border-yellow-500/10 relative overflow-hidden group transition-all duration-300",
        style: { width: data.width || 300, height: data.height || "auto", backgroundColor: "rgba(255, 200, 0, 0.02)" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[60%] h-[60%] bg-yellow-500/5 blur-[60px] pointer-events-none rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 text-yellow-200/50 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold mb-3", children: "Annotation" }),
          /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs("div", { className: `relative group min-w-[220px] md:min-w-[260px] rounded-2xl border ${border} ${bg} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl ${shadow}`, children: [
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "target",
        position: Position.Left,
        className: "!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `h-1 w-full rounded-t-2xl bg-gradient-to-r ${gradient} opacity-80` }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-5 flex items-start gap-3 md:gap-4 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: `w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center flex-shrink-0 text-white`, children: /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 md:w-6 md:h-6" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-bold text-white tracking-wide truncate pr-1 drop-shadow-md", children: data.label }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1.5 md:mt-2", children: /* @__PURE__ */ jsx("span", { className: "text-[9px] md:text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded-md border border-white/5 truncate max-w-full", children: data.subLabel || "NODE" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Handle,
      {
        type: "source",
        position: Position.Right,
        className: "!bg-white !w-2 !h-2 md:!w-3 md:!h-3 !border-[2px] md:!border-[3px] !border-[#050505] shadow-lg transition-transform hover:scale-150 z-50"
      }
    )
  ] });
};
const WorkflowPreview = ({ nodes, edges }) => {
  const nodeTypes = useMemo(() => ({ custom: N8nNode }), []);
  const { fitView } = useReactFlow();
  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [nodes, fitView]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-[#0a0a0a] relative overflow-hidden pointer-events-none", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" }),
    /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx(Background, { color: "#333", gap: 20, size: 1, className: "opacity-20" })
      }
    )
  ] });
};
function SocialShareDialog({ isOpen, onClose, workflow, nodes = [], edges = [] }) {
  const [copied, setCopied] = useState(false);
  if (!workflow) return null;
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md bg-[#0a0a0f] border-white/10 text-white sm:max-w-xl", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs(DialogTitle, { className: "text-xl font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5 text-purple-400" }),
      "Share Workflow"
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-white/10 bg-white/5 overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "h-48 relative w-full bg-[#050505]", children: [
          nodes.length > 0 ? /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(WorkflowPreview, { nodes, edges }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-slate-400 text-sm", children: workflow.og_image ? /* @__PURE__ */ jsx("img", { src: workflow.og_image, alt: workflow.title, className: "w-full h-full object-cover opacity-50" }) : "No preview available" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[#0a0a0f] border-t border-white/5 relative z-10", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-gray-200 mb-1 line-clamp-1", children: workflow.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 line-clamp-2", children: workflow.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-500" }),
            "EdgeLancer Automation"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-4 gap-3", children: socialPlatforms.map((platform) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: platform.action ? platform.action : () => platform.url && window.open(platform.url, "_blank"),
          title: `Share on ${platform.name}`,
          className: `flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:scale-105 active:scale-95 group ${platform.color}`,
          children: [
            /* @__PURE__ */ jsx(platform.icon, { className: "w-5 h-5 transition-colors" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-gray-400 group-hover:text-current", children: platform.name })
          ]
        },
        platform.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-gray-400" }) }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: shareUrl,
            readOnly: true,
            className: "pl-10 pr-24 bg-white/5 border-white/10 text-gray-300 h-11 focus:ring-purple-500/20 focus:border-purple-500/50"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            onClick: handleCopy,
            className: `absolute right-1 top-1 h-9 px-4 transition-all ${copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-white/10 text-white hover:bg-white/20"}`,
            children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Copied"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Copy"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
const WorkflowReviewsSection = ({ workflowSlug, reviews = [], totalReviews = 0, averageRating = 0 }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
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
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 md:mt-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(Star, { className: "w-6 h-6 text-amber-500 fill-amber-500" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white", children: "Reviews & Ratings" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: reviews.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-slate-400 italic", children: "No reviews yet. Be the first to share your experience!" }) : reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:bg-[#111] transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "font-semibold text-white flex items-center gap-2", children: [
                review.name || "Anonymous",
                review.is_verified && /* @__PURE__ */ jsxs("span", { className: "text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
                  " Verified"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: new Date(review.created_at).toLocaleDateString() })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsx(Star, { className: `w-4 h-4 ${s <= review.rating ? "text-amber-500 fill-amber-500" : "text-slate-700"}` }, s)) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-sm leading-relaxed", children: review.comment })
      ] }, review.id)) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#111] border border-white/10 rounded-2xl p-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-purple-400" }),
          "Write a Review"
        ] }),
        submitted ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-green-500" }) }),
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold mb-1", children: "Review Submitted!" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: "Thank you for your feedback." }),
          /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => setSubmitted(false), className: "mt-2 text-purple-400", children: "Write another" })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
                "Name ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
                "Email ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: [
              "Rating ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onMouseEnter: () => setHoverRating(s),
                onMouseLeave: () => setHoverRating(0),
                onClick: () => setRating(s),
                className: "focus:outline-none transition-transform hover:scale-110",
                children: /* @__PURE__ */ jsx(
                  Star,
                  {
                    className: `w-6 h-6 transition-colors ${s <= (hoverRating || rating) ? "text-amber-500 fill-amber-500" : "text-slate-700"}`
                  }
                )
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-slate-400 mb-1", children: "Comment" }),
            /* @__PURE__ */ jsx(
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
          error && /* @__PURE__ */ jsx("p", { className: "text-red-400 text-xs", children: error }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "submit",
              disabled: isSubmitting,
              className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium",
              children: [
                isSubmitting ? "Submitting..." : "Post Review",
                /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 ml-2" })
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
  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [nodes, fitView]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-[#050505] relative group overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" }),
    /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx(Background, { color: "#333", gap: 20, size: 1, className: "opacity-20" }),
          /* @__PURE__ */ jsx(
            Controls,
            {
              className: "!bg-[#111] !border !border-white/10 !rounded-xl !p-1 !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-none [&>button]:!text-slate-300 hover:[&>button]:!text-white [&>button_svg]:!fill-current !bottom-4 !left-4 md:!bottom-8 md:!left-4",
              showInteractive: false
            }
          ),
          /* @__PURE__ */ jsx(
            MiniMap,
            {
              nodeColor: () => "#333",
              maskColor: "rgba(0,0,0, 0.6)",
              className: "!bg-[#111] !border !border-white/10 !rounded-xl !overflow-hidden !shadow-2xl !bottom-8 !right-8 hidden lg:block"
            }
          ),
          /* @__PURE__ */ jsx(Panel, { position: "top-right", className: "flex gap-2 p-2 sm:p-4", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: fullScreenToggle,
              className: "flex items-center gap-2 px-3 py-2 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-white/30 transition-all shadow-xl hover:shadow-purple-500/20 group",
              children: [
                isFullscreen ? /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Maximize2, { className: "w-4 h-4 group-hover:scale-110 transition-transform" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-medium hidden sm:inline", children: isFullscreen ? "Exit Focus" : "Focus Mode" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
};
function WorkflowDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const ssrData = useSSRContext();
  const [workflow, setWorkflow] = useState(ssrData.workflow || null);
  const [seo, setSeo] = useState(ssrData.seo);
  const [loading, setLoading] = useState(!ssrData.workflow);
  const [error, setError] = useState(null);
  const [n8nJson, setN8nJson] = useState(ssrData.workflow?.json_data ? typeof ssrData.workflow.json_data === "string" ? JSON.parse(ssrData.workflow.json_data) : ssrData.workflow.json_data : null);
  const [activeTab, setActiveTab] = useState("visual");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [relatedWorkflows, setRelatedWorkflows] = useState(ssrData.relatedWorkflows || []);
  const [relevantBlogs, setRelevantBlogs] = useState(ssrData.relevantBlogs || []);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const nodeTypes = useMemo(() => ({ custom: N8nNode }), []);
  useEffect(() => {
    if (n8nJson) {
      processN8nData(n8nJson);
    }
  }, []);
  useEffect(() => {
    if (slug) {
      loadAllData();
    }
  }, [slug]);
  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadWorkflowDetails(),
        loadRelatedWorkflows(),
        loadRelevantBlogs()
      ]);
    } catch (e) {
      console.error(e);
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
  const loadWorkflowDetails = async () => {
    try {
      setError(null);
      const response = await workflowService.getWorkflowBySlug(slug);
      const payload = response?.data || {};
      const wfData = payload?.current_workflow || payload?.workflow || payload;
      if (wfData?.id) {
        setWorkflow(wfData);
        setSeo(response?.seo || payload?.seo || null);
        let finalJson = null;
        if (wfData.json_data) {
          finalJson = typeof wfData.json_data === "string" ? JSON.parse(wfData.json_data) : wfData.json_data;
        }
        if (finalJson) {
          setN8nJson(finalJson);
          processN8nData(finalJson);
        }
      } else {
        setError("Workflow not found");
      }
    } catch (err) {
      setError("Failed to load workflow");
    }
  };
  const loadRelatedWorkflows = async () => {
    try {
      const res = await workflowService.getRelatedWorkflows(slug);
      if (res?.data) setRelatedWorkflows(res.data);
    } catch (e) {
    }
  };
  const loadRelevantBlogs = async () => {
    try {
      const res = await workflowService.getRelatedBlogs(slug);
      if (res?.success) setRelevantBlogs(res.data);
    } catch (e) {
    }
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
  if (loading) return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#020202] flex flex-col items-center justify-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border-4 border-slate-800 border-t-purple-500 animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium animate-pulse", children: "Loading Workspace..." })
  ] });
  if (error || !workflow) return /* @__PURE__ */ jsx("div", { className: "text-white text-center p-20", children: error || "Not found" });
  const CategoryIcon = LucideIconMap[workflow.category?.icon] || Users;
  const features = Array.isArray(workflow.workflow_features) ? workflow.workflow_features : typeof workflow.workflow_features === "string" ? JSON.parse(workflow.workflow_features) : [];
  const structuredData = [
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": workflow.title,
      "description": workflow.description,
      "image": workflow.og_image || workflow.category?.image_url,
      "brand": {
        "@type": "Brand",
        "name": "EdgeLancer"
      },
      "aggregateRating": workflow.rating ? {
        "@type": "AggregateRating",
        "ratingValue": workflow.rating,
        "reviewCount": workflow.reviews_count || 15
      } : void 0
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${typeof window !== "undefined" ? window.location.origin : "https://edgelancer.com"}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Workflows",
          "item": `${typeof window !== "undefined" ? window.location.origin : "https://edgelancer.com"}/workflows`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": workflow.title,
          "item": `${typeof window !== "undefined" ? window.location.origin : "https://edgelancer.com"}/workflow/${workflow.slug}`
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col transition-all duration-300 ${isFullscreen ? "h-screen overflow-hidden" : ""}`, children: [
    /* @__PURE__ */ jsx(
      SEOHelmet,
      {
        title: seo?.title || workflow.meta_title || workflow.title,
        description: seo?.description || workflow.meta_description || workflow.description,
        ogImage: (workflow.og_image || workflow.category?.image_url) ?? void 0,
        ogType: "product",
        structuredData
      }
    ),
    !isFullscreen && /* @__PURE__ */ jsx(PublicNavbar, {}),
    /* @__PURE__ */ jsxs("div", { className: `flex-1 relative z-10 mx-auto w-full transition-all duration-500 ${isFullscreen ? "h-full p-0" : "max-w-7xl px-4 md:px-6 py-4 md:py-8 pt-20 lg:pt-24"}`, children: [
      !isFullscreen && /* @__PURE__ */ jsxs("div", { className: "mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }) }),
              "Back to Library"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-start justify-between gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]", children: /* @__PURE__ */ jsx(CategoryIcon, { className: "w-8 h-8 text-purple-400" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white tracking-tight mb-2", children: workflow.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium", children: workflow.category?.title }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
                    "Verified for n8n v1.x+"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-slate-600", children: "•" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-slate-400 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-blue-500" }),
                    "Updated ",
                    workflow.updated_at ? formatDistanceToNow(new Date(workflow.updated_at), { addSuffix: true }) : "recently"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg leading-relaxed max-w-3xl border-l-2 border-purple-500/30 pl-4", children: workflow.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsShareOpen(true),
                className: "h-12 px-6 rounded-xl border border-white/10 bg-[#111] hover:bg-[#1a1a1a] text-slate-300 font-medium transition-all flex items-center gap-2 group",
                children: [
                  /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 group-hover:text-white" }),
                  "Share"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleDownload,
                className: "h-12 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                  "Download JSON"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 ${isFullscreen ? "h-full" : "lg:grid-cols-3 gap-8"} h-full min-h-[600px] pb-12`, children: [
        /* @__PURE__ */ jsxs("div", { className: `lg:col-span-2 flex flex-col ${isFullscreen ? "h-full" : ""}`, children: [
          !isFullscreen && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-white/5 w-fit mb-4", children: [
            { id: "visual", label: "Flow Visualizer", icon: Workflow },
            { id: "config", label: "JSON Config", icon: FileJson },
            { id: "docs", label: "Documentation", icon: MessageSquare },
            { id: "setup", label: "Setup Guide", icon: FileText }
          ].map((tab) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab(tab.id),
              className: `px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${activeTab === tab.id ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-slate-300 hover:bg-white/5"}`,
              children: [
                /* @__PURE__ */ jsx(tab.icon, { className: "w-4 h-4" }),
                tab.label
              ]
            },
            tab.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: `flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl ${isFullscreen ? "fixed inset-0 z-[100] rounded-none border-0" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: `absolute inset-0 transition-opacity duration-300 ${activeTab === "visual" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`, children: [
              typeof window !== "undefined" && activeTab === "visual" && /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(
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
              typeof window === "undefined" && /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-[#050505]", children: /* @__PURE__ */ jsxs("div", { className: "text-slate-500 flex flex-col items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full border-2 border-slate-800 border-t-purple-500 animate-spin" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", children: "Initializing Flow Visualizer..." })
              ] }) })
            ] }),
            activeTab === "config" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col bg-[#0a0a0a]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b border-white/5 bg-[#111]", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-slate-300", children: "Raw JSON Configuration" }),
                /* @__PURE__ */ jsxs("button", { onClick: () => {
                  navigator.clipboard.writeText(JSON.stringify(n8nJson, null, 2));
                  alert("Copied to clipboard");
                }, className: "text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors", children: [
                  /* @__PURE__ */ jsx(Copy, { className: "w-3 h-3" }),
                  " Copy"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto p-4 custom-scrollbar", children: /* @__PURE__ */ jsx("pre", { className: "text-xs font-mono text-emerald-400/90 whitespace-pre-wrap", children: JSON.stringify(n8nJson, null, 2) }) })
            ] }),
            activeTab === "docs" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar", children: [
              /* @__PURE__ */ jsx("style", { children: `
                                        .docs-content { font-size: 1rem; line-height: 1.8; color: #94a3b8; }
                                        .docs-section { margin-bottom: 3rem; }
                                        .docs-section-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; display: flex; items-center; gap: 0.75rem; }
                                        .docs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
                                        .docs-card { padding: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); rounded: 1rem; }
                                    ` }),
              /* @__PURE__ */ jsxs("div", { className: "docs-content max-w-4xl", children: [
                /* @__PURE__ */ jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsx(Workflow, { className: "w-6 h-6 text-purple-500" }),
                    " Overview"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mb-6", children: workflow.description }),
                  /* @__PURE__ */ jsxs("div", { className: "docs-grid", children: [
                    /* @__PURE__ */ jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Nodes" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-white", children: workflow.nodes_count })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Difficulty" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-white capitalize", children: workflow.difficulty })
                    ] }),
                    workflow.rating && /* @__PURE__ */ jsxs("div", { className: "docs-card", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase tracking-wider mb-1", children: "Rating" }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-white", children: [
                        workflow.rating,
                        " / 5.0"
                      ] })
                    ] })
                  ] })
                ] }),
                features.length > 0 && /* @__PURE__ */ jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 text-amber-500" }),
                    " Key Features"
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: features.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5", children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-emerald-500 shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: f })
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "docs-section", children: [
                  /* @__PURE__ */ jsxs("div", { className: "docs-section-title", children: [
                    /* @__PURE__ */ jsx(Bot, { className: "w-6 h-6 text-blue-500" }),
                    " Usage Guide"
                  ] }),
                  /* @__PURE__ */ jsx("ol", { className: "space-y-6 list-none p-0", children: [
                    { step: "Download JSON", desc: "Click the download button above to get the latest workflow configuration." },
                    { step: "Import to n8n", desc: 'Go to your n8n workspace, click "Add Workflow" and select "Import from File".' },
                    { step: "Set Credentials", desc: "Configure necessary API keys and credentials for each integration node." },
                    { step: "Test & Go Live", desc: "Execute the workflow manually to verify logic before turning on the trigger." }
                  ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-purple-400 shrink-0", children: i + 1 }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "text-white font-bold mb-1", children: item.step }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm", children: item.desc })
                    ] })
                  ] }, i)) })
                ] })
              ] })
            ] }),
            activeTab === "setup" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-auto bg-[#050508] p-8 custom-scrollbar", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400", children: /* @__PURE__ */ jsx(Terminal, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Setup n8n Locally" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-lg leading-relaxed", children: "Running n8n on your own machine gives you total privacy, zero limits, and complete control over your automation data." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-[#0a0a0a] border border-white/5", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-yellow-500" }),
                    " Method 1: npm (Fastest)"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-6", children: "Install n8n using your existing Node.js environment." }),
                  /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-black font-mono text-sm text-emerald-400 border border-emerald-500/20", children: "npx n8n" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-[#0a0a0a] border border-white/5", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Box, { className: "w-5 h-5 text-blue-500" }),
                    " Method 2: Docker"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mb-6", children: "Isolated and persistent environment for complex workflows." }),
                  /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-black font-mono text-sm text-blue-400 border border-blue-500/20", children: "docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/10 rounded-2xl p-8", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-6 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }),
                  " Recommended Hardware"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "CPU" }),
                    /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "1 vCPU (2+ Rec)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "RAM" }),
                    /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "1GB (4GB+ Rec)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 uppercase mb-1", children: "Disk" }),
                    /* @__PURE__ */ jsx("div", { className: "text-white font-medium", children: "10GB Standard" })
                  ] })
                ] })
              ] })
            ] }) })
          ] })
        ] }),
        !isFullscreen && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "p-6 bg-[#0a0a0a] border-white/10 hover:border-purple-500/30 transition-all", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Server, { className: "w-5 h-5 text-slate-500" }),
              " Specifications"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4" }),
                  " Nodes"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold font-mono", children: workflow.nodes_count })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4" }),
                  " Complexity"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold capitalize", children: workflow.difficulty })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                  " Efficiency"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: "Scalable" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-slate-500 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
                  " Security"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: "Verified" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-6 bg-[#0a0a0a] border-white/10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mb-4", children: "Premium Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-6 leading-relaxed", children: "Need help customizing this workflow? Our experts are available for hire." }),
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "w-full border-white/10 hover:bg-white/5 text-slate-300", children: /* @__PURE__ */ jsx(Link, { to: "/contact", children: "Chat with Expert" }) })
          ] })
        ] })
      ] }),
      !isFullscreen && /* @__PURE__ */ jsx("div", { className: "mt-20 border-t border-white/5 pt-20", children: /* @__PURE__ */ jsx(WorkflowReviewsSection, { workflowSlug: workflow.slug }) })
    ] }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "workflows" }),
    /* @__PURE__ */ jsx(
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
const iconMap = {
  // Common Categories
  "Layers": Layers,
  "Sparkles": Sparkles,
  "Bot": Bot,
  "Zap": Zap,
  "Briefcase": Briefcase,
  "Business": Briefcase,
  // Alias
  "Marketing": Megaphone,
  "Megaphone": Megaphone,
  "Development": Code2,
  "Code": Code2,
  "Code2": Code2,
  "Design": PenTool,
  "PenTool": PenTool,
  "Analytics": BarChart3,
  "Chart": BarChart3,
  "BarChart3": BarChart3,
  "Email": Mail,
  "Mail": Mail,
  "HR": Users,
  "Users": Users,
  "Productivity": Calendar,
  "Calendar": Calendar,
  "SEO": Search,
  "Search": Search,
  "Social": Share2,
  "Social Media": Share2,
  "Support": MessageSquare,
  "MessageSquare": MessageSquare,
  "Web": Globe,
  "Globe": Globe,
  "Settings": Settings,
  "Security": Shield,
  "Shield": Shield,
  "Content": FileText,
  "FileText": FileText,
  "Finance": DollarSign,
  "Sales": TrendingUp,
  "TrendingUp": TrendingUp,
  "Strategy": Target,
  "Target": Target,
  "AI": Brain,
  "Brain": Brain,
  "Chat": MessageCircle,
  "Media": Video,
  "Video": Video,
  "Image": Image,
  "Audio": Headphones,
  "E-commerce": ShoppingBag,
  "ShoppingBag": ShoppingBag,
  "Payment": CreditCard,
  "CreditCard": CreditCard,
  "Reporting": PieChart,
  "PieChart": PieChart,
  "Health": Activity,
  "Activity": Activity,
  "Education": BookOpen,
  "BookOpen": BookOpen,
  "Real Estate": Home,
  "Home": Home,
  "Infrastructure": Server,
  "Server": Server,
  "Mobile": Smartphone,
  "Smartphone": Smartphone,
  "Review": Star,
  "Star": Star,
  "Maintenance": Wrench,
  // Replaced Tool with Wrench
  "Tool": Wrench,
  // Replaced Tool with Wrench
  "Logistics": Truck,
  "Truck": Truck,
  "Communication": Radio
};
function DynamicIcon({ name, className, fallback = Layers }) {
  let IconComponent = iconMap[name];
  if (!IconComponent) {
    const cleanName = name?.toLowerCase().replace(/\s+/g, "");
    const foundKey = Object.keys(iconMap).find((k) => k.toLowerCase().replace(/\s+/g, "") === cleanName);
    if (foundKey) {
      IconComponent = iconMap[foundKey];
    }
  }
  if (!IconComponent) {
    let sum = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
      }
    }
    IconComponent = fallback;
  }
  return /* @__PURE__ */ jsx(IconComponent, { className: cn("shrink-0", className) });
}
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "intermediate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "advanced":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};
function TemplatesShowcasePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandCategories, setExpandCategories] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [stats, setStats] = useState({ total_workflows: 0, active_users: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWorkflows, setTotalWorkflows] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catsRes, statsRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          workflowService.getWorkflowStats()
        ]);
        if (catsRes.success) setCategories(catsRes.data);
        if (statsRes.success) {
          setStats({
            total_workflows: statsRes.data.total_workflows,
            active_users: statsRes.data.active_users_today
          });
        }
      } catch (error) {
        console.error("Failed to fetch initial library data:", error);
      }
    };
    fetchInitialData();
  }, []);
  const loadTemplates = useCallback(async (currentPage = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const categoryId = activeCategory === "all" ? null : activeCategory;
      const res = await workflowService.getWorkflowLibrary(currentPage, 12, searchQuery, categoryId, "newest");
      if (res.data) {
        setTemplates((prev) => append ? [...prev, ...res.data] : res.data);
        setTotalPages(res.last_page || 1);
        setTotalWorkflows(res.total || 0);
        setHasMore((res.current_page || currentPage) < (res.last_page || 1));
      } else if (!append) {
        setTemplates([]);
        setTotalWorkflows(0);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [activeCategory, searchQuery]);
  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      loadTemplates(1, false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, loadTemplates]);
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || page >= totalPages) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadTemplates(nextPage, true);
  }, [page, totalPages, isLoadingMore, hasMore, loadTemplates]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore && page < totalPages) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "400px" }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, loading, isLoadingMore, page, totalPages]);
  const featuredTemplates = templates.filter((t) => t.rating && parseFloat(t.rating) >= 4.8).slice(0, 3);
  const popularTemplates = [...templates].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { className: "text-white", children: [
    /* @__PURE__ */ jsxs("section", { className: "pt-24 md:pt-32 pb-12 md:pb-16 px-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-10 md:mb-12", children: [
          /* @__PURE__ */ jsxs(Badge, { className: "mb-4 md:mb-6 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white border-white/10 px-4 py-1.5 text-xs md:text-sm", children: [
            /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3 md:w-4 md:h-4 mr-2" }),
            stats.total_workflows,
            "+ Ready-to-Downloads"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500", children: "Automation Templates" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "for Every Workflow" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-8 px-2", children: "Explore ready-to-use n8n automation templates built for digital marketing, social media automation, and lead generation. Automate your workflows instantly with simple one-click setup." }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto relative px-2 sm:px-0", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Search templates...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 text-sm md:text-base"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-2 sm:px-0", children: [
          /* @__PURE__ */ jsxs(Card, { className: "p-4 md:p-6 bg-white/5 border-white/10 text-center", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500", children: [
              stats.total_workflows,
              "+"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 mt-1", children: "Templates" })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-4 md:p-6 bg-white/5 border-white/10 text-center", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500", children: [
              stats.active_users,
              "+"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 mt-1", children: "Active Users" })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-4 md:p-6 bg-white/5 border-white/10 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500", children: "4.8" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 mt-1", children: "Average Rating" })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-4 md:p-6 bg-white/5 border-white/10 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500", children: "2M+" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 mt-1", children: "Automations Run" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-6 md:py-8 px-4 border-b border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider", children: "Categories" }),
        categories.length > 5 && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setExpandCategories(!expandCategories),
            className: "text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-md",
            children: expandCategories ? "Show Less" : "Show All"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex gap-2 md:gap-3 transition-all duration-300 ${expandCategories ? "flex-wrap" : "overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"}`, children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: activeCategory === "all" ? "default" : "outline",
            size: "sm",
            onClick: () => {
              setActiveCategory("all");
              setSearchQuery("");
            },
            className: activeCategory === "all" ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 shrink-0 whitespace-nowrap" : "border-white/10 text-gray-400 hover:text-white hover:border-white/20 shrink-0 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 mr-2" }),
              "All Templates"
            ]
          }
        ),
        categories.map((category) => /* @__PURE__ */ jsxs(
          Button,
          {
            variant: activeCategory === category.id ? "default" : "outline",
            size: "sm",
            onClick: () => {
              setActiveCategory(category.id);
              setSearchQuery("");
            },
            className: activeCategory === category.id ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 shrink-0 whitespace-nowrap" : "border-white/10 text-gray-400 hover:text-white hover:border-white/20 shrink-0 whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(DynamicIcon, { name: category.icon || category.title, className: "w-4 h-4 mr-2" }),
              category.title
            ]
          },
          category.id
        ))
      ] })
    ] }) }),
    activeCategory === "all" && searchQuery === "" && featuredTemplates.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3 mb-6 md:mb-8", children: [
        /* @__PURE__ */ jsx(Star, { className: "w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold", children: "Featured Templates" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: featuredTemplates.map((template) => /* @__PURE__ */ jsxs(
        Card,
        {
          className: "p-5 md:p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group",
          onClick: () => navigate(`/workflow/${template.slug}`),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: `w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center`, children: /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 md:w-7 md:h-7 text-white" }) }),
              /* @__PURE__ */ jsxs(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] md:text-xs", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 mr-1 fill-amber-400" }),
                "Featured"
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base md:text-lg mb-2 group-hover:text-cyan-400 transition-colors", children: template.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 mb-4 line-clamp-2", children: template.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs md:text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-gray-400", children: [
                /* @__PURE__ */ jsx(GitBranch, { className: "w-3 h-3 md:w-4 md:h-4" }),
                template.nodes_count,
                " steps"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-gray-400", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-3 h-3 md:w-4 md:h-4" }),
                (template.views || template.user_count || 0).toLocaleString(),
                " uses"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 md:w-4 md:h-4 fill-amber-400" }),
                template.rating || "4.8"
              ] })
            ] })
          ]
        },
        `featured-${template.id}`
      )) })
    ] }) }),
    activeCategory === "all" && searchQuery === "" && popularTemplates.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-8 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3 mb-6 md:mb-8", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 md:w-6 md:h-6 text-emerald-400" }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold", children: "Most Popular" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: popularTemplates.map((template) => /* @__PURE__ */ jsxs(
        Card,
        {
          className: "p-4 bg-white/5 border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group",
          onClick: () => navigate(`/workflow/${template.slug}`),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0`, children: /* @__PURE__ */ jsx(Bot, { className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium text-sm md:text-base truncate group-hover:text-cyan-400 transition-colors", children: template.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-[11px] md:text-xs text-gray-400", children: [
                  (template.views || template.user_count || 0).toLocaleString(),
                  " uses"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] md:text-xs", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "outline", className: getDifficultyColor(template.difficulty || "beginner"), children: template.difficulty || "beginner" }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-amber-400" }),
                template.rating || "4.5"
              ] })
            ] })
          ]
        },
        `popular-${template.id}`
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 md:mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
          /* @__PURE__ */ jsx(Layers, { className: "w-5 h-5 md:w-6 md:h-6 text-purple-400" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold", children: activeCategory === "all" ? "All Templates" : categories.find((c) => c.id === activeCategory)?.title || "Templates" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs md:text-sm text-gray-400", children: [
          loading && !isLoadingMore ? "..." : totalWorkflows,
          " templates"
        ] })
      ] }),
      loading && !isLoadingMore ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" }),
          /* @__PURE__ */ jsx(Loader2, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mt-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse", children: "Scanning Decades of Data" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] mt-2", children: "Connecting to verified oracle nodes..." })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4", children: templates.map((template) => /* @__PURE__ */ jsxs(
          Card,
          {
            className: "p-4 bg-white/5 border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group h-full flex flex-col",
            onClick: () => navigate(`/workflow/${template.slug}`),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsx(DynamicIcon, { name: template.category?.icon || template.category?.title || "Layers", className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-medium text-sm md:text-base truncate group-hover:text-cyan-400 transition-colors", children: template.title }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[11px] md:text-xs text-gray-400", children: [
                    template.nodes_count || 5,
                    " steps"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-gray-400 line-clamp-2 mb-3 flex-grow", children: template.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] md:text-xs mt-auto pt-3 border-t border-white/5", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "outline", className: getDifficultyColor(template.difficulty || "beginner"), children: template.difficulty || "beginner" }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                  /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-amber-400" }),
                  template.rating || "4.5"
                ] })
              ] })
            ]
          },
          `grid-${template.id}`
        )) }),
        templates.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 md:py-16 px-4 bg-white/5 border border-white/10 rounded-2xl", children: [
          /* @__PURE__ */ jsx(Layers, { className: "w-10 h-10 md:w-12 md:h-12 text-gray-600 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-semibold text-white mb-2", children: "No templates found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base text-gray-400 mb-6", children: "We couldn't find any templates matching your search criteria." }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
            setSearchQuery("");
            setActiveCategory("all");
          }, className: "border-white/10 text-white hover:bg-white/10", children: "Clear Filters" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: observerTarget,
            className: "py-20 flex flex-col items-center justify-center gap-6",
            children: isLoadingMore ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" }),
                /* @__PURE__ */ jsx(Loader2, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse", children: "Scanning Decades of Data" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] mt-2", children: "Connecting to verified oracle nodes..." })
              ] })
            ] }) : !hasMore && templates.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-[2rem] opacity-50" }),
              /* @__PURE__ */ jsx(Star, { className: "w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Deep Index Reached" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed", children: [
                "You have retrieved all ",
                templates.length,
                " templates currently available."
              ] })
            ] }) : null
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-20 px-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center relative z-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6", children: "Ready to Automate Your Workflow?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2", children: "Start using any template with just one click. No coding required. Get started for free and scale as you grow." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 sm:px-0", children: [
          /* @__PURE__ */ jsx(Link, { to: "/contact", title: "Get started for free with our templates", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 h-12 px-6 md:px-8", children: [
            "Get Started Free",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4 md:w-5 md:h-5" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", title: "Request a custom workflow from our team", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", className: "w-full sm:w-auto border-white/20 text-white hover:bg-white/5 h-12 px-6 md:px-8", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "mr-2 w-4 h-4 md:w-5 md:h-5" }),
            "Request Custom Workflow"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: isDetailOpen, onOpenChange: setIsDetailOpen, children: /* @__PURE__ */ jsx(DialogContent, { className: "w-[95vw] max-w-2xl bg-[#0a0a0f] border-white/10 text-white max-h-[90vh] overflow-y-auto p-4 md:p-6 rounded-xl", children: selectedTemplate && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 md:gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0`, children: /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 md:w-7 md:h-7 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg md:text-xl text-white pr-6", children: selectedTemplate.title }),
          /* @__PURE__ */ jsx(DialogDescription, { className: "mt-1 text-xs md:text-sm text-gray-400 line-clamp-3 md:line-clamp-none", children: selectedTemplate.description })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5 md:space-y-6 py-2 md:py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 md:p-3 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold", children: selectedTemplate.nodes_count || 0 }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-xs text-gray-400", children: "Steps" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 md:p-3 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold", children: (selectedTemplate.views || 0).toLocaleString() }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-xs text-gray-400", children: "Uses" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 md:p-3 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-amber-400", children: selectedTemplate.rating || "N/A" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-xs text-gray-400", children: "Rating" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-2 md:p-3 rounded-lg bg-white/5 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `text-[10px] md:text-xs px-2 py-0 ${getDifficultyColor(selectedTemplate.difficulty || "beginner")}`, children: selectedTemplate.difficulty || "beginner" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-xs text-gray-400 mt-1", children: "Difficulty" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-cyan-400" }),
            "Triggers"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: Array.isArray(selectedTemplate.workflow_features) && selectedTemplate.workflow_features.length > 0 ? selectedTemplate.workflow_features.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start md:items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-cyan-400 mt-0.5 md:mt-0 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm", children: typeof feature === "string" ? feature : "Feature" })
          ] }, index)) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs md:text-sm", children: "No specific triggers listed." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "flex-col sm:flex-row gap-2 md:gap-3 mt-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsDetailOpen(false), className: "w-full sm:w-auto border-white/10 text-white hover:bg-white/5 order-3 sm:order-1", children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full sm:w-auto border-white/10 text-white hover:bg-white/5 order-2 sm:order-2", children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
          "Preview"
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/signup", title: "Sign up and start using this template", className: "w-full sm:w-auto order-1 sm:order-3", children: /* @__PURE__ */ jsxs(Button, { className: "w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Use This Template"
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "templates" })
  ] });
}
const Sheet = DialogPrimitive.Root;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
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
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout, hasRole } = useAuth();
  const { sidebarCollapsed, toggleSidebar, getUnreadMessageCount } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  getUnreadMessageCount();
  const navItems2 = [
    { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/workflows", label: "Workflows", icon: Workflow },
    { path: "/app/workflow-templates", label: "Templates Library", icon: GitBranch },
    { path: "/app/blogs", label: "Blog Management", icon: BookOpen, roles: ["admin", "superadmin"] },
    { path: "/app/pages", label: "Page Management", icon: FileText, roles: ["admin", "superadmin"] },
    { path: "/app/faqs", label: "FAQ Management", icon: HelpCircle, roles: ["admin", "superadmin"] },
    { path: "/app/courses", label: "Course Management", icon: BookOpen, roles: ["admin", "superadmin"] },
    { path: "/app/course-reviews", label: "Course Reviews", icon: MessageSquare, roles: ["admin", "superadmin"] },
    { path: "/app/contact-enquiries", label: "Contact Enquiries", icon: Mail, roles: ["admin", "superadmin"] },
    { path: "/app/newsletter-subscribers", label: "Newsletter Subscribers", icon: Users, roles: ["admin", "superadmin"] },
    { path: "/app/support-chat", label: "Support Chat", icon: MessageSquare, roles: ["admin", "superadmin"] }
  ];
  const filteredNavItems = navItems2.filter(
    (item) => !item.roles || hasRole(item.roles)
  );
  const SidebarContent = ({ isMobile = false }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-nexus-border", children: [
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxs(Link, { to: "/app", className: "flex items-center gap-2", title: "EdgeLancer Dashboard Home", onClick: () => isMobile && setMobileOpen(false), children: [
        /* @__PURE__ */ jsx("img", { src: "/favicon.png", alt: "Logo", title: "/", className: "w-8 h-8 object-contain" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexus-blue to-nexus-purple", children: "EdgeLancer" })
      ] }),
      sidebarCollapsed && !isMobile && /* @__PURE__ */ jsx("img", { src: "/favicon.png", alt: "Logo", title: "/", className: "w-8 h-8 object-contain mx-auto" }),
      !isMobile && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleSidebar,
          className: cn(
            "p-1.5 hover:bg-nexus-border rounded-md transition-colors",
            sidebarCollapsed && "absolute right-2"
          ),
          children: sidebarCollapsed ? /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      isMobile && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setMobileOpen(false),
          className: "p-1.5 hover:bg-nexus-border rounded-md transition-colors",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    user?.role === "superadmin" && /* @__PURE__ */ jsx("div", { className: cn("px-3 pt-4", sidebarCollapsed && !isMobile && "px-2"), children: /* @__PURE__ */ jsxs(
      Link,
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
          /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-nexus-purple flex-shrink-0" }),
          (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-nexus-purple", children: "Super Admin" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 py-4 px-3 space-y-1 overflow-y-auto", children: filteredNavItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.path || item.path !== "/app" && pathname.startsWith(item.path);
      return /* @__PURE__ */ jsxs(
        Link,
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
            /* @__PURE__ */ jsx(Icon, { className: cn(
              "w-5 h-5 flex-shrink-0",
              isActive && "text-nexus-blue"
            ) }),
            (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: cn(
                "flex-1 font-medium text-sm",
                isActive ? "text-white" : "text-nexus-muted"
              ), children: item.label }),
              item.badge !== void 0 && item.badge > 0 && /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: cn(
      "p-4 border-t border-nexus-border",
      sidebarCollapsed && !isMobile && "px-2"
    ), children: /* @__PURE__ */ jsxs("div", { className: cn(
      "flex items-center gap-3",
      sidebarCollapsed && !isMobile && "justify-center"
    ), children: [
      /* @__PURE__ */ jsxs(Avatar, { className: "w-10 h-10 ring-2 ring-nexus-border", children: [
        /* @__PURE__ */ jsx(AvatarImage, { src: user?.avatar }),
        /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-nexus-border text-sm", children: user?.name?.charAt(0) || "U" })
      ] }),
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: user?.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-nexus-muted capitalize", children: user?.role })
      ] }),
      (!sidebarCollapsed || isMobile) && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: logout,
          className: "p-2 hover:bg-nexus-border rounded-md transition-colors text-nexus-muted hover:text-white",
          title: "Logout",
          children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" })
        }
      )
    ] }) })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "fixed top-4 left-4 z-50 lg:hidden bg-nexus-card border border-nexus-border",
        onClick: () => setMobileOpen(true),
        children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsx(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: /* @__PURE__ */ jsx(SheetContent, { side: "left", className: "p-0 w-64 bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(SidebarContent, { isMobile: true }) }) }),
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: cn(
          "hidden lg:flex h-screen bg-nexus-card border-r border-nexus-border flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        ),
        children: /* @__PURE__ */ jsx(SidebarContent, {})
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
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const notificationIcons = {
  message: MessageSquare,
  mention: MessageSquare,
  project: FolderKanban,
  meeting: Calendar,
  system: AlertCircle
};
const notificationColors = {
  message: "bg-blue-500",
  mention: "bg-purple-500",
  project: "bg-green-500",
  meeting: "bg-orange-500",
  system: "bg-gray-500"
};
function NotificationItem({ notification, onClose }) {
  const Icon = notificationIcons[notification.type] || AlertCircle;
  const colorClass = notificationColors[notification.type] || "bg-gray-500";
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: notification.link || "#",
      onClick: onClose,
      className: cn(
        "flex items-start gap-3 p-3 hover:bg-nexus-border/50 transition-colors rounded-lg",
        !notification.read && "bg-nexus-blue/5"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", colorClass), children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: cn("text-sm", !notification.read ? "font-medium text-white" : "text-nexus-muted"), children: notification.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-nexus-muted line-clamp-2 mt-0.5", children: notification.description }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-nexus-muted/60 mt-1", children: formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true }) })
        ] }),
        !notification.read && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-nexus-blue flex-shrink-0 mt-2" })
      ]
    }
  );
}
function Header() {
  const { t } = useTranslation();
  const { team } = useAuth();
  const { getUnreadMessageCount } = useAppStore();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchFocused, setSearchFocused] = useState(false);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  getUnreadMessageCount();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
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
        import("./assets/sounds-B1yfOfjZ.js").then(({ playNotificationSound }) => {
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
  return /* @__PURE__ */ jsxs("header", { className: "h-16 border-b border-nexus-border glass-header flex items-center justify-between px-4 md:px-6 fixed lg:relative top-0 left-0 right-0 z-40 bg-nexus-card/95 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-4 flex-1 max-w-md", children: /* @__PURE__ */ jsxs("div", { className: cn(
      "relative flex-1 transition-all duration-200",
      searchFocused && "scale-105"
    ), children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-muted" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: t("common.search"),
          className: "pl-10 bg-nexus-black border-nexus-border focus:border-nexus-blue transition-colors",
          onFocus: () => setSearchFocused(true),
          onBlur: () => setSearchFocused(false)
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-12 lg:hidden" }),
    team && /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-2 px-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-nexus-muted", children: "Team:" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: team.name }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize text-xs", children: team.plan })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-nexus-border/50 border border-nexus-border", children: [
        /* @__PURE__ */ jsx(Bot, { className: cn(
          "w-4 h-4 transition-colors",
          aiAssistantEnabled ? "text-cyan-400" : "text-nexus-muted"
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-nexus-muted hidden md:inline", children: "AI Assistant" }),
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: aiAssistantEnabled,
            onCheckedChange: setAiAssistantEnabled,
            className: "data-[state=checked]:bg-cyan-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleTheme,
          className: "p-2 hover:bg-nexus-border rounded-lg transition-colors",
          title: "Toggle theme",
          children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5 text-nexus-muted hover:text-yellow-400 transition-colors" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5 text-nexus-muted hover:text-blue-400 transition-colors" })
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "p-2 hover:bg-nexus-border rounded-lg transition-colors", children: /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-nexus-muted" }) }),
      /* @__PURE__ */ jsx(Link, { to: "/app/projects", children: /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gradient-primary text-white border-0 gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t("projects.newProject") })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowNotifications(!showNotifications),
            className: cn(
              "p-2 hover:bg-nexus-border rounded-lg transition-colors relative",
              showNotifications && "bg-nexus-border"
            ),
            children: [
              /* @__PURE__ */ jsx(Bell, { className: cn(
                "w-5 h-5 transition-colors",
                showNotifications ? "text-nexus-blue" : "text-nexus-muted"
              ) }),
              unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 gradient-primary rounded-full text-xs flex items-center justify-center text-white font-medium animate-pulse", children: unreadCount > 9 ? "9+" : unreadCount })
            ]
          }
        ),
        showNotifications && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-nexus-card border border-nexus-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-nexus-border", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white", children: "Notifications" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              unreadCount > 0 && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: markAllAsRead,
                  className: "text-xs text-nexus-blue hover:text-nexus-blue/80 transition-colors",
                  children: t("common.markAllRead")
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/app/notifications",
                  onClick: () => setShowNotifications(false),
                  className: "text-xs text-nexus-muted hover:text-white transition-colors",
                  children: t("common.viewAll")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(ScrollArea, { className: "max-h-96", children: notifications.length > 0 ? /* @__PURE__ */ jsx("div", { className: "p-2 space-y-1", children: notifications.slice(0, 10).map((notification) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(
              NotificationItem,
              {
                notification,
                onClose: () => setShowNotifications(false)
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => clearNotification(notification.id, e),
                className: "absolute top-2 right-2 p-1 rounded-full bg-nexus-border/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nexus-border",
                children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3 text-nexus-muted" })
              }
            )
          ] }, notification.id)) }) : /* @__PURE__ */ jsxs("div", { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsx(Bell, { className: "w-12 h-12 text-nexus-muted/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-nexus-muted", children: "No notifications yet" })
          ] }) }),
          notifications.length > 0 && /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-nexus-border bg-nexus-black/50", children: /* @__PURE__ */ jsx(
            Link,
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
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen overflow-hidden bg-nexus-black", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col overflow-hidden w-full lg:w-auto", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto pt-16 lg:pt-0", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const LoginPage = lazy(() => import("./assets/LoginPage-B4F3x2lN.js"));
const SignupPage = lazy(() => import("./assets/SignupPage-CW3H_bkh.js"));
const ContactPage = lazy(() => import("./assets/ContactPage-BtZfo27L.js"));
const SitemapPage = lazy(() => import("./assets/SitemapPage-DpiEeWF6.js"));
const CoursesListPage = lazy(() => import("./assets/CoursesListPage-D_dgr6kF.js"));
const CourseDetailsPage = lazy(() => import("./assets/CourseDetailsPage-CfrCRSag.js"));
const LessonViewerPage = lazy(() => import("./assets/LessonViewerPage-B1w78VfT.js"));
const NotFoundPage = lazy(() => import("./assets/NotFoundPage-DNWBlxwM.js"));
const SecureInterviewClient = lazy(() => import("./assets/SecureInterviewClient-DkQwVjmL.js"));
const AdminDashboard = lazy(() => import("./assets/Dashboard-DmhoB5pu.js"));
const BlogsManagement = lazy(() => import("./assets/BlogManagement-o7tqxcBy.js"));
const PagesManagement = lazy(() => import("./assets/PageManagement-DHAGgfks.js"));
const FAQsManagement = lazy(() => import("./assets/FAQManagement-yICv-cjs.js"));
const CourseManagement = lazy(() => import("./assets/AdminCoursesPage-CGOhROlf.js"));
const CourseReviews = lazy(() => import("./assets/AdminCourseReviewsPage-SUfNLfSB.js"));
const ContactEnquiries = lazy(() => import("./assets/ContactEnquiries-DD2nnu5Z.js"));
const NewsletterSubscribers = lazy(() => import("./assets/NewsletterSubscribers-CZUQ9RtB.js"));
const SupportChatAdmin = lazy(() => import("./assets/SupportChatAdmin-BRQ6dJvB.js"));
const SuperAdminDashboard = lazy(() => import("./assets/SuperAdminDashboard-aS-KDMPl.js"));
function AppRoutes() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/signup", element: /* @__PURE__ */ jsx(SignupPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blogs", element: /* @__PURE__ */ jsx(BlogPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blogs/:slug", element: /* @__PURE__ */ jsx(BlogSlugPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/templates", element: /* @__PURE__ */ jsx(TemplatesShowcasePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/sitemap", element: /* @__PURE__ */ jsx(SitemapPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/workflow/:slug", element: /* @__PURE__ */ jsx(WorkflowDetailsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/workflow", element: /* @__PURE__ */ jsx(Navigate, { to: "/workflows", replace: true }) }),
    /* @__PURE__ */ jsx(Route, { path: "/workflows", element: /* @__PURE__ */ jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/courses", element: /* @__PURE__ */ jsx(CoursesListPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/courses/:slug", element: /* @__PURE__ */ jsx(CourseDetailsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/courses/:courseSlug/:lessonSlug", element: /* @__PURE__ */ jsx(LessonViewerPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/workflow-categories/:slug", element: /* @__PURE__ */ jsx(WorkflowsPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog-categories/:slug", element: /* @__PURE__ */ jsx(BlogPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/interview/:token", element: /* @__PURE__ */ jsx(SecureInterviewClient, {}) }),
    /* @__PURE__ */ jsxs(Route, { path: "/app", element: /* @__PURE__ */ jsx(DashboardLayout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "dashboard", replace: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "dashboard", element: /* @__PURE__ */ jsx(AdminDashboard, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "blogs", element: /* @__PURE__ */ jsx(BlogsManagement, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "pages", element: /* @__PURE__ */ jsx(PagesManagement, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "faqs", element: /* @__PURE__ */ jsx(FAQsManagement, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "courses", element: /* @__PURE__ */ jsx(CourseManagement, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "course-reviews", element: /* @__PURE__ */ jsx(CourseReviews, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "contact-enquiries", element: /* @__PURE__ */ jsx(ContactEnquiries, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "newsletter-subscribers", element: /* @__PURE__ */ jsx(NewsletterSubscribers, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "support-chat", element: /* @__PURE__ */ jsx(SupportChatAdmin, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "/superadmin", element: /* @__PURE__ */ jsx(SuperAdminDashboard, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
  ] });
}
function App() {
  const ssrData = typeof window !== "undefined" ? window.__SSR_DATA__ || {} : globalThis.context || {};
  return /* @__PURE__ */ jsx(SSRContext.Provider, { value: ssrData, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(ConfirmationProvider, { children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingScreen$1, {}), children: [
    /* @__PURE__ */ jsx(AppRoutes, {}),
    /* @__PURE__ */ jsx(SupportChatFloat, {}),
    /* @__PURE__ */ jsx(GlobalLoadingOverlay, {})
  ] }) }) }) }) }) });
}
function render(url, context2 = {}) {
  const helmetContext = {};
  if (typeof globalThis !== "undefined") {
    globalThis.context = context2;
  }
  const html = renderToString(
    /* @__PURE__ */ jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
  const helmet = helmetContext.helmet;
  const bridgeResponse = {
    html,
    head: helmet ? `
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
            ${helmet.noscript.toString()}
        ` : ""
  };
  return JSON.stringify(bridgeResponse);
}
if (typeof context !== "undefined") {
  const response = render(context.url || "/", context);
  dispatch(response);
}
export {
  adminSupportChatService as A,
  Button as B,
  Card as C,
  Dialog as D,
  PAGINATION_CONFIG as E,
  FAQSection as F,
  mockPlatformStats as G,
  mockUsers as H,
  Input as I,
  Avatar as J,
  AvatarImage as K,
  AvatarFallback as L,
  mockTeams as M,
  mockActivities as N,
  PublicFooter as P,
  SEOHelmet as S,
  useToast as a,
  PublicNavbarLayout as b,
  cn as c,
  Badge as d,
  render as default,
  PublicNavbar as e,
  ScrollArea as f,
  adminBlogService as g,
  faqService as h,
  DialogContent as i,
  DialogHeader as j,
  DialogTitle as k,
  DialogDescription as l,
  DialogFooter as m,
  adminBlogCategoryService as n,
  useConfirmation as o,
  CardHeader as p,
  CardDescription as q,
  CardTitle as r,
  CardContent as s,
  Switch as t,
  useAuth as u,
  BaseService as v,
  workflowService as w,
  buildQueryString as x,
  apiRequest as y,
  Skeleton as z
};
