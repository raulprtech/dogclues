import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your-project-id' && projectId !== 'demo123',
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2026-01-01',
      useCdn: process.env.NODE_ENV === 'production' && !process.env.SANITY_API_READ_TOKEN,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
      perspective: 'published',
    })
  : null;
