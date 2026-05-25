# EZON Finder V2 — Prompts y mapeos concretos

> **Companion de:** `EZON-Finder-Icons-V2-Plan.md`
> **Para:** Claude Code (revert + integración Lucide), generación de texturas (Midjourney/Recraft/Unsplash), redibujado de iconos custom en Figma.
> **Convención:** los prompts para Claude Code están en bloques etiquetados `claude-code`. Los prompts para IA de imagen en bloques `prompt`. Las decisiones técnicas en prosa.

---

## 1. Revert P01 (MaterialScreen) — fase 0

**Objetivo:** dejar P01 en un estado intermedio funcional con un visual neutro mientras se producen las texturas. El revert no debe tocar lógica de matcher ni navegación.

### Prompt para Claude Code

```claude-code
Tarea: revertir el visual de P01 (MaterialScreen) a un estado neutro pre-V2 sin romper lógica.

Archivos a tocar:
- src/screens/MaterialScreen.jsx
- (opcional) src/components/OptionCardGrid.jsx — solo si es necesario para soportar un placeholder visual de color sólido sin imagen.

Cambios:
1. En MaterialScreen.jsx, eliminar las propiedades `image: '/assets/img/imagenes-preguntas/p01-*.webp'` de los objetos de MATERIALS (madera, metal, vidrio).
   Resultado: las cards de material ya no apuntan a una imagen específica.

2. Para cada material (madera, metal, vidrio, otros), conservar la propiedad `mood` con los valores actuales (`madera`, `metal`, `vidrio`, `neutral`) — son los que definen el color de fondo del hero de la card.

3. Mantener intacta la card de "unknown" (No lo sé) con su mood `unknown` y `badge: false`.

4. NO tocar:
   - El array `MATERIALS` en su estructura (id, title, subtitle, mood, badgeLabel).
   - La lógica de selección.
   - El componente OptionCardGrid en `variant="visual"` — debe seguir funcionando sin la prop `image`, renderizando el hero solo con el color de mood.

5. Validación obligatoria post-cambio:
   - `npm run build` debe pasar sin errores.
   - Navegar a /material en dev y verificar que las 5 cards renderizan, el hero muestra el color de mood sin imagen, la selección funciona, y el footer (CONTINUAR) se habilita al elegir.

6. Commit message: `chore(P01): remove conditional door photos, neutral state pre-V2`.

Restricciones:
- No introducir nuevas dependencias.
- No modificar tokens.js.
- No tocar matcher.js ni navegación en App.jsx.
- Si OptionCardGrid no soporta hero sin imagen, hacer la mínima modificación necesaria (probablemente un fallback que renderice el `mood` color como fondo del hero cuando `image` es undefined).
```

---

## 2. Revert P02 (DoorTypeScreen) — fase 0

**Objetivo:** eliminar la dependencia de fotos condicionadas por material y dejar iconos placeholder simples hasta integrar Lucide en fase 3.

### Prompt para Claude Code

```claude-code
Tarea: simplificar DoorTypeScreen eliminando la lógica de imagen condicionada por material. Dejar los SVGs inline actuales como visual provisional.

Archivos a tocar:
- src/screens/DoorTypeScreen.jsx

Cambios:
1. Eliminar la constante `PHOTO_TYPES` y toda la lógica de construcción de `base` y `${base}-abierta.webp`.

2. Eliminar el cálculo de `materialKey` basado en `answers.material`.

3. Eliminar el `.map()` que reemplaza `opt.image` con un path de imagen.

4. Pasar `visibleOptions` directamente como `options` al `OptionCardGrid`. Las cards de abatible/corrediza/reja conservarán sus SVGs inline actuales (los del array DOOR_TYPES).

5. NO tocar:
   - La constante `DOOR_TYPES` con sus SVGs inline.
   - La lógica de filtrado por `getViableDoorTypes(answers)`.
   - La card de "unknown".
   - El header de StepLayout, el título o el deck.

6. Validación post-cambio:
   - `npm run build` debe pasar sin errores.
   - Navegar a /material → seleccionar madera → continuar → /door-type. Las 3 cards (abatible, corrediza, reja) deben renderizar con sus SVGs inline. La selección debe funcionar.
   - Repetir con metal y vidrio: las cards deben verse idénticas independientemente del material seleccionado (sí, la imagen ya no cambia con el material — es el objetivo).

7. Commit message: `refactor(P02): remove material-conditioned image paths, use inline SVG fallback`.

Restricciones:
- No introducir Lucide todavía. Esta fase es solo revert.
- No tocar matcher.js.
- No cambiar copy.
```

---

## 3. Prompts para generación de texturas P01

