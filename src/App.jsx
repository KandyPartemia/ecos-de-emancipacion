import { lazy, Suspense, useEffect, useState } from 'react';
import BuyMeACoffeeLink from './components/BuyMeACoffeeLink';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Brain,
  CheckCircle2,
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
  map: '/images/ecos-universo-mapa-cognitologia.png',
};

const navItems = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Manifiesto', href: '/manifiesto' },
  { label: 'Resonancias', href: '/resonancias' },
  { label: 'Pilares', href: '/pilares' },
  { label: 'Cognitología', href: '/cognitologia' },
  { label: 'Escuela', href: '/escuela' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Universo musical', href: '/universo-musical' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Empieza Aquí', href: '/empieza-aqui', cta: true },
];

const mobileNavItems = navItems;

const quickLinks = [
  { title: 'Inicio', href: '/#inicio', icon: Home },
  { title: 'Manifiesto', href: '/manifiesto', icon: Leaf },
  { title: 'Resonancias', href: '/resonancias', icon: BookOpenText },
  { title: 'Pilares', href: '/pilares', icon: CircleDot },
  { title: 'Cognitología', href: '/cognitologia', icon: Brain },
  { title: 'Escuela', href: '/escuela', icon: School },
  { title: 'Recursos', href: '/recursos', icon: NotebookTabs },
  { title: 'Universo musical', href: '/universo-musical', icon: Music },
  { title: 'Tienda', href: '/tienda', icon: ShoppingBag },
  { title: 'Empieza Aquí', href: '/empieza-aqui', icon: DoorOpen },
];

