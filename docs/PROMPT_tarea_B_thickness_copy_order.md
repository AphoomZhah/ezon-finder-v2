# Tarea B — Ajustes de copy y orden de opciones en ThicknessScreen.jsx
> Archivo: `src/screens/ThicknessScreen.jsx`
> Alcance: copy y orden del array THICKNESSES únicamente — no tocar lógica de matching, estilos ni otros archivos.

---

## Cambios requeridos

### 1. Nuevo título de pantalla (ScreenTitle)
El componente `ScreenTitle` en este screen recibe su texto como `children` con una prop adicional `helpContent`. Solo hay que cambiar el texto visible, no tocar `helpContent`.

**Antes:**
```jsx
<ScreenTitle
  helpContent={...}
>
  ¿Qué tan grueso es el canto de tu puerta?
</ScreenTitle>
```
**Después:**
```jsx
<ScreenTitle
  helpContent={...}
>
  ¿Cuál es el grosor de tu puerta?
</ScreenTitle>
```

### 2. Nuevo texto del ScreenDeck
**Antes:**
```jsx
<ScreenDeck>El canto es la orilla donde se instala la cerradura. Mídelo de frente a fondo.</ScreenDeck>
```
**Después:**
```jsx
<ScreenDeck>Si no sabes cómo medirlo, abajo encuentras una guía.</ScreenDeck>
```

### 3. Reordenar el array THICKNESSES — 3–5 primero
Mover el objeto con `id: '3-5'` al **índice 0** del array. Añadirle además un campo `badge` con el texto `'Más común'` para destacarlo visualmente.

**Antes:**
```js
const THICKNESSES = [
  { id: '2-3',  label: '2–3',  unit: 'cm', hint: 'Puertas ligeras, interiores' },
  { id: '3-5',  label: '3–5',  unit: 'cm', hint: 'Estándar — mayoría de departamentos' },
  { id: '5-7',  label: '5–7',  unit: 'cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10', label: '7–10', unit: 'cm', hint: 'Seguridad o blindadas' },
  { id: 'unknown', label: 'No lo sé', hint: 'Continúa y te mostramos opciones compatibles' },
];
```
**Después:**
```js
const THICKNESSES = [
  { id: '3-5',  label: '3–5',  unit: 'cm', hint: 'Estándar — mayoría de puertas residenciales', badge: 'Más común' },
  { id: '2-3',  label: '2–3',  unit: 'cm', hint: 'Puertas ligeras, interiores' },
  { id: '5-7',  label: '5–7',  unit: 'cm', hint: 'Reforzadas o acceso principal' },
  { id: '7-10', label: '7–10', unit: 'cm', hint: 'Seguridad o blindadas' },
  { id: 'unknown', label: 'No lo sé', hint: 'Continúa y te mostramos opciones compatibles' },
];
```

> **Nota sobre el campo `badge`:** Si el componente `OptionCardGrid` con `variant="diagram"` no renderiza el campo `badge` todavía, simplemente añadirlo al objeto de datos es suficiente — no rompe nada y quedará listo para cuando el componente lo soporte. NO modificar `OptionCardGrid.jsx` en esta tarea.

---

## Instrucciones de ejecución

- Editar SOLO `src/screens/ThicknessScreen.jsx`.
- NO modificar: `matcher.js`, `OptionCardGrid.jsx`, ningún token de diseño, ni ningún otro archivo.
- NO cambiar ningún campo `id` — son llaves usadas por `matcher.js`.
- Después del cambio, ejecutar `npm run build` y confirmar que compila sin errores.
- Actualizar el Task Log en `CLAUDE.md` con la fecha de hoy.
