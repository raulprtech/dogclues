import type { Article, Category, City, GuideEdition, Place, Sponsor } from '../types';
import { ARTICLES, CATEGORIES, GUIDE_EDITIONS, PLACES, SPONSORS } from './data';
import { sanityClient } from './sanity';

const FALLBACK_CITIES: City[] = [
  {
    id: 'campeche',
    name: 'San Francisco de Campeche',
    slug: 'campeche',
    regionName: 'Campeche',
    regionSlug: 'campeche',
    municipality: 'Campeche',
    coverageStatus: 'active',
    searchAliases: ['Campeche', 'Ciudad de Campeche'],
    description: 'La edición fundadora de DogClues.',
    priority: 1,
    contentSource: 'demo',
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    slug: 'guadalajara',
    regionName: 'Jalisco',
    regionSlug: 'jalisco',
    areaName: 'Área Metropolitana de Guadalajara',
    coverageStatus: 'planned',
    searchAliases: ['Jalisco', 'GDL', 'Zapopan', 'Tlaquepaque'],
    priority: 2,
    contentSource: 'demo',
  },
  {
    id: 'merida',
    name: 'Mérida',
    slug: 'merida',
    regionName: 'Yucatán',
    regionSlug: 'yucatan',
    coverageStatus: 'planned',
    searchAliases: ['Merida', 'Yucatán'],
    priority: 3,
    contentSource: 'demo',
  },
  {
    id: 'playa-del-carmen',
    name: 'Playa del Carmen',
    slug: 'playa-del-carmen',
    regionName: 'Quintana Roo',
    regionSlug: 'quintana-roo',
    coverageStatus: 'planned',
    searchAliases: ['Playa', 'Riviera Maya'],
    priority: 4,
    contentSource: 'demo',
  },
  {
    id: 'chihuahua',
    name: 'Chihuahua',
    slug: 'chihuahua',
    regionName: 'Chihuahua',
    regionSlug: 'chihuahua',
    municipality: 'Chihuahua',
    coverageStatus: 'planned',
    searchAliases: ['Chihuahua capital'],
    priority: 5,
    contentSource: 'demo',
  },
];

const fallback = {
  cities: FALLBACK_CITIES,
  categories: CATEGORIES.map((item) => ({ ...item, contentSource: 'demo' as const })),
  places: PLACES.map((item) => ({ ...item, cityId: 'campeche', citySlug: 'campeche', cityName: 'San Francisco de Campeche', contentSource: 'demo' as const })),
  articles: ARTICLES.map((item) => ({ ...item, cityId: 'campeche', citySlug: 'campeche', cityName: 'San Francisco de Campeche', contentSource: 'demo' as const })),
  guides: GUIDE_EDITIONS.map((item) => ({ ...item, cityId: 'campeche', citySlug: 'campeche', contentSource: 'demo' as const })),
  sponsors: SPONSORS.map((item) => ({ ...item, contentSource: 'demo' as const })),
};

async function fetchPublished<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Sanity content fetch failed', error);
    return null;
  }
}

const cityFields = `"id": _id, name, "slug": slug.current, "regionName": region->name, "regionSlug": region->slug.current, municipality, areaName, coverageStatus, searchAliases, description, priority, "contentSource": "sanity"`;
const categoryFields = `"id": _id, name, "slug": slug.current, description, "contentSource": "sanity"`;
const placeFields = `"id": _id, name, "slug": slug.current, "categoryId": category->_id, "cityId": city->_id, "citySlug": city->slug.current, "cityName": city->name, zone, description, footprints, averageScore, "imageUrl": image.asset->url, "imageAlt": image.alt, address, "location": {"lat": location.lat, "lng": location.lng}, phone, website, instagram, priceRange, "openingHours": string::split(openingHours, "\\n"), operatingStatus, lastVerifiedAt, "contentSource": "sanity"`;
const articleFields = `"id": _id, title, "slug": slug.current, subtitle, "categoryId": category->_id, "cityId": city->_id, "citySlug": city->slug.current, "cityName": city->name, "author": coalesce(author->displayName, "Equipo DogClues"), publishedAt, readTimeMinutes, "imageUrl": mainImage.asset->url, "imageAlt": mainImage.alt, content[]{..., _type == "image" => {"url": asset->url, alt, credit}}, "relatedPlaces": relatedPlaces[]->_id, courtesyDeclaration, featured, "contentSource": "sanity"`;
const guideFields = `"id": _id, title, "slug": slug.current, subtitle, description, publishedAt, "coverImageUrl": coverImage.asset->url, "coverImageAlt": coverImage.alt, "cityId": city->_id, "citySlug": city->slug.current, "sponsorId": sponsor->_id, "places": places[]->_id, "contentSource": "sanity"`;

export async function getCities(): Promise<City[]> {
  const items = await fetchPublished<City[]>(`*[_type == "city" && coverageStatus != "archived"] | order(priority asc, name asc) {${cityFields}}`);
  return items?.length ? items : fallback.cities;
}

export async function getCategories(): Promise<Category[]> {
  const items = await fetchPublished<Category[]>(`*[_type == "category"] | order(name asc) {${categoryFields}}`);
  return items?.length ? items : fallback.categories;
}

export async function getPlaces(): Promise<Place[]> {
  const items = await fetchPublished<Place[]>(`*[_type == "place"] | order(footprints desc, name asc) {${placeFields}}`);
  return items?.length ? items : fallback.places;
}

export async function getPlace(slug: string): Promise<Place | undefined> {
  const item = await fetchPublished<Place>(`*[_type == "place" && slug.current == $slug][0] {${placeFields}}`, { slug });
  return item || fallback.places.find((entry) => entry.slug === slug);
}

export async function getArticles(): Promise<Article[]> {
  const items = await fetchPublished<Article[]>(`*[_type == "article"] | order(publishedAt desc) {${articleFields}}`);
  return items?.length ? items : fallback.articles;
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const item = await fetchPublished<Article>(`*[_type == "article" && slug.current == $slug][0] {${articleFields}}`, { slug });
  return item || fallback.articles.find((entry) => entry.slug === slug);
}

export async function getGuides(): Promise<GuideEdition[]> {
  const items = await fetchPublished<GuideEdition[]>(`*[_type == "guideEdition"] | order(publishedAt desc) {${guideFields}}`);
  return items?.length ? items : fallback.guides;
}

export async function getGuide(slug: string): Promise<GuideEdition | undefined> {
  const item = await fetchPublished<GuideEdition>(`*[_type == "guideEdition" && slug.current == $slug][0] {${guideFields}}`, { slug });
  return item || fallback.guides.find((entry) => entry.slug === slug);
}

export async function getSponsors(): Promise<Sponsor[]> {
  const items = await fetchPublished<Sponsor[]>(`*[_type == "sponsor"] {"id": _id, name, type, "logoUrl": logo.asset->url, "contentSource": "sanity"}`);
  return items?.length ? items : fallback.sponsors;
}

export async function getHomeContent() {
  const [cities, categories, places, articles] = await Promise.all([getCities(), getCategories(), getPlaces(), getArticles()]);
  return { cities, categories, places, articles };
}
