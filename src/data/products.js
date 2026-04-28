// TODO: replace placeholder entries (2-8) with real CSV data
export const PRODUCTS = [
  {
    brand: 'Igloohome',
    name: 'Candado Inteligente con Huella Padlock Lite',
    urlShopify: 'https://ezonmexico.com/products/candado-huella-digital-igloohome-padlock-lite',
    urlImg: 'https://ezonmexico.com/cdn/shop/files/BasicasGrisesP3_PadLockLiteBlack-01.jpg',
    priceFull: 1915,
    priceDiscount: 1341,
    material: { madera: false, metal: false, vidrio: false },
    doorType: {
      abatible1hoja: false, abatible2hojas: false,
      corrediza1hoja: false, corrediza2hojas: false, reja: true,
    },
    thicknessMin: null,
    thicknessMax: null,
    location: {
      interiorPrincipal: false, interiorRecamara: true,
      interiorCloset: true, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: true,
    },
    access: {
      huella: true, facial: false, pin: false,
      app: true, rfid: false, llaveRespaldo: false,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: false, adminAirbnb: false,
    },
    lockType: {
      conManija: false, pushPull: false, cerrojo: false, candado: true,
    },
  },
  {
    brand: 'Igloohome',
    name: 'Cerrojo Digital Deadbolt Lite',
    urlShopify: 'https://ezonmexico.com/products/cerrojo-digital-igloohome-deadbolt-lite',
    urlImg: '',
    priceFull: 2850,
    priceDiscount: 1995,
    material: { madera: true, metal: true, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: true,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 3.5,
    thicknessMax: 9,
    location: {
      interiorPrincipal: true, interiorRecamara: true,
      interiorCloset: false, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: true, facial: false, pin: true,
      app: true, rfid: false, llaveRespaldo: true,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: false, adminAirbnb: false,
    },
    lockType: {
      conManija: false, pushPull: false, cerrojo: true, candado: false,
    },
  },
  {
    brand: 'Samsung',
    name: 'Samsung SHP-DP609',
    urlShopify: 'https://ezonmexico.com/products/samsung-shp-dp609',
    urlImg: '',
    priceFull: 9800,
    priceDiscount: 8900,
    material: { madera: true, metal: true, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: false,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 3.5,
    thicknessMax: 8,
    location: {
      interiorPrincipal: true, interiorRecamara: true,
      interiorCloset: false, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: true, facial: false, pin: true,
      app: true, rfid: true, llaveRespaldo: false,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: false, adminAirbnb: true,
    },
    lockType: {
      conManija: true, pushPull: false, cerrojo: false, candado: false,
    },
  },
  {
    brand: 'Samsung',
    name: 'Samsung SHP-DH538 con Videoportero',
    urlShopify: 'https://ezonmexico.com/products/samsung-shp-dh538',
    urlImg: '',
    priceFull: 16500,
    priceDiscount: 14500,
    material: { madera: true, metal: true, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: false,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 3.5,
    thicknessMax: 8,
    location: {
      interiorPrincipal: true, interiorRecamara: false,
      interiorCloset: false, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: true, facial: true, pin: true,
      app: true, rfid: true, llaveRespaldo: false,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: true,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: true, adminAirbnb: true,
    },
    lockType: {
      conManija: true, pushPull: false, cerrojo: false, candado: false,
    },
  },
  {
    brand: 'Yale',
    name: 'Yale YDM4109+ Push & Pull',
    urlShopify: 'https://ezonmexico.com/products/yale-ydm4109-push-pull',
    urlImg: '',
    priceFull: 11500,
    priceDiscount: 9800,
    material: { madera: true, metal: true, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: true,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 3.5,
    thicknessMax: 8,
    location: {
      interiorPrincipal: true, interiorRecamara: false,
      interiorCloset: false, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: true, facial: true, pin: true,
      app: true, rfid: false, llaveRespaldo: false,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: true, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: true, adminAirbnb: false,
    },
    lockType: {
      conManija: false, pushPull: true, cerrojo: false, candado: false,
    },
  },
  {
    brand: 'Yale',
    name: 'Yale YDR4109+ Slim',
    urlShopify: 'https://ezonmexico.com/products/yale-ydr4109-slim',
    urlImg: '',
    priceFull: 7500,
    priceDiscount: 6800,
    material: { madera: true, metal: false, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: true,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 2,
    thicknessMax: 5,
    location: {
      interiorPrincipal: true, interiorRecamara: true,
      interiorCloset: true, interiorOficina: true,
      exteriorConTecho: true, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: true, facial: false, pin: true,
      app: true, rfid: false, llaveRespaldo: true,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: false, adminAirbnb: true,
    },
    lockType: {
      conManija: false, pushPull: true, cerrojo: false, candado: false,
    },
  },
  {
    brand: 'Excel',
    name: 'Excel SL275 Digital Lock',
    urlShopify: 'https://ezonmexico.com/products/excel-sl275',
    urlImg: '',
    priceFull: 4800,
    priceDiscount: 4200,
    material: { madera: true, metal: true, vidrio: false },
    doorType: {
      abatible1hoja: true, abatible2hojas: false,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: 3,
    thicknessMax: 7,
    location: {
      interiorPrincipal: true, interiorRecamara: true,
      interiorCloset: false, interiorOficina: true,
      exteriorConTecho: false, exteriorSinTecho: false, exteriorReja: false,
    },
    access: {
      huella: false, facial: false, pin: true,
      app: false, rfid: true, llaveRespaldo: true,
    },
    functions: {
      bloqueoAutomatico: true, modoNino: false, camara: false,
      codigosTemporales: false, aperturaRemota: false,
      googleHomeAlexa: false, adminAirbnb: false,
    },
    lockType: {
      conManija: true, pushPull: false, cerrojo: false, candado: false,
    },
  },
  {
    brand: 'Igloohome',
    name: 'Igloohome KeyBox 3E',
    urlShopify: 'https://ezonmexico.com/products/igloohome-keybox-3e',
    urlImg: '',
    priceFull: 3200,
    priceDiscount: 2240,
    material: { madera: false, metal: false, vidrio: false },
    doorType: {
      abatible1hoja: false, abatible2hojas: false,
      corrediza1hoja: false, corrediza2hojas: false, reja: false,
    },
    thicknessMin: null,
    thicknessMax: null,
    location: {
      interiorPrincipal: false, interiorRecamara: false,
      interiorCloset: false, interiorOficina: false,
      exteriorConTecho: true, exteriorSinTecho: true, exteriorReja: true,
    },
    access: {
      huella: false, facial: false, pin: true,
      app: true, rfid: false, llaveRespaldo: true,
    },
    functions: {
      bloqueoAutomatico: false, modoNino: false, camara: false,
      codigosTemporales: true, aperturaRemota: true,
      googleHomeAlexa: false, adminAirbnb: true,
    },
    lockType: {
      conManija: false, pushPull: false, cerrojo: false, candado: true,
    },
  },
];
