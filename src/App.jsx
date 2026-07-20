import { lazy, Suspense, useEffect, useState } from 'react';
import BuyMeACoffeeLink from './components/BuyMeACoffeeLink';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Brain,
  CircleDot,
  Compass,
  DoorOpen,
  Eye,
  Facebook,
  Feather,
  FileText,
  GraduationCap,
  HandHeart,
  Home,
  Instagram,
  KeyRound,
  Leaf,
  Map,
  Menu,
  MessageCircle,
  Mic2,
  Music,
  NotebookTabs,
  Play,
  School,
  ShoppingBag,
  Shell,
  Sparkles,
  Tag,
  UserRound,
  UsersRound,
  X,
  Youtube,
} from 'lucide-react';

const LINKS = {
  youtube: 'https://youtube.com/@maestrakandypartemia?si=UkZnACyMM_e2sZGj',
  facebook: 'https://www.facebook.com/share/18nbHZehqF/',
  instagram: 'https://www.instagram.com/kandypartemia?igsh=MW5tYjh6ZGN3ajRvbg==',
  whatsapp: 'https://wa.me/message/XRGTMKCKFGWZP1?src=qr',
};

const NEWSLETTER_FORM_URL = 'https://forms.gle/gP9vBgFaYdUgZNXg7';

const IMAGES = {
  hero: '/images/hero-kandy.webp',
  about: '/images/quien-soy-kandy.webp',
  classroom: '/images/aula-estudiantes.webp',
  store: '/images/tienda-docente.webp',
  school: '/images/escuela-ecos.webp',
  families: '/images/familias-acompanan.webp',
  youth: '/images/jovenes-criterio.webp',
  map: '/images/06_mapa-universo-ecos_v2_2x.webp',
};

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Resonancias', href: '#resonancias' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Escuela', href: '#escuela' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Universo musical', href: '#universo-musical' },
  { label: 'Tienda', href: '#tienda' },
  { label: 'Empieza Aquí', href: '#empieza', cta: true },
];

const mobileNavItems = navItems;

const quickLinks = [
  { title: 'Inicio', href: '#inicio', icon: Home },
  { title: 'Manifiesto', href: '#manifiesto', icon: Leaf },
  { title: 'Resonancias', href: '#resonancias', icon: BookOpenText },
  { title: 'Pilares', href: '#pilares', icon: CircleDot },
  { title: 'Escuela', href: '#escuela', icon: School },
  { title: 'Recursos', href: '#recursos', icon: NotebookTabs },
  { title: 'Universo musical', href: '#universo-musical', icon: Music },
  { title: 'Tienda', href: '#tienda', icon: ShoppingBag },
  { title: 'Empieza Aquí', href: '#empieza', icon: DoorOpen },
];

const universeNodes = [
  {
    id: 'inicio',
    title: 'Inicio',
    text: 'Entrada general al universo Ecos de Emancipación.',
    href: '#inicio',
    icon: Home,
    position: 'left-[50%] top-[8%] -translate-x-1/2',
  },
  {
    id: 'manifiesto',
    title: 'Manifiesto',
    text: 'Declaración ética, espiritual y pedagógica del proyecto.',
    href: '#manifiesto',
    icon: Leaf,
    position: 'left-[75%] top-[16%] -translate-x-1/2',
  },
  {
    id: 'resonancias',
    title: 'Resonancias',
    text: 'Reflexiones, relatos, artículos poéticos, textos pedagógicos y meditaciones escritas para despertar conciencia.',
    href: '#resonancias',
    icon: BookOpenText,
    position: 'left-[88%] top-[42%] -translate-x-1/2',
  },
  {
    id: 'pilares',
    title: 'Pilares',
    text: 'Fundamentos del proyecto: conciencia, emancipación, espiritualidad, pedagogía, amor, justicia y pensamiento crítico.',
    href: '#pilares',
    icon: CircleDot,
    position: 'left-[82%] top-[69%] -translate-x-1/2',
  },
  {
    id: 'escuela',
    title: 'Escuela',
    text: 'Talleres, cursos, rutas formativas, comunidad de aprendizaje y propuestas pedagógicas.',
    href: '#escuela',
    icon: School,
    position: 'left-[62%] top-[88%] -translate-x-1/2',
  },
  {
    id: 'recursos',
    title: 'Recursos',
    text: 'Guías, cuadernos, audios, lecturas, materiales descargables y herramientas para acompañar procesos de transformación.',
    href: '#recursos',
    icon: NotebookTabs,
    position: 'left-[38%] top-[88%] -translate-x-1/2',
  },
  {
    id: 'universo-musical',
    title: 'Universo musical',
    text: 'Canciones, álbumes y proyectos sonoros vinculados a la conciencia, la esperanza, la plenitud y la transformación interior.',
    href: '#universo-musical',
    icon: Music,
    position: 'left-[18%] top-[69%] -translate-x-1/2',
  },
  {
    id: 'tienda',
    title: 'Tienda',
    text: 'Libros, cuadernos, recursos digitales, materiales formativos y productos del ecosistema.',
    href: '#tienda',
    icon: ShoppingBag,
    position: 'left-[12%] top-[42%] -translate-x-1/2',
  },
  {
    id: 'empieza',
    title: 'Empieza Aquí',
    text: 'Ruta inicial para quienes llegan por primera vez y quieren comprender el corazón del proyecto.',
    href: '#empieza-aqui',
    icon: DoorOpen,
    position: 'left-[25%] top-[16%] -translate-x-1/2',
  },
];

