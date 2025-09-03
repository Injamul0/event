
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bell, Calendar, PartyPopper, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuFooter,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

type User = {
  name: string;
  email: string;
  initials: string;
  avatarUrl: string;
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // sessionStorage is a client-side only API
    try {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const admin = sessionStorage.getItem('isAdmin') === 'true';
      setIsLoggedIn(loggedIn || admin);
      setIsAdmin(admin);
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      // sessionStorage is not available
    }
  }, [pathname]); // Re-check on route change

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('user');
    } catch(error) {
       // sessionStorage is not available
    }
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">Campus-Vibe</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  (pathname === link.href || (link.href.startsWith('/#') && pathname === '/')) ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            );
          })}
           {isAdmin && (
             <Link
                href='/admin'
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  (pathname === '/admin') ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                Admin
              </Link>
           )}
        </nav>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center space-x-2">
                     <Logo className="h-6 w-6" />
                    <span className="font-bold font-headline">Campus-Vibe</span>
                  </Link>
                  {navLinks.map((link) => {
                    return(
                      <Link key={link.href} href={link.href} className="text-lg">
                        {link.label}
                      </Link>
                    )
                  })}
                  {isAdmin && (
                    <Link href='/admin' className="text-lg">
                      Admin
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-2">
            {isLoggedIn && user ? (
               <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <div className="flex-grow">
                        <p className="text-sm font-medium">New event: Annual Tech Conference</p>
                        <p className="text-xs text-muted-foreground">5m ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                       <div className="flex-grow">
                        <p className="text-sm">Your RSVP for Summer Music Fest is confirmed.</p>
                         <p className="text-xs text-muted-foreground">1h ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PartyPopper className="mr-2 h-4 w-4 text-yellow-500" />
                       <div className="flex-grow">
                        <p className="text-sm">Community Cleanup Day is this weekend!</p>
                         <p className="text-xs text-muted-foreground">1d ago</p>
                      </div>
                    </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="justify-center text-sm text-primary hover:text-primary" asChild>
                        <Link href="/notifications">View all notifications</Link>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                       <Avatar className="h-8 w-8">
                         {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                         <AvatarFallback>{user.initials}</AvatarFallback>
                       </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                       <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
               </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
