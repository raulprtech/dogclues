import React from 'react';
import { Helmet } from 'react-helmet-async';

export function UmamiAnalytics() {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;

  // Only render the script if both variables are configured
  if (!websiteId || !scriptUrl) {
    return null;
  }

  return (
    <Helmet>
      <script 
        async 
        defer 
        src={scriptUrl} 
        data-website-id={websiteId}
      />
    </Helmet>
  );
}
