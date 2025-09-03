import { notFound } from 'next/navigation';
import Image from 'next/image';
import { events, reviews } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, Star } from 'lucide-react';
import SummarizeReviews from '@/components/events/SummarizeReviews';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

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
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                style={{ objectFit: 'cover' }}
                 data-ai-hint={`${event.category.toLowerCase()} event`}
              />
            </div>
            <Badge variant="secondary" className="mt-4">{event.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">{event.name}</h1>
          </div>
          <div className="prose prose-lg max-w-none text-foreground/90">
            <p>{event.longDescription}</p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold">{formattedDate}</p>
                  <p className="text-sm">{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 text-primary" />
                <p>{event.location}</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 mt-1 text-primary" />
                <p>{event.attendees} of {event.capacity} spots taken</p>
              </div>
            </CardContent>
          </Card>
          <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg">RSVP Now</Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-headline font-bold mb-6">What People Are Saying</h2>
        <SummarizeReviews eventName={event.name} reviews={reviews.map(r => r.comment)} />
        <div className="space-y-6 mt-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6 flex gap-4">
                <Avatar>
                  <AvatarImage src={review.avatarUrl} alt={review.author} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/80">{review.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
