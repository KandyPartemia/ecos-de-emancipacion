import { useEffect, useState } from 'react';
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
  FileStack,
  FileText,
  GraduationCap,
  HandHeart,
  Home,
  Instagram,
  KeyRound,
  Lightbulb,
  Leaf,
  Library,
  Menu,
  MessageCircle,
  MessagesSquare,
  NotebookTabs,
  Package,
  Play,
  School,
  ShoppingBag,
  Sparkles,
  Tag,
  UserRound,
  UsersRound,
  Video,
  X,
  Youtube,
} from 'lucide-react';

const LINKS = {
  youtube: 'https://youtube.com/@maestrakandypartemia?si=UkZnACyMM_e2sZGj',
  facebook: 'https://www.facebook.com/share/18nbHZehqF/',
  instagram: 'https://www.instagram.com/kandypartemia?igsh=MW5tYjh6ZGN3ajRvbg==',
  whatsapp: 'https://wa.me/message/XRGTMKCKFGWZP1?src=qr',
};

const navItems = [
  { label: 'Quién soy', href: '#quien-soy' },
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Tienda', href: '#tienda' },
  { label: 'Escuela', href: '#escuela' },
  { label: 'Empieza aquí', href: '#empieza' },
];

const quickLinks = [
  { title: 'Quién soy', href: '#quien-soy', icon: UserRound },
  { title: 'Manifiesto', href: '#manifiesto', icon: Leaf },
  { title: 'Pilares', href: '#pilares', icon: CircleDot },
  { title: 'Proyectos', href: '#proyectos', icon: Play },
  { title: 'Tienda docente', href: '#tienda', icon: ShoppingBag },
  { title: 'Escuela', href: '#escuela', icon: School },
  { title: 'Empieza aquí', href: '#empieza', icon: Lightbulb },
  { title: 'Contacto', href: '#contacto', icon: MessageCircle },
];

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
    icon: Home,
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
    title: 'Pedagogía del Sujeto',
    text: 'Propuesta para mirar a cada persona como conciencia, historia y posibilidad.',
    status: 'En construcción',
    action: 'Leer propuesta',
    href: '#manifiesto',
    icon: UserRound,
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
    href: '#empieza',
    icon: Home,
  },
  {
    title: 'Filosofía para pensar la vida',
    text: 'Preguntas para mirar la escuela, la dignidad y el mundo cotidiano.',
    status: 'Activo',
    action: 'Leer propuesta',
    href: '#pilares',
    icon: Compass,
  },
  {
    title: 'Producciones poéticas y musicales',
    text: 'Palabra sensible para nombrar memoria, territorio y transformación.',
    status: 'Próximamente',
    action: 'Próximamente',
    href: '#',
    icon: Feather,
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
  {
    title: 'Cartas de dilemas para adolescentes',
    text: 'Situaciones breves para conversar sobre decisiones y cuidado.',
    icon: MessagesSquare,
  },
  {
    title: 'Guías para familias',
    text: 'Orientaciones claras para acompañar procesos desde casa.',
    icon: Home,
  },
  {
    title: 'Materiales imprimibles para aula',
    text: 'Recursos sencillos para activar lectura, escritura y memoria.',
    icon: Package,
  },
];

const schoolModules = [
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
  {
    title: 'Biblioteca de materiales',
    subtitle: 'Lecturas y fichas',
    text: 'Repositorio futuro de guías y recursos de consulta.',
    icon: Library,
  },
  {
    title: 'Videos formativos',
    subtitle: 'Cápsulas y sesiones',
    text: 'Contenidos para profundizar en temas pedagógicos.',
    icon: Video,
  },
  {
    title: 'PDFs y cuadernos',
    subtitle: 'Trabajo descargable',
    text: 'Materiales para estudiar, imprimir y adaptar cuando estén disponibles.',
    icon: FileStack,
  },
];

const paths = [
  {
    audience: 'Soy docente',
    title: 'Mirar el aula como territorio',
    text: 'Encuentra rutas, preguntas y recursos para mirar el aula como territorio de posibilidad.',
    action: 'Explorar recursos',
    href: '#tienda',
    icon: BookOpen,
  },
  {
    audience: 'Soy madre, padre o tutor',
    title: 'Acompañar sin miedo',
    text: 'Acompaña sin miedo, sin culpa y con herramientas sencillas para fortalecer el aprendizaje.',
    action: 'Ver ruta familias',
    href: '#escuela',
    icon: Home,
  },
  {
    audience: 'Soy estudiante o joven curioso',
    title: 'Pensar mi lugar en el mundo',
    text: 'Encuentra ideas para pensar tu vida, tu escuela y tu lugar en el mundo.',
    action: 'Empezar ruta',
    href: '#escuela',
    icon: Sparkles,
  },
];

