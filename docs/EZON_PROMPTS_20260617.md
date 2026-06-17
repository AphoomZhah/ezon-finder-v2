# EZON Smart Lock Finder — Prompts de ejecución · 2026-06-17

> Loop de tareas para ejecutar con **Claude Code** o **Antigravity** sobre el repo `ezon-finder-v2`.
> Ejecutar en orden. Cada tarea es autónoma: copia el bloque `PROMPT` completo en el agente.
> **Regla transversal:** correr `npm run build` después de cada tarea y confirmar que pasa antes de avanzar a la siguiente.

---

## Contexto para el agente (leer una vez)

- Stack: React 18 + Vite 5, **inline styles only** (sin Tailwind, sin CSS-in-JS, sin librerías UI).
- Importar componentes siempre desde `src/components/index.js`. Tokens desde `src/design-tokens/tokens.js`.
- Toda la copy de UI va en **español**. Código y comentarios en inglés.
- La lógica de matching vive en `src/data/matcher.js`, nunca dentro de screens.
- No agregar dependencias ni dark mode. No tocar `netlify.toml` ni `vite.config.js`.
- Al terminar cada tarea, anotarla en el Task Log de `CLAUDE.md` con la fecha de hoy.

---

## Orden de ejecución

1. **Tarea 1 — Logo SVG en header** (cambio aislado, sin riesgo lógico)
2. **Tarea 2 — Selección múltiple en LockTypeScreen** (toca `matcher.js` + `App.jsx`, el modelo de datos)
3. **Tarea 3 — Verificación de Analytics / Clarity** (checklist manual, no genera código salvo que falte el snippet)

Razón del orden: el logo es un diff limpio y verificable a ojo. La selección múltiple cambia `answers.lockType` de string a array y toca varias funciones de `matcher.js`; se hace después para no contaminar el diff del logo y poder aislar cualquier regresión.

---

# Tarea 1 — Logo SVG en el header

**Objetivo:** Reemplazar el texto `EZON` (hoy renderizado como `EZ<span>O</span>N`) por el SVG real de marca en los dos lugares donde aparece: `AppHeader.jsx` (fondo claro) y `EntryScreen.jsx` (sobre foto oscura).

**Archivo de logo:** `public/assets/ezon-main-logo.svg`
- viewBox `0 0 796 239` (ratio ≈ 3.33:1).
- Letras `#1D1D1B`, anillo de la "O" en verde `#88C384`.
- En `AppHeader` (fondo claro): usar el SVG tal cual, en color.
- En `EntryScreen` (foto oscura): el logo debe verse blanco. Como el SVG es de color fijo, aplicar `filter: brightness(0) invert(1)` sobre un `<img>` — esto vuelve **todo** el logo blanco (incluida la O verde). Es el comportamiento aceptado para el hero, consistente con el resto de íconos del proyecto que usan ese mismo filtro sobre fondo oscuro.

> ⚠️ Antes de empezar: confirmar que el archivo existe en `public/assets/ezon-main-logo.svg`. Si está en otra ruta (p. ej. `src/assets/`), ajustar el `src` de los `<img>`. En Vite, los assets de `public/` se referencian desde la raíz: `/assets/ezon-main-logo.svg`.

```
PROMPT — Tarea 1 (Logo en header)

Contexto: repo ezon-finder-v2 (React 18 + Vite 5, inline styles only). El logo de marca
está en public/assets/ezon-main-logo.svg (viewBox 0 0 796 239, ratio ~3.33:1, letras
#1D1D1B y O verde #88C384). Hoy el logo se renderiza como texto "EZON" en dos archivos.
Reemplázalo por el SVG en ambos, SIN tocar ninguna otra lógica ni layout.

1) src/components/AppHeader.jsx
   - Localiza el bloque que renderiza el texto del logo:
       <div style={{ fontFamily: 'var(--font-display)', ... }}>
         EZ<span style={{ color: 'var(--ezon)' }}>O</span>N
       </div>
   - Reemplázalo por un <img> del SVG en color (fondo del header es claro):
       <img
         src="/assets/ezon-main-logo.svg"
         alt="EZON"
         style={{ height: 22, width: 'auto', display: 'block' }}
       />
   - Mantén intacto el contenedor flex del header y el botón derecho (Reiniciar / Ayuda).
     Solo cambia el nodo del logo. No alteres paddings ni justifyContent.

2) src/screens/EntryScreen.jsx
   - Localiza el bloque del logo top-left:
       <div style={{ position: 'absolute', top: 20, left: 24, ... }}>
         EZ<span style={{ color: EZON }}>O</span>N
       </div>
   - Reemplaza el contenido textual por el <img>, conservando el contenedor posicionado:
       <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
         <img
           src="/assets/ezon-main-logo.svg"
           alt="EZON"
           style={{ height: 26, width: 'auto', display: 'block',
                    filter: 'brightness(0) invert(1)' }}
         />
       </div>
   - El filtro vuelve el logo blanco sobre la foto oscura. No cambies el gradiente,
     el título, el párrafo ni los botones.
   - Si el import `EZON` queda sin uso tras el cambio, NO lo elimines si todavía se usa
     en el botón CTA (background: EZON). Verifica antes de borrar imports.

3) Verifica: npm run build debe pasar. Revisa visualmente que el logo aparezca
   en color en el header de resultados y en blanco sobre la foto del EntryScreen,
   con proporción correcta (no estirado).

4) Actualiza el Task Log de CLAUDE.md con una línea: logo SVG en AppHeader + EntryScreen,
   fecha 2026-06-17.

No toques matcher.js, products.js, ni ningún screen fuera de EntryScreen.
No agregues dependencias. No introduzcas dark mode.
```

