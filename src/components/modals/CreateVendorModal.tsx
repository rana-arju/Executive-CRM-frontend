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

export function CreateVendorModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary" />}>
        <PlusCircle className="mr-2 h-4 w-4"/> Add Vendor
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>
            Log a new vendor into the centralized database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Vendor Name</label>
              <Input placeholder="Company or Individual" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Specialty</label>
              <Input placeholder="e.g., Cleaning, Legal" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Details</label>
            <Input placeholder="Email or Phone Number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Typical Pricing</label>
              <Input placeholder="e.g., $150/hr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Select defaultValue="5">
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars - Excellent</SelectItem>
                  <SelectItem value="4">4 Stars - Good</SelectItem>
                  <SelectItem value="3">3 Stars - Average</SelectItem>
                  <SelectItem value="2">2 Stars - Poor</SelectItem>
                  <SelectItem value="1">1 Star - Avoid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Beverly's Notes</label>
            <Input placeholder="Operational notes for team..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save Vendor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
