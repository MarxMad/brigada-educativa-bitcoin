import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, ExternalLink, Target } from 'lucide-react';
import VideoFondo from '@/components/VideoFondo';
import Reveal from '@/components/Reveal';
import { useT } from '@/i18n';
import { CALENDARIO_LUMA, CALENDARIO_LUMA_EMBED, RUTA_UNIVERSITARIA } from '@/config/enlaces';

export default function Ruta() {
  const t = useT();
  const [semanaIdx, setSemanaIdx] = useState(0);
  const [diaIdx, setDiaIdx] = useState(0);
  const SEMANAS = t.ruta.semanas;
  const semana = SEMANAS[semanaIdx];
  const bloques = semana.bloques;
  const dia = bloques[Math.min(diaIdx, bloques.length - 1)];
  const diaActual = Math.min(diaIdx, bloques.length - 1);
  const esPrimero = semanaIdx === 0 && diaActual === 0;
  const esUltimo = semanaIdx === SEMANAS.length - 1 && diaActual === bloques.length - 1;

  const irASemana = (i: number) => {
    setSemanaIdx(i);
    setDiaIdx(0);
  };

  useEffect(() => {
    const aplicarHash = () => {
      const hash = window.location.hash.replace('#', '');
      const idx = ['s1', 's2', 's3', 's4'].indexOf(hash.replace('ruta-', ''));
      if (idx >= 0) {
        setSemanaIdx(idx);
        setDiaIdx(0);
      }
    };
    aplicarHash();
    window.addEventListener('hashchange', aplicarHash);
    return () => window.removeEventListener('hashchange', aplicarHash);
  }, []);

  const irAnterior = () => {
    if (diaActual > 0) {
      setDiaIdx(diaActual - 1);
      return;
    }
    if (semanaIdx > 0) {
      const prev = semanaIdx - 1;
      setSemanaIdx(prev);
      setDiaIdx(SEMANAS[prev].bloques.length - 1);
    }
  };

  const irSiguiente = () => {
    if (diaActual < bloques.length - 1) {
      setDiaIdx(diaActual + 1);
      return;
    }
    if (semanaIdx < SEMANAS.length - 1) {
      setSemanaIdx(semanaIdx + 1);
      setDiaIdx(0);
    }
  };

  return (
    <section id="ruta" className="relative bg-[#0A0806] overflow-hidden">
      <VideoFondo
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        src="/video/glow-gold.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0806] via-[#0A0806]/75 to-[#0A0806]" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-24 sm:py-32 md:py-40">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[720px]">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-[450] leading-none text-[#F7931A] uppercase tracking-[0.18em] mb-6">
                <span className="w-6 h-px bg-[#F7931A]" />
                {t.ruta.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-white text-[32px] sm:text-[46px] md:text-[58px] font-normal leading-[0.98]">
                <span className="texto-oro">{t.ruta.tituloDestacado}</span>
                {t.ruta.tituloB}
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-5 text-white/65 text-[15px] sm:text-[17px] font-[450] leading-[1.45] max-w-[640px]">
                {t.ruta.bajada}
              </p>
            </Reveal>
          </div>

          <Reveal delay={140} dir="right">
            <div className="flex items-center gap-3 h-[52px] px-6 bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]">
              <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse" />
              <span className="text-white/80 text-[13px] sm:text-[14px] font-[450] leading-[14px] whitespace-nowrap">
                {t.proyecto.inicio} — {t.proyecto.fin}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div
            role="tablist"
            aria-label={t.ruta.semanasNav}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10"
          >
            {SEMANAS.map((s, i) => {
              const isActive = i === semanaIdx;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`ruta-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="semana-panel"
                  onClick={() => irASemana(i)}
                  className={`relative scroll-mt-8 text-left rounded-[16px] sm:rounded-[18px] px-4 py-4 sm:px-5 sm:py-5 border transition-colors duration-300 ${
                    isActive
                      ? 'bg-white/[0.08] border-[#F7931A]/50'
                      : s.destacada
                        ? 'bg-[#F7931A]/[0.07] border-[#F7931A]/35 hover:border-[#F7931A]/50'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.055] hover:border-white/[0.12]'
                  }`}
                >
                  {s.destacada && (
                    <span className="inline-flex items-center h-[20px] px-2 mb-2 rounded-[6px] bg-[#F7931A] text-[#0A0806] text-[10px] font-[450] leading-none uppercase tracking-[0.12em]">
                      {t.ruta.destacada}
                    </span>
                  )}
                  <span
                    className={`block text-[11px] font-[450] leading-none uppercase tracking-[0.16em] mb-2 ${
                      isActive || s.destacada ? 'text-[#F7931A]' : 'text-white/40'
                    }`}
                  >
                    {t.ruta.semanaLabel} {s.numero}
                  </span>
                  <span
                    className={`block text-[14px] sm:text-[16px] font-[450] leading-[1.25] mb-2 line-clamp-2 min-h-[2.5em] ${
                      isActive ? 'text-white' : 'text-white/65'
                    }`}
                  >
                    {s.nombre}
                  </span>
                  <span className={`block text-[12px] font-[450] leading-none ${isActive ? 'text-white/70' : 'text-white/35'}`}>
                    {s.fechas}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            id="semana-panel"
            role="tabpanel"
            aria-labelledby={`ruta-${semana.id}`}
            className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] border border-white/[0.06] p-5 sm:p-8 md:p-10"
          >
            <div className="mb-7 sm:mb-8">
              <p className="flex flex-wrap items-center gap-2 text-[#F7931A] text-[12px] font-[450] leading-none uppercase tracking-[0.16em] mb-3">
                {t.ruta.semanaLabel} {semana.numero} {t.ruta.de} {String(SEMANAS.length).padStart(2, '0')}
                {semana.destacada && (
                  <span className="inline-flex items-center h-[20px] px-2 rounded-[6px] bg-[#F7931A] text-[#0A0806] text-[10px] font-[450] leading-none tracking-[0.12em]">
                    {t.ruta.destacada}
                  </span>
                )}
              </p>
              <h3 className="text-white text-[22px] sm:text-[30px] font-[450] leading-[1.1] mb-3">
                {semana.nombre}
              </h3>
              <p className="text-white/65 text-[15px] sm:text-[16px] font-[450] leading-[1.5] max-w-[720px]">
                {semana.resumen}
              </p>
              {semana.id === 's1' && (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <a
                      href={RUTA_UNIVERSITARIA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 h-[40px] px-4 rounded-[11px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[13px] font-[450] leading-none"
                    >
                      {t.ruta.verRutaUniversitaria}
                      <ExternalLink className="w-[12px] h-[12px]" />
                    </a>
                    <a
                      href={CALENDARIO_LUMA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 h-[40px] px-4 rounded-[11px] border border-white/15 text-white text-[13px] font-[450] leading-none hover:border-[#F7931A]/50"
                    >
                      <Calendar className="w-[13px] h-[13px]" />
                      {t.ruta.verCalendario}
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-3">
                    {t.ruta.calendarioTitulo}
                  </p>
                  <div className="rounded-[16px] overflow-hidden border border-white/[0.08] bg-[#11100F]">
                    <iframe
                      src={CALENDARIO_LUMA_EMBED}
                      title={t.ruta.calendarioTitulo}
                      className="w-full h-[420px] sm:h-[450px]"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <nav className="lg:w-[280px] shrink-0">
                <p
                  id="dias-heading"
                  className="text-white/40 text-[11px] font-[450] leading-none uppercase tracking-[0.16em] mb-3 px-1"
                >
                  {t.ruta.diasNav}
                </p>
                <div
                  role="tablist"
                  aria-labelledby="dias-heading"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2"
                >
                  {bloques.map((bloque, i) => {
                    const isActive = i === diaActual;
                    return (
                      <button
                        key={bloque.titulo}
                        type="button"
                        role="tab"
                        id={`dia-tab-${semana.id}-${i}`}
                        aria-selected={isActive}
                        aria-controls="dia-panel"
                        onClick={() => setDiaIdx(i)}
                        className={`text-left rounded-[14px] px-4 py-3.5 border transition-colors duration-300 ${
                          isActive
                            ? 'bg-[#F7931A]/15 border-[#F7931A]/40'
                            : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.055]'
                        }`}
                      >
                        <span
                          className={`block text-[11px] font-[450] leading-none uppercase tracking-[0.14em] mb-1.5 ${
                            isActive ? 'text-[#F7931A]' : 'text-white/40'
                          }`}
                        >
                          {bloque.dias}
                        </span>
                        <span
                          className={`block text-[14px] sm:text-[15px] font-[450] leading-[1.25] line-clamp-2 ${
                            isActive ? 'text-white' : 'text-white/60'
                          }`}
                        >
                          {bloque.titulo}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              <div className="flex-1 min-w-0 flex flex-col">
                <div
                  key={`${semana.id}-${diaActual}`}
                  id="dia-panel"
                  role="tabpanel"
                  aria-labelledby={`dia-tab-${semana.id}-${diaActual}`}
                  className="flex-1 rounded-[18px] bg-white/[0.035] border border-white/[0.06] p-5 sm:p-7 animate-fade-scale opacity-0"
                >
                  <p className="text-[#F7931A] text-[11px] font-[450] leading-none uppercase tracking-[0.16em] mb-4">
                    {t.ruta.temario}
                  </p>
                  <p className="text-white/50 text-[13px] font-[450] leading-none mb-2">{dia.dias}</p>
                  <h4 className="text-white text-[20px] sm:text-[24px] font-[450] leading-[1.15] mb-5">
                    {dia.titulo}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {dia.puntos.map((punto) => (
                      <li key={punto} className="flex gap-3">
                        <ArrowRight className="w-[14px] h-[14px] mt-[4px] shrink-0 text-[#F7931A]" />
                        <span className="text-white/75 text-[14.5px] sm:text-[16px] font-[450] leading-[1.5]">
                          {punto}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={irAnterior}
                    disabled={esPrimero}
                    className="inline-flex items-center gap-1.5 h-[44px] px-4 rounded-[11px] text-[13px] sm:text-[14px] font-[450] leading-none text-white/80 border border-white/[0.08] hover:bg-white/[0.05] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-[16px] h-[16px]" />
                    {t.ruta.anterior}
                  </button>
                  <span className="text-white/45 text-[12px] sm:text-[13px] font-[450] leading-none tnum whitespace-nowrap">
                    {diaActual + 1} {t.ruta.de} {bloques.length}
                  </span>
                  <button
                    type="button"
                    onClick={irSiguiente}
                    disabled={esUltimo}
                    className="inline-flex items-center gap-1.5 h-[44px] px-4 rounded-[11px] text-[13px] sm:text-[14px] font-[450] leading-none text-[#0A0806] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none disabled:hover:brightness-100 transition-[filter]"
                  >
                    {t.ruta.siguiente}
                    <ChevronRight className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-[18px] bg-[#F7931A]/10 border border-[#F7931A]/25 p-5 sm:p-6">
              <span className="inline-flex items-center gap-2 shrink-0 text-[#F7931A] text-[12px] font-[450] leading-none uppercase tracking-[0.16em]">
                <Target className="w-[14px] h-[14px]" />
                {t.ruta.resultado}
              </span>
              <p className="text-white text-[15px] sm:text-[17px] font-[450] leading-[1.4]">
                {semana.meta}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
