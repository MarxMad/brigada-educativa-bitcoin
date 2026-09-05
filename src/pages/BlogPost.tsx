import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { blogPosts } from '@/data/blog';
import { useT, BotonIdioma } from '@/i18n';
import { useEffect } from 'react';
import ScrollProgress from '@/components/ScrollProgress';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('es-MX', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://www.pueblobitcoin.org${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://www.pueblobitcoin.org"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Economía Circular Bitcoin Zacatlán",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pueblobitcoin.org/img/logo-manzana-bitcoin.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.pueblobitcoin.org/blog/${post.slug}`
    },
    "articleBody": post.content,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "es-MX"
  };

  const handleShare = async () => {
    const url = `https://www.pueblobitcoin.org/blog/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url,
        });
      } catch (err) {
        // Usuario canceló o error - no mostrar toast en este caso
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(url);
        toast.success('¡Enlace copiado!', {
          description: 'Ahora puedes compartirlo donde quieras',
        });
      } catch (err) {
        toast.error('Error al copiar enlace');
      }
    }
  };

  // Convertir markdown simple a HTML
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) continue;

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="text-white text-[32px] sm:text-[42px] font-normal leading-[1.1] mb-6 mt-12 first:mt-0">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-white text-[26px] sm:text-[32px] font-normal leading-[1.15] mb-5 mt-10">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-white text-[20px] sm:text-[24px] font-[450] leading-[1.2] mb-4 mt-8">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // List items - agrupa consecutivos
        const listItems: string[] = [line.substring(2)];
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
          i++;
          listItems.push(lines[i].trim().substring(2));
        }
        elements.push(
          <ul key={key++} className="space-y-3 mb-6 pl-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-white/75 text-[15px] sm:text-[17px] font-[450] leading-[1.6] relative before:content-['•'] before:absolute before:-left-6 before:text-[#F7931A]">
                {item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-[500]">$1</strong>')}
              </li>
            ))}
          </ul>
        );
      } else if (line.startsWith('**') || line.includes('**')) {
        // Párrafos con bold
        const html = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-[500]">$1</strong>');
        elements.push(
          <p key={key++} className="text-white/75 text-[15px] sm:text-[17px] font-[450] leading-[1.7] mb-5" dangerouslySetInnerHTML={{ __html: html }} />
        );
      } else if (line.startsWith('*') && line.endsWith('*')) {
        // Itálica (usualmente citas)
        elements.push(
          <p key={key++} className="text-white/60 text-[14px] sm:text-[16px] font-[450] leading-[1.6] mb-5 italic pl-4 border-l-2 border-[#F7931A]/40">
            {line.substring(1, line.length - 1)}
          </p>
        );
      } else if (line.startsWith('---')) {
        elements.push(<hr key={key++} className="border-white/10 my-12" />);
      } else {
        // Párrafo normal
        elements.push(
          <p key={key++} className="text-white/75 text-[15px] sm:text-[17px] font-[450] leading-[1.7] mb-5">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Scroll Progress & Back to Top */}
      <ScrollProgress />

      <div className="min-h-screen bg-[#0A0806]">
        {/* Header */}
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
                to="/blog"
                className="inline-flex items-center gap-2 h-[42px] px-4 rounded-[10px] border border-white/20 text-white text-[13px] font-[450] hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero de Post */}
        <article className="w-full max-w-[900px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[13px] font-[450] mb-8 text-white/40">
            <Link to="/" className="hover:text-white/70 transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/20 text-[#F7931A] text-[11px] font-[450] uppercase tracking-[0.1em]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-white text-[36px] sm:text-[48px] md:text-[56px] font-normal leading-[1.05] mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/50 text-[13px] font-[450] pb-8 border-b border-white/[0.08]">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min de lectura
            </span>
            <span>Por {post.author}</span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 ml-auto text-[#E8B45A] hover:text-[#F7931A] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
          </div>

          {/* Featured Image */}
          <div className="my-10 rounded-[20px] overflow-hidden">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          {/* CTA final */}
          <div className="mt-16 p-8 rounded-[20px] bg-gradient-to-br from-[#F7931A]/10 to-[#E8B45A]/5 border border-[#F7931A]/20">
            <h3 className="text-white text-[20px] sm:text-[24px] font-[450] mb-3">
              ¿Listo para unirte a la economía circular Bitcoin?
            </h3>
            <p className="text-white/70 text-[15px] font-[450] leading-[1.6] mb-5">
              La Brigada Educativa Bitcoin recorre Zacatlán del 7 de septiembre al 2 de octubre. Únete y aprende cómo Bitcoin puede beneficiar a tu negocio o tus ahorros.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/#contacto"
                className="inline-flex items-center h-[46px] px-5 rounded-[12px] bg-gradient-to-r from-[#F7931A] to-[#E8B45A] text-[#0A0806] text-[14px] font-[450] hover:opacity-90 transition-opacity"
              >
                Contáctanos
              </Link>
              <Link
                to="/#mapa"
                className="inline-flex items-center h-[46px] px-5 rounded-[12px] border border-white/20 text-white text-[14px] font-[450] hover:bg-white/5 transition-colors"
              >
                Ver el mapa Bitcoin
              </Link>
            </div>
          </div>
        </article>

        {/* Más artículos */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8">
            <h2 className="text-white text-[24px] font-[450] mb-8">Más artículos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts
                .filter(p => p.slug !== post.slug)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block rounded-[16px] overflow-hidden border border-white/[0.06] bg-[rgba(17,16,15,0.3)] hover:border-[#F7931A]/30 transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-white text-[17px] font-[450] leading-[1.25] mb-2 group-hover:text-[#F7931A] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-white/55 text-[13px] font-[450] leading-[1.4] line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px]">
            <p className="text-white/35 text-[13px] font-[450] text-center">
              © {new Date().getFullYear()} {t.proyecto.nombre}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
