---
tags: [cliente/uakami, proyecto/ezon, tipo/alcance]
---

# EZON — Alcance en el contrato Uakami

> 🧭 **Hub contrato:** [[00 - Uakami - HUB]] · **Estado vivo:** [[ESTADOS]] · **Prompts:** [[PROMPTS-LANZAMIENTO]] · **Proyecto canónico:** [[EZON — Smart Lock Finder (Hub)]]
> Actualizado: 2026-06-17 · Fuente: nota [[20260616]] + correo de ajustes post-publicación
> Producto: finder/quiz de selección de cerraduras inteligentes + integración en la web.

## Lanzamiento (publicado ✅)

### CTA del finder en la web
CTA principal: **"Encontrar mi cerradura"**.

- [x] **Listado de productos** — antes y después de la colección.
- [x] **Footer** — enlace de texto entre el resto de links.
- [x] **Detalle de producto** — componente bajo "agregar producto" + botón "¿Necesitas ayuda?" → modal lateral.

Texto del CTA de abrir Finder:
- Título: ¿Demasiadas opciones?
- Contenido: Responde 6 preguntas y te decimos qué cerradura va con tu puerta.
- Botón/Link: Encontrar mi Cerradura

### Analítica
- [x] Verificar que el tag esté funcionando en Analytics / Clarity.

---

## Ajustes del Finder post-publicación (correo)

> Cruce contra el código del repo `ezon-finder-v2`. Lo marcado [x] ya está implementado y verificado en código.

### Logo
- [x] Reemplazar logo y convertir a SVG. *(AppHeader + EntryScreen, O verde, 2026-06-17)*

### Pasos del proceso (1–6)

**Paso 1 — Material**
- [ ] Refinar copy para mayor claridad (ej. "selecciona el material de la superficie de tu puerta").
- [ ] Unificar "No lo sé" y "No estoy seguro". **Decisión:** dejar solo **"No lo sé"** (sigue el flujo, no deriva). Se elimina la opción que derivaba a WhatsApp.

**Paso 2 — Tipo de apertura** ⏸️ *bloqueado por assets*
- [ ] Añadir íconos/flechas de movimiento (abatible vs corrediza). Reja aún usa ícono genérico Lucide — falta SVG propio.
- [ ] Indicar claramente que la selección es única.

**Paso 3 — Grosor** ⏸️ *bloqueado por validación*
- [ ] Mantener ícono de instrucciones.
- [ ] Evaluar enlace "Haz clic aquí para saber cómo medir".
- [ ] **Validar medidas reales con Carlos Yeverino antes de implementar.**

**Paso 4 — Tipo de cerradura**
- [x] Implementar selección múltiple. *(2026-06-17)*
- [ ] Sustituir "No lo sé" por **"Todos"** al inicio de la lista.

**Paso 5 — Métodos de acceso**
- [x] Cambiar "Huella digital" → **"Acceso biométrico"** (solo copy; el `id` no cambia).
- [x] Lógica de filtrado "al menos uno de los seleccionados". *(ya estaba: OR)*

**Paso 6 — Funciones** ⏸️ *bloqueado por textos*
- [ ] Renombrar descripciones de funciones (códigos remotos, apertura remota, etc.) — falta copy final preciso.

### Resultados y visualización
- [ ] Mostrar **todos** los métodos de acceso de cada cerradura (sin límite de 4). Máx. real en catálogo = 6; el grid fluye natural en filas.
- [ ] Aumentar contraste visual entre resultados "ideales" (100%) y parciales.

---

## Fase 2 / Futuro
- [ ] Compartir resultados por correo / WhatsApp.
- [ ] Sistema de feedback (estrellas o pulgar arriba/abajo) al finalizar.
- [ ] Versión responsiva (desktop) — tras verificar interacción/conversión.
- [ ] Pipeline Excel → JSON/TS para precios y datos.
- [ ] Excel como fuente dinámica de consumo.
- [ ] Mostrar todos los features (no solo acceso) en resultados — mín. 8 + ajuste visual.

## Coordinación
- Lógica condicional final coordinada con **Rodrigo**.
- Medidas de grosor (Paso 3) a validar con **Carlos Yeverino**.
