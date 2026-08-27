import { Building2, GraduationCap, Heart, Home, Store, Users } from 'lucide-react';
import Reveal, { CountUp } from '@/components/Reveal';
import { useT } from '@/i18n';

const ICONOS = [Store, Heart, GraduationCap, Users, Home, Building2] as const;

export default function Metas() {
  const t = useT();
  const items = t.metas.items;
  const maximo = Math.max(...items.map((item) => item.valor));

  return (
    <section id="metas" className="relative bg-[#0A0806] overflow-hidden">
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[420px] max-w-[140vw] rounded-full bg-[#F7931A]/[0.07] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-12 sm:py-20 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-5 mb-5 sm:mb-10">
          <div className="max-w-[640px]">
            <Reveal>
              <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-3 sm:mb-4">
                {t.metas.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-white text-[26px] sm:text-[40px] md:text-[46px] font-normal leading-[0.98]">
                {t.metas.titulo}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="hidden sm:block text-white/60 text-[16px] font-[450] leading-[1.45] max-w-[420px]">
              {t.metas.bajada}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ul className="rounded-[18px] sm:rounded-[22px] border border-white/[0.08] bg-[rgba(17,16,15,0.45)] overflow-hidden mb-4 sm:mb-5">
            {items.map((item, i) => {
              const Icono = ICONOS[i] ?? Store;
              const ancho = `${Math.max((item.valor / maximo) * 100, 8)}%`;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 sm:gap-4 px-3.5 py-2.5 sm:px-5 sm:py-3.5 border-t border-white/[0.06] first:border-t-0"
                >
                  <span className="hidden sm:flex w-[30px] h-[30px] shrink-0 rounded-[8px] bg-[#F7931A]/15 text-[#F7931A] items-center justify-center">
                    <Icono className="w-[14px] h-[14px]" />
                  </span>
                  <span className="texto-oro text-[22px] sm:text-[28px] font-normal leading-none tnum w-[36px] sm:w-[44px] shrink-0">
                    <CountUp to={item.valor} duration={1.1} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <p className="text-white text-[13px] sm:text-[15px] font-[450] leading-[1.2] truncate">
                        {item.label}
                      </p>
                      <p className="hidden md:block text-white/35 text-[11px] font-[450] leading-none shrink-0">
                        {item.nota}
                      </p>
                    </div>
                    <span className="block h-[3px] sm:h-[4px] rounded-full bg-white/[0.07] overflow-hidden">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD98E]"
                        style={{ width: ancho }}
                      />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <ul className="flex flex-wrap gap-2 sm:gap-3">
            {t.metas.equipo.map((e) => (
              <li
                key={e.rol}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] pl-1 pr-3 py-1"
              >
                <span className="w-[22px] h-[22px] rounded-full bg-[#F7931A] text-[#0A0806] text-[11px] font-[450] tnum flex items-center justify-center">
                  {e.cantidad}
                </span>
                <span className="text-white/80 text-[12px] sm:text-[13px] font-[450] leading-none">
                  {e.rol}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
