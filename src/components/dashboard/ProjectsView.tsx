'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, Building, Settings, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { CreateTaskModal } from '@/components/modals/CreateTaskModal';

export function ProjectsView() {
  const { entities, tasks } = useSelector((state: RootState) => state.crm);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Projects & Entities</h2>
          <p className="text-muted-foreground mt-1 text-sm">Active projects and entities across all clients.</p>
        </div>
        <CreateProjectModal />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {entities.map(ent => {
          // Count active tasks for this entity
          const entityTasks = tasks.filter(t => t.project.includes(ent.name) || (ent.brands && ent.brands.some(b => t.project.includes(b))));
          const activeTasks = entityTasks.filter(t => t.status === 'Active' || t.status === 'Queued');
          
          return (
            <motion.div key={ent.id} variants={item}>
              <Card className="border-border/50 shadow-sm h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building className="h-5 w-5 text-primary" /> {ent.name}
                      </CardTitle>
                      <CardDescription>{ent.client}</CardDescription>
                    </div>
                    <Badge variant={ent.status === 'Needs Decision' ? 'destructive' : 'default'}>
                      {ent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    {ent.brands && ent.brands.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Brands</div>
                        <div className="flex flex-wrap gap-2">
                          {ent.brands.map(b => (
                            <Badge key={b} variant="outline" className="text-[10px]">{b}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">Recent Tasks</div>
                      {entityTasks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No tasks currently attached.</p>
                      ) : (
                        entityTasks.slice(0, 3).map(t => (
                          <div key={t.id} className="flex justify-between items-center text-sm p-2 rounded bg-muted/50">
                            <span className="truncate pr-4">{t.title}</span>
                            {t.status === 'Done' ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> : <Badge variant="secondary" className="text-[10px] shrink-0">{t.status}</Badge>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{activeTasks.length} active tasks</span>
                    <CreateTaskModal />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
}