const universeNodes = [
  {
    id: 'inicio',
    title: 'Inicio',
    text: 'Entrada general al universo Ecos de Emancipación.',
    href: '/#inicio',
    icon: Home,
    position: 'left-[50%] top-[8%] -translate-x-1/2',
  },
  {
    id: 'manifiesto',
    title: 'Manifiesto',
    text: 'Declaración ética, espiritual y pedagógica del proyecto.',
    href: '/manifiesto',
    icon: Leaf,
    position: 'left-[75%] top-[16%] -translate-x-1/2',
  },
  {
    id: 'resonancias',
    title: 'Resonancias',
    text: 'Reflexiones, relatos, artículos poéticos, textos pedagógicos y meditaciones escritas para despertar conciencia.',
    href: '/resonancias',
    icon: BookOpenText,
    position: 'left-[90%] top-[34%] -translate-x-1/2',
  },
  {
    id: 'cognitologia',
    title: 'Cognitología',
    text: 'Entrada teórica y práctica para mirar cómo pensamos, sentimos, aprendemos y decidimos en la vida cotidiana.',
    href: '/cognitologia',
    icon: Brain,
    position: 'left-[90%] top-[58%] -translate-x-1/2',
  },
  {
    id: 'pilares',
    title: 'Pilares',
    text: 'Fundamentos del proyecto: conciencia, emancipación, espiritualidad, pedagogía, amor, justicia y pensamiento crítico.',
    href: '/pilares',
    icon: CircleDot,
    position: 'left-[78%] top-[78%] -translate-x-1/2',
  },
  {
    id: 'escuela',
    title: 'Escuela',
    text: 'Talleres, cursos, rutas formativas, comunidad de aprendizaje y propuestas pedagógicas.',
    href: '/escuela',
    icon: School,
    position: 'left-[62%] top-[88%] -translate-x-1/2',
  },
  {
    id: 'recursos',
    title: 'Recursos',
    text: 'Guías, cuadernos, audios, lecturas, materiales descargables y herramientas para acompañar procesos de transformación.',
    href: '/recursos',
    icon: NotebookTabs,
    position: 'left-[38%] top-[88%] -translate-x-1/2',
  },
  {
    id: 'universo-musical',
    title: 'Universo musical',
    text: 'Canciones, álbumes y proyectos sonoros vinculados a la conciencia, la esperanza, la plenitud y la transformación interior.',
    href: '/universo-musical',
    icon: Music,
    position: 'left-[22%] top-[78%] -translate-x-1/2',
  },
  {
    id: 'tienda',
    title: 'Tienda',
    text: 'Libros, cuadernos, recursos digitales, materiales formativos y productos del ecosistema.',
    href: '/tienda',
    icon: ShoppingBag,
    position: 'left-[10%] top-[58%] -translate-x-1/2',
  },
  {
    id: 'empieza',
    title: 'Empieza Aquí',
    text: 'Ruta inicial para quienes llegan por primera vez y quieren comprender el corazón del proyecto.',
    href: '/empieza-aqui',
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
  cognitologia: {
    image: '/images/ecos-cognitologia-visual.png',
    assetName: 'ecos-cognitologia-visual.png',
    label: 'Pensamiento y conciencia',
    tone: 'cognitologia',
    alt: 'Imagen simbólica de la sección Cognitología de Ecos de Emancipación',
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

const manifestoConvictions = [
  { title: 'La persona no es un recipiente', principle: 'Cada sujeto llega con historia, saberes, preguntas, afectos y capacidad de decidir.', question: '¿Qué sabe ya esta persona y qué necesita poder nombrar?', action: 'Escuchar antes de explicar y recuperar una experiencia concreta.', href: '/resonancias', linkLabel: 'Abrir una resonancia', icon: UserRound },
  { title: 'La vida cotidiana también produce saber', principle: 'La casa, el aula y la comunidad son territorios legítimos para pensar y aprender.', question: '¿Dónde aparece este conocimiento en la vida real?', action: 'Relacionar el contenido con una decisión, un problema o una práctica cercana.', href: '/cognitologia', linkLabel: 'Conocer la Cognitología', icon: Home },
  { title: 'Educar implica formar criterio', principle: 'Comprender no basta: importa aprender a distinguir, relacionar, decidir y actuar con responsabilidad.', question: '¿Qué razones sostienen lo que pensamos y qué consecuencias tendría actuar así?', action: 'Abrir preguntas que permitan comparar perspectivas y revisar decisiones.', href: '/escuela', linkLabel: 'Explorar Escuela Ecos', icon: Brain },
  { title: 'La comunidad no es un decorado', principle: 'El aprendizaje cobra sentido cuando reconoce vínculos, necesidades y posibilidades compartidas.', question: '¿A quién beneficia lo que estamos aprendiendo y construyendo?', action: 'Convertir una evidencia escolar en conversación o aportación comunitaria.', href: '/recursos/caracoles-resonando', linkLabel: 'Abrir Caracoles Resonando', icon: UsersRound },
  { title: 'La esperanza se practica', principle: 'No es optimismo vacío: es reconocer límites y construir un siguiente paso posible.', question: '¿Qué acción pequeña, digna y revisable podemos realizar ahora?', action: 'Cerrar cada proceso con un acuerdo concreto y una fecha para volver a mirarlo.', href: '/empieza-aqui', linkLabel: 'Elegir una ruta', icon: Sparkles },
];

const pillarPractices = [
  { title: 'Conciencia crítica', meaning: 'Mirar la realidad sin naturalizar la desigualdad, el silencio ni las respuestas automáticas.', question: '¿Qué está ocurriendo, quiénes participan y qué voces todavía no escuchamos?', practice: 'Distinguir hechos, interpretaciones e intereses antes de tomar postura.', icon: Eye },
  { title: 'Pedagogía del sujeto', meaning: 'Reconocer a cada persona como presencia, historia, voz y posibilidad; nunca como dato o carencia.', question: '¿Qué necesita esta persona para comprender sin perder dignidad ni autonomía?', practice: 'Ofrecer opciones para participar, expresarse y mostrar lo aprendido.', icon: Leaf },
  { title: 'Vida cotidiana', meaning: 'Partir de experiencias concretas para que el conocimiento pueda relacionarse, discutirse y transformarse.', question: '¿Dónde toca este aprendizaje nuestra casa, escuela o comunidad?', practice: 'Situar la actividad en una experiencia cercana y recuperar sus saberes previos.', icon: BookOpen },
  { title: 'Comunidad y esperanza', meaning: 'Construir vínculos y decisiones compartidas capaces de cuidar la vida y abrir posibilidades reales.', question: '¿Qué podemos hacer juntos que no sería posible de manera aislada?', practice: 'Acordar una acción común, responsabilidades y una forma de valorar su efecto.', icon: HandHeart },
];

const projects = [
  {
    title: 'Ecos de Emancipación',
    text: 'Canal y casa editorial para pensar educación, comunidad y esperanza.',
    audience: 'Docentes, familias, jóvenes y comunidades',
    result: 'Ideas, conversaciones y recursos para mirar la educación con conciencia.',
    status: 'Activo',
    action: 'Ver canal',
    href: LINKS.youtube,
    external: true,
    icon: Play,
  },
  {
    title: 'Recursos para docentes',
    text: 'Cuadernos, preguntas y materiales para el aula como territorio vivo.',
    audience: 'Maestras, maestros y colectivos escolares',
    result: 'Materiales listos para orientar una experiencia, una conversación o una planeación.',
    status: 'Activo',
    action: 'Explorar recursos',
    href: '/recursos',
    icon: NotebookTabs,
  },
  {
    title: 'Familias que acompañan',
    text: 'Rutas sencillas para orientar sin miedo, culpa ni recetas vacías.',
    audience: 'Madres, padres, tutoras y personas acompañantes',
    result: 'Preguntas y acuerdos para acompañar sin sustituir la voz de niñas, niños y jóvenes.',
    status: 'Activo',
    action: 'Leer propuesta',
    href: '/familias',
    icon: Home,
  },
  {
    title: 'Jóvenes con criterio',
    text: 'Preguntas e ideas para pensar la vida, la escuela y el lugar propio.',
    audience: 'Adolescentes y jóvenes',
    result: 'Una ruta para nombrar lo que viven, formar criterio y expresar una postura propia.',
    status: 'Activo',
    action: 'Ver ruta',
    href: '/jovenes',
    icon: Sparkles,
  },
  {
    title: 'Producción poética y musical',
    text: 'Palabra sensible para nombrar memoria, territorio y transformación.',
    audience: 'Personas que desean escuchar, crear y conversar',
    result: 'Canciones y prácticas de escucha para transformar resonancia en expresión.',
    status: 'Activo',
    action: 'Explorar música',
    href: '/universo-musical',
    icon: Feather,
  },
  {
    title: 'Resonancias',
    text: 'Reflexiones, relatos, artículos poéticos y meditaciones escritas para despertar conciencia.',
    audience: 'Lectores, docentes, familias y comunidades',
    result: 'Textos y preguntas para detenerse, escribir y abrir una conversación significativa.',
    status: 'Activo',
    action: 'Leer resonancias',
    href: '/resonancias',
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
    title: 'Caracoles Resonando',
    text: 'Herramienta interactiva para consultar y trabajar Proyectos Académicos de Telesecundaria.',
    benefit: 'Ficha curricular, fuentes, mapa mental, autoevaluación y PDF imprimible.',
    action: 'Abrir herramienta',
    href: '/recursos/caracoles-resonando',
    icon: Shell,
  },
  {
    title: 'Empieza aquí',
    text: 'Recorridos iniciales para docentes, estudiantes y acompañantes que llegan por primera vez.',
    benefit: 'Una primera acción clara según la necesidad de cada persona.',
    action: 'Elegir ruta',
    href: '/empieza-aqui',
    icon: DoorOpen,
  },
  {
    title: 'Resonancias',
    text: 'Textos y preguntas para mirar la vida cotidiana, la escuela y la conciencia con otra calma.',
    benefit: 'Lecturas breves para conversar, escribir o volver a mirar una experiencia.',
    action: 'Leer resonancias',
    href: '/resonancias',
    icon: BookOpenText,
  },
];

const caracolesHighlights = [
  {
    title: 'Docentes',
    text: 'Consulta proyectos de 1.º, 2.º y 3.º, revisa campo formativo, ficha curricular, planeación, fuentes, mapa mental y formato imprimible.',
    icon: GraduationCap,
  },
  {
    title: 'Estudiantes',
    text: 'Trabaja el proyecto con mapa mental, autoevaluación formativa y experiencias interactivas cuando estén disponibles para el PA.',
    icon: Sparkles,
  },
  {
    title: 'Cognitología aplicada',
    text: 'Caracoles muestra cómo la propuesta se vuelve práctica: criterios de pensamiento, resonancias, evidencias y decisiones pedagógicas.',
    icon: Brain,
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
    title: 'Semillero de Conciencia',
    text: 'Guía docente para convertir una situación del aula en pregunta, diálogo, criterio y acuerdo.',
    icon: BookOpenText,
    href: '/descargables/guia-docente-semillero-conciencia.pdf',
  },
  {
    title: 'Acompañar sin vigilar',
    text: 'Guía para familias que desean estar presentes sin sustituir la voz ni la autonomía de las y los jóvenes.',
    icon: Home,
    href: '/descargables/guia-familias-acompanar-sin-vigilar.pdf',
  },
  {
    title: 'Mi resonancia',
    text: 'Bitácora para jóvenes que ayuda a reconocer aprendizajes, criterios y un siguiente paso posible.',
    icon: Sparkles,
    href: '/descargables/bitacora-jovenes-resonancia.pdf',
  },
];

const musicAudiencePaths = [
  {
    title: 'Para docentes',
    text: 'Abre o cierra una experiencia de aprendizaje con una escucha que ayude a nombrar emociones, ideas y preguntas.',
    prompt: '¿Qué palabra, imagen o pregunta deja esta canción para el trabajo del grupo?',
    icon: GraduationCap,
  },
  {
    title: 'Para jóvenes',
    text: 'Escucha con libertad, reconoce lo que te mueve y transforma esa resonancia en palabra, dibujo, movimiento o conversación.',
    prompt: '¿Qué parte de mi historia o de mi mundo cotidiano resuena aquí?',
    icon: Sparkles,
  },
  {
    title: 'Para familias',
    text: 'Comparte una canción sin convertirla en lección: escucha primero y conversa desde la curiosidad y el respeto.',
    prompt: '¿Qué recuerdo, esperanza o preocupación nos permite compartir esta música?',
    icon: UsersRound,
  },
];

const consciousListeningSteps = [
  ['Preparar', 'Elegir una canción y disponer un momento sin interrupciones.'],
  ['Escuchar', 'Atender letra, ritmo, silencios y emociones sin buscar una respuesta correcta.'],
  ['Resonar', 'Nombrar una palabra, imagen, recuerdo o pregunta que haya surgido.'],
  ['Crear', 'Convertir lo escuchado en una conversación, texto breve, dibujo, movimiento o acuerdo.'],
];

const schoolRoutes = [
  {
    title: 'Ruta docente',
    subtitle: 'Pedagogía del sujeto en el aula',
    text: 'Planeación, vínculo y evaluación desde la dignidad de cada estudiante.',
    icon: GraduationCap,
    href: '/escuela#practica-docente',
    action: 'Explorar ruta docente',
  },
  {
    title: 'Ruta familias',
    subtitle: 'Acompañar sin miedo',
    text: 'Claves para conversar, orientar y sostener desde el cuidado.',
    icon: UsersRound,
    href: '/familias',
    action: 'Explorar ruta para familias',
  },
  {
    title: 'Ruta jóvenes',
    subtitle: 'Pensar la vida y la escuela',
    text: 'Preguntas, identidad, proyecto de vida y palabra propia.',
    icon: Sparkles,
    href: '/jovenes',
    action: 'Explorar ruta para jóvenes',
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
    text: 'Guías, bitácoras, mapas y recursos pedagógicos para descargar y llevar a la práctica.',
    icon: ShoppingBag,
  },
  {
    title: 'Solicitar información',
    text: 'Un puente directo para preguntar por materiales, rutas, recursos o acompañamiento.',
    icon: MessageCircle,
    href: LINKS.whatsapp,
  },
];

const ethicalCatalog = [
  {
    status: 'Disponible',
    title: 'Biblioteca pública de Ecos',
    text: 'Guías, bitácoras y mapas breves preparados para descargar, compartir y usar con atribución.',
    detail: 'Acceso gratuito en PDF desde la ruta Recursos.',
    href: '/recursos',
    action: 'Explorar biblioteca',
    icon: BookOpen,
    tone: 'available',
  },
  {
    status: 'Disponible',
    title: 'Caracoles Resonando',
    text: 'Herramienta pública para consultar y acompañar Proyectos Académicos de Telesecundaria.',
    detail: 'Uso web gratuito; algunos recursos enlazan a fuentes oficiales externas.',
    href: '/recursos/caracoles-resonando',
    action: 'Abrir herramienta',
    icon: Shell,
    tone: 'available',
  },
  {
    status: 'Disponible',
    title: 'Manifiesto y pilares en acción',
    text: 'Síntesis para conversar sobre conciencia, dignidad, vida cotidiana, comunidad y esperanza.',
    detail: 'PDF breve para lectura personal, trabajo colegiado o conversación comunitaria.',
    href: '/descargables/manifiesto-y-pilares-en-accion.pdf',
    action: 'Descargar PDF',
    icon: Leaf,
    tone: 'available',
  },
];

const ethicalAccessPrinciples = [
  ['Parte de una necesidad', 'Nombra primero qué quieres comprender, acompañar, conversar o transformar.'],
  ['Piensa en las personas', 'Elige un material adecuado para la edad, el contexto y el momento de quienes participarán.'],
  ['Adáptalo con cuidado', 'Conserva el propósito del recurso y relaciona sus preguntas con la vida cotidiana de tu comunidad.'],
  ['Vuelve a mirar', 'Después de usarlo, reconoce qué ayudó, qué hizo falta y cuál podría ser el siguiente paso.'],
];

const schoolTeacherSituations = [
  {
    title: 'Planear sin vaciar el sentido',
    situation: 'Hay muchas actividades, pero el grupo no reconoce qué problema intenta comprender ni para qué creará el producto.',
    question: '¿Qué pregunta viva puede mantener unido el proyecto?',
    action: 'Nombrar propósito, situación, producto y criterio antes de distribuir tareas.',
    icon: Map,
  },
  {
    title: 'Escuchar sin perder la orientación',
    situation: 'Las voces del grupo abren experiencias valiosas, pero la conversación puede dispersarse o exponer de más.',
    question: '¿Cómo abrir palabra y, al mismo tiempo, cuidar el propósito y los límites?',
    action: 'Acordar una pregunta, tiempos de escucha y derecho a no compartir asuntos personales.',
    icon: MessageCircle,
  },
  {
    title: 'Evaluar sin reducir',
    situation: 'El producto está terminado, pero una calificación no muestra las decisiones, dificultades ni aprendizajes del proceso.',
    question: '¿Qué evidencia permite reconocer cómo cambió la comprensión?',
    action: 'Registrar un avance, una tensión, un criterio utilizado y un siguiente paso.',
    icon: CheckCircle2,
  },
  {
    title: 'Vincular comunidad sin usarla como escenario',
    situation: 'El proyecto menciona la comunidad, aunque sus saberes y decisiones no participan realmente en el trabajo.',
    question: '¿Quién conoce esta situación y cómo puede participar con dignidad?',
    action: 'Definir una escucha, devolución o colaboración concreta que no extraiga ni exhiba experiencias.',
    icon: UsersRound,
  },
];

const schoolArtifactUses = [
  ['Semillero de Conciencia', 'Cuando una inquietud necesita convertirse en pregunta compartida.', 'Pregunta fundante, primeras relaciones y acuerdo de indagación.'],
  ['Asamblea comunitaria', 'Cuando el grupo necesita escuchar voces y decidir con otras personas.', 'Acuerdos, responsabilidades y razones que sostienen una decisión.'],
  ['Contrato pedagógico', 'Cuando conviene hacer visibles compromisos y formas de cuidado.', 'Acuerdos revisables sobre participación, trabajo y convivencia.'],
  ['Diario de Resonancias', 'Cuando el proceso necesita registrar lo que mueve, pregunta o transforma.', 'Notas breves de comprensión, tensiones y nuevas preguntas.'],
  ['Mapa dialógico-dialéctico', 'Cuando hay ideas, voces o contradicciones que deben ponerse en relación.', 'Representación de relaciones, tensiones y posibilidades de acción.'],
  ['Perfiles en formación', 'Cuando se requiere mirar el desarrollo sin encasillar a la persona.', 'Descripción situada de avances, apoyos y posibilidades de crecimiento.'],
];

const schoolPracticeCycle = [
  ['Antes', 'Reconocer al grupo y el territorio; precisar propósito, pregunta, criterios, cuidados y evidencias posibles.'],
  ['Durante', 'Observar decisiones y relaciones; documentar voces sin invadir; ajustar apoyos y devolver preguntas.'],
  ['Después', 'Valorar proceso y producto; escuchar resonancias; comunicar hallazgos y elegir un siguiente paso revisable.'],
];

const paths = [
  {
    audience: 'Soy docente',
    title: 'Planear con sentido',
    question: '¿Cómo convierto un Proyecto Académico en una experiencia clara para mi grupo?',
    text: 'Encontrarás Caracoles Resonando, rutas de lectura, criterios de pensamiento y apoyos para planear sin perder el sentido pedagógico.',
    action: 'Abrir Caracoles Resonando',
    href: '/recursos/caracoles-resonando',
    icon: BookOpen,
  },
  {
    audience: 'Soy estudiante',
    title: 'Comprender mi proyecto',
    question: '¿Qué estoy aprendiendo y cómo puedo explicarlo con mis propias palabras?',
    text: 'Podrás entrar a Caracoles Resonando, revisar el proyecto, imprimir mapas mentales y usar autoevaluaciones para reconocer lo aprendido.',
    action: 'Ir a vista estudiante',
    href: '/recursos/caracoles-resonando',
    icon: Sparkles,
  },
  {
    audience: 'Acompaño a una o un joven',
    title: 'Acompañar sin sustituir',
    question: '¿Cómo puedo apoyar sin hacer la tarea por otra persona?',
    text: 'Encontrarás preguntas para conversar, recursos para cuidar el proceso y rutas para comprender mejor lo que ocurre en la escuela.',
    action: 'Ver ruta familias',
    href: '/familias',
    icon: Home,
  },
];

const startHereSteps = [
  ['Primero', 'Elige si vienes como docente, estudiante o acompañante.'],
  ['Después', 'Abre el recurso inicial sugerido y úsalo con una acción concreta.'],
  ['Luego', 'Regresa a Cognitología, Resonancias o Recursos para profundizar sin saturarte.'],
];

const cognitologyCriteria = [
  {
    title: 'Conciencia de clase social, histórica, ética y moral',
    text: 'Permite mirar la realidad como construcción histórica y social, con responsabilidad ante la dignidad propia y colectiva.',
  },
  {
    title: 'Criterio lógico',
    text: 'Ayuda a ordenar relaciones, causas, consecuencias y contradicciones para no aceptar cualquier explicación sin pensarla.',
  },
  {
    title: 'Criterio lógico-matemático',
    text: 'Permite leer cantidades, patrones, proporciones y evidencias numéricas en problemas de la vida cotidiana.',
  },
  {
    title: 'Criterio lógico-lingüístico',
    text: 'Cuida la palabra, la interpretación, el argumento y el sentido de lo que se nombra, se escucha y se comunica.',
  },
  {
    title: 'Criterio científico-metodológico',
    text: 'Invita a observar, preguntar, contrastar, registrar y sostener conclusiones con evidencias pertinentes.',
  },
];

const cognitologySituations = [
  {
    title: 'Una versión circula y todos la repiten',
    context: 'Aula, redes y vida cotidiana',
    question: '¿Qué sabemos, qué suponemos y qué relación causal estamos dando por cierta?',
    criterion: 'Criterio lógico',
    movement: 'Separar hechos, interpretaciones y consecuencias antes de tomar postura.',
    icon: CircleDot,
  },
  {
    title: 'Una cifra parece explicar a todo un grupo',
    context: 'Evaluación y comunidad',
    question: '¿Qué muestra el dato, qué deja fuera y con qué otras evidencias necesita dialogar?',
    criterion: 'Criterio lógico-matemático',
    movement: 'Leer proporciones y diferencias sin convertir un número en identidad.',
    icon: FileText,
  },
  {
    title: 'Una palabra hiere aunque parezca normal',
    context: 'Lenguaje y convivencia',
    question: '¿Qué significado sostiene esa expresión y qué relación produce entre las personas?',
    criterion: 'Criterio lógico-lingüístico',
    movement: 'Revisar el sentido, el contexto y las posibilidades de nombrar con mayor dignidad.',
    icon: MessageCircle,
  },
  {
    title: 'Una explicación convence, pero no tiene sustento',
    context: 'Proyecto y conocimiento',
    question: '¿Cómo podríamos observar, contrastar o registrar para saber si la afirmación se sostiene?',
    criterion: 'Criterio científico-metodológico',
    movement: 'Diseñar una indagación posible y reconocer también sus límites.',
    icon: Eye,
  },
  {
    title: 'Un problema se presenta como culpa individual',
    context: 'Historia y vida comunitaria',
    question: '¿Qué condiciones históricas, sociales y materiales participan en esta experiencia?',
    criterion: 'Conciencia social, histórica, ética y moral',
    movement: 'Relacionar responsabilidad personal, condiciones colectivas y posibilidades de transformación.',
    icon: UsersRound,
  },
];

const cognitologyCompass = [
  ['Percibir', 'Detenerse ante lo que ocurre sin reducirlo de inmediato a una etiqueta.'],
  ['Nombrar', 'Poner palabras a la experiencia y reconocer desde dónde la estamos interpretando.'],
  ['Relacionar', 'Buscar causas, condiciones, voces, datos, contradicciones y consecuencias.'],
  ['Discernir', 'Elegir los criterios que permiten comprender y decidir con responsabilidad.'],
  ['Actuar y resonar', 'Realizar una acción revisable y observar qué transforma en la realidad y en quien participa.'],
];

const pedagogicalArtifacts = [
  ['Semillero de Conciencia', 'Convertir preguntas, conflictos o inquietudes en posibilidades de pensamiento y acción.'],
  ['Asamblea comunitaria', 'Abrir palabra, escucha y acuerdos para decidir con otras personas.'],
  ['Contrato pedagógico', 'Nombrar compromisos, modos de aprender y responsabilidades compartidas.'],
  ['Diario de Resonancias', 'Registrar lo que una experiencia mueve, pregunta o transforma.'],
  ['Mapas mentales dialógicos-dialécticos', 'Organizar relaciones entre ideas, tensiones, voces y posibilidades de acción.'],
  ['Resonancias académicas', 'Vincular saber escolar con experiencia, comunidad y conciencia.'],
  ['Perfiles en formación', 'Mirar procesos de desarrollo sin encasillar ni reducir a las personas.'],
];

const resourceLibrary = [
  {
    title: 'Caracoles Resonando',
    audience: 'Docentes y estudiantes',
    theme: 'Proyectos Académicos de Telesecundaria',
    type: 'Herramienta web',
    format: 'Interactivo',
    access: 'Gratuito',
    href: '/recursos/caracoles-resonando',
    action: 'Abrir herramienta',
    icon: Shell,
  },
  {
    title: 'Empieza aquí',
    audience: 'Docentes, estudiantes y acompañantes',
    theme: 'Ruta inicial',
    type: 'Guía web',
    format: 'Página',
    access: 'Gratuito',
    href: '/empieza-aqui',
    action: 'Elegir entrada',
    icon: DoorOpen,
  },
  {
    title: 'Cognitología para la vida cotidiana',
    audience: 'Personas que quieren comprender la propuesta',
    theme: 'Fundamento pedagógico',
    type: 'Texto de orientación',
    format: 'Página',
    access: 'Gratuito',
    href: '/cognitologia',
    action: 'Leer fundamento',
    icon: Brain,
  },
  {
    title: 'Resonancias',
    audience: 'Docentes, familias y jóvenes',
    theme: 'Conciencia y vida cotidiana',
    type: 'Lectura breve',
    format: 'Página',
    access: 'Gratuito',
    href: '/resonancias',
    action: 'Leer resonancias',
    icon: BookOpenText,
  },
  {
    title: 'Universo musical',
    audience: 'Comunidad Ecos',
    theme: 'Acompañamiento sensible',
    type: 'Canales sonoros',
    format: 'Video y música',
    access: 'Gratuito',
    href: '/universo-musical',
    action: 'Escuchar',
    icon: Music,
  },
];

const publicDownloads = [
  {
    title: 'Guía docente: Semillero de Conciencia',
    text: 'Secuencia breve para convertir una situación del aula en pregunta, diálogo, criterio y acuerdo revisable.',
    audience: 'Docentes',
    href: '/descargables/guia-docente-semillero-conciencia.pdf',
    icon: GraduationCap,
  },
  {
    title: 'Guía para familias: acompañar sin vigilar',
    text: 'Preguntas cuidadas para estar presentes sin hacer la tarea por la persona joven ni convertir el aprendizaje en presión.',
    audience: 'Familias y acompañantes',
    href: '/descargables/guia-familias-acompanar-sin-vigilar.pdf',
    icon: Home,
  },
  {
    title: 'Bitácora joven: mi resonancia',
    text: 'Formato breve para reconocer qué se comprendió, qué criterio apareció y qué acción pequeña puede seguir.',
    audience: 'Estudiantes y jóvenes',
    href: '/descargables/bitacora-jovenes-resonancia.pdf',
    icon: Sparkles,
  },
  {
    title: 'Brújula cognitólogica para la vida cotidiana',
    text: 'Recorrido para percibir, nombrar, relacionar, discernir y actuar ante una experiencia concreta.',
    audience: 'Docentes, familias y jóvenes',
    href: '/descargables/brujula-cognitologica-vida-cotidiana.pdf',
    icon: Compass,
  },
  {
    title: 'Bitácora docente para una práctica con conciencia',
    text: 'Formato para preparar, observar y valorar una experiencia educativa sin reducirla al cumplimiento.',
    audience: 'Docentes',
    href: '/descargables/bitacora-docente-practica-con-conciencia.pdf',
    icon: NotebookTabs,
  },
  {
    title: 'Cuaderno breve de resonancias',
    text: 'Pausa guiada para detenerse, nombrar, relacionar, discernir y actuar ante una experiencia cotidiana.',
    audience: 'Comunidad Ecos',
    href: '/descargables/cuaderno-breve-de-resonancias.pdf',
    icon: Feather,
  },
  {
    title: 'Mapa para elegir un recurso de Ecos',
    text: 'Guía de orientación por necesidad, audiencia, momento de uso y siguiente paso sugerido.',
    audience: 'Todas las audiencias',
    href: '/descargables/mapa-para-elegir-recurso-ecos.pdf',
    icon: Map,
  },
  {
    title: 'Manifiesto y pilares en acción',
    text: 'Principios, preguntas y acciones breves para llevar la propuesta de Ecos a la práctica cotidiana.',
    audience: 'Docentes, familias y comunidad educativa',
    href: '/descargables/manifiesto-y-pilares-en-accion.pdf',
    icon: Leaf,
  },
];

const resourceNeedPaths = [
  {
    title: 'Necesito planear un Proyecto Académico',
    text: 'Consulta ficha curricular, estrategia detonadora, fuentes, mapa mental, evaluación y formato imprimible.',
    destination: 'Caracoles Resonando',
    href: '/recursos/caracoles-resonando',
    action: 'Abrir herramienta',
    icon: Shell,
  },
  {
    title: 'Necesito volver a mirar mi práctica',
    text: 'Prepara, observa y valora una experiencia sin convertir la bitácora en vigilancia del alumnado.',
    destination: 'Escuela Ecos',
    href: '/escuela',
    action: 'Ir a Escuela Ecos',
    icon: GraduationCap,
  },
  {
    title: 'Necesito acompañar sin controlar',
    text: 'Encuentra preguntas y acuerdos para tareas, calificaciones, pantallas y comunicación con la escuela.',
    destination: 'Ruta Familias',
    href: '/familias',
    action: 'Abrir ruta Familias',
    icon: HandHeart,
  },
  {
    title: 'Necesito pensar una decisión',
    text: 'Relaciona lo que importa, la información disponible, las consecuencias y una acción revisable.',
    destination: 'Ruta Jóvenes',
    href: '/jovenes',
    action: 'Abrir ruta Jóvenes',
    icon: Compass,
  },
  {
    title: 'Necesito una pregunta que abra conciencia',
    text: 'Parte de una experiencia cotidiana y conviértela en palabra, relación, criterio y acción posible.',
    destination: 'Resonancias',
    href: '/resonancias',
    action: 'Leer Resonancias',
    icon: BookOpenText,
  },
  {
    title: 'Necesito comprender el fundamento',
    text: 'Conoce la Cognitología, sus criterios de pensamiento, su brújula y sus límites pedagógicos.',
    destination: 'Cognitología',
    href: '/cognitologia',
    action: 'Comprender la propuesta',
    icon: Brain,
  },
];

const resonanceSeeds = [
  ['Para el aula', '¿Qué actividad estamos cumpliendo y qué pregunta viva podría abrirse desde ella?'],
  ['Para la vida cotidiana', '¿Qué palabra, gesto o decisión de hoy merece ser pensada con más cuidado?'],
  ['Para la comunidad', '¿Qué problema se repite como si fuera individual, pero tiene historia, condiciones y relaciones?'],
];

const resonanceThemes = [
  {
    title: 'Cuando enseñar también cansa',
    audience: 'Docentes',
    question: '¿Qué parte del cansancio viene de la tarea y qué parte de sostener en silencio lo que la escuela no alcanza a nombrar?',
    action: 'Distinguir lo urgente de lo importante y elegir una carga que pueda compartirse.',
    icon: GraduationCap,
  },
  {
    title: 'La voz joven no es ruido',
    audience: 'Estudiantes y jóvenes',
    question: '¿Qué cambia cuando una persona joven puede explicar lo que piensa sin tener que defender primero su derecho a hablar?',
    action: 'Abrir un turno de palabra sin interrupciones y devolver una pregunta, no un juicio.',
    icon: Mic2,
  },
  {
    title: 'Acompañar sin ocupar el lugar del otro',
    audience: 'Familias',
    question: '¿Cómo estar cerca sin convertir el cuidado en vigilancia ni resolver lo que la otra persona necesita aprender?',
    action: 'Preguntar qué apoyo se necesita antes de ofrecer una solución.',
    icon: HandHeart,
  },
  {
    title: 'El territorio también enseña',
    audience: 'Comunidad educativa',
    question: '¿Qué saberes de la comunidad quedan fuera cuando el aula solo reconoce lo que viene escrito?',
    action: 'Recuperar una voz, práctica o memoria local y relacionarla con una pregunta escolar.',
    icon: Map,
  },
  {
    title: 'Atención en tiempos de prisa',
    audience: 'Vida cotidiana',
    question: '¿Estamos eligiendo a qué atender o solo respondiendo a todo lo que reclama nuestra mirada?',
    action: 'Hacer una pausa breve sin pantalla y registrar qué pensamiento vuelve cuando baja el ruido.',
    icon: Eye,
  },
  {
    title: 'Evaluar sin reducir a una persona',
    audience: 'Aula y acompañamiento',
    question: '¿Qué aprende alguien sobre sí mismo cuando solo recibe una calificación y no una lectura de su proceso?',
    action: 'Nombrar un avance, una dificultad concreta y un siguiente paso posible.',
    icon: CheckCircle2,
  },
];

const resonancePractice = [
  ['Detenerse', 'Respira y elige una situación que siga haciendo eco. No intentes resolverla todavía.'],
  ['Nombrar', 'Escribe qué ocurrió, qué sentiste y qué idea apareció, sin convertir la experiencia en sentencia.'],
  ['Relacionar', 'Pregunta qué historia, condición, vínculo o desigualdad participa en lo que sucede.'],
  ['Discernir', 'Reconoce qué criterio necesitas para decidir con más conciencia y cuidado.'],
  ['Actuar', 'Elige una acción pequeña, compartible y revisable. La resonancia continúa en lo que hacemos.'],
];

const familyGuideSteps = [
  ['Escuchar primero', 'Abrir conversación sin interrogatorio: qué intenta comprender, qué necesita y qué ya logró.'],
  ['Ordenar el proceso', 'Distinguir tarea, fuente, tiempo, materiales y apoyo real sin resolver por la persona joven.'],
  ['Cuidar el vínculo', 'Poner límites con dignidad, evitar comparaciones y reconocer el esfuerzo situado.'],
  ['Cerrar con resonancia', 'Preguntar qué aprendió, qué puede explicar y qué apoyo necesita después.'],
];

const familySituations = [
  {
    title: 'La tarea provoca rechazo o enojo',
    context: 'Antes de exigir que termine',
    avoid: '"Si no lo haces ahora, te quitaré todo."',
    tryInstead: '"Primero entendamos qué te piden. Después decidimos por dónde empezar y cuánto tiempo necesitamos."',
    criterion: 'Distinguir falta de comprensión, cansancio, organización y desacuerdo antes de sancionar.',
    icon: BookOpen,
  },
  {
    title: 'Dice que no entiende nada',
    context: 'Cuando pide que le resuelvan',
    avoid: '"Dame, yo lo hago porque así acabamos rápido."',
    tryInstead: '"Explícame qué parte sí reconoces y señala el primer punto donde te pierdes."',
    criterion: 'Ofrecer una pista, una fuente o una pregunta sin sustituir el proceso de pensamiento.',
    icon: Brain,
  },
  {
    title: 'Llega una calificación baja',
    context: 'Antes de comparar o castigar',
    avoid: '"¿Por qué no puedes como las demás personas?"',
    tryInstead: '"Veamos qué muestra esta calificación, qué no muestra y qué puedes hacer diferente la próxima vez."',
    criterion: 'Leer la calificación como un dato parcial dentro de un proceso más amplio.',
    icon: CheckCircle2,
  },
  {
    title: 'Las pantallas ocupan todo el tiempo',
    context: 'Cuando hay cansancio y conflicto',
    avoid: '"El teléfono es el problema; desde hoy queda prohibido."',
    tryInstead: '"Revisemos para qué lo usas, qué necesita descanso y qué acuerdo podemos cumplir todas las personas."',
    criterion: 'Construir límites claros y compartidos sin convertir la tecnología en explicación única.',
    icon: Eye,
  },
];

const familySchoolBridge = [
  ['Preparar', 'Registrar la situación concreta, lo que ya se intentó y la pregunta que necesita conversarse.'],
  ['Escuchar', 'Pedir la lectura de la persona joven y de la escuela sin buscar culpables antes de comprender.'],
  ['Acordar', 'Definir una acción posible para casa, otra para escuela y un tiempo razonable para observar cambios.'],
  ['Revisar', 'Volver al acuerdo: reconocer avances, ajustar apoyos y evitar que una dificultad se vuelva etiqueta.'],
];

const youthGuideSteps = [
  ['Nombrar', 'Explicar con tus palabras qué está pasando en una tarea, conflicto, decisión o proyecto.'],
  ['Relacionar', 'Buscar causas, consecuencias, voces, datos o palabras que ayuden a comprender mejor.'],
  ['Decidir', 'Elegir una acción pequeña y responsable que puedas revisar con otras personas.'],
  ['Resonar', 'Registrar qué cambió en tu forma de pensar y qué pregunta sigue abierta.'],
];

const youthSituations = [
  {
    title: 'Siento que ya debería saber qué haré con mi vida',
    question: '¿Qué parte de esa urgencia nace de mí y qué parte viene de expectativas ajenas?',
    movement: 'Distinguir una decisión inmediata de una dirección que puede explorarse, cambiar y madurar.',
    prompt: 'Hoy puedo investigar, probar o conversar sobre...',
    icon: Compass,
  },
  {
    title: 'Una opinión en redes se vuelve verdad para el grupo',
    question: '¿Qué sabemos realmente, quién lo afirma y qué puede provocar compartirlo?',
    movement: 'Separar evidencia, interpretación y rumor antes de reaccionar o reproducir.',
    prompt: 'Antes de compartir, necesito verificar...',
    icon: Eye,
  },
  {
    title: 'No estoy de acuerdo con una persona adulta',
    question: '¿Cómo puedo expresar mi desacuerdo sin renunciar a mi voz ni negar la dignidad de la otra persona?',
    movement: 'Nombrar el punto concreto, explicar razones, escuchar la respuesta y proponer un acuerdo revisable.',
    prompt: 'Lo que necesito que se comprenda es...',
    icon: MessageCircle,
  },
  {
    title: 'Algo no salió como esperaba',
    question: '¿El resultado define lo que soy o me ofrece información para revisar el proceso?',
    movement: 'Reconocer lo que sí avanzó, ubicar una dificultad concreta y elegir un siguiente intento posible.',
    prompt: 'En mi siguiente intento cambiaré...',
    icon: Sparkles,
  },
];

const youthDecisionCompass = [
  ['Lo que importa', '¿Qué valor, necesidad o propósito quiero cuidar con esta decisión?'],
  ['Lo que sé', '¿Qué datos tengo, qué estoy suponiendo y qué necesito preguntar?'],
  ['Lo que puede ocurrir', '¿Qué consecuencias podría tener para mí y para otras personas?'],
  ['Con quién puedo pensar', '¿Qué persona confiable puede escucharme sin decidir en mi lugar?'],
  ['El paso revisable', '¿Qué acción pequeña puedo realizar y después volver a valorar?'],
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
      'Ecos de Emancipación es una propuesta pedagógica y cultural de la Maestra Kandy Partemia basada en la Cognitología para la vida cotidiana, Caracoles Resonando y recursos para docentes, estudiantes y familias.',
  },
  '/recursos/caracoles-resonando': {
    title: 'Caracoles Resonando — Planea tu PA de Telesecundaria',
    description:
      'Ficha curricular, fuentes, mapa mental y autoevaluación para los 432 Proyectos Académicos de Telesecundaria NEM.',
  },
  '/empieza-aqui': {
    title: 'Empieza aquí | Ecos de Emancipación',
    description:
      'Ruta inicial de Ecos de Emancipación para docentes, estudiantes y acompañantes que buscan una primera acción clara.',
  },
  '/recursos': {
    title: 'Recursos | Ecos de Emancipación',
    description:
      'Herramientas pedagógicas, rutas de lectura, Caracoles Resonando y materiales de apoyo para docentes, familias y estudiantes.',
  },
  '/universo-musical': {
    title: 'Universo musical | Ecos de Emancipación',
    description:
      'Canales sonoros, canciones y proyectos musicales de Ecos de Emancipación para acompañar conciencia, plenitud y esperanza.',
  },
  '/resonancias': {
    title: 'Resonancias | Ecos de Emancipación',
    description:
      'Textos, preguntas y rutas de lectura para mirar vida cotidiana, espiritualidad situada, educación y conciencia.',
  },
  '/cognitologia': {
    title: '¿Qué es la Cognitología para la vida cotidiana? | Ecos de Emancipación',
    description:
      'Comprende la Cognitología para la vida cotidiana mediante preguntas, criterios de pensamiento y prácticas para el aula, la familia y la comunidad.',
  },
  '/que-es-la-cognitologia': {
    title: '¿Qué es la Cognitología para la vida cotidiana? | Ecos de Emancipación',
    description:
      'Comprende la Cognitología para la vida cotidiana mediante preguntas, criterios de pensamiento y prácticas para el aula, la familia y la comunidad.',
  },
  '/manifiesto': {
    title: 'Manifiesto | Ecos de Emancipación',
    description:
      'Declaración ética y pedagógica de Ecos de Emancipación: educación crítica, conciencia, comunidad y esperanza.',
  },
  '/pilares': {
    title: 'Pilares | Ecos de Emancipación',
    description:
      'Fundamentos de Ecos de Emancipación para pensar conciencia, pedagogía, espiritualidad situada, justicia y comunidad.',
  },
  '/escuela': {
    title: 'Escuela | Ecos de Emancipación',
    description:
      'Rutas formativas, acompañamiento docente y propuestas pedagógicas para habitar la escuela con conciencia.',
  },
  '/tienda': {
    title: 'Tienda | Ecos de Emancipación',
    description:
      'Entrada a recursos, cuadernos, materiales digitales y herramientas pedagógicas del universo Ecos de Emancipación.',
  },
  '/familias': {
    title: 'Familias | Ecos de Emancipación',
    description:
      'Ruta para acompañar aprendizajes desde el cuidado, la conversación y la confianza entre escuela, estudiantes y familias.',
  },
  '/jovenes': {
    title: 'Jóvenes | Ecos de Emancipación',
    description:
      'Preguntas y rutas para que estudiantes y jóvenes piensen su escuela, su identidad y su lugar en la comunidad.',
  },
  '/proyectos': {
    title: 'Proyectos | Ecos de Emancipación',
    description:
      'Mapa de proyectos, canales, recursos y rutas activas de Ecos de Emancipación para docentes, familias y estudiantes.',
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

function SiteRoute({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
        {children}
        <Invitation />
        <Footer />
        <BackToMap />
        <BackToTop />
      </main>
    </>
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
      <>
        <Suspense fallback={<CaracolesLoading />}>
          <CaracolesApp />
        </Suspense>
        <BackToMap />
        <BackToTop />
      </>
    );
  }

  if (currentPath === '/empieza-aqui') {
    return (
      <>
        <Header />
        <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
          <StartHere />
          <Invitation />
          <Footer />
          <BackToMap />
          <BackToTop />
        </main>
      </>
    );
  }

  if (currentPath === '/recursos') {
    return (
      <>
        <Header />
        <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
          <ResourcesPage />
          <Invitation />
          <Footer />
          <BackToMap />
          <BackToTop />
        </main>
      </>
    );
  }

  if (currentPath === '/universo-musical') {
    return (
      <>
        <Header />
        <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
          <MusicUniverse />
          <Invitation />
          <Footer />
          <BackToMap />
          <BackToTop />
        </main>
      </>
    );
  }

  if (currentPath === '/resonancias') {
    return (
      <>
        <Header />
        <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
          <Resonances isPage />
          <Invitation />
          <Footer />
          <BackToMap />
          <BackToTop />
        </main>
      </>
    );
  }

  if (currentPath === '/cognitologia' || currentPath === '/que-es-la-cognitologia') {
    return (
      <>
        <Header />
        <main className="min-h-screen overflow-hidden bg-cream pt-[4.75rem] text-ink sm:pt-[5rem]">
          <CognitologyPage />
          <Invitation />
          <Footer />
          <BackToMap />
          <BackToTop />
        </main>
      </>
    );
  }

  if (currentPath === '/manifiesto') {
    return (
      <SiteRoute>
        <Manifesto isPage />
      </SiteRoute>
    );
  }

  if (currentPath === '/pilares') {
    return (
      <SiteRoute>
        <Pillars isPage />
      </SiteRoute>
    );
  }

  if (currentPath === '/escuela') {
    return (
      <SiteRoute>
        <SchoolSection isPage />
      </SiteRoute>
    );
  }

  if (currentPath === '/tienda') {
    return (
      <SiteRoute>
        <Store isPage />
      </SiteRoute>
    );
  }

  if (currentPath === '/familias') {
    return (
      <SiteRoute>
        <Families />
      </SiteRoute>
    );
  }

  if (currentPath === '/jovenes') {
    return (
      <SiteRoute>
        <Youth />
      </SiteRoute>
    );
  }

  if (currentPath === '/proyectos') {
    return (
      <SiteRoute>
        <Projects isPage />
        <CaracolesSpotlight />
      </SiteRoute>
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
        <SchoolSection />
        <Projects />
        <Resources />
        <Store />
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
          <a className="min-w-0 truncate font-serif text-xl leading-none text-forest sm:text-2xl" href="/#inicio" aria-label="Ecos de Emancipación">
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
            <a className="nav-cta hidden sm:inline-flex" href="/empieza-aqui">
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
            Propuesta pedagógica de la Maestra Kandy Partemia
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-[0.95] text-forest sm:text-6xl lg:text-8xl">
            Ecos de Emancipación
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-earth sm:mt-5 sm:text-xl sm:leading-8">
            Un ecosistema pedagógico, cultural y comunicativo para formar criterios de pensamiento y acompañar una educación más humana, solidaria, justa y libre.
          </p>
          <p className="mt-3 max-w-2xl leading-7 text-earth">
            Su fundamento es la Cognitología para la vida cotidiana; Caracoles Resonando muestra una de sus aplicaciones prácticas para trabajar Proyectos Académicos de Telesecundaria.
          </p>
          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row sm:mt-6">
            <a className="btn-primary" href="/empieza-aqui">
              Empieza aquí
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="btn-secondary" href="/recursos/caracoles-resonando">
              Abrir Caracoles Resonando
              <Shell size={18} aria-hidden="true" />
            </a>
          </div>
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:mt-7" href="/cognitologia">
            Leer el fundamento
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <figure className="hero-image-card">
          <img
            src={IMAGES.hero}
            alt="Maestra Kandy Partemia en una composición editorial cálida de Ecos de Emancipación"
            className="h-full w-full object-cover object-[50%_24%]"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Portal pedagógico
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
    : universeNodes.filter(({ id }) => ['inicio', 'manifiesto', 'cognitologia', 'resonancias', 'escuela'].includes(id));

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
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">Para explorar</p>
            <h3 className="mt-3 font-serif text-4xl leading-none text-forest">{activeNode.title}</h3>
            <p className="mt-5 leading-8 text-earth">{activeNode.text}</p>
            <figure className="universe-static-map mt-8 overflow-hidden rounded-2xl border border-earth/15 bg-cream/70 p-2">
              <img
                src={IMAGES.map}
                alt="Mapa del universo Ecos de Emancipación con las secciones Inicio, Manifiesto, Resonancias, Cognitología, Pilares, Escuela, Recursos, Universo musical, Tienda y Empieza Aquí"
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
                  <span className="flex min-w-0 items-center gap-3 font-serif text-xl font-semibold leading-tight">
                    <Icon className="text-terracotta" size={21} aria-hidden="true" />
                    <span className="min-w-0 break-words">{title}</span>
                  </span>
                  <ArrowDown className={`shrink-0 transition ${isActive ? 'rotate-180' : ''}`} size={18} aria-hidden="true" />
                </button>
                {isActive && (
                  <div id={`mobile-universe-${id}`} className="border-t border-earth/15 px-4 pb-4 pt-3">
                    <p className="leading-7 text-earth">{text}</p>
                    <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={href}>
                      Explorar
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
              alt="Mapa del universo Ecos de Emancipación con las secciones Inicio, Manifiesto, Resonancias, Cognitología, Pilares, Escuela, Recursos, Universo musical, Tienda y Empieza Aquí"
              className="h-auto w-full rounded-xl"
            />
          </figure>
        </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto({ isPage = false }) {
  return (
    <section id="manifiesto" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
        <div>
          <div className="section-icon">
            <Leaf size={25} aria-hidden="true" />
          </div>
          <p className="section-kicker">Manifiesto breve</p>
          {isPage ? <h1 className="section-title">Educar es escuchar lo que el territorio ya sabe.</h1> : <h2 className="section-title">Educar es escuchar lo que el territorio ya sabe.</h2>}
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
      {isPage && <ManifestoDetails />}
    </section>
  );
}

function ManifestoDetails() {
  return (
    <div className="mx-auto mt-12 max-w-7xl">
      <div className="max-w-3xl">
        <p className="section-kicker">Convicciones en acción</p>
        <h2 className="font-serif text-3xl leading-tight text-forest sm:text-5xl">Un manifiesto se vuelve verdadero cuando orienta la práctica.</h2>
        <p className="mt-5 leading-8 text-earth">Estas convicciones no son consignas cerradas. Son puntos de partida para observar, preguntar, decidir y volver a mirar lo que hacemos en la escuela, la familia y la comunidad.</p>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {manifestoConvictions.map(({ title, principle, question, action, href, linkLabel, icon: Icon }) => (
          <article key={title} className="rounded-[1.35rem] border border-earth/15 bg-white/65 p-6 shadow-soft sm:p-7">
            <Icon className="text-terracotta" size={28} aria-hidden="true" />
            <h3 className="mt-5 font-serif text-3xl text-forest">{title}</h3>
            <p className="mt-3 leading-7 text-earth">{principle}</p>
            <div className="mt-5 border-l-2 border-gold pl-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta">Pregunta para resonar</p><p className="mt-2 font-serif text-xl leading-relaxed text-forest">{question}</p></div>
            <p className="mt-5 text-sm leading-6 text-earth"><strong>En la práctica:</strong> {action}</p>
            <SmartLink href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-sm font-bold text-forest">{linkLabel} <ArrowUpRight size={17} aria-hidden="true" /></SmartLink>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-5 rounded-[1.35rem] bg-forest p-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-3xl"><p className="section-kicker text-gold">Para conservar y compartir</p><h2 className="mt-2 font-serif text-3xl">Manifiesto y pilares en acción</h2><p className="mt-3 leading-7 text-cream/80">Una síntesis pública para conversar, planear o abrir una jornada colectiva.</p></div>
        <a href="/descargables/manifiesto-y-pilares-en-accion.pdf" download className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-ink"><FileText size={19} aria-hidden="true" /> Descargar PDF</a>
      </div>
    </div>
  );
}

function Resonances({ isPage = false }) {
  const resonanceReadingPath = [
    ['Antes de leer', 'Elige una pregunta que dialogue con tu día, tu aula o tu comunidad.'],
    ['Durante la lectura', 'Subraya una frase que te ayude a nombrar algo que ya sentías o intuías.'],
    ['Después de leer', 'Convierte la resonancia en una acción pequeña: conversar, escribir, agradecer o decidir.'],
  ];

  return (
    <section id="resonancias" className="section-pad bg-clay/45">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="section-kicker">Resonancias</p>
            {isPage ? (
              <h1 className="section-title">Palabra escrita para volver a mirar.</h1>
            ) : (
              <h2 className="section-title">Palabra escrita para volver a mirar.</h2>
            )}
            <p className="mt-5 max-w-2xl leading-8 text-earth">
              Reflexiones escritas para mirar la vida cotidiana, la espiritualidad, la educación y la conciencia desde una palabra amorosa, crítica y emancipadora.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {resonanceCards.map(({ title, text, icon: Icon }) => (
              <article key={title} className="compact-card flex min-h-full flex-col">
                <div className="rounded-[1.2rem] bg-forest p-5 text-cream">
                  <Icon className="text-gold" size={27} aria-hidden="true" />
                  <p className="section-kicker mt-5 text-gold">Ruta de lectura</p>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 leading-7 text-earth">{text}</p>
                <a className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-forest" href="/resonancias">
                  Leer esta ruta
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        {isPage && (
          <div className="mt-7 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
              <p className="section-kicker text-gold">Modo de lectura</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">Leer para reconocer lo que la vida ya está diciendo.</h2>
              <p className="mt-5 leading-8 text-cream/80">
                Las resonancias no son textos para consumir rápido: son pequeñas puertas para detenerse, nombrar una
                experiencia, conversar con alguien o volver a mirar una decisión cotidiana.
              </p>
              <a className="btn-gold mt-7" href="/empieza-aqui">
                Elegir ruta de entrada
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>

            <div className="grid gap-3">
              {resonanceReadingPath.map(([title, text], index) => (
                <article key={title} className="rounded-[1.25rem] border border-earth/15 bg-cream p-5 shadow-soft">
                  <div className="flex gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                      <p className="mt-2 leading-7 text-earth">{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="lg:col-span-2 rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
              <p className="section-kicker text-terracotta">Semillas de resonancia</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
                Preguntas breves para no salir igual de una lectura.
              </h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {resonanceSeeds.map(([title, text]) => (
                  <article key={title} className="rounded-[1.2rem] border border-earth/15 bg-white/75 p-5">
                    <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="btn-primary" href="/cognitologia">
                  Comprender la Cognitología
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a className="btn-secondary" href="/recursos">
                  Buscar un recurso para actuar
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="max-w-3xl">
                <p className="section-kicker text-terracotta">Ecos para pensar la vida</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-5xl">
                  Temas que no piden respuestas rápidas, sino una mirada más despierta.
                </h2>
                <p className="mt-4 leading-8 text-earth">
                  Cada entrada parte de una experiencia cotidiana y abre una pregunta para reconocer relaciones,
                  criterios y posibilidades de acción. Puedes elegir una, conversar sobre ella o llevarla a tu bitácora.
                </p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {resonanceThemes.map(({ title, audience, question, action, icon: Icon }) => (
                  <article key={title} className="flex min-h-full flex-col rounded-[1.35rem] border border-earth/15 bg-white/70 p-5 shadow-soft sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-gold/35 px-3 py-1 text-xs font-bold uppercase text-earth">
                        {audience}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
                    <p className="mt-4 font-serif text-xl leading-8 text-terracotta">{question}</p>
                    <div className="mt-auto border-t border-earth/10 pt-4">
                      <p className="text-xs font-black uppercase tracking-widest text-forest">Una acción posible</p>
                      <p className="mt-2 text-sm leading-7 text-earth">{action}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <article className="lg:col-span-2 overflow-hidden rounded-[1.5rem] border border-cream/15 bg-forest text-cream shadow-soft">
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <div className="border-b border-cream/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <p className="section-kicker text-gold">Práctica de resonancia</p>
                  <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Doce minutos para volver a mirar.</h2>
                  <p className="mt-5 leading-8 text-cream/80">
                    No es una receta para sentirse bien. Es una pausa para pasar de la reacción a una comprensión
                    situada y de la comprensión a una acción responsable.
                  </p>
                  <a className="btn-gold mt-7" href="/descargables/cuaderno-breve-de-resonancias.pdf" download>
                    Descargar cuaderno breve
                    <ArrowDown size={18} aria-hidden="true" />
                  </a>
                </div>
                <ol className="grid gap-px bg-cream/15 sm:grid-cols-2">
                  {resonancePractice.map(([title, text], index) => (
                    <li key={title} className="bg-forest p-5 sm:p-6">
                      <div className="flex gap-4">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl text-cream">{title}</h3>
                          <p className="mt-2 text-sm leading-7 text-cream/78">{text}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            <aside className="lg:col-span-2 rounded-[1.35rem] border border-gold/35 bg-gold/10 p-5 sm:p-7">
              <p className="section-kicker text-terracotta">Cuidado de la palabra</p>
              <p className="mt-3 max-w-5xl font-serif text-2xl leading-relaxed text-forest">
                Resonancia no significa exponer la intimidad. En el aula, la familia o la comunidad, cada persona puede
                pensar, escribir o compartir solo aquello que decida. La conciencia necesita palabra, pero también límites,
                escucha y dignidad.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Pillars({ isPage = false }) {
  return (
    <section id="pilares" className="section-pad bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="section-kicker text-gold">Pilares</p>
          {isPage ? <h1 className="section-title text-cream">Raíces para sostener una pedagogía esperanzadora.</h1> : <h2 className="section-title text-cream">Raíces para sostener una pedagogía esperanzadora.</h2>}
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
      {isPage && <PillarDetails />}
    </section>
  );
}

function PillarDetails() {
  return (
    <div className="mx-auto mt-12 max-w-7xl border-t border-cream/15 pt-10">
      <p className="section-kicker text-gold">Del principio a la práctica</p>
      <h2 className="max-w-4xl font-serif text-3xl leading-tight text-cream sm:text-5xl">Cuatro raíces que se necesitan entre sí.</h2>
      <p className="mt-5 max-w-3xl leading-8 text-cream/75">La conciencia sin comunidad puede aislarse; la comunidad sin criterio puede repetir inercias. La vida cotidiana ofrece el territorio y la esperanza convierte lo comprendido en posibilidad de acción.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {pillarPractices.map(({ title, meaning, question, practice, icon: Icon }, index) => (
          <article key={title} className="rounded-[1.35rem] border border-cream/15 bg-cream/[0.07] p-6 sm:p-7">
            <div className="flex items-center gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-ink">{index + 1}</span><Icon className="text-gold" size={27} aria-hidden="true" /></div>
            <h3 className="mt-5 font-serif text-3xl text-cream">{title}</h3><p className="mt-3 leading-7 text-cream/78">{meaning}</p><p className="mt-5 font-serif text-xl leading-relaxed text-gold">{question}</p><p className="mt-4 text-sm leading-6 text-cream/75"><strong className="text-cream">Práctica posible:</strong> {practice}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 rounded-[1.35rem] border border-gold/30 bg-gold/10 p-6 sm:grid-cols-4 sm:p-8">
        {['Reconocer la dignidad', 'Leer con conciencia', 'Construir en comunidad', 'Actuar con esperanza'].map((step, index) => <div key={step} className="flex items-center gap-3 sm:flex-col sm:items-start"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">{index + 1}</span><p className="font-semibold text-cream">{step}</p></div>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3"><SmartLink href="/manifiesto" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-ink">Leer el manifiesto <ArrowUpRight size={18} aria-hidden="true" /></SmartLink><a href="/descargables/manifiesto-y-pilares-en-accion.pdf" download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/35 px-6 py-3 font-bold text-cream"><FileText size={18} aria-hidden="true" /> Descargar PDF</a></div>
    </div>
  );
}

function CognitologyPage() {
  const coreIdeas = [
    {
      title: 'Conciencia que mira cómo piensa',
      text: 'La Cognitología abre una pregunta sobre el modo en que aprendemos, decidimos, sentimos, nombramos y actuamos en la vida cotidiana.',
      icon: Eye,
    },
    {
      title: 'Criterios para no caminar a ciegas',
      text: 'No busca imponer respuestas, sino formar criterios de pensamiento para leer la realidad con más claridad, cuidado y responsabilidad.',
      icon: Brain,
    },
    {
      title: 'Artilugios pedagógicos',
      text: 'Propone pequeñas estructuras de aula y comunidad para desplazar la escuela del cumplimiento hacia la pregunta, la decisión y la experiencia.',
      icon: Compass,
    },
  ];

  const protectedNotes = [
    'La Cognitología relaciona conciencia, pensamiento, vida cotidiana y acción responsable.',
    'Sus preguntas pueden llevarse al aula, la familia y la comunidad sin convertirlas en etiquetas sobre las personas.',
    'Las obras completas de la autora profundizan esta propuesta; aquí encontrarás una síntesis para comenzar a ponerla en práctica.',
  ];

  return (
    <section id="cognitologia" className="section-pad bg-clay/45">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker">Cognitología</p>
            <h1 className="section-title">Una pedagogía para mirar cómo pensamos la vida.</h1>
          </div>
          <p className="max-w-3xl leading-8 text-earth">
            La Cognitología para la vida cotidiana es el fundamento transversal de Ecos de Emancipación. No clasifica personas ni ofrece recetas: propone formar criterios de pensamiento para leer la realidad, cuidar la experiencia escolar y convertir la vida diaria en territorio de conciencia.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
            <p className="section-kicker text-gold">Pregunta fundante</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
              ¿Qué cambia en el aprendizaje cuando la conciencia empieza a mirar cómo piensa?
            </h2>
            <p className="mt-5 leading-8 text-cream/80">
              Atiende una dificultad cotidiana de la educación: muchas veces se cumplen actividades sin detenerse a mirar cómo se piensa, qué criterios orientan una decisión y qué sentido humano tiene lo aprendido. Desde esta pregunta, enseñar se vuelve acompañar a cada sujeto para nombrarse, decidir, comprender su realidad y participar con dignidad.
            </p>
            <a className="btn-gold mt-7" href="/resonancias">
              Leer resonancias
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>

          <article className="compact-card bg-cream/90">
            <p className="section-kicker text-terracotta">Qué puedes explorar</p>
            <ul className="mt-5 grid gap-3 text-earth">
              {[
                'Un lenguaje inicial para comprender el corazón teórico de Ecos.',
                'Una brújula para distinguir recurso, criterio, artilugio y resonancia.',
                'Una orientación pública sin exponer materiales completos en edición preliminar.',
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <CheckCircle2 className="mt-1 shrink-0 text-forest" size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-terracotta">Cinco criterios de pensamiento</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Criterios para leer la realidad con responsabilidad.</h2>
          <p className="mt-4 max-w-4xl leading-8 text-earth">
            Estos criterios no son etiquetas psicológicas ni niveles para medir personas. Son orientaciones para pensar mejor la vida cotidiana, la escuela y la comunidad.
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {cognitologyCriteria.map(({ title, text }, index) => (
              <article key={title} className="rounded-[1.15rem] border border-earth/15 bg-white/75 p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-serif text-xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {coreIdeas.map(({ title, text, icon: Icon }) => (
            <article key={title} className="compact-card flex min-h-full flex-col">
              <div className="rounded-[1.25rem] bg-forest p-5 text-cream">
                <Icon className="text-gold" size={28} aria-hidden="true" />
                <p className="section-kicker mt-5 text-gold">Idea central</p>
              </div>
              <h2 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h2>
              <p className="mt-3 leading-7 text-earth">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="compact-card bg-white/85">
            <p className="section-kicker text-terracotta">Del concepto a la práctica</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Artilugios para hacer habitable la escuela y la vida cotidiana.</h2>
            <p className="mt-4 leading-8 text-earth">
              En Ecos, un artilugio no es un adorno metodológico: es una forma pequeña y concreta de mover la práctica
              educativa para que el aula piense, dialogue, decida y resuene.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {pedagogicalArtifacts.map(([title, text]) => (
              <article key={title} className="rounded-[1.25rem] border border-earth/15 bg-cream p-5 shadow-soft">
                <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            ['En la escuela', 'Ayuda a que una clase no sea solo cumplimiento: abre preguntas, criterios, diálogo y evidencias con sentido.'],
            ['En la vida cotidiana', 'Permite mirar decisiones, emociones, lenguaje y conflictos como oportunidades para pensar mejor.'],
            ['En Caracoles Resonando', 'Se vuelve herramienta concreta cuando orienta mapas mentales, resonancias, autoevaluación y planeación de Proyectos Académicos.'],
          ].map(([title, text]) => (
            <article key={title} className="compact-card bg-white/85">
              <h2 className="font-serif text-2xl leading-tight text-forest">{title}</h2>
              <p className="mt-3 leading-7 text-earth">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-cream/15 bg-forest text-cream shadow-soft">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-cream/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="section-kicker text-gold">Brújula cognitólogica</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Pensar no es llenar una respuesta: es aprender a orientarse.</h2>
              <p className="mt-5 leading-8 text-cream/80">
                Esta secuencia no es una fórmula rígida. Es una brújula para volver sobre una experiencia cuando la
                prisa, la costumbre o una explicación única impiden mirarla con amplitud.
              </p>
              <a className="btn-gold mt-7" href="/descargables/brujula-cognitologica-vida-cotidiana.pdf" download>
                Descargar brújula de trabajo
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
            <ol className="grid gap-px bg-cream/15 sm:grid-cols-2">
              {cognitologyCompass.map(([title, text], index) => (
                <li key={title} className="bg-forest p-5 sm:p-6">
                  <div className="flex gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl text-cream">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-cream/78">{text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-5">
          <div className="max-w-4xl">
            <p className="section-kicker text-terracotta">Criterios en movimiento</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-5xl">
              Cinco situaciones para reconocer qué criterio necesitamos.
            </h2>
            <p className="mt-4 leading-8 text-earth">
              Un criterio cobra sentido cuando ayuda a leer algo que sucede. Estas escenas no ofrecen respuestas
              cerradas: muestran cómo una pregunta puede desplazar la mirada y abrir una acción más consciente.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cognitologySituations.map(({ title, context, question, criterion, movement, icon: Icon }) => (
              <article key={title} className="flex min-h-full flex-col rounded-[1.35rem] border border-earth/15 bg-white/75 p-5 shadow-soft sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="max-w-[12rem] rounded-full border border-gold/35 px-3 py-1 text-right text-xs font-bold uppercase text-earth">
                    {context}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-4 font-serif text-xl leading-8 text-terracotta">{question}</p>
                <div className="mt-5 rounded-2xl bg-clay/55 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-forest">Criterio que orienta</p>
                  <p className="mt-2 font-bold leading-6 text-earth">{criterion}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-earth"><strong>Movimiento posible:</strong> {movement}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
            <p className="section-kicker text-terracotta">Lo que la Cognitología no es</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Una propuesta pedagógica necesita también declarar sus límites.</h2>
            <ul className="mt-5 grid gap-3 text-earth">
              {[
                'No es una prueba para clasificar inteligencias, personalidades o capacidades.',
                'No es una receta de bienestar ni una promesa de soluciones inmediatas.',
                'No sustituye la enseñanza disciplinar, la evidencia ni la atención profesional cuando se necesita.',
                'No separa el pensamiento de la historia, el lenguaje, el cuerpo, los vínculos y las condiciones de vida.',
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <CircleDot className="mt-1 shrink-0 text-terracotta" size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
            <p className="section-kicker text-gold">Una primera experiencia</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">Elige algo que ocurrió hoy y sigue una sola vuelta de la brújula.</h2>
            <p className="mt-4 leading-8 text-cream/80">
              No necesitas resolver toda la situación. Basta con reconocer qué dabas por hecho, qué relación no
              habías visto y qué criterio puede ayudarte a dar el siguiente paso.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className="btn-gold" href="/resonancias">
                Llevarla a Resonancias
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/30 px-5 py-3 font-bold text-cream" href="/recursos/caracoles-resonando">
                Verla aplicada en Caracoles
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-gold/35 bg-[#fff8ee] p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-terracotta">Para llevarlo a la vida cotidiana</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {protectedNotes.map((note) => (
              <p key={note} className="rounded-2xl bg-cream px-4 py-3 text-sm font-semibold leading-7 text-earth">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ isPage = false }) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section id="proyectos" className={`section-pad ${isPage ? 'bg-clay/35' : ''}`}>
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-7 ${isPage ? 'lg:grid-cols-[1fr_0.82fr] lg:items-center' : ''}`}>
          <div className="max-w-4xl">
            <p className="section-kicker">Proyectos vivos</p>
            {isPage ? (
              <h1 className="section-title">Elige una puerta para aprender, acompañar o crear.</h1>
            ) : (
              <h2 className="section-title">Rutas para llevar la propuesta a la vida.</h2>
            )}
            <p className="mt-5 max-w-3xl leading-8 text-earth">
              Cada proyecto nace de una necesidad distinta. Puedes entrar por el aula, la familia, la voz joven, la lectura o la música y encontrar una acción concreta para comenzar.
            </p>
            {isPage && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="btn-primary" href="#rutas-proyectos">Explorar proyectos <ArrowDown size={17} aria-hidden="true" /></a>
                <a className="btn-secondary" href="/descargables/mapa-para-elegir-recurso-ecos.pdf" download>
                  Descargar mapa de elección <FileText size={17} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
          {isPage && (
            <aside className="rounded-[1.5rem] bg-forest p-6 text-cream shadow-soft sm:p-8">
              <p className="section-kicker text-gold">Tres preguntas para elegir</p>
              <ol className="mt-5 space-y-4">
                {[
                  '¿Quién necesita hoy este acompañamiento?',
                  '¿Qué situación, pregunta o necesidad queremos atender?',
                  '¿Qué acción o expresión sería posible al terminar?',
                ].map((question, index) => (
                  <li key={question} className="flex gap-3 text-sm leading-7 text-cream/85">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">{index + 1}</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
        <div id="rutas-proyectos" className="mt-8 grid scroll-mt-28 gap-3 md:mt-10 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {projects.map(({ title, text, audience, result, action, href, external, icon: Icon }, index) => (
            <article key={title} className={`compact-card ${index >= 3 && !showAllProjects ? 'hidden md:block' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold/20 text-terracotta"><Icon size={23} aria-hidden="true" /></span>
                <span className="rounded-full border border-earth/15 px-3 py-1 text-right text-[0.68rem] font-bold uppercase tracking-[0.1em] text-earth">{audience}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-earth">{text}</p>
              {isPage && <p className="mt-4 rounded-2xl bg-clay/55 p-4 text-sm leading-7 text-earth"><strong className="text-forest">Te llevas:</strong> {result}</p>}
              <SmartLink href={href} external={external} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-sm font-semibold text-forest" label={action}>
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

        {isPage && (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-gold/35 bg-[#fff8ee] p-6 shadow-soft sm:p-8">
              <p className="section-kicker text-terracotta">Si vienes desde una necesidad concreta</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">El mapa de recursos te ayuda a elegir sin acumular materiales.</h2>
              <p className="mt-4 leading-8 text-earth">Relaciona audiencia, momento y propósito con una ruta del sitio y un recurso que pueda ponerse en práctica.</p>
              <a className="btn-primary mt-6" href="/descargables/mapa-para-elegir-recurso-ecos.pdf" download>Descargar mapa en PDF <FileText size={17} aria-hidden="true" /></a>
            </article>
            <article className="rounded-[1.5rem] border border-earth/15 bg-white/75 p-6 shadow-soft sm:p-8">
              <p className="section-kicker text-forest">Si trabajas en Telesecundaria</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Caracoles Resonando convierte la elección en una herramienta de trabajo.</h2>
              <p className="mt-4 leading-8 text-earth">Selecciona grado, campo formativo y Proyecto Académico para consultar ficha, fuentes, mapa mental y actividades.</p>
              <a className="btn-secondary mt-6" href="/recursos/caracoles-resonando">Abrir Caracoles Resonando <Shell size={17} aria-hidden="true" /></a>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

function CaracolesSpotlight() {
  return (
    <section aria-labelledby="caracoles-home-title" className="section-pad bg-forest text-cream">
      <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-gold">
            <Shell size={27} aria-hidden="true" />
            <p className="section-kicker text-gold">Recurso insignia</p>
          </div>
          <h2 id="caracoles-home-title" className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Caracoles Resonando
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-cream/85">
            Herramienta gratuita para trabajar Proyectos Académicos de Telesecundaria desde una ficha curricular, fuentes, mapa mental, autoevaluación y formato imprimible.
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
      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {caracolesHighlights.map(({ title, text, icon: Icon }) => (
          <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.07] p-5">
            <Icon className="text-gold" size={24} aria-hidden="true" />
            <h3 className="mt-4 font-serif text-2xl leading-tight text-cream">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-cream/78">{text}</p>
          </article>
        ))}
      </div>
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
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {resourceCards.map(({ title, text, benefit, action, href, icon: Icon }) => (
            <article key={title} className="compact-card flex min-h-full flex-col">
              <div className="rounded-[1.2rem] border border-gold/25 bg-[#fff8ee] p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/25 text-terracotta">
                  <Icon size={27} aria-hidden="true" />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-terracotta">Para acompañar</p>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-earth">{text}</p>
              <p className="mt-4 rounded-2xl bg-clay/55 px-4 py-3 text-sm font-semibold leading-6 text-forest">
                {benefit}
              </p>
              <a className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-forest" href={href}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <article className="compact-card mt-4 overflow-hidden border-forest/20 bg-cream/80">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="rounded-[1.35rem] bg-forest p-5 text-cream">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Shell size={27} aria-hidden="true" />
              </div>
              <p className="section-kicker mt-5 text-gold">Herramienta lista</p>
              <p className="mt-3 font-serif text-3xl leading-tight">432 Proyectos Académicos</p>
              <p className="mt-3 text-sm leading-7 text-cream/78">
                Selector, ficha curricular, mapa mental, autoevaluación y formato imprimible.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-3xl leading-tight text-forest">Caracoles Resonando</h3>
              <p className="mt-3 leading-7 text-earth">
                Consulta curricular para docentes y experiencia de repaso para estudiantes: ficha, fuentes, mapa mental,
                autoevaluación y formato imprimible cuando el proyecto lo permite.
              </p>
              <a className="btn-primary mt-5" href="/recursos/caracoles-resonando">
                Abrir herramienta
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ResourcesPage() {
  const resourceSteps = [
    {
      title: 'Planea un Proyecto Académico',
      text: 'Abre Caracoles Resonando, elige grado, campo formativo y PA para revisar ficha curricular, fuentes, mapa mental y autoevaluación.',
      label: 'Herramienta interactiva',
      result: 'Ficha, mapa mental, evaluación y PDF imprimible.',
      href: '/recursos/caracoles-resonando',
      action: 'Abrir Caracoles Resonando',
      icon: Shell,
    },
    {
      title: 'Recupera preguntas para pensar',
      text: 'Usa las rutas de Empieza aquí para preparar una conversación docente, familiar o estudiantil antes de elegir un recurso.',
      label: 'Ruta de entrada',
      result: 'Preguntas guía para docentes, familias y jóvenes.',
      href: '/empieza-aqui',
      action: 'Ir a Empieza aquí',
      icon: DoorOpen,
    },
    {
      title: 'Acompaña con palabra y música',
      text: 'Explora resonancias, canales sonoros y materiales que ayudan a sostener una experiencia educativa más sensible y consciente.',
      label: 'Acompañamiento sensible',
      result: 'Canales, textos y apoyos para sostener el proceso.',
      href: '/universo-musical',
      action: 'Explorar universo musical',
      icon: Music,
    },
  ];

  const resourceUses = [
    ['Para docentes', 'Planeación, preguntas guía, mapas mentales, criterios de pensamiento y recursos para sostener el trabajo por proyectos.'],
    ['Para familias', 'Orientaciones sencillas para conversar, acompañar tareas y cuidar el vínculo sin convertir el aprendizaje en presión.'],
    ['Para estudiantes', 'Herramientas para repasar, nombrar lo aprendido, crear evidencias y mirar el proyecto desde la vida cotidiana.'],
    ['Para comunidad', 'Materiales que ayudan a vincular escuela, territorio, memoria, cultura, cuidado y participación.'],
  ];

  return (
    <section id="recursos" className="section-pad bg-clay/55">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker">Recursos</p>
            <h1 className="section-title">Herramientas para acompañar procesos.</h1>
          </div>
          <p className="max-w-3xl leading-8 text-earth">
            Encuentra herramientas para planear, conversar, crear evidencias, cuidar el aprendizaje y sostener una
            práctica educativa con conciencia.
          </p>
        </div>

        <div className="mt-8">
          <article className="compact-card bg-cream/90">
            <p className="section-kicker text-terracotta">Elige tu siguiente paso</p>
            <ol className="mt-5 grid gap-3 text-earth md:grid-cols-2">
              {[
                'Elige primero el tipo de acompañamiento que necesitas.',
                'Abre el recurso que responda mejor a tu necesidad.',
                'Recupera una pregunta, una fuente o una evidencia concreta.',
                'Regresa al mapa cuando quieras descubrir otra posibilidad.',
              ].map((item, index) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="section-kicker text-gold">Elige desde tu necesidad</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">No necesitas conocer todo Ecos para encontrar una primera ayuda.</h2>
            </div>
            <p className="leading-8 text-cream/78">
              Busca la frase que más se parece a lo que necesitas hoy. Cada entrada conduce a una experiencia concreta,
              no a una categoría vacía ni a una lista interminable de materiales.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {resourceNeedPaths.map(({ title, text, destination, href, action, icon: Icon }) => (
              <article key={title} className="flex min-h-full flex-col rounded-[1.2rem] border border-cream/15 bg-cream/[0.07] p-5">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="shrink-0 text-gold" size={24} aria-hidden="true" />
                  <span className="text-right text-xs font-black uppercase tracking-widest text-gold">{destination}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-cream">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-cream/74">{text}</p>
                <a className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-gold" href={href}>
                  {action}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <a className="btn-gold mt-6" href="/descargables/mapa-para-elegir-recurso-ecos.pdf" download>
            Descargar mapa de recursos en PDF
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {resourceSteps.map(({ title, text, label, result, href, action, icon: Icon }) => (
            <article key={title} className="compact-card flex min-h-full flex-col overflow-hidden">
              <div className="rounded-[1.25rem] bg-forest p-5 text-cream">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Icon size={27} aria-hidden="true" />
                </div>
                <p className="section-kicker mt-5 text-gold">{label}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-cream/82">{result}</p>
              </div>
              <h2 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h2>
              <p className="mt-3 leading-7 text-earth">{text}</p>
              <a className="btn-secondary mt-auto self-start" href={href}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="section-kicker text-terracotta">Biblioteca actual</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
                Recursos organizados por uso real.
              </h2>
            </div>
            <p className="leading-8 text-earth">
              Consulta cada material desde la página o descárgalo en PDF para trabajarlo, imprimirlo y compartirlo con
              mayor facilidad.
            </p>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {resourceLibrary.map(({ title, audience, theme, type, format, access, href, action, icon: Icon }) => (
              <article key={title} className="rounded-[1.25rem] border border-earth/15 bg-white/75 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/20 text-terracotta">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-earth">{theme}</p>
                    </div>
                  </div>
                  <span className="self-start rounded-full bg-forest px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cream">
                    {access}
                  </span>
                </div>
                <dl className="mt-4 grid gap-2 text-sm leading-6 text-earth sm:grid-cols-3">
                  <div>
                    <dt className="font-black uppercase tracking-[0.12em] text-terracotta">Audiencia</dt>
                    <dd>{audience}</dd>
                  </div>
                  <div>
                    <dt className="font-black uppercase tracking-[0.12em] text-terracotta">Tipo</dt>
                    <dd>{type}</dd>
                  </div>
                  <div>
                    <dt className="font-black uppercase tracking-[0.12em] text-terracotta">Formato</dt>
                    <dd>{format}</dd>
                  </div>
                </dl>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={href}>
                  {action}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-gold/35 bg-[#fff8ee] p-5 shadow-soft sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker text-terracotta">Descargables públicos</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">
                Recursos breves para acompañar una conversación, una clase o una reflexión personal.
              </h2>
            </div>
            <p className="leading-8 text-earth">
              Elige el material que responda a tu momento y adáptalo con cuidado a las personas y al contexto donde será utilizado.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {publicDownloads.map(({ title, text, audience, href, icon: Icon }) => (
              <article key={title} className="rounded-[1.25rem] border border-earth/15 bg-cream p-5">
                <Icon className="text-terracotta" size={24} aria-hidden="true" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-terracotta">{audience}</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
                <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest" href={href} download>
                  Descargar PDF
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="compact-card bg-white/85">
            <p className="section-kicker text-terracotta">Beneficio educativo</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Del recurso suelto al proceso con sentido.</h2>
            <p className="mt-4 leading-8 text-earth">
              La intención no es acumular materiales, sino elegir aquello que ayude a comprender, dialogar, crear y
              valorar aprendizajes situados. Cada recurso debe abrir una pregunta, ordenar una acción o fortalecer una
              evidencia.
            </p>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {resourceUses.map(([title, text]) => (
              <article key={title} className="rounded-[1.25rem] border border-earth/15 bg-cream p-5 shadow-soft">
                <h3 className="font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-gold/35 bg-[#fff8ee] p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-terracotta">Siguiente paso sugerido</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-4xl leading-8 text-earth">
              Si vienes por una necesidad docente concreta, empieza en Caracoles Resonando. Si vienes a conocer la
              propuesta completa, regresa a Empieza aquí y elige la ruta que mejor dialogue contigo.
            </p>
            <a className="btn-primary justify-self-start" href="/empieza-aqui">
              Elegir ruta de entrada
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function Store({ isPage = false }) {
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
          {isPage ? <h1 className="section-title">Recursos para la práctica educativa.</h1> : <h2 className="section-title">Recursos para la práctica educativa.</h2>}
          <p className="mt-5 leading-8 text-earth">
            Encuentra materiales, cuadernos y herramientas para acompañar la práctica educativa desde la conciencia,
            el cuidado y el pensamiento crítico.
          </p>
          <p className="mt-4 rounded-2xl border border-gold/35 bg-[#fff8ee] px-5 py-4 text-sm font-semibold leading-7 text-earth">
            Elige un recurso a partir de una necesidad concreta y úsalo como apoyo para preguntar, dialogar, decidir o
            volver a mirar una experiencia.
          </p>
          <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {storeItems.map(({ title, text, icon: Icon, href }) => (
              <article key={title} className="catalog-card">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="text-terracotta" size={27} aria-hidden="true" />
                  <span className="status-pill">
                    <Tag size={13} aria-hidden="true" />
                    PDF
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-forest">{title}</h3>
                <p className="mt-3 leading-7 text-earth">{text}</p>
                <a className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-forest" href={href} download>Descargar <ArrowDown size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <ExternalLink className="btn-primary mt-6 sm:mt-7" href={LINKS.whatsapp} label="Sugerir un recurso educativo por WhatsApp">
            Sugerir un recurso
            <MessageCircle size={18} aria-hidden="true" />
          </ExternalLink>
          <a className="btn-secondary mt-3 sm:ml-3 sm:mt-6" href="/recursos">
            Ver recursos gratuitos
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SchoolSection({ isPage = false }) {
  return (
    <section id="escuela" className="section-pad bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
            <School size={26} aria-hidden="true" />
          </div>
          <p className="section-kicker mt-7 text-gold">Escuela Ecos de Emancipación</p>
          {isPage ? <h1 className="section-title text-cream">Habitar la escuela con conciencia.</h1> : <h2 className="section-title text-cream">Habitar la escuela con conciencia.</h2>}
          <p className="mt-5 leading-8 text-cream/78">
            Escuela Ecos es una ruta para comprender el aula como territorio de sujetos, relaciones, saberes y
            decisiones. Reúne criterios y artilugios para planear, acompañar y valorar experiencias educativas sin
            reducirlas a actividades, control o calificación.
          </p>
          <div className="mt-6 rounded-2xl border border-gold/25 bg-cream/[0.06] p-4 sm:mt-7 sm:p-5">
            <div className="flex items-start gap-4">
              <KeyRound className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <p className="leading-7 text-cream/82">Elige la ruta que dialogue con tu lugar en la comunidad educativa. Cada entrada ofrece preguntas, situaciones y recursos que pueden llevarse a la vida cotidiana.</p>
            </div>
          </div>
          <div id="escuela-rutas" className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {schoolRoutes.map(({ title, subtitle, text, icon: Icon, href, action }) => (
              <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-4 sm:p-5">
                <Icon className="text-gold" size={25} aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl leading-tight sm:mt-5">{title}</h3>
                <p className="mt-1 font-semibold text-cream/85">{subtitle}</p>
                <p className="mt-2 leading-7 text-cream/76 sm:mt-3">{text}</p>
                <a className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-gold" href={href}>{action}<ArrowUpRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <a className="btn-gold mt-7" href="#practica-docente">
            Explorar la ruta docente
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
        <figure className="editorial-image min-h-[20rem] lg:min-h-[38rem]">
          <img
            src={IMAGES.school}
            alt="Escuela Ecos de Emancipación como espacio de formación, reflexión y acompañamiento educativo"
            className="h-full w-full object-cover object-center"
          />
        </figure>
      </div>

      <div id="practica-docente" className="mx-auto mt-10 max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker text-gold">Situaciones de la práctica</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            La pedagogía empieza donde una situación deja de parecernos normal.
          </h2>
          <p className="mt-4 leading-8 text-cream/78">
            Estas escenas funcionan como puertas para reconocer una tensión, formular una pregunta y elegir una acción
            que pueda revisarse con el grupo.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {schoolTeacherSituations.map(({ title, situation, question, action, icon: Icon }) => (
            <article key={title} className="rounded-[1.35rem] border border-cream/15 bg-cream/[0.07] p-5 shadow-soft sm:p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-3xl leading-tight text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-cream/74">{situation}</p>
              <p className="mt-4 font-serif text-xl leading-8 text-gold">{question}</p>
              <p className="mt-4 border-t border-cream/15 pt-4 text-sm leading-7 text-cream/82"><strong>Movimiento posible:</strong> {action}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl rounded-[1.5rem] bg-cream p-5 text-ink shadow-soft sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-kicker text-terracotta">Artilugios pedagógicos</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-forest sm:text-5xl">Pequeñas estructuras que mueven la práctica.</h2>
          </div>
          <p className="leading-8 text-earth">
            Un artilugio no es una dinámica para ocupar el tiempo. Se elige porque ayuda a abrir palabra, organizar
            relaciones, tomar decisiones o reconocer un proceso.
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {schoolArtifactUses.map(([title, use, evidence], index) => (
            <article key={title} className="rounded-[1.2rem] border border-earth/15 bg-white/75 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-black text-gold">{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-earth"><strong>Cuándo usarlo:</strong> {use}</p>
              <p className="mt-3 rounded-2xl bg-clay/55 p-4 text-sm leading-7 text-earth"><strong>Evidencia posible:</strong> {evidence}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.5rem] border border-cream/15 bg-cream/[0.07] p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-gold">Antes, durante y después</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream">Una práctica que puede observarse y volver a pensarse.</h2>
          <div className="mt-6 grid gap-3">
            {schoolPracticeCycle.map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-cream/15 bg-ink/15 p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl text-cream">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-cream/76">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[1.5rem] border border-gold/30 bg-gold/10 p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-gold">Bitácora docente</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-cream">Registrar para comprender, no para vigilar.</h2>
          <p className="mt-5 leading-8 text-cream/78">
            La bitácora ayuda a mirar decisiones, voces, evidencias y resonancias. No solicita datos sensibles ni
            convierte observaciones situadas en etiquetas sobre el alumnado.
          </p>
          <a className="btn-gold mt-7" href="/descargables/bitacora-docente-practica-con-conciencia.pdf" download>
            Descargar bitácora
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <a className="mt-4 inline-flex items-center gap-2 font-bold text-cream" href="/cognitologia">
            Revisar criterios de pensamiento
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </article>
      </div>

      <aside className="mx-auto mt-10 max-w-7xl rounded-[1.35rem] border border-gold/30 bg-ink/20 p-5 sm:p-7">
        <p className="section-kicker text-gold">Cuidado pedagógico</p>
        <p className="mt-3 max-w-5xl font-serif text-2xl leading-relaxed text-cream">
          Escuchar no obliga a contar la intimidad. Acompañar no sustituye atención profesional. Evaluar no autoriza
          a encasillar. Cada herramienta debe cuidar el derecho a participar, guardar silencio, disentir y ser reconocido
          como una persona en formación.
        </p>
      </aside>

      <div id="escuela-empieza" className="mx-auto mt-9 max-w-7xl rounded-[1.35rem] border border-cream/15 bg-cream/[0.07] p-4 shadow-soft sm:mt-12 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-kicker text-gold">Empieza aquí · Escuela Ecos</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-5xl">
              Una orientación inicial para recorrer la escuela.
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-cream/78 sm:leading-8">
              Elige una situación de la práctica, prueba un artilugio pedagógico y registra lo que cambia. También puedes
              recorrer los materiales para familias y jóvenes cuando el proceso necesite otras voces.
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

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ['Fundamento', 'Cognitología, criterios de pensamiento y artilugios pedagógicos como base común.'],
            ['Aplicación', 'Caracoles, guías breves, resonancias y recursos para el aula, casa y comunidad.'],
            ['Cuidado', 'Sin datos de menores, sin promesas vacías y con materiales publicados solo cuando estén listos.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-5">
              <h4 className="font-serif text-2xl leading-tight text-cream">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-cream/76">{text}</p>
            </article>
          ))}
        </div>
      </div>
      {isPage && <EthicalStoreDetails />}
    </section>
  );
}

function EthicalStoreDetails() {
  return (
    <div className="mx-auto mt-12 max-w-7xl">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="section-kicker text-forest">Recursos para comenzar</p>
          <h2 className="font-serif text-4xl leading-tight text-forest sm:text-5xl">Elige según lo que quieres comprender, acompañar o transformar.</h2>
        </div>
        <p className="leading-8 text-earth">Puedes comenzar con una guía breve, preparar un Proyecto Académico o abrir una conversación colectiva. Cada recurso propone un uso concreto para que encuentres una ayuda pertinente sin acumular materiales innecesarios.</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {ethicalCatalog.map(({ status, title, text, detail, href, action, icon: Icon, tone, external }) => (
          <article key={title} className="rounded-[1.35rem] border border-earth/15 bg-white/70 p-6 shadow-soft sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-gold"><Icon size={24} aria-hidden="true" /></span>
              <span className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] ${tone === 'available' ? 'bg-forest text-cream' : tone === 'preparing' ? 'bg-gold text-ink' : 'border border-terracotta/30 text-terracotta'}`}>{status}</span>
            </div>
            <h3 className="mt-5 font-serif text-3xl leading-tight text-forest">{title}</h3>
            <p className="mt-3 leading-7 text-earth">{text}</p>
            <p className="mt-4 rounded-2xl bg-clay/55 p-4 text-sm leading-7 text-earth">{detail}</p>
            <SmartLink href={href} external={external} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-sm font-bold text-forest">{action} <ArrowUpRight size={17} aria-hidden="true" /></SmartLink>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[1.5rem] bg-forest p-6 text-cream shadow-soft sm:p-8">
        <p className="section-kicker text-gold">Una elección con sentido</p>
        <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Del material descargado a una experiencia que pueda transformar.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {ethicalAccessPrinciples.map(([title, text], index) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-cream/15 bg-cream/[0.06] p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">{index + 1}</span>
              <div><h3 className="font-serif text-2xl text-cream">{title}</h3><p className="mt-2 text-sm leading-7 text-cream/76">{text}</p></div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[1.35rem] border border-gold/35 bg-[#fff8ee] p-6 shadow-soft sm:p-7">
          <p className="section-kicker text-terracotta">Antes de descargar</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">Elige por necesidad, no por acumulación.</h2>
          <p className="mt-4 leading-8 text-earth">El mapa de recursos ayuda a reconocer qué material conviene según la audiencia, el momento y la pregunta que se quiere trabajar.</p>
          <a href="/descargables/mapa-para-elegir-recurso-ecos.pdf" download className="btn-primary mt-6"><FileText size={18} aria-hidden="true" /> Descargar mapa en PDF</a>
        </article>
        <article className="rounded-[1.35rem] border border-earth/15 bg-white/70 p-6 shadow-soft sm:p-7">
          <p className="section-kicker text-forest">Profundiza</p>
          <h2 className="mt-3 font-serif text-3xl text-forest">Manifiesto y pilares en acción.</h2>
          <p className="mt-4 leading-8 text-earth">Lleva conciencia, dignidad, vida cotidiana, comunidad y esperanza a una conversación educativa.</p>
          <a href="/descargables/manifiesto-y-pilares-en-accion.pdf" download className="btn-secondary mt-6"><FileText size={18} aria-hidden="true" /> Descargar PDF</a>
        </article>
      </div>
    </div>
  );
}

function MusicUniverse() {
  const getSoundIcon = (tone) => (tone === 'freedom' ? Mic2 : Music);

  return (
    <section id="universo-musical" className="section-pad bg-clay/45">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="section-kicker">Universo musical</p>
            <h1 className="section-title">La palabra también canta y abre conciencia.</h1>
            <p className="mt-5 max-w-2xl leading-8 text-earth">
              Este universo reúne canciones para escuchar con calma, reconocer lo que nos mueve y convertir la resonancia en diálogo, memoria, expresión y esperanza. Puedes recorrerlo desde el aula, la vida joven o la conversación familiar.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#canales-sonoros" className="btn-primary">Escuchar los canales <Play size={17} aria-hidden="true" /></a>
              <a href="/descargables/guia-escucha-consciente-resonancia-musical.pdf" className="btn-secondary" download>
                Descargar guía en PDF <FileText size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="editorial-image order-1 min-h-[18rem] lg:order-2 lg:min-h-[28rem]">
            <img
              src="/images/ecos-universo-musical-visual.webp"
              alt="Universo musical de Ecos de Emancipación: escucha, palabra, conciencia y esperanza"
              className="h-full w-full object-cover object-center"
            />
          </figure>
        </div>

        <div className="mt-10 rounded-[1.5rem] border border-gold/35 bg-white/75 p-6 shadow-soft sm:p-8">
          <p className="section-kicker text-terracotta">Una práctica de escucha consciente</p>
          <h2 className="mt-3 max-w-4xl font-serif text-3xl leading-tight text-forest sm:text-4xl">La música no se usa para llenar un silencio, sino para abrir una experiencia.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {consciousListeningSteps.map(([title, text], index) => (
              <article key={title} className="rounded-[1.2rem] border border-earth/15 bg-cream p-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-forest text-sm font-black text-cream">{index + 1}</span>
                <h3 className="mt-4 font-serif text-2xl text-forest">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="section-kicker">Elige tu recorrido</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight text-forest sm:text-5xl">Una misma canción puede abrir preguntas distintas.</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {musicAudiencePaths.map(({ title, text, prompt, icon: Icon }) => (
              <article key={title} className="rounded-[1.35rem] border border-earth/15 bg-white/75 p-6 shadow-soft">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold/25 text-forest"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-5 font-serif text-3xl text-forest">{title}</h3>
                <p className="mt-3 leading-7 text-earth">{text}</p>
                <p className="mt-5 border-l-2 border-gold pl-4 font-serif text-xl leading-7 text-terracotta">{prompt}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="canales-sonoros" className="mt-12 scroll-mt-28">
          <p className="section-kicker">Canales sonoros</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight text-forest sm:text-5xl">Dos sensibilidades para acompañar la vida.</h2>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
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

        <div className="mt-10 rounded-[1.5rem] bg-forest p-6 text-cream shadow-soft sm:p-8">
          <p className="section-kicker text-gold">Para llevar contigo</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Guía de escucha consciente y resonancia musical.</h2>
              <p className="mt-3 max-w-3xl leading-8 text-cream/80">Incluye una secuencia breve, preguntas para docentes, jóvenes y familias, y una bitácora sencilla para transformar la escucha en expresión y diálogo.</p>
            </div>
            <a href="/descargables/guia-escucha-consciente-resonancia-musical.pdf" className="btn-gold" download>
              Descargar PDF <FileText size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
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
          <h2 className="section-title">Acompañar sin vigilar también se aprende.</h2>
          <p className="mt-5 leading-8 text-earth">
            Esta ruta ayuda a madres, padres, tutoras, tutores y personas acompañantes a sostener el aprendizaje con
            escucha, límites dignos y preguntas que no sustituyen el pensamiento de la persona joven.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="btn-primary" href="/descargables/guia-familias-acompanar-sin-vigilar.pdf">
              Abrir guía breve
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="btn-secondary" href="/empieza-aqui">
              Elegir ruta inicial
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl rounded-[1.5rem] border border-earth/15 bg-white/75 p-5 shadow-soft sm:p-7">
        <p className="section-kicker text-terracotta">Ruta de conversación cuidada</p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {familyGuideSteps.map(([title, text], index) => (
            <article key={title} className="rounded-[1.2rem] border border-earth/15 bg-cream p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-black text-cream">
                {index + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-2xl bg-[#fff8ee] px-5 py-4 text-sm font-semibold leading-7 text-earth">
          Cuidado central: esta ruta no pide datos personales, relatos íntimos ni evidencias de menores. Propone
          conversación y acompañamiento local, dentro de la familia y la comunidad escolar.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker text-terracotta">Situaciones cotidianas</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-forest sm:text-5xl">
            Acompañar también significa cambiar la pregunta con la que entramos al conflicto.
          </h2>
          <p className="mt-4 leading-8 text-earth">
            Estas escenas no ofrecen frases mágicas. Ayudan a bajar la reacción, comprender qué está ocurriendo y
            devolver a la persona joven una parte real de la responsabilidad sobre su aprendizaje.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {familySituations.map(({ title, context, avoid, tryInstead, criterion, icon: Icon }) => (
            <article key={title} className="rounded-[1.35rem] border border-earth/15 bg-white/75 p-5 shadow-soft sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="rounded-full border border-gold/35 px-3 py-1 text-right text-xs font-bold uppercase text-earth">{context}</span>
              </div>
              <h3 className="mt-5 font-serif text-3xl leading-tight text-forest">{title}</h3>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-terracotta/10 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-terracotta">Conviene evitar</p>
                  <p className="mt-2 text-sm leading-7 text-earth">{avoid}</p>
                </div>
                <div className="rounded-2xl bg-forest p-4 text-cream">
                  <p className="text-xs font-black uppercase tracking-widest text-gold">Podría abrirse así</p>
                  <p className="mt-2 font-serif text-xl leading-8">{tryInstead}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-earth"><strong>Criterio de cuidado:</strong> {criterion}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
          <p className="section-kicker text-terracotta">Puente familia-escuela</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-forest">Conversar para comprender y acordar, no para repartir culpas.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {familySchoolBridge.map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-earth/15 bg-white/75 p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl text-forest">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
          <p className="section-kicker text-gold">Cuándo pedir más apoyo</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Acompañar también es reconocer lo que una familia no tiene que resolver sola.</h2>
          <p className="mt-5 leading-8 text-cream/78">
            Si una dificultad es persistente, afecta el bienestar, implica violencia o rebasa los recursos familiares y
            escolares, conviene buscar orientación profesional o institucional adecuada. Esta ruta pedagógica no sustituye esa atención.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="btn-gold" href="/descargables/guia-familias-acompanar-sin-vigilar.pdf" download>
              Descargar guía en PDF
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/30 px-5 py-3 font-bold text-cream" href="/escuela">
              Conocer Escuela Ecos
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </article>
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
            Una ruta para que las y los jóvenes puedan nombrar lo que aprenden, relacionarlo con su realidad y registrar
            una resonancia sin quedar obligados a exponer su intimidad.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a className="btn-primary" href="/descargables/bitacora-jovenes-resonancia.pdf">
              Abrir bitácora breve
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="btn-secondary" href="/recursos/caracoles-resonando">
              Trabajar un proyecto
              <Shell size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="editorial-image min-h-[20rem] lg:min-h-[34rem]">
          <img
            src={IMAGES.youth}
            alt="Jóvenes reflexionando con criterio sobre su escuela y su lugar en el mundo"
            className="h-full w-full object-cover object-center"
          />
        </figure>
      </div>

      <div className="mx-auto mt-8 max-w-7xl rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
        <p className="section-kicker text-terracotta">Ruta joven</p>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {youthGuideSteps.map(([title, text], index) => (
            <article key={title} className="rounded-[1.2rem] border border-earth/15 bg-white/75 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">
                {index + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-forest">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-earth">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="leading-8 text-earth">
            Si un tema toca violencia, malestar fuerte o una situación de riesgo, la ruta no sustituye el apoyo de una
            persona adulta confiable, la escuela o una instancia especializada.
          </p>
          <a className="btn-secondary justify-self-start" href="/cognitologia">
            Ver criterios de pensamiento
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="max-w-4xl">
          <p className="section-kicker text-terracotta">Situaciones para pensar con voz propia</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-forest sm:text-5xl">
            Tener criterio no significa pensar a solas ni tener respuestas perfectas.
          </h2>
          <p className="mt-4 leading-8 text-earth">
            Significa aprender a reconocer lo que importa, buscar información, escuchar otras voces y decidir sin
            entregar por completo a alguien más la responsabilidad sobre la propia vida.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {youthSituations.map(({ title, question, movement, prompt, icon: Icon }) => (
            <article key={title} className="rounded-[1.35rem] border border-earth/15 bg-white/75 p-5 shadow-soft sm:p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest text-gold">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-3xl leading-tight text-forest">{title}</h3>
              <p className="mt-4 font-serif text-xl leading-8 text-terracotta">{question}</p>
              <p className="mt-4 text-sm leading-7 text-earth"><strong>Movimiento posible:</strong> {movement}</p>
              <p className="mt-4 rounded-2xl bg-clay/55 p-4 text-sm font-semibold leading-7 text-forest">Para tu bitácora: {prompt}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-[1.5rem] border border-cream/15 bg-forest p-5 text-cream shadow-soft sm:p-7">
          <p className="section-kicker text-gold">Brújula para decidir</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Una decisión consciente puede construirse por aproximaciones.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {youthDecisionCompass.map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-cream/15 bg-cream/[0.07] p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-black text-ink">{index + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl text-cream">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-cream/76">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
        <div className="grid gap-4">
          <article className="rounded-[1.5rem] border border-earth/15 bg-cream p-5 shadow-soft sm:p-7">
            <p className="section-kicker text-terracotta">Tu intimidad también cuenta</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-forest">Participar no obliga a contar todo.</h2>
            <p className="mt-4 leading-8 text-earth">
              Puedes pensar una experiencia sin escribir nombres ni detalles personales. También puedes pedir otro
              modo de participar cuando una actividad te expone o no respeta tus límites.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-gold/35 bg-[#fff8ee] p-5 shadow-soft sm:p-7">
            <p className="section-kicker text-terracotta">No tienes que resolverlo en soledad</p>
            <p className="mt-3 leading-8 text-earth">
              Si una situación implica violencia, riesgo, miedo persistente o afecta seriamente tu bienestar, busca a una
              persona adulta confiable o una instancia de apoyo. Esta ruta pedagógica no sustituye atención especializada.
            </p>
            <a className="btn-primary mt-6" href="/descargables/bitacora-jovenes-resonancia.pdf" download>
              Descargar bitácora en PDF
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </article>
        </div>
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
            Esta ruta ayuda a elegir una primera acción sin perderse: planear, comprender un proyecto, acompañar un proceso o leer el fundamento que sostiene la propuesta.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3 lg:mt-10 xl:gap-4">
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
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="compact-card bg-forest text-cream">
            <p className="section-kicker text-gold">Fundamento transversal</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight">Cognitología para la vida cotidiana</h3>
            <p className="mt-4 leading-8 text-cream/80">
              Ayuda a mirar cómo pensamos, decidimos, aprendemos y acompañamos. Sus criterios toman forma en Caracoles Resonando, los recursos pedagógicos y las preguntas de Resonancias.
            </p>
            <a className="btn-gold mt-5" href="/cognitologia">
              Comprender el fundamento
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
          <article className="compact-card bg-white/80">
            <p className="section-kicker text-terracotta">Recorrido sencillo</p>
            <ol className="mt-5 grid gap-3">
              {startHereSteps.map(([title, text], index) => (
                <li key={title} className="flex gap-3 leading-7 text-earth">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-black text-ink">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="text-forest">{title}:</strong> {text}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <article className="mt-8 overflow-hidden rounded-[1.6rem] border border-earth/15 bg-forest text-cream shadow-soft lg:mt-10">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-cream/[0.06] p-5 sm:p-7 lg:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
                <GraduationCap size={27} aria-hidden="true" />
              </div>
              <p className="section-kicker mt-6 text-gold">Ruta docente</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-5xl">
                Mirar el aula como territorio.
              </h3>
              <p className="mt-4 leading-8 text-cream/78">
                Para maestras y maestros que necesitan una entrada práctica: planear sin perder sentido, sostener el
                vínculo con el grupo y convertir el proyecto académico en una experiencia viva.
              </p>
              <div className="mt-6 rounded-2xl border border-gold/25 bg-ink/20 p-4">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-gold">Pregunta guía</p>
                <p className="mt-3 font-serif text-2xl leading-tight text-cream">
                  ¿Qué necesita mi grupo para aprender con claridad, participación y sentido comunitario?
                </p>
              </div>
              <figure className="mt-6 overflow-hidden rounded-[1.25rem] border border-gold/25 bg-cream/[0.06]">
                <img
                  src={IMAGES.about}
                  alt="Acompañamiento visual de la Maestra Kandy para orientar la ruta docente"
                  className="h-56 w-full object-cover object-[50%_18%]"
                />
                <figcaption className="p-4 text-sm leading-7 text-cream/78">
                  Una duda abre la Cognitología: ¿qué cambia en el aprendizaje cuando la conciencia empieza a mirar cómo
                  piensa?
                </figcaption>
              </figure>
            </div>

            <div className="grid gap-5 bg-cream p-5 text-ink sm:p-7 lg:p-8">
              <div>
                <p className="section-kicker text-terracotta">Acciones para hoy</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      title: 'Ubica el PA',
                      text: 'Elige grado, campo formativo y Proyecto Académico para reconocer horizonte, fuentes y estrategia detonadora.',
                    },
                    {
                      title: 'Lee con intención',
                      text: 'Revisa conceptos, producto final y pregunta de resonancia antes de decidir actividades.',
                    },
                    {
                      title: 'Cierra con evidencia',
                      text: 'Usa el mapa mental y la autoevaluación para que el grupo nombre lo aprendido.',
                    },
                  ].map(({ title, text }) => (
                    <div key={title} className="rounded-2xl border border-earth/15 bg-white/75 p-4">
                      <h4 className="font-serif text-2xl leading-tight text-forest">{title}</h4>
                      <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-gold/35 bg-clay/45 p-5">
                <p className="section-kicker text-terracotta">Mini guía de uso</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div>
                    <p className="font-bold text-forest">Antes de planear</p>
                    <p className="mt-2 text-sm leading-7 text-earth">Identifica propósito, páginas y estrategia detonadora del proyecto.</p>
                  </div>
                  <div>
                    <p className="font-bold text-forest">Durante el proyecto</p>
                    <p className="mt-2 text-sm leading-7 text-earth">Regresa a conceptos, horizonte y fuentes para orientar decisiones del grupo.</p>
                  </div>
                  <div>
                    <p className="font-bold text-forest">Después del proyecto</p>
                    <p className="mt-2 text-sm leading-7 text-earth">Imprime el mapa mental o usa la autoevaluación para recuperar aprendizajes.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.3rem] border border-earth/15 bg-white/80 p-5">
                  <p className="section-kicker text-terracotta">Checklist docente</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-7 text-earth">
                    {[
                      'Horizonte o propósito del Proyecto Académico.',
                      'Estrategia detonadora o producto final.',
                      'Conceptos académicos que deben quedar claros.',
                      'Fuentes y páginas que sostienen el trabajo.',
                      'Evidencia para valorar el aprendizaje del grupo.',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-1 shrink-0 text-forest" size={17} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.3rem] border border-earth/15 bg-white/80 p-5">
                  <p className="section-kicker text-terracotta">Preguntas para mirar al grupo</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-7 text-earth">
                    {[
                      '¿Qué sabe ya mi grupo sobre este tema?',
                      '¿Qué experiencia de la comunidad puede conectar con el proyecto?',
                      '¿Qué dificultad podría aparecer durante el proceso?',
                      '¿Qué evidencia mostrará aprendizaje real y no solo cumplimiento?',
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CircleDot className="mt-1 shrink-0 text-terracotta" size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-earth/15 bg-white/80 p-5">
                <p className="section-kicker text-terracotta">Microsecuencia didáctica</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                  {[
                    'Abrir con una pregunta.',
                    'Explorar saberes previos.',
                    'Consultar fuentes.',
                    'Organizar el producto.',
                    'Socializar hallazgos.',
                    'Valorar aprendizajes.',
                  ].map((step, index) => (
                    <div key={step} className="rounded-2xl bg-clay/45 p-4">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-black text-cream">
                        {index + 1}
                      </span>
                      <p className="mt-3 text-sm font-bold leading-6 text-forest">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.3rem] border border-gold/35 bg-[#fff8ee] p-5">
                  <div className="flex items-start gap-3">
                    <Brain className="mt-1 shrink-0 text-terracotta" size={24} aria-hidden="true" />
                    <div>
                      <p className="section-kicker text-terracotta">Criterios de pensamiento</p>
                      <p className="mt-3 text-sm leading-7 text-earth">
                        La ruta docente ayuda a mirar qué pensamiento se moviliza en el proyecto: pensamiento crítico,
                        creativo, comunitario, científico, histórico, lingüístico o estratégico, según el campo formativo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.3rem] border border-forest/20 bg-forest p-5 text-cream">
                  <p className="section-kicker text-gold">Honestidad pedagógica</p>
                  <p className="mt-3 text-sm leading-7 text-cream/82">
                    Esta ruta no sustituye tu criterio docente: lo ordena, lo acompaña y lo vuelve visible para tomar
                    mejores decisiones con tu grupo.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="btn-primary" href="/recursos/caracoles-resonando">
                  Elegir PA y comenzar planeación
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <ExternalLink className="btn-secondary" href={LINKS.whatsapp} label="Escribir por WhatsApp sobre la ruta docente">
                  Consultar por WhatsApp
                  <MessageCircle size={17} aria-hidden="true" />
                </ExternalLink>
              </div>
            </div>
          </div>
        </article>

        <article className="mt-6 overflow-hidden rounded-[1.6rem] border border-earth/15 bg-white/85 shadow-soft">
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
            <figure className="min-h-[20rem] overflow-hidden bg-clay">
              <img
                src={IMAGES.families}
                alt="Familias acompañando procesos de aprendizaje con cuidado y diálogo"
                className="h-full w-full object-cover object-center"
              />
            </figure>
            <div className="grid gap-5 p-5 sm:p-7 lg:p-8">
              <div>
                <p className="section-kicker text-terracotta">Ruta familias</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-5xl">
                  Acompañar sin miedo.
                </h3>
                <p className="mt-4 leading-8 text-earth">
                  Para madres, padres y tutores que quieren estar presentes sin convertir el acompañamiento escolar en
                  presión, regaño o culpa.
                </p>
              </div>

              <div className="rounded-[1.3rem] border border-gold/35 bg-[#fff8ee] p-5">
                <p className="section-kicker text-terracotta">Pregunta guía</p>
                <p className="mt-3 font-serif text-2xl leading-tight text-forest">
                  ¿Cómo puedo ayudar a aprender sin controlar todo el proceso?
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ['Escucha primero', 'Pregunta qué entendió, qué le costó y qué necesita antes de corregir.'],
                  ['Ordena el momento', 'Acuerda un tiempo breve, un lugar posible y una meta pequeña.'],
                  ['Reconoce avances', 'Nombra el esfuerzo, la duda resuelta y el paso siguiente.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-earth/15 bg-cream p-4">
                    <h4 className="font-serif text-2xl leading-tight text-forest">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.3rem] border border-earth/15 bg-clay/45 p-5">
                <p className="section-kicker text-terracotta">Preguntas para conversar en casa</p>
                <ul className="mt-4 grid gap-2 text-sm leading-7 text-earth">
                  {[
                    '¿Qué fue lo más importante que descubriste hoy?',
                    '¿Qué parte te gustaría explicar con tus propias palabras?',
                    '¿Qué necesitas para terminar con más calma?',
                    '¿Cómo se conecta esto con nuestra vida diaria o comunidad?',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CircleDot className="mt-1 shrink-0 text-terracotta" size={16} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.3rem] bg-forest p-5 text-cream">
                <p className="section-kicker text-gold">Cuidado pedagógico</p>
                <p className="mt-3 text-sm leading-7 text-cream/82">
                  Acompañar no es hacer la tarea por alguien ni vigilar cada paso: es ayudar a que la persona joven
                  encuentre orden, confianza y palabra propia.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="mt-6 overflow-hidden rounded-[1.6rem] border border-earth/15 bg-clay/55 shadow-soft">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-5 p-5 sm:p-7 lg:p-8">
              <div>
                <p className="section-kicker text-terracotta">Ruta jóvenes</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-forest sm:text-5xl">
                  Pensar mi lugar en el mundo.
                </h3>
                <p className="mt-4 leading-8 text-earth">
                  Para estudiantes y jóvenes que necesitan preguntas sencillas para mirar su vida escolar, su identidad,
                  sus decisiones y su relación con la comunidad.
                </p>
              </div>

              <div className="rounded-[1.3rem] border border-gold/35 bg-white/80 p-5">
                <p className="section-kicker text-terracotta">Pregunta guía</p>
                <p className="mt-3 font-serif text-2xl leading-tight text-forest">
                  ¿Qué quiero comprender de mí, de mi escuela y de mi comunidad?
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ['Nombrar', 'Escribe qué piensas, sientes o dudas antes de empezar.'],
                  ['Relacionar', 'Conecta el tema con algo que pase en tu casa, escuela o comunidad.'],
                  ['Crear', 'Elabora una evidencia que diga algo de ti y de lo que comprendiste.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-earth/15 bg-white/80 p-4">
                    <h4 className="font-serif text-2xl leading-tight text-forest">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.3rem] border border-earth/15 bg-cream p-5">
                <p className="section-kicker text-terracotta">Mini bitácora joven</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    ['Hoy entiendo...', 'Una idea que ya puedo explicar.'],
                    ['Todavía me pregunto...', 'Una duda honesta para seguir buscando.'],
                    ['Puedo aportar...', 'Una acción pequeña para mi grupo o comunidad.'],
                  ].map(([title, text]) => (
                    <div key={title}>
                      <p className="font-bold text-forest">{title}</p>
                      <p className="mt-2 text-sm leading-7 text-earth">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

            <a className="btn-secondary justify-self-start" href="/jovenes">
                Ir a la ruta joven
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <figure className="min-h-[20rem] overflow-hidden bg-forest">
              <img
                src={IMAGES.youth}
                alt="Jóvenes pensando su escuela, identidad y comunidad"
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </div>
        </article>

        <article className="mt-6 rounded-[1.6rem] border border-earth/15 bg-forest p-5 text-cream shadow-soft sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/18 text-gold">
                <Compass size={27} aria-hidden="true" />
              </div>
              <p className="section-kicker mt-6 text-gold">Conocer la propuesta</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-cream sm:text-5xl">
                Entrar al universo Ecos.
              </h3>
              <p className="mt-4 leading-8 text-cream/78">
                Para quien llega por primera vez y quiere entender el sentido de Ecos de Emancipación antes de elegir una
                herramienta, una lectura o una forma de participar.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ['Lee el manifiesto', 'Comprende la raíz ética y pedagógica del proyecto.'],
                  ['Explora el mapa', 'Reconoce las áreas vivas: recursos, escuela, música, tienda y resonancias.'],
                  ['Elige una acción', 'Usa Caracoles, lee una ruta, escribe por WhatsApp o comparte el sitio.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-cream/15 bg-cream/[0.07] p-4">
                    <h4 className="font-serif text-2xl leading-tight text-cream">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-cream/76">{text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.3rem] border border-gold/25 bg-ink/20 p-5">
                <p className="section-kicker text-gold">Primera decisión</p>
                <p className="mt-3 font-serif text-2xl leading-tight text-cream">
                  Si una idea te mueve, no necesitas entenderlo todo: elige una puerta, entra con calma y vuelve cuando lo
                  necesites.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="btn-gold" href="/manifiesto">
                  Leer manifiesto
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a className="btn-light" href="/#mapa-universo">
                  Ver mapa del universo Ecos
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>
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
      href="/#mapa-interactivo"
      aria-label="Volver al mapa del universo Ecos"
      title="Volver al mapa del universo Ecos"
      className="map-floating-button"
    >
      <Compass size={20} aria-hidden="true" />
    </a>
  );
}

function BackToTop() {
  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      className="top-floating-button"
      onClick={handleClick}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}

export default App;
