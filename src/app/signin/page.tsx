
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const storedAdmin = sessionStorage.getItem('adminCredentials');
      let adminEmail = 'admin@example.com';
      let adminPassword = 'password';

      if (storedAdmin) {
        const adminCreds = JSON.parse(storedAdmin);
        adminEmail = adminCreds.email;
        adminPassword = adminCreds.password;
      }

      if (email === adminEmail && password === adminPassword) {
        sessionStorage.setItem('isAdmin', 'true');
        // Store credentials for the password change feature
        if (!storedAdmin) {
          sessionStorage.setItem('adminCredentials', JSON.stringify({ email: adminEmail, password: adminPassword }));
        }
        const adminUser = {
          name: "Admin User",
          email: adminEmail,
          initials: "AU",
          avatarUrl: "https://i.pravatar.cc/150?img=10",
        };
        sessionStorage.setItem('user', JSON.stringify(adminUser));
        router.push('/admin');
      } else if (email && password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        const defaultUser = {
          name: "Alex Doe",
          email: email,
          initials: "AD",
          avatarUrl: "https://i.pravatar.cc/150?img=12",
        };
        sessionStorage.setItem('user', JSON.stringify(defaultUser));
        toast({
          title: 'Login Successful',
          description: "Welcome back! Redirecting you to the homepage.",
        });
        router.push('/');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
       toast({
        title: 'Login Failed',
        description: 'Could not save session. Please enable storage in your browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account. <br /> Default admin: <strong>admin@example.com</strong> / <strong>password</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
