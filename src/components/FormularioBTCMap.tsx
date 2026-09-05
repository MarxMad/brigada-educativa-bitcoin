import { useState, useRef, useEffect } from 'react';
import { X, MapPin, Check, Copy, Store, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { CENTRO } from '@/config/mapa';

type DatosNegocio = {
  nombre: string;
  categoria: string;
  lat: number;
  lon: number;
  direccion: string;
  telefono: string;
  website: string;
  horario: string;
  descripcion: string;
  twitter: string;
  github: string;
  metodoPago: {
    lightning: boolean;
    onchain: boolean;
  };
};

const CATEGORIAS = [
  { id: 'restaurant', label: 'Restaurante' },
  { id: 'cafe', label: 'Café' },
  { id: 'bar', label: 'Bar' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'shop', label: 'Tienda' },
  { id: 'grocery', label: 'Abarrotes' },
  { id: 'convenience', label: 'Tienda de conveniencia' },
  { id: 'pharmacy', label: 'Farmacia' },
  { id: 'bakery', label: 'Panadería' },
  { id: 'butcher', label: 'Carnicería' },
  { id: 'art', label: 'Arte y artesanías' },
  { id: 'tourism', label: 'Turismo' },
  { id: 'taxi', label: 'Taxi' },
  { id: 'other', label: 'Otro' },
] as const;

type FormularioBTCMapProps = {
  abierto: boolean;
  alCerrar: () => void;
};

export default function FormularioBTCMap({ abierto, alCerrar }: FormularioBTCMapProps) {
  const [paso, setPaso] = useState<'formulario' | 'resultado'>('formulario');
  const [generando, setGenerando] = useState(false);
  const [datos, setDatos] = useState<DatosNegocio>({
    nombre: '',
    categoria: '',
    lat: CENTRO[0],
    lon: CENTRO[1],
    direccion: '',
    telefono: '',
    website: '',
    horario: '',
    descripcion: '',
    twitter: '',
    github: '',
    metodoPago: {
      lightning: true,
      onchain: false,
    },
  });

  const contenedorMapa = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<LeafletMap | null>(null);
  const marcadorRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (!abierto || paso !== 'formulario') return;
    if (mapaRef.current) return;

    const nodo = contenedorMapa.current;
    if (!nodo) return;

    let cancelado = false;

    (async () => {
      const L = await import('leaflet');
      if (cancelado || !contenedorMapa.current) return;

      const mapa = L.map(nodo, {
        center: [datos.lat, datos.lon],
        zoom: 15,
        scrollWheelZoom: true,
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

      const icono = L.divIcon({
        className: '',
        html: `<div class="w-6 h-6 rounded-full bg-[#F7931A] border-2 border-white shadow-lg"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marcador = L.marker([datos.lat, datos.lon], {
        icon: icono,
        draggable: true,
      }).addTo(mapa);

      marcadorRef.current = marcador;

      marcador.on('dragend', () => {
        const pos = marcador.getLatLng();
        setDatos((prev) => ({
          ...prev,
          lat: Math.round(pos.lat * 1000000) / 1000000,
          lon: Math.round(pos.lng * 1000000) / 1000000,
        }));
      });

      mapa.on('click', (e) => {
        marcador.setLatLng(e.latlng);
        setDatos((prev) => ({
          ...prev,
          lat: Math.round(e.latlng.lat * 1000000) / 1000000,
          lon: Math.round(e.latlng.lng * 1000000) / 1000000,
        }));
      });

      requestAnimationFrame(() => mapa.invalidateSize());
    })();

    return () => {
      cancelado = true;
      if (mapaRef.current) {
        mapaRef.current.remove();
        mapaRef.current = null;
        marcadorRef.current = null;
      }
    };
  }, [abierto, paso]);

  useEffect(() => {
    if (marcadorRef.current && mapaRef.current) {
      marcadorRef.current.setLatLng([datos.lat, datos.lon]);
      mapaRef.current.setView([datos.lat, datos.lon], mapaRef.current.getZoom());
    }
  }, [datos.lat, datos.lon]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerando(true);
    
    // Simular generación de datos (para mostrar loading state)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setPaso('resultado');
    setGenerando(false);
    toast.success('JSON generado exitosamente', {
      description: 'Los datos están listos para copiar',
    });
  };

  const copiarDatos = async () => {
    const texto = generarTextoResultado();
    try {
      await navigator.clipboard.writeText(texto);
      toast.success('¡Copiado al portapapeles!', {
        description: 'Ahora puedes enviarlo para revisión',
      });
    } catch (err) {
      toast.error('Error al copiar', {
        description: 'Intenta seleccionar y copiar manualmente',
      });
    }
  };

  const generarTextoResultado = () => {
    const extraFields: Record<string, string> = {};
    if (datos.direccion) extraFields['addr:full'] = datos.direccion;
    if (datos.telefono) extraFields.phone = datos.telefono;
    if (datos.website) extraFields.website = datos.website;
    if (datos.horario) extraFields.opening_hours = datos.horario;
    if (datos.descripcion) extraFields.description = datos.descripcion;
    if (datos.twitter) extraFields['contact:twitter'] = datos.twitter;
    if (datos.github) extraFields['contact:github'] = datos.github;

    const metodosPago: string[] = [];
    if (datos.metodoPago.lightning) metodosPago.push('lightning');
    if (datos.metodoPago.onchain) metodosPago.push('onchain');

    const payload = {
      name: datos.nombre,
      category: datos.categoria,
      lat: datos.lat,
      lon: datos.lon,
      payment_methods: metodosPago,
      extra_fields: extraFields,
    };

    return JSON.stringify(payload, null, 2);
  };

  const reiniciar = () => {
    setPaso('formulario');
    setDatos({
      nombre: '',
      categoria: '',
      lat: CENTRO[0],
      lon: CENTRO[1],
      direccion: '',
      telefono: '',
      website: '',
      horario: '',
      descripcion: '',
      twitter: '',
      github: '',
      metodoPago: {
        lightning: true,
        onchain: false,
      },
    });
  };

  const cerrar = () => {
    reiniciar();
    alCerrar();
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0A0806]/90 backdrop-blur-sm"
        onClick={cerrar}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-[24px] bg-[#11100F] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F7931A]/15 flex items-center justify-center">
              <Store className="w-5 h-5 text-[#F7931A]" />
            </div>
            <div>
              <h2 className="text-white text-[18px] font-[450] leading-none">
                {paso === 'formulario' ? 'Agregar negocio a BTC Map' : 'Datos del negocio'}
              </h2>
              <p className="text-white/50 text-[13px] font-[450] leading-none mt-1">
                {paso === 'formulario'
                  ? 'Completa la información del comercio'
                  : 'Copia estos datos para enviarlos a BTC Map'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={cerrar}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {paso === 'formulario' ? (
            <form onSubmit={manejarEnvio} className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-white text-[15px] font-[450] uppercase tracking-[0.1em] text-[#F7931A]">
                  Información básica (obligatoria)
                </h3>

                <div>
                  <label htmlFor="nombre" className="block text-white/80 text-[14px] font-[450] mb-2">
                    Nombre del negocio *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={datos.nombre}
                    onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                    className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                    placeholder="Ej: Panadería La Esquina"
                  />
                </div>

                <div>
                  <label htmlFor="categoria" className="block text-white/80 text-[14px] font-[450] mb-2">
                    Categoría *
                  </label>
                  <select
                    id="categoria"
                    required
                    value={datos.categoria}
                    onChange={(e) => setDatos({ ...datos, categoria: e.target.value })}
                    className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                  >
                    <option value="">Selecciona una categoría</option>
                    {CATEGORIAS.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-[14px] font-[450] mb-2">
                    Ubicación *
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <input
                        type="number"
                        step="0.000001"
                        required
                        value={datos.lat}
                        onChange={(e) => setDatos({ ...datos, lat: parseFloat(e.target.value) })}
                        className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                        placeholder="Latitud"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.000001"
                        required
                        value={datos.lon}
                        onChange={(e) => setDatos({ ...datos, lon: parseFloat(e.target.value) })}
                        className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                        placeholder="Longitud"
                      />
                    </div>
                  </div>
                  <div
                    ref={contenedorMapa}
                    className="w-full h-[300px] rounded-[12px] overflow-hidden border border-white/10"
                  />
                  <p className="text-white/40 text-[12px] font-[450] mt-2">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Arrastra el pin o haz clic en el mapa para ajustar la ubicación
                  </p>
                </div>

                <div>
                  <label className="block text-white/80 text-[14px] font-[450] mb-2">
                    Métodos de pago Bitcoin *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-[10px] bg-white/5 border border-white/10 cursor-pointer hover:border-[#F7931A]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={datos.metodoPago.lightning}
                        onChange={(e) =>
                          setDatos({
                            ...datos,
                            metodoPago: { ...datos.metodoPago, lightning: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded accent-[#F7931A]"
                      />
                      <span className="text-white/80 text-[14px] font-[450]">Lightning Network</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-[10px] bg-white/5 border border-white/10 cursor-pointer hover:border-[#F7931A]/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={datos.metodoPago.onchain}
                        onChange={(e) =>
                          setDatos({
                            ...datos,
                            metodoPago: { ...datos.metodoPago, onchain: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded accent-[#F7931A]"
                      />
                      <span className="text-white/80 text-[14px] font-[450]">Bitcoin on-chain</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-white text-[15px] font-[450] uppercase tracking-[0.1em] text-[#E8B45A]">
                  Información adicional (opcional)
                </h3>

                <div>
                  <label htmlFor="direccion" className="block text-white/80 text-[14px] font-[450] mb-2">
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    type="text"
                    value={datos.direccion}
                    onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
                    className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                    placeholder="Ej: Calle del Arco #5, Centro"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefono" className="block text-white/80 text-[14px] font-[450] mb-2">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      value={datos.telefono}
                      onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                      className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                      placeholder="+52 797 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-white/80 text-[14px] font-[450] mb-2">
                      Sitio web
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={datos.website}
                      onChange={(e) => setDatos({ ...datos, website: e.target.value })}
                      className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                      placeholder="https://ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="horario" className="block text-white/80 text-[14px] font-[450] mb-2">
                    Horario de atención
                  </label>
                  <input
                    id="horario"
                    type="text"
                    value={datos.horario}
                    onChange={(e) => setDatos({ ...datos, horario: e.target.value })}
                    className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                    placeholder="Ej: Mo-Fr 09:00-18:00; Sa 09:00-14:00"
                  />
                  <p className="text-white/40 text-[11px] font-[450] mt-1">
                    Formato OpenStreetMap. Ejemplo: Mo-Fr 09:00-18:00
                  </p>
                </div>

                <div>
                  <label htmlFor="descripcion" className="block text-white/80 text-[14px] font-[450] mb-2">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    value={datos.descripcion}
                    onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors resize-none"
                    placeholder="Describe brevemente el negocio..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="twitter" className="block text-white/80 text-[14px] font-[450] mb-2">
                      Twitter
                    </label>
                    <input
                      id="twitter"
                      type="text"
                      value={datos.twitter}
                      onChange={(e) => setDatos({ ...datos, twitter: e.target.value })}
                      className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                      placeholder="@usuario"
                    />
                  </div>

                  <div>
                    <label htmlFor="github" className="block text-white/80 text-[14px] font-[450] mb-2">
                      GitHub
                    </label>
                    <input
                      id="github"
                      type="text"
                      value={datos.github}
                      onChange={(e) => setDatos({ ...datos, github: e.target.value })}
                      className="w-full h-[48px] px-4 rounded-[12px] bg-white/5 border border-white/10 text-white text-[15px] font-[450] focus:outline-none focus:border-[#F7931A]/50 transition-colors"
                      placeholder="usuario"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={cerrar}
                  className="flex-1 h-[50px] rounded-[12px] border border-white/20 text-white text-[15px] font-[450] hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={generando}
                  className="flex-1 h-[50px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] font-[450] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generando ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    'Generar datos'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 space-y-6">
              <div className="rounded-[16px] bg-[#F7931A]/10 border border-[#F7931A]/20 p-4">
                <p className="text-white/90 text-[14px] font-[450] leading-[1.5]">
                  <Check className="w-4 h-4 inline text-[#F7931A] mr-2" />
                  Datos generados correctamente. Copia la información y envíala al equipo de BTC Map para
                  que revisen y publiquen tu negocio.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-white/80 text-[14px] font-[450]">
                    Datos en formato JSON
                  </label>
                  <button
                    type="button"
                    onClick={copiarDatos}
                    className="inline-flex items-center gap-2 h-[36px] px-4 rounded-[10px] bg-[#F7931A]/15 text-[#F7931A] text-[13px] font-[450] hover:bg-[#F7931A]/25 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar
                  </button>
                </div>
                <pre className="p-4 rounded-[12px] bg-[#050403] border border-white/10 text-[#E8B45A] text-[13px] font-mono leading-[1.6] overflow-x-auto max-h-[400px] overflow-y-auto">
                  {generarTextoResultado()}
                </pre>
              </div>

              <div className="rounded-[12px] bg-white/5 border border-white/10 p-4 space-y-3">
                <h4 className="text-white text-[14px] font-[450]">Próximos pasos:</h4>
                <ol className="space-y-2 text-white/70 text-[13px] font-[450] leading-[1.5] list-decimal list-inside">
                  <li>Copia los datos JSON con el botón de arriba</li>
                  <li>Contacta al equipo de BTC Map vía su formulario oficial o Telegram</li>
                  <li>Comparte estos datos para que validen y publiquen el negocio</li>
                  <li>Una vez aprobado, aparecerá en el mapa público de BTC Map</li>
                </ol>
                <a
                  href="https://btcmap.org/add-location"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[42px] px-4 rounded-[10px] bg-white/5 border border-white/10 text-white/80 text-[13px] font-[450] hover:border-[#F7931A]/40 transition-colors mt-3"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ir al formulario oficial de BTC Map
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={reiniciar}
                  className="flex-1 h-[50px] rounded-[12px] border border-white/20 text-white text-[15px] font-[450] hover:bg-white/5 transition-colors"
                >
                  Agregar otro negocio
                </button>
                <button
                  type="button"
                  onClick={cerrar}
                  className="flex-1 h-[50px] rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[15px] font-[450] hover:opacity-90 transition-opacity"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
