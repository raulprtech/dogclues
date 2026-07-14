import React from 'react';
import { Layout } from '../components/layout/Layout';
import { SEO } from '../components/SEO';
import { Mail } from 'lucide-react';

export default function PatrociniosPage() {
  return (
    <Layout>
      <SEO title="Patrocinios y Alianzas" />
      <div className="bg-ivory py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-terracotta uppercase tracking-widest text-sm font-bold mb-4 block">Marcas y Empresas</span>
            <h1 className="font-serif text-5xl font-bold text-deep-blue mb-6">Patrocinios</h1>
            <p className="text-xl text-deep-blue/80 font-light leading-relaxed max-w-2xl mx-auto">
              Conecta con una audiencia cautiva que busca lo mejor de Campeche, respaldando el periodismo independiente.
            </p>
          </div>

          <div className="bg-deep-blue text-ivory p-8 md:p-12 rounded-sm mb-16">
            <h2 className="font-serif text-2xl font-bold mb-4">Las marcas patrocinan la edición, no los resultados.</h2>
            <p className="text-ivory/80 leading-relaxed">
              Dogclues es una publicación basada en la confianza. Nuestros patrocinadores entienden y respetan nuestra política editorial estricta: los espacios comerciales financian la operación, pero no otorgan influencia sobre quién recibe una reseña, una huella o una posición en nuestras guías.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="font-serif text-2xl font-bold text-deep-blue mb-4">La Audiencia</h3>
              <p className="text-deep-blue/80 mb-6">
                Llegamos a residentes exigentes y turistas que buscan experiencias de calidad, gastronomía excepcional y propuestas de valor en Campeche.
              </p>
              <ul className="space-y-3 text-sm text-deep-blue/70">
                <li className="flex items-center gap-2 border-b border-deep-blue/10 pb-2">
                  <span className="font-bold text-terracotta">Perfil:</span> Residentes locales, profesionales y viajeros con presupuesto para experiencias.
                </li>
                <li className="flex items-center gap-2 border-b border-deep-blue/10 pb-2">
                  <span className="font-bold text-terracotta">Intereses:</span> Gastronomía, diseño, cultura, turismo de experiencia.
                </li>
              </ul>
              <p className="text-xs text-deep-blue/50 mt-4 italic">
                *Datos iniciales del prototipo. Los reportes de alcance se entregan post-edición.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-deep-blue mb-4">Formatos</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-deep-blue">Patrocinador Principal</h4>
                  <p className="text-sm text-deep-blue/70">Presencia destacada en la portada de la edición, menciones en artículos y en el newsletter quincenal.</p>
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue">Patrocinador de Categoría</h4>
                  <p className="text-sm text-deep-blue/70">Asocia tu marca exclusivamente a una categoría (ej. "Experiencias presentadas por Marca").</p>
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue">Aliado de Lanzamiento</h4>
                  <p className="text-sm text-deep-blue/70">Paquetes introductorios para empresas que apoyan el nacimiento de la plataforma.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-deep-blue/10 bg-white p-8 md:p-12 text-center rounded-sm">
            <h3 className="font-serif text-2xl font-bold text-deep-blue mb-4">Hablemos</h3>
            <p className="text-deep-blue/80 mb-8 max-w-lg mx-auto">
              Si tu marca comparte nuestros valores y deseas conocer el media kit, escríbenos.
            </p>
            <a 
              href="mailto:comercial@dogclues.com" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-deep-blue text-ivory font-medium hover:bg-deep-blue/90 transition-colors rounded-sm"
            >
              <Mail className="w-5 h-5" />
              Solicitar Media Kit
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
