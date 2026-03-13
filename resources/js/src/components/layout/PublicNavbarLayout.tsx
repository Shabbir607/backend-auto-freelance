import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { PublicFooter } from './PublicFooter';
import { PublicNavbar } from './PublicNavbar';

interface PublicNavbarLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PublicNavbarLayout({ children, className }: PublicNavbarLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-[#0a0a0f]", className)}>
      <PublicNavbar />
      <main id="main-content" className="pt-16 md:pt-20">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
