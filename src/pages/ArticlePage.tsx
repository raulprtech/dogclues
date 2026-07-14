import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SEO } from '../components/SEO';
import { ARTICLES, CATEGORIES } from '../lib/data';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-deep-blue mb-4">Artículo no encontrado</h1>
          <Link to="/" className="text-terracotta hover:underline">Volver al inicio</Link>
        </div>
      </Layout>
    );
  }

  const category = CATEGORIES.find(c => c.id === article.categoryId);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <SEO title={article.title} description={article.subtitle} image={article.imageUrl} />
      
      <article className="bg-ivory py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-deep-blue/60 hover:text-terracotta mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          
          <div className="mb-6 text-terracotta text-sm font-bold uppercase tracking-widest">
            {category?.name}
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-deep-blue mb-6 leading-tight">
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className="text-xl text-deep-blue/70 mb-8 font-serif italic">
              {article.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-6 text-sm text-deep-blue/60 mb-12 border-y border-deep-blue/10 py-4">
            <div className="font-medium text-deep-blue">{article.author}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formattedDate}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTimeMinutes} min</div>
          </div>
          
          <div className="w-full aspect-video md:aspect-[21/9] mb-12 overflow-hidden rounded-sm">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
          
          <div 
            className="prose prose-lg prose-blue max-w-none text-deep-blue/80"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {article.courtesyDeclaration && (
            <div className="mt-12 text-sm text-deep-blue/60 italic border-t border-deep-blue/10 pt-6">
              Nota editorial: {article.courtesyDeclaration}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
