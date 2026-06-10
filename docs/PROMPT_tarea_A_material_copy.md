# Tarea A — Ajustes de copy en MaterialScreen.jsx
> Archivo: `src/screens/MaterialScreen.jsx`
> Alcance: copy únicamente — no tocar lógica, estilos, estructura ni ningún otro archivo.

---

## Cambios requeridos

### 1. Metal — ampliar subtitle
**Antes:**
```
subtitle: 'Herrería pesada, portones o puertas industriales',
```
**Después:**
```
subtitle: 'Puertas con laminado de metal, construcción de metal, interior de metal o herrería',
```

### 2. Vidrio — especificar tipos
**Antes:**
```
subtitle: 'Templado, sin marcos metálicos o con herraje',
```
**Después:**
```
subtitle: 'Vidrio templado o vidrio normal, con o sin marcos metálicos',
```

### 3. Opción "Otro" → "No estoy seguro / Otro"
Cambiar únicamente el campo `title`. El campo `id` debe seguir siendo `'otros'` sin modificación — cambiarlo rompe la lógica del matcher.

**Antes:**
```
id: 'otros',
title: 'Otro',
subtitle: 'Aluminio, PVC u otro material',
```
**Después:**
```
id: 'otros',
title: 'No estoy seguro',
subtitle: 'Aluminio, PVC u otro material no listado',
```

---

## Instrucciones de ejecución

- Editar SOLO el array `MATERIALS` dentro de `MaterialScreen.jsx`.
- NO modificar: lógica de selección, handlers, estilos, imports, ni ningún otro archivo.
- NO cambiar ningún campo `id` — son llaves usadas por `matcher.js` y el estado de `answers`.
- Después del cambio, ejecutar `npm run build` y confirmar que compila sin errores.
- Actualizar el Task Log en `CLAUDE.md` con la fecha de hoy.
