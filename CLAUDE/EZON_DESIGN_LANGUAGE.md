# EZON Smart Lock Finder — Design Language

> **Documento de referencia visual del sistema.**
> Este archivo define el lenguaje de diseño transversal del Smart Lock Finder. Todas las pantallas del flujo deben respetar lo aquí establecido. Si una pantalla "se ve distinta", la pantalla está mal — no el sistema.
>
> **Acompáñalo siempre con:**
> - `public/assets/ezon_finder_screen03_v2.html` (Paso 3 · Grosor del canto) — referencia visual canónica con instrumento técnico.
> - `public/assets/ezon_finder_screen01_material.html` (Paso 1 · Material) — referencia visual canónica de pantalla simple sin instrumento.
>
> Si hay conflicto entre este documento y los HTML de referencia, **los HTML mandan** — son la implementación autorizada.

---

## 1. Identidad y norte estético

EZON es distribuidor oficial de cerraduras inteligentes Samsung, Igloohome y Excel. El Finder es la herramienta que reemplaza la calificación manual por WhatsApp.

**Norte estético:** *Premium hardware aplicado a una herramienta de configuración.* La referencia mental es Teenage Engineering, Bang & Olufsen, Dyson — interfaces que se sienten como **instrumentos**, no como wizards de e-commerce. Producto como protagonista, tipografía técnica con confianza, layouts que respiran, microdetalles deliberados.

**Lo que el Finder NO es:**
- No es un quiz de Buzzfeed con bandas de color y emojis.
- No es un formulario de Tipform genérico.
- No es un wizard de Shopify por defecto.
- No usa modo oscuro como tema dominante (light-dominant es la regla; el negro aparece como acento de instrumento, no como fondo).

---

## 2. Sistema tipográfico

### 2.1 Familias

Solo dos familias. Ninguna otra. Si necesitas una tercera voz, no la introduzcas — usa pesos, tamaños o tracking sobre las dos existentes.

| Familia | Rol | Pesos cargados |
|---|---|---|
| **Montserrat** | Display, UI, valores numéricos, labels técnicas, botones, brand mark | 400, 500, 600, 700, 800 |
| **Open Sans** | Body — descripciones, párrafos, microcopy explicativo | 400, 500, 600 |

Carga ambas vía Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### 2.2 Reglas de uso

- **Montserrat 800** se reserva para casos puntuales (brand mark `EZON`, posiblemente algún número en billete decorativo). No abusar — la regla es que un usuario nunca debe ver dos elementos en 800 simultáneamente en pantalla.
- **Montserrat 700** es el peso por defecto para títulos de pantalla, títulos de tarjeta, botones, valores numéricos grandes, labels técnicas en mayúsculas.
- **Open Sans 400** es el peso por defecto para body. Open Sans 600 solo para énfasis dentro de párrafos (`<strong>`).
- **No introducir cursivas** (ni Montserrat italic ni Open Sans italic). El énfasis se logra con peso, no con estilo.
- **No usar serif de ningún tipo.** Cualquier referencia previa a `Instrument Serif` u otra serif queda descartada.

### 2.3 Escala tipográfica

```css
/* Títulos de pantalla (h1) */
font-family: var(--font-display);   /* Montserrat */
font-weight: 700;
font-size: 28px;
line-height: 1.15;
letter-spacing: -0.02em;

/* Deck (subtítulo bajo el título) */
font-family: var(--font-body);      /* Open Sans */
font-weight: 400;
font-size: 14px;
line-height: 1.55;
max-width: 32ch;

/* Títulos de tarjeta */
font-family: var(--font-display);
font-weight: 700;
font-size: 16px;
letter-spacing: -0.015em;

/* Descripción de tarjeta */
font-family: var(--font-body);
font-weight: 400;
font-size: 12px;
line-height: 1.4;

/* Valor numérico grande (ej. 3–5cm) */
font-family: var(--font-display);
font-weight: 700;
font-size: 22px;
letter-spacing: -0.03em;
font-variant-numeric: tabular-nums;

/* Step meta y section labels (las "etiquetas técnicas") */
font-family: var(--font-display);
font-weight: 700;
font-size: 10px;
letter-spacing: 0.16em;
text-transform: uppercase;
font-variant-numeric: tabular-nums;

/* Brand mark (EZON) */
font-family: var(--font-display);
font-weight: 800;
font-size: 13px;
letter-spacing: 0.16em;
text-transform: uppercase;

/* Botones */
font-family: var(--font-display);
font-weight: 700;
font-size: 13px;
letter-spacing: 0.06em;
text-transform: uppercase;
```

