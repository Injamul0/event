import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--primary-foreground))" />
        <path
          d="M10 50 C 30 20, 60 20, 80 50 S 110 80, 130 50"
          stroke="hsl(var(--primary))"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10 65 C 30 35, 60 35, 80 65 S 110 95, 130 65"
          stroke="hsl(var(--primary) / 0.6)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
