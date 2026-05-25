# EZON Smart Lock Finder — Sistema visual V2 (iconos + texturas)

> **Versión:** 2.0 · **Fecha:** 2026-05-25 · **Reemplaza:** `EZON - Finder images V1.md` (Método B con fotos condicionadas)
> **Estado:** Plan aprobado · pendiente ejecución
> **Responsable:** Julio (diseño + integración) · Rodrigo no participa en V2

---

## 1. Por qué cambia el rumbo

La V1 (`EZON - Finder images V1.md`) proponía un sistema fotográfico condicionado por material — 37 assets generados con IA por Rodrigo, mostrando puertas completas en escena para cada combinación material × tipo de apertura.

Tras integración parcial y review interna, se detectan tres problemas:

1. **Inconsistencia visual transversal.** P01 y P02 usan fotos editoriales; P04 usa SVGs lineales sobre fondos oscuros; P05/P06 mezclan iconos planos. No hay un solo lenguaje visual.
2. **Costo de producción no justificado.** 37 assets condicionados por material + variantes abierta/cerrada → alto costo de iteración, alta probabilidad de derivar al cambiar una opción del flujo, y dependencia operativa de Rodrigo para cada ajuste.
3. **Card vs. asset.** El "high-end" percibido no vive en la foto/icono individual — vive en el tratamiento de la card (fondo, padding, escala, contraste). Un sistema de iconos coherente con buen tratamiento de card supera a fotos individuales inconsistentes.

**V2 invierte la apuesta:** unificación visual mediante sistema de cards + librería de iconos establecida + texturas para P01.

---

## 2. Principios de la V2

| # | Principio | Implicación práctica |
|---|---|---|
| 1 | **La card es el sistema, no el icono.** | Tratamiento consistente de fondos `mood`, padding, escala, stroke weight transversal a todos los pasos. |
| 2 | **Librería establecida + custom solo donde no hay opción.** | Lucide cubre P05–P06 sin esfuerzo. Custom (Figma manual) solo para P04, donde ninguna librería tiene push-pull/cerrojo/candado diferenciados. |
| 3 | **P01 textura, no escena.** | Madera, metal, vidrio se reconocen por textura close-up mejor que por puerta completa. Más abstracto = más unificado = menos disonancia con resto del flujo. |
| 4 | **Manuales de producto ≠ referencia visual.** | Los manuales son documentación técnica con cotas. Sirven para confirmar **silueta arquetípica** de cada tipo de cerradura, no para replicar fidelidad de modelo. |
| 5 | **Iconos no comunican fidelidad de SKU.** | El usuario elige categoría, no modelo. Forzar parecido al SP600/SD400/SL215 introduce disonancia cuando el resultado es otro modelo. |
| 6 | **Reverso barato.** | Cada decisión visual debe poder revertirse en una iteración. Si el sistema requiere reasset masivo para cambiar una opción del flujo, está mal diseñado. |

---

## 3. Mapa visual por pantalla

| Pantalla | Visual V1 (actual) | Visual V2 (objetivo) | Fuente |
|---|---|---|---|
| **P00 Cover** | Hero photo (editorial) | Sin cambio — mantener `entry-bg.jpg` actual | — |
| **P01 Material** | Foto de puerta completa por material (4 imgs) | **Textura close-up del material** (madera veteada, metal cepillado, vidrio templado, neutral) | Unsplash / generación IA (4 imgs) |
| **P02 Apertura** | Foto de puerta abierta condicionada por material (8–16 imgs) | **Icono de Lucide** unificado sobre card con `mood` neutro | Lucide (3 iconos) |
| **P03 Grosor** | Instructivo con cinta métrica por material | Sin cambio — diagrama de medición ya funciona como instrucción | — (mantener actual) |
| **P04 Tipo cerradura** | SVGs inline custom (lineal, fondos oscuros) | **Iconos custom redibujados** con stroke unificado | Custom Figma (4 iconos) |
| **P05 Funciones** | Iconos planos (HorizontalOptionCard) | **SVGs del CDN de EZON** (consistencia con sitio) o Lucide como fallback | EZON CDN (7+) o Lucide |
| **P06 Tipo cerradura** | (mismo que P04) | (mismo que P04) | — |
| **Resultados** | `ProductCard` + `FeatureIcon` chips | **Reusar iconos de P05** en chips de features | EZON CDN / Lucide |

