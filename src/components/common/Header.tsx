
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
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
            <Sprout className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">ClubHub</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            if (link.href === '/admin' && !isAdmin) return null;
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
                     <Sprout className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">ClubHub</span>
                  </Link>
                  {navLinks.map((link) => {
                     if (link.href === '/admin' && !isAdmin) return null;
                    return(
                      <Link key={link.href} href={link.href} className="text-lg">
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-2">
            {isLoggedIn && user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src={user.avatarUrl} alt={user.name} />
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
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
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
