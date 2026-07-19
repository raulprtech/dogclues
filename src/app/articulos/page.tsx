import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getArticles, getCategories } from '../../lib/content';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Historias y pistas de México',
  description: 'Rutas, sabores, aperturas y hallazgos editoriales de los destinos DogClues.',
};

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);

  return (
    <main className="bg-ivory py-20 lg:py-28">
      <div className="site-shell">
        <header className="max-w-3xl mb-14">
          <span className="eyebrow">El cuaderno de DogClues</span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-deep-blue leading-none mt-5 mb-6">
            Historias para seguirle la pista a México.
          </h1>
          <p className="text-lg text-deep-blue/70 leading-relaxed">
            Gastronomía, barrios, tradición, aperturas y escapadas contadas con criterio local.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link href={'/articulos/' + article.slug} className="block overflow-hidden rounded-[22px] aspect-[4/3] mb-5">
                <img src={article.imageUrl} alt={article.imageAlt || article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-terracotta font-bold mb-3">
                <span>{categories.find((category) => category.id === article.categoryId)?.name}{article.cityName ? " · " + article.cityName : ""}</span>
                <span className="inline-flex items-center gap-1 text-deep-blue/50"><Clock className="w-3 h-3" /> {article.readTimeMinutes} min</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold leading-tight mb-3">
                <Link href={'/articulos/' + article.slug}>{article.title}</Link>
              </h2>
              <Link href={'/articulos/' + article.slug} className="text-link">Leer la historia <ArrowRight /></Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
