import { DoorOpen, MessagesSquare, Wallet, Store } from 'lucide-react';
import NodoLightning from '@/components/NodoLightning';
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
          {/* Red Lightning: cada visita de la brigada conecta un nodo más */}
          <Reveal dir="left" className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px]">
              <div
                className="absolute inset-[14%] rounded-full border border-[#0A0806]/15"
                aria-hidden="true"
              />
              <div
                className="absolute inset-[3%] rounded-full border border-[#0A0806]/10"
                aria-hidden="true"
              />
              <NodoLightning className="relative w-full h-full" />
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#0A0806]/70 uppercase tracking-[0.18em] mb-6">
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

        <div className="relative mt-16 sm:mt-20">
          {/* Línea que une los cuatro pasos: es una secuencia, no cuatro cosas sueltas */}
          <span
            className="hidden lg:block absolute top-[54px] left-[12%] right-[12%] h-px bg-[#0A0806]/20"
            aria-hidden="true"
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {t.brigada.pasos.map((paso, i) => {
              const Icono = ICONOS[i];
              return (
                <Tarjeta
                  key={paso.titulo}
                  delay={i * 90}
                  levanta={8}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Medallón redondo */}
                  <span className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] shrink-0 mb-6">
                    <span
                      className="absolute inset-0 rounded-full bg-[#F7931A] ring-8 ring-[#F7931A]"
                      aria-hidden="true"
                    />
                    <span className="absolute inset-0 rounded-full bg-[#0A0806] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                      <Icono className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] text-[#F7931A]" />
                    </span>
                    <span className="absolute -top-1 -right-1 w-[26px] h-[26px] rounded-full bg-[#0A0806] border-[3px] border-[#F7931A] flex items-center justify-center">
                      <span className="text-[#E8B45A] text-[11px] font-[450] leading-none tnum">
                        {i + 1}
                      </span>
                    </span>
                  </span>

                  <h3 className="text-[#0A0806] text-[19px] sm:text-[21px] font-[450] leading-[1.15] mb-3 max-w-[220px]">
                    {paso.titulo}
                  </h3>
                  <p className="text-[#0A0806]/70 text-[14px] sm:text-[15px] font-[450] leading-[1.5] max-w-[260px]">
                    {paso.texto}
                  </p>
                </Tarjeta>
              );
            })}
          </div>
        </div>
      </div>

      <div className="cinta-brigada h-3 w-full" aria-hidden="true" />
    </section>
  );
}
