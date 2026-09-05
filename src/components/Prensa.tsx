import { ArrowUpRight, Download } from 'lucide-react';
import Reveal, { Tarjeta } from '@/components/Reveal';
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
        className="pointer-events-none absolute -right-24 top-24 hidden w-[420px] max-w-[60vw] opacity-[0.16] blur-[1px] animate-float-slow select-none lg:block"
      />
      <div
        className="absolute -top-20 left-1/3 w-[480px] h-[320px] max-w-[80vw] rounded-full bg-[#F7931A]/[0.06] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="max-w-[760px] mb-10 sm:mb-14">
          <Reveal>
            <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
              {t.prensa.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-6 sm:mb-8">
              {t.prensa.tituloA}{' '}
              <span className="texto-oro">{t.prensa.tituloDestacado}</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-white/75 text-[16px] sm:text-[19px] font-[450] leading-[1.5]">
              {t.prensa.intro}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-8 items-stretch mb-8 lg:mb-10">
          <Tarjeta
            delay={80}
            levanta={6}
            className="lg:col-span-5 borde-oro relative flex flex-col rounded-[24px] sm:rounded-[28px] bg-[rgba(17,16,15,0.5)] backdrop-blur-[20px] p-6 sm:p-8 overflow-hidden"
          >
            <div
              className="absolute -right-12 -top-16 w-[180px] h-[180px] rounded-full bg-[#F7931A]/15 blur-[60px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse" />
              <span className="text-[#F7931A] text-[11px] font-[450] leading-none uppercase tracking-[0.16em]">
                {t.prensa.enMedios}
              </span>
            </div>

            <p className="relative text-white/50 text-[13px] sm:text-[14px] font-[450] leading-none uppercase tracking-[0.08em] mb-3">
              {t.prensa.medio}
            </p>
            <h3 className="relative text-white text-[22px] sm:text-[26px] md:text-[28px] font-[450] leading-[1.15] mb-4">
              {t.prensa.articulo}
            </h3>
            <p className="relative text-white/50 text-[13px] sm:text-[14px] font-[450] leading-[1.45] mb-5">
              {t.prensa.nota}
            </p>
            <p className="relative text-white/80 text-[15px] sm:text-[16px] font-[450] leading-[1.5] pl-5 border-l-2 border-[#F7931A]/60 mb-8">
              {t.prensa.cita}
            </p>

            <div className="relative mt-auto flex flex-wrap gap-3">
              <a
                href={t.prensa.revistaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-[46px] px-5 rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[13px] sm:text-[14px] font-[450] leading-none shadow-[0_10px_30px_-8px_rgba(247,147,26,0.55)] hover:brightness-110 transition-[filter]"
              >
                {t.prensa.revistaCta}
                <ArrowUpRight className="w-[14px] h-[14px]" aria-hidden="true" />
              </a>
              <a
                href={PDF_REVISTA}
                download="CIM-X-UNLOCK-2026.pdf"
                className="inline-flex items-center gap-1.5 h-[46px] px-5 rounded-[12px] border border-white/20 text-white text-[13px] sm:text-[14px] font-[450] leading-none hover:bg-white/[0.05] transition-colors"
              >
                <Download className="w-[14px] h-[14px]" aria-hidden="true" />
                {t.prensa.pdfCta}
              </a>
            </div>
          </Tarjeta>

          <Reveal delay={140} className="lg:col-span-7 flex">
            <ul className="flex flex-col w-full rounded-[24px] sm:rounded-[28px] border border-white/[0.08] bg-[rgba(17,16,15,0.4)] backdrop-blur-[20px] overflow-hidden">
              {t.prensa.puntos.map((punto, i) => (
                <li
                  key={punto}
                  className="flex gap-4 sm:gap-5 px-5 sm:px-7 py-5 sm:py-6 border-t border-white/[0.06] first:border-t-0"
                >
                  <span className="texto-oro text-[15px] sm:text-[17px] font-[450] leading-none tnum pt-0.5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-white/75 text-[14.5px] sm:text-[16px] font-[450] leading-[1.5]">
                    {punto}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220}>
          {/* Lectura tipo revista: la hoja conserva la proporción real del PDF
              (612 x 792 pt) y se queda centrada en vez de ocupar todo el ancho.
              En celular no cambia nada: sigue siendo la portada que abre el PDF. */}
          <article className="mx-auto w-full max-w-[560px] lg:max-w-[720px] rounded-[24px] sm:rounded-[28px] border border-white/[0.08] bg-[rgba(17,16,15,0.4)] overflow-hidden shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 border-b border-white/[0.06] bg-[#11100F]">
              <p className="text-white/45 text-[11px] font-[450] leading-none uppercase tracking-[0.14em]">
                {t.prensa.pdfLabel}
              </p>
              <a
                href={PDF_REVISTA}
                download="CIM-X-UNLOCK-2026.pdf"
                className="hidden sm:inline-flex items-center gap-1.5 text-white/60 text-[12px] font-[450] leading-none hover:text-white transition-colors"
              >
                <Download className="w-[13px] h-[13px]" aria-hidden="true" />
                {t.prensa.pdfCta}
              </a>
            </div>

            <a
              href={PDF_REVISTA}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block sm:hidden group"
            >
              <img
                src="/img/cim-x-unlock-portada.jpg"
                alt={t.prensa.pdfLabel}
                loading="lazy"
                className="w-full h-auto"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                <span className="text-white text-[14px] font-[450] leading-none">
                  {t.prensa.pdfAbrir}
                </span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806]">
                  <ArrowUpRight className="w-[16px] h-[16px]" aria-hidden="true" />
                </span>
              </span>
            </a>

            <div className="hidden sm:block bg-[#11100F] p-4 sm:p-6">
              <iframe
                title={t.prensa.pdfLabel}
                src={`${PDF_REVISTA}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                className="w-full aspect-[612/792] border-0 rounded-[6px] bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.85)]"
              />
              <p className="mt-4 text-center text-white/35 text-[12px] font-[450] leading-none">
                {t.prensa.pdfPie}
              </p>
            </div>
          </article>
        </Reveal>

      </div>
    </section>
  );
}
