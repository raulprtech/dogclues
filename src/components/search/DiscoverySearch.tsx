'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Binoculars, ChevronRight, Compass, MapPin, Search, Sparkles, Utensils, X } from 'lucide-react';
import type { City } from '../../types';
import { cityPath, findCityBySearch, normalizeSearchText } from '../../lib/search';
import { trackEvent } from '../../lib/umami';

const intents = [
  { label: 'Restaurantes', value: 'restaurantes', icon: Utensils },
  { label: 'Experiencias', value: 'experiencias', icon: Sparkles },
  { label: 'Lugares turísticos', value: 'turismo', icon: Compass },
];

export default function DiscoverySearch({ cities, initialDestination = '' }: { cities: City[]; initialDestination?: string }) {
  const router = useRouter();
  const rootRef = useRef<HTMLFormElement>(null);
  const [destination, setDestination] = useState(initialDestination);
  const [intent, setIntent] = useState('');
  const [activeField, setActiveField] = useState<'destination' | 'intent' | null>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setActiveField(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveField(null);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  const suggestions = useMemo(() => {
    const normalized = normalizeSearchText(destination);
    if (!normalized) return cities.slice(0, 6);
    return cities.filter((city) => {
      const values = [city.name, city.regionName, city.areaName || '', ...(city.searchAliases || [])];
      return values.some((value) => normalizeSearchText(value).includes(normalized));
    }).slice(0, 6);
  }, [cities, destination]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const city = findCityBySearch(cities, destination);
    trackEvent('search_submit', { destination: city?.slug || 'unknown', hasIntent: Boolean(intent.trim()) });
    setActiveField(null);

    if (city?.coverageStatus === 'active' && !intent.trim()) {
      router.push(cityPath(city));
      return;
    }

    const params = new URLSearchParams();
    if (destination.trim()) params.set('destino', destination.trim());
    if (intent.trim()) params.set('q', intent.trim());
    router.push('/buscar?' + params.toString());
  };

  const selectCity = (city: City) => {
    setDestination(city.name);
    setActiveField(city.coverageStatus === 'active' ? 'intent' : null);
    if (city.coverageStatus !== 'active') {
      router.push('/buscar?destino=' + encodeURIComponent(city.name));
    }
  };

  return (
    <form ref={rootRef} className="discovery-bar" role="search" aria-label="Buscar recomendaciones" onSubmit={submit}>
      <label className={'discovery-field ' + (activeField === 'destination' ? 'is-active' : '')}>
        <MapPin aria-hidden="true" />
        <span>
          <small>¿A dónde?</small>
          <input value={destination} onFocus={() => setActiveField('destination')} onChange={(event) => { setDestination(event.target.value); setActiveField('destination'); }} placeholder="Busca cualquier ciudad" aria-label="Ciudad o destino" autoComplete="off" />
        </span>
        {destination && <button type="button" className="field-clear" onClick={() => setDestination('')} aria-label="Limpiar destino"><X /></button>}
      </label>

      <label className={'discovery-field ' + (activeField === 'intent' ? 'is-active' : '')}>
        <Binoculars aria-hidden="true" />
        <span>
          <small>¿Qué buscas?</small>
          <input value={intent} onFocus={() => setActiveField('intent')} onChange={(event) => setIntent(event.target.value)} placeholder="Comer, pasear, descubrir" aria-label="Qué quieres encontrar" />
        </span>
      </label>

      <button type="submit" className="discovery-button" aria-label="Buscar">
        <Search aria-hidden="true" /><span>Explorar</span>
      </button>

      {activeField && (
        <div className="discovery-panel" aria-live="polite">
          {activeField === 'destination' ? (
            <>
              <div className="panel-heading"><div><strong>Explora por destino</strong><small>Guías activas y próximas ciudades</small></div></div>
              <div className="destination-menu">
                {suggestions.map((city) => (
                  <button type="button" key={city.id} className="destination-option" onClick={() => selectCity(city)}>
                    <span className={'destination-symbol ' + (city.coverageStatus === 'active' ? 'is-live' : '')}><MapPin /></span>
                    <span><strong>{city.name}</strong><small>{city.regionName}{city.areaName ? ' · ' + city.areaName : ''}</small></span>
                    <em>{city.coverageStatus === 'active' ? 'Guía activa' : 'Próximamente'}</em>
                    <ChevronRight />
                  </button>
                ))}
                {destination.trim() && suggestions.length === 0 && (
                  <button type="submit" className="unknown-destination">
                    <span className="destination-symbol"><Compass /></span>
                    <span><strong>Buscar “{destination.trim()}”</strong><small>Si aún no llegamos, podrás pedir esta ciudad.</small></span>
                    <ChevronRight />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="panel-heading"><div><strong>¿Qué te gustaría descubrir?</strong><small>Elige una pista o escribe algo específico</small></div></div>
              <div className="intent-menu">
                {intents.map(({ label, value, icon: Icon }) => (
                  <button type="button" key={value} onClick={() => { setIntent(value); setActiveField(null); }}>
                    <span><Icon /></span><strong>{label}</strong><small>Ver recomendaciones</small>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </form>
  );
}
