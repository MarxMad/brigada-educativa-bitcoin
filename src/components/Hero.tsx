import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
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
 * Estado en vivo de la brigada. El reloj sigue las fechas reales; el temario
 * se recorre con swipe o tocando las barras, y cada semana abre su bloque
 * en el plan operativo.
 */
function TarjetaBrigada() {
  const t = useT();
  const { estado, semanaActual, dias, horas, minutos, segundos, mismaFechaInicio } =
    useCuentaRegresiva();

  const semanas = t.ruta.semanas;
  const inicioPreview = estado === 'enCurso' ? semanaActual - 1 : 0;
  const [preview, setPreview] = useState(inicioPreview);
  const semanaFoco = semanas[preview] ?? semanas[0];
  const pista = useRef<HTMLDivElement>(null);
  const gesto = useRef({ x: 0, activo: false, arrastre: false, capturado: false, indice: inicioPreview });

  const etiquetaEstado =
    estado === 'terminada'
      ? t.hero.terminada
      : estado === 'enCurso'
        ? t.hero.enMarcha
        : mismaFechaInicio
          ? t.hero.hoyArranca
          : t.hero.arrancaEn;
  const reloj =
    estado === 'antes' && dias === 0
      ? [
          { valor: horas, label: t.contacto.unidades.horas },
          { valor: minutos, label: t.contacto.unidades.minutos },
          { valor: segundos, label: t.contacto.unidades.segundos },
        ]
      : [
          { valor: dias, label: t.contacto.unidades.dias },
          { valor: horas, label: t.contacto.unidades.horas },
          { valor: minutos, label: t.contacto.unidades.minutos },
        ];

  const irPreview = (i: number) => {
    const siguiente = Math.max(0, Math.min(semanas.length - 1, i));
    gesto.current.indice = siguiente;
    setPreview(siguiente);
  };

  const pintarPista = (indice: number, dx: number, animar: boolean) => {
    const el = pista.current;
    if (!el) return;
    el.style.transition = animar ? 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    el.style.transform = `translateX(calc(${-indice * 100}% + ${dx}px))`;
  };

  useEffect(() => {
    pintarPista(preview, 0, true);
  }, [preview]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    gesto.current = { x: e.clientX, activo: true, arrastre: false, capturado: false, indice: preview };
    pintarPista(preview, 0, false);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!gesto.current.activo) return;
    const dx = e.clientX - gesto.current.x;
    if (!gesto.current.capturado && Math.abs(dx) > 12) {
      e.currentTarget.setPointerCapture(e.pointerId);
      gesto.current.capturado = true;
    }
    const enBorde =
      (gesto.current.indice === 0 && dx > 0) ||
      (gesto.current.indice === semanas.length - 1 && dx < 0);
    pintarPista(gesto.current.indice, enBorde ? dx * 0.28 : dx, false);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!gesto.current.activo) return;
    if (gesto.current.capturado && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const dx = e.clientX - gesto.current.x;
    gesto.current.activo = false;
    const huboSwipe = Math.abs(dx) >= 40;
    gesto.current.arrastre = huboSwipe;
    if (!huboSwipe) {
      pintarPista(gesto.current.indice, 0, true);
      return;
    }
    irPreview(gesto.current.indice + (dx < 0 ? 1 : -1));
    window.setTimeout(() => {
      gesto.current.arrastre = false;
    }, 0);
  };

  return (
    <Animate delay={900} direction="scale" className="w-full max-w-[420px] mx-auto lg:mx-0">
      <div className="borde-oro w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(10,8,6,0.62)] backdrop-blur-[24px] p-5 sm:p-7">
        <p className="flex items-center justify-between gap-3 mb-5">
          <span className="flex items-center gap-2.5">
            <span className="relative flex w-[7px] h-[7px]">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#F7931A] opacity-70 animate-ping" />
              <span className="relative inline-flex w-[7px] h-[7px] rounded-full bg-[#F7931A]" />
            </span>
            <span className="text-white/70 text-[12px] sm:text-[13px] font-[450] leading-none uppercase tracking-[0.16em]">
              {etiquetaEstado}
            </span>
          </span>
          {estado === 'antes' && (
            <span className="text-white/40 text-[11px] font-[450] leading-none">{t.hero.horaSede}</span>
          )}
        </p>

        {estado === 'antes' ? (
          <div className="flex items-end mb-5">
            {reloj.map((u, i) => (
              <div key={u.label} className="flex items-end">
                {i > 0 && (
                  <span className="texto-oro text-[28px] sm:text-[36px] font-normal leading-[0.85] px-2 sm:px-2.5 pb-[2px] opacity-35">
                    :
                  </span>
                )}
                <div className="flex flex-col">
                  <span className="texto-oro text-[36px] sm:text-[48px] font-normal leading-[0.85] tnum">
                    {String(u.valor).padStart(2, '0')}
                  </span>
                  <span className="mt-2 text-white/45 text-[11px] font-[450] leading-none">{u.label}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-5">
            <span className="texto-oro text-[36px] sm:text-[48px] font-normal leading-[0.85] tnum">
              {t.hero.semanaCorta} {semanaActual}
            </span>
            <span className="text-white/25 text-[22px] sm:text-[28px] font-[450] leading-none"> / 4</span>
          </p>
        )}

        {estado !== 'terminada' && (
          <div
            className="w-full overflow-hidden touch-pan-y select-none mb-5 cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              gesto.current.activo = false;
              gesto.current.arrastre = false;
              pintarPista(gesto.current.indice, 0, true);
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            <div className="w-full overflow-hidden rounded-[16px]">
              <div ref={pista} className="flex w-full" style={{ transform: `translateX(-${preview * 100}%)` }}>
                {semanas.map((semana, i) => {
                  const dia = semana.bloques[0];
                  const etiqueta =
                    i === 0 && estado === 'antes'
                      ? t.hero.primerDia
                      : `${t.ruta.semanaLabel} ${semana.numero}`;
                  return (
                    <a
                      key={semana.id}
                      href={`#ruta-${semana.id}`}
                      aria-label={`${t.hero.verTemario}: ${semana.nombre}`}
                      draggable={false}
                      onClick={(e) => {
                        if (gesto.current.arrastre) {
                          e.preventDefault();
                          gesto.current.arrastre = false;
                        }
                      }}
                      className="block w-full min-w-0 shrink-0 grow-0 basis-full rounded-[16px] bg-white/[0.05] border border-white/[0.07] p-4 sm:p-[18px] min-h-[198px] hover:border-[#F7931A]/35 transition-colors"
                    >
                      <p className="text-[#F7931A] text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-2.5">
                        {etiqueta}
                        {dia ? <span className="text-white/35"> · {dia.dias}</span> : null}
                      </p>
                      <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.25] mb-3">
                        {dia?.titulo ?? semana.nombre}
                      </p>
                      <ul className="flex flex-col gap-2 mb-4">
                        {(dia?.puntos ?? []).slice(0, 2).map((punto) => (
                          <li key={punto} className="flex gap-2.5">
                            <span className="w-[4px] h-[4px] mt-[7px] shrink-0 rounded-full bg-[#F7931A]" />
                            <span className="text-white/60 text-[13px] font-[450] leading-[1.4]">{punto}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1.5 text-[#E8B45A] text-[13px] font-[450] leading-none">
                        {t.hero.verTemario}
                        <ArrowRight className="w-[13px] h-[13px]" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
            <p className="mt-2.5 text-center text-white/30 text-[11px] font-[450] leading-none">
              {t.hero.desliza}
            </p>
          </div>
        )}

        {estado === 'terminada' && (
          <p className="text-white/60 text-[14px] font-[450] leading-[1.4] mb-5">{semanaFoco.meta}</p>
        )}

        <div
          role="tablist"
          aria-label={t.ruta.semanasNav}
          className="flex gap-[5px] mb-3"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              irPreview(preview + 1);
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              irPreview(preview - 1);
            }
          }}
        >
          {semanas.map((s, i) => {
            const enFoco = i === preview;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={enFoco}
                aria-label={`${t.ruta.semanaLabel} ${s.numero}`}
                onClick={() => irPreview(i)}
                className={`h-[5px] flex-1 rounded-full transition-colors duration-300 ${
                  enFoco
                    ? 'bg-gradient-to-r from-[#F7931A] to-[#E8B45A]'
                    : 'bg-white/[0.12] hover:bg-white/25'
                }`}
              />
            );
          })}
        </div>
        <p className="text-white/40 text-[12px] font-[450] leading-[1.35]">
          {t.ruta.semanaLabel} {semanaFoco.numero} · {semanaFoco.fechas}
        </p>
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
    { label: t.nav.blog, href: '/blog' },
    // { label: t.nav.metas, href: '#metas' }, // vuelve cuando se reactive <Metas />
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
            <a href="#inicio" className="flex items-center gap-2.5 min-w-0">
              <img
                src="/img/logo-manzana-bitcoin.png"
                alt="Logo Economía Circular Bitcoin Zacatlán - Primer Pueblo Mágico Bitcoin de México"
                aria-hidden="true"
                width={34}
                height={34}
                className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] shrink-0 object-contain"
              />
              <span className="flex flex-col min-w-0 leading-[1.15]">
                <span className="text-white text-[14px] sm:text-[16px] font-[450] tracking-[-0.02em]">
                  {t.nav.marca}
                </span>
                <span className="text-white/55 text-[10px] sm:text-[11px] font-[450] tracking-[0.02em]">
                  {t.nav.marcaEdicion}
                </span>
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
