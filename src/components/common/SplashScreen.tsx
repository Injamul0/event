
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

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
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500',
        isFading && 'opacity-0'
      )}
    >
      <div className="relative animate-logo-entrance">
        <div className="flex items-center space-x-4">
          <Logo className="h-16 w-16" />
          <span className="text-5xl font-bold font-headline text-primary">Campus-Vibe</span>
        </div>
      </div>
    </div>
  );
}