> **Nota sobre la numeración:** el documento `EZON - Finder images V1.md` usa P00–P06 (con Métodos de acceso como P04 y Tipo de cerradura como P06). En el código actual (`CLAUDE.md`) el orden es: Material → DoorType → Thickness → LockType → Access → Functions, y Métodos de acceso vive en `/access` (paso 5), Funciones en `/functions` (paso 6). Esta tabla usa la numeración del **código actual** para evitar confusión. Tipo de cerradura = LockTypeScreen, paso 4.

---

## 4. Stack de iconos elegido

### Librería primaria: **Lucide** (`lucide-react`)

Decisión: Lucide sobre Phosphor/Tabler por estas razones puntuales:

- **1500+ iconos** con cobertura completa para funciones de smart lock (lock, unlock, key, fingerprint, camera, wifi, smartphone, clock, users, shield, etc).
- **Stroke configurable globalmente** vía prop `strokeWidth` — clave para mantener consistencia transversal.
- **Tamaño óptico calibrado a 24px** — todos los iconos están dibujados para verse bien a esa escala.
- **MIT, mantenido activamente, fork moderno de Feather Icons** — sin riesgos de licencia ni de abandono.
- **Bundle size razonable** con tree-shaking — solo se importa lo que se usa.
- **Sin dependencias adicionales** y compatible con React 18.

Instalación:
```bash
npm install lucide-react
```

Uso canónico en el proyecto:
```jsx
import { Fingerprint, KeyRound, Lock, Smartphone, ScanFace, Wifi } from 'lucide-react';

// Tratamiento visual estándar en card:
<Fingerprint size={28} strokeWidth={1.5} color="#FAFAF8" />
```

**Stroke weight de proyecto: `1.5`** — más fino que el default (2) para sensación premium.

### Iconos custom: P04 (Tipo de cerradura)

Los conceptos "push-pull" / "cerrojo" / "candado" / "con manija" no tienen representación inequívoca en ninguna librería. Se mantienen los SVGs actuales de `LockTypeScreen.jsx` como **base** y se unifican según las reglas de Sección 5.

**No usar IA para regenerar estos iconos.** Los SVGs actuales son ~80% del trabajo final; solo necesitan calibración de stroke y proporción en Figma.

### Iconos del CDN de EZON: P05 (Funciones) — pendiente solicitar

Algunos íconos ya existen en `data/accessIcons.js` (huella, RFID, app, PIN, vena palmar/dactilar, videoportero). Falta confirmar con EZON si tienen SVGs adicionales para: bloqueo automático, modo niño, cámara, códigos temporales, apertura remota, Google Home/Alexa, administración Airbnb.

Ver `EZON-Finder-EZON-Icons-Request.md` para el brief de solicitud.

**Si EZON no tiene un icono específico → fallback a Lucide.** Documentar la decisión por icono en la tabla de assets final.

---

## 5. Reglas de tratamiento visual unificado

Estas reglas son **inviolables**. Cualquier desviación rompe la sensación de sistema.

### 5.1 Card de opción (variante `visual`)

| Propiedad | Valor | Notas |
|---|---|---|
| Aspect ratio del hero | 1:1 (cuadrado) en grid de 2 columnas | Mantener altura consistente entre todas las pantallas de selección |
| Fondo del hero (no seleccionado) | Color `mood` según opción | Ver paleta de moods abajo |
| Fondo del hero (seleccionado) | Mismo `mood` + borde verde `#7EDB8A` 2px | Sin cambio de fondo en estado seleccionado |
| Padding interno del hero | 20px todos lados (mobile 375px) | Suficiente aire alrededor del icono |
| Tamaño del icono | 32px en hero · 28px en card compacta | Calibrado para 24px óptico de Lucide |
| Color del icono | `#FAFAF8` (off-white) sobre fondos oscuros | Nunca verde |
| Opacidad del icono | 0.85 default · 1.0 cuando seleccionado | Sutil refuerzo visual de selección |
| Stroke weight | 1.5 transversal | Consistencia entre Lucide y custom |
| Footer de la card | Blanco `#FFFFFF` · padding 16px · título Montserrat 700 + subtitle Open Sans 400 | Sin cambios sobre patrón actual |

