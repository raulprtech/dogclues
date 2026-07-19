import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Cómo DogClues trata la información de lectores y suscriptores.',
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
            <p className="mt-3">Para el boletín solicitamos tu correo electrónico, la fecha y el origen del consentimiento. Si envías una pista, recopilamos la ciudad, el lugar y la explicación que decidas compartir; el correo es opcional y solo se guarda con autorización de contacto. La analítica no recibe estos textos ni tu correo.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Para qué lo usamos</h2>
            <p className="mt-3">Usamos tu correo para administrar la suscripción o dar seguimiento a una recomendación cuando lo autorizas. Las pistas se utilizan para priorizar destinos y realizar investigación editorial; nunca se publican automáticamente. Las métricas agregadas nos ayudan a entender qué guías y artículos resultan útiles.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold text-deep-blue">Proveedores y conservación</h2>
            <p className="mt-3">Las suscripciones y recomendaciones se almacenan de forma privada en Supabase. El correo del boletín podrá sincronizarse con Beehiiv para realizar los envíos. Conservamos los registros mientras sean necesarios para la finalidad informada y el mínimo indispensable para acreditar bajas o consentimiento.</p>
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
