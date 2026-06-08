import type { AcademicConcept, AcademicProject } from '../types';
import type {
  CurricularConceptEntry,
  CurricularDevelopmentProject,
  CurricularDevelopmentProjectView,
  CurricularOtherMaterialEntry,
  CurricularSourcePageEntry,
  CurricularStrategyEntry,
} from './curricularDevelopmentLoader';
import {
  type AcademicProjectRecord,
  type ProjectSourceStatus,
  type ProjectStrategyRecord,
} from './academicProjectRecord';
import { generateCrossword } from './wordSearchGenerator';
import {
  OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_TITLES,
  OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_URLS,
  OFFICIAL_YOUTUBE_PARTIAL_CLASSROOM_VIDEO_TITLES,
  OFFICIAL_YOUTUBE_PARTIAL_CLASSROOM_VIDEO_URLS,
} from './officialVideoLinks';

function normalizeKey(value: string) {
  const source = /[ÃƒÃ‚Ã¢]/.test(value || '')
    ? (() => {
        try {
          return decodeURIComponent(escape(value));
        } catch {
          return value;
        }
      })()
    : value;

  return source
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function repairMojibake(value?: string) {
  if (!value || !/[ÃÂâ]/.test(value)) {
    return value || '';
  }

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

function buildAcademicProjectResourceKey(project: AcademicProject) {
  return `${normalizeKey(project.grade)}|${normalizeKey(project.field)}|PA${String(
    project.academicProjectNumber || '',
  ).trim()}`;
}

function resolvePpaNumber(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  return String(
    view?.developmentProject?.ppaNumber ||
      view?.bundle.development?.ppaNumber ||
      project.partialClassroomProject?.replace(/[^\d]/g, '') ||
      '',
  ).trim();
}

function buildPartialClassroomResourceKey(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  return `${normalizeKey(project.grade)}|${normalizeKey(project.field)}|PPA${resolvePpaNumber(project, view)}`;
}

const VALIDATED_ACADEMIC_PROJECT_VIDEO_URLS: Record<string, string> = {
  '1|lenguajes|PA1': 'https://nemd.aprende.gob.mx/contenido/recurso/21066/',
  '1|lenguajes|PA2': 'https://nemd.aprende.gob.mx/contenido/recurso/21067/',
  '1|lenguajes|PA3': 'https://nemd.aprende.gob.mx/contenido/recurso/21068/',
  '1|lenguajes|PA4': 'https://nemd.aprende.gob.mx/contenido/recurso/21069/',
  '1|lenguajes|PA5': 'https://nemd.aprende.gob.mx/contenido/recurso/21070/',
  '1|lenguajes|PA6': 'https://nemd.aprende.gob.mx/contenido/recurso/21071/',
  '1|lenguajes|PA7': 'https://nemd.aprende.gob.mx/contenido/recurso/21072/',
  '1|lenguajes|PA8': 'https://nemd.aprende.gob.mx/contenido/recurso/21073/',
  '1|lenguajes|PA9': 'https://nemd.aprende.gob.mx/contenido/recurso/21074/',
  '1|lenguajes|PA10': 'https://nemd.aprende.gob.mx/contenido/recurso/21075/',
  '1|lenguajes|PA11': 'https://nemd.aprende.gob.mx/contenido/recurso/21076/',
  '1|lenguajes|PA12': 'https://nemd.aprende.gob.mx/contenido/recurso/21077/',
  '1|lenguajes|PA13': 'https://nemd.aprende.gob.mx/contenido/recurso/21078/',
  '1|lenguajes|PA14': 'https://nemd.aprende.gob.mx/contenido/recurso/21079/',
  '1|lenguajes|PA16': 'https://nemd.aprende.gob.mx/contenido/recurso/21090/',
  '1|lenguajes|PA17': 'https://nemd.aprende.gob.mx/contenido/recurso/21091/',
  '1|lenguajes|PA18': 'https://nemd.aprende.gob.mx/contenido/recurso/21092/',
  '1|lenguajes|PA19': 'https://nemd.aprende.gob.mx/contenido/recurso/21093/',
  '1|lenguajes|PA20': 'https://nemd.aprende.gob.mx/contenido/recurso/21094/',
  '1|lenguajes|PA21': 'https://nemd.aprende.gob.mx/contenido/recurso/21095/',
  '1|lenguajes|PA22': 'https://nemd.aprende.gob.mx/contenido/recurso/21096/',
  '1|lenguajes|PA23': 'https://nemd.aprende.gob.mx/contenido/recurso/21097/',
  '1|lenguajes|PA24': 'https://nemd.aprende.gob.mx/contenido/recurso/21098/',
  '1|lenguajes|PA25': 'https://nemd.aprende.gob.mx/contenido/recurso/21099/',
  '1|lenguajes|PA26': 'https://nemd.aprende.gob.mx/contenido/recurso/21100/',
  '1|lenguajes|PA27': 'https://nemd.aprende.gob.mx/contenido/recurso/21101/',
  '1|lenguajes|PA28': 'https://nemd.aprende.gob.mx/contenido/recurso/21102/',
  '1|lenguajes|PA29': 'https://nemd.aprende.gob.mx/contenido/recurso/21103/',
  '1|lenguajes|PA30': 'https://nemd.aprende.gob.mx/contenido/recurso/21104/',
  '1|lenguajes|PA31': 'https://nemd.aprende.gob.mx/contenido/recurso/21110/',
  '1|lenguajes|PA32': 'https://nemd.aprende.gob.mx/contenido/recurso/21111/',
  '1|lenguajes|PA33': 'https://nemd.aprende.gob.mx/contenido/recurso/21112/',
  '1|lenguajes|PA34': 'https://nemd.aprende.gob.mx/contenido/recurso/21113/',
  '1|lenguajes|PA35': 'https://nemd.aprende.gob.mx/contenido/recurso/21114/',
  '1|lenguajes|PA36': 'https://nemd.aprende.gob.mx/contenido/recurso/21115/',
  '1|lenguajes|PA37': 'https://nemd.aprende.gob.mx/contenido/recurso/21116/',
  '1|lenguajes|PA38': 'https://nemd.aprende.gob.mx/contenido/recurso/21117/',
  '1|lenguajes|PA39': 'https://nemd.aprende.gob.mx/contenido/recurso/21118/',
  '1|lenguajes|PA40': 'https://nemd.aprende.gob.mx/contenido/recurso/21119/',
  '1|lenguajes|PA41': 'https://nemd.aprende.gob.mx/contenido/recurso/21120/',
  '1|lenguajes|PA42': 'https://nemd.aprende.gob.mx/contenido/recurso/21121/',
  '1|lenguajes|PA45': 'https://nemd.aprende.gob.mx/contenido/recurso/21122/',
  '1|saberes y pensamiento cientifico|PA1': 'https://nemd.aprende.gob.mx/contenido/recurso/21123/',
  '1|saberes y pensamiento cientifico|PA2': 'https://nemd.aprende.gob.mx/contenido/recurso/21124/',
  '1|saberes y pensamiento cientifico|PA3': 'https://nemd.aprende.gob.mx/contenido/recurso/21125/',
  '1|saberes y pensamiento cientifico|PA4': 'https://nemd.aprende.gob.mx/contenido/recurso/21126/',
  '1|saberes y pensamiento cientifico|PA5': 'https://nemd.aprende.gob.mx/contenido/recurso/21127/',
  '1|saberes y pensamiento cientifico|PA6': 'https://nemd.aprende.gob.mx/contenido/recurso/21128/',
  '1|saberes y pensamiento cientifico|PA7': 'https://nemd.aprende.gob.mx/contenido/recurso/21129/',
  '1|saberes y pensamiento cientifico|PA8': 'https://nemd.aprende.gob.mx/contenido/recurso/21130/',
  '1|saberes y pensamiento cientifico|PA9': 'https://nemd.aprende.gob.mx/contenido/recurso/21131/',
  '1|saberes y pensamiento cientifico|PA10': 'https://nemd.aprende.gob.mx/contenido/recurso/21132/',
  '1|saberes y pensamiento cientifico|PA11': 'https://nemd.aprende.gob.mx/contenido/recurso/21133/',
  '1|saberes y pensamiento cientifico|PA12': 'https://nemd.aprende.gob.mx/contenido/recurso/21134/',
  '1|saberes y pensamiento cientifico|PA13': 'https://nemd.aprende.gob.mx/contenido/recurso/21135/',
  '1|saberes y pensamiento cientifico|PA14': 'https://nemd.aprende.gob.mx/contenido/recurso/21136/',
  '1|saberes y pensamiento cientifico|PA15': 'https://nemd.aprende.gob.mx/contenido/recurso/21137/',
  '1|saberes y pensamiento cientifico|PA16': 'https://nemd.aprende.gob.mx/contenido/recurso/21148/',
  '1|saberes y pensamiento cientifico|PA17': 'https://nemd.aprende.gob.mx/contenido/recurso/21149/',
  '1|saberes y pensamiento cientifico|PA18': 'https://nemd.aprende.gob.mx/contenido/recurso/21150/',
  '1|saberes y pensamiento cientifico|PA19': 'https://nemd.aprende.gob.mx/contenido/recurso/21151/',
  '1|saberes y pensamiento cientifico|PA20': 'https://nemd.aprende.gob.mx/contenido/recurso/21152/',
  '1|saberes y pensamiento cientifico|PA21': 'https://nemd.aprende.gob.mx/contenido/recurso/21153/',
  '1|saberes y pensamiento cientifico|PA22': 'https://nemd.aprende.gob.mx/contenido/recurso/21154/',
  '1|saberes y pensamiento cientifico|PA23': 'https://nemd.aprende.gob.mx/contenido/recurso/21155/',
  '1|saberes y pensamiento cientifico|PA24': 'https://nemd.aprende.gob.mx/contenido/recurso/21156/',
  '1|saberes y pensamiento cientifico|PA25': 'https://nemd.aprende.gob.mx/contenido/recurso/21157/',
  '1|saberes y pensamiento cientifico|PA26': 'https://nemd.aprende.gob.mx/contenido/recurso/21158/',
  '1|saberes y pensamiento cientifico|PA27': 'https://nemd.aprende.gob.mx/contenido/recurso/21159/',
  '1|saberes y pensamiento cientifico|PA28': 'https://nemd.aprende.gob.mx/contenido/recurso/21160/',
  '1|saberes y pensamiento cientifico|PA29': 'https://nemd.aprende.gob.mx/contenido/recurso/21161/',
  '1|saberes y pensamiento cientifico|PA30': 'https://nemd.aprende.gob.mx/contenido/recurso/21162/',
  '1|saberes y pensamiento cientifico|PA31': 'https://nemd.aprende.gob.mx/contenido/recurso/21168/',
  '1|saberes y pensamiento cientifico|PA32': 'https://nemd.aprende.gob.mx/contenido/recurso/21169/',
  '1|saberes y pensamiento cientifico|PA33': 'https://nemd.aprende.gob.mx/contenido/recurso/21170/',
  '1|saberes y pensamiento cientifico|PA34': 'https://nemd.aprende.gob.mx/contenido/recurso/21171/',
  '1|saberes y pensamiento cientifico|PA35': 'https://nemd.aprende.gob.mx/contenido/recurso/21172/',
  '1|saberes y pensamiento cientifico|PA36': 'https://nemd.aprende.gob.mx/contenido/recurso/21173/',
  '1|saberes y pensamiento cientifico|PA37': 'https://nemd.aprende.gob.mx/contenido/recurso/21174/',
  '1|saberes y pensamiento cientifico|PA38': 'https://nemd.aprende.gob.mx/contenido/recurso/21175/',
  '1|saberes y pensamiento cientifico|PA39': 'https://nemd.aprende.gob.mx/contenido/recurso/21176/',
  '1|saberes y pensamiento cientifico|PA40': 'https://nemd.aprende.gob.mx/contenido/recurso/21177/',
  '1|saberes y pensamiento cientifico|PA41': 'https://nemd.aprende.gob.mx/contenido/recurso/21178/',
  '1|saberes y pensamiento cientifico|PA42': 'https://nemd.aprende.gob.mx/contenido/recurso/21179/',
  '1|saberes y pensamiento cientifico|PA43': 'https://nemd.aprende.gob.mx/contenido/recurso/21180/',
  '1|saberes y pensamiento cientifico|PA44': 'https://nemd.aprende.gob.mx/contenido/recurso/21181/',
  '1|saberes y pensamiento cientifico|PA45': 'https://nemd.aprende.gob.mx/contenido/recurso/21182/',
};

const VALIDATED_ACADEMIC_PROJECT_VIDEO_TITLES: Record<string, string> = {
  '1|lenguajes|PA1': '1. Encuentro breve de lecturas comentadas',
  '1|lenguajes|PA2': '2. Tarjetas multiculturales',
  '1|lenguajes|PA3': '3. Tertulia artística',
  '1|lenguajes|PA4': '4. Esquema lingüístico',
  '1|lenguajes|PA5': '5. Explicación ilustrada',
  '1|lenguajes|PA6': '6. Texto breve ilustrado',
  '1|lenguajes|PA7': '7. Entrevista personal',
  '1|lenguajes|PA8': '8. Objeto artesanal',
  '1|lenguajes|PA9': '9. Cuadro comparativo',
  '1|lenguajes|PA10': '10. Glosario del pasado',
  '1|lenguajes|PA11': '11. Catálogo lingüístico local',
  '1|lenguajes|PA12': '12. Tarjetas reveladoras',
  '1|lenguajes|PA13': '13. Historia con solución',
  '1|lenguajes|PA14': '14. Asamblea reveladora',
  '1|lenguajes|PA36': 'Decálogo de acciones • Lenguajes • 1er grado | Video detonador',
  '1|saberes y pensamiento cientifico|PA1': '1. Carteles gráficos',
  '1|saberes y pensamiento cientifico|PA2': '2. Infografía combinada',
  '1|saberes y pensamiento cientifico|PA3': '3. Infografía con dimensiones',
  '1|saberes y pensamiento cientifico|PA4': '4. Infografía equitativa',
  '1|saberes y pensamiento cientifico|PA5': '5. Folleto de divulgación',
  '1|saberes y pensamiento cientifico|PA6': '6. Cartel desordenado',
  '1|saberes y pensamiento cientifico|PA7': '7. Periodiquito mural',
  '1|saberes y pensamiento cientifico|PA8': '8. Mapa mental original',
  '1|saberes y pensamiento cientifico|PA9': '9. Pequeña presentación',
  '1|saberes y pensamiento cientifico|PA10': '10. Registros visuales',
  '1|saberes y pensamiento cientifico|PA11': '11. Maqueta portátil',
  '1|saberes y pensamiento cientifico|PA12': '12. Informe integrador',
  '1|saberes y pensamiento cientifico|PA13': '13. Cartelito con dimensiones',
  '1|saberes y pensamiento cientifico|PA14': '14. Cartel fragmentado',
  '1|saberes y pensamiento cientifico|PA15': '15. Tarjeta doble',
  '1|saberes y pensamiento cientifico|PA16': '16. Muestra ilustrativa',
  '1|saberes y pensamiento cientifico|PA17': '17. Puesta de productos',
  '1|saberes y pensamiento cientifico|PA18': '18. Periódico mural',
  '1|saberes y pensamiento cientifico|PA19': '19. Maqueta representativa',
  '1|saberes y pensamiento cientifico|PA20': '20. Láminas didácticas',
  '1|saberes y pensamiento cientifico|PA21': '21. Dibujo señalador',
  '1|saberes y pensamiento cientifico|PA22': '22. Mapa mental',
  '1|saberes y pensamiento cientifico|PA23': '23. Modelos de plastilina',
  '1|saberes y pensamiento cientifico|PA24': '24. Dibujo genético-algebraico',
  '1|saberes y pensamiento cientifico|PA25': '25. Catálogo de bacterias ilustrado',
  '1|saberes y pensamiento cientifico|PA26': '26. Infografía bicolor',
  '1|saberes y pensamiento cientifico|PA27': '27. Álbum de vacunas y ángulos ilustrado',
  '1|saberes y pensamiento cientifico|PA28': '28. Tríptico con dibujos',
  '1|saberes y pensamiento cientifico|PA29': '29. Collage con imágenes',
  '1|saberes y pensamiento cientifico|PA30': '30. Tablas de información',
  '1|saberes y pensamiento cientifico|PA31': '31. Rotafolio sencillo',
  '1|saberes y pensamiento cientifico|PA32': '32. Rotafolio con recortes',
  '1|saberes y pensamiento cientifico|PA33': '33. Esquema con ilustraciones',
  '1|saberes y pensamiento cientifico|PA34': '34. Fichas temáticas',
  '1|saberes y pensamiento cientifico|PA35': '35. Exposición demostrativa',
  '1|saberes y pensamiento cientifico|PA36': '36. Carteles ilustrados',
  '1|saberes y pensamiento cientifico|PA37': '37. Evidencias prácticas',
  '1|saberes y pensamiento cientifico|PA38': '38. Juego geométrico casero',
  '1|saberes y pensamiento cientifico|PA39': '39. Geoplano de figuras recortables',
  '1|saberes y pensamiento cientifico|PA40': '40. Esquemas del microscopio',
  '1|saberes y pensamiento cientifico|PA41': '41. Muestra de modelos celulares',
  '1|saberes y pensamiento cientifico|PA42': '42. Decálogo preventivo',
  '1|saberes y pensamiento cientifico|PA43': '43. Mapa de procesos',
  '1|saberes y pensamiento cientifico|PA44': '44. Panel estudiantil',
  '1|saberes y pensamiento cientifico|PA45': '45. Exposición lúdica',
};

const OFFICIAL_PARTIAL_CLASSROOM_RESOURCE_URLS: Record<string, string> = {
  '1|lenguajes|PPA1': 'https://nemd.aprende.gob.mx/contenido/recurso/21080/',
  '1|lenguajes|PPA2': 'https://nemd.aprende.gob.mx/contenido/recurso/21081/',
  '1|lenguajes|PPA3': 'https://nemd.aprende.gob.mx/contenido/recurso/21082/',
  '1|lenguajes|PPA4': 'https://nemd.aprende.gob.mx/contenido/recurso/21083/',
  '1|lenguajes|PPA5': 'https://nemd.aprende.gob.mx/contenido/recurso/21084/',
  '1|lenguajes|PPA6': 'https://nemd.aprende.gob.mx/contenido/recurso/21085/',
  '1|lenguajes|PPA7': 'https://nemd.aprende.gob.mx/contenido/recurso/21086/',
  '1|lenguajes|PPA8': 'https://nemd.aprende.gob.mx/contenido/recurso/21087/',
  '1|lenguajes|PPA9': 'https://nemd.aprende.gob.mx/contenido/recurso/21088/',
  '1|lenguajes|PPA10': 'https://nemd.aprende.gob.mx/contenido/recurso/21089/',
  '1|lenguajes|PPA11': 'https://nemd.aprende.gob.mx/contenido/recurso/21105/',
  '1|lenguajes|PPA12': 'https://nemd.aprende.gob.mx/contenido/recurso/21106/',
  '1|lenguajes|PPA13': 'https://nemd.aprende.gob.mx/contenido/recurso/21107/',
  '1|lenguajes|PPA14': 'https://nemd.aprende.gob.mx/contenido/recurso/21108/',
  '1|lenguajes|PPA15': 'https://nemd.aprende.gob.mx/contenido/recurso/21109/',
  '1|saberes y pensamiento cientifico|PPA1': 'https://nemd.aprende.gob.mx/contenido/recurso/21143/',
  '1|saberes y pensamiento cientifico|PPA2': 'https://nemd.aprende.gob.mx/contenido/recurso/21144/',
  '1|saberes y pensamiento cientifico|PPA3': 'https://nemd.aprende.gob.mx/contenido/recurso/21145/',
  '1|saberes y pensamiento cientifico|PPA4': 'https://nemd.aprende.gob.mx/contenido/recurso/21146/',
  '1|saberes y pensamiento cientifico|PPA5': 'https://nemd.aprende.gob.mx/contenido/recurso/21147/',
  '1|saberes y pensamiento cientifico|PPA6': 'https://nemd.aprende.gob.mx/contenido/recurso/21138/',
  '1|saberes y pensamiento cientifico|PPA7': 'https://nemd.aprende.gob.mx/contenido/recurso/21139/',
  '1|saberes y pensamiento cientifico|PPA8': 'https://nemd.aprende.gob.mx/contenido/recurso/21140/',
  '1|saberes y pensamiento cientifico|PPA9': 'https://nemd.aprende.gob.mx/contenido/recurso/21141/',
  '1|saberes y pensamiento cientifico|PPA10': 'https://nemd.aprende.gob.mx/contenido/recurso/21142/',
  '1|saberes y pensamiento cientifico|PPA11': 'https://nemd.aprende.gob.mx/contenido/recurso/21163/',
  '1|saberes y pensamiento cientifico|PPA12': 'https://nemd.aprende.gob.mx/contenido/recurso/21164/',
  '1|saberes y pensamiento cientifico|PPA13': 'https://nemd.aprende.gob.mx/contenido/recurso/21165/',
  '1|saberes y pensamiento cientifico|PPA14': 'https://nemd.aprende.gob.mx/contenido/recurso/21166/',
  '1|saberes y pensamiento cientifico|PPA15': 'https://nemd.aprende.gob.mx/contenido/recurso/21167/',
};

const OFFICIAL_PARTIAL_CLASSROOM_RESOURCE_TITLES: Record<string, string> = {
  '1|lenguajes|PPA1': '1. ¡Así lo siento, así te lo comparto!',
  '1|lenguajes|PPA2': '2. ¡Diversidad en la naturaleza, diversidad en las sociedades!',
  '1|lenguajes|PPA3': '3. ¡Me identifico, pertenezco!',
  '1|lenguajes|PPA4': '4. Nuestro patrimonio lingüístico',
  '1|lenguajes|PPA5': '5. Juntos a resolver problemas',
  '1|lenguajes|PPA12': '12. Puentes de comunicación en construcción',
  '1|saberes y pensamiento cientifico|PPA1': '1. ¡Un buen inicio!',
  '1|saberes y pensamiento cientifico|PPA2': '2. ¡Avanzamos con paso firme!',
  '1|saberes y pensamiento cientifico|PPA3': '3. ¡Reafirmemos, revisemos, corrijamos: mejoremos!',
  '1|saberes y pensamiento cientifico|PPA4': '4. Una exposición en comunidad',
  '1|saberes y pensamiento cientifico|PPA5': '5. ¡Lo vivo y no lo vivo, vamos a reconocerlo!',
  '1|saberes y pensamiento cientifico|PPA6': '6. El cambio de los seres vivos en el tiempo',
  '1|saberes y pensamiento cientifico|PPA7': '7. El círculo y los ciclos biogeoquímicos',
  '1|saberes y pensamiento cientifico|PPA8': '8. Encuentra las figuras geométricas con el uso del microscopio',
  '1|saberes y pensamiento cientifico|PPA9': '9. La divertida estructura de las bacterias y los virus',
  '1|saberes y pensamiento cientifico|PPA10': '10. El álgebra y los daños causados por el calentamiento global',
  '1|saberes y pensamiento cientifico|PPA11': '11. ¡Buenos ejemplos!',
  '1|saberes y pensamiento cientifico|PPA12': '12. ¡La sempiterna geometría!',
  '1|saberes y pensamiento cientifico|PPA13': '13. ¡Avanzar a paso firme!',
  '1|saberes y pensamiento cientifico|PPA14': '14. ¡El microcosmos siempre sorprendente!',
  '1|saberes y pensamiento cientifico|PPA15': '15. ¡La expo bio!',
};

const LENGUAJES_GRADE_1_OFFICIAL_VIDEO_TITLES: Record<string, string> = {
  '1|lenguajes|PA16': '16. Glosario bilingüe',
  '1|lenguajes|PA17': '17. Cuadro con columnas',
  '1|lenguajes|PA18': '18. Tertulia artística',
  '1|lenguajes|PA19': '19. Láminas ilustrativas',
  '1|lenguajes|PA20': '20. Mural de dibujos',
  '1|lenguajes|PA21': '21. Coloquio',
  '1|lenguajes|PA22': '22. Fichas informativas',
  '1|lenguajes|PA23': '23. Poemario personal',
  '1|lenguajes|PA24': '24. Guion para la conversación',
  '1|lenguajes|PA25': '25. Antología literaria',
  '1|lenguajes|PA26': '26. Colección de textos en inglés',
  '1|lenguajes|PA27': '27. Póster',
  '1|lenguajes|PA28': '28. Carta de presentación emotiva',
  '1|lenguajes|PA29': '29. Texto discursivo',
  '1|lenguajes|PA30': '30. Memorama',
  '1|lenguajes|PA31': '31. Periódico semanal',
  '1|lenguajes|PA32': '32. Exposición oral colectiva',
  '1|lenguajes|PA33': '33. Acervo artístico',
  '1|lenguajes|PA34': '34. Mesa de discusión',
  '1|lenguajes|PA35': '35. Collage informativo',
  '1|lenguajes|PA36': '36. Decálogo de acciones',
  '1|lenguajes|PA37': '37. Esquema comparativo',
  '1|lenguajes|PA38': '38. Artículo de divulgación',
  '1|lenguajes|PA39': '39. Historieta corta',
  '1|lenguajes|PA40': '40. Esquema de divulgación',
  '1|lenguajes|PA41': '41. Revista sencilla',
  '1|lenguajes|PA42': '42. Guion de exposición',
  '1|lenguajes|PA45': '45. Breve semblanza',
};

const LENGUAJES_GRADE_1_OFFICIAL_PPA_TITLES: Record<string, string> = {
  '1|lenguajes|PPA6': '6. Expresarte... ¡Todo un arte!',
  '1|lenguajes|PPA7': '7. Manifestémonos en la feria',
  '1|lenguajes|PPA8': '8. La valoración estética de los textos literarios',
  '1|lenguajes|PPA9': '9. Artistas entre nosotros',
  '1|lenguajes|PPA10': '10. El artista crea, el espectador disfruta',
  '1|lenguajes|PPA11': '11. Los géneros que comunican nuestra realidad',
  '1|lenguajes|PPA12': '12. Puentes de comunicación en construcción',
  '1|lenguajes|PPA13': '13. Los mensajes artísticos y la vida saludable',
  '1|lenguajes|PPA14': '14. Un encuentro de lenguajes',
  '1|lenguajes|PPA15': '15. Manifestaciones artísticas y la inclusión',
};

const OFFICIAL_COMPLEMENTARY_RESOURCES: Record<
  string,
  Array<{ label: string; reference: string; url: string; status: ProjectSourceStatus }>
> = {
  '1|saberes y pensamiento cientifico|PPA3': [
    {
      label: 'Colección oficial NEMD · Videos detonadores (Trimestre 1)',
      reference: 'Saberes y Pensamiento Científico · Primer grado',
      url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-1-3/',
      status: 'confirmed',
    },
    {
      label: 'Colección oficial NEMD · Saberes y Pensamiento Científico',
      reference: 'Fase 6 · Primer grado',
      url: 'https://nemd.aprende.gob.mx/contenido/coleccion/saberes-y-pensamiento-cientifico/',
      status: 'confirmed',
    },
  ],
};

const LENGUAJES_GRADE_1_FIELD_COLLECTION = {
  label: 'Colección oficial NEMD · Lenguajes',
  reference: 'Fase 6 · Primer grado',
  url: 'https://nemd.aprende.gob.mx/contenido/coleccion/lenguajes/',
  status: 'confirmed' as const,
};

const LENGUAJES_GRADE_1_TRIMESTER_COLLECTIONS: Record<
  string,
  { label: string; reference: string; url: string; status: ProjectSourceStatus }
> = {
  trimester1: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 1)',
    reference: 'Lenguajes · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-1-2/',
    status: 'confirmed',
  },
  trimester2: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 2)',
    reference: 'Lenguajes · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-2-2/',
    status: 'confirmed',
  },
  trimester3: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 3)',
    reference: 'Lenguajes · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-3-2/',
    status: 'confirmed',
  },
};

