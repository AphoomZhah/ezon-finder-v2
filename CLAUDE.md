# EZON Smart Lock Finder — Claude Context

> This file is the single source of truth for AI-assisted development on this repo.
> Keep it updated as the project evolves. It is intentionally technical and terse.

---

## Project Brief

**Product:** Smart Lock Finder — a guided product-selection tool for EZON México.
**Goal:** Replace a manual WhatsApp qualification process (handled by sales advisor Carlos) with a self-serve digital experience that resolves door compatibility uncertainty before purchase — the #1 friction point causing returns and unqualified leads.
**Delivery:** Standalone React app deployed on a subdomain (or path) of ezonmexico.com, coordinated with developer Jonathan.
**Audience:** Spanish-speaking users in CDMX. Primary segment: Airbnb hosts. Secondary: family security, smart home enthusiasts, buyers for elderly parents.
**Language rule:** All UI copy and user-facing strings are in Spanish. Code, comments, and this file are in English.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Inline styles only — no CSS-in-JS, no Tailwind, no external UI library |
| Deployment | Netlify (continuous deploy from GitHub) |
| Build | `npm run build` → outputs to `dist/` |
| Dev | `npm run dev` → localhost:5173 |
| Fonts | Montserrat (400–800) + Open Sans (400–500–600) — loaded via Google Fonts in `index.html` |
| No router | Navigation is a state machine (screenIdx integer), not React Router |

---

## File Structure

```
ezon-finder-v2/
├── CLAUDE.md                  ← you are here
├── netlify.toml               ← SPA redirect + build config. Do not modify.
├── vite.config.js             ← standard app config (no lib mode). Do not modify.
├── index.html
├── package.json
├── public/
│   └── assets/img/
│       └── entry-bg.jpg       ← hero image. More photos coming from Rodrigo (AI-generated).
└── src/
    ├── main.jsx               ← mounts <App /> into #ezon-finder
    ├── index.css              ← reset + max-width container only
    ├── App.jsx                ← state machine + screen router only (no JSX for screens)
    ├── design-tokens/
    │   └── tokens.js          ← all color/spacing constants. Single source of truth.
    ├── components/
    │   ├── index.js           ← re-exports everything. Always import from here.
    │   ├── PrimaryButton.jsx
    │   ├── BackButton.jsx
    │   ├── ProgressBar.jsx
    │   ├── WhatsAppLink.jsx
    │   ├── AlertBox.jsx
    │   ├── PhotoPlaceholder.jsx
    │   ├── HeroImage.jsx
    │   ├── AccessIcon.jsx
    │   ├── LockProductPlaceholder.jsx
    │   └── BillIllustration.jsx
    ├── screens/
    │   ├── EntryScreen.jsx
    │   ├── MaterialScreen.jsx
    │   ├── ThicknessScreen.jsx
    │   ├── LocationScreen.jsx
    │   ├── OpeningScreen.jsx
    │   ├── AccessScreen.jsx
    │   ├── ConnectivityScreen.jsx
    │   ├── LoadingScreen.jsx
    │   └── ResultsScreen.jsx
    └── data/
        ├── products.js        ← product catalog (loaded manually, changes ~2x/month)
        └── matcher.js         ← matching logic: matchProducts(answers) → products[]
```

---

## Design System — EZON Trusted Light

All values live in `src/design-tokens/tokens.js`. Never hardcode these inline.

```js
VERDE         = '#7EDB8A'   // brand green — primary CTA, selected states, progress
BG_APP        = '#F5F5F5'   // page background
BG_WHITE      = '#FFFFFF'   // card / surface background
TEXT_PRIMARY  = '#111111'
TEXT_SECONDARY= '#6B6B6B'
BORDER_REST   = '#E5E5E5'
ALERT_BG      = '#FEF3C7'   // incompatible door warning
ALERT_TEXT    = '#92400E'
```

**Typography:** Montserrat weight 900 for all headings (`fontFamily: "'Montserrat', sans-serif", fontWeight: 900`). Open Sans for all body/UI text.
**Mobile-first:** All screens designed at 375px. Container max-width is 480px, centered.
**No dark mode.** Light surface only — do not introduce dark backgrounds.

