import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';

export default function Aliados() {
  const t = useT();
  const lista = t.aliados.lista;

  return (
    <section id="aliados" className="relative bg-[#0A0806] border-t border-white/[0.06]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-20 sm:pt-28 pb-8">
        <Reveal>
          <p className="text-center text-white/40 text-[12px] sm:text-[13px] font-[450] leading-none uppercase tracking-[0.18em]">
            {t.aliados.titulo}
          </p>
        </Reveal>
      </div>

      <div className="group/ticker relative pb-20 sm:pb-28 overflow-hidden">
        <div className="marquee-mask">
          <div className="flex w-max animate-marquee-aliados">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={`flex shrink-0 items-center min-w-[100vw] justify-evenly ${copy === 1 ? 'marquee-clone' : ''}`}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {lista.map((aliado) => {
                  const logo = (
                    <img
                      src={aliado.img}
                      alt={copy === 0 ? aliado.nombre : ''}
                      loading="lazy"
                      className={`${aliado.alto} w-auto object-contain`}
                    />
                  );

                  return (
                    <div
                      key={`${copy}-${aliado.nombre}`}
                      className="flex items-center gap-8 sm:gap-12 px-8 sm:px-12"
                    >
                      {aliado.href ? (
                        <a
                          href={aliado.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={copy === 1 ? -1 : undefined}
                          className="transition-opacity hover:opacity-80"
                        >
                          {logo}
                        </a>
                      ) : (
                        logo
                      )}
                      <span className="w-[5px] h-[5px] rounded-full bg-[#F7931A]/70 shrink-0" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
