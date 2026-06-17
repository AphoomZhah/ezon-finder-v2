# EZON — Fix de logo: O verde en EntryScreen + sin pixelado · 2026-06-17

> Prompt para Claude Code / Antigravity sobre el repo `ezon-finder-v2`.
> Corrige dos cosas del logo introducido hoy: (1) en `EntryScreen` la "O" debe quedar
> **verde** (no blanca), y (2) el logo no debe verse pixelado en ninguna pantalla/resolución.
> Archivo correcto: `public/assets/ezon-main-logo.svg`.

---

## Diagnóstico

- En `AppHeader` (fondo claro) el logo va en color tal cual: letras `#1D1D1B`, O verde
  `#88C384`. **Ya se ve bien — no lo toques.**
- En `EntryScreen` (foto oscura) se usó `filter: brightness(0) invert(1)`. Ese filtro aplana
  TODO el SVG a blanco, por eso la O perdió el verde. Hay que cambiar el enfoque: en el hero
  las **letras** deben ser blancas pero la **O** debe conservarse verde.
- **Pixelado:** un `<img src="*.svg">` escala sin pérdida por definición. Si se ve pixelado,
  la causa NO es el SVG en sí. Las causas probables son: (a) un `filter` CSS que fuerza
  rasterización en ciertos navegadores, (b) `width`/`height` fijos que provocan reescalado
  borroso, o (c) que el archivo SVG contenga un `<image>` raster embebido. Hay que verificar
  y corregir.

---

## Solución

Para tener letras blancas + O verde sobre la foto, NO se puede usar un filtro monocromo.
Dos opciones; usa la **Opción A** (preferida) salvo que sea inviable, en cuyo caso Opción B.

### Opción A (preferida) — SVG inline con colores controlados por CSS

Renderizar el SVG **inline** en el JSX del `EntryScreen` (no como `<img>`), de modo que se
puedan pintar las letras de blanco y dejar la O en verde de marca. Como es vector inline,
escala perfecto a cualquier resolución y no hay filtro que lo rasterice.

### Opción B (fallback) — segundo asset SVG para fondo oscuro

Si prefieres no inline: crear `public/assets/ezon-main-logo-onDark.svg`, copia del original
pero con las letras en blanco (`#FFFFFF`) y la O en verde (`#88C384`), y referenciarlo como
`<img>` SIN ningún `filter`. Mantiene nitidez vectorial porque no hay filtro.

---

