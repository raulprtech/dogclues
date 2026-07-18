import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center px-6 py-24 text-center">
      <div>
        <PawPrint className="w-10 h-10 text-terracotta mx-auto mb-6" />
        <p className="eyebrow mb-4">Pista perdida</p>
        <h1 className="font-serif text-5xl text-deep-blue mb-5">No encontramos esta página.</h1>
        <p className="text-deep-blue/70 mb-8">Quizá la pista cambió de calle. Volvamos a Campeche.</p>
        <Link href="/" className="button button-coral">Regresar al inicio</Link>
      </div>
    </main>
  );
}
