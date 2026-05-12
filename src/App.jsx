import {
  ArrowUpRight,
  BookOpenText,
  Feather,
  HandHeart,
  Landmark,
  Leaf,
  Megaphone,
  Sprout,
  UsersRound,
} from 'lucide-react';

const pillars = [
  {
    title: 'Memoria viva',
    text: 'Honrar las historias comunitarias, las lenguas, los territorios y los saberes que sostienen la dignidad de los pueblos.',
    icon: Landmark,
  },
  {
    title: 'Pedagogía con raíz',
    text: 'Diseñar experiencias educativas sensibles al contexto, con pensamiento crítico, afecto, investigación y participación.',
    icon: Sprout,
  },
  {
    title: 'Cultura para emancipar',
    text: 'Abrir espacios donde la lectura, el arte y la palabra pública ayuden a imaginar vidas más justas y compartidas.',
    icon: Feather,
  },
];

const projects = [
  'Laboratorios de lectura comunitaria',
  'Acompañamiento a docentes con enfoque territorial',
  'Círculos de diálogo para familias y juventudes',
  'Materiales pedagógicos para memoria, identidad y cuidado',
];

const paths = [
  {
    audience: 'Docentes',
    title: 'Diseñar una clase con sentido comunitario',
    text: 'Parte de una pregunta del territorio, conecta con una lectura o testimonio y cierra con una acción que dialogue con la vida cotidiana.',
  },
  {
    audience: 'Familias',
    title: 'Conversar desde la memoria',
    text: 'Recupera historias de casa, oficios, fiestas, comidas, duelos y aprendizajes para construir vínculos entre generaciones.',
  },
  {
    audience: 'Jóvenes',
    title: 'Tomar la palabra',
    text: 'Escribe, graba, dibuja o conversa sobre aquello que deseas transformar en tu escuela, barrio o comunidad.',
  },
];

const contents = [
  'Ensayo breve por publicar',
  'Guía pedagógica editable',
  'Bitácora de campo',
];

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <Hero />
      <Manifesto />
      <Pillars />
      <Projects />
      <StartHere />
      <LatestContent />
      <Invitation />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] px-6 py-6 sm:px-10 lg:px-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(197,145,83,0.22),transparent_30%),linear-gradient(145deg,#f8efdF_0%,#f1dfc3_42%,#d9b98f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-cream to-transparent" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-earth/20 pb-5 text-sm">
        <a className="font-serif text-xl text-forest" href="#inicio" aria-label="Ecos de Emancipación">
          Ecos de Emancipación
        </a>
        <div className="hidden items-center gap-6 text-earth md:flex">
          <a href="#manifiesto">Manifiesto</a>
          <a href="#pilares">Pilares</a>
          <a href="#empieza">Empieza aquí</a>
        </div>
      </nav>

      <div id="inicio" className="mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:pt-28">
        <div>
          <p className="mb-6 max-w-xl text-sm font-semibold uppercase tracking-[0.28em] text-terracotta">
            Educación, cultura y pedagogía situada
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-forest sm:text-6xl lg:text-8xl">
            Ecos de Emancipación
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-earth sm:text-xl">
            Una propuesta de la Maestra Kandy Partemia González Torreblanca para sembrar pensamiento crítico, memoria comunitaria y esperanza educativa desde la palabra, el territorio y el cuidado.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-ink focus:outline-none focus:ring-4 focus:ring-forest/20" href="#empieza">
              Empezar recorrido
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="inline-flex items-center justify-center rounded-full border border-earth/30 px-6 py-3 text-sm font-semibold text-forest transition hover:border-forest hover:bg-cream/60 focus:outline-none focus:ring-4 focus:ring-earth/15" href="#proyectos">
              Ver proyectos vivos
            </a>
          </div>
        </div>

        <div className="relative min-h-[420px] rounded-[2rem] border border-cream/70 bg-cream/35 p-5 shadow-soft backdrop-blur-sm">
          <div className="h-full rounded-[1.5rem] border border-earth/15 bg-field-pattern p-6">
            <div className="flex h-full flex-col justify-between rounded-[1.1rem] bg-forest/95 p-7 text-cream">
              <Leaf className="text-gold" size={34} aria-hidden="true" />
              <div>
                <p className="font-serif text-3xl leading-tight">
                  La escuela también puede ser milpa: tierra compartida, cuidado diario y cosecha colectiva.
                </p>
                <div className="mt-8 h-px bg-gold/50" />
                <p className="mt-5 text-sm leading-6 text-cream/80">
                  Este sitio está preparado para crecer con textos, materiales, enlaces y publicaciones futuras sin depender de backend ni servicios de pago.
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
    <section id="manifiesto" className="px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-kicker">Manifiesto breve</p>
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
          <h2 className="section-title text-cream">Tres raíces para sostener una pedagogía esperanzadora.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
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
            Esta sección puede actualizarse con nombres, fechas, materiales descargables o enlaces reales cuando estén disponibles. Por ahora funciona como mapa editorial del trabajo por venir.
          </p>
        </div>
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <article key={project} className="flex gap-5 border-t border-earth/20 py-6">
              <span className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-serif text-2xl text-forest">{project}</h3>
                <p className="mt-2 leading-7 text-earth">
                  Espacio preparado para describir objetivos, participantes, resultados y próximos pasos.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartHere() {
  return (
    <section id="empieza" className="bg-clay px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-forest">Empieza aquí</p>
          <h2 className="section-title">Tres rutas para abrir conversación y acción.</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {paths.map((item) => (
            <article key={item.audience} className="rounded-2xl bg-cream p-7 shadow-soft">
              <span className="inline-flex rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-forest">
                {item.audience}
              </span>
              <h3 className="mt-7 font-serif text-3xl leading-tight text-forest">{item.title}</h3>
              <p className="mt-5 leading-8 text-earth">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestContent() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-earth/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Últimos contenidos</p>
            <h2 className="section-title">Una bandeja editorial lista para editar después.</h2>
          </div>
          <BookOpenText className="text-terracotta" size={42} aria-hidden="true" />
        </div>
        <div className="grid gap-5 pt-8 md:grid-cols-3">
          {contents.map((content) => (
            <article key={content} className="border-l-4 border-terracotta bg-white/45 p-6">
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
    <section className="px-6 pb-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-forest px-7 py-14 text-center text-cream shadow-soft sm:px-12">
        <HandHeart className="mx-auto text-gold" size={40} aria-hidden="true" />
        <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">
          Que cada aula encuentre una forma digna de escuchar, recordar y transformar.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl leading-8 text-cream/78">
          Esta invitación queda abierta para docentes, familias, jóvenes y comunidades que desean construir educación con raíz, belleza y responsabilidad colectiva.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-earth/20 px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-earth md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl text-forest">Ecos de Emancipación</p>
          <p className="mt-2">Propuesta educativa, cultural y pedagógica de la Maestra Kandy Partemia González Torreblanca.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#manifiesto" className="inline-flex items-center gap-2">
            <Megaphone size={16} aria-hidden="true" />
            Manifiesto
          </a>
          <a href="#empieza" className="inline-flex items-center gap-2">
            <UsersRound size={16} aria-hidden="true" />
            Empieza aquí
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
