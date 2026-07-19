'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../../lib/umami';

export default function RecommendationForm({ initialCity }: { initialCity: string }) {
  const [city, setCity] = useState(initialCity);
  const [placeName, setPlaceName] = useState('');
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!city.trim() || state === 'submitting') return;
    setState('submitting');

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          city,
          placeName,
          reason,
          email,
          contactConsent,
          source: 'search_no_coverage',
          company: '',
        }),
      });
      if (!response.ok) throw new Error('request_failed');
      setState('success');
      trackEvent(placeName.trim() ? 'recommendation_submit' : 'destination_request');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="rounded-3xl border border-soft-green/30 bg-soft-green/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-soft-green" />
        <h2 className="mt-4 font-serif text-3xl text-deep-blue">Pista recibida</h2>
        <p className="mt-3 text-deep-blue/70">La sumaremos a la planeación editorial. Las ciudades con más señales subirán de prioridad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-deep-blue/10 bg-white p-7 shadow-sm md:p-9">
      <div className="mb-7">
        <span className="eyebrow">Ayúdanos a seguir la pista</span>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-deep-blue">¿Qué deberíamos explorar?</h2>
        <p className="mt-3 text-deep-blue/70">Puedes pedir una ciudad o recomendar un lugar concreto. Revisamos cada pista antes de publicarla.</p>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-deep-blue">
          Ciudad o destino *
          <input className="rounded-xl border border-deep-blue/15 px-4 py-3 font-normal outline-none focus:border-terracotta" value={city} onChange={(event) => setCity(event.target.value)} maxLength={120} required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-deep-blue">
          Restaurante, sitio o experiencia
          <input className="rounded-xl border border-deep-blue/15 px-4 py-3 font-normal outline-none focus:border-terracotta" value={placeName} onChange={(event) => setPlaceName(event.target.value)} maxLength={160} placeholder="Opcional" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-deep-blue">
          ¿Por qué vale la pena?
          <textarea className="min-h-28 rounded-xl border border-deep-blue/15 px-4 py-3 font-normal outline-none focus:border-terracotta" value={reason} onChange={(event) => setReason(event.target.value)} maxLength={1200} placeholder="Una pista breve nos ayuda a priorizar." />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-deep-blue">
          Correo para dar seguimiento
          <input className="rounded-xl border border-deep-blue/15 px-4 py-3 font-normal outline-none focus:border-terracotta" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} placeholder="Opcional" />
        </label>
        {email && (
          <label className="flex items-start gap-3 text-sm text-deep-blue/70">
            <input className="mt-1" type="checkbox" checked={contactConsent} onChange={(event) => setContactConsent(event.target.checked)} required />
            <span>Acepto que DogClues me contacte sobre esta recomendación. Consulta el <Link className="text-terracotta underline" href="/privacidad">aviso de privacidad</Link>.</span>
          </label>
        )}
        <input className="sr-only" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {state === 'error' && <p role="alert" className="text-sm text-red-700">No pudimos guardar la pista. Inténtalo nuevamente.</p>}
        <button className="button button-coral justify-self-start" type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Guardando…' : 'Enviar la pista'} <ArrowRight />
        </button>
      </div>
    </form>
  );
}
