export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: 'Tech' | 'Music' | 'Art' | 'Food' | 'Community';
  description: string;
  longDescription: string;
  imageUrl: string;
  attendees: number;
  capacity: number;
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  avatarUrl: string;
}