const SECTION_VISUALS = {
  inicio: {
    image: '/images/ecos-inicio-visual.webp',
    assetName: 'ecos-inicio-visual.webp',
    label: 'Camino de entrada',
    tone: 'inicio',
    alt: 'Imagen simbólica de la sección Inicio de Ecos de Emancipación',
  },
  manifiesto: {
    image: '/images/ecos-manifiesto-visual.webp',
    assetName: 'ecos-manifiesto-visual.webp',
    label: 'Palabra y sentido',
    tone: 'manifiesto',
    alt: 'Imagen simbólica de la sección Manifiesto de Ecos de Emancipación',
  },
  resonancias: {
    image: '/images/ecos-resonancias-visual.webp',
    assetName: 'ecos-resonancias-visual.webp',
    label: 'Ondas de palabra',
    tone: 'resonancias',
    alt: 'Imagen simbólica de la sección Resonancias de Ecos de Emancipación',
  },
  pilares: {
    image: '/images/ecos-pilares-visual.webp',
    assetName: 'ecos-pilares-visual.webp',
    label: 'Raiz y fundamento',
    tone: 'pilares',
    alt: 'Imagen simbólica de la sección Pilares de Ecos de Emancipación',
  },
  escuela: {
    image: '/images/ecos-escuela-visual.webp',
    assetName: 'ecos-escuela-visual.webp',
    label: 'Aprendizaje compartido',
    tone: 'escuela',
    alt: 'Imagen simbólica de la sección Escuela de Ecos de Emancipación',
  },
  recursos: {
    image: '/images/ecos-recursos-visual.webp',
    assetName: 'ecos-recursos-visual.webp',
    label: 'Herramientas vivas',
    tone: 'recursos',
    alt: 'Imagen simbólica de la sección Recursos de Ecos de Emancipación',
  },
  'universo-musical': {
    image: '/images/ecos-universo-musical-visual.webp',
    assetName: 'ecos-universo-musical-visual.webp',
    label: 'Canto y resonancia',
    tone: 'universo-musical',
    alt: 'Imagen simbólica de la sección Universo musical de Ecos de Emancipación',
  },
  tienda: {
    image: '/images/ecos-tienda-visual.webp',
    assetName: 'ecos-tienda-visual.webp',
    label: 'Editorial y materiales',
    tone: 'tienda',
    alt: 'Imagen simbólica de la sección Tienda de Ecos de Emancipación',
  },
  empieza: {
    image: '/images/ecos-empieza-aqui-visual.webp',
    assetName: 'ecos-empieza-aqui-visual.webp',
    label: 'Ruta inicial',
    tone: 'empieza',
    alt: 'Imagen simbólica de la sección Empieza Aquí de Ecos de Emancipación',
  },
};

const pillars = [
  {
    title: 'Conciencia crítica',
    text: 'Preguntas honestas para mirar la realidad y transformarla.',
    icon: Eye,
  },
  {
    title: 'Pedagogía del sujeto',
    text: 'Cada estudiante como historia viva, voz propia y posibilidad.',
    icon: Leaf,
  },
  {
    title: 'Vida cotidiana',
    text: 'Casa, aula y comunidad como lugares donde se produce saber.',
    icon: BookOpen,
  },
  {
    title: 'Comunidad y esperanza',
    text: 'Vínculos que cuidan la palabra y abren caminos colectivos.',
    icon: HandHeart,
  },
];

const projects = [
  {
    title: 'Ecos de Emancipación',
    text: 'Canal y casa editorial para pensar educación, comunidad y esperanza.',
    status: 'Activo',
    action: 'Ver canal',
    href: LINKS.youtube,
    external: true,
    icon: Play,
  },
  {
    title: 'Recursos para docentes',
    text: 'Cuadernos, preguntas y materiales para el aula como territorio vivo.',
    status: 'En construcción',
    action: 'Explorar recursos',
    href: '#tienda',
    icon: NotebookTabs,
  },
  {
    title: 'Familias que acompañan',
    text: 'Rutas sencillas para orientar sin miedo, culpa ni recetas vacías.',
    status: 'En construcción',
    action: 'Leer propuesta',
    href: '#familias',
    icon: Home,
  },
  {
    title: 'Jóvenes con criterio',
    text: 'Preguntas e ideas para pensar la vida, la escuela y el lugar propio.',
    status: 'En construcción',
    action: 'Ver ruta',
    href: '#jovenes',
    icon: Sparkles,
  },
  {
    title: 'Producción poética y musical',
    text: 'Palabra sensible para nombrar memoria, territorio y transformación.',
    status: 'Próximamente',
    action: 'Próximamente',
    href: '#proyectos',
    icon: Feather,
  },
  {
    title: 'Resonancias',
    text: 'Reflexiones, relatos, artículos poéticos y meditaciones escritas para despertar conciencia.',
    status: 'En construcción',
    action: 'Leer resonancias',
    href: '#resonancias',
    icon: FileText,
  },
];

const resonanceCards = [
  {
    title: 'Vida cotidiana',
    text: 'Textos breves para mirar lo simple como territorio de conciencia.',
    icon: Leaf,
  },
  {
    title: 'Espiritualidad situada',
    text: 'Palabra serena para cuidar el alma sin perder raíz ni pensamiento crítico.',
    icon: Sparkles,
  },
  {
    title: 'Educación y conciencia',
    text: 'Reflexiones para docentes, familias y jóvenes que buscan otra forma de mirar.',
    icon: BookOpenText,
  },
];

const resourceCards = [
  {
    title: 'Guías y formatos',
    text: 'Materiales editables y herramientas en preparación para acompañar procesos educativos.',
    icon: FileText,
  },
  {
    title: 'Lecturas y autores',
    text: 'Rutas de lectura para profundizar en pedagogía, conciencia crítica y vida cotidiana.',
    icon: BookOpen,
  },
  {
    title: 'Audios y herramientas',
    text: 'Recursos sonoros, preguntas y ejercicios para pensar, cuidar y seguir caminando.',
    icon: NotebookTabs,
  },
];