---

## App Navigation Model

Navigation is a simple integer index over a frozen array. No React Router.

```js
const SCREENS = [
  'entry', 'material', 'thickness', 'location',
  'opening', 'access', 'connectivity', 'loading', 'results'
];
```

- `goNext()` — increments index
- `goBack()` — decrements index
- `goTo(name)` — jumps to named screen

**Special cases:**
- `material === 'vidrio'` or `material === 'otros'` → immediate WhatsApp derivation (not a soft warning — skip the rest of the flow)
- `location === 'exterior_expuesto'` → alert displayed inline, WhatsApp CTA surfaced
- Screen state is persisted to `localStorage` under key `ezon_finder_screen`

**All screen components receive the same prop signature:**
```js
{ answers, setAnswers, onNext, onBack, dir }
```
`dir` is `'forward'` or `'back'` — used for enter animation class on the Screen wrapper.

---

## Finder Flow (frozen — do not change order)

```
Entry → Material → Thickness → Location → Opening type →
Access methods (up to 3) → Connectivity/features → Loading → Results
```

Step count shown to user: 4–6 questions (variable based on answers). Progress bar reflects this.

Every question screen must include a **"No lo sé / no estoy seguro"** option that either shows contextual help inline or surfaces the WhatsApp CTA.

---

## Data Layer

**`data/products.js`** — static array of product objects. Each product has:
- `id`, `name`, `sub` (subtitle), `brand`, `price` (string, formatted MXN)
- `features` (string[]) — short tags shown on result card
- `reasons` (string[]) — why this lock matches, shown as bullets
- `mood` — maps to a `PhotoPlaceholder` color mood key
- `shopifySlug` — full Shopify URL slug (not ID) for the "Comprar" / "Ver detalle" CTA
- `compatibility` — object with thickness range, materials[], locations[], openingTypes[]

**`data/matcher.js`** — exports `matchProducts(answers)`.
- Takes the full `answers` object
- Returns array of matched products sorted by fit (best first)
- Returns empty array if no match — ResultsScreen handles this state with WhatsApp fallback
- This is where compatibility logic lives. Keep it pure (no side effects, no UI imports).

**Prices are loaded manually.** No live Shopify API. Update `products.js` directly when prices change (~2x/month).

**"Ver detalle" button** → redirects to Shopify PDP (full page, not modal). Use `shopifySlug` to build the URL.

---

## Key Constraints & Decisions

