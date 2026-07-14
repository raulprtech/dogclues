import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ 
  title = "Dogclues | Guía editorial independiente", 
  description = "Una guía editorial independiente para descubrir los mejores restaurantes, experiencias, atractivos turísticos y negocios de Campeche.",
  image = "https://upload.wikimedia.org/wikipedia/commons/7/74/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_8.jpg",
  url = "https://dogclues.com"
}: SEOProps) {
  const fullTitle = title.includes("Dogclues") ? title : `${title} | Dogclues`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
