import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, Compass, MapPin, PawPrint } from 'lucide-react';
import RecommendationForm from '../../../../components/search/RecommendationForm';
import DiscoverySearch from '../../../../components/search/DiscoverySearch';
import { getArticles, getCategories, getCities, getGuides, getPlaces } from '../../../../lib/content';

export const revalidate = 60;

type RouteParams = Promise<{ region: string; city: string }>;

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((city) => ({ region: city.regionSlug, city: city.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const route = await params;
  const cities = await getCities();
  const city = cities.find((item) => item.regionSlug === route.region && item.slug === route.city);
  if (!city) return {};
  return {
    title: 'Guía de ' + city.name,
    description: city.description || 'Restaurantes, experiencias y lugares recomendados en ' + city.name + '.',
  };
}

export default async function CityPage({ params }: { params: RouteParams }) {
  const route = await params;
  const [cities, allPlaces, allArticles, allGuides, categories] = await Promise.all([
    getCities(), getPlaces(), getArticles(), getGuides(), getCategories(),
  ]);
  const city = cities.find((item) => item.regionSlug === route.region && item.slug === route.city);
  if (!city) notFound();

  const places = allPlaces.filter((place) => place.cityId === city.id || place.citySlug === city.slug);
  const articles = allArticles.filter((article) => article.cityId === city.id || article.citySlug === city.slug);
  const guides = allGuides.filter((guide) => guide.cityId === city.id || guide.citySlug === city.slug);
  const isActive = city.coverageStatus === 'active';
  const heroImage = places[0]?.imageUrl;

  return (
    <main className="bg-ivory">
      <section className="relative min-h-[560px] overflow-visible bg-deep-blue text-white">
        {heroImage && <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/55 to-deep-blue/20" />
        <div className="site-shell relative z-10 flex min-h-[560px] flex-col justify-end pb-12 pt-20">
          <span className="eyebrow eyebrow-light"><MapPin /> {city.regionName} · México</span>
          <h1 className="mt-5 max-w-4xl font-serif text-6xl font-semibold leading-none md:text-8xl">{city.name}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">
            {city.description || (isActive ? 'Una guía local para comer, caminar y descubrir con criterio independiente.' : 'Estamos siguiendo las primeras pistas para construir una guía verdaderamente local.')}
          </p>
          <span className="mt-7 w-fit rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur">
            {isActive ? 'Cobertura activa' : 'Próxima edición'}
          </span>
          <div className="city-search-wrap"><DiscoverySearch cities={cities} initialDestination={city.name} /></div>
        </div>
      </section>

      {!isActive ? (
        <section className="site-shell py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Compass /> Construyamos esta guía</span>
            <h2 className="mt-4 font-serif text-4xl text-deep-blue md:text-5xl">¿Cuál es la primera pista que no deberíamos perdernos?</h2>
            <p className="mt-5 text-lg text-deep-blue/70">Cada solicitud suma a la prioridad de {city.name}. Las recomendaciones se investigan antes de convertirse en contenido.</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl"><RecommendationForm initialCity={city.name} /></div>
        </section>
      ) : (
        <>
          <section className="border-b border-deep-blue/10 bg-white py-8">
            <div className="site-shell flex gap-3 overflow-x-auto">
              {categories.map((category) => (
                <Link key={category.id} href={'/buscar?destino=' + encodeURIComponent(city.name) + '&q=' + category.slug} className="whitespace-nowrap rounded-full border border-deep-blue/10 px-5 py-3 text-sm font-semibold hover:border-terracotta hover:text-terracotta">{category.name}</Link>
              ))}
            </div>
          </section>

          <section className="site-shell py-20">
            <div className="section-heading">
              <div><span className="eyebrow"><PawPrint /> Selección local</span><h2>Lugares que dejan huella</h2><p>Visitas y verificaciones editoriales en {city.name}.</p></div>
              {guides[0] && <Link href={'/guias/' + guides[0].slug} className="text-link">Abrir la guía <ArrowRight /></Link>}
            </div>
            {places.length === 0 && (
              <div className="mb-10 rounded-[32px] border border-deep-blue/10 bg-white px-7 py-12 text-center shadow-sm md:px-14">
                <span className="eyebrow"><Compass /> Cobertura activa</span>
                <h3 className="mt-4 font-serif text-4xl text-deep-blue">La selección de lugares de {city.name} está en preparación.</h3>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-deep-blue/70">Ya podemos publicar artículos y fichas verificadas de este destino, sin rellenarlo con recomendaciones de muestra.</p>
                <Link href={"/postula-tu-negocio?ciudad=" + encodeURIComponent(city.name)} className="button button-coral mt-7">Compartir una pista <ArrowRight /></Link>
              </div>
            )}
            <div className="place-grid">
              {places.slice(0, 8).map((place) => (
                <article className="place-card" key={place.id}>
                  <Link className="place-image" href={'/lugares/' + place.slug}><img src={place.imageUrl} alt={place.imageAlt || place.name} /></Link>
                  <div className="place-card-body">
                    <div className="place-meta"><span>{categories.find((item) => item.id === place.categoryId)?.name}</span><span>{place.footprints ? place.footprints + ' huellas' : 'Mención'}</span></div>
                    <h3><Link href={'/lugares/' + place.slug}>{place.name}</Link></h3>
                    <p>{place.description}</p>
                    <span className="place-location"><MapPin /> {place.zone}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {articles.length > 0 && (
            <section className="bg-white py-20">
              <div className="site-shell">
                <div className="section-heading"><div><span className="eyebrow">Cuaderno local</span><h2>Historias para entender {city.name}</h2></div></div>
                <div className="grid gap-6 md:grid-cols-3">
                  {articles.slice(0, 6).map((article) => (
                    <article key={article.id}>
                      <Link href={'/articulos/' + article.slug} className="block aspect-[4/3] overflow-hidden rounded-3xl"><img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={article.imageUrl} alt={article.imageAlt || article.title} /></Link>
                      <span className="mt-5 flex items-center gap-1 text-xs text-deep-blue/50"><Clock className="h-4 w-4" /> {article.readTimeMinutes} min</span>
                      <h3 className="mt-2 font-serif text-2xl text-deep-blue"><Link href={'/articulos/' + article.slug}>{article.title}</Link></h3>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="bg-terracotta py-16 text-white">
        <div className="site-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div><span className="text-xs font-bold uppercase tracking-widest text-white/70">Consideración editorial</span><h2 className="mt-3 font-serif text-4xl">¿Falta tu negocio en {city.name}?</h2><p className="mt-3 max-w-2xl text-white/80">Puedes postularlo gratuitamente. La solicitud no garantiza inclusión y cualquier visita se realiza sin fecha anunciada.</p></div>
          <Link href={'/postula-tu-negocio?ciudad=' + encodeURIComponent(city.name)} className="button city-business-button">Enviar negocio <ArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}
