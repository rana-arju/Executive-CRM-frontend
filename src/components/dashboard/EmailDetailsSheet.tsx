'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, ShieldAlert } from "lucide-react";
import { Email } from "@/lib/features/crmSlice";

interface EmailDetailsSheetProps {
  email: Email | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailDetailsSheet({ email, open, onOpenChange }: EmailDetailsSheetProps) {
  if (!email) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-background">
        <SheetHeader className="px-4 sm:px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={email.tier === 3 ? "destructive" : email.tier === 2 ? "secondary" : "outline"}>
              Tier {email.tier}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground border-border">
              {email.category}
            </Badge>
          </div>
          <SheetTitle className="text-xl leading-tight">{email.subject}</SheetTitle>
          <SheetDescription className="text-sm mt-2">
            From: <span className="font-medium text-foreground">{email.sender}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 sm:px-6 pb-6">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Received</span>
              <span className="font-medium">{email.receivedAt}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Entity / Project</span>
              <span className="font-medium">{email.entityProject || 'Unassigned'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Routed To</span>
              <span className="font-medium">{email.routedTo}</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50 mt-2">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">{email.status}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2"><Mail className="h-4 w-4" /> Message Excerpt</h4>
            <div className="p-4 bg-background border border-border rounded-lg text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 rounded-l-lg"></div>
              {`This is an auto-extracted summary or snippet of the email content. \n\nPlease review the full context in your inbox if necessary before making a final decision on how this should be routed or processed.`}
            </div>
          </div>

          {email.tier === 3 && email.status === 'Awaiting approval' && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                <ShieldAlert className="h-4 w-4" /> Owner Decision Required
              </div>
              <p className="text-xs text-destructive/80">This item hit a Tier 3 boundary condition and requires explicit owner approval.</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="w-full bg-destructive hover:bg-destructive/90 text-white">Approve & Delegate</Button>
                <Button size="sm" variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">Mark Private</Button>
              </div>
            </div>
          )}

          {email.status !== 'Awaiting approval' && (
             <div className="pt-4 border-t border-border/50">
               <Button variant="outline" className="w-full">View Full Thread</Button>
             </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
