# DogClues

Plataforma editorial de descubrimiento local guiada por Terry, un schnauzer sal y pimienta con buen olfato para encontrar lugares que merecen ser conocidos.

La primera ciudad es Campeche. El producto combina guías editoriales, fichas de lugares, historias, reconocimientos por huellas y una futura comunidad de suscriptores.

## Arquitectura

- **Sitio público:** Next.js 15 App Router + React 19 + Tailwind CSS 4.
- **Contenido editorial:** Sanity.
- **Comunidad y operaciones futuras:** Supabase.
- **Analítica:** Umami.
- **Despliegue previsto:** Netlify o cualquier plataforma compatible con Next.js.

Next.js genera rutas indexables y metadatos propios para cada guía, artículo y lugar. El contenido inicial vive en `src/lib/data.ts` para que el prototipo funcione sin credenciales; la conexión con Sanity está preparada en `src/lib/sanity.ts`.

## Requisitos

- Node.js 22.13 o superior.
- npm 10 o superior.

Con nvm:

```bash
nvm install 22.13
nvm use 22.13
```

## Desarrollo

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

## Validación

```bash
npm run lint
npm run build
```

## Variables de entorno

Copia `.env.example` como `.env.local` y configura solamente los servicios que vayas a utilizar.

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`

El sitio funciona con datos de demostración cuando estos valores no están presentes.

## Modelo editorial

Sanity administra lo que DogClues publica: artículos, lugares, guías, reconocimientos y patrocinadores.

Supabase administrará lo que las personas y negocios hacen: suscripciones, votos, reclamos de fichas, cuentas y métricas privadas.

Umami mide cómo se utiliza el sitio sin convertir datos personales en un producto.

## Evolución prevista

1. Publicación editorial y selección fundadora de Campeche.
2. Guías patrocinadas, newsletter y votaciones verificadas.
3. Fichas gratuitas y reclamables para negocios.
4. Promociones, eventos, contactos y estadísticas.
5. DogClues Insights y expansión a nuevas ciudades.

Las huellas editoriales nunca se venden. Los espacios comerciales deben permanecer claramente identificados y separados de las recomendaciones.
