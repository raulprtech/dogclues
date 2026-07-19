export const editorialSections = [
  {
    name: 'El Perro Glotón',
    slug: 'perro-gloton',
    note: 'Restaurantes, cafés, mercados y antojos.',
    description: 'Historias para comer bien: mesas con carácter, antojos memorables y sobremesas que justifican la vuelta.',
    image: '/editorial/perro-gloton.webp',
    imageAlt: 'Schnauzer satisfecho mostrando la panza después de comer',
    tone: 'coral',
  },
  {
    name: 'Perro Milpero',
    slug: 'perro-milpero',
    note: 'Cocina tradicional, productores y patrimonio.',
    description: 'La cocina como memoria: ingredientes, manos productoras y recetas que explican un territorio.',
    image: '/editorial/perro-milpero.webp',
    imageAlt: 'Xoloitzcuintle entre maíz y productos de una milpa',
    tone: 'maiz',
  },
  {
    name: 'Pata de Perro',
    slug: 'pata-de-perro',
    note: 'Rutas, escapadas y experiencias locales.',
    description: 'Recorridos para salir con intención, desde una caminata de barrio hasta una escapada de fin de semana.',
    image: '/editorial/pata-de-perro.webp',
    imageAlt: 'Schnauzer viajero con mochila, paliacate y mapa',
    tone: 'sea',
  },
  {
    name: 'Buen Olfato',
    slug: 'buen-olfato',
    note: 'Aperturas y proyectos antes de que todos hablen de ellos.',
    description: 'Nuevos proyectos, aperturas y señales que vale la pena seguir antes de que se vuelvan evidentes.',
    image: '/editorial/buen-olfato.webp',
    imageAlt: 'Beagle siguiendo una pista aromática por una calle',
    tone: 'sage',
  },
  {
    name: 'Perro de Barrio',
    slug: 'perro-de-barrio',
    note: 'Guías por colonias, zonas y municipios.',
    description: 'La ciudad a escala de calle: lugares cotidianos, vecinos y rutas que construyen identidad local.',
    image: '/editorial/perro-de-barrio.webp',
    imageAlt: 'Perro mestizo caminando entre fachadas de un barrio',
    tone: 'blue',
  },
  {
    name: 'Huella Local',
    slug: 'huella-local',
    note: 'Comercios, artesanos y marcas independientes.',
    description: 'Personas y negocios independientes que convierten oficio, diseño y comunidad en una propuesta propia.',
    image: '/editorial/huella-local.webp',
    imageAlt: 'Golden retriever entre artesanías y objetos de productores locales',
    tone: 'rose',
  },
] as const;

export type EditorialSectionSlug = (typeof editorialSections)[number]['slug'];

export function getEditorialSection(slug?: string) {
  return editorialSections.find((section) => section.slug === slug);
}
