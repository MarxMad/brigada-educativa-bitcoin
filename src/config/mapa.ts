/**
 * Datos del mapa de adopción.
 *
 * `COMERCIOS` arranca vacío a propósito: la fase de activación inicia el 7 de
 * septiembre de 2026 y todavía no hay ningún comercio registrado. Se va
 * llenando conforme cada negocio acepta Bitcoin, instala su señalética y pide
 * entrar al mapa.
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
export const ZOOM = 11;

/** Radio con el que pedimos comercios a BTC Map alrededor de la cabecera. */
export const RADIO_BTC_MAP_KM = 60;

/**
 * Teselas del mapa.
 *
 * CARTO dejó de servir su basemap de forma anónima: sin llave estampa la marca
 * de agua «API KEY REQUIRED» sobre cada tesela. La llave es gratuita hasta
 * 5 millones de teselas al mes, no requiere cuenta y llega por correo en un
 * minuto desde https://carto.com/basemaps/apikey — se guarda en `VITE_CARTO_KEY`
 * (en `.env.local` para desarrollo y en las variables del proyecto de Vercel).
 */
const CARTO_KEY = import.meta.env.VITE_CARTO_KEY?.trim() ?? '';

export const TESELAS_URL =
  `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` +
  (CARTO_KEY ? `?key=${CARTO_KEY}` : '');

export const BTC_MAP = {
  search: 'https://api.btcmap.org/v4/places/search/',
  explorar: `https://btcmap.org/?lat=${CENTRO[0]}&long=${CENTRO[1]}&zoom=13`,
  agregar: 'https://btcmap.org/add-location',
  ficha: (id: number) => `https://btcmap.org/merchant/${id}`,
};

export type LugarBtcMap = {
  id: number;
  nombre: string;
  lat: number;
  lon: number;
  icono?: string;
  direccion?: string;
};

export function distanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function buscarLugaresBtcMap(signal?: AbortSignal): Promise<LugarBtcMap[]> {
  const url = new URL(BTC_MAP.search);
  url.searchParams.set('lat', String(CENTRO[0]));
  url.searchParams.set('lon', String(CENTRO[1]));
  url.searchParams.set('radius_km', String(RADIO_BTC_MAP_KM));

  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`BTC Map ${res.status}`);

  const bruto: unknown = await res.json();
  if (!Array.isArray(bruto)) return [];

  const lugares: LugarBtcMap[] = [];
  for (const item of bruto) {
    if (!item || typeof item !== 'object') continue;
    const p = item as Record<string, unknown>;
    const id = Number(p.id);
    const lat = Number(p.lat);
    const lon = Number(p.lon);
    const nombre = typeof p.name === 'string' ? p.name.trim() : '';
    if (!Number.isFinite(id) || !Number.isFinite(lat) || !Number.isFinite(lon) || !nombre) continue;
    lugares.push({
      id,
      nombre,
      lat,
      lon,
      icono: typeof p.icon === 'string' ? p.icon : undefined,
      direccion: typeof p.address === 'string' && p.address.trim() ? p.address.trim() : undefined,
    });
  }

  return lugares.sort(
    (a, b) =>
      distanciaKm(CENTRO[0], CENTRO[1], a.lat, a.lon) -
      distanciaKm(CENTRO[0], CENTRO[1], b.lat, b.lon),
  );
}

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
