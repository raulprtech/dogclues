export type FootprintRating = 1 | 2 | 3;

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Award {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  zone: string;
  description: string;
  footprints?: FootprintRating;
  awards?: string[]; // IDs of awards
  imageUrl: string;
  address?: string;
  isSponsored?: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  type: 'main' | 'category' | 'launch';
}

export interface GuideEdition {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  coverImageUrl: string;
  sponsorId?: string;
  places: string[]; // IDs of places included
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  categoryId: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl: string;
  content: string; // Markdown or HTML
  relatedPlaces?: string[]; // IDs of places mentioned
  courtesyDeclaration?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
}
