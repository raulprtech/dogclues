import type { Metadata } from 'next';
import { EyeOff, ReceiptText, Scale, SearchCheck } from 'lucide-react';
import BusinessApplicationForm from '../../components/business/BusinessApplicationForm';

export const metadata: Metadata = {
  title: 'Postula tu negocio',
  description: 'Envía un restaurante, experiencia o negocio para consideración editorial de DogClues.',
};

type Params = Promise<{ ciudad?: string | string[] }>;

export default async function BusinessApplicationPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const city = Array.isArray(params.ciudad) ? params.ciudad[0] || '' : params.ciudad || '';

  return (
    <main className="bg-ivory py-16 lg:py-24">
      <div className="site-shell">
        <header className="mx-auto max-w-4xl text-center">
          <span className="eyebrow">Consideración editorial</span>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-deep-blue md:text-7xl">¿Crees que falta tu negocio?</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-deep-blue/70">Compártenos información verificable para incorporarlo a nuestra investigación. Postularse no compra una posición, una huella ni una visita.</p>
        </header>

        <section className="mx-auto my-14 grid max-w-5xl gap-4 md:grid-cols-4">
          {[
            [SearchCheck, 'Revisión previa', 'Comprobamos datos, operación y encaje editorial.'],
            [EyeOff, 'Visita anónima', 'El negocio no conoce la fecha ni la identidad del crítico.'],
            [ReceiptText, 'Cuenta pagada', 'La experiencia se evalúa como la de cualquier cliente.'],
            [Scale, 'Decisión independiente', 'La postulación nunca determina el resultado.'],
          ].map(([Icon, title, copy]) => {
            const CardIcon = Icon as typeof SearchCheck;
            return <div key={String(title)} className="rounded-2xl border border-deep-blue/10 bg-white p-5"><CardIcon className="h-6 w-6 text-terracotta" /><h2 className="mt-4 font-serif text-xl text-deep-blue">{String(title)}</h2><p className="mt-2 text-sm leading-relaxed text-deep-blue/65">{String(copy)}</p></div>;
          })}
        </section>

        <div className="mx-auto max-w-4xl"><BusinessApplicationForm initialCity={city} /></div>

        <aside className="mx-auto mt-10 max-w-4xl rounded-3xl bg-deep-blue p-7 text-ivory md:p-9">
          <h2 className="font-serif text-3xl">Qué respuesta recibirá el negocio</h2>
          <p className="mt-4 leading-relaxed text-ivory/75">Confirmaremos la recepción y, si hace falta, pediremos información adicional. Podemos indicar que el negocio está en el radar editorial, pero no comunicaremos un día, mes o intervalo de visita. La experiencia debe seguir siendo representativa.</p>
        </aside>
      </div>
    </main>
  );
}
