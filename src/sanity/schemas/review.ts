import { defineField, defineType } from 'sanity';

const scoreField = (name: string, title: string) => defineField({
  name,
  title,
  type: 'number',
  validation: (rule) => rule.min(1).max(5).precision(1),
});

export default defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'place', title: 'Lugar', type: 'reference', to: [{ type: 'place' }], validation: (rule) => rule.required() }),
    defineField({ name: 'critic', title: 'Perfil editorial', type: 'reference', to: [{ type: 'criticProfile' }], validation: (rule) => rule.required() }),
    defineField({ name: 'visitDate', title: 'Fecha de visita', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' }),
    defineField({ name: 'summary', title: 'Resumen', type: 'text', rows: 3, validation: (rule) => rule.required().max(320) }),
    defineField({ name: 'body', title: 'Reseña', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }], validation: (rule) => rule.required() }),
    defineField({
      name: 'scores',
      title: 'Evaluación (1 a 5)',
      type: 'object',
      fields: [
        scoreField('quality', 'Calidad'),
        scoreField('consistency', 'Consistencia'),
        scoreField('service', 'Servicio'),
        scoreField('value', 'Relación calidad-precio'),
        scoreField('identity', 'Identidad local'),
      ],
    }),
    scoreField('overallScore', 'Puntuación general'),
    defineField({ name: 'footprints', title: 'Reconocimiento DogClues', type: 'number', options: { list: [1, 2, 3] }, validation: (rule) => rule.min(1).max(3) }),
    defineField({
      name: 'courtesyStatus',
      title: 'Cortesía o invitación',
      type: 'string',
      initialValue: 'none',
      options: { list: [
        { title: 'Sin cortesía', value: 'none' },
        { title: 'Cortesía parcial', value: 'partial' },
        { title: 'Invitación completa', value: 'full' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'disclosure', title: 'Declaración editorial', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', place: 'place.name', critic: 'critic.displayName' },
    prepare: ({ title, place, critic }) => ({ title, subtitle: [place, critic].filter(Boolean).join(' · ') }),
  },
});
