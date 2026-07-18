import type { Metadata } from 'next';
import '../index.css';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { UmamiAnalytics } from '../components/UmamiAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://dogclues.com'),
  title: {
    default: 'DogClues | Buenas pistas, mejores lugares',
    template: '%s | DogClues',
  },
  description: 'La guía editorial para comer, pasear y descubrir los lugares de Campeche que realmente vale la pena conocer.',
  applicationName: 'DogClues',
  keywords: ['Campeche', 'restaurantes', 'guía local', 'experiencias', 'turismo', 'DogClues'],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'DogClues',
    title: 'DogClues | Buenas pistas, mejores lugares',
    description: 'Una guía de descubrimiento local con criterio editorial, comunidad y buen olfato.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'DogClues: Buenas pistas. Mejores lugares.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DogClues | Buenas pistas, mejores lugares',
    description: 'Una guía de descubrimiento local con criterio editorial y buen olfato.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <div className="min-h-screen flex flex-col bg-ivory">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
