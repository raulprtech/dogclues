import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SEO } from '../components/SEO';
import { CATEGORIES, PLACES } from '../lib/data';
import { ArrowLeft, MapPin, PawPrint } from 'lucide-react';

export default function PlacePage() {
  const { slug } = useParams<{ slug: string }>();
  const place = PLACES.find(p => p.slug === slug);

  if (!place) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-deep-blue mb-4">Lugar no encontrado</h1>
          <Link to="/" className="text-terracotta hover:underline">Volver al inicio</Link>
        </div>
      </Layout>
    );
  }

  const category = CATEGORIES.find(c => c.id === place.categoryId);

  return (
    <Layout>
      <SEO title={place.name} description={place.description} image={place.imageUrl} />
      
      <article className="bg-ivory pb-20">
        <div className="w-full h-[50vh] min-h-[400px] relative">
          <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep-blue/20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="bg-white p-8 md:p-12 shadow-sm border border-deep-blue/5 rounded-sm">
            <Link to="/guias/seleccion-fundadora" className="inline-flex items-center gap-1 text-sm text-deep-blue/60 hover:text-terracotta mb-8">
              <ArrowLeft className="w-4 h-4" /> Volver a la guía
            </Link>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1 text-terracotta">
                {place.footprints && [...Array(place.footprints)].map((_, i) => (
                  <PawPrint key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-deep-blue/60 border border-deep-blue/10 px-3 py-1">
                {category?.name}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-blue mb-6">
              {place.name}
            </h1>
            
            <div className="flex items-center gap-2 text-deep-blue/70 mb-8 border-b border-deep-blue/10 pb-8">
              <MapPin className="w-4 h-4" />
              <span className="uppercase tracking-wider text-sm">{place.zone}</span>
              {place.address && (
                <>
                  <span className="mx-2">&bull;</span>
                  <span className="text-sm">{place.address}</span>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="prose prose-lg prose-blue max-w-none text-deep-blue/80">
                <h3 className="font-serif text-2xl font-bold text-deep-blue mb-4">Sobre el lugar</h3>
                <p className="text-lg leading-relaxed font-light mb-8">
                  {place.description}
                </p>
                <p>
                  <em>*Esta es una ficha de negocio.*</em>
                </p>
                <div className="mt-8 bg-soft-green/10 border border-soft-green/20 p-6 rounded-sm">
                  <h3 className="font-bold text-deep-blue mb-2 text-base">Información Práctica</h3>
                  <p className="text-sm text-deep-blue/70 mb-0">
                    Los horarios y precios pueden variar. Recomendamos consultar directamente con el establecimiento antes de su visita.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-serif text-2xl font-bold text-deep-blue mb-4">Ubicación</h3>
                <div className="w-full aspect-square bg-gray-100 rounded-sm overflow-hidden border border-deep-blue/10 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(place.name + " Campeche")}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="absolute inset-0"
                  ></iframe>
                </div>
                {place.address && (
                  <p className="mt-4 text-sm text-deep-blue/80">
                    <strong>Dirección:</strong> {place.address}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </article>
    </Layout>
  );
}
