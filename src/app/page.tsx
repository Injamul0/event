import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import { events } from '@/lib/mock-data';
import EventList from '@/components/events/EventList';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/1920/1080"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-50"
            data-ai-hint="community event"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-4">
            Welcome to ClubHub
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Your central place for discovering, joining, and managing club events.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#events">
              Explore Events <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="events" className="container mx-auto px-4 py-16">
        <EventList events={events} />
      </section>
    </>
  );
}
