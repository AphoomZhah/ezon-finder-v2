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
| Fonts | Montserrat (headings, weight 900) + Open Sans (body) — loaded via Google Fonts in index.html |
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
| 02 | Implement UI adjustments on frontend | Add EZON logo. Add "prefiero hablar con ventas" secondary CTA on entry. Add "No lo sé" option per question. Remove % match label. Restructure result card (larger photo area). Update entry copy. No photos needed now. | M |
| 03 | Update entry screen copy | Support paragraph + "4–6 preguntas · ~2 minutos" + bill/ruler tip + replace "Ver catálogo" with "Prefiero hablar con ventas". | XS |
| 04 | Refine Location screen | Interior → sub-options (cuarto, closet, bodega, oficina). Exterior → sub-options (puerta principal, reja). Keep solar exposure alert. | S |
| 05 | Simplify Opening Type screen | Remove English terms. Keep "abatible" / "corrediza" only. Add sub-question: one leaf or two? Affects latch/strike compatibility. | XS |
| 06 | Decision flow → data mapping diagram | Map every answer combination → recommended SKUs. Bridge between visual flow and recommendation matrix. Deliverable for next Dan session. | M |
| 09 | Define embed URL with Jonathan | Subdomain vs path on ezonmexico.com. | XS |

### 🟡 In Progress

| # | Task | Started |
|---|---|---|
| 02 | Iteration on frontend (Claude Design base) | 2026-04-21 |

### ✅ Done

| # | Task | Completed |
|---|---|---|
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
- **Do not introduce React Router**, CSS modules, or any new dependencies without explicit request.
- **Do not add dark mode** — this is a light-only design system.
- When adding a new screen, add it to the `SCREENS` array in `App.jsx` and wire up the conditional render.
- When updating product data, edit `data/products.js` only — never hardcode product info in screens.
- When a task is completed, note it in the Task Log above with today's date.
