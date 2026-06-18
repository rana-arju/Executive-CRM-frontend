'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

export function CreateDraftModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full text-xs shadow-sm bg-background border border-border text-foreground hover:bg-muted" variant="outline" />}>
        <PlusCircle className="mr-2 h-4 w-4 text-primary" /> Create Draft for Madelynn
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Draft Email for Madelynn</DialogTitle>
          <DialogDescription>
            Draft an email response. It will be added to Madelynn's Ready to Send queue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">To:</label>
            <Input placeholder="Recipient Email" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="Email Subject" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea 
              className="w-full min-h-[150px] flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Draft your message here..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Add to Madelynn's Queue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
