export type FootprintRating = 1 | 2 | 3;
export type ContentSource = 'sanity' | 'demo';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  contentSource?: ContentSource;
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
  averageScore?: number;
  awards?: string[];
  imageUrl: string;
  imageAlt?: string;
  address?: string;
  location?: { lat: number; lng: number };
  phone?: string;
  website?: string;
  instagram?: string;
  priceRange?: string;
  openingHours?: string[];
  operatingStatus?: string;
  lastVerifiedAt?: string;
  isSponsored?: boolean;
  contentSource?: ContentSource;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  type: 'main' | 'category' | 'launch';
  contentSource?: ContentSource;
}

export interface GuideEdition {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  coverImageUrl: string;
  coverImageAlt?: string;
  sponsorId?: string;
  places: string[];
  contentSource?: ContentSource;
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
  imageAlt?: string;
  content: string | unknown[];
  relatedPlaces?: string[];
  courtesyDeclaration?: string;
  featured?: boolean;
  contentSource?: ContentSource;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
}
