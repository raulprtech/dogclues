'use client';

import { useEffect, useRef } from 'react';
import { trackArticleRead75, trackEvent, trackGuideView, trackPlaceView } from '../../lib/umami';

type Props =
  | { type: 'article'; slug: string }
  | { type: 'guide'; slug: string }
  | { type: 'place'; slug: string };

export default function ContentViewTracker({ type, slug }: Props) {
  const sentScroll = useRef(false);

  useEffect(() => {
    if (type === 'article') trackEvent('article_view', { articleSlug: slug });
    if (type === 'guide') trackGuideView(slug);
    if (type === 'place') trackPlaceView(slug);

    if (type !== 'article') return;

    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight > 0 && window.scrollY / documentHeight >= 0.75 && !sentScroll.current) {
        sentScroll.current = true;
        trackArticleRead75(slug);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, type]);

  return null;
}
