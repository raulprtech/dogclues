import type { MetadataRoute } from 'next';
import { ARTICLES, PLACES } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://dogclues.com';
  const staticRoutes = ['', '/guias/seleccion-fundadora', '/articulos', '/metodologia', '/patrocinios'];
  return [
    ...staticRoutes.map((path) => ({ url: base + path, lastModified: new Date() })),
    ...PLACES.map((place) => ({ url: base + '/lugares/' + place.slug, lastModified: new Date() })),
    ...ARTICLES.map((article) => ({ url: base + '/articulos/' + article.slug, lastModified: new Date(article.publishedAt) })),
  ];
}
