import { NextResponse } from 'next/server';
import { normalizeSearchText } from '../../../lib/search';
import { createSupabaseAdminClient } from '../../../lib/supabase/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    city?: unknown;
    placeName?: unknown;
    reason?: unknown;
    email?: unknown;
    contactConsent?: unknown;
    source?: unknown;
    company?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const placeName = typeof body.placeName === 'string' ? body.placeName.trim() : '';
  const reason = typeof body.reason === 'string' ? body.reason.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const contactConsent = body.contactConsent === true;
  const source = typeof body.source === 'string' && body.source.length <= 80 ? body.source : 'website';

  if (!city || city.length > 120 || placeName.length > 160 || reason.length > 1200) {
    return NextResponse.json({ error: 'Revisa la información enviada.' }, { status: 422 });
  }
  if (email && (!emailPattern.test(email) || email.length > 254 || !contactConsent)) {
    return NextResponse.json({ error: 'El correo requiere consentimiento válido.' }, { status: 422 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'El registro de pistas aún no está configurado.' }, { status: 503 });
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from('destination_requests').insert({
    request_type: placeName ? 'place_recommendation' : 'city_request',
    city_name: city,
    normalized_city: normalizeSearchText(city),
    place_name: placeName || null,
    reason: reason || null,
    email: email || null,
    contact_consent: email ? contactConsent : false,
    consent_at: email ? now : null,
    privacy_version: email ? process.env.PRIVACY_NOTICE_VERSION || '2026-07-draft' : null,
    source,
    status: 'new',
  });

  if (error) {
    console.error('Destination request failed', error.code);
    return NextResponse.json({ error: 'No se pudo guardar la pista.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
