import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Store } from 'lucide-react';
import type { LayerGroup, Map as LeafletMap, Marker } from 'leaflet';
import Reveal, { CountUp } from '@/components/Reveal';
import { useT } from '@/i18n';
import {
  BTC_MAP,
  buscarLugaresBtcMap,
  CENTRO,
  distanciaKm,
  ZOOM,
  type LugarBtcMap,
} from '@/config/mapa';

function escapeHtml(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type EtiquetasMapa = {
  activo: string;
  ruta: string;
  btcMap: string;
  ficha: string;
};

type AccionesMapa = {
  irALugar: (id: number) => void;
  verRegion: () => void;
};

/**
 * Leaflet manipula el DOM por su cuenta, así que se carga con import dinámico
 * después del montaje: así no entra al bundle inicial ni rompe si el navegador
 * no llega a ejecutarlo.
 */
function useLeaflet(
  contenedor: React.RefObject<HTMLDivElement | null>,
  etiquetas: EtiquetasMapa,
  lugaresBtc: LugarBtcMap[],
  acciones: React.MutableRefObject<AccionesMapa | null>,
) {
  const mapaRef = useRef<LeafletMap | null>(null);
  const capaBtcRef = useRef<LayerGroup | null>(null);
  const marcadoresBtc = useRef(new Map<number, Marker>());
  const [listo, setListo] = useState(false);

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
      if (cancelado) {
        mapa.remove();
        return;
      }
      mapaRef.current = mapa;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(mapa);

      const capaBtc = L.layerGroup().addTo(mapa);
      capaBtcRef.current = capaBtc;

      acciones.current = {
        irALugar: (id: number) => {
          const m = marcadoresBtc.current.get(id);
          if (!m) return;
          const { lat, lng } = m.getLatLng();
          mapa.flyTo([lat, lng], 15);
          window.setTimeout(() => m.openPopup(), 280);
        },
        verRegion: () => {
          const puntos: [number, number][] = [
            CENTRO,
            ...[...marcadoresBtc.current.values()].map((m) => {
              const { lat, lng } = m.getLatLng();
              return [lat, lng] as [number, number];
            }),
          ];
          mapa.fitBounds(L.latLngBounds(puntos), { padding: [36, 36], maxZoom: 12 });
        },
      };

      setListo(true);
      requestAnimationFrame(() => mapa.invalidateSize());
    })();

    return () => {
      cancelado = true;
      setListo(false);
      acciones.current = null;
      const m = mapaRef.current;
      if (m) m.remove();
      mapaRef.current = null;
      capaBtcRef.current = null;
      marcadoresBtc.current.clear();
    };
  }, [contenedor, etiquetas.activo, etiquetas.ruta, etiquetas.btcMap, etiquetas.ficha, acciones]);

  useEffect(() => {
    if (!listo) return;
    const nodo = contenedor.current;
    const mapa = mapaRef.current;
    if (!nodo || !mapa) return;
    const ro = new ResizeObserver(() => mapa.invalidateSize());
    ro.observe(nodo);
    return () => ro.disconnect();
  }, [listo, contenedor]);

  useEffect(() => {
    if (!listo || !capaBtcRef.current) return;

    let cancelado = false;

    (async () => {
      const L = await import('leaflet');
      if (cancelado || !capaBtcRef.current) return;

      capaBtcRef.current.clearLayers();
      marcadoresBtc.current.clear();

      const iconoBtc = L.divIcon({
        className: '',
        html: `<span class="pin-btcmap"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      });

      for (const lugar of lugaresBtc) {
        const direccion = lugar.direccion
          ? `<p class="popup-btc-dir">${escapeHtml(lugar.direccion)}</p>`
          : '';
        const marcador = L.marker([lugar.lat, lugar.lon], { icon: iconoBtc }).bindPopup(
          `<div class="popup-btc">
            <p class="popup-btc-kicker">${escapeHtml(etiquetas.btcMap)}</p>
            <p class="popup-btc-nombre">${escapeHtml(lugar.nombre)}</p>
            ${direccion}
            <a class="popup-btc-link" href="${BTC_MAP.ficha(lugar.id)}" target="_blank" rel="noopener noreferrer">${escapeHtml(etiquetas.ficha)}</a>
          </div>`,
          { maxWidth: 240, className: 'popup-btc-wrap' },
        );
        capaBtcRef.current.addLayer(marcador);
        marcadoresBtc.current.set(lugar.id, marcador);
      }
      if (lugaresBtc.length > 0) acciones.current?.verRegion();
    })();

    return () => {
      cancelado = true;
    };
  }, [listo, lugaresBtc, etiquetas.btcMap, etiquetas.ficha]);
}

export default function Mapa() {
  const t = useT();
  const contenedor = useRef<HTMLDivElement>(null);
  const acciones = useRef<AccionesMapa | null>(null);
  const [lugaresBtc, setLugaresBtc] = useState<LugarBtcMap[]>([]);
  const [estadoBtc, setEstadoBtc] = useState<'cargando' | 'ok' | 'error'>('cargando');

  useLeaflet(
    contenedor,
    {
      activo: t.mapa.leyendaActivo,
      ruta: t.mapa.leyendaRuta,
      btcMap: t.mapa.leyendaBtcMap,
      ficha: t.mapa.btcMapFicha,
    },
    lugaresBtc,
    acciones,
  );

  useEffect(() => {
    const ac = new AbortController();
    buscarLugaresBtcMap(ac.signal)
      .then((lugares) => {
        setLugaresBtc(lugares);
        setEstadoBtc('ok');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setEstadoBtc('error');
      });
    return () => ac.abort();
  }, []);

  return (
    <section id="mapa" className="relative bg-[#0A0806] border-t border-white/[0.06] overflow-hidden">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-14 sm:py-24 md:py-40">
        <div className="max-w-[720px] mb-8 sm:mb-16">
          <Reveal>
            <p className="text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-4 sm:mb-6">
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

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-5">
          <Reveal dir="left" className="flex-1 min-w-0 flex flex-col">
            <div className="relative flex-1 min-h-[220px] sm:min-h-[400px] lg:min-h-[560px] rounded-[20px] sm:rounded-[33px] overflow-hidden border border-white/[0.08] bg-[#11100F]">
              <div
                ref={contenedor}
                className="absolute inset-0 w-full h-full"
                role="application"
                aria-label={t.mapa.titulo}
              />

              {lugaresBtc.length > 0 && (
                <button
                  type="button"
                  onClick={() => acciones.current?.verRegion()}
                  className="absolute top-4 right-4 z-[1000] h-[34px] px-3 rounded-[10px] bg-[#0A0806]/85 border border-white/10 text-white/80 text-[12px] font-[450] leading-none backdrop-blur-md hover:border-[#F7931A]/50 hover:text-white"
                >
                  {t.mapa.btcMapRegion}
                </button>
              )}
            </div>
            <p className="mt-3 px-1 text-white/30 text-[11px] font-[450] leading-none">
              {t.mapa.atribucion}
            </p>
          </Reveal>

          <Reveal dir="right" delay={100} className="w-full lg:w-[360px] shrink-0 flex">
            <div className="flex flex-col gap-3 sm:gap-4 w-full h-full min-h-0">
              <a
                href={BTC_MAP.agregar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[14px] bg-[#F7931A] h-[44px] sm:h-[48px] px-4 transition-opacity hover:opacity-90"
              >
                <Store className="w-[16px] h-[16px] text-[#0A0806]/70 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-[#0A0806] text-[13.5px] sm:text-[15px] font-[450] leading-none">
                  {t.mapa.btcMapSubir}
                </span>
                <ExternalLink className="w-[13px] h-[13px] text-[#0A0806]/50 shrink-0" />
              </a>

              <div className="flex-1 min-h-0 rounded-[20px] sm:rounded-[24px] bg-[rgba(17,16,15,0.5)] backdrop-blur-[20px] border border-white/[0.06] p-4 sm:p-6 flex flex-col">
                <div className="flex items-baseline justify-between gap-3 mb-2 sm:mb-3">
                  <p className="text-white text-[15px] sm:text-[18px] font-[450] leading-[1.2]">
                    {t.mapa.btcMapTitulo}
                  </p>
                  {estadoBtc === 'ok' && (
                    <p className="flex items-baseline gap-1.5 shrink-0">
                      <span className="texto-oro text-[22px] sm:text-[32px] font-normal leading-none">
                        <CountUp to={lugaresBtc.length} duration={1.1} />
                      </span>
                      <span className="hidden sm:inline text-white/40 text-[13px] font-[450]">
                        {t.mapa.btcMapContador}
                      </span>
                    </p>
                  )}
                </div>
                <p className="hidden sm:block text-white/55 text-[13.5px] font-[450] leading-[1.4] mb-4">
                  {t.mapa.btcMapTexto}
                </p>

                {estadoBtc === 'cargando' && (
                  <p className="text-white/40 text-[13px] font-[450] mb-3">{t.mapa.btcMapCargando}</p>
                )}
                {estadoBtc === 'error' && (
                  <p className="text-white/45 text-[13px] font-[450] mb-3">{t.mapa.btcMapError}</p>
                )}

                {lugaresBtc.length > 0 && (
                  <ul className="flex flex-col max-h-[168px] sm:max-h-[240px] lg:max-h-none overflow-y-auto mb-3 sm:mb-4 pr-1">
                    {lugaresBtc.map((lugar) => {
                      const km = Math.max(1, Math.round(distanciaKm(CENTRO[0], CENTRO[1], lugar.lat, lugar.lon)));
                      return (
                        <li key={lugar.id}>
                          <button
                            type="button"
                            onClick={() => acciones.current?.irALugar(lugar.id)}
                            className="w-full flex items-center justify-between gap-3 text-left rounded-[8px] px-1.5 py-1.5 sm:px-2.5 sm:py-2 hover:bg-white/[0.05] transition-colors"
                          >
                            <span className="min-w-0 truncate text-white/85 text-[13px] sm:text-[13.5px] font-[450] leading-none">
                              {lugar.nombre}
                            </span>
                            <span className="shrink-0 text-white/35 text-[11px] font-[450] leading-none tnum">
                              {km} {t.mapa.btcMapAKm}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mt-auto">
                  <a
                    href={BTC_MAP.explorar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-[10px] bg-white/[0.07] text-white/80 text-[12px] font-[450] leading-none hover:bg-white/[0.11]"
                  >
                    {t.mapa.btcMapVer}
                    <ExternalLink className="w-[11px] h-[11px]" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-4 sm:mt-5">
          <div className="rounded-[18px] sm:rounded-[33px] bg-[rgba(17,16,15,0.5)] backdrop-blur-[20px] border border-white/[0.06] p-4 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-6">
              <p className="text-white text-[15px] sm:text-[20px] font-[450] leading-[1.2]">
                {t.mapa.protocoloTitulo}
              </p>
              <a
                href={BTC_MAP.guiaEtiquetado}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 h-[34px] px-3 rounded-[10px] border border-white/10 text-white/70 text-[12px] font-[450] leading-none hover:border-[#F7931A]/40"
              >
                {t.mapa.protocoloGuia}
              </a>
            </div>
            <p className="hidden sm:block text-white/55 text-[13.5px] font-[450] leading-[1.4] mb-5 max-w-[640px]">
              {t.mapa.protocoloBajada}
            </p>
            <ol className="flex flex-col gap-1.5 sm:grid sm:grid-cols-3 sm:gap-4 mb-0 sm:mb-5">
              {t.mapa.protocoloPasos.map((paso, i) => (
                <li
                  key={paso.titulo}
                  className="flex items-center gap-2.5 sm:block sm:rounded-[16px] sm:bg-white/[0.04] sm:border sm:border-white/[0.05] sm:p-5"
                >
                  <span className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shrink-0 rounded-full bg-[#F7931A] text-[#0A0806] text-[11px] font-[450] leading-none tnum flex items-center justify-center sm:mb-3">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white text-[13px] sm:text-[15px] font-[450] leading-[1.25] sm:mb-1">
                      {paso.titulo}
                    </span>
                    <span className="hidden sm:block text-white/50 text-[12.5px] font-[450] leading-[1.4]">
                      {paso.texto}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="hidden sm:flex flex-wrap gap-1.5">
              {t.mapa.protocoloTags.map((tag) => (
                <code
                  key={tag}
                  className="px-2 py-1 rounded-[6px] bg-white/[0.06] text-[#E8B45A] text-[11px] font-[450] leading-none"
                >
                  {tag}
                </code>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
