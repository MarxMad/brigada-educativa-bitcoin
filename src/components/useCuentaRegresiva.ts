import { useEffect, useState } from 'react';

/** Arranque de la brigada, hora del centro de México. */
export const INICIO_BRIGADA = new Date('2026-08-24T09:00:00-06:00').getTime();
export const FIN_BRIGADA = new Date('2026-09-20T20:00:00-06:00').getTime();

export type Estado = 'antes' | 'enCurso' | 'terminada';

export function useCuentaRegresiva() {
  const [ahora, setAhora] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setAhora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const faltan = Math.max(INICIO_BRIGADA - ahora, 0);

  const estado: Estado =
    ahora < INICIO_BRIGADA ? 'antes' : ahora <= FIN_BRIGADA ? 'enCurso' : 'terminada';

  /** Semana en curso, 1 a 4. Sólo tiene sentido si estado === 'enCurso'. */
  const semanaActual = Math.min(
    Math.max(Math.floor((ahora - INICIO_BRIGADA) / (7 * 86_400_000)) + 1, 1),
    4
  );

  return {
    estado,
    semanaActual,
    dias: Math.floor(faltan / 86_400_000),
    horas: Math.floor((faltan / 3_600_000) % 24),
    minutos: Math.floor((faltan / 60_000) % 60),
    segundos: Math.floor((faltan / 1000) % 60),
  };
}
