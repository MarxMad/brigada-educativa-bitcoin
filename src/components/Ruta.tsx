import { useState } from 'react';
import { ArrowRight, Target } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';

export default function Ruta() {
  const t = useT();
  const [active, setActive] = useState(0);
  const SEMANAS = t.ruta.semanas;
  const semana = SEMANAS[active];

  return (
    <section id="ruta" className="relative bg-[#0A0806] overflow-hidden">
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        src="/video/glow-gold.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/75 to-[#0A0806]" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[720px]">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#F7931A]" />
                {t.ruta.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98]">
<span className="texto-oro">{t.ruta.tituloDestacado}</span>{t.ruta.tituloB}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140} dir="right">
            <div className="flex items-center gap-3 h-[52px] px-6 bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]">
              <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse" />
              <span className="text-white/80 text-[13px] sm:text-[14px] font-[450] leading-[14px] whitespace-nowrap">
                {t.proyecto.inicio} — {t.proyecto.fin}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Selector de semanas */}
          <Reveal dir="left" className="lg:w-[340px] shrink-0">
            <div className="relative flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
              <span
                className="hidden lg:block absolute left-[27px] top-4 bottom-4 w-px bg-white/10"
                aria-hidden="true"
              />
              <span
                className="hidden lg:block absolute left-[27px] top-4 w-px bg-[#F7931A] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ height: `calc(${((active + 1) / SEMANAS.length) * 100}% - 32px)` }}
                aria-hidden="true"
              />

              {SEMANAS.map((s, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`relative z-10 shrink-0 text-left flex items-center gap-4 rounded-[14px] px-4 py-4 transition-colors duration-300 min-w-[230px] lg:min-w-0 lg:w-full ${
                      isActive ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`w-[22px] h-[22px] shrink-0 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? 'border-[#F7931A] bg-[#F7931A]'
                          : isDone
                            ? 'border-[#F7931A]/50 bg-[#F7931A]/25'
                            : 'border-white/25 bg-[#0A0806]'
                      }`}
                    >
                      <span
                        className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${
                          isActive ? 'bg-[#0A0707]' : 'bg-white/40'
                        }`}
                      />
                    </span>

                    <span className="min-w-0">
                      <span
                        className={`block text-[11px] font-[450] leading-none uppercase tracking-[0.16em] mb-1.5 transition-colors ${
                          isActive ? 'text-[#F7931A]' : 'text-white/40'
                        }`}
                      >
                        {t.ruta.semanaLabel} {s.numero} · {s.fechas}
                      </span>
                      <span
                        className={`block text-[15px] sm:text-[16px] font-[450] leading-[1.25] transition-colors ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}
                      >
                        {s.nombre}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Detalle */}
          <Reveal dir="right" delay={100} className="flex-1 min-w-0">
            <div
              key={semana.id}
              className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-9 md:p-11 animate-fade-scale opacity-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-5">
                <span className="texto-oro text-[44px] sm:text-[64px] font-normal leading-[0.85] tnum">
                  {semana.numero}
                </span>
                <span className="text-white text-[22px] sm:text-[30px] font-[450] leading-[1.1]">
                  {semana.nombre}
                </span>
              </div>

              <p className="text-white/70 text-[15px] sm:text-[17px] font-[450] leading-[1.5] max-w-[760px] mb-9 sm:mb-11">
                {semana.resumen}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {semana.bloques.map((bloque, i) => (
                  <article
                    key={bloque.titulo}
                    className="rounded-[18px] bg-white/[0.035] border border-white/[0.06] p-5 sm:p-6 opacity-0 animate-fade-up"
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    <p className="inline-flex items-center h-[26px] px-[10px] mb-4 rounded-[7px] bg-white/[0.09] text-white text-[11px] sm:text-[12px] font-[450] leading-none">
                      {bloque.dias}
                    </p>
                    <h4 className="text-white text-[17px] sm:text-[19px] font-[450] leading-[1.2] mb-4">
                      {bloque.titulo}
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {bloque.puntos.map((punto) => (
                        <li key={punto} className="flex gap-3">
                          <ArrowRight className="w-[13px] h-[13px] mt-[4px] shrink-0 text-[#F7931A]" />
                          <span className="text-white/65 text-[13.5px] sm:text-[14.5px] font-[450] leading-[1.45]">
                            {punto}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-[18px] bg-[#F7931A]/10 border border-[#F7931A]/25 p-5 sm:p-6 opacity-0 animate-fade-up"
                style={{ animationDelay: `${120 + semana.bloques.length * 90}ms` }}
              >
                <span className="inline-flex items-center gap-2 shrink-0 text-[#F7931A] text-[12px] font-[450] leading-none uppercase tracking-[0.16em]">
                  <Target className="w-[14px] h-[14px]" />
                  {t.ruta.resultado}
                </span>
                <p className="text-white text-[15px] sm:text-[17px] font-[450] leading-[1.4]">
                  {semana.meta}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
