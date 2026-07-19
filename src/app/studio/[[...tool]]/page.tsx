import type { Metadata } from 'next';
import StudioShell from '../../../components/sanity/StudioShell';
import { isSanityConfigured } from '../../../lib/sanity';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Studio editorial',
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-ivory px-5 py-28">
        <div className="mx-auto max-w-2xl rounded-3xl border border-deep-blue/10 bg-white p-10">
          <p className="eyebrow">CMS editorial</p>
          <h1 className="mt-4 font-serif text-4xl text-deep-blue">Sanity necesita configuración</h1>
          <p className="mt-5 text-deep-blue/70">
            Define NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET en Netlify para habilitar el Studio.
          </p>
        </div>
      </main>
    );
  }

  return <StudioShell />;
}