const SABERES_GRADE_1_FIELD_COLLECTION = {
  label: 'Colección oficial NEMD · Saberes y Pensamiento Científico',
  reference: 'Fase 6 · Primer grado',
  url: 'https://nemd.aprende.gob.mx/contenido/coleccion/saberes-y-pensamiento-cientifico/',
  status: 'confirmed' as const,
};

const SABERES_GRADE_1_TRIMESTER_COLLECTIONS: Record<
  string,
  { label: string; reference: string; url: string; status: ProjectSourceStatus }
> = {
  trimester1: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 1)',
    reference: 'Saberes y Pensamiento Científico · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-1-3/',
    status: 'confirmed',
  },
  trimester2: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 2)',
    reference: 'Saberes y Pensamiento Científico · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-2-3/',
    status: 'confirmed',
  },
  trimester3: {
    label: 'Colección oficial NEMD · Videos detonadores (Trimestre 3)',
    reference: 'Saberes y Pensamiento Científico · Primer grado',
    url: 'https://nemd.aprende.gob.mx/contenido/coleccion/videos-detonadores-trimestre-3-3/',
    status: 'confirmed',
  },
};

function isMeaningfulText(value?: string) {
  return Boolean(value && normalizeKey(value) !== 'pendiente');
}

function sourceStatus(status?: string): ProjectSourceStatus {
  const normalized = normalizeKey(status || '');
  if (!normalized) return 'confirmed';
  if (
    normalized.includes('confirmed') ||
    normalized.includes('official') ||
    normalized.includes('validated')
  ) {
    return 'confirmed';
  }
  if (
    normalized.includes('review') ||
    normalized.includes('caution') ||
    normalized.includes('needsreview')
  ) {
    return 'caution';
  }
  return 'pending';
}

