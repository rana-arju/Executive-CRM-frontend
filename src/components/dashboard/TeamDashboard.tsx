'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { updateTaskStatus } from '@/lib/features/crmSlice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckSquare, Clock, AlertCircle, Send, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CreateDraftModal } from '@/components/modals/CreateDraftModal';
import { useState } from 'react';
import { Task } from '@/lib/features/crmSlice';
import { TaskDetailsSheet } from './TaskDetailsSheet';

export function TeamDashboard() {
  const dispatch = useDispatch();
  const { tasks, userRole } = useSelector((state: RootState) => state.crm);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const myTasks = tasks.filter(t => t.assignee === userRole);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Task Queue</h2>
        <p className="text-muted-foreground mt-1 text-sm">You are viewing as {userRole}.</p>
      </div>

      <div className="grid gap-4">
        {myTasks.length === 0 ? (
          <div className="text-center p-12 bg-muted/30 rounded-xl border border-dashed border-border">
            <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium text-muted-foreground">All caught up!</h3>
            <p className="text-sm text-muted-foreground mt-1">You have no pending tasks right now.</p>
          </div>
        ) : (
          myTasks.map((task, idx) => (
            <motion.div key={task.id} variants={item}>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative cursor-pointer" onClick={() => setSelectedTask(task)}>
                <div className={`absolute top-0 left-0 w-1 h-full ${task.priority === 'Urgent' ? 'bg-destructive' : task.priority === 'High' ? 'bg-orange-500' : 'bg-primary'}`} />
                <CardHeader className="pb-3 pt-5 pl-6 flex flex-row items-start justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-base leading-tight">{task.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {task.client} <span className="mx-1 text-muted-foreground/40">•</span> {task.project}
                    </CardDescription>
                  </div>
                  <Badge variant={task.status === 'Blocked' ? 'destructive' : task.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                    {task.status}
                  </Badge>
                </CardHeader>
                <CardContent className="pl-6 pb-5 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    {task.dueDate && (
                      <div className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        <Clock className="mr-1 h-3 w-3" />
                        Due: {task.dueDate}
                      </div>
                    )}
                    {task.priority !== 'Normal' && (
                      <div className={`flex items-center text-xs px-2 py-1 rounded font-medium ${task.priority === 'Urgent' ? 'text-destructive bg-destructive/10' : 'text-orange-500 bg-orange-500/10'}`}>
                        <AlertCircle className="mr-1 h-3 w-3" />
                        {task.priority}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {task.status !== 'Active' && (
                      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={(e) => { e.stopPropagation(); dispatch(updateTaskStatus({ id: task.id, status: 'Active' })); }}>
                        Mark Active
                      </Button>
                    )}
                    {task.status !== 'Blocked' && (
                      <Button size="sm" variant="outline" className="h-8 text-xs text-orange-500 border-orange-500/20 hover:bg-orange-500/10" onClick={(e) => { e.stopPropagation(); dispatch(updateTaskStatus({ id: task.id, status: 'Blocked' })); }}>
                        Block
                      </Button>
                    )}
                    {task.status !== 'Done' && (
                      <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white" onClick={(e) => { e.stopPropagation(); dispatch(updateTaskStatus({ id: task.id, status: 'Done' })); }}>
                        Complete Task
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {userRole === 'Beverly' && (
        <motion.div variants={item} className="mt-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Send className="h-4 w-4"/> Action Required</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateDraftModal />
            </CardContent>
          </Card>
        </motion.div>
      )}
      <TaskDetailsSheet task={selectedTask} open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)} />
    </motion.div>
  );
}
