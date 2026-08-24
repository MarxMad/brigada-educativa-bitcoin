import { useEffect, useState } from 'react';
import VideoFondo from '@/components/VideoFondo';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';

const INICIO = new Date('2026-08-24T09:00:00-06:00').getTime();

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(target - now, 0);
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
    empezo: diff === 0,
  };
}

export default function Contacto() {
  const t = useT();
  const { dias, horas, minutos, segundos, empezo } = useCountdown(INICIO);

  const unidades = [
    { valor: dias, label: t.contacto.unidades.dias },
    { valor: horas, label: t.contacto.unidades.horas },
    { valor: minutos, label: t.contacto.unidades.minutos },
    { valor: segundos, label: t.contacto.unidades.segundos },
  ];

  return (
    <section id="contacto" className="relative bg-[#0A0806] overflow-hidden border-t border-white/[0.06]">
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
        src="/video/glow-orange.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/80 to-[#0A0806]" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        {/* Cuenta regresiva */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-16 sm:mb-20">
            <p className="text-white/50 text-[13px] font-[450] leading-[1.4] uppercase tracking-[0.18em] shrink-0">
              {empezo ? t.contacto.enMarcha : t.contacto.arrancaEn}
            </p>
            <div className="flex items-end gap-3 sm:gap-5">
              {unidades.map((u) => (
                <div key={u.label} className="flex items-end gap-2 sm:gap-3">
                  <span className="texto-oro text-[40px] sm:text-[62px] font-normal leading-[0.8] tnum">
                    {String(u.valor).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 text-[12px] sm:text-[14px] font-[450] leading-none pb-[3px] sm:pb-[6px]">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-center">
          <div className="flex-1 max-w-[720px]">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#F7931A]" />
                {t.contacto.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-white text-[34px] sm:text-[52px] md:text-[66px] font-normal leading-[0.95] mb-7">
                {t.contacto.tituloA}{' '}
                <span className="texto-oro">{t.contacto.tituloDestacado}</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-white/75 text-[16px] sm:text-[19px] font-[450] leading-[1.5] max-w-[560px] mb-9">
{t.contacto.bajada}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#ruta"
                  className="inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] shadow-[0_10px_30px_-8px_rgba(247,147,26,0.65)] transition-opacity hover:opacity-90"
                >
                  {t.contacto.ctaPrimario}
                </a>
                <a
                  href="#prensa"
                  className="inline-flex items-center h-[46px] sm:h-[51px] px-5 sm:px-[27px] rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80"
                >
                  {t.contacto.ctaSecundario}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Tarjeta de contacto */}
          <Reveal dir="right" delay={140} className="w-full lg:w-[440px] shrink-0">
            <div className="borde-oro relative rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] p-6 sm:p-8 overflow-hidden">
              <div
                className="absolute -right-16 -top-16 w-[220px] h-[220px] rounded-full bg-[#F7931A]/20 blur-[70px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-5 mb-7">
                <img
                  src="/img/steph-serrano.png"
                  alt={t.contacto.nombre}
                  loading="lazy"
                  className="w-[76px] h-[76px] rounded-full object-cover object-top bg-white/[0.06]"
                />
                <div className="min-w-0">
                  <p className="text-white text-[20px] sm:text-[23px] font-[450] leading-[1.1] mb-1.5">
                    {t.contacto.nombre}
                  </p>
                  <p className="text-white/55 text-[13px] sm:text-[14px] font-[450] leading-[1.35]">
                    {t.contacto.rol}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center gap-5 rounded-[18px] bg-white p-4 sm:p-5">
                <img
                  src="/img/qr-whatsapp.jpg"
                  alt={`Código QR de ${t.contacto.canal} de ${t.contacto.nombre}`}
                  loading="lazy"
                  className="w-[104px] sm:w-[124px] h-auto shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[#0A0707] text-[16px] sm:text-[18px] font-[450] leading-[1.2] mb-2">
                    {t.contacto.canal}
                  </p>
                  <p className="text-[#0A0707]/55 text-[13px] font-[450] leading-[1.4]">
{t.contacto.qrTexto}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