**Checklist de validación Tarea 1**
- [ ] Logo en color visible en `ResultsScreen` (vía `AppHeader`).
- [ ] Logo blanco y legible sobre la foto del `EntryScreen`.
- [ ] Proporción correcta (alto fijo, ancho auto — sin distorsión).
- [ ] `npm run build` pasa.
- [ ] No se rompió el import `EZON` en `EntryScreen` (sigue usándose en el botón CTA).

---

# Tarea 2 — Selección múltiple en "¿Qué tipo de cerradura prefieres?"

**Objetivo:** Permitir que el usuario seleccione **varios** tipos de cerradura en `LockTypeScreen`, en lugar de uno solo.

**Cambio de fondo (leer con atención):** `answers.lockType` pasa de `string | null` a `string[]`. Esto **rompe** el código actual que asume string en `App.jsx` y `matcher.js`. Esta tarea **no es solo de UI** — incluye la migración del modelo de datos. La semántica multi es **OR**: un producto es compatible si su `lockType` coincide con **alguno** de los seleccionados (preservando la regla "all-false = universal").

**Archivos que toca:** `App.jsx`, `src/data/matcher.js`, `src/screens/LockTypeScreen.jsx`.

> Patrón de referencia: `AccessScreen.jsx` ya implementa multi-select con la misma `OptionCardGrid` (`multiple`, `value` = array, `onChange` recibe array de ids, toggle de `unknown` que limpia el resto). **Replicar ese patrón**, no inventar API nueva.

