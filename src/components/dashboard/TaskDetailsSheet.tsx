'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Building, CheckCircle2 } from "lucide-react";
import { Task } from "@/lib/features/crmSlice";

interface TaskDetailsSheetProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailsSheet({ task, open, onOpenChange }: TaskDetailsSheetProps) {
  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-background">
        <SheetHeader className="px-4 sm:px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={task.status === 'Blocked' ? 'destructive' : task.status === 'Active' ? 'default' : 'secondary'}>
              {task.status}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground border-border">
              {task.priority} Priority
            </Badge>
          </div>
          <SheetTitle className="text-xl leading-tight">{task.title}</SheetTitle>
          <SheetDescription className="text-sm mt-2">
            Assigned to <span className="font-medium text-foreground">{task.assignee}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 sm:px-6 pb-6">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{task.client}</span>
              <span className="text-muted-foreground px-1">•</span>
              <span>{task.project}</span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Due {task.dueDate}
              </div>
            )}
          </div>

          {task.blockedReason && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex gap-2 items-start">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block mb-1">Blocked Reason</span>
                {task.blockedReason}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Description & Notes</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              This task was automatically generated and categorized based on email analysis or manually created by the team. Complete the necessary actions and update the status.
              <br/><br/>
              Ensure all files are logged under {task.project} before marking as Done.
            </p>
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Done
            </Button>
            <Button variant="outline" className="w-full">Edit Details</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
