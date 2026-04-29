# EZON Smart Lock Finder — Prompt operacional para Claude Code

> **Pega este documento como primer mensaje en una sesión nueva de Claude Code**, después de haber adjuntado al proyecto los siguientes archivos:
>
> - `EZON_DESIGN_LANGUAGE.md` ← contrato visual del sistema, fuente de verdad
> - `public/assets/ezon_finder_screen03_v2.html` ← referencia visual canónica · Paso 3 (Grosor)
> - `public/assets/ezon_finder_screen01_material.html` ← referencia visual canónica · Paso 1 (Material)
>
> Después de que Claude Code confirme que ha cargado el contexto, le pides la siguiente tarea (las tareas vienen abajo en este mismo documento, sección "Tareas secuenciales").

---

## 0 · Contexto del proyecto

Estás trabajando sobre el living prototype del **Smart Lock Finder de EZON México**. Es una herramienta guiada que reemplaza la calificación manual por WhatsApp en la web ezonmexico.com (Shopify). Identifica el problema central del usuario (incertidumbre de compatibilidad entre su puerta y las cerraduras inteligentes disponibles) y le recomienda modelos compatibles.

El living prototype actual está en React. Tiene arquitectura sólida pero el lenguaje visual es genérico — se siente como un wizard de Shopify por defecto, no como un producto premium. Esta sesión es para corregir eso aplicando un design language transversal completo.

---

## 1 · Antes de tocar código — lee y entiende

Antes de modificar **una sola línea**, ejecuta estos pasos en orden:

### 1.1 Lee el contrato visual

Abre y lee **completo** el archivo `EZON_DESIGN_LANGUAGE.md`. Es el contrato visual del sistema. Cubre:
- Tokens de diseño (color, tipografía, espaciado, radios).
- Componentes canónicos (header, step-meta, option cards en tres variantes, footer transversal, instrumento técnico).
- Reglas inviolables.
- Mapeo de pantallas y cómo aplicar cada componente.

### 1.2 Estudia las referencias visuales

Abre y revisa los dos HTML de referencia:
- `ezon_finder_screen03_v2.html` — la pantalla más compleja del flujo (Paso 3 · Grosor del canto). Contiene instrumento de medición con billete. Muestra el sistema en su versión más densa.
- `ezon_finder_screen01_material.html` — la pantalla más simple del flujo (Paso 1 · Material). Muestra el sistema en su versión más respirada.

Estos dos HTML son **la implementación autorizada** del lenguaje. Si hay conflicto entre el `.md` y los HTML, los HTML mandan.

Cuando estudies los HTML:
- No copies estilos al pixel — extrae el sistema. Las decisiones que están en variables CSS son las decisiones del sistema; las que están hardcodeadas son ajustes locales que deberían deducirse del sistema.
- Identifica los componentes que se repiten entre pantallas (header, step-meta, footer, option cards, etc.). Esos son los componentes transversales.
- Identifica los componentes que aparecen solo en una pantalla (instrumento técnico). Esos son específicos de pantalla.

### 1.3 Inspecciona el código actual

Mapea la estructura del repo:
- ¿Dónde viven los componentes de pantalla?
- ¿Hay un sistema de design tokens (CSS variables, tema MUI, Tailwind config, styled-components theme)?
- ¿Cómo está implementada la navegación entre pasos?
- ¿Cómo está implementado el footer/CTA actual?
- ¿Qué fuentes están cargadas hoy?
- ¿Hay estado global (Context, Redux, Zustand) que rastree el avance?

### 1.4 Antes de proponer plan, confirma comprensión

**No empieces a modificar código todavía.** Responde a Julio con:

1. Resumen de lo que el design language te pide hacer (en tus palabras, 5-8 puntos).
2. Mapa del código actual: archivos clave, dónde viven los componentes, cómo está organizado.
3. Lista de discrepancias entre el código actual y el design language (qué está mal hoy).
4. Propuesta de plan de migración por fases (ver sección 3 abajo).

Espera el OK de Julio antes de avanzar.

