export const trackEvent = (eventName: string, eventData?: Record<string, string | number | boolean>) => {
  try {
    // Make sure we are in a browser environment and umami is available
    if (typeof window !== 'undefined' && (window as any).umami) {
      // We only send specific data, never PII
      if (eventData) {
        (window as any).umami.track(eventName, eventData);
      } else {
        (window as any).umami.track(eventName);
      }
    } else {
      // Fallback/development logging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Umami Event Tracked]: ${eventName}`, eventData || '');
      }
    }
  } catch (error) {
    console.error('Error tracking event in Umami', error);
  }
};

// Typed tracking functions for specific events requested
export const trackGuideView = (guideSlug: string) => 
  trackEvent('guide_view', { guideSlug });

export const trackArticleRead75 = (articleSlug: string) => 
  trackEvent('article_read_75', { articleSlug });

export const trackPlaceView = (placeSlug: string) => 
  trackEvent('place_view', { placeSlug });

export const trackSponsorClick = (sponsorSlug: string, guideSlug: string, placement: string, campaign: string) => 
  trackEvent('sponsor_click', { sponsorSlug, guideSlug, placement, campaign });

export const trackNewsletterSubmit = () => 
  trackEvent('newsletter_submit');

export const trackCategoryFilter = (categoryId: string) => 
  trackEvent('category_filter', { categoryId });

export const trackGuideDownload = (guideSlug: string) => 
  trackEvent('guide_download', { guideSlug });

export const trackWhatsappClick = (placeSlug: string) => 
  trackEvent('whatsapp_click', { placeSlug });
