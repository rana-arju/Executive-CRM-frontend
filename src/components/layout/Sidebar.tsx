'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setRole } from '@/lib/features/crmSlice';
import { LayoutDashboard, CheckSquare, Mail, Users, Settings, Briefcase, Command } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  className?: string;
  onNavClick?: () => void;
}

export function Sidebar({ className, onNavClick }: SidebarProps) {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.crm.userRole);
  const pathname = usePathname();
  const router = useRouter();

  const getNavItems = (): {name: string, path: string, icon: any}[] => {
    switch (role) {
      case 'Madelynn':
        return [
          { name: 'Overview', path: '/overview', icon: LayoutDashboard },
          { name: 'Team Queue', path: '/team-queue', icon: Users },
          { name: 'Inbox / Logs', path: '/inbox', icon: Mail },
          { name: 'Projects', path: '/projects', icon: Briefcase },
          { name: 'Vendors', path: '/vendors', icon: Settings },
        ];
      case 'Beverly':
      case 'Pat':
        return [
          { name: 'My Tasks', path: '/my-tasks', icon: CheckSquare },
          { name: 'Completed', path: '/completed', icon: CheckSquare },
        ];
      case 'Client A':
        return [
          { name: 'Executive Dashboard', path: '/executive-dashboard', icon: LayoutDashboard },
          { name: 'Decisions', path: '/decisions', icon: Command },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className={cn("w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col h-full shrink-0", className)}>
      <div className="p-6 pb-2">
        <h1 className="text-xl font-semibold tracking-tight text-primary flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold">
            P
          </div>
          Paradise CRM
        </h1>
      </div>
      
      <div className="px-4 py-4">
        <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block font-medium px-2">View As Role</label>
        <Select value={role} onValueChange={(val: any) => {
          dispatch(setRole(val));
          if (val === 'Madelynn') router.push('/overview');
          else if (val === 'Client A') router.push('/executive-dashboard');
          else router.push('/my-tasks');
        }}>
          <SelectTrigger className="w-full bg-background/50 border-none">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Madelynn">Madelynn (Owner)</SelectItem>
            <SelectItem value="Beverly">Beverly (EA)</SelectItem>
            <SelectItem value="Pat">Pat (Data Entry)</SelectItem>
            <SelectItem value="Client A">Client A (Executive)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="mx-4 w-auto mb-4 bg-border/50" />

      <nav className="flex-1 px-4 space-y-1">
        {getNavItems().map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link key={idx} href={item.path} passHref legacyBehavior>
              <Button 
                variant={isActive ? "secondary" : "ghost"} 
                className={cn("w-full justify-start font-medium", isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "")}
                onClick={() => onNavClick?.()}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto space-y-2">
        <div className="flex justify-between px-2 mb-2">
          <span className="text-xs text-muted-foreground font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <div className="bg-muted rounded-xl p-4 flex items-center gap-3 border border-border/50 shadow-sm">
          <Avatar className="h-9 w-9 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">{role[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{role}</span>
            <span className="text-xs text-muted-foreground">{role === 'Madelynn' ? 'Owner / Admin' : 'Team Member'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
