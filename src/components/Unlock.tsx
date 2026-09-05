import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { UNLOCK_SUMMIT_2026 } from '@/config/enlaces';

export default function Unlock() {
  const t = useT();

  return (
    <section id="unlock" className="relative bg-[#0A0806] overflow-hidden border-t border-white/[0.06]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[360px] max-w-[90vw] rounded-full bg-[#F7931A]/[0.08] blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-28 md:py-32">
        <Reveal>
          <div className="borde-oro relative rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] p-6 sm:p-10 md:p-12 overflow-hidden">
            <div
              className="absolute -left-16 -bottom-20 w-[260px] h-[260px] rounded-full bg-[#F7931A]/16 blur-[80px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -right-10 -top-16 w-[200px] h-[200px] rounded-full bg-[#F7931A]/10 blur-[70px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
              <a
                href={UNLOCK_SUMMIT_2026}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start transition-opacity hover:opacity-80"
              >
                <span className="box-border inline-flex h-32 w-[240px] sm:h-40 sm:w-[280px] items-center justify-center overflow-hidden bg-white rounded-[16px] px-5 py-6 sm:px-6 sm:py-7">
                  <img
                    src="/img/logo-unlock-summit.png"
                    alt="UNLOCK Summit 4ta Edición 2026 - Evento Bitcoin en Zacatlán de las Manzanas"
                    loading="lazy"
                    className="h-full w-full max-h-full max-w-full object-contain object-center"
                  />
                </span>
              </a>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-5">
                  {t.unlock.eyebrow}
                </p>

                <h2 className="text-white text-[32px] sm:text-[46px] md:text-[56px] font-normal leading-[0.95] mb-5 max-w-[640px]">
                  {t.unlock.tituloA}{' '}
                  <span className="texto-oro">{t.unlock.tituloDestacado}</span>
                </h2>

                <p className="text-white/75 text-[16px] sm:text-[18px] font-[450] leading-[1.5] max-w-[560px] mb-8">
                  {t.unlock.bajada}
                </p>

                <a
                  href={UNLOCK_SUMMIT_2026}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] shadow-[0_10px_30px_-8px_rgba(247,147,26,0.65)] transition-opacity hover:opacity-90"
                >
                  {t.unlock.cta}
                  <ArrowUpRight className="w-[16px] h-[16px]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