### 5.2 Paleta de moods (fondos de hero)

Mantener nomenclatura ya usada en el código (`mood: 'madera'`, etc.). Valores tentativos light-dominant (a calibrar en Figma con Dan):

| Mood | Pantallas | Color sugerido | Sensación |
|---|---|---|---|
| `madera` | P01, P02 (cuando material=madera) | `#E8D5B7` (cálido claro) | Cálido, residencial |
| `metal` | P01, P02 (cuando material=metal) | `#C4C8CC` (gris frío claro) | Industrial, neutro |
| `vidrio` | P01, P02 (cuando material=vidrio) | `#D6E4E5` (azul-verde muy claro) | Translúcido, fresco |
| `neutral` / `otros` | P01 ("Otro"), fallback | `#E5E5E5` (gris EZON `BORDER_REST`) | Neutro, opción no especificada |
| `unknown` | "No lo sé" en todos los pasos | `#F5F5F5` (`BG_APP`) con `?` central | Salida explícita, no selección destacada |
| `lock-*` | P04 (4 tipos de cerradura) | Tonos oscuros (`#475569`, `#1E293B`, `#334155`) | Conserva tratamiento actual — funciona bien |
| `access-*` | P05 (6 métodos de acceso) | Oscuro unificado (`#1F2937`) | Cards oscuras con icono claro centrado |

**Decisión pendiente:** validar paleta light-vs-oscuro de P01/P02 con Dan antes de producir. La hipótesis actual es **light en P01–P02 (texturas), oscuro en P04–P05 (iconos)** — la transición de tonos refuerza el cambio de naturaleza de la pregunta (de "qué tienes" a "qué quieres").

### 5.3 Card "No lo sé"

- Mood: `unknown` (fondo `BG_APP` `#F5F5F5`).
- Sin imagen/icono fotográfico — solo un signo `?` en círculo de borde 1.5px, centrado.
- Sin badge.
- Tipografía y layout idénticos al resto de cards de su grid.

---

## 6. Plan de ejecución por fases

### Fase 0 — Revertir (1–2h)

**Objetivo:** desbloquear el repo del compromiso con fotos condicionadas y dejar P01–P02 en un estado intermedio funcional mientras se produce V2.

- [ ] Aplicar prompt revert P01 (textura simple) — ver `EZON-Finder-Icons-V2-Prompts.md` §1.
- [ ] Aplicar prompt revert P02 (icono Lucide en vez de foto condicionada) — ver §2.
- [ ] Build verification: `npm run build` debe pasar sin warnings.
- [ ] Commit aislado: `chore(visuals): revert P01/P02 to neutral state pre-V2`.

### Fase 1 — Instalación y setup (1h)

- [ ] `npm install lucide-react`.
- [ ] Crear `src/components/icons/index.js` que centraliza imports de Lucide usados en el proyecto. Centralizar evita imports dispersos y facilita reemplazos.
- [ ] Documentar stroke weight 1.5 y tamaños 28/32 en `tokens.js` como `ICON_STROKE` y `ICON_SIZE_HERO` / `ICON_SIZE_INLINE`.
- [ ] Commit: `chore: add lucide-react + icon tokens`.

### Fase 2 — P01 (Material): texturas (3–4h)

- [ ] Generar/descargar 4 texturas según prompt en `EZON-Finder-Icons-V2-Prompts.md` §3.
- [ ] Procesar cada textura a 800×800 JPG, <120KB.
- [ ] Reemplazar `image:` en `MaterialScreen.jsx` por los nuevos paths `/assets/img/textures/p01-{material}.jpg`.
- [ ] Validar contraste de texto del footer de la card sobre cada textura — si baja de 4.5:1, oscurecer ligeramente la textura o añadir gradiente sutil al borde inferior del hero.
- [ ] Validar en mobile real (375px).
- [ ] Commit: `feat(P01): replace door photos with material textures`.

### Fase 3 — P02 (Apertura): iconos Lucide (2h)

- [ ] Reemplazar los SVGs inline actuales de DoorTypeScreen por componentes Lucide: `DoorClosed` / `DoorOpen` / `MoveHorizontal` / fences pattern (ver §4 de prompts).
- [ ] Eliminar lógica de path condicionado por material (`p2-${materialKey}-${typeKey}-abierta.webp`). El icono no depende del material.
- [ ] Eliminar la nota DL/swap-image en `CLAUDE.md` — queda obsoleta.
- [ ] Commit: `refactor(P02): replace conditional photos with Lucide icons`.