```
PROMPT — Tarea 2 (LockType selección múltiple, UI + lógica)

Contexto: repo ezon-finder-v2. Hoy answers.lockType es string|null y la pantalla
LockTypeScreen es single-select. Quiero convertirla a selección MÚLTIPLE. Esto cambia
answers.lockType a un ARRAY de strings (string[]) y obliga a migrar la lógica que hoy
asume string. La semántica multi es OR: un producto es compatible si su lockType coincide
con AL MENOS UNO de los seleccionados, conservando la regla "all-false = universal product".

El patrón multi-select YA EXISTE en src/screens/AccessScreen.jsx (misma OptionCardGrid con
prop `multiple`, value array, onChange con array de ids, y toggle de 'unknown' que limpia el
resto). Usa ESE patrón como referencia exacta. No inventes API nueva.

=== PASO A — App.jsx ===
1) En INITIAL_ANSWERS, cambia:
       lockType: null,
   por:
       lockType: [],

2) En el handler onNext de la ruta "/thickness" (auto-skip de LockTypeScreen):
   hoy hace, cuando viableLockTypes.length === 1:
       setAnswers(a => ({ ...a, lockType: viableLockTypes[0] }));   // string
   cámbialo a array:
       setAnswers(a => ({ ...a, lockType: [viableLockTypes[0]] }));  // string[]
   Mantén el resto del comportamiento (si length !== 1 → go('/lock-type')).

=== PASO B — src/data/matcher.js ===
Objetivo: que todas las funciones traten answers.lockType como array. Define una semántica
clara: un array vacío [] o que contenga 'unknown' = SIN filtro de lockType (no restringe).

3) Helper. Añade cerca del tope del archivo una función pura:
       function lockTypeMatch(productLockType, selected) {
         // selected: string[] | null | undefined
         const list = (selected || []).filter(lt => lt !== 'unknown');
         if (list.length === 0) return true;            // sin selección → no filtra
         const anyTrue = Object.values(productLockType).some(v => v === true);
         if (!anyTrue) return true;                     // all-false = universal
         return list.some(lt => productLockType[lt] === true);  // OR
       }

4) En matchProducts(answers), reemplaza el bloque hard-filter actual de lockType
   (el que hace `!answers.lockType || answers.lockType === 'unknown' || ...`) por:
       lockTypeMatch(p.lockType, answers.lockType)
   dentro del .filter(). Elimina la lógica inline anterior de lockType.

5) En softScore(product, answers), el bloque actual:
       const lockType = answers.lockType;
       if (lockType && lockType !== 'unknown') {
         possible += 2;
         if (product.lockType[lockType] === true) earned += 2;
       }
   cámbialo para arrays (suma el bonus si el producto matchea ALGUNO de los seleccionados):
       const lockTypes = (answers.lockType || []).filter(lt => lt !== 'unknown');
       if (lockTypes.length > 0) {
         possible += 2;
         if (lockTypes.some(lt => product.lockType[lt] === true)) earned += 2;
       }

6) En getViableAccessMethods(answers) y getViableFunctions(answers):
   hoy calculan lockTypeFilter como string y lo pasan a categoryHard(p.lockType, lockTypeFilter).
   Reemplaza ese filtro por el helper nuevo. Donde diga:
       const lockTypeFilter = (!answers.lockType || answers.lockType === 'unknown')
         ? null : answers.lockType;
       ... categoryHard(p.lockType, lockTypeFilter) ...
   usa en su lugar dentro del filtro de candidatos:
       lockTypeMatch(p.lockType, answers.lockType)
   y elimina la variable lockTypeFilter si queda sin uso.

7) getViableLockTypes(answers): NO depende de answers.lockType (solo de material + doorType),
   así que NO requiere cambios. Verifícalo y déjalo intacto.

=== PASO C — src/screens/LockTypeScreen.jsx ===
8) Convierte la pantalla a multi-select replicando AccessScreen:
   - sel ahora es un array: const sel = answers.lockType || [];
   - Añade prop `multiple` a OptionCardGrid y pasa value={sel}.
   - Implementa un handleChange(ids) idéntico en espíritu a AccessScreen:
       const handleChange = (ids) => {
         if (ids.includes('unknown') && !sel.includes('unknown')) {
           setAnswers(a => ({ ...a, lockType: ['unknown'] }));
           return;
         }
         const filtered = ids.filter(id => id !== 'unknown');
         setAnswers(a => ({ ...a, lockType: filtered }));
       };
     (No impongas límite de 3 aquí; LockType no tiene tope, a diferencia de Access.)
   - El footer debe deshabilitar "siguiente" si no hay selección:
       footerProps={{ onBack, onNext, disabled: sel.length === 0, step: 4, totalSteps: 6 }}
     (hoy está en disabled: false — cámbialo a disabled: sel.length === 0)
   - Mantén el filtrado de visibleOptions por getViableLockTypes + la opción 'unknown'.
   - Actualiza el ScreenDeck para comunicar que se puede elegir más de uno, p. ej.:
       "Puedes elegir más de uno. El tipo define el mecanismo y la instalación necesaria."

=== VERIFICACIÓN ===
9) npm run build debe pasar.
10) Prueba mental de regresión y, si puedes, en runtime:
    - Flujo donde LockType se auto-saltea (1 tipo viable): answers.lockType queda como
      [tipo] y los resultados siguen apareciendo.
    - Selección de 2 tipos (p. ej. conManija + cerrojo): resultados incluyen productos de
      ambos (OR), no la intersección.
    - 'No lo sé': limpia el resto y no filtra por lockType.
    - Sin selección: el botón siguiente queda deshabilitado.
11) Actualiza el Task Log de CLAUDE.md: "LockType multi-select (answers.lockType → string[]);
    matcher.js lockTypeMatch() OR + all-false universal; App.jsx auto-skip a array",
    fecha 2026-06-17.

IMPORTANTE:
- No cambies products.js ni los ids de lockType ('conManija','pushPull','cerrojo','candado').
- No toques la regla de reja→candado en getViableLockTypes.
- No alteres el resto del flujo ni otros screens.
- Mantén inline styles, sin dependencias nuevas, sin dark mode.
```

