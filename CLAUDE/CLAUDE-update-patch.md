# Patch para `CLAUDE.md` — incorporar sistema visual V2

> **Cómo usar este archivo:** aplicar las secciones marcadas como `[ADD]` y `[REPLACE]` en el `CLAUDE.md` del repo. Cada sección indica dónde insertar o qué reemplazar.

---

## [ADD] Nueva sección — insertar después de "Design System — EZON Trusted Light"

```markdown
## Icon System — V2

**Stack:** `lucide-react` como librería primaria · custom SVG inline solo para P04 (Tipos de cerradura) · SVGs del CDN de EZON como fuente preferente para P05 (Funciones y Métodos de acceso) con Lucide como fallback.

**Tokens** (en `src/design-tokens/tokens.js`):

```js
ICON_STROKE = 1.5
ICON_SIZE_HERO = 32       // hero de card de selección visual
ICON_SIZE_INLINE = 28     // card compacta horizontal
ICON_SIZE_SMALL = 20      // chip de feature o badge
ICON_COLOR_ON_DARK = '#FAFAF8'
ICON_COLOR_ON_LIGHT = '#111111'
ICON_COLOR_MUTED = '#6B6B6B'
```

**Reglas inviolables:**
- Stroke weight = 1.5 en todos los iconos (Lucide y custom).
- Tamaños: 32 en hero · 28 en compacta · 20 en chips. No usar otros valores.
- Color sobre fondos oscuros = `#FAFAF8` con opacidad 0.85 (1.0 si seleccionado).
- No mezclar pesos de Lucide. No usar `strokeWidth={2}` en algunos iconos y `{1.5}` en otros.
- Cuando un icono no existe en una librería, no inventarlo con IA — usar Lucide o pedirlo a EZON.

**Fuente por pantalla:**
| Pantalla | Fuente |
|---|---|
| P01 Material | Texturas fotográficas en `/public/assets/img/textures/` |
| P02 Apertura | Lucide (`DoorOpen`, `MoveHorizontal`, `Fence`, `HelpCircle`) |
| P03 Grosor | Diagrama inline (sin cambio) |
| P04 Lock Type | SVG inline custom en `LockTypeScreen.jsx` |
| P05 Access | EZON CDN (vía `accessIcons.js`) + Lucide fallback |
| P05 Functions | EZON CDN (cuando llegue) + Lucide fallback |
| Results (FeatureIcon) | Misma fuente que P05 — reusa |
```

---

## [REPLACE] Sección "Photos" en "Key Constraints & Decisions"

**Buscar este bloque:**

```markdown
- **Photos** — placeholder stripes currently. Real AI-generated photos coming from Rodrigo. Don't spend time on stock photos.
```

**Reemplazar por:**

```markdown
- **Photos / Icons (V2)** — sistema visual unificado. P01 usa texturas fotográficas (madera, metal, vidrio, neutral) en `/public/assets/img/textures/`, NO fotos de puertas. P02–P06 usan iconos (Lucide primario, custom para P04, CDN EZON para P05). Rodrigo ya no participa en la generación de assets — el sistema V1 con 37 fotos condicionadas queda deprecado. Ver `EZON-Finder-Icons-V2-Plan.md` para el detalle completo.
```

---

## [REPLACE] Sección sobre swap behavior en "Key Constraints & Decisions"

**Buscar este bloque entero:**

```markdown
- **Option card image-swap behavior — deferred** — `VisualCard` in `OptionCardGrid.jsx` supports an `imageOpen` prop that crossfades from `image` (unselected) to `imageOpen` (selected). This was used in Step 02 (DoorTypeScreen) to swap closed→open door photos on selection. **Removed 2026-05-14**: Step 02 now always shows the open door (`-abierta.webp`); Step 01 (MaterialScreen) only has a single photo per card (`p01-*.webp`) and never had swap behavior. Decide whether to add swap to remaining steps (Grosor, Tipo de cerradura, Acceso, Funciones) before re-enabling.
```

**Reemplazar por:**

```markdown
- **Option card image-swap behavior — REMOVED in V2** — la prop `imageOpen` en `VisualCard` (`OptionCardGrid.jsx`) que crossfadeaba `image` → `imageOpen` al seleccionar ya no se usa. Era parte del sistema V1 de fotos condicionadas. En V2 las cards de selección usan iconos estables que no cambian entre estados (solo cambia el borde y la opacidad). Si la prop sigue en el componente, eliminarla en el próximo refactor de OptionCardGrid.
```

---

## [ADD] Nuevo punto en "Instructions for Claude Code"

**Insertar como último bullet de la lista:**

```markdown
- **No regenerar iconos con IA.** Si un icono falta: primero buscar en Lucide, después pedirlo a EZON (ver `EZON-Finder-EZON-Icons-Request.md`), y en último caso dibujarlo manualmente en Figma. No generar iconos con IA generativa — la consistencia de stroke se rompe.
```

---

## [ADD] Nueva entrada en Task Log (sección Done)

**Insertar al inicio de la tabla "Done":**

```markdown
| DL-10 | Sistema visual V2: Lucide + texturas P01 + custom P04 + CDN EZON P05 | 2026-XX-XX (fecha de cierre real) |
```

(Cambiar la fecha cuando se cierre el ciclo V2 completo.)

---

## [ADD] Nueva entrada en Task Log (sección To Do)

**Insertar al inicio de la tabla "To Do":**

```markdown
| V2-0 | Fase 0: Revert P01 + P02 a estado neutro pre-V2 | EZON-Finder-Icons-V2-Prompts.md §1, §2 | S |
| V2-1 | Fase 1: Install lucide-react + setup icon tokens | EZON-Finder-Icons-V2-Prompts.md §7 | XS |
| V2-2 | Fase 2: Generar/curar 4 texturas P01 e integrar | EZON-Finder-Icons-V2-Prompts.md §3 | M |
| V2-3 | Fase 3: Reemplazar SVG inline P02 por Lucide | EZON-Finder-Icons-V2-Prompts.md §4 | S |
| V2-4 | Fase 4: Recalibrar 4 SVG custom P04 en Figma | EZON-Finder-Icons-V2-Prompts.md §6 | S |
| V2-5 | Fase 5: Refactor AccessIcon/FeatureIcon a estrategia CDN+Lucide | EZON-Finder-Icons-V2-Prompts.md §5 | M |
| V2-6 | Fase 5 (paralelo): enviar a Dan brief de iconos para EZON | EZON-Finder-EZON-Icons-Request.md | XS |
| V2-7 | Fase 6: Validación transversal mobile + deck antes/después | Plan §6 Fase 6 | M |
| V2-8 | Fase 7: Review Dan + ajustes + cierre V2 | Plan §6 Fase 7 | M |
```

---

## Notas adicionales para el repo

Cuando V2 esté cerrada, también:

1. **Mover** `EZON - Finder images V1.md` a `/docs/archive/` con header `[DEPRECATED — superseded by V2]`.
2. **Borrar** assets viejos de `/public/assets/img/imagenes-preguntas/` que ya no se referencien en código (verificar con grep antes de borrar).
3. **Pinear** versión de `lucide-react` en `package.json` (sin `^` ni `~`).
