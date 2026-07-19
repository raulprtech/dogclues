# DogClues

![DogClues — Buenas pistas. Mejores lugares.](public/og.png)

DogClues es una revista digital de descubrimiento local para encontrar restaurantes, experiencias, lugares turísticos y comercios que realmente vale la pena conocer. La primera edición se concentra en Campeche.

## Prioridad de lanzamiento

El producto está preparado alrededor de tres sistemas con responsabilidades separadas:

- **Sanity** es la fuente de verdad para artículos, lugares, guías, perfiles editoriales y reseñas.
- **Supabase** recibe suscripciones, conserva evidencia de consentimiento y aloja controles operativos de calidad.
- **Umami** mide lecturas, profundidad de lectura, vistas de lugares, aperturas de guías y filtros sin enviar correos ni otros datos personales.

Cuando Sanity aún no tiene contenido publicado, el sitio conserva datos de muestra para evitar páginas vacías. Las fichas procedentes de ese respaldo se identifican como contenido de muestra.

## Flujo editorial

El Studio está integrado en `/studio`. Los documentos disponibles son:

- Categorías.
- Perfiles editoriales públicos, incluida la opción de identidad canina.
- Lugares con fecha de verificación, fuente interna y datos estructurados.
- Artículos con Portable Text y declaraciones de cortesía.
- Reseñas con cinco dimensiones de evaluación y huellas.
- Ediciones de guía y patrocinadores.

La identidad real y privada de un crítico no debe almacenarse en el documento público de Sanity.

## Base de datos y calidad

Las migraciones se encuentran en `supabase/migrations`.

- `001_initial_schema.sql` conserva el prototipo histórico.
- `002_launch_foundation.sql` cierra el acceso público a suscripciones y añade consentimiento versionado, registro de fuentes, verificaciones de calidad y trazabilidad de importaciones.

Sanity mantiene el contenido editorial. Supabase no debe convertirse en una segunda copia manual de artículos o lugares.

## Configuración de producción

Configura en Netlify las variables descritas en `.env.example`. Las imprescindibles para el lanzamiento son:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `PRIVACY_NOTICE_VERSION`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`

`SANITY_API_READ_TOKEN` solo es necesario si el dataset no permite lectura pública. La clave secreta de Supabase se usa exclusivamente en el servidor y nunca debe llevar el prefijo `NEXT_PUBLIC_`.

La secuencia exacta de activación y comprobación está en [docs/launch-checklist.md](docs/launch-checklist.md).

## Rutas principales

| Ruta | Contenido |
| --- | --- |
| `/` | Portada editorial y suscripción. |
| `/studio` | Administración de Sanity. |
| `/guias/[slug]` | Ediciones publicadas. |
| `/lugares/[slug]` | Fichas verificadas. |
| `/articulos` | Índice editorial. |
| `/articulos/[slug]` | Artículos y rutas. |
| `/metodologia` | Criterios y sistema de huellas. |
| `/privacidad` | Tratamiento simplificado de datos. |

## Principio editorial

Las huellas no se venden. Los espacios comerciales siempre se identifican y se mantienen separados de las recomendaciones.
