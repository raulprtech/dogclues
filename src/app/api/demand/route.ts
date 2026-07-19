import { NextResponse } from 'next/server';
import { normalizeSearchText } from '../../../lib/search';
import { createSupabaseAdminClient } from '../../../lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: { destination?: unknown; matchedCitySlug?: unknown; coverageStatus?: unknown; source?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const destination = typeof body.destination === 'string' ? body.destination.trim() : '';
  const matchedCitySlug = typeof body.matchedCitySlug === 'string' ? body.matchedCitySlug : 'unmatched';
  const coverageStatus = ['planned', 'unknown'].includes(String(body.coverageStatus)) ? String(body.coverageStatus) : 'unknown';
  const source = typeof body.source === 'string' && body.source.length <= 80 ? body.source : 'website';

  if (!destination || destination.length > 120 || matchedCitySlug.length > 96) {
    return NextResponse.json({ error: 'Destino inválido.' }, { status: 422 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Servicio no configurado.' }, { status: 503 });

  const { error } = await supabase.rpc('increment_destination_demand', {
    destination_name: normalizeSearchText(destination),
    city_slug: matchedCitySlug || 'unmatched',
    coverage: coverageStatus,
    demand_source: source,
  });

  if (error) {
    console.error('Destination demand failed', error.code);
    return NextResponse.json({ error: 'No se pudo registrar la demanda.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