### 2.4 La voz "etiqueta técnica"

Es el patrón que aparece en step-meta superior, section labels, badges de tarjeta, labels de instrumento, progreso del footer, etiquetas de medidas. **Es el sello del sistema** — donde aparece, el producto se siente premium hardware. Las reglas:

- Montserrat 600-700.
- Tamaño 8-10px.
- `letter-spacing: 0.14em` a `0.20em`.
- `text-transform: uppercase`.
- `font-variant-numeric: tabular-nums` cuando incluya dígitos.
- Color de baja intensidad (gris terciario o cuaternario) salvo cuando indique estado activo (verde EZON o tinta primaria).

Cualquier elemento que sea "metadata" o "estado" debe usar esta voz. No usarla para body ni para títulos.

---

## 3. Sistema de color

### 3.1 Tokens

```css
:root {
  /* Tinta — escala de grises cálidos */
  --ink-primary:      #0A0A0A;   /* texto principal, bordes fuertes */
  --ink-secondary:    #4A4A4A;   /* descripciones, texto secundario */
  --ink-tertiary:     #8A8A8A;   /* labels técnicas en estado pasivo */
  --ink-quaternary:   #BCBCBC;   /* texto sobre fondo oscuro tenue, microcopy */
  --line:             #E4E4E4;   /* bordes de tarjeta, separadores */
  --line-strong:      #1A1A1A;   /* bordes de énfasis */

  /* Superficies */
  --surface:          #F4F3EF;   /* fondo principal cálido off-white */
  --surface-raised:   #FAFAF8;   /* superficies elevadas (footer) */
  --surface-card:     #FFFFFF;   /* tarjetas */
  --surface-deep:     #ECEAE3;   /* tarjeta "no lo sé", chips de label */

  /* EZON green — único acento */
  --ezon:             #7EDB8A;
  --ezon-ink:         #0A0A0A;   /* tinta sobre fondo verde EZON */
  --ezon-shadow:      rgba(126, 219, 138, 0.35);
}
```

### 3.2 Reglas de aplicación del verde

El verde EZON `#7EDB8A` es el **único acento de color** del sistema. Se usa con restricción y siempre con intención:

**SÍ usar verde EZON para:**
- Punto de confirmación (dot verde junto a step-meta y badges).
- Anotaciones técnicas dentro del instrumento de medición (líneas de medida, valores en mono).
- LED activo en componentes tipo instrumento.
- Estado seleccionado puntual (checkmark dentro de círculo verde, en esquina superior derecha de tarjeta seleccionada).
- Botón primario "ready" cuando la pregunta tiene respuesta válida.
- Letra "O" del logo `EZON` (acento del brand mark).
- Border activo en chips/toggles de selección menor (denominación de billete).

**NO usar verde EZON para:**
- Flood fill verde claro como background de tarjetas seleccionadas (esto se ve "marketplace barato"). El estado seleccionado en tarjetas grandes usa **borde negro grueso 2px + dot verde puntual**, no fondo verde.
- Texto largo (no es color de cuerpo).
- Bordes de tarjetas no seleccionadas.
- Sombras grandes o glows decorativos sin función.
- Iconografía decorativa.

