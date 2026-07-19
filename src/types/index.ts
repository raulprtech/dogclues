import type { EditorialSectionSlug } from '../lib/editorial-sections';

export type FootprintRating = 1 | 2 | 3;
export type ContentSource = 'sanity' | 'demo';
export type CoverageStatus = 'active' | 'planned' | 'archived';

export interface Region {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  stateCode?: string;
  contentSource?: ContentSource;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  regionName: string;
  regionSlug: string;
  municipality?: string;
  areaName?: string;
  coverageStatus: CoverageStatus;
  searchAliases?: string[];
  description?: string;
  priority?: number;
  contentSource?: ContentSource;
}

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
  cityId?: string;
  citySlug?: string;
  cityName?: string;
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
  cityId?: string;
  citySlug?: string;
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
  cityId?: string;
  citySlug?: string;
  cityName?: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageAlt?: string;
  content: string | unknown[];
  relatedPlaces?: string[];
  courtesyDeclaration?: string;
  featured?: boolean;
  editorialSection?: EditorialSectionSlug;
  contentSource?: ContentSource;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
}