function extractReferenceUrl(value?: string) {
  if (!value) return '';
  const urlMatch = value.match(/https?:\/\/\S+/i);
  if (urlMatch) return urlMatch[0].replace(/[),.;]+$/, '');

  const bitlyMatch = value.match(/\bbit\.ly\/[A-Za-z0-9]+\b/i);
  if (bitlyMatch) return `https://${bitlyMatch[0]}`;

  return '';
}

function isDirectVideoUrl(value?: string) {
  if (!value) return false;
  return (
    /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(value) ||
    /^https?:\/\/[^ ]+\.mp4(\?|$)/i.test(value)
  );
}

function isSearchResultsUrl(value?: string) {
  if (!value) return false;
  return /youtube\.com\/results\?search_query=/i.test(value);
}

const ACADEMIC_VIDEO_URL_USE_COUNT = Object.values(OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_URLS).reduce<
  Record<string, number>
>((usage, url) => {
  usage[url] = (usage[url] || 0) + 1;
  return usage;
}, {});

function validatedAcademicProjectVideoUrl(project: AcademicProject) {
  const projectKey = buildAcademicProjectResourceKey(project);
  return (
    OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_URLS[projectKey] ||
    VALIDATED_ACADEMIC_PROJECT_VIDEO_URLS[projectKey] ||
    ''
  );
}

