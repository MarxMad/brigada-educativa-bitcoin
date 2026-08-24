import { useState } from 'react';
import { Building2, GraduationCap, Heart, Home, Store, Users } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import Reveal, { CountUp } from '@/components/Reveal';
import { useT } from '@/i18n';

const ICONOS = [Store, Heart, GraduationCap, Users, Home, Building2] as const;

const CIRC = 2 * Math.PI * 88;

function Anillo({ valor, max }: { valor: number; max: number }) {
  const lleno = Math.max(valor / max, 0.08);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
      <defs>
        <linearGradient id="anilloMetaOro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7931A" />
          <stop offset="100%" stopColor="#FFD98E" />
        </linearGradient>
      </defs>
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="12"
      />
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="url(#anilloMetaOro)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - lleno)}
        className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
    </svg>
  );
}

export default function Metas() {
  const t = useT();
  const [activa, setActiva] = useState(0);
  const items = t.metas.items;
  const meta = items[activa];
  const maximo = Math.max(...items.map((item) => item.valor));
  const IconoActivo = ICONOS[activa] ?? Store;

  return (
    <section id="metas" className="relative bg-[#0A0806] overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] max-w-[140vw] rounded-full bg-[#F7931A]/[0.10] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] max-w-[150vw] aspect-square opacity-[0.18]"
        aria-hidden="true"
      >
        <VideoFondo
          className="w-full h-full object-contain"
          src="/video/moneda.mp4"
          poster="/video/moneda-poster.jpg"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/70 to-[#0A0806] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="max-w-[720px] mb-12 sm:mb-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
              <span className="w-6 h-px bg-[#F7931A]" />
              {t.metas.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-6">
              {t.metas.titulo}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-white/70 text-[16px] sm:text-[19px] font-[450] leading-[1.5]">
              {t.metas.bajada}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-4 sm:gap-5 mb-4 sm:mb-5">
          <Reveal dir="scale">
            <div className="borde-oro h-full rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
              <p className="text-white/40 text-[11px] font-[450] leading-none uppercase tracking-[0.16em] mb-6">
                {t.metas.elige}
              </p>

              <div className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] mb-6">
                <Anillo valor={meta.valor} max={maximo} />
                <div className="absolute inset-[18%] rounded-full flex flex-col items-center justify-center">
                  <IconoActivo className="w-[18px] h-[18px] text-[#F7931A] mb-2" />
                  <p className="texto-oro text-[56px] sm:text-[72px] font-normal leading-[0.85]">
                    <CountUp key={activa} to={meta.valor} duration={0.9} />
                  </p>
                </div>
              </div>

              <h3 className="text-white text-[20px] sm:text-[24px] font-[450] leading-[1.15] max-w-[340px] mb-3">
                {meta.label}
              </h3>
              <p className="text-white/50 text-[14px] sm:text-[15px] font-[450] leading-[1.4] mb-5">
                {meta.nota}
              </p>
              <p className="text-white/35 text-[12px] font-[450] leading-none">
                {Math.round((meta.valor / maximo) * 100)}% {t.metas.deLaMasAlta}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} dir="right">
            <div
              role="group"
              aria-label={t.metas.tableroLabel}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  setActiva((i) => (i + 1) % items.length);
                }
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setActiva((i) => (i - 1 + items.length) % items.length);
                }
              }}
              className="h-full flex flex-col gap-2"
            >
              {items.map((item, i) => {
                const Icono = ICONOS[i] ?? Store;
                const isActive = i === activa;
                const ancho = `${Math.max((item.valor / maximo) * 100, 8)}%`;

                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiva(i)}
                    className={`group text-left rounded-[16px] sm:rounded-[18px] px-4 py-3.5 sm:px-5 sm:py-4 border transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#F7931A]/15 border-[#F7931A]/45'
                        : 'bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                    }`}
                  >
                    <span className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] shrink-0 rounded-[12px] flex items-center justify-center ${
                          isActive ? 'bg-[#F7931A] text-[#0A0806]' : 'bg-white/[0.06] text-[#F7931A]'
                        }`}
                      >
                        <Icono className="w-[18px] h-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3 mb-2">
                          <span
                            className={`text-[14px] sm:text-[16px] font-[450] leading-[1.2] ${
                              isActive ? 'text-white' : 'text-white/75'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`shrink-0 text-[18px] sm:text-[22px] font-[450] leading-none tnum ${
                              isActive ? 'texto-oro' : 'text-white/55'
                            }`}
                          >
                            {item.valor}
                          </span>
                        </span>
                        <span className="block h-[5px] rounded-full bg-white/[0.08] overflow-hidden">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD98E] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{ width: ancho }}
                          />
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-4 sm:mt-5 rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8">
            <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-6">
              {t.metas.equipoTitulo}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {t.metas.equipo.map((e) => (
                <li
                  key={e.rol}
                  className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-4 rounded-[16px] bg-white/[0.04] px-4 py-4 sm:p-5"
                >
                  <span className="w-[42px] h-[42px] shrink-0 rounded-[12px] bg-[#F7931A]/15 border border-[#F7931A]/25 flex items-center justify-center text-[#F7931A] text-[16px] font-[450] tnum">
                    {e.cantidad}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white text-[15px] sm:text-[16px] font-[450] leading-[1.2] mb-1">
                      {e.rol}
                    </span>
                    <span className="block text-white/55 text-[13px] sm:text-[14px] font-[450] leading-[1.35]">
                      {e.detalle}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
