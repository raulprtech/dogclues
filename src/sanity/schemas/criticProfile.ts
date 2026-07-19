import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'criticProfile',
  title: 'Perfil editorial',
  type: 'document',
  fields: [
    defineField({ name: 'displayName', title: 'Nombre público', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'displayName', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({
      name: 'identityMode',
      title: 'Identidad pública',
      type: 'string',
      initialValue: 'dogPersona',
      options: { list: [
        { title: 'Personaje canino', value: 'dogPersona' },
        { title: 'Nombre real', value: 'realName' },
        { title: 'Equipo DogClues', value: 'team' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'image', title: 'Imagen pública', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Descripción pública', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: 'specialties', title: 'Especialidades', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'foundingProfile', title: 'Perfil fundador', type: 'boolean', initialValue: false }),
    defineField({ name: 'active', title: 'Activo', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'displayName', subtitle: 'identityMode', media: 'image' },
  },
});