function validatedAcademicProjectVideoTitle(project: AcademicProject) {
  const projectKey = buildAcademicProjectResourceKey(project);
  const title =
    OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_TITLES[projectKey] ||
    LENGUAJES_GRADE_1_OFFICIAL_VIDEO_TITLES[projectKey] ||
    VALIDATED_ACADEMIC_PROJECT_VIDEO_TITLES[projectKey] ||
    '';
  return repairMojibake(title);
}

function youtubeSearchUrl(query: string) {
  return '';
}

function validatedPartialClassroomResourceUrl(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  const resourceKey = buildPartialClassroomResourceKey(project, view);
  return (
    OFFICIAL_YOUTUBE_PARTIAL_CLASSROOM_VIDEO_URLS[resourceKey] ||
    OFFICIAL_PARTIAL_CLASSROOM_RESOURCE_URLS[resourceKey] ||
    ''
  );
}

function validatedPartialClassroomResourceTitle(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  const resourceKey = buildPartialClassroomResourceKey(project, view);
  const title =
    OFFICIAL_YOUTUBE_PARTIAL_CLASSROOM_VIDEO_TITLES[resourceKey] ||
    LENGUAJES_GRADE_1_OFFICIAL_PPA_TITLES[resourceKey] ||
    OFFICIAL_PARTIAL_CLASSROOM_RESOURCE_TITLES[resourceKey] ||
    '';
  return repairMojibake(title);
}

function classifyAcademicVideoEvidence(
  project: AcademicProject,
  view: CurricularDevelopmentProjectView | null,
  effectiveUrl?: string,
): {
  urlStatus: ProjectStrategyRecord['urlStatus'];
  resourceLabel: string;
  validationNote?: string;
} {
  const url = effectiveUrl || validatedAcademicProjectVideoUrl(project);
  if (!url) {
    return {
      urlStatus: 'not-found',
      resourceLabel: 'Video específico pendiente de validación',
      validationNote: 'No hay enlace directo confirmado para el video específico del Proyecto Académico.',
    };
  }

  const ppaUrl = validatedPartialClassroomResourceUrl(project, view);
  if (ppaUrl && url === ppaUrl) {
    return {
      urlStatus: 'pending',
      resourceLabel: 'Enlace pendiente de validación específica',
      validationNote:
        'Este enlace coincide con el video del Proyecto Parcial de Aula; no se presenta como video específico del PA.',
    };
  }

  if ((ACADEMIC_VIDEO_URL_USE_COUNT[url] || 0) > 1) {
    return {
      urlStatus: 'pending',
      resourceLabel: 'Enlace pendiente de validación específica',
      validationNote:
        'Este enlace aparece asociado a varios Proyectos Académicos y requiere validación manual.',
    };
  }

  return {
    urlStatus: 'confirmed',
    resourceLabel: 'Video/recurso del Proyecto Académico',
  };
}

function officialAcademicProjectSearchUrl(
  project: AcademicProject,
  developmentProject?: CurricularDevelopmentProject | null,
) {
  const strategyQuery =
    developmentProject?.academicProjectStrategy?.youtubeSearchQuery ||
    project.academicProjectStrategy?.youtubeSearchQuery ||
    '';

  if (strategyQuery.trim()) {
    return youtubeSearchUrl(strategyQuery.trim());
  }

  return youtubeSearchUrl(
    [
      `Proyecto Académico ${project.academicProjectNumber}`,
      project.title,
      `${project.grade} grado`,
      project.field,
      'telesecundaria',
      'acervo',
    ]
      .filter(Boolean)
      .join(' '),
  );
}

function officialPartialClassroomSearchUrl(
  project: AcademicProject,
  view: CurricularDevelopmentProjectView | null,
  bundlePpaStrategy?: CurricularStrategyEntry | undefined,
) {
  const strategyQuery =
    bundlePpaStrategy?.youtubeSearchQuery ||
    view?.developmentProject?.detonatingStrategy?.youtubeSearchQuery ||
    project.ppaDetonatingStrategy?.youtubeSearchQuery ||
    project.detonatingStrategy?.youtubeSearchQuery ||
    '';

  if (strategyQuery.trim()) {
    return youtubeSearchUrl(strategyQuery.trim());
  }

  return youtubeSearchUrl(
    [
      project.partialClassroomProjectTitle || view?.developmentProject?.partialClassroomProjectTitle,
      project.partialClassroomProject,
      `${project.grade} grado`,
      project.field,
      'telesecundaria',
      'acervo',
    ]
      .filter(Boolean)
      .join(' '),
  );
}

function cleanStrategyText(value?: string) {
  if (!value) return '';
  return value
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/\bbit\.ly\/[A-Za-z0-9]+\b/gi, '')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function replaceWordPreservingCase(text: string, from: string, to: string) {
  const pattern = new RegExp(`\\b${from}\\b`, 'gi');
  return text.replace(pattern, (match) => {
    const replacement = match.charAt(0) === match.charAt(0).toUpperCase() ? `${to.charAt(0).toUpperCase()}${to.slice(1)}` : to;
    return replacement;
  });
}

