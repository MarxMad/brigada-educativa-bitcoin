/**
 * Datos del mapa de adopción.
 *
 * `COMERCIOS` arranca vacío a propósito: la brigada inicia el 24 de agosto de
 * 2026 y todavía no hay ningún comercio registrado. Se va llenando conforme
 * cada negocio acepta Bitcoin, instala su señalética y pide entrar al mapa.
 *
 * Para agregar uno, copia este bloque y ajusta los valores:
 *
 *   { id: 'panaderia-la-esquina',
 *     nombre: 'Panadería La Esquina',
 *     giro: 'Panadería',
 *     lat: 19.9317, lng: -97.9603,
 *     desde: '2026-08-26' },
 *
 * Las coordenadas se sacan de Google Maps (clic derecho → "¿Qué hay aquí?")
 * o de OpenStreetMap.
 */

export type Comercio = {
  id: string;
  nombre: string;
  /** Panadería, hotel, artesanías… Se muestra bajo el nombre. */
  giro: string;
  lat: number;
  lng: number;
  /** Fecha ISO en que aceptó Bitcoin. */
  desde: string;
};

export const COMERCIOS: Comercio[] = [];

/** Meta al cierre de la semana 4, según el plan operativo del deck. */
export const META_COMERCIOS = 21;

/** Centro y zoom inicial del mapa. Coordenadas reales de Zacatlán. */
export const CENTRO: [number, number] = [19.9332, -97.9605];
export const ZOOM = 16;

export type PuntoRuta = {
  id: string;
  /** Clave del nombre; el texto visible sale del diccionario de idioma. */
  nombre: string;
  lat: number;
  lng: number;
};

/**
 * Los tres puntos donde arranca el recorrido en la semana 1, según el deck.
 * El Reloj Floral está geocodificado; los otros dos son el centro histórico.
 */
export const PUNTOS_RUTA: PuntoRuta[] = [
  { id: 'reloj-floral', nombre: 'Reloj Floral', lat: 19.9316879, lng: -97.960244 },
  { id: 'calle-del-arco', nombre: 'Calle del Arco', lat: 19.9325, lng: -97.9598 },
  { id: 'mercado', nombre: 'Mercado municipal', lat: 19.9338, lng: -97.9612 },
];
