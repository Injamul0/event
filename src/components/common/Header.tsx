'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sprout } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();
  const isAdmin = false; // This would be replaced with actual authentication state

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
            if (link.href === '/admin' && !isAdmin) return null; // In a real app, this would be based on user role
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
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
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
