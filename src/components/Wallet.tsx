import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { WALLET_BULLBITCOIN } from '@/config/enlaces';

export default function Wallet() {
  const t = useT();

  return (
    <section id="wallet" className="relative bg-[#0A0806] overflow-hidden border-t border-white/[0.06]">
      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-28 md:py-32">
        <Reveal>
          <div className="borde-oro relative rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] p-6 sm:p-10 md:p-12 overflow-hidden">
            <div
              className="absolute -left-16 -bottom-20 w-[260px] h-[260px] rounded-full bg-[#F7931A]/18 blur-[80px] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -right-10 -top-16 w-[200px] h-[200px] rounded-full bg-[#F7931A]/12 blur-[70px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="flex-1 min-w-0">
                <a
                  href={WALLET_BULLBITCOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-7 transition-opacity hover:opacity-80"
                >
                  <img
                    src="/img/logo-bullbitcoin.png?v=3"
                    alt={t.wallet.logoAlt}
                    loading="lazy"
                    className="h-[72px] sm:h-[92px] w-auto max-w-[220px] object-contain object-left"
                  />
                </a>

                <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                  {t.wallet.eyebrow}
                </p>

                <h2 className="text-white text-[32px] sm:text-[46px] md:text-[56px] font-normal leading-[0.95] mb-6 max-w-[640px]">
                  {t.wallet.tituloA}{' '}
                  <span className="texto-oro">{t.wallet.tituloDestacado}</span>
                </h2>

                <p className="text-white/75 text-[16px] sm:text-[18px] font-[450] leading-[1.5] max-w-[520px] mb-8">
                  {t.wallet.bajada}
                </p>

                <a
                  href={WALLET_BULLBITCOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] shadow-[0_10px_30px_-8px_rgba(247,147,26,0.65)] transition-opacity hover:opacity-90"
                >
                  {t.wallet.cta}
                  <ArrowUpRight className="w-[16px] h-[16px]" aria-hidden="true" />
                </a>
              </div>

              <div className="w-full lg:w-[320px] shrink-0">
                <a
                  href={WALLET_BULLBITCOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col min-w-0 group"
                >
                  <p className="text-white/70 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-3">
                    {t.wallet.qrLabel}
                  </p>
                  <div className="rounded-[18px] bg-white p-3 sm:p-4 transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src="/img/qr-bullbitcoin.png"
                      alt={t.wallet.qrAlt}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="mt-3 text-white/50 text-[13px] font-[450] leading-[1.4]">
                    {t.wallet.qrTexto}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
