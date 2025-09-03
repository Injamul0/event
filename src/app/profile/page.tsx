
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Edit3, Save, Calendar, Bell, Upload } from "lucide-react";
import { events } from '@/lib/mock-data';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [user, setUser] = useState({
    name: "Alex Doe",
    email: "alex.doe@example.com",
    initials: "AD",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    joined: "December 2023",
    bio: "Passionate about technology, community building, and attending local tech meetups. Always looking to learn something new.",
    notifications: {
      newsletter: true,
      eventReminders: false,
    }
  });

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Could not retrieve user from session storage");
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    try {
      sessionStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Profile Saved",
        description: "Your information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        setUser(currentUser => {
          const updatedUser = { ...currentUser, avatarUrl: newAvatarUrl };
          try {
             sessionStorage.setItem('user', JSON.stringify(updatedUser));
          } catch (error) {
            console.error("Could not save user to session storage");
          }
          return updatedUser;
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const registeredEvents = events.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center p-6">
              <div className="relative w-24 h-24 mx-auto group">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.initials}</AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleAvatarClick}
                >
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Upload profile picture</span>
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/png, image/jpeg"
                />
              </div>
              <CardTitle className="text-2xl font-headline mt-4">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              <p>Member since {user.joined}</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">Personal Information</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                {isEditing ? <Save className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
                <span className="sr-only">{isEditing ? 'Save' : 'Edit'}</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user.name} readOnly={!isEditing} onChange={(e) => setUser({...user, name: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user.email} readOnly={!isEditing} onChange={(e) => setUser({...user, email: e.target.value})} />
              </div>
               <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={user.bio}
                  readOnly={!isEditing}
                  onChange={(e) => setUser({...user, bio: e.target.value})}
                  className="w-full min-h-[100px] p-2 border rounded-md bg-transparent text-sm read-only:text-muted-foreground"
                />
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="newsletter">Subscribe to Newsletter</Label>
                <Switch id="newsletter" checked={user.notifications.newsletter} onCheckedChange={(checked) => setUser(u => ({...u, notifications: {...u.notifications, newsletter: checked}}))} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="eventReminders">Event Reminders</Label>
                <Switch id="eventReminders" checked={user.notifications.eventReminders} onCheckedChange={(checked) => setUser(u => ({...u, notifications: {...u.notifications, eventReminders: checked}}))} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
               <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">My Events</CardTitle>
              </div>
              <CardDescription>Events you have registered for.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {registeredEvents.map((event, index) => (
                  <li key={event.id}>
                    <Link href={`/events/${event.id}`} className="block hover:bg-muted p-3 rounded-md transition-colors">
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                    </Link>
                    {index < registeredEvents.length - 1 && <Separator className="mt-4" />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
