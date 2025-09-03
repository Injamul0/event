
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/mock-data';
import EventList from '@/components/events/EventList';
import { ArrowRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


export default function Home() {
  return (
    <div className="animate-fade-in">
      <section 
        className="relative h-[calc(100vh-56px)] w-full flex items-center justify-center text-center text-white"
      >
        <Image 
          src="https://picsum.photos/1920/1080" 
          alt="Hero background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          data-ai-hint="community event"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 p-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-4 text-shadow-lg" autoFocus>
            Welcome to Campus-Vibe
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 text-shadow">
            Your central place for discovering, joining, and managing club events.
          </p>
           <div className="flex max-w-xl mx-auto mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Find your next event..."
                className="w-full pl-12 h-12 text-base bg-white/90 text-foreground"
              />
            </div>
            <Button size="lg" className="h-12 rounded-l-none">Search</Button>
          </div>
          <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 border-white/80">
            <Link href="#events">
              Or Explore Events <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="events" className="container mx-auto px-4 py-24">
        <EventList events={events} />
      </section>

      <section id="about" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">About Campus-Vibe</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Campus-Vibe is your central place for discovering, joining, and managing club events. Our mission is to connect communities and foster engagement through shared experiences.
              </p>
              <p className="text-foreground/90">
                Whether you're looking for a tech conference, a music festival, or a community gathering, Campus-Vibe makes it easy to find events that match your interests. We believe in the power of community and the magic that happens when people come together.
              </p>
            </div>
             <div className="relative w-full h-auto aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
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

      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
           <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg transition-transform duration-300 hover:scale-105">
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
    </div>
  );
}
