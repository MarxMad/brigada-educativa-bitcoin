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

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-16 sm:py-20 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 sm:mb-10">
          <div className="max-w-[640px]">
            <Reveal>
              <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-4">
                {t.metas.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="text-white text-[28px] sm:text-[40px] md:text-[46px] font-normal leading-[0.98]">
                {t.metas.titulo}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="text-white/60 text-[14px] sm:text-[16px] font-[450] leading-[1.45] max-w-[420px]">
              {t.metas.bajada}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            {items.map((item, i) => {
              const Icono = ICONOS[i] ?? Store;
              const ancho = `${Math.max((item.valor / maximo) * 100, 10)}%`;
              return (
                <li
                  key={item.label}
                  className="rounded-[16px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] border border-white/[0.06] px-4 py-4 sm:px-5 sm:py-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="w-[34px] h-[34px] shrink-0 rounded-[10px] bg-[#F7931A]/15 text-[#F7931A] flex items-center justify-center">
                      <Icono className="w-[16px] h-[16px]" />
                    </span>
                    <span className="texto-oro text-[28px] sm:text-[32px] font-normal leading-none tnum">
                      <CountUp to={item.valor} duration={1.1} />
                    </span>
                  </div>
                  <p className="text-white text-[14px] sm:text-[15px] font-[450] leading-[1.25] mb-1">
                    {item.label}
                  </p>
                  <p className="text-white/40 text-[12px] font-[450] leading-[1.3] mb-3">{item.nota}</p>
                  <span className="block h-[4px] rounded-full bg-white/[0.08] overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD98E]"
                      style={{ width: ancho }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[16px] sm:rounded-[18px] border border-white/[0.06] bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-3.5">
            <p className="text-white/40 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-3">
              {t.metas.equipoTitulo}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
              {t.metas.equipo.map((e) => (
                <li key={e.rol} className="flex items-center gap-3 min-w-0">
                  <span className="w-[28px] h-[28px] shrink-0 rounded-[8px] bg-[#F7931A]/15 text-[#F7931A] text-[12px] font-[450] tnum flex items-center justify-center">
                    {e.cantidad}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white text-[13.5px] font-[450] leading-[1.2]">{e.rol}</span>
                    <span className="block text-white/40 text-[12px] font-[450] leading-[1.3] truncate">
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
