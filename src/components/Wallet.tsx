import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, KeyRound, Smartphone, UserPlus } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { LIBRO_BITCOIN_COACH, WALLET_BULLBITCOIN } from '@/config/enlaces';

function CarruselLibro() {
  const t = useT();
  const fotos = t.wallet.libroFotos;
  const pista = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);

  const paso = () => {
    const el = pista.current;
    const slide = el?.querySelector<HTMLElement>('[data-slide]');
    if (!el || !slide) return 0;
    return slide.offsetWidth + 12;
  };

  const mover = (direccion: -1 | 1) => {
    const el = pista.current;
    const ancho = paso();
    if (!el || !ancho) return;
    el.scrollBy({ left: direccion * ancho, behavior: 'auto' });
  };

  const irA = (i: number) => {
    const el = pista.current;
    const ancho = paso();
    if (!el || !ancho) return;
    el.scrollTo({ left: i * ancho, behavior: 'auto' });
  };

  const alDeslizar = () => {
    const el = pista.current;
    const ancho = paso();
    if (!el || !ancho) return;
    const max = el.scrollWidth - el.clientWidth;
    const alFinal = el.scrollLeft >= max - 2;
    const i = alFinal ? fotos.length - 1 : Math.round(el.scrollLeft / ancho);
    setIndice(Math.min(fotos.length - 1, Math.max(0, i)));
  };

  return (
    <div className="mb-6 w-full min-w-0 max-w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[12px] font-[450] uppercase leading-none tracking-[0.16em] text-[#F7931A]">
          {t.wallet.libroFotosTitulo}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => mover(-1)}
            disabled={indice === 0}
            aria-label={t.wallet.libroAnterior}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-opacity disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => mover(1)}
            disabled={indice === fotos.length - 1}
            aria-label={t.wallet.libroSiguiente}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-opacity disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={pista}
        onScroll={alDeslizar}
        className="flex w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((foto) => (
          <img
            key={foto.src}
            data-slide
            src={foto.src}
            alt={foto.alt}
            width={720}
            height={960}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-[200px] w-[142px] shrink-0 snap-start rounded-[14px] border border-white/[0.08] object-cover object-[center_28%] sm:h-[228px] sm:w-[162px]"
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {fotos.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            aria-label={`${i + 1} / ${fotos.length}`}
            aria-current={i === indice ? 'true' : undefined}
            onClick={() => irA(i)}
            className={`h-1.5 rounded-full transition-all ${i === indice ? 'w-4 bg-[#F7931A]' : 'w-1.5 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

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

            <div className="relative grid items-start gap-12 lg:grid-cols-2 lg:gap-0">
              <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:border-r lg:border-white/10 lg:pr-12 lg:text-left">
                <a
                  href={LIBRO_BITCOIN_COACH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 inline-flex h-[72px] items-center rounded-[16px] bg-white px-5 transition-opacity hover:opacity-90"
                >
                  <img
                    src="/img/logo-investor-house-wordmark.png"
                    alt={t.wallet.libroMarca}
                    width={336}
                    height={78}
                    className="h-[44px] w-auto object-contain"
                  />
                </a>

                <CarruselLibro />

                <div className="flex w-full max-w-[480px] flex-col items-center gap-6 lg:max-w-none lg:flex-row lg:items-start">
                  <a
                    href={LIBRO_BITCOIN_COACH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[168px] shrink-0 sm:w-[180px]"
                  >
                    <img
                      src="/img/bitcoin-coach.jpg"
                      alt={t.wallet.libroAlt}
                      width={560}
                      height={836}
                      className="h-auto w-full rounded-[8px] shadow-[0_22px_40px_-18px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1"
                    />
                  </a>

                  <div className="flex min-w-0 flex-col items-center lg:items-start">
                    <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-4">
                      {t.wallet.libroEyebrow}
                    </p>
                    <h3 className="text-white text-[28px] sm:text-[34px] font-normal leading-[1] mb-4">
                      {t.wallet.libroTitulo}
                    </h3>
                    <p className="text-white/75 text-[15px] sm:text-[16px] font-[450] leading-[1.5] mb-5">
                      {t.wallet.libroBajada}
                    </p>
                    <ul className="mb-6 w-fit space-y-2.5 text-left">
                      {t.wallet.libroPuntos.map((punto) => (
                        <li
                          key={punto}
                          className="flex gap-2.5 text-white/70 text-[14px] sm:text-[15px] font-[450] leading-[1.4]"
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F7931A]" aria-hidden="true" />
                          {punto}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={LIBRO_BITCOIN_COACH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-[48px] sm:h-[52px] px-6 sm:px-7 rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] sm:text-[16px] font-[450] leading-none shadow-[0_12px_32px_-8px_rgba(247,147,26,0.75)] transition-opacity hover:opacity-90"
                    >
                      {t.wallet.libroCta}
                      <ArrowUpRight className="w-[15px] h-[15px]" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center lg:items-start lg:pl-12 lg:text-left">
                <a
                  href={WALLET_BULLBITCOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 inline-flex overflow-visible transition-opacity hover:opacity-80"
                >
                  <img
                    src="/img/logo-bullbitcoin.png?v=4"
                    alt="Bull Bitcoin. Wallet oficial de la Brigada Educativa Bitcoin en Zacatlán"
                    width={1600}
                    height={1298}
                    className="h-[104px] sm:h-[112px] w-auto max-w-[240px] aspect-[1600/1298] object-contain"
                  />
                </a>

                <div className="mb-6 w-full max-w-[480px] overflow-hidden rounded-[18px] border border-[#F7931A]/25 bg-[#141210] text-left shadow-[0_24px_50px_-28px_rgba(247,147,26,0.45)]">
                  <p className="border-b border-white/10 px-5 py-4 text-[12px] font-[450] uppercase tracking-[0.18em] text-[#F7931A]">
                    {t.wallet.panelTitulo}
                  </p>
                  <ol>
                    {t.wallet.pasos.map((paso, i) => {
                      const Icono = [UserPlus, Smartphone, KeyRound][i];
                      return (
                        <li
                          key={paso.titulo}
                          className="flex items-center gap-4 border-b border-white/10 px-5 py-4 last:border-b-0"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7931A]/15 text-[#F7931A]">
                            <Icono className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                          <span className="text-[16px] font-[450] leading-tight text-white">
                            {paso.titulo}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                  {t.wallet.eyebrow}
                </p>

                <h2 className="text-white text-[32px] sm:text-[44px] lg:text-[52px] font-normal leading-[0.95] mb-8 max-w-[520px]">
                  {t.wallet.tituloA}{' '}
                  <span className="texto-oro">{t.wallet.tituloDestacado}</span>
                </h2>

                <a
                  href={WALLET_BULLBITCOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] shadow-[0_10px_30px_-8px_rgba(247,147,26,0.65)] transition-opacity hover:opacity-90 w-fit"
                >
                  {t.wallet.cta}
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
