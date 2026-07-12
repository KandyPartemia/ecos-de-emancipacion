import type { AcademicProjectRecord } from './academicProjectRecord';

type PrintableHorizon = AcademicProjectRecord['horizon'];

function horizonPendingCopy() {
  return 'Horizonte pendiente de validación en fuente.';
}

function escapeHtml(value?: string | number) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPdfList(items: Array<string | undefined>, fallback = 'Pendiente de validación') {
  const cleanItems = items.map((item) => item?.trim()).filter(Boolean) as string[];
  if (!cleanItems.length) {
    return `<p class="muted">${escapeHtml(fallback)}</p>`;
  }

  return `<ul>${cleanItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function formatPdfPages(pages?: string[]) {
  return pages?.length ? pages.join(' · ') : 'Páginas pendientes';
}

function buildPlanningPdfHtml(record: AcademicProjectRecord, horizon: PrintableHorizon) {
  const projectLabel = `PA ${record.academicProjectNumber || 'pendiente'}`;
  const ppaLabel = [record.ppaNumber, record.ppaTitle].filter(Boolean).join(' - ') || 'Pendiente de validación';
  const conceptos = record.academicConcepts
    .filter((concept) => concept.status !== 'discarded')
    .slice(0, 12)
    .map((concept) => [concept.concept, concept.description ? `: ${concept.description}` : ''].join(''));
  const strategies = [
    record.detonatingStrategy.displayTitle || record.detonatingStrategy.title || record.detonatingStrategy.text,
    ...(record.relatedStrategies || []).map((strategy) => strategy.displayTitle || strategy.title || strategy.text),
  ];
  const sourceRows = [
    ['Nuestros proyectos', record.sourcePages.nuestrosProyectos?.tomo, formatPdfPages(record.sourcePages.nuestrosProyectos?.pages)],
    ['Libro del campo formativo', record.sourcePages.fieldTextbook?.book, formatPdfPages(record.sourcePages.fieldTextbook?.pages)],
    ['Múltiples lenguajes', record.sourcePages.multiplesLenguajes?.title, formatPdfPages(record.sourcePages.multiplesLenguajes?.pages)],
  ];

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(projectLabel)} - ${escapeHtml(record.academicProjectTitle)}</title>
  <style>
    @page { size: letter landscape; margin: 9mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #fffdf8;
      color: #241a12;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 11px;
      line-height: 1.28;
    }
    .sheet {
      max-width: 100%;
      margin: 0 auto;
      background: #fffdf8;
      border: 1px solid #dccfb9;
      border-radius: 16px;
      padding: 12px;
    }
    .top {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
      gap: 12px;
      align-items: end;
      border-radius: 14px;
      background: #315344;
      color: #f8f1e6;
      padding: 14px 16px;
    }
    .eyebrow {
      margin: 0 0 5px;
      color: #d9b56d;
      font-size: 8.5px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 24px;
      line-height: 1.02;
    }
    h2 {
      margin: 0 0 6px;
      color: #315344;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 15px;
    }
    h3 {
      margin: 0 0 4px;
      color: #8f4d32;
      font-size: 8.5px;
      font-weight: 900;
      letter-spacing: 0.11em;
      text-transform: uppercase;
    }
    p { margin: 0; }
    .meta {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px;
      margin: 0;
    }
    .chip {
      border: 1px solid rgba(248, 241, 230, 0.28);
      border-radius: 10px;
      padding: 6px 7px;
      color: #fff8ee;
      font-size: 9.3px;
    }
    .grid {
      display: grid;
      grid-template-columns: 0.95fr 1.05fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    .card {
      border: 1px solid #e6d8bf;
      border-radius: 12px;
      background: #fff8ee;
      padding: 9px;
      break-inside: avoid;
    }
    .card.wide { grid-column: span 2; }
    .card.full { grid-column: 1 / -1; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.6px;
    }
    th, td {
      border-bottom: 1px solid #e6d8bf;
      padding: 4px 5px;
      text-align: left;
      vertical-align: top;
    }
    th { color: #315344; }
    ul {
      margin: 4px 0 0 13px;
      padding: 0;
    }
    li { margin: 2px 0; }
    .muted { color: #675c51; margin: 0; }
    .footer {
      margin-top: 7px;
      border-top: 1px solid #e6d8bf;
      padding-top: 6px;
      color: #675c51;
      font-size: 8.8px;
    }
    @media print {
      body { background: white; }
      .sheet { border: 0; border-radius: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header class="top">
      <div>
        <p class="eyebrow">Ecos de Emancipación · Caracoles Resonando</p>
        <h1>${escapeHtml(projectLabel)} - ${escapeHtml(record.academicProjectTitle)}</h1>
      </div>
      <div class="meta">
        <div class="chip"><strong>Grado:</strong> ${escapeHtml(record.grade)}°</div>
        <div class="chip"><strong>Campo:</strong> ${escapeHtml(record.field)}</div>
        <div class="chip"><strong>PPA:</strong> ${escapeHtml(ppaLabel)}</div>
      </div>
    </header>

    <section class="grid">
      <article class="card">
        <h3>Estrategia detonadora / producto final</h3>
        <p>${escapeHtml(record.finalProduct || 'Pendiente de validación')}</p>
      </article>
      <article class="card wide">
        <h3>Horizonte de expectativas</h3>
        <p>${escapeHtml(horizon.text || horizonPendingCopy())}</p>
        ${horizon.source ? `<p class="muted"><strong>Fuente:</strong> ${escapeHtml(horizon.source)}</p>` : ''}
      </article>

      <article class="card full">
        <h2>Ubicación en libros</h2>
        <table>
          <thead><tr><th>Fuente</th><th>Referencia</th><th>Páginas</th></tr></thead>
          <tbody>
            ${sourceRows
              .map(
                ([label, title, pages]) =>
                  `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(title || 'Pendiente')}</td><td>${escapeHtml(pages)}</td></tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </article>

      <article class="card">
        <h3>Video o recurso asociado</h3>
        ${formatPdfList(strategies)}
      </article>

      <article class="card wide">
        <h3>Conceptos académicos</h3>
        ${formatPdfList(conceptos)}
      </article>

      <article class="card full">
        <h3>Autoevaluación formativa</h3>
        <p><strong>Pregunta de resonancia:</strong> ${escapeHtml(record.resonanceQuestion || 'Pendiente de validación.')}</p>
      </article>
    </section>

    <footer class="footer">
      Documento generado desde Caracoles Resonando. Esta ficha es una guía de apoyo docente y estudiantil en proceso de mejora continua.
    </footer>
  </main>
</body>
</html>`;
}

export function openPlanningPdf(record: AcademicProjectRecord, horizon: PrintableHorizon) {
  if (typeof window === 'undefined') return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.alert('Activa las ventanas emergentes para generar la versión imprimible del PDF.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPlanningPdfHtml(record, horizon));
  printWindow.document.close();
  window.setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 350);
}