### Fase 4 — P04 (Tipo cerradura): unificar SVGs custom (2h)

- [ ] Abrir SVGs actuales de `LockTypeScreen.jsx` en Figma.
- [ ] Recalibrar stroke a 1.5, alinear a grid de 32×32, normalizar terminaciones (round line caps).
- [ ] Re-exportar como JSX inline (no archivo SVG separado — mantener patrón del proyecto).
- [ ] Reemplazar en `LockTypeScreen.jsx`.
- [ ] Commit: `refactor(P04): unify lock-type icons stroke and proportions`.

### Fase 5 — P05 (Funciones) y resultados: pedir SVGs a EZON (espera + 2h integración)

- [ ] Enviar a Dan el brief de `EZON-Finder-EZON-Icons-Request.md`.
- [ ] Mientras se reciben: usar Lucide como **placeholder** en `FunctionsScreen.jsx` y `FeatureIcon.jsx` con los mapeos sugeridos en §5 de prompts.
- [ ] Cuando lleguen los SVGs de EZON: reemplazar mapeo en `accessIcons.js`, mantener Lucide como fallback documentado por icono.
- [ ] Commit: `feat(P05): integrate EZON CDN icons + Lucide fallback`.

### Fase 6 — Validación transversal (2h)

- [ ] Recorrido completo del flujo en mobile real (375px iOS Safari + Android Chrome).
- [ ] Checklist visual: ¿stroke weight consistente? ¿escala consistente? ¿colors de mood coherentes? ¿card "No lo sé" se siente integrada o pegada?
- [ ] Capturar screenshots de cada pantalla en estado vacío y seleccionado.
- [ ] Compilar deck visual de 1 página para Dan con antes/después.

### Fase 7 — Aprobación Dan + cierre (espera + 1h)

- [ ] Review con Dan sobre el deck.
- [ ] Ajustes menores según feedback.
- [ ] Actualizar `CLAUDE.md` con el patch de `CLAUDE-update-patch.md`.
- [ ] Marcar `EZON - Finder images V1.md` como `[DEPRECATED — superseded by V2]` en el header.
- [ ] Commit final: `docs: V2 icon system locked in, V1 photo system deprecated`.

**Estimación total:** ~14–16h de trabajo activo + esperas externas (texturas IA, SVGs de EZON, review Dan).

---

## 7. Criterios de éxito (cómo validar la V2)

Antes de mostrar a Dan, verificar mentalmente cada uno de estos puntos:

- [ ] **Test de identidad visual:** si tomo screenshots de P02, P04 y P05 lado a lado, ¿se ven como el mismo producto? Si la respuesta no es un sí inmediato, hay inconsistencia que arreglar.
- [ ] **Test de stroke weight:** todos los iconos del flujo tienen stroke ~1.5px aparente. Sin gruesos ni delgados que desentonen.
- [ ] **Test de escala óptica:** los iconos ocupan visualmente el mismo espacio relativo en sus cards. Un icono "pequeño" en P02 vs uno "grande" en P04 rompe la coherencia.
- [ ] **Test de "No lo sé":** la card de "No lo sé" se siente parte del sistema, no un parche. Padding, tipografía y proporción idénticos al resto.
- [ ] **Test de reversibilidad:** si Dan pide cambiar la textura de madera o cambiar un icono de Lucide por otro, ¿es un cambio de 5 minutos? Si requiere más, el sistema está sobre-acoplado.
- [ ] **Test de redundancia entre tab/copy:** si oculto el subtitle de cada card, ¿el icono solo comunica la opción? Debería ser ambiguo en algunos casos (correcto — el copy desambigua). Pero no debería ser ambiguo en *todos* los casos (eso indica iconos demasiado abstractos).

---

## 8. Anti-patrones a evitar

Cosas que parecen mejoras y no lo son. Si te tientan, parar y reconsiderar.

