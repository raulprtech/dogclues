'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import type { Article, Category, City, Place } from '../../types';
import DiscoverySearch from '../search/DiscoverySearch';
import DestinationShowcase from './DestinationShowcase';
import { trackNewsletterSubmit } from '../../lib/umami';
import {
  ArrowRight,
  Award,
  ChefHat,
  ChevronRight,
  Coffee,
  Compass,
  Heart,
  Landmark,
  MapPin,
  PawPrint,
  Sparkles,
  Utensils,
  Waves,
} from 'lucide-react';

const categoryIcons = {
  restaurantes: Utensils,
  experiencias: Sparkles,
  turismo: Landmark,
  cafeterias: Coffee,
  'cocina-campechana': ChefHat,
};

const categoryNotes = {
  restaurantes: 'Mesas que sí valen la salida',
  experiencias: 'Planes para recordar',
  turismo: 'Historias entre murallas',
  cafeterias: 'Café, pan y sobremesa',
  'cocina-campechana': 'Sabores con raíz',
};

const editorialSections = [
  { name: 'El Perro Glotón', slug: 'perro-gloton', note: 'Restaurantes, cafés, mercados y antojos.', tone: 'coral' },
  { name: 'Perro Milpero', slug: 'perro-milpero', note: 'Cocina tradicional, productores y patrimonio.', tone: 'maiz' },
  { name: 'Pata de Perro', slug: 'pata-de-perro', note: 'Rutas, escapadas y experiencias locales.', tone: 'sea' },
  { name: 'Buen Olfato', slug: 'buen-olfato', note: 'Aperturas y proyectos antes de que todos hablen de ellos.', tone: 'sage' },
  { name: 'Perro de Barrio', slug: 'perro-de-barrio', note: 'Guías por colonias, zonas y municipios.', tone: 'blue' },
  { name: 'Huella Local', slug: 'huella-local', note: 'Comercios, artesanos y marcas independientes.', tone: 'rose' },
];

