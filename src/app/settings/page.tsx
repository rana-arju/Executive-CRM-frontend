'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, KeyRound, User, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const role = useSelector((state: RootState) => state.crm.userRole);
  const [name, setName] = useState<string>(role);
  const [email, setEmail] = useState<string>(`${role.toLowerCase().replace(' ', '')}@imparadiseclub.com`);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
  
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Manage your profile, preferences, and security.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Section */}
        <motion.div variants={item}>
          <Card className="shadow-sm border-border/50 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="h-24 w-24 border-2 border-border/50 transition-all group-hover:border-primary/50">
                    {imagePreview && <AvatarImage src={imagePreview} className="object-cover" />}
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary font-medium">{name[0] || role[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="text-white h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-medium">Profile Picture</h4>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 h-8 text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload New Image
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium"><Mail className="h-3 w-3"/> Email Address</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 pt-6 mt-auto">
              <Button className="bg-primary shadow-sm w-full sm:w-auto"><Save className="mr-2 h-4 w-4" /> Save Profile</Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Security Section */}
        <motion.div variants={item}>
          <Card className="shadow-sm border-border/50 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" /> Security & Password</CardTitle>
              <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="space-y-2">
              <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
              <Input id="new-password" type="password" />
              <p className="text-[10px] text-muted-foreground">Must be at least 8 characters long.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
              <Input id="confirm-password" type="password" />
            </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 pt-6 mt-auto">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full sm:w-auto"><KeyRound className="mr-2 h-4 w-4" /> Update Password</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
