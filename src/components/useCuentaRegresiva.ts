import { useEffect, useState } from 'react';

/** Arranque de la brigada, hora del centro de México. */
export const INICIO_BRIGADA = new Date('2026-08-24T09:00:00-06:00').getTime();
export const FIN_BRIGADA = new Date('2026-09-20T20:00:00-06:00').getTime();

export type Estado = 'antes' | 'enCurso' | 'terminada';

const TZ = 'America/Mexico_City';

const WEEKDAY: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Índice del bloque en `ruta.semanas[semana-1].bloques` para cada día
 * de la semana (0 = domingo … 6 = sábado). `null` = no hay brigada ese día.
 * Calendario del deck, no inventado.
 */
const BLOQUE_POR_DIA: Array<Array<number | null>> = [
  [null, 0, 1, 1, 1, 2, null],
  [null, 0, 0, 1, 2, 3, null],
  [3, 0, 0, 0, 1, 2, 2],
  [null, 0, 0, 0, 0, 1, null],
];

export type Actividad = {
  semana: number;
  bloqueIdx: number;
  esHoy: boolean;
};

function weekdayMexico(ms: number): number {
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(new Date(ms));
  return WEEKDAY[wd] ?? 0;
}

function fechaClaveMexico(ms: number): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(ms));
}

function semanaEn(ms: number): number {
  return Math.min(Math.max(Math.floor((ms - INICIO_BRIGADA) / (7 * 86_400_000)) + 1, 1), 4);
}

function bloqueEn(ms: number): { semana: number; bloqueIdx: number } | null {
  if (ms < INICIO_BRIGADA || ms > FIN_BRIGADA) return null;
  const semana = semanaEn(ms);
  const idx = BLOQUE_POR_DIA[semana - 1][weekdayMexico(ms)];
  return idx != null ? { semana, bloqueIdx: idx } : null;
}

function buscarSiguiente(desde: number): { semana: number; bloqueIdx: number } | null {
  for (let d = 1; d <= 16; d++) {
    const found = bloqueEn(desde + d * 86_400_000);
    if (found) return found;
  }
  return null;
}

function actividadEn(
  estado: Estado,
  ahora: number,
  weekday: number,
  mismaFechaInicio: boolean
): Actividad | null {
  if (estado === 'terminada') return null;

  if (estado === 'antes') {
    const idxHoy = BLOQUE_POR_DIA[0][weekday];
    if (mismaFechaInicio && idxHoy != null) {
      return { semana: 1, bloqueIdx: idxHoy, esHoy: true };
    }
    return { semana: 1, bloqueIdx: 0, esHoy: false };
  }

  const hoy = bloqueEn(ahora);
  if (hoy) return { ...hoy, esHoy: true };

  const next = buscarSiguiente(ahora);
  return next ? { ...next, esHoy: false } : null;
}

export function useCuentaRegresiva() {
  const [ahora, setAhora] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setAhora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const faltan = Math.max(INICIO_BRIGADA - ahora, 0);

  const estado: Estado =
    ahora < INICIO_BRIGADA ? 'antes' : ahora <= FIN_BRIGADA ? 'enCurso' : 'terminada';

  const semanaActual = semanaEn(ahora);

  const weekday = weekdayMexico(ahora);
  const mismaFechaInicio = fechaClaveMexico(ahora) === fechaClaveMexico(INICIO_BRIGADA);

  return {
    estado,
    semanaActual,
    dias: Math.floor(faltan / 86_400_000),
    horas: Math.floor((faltan / 3_600_000) % 24),
    minutos: Math.floor((faltan / 60_000) % 60),
    segundos: Math.floor((faltan / 1000) % 60),
    mismaFechaInicio,
    actividad: actividadEn(estado, ahora, weekday, mismaFechaInicio),
  };
}
