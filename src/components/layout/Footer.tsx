import Link from 'next/link';
import { Instagram, Mail, MapPin, PawPrint } from 'lucide-react';

const editorial = [
  ['El Perro Glotón', '/articulos?seccion=perro-gloton'],
  ['Perro Milpero', '/articulos?seccion=perro-milpero'],
  ['Pata de Perro', '/articulos?seccion=pata-de-perro'],
  ['Buen Olfato', '/articulos?seccion=buen-olfato'],
];

export function Footer() {
  return (
    <footer className="bg-deep-blue text-ivory/90 border-t border-deep-blue/20 pt-16 pb-8">
      <div className="site-shell">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <PawPrint className="h-6 w-6 text-terracotta fill-current" />
              <span className="font-serif font-bold text-2xl tracking-tight text-ivory">DogClues</span>
            </Link>
            <p className="text-sm text-ivory/70 leading-relaxed mb-6">
              Una red de descubrimiento local guiada por el buen olfato y el criterio editorial. Empezamos en Campeche.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ivory/60">
              <MapPin className="w-4 h-4 text-terracotta" /> Campeche, México
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">Las pistas</h3>
            <ul className="space-y-3 text-sm">
              {editorial.map(([name, href]) => (
                <li key={name}><Link href={href} className="hover:text-terracotta transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">DogClues</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/guias/seleccion-fundadora" className="hover:text-terracotta">Guía Campeche</Link></li>
              <li><Link href="/metodologia" className="hover:text-terracotta">Metodología</Link></li>
              <li><Link href="/patrocinios" className="hover:text-terracotta">Patrocinios</Link></li>
              <li><Link href="/privacidad" className="hover:text-terracotta">Privacidad</Link></li>
              <li><a href="mailto:contacto@dogclues.com" className="hover:text-terracotta">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-ivory mb-4">Confianza editorial</h3>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Las huellas reconocen calidad, identidad y relevancia local. No se venden y los patrocinadores no intervienen en la selección.
            </p>
            <Link href="/metodologia" className="inline-block mt-4 text-terracotta text-sm font-medium">
              Conoce nuestros criterios →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between gap-5 text-sm text-ivory/50">
          <p>© {new Date().getFullYear()} DogClues. Buenas pistas, mejores lugares.</p>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="DogClues en Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="mailto:contacto@dogclues.com" aria-label="Enviar correo a DogClues"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
