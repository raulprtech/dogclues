import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Artículo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'subtitle', title: 'Bajada', type: 'text', rows: 2, validation: (rule) => rule.max(240) }),
    defineField({ name: 'category', title: 'Categoría', type: 'reference', to: [{ type: 'category' }], validation: (rule) => rule.required() }),
    defineField({ name: 'city', title: 'Ciudad principal', type: 'reference', to: [{ type: 'city' }], validation: (rule) => rule.required() }),
    defineField({ name: 'author', title: 'Perfil editorial', type: 'reference', to: [{ type: 'criticProfile' }], validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'readTimeMinutes', title: 'Tiempo de lectura', type: 'number', validation: (rule) => rule.required().integer().min(1) }),
    defineField({ name: 'mainImage', title: 'Imagen principal', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'credit', title: 'Crédito', type: 'string' }),
    ], validation: (rule) => rule.required() }),
    defineField({ name: 'content', title: 'Contenido', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
        defineField({ name: 'credit', title: 'Crédito', type: 'string' }),
      ] },
    ], validation: (rule) => rule.required() }),
    defineField({ name: 'relatedPlaces', title: 'Lugares relacionados', type: 'array', of: [{ type: 'reference', to: [{ type: 'place' }] }] }),
    defineField({ name: 'courtesyDeclaration', title: 'Declaración de cortesía', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Destacar en portada', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Más recientes', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'author.displayName', media: 'mainImage' } },
});
