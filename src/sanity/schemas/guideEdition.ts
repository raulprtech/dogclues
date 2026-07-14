export default {
  name: 'guideEdition',
  title: 'Edición de Guía',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'sponsor',
      title: 'Patrocinador',
      type: 'reference',
      to: [{ type: 'sponsor' }],
    },
    {
      name: 'places',
      title: 'Lugares',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'place' }] }],
    },
  ],
};
