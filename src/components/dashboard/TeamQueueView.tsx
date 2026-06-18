'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { useState } from 'react';
import { Task } from '@/lib/features/crmSlice';
import { TaskDetailsSheet } from './TaskDetailsSheet';

export function TeamQueueView() {
  const { tasks } = useSelector((state: RootState) => state.crm);
  const teamMembers = ['Beverly', 'Pat', 'Maureen'];
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Team Queue</h2>
        <p className="text-muted-foreground mt-1 text-sm">Full visibility into team task pipelines.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {teamMembers.map(member => {
          const memberTasks = tasks.filter(t => t.assignee === member);
          return (
            <motion.div key={member} variants={item} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-primary/20 text-primary">{member[0]}</AvatarFallback></Avatar>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{member}</h3>
                  <p className="text-xs text-muted-foreground">{memberTasks.length} assigned tasks</p>
                </div>
              </div>

              <div className="space-y-3">
                {memberTasks.length === 0 ? (
                  <div className="text-center p-6 bg-muted/20 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-muted-foreground">No active tasks.</p>
                  </div>
                ) : (
                  memberTasks.map(task => (
                    <Card key={task.id} className="border-border/50 shadow-sm relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedTask(task)}>
                      <div className={`absolute top-0 left-0 w-1 h-full ${task.priority === 'Urgent' ? 'bg-destructive' : task.priority === 'High' ? 'bg-orange-500' : 'bg-primary/50'}`} />
                      <CardHeader className="p-4 pl-5 pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
                          <Badge variant={task.status === 'Blocked' ? 'destructive' : task.status === 'Active' ? 'default' : task.status === 'Done' ? 'secondary' : 'outline'} className="text-[10px] shrink-0">
                            {task.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs mt-1">
                          {task.client} <span className="mx-1 text-muted-foreground/40">•</span> {task.project}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pl-5 pb-4 pt-0">
                        {task.blockedReason && (
                          <div className="mt-2 text-xs p-2 bg-destructive/10 text-destructive rounded flex items-start gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            <span>{task.blockedReason}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="mt-2 flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" /> Due {task.dueDate}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <TaskDetailsSheet task={selectedTask} open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)} />
    </motion.div>
  );
}
