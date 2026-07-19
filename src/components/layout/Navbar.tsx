'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Menu, PawPrint, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Descubrir', href: '/' },
  { name: 'Destinos', href: '/buscar' },
  { name: 'Acerca', href: '/acerca' },
  { name: 'Para negocios', href: '/postula-tu-negocio' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/' ;

  return (
    <header className="site-header">
      <div className="site-shell nav-shell">
        <Link href="/" className="brand" aria-label="DogClues, inicio">
          <span className="brand-mark"><PawPrint aria-hidden="true" /></span>
          <span className="brand-word">DogClues</span>
          <span className="brand-city">México</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href} className={cn('nav-link', active && 'is-active')}>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <Link href="/buscar" className="mini-search" aria-label="Buscar ciudades y lugares">
            <MapPin aria-hidden="true" />
            <span>Buscar ciudad</span>
            <span className="mini-search-icon"><Search aria-hidden="true" /></span>
          </Link>
          <button
            className="mobile-menu-button"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="mobile-nav" aria-label="Navegación móvil">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
