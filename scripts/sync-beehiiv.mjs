import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiKey = process.env.BEEHIIV_API_KEY;
const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

if (!supabaseUrl || !supabaseKey || !apiKey || !publicationId) {
  throw new Error('Missing Supabase or Beehiiv server credentials.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const listIds = (process.env.BEEHIIV_NEWSLETTER_LIST_IDS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const { data: subscribers, error } = await supabase
  .from('newsletter_subscribers')
  .select('id,email,source')
  .eq('status', 'subscribed')
  .is('beehiiv_subscription_id', null)
  .order('subscribed_at', { ascending: true })
  .limit(100);

if (error) throw error;

let synced = 0;
let failed = 0;

for (const subscriber of subscribers || []) {
  let response;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch(
      'https://api.beehiiv.com/v2/publications/' + encodeURIComponent(publicationId) + '/subscriptions',
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: subscriber.email,
          reactivate_existing: true,
          send_welcome_email: false,
          double_opt_override: 'not_set',
          utm_source: subscriber.source || 'website',
          utm_medium: 'website',
          utm_campaign: 'dogclues_newsletter',
          referring_site: process.env.NEXT_PUBLIC_SITE_URL || 'https://dogclues.com',
          ...(listIds.length > 0 ? { newsletter_list_ids: listIds } : {}),
        }),
      },
    );

    if (response.ok || (response.status !== 429 && response.status < 500)) break;
    await wait(500 * (2 ** attempt));
  }

  if (!response?.ok) {
    failed += 1;
    console.error('Beehiiv retry failed for subscriber record', subscriber.id, response?.status || 'network');
    continue;
  }

  const payload = await response.json();
  const subscriptionId = payload?.data?.id;
  if (!subscriptionId) {
    failed += 1;
    console.error('Beehiiv returned no subscription ID for record', subscriber.id);
    continue;
  }

  const { error: updateError } = await supabase
    .from('newsletter_subscribers')
    .update({ beehiiv_subscription_id: subscriptionId, updated_at: new Date().toISOString() })
    .eq('id', subscriber.id);

  if (updateError) {
    failed += 1;
    console.error('Could not persist Beehiiv ID for record', subscriber.id, updateError.code);
  } else {
    synced += 1;
  }
}

console.log(JSON.stringify({ reviewed: subscribers?.length || 0, synced, failed }));
