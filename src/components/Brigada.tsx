import { DoorOpen, MessagesSquare, Wallet, Store } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import Reveal, { Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';

const ICONOS = [DoorOpen, MessagesSquare, Wallet, Store];

export default function Brigada() {
  const t = useT();

  return (
    <section className="relative bg-[#F7931A] overflow-hidden">
      {/* Cinta diagonal tipo señalética, arriba y abajo */}
      <div className="cinta-brigada h-3 w-full" aria-hidden="true" />

      <div className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-28 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Moneda Bitcoin girando en 3D */}
          <Reveal dir="left" className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-[210px] h-[210px] sm:w-[280px] sm:h-[280px]">
              <div
                className="absolute inset-[6%] rounded-full bg-[#0A0806]/40 blur-[38px] translate-y-6"
                aria-hidden="true"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[#0A0806]/25 shadow-[0_26px_60px_rgba(10,8,6,0.45)]">
                <VideoFondo
                  className="w-full h-full object-cover scale-[1.35]"
                  src="/video/moneda.mp4"
                  poster="/video/moneda-poster.jpg"
                />
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#0A0806]/70 uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#0A0806]/50" />
                {t.brigada.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[#0A0806] text-[34px] sm:text-[52px] md:text-[64px] font-normal leading-[0.95] mb-6 max-w-[820px]">
                {t.brigada.titulo}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[#0A0806]/75 text-[16px] sm:text-[19px] font-[450] leading-[1.5] max-w-[620px]">
{t.brigada.bajada}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.brigada.pasos.map((paso, i) => {
            const Icono = ICONOS[i];
            return (
              <Tarjeta
                key={paso.titulo}
                delay={i * 80}
                levanta={8}
                className="h-full rounded-[20px] sm:rounded-[24px] bg-[#0A0806] p-6 sm:p-7"
              >
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-[42px] h-[42px] rounded-[12px] bg-[#F7931A]/15 border border-[#F7931A]/30 flex items-center justify-center">
                      <Icono className="w-[18px] h-[18px] text-[#F7931A]" />
                    </span>
                    <span className="text-[#E8B45A]/45 text-[13px] font-[450] leading-none tnum">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-white text-[18px] sm:text-[20px] font-[450] leading-[1.15] mb-3">
                    {paso.titulo}
                  </h3>
                  <p className="text-white/60 text-[14px] sm:text-[15px] font-[450] leading-[1.45]">
                    {paso.texto}
                  </p>
              </Tarjeta>
            );
          })}
        </div>
      </div>

      <div className="cinta-brigada h-3 w-full" aria-hidden="true" />
    </section>
  );
}