function formatResonanceQuestion(value?: string) {
  if (!value) return '';

  let text = value
    .replace(/^Pregunta sugerida pendiente de validación docente\.?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  const directReplacements: Array<[string, string]> = [
    ['habitos', 'hábitos'],
    ['practicas', 'prácticas'],
    ['cientificas', 'científicas'],
    ['matematicas', 'matemáticas'],
    ['despues', 'después'],
    ['pequena', 'pequeña'],
    ['pequenos', 'pequeños'],
    ['podria', 'podría'],
  ];

  for (const [from, to] of directReplacements) {
    text = replaceWordPreservingCase(text, from, to);
  }

  text = text
    .replace(/^Que\b/i, 'Qué')
    .replace(/^Como\b/i, 'Cómo')
    .replace(/^Cual\b/i, 'Cuál')
    .replace(/^Cuando\b/i, 'Cuándo')
    .replace(/^Cuanto\b/i, 'Cuánto')
    .replace(/^Donde\b/i, 'Dónde')
    .replace(/^Por que\b/i, 'Por qué')
    .replace(/^Despues\b/i, 'Después');

  text = text
    .replace(/([,;])\s*que\b/gi, '$1 qué')
    .replace(/([,;])\s*como\b/gi, '$1 cómo')
    .replace(/([,;])\s*cual\b/gi, '$1 cuál')
    .replace(/([,;])\s*cuando\b/gi, '$1 cuándo')
    .replace(/([,;])\s*cuanto\b/gi, '$1 cuánto')
    .replace(/([,;])\s*donde\b/gi, '$1 dónde')
    .replace(/([,;])\s*por que\b/gi, '$1 por qué');

  text = text.replace(/^[¿?¡!]+/, '').replace(/[?¿!¡.]+$/, '').trim();
  if (!text) return '';

  return `¿${text}?`;
}

function pagesLabelFromEntry(entry: CurricularSourcePageEntry) {
  if (entry.pagesLabel) return entry.pagesLabel;
  if (entry.startPage && entry.endPage && entry.startPage !== entry.endPage) return `pp. ${entry.startPage}-${entry.endPage}`;
  if (entry.startPage) return `p. ${entry.startPage}`;
  return '';
}

function bundlePages(entries: CurricularSourcePageEntry[] | undefined, wantedStatus: ProjectSourceStatus) {
  return (entries ?? [])
    .filter((entry) => sourceStatus(entry.status) === wantedStatus)
    .map((entry) => ({
      description: entry.topicTitle || entry.label || '',
      pages: [pagesLabelFromEntry(entry)].filter(Boolean),
      status: wantedStatus,
    }))
    .filter((entry) => entry.pages.length || entry.description);
}

function bundlePageGroup(entries: CurricularSourcePageEntry[] | undefined, defaultLabel: string) {
  const confirmedEntries = (entries ?? []).filter((entry) => sourceStatus(entry.status) === 'confirmed');
  if (!confirmedEntries.length) return undefined;

  return {
    label: confirmedEntries[0]?.label || defaultLabel,
    pages: confirmedEntries.map((entry) => pagesLabelFromEntry(entry)).filter(Boolean),
    status: 'confirmed' as const,
  };
}

function baseSourceGroup(items: string[]) {
  if (!items.length) return undefined;
  return {
    pages: items,
    status: 'pending' as const,
  };
}

function joinSourcePages(pages?: string[]) {
  return (pages ?? []).filter(Boolean).join(' · ');
}
function buildComplementaryResources(
  view: CurricularDevelopmentProjectView | null,
  project: AcademicProject,
  strategies?: {
    primary: ProjectStrategyRecord;
    related: ProjectStrategyRecord[];
  },
) {
  const strategyList = [strategies?.primary, ...(strategies?.related ?? [])].filter(Boolean) as ProjectStrategyRecord[];
  const partialClassroomKey = buildPartialClassroomResourceKey(project, view);
  const ppaNumber = Number(resolvePpaNumber(project, view) || 0);
  const validatedAcademicUrl = validatedAcademicProjectVideoUrl(project);
  const validatedPpaUrl = validatedPartialClassroomResourceUrl(project, view);
  const academicSupportEvidence = classifyAcademicVideoEvidence(project, view, validatedAcademicUrl);
  const academicProjectUrl =
    strategyList.find((strategy) => strategy.scope === 'academic-project' && strategy.videoUrl)?.videoUrl ||
    validatedAcademicUrl ||
    '';
  const partialClassroomUrl =
    strategyList.find((strategy) => strategy.scope === 'partial-classroom-project' && strategy.videoUrl)?.videoUrl ||
    validatedPpaUrl ||
    '';
  const academicProjectTitle =
    validatedAcademicProjectVideoTitle(project) ||
    [project.finalProduct, project.field, `${project.grade}er grado`, 'Video detonador'].filter(Boolean).join(' • ');
  const partialClassroomTitle =
    validatedPartialClassroomResourceTitle(project, view) ||
    strategyList.find((strategy) => strategy.scope === 'partial-classroom-project')?.title ||
    [project.partialClassroomProject, project.partialClassroomProjectTitle].filter(Boolean).join(' ') ||
    'Video del Proyecto Parcial de Aula';
  const resolveSupportUrl = (label: string, reference?: string) => {
    const normalizedLabel = normalizeKey(label);
    if (normalizedLabel.startsWith('video ppa')) return partialClassroomUrl;
    if (normalizedLabel.startsWith('video pa')) return academicProjectUrl;
    if (
      normalizedLabel.includes('consulta') ||
      normalizedLabel.includes('recurso de consulta del proyecto') ||
      normalizedLabel.includes('recurso informatico del bloque')
    ) {
      return academicProjectUrl;
    }

    const directMatch = reference?.match(/https?:\/\/\S+/i);
    const cleanedDirectMatch = directMatch ? directMatch[0].replace(/[),.;]+$/, '') : '';
    return isDirectVideoUrl(cleanedDirectMatch) ? cleanedDirectMatch : '';
  };

  const displaySupportReference = (label: string, reference?: string) => {
    const normalizedLabel = normalizeKey(label);
    const cleanedReference = cleanStrategyText(reference);

    if (normalizedLabel.startsWith('video ppa')) {
      return partialClassroomTitle;
    }

    if (
      normalizedLabel.includes('consulta') ||
      normalizedLabel.includes('recurso de consulta del proyecto') ||
      normalizedLabel.includes('recurso informatico del bloque')
    ) {
      return academicProjectTitle || cleanedReference;
    }

    return cleanedReference;
  };

  const usesStructuredSupportRoute = (label: string, resolvedUrl: string) => {
    if (!resolvedUrl) return false;
    const normalizedLabel = normalizeKey(label);
    return (
      normalizedLabel.startsWith('video ppa') ||
      normalizedLabel.startsWith('video pa') ||
      normalizedLabel.includes('consulta') ||
      normalizedLabel.includes('recurso de consulta del proyecto') ||
      normalizedLabel.includes('recurso informatico del bloque')
    );
  };

  const bundleResources =
    view?.developmentProject?.sourcePages?.otherMaterials
      ?.filter((item) => !normalizeKey(item.label || '').includes('recurso general del bloque'))
      .map((item: CurricularOtherMaterialEntry) => {
      const rawReference = item.reference || item.youtubeSearchQuery || '';
      const normalizedLabel = normalizeKey(item.label || 'Recurso complementario');
      const reference = displaySupportReference(item.label || 'Recurso complementario', rawReference);
      const resolvedUrl = resolveSupportUrl(item.label || 'Recurso complementario', rawReference);
      const academicSupportPending =
        normalizedLabel.startsWith('video pa') && academicSupportEvidence.urlStatus !== 'confirmed';
      const hasValidatedStructuredRoute =
        ((normalizedLabel.startsWith('video ppa') && Boolean(validatedPpaUrl)) ||
          (normalizedLabel.startsWith('video pa') && Boolean(validatedAcademicUrl) && !academicSupportPending) ||
          ((normalizedLabel.includes('consulta') ||
            normalizedLabel.includes('recurso de consulta del proyecto') ||
            normalizedLabel.includes('recurso informatico del bloque')) &&
            Boolean(validatedAcademicUrl) &&
            academicSupportEvidence.urlStatus === 'confirmed')) &&
        !isSearchResultsUrl(resolvedUrl);
      const inferredStatus = usesStructuredSupportRoute(item.label || 'Recurso complementario', resolvedUrl) &&
        !isSearchResultsUrl(resolvedUrl) &&
        !academicSupportPending
        ? ('confirmed' as const)
        : hasValidatedStructuredRoute
        ? ('confirmed' as const)
        : academicSupportPending
        ? ('pending' as const)
        : item.status
        ? sourceStatus(item.status)
        : /\bbit\.ly\/[A-Za-z0-9]+\b/i.test(rawReference)
        ? ('pending' as const)
        : resolvedUrl
        ? ('confirmed' as const)
        : ('pending' as const);

      return {
        label: academicSupportPending
          ? 'Enlace pendiente de validación específica'
          : item.label || 'Recurso complementario',
        reference,
        url: resolvedUrl,
        status: inferredStatus,
      };
    }) ?? [];

  const supportResources =
    view?.developmentProject?.supportMaterials
      ?.filter(
        (item) =>
          normalizeKey(item.kind || '') !== 'multiples lenguajes' &&
          !normalizeKey(item.title || '').includes('recurso general del bloque'),
      )
      .map((item) => ({
        label: item.title || 'Material de apoyo',
        reference: [item.kind, item.pages].filter(Boolean).join(' · '),
        url: resolveSupportUrl(item.title || 'Material de apoyo', item.title || ''),
        status: sourceStatus(item.status),
      })) ?? [];

  const baseResources = [...(project.sourcePages?.resources ?? []), ...(project.sourcePages?.other ?? [])].map((item) => {
    let labelPart = item;
    let referencePart = '';

    if (item.includes(' - ')) {
      [labelPart, referencePart] = item.split(/\s-\s(.+)/, 2);
    } else {
      const colonMatch = item.match(/^(.*?):\s+(.+\bbit\.ly\/[A-Za-z0-9]+\b.*)$/i);
      if (colonMatch) {
        labelPart = colonMatch[1];
        referencePart = colonMatch[2];
      }
    }

    return {
      label: labelPart || item,
      reference: displaySupportReference(labelPart || item, referencePart || item),
      url: resolveSupportUrl(labelPart || item, referencePart || ''),
      status: usesStructuredSupportRoute(
        labelPart || item,
        resolveSupportUrl(labelPart || item, referencePart || ''),
      ) && !isSearchResultsUrl(resolveSupportUrl(labelPart || item, referencePart || ''))
        ? ('confirmed' as const)
        : ('pending' as const),
    };
  }).filter((item) => !normalizeKey(item.label).includes('recurso general del bloque'));

  const merged = new Map<
    string,
    { label: string; reference?: string; url?: string; status: ProjectSourceStatus; priority: number }
  >();

  const curatedResources = [...(OFFICIAL_COMPLEMENTARY_RESOURCES[partialClassroomKey] ?? [])];
  const isLenguajesGradeOne = normalizeKey(project.grade) === '1' && normalizeKey(project.field) === 'lenguajes';
  const isSaberesGradeOne =
    normalizeKey(project.grade) === '1' && normalizeKey(project.field) === 'saberes y pensamiento cientifico';
  if (isLenguajesGradeOne) {
    curatedResources.push(LENGUAJES_GRADE_1_FIELD_COLLECTION);
    if (ppaNumber >= 1 && ppaNumber <= 5) {
      curatedResources.push(LENGUAJES_GRADE_1_TRIMESTER_COLLECTIONS.trimester1);
    } else if (ppaNumber >= 6 && ppaNumber <= 10) {
      curatedResources.push(LENGUAJES_GRADE_1_TRIMESTER_COLLECTIONS.trimester2);
    } else if (ppaNumber >= 11 && ppaNumber <= 15) {
      curatedResources.push(LENGUAJES_GRADE_1_TRIMESTER_COLLECTIONS.trimester3);
    }
  }
  if (isSaberesGradeOne) {
    curatedResources.push(SABERES_GRADE_1_FIELD_COLLECTION);
    if (ppaNumber >= 1 && ppaNumber <= 5) {
      curatedResources.push(SABERES_GRADE_1_TRIMESTER_COLLECTIONS.trimester1);
    } else if (ppaNumber >= 6 && ppaNumber <= 10) {
      curatedResources.push(SABERES_GRADE_1_TRIMESTER_COLLECTIONS.trimester2);
    } else if (ppaNumber >= 11 && ppaNumber <= 15) {
      curatedResources.push(SABERES_GRADE_1_TRIMESTER_COLLECTIONS.trimester3);
    }
  }

  for (const item of [...baseResources, ...supportResources, ...bundleResources, ...curatedResources]) {
    const normalizedItem = {
      ...item,
      label: repairMojibake(item.label),
      reference: repairMojibake(item.reference),
    };
    const isGenericProjectResource =
      /^recurso pa\d+$/i.test(normalizedItem.label.trim()) &&
      /\bbit\.ly\/[A-Za-z0-9]+\b/i.test(normalizedItem.reference || '');

    if (isGenericProjectResource) {
      continue;
    }

    const key = normalizeKey(
      normalizedItem.reference
        ? normalizedItem.reference.replace(/^https?:\/\//i, '')
        : normalizedItem.label.replace(/\s+-\s+https?:\/\/\S+/i, ''),
    );
    const priority =
      (normalizedItem.status === 'confirmed' ? 3 : normalizedItem.status === 'caution' ? 2 : 1) +
      (normalizedItem.reference ? 1 : 0);
    const current = merged.get(key);
    if (!current || priority >= current.priority) {
      merged.set(key, { ...normalizedItem, priority });
    }
  }

  return [...merged.values()].map(({ priority, ...item }) => item);
}

function buildHorizon(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  const developmentProject = view?.developmentProject;
  const directHorizon = developmentProject?.horizonOrPurpose;
  const directStatus = sourceStatus(directHorizon?.status);

  if (isMeaningfulText(directHorizon?.text)) {
    return {
      text: directHorizon?.text || '',
      status: directStatus === 'confirmed' ? ('confirmed' as const) : ('teacher-orientation' as const),
      source: directHorizon?.source || '',
      displayLabel:
        directStatus === 'confirmed'
          ? 'Horizonte de expectativa confirmado'
          : 'Orientación pedagógica provisional',
      note:
        directStatus === 'confirmed'
          ? undefined
          : 'Este texto orienta el trabajo docente, pero aún requiere validación directa en la fuente curricular.',
    };
  }

  const expectation = developmentProject?.projectExpectationHorizon;
  if (isMeaningfulText(expectation?.officialText)) {
    return {
      text: expectation?.officialText || '',
      status: 'confirmed' as const,
      source: joinSourcePages(expectation?.sourcePages),
      displayLabel: 'Horizonte de expectativa confirmado',
    };
  }

  if (isMeaningfulText(expectation?.studentVersion)) {
    return {
      text: expectation?.studentVersion || '',
      status: 'confirmed' as const,
      source: joinSourcePages(expectation?.sourcePages),
      displayLabel: 'Horizonte de expectativa confirmado',
      note: 'Recuperado desde la formulacion pedagogica del proyecto en Nuestro libro de proyectos.',
    };
  }

  const projectPurpose = developmentProject?.projectPurpose;
  if (isMeaningfulText(projectPurpose?.text)) {
    return {
      text: projectPurpose?.text || '',
      status: 'teacher-orientation' as const,
      source: joinSourcePages(projectPurpose?.sourcePages),
      displayLabel: 'Orientación pedagógica provisional',
      note:
        'Este texto orienta el trabajo docente, pero aún requiere validación directa en la fuente curricular.',
    };
  }

  const projectSource = joinSourcePages(
    developmentProject?.projectExpectationHorizon?.sourcePages ||
      developmentProject?.sourcePages?.nuestroLibroProyectos
        ?.map((entry) => [entry.label, pagesLabelFromEntry(entry)].filter(Boolean).join(' '))
        .filter(Boolean),
  );

  return {
    text: '',
    status: 'pending' as const,
    source: projectSource,
    displayLabel: 'Horizonte pendiente de validación en fuente',
    note: 'No se muestra un horizonte inventado; falta validarlo directamente en la fuente curricular.',
  };
}

function inferScope(scope?: string): ProjectStrategyRecord['scope'] {
  const normalized = normalizeKey(scope || '');
  if (normalized.includes('academic-project')) return 'academic-project';
  if (normalized.includes('partial-classroom-project')) return 'partial-classroom-project';
  if (normalized.includes('complementary')) return 'complementary';
  return 'unknown';
}

function inferResourceLabel(scope: ProjectStrategyRecord['scope'], type?: string, title?: string, text?: string) {
  const normalizedType = normalizeKey(type || '');
  const normalizedTitle = normalizeKey(title || '');
  const normalizedText = normalizeKey(text || '');
  const isVideo =
    normalizedType.includes('video') ||
    normalizedTitle.startsWith('video') ||
    normalizedText.startsWith('video');

  if (scope === 'academic-project') {
    return isVideo ? 'Video del Proyecto Académico' : 'Recurso del Proyecto Académico';
  }
  if (scope === 'partial-classroom-project') {
    return isVideo ? 'Video del Proyecto Parcial de Aula' : 'Recurso del Proyecto Parcial de Aula';
  }
  return 'Recurso complementario';
}

function inferUrlStatus(
  entry: Partial<CurricularStrategyEntry> | undefined,
  fallbackStatus?: string,
  url?: string,
): ProjectStrategyRecord['urlStatus'] {
  const normalized = normalizeKey(entry?.urlStatus || fallbackStatus || entry?.status || '');
  if (normalized.includes('confirmed')) return 'confirmed';
  if (
    normalized.includes('pending') ||
    normalized.includes('review') ||
    normalized.includes('needs') ||
    normalized.includes('not-found')
  ) {
    return normalized.includes('not-found') ? 'not-found' : 'pending';
  }
  if (url) return 'pending';
  return 'not-found';
}

function buildStrategyEntry(
  entry: Partial<CurricularStrategyEntry> | undefined,
  fallback: {
    scope?: ProjectStrategyRecord['scope'];
    title?: string;
    source?: string;
    status?: string;
    type?: string;
    fallbackVideoUrl?: string;
    fallbackUrlStatus?: ProjectStrategyRecord['urlStatus'];
    resourceLabel?: string;
    validationNote?: string;
  } = {},
): ProjectStrategyRecord | null {
  const rawText = entry?.text || entry?.reference || '';
  const cleanedText = cleanStrategyText(rawText);
  const title = entry?.title || cleanedText || fallback.title || '';
  const relatedResource = /\bbit\.ly\/[A-Za-z0-9]+\b/i.test(entry?.relatedResource || '')
    ? ''
    : entry?.relatedResource || '';
  const entryUrl = entry?.url || extractReferenceUrl(rawText) || '';
  const videoUrl = isDirectVideoUrl(entryUrl) ? entryUrl : fallback.fallbackVideoUrl || '';
  const scope = inferScope(entry?.scope || fallback.scope);
  const resourceLabel = fallback.resourceLabel || inferResourceLabel(scope, entry?.type || fallback.type, title, rawText);
  const inferredUrlStatus = inferUrlStatus(entry, fallback.status, entryUrl);
  const usesFallback = Boolean(fallback.fallbackVideoUrl) && videoUrl === fallback.fallbackVideoUrl && !isDirectVideoUrl(entryUrl);
  const urlStatus =
    fallback.fallbackUrlStatus === 'pending' && fallback.resourceLabel?.includes('validación específica')
      ? ('pending' as const)
      : usesFallback
      ? fallback.fallbackUrlStatus || 'pending'
      : inferredUrlStatus === 'not-found' && /\bbit\.ly\/[A-Za-z0-9]+\b/i.test(relatedResource)
      ? ('pending' as const)
      : inferredUrlStatus;
  const status =
    sourceStatus(entry?.status || fallback.status) === 'confirmed' || urlStatus === 'confirmed'
      ? ('confirmed' as const)
      : videoUrl
      ? ('pending' as const)
      : relatedResource || rawText
      ? ('pending' as const)
      : ('not-found' as const);

  if (!isMeaningfulText(title) && !videoUrl) return null;

  return {
    title: title || fallback.title || 'Estrategia detonadora',
    text: cleanedText || title || '',
    videoUrl,
    status,
    source: entry?.source || fallback.source || '',
    scope,
    scopeLabel:
      scope === 'academic-project'
        ? 'Proyecto Académico'
        : scope === 'partial-classroom-project'
        ? 'Proyecto Parcial de Aula'
        : 'Recurso complementario',
    resourceLabel,
    urlStatus,
    relatedResource,
    validationNote: fallback.validationNote,
  };
}

function dedupeStrategies(strategies: ProjectStrategyRecord[]) {
  return strategies.filter((strategy, index, list) => {
    const key = normalizeKey(`${strategy.scope}|${strategy.title}|${strategy.videoUrl || ''}|${strategy.source || ''}`);
    return (
      list.findIndex(
        (candidate) =>
          normalizeKey(`${candidate.scope}|${candidate.title}|${candidate.videoUrl || ''}|${candidate.source || ''}`) ===
          key,
      ) === index
    );
  });
}

function buildStrategies(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  const developmentProject = view?.developmentProject;
  const bundlePpaStrategy = view?.bundle.development?.partialClassroomProjectContext?.ppaDetonatingStrategy;
  const validatedPartialClassroomVideoUrl =
    validatedPartialClassroomResourceUrl(project, view) ||
    officialPartialClassroomSearchUrl(project, view, bundlePpaStrategy);
  const validatedPartialClassroomUrlStatus = validatedPartialClassroomResourceUrl(project, view)
    ? ('confirmed' as const)
    : ('pending' as const);
  const validatedAcademicVideoUrl =
    validatedAcademicProjectVideoUrl(project) || officialAcademicProjectSearchUrl(project, developmentProject);
  const academicEntry = developmentProject?.academicProjectStrategy || project.academicProjectStrategy;
  const academicEntryUrl = academicEntry?.url || extractReferenceUrl(academicEntry?.text || academicEntry?.reference || '') || '';
  const academicEffectiveUrl = isDirectVideoUrl(academicEntryUrl) ? academicEntryUrl : validatedAcademicVideoUrl;
  const academicVideoEvidence = classifyAcademicVideoEvidence(project, view, academicEffectiveUrl);

  const academicProjectStrategy = buildStrategyEntry(
    academicEntry,
    {
      scope: 'academic-project',
      title: project.title,
      source: developmentProject?.academicProjectStrategy?.source || project.academicProjectStrategy?.source,
      status: developmentProject?.academicProjectStrategy?.status || project.academicProjectStrategy?.status,
      type: developmentProject?.academicProjectStrategy?.type || project.academicProjectStrategy?.type,
      fallbackVideoUrl: validatedAcademicVideoUrl,
      fallbackUrlStatus: academicVideoEvidence.urlStatus,
      resourceLabel: academicVideoEvidence.resourceLabel,
      validationNote: academicVideoEvidence.validationNote,
    },
  );
  const academicProjectVideoTitle = validatedAcademicProjectVideoTitle(project);
  const academicProjectStrategyWithDisplayTitle =
    academicProjectStrategy && academicProjectVideoTitle
      ? {
          ...academicProjectStrategy,
          displayTitle: academicProjectVideoTitle,
        }
      : academicProjectStrategy;

  const partialClassroomStrategy = buildStrategyEntry(
    bundlePpaStrategy || developmentProject?.detonatingStrategy || project.ppaDetonatingStrategy || project.detonatingStrategy,
    {
      scope: 'partial-classroom-project',
      title: project.partialClassroomProjectTitle || project.partialClassroomProject || project.title,
      source:
        bundlePpaStrategy?.source ||
        developmentProject?.detonatingStrategy?.source ||
        project.ppaDetonatingStrategy?.source ||
        project.detonatingStrategy?.source,
      status:
        bundlePpaStrategy?.status ||
        developmentProject?.detonatingStrategy?.status ||
        project.ppaDetonatingStrategy?.status ||
        project.detonatingStrategy?.status,
      type:
        bundlePpaStrategy?.type ||
        developmentProject?.detonatingStrategy?.type ||
        project.ppaDetonatingStrategy?.type ||
        project.detonatingStrategy?.type,
      fallbackVideoUrl: validatedPartialClassroomVideoUrl,
      fallbackUrlStatus: validatedPartialClassroomUrlStatus,
      resourceLabel: 'Video detonador del Proyecto Parcial de Aula',
      validationNote:
        'Este video corresponde al PPA completo y puede orientar los Proyectos Académicos relacionados.',
    },
  );

  const related = dedupeStrategies(
    [academicProjectStrategyWithDisplayTitle, partialClassroomStrategy].filter(Boolean) as ProjectStrategyRecord[],
  );

  const primary =
    related.find((strategy) => strategy.scope === 'academic-project') ||
    related.find((strategy) => strategy.scope === 'partial-classroom-project') ||
    related[0] ||
    {
      title: '',
      text: '',
      videoUrl: '',
      status: 'not-found' as const,
      source: '',
      scope: 'unknown' as const,
      scopeLabel: '',
      resourceLabel: '',
      urlStatus: 'not-found' as const,
      relatedResource: '',
    };

  return {
    primary,
    related: related.filter((strategy) => strategy !== primary),
  };
}

function conceptStatus(
  conceptName: string,
  validationMap: Map<string, CurricularConceptEntry>,
  fallbackStatus?: AcademicProjectRecord['academicConcepts'][number]['status'],
) {
  return validationMap.get(normalizeKey(conceptName))?.status || fallbackStatus || 'suggested';
}

function conceptPagesLabel(pages?: number[] | string, pagesLabel?: string) {
  if (pagesLabel) return [pagesLabel];
  if (typeof pages === 'string') return [pages].filter(Boolean);
  if (!pages?.length) return [];
  const ordered = [...pages].sort((left, right) => left - right);
  if (ordered.length === 1) return [`p. ${ordered[0]}`];
  return [`pp. ${ordered[0]}-${ordered[ordered.length - 1]}`];
}

function linkedConceptMatches(linkedConcepts: AcademicConcept[], conceptName: string) {
  const normalized = normalizeKey(conceptName);
  return linkedConcepts.find(
    (concept) =>
      normalizeKey(concept.term) === normalized ||
      normalizeKey(concept.wordSearchTerm) === normalized ||
      normalizeKey(concept.memoryPair.front) === normalized,
  );
}

function conceptDescriptionFallback(
  concept: NonNullable<CurricularDevelopmentProject['academicConcepts']>[number] | undefined,
  validationEntry: CurricularConceptEntry | undefined,
  linkedConcept: AcademicConcept | undefined,
  status: AcademicProjectRecord['academicConcepts'][number]['status'],
  sourceBook?: string,
) {
  return (
    concept?.description ||
    concept?.pedagogicalUse ||
    validationEntry?.pedagogicalUse ||
    linkedConcept?.studentExplanation ||
    linkedConcept?.definition ||
    (status === 'confirmed' && sourceBook
      ? `Concepto clave para comprender este proyecto y relacionarlo con su producto final.`
      : '')
  );
}

function buildAcademicConcepts(
  project: AcademicProject,
  view: CurricularDevelopmentProjectView | null,
  linkedConcepts: AcademicConcept[],
) {
  const validationEntries = [
    ...(view?.confirmedConcepts ?? []),
    ...(view?.cautionConcepts ?? []),
  ].filter((entry) => entry.status !== 'discarded');
  const validationMap = new Map(validationEntries.map((entry) => [normalizeKey(entry.concept), entry]));
  const developmentConcepts = view?.developmentProject?.academicConcepts ?? [];

  const conceptsFromBundle = developmentConcepts.map((concept) => {
    const validationEntry = validationMap.get(normalizeKey(concept.concept || ''));
    const linkedConcept = linkedConceptMatches(linkedConcepts, concept.concept || '');
    const status = conceptStatus(concept.concept || '', validationMap, concept.status || 'suggested');
    const sourceBook =
      concept.sourceBook ||
      concept.validationEvidence?.sourceBook ||
      validationEntry?.evidence?.sourceBook ||
      '';
    const derivedPages = conceptPagesLabel(concept.sourcePages, concept.sourcePagesLabel);
    const validationPages = (concept.validationEvidence?.pages ?? validationEntry?.evidence?.pages ?? []).map((page) => `p. ${page}`);

    return {
      concept: concept.concept || '',
      description: conceptDescriptionFallback(concept, validationEntry, linkedConcept, status, sourceBook),
      sourceBook,
      pages: derivedPages.length ? derivedPages : validationPages,
      status,
    };
  });

  const conceptsOnlyInValidation = validationEntries
    .filter((entry) => !conceptsFromBundle.some((concept) => normalizeKey(concept.concept) === normalizeKey(entry.concept)))
    .map((entry) => ({
      concept: entry.concept,
      description: entry.pedagogicalUse || '',
      sourceBook: entry.evidence?.sourceBook || '',
      pages: (entry.evidence?.pages ?? []).map((page) => `p. ${page}`),
      status: entry.status,
    }));

  const conceptsFromLinked = !conceptsFromBundle.length
    ? linkedConcepts.map((concept) => ({
        concept: concept.term,
        description: concept.studentExplanation || concept.definition || '',
        sourceBook: project.field,
        pages: concept.sourcePage ? [concept.sourcePage] : [],
        status: 'confirmed' as const,
      }))
    : [];

  const conceptsFromSuggested = !conceptsFromBundle.length && !conceptsFromLinked.length
    ? (project.suggestedAcademicConcepts ?? []).map((concept) => ({
        concept: concept.concept,
        description: concept.description || '',
        sourceBook: concept.sourceBook || '',
        pages: concept.sourcePages ? [concept.sourcePages] : [],
        status: 'suggested' as const,
      }))
    : [];

  return [...conceptsFromBundle, ...conceptsOnlyInValidation, ...conceptsFromLinked, ...conceptsFromSuggested]
    .filter((concept) => concept.concept && concept.status !== 'discarded')
    .filter((concept, index, list) => {
      const key = normalizeKey(concept.concept);
      return list.findIndex((candidate) => normalizeKey(candidate.concept) === key) === index;
    });
}

function buildMatchingActivity(concepts: AcademicProjectRecord['academicConcepts']) {
  const confirmedPairs = concepts
    .filter((concept) => concept.status === 'confirmed' && concept.description)
    .slice(0, 6)
    .map((concept) => ({
      concept: concept.concept,
      description: concept.description || '',
      status: 'confirmed' as const,
    }));

  if (confirmedPairs.length < 4) return undefined;
  return { pairs: confirmedPairs };
}

function buildGame(concepts: AcademicProjectRecord['academicConcepts']) {
  const crosswordStopWords = new Set([
    'a',
    'al',
    'como',
    'con',
    'contra',
    'de',
    'del',
    'el',
    'en',
    'la',
    'las',
    'los',
    'para',
    'por',
    'que',
    'su',
    'sus',
    'un',
    'una',
    'y',
  ]);

  const sourceHint = (concept: AcademicProjectRecord['academicConcepts'][number]) => {
    const source = [concept.sourceBook, concept.pages?.join(' · ')].filter(Boolean).join(', ');
    return source ? `En ${source}, ` : '';
  };

  const pickCrosswordAnswer = (concept: AcademicProjectRecord['academicConcepts'][number]) => {
    const normalized = normalizeKey(concept.concept);
    const explicitAnswers: Record<string, string> = {
      'decalogo de acciones': 'decálogo',
      'acciones preventivas para erradicar la violencia': 'prevención',
      'dialogo abierto en comunidad': 'diálogo',
      'identificacion de problemas comunitarios': 'identificación',
      'soluciones a problemas comunitarios': 'soluciones',
      'redaccion de un informe': 'informe',
      'instituciones que contribuyen a erradicar la violencia': 'instituciones',
    };

    if (explicitAnswers[normalized]) return explicitAnswers[normalized];

    const tokens = concept.concept
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^A-Za-zÑñ]+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 4 && !crosswordStopWords.has(token.toLowerCase()));

    return tokens.find((token) => token.length >= 5 && token.length <= 12) || tokens[0] || concept.concept;
  };

  const buildDidacticClue = (concept: AcademicProjectRecord['academicConcepts'][number]) => {
    const normalized = normalizeKey(concept.concept);
    const clueMap: Record<string, string> = {
      'decalogo de acciones':
        `${sourceHint(concept)}así se llama el conjunto de diez recomendaciones breves que orienta acciones concretas en comunidad.`,
      'acciones preventivas para erradicar la violencia':
        `${sourceHint(concept)}palabra que nombra las medidas pensadas para evitar que la violencia ocurra o se repita.`,
      'dialogo abierto en comunidad':
        `${sourceHint(concept)}conversación abierta en la que varias personas comparten ideas y acuerdos para cuidar la convivencia.`,
      'identificacion de problemas comunitarios':
        `${sourceHint(concept)}proceso de reconocer con claridad qué situación afecta a la comunidad antes de pensar en una respuesta.`,
      'soluciones a problemas comunitarios':
        `${sourceHint(concept)}nombre que reciben las respuestas o propuestas para atender una dificultad que vive una comunidad.`,
      'redaccion de un informe':
        `${sourceHint(concept)}escritura ordenada de datos, hallazgos y conclusiones para comunicar lo investigado.`,
      'instituciones que contribuyen a erradicar la violencia':
        `${sourceHint(concept)}organizaciones o espacios de apoyo que ayudan a prevenir, atender o frenar situaciones de violencia.`,
    };

    if (clueMap[normalized]) return clueMap[normalized];
    if (concept.description) {
      return `${sourceHint(concept)}${concept.description.charAt(0).toLowerCase()}${concept.description.slice(1)}`;
    }
    return `${sourceHint(concept)}identifica la palabra clave que mejor resume este concepto del proyecto.`;
  };

  const confirmedConcepts = concepts
    .filter((concept) => concept.status === 'confirmed')
    .map((concept) => ({
      concept: pickCrosswordAnswer(concept),
      clue: buildDidacticClue(concept),
    }));
  const data = generateCrossword(confirmedConcepts);
  if (!data) {
    return {
      type: 'crossword' as const,
      status: 'pending' as const,
      reason: 'Juego pendiente: faltan conceptos confirmados suficientes para construir un crucigrama claro.',
    };
  }

  return {
    type: 'crossword' as const,
    status: 'ready' as const,
    data,
  };
}

