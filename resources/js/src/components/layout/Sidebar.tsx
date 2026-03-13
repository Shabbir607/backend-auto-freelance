"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Shield,
  Users,
  Workflow,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  roles?: ('superadmin' | 'admin' | 'user')[];
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout, hasRole } = useAuth();
  const { sidebarCollapsed, toggleSidebar, getUnreadMessageCount } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = getUnreadMessageCount();

  const navItems: NavItem[] = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/workflows', label: 'Workflows', icon: Workflow },
    { path: '/app/workflow-templates', label: 'Templates Library', icon: GitBranch },
    { path: '/app/blogs', label: 'Blog Management', icon: BookOpen, roles: ['admin', 'superadmin'] },
    { path: '/app/pages', label: 'Page Management', icon: FileText, roles: ['admin', 'superadmin'] },
    { path: '/app/faqs', label: 'FAQ Management', icon: HelpCircle, roles: ['admin', 'superadmin'] },
    { path: '/app/courses', label: 'Course Management', icon: BookOpen, roles: ['admin', 'superadmin'] },
    { path: '/app/course-reviews', label: 'Course Reviews', icon: MessageSquare, roles: ['admin', 'superadmin'] },
    { path: '/app/contact-enquiries', label: 'Contact Enquiries', icon: Mail, roles: ['admin', 'superadmin'] },
    { path: '/app/newsletter-subscribers', label: 'Newsletter Subscribers', icon: Users, roles: ['admin', 'superadmin'] },
    { path: '/app/support-chat', label: 'Support Chat', icon: MessageSquare, roles: ['admin', 'superadmin'] },
  ];

  const filteredNavItems = navItems.filter(item =>
    !item.roles || hasRole(item.roles)
  );

  // Sidebar content component for reuse
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-nexus-border">
        {(!sidebarCollapsed || isMobile) && (
          <Link to="/app" className="flex items-center gap-2" title="EdgeLancer Dashboard Home" onClick={() => isMobile && setMobileOpen(false)}>
            <img src="/favicon.png" alt="Logo" title="/" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nexus-blue to-nexus-purple">EdgeLancer</span>
          </Link>
        )}
        {sidebarCollapsed && !isMobile && (
          <img src="/favicon.png" alt="Logo" title="/" className="w-8 h-8 object-contain mx-auto" />
        )}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-1.5 hover:bg-nexus-border rounded-md transition-colors",
              sidebarCollapsed && "absolute right-2"
            )}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        )}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 hover:bg-nexus-border rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Super Admin Link */}
      {user?.role === 'superadmin' && (
        <div className={cn("px-3 pt-4", sidebarCollapsed && !isMobile && "px-2")}>
          <Link
            to="/superadmin"
            onClick={() => isMobile && setMobileOpen(false)}
            title="Go to Super Admin Dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
              "bg-gradient-to-r from-nexus-blue/20 to-nexus-purple/20 border border-nexus-purple/30",
              "hover:from-nexus-blue/30 hover:to-nexus-purple/30",
              sidebarCollapsed && !isMobile && "justify-center px-2"
            )}
          >
            <Shield className="w-5 h-5 text-nexus-purple flex-shrink-0" />
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-sm font-medium text-nexus-purple">Super Admin</span>
            )}
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path ||
            (item.path !== '/app' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              title={`Go to ${item.label}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
                "hover:bg-nexus-border",
                isActive && "bg-nexus-border gradient-border",
                sidebarCollapsed && !isMobile && "justify-center"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive && "text-nexus-blue"
              )} />
              {(!sidebarCollapsed || isMobile) && (
                <>
                  <span className={cn(
                    "flex-1 font-medium text-sm",
                    isActive ? "text-white" : "text-nexus-muted"
                  )}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge
                      className="gradient-primary text-white border-0 px-2 py-0 h-5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={cn(
        "p-4 border-t border-nexus-border",
        sidebarCollapsed && !isMobile && "px-2"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          sidebarCollapsed && !isMobile && "justify-center"
        )}>
          <Avatar className="w-10 h-10 ring-2 ring-nexus-border">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-nexus-border text-sm">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-nexus-muted capitalize">{user?.role}</p>
            </div>
          )}
          {(!sidebarCollapsed || isMobile) && (
            <button
              onClick={logout}
              className="p-2 hover:bg-nexus-border rounded-md transition-colors text-nexus-muted hover:text-white"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-nexus-card border border-nexus-border"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Sidebar - Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-nexus-card border-nexus-border">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex h-screen bg-nexus-card border-r border-nexus-border flex-col transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
