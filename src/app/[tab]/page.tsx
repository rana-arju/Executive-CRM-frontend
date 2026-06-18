'use client';

import { use } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { OwnerDashboard } from '@/components/dashboard/OwnerDashboard';
import { TeamDashboard } from '@/components/dashboard/TeamDashboard';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { TeamQueueView } from '@/components/dashboard/TeamQueueView';
import { InboxLogsView } from '@/components/dashboard/InboxLogsView';
import { ProjectsView } from '@/components/dashboard/ProjectsView';
import { VendorsDatabaseView } from '@/components/dashboard/VendorsDatabaseView';
import { ClientDecisionsView } from '@/components/dashboard/ClientDecisionsView';

export default function TabPage({ params }: { params: Promise<{ tab: string }> }) {
  const resolvedParams = use(params);
  const tab = resolvedParams.tab;
  const role = useSelector((state: RootState) => state.crm.userRole);

  switch (tab) {
    case 'overview':
      return <OwnerDashboard />;
    case 'team-queue':
      return <TeamQueueView />;
    case 'inbox':
      return <InboxLogsView />;
    case 'projects':
      return <ProjectsView />;
    case 'vendors':
      return <VendorsDatabaseView />;
    case 'executive-dashboard':
      return <ClientDashboard />;
    case 'decisions':
      return <ClientDecisionsView />;
    case 'my-tasks':
    case 'completed':
      return <TeamDashboard />;
    default:
      // Fallback based on role if tab is invalid
      if (role === 'Madelynn') return <OwnerDashboard />;
      if (role === 'Client A') return <ClientDashboard />;
      return <TeamDashboard />;
  }
}
