import { useEffect, useState } from 'react';
import { Check, Copy, Zap } from 'lucide-react';
import QRCode from 'qrcode';
import Reveal, { Tarjeta } from '@/components/Reveal';
import { useT } from '@/i18n';
import {
  DIRECCION_DONAR,
  NOMBRE_DESTINO,
  RED_DONAR,
  uriDonar,
} from '@/config/donaciones';

const URI_DONAR = uriDonar();

export default function Donar() {
  const t = useT();
  const [copiado, setCopiado] = useState(false);
  const [qr, setQr] = useState('');

  // El QR se dibuja del mismo URI que usa el botón: no puede apuntar a otro lado.
  useEffect(() => {
    let vivo = true;

    QRCode.toDataURL(URI_DONAR, {
      errorCorrectionLevel: 'M',
      margin: 1,
      scale: 8,
      color: { dark: '#0A0806', light: '#FFFFFF' },
    })
      .then((src) => {
        if (vivo) setQr(src);
      })
      .catch(() => {
        // Sin QR quedan la dirección escrita y el botón, que llevan al mismo sitio.
      });

    return () => {
      vivo = false;
    };
  }, []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(DIRECCION_DONAR);
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
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">
          <div className="flex-1 min-w-0">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#0A0806]/70 uppercase tracking-[0.18em] mb-5">
                <Zap className="w-[13px] h-[13px]" />
                {t.donar.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="text-[#0A0806] text-[32px] sm:text-[48px] md:text-[58px] font-normal leading-[0.95] mb-5 max-w-[720px]">
                {t.donar.titulo}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[#0A0806]/75 text-[16px] sm:text-[18px] font-[450] leading-[1.45] max-w-[560px] mb-8">
                {t.donar.bajada}
              </p>
            </Reveal>

            <p className="text-[#0A0806] text-[14px] font-[450] leading-none uppercase tracking-[0.14em] mb-4">
              {t.donar.destinoTitulo}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.donar.destino.map((d, i) => (
                <Tarjeta
                  key={d.concepto}
                  delay={160 + i * 60}
                  levanta={4}
                  className="rounded-[16px] bg-[#0A0806]/10 px-4 py-4 sm:px-5 sm:py-5"
                >
                  <span className="block text-[#0A0806]/45 text-[11px] font-[450] leading-none tnum mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block text-[#0A0806] text-[15px] font-[450] leading-[1.25] mb-1">
                    {d.concepto}
                  </span>
                  <span className="block text-[#0A0806]/65 text-[13px] font-[450] leading-[1.4]">
                    {d.detalle}
                  </span>
                </Tarjeta>
              ))}
            </div>

            <Reveal delay={420}>
              <p className="mt-6 text-[#0A0806]/60 text-[13.5px] font-[450] leading-[1.45] max-w-[520px]">
                {t.donar.nota}
              </p>
            </Reveal>
          </div>

          <Reveal dir="right" delay={120} className="w-full lg:w-[400px] shrink-0">
            <div className="rounded-[24px] sm:rounded-[28px] bg-[#0A0806] p-5 sm:p-7 lg:sticky lg:top-8 shadow-[0_24px_60px_-20px_rgba(10,8,6,0.45)]">
              <p className="text-white/70 text-[14px] font-[450] leading-[1.3] mb-5 text-center">
                {t.donar.escanea}
              </p>

              <div className="rounded-[18px] bg-white p-3 sm:p-4 mb-4 min-h-[236px] sm:min-h-[276px] flex items-center justify-center">
                {qr ? (
                  <img
                    src={qr}
                    alt={`${t.donar.escanea} — ${DIRECCION_DONAR}`}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <span className="text-[#0A0806]/30 text-[13px] font-[450]">
                    {t.donar.generandoQr}
                  </span>
                )}
              </div>

              <p className="text-center text-[#0A0806] text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-4 mx-auto w-fit rounded-full bg-[#F7931A] px-3 py-1.5">
                {t.donar.redes[RED_DONAR]}
              </p>

              <p className="text-center text-white/40 text-[12px] font-[450] leading-none mb-2">
                {NOMBRE_DESTINO}
              </p>
              <p className="text-center text-white text-[13px] sm:text-[14px] font-[450] leading-[1.45] mb-5 break-all select-all">
                {DIRECCION_DONAR}
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={URI_DONAR}
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