function bundleSourcePages(project: AcademicProject, view: CurricularDevelopmentProjectView | null) {
  const bundle = view?.developmentProject?.sourcePages;

  const nuestros = bundlePageGroup(bundle?.nuestroLibroProyectos, 'Nuestros proyectos');
  const fieldTextbook = bundlePageGroup(bundle?.conceptBook, project.field);
  const multiples = bundlePageGroup(bundle?.multiplesLenguajes, 'Múltiples Lenguajes');
  const contextual = [
    ...bundlePages(bundle?.conceptBook, 'caution'),
    ...bundlePages(bundle?.nuestroLibroProyectos, 'caution'),
    ...bundlePages(bundle?.multiplesLenguajes, 'caution'),
    ...bundlePages(bundle?.conceptBook, 'pending'),
    ...bundlePages(bundle?.nuestroLibroProyectos, 'pending'),
    ...bundlePages(bundle?.multiplesLenguajes, 'pending'),
  ].map((entry) => ({
    description: entry.description,
    pages: entry.pages,
    status: entry.status,
  }));

  if (nuestros || fieldTextbook || multiples || contextual.length) {
    return {
      nuestrosProyectos: nuestros
        ? {
            tomo: view?.developmentProject?.bookVolume || project.bookVolume,
            pages: nuestros.pages,
            status: nuestros.status,
          }
        : undefined,
      fieldTextbook: fieldTextbook
        ? {
            book: fieldTextbook.label || project.field,
            pages: fieldTextbook.pages,
            status: fieldTextbook.status,
          }
        : undefined,
      multiplesLenguajes: multiples
        ? {
            title:
              (bundle?.multiplesLenguajes ?? []).find((entry) => sourceStatus(entry.status) === 'confirmed')?.topicTitle ||
              'Múltiples Lenguajes',
            pages: multiples.pages,
            status: multiples.status,
          }
        : undefined,
      contextual,
    };
  }

  return {
    nuestrosProyectos: baseSourceGroup(project.sourcePages?.nuestroLibroProyectos ?? [])
      ? {
          tomo: project.bookVolume || '',
          pages: project.sourcePages?.nuestroLibroProyectos ?? [],
          status: 'pending' as const,
        }
      : undefined,
    fieldTextbook: baseSourceGroup(project.sourcePages?.conceptBook ?? [])
      ? {
          book: project.field,
          pages: project.sourcePages?.conceptBook ?? [],
          status: 'pending' as const,
        }
      : undefined,
    multiplesLenguajes: baseSourceGroup(project.sourcePages?.multiplesLenguajes ?? [])
      ? {
          title: 'Múltiples Lenguajes',
          pages: project.sourcePages?.multiplesLenguajes ?? [],
          status: 'pending' as const,
        }
      : undefined,
    contextual: [],
  };
}

