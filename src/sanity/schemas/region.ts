import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'region',
  title: 'Estado o región',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'country', title: 'País', type: 'string', initialValue: 'México', validation: (rule) => rule.required() }),
    defineField({ name: 'countryCode', title: 'Código de país', type: 'string', initialValue: 'MX', validation: (rule) => rule.required().length(2) }),
    defineField({ name: 'stateCode', title: 'Código de estado', type: 'string', description: 'Código ISO 3166-2, por ejemplo MX-JAL.' }),
  ],
  preview: { select: { title: 'name', subtitle: 'country' } },
});