---

## 2 · Reglas de trabajo

### 2.1 Stack y arquitectura

- **No cambies la stack.** El proyecto sigue en React. Si el living prototype usa Vite, sigue en Vite. Si usa CSS Modules, Tailwind, styled-components, o vanilla CSS, sigue con lo mismo.
- **Conserva la arquitectura de carpetas.** Si hay `components/`, `screens/`, `hooks/`, `lib/` — respétalos.
- **No renombres componentes públicos** que se referencien desde fuera del Finder.

### 2.2 Sistema de tokens primero

Antes de tocar pantallas, **monta el sistema de tokens** según el `EZON_DESIGN_LANGUAGE.md` sección 3 y 4:
- Define las CSS variables `--ink-primary`, `--ezon`, `--surface`, etc., en el archivo de estilos globales.
- Define las variables tipográficas `--font-display`, `--font-body`.
- Carga las fuentes Montserrat y Open Sans desde Google Fonts.
- Quita cualquier carga previa de fuentes que ya no se use (ej. Poppins).

Sin tokens, no puedes garantizar consistencia entre pantallas. Esto es paso 1.

### 2.3 Componentes transversales antes que pantallas

Después de tokens, construye los **componentes transversales** que se reutilizan en todas las pantallas:

1. `<AppHeader />` — barra superior con back btn, brand, ayuda.
2. `<StepMeta />` — encabezado de pregunta con dot + número + nombre de paso.
3. `<ScreenTitle />` y `<ScreenDeck />` — título y deck.
4. `<OptionCard />` con variantes A, B, C — la pieza más reutilizada.
5. `<OptionCardGrid />` — grilla de 2 columnas.
6. `<FinderFooter />` — footer transversal con progreso + back + continue, sticky-on-scroll.

Estos componentes son los que garantizan que las 6 pantallas se vean del mismo sistema. Si los pruebas en una pantalla y funcionan, funcionan en todas.

### 2.4 Pantallas después de componentes

Una vez tengas tokens + componentes transversales, **migra las pantallas una por una** en el orden propuesto en la sección 3.

### 2.5 No inventes

- No inventes colores que no estén en los tokens.
- No inventes pesos tipográficos fuera de los definidos.
- No inventes patrones visuales nuevos. Si una pantalla parece necesitar algo que no está en el design language, pregúntale a Julio antes de improvisar.
- No introduzcas librerías de UI nuevas (Material UI, Chakra, Radix). El sistema está pensado para CSS vanilla o el motor de estilos que ya tenga el proyecto.

### 2.6 No rompas funcionalidad existente

- La lógica de matching contra el catálogo de cerraduras (CSV de recomendaciones) **no se toca**.
- La derivación a WhatsApp del asesor **no se toca** — solo cambia desde dónde se invoca (ahora desde la tarjeta "No lo sé", antes desde un CTA inferior).
- La lógica de avance/retroceso entre pasos **no se toca** — solo se mueve el control visual al footer transversal.

---

## 3 · Tareas secuenciales

Estas tareas están diseñadas para ejecutarse en orden. **No saltes pasos** — cada uno depende del anterior. Pídele a Julio confirmación al cerrar cada tarea antes de pasar a la siguiente.

### Tarea 1 — Setup de tokens y fuentes

**Objetivo:** que el proyecto tenga el sistema de design tokens del EZON Design Language correctamente cargado y usable desde cualquier componente.

**Subtareas:**
1. Cargar Montserrat (400, 500, 600, 700, 800) y Open Sans (400, 500, 600) desde Google Fonts.
2. Quitar cualquier fuente previa que ya no se use (Poppins, Inter, etc.).
3. Crear/actualizar el archivo de estilos globales con las CSS variables definidas en `EZON_DESIGN_LANGUAGE.md` sección 3 y 4.
4. Definir clases utilitarias o mixins para las cinco escalas tipográficas más usadas: `.tx-question`, `.tx-deck`, `.tx-card-title`, `.tx-card-desc`, `.tx-tech-label` (la voz de etiqueta técnica).
5. Verificar que en una pantalla cualquiera del flujo, las variables están funcionando (cambio de prueba: pintar un `<div>` con `background: var(--ezon)` y confirmar que sale verde EZON).

