import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ContentViewTracker from '../../../components/analytics/ContentViewTracker';
import EditorialBody from '../../../components/editorial/EditorialBody';
import { getArticle, getArticles, getCategories } from '../../../lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.subtitle || article.title,
    openGraph: { type: 'article', title: article.title, images: [article.imageUrl] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, categories] = await Promise.all([getArticle(slug), getCategories()]);
  if (!article) notFound();

  const category = categories.find((item) => item.id === article.categoryId);
  const formattedDate = new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(article.publishedAt));

  return (
    <main>
      <ContentViewTracker type="article" slug={article.slug} />
      <article className="bg-ivory py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-5">
          <Link href="/articulos" className="inline-flex items-center gap-1 text-sm text-deep-blue/60 hover:text-terracotta mb-10">
            <ArrowLeft className="w-4 h-4" /> Volver al cuaderno
          </Link>
          <div className="eyebrow mb-5">{category?.name}</div>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-deep-blue mb-6 leading-[1.03]">{article.title}</h1>
          {article.subtitle && <p className="text-xl text-deep-blue/70 mb-8 font-serif italic">{article.subtitle}</p>}
          <div className="flex flex-wrap items-center gap-5 text-sm text-deep-blue/60 mb-12 border-y border-deep-blue/10 py-4">
            <strong className="text-deep-blue">{article.author}</strong>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTimeMinutes} min</span>
          </div>
          <img src={article.imageUrl} alt={article.imageAlt || article.title} className="w-full aspect-[16/9] object-cover rounded-[24px] mb-12" />
          <EditorialBody value={article.content} />
          {article.courtesyDeclaration && (
            <aside className="mt-10 rounded-2xl border border-deep-blue/10 bg-white p-5 text-sm text-deep-blue/70">
              <strong className="text-deep-blue">Transparencia editorial:</strong> {article.courtesyDeclaration}
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