**Decisión técnica:** Unsplash es la opción más barata y rápida si las texturas son de buena calidad y la licencia (Unsplash License) permite uso comercial. Para máxima coherencia entre las 4, generar con un mismo modelo (Midjourney v6 o Recraft) en una sesión.

### Búsqueda en Unsplash (opción rápida, gratuita)

| Material | Búsqueda en Unsplash | Lo que buscar |
|---|---|---|
| Madera | `oak wood grain texture` / `walnut wood grain` | Veta horizontal, tono cálido medio, sin nudos pronunciados |
| Metal | `brushed steel texture` / `aluminum brushed` | Cepillado horizontal, gris neutro frío, sin reflejos especulares |
| Vidrio | `frosted glass texture` / `tempered glass close-up` | Translucidez con grano sutil, no transparente puro |
| Otros (placeholder) | `concrete texture` o un solid color sutil | Neutro, no compite con los otros 3 |

Reglas de curación:
- 4 imágenes con el **mismo encuadre relativo** (todas close-up plano frontal).
- **Misma iluminación percibida** — todas iluminación difusa, sin sombras duras.
- **Mismo balance de color** — si una se ve azulada y otra cálida, ajustar en post (Photoshop / Photopea).
- Crop final 800×800 píxeles, JPG calidad 80, <120KB cada una.
- Filename: `p01-madera.jpg`, `p01-metal.jpg`, `p01-vidrio.jpg`, `p01-otros.jpg`.
- Ubicación en repo: `/public/assets/img/textures/`.

### Prompts para Midjourney v6 (opción curada, mayor consistencia)

Prompt base compartido:

```
close-up macro photograph of [MATERIAL DESCRIPTION], 
even diffused studio lighting from the top-left, 
flat frontal angle, 
minimal depth of field, 
neutral background, 
no objects in frame, 
no shadows on subject, 
hyper-detailed surface texture, 
muted natural color palette, 
editorial product photography style, 
1:1 aspect ratio --ar 1:1 --style raw --stylize 100
```

Variantes por material (reemplaza `[MATERIAL DESCRIPTION]`):

- **Madera:** `oak wood grain with subtle horizontal striations, medium warm tone, matte finish, no knots`
- **Metal:** `brushed stainless steel with fine horizontal grain, cool neutral gray, satin finish, no reflections`
- **Vidrio:** `frosted tempered glass surface, slightly translucent, fine pebble grain, cool neutral light`
- **Otros / neutral:** `smooth raw concrete surface, light gray, micro-texture, no cracks, no aggregate`

**Importante:** las cuatro deben generarse en una misma sesión con el mismo `--stylize` y `--style raw` para que la "firma" del modelo sea consistente. Luego curar la mejor de cada batch de 4 imágenes.

### Prompts para Recraft AI (alternativa con mejor control)

Recraft permite definir un estilo de referencia y reutilizarlo:

1. Generar primero la textura de madera con el prompt base + variante.
2. Marcar como "Style reference" en Recraft.
3. Generar las otras 3 usando la misma referencia de estilo, solo cambiando la descripción del material.

Esto garantiza coherencia de iluminación y tratamiento entre las 4 imágenes.

### Validación post-generación

Antes de integrar, verificar:

- Las 4 imágenes en una grilla 2×2 se ven como un set, no como 4 imágenes sueltas.
- El footer blanco de la card (con título "Madera" / "Metal" / etc.) tiene contraste suficiente sobre la textura — si la textura es muy clara, considerar oscurecer levemente el borde inferior de la imagen con un gradiente sutil en post.
- Ninguna textura tiene un detalle "narrativo" (un clavo, una manija, una mancha) que distraiga.

---

## 4. Mapeo Lucide para P02 (Tipo de apertura)

**Fase 3 del plan.** Reemplazar los SVGs inline custom actuales por iconos de Lucide.

| Opción | Lucide icon | Notas |
|---|---|---|
| Abatible | `DoorOpen` | Comunica "puerta abriéndose hacia un lado" — el concepto exacto |
| Corrediza | `MoveHorizontal` superpuesto sobre `RectangleVertical` ó icono custom mínimo | Lucide no tiene `SlidingDoor` directo. Alternativa: usar dos `RectangleVertical` lado a lado con flecha entre ellos |
| Reja | `Fence` | Comunica "barras verticales" — el concepto exacto |
| No lo sé | `HelpCircle` | Estándar transversal para "unknown" en todo el flujo |

### Prompt para Claude Code (fase 3, no fase 0)

