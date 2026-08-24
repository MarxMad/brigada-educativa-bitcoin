import { useEffect, useRef } from 'react';

/**
 * Red de nodos Lightning dibujada en canvas.
 *
 * Sustituye al video de la moneda en la banda naranja por dos razones: la
 * moneda ya aparece arriba, y un grafo de nodos dice literalmente lo que hace
 * la brigada — cada visita conecta un comercio más a la red. Al ser vectorial
 * se dibuja a la densidad real de la pantalla, así que nunca se pixelea y no
 * pesa un solo byte de descarga.
 */

type Nodo = {
  x: number;
  y: number;
  r: number;
  /** Los principales laten; los secundarios sólo acompañan. */
  fuerte: boolean;
  fase: number;
};

/** Posiciones en coordenadas 0–1, colocadas a mano para que se vea equilibrado. */
const NODOS: Nodo[] = [
  { x: 0.5, y: 0.5, r: 13, fuerte: true, fase: 0 },
  { x: 0.22, y: 0.26, r: 8, fuerte: true, fase: 0.7 },
  { x: 0.78, y: 0.24, r: 9, fuerte: true, fase: 1.4 },
  { x: 0.84, y: 0.66, r: 7.5, fuerte: true, fase: 2.1 },
  { x: 0.5, y: 0.86, r: 8.5, fuerte: true, fase: 2.8 },
  { x: 0.16, y: 0.68, r: 7, fuerte: true, fase: 3.5 },
  { x: 0.36, y: 0.12, r: 4.5, fuerte: false, fase: 1.1 },
  { x: 0.68, y: 0.1, r: 4, fuerte: false, fase: 2.3 },
  { x: 0.93, y: 0.44, r: 4.5, fuerte: false, fase: 0.4 },
  { x: 0.7, y: 0.88, r: 4, fuerte: false, fase: 3.1 },
  { x: 0.3, y: 0.9, r: 4.5, fuerte: false, fase: 1.8 },
  { x: 0.07, y: 0.45, r: 4, fuerte: false, fase: 2.6 },
];

/** Pares conectados: el centro con todos los fuertes, más algunos secundarios. */
const ARISTAS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
  [1, 6], [6, 7], [7, 2], [2, 8], [8, 3],
  [3, 9], [9, 4], [4, 10], [10, 5], [5, 11], [11, 1],
];

const TINTA = '#0A0806';

export default function NodoLightning({ className = '' }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let vivo = true;

    /** Ajusta el tamaño del lienzo a la densidad real de la pantalla. */
    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const { width, height } = cv.getBoundingClientRect();
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: width, h: height };
    };

    let dim = medir();

    const dibujar = (t: number) => {
      const { w, h } = dim;
      const pos = NODOS.map((n) => ({ ...n, px: n.x * w, py: n.y * h }));
      ctx.clearRect(0, 0, w, h);

      // Aristas
      ctx.lineWidth = 1.2;
      ARISTAS.forEach(([a, b]) => {
        const A = pos[a];
        const B = pos[b];
        ctx.strokeStyle = `${TINTA}${A.fuerte && B.fuerte ? '3a' : '20'}`;
        ctx.beginPath();
        ctx.moveTo(A.px, A.py);
        ctx.lineTo(B.px, B.py);
        ctx.stroke();
      });

      // Pulsos viajando por las aristas
      if (!reducido) {
        ARISTAS.forEach(([a, b], i) => {
          const ciclo = 3.2 + (i % 5) * 0.55;
          const avance = ((t / 1000 + i * 0.37) % ciclo) / ciclo;
          if (avance > 0.82) return; // pausa entre pulsos
          const p = avance / 0.82;
          const A = pos[a];
          const B = pos[b];
          const x = A.px + (B.px - A.px) * p;
          const y = A.py + (B.py - A.py) * p;
          const alfa = Math.sin(p * Math.PI);

          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 248, 235, ${alfa * 0.9})`;
          ctx.fill();
        });
      }

      // Nodos
      pos.forEach((n) => {
        const latido = reducido ? 0 : Math.sin(t / 1000 + n.fase) * 0.5 + 0.5;
        const r = n.r * (n.fuerte ? 1 + latido * 0.1 : 1);

        if (n.fuerte) {
          ctx.beginPath();
          ctx.arc(n.px, n.py, r + 6 + latido * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10, 8, 6, ${0.1 + latido * 0.07})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = TINTA;
        ctx.fill();

        // El nodo central lleva el rayo de Lightning
        if (n.r > 12) {
          ctx.save();
          ctx.translate(n.px, n.py);
          ctx.beginPath();
          ctx.moveTo(1.6, -6.5);
          ctx.lineTo(-3.2, 0.6);
          ctx.lineTo(0.2, 0.6);
          ctx.lineTo(-1.6, 6.5);
          ctx.lineTo(3.2, -0.6);
          ctx.lineTo(-0.2, -0.6);
          ctx.closePath();
          ctx.fillStyle = '#F7931A';
          ctx.fill();
          ctx.restore();
        }
      });
    };

    const bucle = (t: number) => {
      if (!vivo) return;
      dibujar(t);
      if (!reducido) frame = requestAnimationFrame(bucle);
    };

    frame = requestAnimationFrame(bucle);

    const alRedimensionar = () => {
      dim = medir();
      dibujar(performance.now());
    };
    window.addEventListener('resize', alRedimensionar);

    return () => {
      vivo = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', alRedimensionar);
    };
  }, []);

  return <canvas ref={canvas} className={className} aria-hidden="true" />;
}
