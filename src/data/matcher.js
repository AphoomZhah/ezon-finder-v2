import { PRODUCTS } from './products';

const THICKNESS_RANGES = {
  '2-3':  { min: 2,  max: 3  },
  '3-5':  { min: 3,  max: 5  },
  '5-7':  { min: 5,  max: 7  },
  '7-10': { min: 7,  max: 10 },
};

function categoryHard(productFlags, userValue) {
  if (!userValue) return true;
  const anyTrue = Object.values(productFlags).some(v => v === true);
  if (!anyTrue) return true; // all-false = universal / not applicable
  return productFlags[userValue] === true;
}

function doorTypeHard(productDoorType, userValue) {
  if (!userValue || userValue === 'unknown') return true;
  const anyTrue = Object.values(productDoorType).some(v => v === true);
  if (!anyTrue) return true; // universal product — compatible with everything

  if (userValue === 'abatible') {
    return productDoorType.abatible1hoja === true || productDoorType.abatible2hojas === true;
  }
  if (userValue === 'corrediza') {
    return productDoorType.corrediza1hoja === true || productDoorType.corrediza2hojas === true;
  }
  if (userValue === 'reja') {
    return productDoorType.reja === true;
  }
  // legacy fallback: exact key match
  return productDoorType[userValue] === true;
}

function thicknessHard(product, thickness) {
  if (product.thicknessMin === null && product.thicknessMax === null) return true;
  // 'unknown' and legacy 'no-se' → skip filter
  if (!thickness || thickness === 'no-se' || thickness === 'unknown') return true;
  const range = THICKNESS_RANGES[thickness];
  if (!range) return true;
  return product.thicknessMax >= range.min && product.thicknessMin <= range.max;
}

function softScore(product, answers) {
  let earned = 0;
  let possible = 0;

  const accessMethods = (answers.accessMethods || []).filter(m => m !== 'unknown');
  for (const method of accessMethods) {
    possible++;
    if (product.access[method] === true) earned++;
  }

  const functions = answers.functions || [];
  for (const fn of functions) {
    possible++;
    if (product.functions[fn] === true) earned++;
  }

  const lockType = answers.lockType;
  if (lockType && lockType !== 'unknown') {
    possible += 2;
    if (product.lockType[lockType] === true) earned += 2;
  }

  if (possible === 0) return 100;
  return Math.round((earned / possible) * 100);
}

export function matchProducts(answers) {
  const materialFilter = (!answers.material || answers.material === 'unknown' || answers.material === 'otros')
    ? null
    : answers.material;

  const matched = PRODUCTS
    .filter(p =>
      categoryHard(p.material, materialFilter) &&
      doorTypeHard(p.doorType, answers.doorType) &&
      thicknessHard(p, answers.thickness)
      // TODO post-V1: reactivar cuando se reintroduzca LocationScreen
      // && categoryHard(p.location, answers.location)
    )
    .map(p => ({ ...p, score: softScore(p, answers) }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return matched;
}

export function getViableLockTypes(answers) {
  // Domain rule: reja always maps to candado only, regardless of matrix.
  // No product in the catalog has reja=true; candado products are universal doorType.
  if (answers.doorType === 'reja') return ['candado'];

  const candidates = PRODUCTS.filter(p =>
    categoryHard(p.material, (!answers.material || answers.material === 'unknown' || answers.material === 'otros') ? null : answers.material) &&
    doorTypeHard(p.doorType, answers.doorType)
  );

  const lockTypeKeys = ['conManija', 'pushPull', 'cerrojo', 'candado'];
  return lockTypeKeys.filter(lt => {
    return candidates.some(p => {
      const anyTrue = Object.values(p.lockType).some(v => v === true);
      if (!anyTrue) return true;
      return p.lockType[lt] === true;
    });
  });
}

export function getViableDoorTypes(answers) {
  // Domain rule: vidrio doors are never rejas.
  // For all other materials, all three doorType options are potentially valid.
  const materialFilter = (!answers.material || answers.material === 'unknown' || answers.material === 'otros')
    ? null
    : answers.material;

  const doorTypeKeys = ['abatible', 'corrediza', 'reja'];

  return doorTypeKeys.filter(dt => {
    // Domain rule: reja never applies to vidrio
    if (dt === 'reja' && answers.material === 'vidrio') return false;

    const candidates = PRODUCTS.filter(p =>
      categoryHard(p.material, materialFilter) &&
      doorTypeHard(p.doorType, dt)
    );
    return candidates.length > 0;
  });
}

export function getViableAccessMethods(answers) {
  const materialFilter = (!answers.material || answers.material === 'unknown' || answers.material === 'otros')
    ? null : answers.material;
  const lockTypeFilter = (!answers.lockType || answers.lockType === 'unknown')
    ? null : answers.lockType;

  const candidates = PRODUCTS.filter(p =>
    categoryHard(p.material, materialFilter) &&
    doorTypeHard(p.doorType, answers.doorType) &&
    categoryHard(p.lockType, lockTypeFilter)
  );

  const accessKeys = ['huella', 'facial', 'pin', 'app', 'rfid', 'llaveRespaldo'];
  return accessKeys.filter(method =>
    candidates.some(p => p.access[method] === true)
  );
}

export function getViableFunctions(answers) {
  const materialFilter = (!answers.material || answers.material === 'unknown' || answers.material === 'otros')
    ? null : answers.material;
  const lockTypeFilter = (!answers.lockType || answers.lockType === 'unknown')
    ? null : answers.lockType;

  // For functions, also filter by selected access methods (soft: at least one must match)
  const accessMethods = (answers.accessMethods || []).filter(m => m !== 'unknown');

  const candidates = PRODUCTS.filter(p => {
    if (!categoryHard(p.material, materialFilter)) return false;
    if (!doorTypeHard(p.doorType, answers.doorType)) return false;
    if (!categoryHard(p.lockType, lockTypeFilter)) return false;
    // If user selected access methods, product must support at least one
    if (accessMethods.length > 0) {
      const matchesAny = accessMethods.some(m => p.access[m] === true);
      if (!matchesAny) return false;
    }
    return true;
  });

  const fnKeys = [
    'bloqueoAutomatico', 'modoNino', 'camara', 'codigosTemporales',
    'aperturaRemota', 'googleHomeAlexa', 'adminAirbnb'
  ];
  return fnKeys.filter(fn =>
    candidates.some(p => p.functions[fn] === true)
  );
}
