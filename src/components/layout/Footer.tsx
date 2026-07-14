import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-deep-blue text-ivory/90 border-t border-deep-blue/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <PawPrint className="h-6 w-6 text-terracotta group-hover:scale-110 transition-transform" />
              <span className="font-serif font-bold text-2xl tracking-tight text-ivory">
                Dogclues
              </span>
            </Link>
            <p className="text-sm text-ivory/70 leading-relaxed mb-6">
              Una guía editorial independiente para descubrir los mejores restaurantes, 
              experiencias y atractivos turísticos de Campeche.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-ivory/70 hover:text-terracotta transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-ivory/70 hover:text-terracotta transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contacto@dogclues.com" className="text-ivory/70 hover:text-terracotta transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">Navegación</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-terracotta transition-colors">Inicio</Link></li>
              <li><Link to="/guias/seleccion-fundadora" className="hover:text-terracotta transition-colors">Guías</Link></li>
              <li><Link to="/metodologia" className="hover:text-terracotta transition-colors">Metodología</Link></li>
              <li><Link to="/patrocinios" className="hover:text-terracotta transition-colors">Patrocinios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-terracotta transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Política Editorial</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">Transparencia</h3>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Mantenemos una estricta separación entre publicidad y contenido editorial. 
              Las marcas no pueden comprar posiciones ni huellas de reconocimiento.
            </p>
            <Link to="/metodologia" className="inline-block mt-4 text-terracotta hover:text-ivory transition-colors text-sm font-medium">
              Conoce nuestra metodología &rarr;
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ivory/50">
            &copy; {new Date().getFullYear()} Dogclues. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-ivory/50">
            <span>Hecho con criterio independiente en Campeche, México.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