**Checklist de validación Tarea 2**
- [ ] `answers.lockType` es array en todo el flujo (revisar `INITIAL_ANSWERS` y auto-skip).
- [ ] Seleccionar 2 tipos devuelve la **unión** (OR) de productos, no la intersección.
- [ ] La regla "all-false = universal" se preserva (candados universales siguen apareciendo).
- [ ] "No lo sé" limpia el resto y no filtra.
- [ ] Botón siguiente deshabilitado sin selección.
- [ ] Auto-skip post-thickness sigue funcionando con array.
- [ ] `getViableLockTypes` quedó intacto.
- [ ] `npm run build` pasa.

> **Nota de alcance:** en tu nota de reunión esta tarea estaba listada como **post-lanzamiento**, no como lanzamiento. Se adelanta a hoy por decisión explícita tuya. Déjalo registrado por si Dan pregunta por qué se priorizó antes de los CTA de Shopify.

---

# Tarea 3 — Verificación de Analytics / Clarity

**Objetivo:** Confirmar que los tags de Google Analytics (GA4) y Microsoft Clarity están **disparando** correctamente. Según la documentación del proyecto, la integración estaba *pendiente* — primero hay que verificar si el snippet ya está instalado.

Esto **no es necesariamente** una tarea de Claude Code. Es verificación manual. Solo se convierte en prompt si falta instalar el snippet.

**Paso 1 — ¿Está instalado el snippet?**
Revisa `index.html` en la raíz del repo. Busca:
- GA4: un `<script>` con `googletagmanager.com/gtag/js?id=G-XXXXXXX` + el bloque `gtag('config', ...)`.
- Clarity: el bloque `(function(c,l,a,r,i,t,y){...})` con `clarity.ms/tag/<PROJECT_ID>`.

**Paso 2 — Si NO están**, necesitas de EZON:
- **GA4 Measurement ID** (`G-XXXXXXXX`).
- **Clarity Project ID**.

Sin esos dos IDs no se puede completar. Si los tienes, usa este prompt:

```
PROMPT — Tarea 3 (instalar GA4 + Clarity, SOLO si faltan y ya tienes los IDs)

Contexto: repo ezon-finder-v2. Necesito instalar Google Analytics 4 y Microsoft Clarity
en index.html (raíz). Measurement ID GA4 = G-XXXXXXXX. Clarity Project ID = XXXXXXXX.
(Reemplaza los placeholders por los IDs reales antes de ejecutar.)

1) En index.html, dentro de <head>, agrega el snippet oficial de GA4 con el Measurement ID
   indicado, y debajo el snippet oficial de Microsoft Clarity con el Project ID indicado.
   Usa los snippets oficiales sin modificar su estructura.
2) No agregues dependencias npm — ambos son scripts inline en el HTML.
3) npm run build debe pasar.
4) Anota en el Task Log de CLAUDE.md: "GA4 + Clarity instalados en index.html", 2026-06-17.

No toques nada más del repo.
```

**Paso 3 — Verificar que dispara (manual, en navegador):**
- GA4: abre el sitio desplegado, ve a GA4 → Informes → Tiempo real; confirma tu sesión.
- Clarity: panel de Clarity → debe registrar la sesión en minutos.
- Alternativa rápida en DevTools → Network: filtra `collect` (GA4) y `clarity.ms` y confirma que las requests salen al navegar el Finder.

**Checklist de validación Tarea 3**
- [ ] Snippet GA4 presente en `index.html` con Measurement ID real.
- [ ] Snippet Clarity presente con Project ID real.
- [ ] GA4 Tiempo real registra la sesión.
- [ ] Clarity registra la sesión.
- [ ] `npm run build` pasa (si hubo cambios).

---

## Fuera de alcance de hoy (no van en este loop)

Estas tareas de tu nota viven en el **tema Shopify**, no en el repo `ezon-finder-v2`. Son trabajo coordinado con Jonathan, no prompts de Claude Code sobre este repo:

- CTA "Encontrar mi cerradura" antes/después de la colección de productos.
- Enlace en el footer del sitio.
- Componente "¿Necesitas ayuda?" + modal lateral en la página de detalle de producto.

Si en algún momento el embed del Finder y estos componentes pasan a vivir en este repo, se agregan como tareas nuevas con sus propias prompts.

---

## Registro para CLAUDE.md (resumen a copiar al cerrar el día)

```
| — | Logo SVG en AppHeader + EntryScreen (reemplaza texto EZON) | 2026-06-17 |
| — | LockType multi-select: answers.lockType → string[]; matcher.js lockTypeMatch() OR; App.jsx auto-skip a array; LockTypeScreen patrón AccessScreen | 2026-06-17 |
| — | (si aplica) GA4 + Clarity verificados/instalados en index.html | 2026-06-17 |
```
