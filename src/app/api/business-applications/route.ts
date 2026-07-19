import { NextResponse } from 'next/server';
import { normalizeSearchText } from '../../../lib/search';
import { createSupabaseAdminClient } from '../../../lib/supabase/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim()) return NextResponse.json({ ok: true });

  const text = (key: string, max: number) => typeof body[key] === 'string' ? String(body[key]).trim().slice(0, max) : '';
  const businessName = text('businessName', 180);
  const contactName = text('contactName', 140);
  const contactRole = text('contactRole', 100);
  const email = text('email', 254).toLowerCase();
  const phone = text('phone', 40);
  const city = text('city', 120);
  const region = text('region', 120);
  const address = text('address', 300);
  const website = text('website', 300);
  const instagram = text('instagram', 200);
  const category = text('category', 120);
  const chefBackground = text('chefBackground', 1200);
  const openingHours = text('openingHours', 1200);
  const reason = text('reason', 1600);
  const ownershipConfirmed = body.ownershipConfirmed === true;
  const termsAccepted = body.termsAccepted === true;

  if (!businessName || !contactName || !emailPattern.test(email) || !city || !address || !openingHours || !ownershipConfirmed || !termsAccepted) {
    return NextResponse.json({ error: 'Completa los campos obligatorios y confirma la autorización.' }, { status: 422 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Postulaciones aún no configuradas.' }, { status: 503 });

  const now = new Date().toISOString();
  const { error } = await supabase.from('business_applications').insert({
    business_name: businessName,
    contact_name: contactName,
    contact_role: contactRole || null,
    email,
    phone: phone || null,
    city_name: city,
    normalized_city: normalizeSearchText(city),
    region_name: region || null,
    address,
    website: website || null,
    instagram: instagram || null,
    category: category || null,
    chef_background: chefBackground || null,
    opening_hours: openingHours,
    reason: reason || null,
    ownership_confirmed: true,
    terms_accepted: true,
    privacy_version: process.env.PRIVACY_NOTICE_VERSION || '2026-07-draft',
    consent_at: now,
    status: 'submitted',
    response_status: 'pending',
  });

  if (error) {
    console.error('Business application failed', error.code);
    return NextResponse.json({ error: 'No se pudo guardar la postulación.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