### 3.3 Estado seleccionado — patrón canónico

Una tarjeta seleccionada NO se vuelve verde. Sigue siendo blanca. La indicación de selección es:

```css
.opt-card.selected {
  border-color: var(--ezon-ink);     /* borde negro */
  box-shadow:
    0 0 0 2px var(--ezon-ink),       /* anillo de refuerzo negro */
    0 4px 16px -4px rgba(0,0,0,0.08);
}

.opt-card.selected::before {
  /* Dot verde EZON en esquina superior derecha */
  content: '';
  position: absolute;
  top: 10px; right: 10px;
  width: 14px; height: 14px;
  background: var(--ezon);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--surface-card);
}

.opt-card.selected::after {
  /* Checkmark negro dentro del dot verde */
  content: '';
  position: absolute;
  top: 13px; right: 13px;
  width: 8px; height: 8px;
  background-image: url("data:image/svg+xml,...");
}
```

Este patrón es **inviolable** — si una pantalla se desvía de él, está rota.

---

## 4. Geometría y espaciado

### 4.1 Radios

```css
--radius-sm: 4px;    /* chips pequeños, badges, segments de progreso */
--radius-md: 8px;    /* botones, chips de billete, inputs */
--radius-lg: 14px;   /* tarjetas de opción */
--radius-xl: 22px;   /* contenedor de instrumento (panel de medición) */
```

### 4.2 Padding del contenedor

- Padding horizontal del content area: **24px** a cada lado.
- Padding vertical del content area: el header ya define top; bottom es **140px** para dejar espacio al footer pegajoso.
- Gap entre tarjetas en grilla 2 columnas: **8-10px**.
- Gap entre secciones (ej. entre el bloque de opciones y el bloque de instrumento): **36px**.

### 4.3 Mobile-first

El sistema está diseñado para **375px** como ancho de referencia. En desktop, el contenedor se centra con `max-width: 480px` (similar a un container móvil ampliado) o se monta en una columna lateral si Shopify lo embebe en un sidebar. Las decisiones tipográficas y de spacing **no se escalan** entre mobile y desktop — son las mismas. Lo que cambia es el contenedor, no el contenido.

---

## 5. Componentes canónicos

### 5.1 App Header

Barra superior fija con tres elementos:

```
[Back btn 36×36 circular]   [EZON brand]   [Ayuda link]
```

- Back btn: círculo blanco, borde gris claro, ícono chevron izquierdo. En la pantalla 1 del flujo (Material), el back btn navega al welcome o desaparece según la decisión de producto.
- Brand `EZON` con la `O` en verde EZON. Montserrat 800, 13px, tracking 0.16em, mayúsculas.
- "Ayuda" link en Montserrat 600, 10px, tracking 0.14em, mayúsculas, color terciario, con borde inferior 1px gris claro.

Padding: `4px 24px 18px`. Es decir, abraza al status bar y respira hacia el contenido.

### 5.2 Step Meta (encabezado de pregunta)

Aparece **antes** del título de pregunta. Contiene tres elementos en línea:

```
[• dot verde]  [01 / 06]  [Material de la puerta]
```

- Dot verde EZON 4×4px.
- Número de paso "01 / 06" en color tinta primaria.
- Nombre del paso en color tinta terciaria.
- Toda la línea en estilo "etiqueta técnica" (Montserrat 700, 10px, tracking 0.16em, uppercase).

**Esta es la firma transversal del sistema.** Aparece en TODAS las pantallas del flujo. No omitir, no decorar, no mover de posición.

### 5.3 Title + Deck

```html
<h1 class="question">¿De qué material es tu puerta?</h1>
<p class="question-deck">La foto te ayuda a identificarla, no necesitas saber el nombre técnico.</p>
```

