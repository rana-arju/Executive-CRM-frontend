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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

export function CreateProjectModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary" />}>
        <PlusCircle className="mr-2 h-4 w-4"/> Add Project
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project / Entity</DialogTitle>
          <DialogDescription>
            Create a new operational entity or sub-brand.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Entity Name</label>
            <Input placeholder="e.g., Client B Operations" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Client</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clientA">Client A</SelectItem>
                <SelectItem value="clientB">Client B</SelectItem>
                <SelectItem value="clientC">Client C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Brands / Sub-projects (comma separated)</label>
            <Input placeholder="e.g., Brand 1, Brand 2" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Create Entity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
