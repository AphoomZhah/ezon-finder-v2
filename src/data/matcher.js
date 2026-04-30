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
  // 'vidrio' and 'otros' → hard block (no compatible products in catalog)
  // 'unknown' → no filter for that criterion; show all compatible products
  if (answers.material === 'vidrio' || answers.material === 'otros') return [];
  const materialFilter = answers.material === 'unknown' ? null : answers.material;
  const doorTypeFilter = answers.doorType === 'unknown' ? null : answers.doorType;

  const matched = PRODUCTS
    .filter(p =>
      categoryHard(p.material, materialFilter) &&
      categoryHard(p.doorType, doorTypeFilter) &&
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
