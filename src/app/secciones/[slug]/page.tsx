import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, PawPrint } from 'lucide-react';
import { getArticles, getCategories } from '../../../lib/content';
import { editorialSections, getEditorialSection } from '../../../lib/editorial-sections';

export const revalidate = 60;

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return editorialSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params;
  const section = getEditorialSection(slug);
  if (!section) return {};
  return {
    title: section.name,
    description: section.description,
  };
}

export default async function EditorialSectionPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const section = getEditorialSection(slug);
  if (!section) notFound();

  const [allArticles, categories] = await Promise.all([getArticles(), getCategories()]);
  const articles = allArticles.filter((article) => article.editorialSection === section.slug);

  return (
    <main className="bg-ivory">
      <section className={'editorial-section-hero tone-' + section.tone}>
        <div className="site-shell editorial-section-hero-grid">
          <div className="editorial-section-hero-copy">
            <span className="eyebrow"><PawPrint /> Sección editorial</span>
            <h1>{section.name}</h1>
            <p>{section.description}</p>
          </div>
          <div className="editorial-section-illustration">
            <img src={section.image} alt={section.imageAlt} />
          </div>
        </div>
      </section>

      <nav className="editorial-section-nav" aria-label="Secciones editoriales">
        <div className="site-shell">
          {editorialSections.map((item) => (
            <Link key={item.slug} href={'/secciones/' + item.slug} className={item.slug === section.slug ? 'is-active' : ''}>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <section className="site-shell py-20 lg:py-24">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Historias de {section.name}</span>
            <h2>Las pistas más recientes</h2>
          </div>
          <Link href="/articulos" className="text-link">Ver todo el cuaderno <ArrowRight /></Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <Link href={'/articulos/' + article.slug} className="mb-5 block aspect-[4/3] overflow-hidden rounded-[22px]">
                  <img src={article.imageUrl} alt={article.imageAlt || article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="mb-3 flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest text-terracotta">
                  <span>{categories.find((category) => category.id === article.categoryId)?.name}{article.cityName ? ' · ' + article.cityName : ''}</span>
                  <span className="inline-flex items-center gap-1 text-deep-blue/50"><Clock className="h-3 w-3" /> {article.readTimeMinutes} min</span>
                </div>
                <h2 className="mb-3 font-serif text-2xl font-semibold leading-tight">
                  <Link href={'/articulos/' + article.slug}>{article.title}</Link>
                </h2>
                <Link href={'/articulos/' + article.slug} className="text-link">Leer la historia <ArrowRight /></Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="editorial-section-empty">
            <PawPrint />
            <h2>Estamos siguiendo las primeras pistas.</h2>
            <p>Esta sección ya está lista para recibir sus próximos artículos desde Sanity.</p>
          </div>
        )}
      </section>
    </main>
  );
}