- Título: Montserrat 700, 28px, tracking -0.02em, line-height 1.15.
- Deck: Open Sans 400, 14px, line-height 1.55, color secundario, max-width 32ch (corta naturalmente para evitar líneas larguísimas).
- Margen entre título y deck: 12px. Margen entre deck y siguiente bloque: 28px.

**Sin emphasis con `<em>` ni serif italic.** El título es 100% Montserrat.

### 5.4 Section Label (separador de secciones internas)

Aparece cuando una pantalla tiene múltiples secciones (ej. Paso 3 con A: Selecciona el rango, B: Instrumento de medición). Estructura:

```
[A]  SELECCIONA EL RANGO ━━━━━━━━━━━━━━━━━━━━━━━
```

- Chip cuadrado pequeño con la letra (A, B, C) en Montserrat 700, fondo gris suave (`--surface-deep`).
- Label en estilo "etiqueta técnica".
- Línea horizontal 1px gris (`--line`) que rellena el espacio restante.

Solo aparece si hay más de una sección. Pantallas simples (Material, Apertura, Métodos) no lo necesitan.

### 5.5 Option Card (tarjeta de opción) — el componente más usado

#### Variante A: tarjeta con visual hero (Material)

```
┌────────────────────────┐
│  [VISUAL · 124px alto] │  ← textura/foto del material
│  • MADERA              │  ← badge en esquina inferior izq.
├────────────────────────┤
│  Madera                │  ← título Montserrat 700, 16px
│  Puertas residenciales,│  ← desc Open Sans 400, 12px
│  departamentos y casas │
└────────────────────────┘
```

- Borde 1px `--line`.
- Border-radius `--radius-lg` (14px).
- Visual ocupa la parte superior con `border-radius: 14px 14px 0 0`.
- Cuerpo de texto: padding 14px 14px 16px.
- Min-height variable según contenido pero consistente dentro de la pantalla.

**Badge en visual:** chip negro semitransparente con backdrop-blur, padding 4×8px, etiqueta técnica con dot verde EZON.

#### Variante B: tarjeta con diagrama técnico (Grosor)

```
┌────────────────────────┐
│  ▓▓                    │  ← diagrama del canto a escala
│  ┝━━┥                  │  ← línea de medida con ticks
│                        │
│  3–5cm                 │  ← valor numérico Montserrat 700, 22px
│  Estándar — mayoría    │  ← desc Open Sans 400, 12px
│  de departamentos      │
└────────────────────────┘
```

- Misma estructura base que Variante A pero el "visual" es un diagrama técnico CSS (rectángulos negros con patrón de líneas, líneas de medida con ticks).
- Sin badge — el valor numérico carga la identificación.
- Min-height 156px.

#### Variante C: tarjeta "No lo sé" (escape a asesor)

```
┌────────────────────────┐
│        ┌──┐            │
│        │ ?│            │  ← signo de interrogación en círculo
│        └──┘            │
├────────────────────────┤
│  No lo sé              │  ← Montserrat 700, 15-16px
│  Te conectamos con     │
│  un asesor             │
└────────────────────────┘
```

- Fondo `--surface-deep` (gris suave cálido).
- Borde `1px dashed var(--ink-quaternary)`.
- Signo de interrogación en círculo: 28-38px, borde 1.5px tinta secundaria, número `?` en Montserrat 700.
- **Es una tarjeta más de la grilla** — mismo tamaño que las opciones reales. NO es un CTA inferior separado.
- Al click: deriva a WhatsApp del asesor EZON.

**Reemplaza completamente** al CTA inferior "Hablar con un asesor EZON" que aparecía en el flujo anterior.

### 5.6 Footer transversal

```
┌─────────────────────────────────────────────┐
│  ▰▰▱▱▱▱  03 / 06                          │  ← progress + counter
│                                             │
│  [↩]  [   CONTINUAR  →   ]                 │  ← back + primary
└─────────────────────────────────────────────┘
```

