import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  status: 'Queued' | 'Active' | 'Blocked' | 'Done';
  assignee: 'Beverly' | 'Pat' | 'Maureen' | 'Madelynn';
  client: string;
  project: string;
  priority: 'Normal' | 'High' | 'Urgent';
  dueDate?: string;
  blockedReason?: string;
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  category: string;
  tier: 1 | 2 | 3;
  status: 'Auto-routed' | 'Override window open' | 'Awaiting approval' | 'Completed';
  receivedAt: string;
  entityProject?: string;
  routedTo?: string;
}

export interface ClientEntity {
  id: string;
  name: string;
  status: 'In motion' | 'Blocked' | 'Needs Decision' | 'Stable';
  brands?: string[];
  client: string;
}

export interface Vendor {
  id: string;
  name: string;
  specialty: string;
  contactDetails: string;
  pricing: string;
  responseTime: string;
  rating: number;
  associations: string[];
  notes: string;
}

export type ActiveTab = 'Overview' | 'Team Queue' | 'Inbox / Logs' | 'Projects' | 'Vendors' | 'My Tasks' | 'Completed' | 'Executive Dashboard' | 'Decisions';

interface CrmState {
  tasks: Task[];
  emails: Email[];
  entities: ClientEntity[];
  vendors: Vendor[];
  userRole: 'Madelynn' | 'Beverly' | 'Pat' | 'Client A';
  activeTab: ActiveTab;
}

const initialState: CrmState = {
  userRole: 'Madelynn',
  activeTab: 'Overview',
  tasks: [
    { id: '1', title: 'Draft response to Marina del Rey regarding slip pricing', status: 'Active', assignee: 'Beverly', client: 'Client A', project: 'Brand 8', priority: 'High', dueDate: '2026-06-19' },
    { id: '2', title: 'Update Nines Living asset record for main residence', status: 'Queued', assignee: 'Pat', client: 'Client A', project: 'Client A Operating Company', priority: 'Normal' },
    { id: '3', title: 'Review Q2 preliminary tax estimate', status: 'Active', assignee: 'Madelynn', client: 'Client A', project: 'Client A Finance Division', priority: 'Urgent', dueDate: '2026-06-20' },
    { id: '4', title: 'Research new local vendors for Brand 3 launch', status: 'Blocked', assignee: 'Maureen', client: 'Client C', project: 'Brand 3', priority: 'Normal', blockedReason: 'Waiting on budget confirmation' },
    { id: '5', title: 'Send signed vendor contract for fitness equipment', status: 'Done', assignee: 'Beverly', client: 'Client B', project: 'Operations', priority: 'Normal' },
    { id: '6', title: 'Coordinate franchise meeting schedule', status: 'Queued', assignee: 'Beverly', client: 'Client A', project: 'Client A Operating Company', priority: 'Normal' },
  ],
  emails: [
    { id: 'e1', sender: 'CFO@clientA.com', subject: 'Q3 Budget Adjustments', category: 'Client A Finance Division', tier: 3, status: 'Awaiting approval', receivedAt: '08:30 AM', entityProject: 'Client A / Client A Finance Division', routedTo: 'Owner queue' },
    { id: 'e2', sender: 'vendor@cleaningsvc.com', subject: 'Invoice #4002 - June', category: 'Vendor', tier: 1, status: 'Auto-routed', receivedAt: '09:15 AM', entityProject: 'Client A / Brand 6', routedTo: 'Beverly' },
    { id: 'e3', sender: 'charles.coo@clientA.com', subject: 'Franchise location update', category: 'C-suite', tier: 2, status: 'Override window open', receivedAt: '10:05 AM', entityProject: 'Client A / Client A Operating Company', routedTo: 'Beverly (Hold)' },
    { id: 'e4', sender: 'legal@firm.com', subject: 'Revised Lease Agreement - Brand 2', category: 'Legal', tier: 3, status: 'Awaiting approval', receivedAt: '11:20 AM', entityProject: 'Client A / Brand 2', routedTo: 'Owner queue' },
    { id: 'e5', sender: 'booking@airline.com', subject: 'Flight Confirmation - JFK to LAX', category: 'Travel', tier: 1, status: 'Auto-routed', receivedAt: '01:15 PM', entityProject: 'Client A / Client A', routedTo: 'Beverly' },
  ],
  entities: [
    { id: 'ent1', name: 'Client A Finance Division', status: 'Needs Decision', client: 'Client A' },
    { id: 'ent2', name: 'Client A Operating Company', status: 'In motion', brands: ['Brand 1', 'Brand 2', 'Brand 6 (Fitness)'], client: 'Client A' },
    { id: 'ent3', name: 'Nines Living Asset System', status: 'In motion', client: 'Client C' },
  ],
  vendors: [
    { id: 'v1', name: 'Premier Cleaning Svc', specialty: 'Cleaning', contactDetails: 'vendor@cleaningsvc.com / 555-0102', pricing: '$400/wk', responseTime: 'Same day', rating: 5, associations: ['Brand 6', 'Brand 1'], notes: 'Very reliable, automatically invoices on the 1st.' },
    { id: 'v2', name: 'Marina del Rey Slips', specialty: 'Marine', contactDetails: 'marina@delrey.com', pricing: '$2,400/mo', responseTime: '1-2 days', rating: 4, associations: ['Client A'], notes: 'Prices increasing next year, keep eye on contract terms.' },
    { id: 'v3', name: 'Elite Fitness Equipment', specialty: 'Equipment', contactDetails: 'sales@elitefit.com', pricing: 'Variable', responseTime: '2-3 days', rating: 3, associations: ['Brand 6', 'Client B'], notes: 'Needs chasing for delivery updates.' },
  ]
};

export const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<'Madelynn' | 'Beverly' | 'Pat' | 'Client A'>) => {
      state.userRole = action.payload;
      // reset active tab based on role
      if (action.payload === 'Madelynn') state.activeTab = 'Overview';
      else if (action.payload === 'Client A') state.activeTab = 'Executive Dashboard';
      else state.activeTab = 'My Tasks';
    },
    setActiveTab: (state, action: PayloadAction<ActiveTab>) => {
      state.activeTab = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{id: string, status: Task['status']}>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    updateEmailStatus: (state, action: PayloadAction<{id: string, status: Email['status']}>) => {
      const email = state.emails.find(e => e.id === action.payload.id);
      if (email) email.status = action.payload.status;
    }
  },
});

export const { setRole, setActiveTab, addTask, updateTaskStatus, updateEmailStatus } = crmSlice.actions;
export default crmSlice.reducer;
