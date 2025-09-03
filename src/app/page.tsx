import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/mock-data';
import EventList from '@/components/events/EventList';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


export default function Home() {
  return (
    <>
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
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

      <section id="about" className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">About ClubHub</h2>
              <p className="text-lg text-muted-foreground mb-6">
                ClubHub is your central place for discovering, joining, and managing club events. Our mission is to connect communities and foster engagement through shared experiences.
              </p>
              <p className="text-secondary-foreground/90">
                Whether you're looking for a tech conference, a music festival, or a community gathering, ClubHub makes it easy to find events that match your interests. We believe in the power of community and the magic that happens when people come together.
              </p>
            </div>
            <div className="relative w-full h-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/800/600"
                alt="Community gathering"
                width={800}
                height={600}
                style={{ objectFit: 'cover' }}
                data-ai-hint="community gathering"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
           <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-headline text-center">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" rows={6} />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
