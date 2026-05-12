import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Brain,
  CircleDot,
  ClipboardList,
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
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Tienda', href: '#tienda' },
  { label: 'Escuela', href: '#escuela' },
  { label: 'Empieza aquí', href: '#empieza' },
];

const pillars = [
  {
    title: 'Conciencia crítica',
    text: 'Mirar la realidad con preguntas honestas, sensibilidad histórica y deseo de transformar lo que duele.',
    icon: Eye,
  },
  {
    title: 'Pedagogía del sujeto',
    text: 'Reconocer a cada persona como historia viva, voz propia y posibilidad de pensamiento autónomo.',
    icon: Leaf,
  },
  {
    title: 'Vida cotidiana',
    text: 'Volver al aula, la casa, el barrio y la comunidad como lugares donde también se produce saber.',
    icon: Home,
  },
  {
    title: 'Comunidad y esperanza',
    text: 'Tejer vínculos que cuiden la palabra, sostengan la memoria y abran caminos colectivos.',
    icon: CircleDot,
  },
];

const projects = [
  {
    title: 'Canal de pensamiento pedagógico',
    text: 'Videos, conversaciones y reflexiones para acompañar la formación educativa desde una voz cercana.',
    icon: Play,
  },
  {
    title: 'Recursos docentes',
    text: 'Materiales editables, guías y herramientas para planear con conciencia, ternura y rigor.',
    icon: NotebookTabs,
  },
  {
    title: 'Familias que acompañan',
    text: 'Rutas de conversación para cuidar, orientar y escuchar sin miedo a niñas, niños y adolescentes.',
    icon: HandHeart,
  },
  {
    title: 'Filosofía para la vida diaria',
    text: 'Preguntas, lecturas y claves para pensar la escuela, la dignidad y el sentido de vivir juntos.',
    icon: Compass,
  },
  {
    title: 'Producciones poéticas',
    text: 'Escrituras, música y palabra sensible para nombrar la memoria, el territorio y la esperanza.',
    icon: Feather,
  },
];

const storeItems = [
  {
    title: 'Cuaderno de resonancias docentes',
    text: 'Bitácora para registrar preguntas, hallazgos, vínculos y decisiones pedagógicas.',
    icon: BookOpenText,
  },
  {
    title: 'Banco de preguntas para pensar',
    text: 'Tarjetas de indagación para abrir diálogo crítico en clase y comunidad.',
    icon: Brain,
  },
  {
    title: 'Mapas mentales y esquemas pedagógicos',
    text: 'Plantillas visuales para organizar ideas, rutas didácticas y proyectos.',
    icon: FileText,
  },
  {
    title: 'Cartas de dilemas para adolescentes',
    text: 'Situaciones breves para conversar sobre decisiones, cuidado y vida cotidiana.',
    icon: MessagesSquare,
  },
  {
    title: 'Guías para familias',
    text: 'Orientaciones claras para acompañar procesos escolares y emocionales desde casa.',
    icon: Home,
  },
  {
    title: 'Materiales imprimibles para aula',
    text: 'Recursos sencillos para activar lectura, escritura, memoria y participación.',
    icon: Package,
  },
];

const schoolModules = [
  {
    title: 'Ruta docente: Pedagogía del sujeto en el aula',
    text: 'Formación para mirar planeación, vínculo y evaluación desde la dignidad de cada estudiante.',
    icon: GraduationCap,
  },
  {
    title: 'Ruta familias: Acompañar sin miedo',
    text: 'Claves para conversar, orientar y sostener procesos educativos desde el cuidado.',
    icon: UsersRound,
  },
  {
    title: 'Ruta jóvenes: Pensar la vida y la escuela',
    text: 'Un espacio para preguntas, identidad, proyecto de vida y palabra propia.',
    icon: Sparkles,
  },
  {
    title: 'Biblioteca de materiales',
    text: 'Repositorio futuro de lecturas, fichas, guías y recursos de consulta.',
    icon: Library,
  },
  {
    title: 'Videos formativos',
    text: 'Sesiones y cápsulas para profundizar en temas pedagógicos y comunitarios.',
    icon: Video,
  },
  {
    title: 'PDFs y cuadernos de trabajo',
    text: 'Materiales descargables para estudiar, imprimir y adaptar cuando estén disponibles.',
    icon: FileStack,
  },
];

