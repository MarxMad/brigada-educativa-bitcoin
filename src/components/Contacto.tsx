import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { CORREO_ESCUELA, TELEGRAM_STEPH } from '@/config/enlaces';

import { INICIO_BRIGADA } from '@/components/useCuentaRegresiva';

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
  const { dias, horas, minutos, segundos, empezo } = useCountdown(INICIO_BRIGADA);

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
              <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
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
          <Reveal dir="right" delay={140} className="w-full lg:w-[520px] shrink-0">
            <div className="borde-oro relative rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.45)] backdrop-blur-[20px] p-6 sm:p-8 overflow-hidden">
              <div
                className="absolute -right-16 -top-16 w-[220px] h-[220px] rounded-full bg-[#F7931A]/20 blur-[70px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-5 mb-6">
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
                  <p className="text-white/55 text-[13px] sm:text-[14px] font-[450] leading-[1.35] mb-2">
                    {t.contacto.rol}
                  </p>
                  <a
                    href={TELEGRAM_STEPH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7931A] text-[13px] sm:text-[14px] font-[450] leading-none hover:opacity-80"
                  >
                    {t.contacto.usuario}
                  </a>
                </div>
              </div>

              <a
                href={`mailto:${CORREO_ESCUELA}`}
                className="relative mb-6 inline-flex items-center gap-2.5 rounded-[12px] bg-white/[0.06] border border-white/[0.08] px-3.5 py-2.5 text-white/85 text-[13px] sm:text-[14px] font-[450] leading-none hover:border-[#F7931A]/40 hover:text-white transition-colors"
              >
                <Mail className="w-[14px] h-[14px] text-[#F7931A] shrink-0" aria-hidden="true" />
                <span className="sr-only">{t.contacto.correoLabel}: </span>
                {CORREO_ESCUELA}
              </a>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={TELEGRAM_STEPH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col min-w-0"
                >
                  <p className="text-white/70 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-2.5">
                    {t.contacto.qrStephLabel}
                  </p>
                  <img
                    src="/img/qr-telegram-steph.png"
                    alt={`${t.contacto.canal} ${t.contacto.usuario}`}
                    loading="lazy"
                    className="w-full rounded-[16px] object-contain bg-[#F7931A]"
                  />
                  <p className="mt-2.5 text-white/50 text-[12px] font-[450] leading-[1.35]">
                    {t.contacto.qrStephTexto}
                  </p>
                </a>

                <div className="flex flex-col min-w-0">
                  <p className="text-white/70 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-2.5">
                    {t.contacto.qrGrupoLabel}
                  </p>
                  <div className="flex-1 flex items-center justify-center rounded-[16px] bg-white p-3 sm:p-4">
                    <img
                      src="/img/qr-telegram-escuela.png"
                      alt={t.contacto.qrGrupoLabel}
                      loading="lazy"
                      className="w-full max-w-[220px] h-auto"
                    />
                  </div>
                  <p className="mt-2.5 text-white/50 text-[12px] font-[450] leading-[1.35]">
                    {t.contacto.qrGrupoTexto}
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
