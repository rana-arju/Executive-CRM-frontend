'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Briefcase, Command, CheckCircle2, Building, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ClientDashboard() {
  const { entities, tasks } = useSelector((state: RootState) => state.crm);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Executive Overview</h2>
        <p className="text-muted-foreground mt-1 text-sm">Real-time status of all active operations and entities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 min-w-0">
        <motion.div variants={item} className="md:col-span-2 space-y-6 min-w-0">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2"><Building className="h-5 w-5 text-primary"/> Active Entities</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {entities.map(ent => (
                <div key={ent.id} className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-base">{ent.name}</h4>
                    </div>
                    <Badge variant={ent.status === 'Needs Decision' ? 'destructive' : 'default'} className="shadow-sm">
                      {ent.status}
                    </Badge>
                  </div>
                  {ent.brands && (
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Active Brands</div>
                      <div className="flex flex-wrap gap-2">
                        {ent.brands.map(b => (
                          <Badge key={b} variant="secondary" className="font-normal bg-secondary/50 text-secondary-foreground text-[11px]">{b}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Completed This Month</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="font-medium">Executed NDA with Brand 3 Supplier</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Client A Operating Company • June 15</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Finalized Q2 Tax Estimate Review</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Client A Finance Division • June 12</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Approved Marketing Budget for Fitness Launch</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Client A Operating Company (Brand 6) • June 10</div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6 min-w-0">
          <Card className="border-destructive/30 bg-destructive/5 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-destructive flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> Open Decisions</CardTitle>
              <CardDescription>Awaiting your review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-background rounded border border-border text-sm">
                <div className="font-medium mb-1">Q3 Budget Adjustments</div>
                <div className="text-xs text-muted-foreground mb-2">Requires signature from CFO</div>
                <Badge variant="destructive" className="text-[10px]">Action Required</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2"><Command className="h-5 w-5 text-primary"/> Weekly Priorities</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                <li className="text-sm flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <span className="text-foreground/90">Finalize Q2 distribution approvals with CPA team.</span>
                </li>
                <li className="text-sm flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <span className="text-foreground/90">Review candidates for Brand 2 Regional Manager.</span>
                </li>
                <li className="text-sm flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <span className="text-foreground/90">Approve final lease terms for new fitness location.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
