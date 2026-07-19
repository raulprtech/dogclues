import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { City, Place } from '../../types';
import { cityPath } from '../../lib/search';

export default function DestinationShowcase({ cities, places }: { cities: City[]; places: Place[] }) {
  return (
    <section className="section-block destinations-section">
      <div className="site-shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><MapPin /> DogClues por México</span>
            <h2>Cada ciudad tiene sus propias pistas.</h2>
            <p>Guías activas, próximos recorridos y destinos que la comunidad está pidiendo.</p>
          </div>
          <Link href="/buscar" className="text-link">Ver destinos <ArrowRight /></Link>
        </div>
        <div className="destination-showcase-grid">
          {cities.slice(0, 5).map((city, index) => {
            const image = places.find((place) => place.cityId === city.id || place.citySlug === city.slug)?.imageUrl;
            return (
              <Link key={city.id} href={cityPath(city)} className={'destination-showcase-card destination-tone-' + ((index % 4) + 1)}>
                {image && <img src={image} alt="" />}
                <span className="destination-card-wash" />
                <span className="destination-card-status">{city.coverageStatus === 'active' ? 'Guía activa' : 'Próximamente'}</span>
                <div>
                  <small>{city.regionName}</small>
                  <h3>{city.name}</h3>
                  <p>{city.description || (city.coverageStatus === 'active' ? 'Explora la selección editorial.' : 'Ayúdanos a encontrar las primeras pistas.')}</p>
                </div>
                <span className="destination-card-arrow"><ArrowRight /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
