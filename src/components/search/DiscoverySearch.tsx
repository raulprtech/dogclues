'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Binoculars, MapPin, Search } from 'lucide-react';
import type { City } from '../../types';
import { findCityBySearch } from '../../lib/search';
import { trackEvent } from '../../lib/umami';

export default function DiscoverySearch({ cities }: { cities: City[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [intent, setIntent] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const city = findCityBySearch(cities, destination);
    trackEvent('search_submit', { destination: city?.slug || 'unknown', hasIntent: Boolean(intent.trim()) });
    const params = new URLSearchParams();
    if (destination.trim()) params.set('destino', destination.trim());
    if (intent.trim()) params.set('q', intent.trim());
    router.push('/buscar?' + params.toString());
  };

  return (
    <form className="discovery-bar" role="search" aria-label="Buscar recomendaciones" onSubmit={submit}>
      <label className="discovery-field">
        <MapPin aria-hidden="true" />
        <span>
          <small>Destino</small>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            list="dogclues-destinations"
            placeholder="Ciudad o estado"
            aria-label="Ciudad o destino"
          />
        </span>
      </label>
      <datalist id="dogclues-destinations">
        {cities.map((city) => <option key={city.id} value={city.name}>{city.regionName}</option>)}
      </datalist>
      <label className="discovery-field">
        <Binoculars aria-hidden="true" />
        <span>
          <small>¿Qué se te antoja?</small>
          <input value={intent} onChange={(event) => setIntent(event.target.value)} placeholder="Comer, pasear, descubrir" aria-label="Qué quieres encontrar" />
        </span>
      </label>
      <button type="submit" className="discovery-button" aria-label="Buscar">
        <Search aria-hidden="true" />
        <span>Explorar</span>
      </button>
    </form>
  );
}
