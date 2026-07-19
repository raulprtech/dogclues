import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '../../../lib/supabase/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; company?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = typeof body.source === 'string' && body.source.length <= 80 ? body.source : 'website';

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Escribe un correo válido.' }, { status: 422 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'El boletín aún no está configurado.' }, { status: 503 });
  }

  const consentAt = new Date().toISOString();
  const privacyVersion = process.env.PRIVACY_NOTICE_VERSION || '2026-07-draft';
  const { error } = await supabase.from('newsletter_subscribers').upsert(
    {
      email,
      status: 'subscribed',
      source,
      privacy_version: privacyVersion,
      consent_at: consentAt,
      subscribed_at: consentAt,
      unsubscribed_at: null,
      updated_at: consentAt,
    },
    { onConflict: 'email' },
  );

  if (error) {
    console.error('Newsletter subscription failed', error.code);
    return NextResponse.json({ error: 'No se pudo guardar la suscripción.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
