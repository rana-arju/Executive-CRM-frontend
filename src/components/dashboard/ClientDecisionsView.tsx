'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateEmailStatus } from '@/lib/features/crmSlice';
import { useState } from 'react';
import { EmailDetailsSheet } from './EmailDetailsSheet';
import { Email } from '@/lib/features/crmSlice';

export function ClientDecisionsView() {
  const dispatch = useDispatch();
  const { emails } = useSelector((state: RootState) => state.crm);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // For Client A, show Tier 3 items that require approval
  const decisionsNeeded = emails.filter(e => e.tier === 3 && e.status === 'Awaiting approval');
  const pastDecisions = emails.filter(e => e.tier === 3 && e.status !== 'Awaiting approval');

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Pending Decisions</h2>
        <p className="text-muted-foreground mt-1 text-sm">Critical items requiring executive authorization.</p>
      </div>

      {decisionsNeeded.length === 0 ? (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium">All Caught Up</h3>
            <p className="text-sm text-muted-foreground">No pending decisions require your attention at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {decisionsNeeded.map(email => (
            <motion.div key={email.id} variants={item}>
              <Card className="border-destructive/30 shadow-sm overflow-hidden group cursor-pointer hover:border-destructive transition-colors" onClick={() => setSelectedEmail(email)}>
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0 shadow-none text-[10px]">Action Required</Badge>
                      <span className="text-xs text-muted-foreground">{email.receivedAt}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-1">{email.subject}</CardTitle>
                    <CardDescription>
                      From: {email.sender} <span className="mx-2">•</span> {email.entityProject || 'Unassigned'}
                    </CardDescription>
                    
                    <div className="mt-4 p-3 bg-muted/40 rounded border border-border text-sm text-muted-foreground line-clamp-2">
                      Please review the attached budget adjustments for Q3. These changes require explicit authorization from the CFO before we can proceed with execution.
                    </div>
                  </div>
                  <div className="bg-muted/10 p-6 border-t md:border-t-0 md:border-l border-border/50 flex flex-row md:flex-col justify-end md:justify-center items-center gap-3 shrink-0 md:w-48">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" onClick={(e) => { e.stopPropagation(); dispatch(updateEmailStatus({id: email.id, status: 'Completed'})) }}>
                      Approve
                    </Button>
                    <Button variant="outline" className="w-full shadow-sm text-destructive border-destructive/20 hover:bg-destructive/5" onClick={(e) => e.stopPropagation()}>
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {pastDecisions.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold tracking-tight mb-4">Recent Decisions</h3>
          <div className="space-y-3">
            {pastDecisions.map(email => (
              <Card key={email.id} className="p-4 flex items-center justify-between border-border/50 bg-muted/10 cursor-pointer hover:bg-muted/20" onClick={() => setSelectedEmail(email)}>
                <div>
                  <div className="font-medium text-sm">{email.subject}</div>
                  <div className="text-xs text-muted-foreground">{email.entityProject} • {email.receivedAt}</div>
                </div>
                <Badge variant="outline" className="text-xs">{email.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      <EmailDetailsSheet email={selectedEmail} open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)} />
    </motion.div>
  );
}
