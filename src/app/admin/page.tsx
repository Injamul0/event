
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AnalyticsChart from "@/components/admin/AnalyticsChart"
import { events as initialEvents, users } from "@/lib/mock-data"
import { BarChart, Calendar, Users, Activity, Loader2, KeyRound, Eye, EyeOff, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EMPTY_EVENT: Omit<Event, 'id'> = {
  name: '',
  date: '',
  location: '',
  category: 'Tech',
  description: '',
  longDescription: '',
  imageUrl: 'https://picsum.photos/600/400',
  attendees: 0,
  capacity: 100,
};


export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [adminEmail, setAdminEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>(EMPTY_EVENT);
  
  useEffect(() => {
    try {
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isAdmin === 'true') {
        setIsAuthenticated(true);
        const storedAdmin = sessionStorage.getItem('adminCredentials');
        if(storedAdmin){
          const adminCreds = JSON.parse(storedAdmin);
          setAdminEmail(adminCreds.email);
        }
      } else {
        router.push('/signin');
      }
    } catch (error) {
       router.push('/signin');
    }
  }, [router]);

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storedAdmin = sessionStorage.getItem('adminCredentials');
      if (!storedAdmin) {
        toast({ title: "Error", description: "Could not verify credentials.", variant: "destructive" });
        return;
      }

      const adminCreds = JSON.parse(storedAdmin);
      if(adminCreds.password !== currentPassword) {
        toast({ title: "Error", description: "Current password is incorrect.", variant: "destructive" });
        return;
      }

      if (newPassword && newPassword !== confirmPassword) {
        toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
        return;
      }
      
      const newCreds = {
        email: adminEmail,
        password: newPassword ? newPassword : adminCreds.password
      };
      
      sessionStorage.setItem('adminCredentials', JSON.stringify(newCreds));

      const adminUser = sessionStorage.getItem('user');
      if(adminUser){
        const parsedUser = JSON.parse(adminUser);
        parsedUser.email = adminEmail;
        sessionStorage.setItem('user', JSON.stringify(parsedUser));
      }

      toast({
        title: "Credentials Updated",
        description: "Your login details have been updated for this session.",
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({ title: "Error", description: "An error occurred.", variant: "destructive" });
    }
  };

  const handleCreateNewEvent = () => {
    setCurrentEvent(EMPTY_EVENT);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    toast({ title: "Event Deleted", description: "The event has been removed." });
  };
  
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEvent.id) {
      // Update existing event
      setEvents(prevEvents => prevEvents.map(event => event.id === currentEvent.id ? (currentEvent as Event) : event));
      toast({ title: "Event Updated", description: "The event has been successfully updated." });
    } else {
      // Create new event
      const newEvent: Event = { ...currentEvent, id: (events.length + 1).toString() } as Event;
      setEvents(prevEvents => [...prevEvents, newEvent]);
      toast({ title: "Event Created", description: "The new event has been added." });
    }
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">Authenticating...</p>
      </div>
    );
  }

  const totalEvents = events.length;
  const totalUsers = users.length;
  const totalAttendees = events.reduce((acc, event) => acc + event.attendees, 0);

  const engagementData = events.map(event => ({
    name: event.name.length > 15 ? event.name.substring(0, 12) + '...' : event.name,
    engagement: (event.attendees / event.capacity) * 100,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+10 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttendees}</div>
            <p className="text-xs text-muted-foreground">+201 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.3%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Manage Events</CardTitle>
              <CardDescription>
                Create, edit, or delete events.
              </CardDescription>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreateNewEvent}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleSaveEvent}>
                  <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">{currentEvent.id ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                    <DialogDescription>
                      Fill in the details below. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" value={currentEvent.name} onChange={e => setCurrentEvent({...currentEvent, name: e.target.value})} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">Date</Label>
                      <Input id="date" type="datetime-local" value={currentEvent.date ? new Date(currentEvent.date).toISOString().slice(0,16) : ''} onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">Location</Label>
                      <Input id="location" value={currentEvent.location} onChange={e => setCurrentEvent({...currentEvent, location: e.target.value})} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                       <Select value={currentEvent.category} onValueChange={(value: Event['category']) => setCurrentEvent({...currentEvent, category: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tech">Tech</SelectItem>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Art">Art</SelectItem>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Community">Community</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right mt-2">Description</Label>
                      <Textarea id="description" value={currentEvent.description} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="longDescription" className="text-right mt-2">Long Description</Label>
                      <Textarea id="longDescription" value={currentEvent.longDescription} onChange={e => setCurrentEvent({...currentEvent, longDescription: e.target.value})} className="col-span-3" rows={5} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacity" className="text-right">Capacity</Label>
                      <Input id="capacity" type="number" value={currentEvent.capacity} onChange={e => setCurrentEvent({...currentEvent, capacity: parseInt(e.target.value, 10)})} className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.attendees} / {event.capacity}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Event Engagement</CardTitle>
            <CardDescription>
              Attendance capacity for recent events.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticsChart data={engagementData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Change Admin Credentials</CardTitle>
            <CardDescription>
              Update your administrator email and password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangeCredentials} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input id="current-password" type={showCurrentPassword ? "text" : "password"} placeholder="Required to make changes" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input id="new-password" type={showNewPassword ? "text" : "password"} placeholder="Leave blank to keep same" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Leave blank to keep same" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <KeyRound className="mr-2 h-4 w-4" />
                Update Credentials
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Recent Events</CardTitle>
            <CardDescription>
              A list of the most recently added events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice(0, 5).map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">New Users</CardTitle>
            <CardDescription>
              A list of users who recently joined.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 5).map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
