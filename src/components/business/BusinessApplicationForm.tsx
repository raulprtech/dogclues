'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../../lib/umami';

export default function BusinessApplicationForm({ initialCity = '' }: { initialCity?: string }) {
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === 'submitting') return;
    setState('submitting');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/business-applications', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...body,
          ownershipConfirmed: formData.get('ownershipConfirmed') === 'on',
          termsAccepted: formData.get('termsAccepted') === 'on',
        }),
      });
      if (!response.ok) throw new Error('application_failed');
      setState('success');
      trackEvent('business_application_submit', { cityProvided: true });
      form.reset();
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="rounded-3xl border border-soft-green/30 bg-soft-green/10 p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-soft-green" />
        <h2 className="mt-4 font-serif text-4xl text-deep-blue">Postulación recibida</h2>
        <p className="mx-auto mt-4 max-w-xl text-deep-blue/70">Revisaremos que la información esté completa. Si el negocio es elegible, podrá incorporarse a futuros recorridos anónimos; esto no garantiza visita, publicación ni reconocimiento.</p>
      </div>
    );
  }

  const inputClass = 'rounded-xl border border-deep-blue/15 bg-white px-4 py-3 font-normal outline-none transition focus:border-terracotta';

  return (
    <form onSubmit={submit} className="rounded-3xl border border-deep-blue/10 bg-white p-7 shadow-sm md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Nombre del negocio *<input className={inputClass} name="businessName" maxLength={180} required /></label>
        <label className="grid gap-2 text-sm font-semibold">Ciudad *<input className={inputClass} name="city" defaultValue={initialCity} maxLength={120} required /></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Dirección completa *<input className={inputClass} name="address" maxLength={300} required /></label>
        <label className="grid gap-2 text-sm font-semibold">Estado<input className={inputClass} name="region" maxLength={120} /></label>
        <label className="grid gap-2 text-sm font-semibold">Tipo de cocina o categoría<input className={inputClass} name="category" maxLength={120} /></label>
        <label className="grid gap-2 text-sm font-semibold">Sitio web<input className={inputClass} name="website" type="url" maxLength={300} /></label>
        <label className="grid gap-2 text-sm font-semibold">Instagram<input className={inputClass} name="instagram" maxLength={200} placeholder="@negocio o enlace" /></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Días y horarios de apertura *<textarea className={inputClass + ' min-h-28'} name="openingHours" maxLength={1200} required /></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">Trayectoria del chef o historia del proyecto<textarea className={inputClass + ' min-h-28'} name="chefBackground" maxLength={1200} /></label>
        <label className="grid gap-2 text-sm font-semibold md:col-span-2">¿Por qué debería considerarse?<textarea className={inputClass + ' min-h-32'} name="reason" maxLength={1600} /></label>
      </div>

      <div className="my-8 border-t border-deep-blue/10 pt-8">
        <h3 className="font-serif text-2xl text-deep-blue">Persona de contacto</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">Nombre *<input className={inputClass} name="contactName" maxLength={140} required /></label>
          <label className="grid gap-2 text-sm font-semibold">Cargo o relación<input className={inputClass} name="contactRole" maxLength={100} /></label>
          <label className="grid gap-2 text-sm font-semibold">Correo *<input className={inputClass} name="email" type="email" maxLength={254} required /></label>
          <label className="grid gap-2 text-sm font-semibold">Teléfono<input className={inputClass} name="phone" maxLength={40} /></label>
        </div>
      </div>

      <div className="grid gap-4 text-sm text-deep-blue/70">
        <label className="flex items-start gap-3"><input className="mt-1" type="checkbox" name="ownershipConfirmed" required /><span>Confirmo que soy propietario, representante autorizado o colaborador facultado para enviar esta información.</span></label>
        <label className="flex items-start gap-3"><input className="mt-1" type="checkbox" name="termsAccepted" required /><span>Acepto el <Link className="text-terracotta underline" href="/privacidad">aviso de privacidad</Link> y entiendo que la postulación es gratuita, no garantiza visita ni inclusión y no permite conocer la fecha de una eventual visita.</span></label>
      </div>

      <input className="sr-only" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === 'error' && <p role="alert" className="mt-5 text-sm text-red-700">No pudimos guardar la postulación. Revisa los campos e inténtalo nuevamente.</p>}
      <button className="button button-coral mt-7" type="submit" disabled={state === 'submitting'}>{state === 'submitting' ? 'Enviando…' : 'Enviar para consideración'} <ArrowRight /></button>
    </form>
  );
}
