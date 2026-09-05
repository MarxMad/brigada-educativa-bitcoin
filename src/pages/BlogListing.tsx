import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { useT, BotonIdioma } from '@/i18n';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}

export default function BlogListing() {
  const t = useT();
  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#0A0806]">
      {/* Header con navegación */}
      <header className="border-b border-white/[0.06]">
        <nav className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/img/logo-manzana-bitcoin.png"
              alt="Logo Economía Circular Bitcoin Zacatlán"
              width={34}
              height={34}
              className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] shrink-0 object-contain"
            />
            <span className="flex flex-col leading-[1.15]">
              <span className="text-white text-[14px] sm:text-[16px] font-[450] tracking-[-0.02em]">
                {t.nav.marca}
              </span>
              <span className="text-white/55 text-[10px] sm:text-[11px] font-[450] tracking-[0.02em]">
                {t.nav.marcaEdicion}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <BotonIdioma className="text-[13px]" />
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-[42px] px-4 rounded-[10px] border border-white/20 text-white text-[13px] font-[450] hover:bg-white/5 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero del Blog */}
      <section className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] py-16 sm:py-24">
        <div className="max-w-[800px]">
          <p className="text-[#F7931A] text-[12px] sm:text-[13px] font-[450] leading-none uppercase tracking-[0.18em] mb-6">
            Blog
          </p>
          <h1 className="text-white text-[40px] sm:text-[56px] md:text-[72px] font-normal leading-[0.95] mb-6">
            Economía Circular <span className="texto-oro">Bitcoin</span>
          </h1>
          <p className="text-white/70 text-[16px] sm:text-[19px] font-[450] leading-[1.5]">
            Educación, historias y guías sobre Bitcoin, Lightning Network y economía circular en Zacatlán de las Manzanas.
          </p>
        </div>
      </section>

      {/* Posts Destacados */}
      {featuredPosts.length > 0 && (
        <section className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pb-16">
          <h2 className="text-white/50 text-[12px] font-[450] uppercase tracking-[0.14em] mb-6">
            Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block rounded-[20px] overflow-hidden border border-white/[0.08] bg-[rgba(17,16,15,0.4)] hover:border-[#F7931A]/40 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-white/40 text-[12px] font-[450] mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="text-white text-[20px] sm:text-[24px] font-[450] leading-[1.2] mb-3 group-hover:text-[#F7931A] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-[14px] sm:text-[15px] font-[450] leading-[1.5] mb-4">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#E8B45A] text-[13px] font-[450]">
                    Leer más
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Todos los Posts */}
      <section className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pb-24">
        <h2 className="text-white/50 text-[12px] font-[450] uppercase tracking-[0.14em] mb-6">
          Todos los artículos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...featuredPosts, ...regularPosts].map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-[16px] overflow-hidden border border-white/[0.06] bg-[rgba(17,16,15,0.3)] hover:border-[#F7931A]/30 hover:bg-[rgba(17,16,15,0.5)] transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-white/35 text-[11px] font-[450] mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="text-white text-[17px] font-[450] leading-[1.25] mb-2 group-hover:text-[#F7931A] transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/55 text-[13px] font-[450] leading-[1.4] line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
          <p className="text-white/35 text-[13px] font-[450] text-center">
            © {new Date().getFullYear()} {t.proyecto.nombre}
          </p>
        </div>
      </footer>
    </div>
  );
}
