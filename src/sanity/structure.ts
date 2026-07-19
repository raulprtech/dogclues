import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const documentList = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title));

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Contenido de DogClues')
    .items([
      documentList(S, 'place', 'Fichas de negocios y lugares'),
      documentList(S, 'article', 'Artículos del blog'),
      documentList(S, 'guideEdition', 'Ediciones de la revista'),
      S.divider(),
      S.listItem()
        .title('Evaluación editorial')
        .child(
          S.list()
            .title('Evaluación editorial')
            .items([
              documentList(S, 'review', 'Reseñas y evaluaciones'),
              documentList(S, 'criticProfile', 'Perfiles editoriales'),
              documentList(S, 'award', 'Reconocimientos'),
            ]),
        ),
      S.listItem()
        .title('Territorios y taxonomías')
        .child(
          S.list()
            .title('Territorios y taxonomías')
            .items([
              documentList(S, 'region', 'Estados y regiones'),
              documentList(S, 'city', 'Ciudades y destinos'),
              documentList(S, 'category', 'Categorías'),
            ]),
        ),
      S.listItem()
        .title('Otros contenidos')
        .child(
          S.list()
            .title('Otros contenidos')
            .items([documentList(S, 'sponsor', 'Patrocinadores')]),
        ),
    ]);