**Criterio de aceptación:** las variables están disponibles globalmente, las fuentes cargan correctamente sin FOIT/FOUT visibles, y las clases utilitarias rinden el estilo esperado.

**No hagas:** no migrar pantallas todavía.

---

### Tarea 2 — Componente `<AppHeader />`

**Objetivo:** sustituir el header actual del Finder por el componente canónico definido en el design language.

**Subtareas:**
1. Crear el componente `<AppHeader />` con tres slots: back btn, brand, ayuda.
2. La prop `onBack` define el comportamiento del botón. La prop `showBack` (boolean, default true) permite ocultarlo en pantallas como Welcome.
3. La prop `onHelp` permite enganchar el link "Ayuda" — comportamiento default abrir WhatsApp del asesor.
4. Reemplazar el header actual de TODAS las pantallas del Finder por este componente.

**Criterio de aceptación:** el header se ve idéntico al de los HTML de referencia y aparece consistente en las 6 pantallas del flujo (excluyendo Welcome si aplica).

---

### Tarea 3 — Componente `<StepMeta />`

**Objetivo:** sustituir la barra de progreso superior actual ("PASO 1 DE 7") por el step-meta canónico (`• 01 / 06 · Material de la puerta`).

**Subtareas:**
1. Crear el componente `<StepMeta />` que recibe `currentStep`, `totalSteps`, y `stepName`.
2. Renderiza dot verde + número formateado `01 / 06` (con padding de cero) + nombre del paso.
3. Eliminar la barra de segmentos superior actual (ese rol pasa al footer transversal en Tarea 6).
4. Insertar `<StepMeta />` en todas las pantallas del flujo justo antes del título.

**Criterio de aceptación:** la barra de segmentos verde superior YA NO aparece. El step-meta nuevo aparece en todas las pantallas del flujo.

---

### Tarea 4 — Componentes `<ScreenTitle />` y `<ScreenDeck />`

**Objetivo:** unificar la tipografía y spacing de títulos y decks de pantalla.

**Subtareas:**
1. Crear `<ScreenTitle children />` con la tipografía y spacing definido (Montserrat 700, 28px, etc.).
2. Crear `<ScreenDeck children />` con el body text definido (Open Sans 400, 14px, max 32ch).
3. Reemplazar todos los `h1` y párrafos descriptivos del flujo por estos dos componentes.
4. Verificar que ningún título use `<em>`, ningún italic, ninguna serif.

**Criterio de aceptación:** todos los títulos del flujo están en Montserrat 700 28px sin emphasis decorativo.

---

### Tarea 5 — Componentes `<OptionCard />` y `<OptionCardGrid />`

**Objetivo:** crear la pieza central reutilizable del sistema y migrar la pantalla de Material como prueba.

**Subtareas:**
1. Crear `<OptionCard />` con prop `variant: 'visual' | 'diagram' | 'unknown'`:
   - `visual`: tarjeta con visual hero (Material). Recibe imagen/textura, badge opcional, título, descripción.
   - `diagram`: tarjeta con diagrama técnico (Grosor). Recibe el slot de diagrama, valor numérico grande, descripción.
   - `unknown`: tarjeta "No lo sé". Estilo punteado gris, signo de interrogación, título "No lo sé", descripción "Te conectamos con un asesor".
2. Cada variante respeta el patrón canónico de estado seleccionado del design language (borde negro grueso + dot verde + checkmark — NO flood fill verde).
3. Crear `<OptionCardGrid />` que recibe un array de opciones y renderiza la grilla 2×N. Soporta single-select y multi-select via prop.
4. Migrar la pantalla de Material para usar estos componentes. Las texturas CSS pueden quedar como placeholder de foto real (el código del HTML de referencia es válido para esto).
5. La opción "No lo sé" en Material reemplaza completamente al CTA inferior actual "Hablar con asesor EZON" — ese CTA se elimina de la pantalla.

