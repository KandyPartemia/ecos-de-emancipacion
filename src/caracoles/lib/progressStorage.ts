import type { GradeId, StudentProgress } from '../types';

const DB_NAME = 'caracoles-resonando';
const STORE_NAME = 'progress';
const PROGRESS_KEY = 'local-progress';
const FALLBACK_KEY = 'caracoles-resonando-progress';

const initialProgress = (selectedGrade: GradeId = '1'): StudentProgress => ({
  selectedGrade,
  alias: '',
  snailName: 'Ollin',
  startedProjectIds: [],
  completedProjectIds: [],
  consultedPages: [],
  watchedStrategyIds: [],
  reviewedConceptIds: [],
  workedCriteria: [],
  completedGames: [],
  answeredSelfAssessments: [],
  answeredExams: [],
  examResults: {},
  achievements: ['Primer paso en el caracol'],
  lastUpdated: new Date().toISOString(),
});

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB no disponible'));
      return;
    }

    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export async function loadProgress(): Promise<StudentProgress> {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const request = transaction.objectStore(STORE_NAME).get(PROGRESS_KEY);
      request.onsuccess = () => resolve((request.result as StudentProgress) ? initialProgress());
      request.onerror = () => reject(request.error);
    });
  } catch {
    const fallback = window.localStorage.getItem(FALLBACK_KEY);
    return fallback ? (JSON.parse(fallback) as StudentProgress) : initialProgress();
  }
}

export async function saveProgress(progress: StudentProgress): Promise<void> {
  const nextProgress = { ...progress, lastUpdated: new Date().toISOString() };
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(nextProgress, PROGRESS_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch {
    window.localStorage.setItem(FALLBACK_KEY, JSON.stringify(nextProgress));
  }
}

export function createInitialProgress(selectedGrade: GradeId = '1'): StudentProgress {
  return initialProgress(selectedGrade);
}

export function exportProgressAsJson(progress: StudentProgress): void {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `avance-caracoles-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  // Siguiente fase: agregar exportacion como PDF, imagen o QR sin enviar datos a servidores.
}
