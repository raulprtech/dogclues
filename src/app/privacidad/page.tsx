import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Cómo DogClues trata información de lectores, suscriptores y negocios.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-ivory py-20 lg:py-28">
      <article className="mx-auto max-w-3xl px-5 text-deep-blue">
        <span className="eyebrow">Privacidad y datos</span>
        <h1 className="mt-5 font-serif text-5xl font-semibold">Aviso de privacidad simplificado</h1>
        <p className="mt-6 text-sm text-deep-blue/60">Versión: julio de 2026</p>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-deep-blue/80">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Qué recopilamos</h2>
            <p className="mt-3">Para el boletín solicitamos tu correo y evidencia del consentimiento. Si envías una pista, recopilamos la ciudad, el lugar y la explicación que decidas compartir; el correo es opcional. Las búsquedas de ciudades sin cobertura se cuentan diariamente de forma agregada, sin correo, nombre ni identificador de usuario.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Postulaciones de negocios</h2>
            <p className="mt-3">Una postulación puede incluir datos del establecimiento, dirección, horarios, enlaces, trayectoria, persona de contacto, correo y teléfono. Se usan para validar la solicitud, planear investigación editorial y comunicarnos con la persona autorizada. La información privada, los estados internos y las ventanas de visita no se publican.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Para qué lo usamos</h2>
            <p className="mt-3">Usamos las señales agregadas para priorizar destinos; las recomendaciones para investigación editorial; y los datos de contacto para administrar suscripciones o solicitudes autorizadas. Ninguna pista o postulación se publica automáticamente ni garantiza una visita, inclusión o reconocimiento.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Proveedores y conservación</h2>
            <p className="mt-3">Las suscripciones, recomendaciones, métricas de demanda y postulaciones se almacenan de forma privada en Supabase. El correo del boletín podrá sincronizarse con Beehiiv. Conservamos los registros mientras sean necesarios para la finalidad informada y el mínimo indispensable para acreditar consentimiento, bajas o decisiones editoriales.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Analítica</h2>
            <p className="mt-3">Umami recibe eventos y datos agregados de navegación. No le enviamos correos, teléfonos, nombres, postulaciones, explicaciones ni búsquedas escritas libremente.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Tus decisiones</h2>
            <p className="mt-3">Puedes solicitar acceso, corrección, eliminación u oposición, así como retirar tu consentimiento, escribiendo a <a className="text-terracotta underline" href="mailto:privacidad@dogclues.com">privacidad@dogclues.com</a>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
