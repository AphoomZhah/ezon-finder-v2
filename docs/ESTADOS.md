# ESTADOS — Contrato Uakami

> Estado vivo de todo lo que se está trabajando. Una fila por tarea.
> Estados: `🔵 To Do` · `🟡 En curso` · `🟢 Hecho` · `⏸️ En espera (input cliente)` · `🔮 Futuro`

Actualizado: 2026-06-17

---

## ELO

| Estado | Tarea | Depende de | Notas |
|---|---|---|---|
| 🔵 | Compactar insumos de investigación (benchmark, persona, problem space grid) | — | Consolidar en un solo doc |
| 🔵 | Validar tiempos de implementación en el diagrama de la web | — | |
| ⏸️ | Cotizador web (lógica de negocio) | Insumos de Dan | |
| ⏸️ | Mensajes pendientes / cambios de la entrega inicial | Definir con Dan | |
| ⏸️ | Cotizador Excel | Info de Dan | Reemplazar imágenes de colores por fotos reales de telas |
| 🔵 | Fichas técnicas de catálogo de tela | Fotos/datos de telas | Una ficha por tela (formato tipo PDF de EZON) para que el vendedor envíe al cliente |

## EZON — Lanzamiento (web / Shopify)

| Estado | Tarea | Depende de | Notas |
|---|---|---|---|
| 🟢 | CTA del finder en listado de productos (antes + después de la colección) | — | Publicado. "¿Demasiadas opciones?" → "Encontrar mi cerradura" |
| 🟢 | CTA del finder en footer (enlace de texto) | — | Publicado |
| 🟢 | CTA del finder en detalle de producto + modal "¿Necesitas ayuda?" | — | Publicado |
| 🟢 | Verificar tag funcionando en Analytics / Clarity | — | Verificado |

## EZON — Finder (repo ezon-finder-v2) · Ajustes post-publicación del correo

> Cruce de las tareas del correo contra el código actual del repo. Lo 🟢 ya está implementado y verificado en código; lo 🔵 queda pendiente.

| Estado | Tarea | Paso | Notas |
|---|---|---|---|
| 🟢 | Logo → SVG (header + entry) | Logo | AppHeader usa `/ezon-main-logo.svg`; EntryScreen SVG inline con O verde. Hecho 2026-06-17 |
| 🟢 | Selección múltiple en tipo de cerradura | Paso 4 | `LockTypeScreen` multi-select; `matcher.js` con `lockTypeMatch` (OR). Hecho 2026-06-17 |
| 🟢 | Lógica de acceso "al menos uno de los seleccionados" | Paso 5 | Ya implementado: `getViableAccessMethods` y `softScore` usan OR, no AND |
| 🔵 | Paso 1 — copy más claro + unificar "No estoy seguro"/"No lo sé" | Paso 1 | **Decisión:** dejar solo "No lo sé" (`unknown`, sigue el flujo). Se elimina la tarjeta `otros`→`/incompatible`. Copy nuevo más explícito |
| 🔵 | Paso 4 — "No lo sé" → "Todos" al inicio de la lista | Paso 4 | Renombrar opción `unknown` a "Todos" y moverla al principio. Mantiene semántica de no-filtro |
| 🔵 | Paso 5 — "Huella digital" → "Acceso biométrico" | Paso 5 | Solo copy del label/subtítulo. El `id: 'huella'` NO cambia (load-bearing) |
| 🔵 | Resultados — mostrar todos los métodos de acceso (sin límite) | Resultados | Hoy `ProductCard` corta en `.slice(0,4)`. Quitar el límite (máx. real en catálogo = 6). Grid que fluye natural en filas |
| 🔵 | Resultados — más contraste visual ideal (100%) vs parcial | Resultados | Reforzar diferencia entre "Recomendación ideal" y alternativas/fallback |
| ⏸️ | Paso 2 — íconos/flechas de movimiento + indicar selección única | Paso 2 | **Bloqueado por assets.** Reja usa ícono Lucide `Fence` (inconsistente); falta SVG propio de reja. Pendiente asset para unificar |
| ⏸️ | Paso 3 — validar medidas reales + enlace "cómo medir" | Paso 3 | **Bloqueado:** validar grosores con Carlos Yeverino antes de implementar. Evaluar enlace "Haz clic aquí para saber cómo medir" |
| ⏸️ | Paso 6 — renombrar descripciones de funciones | Paso 6 | **Bloqueado por textos.** Falta el copy final preciso (códigos remotos, apertura remota, etc.) |

## EZON — Fase 2 / Futuro

| Estado | Tarea | Notas |
|---|---|---|
| 🔮 | Compartir resultados por correo / WhatsApp | Enviar la selección de cerraduras |
| 🔮 | Sistema de feedback (estrellas o pulgar arriba/abajo) al finalizar | Evaluar utilidad del asesor virtual |
| 🔮 | Versión responsiva (desktop) | Tras verificar interacción/conversión en versión actual |
| 🔮 | Pipeline Excel → JSON/TS para precios y datos | Flujo de trabajo: Excel como fuente, se convierte a formato consumible por la app |
| 🔮 | Excel como fuente dinámica de consumo | O buscar mejor forma de implementación |
| 🔮 | Mostrar todos los features (no solo acceso) en resultados | Límite mín. 8, ajuste visual de división |

## Arquitechtura (nuevo)

| Estado | Tarea | Notas |
|---|---|---|
| 🔵 | Coordinar reunión de kickoff con el equipo | Obtener info de negocio |
| 🔵 | Estrategia + documentación de investigación | Protopersona, benchmark, problem space grid |

## Gestión / Operación

| Estado | Tarea | Notas |
|---|---|---|
| 🟡 | Montar sistema de gestión (este ESTADOS.md + LOG-HORAS) | Base: ESTADOS.md de Dan |
| 🔵 | Definir cadencia de reporte quincenal | Ver REPORTE-QUINCENAL.md |
