import type { MetadataRoute } from 'next';
import { getArticles, getCities, getPlaces } from '../lib/content';
import { cityPath } from '../lib/search';
import { editorialSections } from '../lib/editorial-sections';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://dogclues.com';
  const [cities, places, articles] = await Promise.all([getCities(), getPlaces(), getArticles()]);
  const staticRoutes = ['', '/articulos', '/metodologia', '/patrocinios', '/postula-tu-negocio', '/privacidad', '/acerca'];

  return [
    ...staticRoutes.map((path) => ({ url: base + path, lastModified: new Date() })),
    ...editorialSections.map((section) => ({ url: base + '/secciones/' + section.slug, lastModified: new Date() })),
    ...cities.map((city) => ({ url: base + cityPath(city), lastModified: new Date() })),
    ...places.map((place) => ({ url: base + '/lugares/' + place.slug, lastModified: place.lastVerifiedAt ? new Date(place.lastVerifiedAt) : new Date() })),
    ...articles.map((article) => ({ url: base + '/articulos/' + article.slug, lastModified: new Date(article.publishedAt) })),
  ];
}
