import Reveal, { Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';

export default function Aliados() {
  const t = useT();

  return (
    <section id="aliados" className="relative bg-[#0A0806] border-t border-white/[0.06]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-20 sm:py-28">
        <Reveal>
          <p className="text-center text-white/40 text-[12px] sm:text-[13px] font-[450] leading-none uppercase tracking-[0.18em] mb-12 sm:mb-16">
            {t.aliados.titulo}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.aliados.lista.map((aliado, i) => (
            <Tarjeta
              key={aliado.nombre}
              delay={i * 90}
              className="h-full rounded-[20px] sm:rounded-[24px] bg-white/[0.97] border border-white/[0.06] p-4 sm:p-5 lg:p-6 flex items-center justify-center min-h-[160px] sm:min-h-[240px] lg:min-h-[200px]"
            >
              <img
                src={aliado.img}
                alt={aliado.nombre}
                loading="lazy"
                className={`${aliado.alto} w-auto object-contain`}
              />
            </Tarjeta>
          ))}
        </div>
      </div>
    </section>
  );
}
