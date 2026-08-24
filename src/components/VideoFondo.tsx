import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** 'auto' para el hero, que debe pintar el primer frame de inmediato. */
  preload?: 'auto' | 'metadata' | 'none';
  /**
   * Versión alterna para pantallas angostas. Un video apaisado dentro de un
   * hero vertical pierde hasta el 78% del ancho por el `object-cover`; con un
   * recorte 9:16 el teléfono ve casi toda la toma. Sólo se descarga el que toca.
   */
  srcMovil?: string;
  posterMovil?: string;
};

/**
 * Video de fondo que sólo se reproduce mientras la sección está en pantalla.
 * Con cuatro fondos en la página, dejarlos todos corriendo cuesta batería y
 * CPU de más; esto los pausa en cuanto salen del viewport.
 */
export default function VideoFondo({
  src,
  poster,
  className = '',
  preload = 'metadata',
  srcMovil,
  posterMovil,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [esAngosta, setEsAngosta] = useState(false);

  useEffect(() => {
    if (!srcMovil || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const aplicar = () => setEsAngosta(mq.matches);
    aplicar();
    mq.addEventListener('change', aplicar);
    return () => mq.removeEventListener('change', aplicar);
  }, [srcMovil]);

  const fuente = esAngosta && srcMovil ? srcMovil : src;
  const cartel = esAngosta && posterMovil ? posterMovil : poster;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reducido =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducido) {
      video.pause();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      void video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [fuente]);

  return (
    <video
      ref={ref}
      className={className}
      src={fuente}
      poster={cartel}
      loop
      muted
      playsInline
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
