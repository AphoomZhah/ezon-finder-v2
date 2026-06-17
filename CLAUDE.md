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
| Router | React Router v6 (`Routes` / `Route` / `useNavigate`) — named path routes, not an index state machine |

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
    ├── App.jsx                ← React Router routes + shared answers state. No screen JSX here.
    ├── design-tokens/
    │   └── tokens.js          ← all color/spacing constants. Single source of truth.
    ├── components/
    │   ├── index.js           ← re-exports everything. Always import from here.
    │   ├── Screen.jsx         ← full-viewport wrapper with min-height 100dvh
    │   ├── AppHeader.jsx      ← top bar with EZON logo
    │   ├── StepHeader.jsx     ← progress bar + back button row
    │   ├── StepMeta.jsx       ← "Paso X de Y · Label" chip
    │   ├── ScreenTitle.jsx    ← Montserrat 900 heading
    │   ├── ScreenDeck.jsx     ← Open Sans supporting text below title
    │   ├── StepLayout.jsx     ← composes AppHeader + StepHeader + scrollable body + FinderFooter
    │   ├── FinderFooter.jsx   ← fixed-bottom CTA bar (position: fixed, not sticky)
    │   ├── OptionCardGrid.jsx ← exports OptionCard + OptionCardGrid (variants: visual, diagram, unknown)
    │   ├── HorizontalOptionCard.jsx
    │   ├── MeasurementInstrument.jsx
    │   ├── SectionLabel.jsx
    │   ├── PhotoPlaceholder.jsx
    │   ├── HeroImage.jsx
    │   ├── HeroChip.jsx
    │   ├── ProgressBar.jsx
    │   ├── PrimaryButton.jsx
    │   ├── WhatsAppLink.jsx
    │   ├── WhatsAppCTA.jsx
    │   ├── AlertBox.jsx
    │   ├── BillIllustration.jsx
    │   ├── AccessIcon.jsx
    │   ├── LockProductPlaceholder.jsx
    │   ├── ProductCard.jsx    ← result card used in ResultsScreen
    │   └── FeatureIcon.jsx    ← icon + label chip used inside ProductCard
    ├── screens/
    │   ├── EntryScreen.jsx
    │   ├── MaterialScreen.jsx
    │   ├── DoorTypeScreen.jsx
    │   ├── ThicknessScreen.jsx
    │   ├── LockTypeScreen.jsx
    │   ├── AccessScreen.jsx
    │   ├── FunctionsScreen.jsx
    │   ├── IncompatibleScreen.jsx ← terminal screen for incompatible door type (otros)
    │   ├── LoadingScreen.jsx
    │   └── ResultsScreen.jsx
    └── data/
        ├── products.js        ← product catalog (loaded manually, changes ~2x/month)
        ├── matcher.js         ← matchProducts(answers) + getViableLockTypes(answers)
        └── accessIcons.js     ← icon map for access method options
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
**Mobile-first:** All screens designed at 375px. Container max-width is 520px, centered.
**No dark mode.** Light surface only — do not introduce dark backgrounds.

---

## Icon System — V2

**Stack:** `lucide-react` as primary library · custom SVG inline only for P04 (Tipos de cerradura) · EZON CDN SVGs as preferred source for P05 (Funciones and Métodos de acceso) with Lucide as fallback.

**Tokens** (in `src/design-tokens/tokens.js`):

```js
ICON_STROKE         = 1.5
ICON_SIZE_HERO      = 32       // hero of visual selection card
ICON_SIZE_INLINE    = 28       // compact horizontal card
ICON_SIZE_SMALL     = 20       // feature chip or badge
ICON_COLOR_ON_DARK  = '#FAFAF8'
ICON_COLOR_ON_LIGHT = '#111111'
ICON_COLOR_MUTED    = '#6B6B6B'
```

**Inviolable rules:**
- Stroke weight = 1.5 on all icons (Lucide and custom).
- Sizes: 32 in hero · 28 in compact · 20 in chips. No other values.
- Color on dark backgrounds = `#FAFAF8` at opacity 0.85 (1.0 if selected).
- Do not mix Lucide stroke weights. Never use `strokeWidth={2}` on some icons and `{1.5}` on others.
- When an icon does not exist in a library, do not generate it with AI — use Lucide or request it from EZON.

