import { useEffect, useState } from 'react';
import { Check, Copy, Zap, AlertTriangle } from 'lucide-react';
import Reveal, { Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';
import {
  DIRECCION_LIGHTNING,
  NOMBRE_DESTINO,
  donacionesActivas,
  uriLightning,
} from '@/config/donaciones';

/** Genera el QR en el navegador; la librería sólo se carga si hay dirección. */
function useQR(texto: string) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!texto) return;
    let cancelado = false;

    (async () => {
      const QR = await import('qrcode');
      const url = await QR.toDataURL(texto, {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 520,
        color: { dark: '#0A0806', light: '#FFFFFF' },
      });
      if (!cancelado) setDataUrl(url);
    })().catch(() => {
      // Si falla la generación dejamos la dirección en texto, que sigue sirviendo.
    });

    return () => {
      cancelado = true;
    };
  }, [texto]);

  return dataUrl;
}

export default function Donar() {
  const t = useT();
  const activas = donacionesActivas();
  const qr = useQR(activas ? uriLightning() : '');
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(DIRECCION_LIGHTNING);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin permiso de portapapeles la dirección sigue visible para copiarla a mano.
    }
  };

  return (
    <section id="donar" className="relative bg-[#0A0806] border-t border-white/[0.06] overflow-hidden">
      <div
        className="absolute -top-32 right-0 w-[720px] h-[720px] max-w-[130vw] rounded-full bg-[#F7931A]/[0.09] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 max-w-[640px]">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <Zap className="w-[13px] h-[13px]" />
                {t.donar.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-6">
                {t.donar.titulo}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-white/70 text-[16px] sm:text-[19px] font-[450] leading-[1.5] mb-10">
                {t.donar.bajada}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.2] mb-5">
                {t.donar.destinoTitulo}
              </p>
            </Reveal>

            <ul className="flex flex-col gap-3">
              {t.donar.destino.map((d, i) => (
                <Tarjeta
                  key={d.concepto}
                  delay={220 + i * 70}
                  levanta={0}
                  className="flex items-start gap-4 rounded-[16px] bg-white/[0.035] border border-white/[0.06] px-5 py-4"
                >
                  <span className="mt-[7px] w-[6px] h-[6px] shrink-0 rounded-full bg-[#F7931A]" />
                  <span className="min-w-0">
                    <span className="block text-white text-[15px] font-[450] leading-[1.25] mb-1">
                      {d.concepto}
                    </span>
                    <span className="block text-white/55 text-[13.5px] font-[450] leading-[1.4]">
                      {d.detalle}
                    </span>
                  </span>
                </Tarjeta>
              ))}
            </ul>

            <Reveal delay={520}>
              <p className="mt-8 text-white/45 text-[13.5px] font-[450] leading-[1.5] max-w-[520px]">
                {t.donar.nota}
              </p>
            </Reveal>
          </div>

          {/* Tarjeta de donación */}
          <Reveal dir="right" delay={140} className="w-full lg:w-[420px] shrink-0">
            <div className="borde-oro rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.55)] backdrop-blur-[24px] p-6 sm:p-8 lg:sticky lg:top-8">
              {activas ? (
                <>
                  <p className="text-white/70 text-[14px] font-[450] leading-[1.3] mb-6 text-center">
                    {t.donar.escanea}
                  </p>

                  <div className="rounded-[20px] bg-white p-4 sm:p-5 mb-6">
                    {qr ? (
                      <img
                        src={qr}
                        alt={`${t.donar.escanea} — ${DIRECCION_LIGHTNING}`}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full aspect-square animate-pulse rounded-[12px] bg-[#0A0806]/10" />
                    )}
                  </div>

                  <p className="text-center text-white/45 text-[12px] font-[450] leading-none mb-2">
                    {NOMBRE_DESTINO}
                  </p>
                  <p className="text-center text-white text-[14px] sm:text-[15px] font-[450] leading-[1.3] mb-6 break-all">
                    {DIRECCION_LIGHTNING}
                  </p>

                  <div className="flex flex-col gap-3">
                    <a
                      href={uriLightning()}
                      className="w-full h-[50px] inline-flex items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] font-[450] transition-opacity hover:opacity-90"
                    >
                      <Zap className="w-[15px] h-[15px]" />
                      {t.donar.eyebrow}
                    </a>
                    <button
                      type="button"
                      onClick={copiar}
                      className="w-full h-[50px] inline-flex items-center justify-center gap-2 rounded-[12px] border border-white/25 text-white text-[15px] font-[450] transition-colors hover:bg-white/5"
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
                </>
              ) : (
                <div className="text-center py-6">
                  <span className="inline-flex w-[52px] h-[52px] items-center justify-center rounded-full bg-[#F7931A]/12 border border-[#F7931A]/30 mb-6">
                    <AlertTriangle className="w-[22px] h-[22px] text-[#F7931A]" />
                  </span>
                  <p className="text-white text-[17px] font-[450] leading-[1.25] mb-3">
                    {t.donar.sinConfigurar}
                  </p>
                  <p className="text-white/55 text-[13.5px] font-[450] leading-[1.5]">
                    {t.donar.sinConfigurarTexto}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
