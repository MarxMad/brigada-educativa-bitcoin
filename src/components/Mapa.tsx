import { useEffect, useRef } from 'react';
import { MapPin, Store } from 'lucide-react';
import Reveal, { CountUp } from '@/components/Reveal';
import { useT } from '@/i18n';
import { COMERCIOS, META_COMERCIOS, CENTRO, ZOOM, PUNTOS_RUTA } from '@/config/mapa';

/**
 * Leaflet manipula el DOM por su cuenta, así que se carga con import dinámico
 * después del montaje: así no entra al bundle inicial ni rompe si el navegador
 * no llega a ejecutarlo.
 */
function useLeaflet(contenedor: React.RefObject<HTMLDivElement | null>, etiquetas: {
  activo: string;
  ruta: string;
}) {
  const mapaRef = useRef<unknown>(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo || mapaRef.current) return;

    let cancelado = false;

    (async () => {
      const L = await import('leaflet');
      if (cancelado || !contenedor.current) return;

      const mapa = L.map(nodo, {
        center: CENTRO,
        zoom: ZOOM,
        scrollWheelZoom: false,
        attributionControl: false,
      });
      mapaRef.current = mapa;

      // Basemap oscuro de CARTO: es el que mejor empata con el negro del sitio.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapa);

      const iconoComercio = L.divIcon({
        className: '',
        html: `<span class="pin-comercio"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const iconoRuta = L.divIcon({
        className: '',
        html: `<span class="pin-ruta"></span>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      PUNTOS_RUTA.forEach((p) => {
        L.marker([p.lat, p.lng], { icon: iconoRuta })
          .addTo(mapa)
          .bindTooltip(`${p.nombre} · ${etiquetas.ruta}`, { direction: 'top', offset: [0, -8] });
      });

      COMERCIOS.forEach((c) => {
        L.marker([c.lat, c.lng], { icon: iconoComercio })
          .addTo(mapa)
          .bindTooltip(`<b>${c.nombre}</b><br>${c.giro} · ${etiquetas.activo}`, {
            direction: 'top',
            offset: [0, -10],
          });
      });

      // Si ya hay comercios, encuadra todos los pines.
      if (COMERCIOS.length > 0) {
        const grupo = L.featureGroup([
          ...COMERCIOS.map((c) => L.marker([c.lat, c.lng])),
          ...PUNTOS_RUTA.map((p) => L.marker([p.lat, p.lng])),
        ]);
        mapa.fitBounds(grupo.getBounds().pad(0.25));
      }
    })();

    return () => {
      cancelado = true;
      const m = mapaRef.current as { remove?: () => void } | null;
      if (m?.remove) m.remove();
      mapaRef.current = null;
    };
  }, [contenedor, etiquetas.activo, etiquetas.ruta]);
}

export default function Mapa() {
  const t = useT();
  const contenedor = useRef<HTMLDivElement>(null);
  useLeaflet(contenedor, { activo: t.mapa.leyendaActivo, ruta: t.mapa.leyendaRuta });

  const registrados = COMERCIOS.length;

  return (
    <section id="mapa" className="relative bg-[#0A0806] border-t border-white/[0.06] overflow-hidden">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="max-w-[720px] mb-12 sm:mb-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
              <span className="w-6 h-px bg-[#F7931A]" />
              {t.mapa.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98] mb-6">
              {t.mapa.titulo}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-white/70 text-[16px] sm:text-[19px] font-[450] leading-[1.5]">
              {t.mapa.bajada}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Mapa */}
          <Reveal dir="left" className="flex-1 min-w-0">
            <div className="relative rounded-[24px] sm:rounded-[33px] overflow-hidden border border-white/[0.08] bg-[#11100F]">
              <div
                ref={contenedor}
                className="w-full h-[380px] sm:h-[520px] lg:h-[600px]"
                role="application"
                aria-label={t.mapa.titulo}
              />

              {registrados === 0 && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-[#0A0806] via-[#0A0806]/85 to-transparent">
                  <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.25] mb-2">
                    {t.mapa.vacioTitulo}
                  </p>
                  <p className="text-white/60 text-[13.5px] sm:text-[15px] font-[450] leading-[1.45] max-w-[560px]">
                    {t.mapa.vacioTexto}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-3 px-1 text-white/30 text-[11px] font-[450] leading-none">
              {t.mapa.atribucion}
            </p>
          </Reveal>

          {/* Panel lateral */}
          <Reveal dir="right" delay={100} className="w-full lg:w-[360px] shrink-0">
            <div className="flex flex-col gap-4">
              <div className="borde-oro rounded-[24px] bg-[rgba(17,16,15,0.5)] backdrop-blur-[20px] p-6 sm:p-8">
                <p className="flex items-baseline gap-2 mb-2">
                  <span className="texto-oro text-[52px] sm:text-[64px] font-normal leading-[0.85]">
                    <CountUp to={registrados} />
                  </span>
                  <span className="text-white/25 text-[24px] sm:text-[30px] font-[450] leading-none">
                    / {META_COMERCIOS}
                  </span>
                </p>
                <p className="text-white text-[15px] sm:text-[16px] font-[450] leading-[1.3] mb-1">
                  {t.mapa.contadorLabel}
                </p>
                <p className="text-white/45 text-[13px] font-[450] leading-[1.35]">
                  {META_COMERCIOS} {t.mapa.contadorMeta}
                </p>

                <div className="mt-6 h-[6px] rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F7931A] to-[#E8B45A] transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${Math.min((registrados / META_COMERCIOS) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="rounded-[24px] bg-[rgba(17,16,15,0.5)] backdrop-blur-[20px] border border-white/[0.06] p-6 sm:p-8">
                <p className="text-white text-[16px] sm:text-[18px] font-[450] leading-[1.2] mb-2">
                  {t.mapa.rutaTitulo}
                </p>
                <p className="text-white/55 text-[13.5px] font-[450] leading-[1.4] mb-5">
                  {t.mapa.rutaTexto}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {PUNTOS_RUTA.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <MapPin className="w-[14px] h-[14px] shrink-0 text-[#E8B45A]" />
                      <span className="text-white/80 text-[14px] font-[450] leading-[1.3]">
                        {p.nombre}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-white/[0.07] flex flex-col gap-2.5">
                  <span className="flex items-center gap-3">
                    <span className="w-[14px] h-[14px] shrink-0 flex items-center justify-center">
                      <span className="w-[11px] h-[11px] rounded-full bg-[#F7931A] ring-2 ring-[#F7931A]/30" />
                    </span>
                    <span className="text-white/55 text-[13px] font-[450]">{t.mapa.leyendaActivo}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="w-[14px] h-[14px] shrink-0 flex items-center justify-center">
                      <span className="w-[9px] h-[9px] rounded-full border border-[#E8B45A]/70 bg-transparent" />
                    </span>
                    <span className="text-white/55 text-[13px] font-[450]">{t.mapa.leyendaRuta}</span>
                  </span>
                </div>
              </div>

              <a
                href="#contacto"
                className="group rounded-[24px] bg-[#F7931A] p-6 sm:p-7 transition-opacity hover:opacity-90"
              >
                <Store className="w-[20px] h-[20px] text-[#0A0806]/70 mb-4" />
                <p className="text-[#0A0806] text-[17px] sm:text-[19px] font-[450] leading-[1.2] mb-2">
                  {t.mapa.comoRegistrarse}
                </p>
                <p className="text-[#0A0806]/70 text-[13.5px] font-[450] leading-[1.4]">
                  {t.mapa.comoRegistrarseTexto}
                </p>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
