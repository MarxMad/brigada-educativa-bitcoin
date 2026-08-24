import { useT, BotonIdioma } from '@/i18n';

export default function Footer() {
  const t = useT();

  const links = [
    { label: t.nav.proyecto, href: '#proyecto' },
    { label: t.nav.ruta, href: '#ruta' },
    { label: t.nav.mapa, href: '#mapa' },
    { label: t.nav.metas, href: '#metas' },
    { label: t.nav.prensa, href: '#prensa' },
    { label: t.nav.contacto, href: '#contacto' },
  ];

  return (
    <footer className="relative bg-[#0A0806] border-t border-white/[0.06]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="max-w-[380px]">
            <a href="#inicio" className="flex items-center gap-2.5 mb-5">
              <svg width="28" height="28" viewBox="0 0 256 256" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="marcaPie" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F7931A" />
                    <stop offset="100%" stopColor="#FFD98E" />
                  </linearGradient>
                </defs>
                <path
                  d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
                  fill="url(#marcaPie)"
                />
              </svg>
              <span className="text-white text-[22px] font-[450] leading-none tracking-[-0.02em]">
                Brigada
              </span>
            </a>
            <p className="text-white/50 text-[14px] font-[450] leading-[1.5]">
              {t.footer.descripcion(t.proyecto.inicio, t.proyecto.fin)}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <nav aria-label={t.nav.secciones} className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/60 text-[14px] font-[450] leading-none hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <BotonIdioma className="text-[13px]" />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/35 text-[13px] font-[450] leading-none">
            © {new Date().getFullYear()} {t.proyecto.nombre}
          </p>
          <p className="text-white/35 text-[13px] font-[450] leading-none">{t.footer.lema}</p>
        </div>
      </div>
    </footer>
  );
}
