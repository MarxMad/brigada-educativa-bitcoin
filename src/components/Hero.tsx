import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import { useT, BotonIdioma } from '@/i18n';
import { useCuentaRegresiva } from '@/components/useCuentaRegresiva';

/**
 * Metraje propio de Zacatlán de las Manzanas (ZacatlanVideo.mov, CapCut).
 * Del máster de 25.4 s se usan sólo los tramos limpios — 0–2.24 s y 3.27–18.24 s —
 * porque el resto trae interfaz de YouTube y la marca «Notas» quemadas en imagen.
 * Reencodeado de HEVC a H.264 (HEVC no reproduce en Chrome ni Firefox), sin pista
 * de audio, con `+faststart` y una corrección de color que lo oscurece y calienta
 * para que el titular blanco siempre gane.
 */
const HERO_VIDEO = '/video/hero.mp4';

type AnimateProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
};

function Animate({ children, delay = 0, className = '', direction = 'up' }: AnimateProps) {
  const directionClass = {
    up: 'animate-fade-up',
    down: 'animate-fade-down',
    left: 'animate-fade-left',
    right: 'animate-fade-right',
    scale: 'animate-fade-scale',
  }[direction];

  return (
    <div
      className={`opacity-0 ${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Estado en vivo de la brigada. Antes del arranque muestra la cuenta regresiva;
 * durante las cuatro semanas, en qué semana va y qué toca. Sin datos inventados:
 * todo sale de las fechas reales y del plan operativo del deck.
 */
function TarjetaBrigada() {
  const t = useT();
  const { estado, semanaActual, dias, horas, minutos } = useCuentaRegresiva();

  const semanas = t.ruta.semanas;
  const semanaFoco = estado === 'antes' ? semanas[0] : semanas[semanaActual - 1];
  const completadas = estado === 'antes' ? 0 : estado === 'terminada' ? 4 : semanaActual;

  const reloj = [
    { valor: dias, label: t.contacto.unidades.dias },
    { valor: horas, label: t.contacto.unidades.horas },
    { valor: minutos, label: t.contacto.unidades.minutos },
  ];

  return (
    <Animate delay={900} direction="scale" className="w-full max-w-[405px] mx-auto lg:mx-0">
      <div className="borde-oro w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(10,8,6,0.62)] backdrop-blur-[24px] p-5 sm:p-8">
        <p className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <span className="relative flex w-[7px] h-[7px]">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[#F7931A] opacity-70 animate-ping" />
            <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-[#F7931A]" />
          </span>
          <span className="text-white/70 text-[12px] sm:text-[13px] font-[450] leading-none uppercase tracking-[0.16em]">
            {estado === 'antes' ? t.hero.arrancaEn : estado === 'enCurso' ? t.hero.enMarcha : t.hero.terminada}
          </span>
        </p>

        {estado === 'antes' ? (
          <div className="flex items-end gap-4 sm:gap-6 mb-6 sm:mb-7">
            {reloj.map((u) => (
              <div key={u.label} className="flex flex-col">
                <span className="texto-oro text-[40px] sm:text-[54px] font-normal leading-[0.85] tnum">
                  {String(u.valor).padStart(2, '0')}
                </span>
                <span className="mt-2 text-white/45 text-[11px] sm:text-[12px] font-[450] leading-none">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-6 sm:mb-7">
            <span className="texto-oro text-[40px] sm:text-[54px] font-normal leading-[0.85] tnum">
              {t.hero.semanaCorta} {semanaActual}
            </span>
            <span className="text-white/25 text-[24px] sm:text-[30px] font-[450] leading-none"> / 4</span>
          </p>
        )}

        {/* Las cuatro semanas del plan: se llenan conforme avanza */}
        <div className="flex gap-[5px] mb-4" role="img" aria-label={`${completadas} / 4`}>
          {semanas.map((s, i) => (
            <span
              key={s.id}
              className={`h-[5px] flex-1 rounded-full transition-colors duration-500 ${
                i < completadas ? 'bg-gradient-to-r from-[#F7931A] to-[#E8B45A]' : 'bg-white/[0.12]'
              }`}
            />
          ))}
        </div>

        <div className="pt-4 border-t border-white/[0.08]">
          <p className="text-[#E8B45A]/80 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-2.5">
            {t.ruta.semanaLabel} {semanaFoco.numero} · {semanaFoco.fechas}
          </p>
          <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.25] mb-3">
            {semanaFoco.nombre}
          </p>
          <p className="text-white/55 text-[13px] sm:text-[13.5px] font-[450] leading-[1.45]">
            {semanaFoco.meta}
          </p>
        </div>
      </div>
    </Animate>
  );
}

export default function Hero() {
  const t = useT();

  return (
    <section
      id="inicio"
      /* min-h-screen en vez de h-screen: idéntico donde el contenido cabe, pero evita
         que la tarjeta se recorte en pantallas cortas (iPhone SE, Safari con barra). */
      className="relative w-full min-h-screen overflow-hidden bg-[#0A0806]"
    >
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_VIDEO}
        poster="/video/hero-poster.jpg"
        srcMovil="/video/hero-movil.mp4"
        posterMovil="/video/hero-movil-poster.jpg"
        preload="auto"
      />
      {/* Velo: fuerte donde va el titular, casi nulo del centro a la derecha,
          para que Zacatlán se siga viendo. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0A0806]/85 via-[#0A0806]/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/80 via-transparent to-[#0A0806]/25"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex flex-col">
        <Nav />

        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[593px]">
              <Animate delay={300} direction="up">
                <h1 className="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] mb-5 sm:mb-8">
                  {t.hero.tituloA}{' '}
                  <span className="texto-oro">{t.hero.tituloDestacado}</span>
                  {t.hero.tituloB ? ` ${t.hero.tituloB}` : ''}
                </h1>
              </Animate>

              <Animate delay={500} direction="up">
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[370px] mb-7 sm:mb-10">
{t.hero.bajada}
                </p>
              </Animate>

              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="#ruta"
                    className="inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] shadow-[0_10px_30px_-8px_rgba(247,147,26,0.65)] transition-opacity hover:opacity-90"
                  >
                    {t.hero.ctaPrimario}
                  </a>
                  <a
                    href="#contacto"
                    className="inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80"
                  >
                    {t.hero.ctaSecundario}
                  </a>
                </div>
              </Animate>
            </div>

            <TarjetaBrigada />
          </div>
        </div>
      </div>
    </section>
  );
}


function Nav() {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.proyecto, href: '#proyecto' },
    { label: t.nav.ruta, href: '#ruta' },
    { label: t.nav.mapa, href: '#mapa' },
    { label: t.nav.metas, href: '#metas' },
    { label: t.nav.prensa, href: '#prensa' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50">
        <Animate delay={0} direction="down">
          <a href="#inicio" className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 256 256"
              fill="none"
              className="sm:w-[32px] sm:h-[32px]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="marcaBrigada" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F7931A" />
                  <stop offset="100%" stopColor="#FFD98E" />
                </linearGradient>
              </defs>
              <path
                d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
                fill="url(#marcaBrigada)"
              />
            </svg>
            <span className="text-white text-[22px] sm:text-[26px] font-[450] leading-none tracking-[-0.02em]">
              Brigada
            </span>
          </a>
        </Animate>

        <Animate delay={100} direction="down" className="hidden lg:block">
          <div className="h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]">
            <a
              href="#proyecto"
              className="flex items-center gap-[5px] text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors"
            >
              {t.nav.proyecto}
              <ChevronDown className="w-[10px] h-[10px] opacity-80" />
            </a>
            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Animate>

        <Animate delay={200} direction="down" className="hidden lg:flex items-center gap-5">
          <BotonIdioma className="text-[13px]" />
          <div className="h-[52px] p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] flex items-center gap-[5px]">
            <a
              href="#donar"
              className="inline-flex items-center h-[46px] px-6 rounded-[11px] text-white text-[14px] font-[450] leading-[14px] hover:bg-white/5 transition-colors"
            >
              {t.donar.eyebrow}
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center h-[46px] px-6 rounded-[11px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] font-[450] leading-[14px] transition-opacity hover:opacity-90"
            >
              {t.nav.sumaTuMarca}
            </a>
          </div>
        </Animate>

        <Animate delay={100} direction="down" className="lg:hidden flex items-center gap-4">
          <BotonIdioma className="text-[12px]" />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t.nav.abrirMenu}
            aria-expanded={isOpen}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] transition-colors hover:bg-white/10"
          >
            <div className="relative w-5 h-5">
              <Menu
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </Animate>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-[#0A0806]/90 backdrop-blur-[24px] transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-[0.97]'
          }`}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450] hover:bg-white/[0.06] transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                }`}
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms' }}
              >
                {link.label}
                {link.href === '#proyecto' && <ChevronDown className="w-4 h-4 opacity-50" />}
              </a>
            ))}
          </div>

          <div className="h-px bg-white/10 my-5" />

          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
          >
            <a
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="w-full h-[50px] inline-flex items-center justify-center rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] font-[450] transition-opacity hover:opacity-90"
            >
              {t.nav.sumaTuMarca}
            </a>
            <a
              href="#donar"
              onClick={() => setIsOpen(false)}
              className="w-full h-[50px] inline-flex items-center justify-center rounded-[12px] border border-white/30 text-white text-[15px] font-[450] transition-colors hover:bg-white/5"
            >
              {t.donar.eyebrow}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