const paths = [
  {
    audience: 'Docentes',
    title: 'Diseñar una clase con sentido comunitario',
    text: 'Parte de una pregunta del territorio, conecta con una lectura o testimonio y cierra con una acción situada.',
    icon: BookOpen,
  },
  {
    audience: 'Familias',
    title: 'Conversar desde la memoria',
    text: 'Recupera historias de casa, oficios, fiestas y aprendizajes para construir vínculos entre generaciones.',
    icon: Home,
  },
  {
    audience: 'Jóvenes',
    title: 'Tomar la palabra',
    text: 'Escribe, graba, dibuja o conversa sobre aquello que deseas transformar en tu escuela o comunidad.',
    icon: Sparkles,
  },
];

const contents = [
  'Ensayo breve por publicar',
  'Guía pedagógica editable',
  'Bitácora de campo',
];

function ExternalLink({ href, children, className, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <Hero />
      <Manifesto />
      <Pillars />
      <Projects />
      <Store />
      <SchoolSection />
      <StartHere />
      <LatestContent />
      <Invitation />
      <Footer />
    </main>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mx-auto max-w-7xl border-b border-earth/20 pb-5 text-sm">
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
        <div className="mt-4 grid gap-2 rounded-2xl border border-earth/15 bg-cream/90 p-3 shadow-soft lg:hidden">
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
    <section className="relative isolate min-h-[92vh] px-6 py-6 sm:px-10 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(197,145,83,0.22),transparent_30%),linear-gradient(145deg,#f8efdf_0%,#f1dfc3_42%,#d9b98f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-cream to-transparent" />
      <Header />

      <div id="inicio" className="mx-auto grid max-w-7xl items-center gap-10 pb-20 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:pt-24">
        <div>
          <p className="mb-5 max-w-xl text-sm font-semibold uppercase tracking-[0.24em] text-terracotta">
            Educación, cultura y pedagogía situada
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-forest sm:text-6xl lg:text-8xl">
            Ecos de Emancipación
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-earth sm:text-xl">
            Una propuesta de la Maestra Kandy Partemia González Torreblanca para sembrar pensamiento crítico, memoria comunitaria y esperanza educativa desde la palabra, el territorio y el cuidado.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ExternalLink className="btn-primary" href={LINKS.youtube} label="Seguir en YouTube">
              <Youtube size={18} aria-hidden="true" />
              Seguir en YouTube
            </ExternalLink>
            <ExternalLink className="btn-secondary" href={LINKS.whatsapp} label="Escribirme por WhatsApp">
              <MessageCircle size={18} aria-hidden="true" />
              Escribirme por WhatsApp
            </ExternalLink>
          </div>
        </div>

        <div className="relative min-h-[360px] rounded-[2rem] border border-cream/70 bg-cream/35 p-5 shadow-soft backdrop-blur-sm sm:min-h-[420px]">
          <div className="h-full rounded-[1.5rem] border border-earth/15 bg-field-pattern p-6">
            <div className="flex h-full flex-col justify-between rounded-[1.1rem] bg-forest/95 p-7 text-cream">
              <Leaf className="text-gold" size={34} aria-hidden="true" />
              <div>
                <p className="font-serif text-3xl leading-tight">
                  La escuela también puede ser milpa: tierra compartida, cuidado diario y cosecha colectiva.
                </p>
                <div className="mt-8 h-px bg-gold/50" />
                <p className="mt-5 text-sm leading-6 text-cream/80">
                  Este sitio está preparado para crecer con tienda, escuela digital y contenidos futuros sin depender de backend ni servicios de pago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifiesto" className="px-6 py-22 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-terracotta">
          <Leaf size={25} aria-hidden="true" />
        </div>
        <p className="section-kicker mt-7">Manifiesto breve</p>
        <h2 className="section-title">Educar es escuchar lo que el territorio ya sabe y convertirlo en posibilidad.</h2>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-earth">
          Ecos de Emancipación nace para acompañar procesos educativos que no separen el aula de la comunidad. Cree en la fuerza de la memoria, en la ternura como práctica pública y en la cultura como camino para nombrar injusticias sin renunciar a la alegría de transformarlas.
        </p>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pilares" className="bg-forest px-6 py-24 text-cream sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-gold">Pilares</p>
          <h2 className="section-title text-cream">Cuatro raíces para sostener una pedagogía esperanzadora.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-7">
              <Icon className="text-gold" size={30} aria-hidden="true" />
              <h3 className="mt-8 font-serif text-2xl">{title}</h3>
              <p className="mt-4 leading-7 text-cream/78">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="section-kicker">Proyectos vivos</p>
          <h2 className="section-title">Iniciativas listas para crecer con la comunidad.</h2>
          <p className="mt-6 leading-8 text-earth">
            Esta sección puede actualizarse con nombres, fechas, materiales y enlaces reales cuando estén disponibles. Por ahora funciona como mapa editorial del trabajo por venir.
          </p>
        </div>
        <div className="grid gap-4">
          {projects.map(({ title, text, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 border-t border-earth/20 py-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/18 text-terracotta">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <span className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 font-serif text-2xl text-forest">{title}</h3>
                <p className="mt-2 leading-7 text-earth">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store() {
  return (
    <section id="tienda" className="bg-clay px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="section-icon">
            <ShoppingBag size={25} aria-hidden="true" />
          </div>
          <p className="section-kicker text-forest">Tienda de recursos docentes</p>
          <h2 className="section-title">Un catálogo futuro para acompañar la práctica docente.</h2>
          <p className="mt-6 max-w-3xl leading-8 text-earth">
            Un espacio para reunir materiales, cuadernos, guías, tarjetas, recursos imprimibles y herramientas que acompañen la práctica docente desde la conciencia, la ternura y el pensamiento crítico.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {storeItems.map(({ title, text, icon: Icon }) => (
            <article key={title} className="catalog-card">
              <div className="flex items-start justify-between gap-4">
                <Icon className="text-terracotta" size={28} aria-hidden="true" />
                <span className="status-pill">
                  <Tag size={14} aria-hidden="true" />
                  Próximamente
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-4 leading-7 text-earth">{text}</p>
              <ExternalLink className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={LINKS.whatsapp} label={`Solicitar información sobre ${title}`}>
                Solicitar información
                <ArrowUpRight size={16} aria-hidden="true" />
              </ExternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolSection() {
  return (
    <section id="escuela" className="bg-forest px-6 py-24 text-cream sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
              <School size={26} aria-hidden="true" />
            </div>
            <p className="section-kicker mt-7 text-gold">Escuela Ecos de Emancipación</p>
            <h2 className="section-title text-cream">Un espacio digital en preparación para estudiar con profundidad.</h2>
            <p className="mt-6 leading-8 text-cream/78">
              Una futura escuela digital para profundizar en pedagogía del sujeto, conciencia crítica, vida cotidiana, recursos docentes y formación para familias.
            </p>
            <div className="mt-8 rounded-2xl border border-gold/25 bg-cream/[0.06] p-6">
              <div className="flex items-start gap-4">
                <KeyRound className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
                <p className="leading-7 text-cream/82">
                  Área exclusiva en construcción. Más adelante este espacio contará con acceso privado para materiales, videos y PDFs. Por ahora puedes solicitar información por WhatsApp.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {schoolModules.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-6">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="text-gold" size={28} aria-hidden="true" />
                  <span className="inline-flex rounded-full border border-gold/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                    En preparación
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-4 leading-7 text-cream/76">{text}</p>
                <ExternalLink className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold" href={LINKS.whatsapp} label={`Solicitar acceso a ${title}`}>
                  Solicitar acceso
                  <DoorOpen size={16} aria-hidden="true" />
                </ExternalLink>
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
    <section id="empieza" className="px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker">Empieza aquí</p>
          <h2 className="section-title">Tres rutas para abrir conversación y acción.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {paths.map(({ audience, title, text, icon: Icon }) => (
            <article key={audience} className="rounded-2xl bg-white/50 p-7 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-terracotta">
                <Icon size={23} aria-hidden="true" />
              </div>
              <span className="mt-6 inline-flex rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-forest">
                {audience}
              </span>
              <h3 className="mt-6 font-serif text-3xl leading-tight text-forest">{title}</h3>
              <p className="mt-5 leading-8 text-earth">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestContent() {
  return (
    <section className="bg-clay/55 px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-earth/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Últimos contenidos</p>
            <h2 className="section-title">Una bandeja editorial lista para editar después.</h2>
          </div>
          <ClipboardList className="text-terracotta" size={42} aria-hidden="true" />
        </div>
        <div className="grid gap-5 pt-8 md:grid-cols-3">
          {contents.map((content) => (
            <article key={content} className="border-l-4 border-terracotta bg-cream/65 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-earth">Próximamente</p>
              <h3 className="mt-4 font-serif text-2xl text-forest">{content}</h3>
              <p className="mt-4 leading-7 text-earth">
                Reemplaza este texto con una síntesis, fecha, autoría o enlace interno cuando el contenido esté listo.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-forest px-7 py-14 text-center text-cream shadow-soft sm:px-12">
        <HandHeart className="mx-auto text-gold" size={40} aria-hidden="true" />
        <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">
          Que cada aula encuentre una forma digna de escuchar, recordar y transformar.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl leading-8 text-cream/78">
          Esta invitación queda abierta para docentes, familias, jóvenes y comunidades que desean construir educación con raíz, belleza y responsabilidad colectiva.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
    <footer className="border-t border-earth/20 px-6 py-10 sm:px-10 lg:px-14">
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

export default App;