- Position: `absolute` dentro del device frame en mobile; en producción será sticky-on-scroll (ver behavior abajo).
- Background: `--surface-raised` (off-white más limpio que el general).
- Border-top: 1px `--line`.
- Padding: `12px 16px 18px`.

**Progress bar:**
- Altura 4px, gap 2px entre segmentos.
- Segmentos completados: `--ezon-ink` (negro sólido).
- Segmento actual: `--ezon` (verde EZON).
- Segmentos pendientes: `--line` (gris claro).

**Counter "03 / 06":**
- Montserrat 700, 10px, tracking 0.15em, tabular-nums.
- Número actual en tinta primaria, slash y total en tinta terciaria.

**Botón Back:** 52×52, blanco, borde gris claro, ícono chevron. Sin texto.

**Botón Primary:**
- Estado default (sin selección): `--ezon-ink` (negro), texto `--surface` (off-white), shadow `0 2px 0 #000`.
- Estado "ready" (con selección): `--ezon` (verde), texto `--ezon-ink` (negro), shadow `0 2px 0 #5BAF67`.
- La transición `default → ready` es la **microinteracción clave del sistema**: indica que la pregunta está respondida y se puede avanzar. No omitirla.
- Contiene texto "CONTINUAR" + flecha `→` en Montserrat (no símbolo Unicode, escribir el carácter `→` en el HTML).

**Behavior sticky-on-scroll en producción:**
- Si el contenido cabe en viewport → el footer fluye naturalmente al final del contenido.
- Si el contenido desborda → el footer se vuelve `position: fixed` al borde inferior.
- Implementación: usar `IntersectionObserver` con un sentinel element o CSS `position: sticky` con apoyo de JS para detectar overflow.

### 5.7 Instrumento técnico (panel de medición)

Solo aplica a la pantalla de Grosor del canto. Es el patrón visual más distintivo del sistema y refuerza la identidad "premium hardware".

Reglas clave:
- Background `--ink-primary` (negro).
- Border-radius `--radius-xl` (22px).
- Margin horizontal `-8px` para sangrar ligeramente fuera del padding del contenido (peso visual).
- Padding 22px.
- Background interno con dos capas decorativas:
  - Radial gradient verde EZON muy bajo (6% opacidad) en esquina superior izquierda.
  - Repeating linear gradient horizontal blanco (2% opacidad) cada 24px — efecto "pantalla LCD".

**Header del instrumento:**
- Título Montserrat 700, 20px, blanco, con subtítulo en etiqueta técnica blanca al 60%.
- LED indicator a la derecha: 3 dots (2 verdes encendidos + 1 apagado) + label "READY" en etiqueta técnica.

**Sub-pasos internos:**
- Cada uno con border-top 1px blanco al 8% de opacidad.
- Numerados 01, 02, 03 con chip blanco al 8% que envuelve el número.
- Padding vertical 18px.

**Anotaciones de medida:**
- Líneas finas verde EZON 1px.
- Ticks en los extremos.
- Label en Montserrat 700, 10px, verde EZON, fondo negro de la card para "interrumpir" la línea, con padding 0 6px.

Este componente es complejo. Si una pantalla no necesita instrumento, no lo uses. No lo apliques decorativamente.

### 5.8 Status bar decorativa

Solo se renderiza en el prototipo (mockup). En producción dentro de Shopify, el navegador del usuario maneja su propia status bar. **No la implementes en producción.**

---

## 6. Microinteracciones

### 6.1 Hover sobre tarjeta

```css
.opt-card:hover {
  border-color: var(--ink-secondary);
  transform: translateY(-1px);
  /* opcional para variante material: */
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12);
}
```

### 6.2 Click sobre tarjeta (selección)

- Transición de borde, sombra y aparición del dot+checkmark en `200ms cubic-bezier(0.2, 0.8, 0.2, 1)`.
- El botón Continuar del footer transiciona de "default" a "ready" en `180ms`.

