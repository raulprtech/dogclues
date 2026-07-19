import type { City } from '../types';

export function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-MX')
    .trim();
}

export function findCityBySearch(cities: City[], value: string) {
  const normalized = normalizeSearchText(value);
  if (!normalized) return undefined;

  return cities.find((city) => {
    const candidates = [city.name, city.slug, city.regionName, city.municipality, city.areaName, ...(city.searchAliases || [])];
    return candidates.some((candidate) => candidate && normalizeSearchText(candidate) === normalized);
  });
}

export function cityPath(city: City) {
  return '/destinos/' + city.regionSlug + '/' + city.slug;
}