```claude-code
Tarea: reemplazar los SVGs inline de DoorTypeScreen por iconos de Lucide.

Pre-requisito: `lucide-react` debe estar instalado (fase 1 del plan).

Archivos a tocar:
- src/screens/DoorTypeScreen.jsx

Cambios:
1. Importar al inicio del archivo:
   ```js
   import { DoorOpen, Fence, MoveHorizontal, HelpCircle } from 'lucide-react';
   ```

2. En el array DOOR_TYPES, reemplazar el SVG inline de cada opción por un componente Lucide:
   - `abatible` → `<DoorOpen size={32} strokeWidth={1.5} color="#FAFAF8" />`
   - `corrediza` → `<MoveHorizontal size={32} strokeWidth={1.5} color="#FAFAF8" />`
   - `reja` → `<Fence size={32} strokeWidth={1.5} color="#FAFAF8" />`
   - `unknown` → `<HelpCircle size={32} strokeWidth={1.5} color="#6B6B6B" />`

3. Los moods de fondo permanecen iguales (`abatible`, `corrediza`, `metal`, `unknown`).

4. Validar build y flujo end-to-end.

5. Commit: `feat(P02): replace inline SVGs with Lucide icons`.

Restricciones:
- Stroke weight = 1.5 en todos los iconos. No usar otro valor.
- Tamaño = 32 en hero de card. No usar otro tamaño.
- Color = `#FAFAF8` sobre moods oscuros, `#6B6B6B` solo en card "unknown".
- No tocar matcher.js.
```

---

## 5. Mapeo Lucide para P05 (Funciones)

**Fase 5 del plan.** Usar como placeholder hasta integrar SVGs de EZON.

Funciones disponibles en `data/products.js` (según `getViableFunctions` en `matcher.js`):

| Función (clave) | Label en UI | Lucide fallback | Mapeo en EZON CDN si existe |
|---|---|---|---|
| `bloqueoAutomatico` | Bloqueo automático | `LockKeyhole` | (pedir) |
| `modoNino` | Modo niño | `ShieldCheck` | (pedir) |
| `camara` | Cámara / videoportero | `Video` | `videoportero.png` (ya en CDN) |
| `codigosTemporales` | Códigos temporales | `KeyRound` | (pedir) |
| `aperturaRemota` | Apertura remota | `Smartphone` o `Wifi` | `icon-ezon-acceso-remoto` (ya en CDN) |
| `googleHomeAlexa` | Google Home / Alexa | `Speaker` | (pedir si existe icon de assistant) |
| `adminAirbnb` | Gestión Airbnb / rentas | `Users` o `CalendarClock` | (pedir) |

Métodos de acceso (P05 visual cards, ya cuenta con iconos del CDN):

| Método (clave) | Lucide fallback | EZON CDN (`accessIcons.js`) |
|---|---|---|
| `huella` | `Fingerprint` | `huella_digital` ✅ |
| `pin` | `Hash` | `codigo_pin` ✅ |
| `rfid` | `CreditCard` | `tarjeta_rfid` ✅ |
| `app` | `Smartphone` | `acceso_app` ✅ |
| `facial` | `ScanFace` | `usuarios` (representa rostro) ✅ |
| `llaveRespaldo` | `Key` | (pedir si EZON tiene icono específico de "llave de respaldo") |

### Prompt para Claude Code (fase 5)

```claude-code
Tarea: refactorizar AccessIcon.jsx para soportar dos fuentes (CDN EZON + Lucide fallback) según un mapeo declarativo.

Archivos a tocar:
- src/components/AccessIcon.jsx
- src/data/accessIcons.js (extender)
- src/components/FeatureIcon.jsx (mismo patrón)

Cambios:
1. En accessIcons.js, extender el mapeo para incluir cada método con sus dos fuentes:
   ```js
   export const ACCESS_ICON_MAP = {
     huella: { cdn: '<url-CDN-existente>', lucide: 'Fingerprint' },
     pin: { cdn: '<url-CDN-existente>', lucide: 'Hash' },
     rfid: { cdn: '<url-CDN-existente>', lucide: 'CreditCard' },
     app: { cdn: '<url-CDN-existente>', lucide: 'Smartphone' },
     facial: { cdn: '<url-CDN-existente>', lucide: 'ScanFace' },
     llaveRespaldo: { cdn: null, lucide: 'Key' },
   };
   ```

2. En AccessIcon.jsx, modificar para que reciba un `type` y elija render:
   - Si existe URL CDN → renderizar `<img src={...} alt={label} />` con tamaño y color invertido por filtro CSS (`filter: invert(1)` en cards oscuras).
   - Si no existe URL CDN → renderizar el icono de Lucide correspondiente con `size={28}` y `strokeWidth={1.5}`.