- **No % match score in results** — removed. If a product appears, it's assumed 100% compatible.
- **No AI photo diagnostic** — deferred post-V1. Technically premature (can't estimate thickness from photo without scale reference).
- **Vidrio / Otros material → immediate WhatsApp** — not a warning, a hard redirect.
- **Exterior expuesto → alert** — hardware damage from sun/rain exposure. Show alert but do not hard-block.
- **"Prefiero hablar con ventas"** — secondary CTA on EntryScreen (not "Ver catálogo").
- **Photos** — placeholder stripes currently. Real AI-generated photos coming from Rodrigo. Don't spend time on stock photos.
- **Prices** — manually updated strings in `products.js`. No live data.

---

## WhatsApp

The WhatsApp number used across all `WhatsAppLink` components:
```
https://wa.me/525500000000
```
This is a placeholder. Replace with the real number when provided by EZON.

---

## Task Log

### 🔴 To Do

| # | Task | Context | Size |
|---|---|---|---|
| DL-8 | Tarea 8: QA visual transversal | CLAUDE/EZON_PROMPT_CLAUDE_CODE.md §Tarea 8 | S |

### 🟡 In Progress

| DL-7 | Tarea 7: Migración de pantallas restantes (Apertura, Grosor, Métodos, Funciones, Tipo) | CLAUDE/EZON_PROMPT_CLAUDE_CODE.md §Tarea 7 | XL |


### ✅ Done

| # | Task | Completed |
|---|---|---|
| DL-9 | ResultsScreen 3.0 — rediseño completo: cards verticales, `<ProductCard />`, `<FeatureIcon />` | 2026-04-29 |
| — | MaterialScreen: "No lo sé" convertido en opción seleccionable (id `unknown`), elimina WhatsApp trigger; `matcher.js` no filtra por material cuando `material === 'unknown'` | 2026-04-30 |
| — | Flujo completo: opción `'unknown'` normalizada en todos los pasos (Grosor, Tipo de apertura, Acceso, Ubicación). `matcher.js` ignora `'unknown'` en `doorType`, `thickness`, `accessMethods` y `lockType` — el usuario puede recorrer todo el flujo con "No lo sé" y ver el catálogo completo | 2026-04-30 |
| DL-6 | EZON Design Language — Tarea 6: `<FinderFooter />` canónico (negro→verde, sticky-on-scroll) | 2026-04-29 |
| DL-5 | EZON Design Language — Tarea 5: `<OptionCard />` y `<OptionCardGrid />` | 2026-04-29 |
| DL-4 | EZON Design Language — Tarea 4: Componentes `<ScreenTitle />` y `<ScreenDeck />` | 2026-04-29 |
| DL-3 | EZON Design Language — Tarea 3: Componente `<StepMeta />` | 2026-04-29 |
| DL-2 | EZON Design Language — Tarea 2: Componente `<AppHeader />` | 2026-04-29 |
| DL-1 | EZON Design Language — Tarea 1: Setup tokens y fuentes | 2026-04-29 |
| — | Project architecture refactor (screens/, components/, data/, design-tokens/) | 2026-04-23 |
| — | Fix Netlify deployment (vite.config lib mode → app mode, netlify.toml) | 2026-04-23 |
| — | Recommendation matrix Excel (initial version) | 2026-04-22 |
| — | Two functional React prototypes (Claude Design + Gemini) | 2026-04 |
| — | Flow decision: Claude Design is the frontend base | 2026-04-21 |
| — | Frozen finder flow v2 | 2026-04-21 |

---

## DL-5 Plan — Tarea 5: `<OptionCard />` y `<OptionCardGrid />`

> Ref: `CLAUDE/EZON_PROMPT_CLAUDE_CODE.md` §Tarea 5  
> Ref visual: `dist/ezon_finder_screen01_material.html` (variante `visual`)  
> Ref visual: `public/ezon_finder_screen03_v2.html` (variante `diagram` + `unknown`)

### Estado actual del componente

El `OptionCardGrid.jsx` actual tiene estas discrepancias contra el design language:

| Elemento | Estado actual | Estado requerido |
|---|---|---|
| Borde seleccionado | 2px verde `#7EDB8A` + fondo `#F2FDF3` (flood fill verde) | 1px negro → 0 0 0 2px negro + dot verde en esquina — sin fondo verde |
| Checkmark | Círculo verde con ícono — posición `top:8 right:8` sin anillo blanco | `top:12 right:12`, 16×16px, con `box-shadow: 0 0 0 4px white` |
| Foto/visual hero | `PhotoPlaceholder` con diagonales de color sólido — sin badge de material | Gradientes CSS ricos (madera, metal, vidrio, otro) + badge negro backdrop-blur |
| Variante `diagram` | No existe — ThicknessScreen usa botones horizontales ad-hoc | Tarjeta con diagrama CSS a escala (rectángulo proporcional al grosor), valor 22px, desc |
| Variante `unknown` | Botón sin borde punteado, sin círculo con `?`, fondo `#EBEBEB` | `border-style: dashed`, círculo 38×38px borde 1.5px, `?` Montserrat 700, bg `--surface-deep` |
| Borde hover | Solo color (`VERDE`) | `border-color: --ink-secondary + translateY(-2px) + box-shadow` |
| Grid gap | 12px | 10px (Material) / 8px (Thickness) |
| Padding interno cards | `10px 12px 12px` | `14px 14px 16px` (body) |
| Tipografía título | Montserrat 900, 13.5px | Montserrat 700, 16px, `letter-spacing: -0.015em` |
| Tipografía desc | Open Sans 11px | Open Sans 400 12px |
| `PhotoPlaceholder` | Recibe `mood` → diagonales, no hay badge | Texturas CSS ricas por material + badge negro con dot verde |

### Subtareas concretas

**5.1 — Refactorizar `OptionCardGrid.jsx` en tres variantes limpias**
- Exportar `OptionCard` con prop `variant: 'visual' | 'diagram' | 'unknown'`
- Variante `visual`: visual hero 124px con texturas CSS inline (patrón del HTML ref), badge negro con dot verde, body con título 700/16px y desc 400/12px
- Variante `diagram`: zona de 56px con `door-section` negra a escala (widths por `data-thickness`), measure-line, valor 22px, desc; sin badge
- Variante `unknown`: bg `SURFACE_DEEP`, `border: 1px dashed INK_QUATERNARY`, círculo 38×38 con `?` Montserrat 700, título 700/15px
- Estado seleccionado canónico en las tres variantes: `border: 2px solid INK_PRIMARY + box-shadow: 0 0 0 2px INK_PRIMARY` + `::before` dot verde 16×16 con `box-shadow: 0 0 0 4px white` + `::after` checkmark SVG — **sin fondo verde**
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 8px` (ajustable por prop)
- Multi-select via prop `multiple` (ya existe, mantener)

**5.2 — Texturas CSS materiales**
Crear objetos de estilo para los 4 materiales del HTML de referencia (extraídos de `ezon_finder_screen01_material.html`):
- `wood`: gradientes con vetas + knots radiales + base cálida
- `metal`: repeating-linear brushed + radial highlight + base cool-dark
- `glass`: diagonal light streak + base blue-grey
- `other`: dot pattern radial + base neutro

Mantener soporte del `mood` para cuando la tarjeta no tenga textura propia (Apertura usa SVG en `image`). Si `image` está presente, render sobre el visual sin textura de fondo (bg neutro oscuro tipo `photoMoods.abatible`).

**5.3 — Migrar `MaterialScreen.jsx`**
- Usar `OptionCard variant="visual"` para los 4 materiales
- Usar `OptionCard variant="unknown"` para "No lo sé"
- Eliminar padding redundante del `<div>` wrapper (el StepLayout ya tiene `padding: 0 24px`)
- Eliminar cualquier CTA inferior
- Verificar que el grid queda `padding: 0 24px` con gap 10px (como Material HTML ref)

**5.4 — Actualizar `components/index.js`**
- Exportar `OptionCard` además de `OptionCardGrid`

**5.5 — Verificar `ThicknessScreen.jsx` y `DoorTypeScreen.jsx`**
- `ThicknessScreen`: migrar a `OptionCard variant="diagram"` + `OptionCardGrid`
- `DoorTypeScreen`: ya usa `OptionCardGrid` pero hereda las discrepancias del componente — se corrigen automáticamente al refactorizar el grid

### Archivos a tocar

```
src/components/OptionCardGrid.jsx   ← refactor principal
src/screens/MaterialScreen.jsx      ← migración a nueva API
src/screens/ThicknessScreen.jsx     ← migración a diagram variant
src/components/index.js             ← exportar OptionCard
```

### Criterio de aceptación DL-5
- La `MaterialScreen` renderiza idéntica al `dist/ezon_finder_screen01_material.html`
- Click en tarjeta → borde negro + dot verde + checkmark, sin flood fill verde
- Click en "No lo sé" → abre WhatsApp
- `ThicknessScreen` usa `OptionCard variant="diagram"` con diagramas CSS a escala
- `DoorTypeScreen` hereda correcciones automáticamente
- `npm run build` pasa sin errores

---

## Instructions for Claude Code

- **Never change logic or copy while doing structural work.** Refactors are refactors only.
- **Always run `npm run build` after any change** and confirm it passes before finishing.
- **Import from `components/index.js`**, never from individual component files directly.
- **Import tokens from `design-tokens/tokens.js`**, never hardcode color values inline.
- **Matching logic belongs in `data/matcher.js`**, not inside screen components.
- **Keep screens thin** — screens receive data and callbacks via props, they don't fetch or compute.
- **Do not introduce React Router**, CSS modules, or any new dependencies without explicit request.
- **Do not add dark mode** — this is a light-only design system.
- When adding a new screen, add it to the `SCREENS` array in `App.jsx` and wire up the conditional render.
- When updating product data, edit `data/products.js` only — never hardcode product info in screens.
- When a task is completed, note it in the Task Log above with today's date.
