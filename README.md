# DogClues

![DogClues — Buenas pistas. Mejores lugares.](public/og.png)

**DogClues** es una plataforma editorial de descubrimiento local que ayuda a encontrar restaurantes, experiencias, sitios turísticos, comercios y actividades que realmente vale la pena conocer.

La identidad gira alrededor de **Terry**, un schnauzer sal y pimienta con buen olfato para descubrir lugares especiales, seguir pistas dentro de una ciudad y reconocer negocios con calidad, identidad o relevancia local.

La primera ciudad es **Campeche**. La visión es crecer desde una publicación local hasta una red nacional de guías, fichas verificadas, servicios comunitarios e inteligencia comercial.

## Qué hace diferente a DogClues

DogClues no pretende ser un directorio exhaustivo ni una plataforma de reseñas masivas. Combina:

- Curaduría y criterio editorial independiente.
- Guías locales, rutas y artículos con contexto.
- Reconocimientos propios representados por huellas.
- Participación futura de suscriptores verificados.
- Separación estricta entre recomendaciones y publicidad.
- Una identidad cercana y reconocible protagonizada por Terry.

## Producto actual

La primera versión incluye:

- Portada editorial y explorador de Campeche.
- Selección fundadora de lugares.
- Fichas individuales para restaurantes, experiencias y sitios turísticos.
- Artículos y rutas editoriales.
- Filtros por categorías.
- Metadatos por página, Open Graph, sitemap y robots.
- Diseño responsivo inspirado en publicaciones de viajes y plataformas modernas de descubrimiento.

## Universo editorial

| Sección | Enfoque |
| --- | --- |
| **El Perro Glotón** | Restaurantes, cafeterías, mercados, bares y gastronomía. |
| **Perro Milpero** | Cocina tradicional, ingredientes, productores y patrimonio. |
| **Pata de Perro** | Turismo, rutas, escapadas, naturaleza y experiencias. |
| **Buen Olfato** | Aperturas, proyectos emergentes y descubrimientos tempranos. |
| **Perro de Barrio** | Guías por colonias, zonas, barrios y municipios. |
| **Huella Local** | Comercios, artesanos, marcas y proyectos independientes. |

## Sistema de huellas

Las huellas son reconocimientos editoriales, no calificaciones comprables.

- **Una huella — Recomendado:** una experiencia sólida que vale la pena conocer.
- **Dos huellas — Destacado:** consistencia, identidad clara o una propuesta superior.
- **Tres huellas — Referente:** un lugar capaz de representar lo mejor de la ciudad y justificar una visita.

Los patrocinadores no seleccionan establecimientos, no asignan huellas y no modifican reconocimientos.

## Arquitectura

- **Frontend público:** Next.js 15 App Router.
- **Interfaz:** React 19 + Tailwind CSS 4.
- **Contenido editorial:** Sanity.
- **Comunidad y operaciones futuras:** Supabase.
- **Analítica:** Umami.
- **Despliegue previsto:** Netlify o cualquier plataforma compatible con Next.js.

Next.js genera HTML indexable y metadatos propios para cada guía, artículo y lugar. El prototipo utiliza datos locales de respaldo en `src/lib/data.ts`; el cliente de Sanity está preparado en `src/lib/sanity.ts`.

### Responsabilidades

- **Sanity** administra lo que DogClues publica.
- **Supabase** administrará lo que lectores y negocios hacen.
- **Umami** mide el uso del sitio respetando la privacidad.

## Rutas principales

| Ruta | Contenido |
| --- | --- |
| `/` | Portada y descubrimiento. |
| `/guias/seleccion-fundadora` | Primera guía de Campeche. |
| `/lugares/[slug]` | Fichas de lugares. |
| `/articulos` | Índice editorial. |
| `/articulos/[slug]` | Artículos y rutas. |
| `/metodologia` | Criterios y sistema de huellas. |
| `/patrocinios` | Formatos comerciales y política de independencia. |

## Desarrollo local

El repositorio se encuentra en la distribución WSL **Ubuntu**:

```text
\\wsl.localhost\Ubuntu\home\raulprtech\dogclues
```

Ruta Linux equivalente:

```bash
/home/raulprtech/dogclues
```

### Requisitos

- Node.js 22.13 o superior.
- npm 10 o superior.

```bash
nvm use
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Validación

```bash
npm run lint
npm run build
```

## Variables de entorno

Copia `.env.example` como `.env.local` y configura únicamente los servicios que utilizarás.

```bash
cp .env.example .env.local
```

Variables disponibles:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`

El sitio funciona con contenido de demostración cuando estas variables no están configuradas.

## Estructura relevante

```text
public/
  og.png
  terry-campeche.png
src/
  app/                  Rutas y metadatos de Next.js
  components/           Componentes editoriales y navegación
  lib/data.ts           Contenido local de demostración
  lib/sanity.ts         Cliente de Sanity
  sanity/               Esquemas del CMS
  types/                Tipos del dominio
```

## Evolución prevista

1. Publicación editorial y selección fundadora de Campeche.
2. Newsletter, guías patrocinadas y votaciones verificadas.
3. Fichas gratuitas y reclamables para negocios.
4. Promociones, eventos, contactos y estadísticas.
5. Huella Alerta y servicios comunitarios para perros.
6. DogClues Insights y expansión a nuevas ciudades.

---

**Principio editorial:** las huellas no se venden. Los espacios comerciales siempre deben estar identificados y separados de las recomendaciones.
