import { useT, BotonIdioma } from '@/i18n';

export default function Footer() {
  const t = useT();

  const links = [
    { label: t.nav.proyecto, href: '#proyecto' },
    { label: t.nav.ruta, href: '#ruta' },
    { label: t.nav.mapa, href: '#mapa' },
    { label: t.nav.blog, href: '/blog' },
    // { label: t.nav.metas, href: '#metas' }, // vuelve cuando se reactive <Metas />
    { label: t.nav.prensa, href: '#prensa' },
    { label: t.nav.unlock, href: '#unlock' },
    { label: t.nav.wallet, href: '#wallet' },
    { label: t.nav.contacto, href: '#contacto' },
  ];

  return (
    <footer className="relative bg-[#0A0806] border-t border-white/[0.06]">
      <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="max-w-[380px]">
            <a href="#inicio" className="flex items-center gap-2.5 mb-5">
              <img
                src="/img/logo-manzana-bitcoin.png"
                alt="Logo Economía Circular Bitcoin Zacatlán - Primer Pueblo Mágico Bitcoin de México"
                aria-hidden="true"
                width={30}
                height={30}
                className="w-[30px] h-[30px] shrink-0 object-contain"
              />
              <span className="flex flex-col leading-[1.15]">
                <span className="text-white text-[16px] font-[450] tracking-[-0.02em]">
                  {t.nav.marca}
                </span>
                <span className="text-white/50 text-[11px] font-[450]">
                  {t.nav.marcaEdicion}
                </span>
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
