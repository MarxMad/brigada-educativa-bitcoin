import { useRef, useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { SITIO_ZACATLAN } from '@/config/enlaces';

/**
 * Intro UNLOCK+Bitcoin US26 (H.264, 1920×1080, 15 s). El drone de Zacatlán
 * sigue en el hero (`/video/hero.mp4`); aquí va el intro de UNLOCK.
 */
export default function Zacatlan() {
  const t = useT();
  const video = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(true);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => {});
      setReproduciendo(true);
    } else {
      v.pause();
      setReproduciendo(false);
    }
  };

  return (
    <section id="zacatlan" className="relative bg-[#0A0806]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[680px]">
            <Reveal>
              <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                {t.zacatlan.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[56px] font-normal leading-[0.98]">
                {t.zacatlan.titulo}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} dir="right">
            <p className="text-white/60 text-[15px] sm:text-[16px] font-[450] leading-[1.5] max-w-[380px]">
              {t.zacatlan.bajada}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 sm:mb-8">
          {t.zacatlan.datos.map((dato) => (
            <Reveal key={dato.titulo}>
              <div className="h-full rounded-[16px] bg-white/[0.04] border border-white/[0.06] px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-[#F7931A] text-[12px] font-[450] leading-none uppercase tracking-[0.14em] mb-2">
                  {dato.titulo}
                </p>
                <p className="text-white/70 text-[13.5px] font-[450] leading-[1.4]">{dato.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <a
            href={SITIO_ZACATLAN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[44px] px-4 rounded-[12px] border border-white/15 text-white text-[14px] font-[450] leading-none hover:border-[#F7931A]/50 mb-8 sm:mb-10"
          >
            {t.zacatlan.ctaSitio}
            <ExternalLink className="w-[13px] h-[13px]" />
          </a>
        </Reveal>

        <Reveal delay={90} dir="scale">
          <figure className="relative mb-8 sm:mb-10 rounded-[20px] sm:rounded-[28px] overflow-hidden border border-[#F7931A]/25 bg-[#11100F] shadow-[0_24px_80px_-32px_rgba(247,147,26,0.45)]">
            <img
              src="/img/manzana-bitcoin.jpg"
              alt="Mosaico de manzana con símbolo Bitcoin - Arte que representa la economía circular Bitcoin en Zacatlán Pueblo Mágico"
              width={1024}
              height={558}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
            <figcaption className="px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-[#0A0806] to-[#16120C] border-t border-[#F7931A]/20">
              <p className="text-white/70 text-[13.5px] sm:text-[15px] font-[450] leading-[1.45]">
                {t.zacatlan.mosaicoPie}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100} dir="scale">
          <figure className="group relative rounded-[20px] sm:rounded-[28px] overflow-hidden border border-white/[0.08] bg-black">
            <video
              ref={video}
              className="w-full h-auto block"
              src="/video/intro-unlock-bitcoin-us26.mp4"
              poster="/video/intro-unlock-bitcoin-us26-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />

            <button
              type="button"
              onClick={alternar}
              aria-label={reproduciendo ? t.zacatlan.pausar : t.zacatlan.reproducir}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[44px] h-[44px] rounded-full bg-[#0A0806]/70 backdrop-blur-[12px] border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300"
            >
              {reproduciendo ? (
                <Pause className="w-[16px] h-[16px]" />
              ) : (
                <Play className="w-[16px] h-[16px] ml-[2px]" />
              )}
            </button>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
