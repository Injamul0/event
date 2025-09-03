
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Edit3, Save, Calendar, Bell } from "lucide-react";
import { events } from '@/lib/mock-data';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // In a real app, this data would come from your authentication context or an API call
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

  const registeredEvents = events.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center p-6">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-3xl">{user.initials}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
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
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
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
