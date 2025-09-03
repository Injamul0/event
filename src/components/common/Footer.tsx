import Link from 'next/link';
import { Sprout, Twitter, Github, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">ClubHub</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Your community event hub.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ClubHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
