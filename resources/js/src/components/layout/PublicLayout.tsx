import { ReactNode } from 'react';
import { PublicFooter } from './PublicFooter';
import { PublicNavbar } from './PublicNavbar';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <PublicNavbar />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
