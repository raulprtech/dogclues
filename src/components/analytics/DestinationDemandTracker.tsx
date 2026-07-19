'use client';

import { useEffect } from 'react';

export default function DestinationDemandTracker({ destination, citySlug, coverageStatus }: {
  destination: string;
  citySlug?: string;
  coverageStatus: 'planned' | 'unknown';
}) {
  useEffect(() => {
    if (!destination) return;
    void fetch('/api/demand', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        destination,
        matchedCitySlug: citySlug || 'unmatched',
        coverageStatus,
        source: 'destination_search',
      }),
    }).catch(() => undefined);
  }, [citySlug, coverageStatus, destination]);

  return null;
}
