'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { updateEmailStatus } from '@/lib/features/crmSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Email } from '@/lib/features/crmSlice';
import { EmailDetailsSheet } from './EmailDetailsSheet';

export function InboxLogsView() {
  const dispatch = useDispatch();
  const { emails } = useSelector((state: RootState) => state.crm);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Inbox / Logs</h2>
        <p className="text-muted-foreground mt-1 text-sm">Daily incoming email log with routing history and Tier 3 decisions.</p>
      </div>

      <motion.div variants={item}>
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[180px]">Time</TableHead>
                  <TableHead>Sender & Subject</TableHead>
                  <TableHead>Entity / Project</TableHead>
                  <TableHead>Category (Tier)</TableHead>
                  <TableHead>Routed To</TableHead>
                  <TableHead className="text-right">Action / Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map(email => (
                  <TableRow key={email.id} className="border-border/50 hover:bg-muted/30 group cursor-pointer" onClick={() => setSelectedEmail(email)}>
                    <TableCell className="text-xs text-muted-foreground align-top pt-4">
                      {email.receivedAt}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="font-medium text-sm text-foreground">{email.sender}</div>
                      <div className="text-sm text-muted-foreground mt-1">{email.subject}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <span className="text-xs">{email.entityProject || 'Unassigned'}</span>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="flex flex-col items-start gap-1">
                        <Badge variant={email.tier === 3 ? "destructive" : email.tier === 2 ? "secondary" : "outline"} className="text-[10px]">
                          {email.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground ml-1">Tier {email.tier}</span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <span className="text-sm">{email.routedTo}</span>
                    </TableCell>
                    <TableCell className="text-right align-top pt-4">
                      {email.status === 'Awaiting approval' ? (
                        <div className="flex flex-col items-end gap-2">
                          <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto" onClick={(e) => { e.stopPropagation(); dispatch(updateEmailStatus({id: email.id, status: 'Completed'})); }}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs w-full md:w-auto" onClick={(e) => e.stopPropagation()}>
                            Private
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">{email.status}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      <EmailDetailsSheet email={selectedEmail} open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)} />
    </motion.div>
  );
}