**Criterio de aceptación:** la pantalla de Material rendea idéntica al HTML de referencia (`ezon_finder_screen01_material.html`) o muy cerca. Click en una tarjeta cambia el estado seleccionado al patrón canónico. Click en "No lo sé" deriva a WhatsApp.

---

### Tarea 6 — Componente `<FinderFooter />`

**Objetivo:** crear el footer transversal con progreso + back + continue, sticky-on-scroll.

**Subtareas:**
1. Crear `<FinderFooter />` que recibe `currentStep`, `totalSteps`, `onBack`, `onContinue`, `continueDisabled` (boolean), `continueReady` (boolean).
2. Renderiza:
   - Fila superior: barra de progreso de N segmentos (completados negro sólido, actual verde, pendientes gris) + counter "03 / 06" en la derecha.
   - Fila inferior: botón back 52×52 a la izquierda + botón continue full-width restante a la derecha.
3. Botón continue muestra texto "CONTINUAR" + flecha `→`. Cuando `continueReady=true`, transiciona a estilo verde EZON. Cuando `continueDisabled=true`, gris claro no clickeable.
4. **Implementar sticky-on-scroll:**
   - Si el contenido cabe en viewport → footer fluye al final.
   - Si el contenido desborda → footer queda fixed al borde inferior con sombra superior sutil.
   - Implementación recomendada: un sentinel element antes del footer + `IntersectionObserver` que conmuta una clase `is-stuck`.
5. Reemplazar el botón Continuar duplicado de cada pantalla por este componente único.

**Criterio de aceptación:** el footer aparece consistente en las 6 pantallas. El botón Continuar ya no se duplica en código de pantalla. Sticky-on-scroll funciona — verificar haciendo scroll en la pantalla de Funciones (la más larga).

---

### Tarea 7 — Migración de pantallas restantes

Una por una, en este orden:

1. **Apertura (Paso 2)** — 6 tarjetas variant `visual` con diagramas lineales en lugar de fotos: Abatible 1h, Abatible 2h, Corrediza 1h, Corrediza 2h, Reja, No lo sé. Grilla 2×3. La opción Reja debe usar el MISMO formato que las demás (no fila horizontal aparte como hoy). El CTA inferior "📞 No reconozco el tipo de puerta" se elimina — su rol lo cumple la tarjeta "No lo sé".

2. **Grosor del canto (Paso 3)** — 5 tarjetas variant `diagram`: 2-3, 3-5, 5-7, 7-10 cm, No lo sé. Grilla 2×3 (la última sola). **Debajo de la grilla**, agregar el instrumento de medición con billete. El instrumento es el componente complejo del HTML de referencia `ezon_finder_screen03_v2.html` — replicar su estructura exacta. Denominaciones disponibles: $20, $50, $100 (no $200). Medidas reales: $20 = 12.0 cm, $50 = 12.7 cm, $100 = 13.4 cm de ancho; alto constante 6.6 cm.

3. **Métodos de acceso (Paso 4)** — 6 tarjetas variant `visual` compactas (íconos pequeños en lugar de imágenes hero): Huella, PIN, RFID, App móvil, Reconocimiento facial, Llave mecánica. **Multi-select.** Sin "No lo sé". Subtítulos descriptivos según `EZON_DESIGN_LANGUAGE.md` sección 9. Título de pantalla: "Selecciona tus métodos de acceso principal".

4. **Funciones (Paso 5)** — patrón distinto: 7 tarjetas en **una sola columna**, layout horizontal (icono o foto a la izquierda 64-80px, título + subtítulo a la derecha). **Multi-select.** Sin "No lo sé". Crear una variante adicional del componente OptionCard, `variant: 'horizontal'`, o un componente separado `<HorizontalOptionCard />` si es más limpio. Mantener todos los tokens y reglas tipográficas del sistema.

