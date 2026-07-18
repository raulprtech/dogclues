'use client';

import React, { useState } from 'react';
import { GUIDE_EDITIONS, PLACES, CATEGORIES, SPONSORS } from '../../lib/data';
import { PawPrint, MapPin, Filter } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  const guide = GUIDE_EDITIONS[0]; // Assuming only one for the prototype
  const sponsor = SPONSORS.find(s => s.id === guide.sponsorId);
  const places = PLACES.filter(p => guide.places.includes(p.id));
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPlaces = selectedCategory 
    ? places.filter(p => p.categoryId === selectedCategory)
    : places;

  return (
    <main>
      
      {/* Cover Header */}
      <div className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img 
            src={guide.coverImageUrl} 
            alt={guide.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          {sponsor && (
            <div className="mb-6 inline-flex items-center gap-2 border border-ivory/20 px-3 py-1 text-xs uppercase tracking-widest text-ivory/80 bg-deep-blue/40 backdrop-blur-sm rounded-sm">
              <span>Edición presentada por</span>
              <span className="font-bold text-ivory">{sponsor.name}</span>
            </div>
          )}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-4">
            {guide.title}
          </h1>
          <p className="font-serif italic text-2xl md:text-3xl text-terracotta max-w-3xl">
            {guide.subtitle}
          </p>
        </div>
      </div>

      <div className="bg-ivory border-b border-deep-blue/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-xl text-deep-blue/80 leading-relaxed font-light mb-8">
            {guide.description}
          </p>
          <div className="inline-flex flex-col items-center p-6 bg-soft-green/10 border border-soft-green/20 rounded-sm">
            <h3 className="font-bold text-deep-blue mb-2 uppercase tracking-wider text-sm">Metodología Breve</h3>
            <p className="text-sm text-deep-blue/70 mb-4 max-w-md">
              Evaluamos calidad, consistencia, servicio, relación calidad-precio y relevancia local.
            </p>
            <Link href="/metodologia" className="text-terracotta text-sm font-medium hover:underline">
              Conocer criterios de evaluación &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Places List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <h2 className="font-serif text-3xl font-bold text-deep-blue">
            {filteredPlaces.length} Lugares
          </h2>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-deep-blue/60 shrink-0" />
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-sm whitespace-nowrap rounded-sm transition-colors border ${
                selectedCategory === null 
                  ? 'bg-deep-blue text-ivory border-deep-blue' 
                  : 'bg-transparent text-deep-blue border-deep-blue/20 hover:border-deep-blue'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map(category => (
              <button 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-sm transition-colors border ${
                  selectedCategory === category.id 
                    ? 'bg-deep-blue text-ivory border-deep-blue' 
                    : 'bg-transparent text-deep-blue border-deep-blue/20 hover:border-deep-blue'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => {
            const category = CATEGORIES.find(c => c.id === place.categoryId);
            return (
              <div key={place.id} className="group flex flex-col bg-white border border-deep-blue/10 overflow-hidden hover:shadow-md transition-shadow rounded-sm relative">
                <div className="absolute top-0 right-0 p-3 z-10">
                  <span className="text-[9px] uppercase tracking-wider text-deep-blue/60 border border-deep-blue/10 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-sm">Demostración</span>
                </div>
                
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={place.imageUrl} 
                    alt={place.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-0.5 text-terracotta">
                      {place.footprints ? (
                        [...Array(place.footprints)].map((_, i) => (
                          <PawPrint key={i} className="w-4 h-4 fill-current" />
                        ))
                      ) : (
                        <span className="text-xs text-deep-blue/40 uppercase tracking-wider">Mención</span>
                      )}
                    </div>
                    <span className="text-xs text-deep-blue/60 font-medium tracking-wider uppercase">
                      {category?.name}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-deep-blue mb-2">
                    {place.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-sm text-deep-blue/60 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider text-xs">{place.zone}</span>
                  </div>
                  
                  <p className="text-deep-blue/80 text-sm leading-relaxed mb-6 flex-grow">
                    {place.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-deep-blue/10">
                    <Link 
                      href={`/lugares/${place.slug}`}
                      className="text-terracotta text-sm font-medium hover:text-deep-blue transition-colors flex items-center gap-1"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
