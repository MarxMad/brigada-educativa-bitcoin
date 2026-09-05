import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
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
import Unlock from '@/components/Unlock';
import Aliados from '@/components/Aliados';
import Wallet from '@/components/Wallet';
import Donar from '@/components/Donar';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import BlogListing from '@/pages/BlogListing';
import BlogPost from '@/pages/BlogPost';

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
      <Unlock />
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
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 8, 6, 0.95)',
            color: 'white',
            border: '1px solid rgba(247, 147, 26, 0.3)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </ProveedorIdioma>
  );
}

export default App;
