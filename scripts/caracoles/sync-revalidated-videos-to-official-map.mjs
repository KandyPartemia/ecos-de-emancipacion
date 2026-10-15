import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const bundlesDirectory = path.join(projectRoot, 'public', 'caracoles', 'data', 'curricular-development');
const officialMapPath = path.join(projectRoot, 'src', 'caracoles', 'lib', 'officialVideoLinks.ts');

function normalizeKeyPart(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function readExportedRecord(source, exportName) {
  const marker = `export const ${exportName}: Record<string, string> = `;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`No se encontro ${exportName}.`);
  const objectStart = start + marker.length;
  const objectEnd = source.indexOf('\n};', objectStart);
  if (objectEnd < 0) throw new Error(`No se pudo cerrar ${exportName}.`);
  return {
    start: objectStart,
    end: objectEnd + 2,
    value: JSON.parse(source.slice(objectStart, objectEnd + 2)),
  };
}

function replaceExportedRecord(source, exportName, value) {
  const record = readExportedRecord(source, exportName);
  return `${source.slice(0, record.start)}${JSON.stringify(value, null, 2)}${source.slice(record.end)}`;
}

const bundleFiles = fs.readdirSync(bundlesDirectory).filter((name) => name.endsWith('.json'));
const approved = [];
const removed = [];

for (const filename of bundleFiles) {
  const bundle = JSON.parse(fs.readFileSync(path.join(bundlesDirectory, filename), 'utf8'));
  for (const project of bundle.development?.academicProjects || []) {
    const strategy = project.academicProjectStrategy || {};
    const key = `${normalizeKeyPart(bundle.grade)}|${normalizeKeyPart(bundle.field)}|PA${project.academicProjectNumber}`;

    if (strategy.urlStatus === 'revalidated-specific' && strategy.url) {
      approved.push({ key, url: strategy.url, title: strategy.title || project.finalProduct?.title || project.title || '' });
    } else if (strategy.urlStatus === 'not-found') {
      removed.push(key);
    }
  }
}

let source = fs.readFileSync(officialMapPath, 'utf8');
const urls = readExportedRecord(source, 'OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_URLS').value;
const titles = readExportedRecord(source, 'OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_TITLES').value;

for (const item of approved) {
  urls[item.key] = item.url;
  if (item.title) titles[item.key] = item.title;
}

for (const key of removed) {
  delete urls[key];
  delete titles[key];
}

source = replaceExportedRecord(source, 'OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_URLS', urls);
source = replaceExportedRecord(source, 'OFFICIAL_YOUTUBE_ACADEMIC_PROJECT_VIDEO_TITLES', titles);
fs.writeFileSync(officialMapPath, source, 'utf8');

console.log(`Videos revalidados sincronizados: ${approved.length}`);
console.log(`Enlaces retirados del mapa oficial: ${removed.length}`);
