import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Link href={`/events/${event.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2">
        <CardHeader className="p-0 relative">
           <div className="overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={`${event.category.toLowerCase()} event`}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <Badge variant="secondary" className="mb-2">{event.category}</Badge>
          <CardTitle className="text-xl font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
            {event.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-col items-start gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
           <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.attendees} / {event.capacity} attending</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
