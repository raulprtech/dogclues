import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'city',
  title: 'Ciudad o destino',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre público', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'region', title: 'Estado o región', type: 'reference', to: [{ type: 'region' }], validation: (rule) => rule.required() }),
    defineField({ name: 'municipality', title: 'Municipio', type: 'string' }),
    defineField({ name: 'areaName', title: 'Área metropolitana o zona editorial', type: 'string' }),
    defineField({
      name: 'coverageStatus',
      title: 'Estado de cobertura',
      type: 'string',
      initialValue: 'planned',
      options: { list: [
        { title: 'Cobertura activa', value: 'active' },
        { title: 'Próximamente', value: 'planned' },
        { title: 'Archivada', value: 'archived' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'searchAliases', title: 'Nombres alternativos de búsqueda', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'description', title: 'Descripción editorial', type: 'text', rows: 3 }),
    defineField({ name: 'priority', title: 'Prioridad editorial', type: 'number', initialValue: 100, validation: (rule) => rule.integer().min(1) }),
  ],
  orderings: [{ title: 'Prioridad editorial', name: 'priorityAsc', by: [{ field: 'priority', direction: 'asc' }] }],
  preview: { select: { title: 'name', region: 'region.name', status: 'coverageStatus' }, prepare: ({ title, region, status }) => ({ title, subtitle: [region, status].filter(Boolean).join(' · ') }) },
});