**Source by screen:**
| Screen | Source |
|---|---|
| P01 Material | Photographic textures in `/public/assets/img/textures/` (pending — CSS mood fallback in use) |
| P02 Apertura | Lucide (`DoorOpen`, `MoveHorizontal`, `Fence`, `HelpCircle`) |
| P03 Grosor | Inline CSS diagram (no change) |
| P04 Lock Type | Custom inline SVG in `LockTypeScreen.jsx` |
| P05 Access | EZON CDN (via `accessIcons.js`) + Lucide fallback |
| P05 Functions | EZON CDN (when available) + Lucide fallback |
| Results (FeatureIcon) | Same source as P05 — reuses |

---

## App Navigation Model

Navigation uses React Router v6. `App.jsx` owns `answers` state and a `go(path, dir?)` helper that calls `navigate(path)` and sets animation direction.

```js
// Route paths
'/'              → EntryScreen
'/material'      → MaterialScreen
'/incompatible'  → IncompatibleScreen  (terminal — no onNext)
'/door-type'     → DoorTypeScreen
'/thickness'     → ThicknessScreen
'/lock-type'     → LockTypeScreen
'/access'        → AccessScreen
'/functions'     → FunctionsScreen
'/loading'       → LoadingScreen
'/results'       → ResultsScreen
```

**Special routing cases:**
- `material === 'otros'` → `go('/incompatible')` — hard dead-end, no further flow
- `material === 'vidrio'` → continues through the normal flow (compatible products exist)
- After `/thickness`: `getViableLockTypes(answers)` is called — if it returns exactly 1 lockType, that value is auto-set on `answers.lockType` and the app skips to `/access` directly (LockTypeScreen is bypassed)

**Prop signature — all screen components receive:**
```js
{ answers, setAnswers, onNext, onBack, dir }
```
`dir` is `'forward'` or `'back'` — used for enter animation class on the Screen wrapper.

---

## Finder Flow

```
Entry → Material → Door Type → Thickness → [Lock Type — may skip] →
Access methods → Functions/features → Loading → Results
```

- **Lock Type** is skipped automatically when only one lock type is viable given the material + door type answers (see `getViableLockTypes` in `matcher.js`).
- **Step count shown to user:** 4–6 questions (variable). Progress bar reflects this.
- Every question screen must include a **"No lo sé / no estoy seguro"** option (`id: 'unknown'`) that allows the user to continue without filtering on that criterion.

**Door type values (collapsed in V2):**
- `'abatible'` — covers both 1-hoja and 2-hojas hinged doors
- `'corrediza'` — covers both 1-hoja and 2-hojas sliding doors
- `'reja'` — iron gate / metal fence door
- `'unknown'` — no filter applied

---

## Data Layer

**`data/products.js`** — static array of product objects. Each product has:
- `id`, `name`, `sub` (subtitle), `brand`, `price` (string, formatted MXN)
- `features` (string[]) — short tags shown on result card
- `reasons` (string[]) — why this lock matches, shown as bullets
- `mood` — maps to a `PhotoPlaceholder` color mood key
- `shopifySlug` — full Shopify URL slug (not ID) for the "Comprar" / "Ver detalle" CTA
- `thicknessMin`, `thicknessMax` — numeric cm range (null = universal)
- `material`, `doorType`, `lockType`, `access`, `functions`, `location` — boolean flag objects

**`data/matcher.js`** — exports two functions:

`matchProducts(answers)`:
- Takes full `answers` object; returns products[] sorted by soft score (best first), max 5
- Hard filters: material, doorType (via `doorTypeHard`), thickness
- Soft score: access methods, functions, lockType preference
- Returns `[]` when `material === 'otros'` (ResultsScreen handles empty state)
- `'unknown'` on any criterion → that criterion is skipped (no filter applied)

`getViableLockTypes(answers)`:
- Returns string[] of lockType keys (`'conManija'`, `'pushPull'`, `'cerrojo'`, `'candado'`) that have at least one matching product given current material + doorType
- Used by `App.jsx` to decide whether to skip LockTypeScreen

**Prices are loaded manually.** No live Shopify API. Update `products.js` directly when prices change (~2x/month).

