import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SEO } from '../components/SEO';
import { GUIDE_EDITIONS, ARTICLES, CATEGORIES, PLACES } from '../lib/data';
import { ArrowRight, PawPrint, Award, Coffee, Utensils, Map, ShoppingBag } from 'lucide-react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const mainEdition = GUIDE_EDITIONS[0];
  const recognitionOfTheMonth = PLACES.find(p => p.id === 'lugar-1');
  
  const categoryIcons: Record<string, React.ReactNode> = {
    'restaurantes': <Utensils className="w-6 h-6" />,
    'cafeterias': <Coffee className="w-6 h-6" />,
    'cocina-campechana': <PawPrint className="w-6 h-6" />,
    'experiencias': <Map className="w-6 h-6" />,
    'turismo': <ShoppingBag className="w-6 h-6" />
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Layout>
      <SEO />
      
      {/* 1. Hero Principal */}
      <section className="relative overflow-hidden bg-ivory pt-20 pb-24 lg:pt-32 lg:pb-40 border-b border-deep-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-green/20 text-deep-blue text-sm font-medium mb-6">
                <PawPrint className="w-4 h-4 text-terracotta" />
                <span>Nuestra guía</span>
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl font-bold text-deep-blue leading-tight mb-6">
                Los lugares que hacen <span className="italic text-terracotta">especial</span> a Campeche
              </h1>
              <p className="text-xl text-deep-blue/80 mb-10 max-w-lg leading-relaxed font-light">
                Restaurantes, experiencias y rincones seleccionados con criterio independiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/guias/seleccion-fundadora" className="inline-flex justify-center items-center px-8 py-4 bg-deep-blue text-ivory font-medium rounded-sm hover:bg-deep-blue/90 transition-colors">
                  Explorar la guía
                </Link>
                <Link to="/metodologia" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-deep-blue text-deep-blue font-medium rounded-sm hover:bg-deep-blue/5 transition-colors">
                  Conocer nuestra metodología
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-deep-blue/5">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_5.jpg" 
                  alt="Vista del malecón de Campeche" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-ivory p-4 shadow-lg border border-deep-blue/10 rounded-sm flex items-center gap-4">
                <div className="w-16 h-16 bg-soft-green/20 rounded-full flex items-center justify-center">
                  <PawPrint className="w-8 h-8 text-deep-blue" />
                </div>
                <div>
                  <p className="font-serif font-bold text-deep-blue">El Rastreador</p>
                  <p className="text-xs text-deep-blue/70">Selección oficial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Edición Destacada */}
      <section className="py-24 bg-deep-blue text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 border border-ivory/20 px-3 py-1 text-xs uppercase tracking-widest text-ivory/80">
            <span>Edición presentada por</span>
            <span className="font-bold text-ivory">Café del Mar</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-8">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
                {mainEdition.title}
              </h2>
              <p className="text-2xl font-serif italic text-terracotta mb-6">
                {mainEdition.subtitle}
              </p>
              <p className="text-lg text-ivory/80 mb-10 leading-relaxed font-light">
                {mainEdition.description}
              </p>
              <Link 
                to={`/guias/${mainEdition.slug}`}
                className="group inline-flex items-center gap-2 text-ivory font-medium border-b border-terracotta pb-1 hover:text-terracotta transition-colors"
              >
                Consultar edición <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src={mainEdition.coverImageUrl} 
                alt={mainEdition.title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Reconocimiento del mes */}
      {recognitionOfTheMonth && (
        <section className="py-24 bg-ivory border-b border-deep-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-terracotta uppercase tracking-widest text-sm font-bold mb-2 block">Nuestro Hallazgo</span>
              <h2 className="font-serif text-4xl font-bold text-deep-blue">Reconocimiento del mes</h2>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white border border-deep-blue/10 rounded-sm overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={recognitionOfTheMonth.imageUrl} 
                  alt={recognitionOfTheMonth.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] uppercase tracking-wider text-deep-blue/40 border border-deep-blue/10 px-2 py-1 bg-gray-50">Demostración</span>
                </div>
                
                <div className="flex gap-1 mb-6 text-terracotta">
                  {[...Array(recognitionOfTheMonth.footprints)].map((_, i) => (
                    <PawPrint key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <h3 className="font-serif text-3xl font-bold text-deep-blue mb-2">
                  {recognitionOfTheMonth.name}
                </h3>
                <p className="text-deep-blue/60 text-sm mb-6 flex items-center gap-2">
                  <span className="uppercase tracking-wider">{recognitionOfTheMonth.zone}</span>
                  <span>&bull;</span>
                  <span className="uppercase tracking-wider">Cocina Campechana</span>
                </p>
                
                <p className="text-deep-blue/80 mb-8 leading-relaxed">
                  {recognitionOfTheMonth.description}
                </p>
                
                <Link 
                  to={`/lugares/${recognitionOfTheMonth.slug}`}
                  className="inline-flex items-center justify-between w-full p-4 border border-deep-blue/20 hover:border-terracotta hover:text-terracotta transition-colors group"
                >
                  <span className="font-medium">Leer reseña completa</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Últimos hallazgos */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl font-bold text-deep-blue">Últimos hallazgos</h2>
              <p className="text-deep-blue/60 mt-2 font-light">Nuestras reseñas y guías más recientes</p>
            </div>
            <Link to="/articulos" className="hidden md:flex text-terracotta font-medium hover:text-deep-blue transition-colors items-center gap-1 group">
              Ver todos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <article key={article.id} className="group cursor-pointer">
                <Link to={`/articulos/${article.slug}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-deep-blue/60 mb-3 uppercase tracking-wider">
                    <span>{CATEGORIES.find(c => c.id === article.categoryId)?.name || 'Editorial'}</span>
                    <span>&bull;</span>
                    <span>{article.readTimeMinutes} min de lectura</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-deep-blue group-hover:text-terracotta transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
            <Link to="/articulos" className="inline-flex px-6 py-3 border border-deep-blue/20 text-deep-blue hover:bg-deep-blue hover:text-ivory transition-colors">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Explorar por categoría */}
      <section className="py-24 bg-soft-green/10 border-y border-soft-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-deep-blue">Explorar por categoría</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((category) => (
              <Link 
                key={category.id} 
                to={`/guias/seleccion-fundadora?categoria=${category.slug}`}
                className="flex flex-col items-center justify-center p-8 bg-ivory border border-deep-blue/5 rounded-sm hover:border-terracotta hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 bg-soft-green/20 text-deep-blue rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta group-hover:text-ivory transition-colors">
                  {categoryIcons[category.slug] || <Map className="w-6 h-6" />}
                </div>
                <span className="font-medium text-deep-blue text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Cómo funcionan las huellas */}
      <section className="py-24 bg-deep-blue text-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-12 h-12 text-terracotta mx-auto mb-8" />
          <h2 className="font-serif text-4xl font-bold mb-8">Nuestra metodología</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
            <div className="border border-ivory/20 p-6 rounded-sm">
              <div className="flex gap-1 text-terracotta mb-4">
                <PawPrint className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Recomendado</h3>
              <p className="text-ivory/70 text-sm">Un lugar que destaca por su calidad y que vale la pena visitar.</p>
            </div>
            <div className="border border-ivory/20 p-6 rounded-sm">
              <div className="flex gap-1 text-terracotta mb-4">
                <PawPrint className="w-5 h-5 fill-current" />
                <PawPrint className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Destacado</h3>
              <p className="text-ivory/70 text-sm">Ejecución excepcional. Una experiencia por encima del promedio de la ciudad.</p>
            </div>
            <div className="border border-ivory/20 p-6 rounded-sm bg-ivory/5">
              <div className="flex gap-1 text-terracotta mb-4">
                <PawPrint className="w-5 h-5 fill-current" />
                <PawPrint className="w-5 h-5 fill-current" />
                <PawPrint className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Referente</h3>
              <p className="text-ivory/70 text-sm">Un lugar que define la identidad de Campeche. Visita obligada.</p>
            </div>
          </div>
          
          <div className="bg-terracotta/20 border border-terracotta/30 p-6 rounded-sm">
            <p className="font-medium text-lg mb-2">Lo editorial no está a la venta.</p>
            <p className="text-ivory/80 font-light">
              Las huellas no están a la venta. Los patrocinios financian nuestro trabajo, pero nunca determinan qué lugares aparecen ni cómo son evaluados.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Descubrimiento Patrocinado */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-serif text-2xl font-bold text-deep-blue/50">Contenido Patrocinado</h2>
            <div className="h-px bg-deep-blue/10 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-deep-blue/10 p-6 rounded-sm bg-white relative">
                <div className="absolute top-0 right-0 p-2">
                  <span className="text-[9px] uppercase tracking-wider text-deep-blue/40 border border-deep-blue/10 px-1 py-0.5 bg-gray-50">Demostración</span>
                </div>
                <div className="w-12 h-12 bg-deep-blue/5 rounded-full mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-deep-blue/40" />
                </div>
                <h3 className="font-serif font-bold text-lg text-deep-blue mb-2">Marca Local {i}</h3>
                <p className="text-sm text-deep-blue/60 mb-4">Espacio publicitario disponible para negocios y marcas que deseen apoyar el periodismo independiente.</p>
                <Link to="/patrocinios" className="text-terracotta text-sm font-medium hover:underline">
                  Conocer más
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <section className="py-24 bg-terracotta text-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="w-8 h-8 mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-4xl font-bold mb-6">Recibe nuestros hallazgos</h2>
          <p className="text-lg text-ivory/90 mb-10 font-light">
            Una selección periódica de lugares, rutas y experiencias de Campeche directamente en tu bandeja de entrada.
          </p>
          
          {subscribed ? (
            <div className="bg-ivory/10 border border-ivory/20 p-6 rounded-sm">
              <p className="font-medium text-lg">¡Gracias por suscribirte!</p>
              <p className="text-ivory/80 text-sm mt-2">Pronto recibirás nuestras recomendaciones.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 bg-ivory text-deep-blue w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-deep-blue/50 rounded-sm"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-deep-blue text-ivory font-medium hover:bg-deep-blue/90 transition-colors rounded-sm whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
          )}
          <p className="text-xs text-ivory/60 mt-6">
            Al suscribirte, aceptas nuestro Aviso de Privacidad. Cero spam, garantizado.
          </p>
        </div>
      </section>
    </Layout>
  );
}
