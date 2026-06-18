'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

import { CreateVendorModal } from '@/components/modals/CreateVendorModal';

export function VendorsDatabaseView() {
  const { vendors } = useSelector((state: RootState) => state.crm);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Vendors Database</h2>
          <p className="text-muted-foreground mt-1 text-sm">Centralized repository of all service providers.</p>
        </div>
        <CreateVendorModal />
      </div>

      <motion.div variants={item} className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors, specialty, or client..." className="pl-9 bg-background" />
        </div>
        <Button variant="outline">Filter</Button>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Contact / Pricing</TableHead>
                  <TableHead>Rating / Response</TableHead>
                  <TableHead className="w-[300px]">Associations & Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map(vendor => (
                  <TableRow key={vendor.id} className="border-border/50 hover:bg-muted/30">
                    <TableCell className="font-medium align-top pt-4">
                      {vendor.name}
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <Badge variant="secondary" className="font-normal">{vendor.specialty}</Badge>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="text-sm">{vendor.contactDetails}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">{vendor.pricing}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="flex items-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`h-3 w-3 ${star <= vendor.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">Responds: {vendor.responseTime}</div>
                    </TableCell>
                    <TableCell className="align-top pt-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {vendor.associations.map(assoc => (
                          <Badge key={assoc} variant="outline" className="text-[10px] bg-background">
                            {assoc}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 py-1 bg-muted/20">
                        {vendor.notes}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
