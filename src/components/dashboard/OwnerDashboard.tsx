'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock, MailWarning, UserCog, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function OwnerDashboard() {
  const { tasks, emails, entities } = useSelector((state: RootState) => state.crm);

  const pendingTier3 = emails.filter(e => e.tier === 3 && e.status === 'Awaiting approval').length;
  const activeTasks = tasks.filter(t => t.status === 'Active').length;
  const blockedTasks = tasks.filter(t => t.status === 'Blocked').length;
  const draftQueue = 2; // Demo metric

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Madelynn</h2>
          <p className="text-muted-foreground mt-1 text-sm">Here's what requires your attention today.</p>
        </div>
        <Button className="bg-primary shadow-lg shadow-primary/20"><UserCog className="mr-2 h-4 w-4"/> Owner Settings</Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-destructive/10 to-transparent border-destructive/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><MailWarning size={48}/></div>
            <CardHeader className="pb-2">
              <CardDescription className="text-destructive font-medium flex items-center gap-2"><AlertCircle className="h-4 w-4"/> Decisions Needed</CardDescription>
              <CardTitle className="text-4xl">{pendingTier3}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tier 3 emails awaiting approval</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-primary font-medium"><Clock className="h-4 w-4"/> In Motion Today</CardDescription>
              <CardTitle className="text-4xl">{activeTasks}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tasks active across team</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-orange-500 font-medium"><AlertCircle className="h-4 w-4"/> Blocked / At Risk</CardDescription>
              <CardTitle className="text-4xl">{blockedTasks}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Tasks requiring intervention</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 font-medium"><Mail className="h-4 w-4"/> Draft Queue</CardDescription>
              <CardTitle className="text-4xl">{draftQueue}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Drafts ready to send</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-8 min-w-0">
        <motion.div variants={item} className="md:col-span-4 lg:col-span-5 space-y-6 min-w-0">
          
          <Card className="shadow-sm border-border/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Daily Incoming Log (Decisions)</CardTitle>
                <Badge variant="outline" className="text-xs">Tier 3 Hold</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Sender</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.filter(e => e.tier === 3 || e.tier === 2).map(email => (
                    <TableRow key={email.id} className="border-border/50 hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="text-sm">{email.sender}</div>
                        <div className="text-xs text-muted-foreground truncate w-48">{email.subject}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={email.tier === 3 ? "destructive" : "secondary"} className="text-[10px]">
                          {email.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {email.status === 'Awaiting approval' ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="h-7 text-xs">Approve</Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs">Private</Button>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">{email.status}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Tabs defaultValue="team" className="w-full">
            <TabsList className="mb-4 bg-muted/50 border border-border/50 inline-flex w-full md:w-auto h-10 max-w-full overflow-x-auto">
              <TabsTrigger value="team" className="flex-1">Team View</TabsTrigger>
              <TabsTrigger value="projects" className="flex-1">Active Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="team">
              <Card className="shadow-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Team Task Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead>Assignee</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.filter(t => t.assignee !== 'Madelynn').map(task => (
                        <TableRow key={task.id} className="border-border/50 hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px] bg-primary/20 text-primary">{task.assignee[0]}</AvatarFallback></Avatar>
                              <span className="text-sm font-medium">{task.assignee}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{task.title}</div>
                            <div className="text-xs text-muted-foreground">{task.client} - {task.project}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={task.status === 'Blocked' ? 'destructive' : task.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                              {task.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects">
              <Card className="shadow-sm border-border/50">
                <CardContent className="pt-6 text-sm text-muted-foreground">
                  Project view data loads here...
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </motion.div>

        <motion.div variants={item} className="md:col-span-3 space-y-6 min-w-0">
          <Card className="shadow-sm border-border/50 bg-card/40 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="h-4 w-4 text-primary"/> Entity Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {entities.map(ent => (
                <div key={ent.id} className="p-3 rounded-lg border border-border/50 bg-background/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-sm leading-tight">{ent.name}</div>
                    <Badge variant={ent.status === 'Needs Decision' ? 'destructive' : 'default'} className="text-[10px] whitespace-nowrap ml-2">
                      {ent.status}
                    </Badge>
                  </div>
                  {ent.brands && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ent.brands.map(b => (
                        <span key={b} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{b}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