**"Ver detalle" button** → redirects to Shopify PDP (full page, not modal). Use `shopifySlug` to build the URL.

---

## Key Constraints & Decisions

- **No % match score in results** — removed. If a product appears, it's assumed 100% compatible.
- **No AI photo diagnostic** — deferred post-V1. Technically premature (can't estimate thickness from photo without scale reference).
- **`otros` material → /incompatible** — hard dead-end. `vidrio` is NOT blocked — compatible products exist for glass-framed doors.
- **Exterior expuesto → alert** — hardware damage from sun/rain exposure. Show alert but do not hard-block. (LocationScreen deferred post-V1.)
- **"Prefiero hablar con ventas"** — secondary CTA on EntryScreen (not "Ver catálogo").
- **Photos / Icons (V2)** — unified visual system. P01 uses photographic textures (madera, metal, vidrio, neutral) in `/public/assets/img/textures/`, NOT door photos. P02–P06 use icons (Lucide primary, custom for P04, EZON CDN for P05). Rodrigo no longer participates in asset generation — the V1 system with 37 conditional photos is deprecated. See `CLAUDE/EZON-Finder-Icons-V2-Prompts.md` for full detail.
- **Prices** — manually updated strings in `products.js`. No live data.
- **Door type collapsed** — UI presents 3 options (abatible / corrediza / reja) instead of 5. Matcher uses `doorTypeHard()` which OR-maps collapsed values to their sub-keys in product data.
- **Option card image-swap behavior — REMOVED in V2** — the `imageOpen` prop in `VisualCard` (`OptionCardGrid.jsx`) that crossfaded `image` → `imageOpen` on selection is no longer used. It was part of the V1 photo system. In V2, selection cards use stable icons that do not change between states (only border and opacity change). If the prop is still in the component, remove it in the next OptionCardGrid refactor.
- **MeasurementInstrument — temporarily hidden (ThicknessScreen.jsx)** — The `<MeasurementInstrument />` component (Section B of ThicknessScreen) is commented out pending final design. To restore it, uncomment the Section B block in `ThicknessScreen.jsx`. The component itself lives in `src/components/MeasurementInstrument.jsx` and remains in the codebase — do not delete it.

---

## WhatsApp

The WhatsApp number used across all `WhatsAppLink` / `WhatsAppCTA` components:
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
| V2-2 | Fase 2: Generar/curar 4 texturas P01 e integrar | CLAUDE/EZON-Finder-Icons-V2-Prompts.md §3 | M |
| V2-4 | Fase 4: Recalibrar 4 SVG custom P04 en Figma | CLAUDE/EZON-Finder-Icons-V2-Prompts.md §6 | S |
| V2-5 | Fase 5: Refactor AccessIcon/FeatureIcon a estrategia CDN+Lucide | CLAUDE/EZON-Finder-Icons-V2-Prompts.md §5 | M |
| V2-6 | Fase 5 (paralelo): enviar a Dan brief de iconos para EZON | CLAUDE/EZON-Finder-EZON-Icons-Request.md | XS |
| V2-8 | Fase 7: Review Dan + ajustes + cierre V2 | — | M |

### 🟡 In Progress

_(none)_

### ✅ Done

| # | Task | Completed |
|---|---|---|
| — | Fix logo: EntryScreen ahora usa SVG inline (letras blancas, O verde #88C384), elimina filter brightness/invert; nitidez vectorial verificada | 2026-06-17 |
| — | LockType multi-select: answers.lockType → string[]; matcher.js lockTypeMatch() OR + all-false universal; App.jsx auto-skip a array; LockTypeScreen patrón AccessScreen | 2026-06-17 |
| — | Logo SVG en AppHeader + EntryScreen (reemplaza texto EZON) | 2026-06-17 |
| — | ProductCard: removido precio tachado/descuento — solo se muestra priceFull. | 2026-06-16 |
| Tarea A | Copy: MaterialScreen — Metal/Vidrio subtitles, Otros title+subtitle | 2026-06-10 |
| Tarea B | Copy+orden: ThicknessScreen — ScreenTitle, ScreenDeck, THICKNESSES reorder + badge 3-5 | 2026-06-10 |
| V2-7 | Fase 6: Validación transversal mobile + deck antes/después | 2026-05-26 |
| V2-3 | Fase 3: Reemplazar SVG inline P02 por Lucide (`DoorOpen`, `MoveHorizontal`, `Fence`, `HelpCircle`) | 2026-05-25 |
| V2-1 | Fase 1: Install lucide-react (pinned exact) + setup icon tokens in tokens.js | 2026-05-25 |
| V2-0 | Fase 0: Revert P01 (remove .webp image paths, keep mood textures) + Revert P02 (remove material-conditioned image logic) | 2026-05-25 |
| DL-7 | Tarea 7: Migración de pantallas restantes (Apertura, Grosor, Métodos, Funciones, Tipo) | 2026-05-25 |
| — | `matcher.js`: `getViableDoorTypes`, `getViableAccessMethods`, `getViableFunctions` exports; reja→candado domain rule in `getViableLockTypes` | 2026-05-13 |
| — | `DoorTypeScreen` + `LockTypeScreen`: dynamic option filtering via `getViableDoorTypes` / `getViableLockTypes` | 2026-05-13 |
| — | `AccessScreen` + `FunctionsScreen`: dynamic option filtering via `getViableAccessMethods` / `getViableFunctions` | 2026-05-13 |
| — | `matcher.js`: `doorTypeHard()` for collapsed doorType values + `getViableLockTypes()` export | 2026-05-13 |
| — | `DoorTypeScreen`: collapsed to 3 options (abatible, corrediza, reja) + unknown | 2026-05-13 |
| — | `App.jsx`: vidrio no longer → /incompatible; LockTypeScreen auto-skip via `getViableLockTypes` | 2026-05-13 |
| — | `IncompatibleScreen`: copy updated to generic "tipo de puerta no compatible" messaging | 2026-05-13 |
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

## Instructions for Claude Code

- **Never change logic or copy while doing structural work.** Refactors are refactors only.
- **Always run `npm run build` after any change** and confirm it passes before finishing.
- **Import from `components/index.js`**, never from individual component files directly.
- **Import tokens from `design-tokens/tokens.js`**, never hardcode color values inline.
- **Matching logic belongs in `data/matcher.js`**, not inside screen components.
- **Keep screens thin** — screens receive data and callbacks via props, they don't fetch or compute.
- **Do not add CSS modules or any new dependencies** without explicit request.
- **Do not add dark mode** — this is a light-only design system.
- When adding a new screen, add a `<Route>` in `App.jsx` and wire it into the navigation chain.
- When updating product data, edit `data/products.js` only — never hardcode product info in screens.
- When a task is completed, note it in the Task Log above with today's date.
- **Do not generate icons with AI.** If an icon is missing: first look in Lucide, then request from EZON (see `CLAUDE/EZON-Finder-EZON-Icons-Request.md`), and as a last resort draw manually in Figma. AI-generated icons break stroke consistency.

---

## Footer positioning — mobile browser fix

**Patrón establecido. No revertir.**

El `FinderFooter` usa `position: fixed` (no `sticky`) para garantizar
visibilidad constante en mobile browsers que muestran/ocultan la barra
de URL dinámicamente.

Reglas aplicadas:
- `FinderFooter`: `position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; maxWidth: 480` — se centra y respeta el ancho del contenedor en desktop
- Padding inferior del footer: `max(18px, env(safe-area-inset-bottom))` — cubre el home indicator de iOS
- Shadow siempre activo (sin condición): `0 -4px 16px -4px rgba(0,0,0,0.10)`
- El sentinel div y el IntersectionObserver fueron eliminados — no aplican con fixed
- `StepLayout` y `Screen`: `min-height: 100dvh` con fallback `min-height: 100vh` (vía clase CSS, no inline)
- Área scrollable de `StepLayout`: `paddingBottom: 120` (no 96) para garantizar visibilidad completa del último elemento

Por qué: `100vh` en mobile toma la altura máxima del viewport (con browser chrome
oculto). Cuando el browser muestra la barra de URL el viewport se contrae y `sticky`
queda fuera del área visible. `fixed` se ancla al viewport real ignorando el scroll
container. `100dvh` se ajusta dinámicamente al viewport visible en cada momento.
Soporte: Chrome 108+, Safari 15.4+, Firefox 101+ — fallback `100vh` cubre el resto.