const musicChannels = [
  {
    title: 'Plenitud en Canto',
    description: 'Música para acompañar el alma, la gratitud, la serenidad y la vida cotidiana.',
    channelUrl: 'https://youtube.com/@plenitudencanto?si=gyY36w-0_hLRqvOv',
    popularVideoUrl: 'https://youtu.be/HUxc6-9CMNs?si=RhgZXCuhI93cYnYc',
    popularVideoId: 'HUxc6-9CMNs',
    tone: 'calm',
  },
  {
    title: 'Resonancias de Libertad',
    description: 'Canciones con conciencia, memoria, dignidad y esperanza para pensar el mundo desde una sensibilidad emancipadora.',
    channelUrl: 'https://youtube.com/@resonanciasdelibertad?si=Do7lwwBVMA6y3SZV',
    popularVideoUrl: 'https://youtu.be/4Hm39M2PzVs?si=xHrVwSPh1M2FSwho',
    popularVideoId: '4Hm39M2PzVs',
    tone: 'freedom',
  },
];

const storeItems = [
  {
    title: 'Cuaderno de resonancias docentes',
    text: 'Bitácora para registrar preguntas, hallazgos y decisiones pedagógicas.',
    icon: BookOpenText,
  },
  {
    title: 'Banco de preguntas para pensar',
    text: 'Tarjetas de indagación para abrir diálogo crítico en clase.',
    icon: Brain,
  },
  {
    title: 'Mapas mentales y esquemas pedagógicos',
    text: 'Plantillas para organizar ideas, rutas didácticas y proyectos.',
    icon: FileText,
  },
];

const schoolRoutes = [
  {
    title: 'Ruta docente',
    subtitle: 'Pedagogía del sujeto en el aula',
    text: 'Planeación, vínculo y evaluación desde la dignidad de cada estudiante.',
    icon: GraduationCap,
  },
  {
    title: 'Ruta familias',
    subtitle: 'Acompañar sin miedo',
    text: 'Claves para conversar, orientar y sostener desde el cuidado.',
    icon: UsersRound,
  },
  {
    title: 'Ruta jóvenes',
    subtitle: 'Pensar la vida y la escuela',
    text: 'Preguntas, identidad, proyecto de vida y palabra propia.',
    icon: Sparkles,
  },
];

const schoolStartModules = [
  {
    title: '¿Qué es Escuela Ecos?',
    text: 'Una puerta de entrada para comprender la propuesta formativa de Ecos de Emancipación.',
    icon: DoorOpen,
  },
  {
    title: '¿Cómo funcionan las rutas?',
    text: 'Rutas para docentes, familias y jóvenes, pensadas para aprender paso a paso y desde la vida cotidiana.',
    icon: Map,
  },
  {
    title: 'Microestructuras de conciencia',
    text: 'Pequeñas formas de pensamiento, pregunta y acción para mirar la realidad con más claridad y esperanza.',
    icon: Brain,
  },
  {
    title: 'Recursos docentes',
    text: 'Guías, formatos, preguntas, resonancias y materiales para acompañar la práctica educativa.',
    icon: NotebookTabs,
  },
  {
    title: 'Biblioteca viva',
    text: 'Lecturas, artículos, videos y autores para profundizar en pedagogía, conciencia crítica y vida cotidiana.',
    icon: BookOpenText,
  },
  {
    title: 'Tienda docente',
    text: 'Cuadernos, tarjetas, mapas y recursos pedagógicos en preparación.',
    icon: ShoppingBag,
  },
  {
    title: 'Solicitar información',
    text: 'Un puente directo para preguntar por materiales, rutas, recursos o acompañamiento.',
    icon: MessageCircle,
    href: LINKS.whatsapp,
  },
];

const paths = [
  {
    audience: 'Soy docente',
    title: 'Mirar el aula como territorio',
    question: '¿Qué recurso puedo usar hoy para acompañar mejor a mi grupo?',
    text: 'Entra a herramientas, preguntas y recursos para planear, dialogar y mirar el aula como territorio de posibilidad.',
    action: 'Abrir Caracoles Resonando',
    href: '/recursos/caracoles-resonando',
    icon: BookOpen,
  },
  {
    audience: 'Soy madre, padre o tutor',
    title: 'Acompañar sin miedo',
    question: '¿Cómo puedo acompañar sin presionar, sin culpa y con más claridad?',
    text: 'Encuentra una entrada sencilla para mirar el aprendizaje desde el cuidado, la conversación y la confianza.',
    action: 'Ver ruta familias',
    href: '#familias',
    icon: Home,
  },
  {
    audience: 'Soy estudiante o joven curioso',
    title: 'Pensar mi lugar en el mundo',
    question: '¿Qué puedo pensar, crear o revisar para comprender mejor mi vida escolar?',
    text: 'Explora preguntas e ideas para mirar tu escuela, tu identidad, tus decisiones y tu relación con la comunidad.',
    action: 'Empezar ruta',
    href: '#jovenes',
    icon: Sparkles,
  },
  {
    audience: 'Quiero conocer la propuesta',
    title: 'Entrar al universo Ecos',
    question: '¿Qué es Ecos de Emancipación y por dónde conviene comenzar?',
    text: 'Recorre el manifiesto, el mapa del universo Ecos y las secciones principales para entender el sentido de la propuesta.',
    action: 'Leer manifiesto',
    href: '#manifiesto',
    icon: Compass,
  },
];

function ExternalLink({ href, children, className, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}

function SmartLink({ href, children, className, label, external = false }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} aria-label={label}>
      {children}
    </a>
  );
}

const ROUTE_METADATA = {
  '/': {
    title: 'Ecos de Emancipación | Educación crítica, conciencia y recursos pedagógicos',
    description:
      'Ecos de Emancipación es un proyecto pedagógico y espiritual que comparte recursos educativos, conciencia crítica, Caracoles Resonando, herramientas para docentes, familias y estudiantes.',
  },
  '/recursos/caracoles-resonando': {
    title: 'Caracoles Resonando — Planea tu PA de Telesecundaria',
    description:
      'Ficha curricular, fuentes, mapa mental y autoevaluación para los 432 Proyectos Académicos de Telesecundaria NEM.',
  },
};

const CaracolesApp = lazy(() => import('./caracoles/CaracolesApp'));

function updateMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    const propertyMatch = selector.match(/meta\[property="([^"]+)"\]/);
    const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
    if (propertyMatch) element.setAttribute('property', propertyMatch[1]);
    if (nameMatch) element.setAttribute('name', nameMatch[1]);
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function CaracolesLoading() {
  return (
    <main className="min-h-screen bg-cream px-5 py-16 text-forest">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-earth/15 bg-white/85 p-8 shadow-soft">
        <p className="section-kicker">Caracoles Resonando</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight">Cargando herramienta pedagógica.</h1>
        <p className="mt-4 leading-7 text-earth">
          Estamos preparando la ficha curricular, fuentes, mapa mental y autoevaluación del Proyecto Académico.
        </p>
      </div>
    </main>
  );
}

function App() {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/';

  useEffect(() => {
    const metadata = ROUTE_METADATA[currentPath] || ROUTE_METADATA['/'];
    const url = new URL(currentPath, 'https://ecos-de-emancipacion.vercel.app').toString();

    document.title = metadata.title;
    updateMetaTag('meta[name="description"]', 'content', metadata.description);
    updateMetaTag('meta[property="og:title"]', 'content', metadata.title);
    updateMetaTag('meta[property="og:description"]', 'content', metadata.description);
    updateMetaTag('meta[property="og:url"]', 'content', url);
  }, [currentPath]);

  if (currentPath === '/recursos/caracoles-resonando') {
    return (
      <Suspense fallback={<CaracolesLoading />}>
        <CaracolesApp />
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
        <Hero />
        <CaracolesSpotlight />
        <QuickExplore />
        <About />
        <BuyMeACoffeeLink variant="inline" />
        <UniverseMap />
        <Manifesto />
        <Resonances />
        <Pillars />
        <Projects />
        <Resources />
        <Store />
        <SchoolSection />
        <MusicUniverse />
        <Families />
        <Youth />
        <StartHere />
        <Invitation />
        <Footer />
        <BackToMap />
        <BackToTop />
      </main>
    </>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-earth/15 bg-cream/92 px-4 py-3 shadow-[0_18px_55px_rgba(21,18,14,0.08)] backdrop-blur-xl sm:px-8 lg:px-10">
      <nav className="mx-auto max-w-7xl text-sm" aria-label="Menú principal">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <a className="min-w-0 truncate font-serif text-xl leading-none text-forest sm:text-2xl" href="#inicio" aria-label="Ecos de Emancipación">
            Ecos de Emancipación
          </a>
          <ul className="hidden shrink-0 items-center gap-1 text-earth xl:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className={item.cta ? 'nav-cta' : 'nav-link'} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <BuyMeACoffeeLink variant="header" className="hidden shrink-0 xl:inline-flex" />
          <div className="relative z-[60] ml-auto flex shrink-0 items-center gap-2 xl:hidden">
            <a className="nav-cta hidden sm:inline-flex" href="#empieza">
              Empieza Aquí
            </a>
            <button
              type="button"
              className="relative z-[70] inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-earth/25 bg-cream text-forest shadow-sm focus:outline-none focus:ring-4 focus:ring-gold/35"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="site-mobile-menu"
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {isOpen && (
          <ul id="site-mobile-menu" className="relative z-[55] mt-3 grid max-h-[72vh] gap-1 overflow-y-auto rounded-2xl border border-earth/15 bg-cream/98 p-2 shadow-soft xl:hidden">
            {mobileNavItems.map((item) => (
              <li key={item.href}>
                <a
                  className={item.cta ? 'mobile-nav-cta' : 'mobile-nav-link'}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate px-5 py-5 sm:px-10 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(145deg,#F4EFE7_0%,#E8DCCB_52%,#d7c4ab_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-cream to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-5 pb-6 pt-5 sm:gap-7 sm:pb-12 sm:pt-14 lg:min-h-[76vh] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="relative z-10">
          <p className="mb-3 max-w-xl text-xs font-semibold uppercase tracking-[0.22em] text-terracotta sm:mb-4 sm:text-sm">
            Educación y conciencia crítica
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] text-forest sm:text-6xl lg:text-8xl">
            Ecos de Emancipación
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-earth sm:mt-5 sm:text-xl sm:leading-8">
            Educación, conciencia crítica y esperanza para docentes, familias y jóvenes.
          </p>
          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row sm:mt-6">
            <ExternalLink className="btn-primary" href={LINKS.youtube} label="Seguir en YouTube">
              <Youtube size={18} aria-hidden="true" />
              Seguir en YouTube
            </ExternalLink>
            <ExternalLink className="btn-secondary" href={LINKS.whatsapp} label="Escribirme por WhatsApp">
              <MessageCircle size={18} aria-hidden="true" />
              Escribirme por WhatsApp
            </ExternalLink>
          </div>
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:mt-7" href="#explora">
            Explorar
            <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>

        <figure className="hero-image-card">
          <img
            src={IMAGES.hero}
            alt="Maestra Kandy Partemia en una composición editorial cálida de Ecos de Emancipación"
            className="h-full w-full object-cover object-[50%_24%]"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Portal vivo
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function QuickExplore() {
  return (
    <section id="explora" className="px-5 pb-9 pt-3 sm:px-10 sm:pb-12 sm:pt-4 lg:px-14 lg:pb-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="section-kicker">Explora el proyecto</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-forest sm:text-4xl">Elige por dónde entrar.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 xl:grid-cols-9">
          {quickLinks.map(({ title, href, icon: Icon }) => (
            <a key={title} href={href} className="quick-card">
              <Icon size={22} aria-hidden="true" />
              <span>{title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="quien-soy" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <figure className="editorial-image aspect-[5/4] sm:aspect-[4/5]">
          <img
            src={IMAGES.about}
            alt="Retrato editorial de la Maestra Kandy Partemia González Torreblanca"
            className="h-full w-full object-cover object-[50%_22%]"
          />
        </figure>
        <div>
          <p className="section-kicker">Quién soy</p>
          <h2 className="section-title">Una voz pedagógica con raíz comunitaria.</h2>
          <p className="mt-6 max-w-3xl leading-8 text-earth">
            Soy Kandy Partemia González Torreblanca, maestra de telesecundaria, escritora y creadora de Ecos de Emancipación. Desde el aula, la comunidad y la vida cotidiana, construyo una propuesta para acompañar a docentes, familias y jóvenes en el desarrollo de conciencia, dignidad y esperanza.
          </p>
          <p className="mt-8 border-l-4 border-gold pl-5 font-serif text-3xl leading-tight text-terracotta">
            Educar también es abrir caminos de conciencia.
          </p>
        </div>
      </div>
    </section>
  );
}

function UniverseMap() {
  const [activeNodeId, setActiveNodeId] = useState(universeNodes[0].id);
  const [showFullMobileMap, setShowFullMobileMap] = useState(false);
  const activeNode = universeNodes.find((node) => node.id === activeNodeId) ?? universeNodes[0];
  const ActiveIcon = activeNode.icon;
  const activeVisual = SECTION_VISUALS[activeNode.id] ?? SECTION_VISUALS.inicio;
  const mobileUniverseNodes = showFullMobileMap
    ? universeNodes
    : universeNodes.filter(({ id }) => ['inicio', 'manifiesto', 'resonancias', 'escuela'].includes(id));

  return (
    <section id="mapa-universo" className="section-pad bg-clay/55">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="section-kicker">Mapa del universo Ecos</p>
          <h2 className="section-title">Una mirada de conjunto para entrar al proyecto.</h2>
          <p className="mt-5 leading-8 text-earth">
            Explora las áreas que sostienen el proyecto. Cada nodo abre una ruta para comprender, acompañar o participar.
          </p>
        </div>

        <div id="mapa-interactivo" className="scroll-mt-24">
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch lg:gap-6">
          <div className="universe-map" aria-label="Mapa interactivo del universo Ecos de Emancipación">
            <div className="universe-ring universe-ring-one" aria-hidden="true" />
            <div className="universe-ring universe-ring-two" aria-hidden="true" />
            <div className="universe-lines" aria-hidden="true" />
            <div className="universe-center" aria-hidden="true">
              <Leaf size={34} />
              <span>Ecos de Emancipación</span>
            </div>

            {universeNodes.map(({ id, title, href, icon: Icon, position }) => {
              const isActive = activeNodeId === id;
              return (
                <a
                  key={id}
                  href={href}
                  className={`universe-node ${position} ${isActive ? 'is-active' : ''}`}
                  aria-label={`Ir a ${title}`}
                  aria-controls="universe-node-detail"
                  onMouseEnter={() => setActiveNodeId(id)}
                  onFocus={() => setActiveNodeId(id)}
                  onClick={() => setActiveNodeId(id)}
                  onKeyDown={(event) => {
                    if (event.key === ' ') {
                      event.preventDefault();
                      event.currentTarget.click();
                    }
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{title}</span>
                </a>
              );
            })}
          </div>

          <aside id="universe-node-detail" className={`universe-detail universe-visual-panel universe-visual-${activeVisual.tone}`} aria-live="polite">
            <div className="universe-visual-art" aria-hidden={activeVisual.image ? undefined : 'true'}>
              {activeVisual.image ? (
                <img src={activeVisual.image} alt={activeVisual.alt} className="h-full w-full object-cover" />
              ) : (
                <>
                  <span className="universe-visual-ring universe-visual-ring-one" />
                  <span className="universe-visual-ring universe-visual-ring-two" />
                  <ActiveIcon size={76} strokeWidth={1.35} />
                  <span className="universe-visual-label">{activeVisual.label}</span>
                </>
              )}
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">Sección activa</p>
            <h3 className="mt-3 font-serif text-4xl leading-none text-forest">{activeNode.title}</h3>
            <p className="mt-5 leading-8 text-earth">{activeNode.text}</p>
            <figure className="universe-static-map mt-8 overflow-hidden rounded-2xl border border-earth/15 bg-cream/70 p-2">
              <img
                src={IMAGES.map}
                alt="Mapa del universo Ecos de Emancipación con las secciones Inicio, Manifiesto, Resonancias, Pilares, Escuela, Recursos, Universo musical, Tienda y Empieza Aquí"
                className="h-auto w-full rounded-xl opacity-90"
              />
            </figure>
          </aside>
        </div>

        <div className="grid gap-2.5 lg:hidden">
          {mobileUniverseNodes.map(({ id, title, text, href, icon: Icon }) => {
            const isActive = activeNodeId === id;
            return (
              <article key={id} className="rounded-2xl border border-earth/15 bg-cream/80 shadow-soft">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 p-4 text-left text-forest"
                  aria-expanded={isActive}
                  aria-controls={`mobile-universe-${id}`}
                  onClick={() => setActiveNodeId(isActive ? '' : id)}
                >
                  <span className="flex items-center gap-3 font-serif text-xl font-semibold leading-none">
                    <Icon className="text-terracotta" size={21} aria-hidden="true" />
                    {title}
                  </span>
                  <ArrowDown className={`shrink-0 transition ${isActive ? 'rotate-180' : ''}`} size={18} aria-hidden="true" />
                </button>
                {isActive && (
                  <div id={`mobile-universe-${id}`} className="border-t border-earth/15 px-4 pb-4 pt-3">
                    <p className="leading-7 text-earth">{text}</p>
                    <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={href}>
                      Ir a la sección
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </article>
            );
          })}
          <button
            type="button"
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full border border-earth/20 bg-cream/80 px-5 py-2.5 text-sm font-bold text-forest shadow-soft"
            aria-expanded={showFullMobileMap}
            onClick={() => setShowFullMobileMap((value) => !value)}
          >
            {showFullMobileMap ? 'Ver menos nodos' : 'Ver mapa completo'}
          </button>
          <figure className="mt-4 overflow-hidden rounded-2xl border border-earth/15 bg-cream p-2 shadow-soft">
            <img
              src={IMAGES.map}
              alt="Mapa del universo Ecos de Emancipación con las secciones Inicio, Manifiesto, Resonancias, Pilares, Escuela, Recursos, Universo musical, Tienda y Empieza Aquí"
              className="h-auto w-full rounded-xl"
            />
          </figure>
        </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifiesto" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
        <div>
          <div className="section-icon">
            <Leaf size={25} aria-hidden="true" />
          </div>
          <p className="section-kicker">Manifiesto breve</p>
          <h2 className="section-title">Educar es escuchar lo que el territorio ya sabe.</h2>
        </div>
        <div className="rounded-[1.35rem] border border-earth/15 bg-white/50 p-6 shadow-soft sm:p-8">
          <p className="font-serif text-3xl leading-tight text-forest sm:text-4xl">
            Ecos de Emancipación nace de una convicción: la educación no solo transmite contenidos; también puede despertar conciencia, dignificar la vida cotidiana y abrir caminos de esperanza compartida.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {['Conciencia', 'Vida cotidiana', 'Esperanza compartida'].map((item) => (
              <span key={item} className="rounded-full border border-gold/30 px-4 py-3 text-center text-sm font-semibold text-earth">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Resonances() {
  return (
    <section id="resonancias" className="section-pad bg-clay/45">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="section-kicker">Resonancias</p>
          <h2 className="section-title">Palabra escrita para volver a mirar.</h2>
          <p className="mt-5 max-w-2xl leading-8 text-earth">
            Reflexiones escritas para mirar la vida cotidiana, la espiritualidad, la educación y la conciencia desde una palabra amorosa, crítica y emancipadora.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {resonanceCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="compact-card">
              <Icon className="text-terracotta" size={25} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-earth">{text}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-terracotta">En preparación</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pilares" className="section-pad bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="section-kicker text-gold">Pilares</p>
          <h2 className="section-title text-cream">Raíces para sostener una pedagogía esperanzadora.</h2>
          <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
            {pillars.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-4 sm:p-6">
                <Icon className="text-gold" size={26} aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl sm:mt-6">{title}</h3>
                <p className="mt-2 leading-7 text-cream/78 sm:mt-3">{text}</p>
              </article>
            ))}
          </div>
        </div>
        <figure className="editorial-image min-h-[22rem] lg:min-h-[38rem]">
          <img
            src={IMAGES.classroom}
            alt="Estudiantes en un aula como símbolo de práctica educativa, acompañamiento y comunidad"
            className="h-full w-full object-cover object-center"
          />
        </figure>
      </div>
    </section>
  );
}

function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section id="proyectos" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">Proyectos vivos</p>
            <h2 className="section-title">Áreas activas y en crecimiento.</h2>
          </div>
          <ExternalLink className="btn-secondary" href={LINKS.youtube} label="Ir al canal de YouTube">
            Ver canal
            <ArrowUpRight size={17} aria-hidden="true" />
          </ExternalLink>
        </div>
        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {projects.map(({ title, text, status, action, href, external, icon: Icon }, index) => (
            <article key={title} className={`compact-card ${index >= 3 && !showAllProjects ? 'hidden md:block' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <Icon className="text-terracotta" size={25} aria-hidden="true" />
                <span className="status-pill">{status}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-earth">{text}</p>
              <SmartLink href={href} external={external} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest" label={action}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </SmartLink>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="mx-auto mt-6 flex min-h-11 items-center justify-center rounded-full border border-earth/20 bg-cream/80 px-5 py-2.5 text-sm font-bold text-forest shadow-soft md:hidden"
          aria-expanded={showAllProjects}
          onClick={() => setShowAllProjects((value) => !value)}
        >
          {showAllProjects ? 'Ver menos proyectos' : 'Ver más proyectos'}
        </button>
      </div>
    </section>
  );
}

function CaracolesSpotlight() {
  return (
    <section aria-labelledby="caracoles-home-title" className="section-pad bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-gold">
            <Shell size={27} aria-hidden="true" />
            <p className="section-kicker text-gold">Herramienta pedagógica</p>
          </div>
          <h2 id="caracoles-home-title" className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Caracoles Resonando
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-cream/85">
            Planea tu Proyecto Académico de Telesecundaria: ficha curricular, fuentes, mapa mental y autoevaluación en
            un solo lugar.
          </p>
        </div>
        <a
          href="/recursos/caracoles-resonando"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-bold text-ink shadow-soft transition hover:bg-cream focus:outline-none focus:ring-4 focus:ring-gold/35 lg:self-auto"
          aria-label="Abrir la herramienta Caracoles Resonando"
        >
          Abrir herramienta
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section id="recursos" className="section-pad bg-clay/55">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Recursos</p>
            <h2 className="section-title">Materiales para acompañar procesos.</h2>
          </div>
          <p className="leading-8 text-earth">
            Materiales, guías, lecturas, audios y herramientas para acompañar procesos de conciencia, aprendizaje y transformación interior.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {resourceCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="compact-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-terracotta">
                <Icon size={23} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-earth">{text}</p>
            </article>
          ))}
        </div>
        <article className="compact-card mt-3 border-forest/20 bg-cream/80">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-terracotta">
            <Shell size={23} aria-hidden="true" />
          </div>
          <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">Caracoles Resonando</h3>
          <p className="mt-3 leading-7 text-earth">
            Guía para comprender proyectos académicos, criterios de pensamiento, resonancias y juegos de repaso.
          </p>
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest" href="/recursos/caracoles-resonando">
            Abrir herramienta
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

function Store() {
  return (
    <section id="tienda" className="section-pad bg-clay">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <figure className="editorial-image min-h-[20rem] lg:min-h-[34rem]">
          <img
            src={IMAGES.store}
            alt="Materiales y recursos docentes preparados con estética editorial cálida"
            className="h-full w-full object-cover object-center"
          />
        </figure>
        <div>
          <div className="section-icon">
            <ShoppingBag size={25} aria-hidden="true" />
          </div>
          <p className="section-kicker text-forest">Tienda docente</p>
          <h2 className="section-title">Recursos para la práctica educativa.</h2>
          <p className="mt-5 leading-8 text-earth">
            Un espacio para reunir materiales, cuadernos, guías, tarjetas, recursos imprimibles y herramientas que acompañen la práctica docente desde la conciencia, la ternura y el pensamiento crítico.
          </p>
          <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {storeItems.map(({ title, text, icon: Icon }) => (
              <article key={title} className="catalog-card">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="text-terracotta" size={27} aria-hidden="true" />
                  <span className="status-pill">
                    <Tag size={13} aria-hidden="true" />
                    Próximamente
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 leading-7 text-earth">{text}</p>
              </article>
            ))}
          </div>
          <ExternalLink className="btn-primary mt-6 sm:mt-7" href={LINKS.whatsapp} label="Solicitar información sobre tienda docente">
            Solicitar información
            <MessageCircle size={18} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}

function SchoolSection() {
  return (
    <section id="escuela" className="section-pad bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
            <School size={26} aria-hidden="true" />
          </div>
          <p className="section-kicker mt-7 text-gold">Escuela Ecos de Emancipación</p>
          <h2 className="section-title text-cream">Formación digital en preparación.</h2>
          <p className="mt-5 leading-8 text-cream/78">
            Una futura escuela digital para profundizar en pedagogía del sujeto, conciencia crítica, vida cotidiana, recursos docentes y formación para familias.
          </p>
          <div className="mt-6 rounded-2xl border border-gold/25 bg-cream/[0.06] p-4 sm:mt-7 sm:p-5">
            <div className="flex items-start gap-4">
              <KeyRound className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <p className="leading-7 text-cream/82">
                Área exclusiva en construcción. Más adelante contará con acceso privado a videos, PDFs y materiales.
              </p>
            </div>
          </div>
          <div id="escuela-rutas" className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {schoolRoutes.map(({ title, subtitle, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-4 sm:p-5">
                <Icon className="text-gold" size={25} aria-hidden="true" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:mt-5">En preparación</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-1 font-semibold text-cream/85">{subtitle}</p>
                <p className="mt-2 leading-7 text-cream/76 sm:mt-3">{text}</p>
              </article>
            ))}
          </div>
          <ExternalLink className="btn-gold mt-7" href={LINKS.whatsapp} label="Solicitar acceso a Escuela Ecos de Emancipación">
            Solicitar acceso
            <DoorOpen size={18} aria-hidden="true" />
          </ExternalLink>
        </div>
        <figure className="editorial-image min-h-[20rem] lg:min-h-[38rem]">
          <img
            src={IMAGES.school}
            alt="Escuela Ecos de Emancipación como espacio visual para formación digital futura"
            className="h-full w-full object-cover object-center"
          />
        </figure>
      </div>

      <div id="escuela-empieza" className="mx-auto mt-9 max-w-7xl rounded-[1.35rem] border border-cream/15 bg-cream/[0.07] p-4 shadow-soft sm:mt-12 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-kicker text-gold">Empieza aquí · Escuela Ecos</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-5xl">
              Una orientación inicial para recorrer la escuela.
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-cream/78 sm:leading-8">
              Escuela Ecos de Emancipación es un espacio en construcción para recorrer rutas de estudio, videos, materiales, artículos y recursos pedagógicos desde una mirada crítica, esperanzadora y situada.
            </p>
          </div>
          <a className="btn-gold justify-self-start lg:justify-self-end" href="#escuela-rutas" aria-label="Comenzar recorrido por las rutas de Escuela Ecos">
            Comenzar recorrido
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {schoolStartModules.map(({ title, text, icon: Icon, href }) => (
            <article key={title} className="school-start-card">
              <Icon size={23} aria-hidden="true" />
              <h4>{title}</h4>
              <p>{text}</p>
              {href && (
                <ExternalLink className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold" href={href} label="Solicitar información por WhatsApp">
                  Solicitar información
                  <ArrowUpRight size={15} aria-hidden="true" />
                </ExternalLink>
              )}
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-gold/20 bg-ink/20 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker text-gold">Carta trimestral de Ecos</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-cream">Una carta para pensar sin saturación.</h3>
            <p className="mt-3 max-w-3xl leading-7 text-cream/78">
              Recibe cada trimestre una carta de Ecos de Emancipación con reflexiones, recursos docentes, rutas de estudio y materiales para acompañar la conciencia crítica en la vida cotidiana.
            </p>
            <p className="mt-3 text-sm font-semibold text-gold">
              Sin saturación. Solo una carta cada trimestre para pensar, cuidar y seguir caminando.
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <a
              className="btn-gold"
              href={NEWSLETTER_FORM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Quiero recibir la carta trimestral de Ecos"
            >
              Quiero recibir la carta trimestral
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicUniverse() {
  const getSoundIcon = (tone) => (tone === 'freedom' ? Mic2 : Music);

  return (
    <section id="universo-musical" className="section-pad bg-clay/45">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="section-kicker">Universo musical</p>
            <h2 className="section-title">La palabra también canta.</h2>
          </div>
          <div>
            <p className="leading-8 text-earth">
              Ecos de Emancipación también canta. En este universo musical convergen dos espacios que acompañan la vida interior, la memoria, la conciencia y la esperanza: Plenitud en Canto y Resonancias de Libertad.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {musicChannels.map(({ title, description, channelUrl, popularVideoId, tone }) => {
            const Icon = getSoundIcon(tone);

            return (
              <article key={title} className={`sound-card sound-card-${tone}`}>
                <div className="sound-visual">
                  <p className="sound-video-label">Video destacado</p>
                  {popularVideoId ? (
                    <iframe
                      className="sound-iframe"
                      src={`https://www.youtube.com/embed/${popularVideoId}`}
                      title={`Video destacado de ${title}`}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="sound-placeholder" aria-hidden="true">
                      <Icon size={42} aria-hidden="true" />
                      <span className="sound-wave sound-wave-one" />
                      <span className="sound-wave sound-wave-two" />
                      <span className="sound-wave sound-wave-three" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">Canal sonoro</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-4xl">{title}</h3>
                  <p className="mt-4 leading-7 text-earth">{description}</p>
                  <ExternalLink className="btn-secondary mt-6 self-start" href={channelUrl} label={`Ir al canal ${title}`}>
                    Ir al canal
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </ExternalLink>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-2xl leading-tight text-terracotta">
          La palabra también canta cuando busca tocar la conciencia.
        </p>
      </div>
    </section>
  );
}

function Families() {
  return (
    <section id="familias" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <figure className="editorial-image min-h-[20rem] lg:min-h-[34rem]">
          <img
            src={IMAGES.families}
            alt="Familias acompañando procesos de aprendizaje en un entorno cálido"
            className="h-full w-full object-cover object-center"
          />
        </figure>
        <div>
          <p className="section-kicker">Familias que acompañan</p>
          <h2 className="section-title">Acompañar sin miedo también se aprende.</h2>
          <p className="mt-5 leading-8 text-earth">
            Recursos y reflexiones para acompañar el aprendizaje en casa sin miedo, sin culpa y con herramientas sencillas.
          </p>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest" href="#empieza">
            Ver caminos de entrada
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Youth() {
  return (
    <section id="jovenes" className="section-pad bg-clay/45">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker">Jóvenes con criterio</p>
          <h2 className="section-title">Pensar la vida, la escuela y el propio lugar.</h2>
          <p className="mt-5 leading-8 text-earth">
            Ideas, preguntas y caminos para que las y los jóvenes piensen su vida, su escuela y su lugar en el mundo.
          </p>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest" href="#empieza">
            Empezar ruta joven
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <figure className="editorial-image min-h-[20rem] lg:min-h-[34rem]">
          <img
            src={IMAGES.youth}
            alt="Jóvenes reflexionando con criterio sobre su escuela y su lugar en el mundo"
            className="h-full w-full object-cover object-center"
          />
        </figure>
      </div>
    </section>
  );
}

function StartHere() {
  return (
    <section id="empieza" className="section-pad">
      <div id="empieza-aqui" className="mx-auto max-w-7xl scroll-mt-24">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">Empieza aquí</p>
            <h2 className="section-title">Elige una puerta de entrada.</h2>
          </div>
          <p className="max-w-3xl leading-8 text-earth">
            Esta sección orienta a cada visitante hacia el primer beneficio concreto del sitio: una herramienta, una ruta
            de reflexión, una lectura o una forma clara de participar en Ecos de Emancipación.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 xl:grid-cols-4 xl:gap-4">
          {paths.map(({ audience, title, question, text, action, href, icon: Icon }) => (
            <article key={audience} className="compact-card flex min-h-full flex-col">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-terracotta">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <span className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-forest">{audience}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest sm:mt-6 sm:text-3xl">{title}</h3>
              <p className="mt-4 border-l-4 border-gold pl-4 font-serif text-xl leading-tight text-terracotta">
                {question}
              </p>
              <p className="mt-3 leading-7 text-earth sm:mt-4 sm:leading-8">{text}</p>
              <a className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-forest sm:pt-6" href={href}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {audience === 'Soy estudiante o joven curioso' && (
                <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-terracotta" href="/recursos/caracoles-resonando">
                  Caracoles Resonando
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section id="contacto" className="px-5 py-10 sm:px-10 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-7xl rounded-[1.4rem] bg-forest px-5 py-8 text-center text-cream shadow-soft sm:rounded-[1.6rem] sm:px-12 sm:py-14">
        <HandHeart className="mx-auto text-gold" size={38} aria-hidden="true" />
        <h2 className="mx-auto mt-5 max-w-4xl font-serif text-3xl leading-tight sm:mt-6 sm:text-6xl">
          Si esta propuesta resonó contigo, compártela.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-cream/78 sm:mt-6 sm:leading-8">
          Compártela con una maestra, una madre, un padre o una persona joven que necesite recordar que la educación todavía puede ser territorio de esperanza.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <ExternalLink className="btn-light" href={LINKS.youtube} label="Seguir en YouTube">
            <Youtube size={18} aria-hidden="true" />
            Seguir en YouTube
          </ExternalLink>
          <ExternalLink className="btn-gold" href={LINKS.whatsapp} label="Escribirme por WhatsApp">
            <MessageCircle size={18} aria-hidden="true" />
            Escribirme por WhatsApp
          </ExternalLink>
          <ExternalLink className="btn-light" href={LINKS.instagram} label="Ver Instagram">
            <Instagram size={18} aria-hidden="true" />
            Ver Instagram
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    { label: 'YouTube', href: LINKS.youtube, icon: Youtube },
    { label: 'Facebook', href: LINKS.facebook, icon: Facebook },
    { label: 'Instagram', href: LINKS.instagram, icon: Instagram },
    { label: 'WhatsApp', href: LINKS.whatsapp, icon: MessageCircle },
  ];

  return (
    <footer className="border-t border-earth/20 px-5 py-8 sm:px-10 sm:py-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-earth lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-serif text-xl text-forest">Ecos de Emancipación</p>
          <p className="mt-2 max-w-2xl">
            Propuesta educativa, cultural y pedagógica de la Maestra Kandy Partemia González Torreblanca.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <ExternalLink key={label} href={href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-earth/20 px-4 py-2 text-forest" label={label}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </ExternalLink>
          ))}
          <BuyMeACoffeeLink variant="footer" />
        </div>
      </div>
    </footer>
  );
}

function BackToMap() {
  return (
    <a
      href="#mapa-interactivo"
      aria-label="Volver al mapa del universo Ecos"
      title="Volver al mapa del universo Ecos"
      className="map-floating-button"
    >
      <Compass size={20} aria-hidden="true" />
    </a>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#inicio"
      aria-label="Volver arriba"
      className={`fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream shadow-soft transition duration-200 hover:bg-ink focus:outline-none focus:ring-4 focus:ring-gold/35 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </a>
  );
}

export default App;