function Footprints({ count }: { count: number }) {
  return (
    <span className="footprint-row" aria-label={count + (count === 1 ? ' huella' : ' huellas')}>
      {Array.from({ length: count }).map((_, index) => (
        <PawPrint key={index} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function HomePage({ cities, categories, places, articles }: {
  cities: City[];
  categories: Category[];
  places: Place[];
  articles: Article[];
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const featuredPlaces = places.slice(0, 4);

  const handleSubscribe = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setFormError('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage', company: '' }),
      });
      if (!response.ok) throw new Error('subscription_failed');
      setSubscribed(true);
      setEmail('');
      trackNewsletterSubmit();
    } catch {
      setFormError('No pudimos guardar tu correo. Inténtalo de nuevo en un momento.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>

      <section className="hero-section">
        <div className="hero-photo" aria-hidden="true">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_5.jpg"
            alt=""
          />
          <div className="hero-wash" />
        </div>
        <div className="site-shell hero-content">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light"><Compass /> Revista local independiente · México</span>
            <h1>Buenas pistas.<br /><em>Mejores lugares.</em></h1>
            <p>
              Rastreamos ciudades para encontrar esas mesas, rincones y experiencias con
              identidad que dan ganas de recomendar en voz baja.
            </p>
          </div>

          <DiscoverySearch cities={cities} />
        </div>
      </section>

      <section className="category-strip" aria-label="Explorar por categoría">
        <div className="site-shell category-row">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Compass;
            return (
              <Link
                key={category.id}
                href={'/buscar?q=' + category.slug}
                className="category-pill"
              >
                <span className="category-icon"><Icon /></span>
                <span>
                  <strong>{category.name}</strong>
                  <small>{categoryNotes[category.slug as keyof typeof categoryNotes]}</small>
                </span>
                <ChevronRight />
              </Link>
            );
          })}
        </div>
      </section>

      <DestinationShowcase cities={cities} places={places} />

      <section className="section-block">
        <div className="site-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow"><PawPrint /> Edición fundadora · Campeche</span>
              <h2>El punto de partida</h2>
              <p>Una primera selección probada con curiosidad, criterio y apetito.</p>
            </div>
            <Link href="/guias/seleccion-fundadora" className="text-link">Ver toda la guía <ArrowRight /></Link>
          </div>

          <div className="place-grid">
            {featuredPlaces.map((place, index) => (
              <article className={'place-card ' + (index === 0 ? 'place-card-featured' : '')} key={place.id}>
                <div className="place-image">
                  <Link href={'/lugares/' + place.slug} aria-label={'Ver ' + place.name}>
                    <img src={place.imageUrl} alt={place.name} />
                    <span className="card-badge">{index === 0 ? 'Hallazgo del mes' : 'Selección local'}</span>
                  </Link>
                  <button className="save-button" aria-label={'Guardar ' + place.name} onClick={(event) => event.preventDefault()}>
                    <Heart />
                  </button>
                </div>
                <div className="place-card-body">
                  <div className="place-meta">
                    <span>{categories.find((category) => category.id === place.categoryId)?.name}</span>
                    <Footprints count={place.footprints || 0} />
                  </div>
                  <Link href={'/lugares/' + place.slug}><h3>{place.name}</h3></Link>
                  <p>{place.description}</p>
                  <span className="place-location"><MapPin /> {place.zone}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-feature">
        <div className="site-shell editorial-grid">
          <div className="editorial-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_12.jpg"
              alt="Calles coloridas del centro histórico de Campeche"
            />
            <span>Edición 01 · Campeche</span>
          </div>
          <div className="editorial-copy">
            <span className="eyebrow eyebrow-light"><Award /> La guía fundadora</span>
            <h2>La ciudad amurallada, <em>sin lugares comunes.</em></h2>
            <p className="editorial-lead">
              Nueve sitios para entender Campeche desde la mesa, el malecón y las historias
              que todavía viven detrás de sus fachadas.
            </p>
            <div className="editorial-stats">
              <span><strong>09</strong> lugares elegidos</span>
              <span><strong>05</strong> categorías</span>
              <span><strong>100%</strong> criterio local</span>
            </div>
            <Link href="/guias/seleccion-fundadora" className="button button-coral">
              Abrir la edición <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block stories-section">
        <div className="site-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow"><Waves /> Historias desde cada destino</span>
              <h2>El cuaderno de DogClues</h2>
            </div>
          </div>
          <div className="story-grid">
            {articles.slice(0, 3).map((article, index) => (
              <article className={index === 0 ? 'story-card story-card-large' : 'story-card'} key={article.id}>
                <Link href={'/articulos/' + article.slug} className="story-image">
                  <img src={article.imageUrl} alt={article.title} />
                </Link>
                <div>
                  <span className="story-kicker">
                    {categories.find((category) => category.id === article.categoryId)?.name} · {article.readTimeMinutes} min
                  </span>
                  <Link href={'/articulos/' + article.slug}><h3>{article.title}</h3></Link>
                  <p>{index === 0 ? 'Una ruta breve, honesta y muy campechana para empezar el día con el pie derecho.' : 'La pista precisa para descubrir algo que vale la vuelta.'}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-universe">
        <div className="site-shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow"><Compass /> Sigue la pista que más te gusta</span>
              <h2>El universo editorial de DogClues</h2>
              <p>Seis maneras de mirar la ciudad, con la misma curiosidad y criterio local.</p>
            </div>
            <Link href="/articulos" className="text-link">Explorar historias <ArrowRight /></Link>
          </div>
          <div className="editorial-section-grid">
            {editorialSections.map((section, index) => (
              <Link href={'/articulos?seccion=' + section.slug} className={'editorial-section-card tone-' + section.tone} key={section.slug}>
                <span className="section-number">0{index + 1}</span>
                <div><h3>{section.name}</h3><p>{section.note}</p></div>
                <ArrowRight />
              </Link>
            ))}
          </div>
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
              { count: 3, title: 'Deja huella', copy: 'Una experiencia que explica Campeche.' },
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

      <section className="newsletter-section">
        <div className="site-shell newsletter-card">
          <div>
            <span className="eyebrow"><Compass /> La pista del fin de semana</span>
            <h2>Campeche, directo a tu correo.</h2>
            <p>Una recomendación bien elegida. Sin listas infinitas. Sin spam.</p>
          </div>
          {subscribed ? (
            <div className="success-message"><PawPrint /> ¡Listo! Ya tenemos tu dirección.</div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit" disabled={submitting}>{submitting ? 'Guardando…' : 'Quiero la pista'} <ArrowRight /></button>
              <input className="sr-only" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <small>Al suscribirte aceptas nuestro <Link href="/privacidad">aviso de privacidad</Link>.</small>
              {formError && <p role="alert">{formError}</p>}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