### 6.3 Hover sobre botón primary "ready"

```css
.btn-primary.ready:hover {
  background: #6BC97A;       /* verde un poco más oscuro */
  box-shadow: 0 3px 0 #5BAF67, 0 10px 20px -4px var(--ezon-shadow);
}
```

### 6.4 Reglas generales

- Toda transición usa `cubic-bezier(0.2, 0.8, 0.2, 1)` o equivalente "ease-out fuerte".
- No animaciones decorativas sin función (no fades automáticos, no slide-ins de elementos al cargar).
- La excepción: la aparición de un sub-paso en el instrumento (Step B aparece tras seleccionar billete en Step A) puede usar fade+slide de 250ms.

---

## 7. Reglas inviolables

Si Claude Code, un colaborador o tú mismo se desvían de estas reglas, la pantalla está rota.

1. **Solo Montserrat + Open Sans.** Ninguna otra familia. Ninguna serif. Ninguna cursiva.
2. **Verde EZON jamás como flood fill** de tarjeta seleccionada. Solo como acento puntual.
3. **El step-meta del header de pregunta aparece en todas las pantallas** del flujo, idéntico.
4. **La tarjeta "No lo sé" reemplaza al CTA inferior** "Hablar con asesor". No coexisten.
5. **El footer transversal es el único lugar donde vive Continuar** y el progreso. No duplicar en otros lugares.
6. **Mobile-first 375px.** No diseñar pensando en desktop primero.
7. **No introducir colores fuera de los tokens.** Si necesitas un color nuevo, primero pregúntale a Julio.
8. **No usar emojis ni iconografía decorativa** dentro de tarjetas o textos. Iconos solo donde están definidos: chevron en back btn, checkmark en selección, signo de interrogación en "No lo sé", flecha en CTA primary, ícono de WhatsApp solo en derivación a asesor.

---

## 8. Mapeo de pantallas del flujo

El nuevo flujo V1 tiene 6 pasos (ya no 7 — se eliminó la pregunta de ubicación):

| # | Pantalla | Variante de tarjeta | Tiene instrumento | Notas |
|---|---|---|---|---|
| 0 | Welcome | — | No | Hero photo + CTA único "Comenzar". Sin step-meta ni footer. Sigue su propio lenguaje pero respeta tipografía y colores. |
| 1 | Material | A (visual hero) | No | 5 tarjetas: Madera, Metal, Vidrio, Otro, No lo sé. Grilla 2×3 (la última fila tiene una sola tarjeta). |
| 2 | Apertura | A o híbrida con diagrama lineal en el visual | No | 6 tarjetas: Abatible 1h, Abatible 2h, Corrediza 1h, Corrediza 2h, Reja, No lo sé. Grilla 2×3. La opción "Reja" debe usar el MISMO formato que las demás (no fila horizontal aparte). |
| 3 | Grosor del canto | B (diagrama técnico) | **Sí** | 5 tarjetas: 2-3, 3-5, 5-7, 7-10 cm, No lo sé. Grilla 2×3 (la última sola). Debajo: instrumento de medición con billete. |
| 4 | Métodos de acceso | A compacta (íconos pequeños) | No | 6 tarjetas: Huella, PIN, Tarjeta RFID, App móvil, Reconocimiento facial, Llave mecánica. **Multi-select.** Sin "No lo sé". Subtítulos descriptivos por método. |
| 5 | Funciones | **Horizontal** (1 columna, foto/icono izq + texto der) | No | 7 tarjetas: Bloqueo automático, Códigos temporales, Apertura remota, Gestión Airbnb, Google Home/Alexa, Cámara/videoportero, Restricción de acceso. **Multi-select.** Patrón distinto al resto. Sin "No lo sé". |
| 6 | Tipo de cerradura (opcional) | A (visual hero) | No | 4 tarjetas: Con manija, Push & Pull, Cerrojo, Candado. Tiene link "No sé — omitir esta pregunta" debajo de la grilla. |
| 7 | Resultados | — | No | A definir más adelante. |

