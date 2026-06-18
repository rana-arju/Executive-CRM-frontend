'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserCog, Bell, Bot, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function OwnerSettingsModal() {
  const [open, setOpen] = React.useState(false);

  const Toggle = ({ defaultActive = false }: { defaultActive?: boolean }) => {
    const [active, setActive] = useState(defaultActive);
    return (
      <div 
        className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${active ? 'bg-primary' : 'bg-muted-foreground/30'}`}
        onClick={() => setActive(!active)}
      >
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary shadow-lg shadow-primary/20" />}>
        <UserCog className="mr-2 h-4 w-4"/> Owner Settings
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl">Owner & System Settings</DialogTitle>
          <DialogDescription>
            Manage your AI routing rules, notifications, and integration preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2"><Bot className="h-4 w-4 text-primary" /> AI Routing Logic</h4>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 bg-muted/20">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto-Route Tier 1 & 2</div>
                <div className="text-xs text-muted-foreground">Automatically assign non-critical emails to team members.</div>
              </div>
              <Toggle defaultActive={true} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 bg-muted/20">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto-Draft Responses</div>
                <div className="text-xs text-muted-foreground">AI prepares drafts for standard vendor inquiries.</div>
              </div>
              <Toggle defaultActive={true} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notifications</h4>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 bg-muted/20">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Tier 3 SMS Alerts</div>
                <div className="text-xs text-muted-foreground">Get an SMS for urgent decisions (e.g. C-Suite emails).</div>
              </div>
              <Toggle defaultActive={true} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 bg-muted/20">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Daily Digest</div>
                <div className="text-xs text-muted-foreground">Receive a summary email of completed tasks at 5 PM.</div>
              </div>
              <Toggle defaultActive={false} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Access Control</h4>
            <div className="grid gap-3 rounded-lg border border-border/50 p-4 bg-muted/20">
              <div className="text-sm font-medium">Default Privacy for New Projects</div>
              <Select defaultValue="private">
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private (Owner Only)</SelectItem>
                  <SelectItem value="team">Team Visible</SelectItem>
                  <SelectItem value="client">Client Visible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