3. Aplicar el mismo patrón a FeatureIcon.jsx para los iconos de funciones.

4. Documentar en comentario del archivo: "Default is EZON CDN. Lucide acts as fallback when CDN is null. To swap a CDN icon for Lucide, set cdn: null."

5. Validación: navegar a /access y /functions. Todos los iconos deben renderizar (los del CDN deben aparecer; los que no tienen CDN deben mostrar Lucide).

6. Commit: `feat(icons): unified icon source with CDN-first / Lucide-fallback strategy`.
```

---

## 6. Iconos custom P04 (Tipo de cerradura) — recalibrado en Figma

**Fase 4 del plan.** No regenerar desde cero. Los SVGs actuales en `LockTypeScreen.jsx` ya tienen los conceptos correctos. Solo unificar.

### Checklist de recalibrado en Figma

Para cada uno de los 4 SVGs (`conManija`, `pushPull`, `cerrojo`, `candado`):

- [ ] Importar el SVG inline actual a un frame de Figma de 32×32px.
- [ ] Convertir todos los strokes a 1.5px (valor del proyecto).
- [ ] Aplicar `line cap: round` y `line join: round` a todos los paths.
- [ ] Alinear el icono al grid de 24×24 dentro del frame de 32×32 (es decir, dejar 4px de padding óptico).
- [ ] Verificar que el peso visual sea similar entre los 4 iconos lado a lado — un icono "vacío" como "candado" debería sentirse del mismo peso que uno "lleno" como "conManija".
- [ ] Exportar cada uno como JSX inline (copy del path con `stroke="white"` `strokeWidth="1.5"` `strokeLinecap="round"` `strokeLinejoin="round"`).
- [ ] Pegar de vuelta en `LockTypeScreen.jsx` reemplazando los SVGs actuales.

### Hint específico por icono

| Icono | Qué ajustar respecto al actual |
|---|---|
| `conManija` | El cilindro vertical actual es muy alto y delgado. Acortar la altura del cilindro y engrosar la manija para que la silueta sea más reconocible a 32px |
| `pushPull` | Las flechas dobles arriba/abajo se ven complicadas. Simplificar a una sola barra vertical con dos flechas pequeñas (una izq, una der) o cambiar a símbolo de "doble flecha vertical centrada" |
| `cerrojo` | La caja con candado a la derecha es buena. Solo asegurar que el shackle (parte semicircular) tenga el mismo grosor que la base |
| `candado` | Bien resuelto. Solo recalibrar stroke a 1.5px |

---

## 7. Setup de tokens (fase 1)

### Prompt para Claude Code

```claude-code
Tarea: agregar tokens de iconos a tokens.js.

Archivo: src/design-tokens/tokens.js

Cambios:
1. Agregar al final del archivo (antes del export):
   ```js
   export const ICON_STROKE = 1.5;
   export const ICON_SIZE_HERO = 32;     // iconos en hero de card de selección
   export const ICON_SIZE_INLINE = 28;   // iconos en card compacta horizontal o chip
   export const ICON_SIZE_SMALL = 20;    // iconos en chips de feature o badge
   export const ICON_COLOR_ON_DARK = '#FAFAF8';
   export const ICON_COLOR_ON_LIGHT = '#111111';
   export const ICON_COLOR_MUTED = '#6B6B6B';
   ```

2. Asegurar que se exportan junto con el resto de tokens.

3. Buscar en el codebase usos hardcoded de `strokeWidth={1.5}` o `strokeWidth={2}` en SVGs/Lucide y reemplazar por import del token. (Solo si el cambio es trivial — no introducir refactor masivo en este commit.)

4. Commit: `chore: add icon design tokens to tokens.js`.

Restricciones:
- No introducir CSS-in-JS.
- No introducir helpers nuevos en components/.
- Mantener los valores en JS constants accesibles vía import.
```

---

## 8. Resumen ejecutivo de prompts

| Cuándo | Prompt | Quién |
|---|---|---|
| Fase 0 (hoy) | §1 Revert P01 | Claude Code |
| Fase 0 (hoy) | §2 Revert P02 | Claude Code |
| Fase 1 | §7 Setup tokens | Claude Code |
| Fase 1 | `npm install lucide-react` | Terminal |
| Fase 2 | §3 Generar texturas | Midjourney/Recraft/Unsplash (Julio) |
| Fase 3 | §4 Lucide en P02 | Claude Code |
| Fase 4 | §6 Recalibrar P04 | Figma manual (Julio) |
| Fase 5 | §5 CDN + Lucide en P05 | Claude Code |
| Fase 5 (espera) | Brief a EZON | Enviar `EZON-Finder-EZON-Icons-Request.md` a Dan |
