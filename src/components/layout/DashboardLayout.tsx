'use client';

import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col h-screen">
        <MobileNav />
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="p-4 sm:p-8 md:p-12 relative z-10 max-w-7xl mx-auto w-full flex-1 min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
