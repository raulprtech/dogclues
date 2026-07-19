import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, PawPrint, Search } from 'lucide-react';
import RecommendationForm from '../../components/search/RecommendationForm';
import { getArticles, getCategories, getCities, getPlaces } from '../../lib/content';
import { findCityBySearch, normalizeSearchText } from '../../lib/search';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Buscar lugares y ciudades',
  description: 'Busca restaurantes, experiencias y guías de DogClues por destino.',
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ destino?: string | string[]; q?: string | string[] }>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const destination = first(params.destino).trim();
  const query = first(params.q).trim();
  const [cities, places, articles, categories] = await Promise.all([
    getCities(),
    getPlaces(),
    getArticles(),
    getCategories(),
  ]);

  const city = findCityBySearch(cities, destination);
  const activeCity = city?.coverageStatus === 'active' ? city : undefined;
  const normalizedQuery = normalizeSearchText(query);

  const cityPlaces = destination
    ? activeCity ? places.filter((place) => place.cityId === activeCity.id || place.citySlug === activeCity.slug) : []
    : places;
  const cityArticles = destination
    ? activeCity ? articles.filter((article) => article.cityId === activeCity.id || article.citySlug === activeCity.slug) : []
    : articles;

  const matchingPlaces = normalizedQuery
    ? cityPlaces.filter((place) => {
        const category = categories.find((item) => item.id === place.categoryId)?.name || '';
        return normalizeSearchText([place.name, place.description, place.zone, category].join(' ')).includes(normalizedQuery);
      })
    : cityPlaces;
  const matchingArticles = normalizedQuery
    ? cityArticles.filter((article) => normalizeSearchText([article.title, article.subtitle || ''].join(' ')).includes(normalizedQuery))
    : cityArticles;

  const hasSearch = Boolean(destination || query);
  const hasResults = matchingPlaces.length > 0 || matchingArticles.length > 0;
  const needsRecommendation = hasSearch && (destination ? !activeCity || !hasResults : !hasResults);

  return (
    <main className="min-h-screen bg-ivory py-16 lg:py-24">
      <div className="site-shell">
        <header className="mx-auto max-w-4xl text-center">
          <span className="eyebrow"><Search /> Explora DogClues</span>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-deep-blue md:text-7xl">
            {destination ? 'Siguiendo la pista en ' + (city?.name || destination) : '¿A dónde quieres ir?'}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-deep-blue/70">
            {activeCity
              ? 'Estas son las recomendaciones y historias que ya tenemos verificadas para este destino.'
              : destination
                ? 'Todavía no tenemos una edición activa aquí, pero tu pista puede ayudarnos a decidir el próximo destino.'
                : 'Busca una ciudad desde la portada o explora los destinos que estamos preparando.'}
          </p>
        </header>

        {!hasSearch && (
          <section className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Destinos">
            {cities.map((item) => (
              <Link key={item.id} href={'/buscar?destino=' + encodeURIComponent(item.name)} className="group rounded-3xl border border-deep-blue/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <MapPin className="h-6 w-6 text-terracotta" />
                  <span className={'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ' + (item.coverageStatus === 'active' ? 'bg-soft-green/15 text-deep-blue' : 'bg-terracotta/10 text-terracotta')}>
                    {item.coverageStatus === 'active' ? 'Guía activa' : 'Próximamente'}
                  </span>
                </div>
                <h2 className="mt-8 font-serif text-3xl text-deep-blue">{item.name}</h2>
                <p className="mt-1 text-sm text-deep-blue/60">{item.regionName}{item.areaName ? ' · ' + item.areaName : ''}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-terracotta">Seguir la pista <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </section>
        )}

        {hasResults && (
          <div className="mt-16 space-y-16">
            {matchingPlaces.length > 0 && (
              <section>
                <div className="mb-7 flex items-end justify-between gap-5">
                  <div><span className="eyebrow"><PawPrint /> Lugares</span><h2 className="mt-3 font-serif text-4xl text-deep-blue">Buenas pistas para visitar</h2></div>
                  <span className="text-sm text-deep-blue/50">{matchingPlaces.length} resultados</span>
                </div>
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {matchingPlaces.map((place) => (
                    <article key={place.id} className="overflow-hidden rounded-3xl border border-deep-blue/10 bg-white">
                      <Link href={'/lugares/' + place.slug} className="block aspect-[4/3] overflow-hidden">
                        <img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={place.imageUrl} alt={place.imageAlt || place.name} />
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-terracotta">
                          <span>{categories.find((item) => item.id === place.categoryId)?.name}</span>
                          <span>{place.footprints ? place.footprints + ' huellas' : 'Mención'}</span>
                        </div>
                        <h3 className="mt-3 font-serif text-2xl text-deep-blue"><Link href={'/lugares/' + place.slug}>{place.name}</Link></h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-deep-blue/70">{place.description}</p>
                        <span className="mt-5 flex items-center gap-1.5 text-xs text-deep-blue/50"><MapPin className="h-4 w-4" /> {place.zone}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {matchingArticles.length > 0 && (
              <section>
                <div className="mb-7"><span className="eyebrow">Historias</span><h2 className="mt-3 font-serif text-4xl text-deep-blue">Para entender el destino</h2></div>
                <div className="grid gap-6 md:grid-cols-2">
                  {matchingArticles.map((article) => (
                    <article key={article.id} className="grid grid-cols-[130px_1fr] gap-5 rounded-3xl border border-deep-blue/10 bg-white p-4">
                      <Link href={'/articulos/' + article.slug} className="overflow-hidden rounded-2xl"><img className="h-full w-full object-cover" src={article.imageUrl} alt={article.imageAlt || article.title} /></Link>
                      <div className="py-2">
                        <span className="flex items-center gap-1 text-xs text-deep-blue/50"><Clock className="h-3.5 w-3.5" /> {article.readTimeMinutes} min</span>
                        <h3 className="mt-2 font-serif text-xl leading-tight text-deep-blue"><Link href={'/articulos/' + article.slug}>{article.title}</Link></h3>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {needsRecommendation && (
          <section className="mx-auto mt-14 max-w-2xl">
            {city?.coverageStatus === 'planned' && (
              <div className="mb-5 rounded-2xl bg-deep-blue px-6 py-5 text-ivory">
                <strong>{city.name} ya está en nuestro radar.</strong>
                <p className="mt-1 text-sm text-ivory/70">Recomiéndanos una primera pista y ayúdanos a preparar una edición con criterio local.</p>
              </div>
            )}
            <RecommendationForm initialCity={city?.name || destination} />
          </section>
        )}
      </div>
    </main>
  );
}
