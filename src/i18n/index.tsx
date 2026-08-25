import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { es, type Diccionario } from './es';
import { en } from './en';

export type Idioma = 'es' | 'en';

const diccionarios: Record<Idioma, Diccionario> = { es, en };

const CLAVE_GUARDADA = 'brigada:idioma';

type Contexto = {
  idioma: Idioma;
  t: Diccionario;
  cambiar: (i: Idioma) => void;
  alternar: () => void;
};

const ContextoIdioma = createContext<Contexto | null>(null);

/** Idioma inicial: lo que el visitante eligió antes, si no el del navegador. */
function idiomaInicial(): Idioma {
  if (typeof window === 'undefined') return 'es';

  try {
    const guardado = window.localStorage.getItem(CLAVE_GUARDADA);
    if (guardado === 'es' || guardado === 'en') return guardado;
  } catch {
    // Modo privado o cookies bloqueadas: seguimos con la detección del navegador.
  }

  const nav = window.navigator.language?.toLowerCase() ?? 'es';
  return nav.startsWith('en') ? 'en' : 'es';
}

export function ProveedorIdioma({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>('es');

  // Se resuelve después del primer render para que el HTML servido sea estable.
  useEffect(() => {
    setIdioma(idiomaInicial());
  }, []);

  useEffect(() => {
    document.documentElement.lang = diccionarios[idioma].htmlLang;
    document.title = diccionarios[idioma].proyecto.nombre;
    try {
      window.localStorage.setItem(CLAVE_GUARDADA, idioma);
    } catch {
      // Si no se puede guardar, la elección dura sólo esta visita.
    }
  }, [idioma]);

  const cambiar = useCallback((i: Idioma) => setIdioma(i), []);
  const alternar = useCallback(() => setIdioma((i) => (i === 'es' ? 'en' : 'es')), []);

  return (
    <ContextoIdioma.Provider value={{ idioma, t: diccionarios[idioma], cambiar, alternar }}>
      {children}
    </ContextoIdioma.Provider>
  );
}

export function useIdioma() {
  const ctx = useContext(ContextoIdioma);
  if (!ctx) throw new Error('useIdioma debe usarse dentro de <ProveedorIdioma>');
  return ctx;
}

/** Atajo para leer sólo el diccionario. */
export function useT(): Diccionario {
  return useIdioma().t;
}

type BotonProps = { className?: string };

/** Interruptor ES / EN. */
export function BotonIdioma({ className = '' }: BotonProps) {
  const { idioma, alternar, t } = useIdioma();

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={t.nav.cambiarIdioma}
      title={t.nav.cambiarIdioma}
      className={`inline-flex items-center gap-[3px] font-[450] leading-none tabular-nums ${className}`}
    >
      <span className={idioma === 'es' ? 'text-white' : 'text-white/40'}>ES</span>
      <span className="text-white/25">/</span>
      <span className={idioma === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
    </button>
  );
}
