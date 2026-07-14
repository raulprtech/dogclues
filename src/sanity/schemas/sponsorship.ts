import { defineType, defineField } from 'sanity';

export const sponsorship = defineType({
  name: 'sponsorship',
  title: 'Sponsorship',
  type: 'document',
  fields: [
    defineField({ name: 'sponsor', title: 'Sponsor', type: 'reference', to: [{ type: 'sponsor' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'guideEdition', title: 'Guide Edition', type: 'reference', to: [{ type: 'guideEdition' }] }),
    defineField({ 
      name: 'sponsorshipLevel', 
      title: 'Sponsorship Level', 
      type: 'string',
      options: { list: ['main', 'category', 'launch'] }
    }),
    defineField({ name: 'placement', title: 'Placement', type: 'string' }),
    defineField({ name: 'campaignStart', title: 'Campaign Start', type: 'datetime' }),
    defineField({ name: 'campaignEnd', title: 'Campaign End', type: 'datetime' }),
    defineField({ name: 'disclosureText', title: 'Disclosure Text', type: 'string' }),
    defineField({ name: 'destinationUrl', title: 'Destination URL', type: 'url' }),
    defineField({ name: 'utmCampaign', title: 'UTM Campaign', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
});
