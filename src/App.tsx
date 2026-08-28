import { ProveedorMotion } from '@/components/Reveal';
import { ProveedorIdioma } from '@/i18n';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Zacatlan from '@/components/Zacatlan';
import Proyecto from '@/components/Proyecto';
import Brigada from '@/components/Brigada';
import Ruta from '@/components/Ruta';
import Mapa from '@/components/Mapa';
import Metas from '@/components/Metas';
import Prensa from '@/components/Prensa';
import Unlock from '@/components/Unlock';
import Aliados from '@/components/Aliados';
import Wallet from '@/components/Wallet';
import Donar from '@/components/Donar';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

function App() {
  return (
    <ProveedorIdioma>
      <ProveedorMotion>
        <Hero />
        <Marquee />
        <Proyecto />
        <Brigada />
        <Zacatlan />
        <Ruta />
        <Mapa />
        <Metas />
        <Prensa />
        <Unlock />
        <Aliados />
        <Wallet />
        <Donar />
        <Contacto />
        <Footer />
      </ProveedorMotion>
    </ProveedorIdioma>
  );
}

export default App;
