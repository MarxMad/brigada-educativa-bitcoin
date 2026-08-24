import VideoFondo from '@/components/VideoFondo';
import Reveal, { CountUp, Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';

export default function Metas() {
  const t = useT();

  return (
    <section id="metas" className="relative bg-[#0A0806] overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] max-w-[140vw] rounded-full bg-[#F7931A]/[0.10] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Moneda girando de fondo, muy tenue */}
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover opacity-[0.22] pointer-events-none"
        src="/video/moneda.mp4"
        poster="/video/moneda-poster.jpg"
      />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.metas.items.map((meta, i) => (
            <Tarjeta
              key={meta.label}
              delay={i * 80}
              className="group relative h-full overflow-hidden borde-oro rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-6 sm:p-8"
            >
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-sheen"
                  aria-hidden="true"
                />
                <p className="texto-oro text-[52px] sm:text-[68px] font-normal leading-[0.85] mb-5">
                  <CountUp to={meta.valor} />
                  <span></span>
                </p>
                <h3 className="text-white text-[17px] sm:text-[19px] font-[450] leading-[1.2] mb-2">
                  {meta.label}
                </h3>
                <p className="text-white/50 text-[13px] sm:text-[14px] font-[450] leading-[1.4]">
                  {meta.nota}
                </p>
            </Tarjeta>
          ))}
        </div>

        {/* Equipo y recursos */}
        <div className="mt-6 sm:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <Reveal dir="left" delay={80}>
            <div className="h-full rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8">
              <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-6">
                {t.metas.equipoTitulo}
              </p>
              <ul className="flex flex-col">
                {t.metas.equipo.map((e, i) => (
                  <li
                    key={e.rol}
                    className={`flex items-center gap-4 py-4 ${i > 0 ? 'border-t border-white/[0.07]' : 'pt-0'}`}
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

          <Reveal dir="right" delay={140}>
            <div className="h-full rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8 flex flex-col">
              <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-6">
                {t.metas.recursosTitulo}
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {t.metas.recursos.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="w-[5px] h-[5px] mt-[8px] shrink-0 rounded-full bg-[#F7931A]" />
                    <span className="text-white/70 text-[14px] sm:text-[15px] font-[450] leading-[1.45]">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6 border-t border-white/[0.07]">
                <span className="text-white/50 text-[13px] sm:text-[14px] font-[450] leading-[1.3]">
{t.metas.presupuestoLabel}
                </span>
                <span className="texto-oro text-[34px] sm:text-[46px] font-[450] leading-[0.9] tnum">
                  {t.proyecto.presupuesto.replace(' USD', '')}
                  <span className="text-[18px] sm:text-[22px]"> USD</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