1. **Generar iconos de funciones con IA generativa.** El gradiente de calidad entre iconos generados por IA vs librería curada es brutal — perderás tiempo limpiando SVGs inconsistentes en Figma. Lucide ya pagó ese costo por ti.
2. **Replicar la silueta exacta de los manuales en P04.** Los manuales tienen cotas, sombras y detalles que no se traducen a 32×32 sin verse confusos. La silueta arquetípica gana.
3. **Mantener fotos condicionadas "por si acaso".** Si el sistema V2 funciona, las fotos condicionadas del V1 son código muerto que confunde a quien lea el repo. Borrar paths viejos del `public/assets/img/imagenes-preguntas/` después de Fase 7.
4. **Tratamientos de card diferentes por pantalla "para dar variedad".** La variedad la dan los iconos. La card es el contenedor — debe ser el mismo molde en todas las pantallas.
5. **Mezclar pesos de iconos de Lucide.** Lucide tiene stroke configurable, no pesos. Si mezclas `strokeWidth={1.5}` con `{2}` "porque ese se ve mejor", introduces inconsistencia. Elige uno y sostén.
6. **Pedir a EZON renders de producto para P04.** Vuelve al anti-patrón #2: alta fidelidad de producto en pasos categóricos genera disonancia con el resultado. Solo pedir SVGs de **funciones** (concepto), no de **producto**.

---

## 9. Dependencias y riesgos

| Dependencia | Riesgo | Mitigación |
|---|---|---|
| Generación de texturas IA | Estilo no homogéneo entre las 4 (madera vs metal vs vidrio) | Generar todas en una sola sesión, mismo modelo, mismo prompt base. Curar a mano la 4ª (neutral). |
| Aprobación de paleta light-vs-oscuro por Dan | Si Dan prefiere todo oscuro o todo claro, hay que recalibrar moods | Validar paleta antes de Fase 2 con un mockup rápido en Figma. |
| SVGs de EZON pueden tardar | Bloqueante para P05 final | Lanzar Fase 5 con Lucide como placeholder funcional. EZON-CDN entra como mejora post-launch. |
| Cambio de stroke en Lucide futuro | Si subes la versión de Lucide y cambia el calibrado de stroke | Pinear versión exacta en `package.json` (`"lucide-react": "X.Y.Z"`, no `^`). Documentar en `CLAUDE.md`. |

---

## 10. Entregables esperados al final de la V2

1. **Código.** Repo `ezon-finder-v2` con Lucide integrado, texturas P01, P02–P06 con iconos unificados, sin referencias a las imágenes condicionadas viejas.
2. **Documentación.** `CLAUDE.md` actualizado · `EZON - Finder images V1.md` marcado deprecated · este plan archivado como decisión de diseño.
3. **Deck de antes/después.** 1 página por pantalla, lado a lado V1/V2, para Dan y archivo de portafolio.
4. **Brief enviado a EZON.** Lista concreta de SVGs solicitados, con propósito documentado.

---

## 11. Glosario rápido para esta V2

- **Mood:** color/tono de fondo de la card según la opción. Definido en `tokens.js`.
- **Stroke weight:** grosor del trazo del icono. Lucide acepta como prop; custom debe alinearse.
- **Hero de card:** la zona superior cuadrada donde vive el icono/textura, antes del footer con texto.
- **Card compacta:** variante horizontal sin hero, usada en pasos con muchas opciones (referencia: `HorizontalOptionCard.jsx`).
- **Tamaño óptico:** la escala a la que un icono está dibujado para verse mejor. Lucide → 24px. Tu uso a 28–32px sigue siendo legible.

---

## 12. Bitácora de la V2

| Fecha | Decisión | Por qué |
|---|---|---|
| 2026-05-25 | Abandonar Método B (fotos condicionadas) | Inconsistencia transversal · costo de iteración alto |
| 2026-05-25 | Adoptar Lucide como librería primaria | Mejor balance cobertura/calidad/stroke configurable |
| 2026-05-25 | P01 = texturas, no escenas | Más unificable, menos sensible a contexto |
| 2026-05-25 | P04 mantiene custom (SVGs actuales recalibrados) | Conceptos sin equivalencia en librería |
| 2026-05-25 | P05 = CDN EZON primero, Lucide como fallback | Consistencia con sitio + autonomía si no llegan |
| 2026-05-25 | Stroke weight de proyecto = 1.5 | Más fino que default Lucide (2) → sensación premium |
