
'use client';

import { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1700);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 12); // 12ms * 100 = 1200ms = 1.2s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(visibilityTimer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1a1a] transition-opacity duration-500',
        isFading && 'opacity-0'
      )}
      style={{
        background: 'radial-gradient(circle, rgba(40,40,40,1) 0%, rgba(20,20,20,1) 100%)',
      }}
    >
      <div className="relative animate-logo-entrance">
        <div className="flex items-center space-x-4 animate-glimmer">
          <Sprout className="h-16 w-16 text-primary" />
          <span className="text-5xl font-bold font-headline text-white">ClubHub</span>
        </div>
      </div>
      <div className="absolute bottom-16 w-1/4 max-w-xs h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
