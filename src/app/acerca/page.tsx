import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Compass, PawPrint } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acerca de DogClues',
  description: 'La mascota, los principios editoriales y el significado de las huellas DogClues.',
};

function Footprints({ count }: { count: number }) {
  return (
    <span className="footprint-row" aria-label={count + (count === 1 ? ' huella' : ' huellas')}>
      {Array.from({ length: count }).map((_, index) => (
        <PawPrint key={index} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="about-hero">
        <div className="site-shell about-hero-grid">
          <div>
            <span className="eyebrow eyebrow-light"><Compass /> Acerca de DogClues</span>
            <h1>Una revista que sigue <em>las buenas pistas.</em></h1>
          </div>
          <p>
            Descubrimos restaurantes, experiencias, lugares y negocios con identidad.
            Comenzamos en Campeche y construimos nuevas guías por México con criterio
            independiente, datos confiables y curiosidad local.
          </p>
        </div>
      </section>

      <section className="terry-section">
        <div className="site-shell terry-grid">
          <div className="terry-portrait">
            <img src="/schnauzer-campeche.png" alt="Schnauzer sal y pimienta, rastreador oficial de DogClues" />
            <span className="terry-caption"><PawPrint /> Rastreador oficial</span>
          </div>
          <div className="terry-copy">
            <span className="eyebrow"><PawPrint /> Conoce a tu guía</span>
            <h2>Nuestro guía tiene nariz para <em>las buenas historias.</em></h2>
            <p>
              Es schnauzer, campechano por adopción y enemigo de las recomendaciones tibias.
              Su misión es encontrar lugares con identidad: esos que cocinan, reciben y cuentan
              algo verdadero sobre su comunidad.
            </p>
            <blockquote>“Si mueve la cola, merece una pista. Si deja huella, merece la guía.”</blockquote>
            <Link href="/metodologia" className="text-link">Cómo elegimos cada lugar <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="footprints-section">
        <div className="site-shell">
          <div className="footprints-heading">
            <span className="eyebrow eyebrow-light"><Award /> Un reconocimiento que no se compra</span>
            <h2>Las huellas DogClues</h2>
            <p>Una escala sencilla para decirte hasta dónde vale la pena seguir la pista.</p>
          </div>
          <div className="footprint-levels">
            {[
              { count: 1, title: 'Buena pista', copy: 'Un lugar honesto que vale la visita.' },
              { count: 2, title: 'Gran hallazgo', copy: 'Calidad consistente y carácter propio.' },
              { count: 3, title: 'Deja huella', copy: 'Una experiencia que ayuda a entender su destino.' },
            ].map((level) => (
              <div className="footprint-level" key={level.count}>
                <Footprints count={level.count} />
                <h3>{level.title}</h3>
                <p>{level.copy}</p>
              </div>
            ))}
          </div>
          <div className="independence-note">
            <span><PawPrint /></span>
            <p><strong>Lo editorial no está a la venta.</strong> Las marcas pueden apoyar nuestro trabajo, pero nunca comprar una huella.</p>
            <Link href="/metodologia">Leer la metodología <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
