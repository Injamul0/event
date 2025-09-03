'use client';

import { useState, useMemo } from 'react';
import type { Event } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventCard } from './EventCard';
import { Search } from 'lucide-react';

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [dateSort, setDateSort] = useState('upcoming');

  const categories = useMemo(() => ['all', ...Array.from(new Set(events.map(e => e.category)))], [events]);

  const filteredAndSortedEvents = useMemo(() => {
    let result = events
      .filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(event => category === 'all' || event.category === category);

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === 'upcoming' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [events, searchTerm, category, dateSort]);

  const showFilters = events.length >= 3;

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">Upcoming Events</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find your next experience. Explore a variety of events from tech talks to music festivals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search events..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {showFilters && (
          <div className="flex gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={dateSort} onValueChange={setDateSort}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {filteredAndSortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No events found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
