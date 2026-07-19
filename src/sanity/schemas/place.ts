import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'place',
  title: "Ficha de negocio o lugar",
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Categoría', type: 'reference', to: [{ type: 'category' }], validation: (rule) => rule.required() }),
    defineField({ name: 'city', title: 'Ciudad o destino', type: 'reference', to: [{ type: 'city' }], validation: (rule) => rule.required() }),
    defineField({ name: 'zone', title: 'Zona', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Descripción editorial', type: 'text', rows: 5, validation: (rule) => rule.required().max(700) }),
    defineField({ name: 'footprints', title: 'Huellas DogClues', type: 'number', description: 'Reconocimiento editorial de 1 a 3 huellas.', options: { list: [1, 2, 3] }, validation: (rule) => rule.min(1).max(3) }),
    defineField({ name: 'averageScore', title: 'Puntuación editorial', type: 'number', description: 'Promedio aprobado de reseñas, de 1 a 5.', validation: (rule) => rule.min(1).max(5).precision(1) }),
    defineField({ name: 'image', title: 'Imagen principal', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'credit', title: 'Crédito', type: 'string' }),
    ], validation: (rule) => rule.required() }),
    defineField({ name: 'address', title: 'Dirección', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'location', title: 'Coordenadas', type: 'geopoint' }),
    defineField({ name: 'phone', title: 'Teléfono', type: 'string' }),
    defineField({ name: 'website', title: 'Sitio web', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'priceRange', title: 'Rango de precio', type: 'string', options: { list: ['$', '$$', '$$$', '$$$$'] } }),
    defineField({ name: 'openingHours', title: 'Horarios', type: 'text', rows: 4 }),
    defineField({ name: 'operatingStatus', title: 'Estado', type: 'string', initialValue: 'open', options: { list: [
      { title: 'Abierto', value: 'open' },
      { title: 'Temporalmente cerrado', value: 'temporarilyClosed' },
      { title: 'Cerrado', value: 'closed' },
    ] }, validation: (rule) => rule.required() }),
    defineField({ name: 'lastVerifiedAt', title: 'Última verificación', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'sourceNotes', title: 'Fuente y notas de verificación', type: 'text', rows: 3, description: 'Uso interno: procedencia, evidencia y cambios pendientes.' }),
  ],
  orderings: [{ title: 'Verificación más reciente', name: 'verifiedDesc', by: [{ field: 'lastVerifiedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'zone', media: 'image' } },
});
