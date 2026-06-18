'use client';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center justify-between bg-card border-b border-border p-4 sticky top-0 z-50">
      <div className="font-semibold text-primary flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">P</div>
        Paradise CRM
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-background">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar className="border-none w-full h-full" onNavClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
