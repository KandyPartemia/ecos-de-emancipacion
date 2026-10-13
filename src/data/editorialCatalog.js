export const editorialDirections = [
  {
    id: 'pedagogia-cognitologia',
    shortLabel: 'Pedagogía y Cognitología',
    title: 'Pedagogía, Cognitología y conocimiento',
    description:
      'Ensayos y herramientas para formar criterios de pensamiento, acompañar la vida cotidiana y transformar la práctica educativa.',
  },
  {
    id: 'historia-sociedad',
    shortLabel: 'Historia y sociedad',
    title: 'Historia, sociedad y emancipación',
    description:
      'Lecturas críticas sobre la memoria, las disputas sociales y las posibilidades de construir horizontes compartidos.',
  },
  {
    id: 'economia-trabajo',
    shortLabel: 'Economía y trabajo',
    title: 'Economía, trabajo y emprendimiento',
    description:
      'Obras para pensar el trabajo, la producción y los proyectos económicos con criterio, responsabilidad y autonomía.',
  },
  {
    id: 'filosofia-simbolismo',
    shortLabel: 'Filosofía y simbolismo',
    title: 'Filosofía, simbolismo y pensamiento masónico',
    description:
      'Exploraciones filosóficas y simbólicas sobre la razón, la conciencia y las formas de comprender la experiencia humana.',
  },
];

export const editorialStatuses = {
  available: 'Disponible',
  review: 'En revisión editorial',
  development: 'En desarrollo',
};

export const publications = [
  {
    id: 'cognitologia-familias',
    legacyId: 'casa-aprende',
    direction: 'pedagogia-cognitologia',
    collection: 'Colección Cognitología',
    title: 'Cognitología para familias',
    subtitle: 'Una pedagogía del vínculo para acompañar la vida cotidiana',
    author: 'Kandy Partemia González Torreblanca',
    category: 'Ensayo pedagógico para familias y personas cuidadoras',
    description:
      'Una invitación a acompañar a niñas, niños y adolescentes desde el vínculo, la escucha, los límites y la construcción de criterio.',
    promotionalDescription:
      'Entre el deseo de proteger y la necesidad de permitir que niñas, niños y adolescentes construyan su propio criterio, la vida familiar está llena de decisiones sin respuestas perfectas. Este ensayo propone comprender el acompañamiento como una práctica de vínculo, escucha, límites y pensamiento compartido.',
    audience: 'Familias y personas cuidadoras',
    image: '/images/publicaciones/cognitologia-familias-portada.png',
    webImage: '/images/publicaciones/cognitologia-familias-portada.webp',
    alt: 'Portada de Cognitología para familias, de Kandy Partemia González Torreblanca',
    detailRoute: '/publicaciones/cognitologia-familias',
    status: 'review',
  },
  {
    id: 'cognitologia-docentes',
    legacyId: 'escuela-pregunta',
    direction: 'pedagogia-cognitologia',
    collection: 'Colección Cognitología',
    title: 'Cognitología para docentes',
    subtitle: 'Una pedagogía del criterio para transformar la vida cotidiana',
    author: 'Kandy Partemia González Torreblanca',
    category: 'Ensayo pedagógico',
    description:
      'Un ensayo pedagógico para mirar la práctica docente, formar criterios de pensamiento y transformar la vida cotidiana desde una perspectiva humana, crítica y situada.',
    promotionalDescription:
      'Este libro presenta la Cognitología como una propuesta pedagógica, gnoseológica y política situada, emergente y revisable. No ofrece recetas: invita a preguntar, contrastar, nombrar y construir formas más humanas de habitar la educación.',
    audience: 'Docentes y comunidades educativas',
    image: '/images/publicaciones/cognitologia-docentes-portada.png',
    webImage: '/images/publicaciones/cognitologia-docentes-portada.webp',
    alt: 'Portada de Cognitología para docentes, de Kandy Partemia González Torreblanca',
    detailRoute: '/publicaciones/cognitologia-docentes',
    status: 'review',
  },
  {
    id: 'diccionario-critico-cognitologia',
    direction: 'pedagogia-cognitologia',
    title: 'Diccionario crítico de la Cognitología',
    description: 'Título incorporado al catálogo editorial de Ecos. Su ficha ampliada se publicará cuando sus metadatos estén confirmados.',
    status: 'development',
  },
  {
    id: 'cognitologia-vida-cotidiana',
    direction: 'pedagogia-cognitologia',
    title: 'Cognitología para la vida cotidiana',
    description: 'Obra en preparación dentro del fundamento pedagógico y filosófico de Ecos de Emancipación.',
    status: 'development',
  },
  {
    id: 'disputar-lo-posible-volumen-i',
    direction: 'historia-sociedad',
    title: 'Disputar lo posible, volumen I',
    description: 'Título registrado en la vertiente de historia, sociedad y emancipación. Aún no se presenta como disponible.',
    status: 'review',
  },
  {
    id: 'secreto-producto-segunda-edicion',
    direction: 'economia-trabajo',
    title: 'El secreto está en el producto, segunda edición',
    description: 'Título registrado en la vertiente de economía, trabajo y emprendimiento. Aún no se presenta como disponible.',
    status: 'review',
  },
  {
    id: 'once-pasos-negocios-multinivel',
    direction: 'economia-trabajo',
    title: '11 pasos para triunfar en los negocios multinivel',
    description: 'Título incorporado al catálogo. Sus datos editoriales y condiciones de circulación permanecen por confirmar.',
    status: 'review',
  },
  {
    id: 'razon-bajo-escuadra',
    direction: 'filosofia-simbolismo',
    title: 'La razón bajo la escuadra',
    description: 'Título registrado en la vertiente de filosofía, simbolismo y pensamiento masónico. Aún no se presenta como disponible.',
    status: 'review',
  },
  {
    id: 'archivos-ollin',
    direction: 'pedagogia-cognitologia',
    collection: 'Los archivos de Ollin',
    title: 'La señal de las preguntas perdidas',
    subtitle: 'Los archivos de Ollin, Tomo I',
    author: 'Kandy Partemia González Torreblanca',
    category: 'Narrativa para adolescentes',
    description:
      'Una historia para jóvenes donde las preguntas, la amistad y el misterio abren caminos para pensar el mundo y el lugar propio.',
    audience: 'Adolescentes, jóvenes, familias y mediadores de lectura',
    image: '/images/publicaciones/la-senal-de-las-preguntas-perdidas.jpg',
    alt: 'Portada de La señal de las preguntas perdidas, Tomo I de Los archivos de Ollin',
    detailRoute: '/publicaciones#archivos-ollin',
    status: 'available',
  },
];

export const featuredPublications = publications.filter(({ id }) =>
  ['cognitologia-familias', 'cognitologia-docentes', 'archivos-ollin'].includes(id),
);
