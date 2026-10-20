import { Navigate, Route, Routes } from 'react-router-dom';
import { ProveedorMotion } from '@/components/Reveal';
import { ProveedorIdioma } from '@/i18n';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Zacatlan from '@/components/Zacatlan';
import Proyecto from '@/components/Proyecto';
import Brigada from '@/components/Brigada';
import Ruta from '@/components/Ruta';
import Mapa from '@/components/Mapa';
// import Metas from '@/components/Metas';
import Prensa from '@/components/Prensa';
// import Unlock from '@/components/Unlock';
import Aliados from '@/components/Aliados';
import Wallet from '@/components/Wallet';
import Donar from '@/components/Donar';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
// Blog oculto hasta que arranque. Las páginas siguen en src/pages y los posts
// en src/data/blog.ts. Para volver a mostrarlo: importa BlogListing y BlogPost,
// restaura las rutas /blog y /blog/:slug, el enlace del menú y el del pie,
// la entrada del sitemap y el RSS en index.html.

function HomePage() {
  return (
    <ProveedorMotion>
      <Hero />
      <Marquee />
      <Proyecto />
      <Brigada />
      <Zacatlan />
      <Ruta />
      <Mapa />
      {/* Metas medibles: fuera de la página por ahora. El componente sigue en
          src/components/Metas.tsx y los textos en i18n; para volver a mostrarla
          basta con descomentar esta línea y su import. */}
      {/* <Metas /> */}
      <Prensa />
      {/* Bloque «La brigada se cruza con UNLOCK»: fuera de la página por ahora.
          El componente sigue en src/components/Unlock.tsx; para volver a
          mostrarlo, descomenta esta línea, su import y el enlace del pie. */}
      {/* <Unlock /> */}
      <Aliados />
      <Wallet />
      <Donar />
      <Contacto />
      <Footer />
    </ProveedorMotion>
  );
}

function App() {
  return (
    <ProveedorIdioma>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Navigate to="/" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
      </Routes>
    </ProveedorIdioma>
  );
}

export default App;
