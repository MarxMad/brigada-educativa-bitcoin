import { useState } from 'react';
import { Check, Copy, Zap } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { DIRECCION_BITGET, NOMBRE_DESTINO, uriBitget } from '@/config/donaciones';

const URI_BITGET = uriBitget();

export default function Donar() {
  const t = useT();
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(DIRECCION_BITGET);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin permiso de portapapeles la dirección sigue visible para copiarla a mano.
    }
  };

  return (
    <section id="donar" className="relative bg-[#F7931A] overflow-hidden">
      <div className="cinta-brigada h-3 w-full" aria-hidden="true" />

      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-16 sm:py-20 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          <div className="flex-1 min-w-0">
            <Reveal>
              <h2 className="text-[#0A0806] text-[32px] sm:text-[46px] md:text-[54px] font-normal leading-[0.98] mb-5 max-w-[760px]">
                {t.donar.titulo}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[#0A0806]/75 text-[16px] sm:text-[18px] font-[450] leading-[1.45] max-w-[520px]">
                {t.donar.bajada}
              </p>
            </Reveal>
          </div>

          <Reveal dir="right" delay={120} className="w-full lg:w-[400px] shrink-0">
            <div className="rounded-[24px] sm:rounded-[28px] bg-[#0A0806] p-5 sm:p-7 lg:sticky lg:top-8 shadow-[0_24px_60px_-20px_rgba(10,8,6,0.45)]">
              <p className="text-white/70 text-[14px] font-[450] leading-[1.3] mb-5 text-center">
                {t.donar.escanea}
              </p>

              <div className="rounded-[18px] bg-white p-3 sm:p-4 mb-4 flex items-center justify-center">
                <img
                  src="/img/qr-bitget-btc.png"
                  alt={`${t.donar.escanea}. ${DIRECCION_BITGET}. ${NOMBRE_DESTINO}`}
                  width={345}
                  height={345}
                  className="w-full h-auto object-contain"
                />
              </div>

              <p className="text-center text-[#0A0806] text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-4 mx-auto w-fit rounded-full bg-[#F7931A] px-3 py-1.5">
                {t.donar.red}
              </p>

              <p className="text-center text-white/40 text-[12px] font-[450] leading-none mb-2">
                Bitget
              </p>
              <p className="text-center text-white text-[13px] sm:text-[14px] font-[450] leading-[1.45] mb-5 break-all select-all">
                {DIRECCION_BITGET}
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={URI_BITGET}
                  className="w-full h-[48px] inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] font-[450] transition-opacity hover:opacity-90"
                >
                  <Zap className="w-[15px] h-[15px]" />
                  {t.donar.cta}
                </a>
                <button
                  type="button"
                  onClick={copiar}
                  className="w-full h-[48px] inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/20 text-white text-[15px] font-[450] transition-colors hover:bg-white/5"
                >
                  {copiado ? (
                    <>
                      <Check className="w-[15px] h-[15px] text-[#E8B45A]" />
                      {t.donar.copiado}
                    </>
                  ) : (
                    <>
                      <Copy className="w-[15px] h-[15px]" />
                      {t.donar.copiar}
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-white/45 text-[12.5px] font-[450] leading-[1.45]">
                {t.donar.ayudaEscaneo}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="cinta-brigada h-3 w-full" aria-hidden="true" />
    </section>
  );
}
