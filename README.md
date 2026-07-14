# Campeche360

Guía editorial independiente para descubrir los mejores restaurantes, experiencias y negocios de Campeche, México.

## Arquitectura

* **Frontend:** React (Vite SPA) + React Router + Tailwind CSS v4.
* **Base de datos Operativa (Preparado):** Supabase.
* **CMS Editorial (Preparado):** Sanity.
* **Analítica (Preparado):** Umami.
* **SEO:** React Helmet Async.
* **Estilos:** Tailwind CSS con directivas modernas.

> **Nota sobre el entorno:** Aunque se solicitó Next.js, por restricciones de la plataforma de desarrollo (AI Studio Build), el proyecto fue construido sobre Vite + React (SPA). Sin embargo, se mantiene una estructura de directorios, enrutamiento y arquitectura de componentes limpia que facilita una eventual migración a Next.js (App Router) si se requiere en el futuro. Las funcionalidades solicitadas como Draft Mode y React Server Components aplican principalmente a un entorno Next.js y se han adaptado para que funcionen con la SPA actual de manera estática y con la inclusión del Studio.

## Requisitos

* Node.js >= 18.0.0
* npm >= 9.0.0

## Comandos Disponibles

### Instalación
```bash
npm install
```

### Desarrollo Local
```bash
npm run dev
```

### Compilación (Producción)
```bash
npm run build
```

### Lint (Análisis estático)
```bash
npm run lint
```

## Configuración de Entornos y Despliegue en Netlify

Crea un archivo `.env.local` basado en `.env.example`.

El proyecto está preconfigurado para desplegarse fácilmente en Netlify.

1. Sube este repositorio a GitHub.
2. Crea un nuevo sitio en Netlify y conéctalo a tu repositorio.
3. Configura las siguientes variables de entorno en *Site settings > Environment variables* en Netlify (las mismas de tu `.env.local`).

### 1. Headless CMS: Sanity (Contenido Editorial)

Sanity se utilizará para manejar todo el contenido editorial (Artículos, Ediciones, Guías, Patrocinios).

**Variables de entorno:**
* `VITE_SANITY_PROJECT_ID`: Tu Project ID de Sanity.
* `VITE_SANITY_DATASET`: Por defecto `production`.

**Configuración del Studio:**
El Sanity Studio se ha embebido dentro del proyecto en la ruta `/studio`.
Asegúrate de agregar la URL de tu sitio de Netlify (y `http://localhost:3000` para desarrollo) en los orígenes CORS dentro de tu proyecto en la plataforma de Sanity (`sanity.io/manage`).

**Webhooks de Publicación:**
Para revalidar el contenido publicado, puedes crear un Webhook en Sanity apuntando a un Build Hook de Netlify.
URL del Webhook (Netlify): `https://api.netlify.com/build_hooks/TU_ID_DE_HOOK`
Filtro en Sanity: `*[_type in ["article", "place", "guideEdition", "sponsorship"]]`

### 2. Analítica: Umami

Umami se integra de forma respetuosa con la privacidad, sin rastrear información personal y solo usando eventos clave de interacción editorial.

**Variables de entorno:**
* `VITE_UMAMI_WEBSITE_ID`: ID del sitio en tu dashboard de Umami.
* `VITE_UMAMI_SCRIPT_URL`: URL del script, ej: `https://umami.tudominio.com/script.js`.

**Nota:** Si estas variables no están presentes, la aplicación funcionará normalmente pero sin enviar datos a Umami. En modo desarrollo, los eventos se imprimirán por consola.

### 3. Base de Datos Operativa: Supabase

Supabase está reservado para una etapa futura del proyecto orientada al aspecto comercial/operativo (no editorial), tales como:
* `business_accounts`
* `business_claims`
* `verified_businesses`
* `users`
* `leads`

**Variables de entorno:**
* `VITE_SUPABASE_URL`: La URL de tu proyecto en Supabase (ej: https://xyz.supabase.co)
* `VITE_SUPABASE_ANON_KEY`: La clave pública anon de tu proyecto.

> **Importante - Separación de Preocupaciones:** 
> El contenido *editorial* y de presentación vive exclusivamente en Sanity. Sanity tiene esquemas como `place` que incluyen un campo `optionalBusinessId`. Este campo será el enlace en un futuro para conectar la pieza editorial en Sanity con la cuenta de la entidad comercial en Supabase. Supabase NO duplicará el contenido de texto, categorías ni fotografías.