function buildResonanceQuestion(
  project: AcademicProject,
  view: CurricularDevelopmentProjectView | null,
  finalProduct: string,
  horizonText: string,
) {
  const projectPrompt = view?.teacherProject?.resonancePrompts?.find((prompt) => isMeaningfulText(prompt.prompt));
  if (projectPrompt?.prompt) {
    return {
      question: formatResonanceQuestion(projectPrompt.prompt),
      status: 'confirmed' as const,
    };
  }

  const seed = project.resonanceQuestionSeeds?.find((entry) => isMeaningfulText(entry.question));
  if (seed?.question) {
    return {
      question: formatResonanceQuestion(seed.question),
      status: seed.status === 'confirmed' ? ('confirmed' as const) : ('suggested' as const),
    };
  }

  const integratingPrompt =
    view?.bundle.teacherNotesAndResonances?.ppaIntegratingResonance ||
    view?.bundle.pedagogicalArticulation?.possibleResonanceQuestion ||
    '';
  if (isMeaningfulText(integratingPrompt)) {
    return {
      question: formatResonanceQuestion(integratingPrompt),
      status: 'suggested' as const,
    };
  }

  const fallbackPieces = [project.title, finalProduct, horizonText].filter(Boolean).join(', ');
  return {
    question: formatResonanceQuestion(
      `Qué relación encuentras entre ${fallbackPieces || 'este proyecto'} y una situación de tu vida cotidiana o comunidad`,
    ),
    status: 'suggested' as const,
  };
}

