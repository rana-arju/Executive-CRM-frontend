'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Sidebar } from '@/components/layout/Sidebar';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { TeamDashboard } from '@/components/dashboard/TeamDashboard';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { TeamQueueView } from '@/components/dashboard/TeamQueueView';
import { InboxLogsView } from '@/components/dashboard/InboxLogsView';
import { ProjectsView } from '@/components/dashboard/ProjectsView';
import { VendorsDatabaseView } from '@/components/dashboard/VendorsDatabaseView';
import { ClientDecisionsView } from '@/components/dashboard/ClientDecisionsView';
import { MobileNav } from '@/components/layout/MobileNav';

export default function Home() {
  const role = useSelector((state: RootState) => state.crm.userRole);
  const activeTab = useSelector((state: RootState) => state.crm.activeTab);

  const renderContent = () => {
    // Shared tabs or specific active tabs
    switch (activeTab) {
      case 'Overview':
        return <OwnerDashboard />;
      case 'Team Queue':
        return <TeamQueueView />;
      case 'Inbox / Logs':
        return <InboxLogsView />;
      case 'Projects':
        return <ProjectsView />;
      case 'Vendors':
        return <VendorsDatabaseView />;
      case 'Executive Dashboard':
        return <ClientDashboard />;
      case 'Decisions':
        return <ClientDecisionsView />;
      case 'My Tasks':
      case 'Completed':
        return <TeamDashboard />; // TeamDashboard handles both queued and done tasks via Redux filter natively if we set it up, or just acts as the single view for Team Members
      default:
        // Fallback based on role if activeTab somehow gets out of sync
        if (role === 'Madelynn') return <OwnerDashboard />;
        if (role === 'Client A') return <ClientDashboard />;
        return <TeamDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col h-screen">
        <MobileNav />
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="p-4 sm:p-8 md:p-12 relative z-10 max-w-7xl mx-auto w-full flex-1 min-w-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