function ExternalLink({ href, children, className, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}

function SmartLink({ href, children, className, label, external = false }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
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

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <Hero />
      <QuickExplore />
      <About />
      <Manifesto />
      <Pillars />
      <Projects />
      <Store />
      <SchoolSection />
      <StartHere />
      <Invitation />
      <Footer />
      <BackToTop />
    </main>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mx-auto max-w-7xl border-b border-earth/20 pb-4 text-sm">
      <div className="flex items-center justify-between gap-4">
        <a className="font-serif text-xl text-forest" href="#inicio" aria-label="Ecos de Emancipación">
          Ecos de Emancipación
        </a>
        <div className="hidden items-center gap-5 text-earth lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-earth/25 text-forest lg:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 grid gap-2 rounded-2xl border border-earth/15 bg-cream/95 p-3 shadow-soft lg:hidden">
          {navItems.map((item) => (
            <a key={item.href} className="rounded-xl px-4 py-3 text-forest" href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate px-5 py-5 sm:px-10 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(196,154,74,0.2),transparent_28%),linear-gradient(145deg,#F4EFE7_0%,#E8DCCB_52%,#d7c4ab_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-cream to-transparent" />
      <Header />

      <div className="mx-auto grid max-w-7xl items-center gap-7 pb-8 pt-8 sm:pb-12 sm:pt-14 lg:min-h-[74vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <p className="mb-4 max-w-xl text-xs font-semibold uppercase tracking-[0.22em] text-terracotta sm:text-sm">
            Educación y conciencia crítica
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] text-forest sm:text-6xl lg:text-8xl">
            Ecos de Emancipación
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-earth sm:text-xl sm:leading-8">
            Educación, conciencia crítica y esperanza para docentes, familias y jóvenes.
          </p>
          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
            <ExternalLink className="btn-primary" href={LINKS.youtube} label="Seguir en YouTube">
              <Youtube size={18} aria-hidden="true" />
              Seguir en YouTube
            </ExternalLink>
            <ExternalLink className="btn-secondary" href={LINKS.whatsapp} label="Escribirme por WhatsApp">
              <MessageCircle size={18} aria-hidden="true" />
              Escribirme por WhatsApp
            </ExternalLink>
          </div>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest" href="#explora">
            Explorar
            <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-md rounded-[1.6rem] border border-cream/70 bg-cream/35 p-4 shadow-soft backdrop-blur-sm lg:max-w-none">
          <div className="rounded-[1.2rem] border border-earth/15 bg-field-pattern p-4">
            <div className="rounded-[0.95rem] bg-forest px-5 py-6 text-cream sm:px-7 sm:py-8">
              <div className="flex items-center justify-between">
                <Leaf className="text-gold" size={30} aria-hidden="true" />
                <span className="rounded-full border border-gold/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  Portal vivo
                </span>
              </div>
              <p className="mt-8 font-serif text-2xl leading-tight sm:text-3xl">
                Aula, comunidad y palabra para imaginar otras formas de aprender.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-2 text-center text-xs text-cream/78">
                <span className="rounded-full bg-cream/10 px-2 py-2">Docentes</span>
                <span className="rounded-full bg-cream/10 px-2 py-2">Familias</span>
                <span className="rounded-full bg-cream/10 px-2 py-2">Jóvenes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickExplore() {
  return (
    <section id="explora" className="px-5 pb-12 pt-4 sm:px-10 lg:px-14 lg:pb-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="section-kicker">Explora el proyecto</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-forest sm:text-4xl">Elige por dónde entrar.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="rounded-[1.5rem] bg-forest p-5 text-cream shadow-soft">
          <div className="flex min-h-[18rem] flex-col justify-between rounded-[1rem] border border-cream/15 bg-cream/[0.06] p-6">
            <UserRound className="text-gold" size={34} aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Retrato editorial próximamente</p>
              <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">Maestra Kandy Partemia González Torreblanca</h2>
            </div>
          </div>
        </div>
        <div>
          <p className="section-kicker">Quién soy</p>
          <h3 className="section-title">Una voz pedagógica con raíz comunitaria.</h3>
          <p className="mt-6 max-w-3xl leading-8 text-earth">
            Soy Kandy Partemia González Torreblanca, maestra de telesecundaria, escritora y creadora de Ecos de Emancipación. Desde el aula, la comunidad y la vida cotidiana, construyo una propuesta para acompañar a docentes, familias y jóvenes en el desarrollo de conciencia, dignidad y esperanza.
          </p>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifiesto" className="section-pad bg-clay/45">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <div className="section-icon">
            <Leaf size={25} aria-hidden="true" />
          </div>
          <p className="section-kicker">Manifiesto breve</p>
          <h2 className="section-title">Educar es escuchar lo que el territorio ya sabe.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'La educación es un acto de conciencia, no solo transmisión de contenidos.',
            'La escuela puede ser territorio de posibilidad cuando escucha la vida cotidiana.',
            'El sujeto está en el centro: piensa, recuerda, decide y transforma.',
            'La esperanza se vuelve real cuando se comparte en comunidad.',
          ].map((item) => (
            <p key={item} className="rounded-2xl bg-cream/75 p-5 leading-7 text-earth shadow-soft">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pilares" className="section-pad bg-forest text-cream">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-gold">Pilares</p>
          <h2 className="section-title text-cream">Raíces para sostener una pedagogía esperanzadora.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-6">
              <Icon className="text-gold" size={28} aria-hidden="true" />
              <h3 className="mt-6 font-serif text-2xl">{title}</h3>
              <p className="mt-3 leading-7 text-cream/78">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
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
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(({ title, text, status, action, href, external, icon: Icon }) => (
            <article key={title} className="compact-card">
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
      </div>
    </section>
  );
}

function Store() {
  const featured = storeItems.slice(0, 3);

  return (
    <section id="tienda" className="section-pad bg-clay">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="section-icon">
              <ShoppingBag size={25} aria-hidden="true" />
            </div>
            <p className="section-kicker text-forest">Tienda docente</p>
            <h2 className="section-title">Recursos para la práctica educativa.</h2>
            <p className="mt-5 leading-8 text-earth">
              Materiales, cuadernos, guías, tarjetas y herramientas para acompañar la práctica docente desde la conciencia, la ternura y el pensamiento crítico.
            </p>
            <ExternalLink className="btn-primary mt-7" href={LINKS.whatsapp} label="Solicitar información sobre tienda docente">
              Solicitar información
              <MessageCircle size={18} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map(({ title, text, icon: Icon }) => (
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
        </div>
        <div id="recursos" className="mt-8 rounded-2xl border border-earth/15 bg-cream/55 p-5">
          <p className="font-serif text-2xl text-forest">Más recursos en preparación</p>
          <p className="mt-2 leading-7 text-earth">
            Cartas de dilemas, guías para familias y materiales imprimibles se integrarán cuando estén listos para compartirse públicamente.
          </p>
        </div>
      </div>
    </section>
  );
}

function SchoolSection() {
  const featured = schoolModules.slice(0, 3);

  return (
    <section id="escuela" className="section-pad bg-forest text-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
              <School size={26} aria-hidden="true" />
            </div>
            <p className="section-kicker mt-7 text-gold">Escuela Ecos de Emancipación</p>
            <h2 className="section-title text-cream">Formación digital en preparación.</h2>
            <p className="mt-5 leading-8 text-cream/78">
              Una futura escuela digital para profundizar en pedagogía del sujeto, conciencia crítica, vida cotidiana, recursos docentes y formación para familias.
            </p>
            <div className="mt-7 rounded-2xl border border-gold/25 bg-cream/[0.06] p-5">
              <div className="flex items-start gap-4">
                <KeyRound className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
                <p className="leading-7 text-cream/82">
                  Área exclusiva en construcción. Más adelante contará con acceso privado a videos, PDFs y materiales.
                </p>
              </div>
            </div>
            <ExternalLink className="btn-gold mt-7" href={LINKS.whatsapp} label="Solicitar acceso a Escuela Ecos de Emancipación">
              Solicitar acceso
              <DoorOpen size={18} aria-hidden="true" />
            </ExternalLink>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map(({ title, subtitle, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-6">
                <Icon className="text-gold" size={28} aria-hidden="true" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-gold">En preparación</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-1 font-semibold text-cream/85">{subtitle}</p>
                <p className="mt-3 leading-7 text-cream/76">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StartHere() {
  return (
    <section id="empieza" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Empieza aquí</p>
          <h2 className="section-title">Tres rutas para actuar hoy.</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {paths.map(({ audience, title, text, action, href, icon: Icon }) => (
            <article key={audience} className="compact-card">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-terracotta">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <span className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-forest">{audience}</span>
              </div>
              <h3 className="mt-6 font-serif text-3xl leading-tight text-forest">{title}</h3>
              <p className="mt-4 leading-8 text-earth">{text}</p>
              <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={href}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section id="contacto" className="px-5 py-14 sm:px-10 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-7xl rounded-[1.6rem] bg-forest px-6 py-10 text-center text-cream shadow-soft sm:px-12 sm:py-14">
        <HandHeart className="mx-auto text-gold" size={38} aria-hidden="true" />
        <h2 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">
          Si esta propuesta resonó contigo, compártela.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-cream/78">
          Compártela con una maestra, una madre, un padre o una persona joven que necesite recordar que la educación todavía puede ser territorio de esperanza.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ExternalLink className="btn-light" href={LINKS.youtube} label="Seguir en YouTube">
            <Youtube size={18} aria-hidden="true" />
            Seguir en YouTube
          </ExternalLink>
          <ExternalLink className="btn-gold" href={LINKS.whatsapp} label="Solicitar información">
            <MessageCircle size={18} aria-hidden="true" />
            Solicitar información
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
    <footer className="border-t border-earth/20 px-5 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 text-sm text-earth lg:flex-row lg:items-center lg:justify-between">
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
        </div>
      </div>
    </footer>
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
