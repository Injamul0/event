'use client';

import { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500); // Start fading 0.5s before disappearing

    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Disappear after 3s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
        isFading && 'opacity-0'
      )}
    >
      <div className="flex items-center space-x-4 animate-pulse-logo">
        <Sprout className="h-16 w-16 text-primary" />
        <span className="text-5xl font-bold font-headline text-primary">ClubHub</span>
      </div>
    </div>
  );
}