5. **Tipo de cerradura (Paso 6, opcional)** — 4 tarjetas variant `visual`: Con manija, Push & Pull, Cerrojo, Candado. Sin "No lo sé" como tarjeta — en su lugar, link "No sé — omitir esta pregunta" debajo de la grilla (el actual ya está cerca de esto, solo verificar que respete tipografía del sistema).

6. **Reordenamiento del flujo y eliminación de pasos:**
   - Nuevo orden: Material → Apertura → Grosor → Métodos → Funciones → Tipo (opcional) → Resultados.
   - **Eliminar la pantalla de Ubicación** (interior/exterior + uso de la puerta). No la borres del código — desconéctala del router/flujo.
   - Actualizar el `totalSteps` en todos los lugares a **6**.
   - Actualizar la lógica de matching para que **ya no consulte ubicación**. Si hay reglas tipo "exterior sin techo descarta IP54", déjalas comentadas con `// TODO post-V1`, no las borres.

**Criterio de aceptación de la Tarea 7 completa:** las 6 pantallas del flujo se ven coherentes entre sí, todas respetan el design language, el flujo nuevo navega correctamente Material → Apertura → Grosor → Métodos → Funciones → Tipo → Resultados, y el footer transversal funciona en cada una.

---

### Tarea 8 — QA visual transversal

**Objetivo:** verificar que el sistema se sostiene a lo largo del flujo completo.

**Subtareas:**
1. Recorrer el flujo de inicio a fin en mobile (375px) y desktop.
2. Para cada pantalla, ejecutar el checklist de la sección 11 del `EZON_DESIGN_LANGUAGE.md`.
3. Identificar y reportar (NO arreglar todavía):
   - Inconsistencias menores (paddings, alineaciones, transiciones).
   - Discrepancias mayores (componentes que se ven distintos al sistema).
   - TODOs deferidos para post-V1.
4. Producir un reporte breve en markdown con secciones: ✅ correcto · ⚠️ ajustes menores · 🚨 problemas mayores · 📋 deferidos.

**Criterio de aceptación:** reporte entregado a Julio. Esperar su decisión sobre qué arreglar antes de avanzar.

---

## 4 · Cómo iterar sin perder coherencia

Si Julio te pide cambios visuales en alguna pantalla:

1. **Pregunta primero si el cambio aplica a una sola pantalla o a todo el sistema.** Un cambio "haz el botón Continuar más ancho" puede ser una decisión de sistema (cambia en todas las pantallas) o un capricho de pantalla (solo aquí). Si es decisión de sistema, también se actualiza el `EZON_DESIGN_LANGUAGE.md`.
2. **No hagas cambios visuales que rompan el design language sin actualizar el documento.** Si el cambio invalida una regla del `.md`, propón actualizar el `.md` antes.
3. **Cuando completes una tarea, lista los archivos tocados y cualquier desvío del documento.** Esto permite a Julio mantener el `.md` como fuente de verdad real.

---

## 5 · Lo que NO está en este alcance

- Pantalla de Welcome (sigue su propio diseño, ya existe).
- Pantalla de Resultados (se diseñará después).
- Pantalla de error / sin matches.
- Animaciones avanzadas (entrada de pantalla, microinteracciones decorativas).
- Reactivación de la lógica de ubicación (deferida post-V1).
- Foto real de productos / instalaciones (placeholders CSS para V1).
- Integración con WhatsApp Business API (asumido conectado).

Si Julio te pide alguna de estas, pídele que escribamos un alcance específico antes de implementar.

---

## 6 · Ahora — empieza con Tarea 1

Cuando hayas leído este documento, el `EZON_DESIGN_LANGUAGE.md`, y los dos HTML de referencia, escribe a Julio:

> "Contexto cargado. Voy a empezar por la Tarea 1 (Setup de tokens y fuentes). Antes de modificar código, te comparto: (1) resumen de lo que el sistema pide, (2) mapa del código actual, (3) lista de discrepancias hoy, (4) plan de la Tarea 1."

Y espera su confirmación.
