import { type SchemaTypeDefinition } from 'sanity'
import article from './schemas/article'
import place from './schemas/place'
import { sponsorship } from './schemas/sponsorship'
import { author, category, zone, sponsor } from './schemas/core'
import { guideEdition, guideSection, award, footprintRating, methodologyPage, siteSettings, terryContent } from './schemas/other'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    article,
    author,
    place,
    category,
    zone,
    guideEdition,
    guideSection,
    sponsor,
    sponsorship,
    award,
    footprintRating,
    methodologyPage,
    siteSettings,
    terryContent
  ],
}
