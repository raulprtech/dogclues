# Flujo de postulaciones de negocios

## Principios

- La postulación es gratuita.
- No garantiza visita, inclusión, posición ni huellas.
- El equipo editorial decide con independencia del área comercial.
- Las visitas se realizan sin anunciar identidad ni fecha y se paga la cuenta completa.
- Las ventanas de visita son internas y nunca se comparten antes de la evaluación.
- Solo se solicita información adicional cuando es necesaria para validar el establecimiento.

## Estados internos

| Estado | Uso |
| --- | --- |
| `submitted` | Formulario recibido, sin revisión. |
| `pre_screening` | Validación de dirección, horarios, operación y encaje. |
| `eligible` | Puede entrar a un recorrido futuro. |
| `researching` | Investigación editorial en curso. |
| `visited` | Existe al menos una visita documentada. |
| `editorial_review` | Evaluación o visitas adicionales pendientes. |
| `selected` | Aprobado para publicación; aún requiere edición final. |
| `not_selected` | No se publicará en el ciclo actual. |
| `closed` | Expediente cerrado. |

## Respuestas manuales

### Recepción

> Gracias por compartir la información de [negocio]. La postulación quedó registrada para revisión editorial. Enviar una solicitud no garantiza visita, inclusión ni reconocimiento.

### Información adicional

> Para completar la validación de [negocio] necesitamos confirmar: [datos]. Esta solicitud de información no significa que el establecimiento haya sido seleccionado.

### Elegible para investigación

> [Negocio] quedó incorporado a nuestro radar editorial. Podrá ser considerado durante futuros recorridos. Para preservar una experiencia representativa, no confirmamos si habrá visita ni compartimos fechas o identidades.

### Cierre del ciclo

> Gracias por participar. En este ciclo no incorporaremos [negocio] a la selección publicada. La decisión no impide que pueda volver a considerarse cuando exista información nueva o en una edición futura.

## Operación

- Registrar cada contacto en `response_status`, `acknowledged_at` y notas operativas.
- Definir `internal_visit_window_start` y `internal_visit_window_end` solo para planeación.
- No revelar el intervalo interno al negocio.
- No aceptar cortesías vinculadas a una evaluación.
- Si una visita deja de ser anónima, documentarlo y programar otra experiencia representativa antes de decidir.
