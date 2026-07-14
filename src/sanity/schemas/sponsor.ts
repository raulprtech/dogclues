export default {
  name: 'sponsor',
  title: 'Patrocinador',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Principal', value: 'main' },
          { title: 'Categoría', value: 'category' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'link',
      title: 'Enlace web',
      type: 'url',
    },
  ],
};
