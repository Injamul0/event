
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
    }, 1200);

    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1700);

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
        'fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500',
        isFading && 'opacity-0'
      )}
      style={{
        background: 'linear-gradient(135deg, hsl(45, 90%, 90%) 0%, hsl(20, 90%, 90%) 100%)',
      }}
    >
      <div className="relative animate-logo-entrance">
        <div className="flex items-center space-x-4">
          <Sprout className="h-16 w-16 text-primary" />
          <span className="text-5xl font-bold font-headline text-primary-foreground">ClubHub</span>
        </div>
      </div>
    </div>
  );
}
