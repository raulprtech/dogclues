import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, PawPrint } from 'lucide-react';
import ContentViewTracker from '../../../components/analytics/ContentViewTracker';
import { getCategories, getPlace, getPlaces } from '../../../lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const places = await getPlaces();
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) return {};
  return {
    title: place.name,
    description: place.description,
    openGraph: { title: place.name, description: place.description, images: [place.imageUrl] },
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [place, categories] = await Promise.all([getPlace(slug), getCategories()]);
  if (!place) notFound();
  const category = categories.find((item) => item.id === place.categoryId);
  const mapQuery = place.location
    ? place.location.lat + ',' + place.location.lng
    : place.name + ' Campeche';

  return (
    <main className="bg-ivory pb-20">
      <ContentViewTracker type="place" slug={place.slug} />
      <div className="w-full h-[52vh] min-h-[420px] relative">
        <img src={place.imageUrl} alt={place.imageAlt || place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-deep-blue/20" />
      </div>
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <article className="bg-white p-8 md:p-12 shadow-sm border border-deep-blue/5 rounded-[24px]">
          <Link href="/guias/seleccion-fundadora" className="inline-flex items-center gap-1 text-sm text-deep-blue/60 hover:text-terracotta mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver a la guía
          </Link>
          <div className="flex justify-between items-start gap-5 mb-6">
            <div className="flex gap-1 text-terracotta">
              {Array.from({ length: place.footprints || 0 }).map((_, index) => <PawPrint key={index} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-deep-blue/60 border border-deep-blue/10 px-3 py-1 rounded-full">{category?.name}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-deep-blue mb-6">{place.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-deep-blue/70 mb-9 border-b border-deep-blue/10 pb-8">
            <MapPin className="w-4 h-4 text-terracotta" />
            <span className="uppercase tracking-wider text-sm">{place.zone}</span>
            {place.address && <span className="text-sm">· {place.address}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold text-deep-blue mb-4">Por qué vale la pena</h2>
              <p className="text-lg leading-relaxed text-deep-blue/80 mb-8">{place.description}</p>
              <div className="bg-soft-green/10 border border-soft-green/20 p-6 rounded-[18px]">
                <strong className="text-deep-blue">Antes de ir</strong>
                <p className="text-sm text-deep-blue/70 mt-2">Última verificación: {place.lastVerifiedAt ? new Intl.DateTimeFormat('es-MX').format(new Date(place.lastVerifiedAt)) : 'consulta directamente con el establecimiento'}.</p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-deep-blue mb-4">Ubicación</h2>
              <div className="w-full aspect-square bg-gray-100 rounded-[18px] overflow-hidden border border-deep-blue/10">
                <iframe title={'Mapa de ' + place.name} width="100%" height="100%" src={'https://maps.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&t=&z=15&ie=UTF8&iwloc=&output=embed'} loading="lazy" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
