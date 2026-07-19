import 'server-only';

type BeehiivSyncResult =
  | { configured: false }
  | { configured: true; ok: true; subscriptionId?: string }
  | { configured: true; ok: false; status: number };

export async function syncBeehiivSubscriber(email: string, source: string): Promise<BeehiivSyncResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) return { configured: false };

  const newsletterListIds = (process.env.BEEHIIV_NEWSLETTER_LIST_IDS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const response = await fetch(
    'https://api.beehiiv.com/v2/publications/' + encodeURIComponent(publicationId) + '/subscriptions',
    {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: process.env.BEEHIIV_SEND_WELCOME_EMAIL !== 'false',
        double_opt_override: 'not_set',
        utm_source: source,
        utm_medium: 'website',
        utm_campaign: 'dogclues_newsletter',
        referring_site: process.env.NEXT_PUBLIC_SITE_URL || 'https://dogclues.com',
        ...(newsletterListIds.length > 0 ? { newsletter_list_ids: newsletterListIds } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) return { configured: true, ok: false, status: response.status };

  const payload = await response.json() as { data?: { id?: string } };
  return { configured: true, ok: true, subscriptionId: payload.data?.id };
}