```
PROMPT — Fix logo EZON (O verde en hero + sin pixelado)

Contexto: repo ezon-finder-v2 (React 18 + Vite 5, inline styles). El logo de marca está en
public/assets/ezon-main-logo.svg (viewBox 0 0 796 239; letras fill #1D1D1B; la "O" es un
path con fill #88C384). Hoy se insertó el logo en AppHeader.jsx (fondo claro, en color, YA
SE VE BIEN) y en EntryScreen.jsx (foto oscura, usando filter: brightness(0) invert(1), que
volvió TODO blanco y borró el verde de la O).

Quiero dos correcciones, SOLO en EntryScreen.jsx (no toques AppHeader):
  (1) En el hero, las letras del logo deben ser BLANCAS pero la "O" debe quedar VERDE
      (#88C384, el verde de marca).
  (2) El logo NO debe verse pixelado a ninguna resolución. Es un SVG vectorial; si se ve
      pixelado, identifica y corrige la causa (filtro que rasteriza, dimensiones fijas que
      reescalan, o raster embebido en el archivo).

=== PASO 1 — Verificar el archivo SVG ===
Abre public/assets/ezon-main-logo.svg y confirma que NO contiene ningún elemento <image>
(raster embebido en base64). Debe ser solo <path>/<g>/<mask>/<defs>. Si encontraras un
<image>, repórtalo y detente: el archivo fuente estaría rasterizado y habría que reexportarlo
limpio desde el origen. (Lo esperado es que sean solo paths — en ese caso continúa.)

=== PASO 2 — EntryScreen.jsx: insertar el logo como SVG inline ===
Localiza el bloque actual del logo top-left, que hoy es algo como:
    <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
      <img src="/assets/ezon-main-logo.svg" alt="EZON"
        style={{ height: 26, width: 'auto', display: 'block',
                 filter: 'brightness(0) invert(1)' }} />
    </div>

Reemplázalo por el SVG INLINE, con las letras en blanco y la O en verde. Usa exactamente
los paths del archivo, asignando los fills explícitamente (NO uses filter):

    <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
      <svg
        viewBox="0 0 796 239"
        role="img"
        aria-label="EZON"
        style={{ height: 26, width: 'auto', display: 'block' }}
      >
        {/* Letras E, Z, N → blanco */}
        <path fill="#FFFFFF" d="M133.877 51.586H59.684V94.506H130.218V137.756H59.684V186.997H133.877V230.25H8.44604V8.334H133.877V51.586Z"/>
        <path fill="#FFFFFF" d="M226.156 186.996H321.311V230.25H141.982L248.448 51.585H159.283V8.334H332.291L226.156 186.996Z"/>
        {/* O → verde de marca */}
        <path fill="#88C384" d="M386.283 69.5513C376.635 78.8683 366.653 95.1703 366.653 119.79C366.653 140.087 373.308 156.388 386.948 169.696C401.255 183.337 417.224 187.994 434.527 187.994C457.151 187.994 473.12 179.678 483.768 169.029C492.416 160.713 503.064 145.076 503.064 119.457C503.064 96.5003 493.75 79.5333 483.768 69.5513C472.788 58.9043 455.154 50.5863 434.859 50.5863C415.563 50.5863 398.26 57.5743 386.283 69.5513ZM521.03 35.6163C541.992 55.9113 555.633 85.1883 555.633 119.457C555.633 149.07 544.984 179.347 521.03 202.633C500.4 222.596 472.457 235.238 435.19 235.238C393.602 235.238 365.321 218.606 348.687 202.633C327.394 182.674 314.085 152.729 314.085 120.122C314.085 88.1823 328.391 55.9113 348.354 35.9473C363.326 20.9773 390.94 3.34329 435.19 3.34329C469.792 3.34329 498.739 13.9893 521.03 35.6163Z"/>
        <path fill="#FFFFFF" d="M571.178 230.25V8.334H615.762L736.204 151.4V8.334H787.438V230.25H742.858L622.416 86.521V230.25H571.178Z"/>
      </svg>
    </div>

Notas:
- NO uses filter de ningún tipo aquí — el filtro era la causa de perder el verde y el
  posible motivo del rasterizado en algunos navegadores.
- Mantén height: 26 y width: 'auto' para conservar el ratio ~3.33:1 sin distorsión. Al ser
  SVG inline, escala nítido a cualquier densidad de pantalla.
- Si el import `EZON` de '../components' queda usado solo por el botón CTA (background: EZON),
  NO lo elimines. Verifica antes de tocar imports.

=== PASO 3 — Garantizar nitidez del logo del AppHeader (sin cambiar su color) ===
En AppHeader.jsx el logo se queda EN COLOR (no lo cambies). Solo verifica que el <img> del
logo no tenga width Y height fijos simultáneos que fuercen reescalado: debe ser
height: 22, width: 'auto', display: 'block'. Si ya está así, no lo toques.

=== PASO 4 — Verificación ===
- npm run build debe pasar.
- Revisa en navegador:
  · EntryScreen (foto oscura): letras blancas, O verde, bordes nítidos al hacer zoom.
  · ResultsScreen / AppHeader (fondo claro): logo en color, nítido.
- Prueba zoom del navegador al 200% y, si puedes, un viewport de alta densidad (devicePixelRatio
  2x): el logo debe permanecer perfectamente nítido en ambas pantallas.

=== PASO 5 — Registro ===
Actualiza el Task Log de CLAUDE.md:
  "Fix logo: EntryScreen ahora usa SVG inline (letras blancas, O verde #88C384), elimina
   filter brightness/invert; nitidez vectorial verificada", 2026-06-17.

NO toques matcher.js, products.js, ni screens fuera de EntryScreen.jsx (y la verificación
mínima de AppHeader.jsx). No agregues dependencias. No introduzcas dark mode.
```

---

## Checklist de validación

- [ ] `EntryScreen`: letras blancas + O verde `#88C384`.
- [ ] Sin `filter: brightness(0) invert(1)` en el logo del hero.
- [ ] `AppHeader` sigue en color, sin cambios.
- [ ] Logo nítido al 200% de zoom y en pantallas 2x (sin pixelado) en ambas pantallas.
- [ ] El SVG fuente no contiene `<image>` raster embebido.
- [ ] `npm run build` pasa.

---

## Por qué inline y no `<img>` + filtro

Un `<img src="*.svg">` no permite recolorear partes individuales del SVG por CSS — solo se
puede aplicar un filtro global, que aplana todo a un color. Para tener letras blancas Y O verde
hace falta acceso a los paths individuales, y eso solo se logra con el SVG **inline** en el DOM
(Opción A) o con un **segundo archivo** ya coloreado para fondo oscuro (Opción B). El inline
evita duplicar assets y mantiene un único origen de verdad para la geometría del logo.
