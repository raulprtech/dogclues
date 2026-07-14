import { defineType, defineField } from 'sanity';

export const guideEdition = defineType({
  name: 'guideEdition', title: 'Guide Edition', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image' })
  ]
});

export const guideSection = defineType({
  name: 'guideSection', title: 'Guide Section', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'guideEdition', title: 'Guide Edition', type: 'reference', to: [{type: 'guideEdition'}] }),
    defineField({ name: 'description', title: 'Description', type: 'text' })
  ]
});

export const award = defineType({
  name: 'award', title: 'Award', type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon', type: 'image' })
  ]
});

export const footprintRating = defineType({
  name: 'footprintRating', title: 'Footprint Rating', type: 'document',
  fields: [
    defineField({ name: 'level', title: 'Level', type: 'number', options: { list: [1, 2, 3] } }),
    defineField({ name: 'description', title: 'Description', type: 'text' })
  ]
});

export const methodologyPage = defineType({
  name: 'methodologyPage', title: 'Methodology Page', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] })
  ]
});

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Site Description', type: 'text' })
  ]
});

export const terryContent = defineType({
  name: 'terryContent', title: 'Terry Content', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'text' }),
    defineField({ name: 'relatedPlace', title: 'Related Place', type: 'reference', to: [{type: 'place'}] })
  ]
});
