import { ArrowUpRight, Download } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';

const PDF_REVISTA = '/docs/cim-x-unlock-2026.pdf';

export default function Prensa() {
  const t = useT();

  return (
    <section id="prensa" className="relative bg-[#0A0806] overflow-hidden border-t border-white/[0.06]">
      <img
        src="/img/btc-network.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-24 top-24 w-[420px] max-w-[60vw] opacity-[0.16] blur-[1px] animate-float-slow select-none"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 max-w-[760px]">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#F7931A]" />
                {t.prensa.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-8">
                {t.prensa.titulo}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-white/75 text-[16px] sm:text-[19px] font-[450] leading-[1.5] mb-10">
                {t.prensa.intro}
              </p>
            </Reveal>

            <ul className="flex flex-col gap-4">
              {t.prensa.puntos.map((punto, i) => (
                <Reveal key={punto} delay={180 + i * 90}>
                  <li className="group flex gap-5 rounded-[20px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-5 sm:p-6 transition-colors duration-300 hover:border-[#F7931A]/35">
                    <span className="text-[#F7931A] text-[13px] font-[450] leading-none tnum pt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/75 text-[14.5px] sm:text-[16px] font-[450] leading-[1.5]">
                      {punto}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal dir="right" delay={120} className="w-full lg:w-[480px] shrink-0">
            <div className="lg:sticky lg:top-8 flex flex-col gap-4">
              <article className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse" />
                    <span className="text-[#F7931A] text-[11px] font-[450] leading-none uppercase tracking-[0.16em]">
                      {t.prensa.enMedios}
                    </span>
                  </div>

                  <p className="text-white text-[24px] sm:text-[30px] font-[450] leading-[1.1] mb-3">
                    {t.prensa.medio}
                  </p>
                  <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.3] mb-3">
                    {t.prensa.articulo}
                  </p>
                  <p className="text-white/55 text-[14px] font-[450] leading-[1.4] mb-5">
                    {t.prensa.nota}
                  </p>
                  <p className="text-white/75 text-[15px] sm:text-[16px] font-[450] leading-[1.5] pl-5 border-l-2 border-[#F7931A]/50 mb-6">
                    {t.prensa.cita}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={t.prensa.revistaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 h-[44px] px-4 rounded-[11px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[13px] sm:text-[14px] font-[450] leading-none hover:brightness-110 transition-[filter]"
                    >
                      {t.prensa.revistaCta}
                      <ArrowUpRight className="w-[14px] h-[14px]" />
                    </a>
                    <a
                      href={PDF_REVISTA}
                      download="CIM-X-UNLOCK-2026.pdf"
                      className="inline-flex items-center gap-1.5 h-[44px] px-4 rounded-[11px] border border-white/20 text-white text-[13px] sm:text-[14px] font-[450] leading-none hover:bg-white/[0.05] transition-colors"
                    >
                      <Download className="w-[14px] h-[14px]" />
                      {t.prensa.pdfCta}
                    </a>
                  </div>
                </div>

                <div className="hidden sm:block border-t border-white/[0.06] bg-[#11100F]">
                  <p className="px-6 pt-4 pb-2 text-white/35 text-[11px] font-[450] leading-none uppercase tracking-[0.14em]">
                    {t.prensa.pdfLabel}
                  </p>
                  <iframe
                    title={t.prensa.pdfLabel}
                    src={`${PDF_REVISTA}#toolbar=0&navpanes=0`}
                    className="w-full h-[420px] lg:h-[520px] border-0 bg-[#11100F]"
                  />
                </div>
              </article>

              <article className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8">
                <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.2] mb-5">
                  {t.prensa.respaldoTitulo}
                </p>
                <ul className="flex flex-col gap-3">
                  {t.prensa.respaldos.map((r) => (
                    <li
                      key={r.nombre}
                      className="flex items-start justify-between gap-4 px-4 py-3 rounded-[12px] bg-white/[0.04]"
                    >
                      <span className="text-white/90 text-[14px] font-[450] leading-[1.3]">
                        {r.nombre}
                      </span>
                      <span className="shrink-0 text-[11px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.12em] pt-[3px]">
                        {r.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
