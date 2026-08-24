import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useInView as useInViewMotion,
  useMotionValue,
  useReducedMotion,
  animate,
  type Variants,
} from 'motion/react';

/**
 * `LazyMotion` + `domAnimation` en vez del import completo de `motion`:
 * carga sólo animaciones y gestos (que es todo lo que usamos) y deja fuera
 * layout animations y drag. Ahorra ~25 KB comprimidos.
 */
export function ProveedorMotion({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}

type Direction = 'up' | 'left' | 'right' | 'scale';

/** La curva del sitio. Framer la acepta como array. */
export const EASE = [0.16, 1, 0.3, 1] as const;

const desplazamiento: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.94 },
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  dir?: Direction;
  className?: string;
};

/**
 * Aparición al entrar en pantalla. Misma interfaz que la versión anterior en CSS,
 * pero ahora sobre Framer Motion para poder encadenarla con hover y springs.
 */
export default function Reveal({ children, delay = 0, dir = 'up', className = '' }: RevealProps) {
  const reducido = useReducedMotion();

  const variantes: Variants = {
    oculto: reducido ? { opacity: 0 } : { opacity: 0, ...desplazamiento[dir] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: reducido ? 0.2 : 0.85, ease: EASE, delay: delay / 1000 },
    },
  };

  return (
    <m.div
      className={className}
      variants={variantes}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </m.div>
  );
}

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
};

/** Cuenta de 0 a `to` una sola vez, cuando el número entra en pantalla. */
export function CountUp({ to, duration = 1.7, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const enVista = useInViewMotion(ref, { once: true, amount: 0.5 });
  const reducido = useReducedMotion();
  const valor = useMotionValue(0);
  const [texto, setTexto] = useState('0');

  useEffect(() => {
    if (!enVista) return;

    if (reducido) {
      setTexto(String(to));
      return;
    }

    const control = animate(valor, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setTexto(String(Math.round(v))),
    });

    return () => control.stop();
  }, [enVista, to, duration, valor, reducido]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {texto}
    </span>
  );
}

type TarjetaProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Cuánto se levanta al pasar el mouse. 0 la deja quieta. */
  levanta?: number;
};

/**
 * Tarjeta que entra escalonada y responde al mouse con un spring.
 * El `whileHover` se desactiva solo si el sistema pide menos movimiento.
 */
export function Tarjeta({ children, delay = 0, className = '', levanta = 6 }: TarjetaProps) {
  const reducido = useReducedMotion();

  return (
    <m.article
      className={className}
      initial={reducido ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -6% 0px' }}
      transition={{ duration: reducido ? 0.2 : 0.7, ease: EASE, delay: delay / 1000 }}
      whileHover={reducido || !levanta ? undefined : { y: -levanta }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </m.article>
  );
}

/** Contenedor que escalona la entrada de sus hijos sin repetir delays a mano. */
export function Escalonado({
  children,
  className = '',
  paso = 0.07,
}: {
  children: ReactNode;
  className?: string;
  paso?: number;
}) {
  return (
    <m.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -6% 0px' }}
      variants={{ visible: { transition: { staggerChildren: paso } } }}
    >
      {children}
    </m.div>
  );
}

/** Hijo de <Escalonado>. Hereda el escalonado del padre. */
export function Item({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reducido = useReducedMotion();

  return (
    <m.div
      className={className}
      variants={{
        oculto: reducido ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reducido ? 0.2 : 0.7, ease: EASE },
        },
      }}
    >
      {children}
    </m.div>
  );
}