---

## 9. Cambios de copy específicos vs flujo anterior

| Pantalla | Antes | Ahora |
|---|---|---|
| Material | (sin cambios mayores) | Sin cambios. |
| Apertura | "¿Cómo se abre tu puerta?" | Sin cambios en título. La opción Reja deja de ser fila horizontal y pasa a tarjeta normal. |
| Grosor | "¿Qué tan grueso es el canto lateral de tu puerta?" | "¿Qué tan grueso es el canto de tu puerta?" — sin "lateral" y sin emphasis serif. |
| Métodos | "¿Cómo quieres abrir tu cerradura?" | "Selecciona tus métodos de acceso principal" + subtítulos por opción. |
| Funciones | (sin cambios en título) | Layout cambia a 1 columna horizontal. |
| Tipo cerradura | (sin cambios) | Sin cambios. |

Subtítulos por método de acceso (pantalla 4):
- **Huella digital** — "Pones tu dedo en el lector."
- **Código PIN** — "Tecleas un código numérico."
- **Tarjeta RFID** — "Acercas una tarjeta o llavero."
- **App móvil** — "Abres desde tu celular."
- **Reconocimiento facial** — "La cerradura te identifica por tu rostro."
- **Llave mecánica** — "Llave física tradicional como respaldo."

---

## 10. Texturas y assets visuales

### 10.1 Material (pantalla 1)

Para V1 las texturas pueden ser CSS puro siguiendo el patrón del HTML de referencia (gradientes complejos + repeating-linear-gradient para grain). En producción se reemplazarán por foto real del banco de EZON manteniendo:
- Mismo aspect ratio (124px alto × ancho variable de tarjeta).
- Border-radius `14px 14px 0 0`.
- Crop con material protagónico, sin texto, sin lockup de marca, sin elementos humanos.

### 10.2 Diagramas técnicos (pantalla 3)

Los diagramas de canto a escala dentro de las tarjetas de grosor son CSS puro. No reemplazar por imagen — son parte del lenguaje "instrumento".

### 10.3 Billete (pantalla 3)

CSS puro siguiendo el patrón del HTML de referencia. Las dimensiones reales de billetes mexicanos:
- $20 → 12.0 × 6.6 cm
- $50 → 12.7 × 6.6 cm
- $100 → 13.4 × 6.6 cm

(Lado corto 6.6 cm constante. Lado largo varía. Para V1 usar **$20, $50, $100** como las tres denominaciones disponibles — el de mayor valor es $100, no $200.)

---

## 11. Cómo verificar que una pantalla está alineada

Antes de declarar una pantalla terminada, recorre este checklist:

- [ ] Usa solo Montserrat + Open Sans.
- [ ] Tiene step-meta arriba con dot verde + número de paso + nombre del paso.
- [ ] Título Montserrat 700, 28px, sin emphasis serif.
- [ ] Deck Open Sans 400, 14px, max 32ch.
- [ ] Si usa option cards: respeta una de las tres variantes (A, B, C).
- [ ] El estado seleccionado de tarjeta es borde negro + dot verde + checkmark, NO flood fill verde.
- [ ] La opción "No lo sé" (si aplica) es una tarjeta de la grilla, NO un CTA inferior.
- [ ] El footer transversal está presente con progreso + back + continue.
- [ ] El botón Continue cambia de negro a verde cuando hay selección válida.
- [ ] El verde EZON aparece SOLO como acento puntual (dots, checkmarks, anotaciones técnicas, botón ready, brand mark).
- [ ] Mobile 375px se ve correcto.
- [ ] Ningún elemento decorativo sin función.
- [ ] Ninguna tipografía tercera familia.
- [ ] Ningún color fuera de los tokens.

Si todos los checks pasan, la pantalla está lista.
