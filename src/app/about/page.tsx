
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">About ClubHub</h1>
          <p className="text-lg text-muted-foreground mb-6">
            ClubHub is your central place for discovering, joining, and managing club events. Our mission is to connect communities and foster engagement through shared experiences.
          </p>
          <p className="text-foreground/90">
            Whether you're looking for a tech conference, a music festival, or a community gathering, ClubHub makes it easy to find events that match your interests. We believe in the power of community and the magic that happens when people come together.
          </p>
        </div>
        <div className="relative w-full h-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/800/600"
            alt="Community gathering"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="community gathering"
          />
        </div>
      </div>
    </div>
  );
}