export function buildAcademicProjectRecord(
  project: AcademicProject,
  view: CurricularDevelopmentProjectView | null,
  linkedConcepts: AcademicConcept[],
): AcademicProjectRecord {
  const academicConcepts = buildAcademicConcepts(project, view, linkedConcepts);
  const matchingActivity = buildMatchingActivity(academicConcepts);
  const game = buildGame(academicConcepts);
  const horizon = buildHorizon(project, view);
  const sourcePages = bundleSourcePages(project, view);
  const strategies = buildStrategies(project, view);
  const complementaryResources = buildComplementaryResources(view, project, strategies);
  const finalProduct = view?.developmentProject?.finalProduct?.title || project.finalProduct || '';
  const resonance = buildResonanceQuestion(project, view, finalProduct, horizon.text || '');

  return {
    id: project.id,
    grade: project.grade,
    field: project.field,
    academicProjectNumber: String(project.academicProjectNumber || ''),
    academicProjectTitle:
      view?.developmentProject?.projectTitle || view?.developmentProject?.title || project.title,
    ppaNumber: project.partialClassroomProject || view?.developmentProject?.partialClassroomProject || '',
    ppaTitle: project.partialClassroomProjectTitle || view?.developmentProject?.partialClassroomProjectTitle || '',
    finalProduct,
    horizon,
    sourcePages,
    complementaryResources,
    detonatingStrategy: strategies.primary,
    relatedStrategies: strategies.related,
    academicConcepts,
    resonanceQuestion: resonance.question,
    resonanceStatus: resonance.status,
    matchingActivity,
    game,
    teacherOrientation:
      view?.bundle.pedagogicalArticulation?.status === 'teacher-orientation'
        ? view?.bundle.pedagogicalArticulation?.situatedPedagogicalOrientation || ''
        : '',
    pendingNotes: view?.pendingReasons ?? [],
    readiness: {
      fichaReady: Boolean(project.title && (view?.developmentProject || project.bookVolume || project.sourcePages)),
      resonanceReady: Boolean(resonance.question),
      matchingReady: Boolean(matchingActivity?.pairs.length),
      gameReady: game.status === 'ready',
    },
  };
}
