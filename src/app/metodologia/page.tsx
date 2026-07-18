import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Nuestra metodología', description: 'Cómo DogClues descubre, evalúa y reconoce los lugares que dejan huella en Campeche.' };

import { PawPrint, ShieldCheck } from 'lucide-react';

export default function MetodologiaPage() {
  return (
    <main>
      <div className="bg-ivory py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-deep-blue mb-6">Nuestra Metodología</h1>
            <p className="text-xl text-deep-blue/80 font-light leading-relaxed">
              Cómo descubrimos, evaluamos y recomendamos los lugares que hacen especial a Campeche.
            </p>
          </div>

          <div className="prose prose-lg prose-blue max-w-none text-deep-blue/80">
            <p>
              Dogclues nace con la misión de ofrecer una guía confiable, independiente y curada. 
              No somos un directorio exhaustivo ni una plataforma de reseñas abiertas. Somos una publicación editorial.
            </p>

            <h2 className="font-serif text-3xl font-bold text-deep-blue mt-12 mb-6">Criterios de evaluación</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Calidad:</strong> Los ingredientes, la ejecución y el resultado final.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Consistencia:</strong> La experiencia debe ser excelente tanto un martes a mediodía como un sábado por la noche.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Servicio:</strong> Atención genuina, conocimiento del producto y hospitalidad.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Relación calidad-precio:</strong> Independientemente del ticket promedio, la experiencia debe justificar el costo.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Identidad:</strong> Qué hace único al lugar y cómo respeta o innova sobre su concepto.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-terracotta font-bold mt-1">&bull;</span>
                <div>
                  <strong className="text-deep-blue">Relevancia local:</strong> Su impacto y conexión con la comunidad campechana.
                </div>
              </li>
            </ul>

            <div className="bg-soft-green/10 border border-soft-green/20 p-8 rounded-sm my-16">
              <ShieldCheck className="w-10 h-10 text-deep-blue mb-4" />
              <h2 className="font-serif text-2xl font-bold text-deep-blue m-0 mb-4">Lo editorial no está a la venta</h2>
              <p className="m-0 mb-4 text-deep-blue/80">
                Mantenemos una barrera infranqueable entre nuestro contenido editorial y nuestros acuerdos comerciales.
              </p>
              <ul className="space-y-2 mb-0">
                <li>&bull; Los patrocinadores y anunciantes no pueden comprar posiciones en nuestras guías.</li>
                <li>&bull; Las "huellas" no se venden bajo ninguna circunstancia.</li>
                <li>&bull; Aceptamos cortesías e invitaciones para descubrir nuevos lugares, pero esto no garantiza una reseña positiva ni inclusión en la guía.</li>
                <li>&bull; Cuando un contenido es patrocinado, estará clara y explícitamente marcado.</li>
              </ul>
            </div>

            <h2 className="font-serif text-3xl font-bold text-deep-blue mt-12 mb-6">El sistema de Huellas</h2>
            <p>En lugar de estrellas, otorgamos las huellas de Terry a los lugares que alcanzan nuestros estándares:</p>
            
            <div className="space-y-6 mt-8">
              <div className="flex gap-4 items-start">
                <div className="flex gap-1 text-terracotta shrink-0 mt-1 w-16">
                  <PawPrint className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <strong className="text-deep-blue block text-lg">Recomendado</strong>
                  <span className="text-sm">Un lugar que destaca por su calidad y que vale la pena visitar.</span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex gap-1 text-terracotta shrink-0 mt-1 w-16">
                  <PawPrint className="w-5 h-5 fill-current" />
                  <PawPrint className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <strong className="text-deep-blue block text-lg">Destacado</strong>
                  <span className="text-sm">Ejecución excepcional. Una experiencia por encima del promedio de la ciudad.</span>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex gap-1 text-terracotta shrink-0 mt-1 w-16">
                  <PawPrint className="w-5 h-5 fill-current" />
                  <PawPrint className="w-5 h-5 fill-current" />
                  <PawPrint className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <strong className="text-deep-blue block text-lg">Referente</strong>
                  <span className="text-sm">Un lugar que define la identidad de Campeche. Visita obligada.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
