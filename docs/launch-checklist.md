# Checklist de lanzamiento editorial

## 1. Sanity

- Crear o confirmar el proyecto y el dataset `production`.
- Autorizar en CORS el dominio de producción de DogClues con credenciales.
- Configurar las variables de Sanity en Netlify.
- Abrir `/studio` y publicar en este orden: estados o regiones, ciudades, categorías, perfil fundador, lugares, artículos y guía.
- Completar texto alternativo, fecha de verificación y notas de fuente antes de publicar cada lugar.
- Confirmar que las páginas públicas muestran contenido de Sanity y ya no la etiqueta de muestra.

## 2. Supabase

- Ejecutar `001_initial_schema.sql`, `002_launch_foundation.sql` y `003_destination_requests.sql` en ese orden en el SQL Editor.
- Configurar `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SECRET_KEY` en Netlify.
- Enviar una suscripción de prueba desde portada.
- Verificar en `newsletter_subscribers` el correo normalizado, `consent_at`, `privacy_version`, `source` y `status`.
- Enviar una pista desde una ciudad sin cobertura y verificar `destination_requests`.
- Confirmar que los roles `anon` y `authenticated` no pueden leer las tablas privadas.
- Revisar el aviso de privacidad con asesoría jurídica antes de una campaña pública.

## 3. Umami

- Crear el sitio en Umami y configurar ID y URL del script.
- Confirmar pageviews y los eventos `article_view`, `article_read_75`, `place_view`, `guide_view`, `category_filter`, `search_submit`, `destination_request`, `recommendation_submit` y `newsletter_submit`.
- Revisar que ningún evento contenga correo, nombre, teléfono o texto libre.

## 4. Control editorial

- Sustituir todas las piezas de muestra antes de anunciar la revista.
- Validar enlaces, horarios, teléfonos y coordenadas contra una fuente registrada.
- Mantener la declaración de cortesía cuando haya invitación, descuento o relación comercial.
- Hacer una revisión móvil y de escritorio de portada, búsqueda, formulario de pistas, guía, artículo, lugar, Studio y privacidad.
- Ejecutar `npm run lint` y `npm run build` antes de publicar.

## 5. Después del lanzamiento

- Conectar Beehiiv mediante un proceso de sincronización con reintentos y registro de errores; Supabase conserva la evidencia primaria de consentimiento.
- Definir alertas para fichas cuya `lastVerifiedAt` haya vencido.
- No habilitar permisos de negocios ni votaciones hasta diseñar autenticación, auditoría y moderación específicas.
