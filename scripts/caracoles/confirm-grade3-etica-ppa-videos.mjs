import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/caracoles/data/curricular-development');
const confirmed = {
  5: 'yqv4lFzhBjQ',
  6: 'ldHwzgo3jcY',
  7: 'LrFA70NDhys',
};

for (const [ppaNumber, videoId] of Object.entries(confirmed)) {
  const filePath = path.join(
    root,
    `grade-3-etica-naturaleza-y-sociedades-ppa-${ppaNumber}.json`,
  );
  const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const title = bundle.development.partialClassroomProjectTitle;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const common = {
    title,
    text: `Video del Proyecto Parcial de Aula ${ppaNumber}: ${title}`,
    type: 'video',
    url,
    urlStatus: 'confirmed',
    source: 'YouTube, acervo Aprende_MX/Telesecundaria',
    scope: 'partial-classroom-project',
  };

  bundle.development.partialClassroomProjectContext.ppaDetonatingStrategy = { ...common };

  for (const project of bundle.development.academicProjects) {
    project.detonatingStrategy = { ...common };

    const materials = project.sourcePages.otherMaterials ?? [];
    const paMaterial = materials.find((item) => item.label?.startsWith('Video PA '));
    if (paMaterial && project.academicProjectStrategy?.url) {
      paMaterial.label = `Video PA ${project.academicProjectNumber}: ${project.academicProjectStrategy.title}`;
      paMaterial.reference = project.academicProjectStrategy.url;
      paMaterial.status = 'confirmed';
    }

    const ppaMaterial = materials.find((item) => item.label?.startsWith('Video PPA '));
    if (ppaMaterial) {
      ppaMaterial.label = `Video PPA ${ppaNumber}: ${title}`;
      ppaMaterial.reference = url;
      ppaMaterial.status = 'confirmed';
    } else {
      materials.push({
        label: `Video PPA ${ppaNumber}: ${title}`,
        reference: url,
        status: 'confirmed',
      });
    }
  }

  fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
}

console.log('Videos PPA 5, 6 y 7 confirmados y separados de los videos PA.');
