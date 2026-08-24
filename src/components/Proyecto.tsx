import { useEffect, useRef, useState } from 'react';
import VideoFondo from '@/components/VideoFondo';
import Reveal, { Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';

/** Desplaza la moneda 3D con el scroll, sin librerías. */
function useParallax(strength = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-center * strength);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return { ref, offset };
}


export default function Proyecto() {
  const t = useT();
  const [active, setActive] = useState(0);

  const TABS = [
    { id: 'mision', label: t.proyectoSec.tabs.mision, texto: t.proyectoSec.mision },
    { id: 'objetivo', label: t.proyectoSec.tabs.objetivo, texto: t.proyectoSec.objetivo },
    { id: 'vision', label: t.proyectoSec.tabs.vision, texto: t.proyectoSec.vision },
  ];
  const { ref: coinRef, offset } = useParallax(0.09);

  return (
    <section id="proyecto" className="relative bg-[#0A0806] overflow-hidden">
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover opacity-[0.55] pointer-events-none"
        src="/video/glow-orange.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/70 to-[#0A0806]" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          {/* Columna de texto */}
          <div className="max-w-[720px] flex-1">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#F7931A]" />
                {t.proyectoSec.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-8 sm:mb-10">
{t.proyectoSec.tituloA} <span className="texto-oro">{t.proyectoSec.tituloDestacado}</span> {t.proyectoSec.tituloB}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div
                role="tablist"
                aria-label={t.proyectoSec.tabsLabel}
                className="inline-flex p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] gap-[5px] mb-7"
              >
                {TABS.map((tab, i) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`h-[42px] px-4 sm:px-6 rounded-[11px] text-[13px] sm:text-[14px] font-[450] leading-[14px] transition-colors ${
                      active === i
                        ? 'bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="relative min-h-[220px] sm:min-h-[190px]">
                {TABS.map((tab, i) => (
                  <p
                    key={tab.id}
                    role="tabpanel"
                    aria-hidden={active !== i}
                    className={`text-white/80 text-[16px] sm:text-[19px] md:text-[21px] font-[450] leading-[1.5] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active === i
                        ? 'opacity-100 translate-y-0 relative'
                        : 'opacity-0 translate-y-3 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    {tab.texto}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Moneda 3D con parallax + referentes */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div ref={coinRef} className="relative flex justify-center lg:justify-end">
              <div
                className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#F7931A]/25 blur-[90px] animate-pulse-glow"
                aria-hidden="true"
              />
              <div
                className="relative w-[230px] sm:w-[300px] lg:w-[340px] aspect-square rounded-full overflow-hidden ring-1 ring-[#E8B45A]/25 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
                style={{ transform: `translateY(${offset}px)` }}
              >
                <VideoFondo
                  className="w-full h-full object-cover scale-[1.35]"
                  src="/video/moneda.mp4"
                  poster="/video/moneda-poster.jpg"
                />
              </div>
            </div>

            <Reveal delay={140} className="mt-10 lg:mt-14">
              <div className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-5 sm:p-8">
                <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-5">
                  {t.proyectoSec.modeloTitulo}
                </p>
                <ul className="flex flex-col gap-3">
                  {t.proyectoSec.referentes.map((ref) => (
                    <li
                      key={ref.nombre}
                      className={`flex items-center justify-between px-4 py-3 rounded-[12px] transition-colors ${
                        ref.activo ? 'bg-[#F7931A]/15 border border-[#F7931A]/30' : 'bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`text-[14px] sm:text-[15px] font-[450] ${
                          ref.activo ? 'text-[#F7931A]' : 'text-white/90'
                        }`}
                      >
                        {ref.nombre}
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-[450] text-white/50">
                        {ref.lugar}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-24 sm:mt-32">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
              <span className="w-6 h-px bg-[#F7931A]" />
              {t.proyectoSec.valoresEyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-white text-[28px] sm:text-[40px] md:text-[48px] font-normal leading-[1] mb-10 sm:mb-14 max-w-[760px]">
Siete principios que sostienen la brigada
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {t.proyectoSec.valores.map((valor, i) => (
              <Tarjeta
                key={valor.titulo}
                delay={i * 70}
                className="group relative h-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-7 transition-colors duration-300 hover:border-[#F7931A]/35"
              >
                  <span
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-sheen"
                    aria-hidden="true"
                  />
                  <span className="block text-[12px] font-[450] leading-none text-white/30 mb-5 tnum">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-white text-[19px] sm:text-[21px] font-[450] leading-[1.15] mb-3">
                    {valor.titulo}
                  </h4>
                  <p className="text-white/65 text-[14px] sm:text-[15px] font-[450] leading-[1.45]">
                    {valor.texto}
                  </p>
              </Tarjeta>
            ))}

            <Reveal delay={t.proyectoSec.valores.length * 70} dir="scale">
              <article className="relative h-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#F7931A] p-6 sm:p-7 flex flex-col justify-between min-h-[190px]">
                <p className="text-[#0A0707]/70 text-[12px] font-[450] leading-none uppercase tracking-[0.14em]">
                  {t.proyectoSec.sedeLabel}
                </p>
                <div>
                  <h4 className="text-[#0A0707] text-[22px] sm:text-[26px] font-[450] leading-[1.05] mb-2">
                    {t.proyectoSec.sedeNombre}
                  </h4>
                  <p className="text-[#0A0707]/70 text-[14px] font-[450] leading-[1.4]">
{t.proyectoSec.sedeTexto}
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
