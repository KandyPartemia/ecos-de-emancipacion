type Direction = 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up';

type Cell = { row: number; col: number };

export type WordSearchEntry = {
  concept: string;
  term: string;
  clue: string;
};

export type WordSearchPlacement = {
  concept: string;
  term: string;
  direction: Direction;
  cells: Cell[];
};

export type WordSearchGameData = {
  size: number;
  grid: string[][];
  entries: WordSearchEntry[];
  placements: WordSearchPlacement[];
};

type CrosswordDirection = 'across' | 'down';

type CrosswordCell = {
  row: number;
  col: number;
};

export type CrosswordSourceEntry = {
  concept: string;
  clue: string;
};

export type CrosswordEntry = {
  concept: string;
  term: string;
  clue: string;
  row: number;
  col: number;
  direction: CrosswordDirection;
  cells: CrosswordCell[];
  number: number;
};

export type CrosswordGameData = {
  width: number;
  height: number;
  grid: (string | null)[][];
  entries: CrosswordEntry[];
};

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const STOP_WORDS = new Set([
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

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function sanitizeLetters(value: string) {
  return normalizeText(value).replace(/[^A-ZÑ]/g, '');
}

function tokenCandidates(concept: string) {
  return normalizeText(concept)
    .split(/[^A-ZÑ]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 4 && !STOP_WORDS.has(token.toLowerCase()));
}

function pickSearchTerm(concept: string, used: Set<string>) {
  const candidates = tokenCandidates(concept);
  const preferredCandidates = candidates.filter((candidate) => candidate.length >= 6 && candidate.length <= 10);
  const uniqueCandidate =
    preferredCandidates.find((candidate) => !used.has(candidate)) ||
    candidates.find((candidate) => !used.has(candidate));
  if (uniqueCandidate) return uniqueCandidate;

  const compact = sanitizeLetters(concept);
  if (compact.length >= 4 && compact.length <= 18 && !used.has(compact)) {
    return compact;
  }

  return '';
}

function buildEntries(concepts: string[]) {
  const used = new Set<string>();
  const entries: WordSearchEntry[] = [];

  for (const concept of concepts) {
    const term = pickSearchTerm(concept, used);
    if (!term) continue;
    used.add(term);
    entries.push({
      concept,
      term,
      clue: `Término clave de: ${concept}`,
    });
  }

  return entries;
}

function createGrid(size: number) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
}

function canPlaceWord(grid: string[][], word: string, row: number, col: number, direction: Direction) {
  const deltas =
    direction === 'horizontal'
      ? [0, 1]
      : direction === 'vertical'
      ? [1, 0]
      : direction === 'diagonal-down'
      ? [1, 1]
      : [-1, 1];

  const [rowStep, colStep] = deltas;

  for (let index = 0; index < word.length; index += 1) {
    const nextRow = row + rowStep * index;
    const nextCol = col + colStep * index;

    if (!grid[nextRow] || grid[nextRow][nextCol] === undefined) return false;

    const currentCell = grid[nextRow][nextCol];
    if (currentCell && currentCell !== word[index]) return false;
  }

  return true;
}

function placeWord(grid: string[][], entry: WordSearchEntry, row: number, col: number, direction: Direction) {
  const deltas =
    direction === 'horizontal'
      ? [0, 1]
      : direction === 'vertical'
      ? [1, 0]
      : direction === 'diagonal-down'
      ? [1, 1]
      : [-1, 1];

  const [rowStep, colStep] = deltas;
  const cells: Cell[] = [];

  for (let index = 0; index < entry.term.length; index += 1) {
    const nextRow = row + rowStep * index;
    const nextCol = col + colStep * index;
    grid[nextRow][nextCol] = entry.term[index];
    cells.push({ row: nextRow, col: nextCol });
  }

  return {
    concept: entry.concept,
    term: entry.term,
    direction,
    cells,
  } as WordSearchPlacement;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function directions(): Direction[] {
  return ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up'];
}

function candidateStarts(size: number, wordLength: number, direction: Direction) {
  if (direction === 'horizontal') {
    return {
      row: randomInt(size),
      col: randomInt(size - wordLength + 1),
    };
  }

  if (direction === 'vertical') {
    return {
      row: randomInt(size - wordLength + 1),
      col: randomInt(size),
    };
  }

  if (direction === 'diagonal-down') {
    return {
      row: randomInt(size - wordLength + 1),
      col: randomInt(size - wordLength + 1),
    };
  }

  return {
    row: randomInt(size - wordLength + 1) + (wordLength - 1),
    col: randomInt(size - wordLength + 1),
  };
}

function fillGrid(grid: string[][]) {
  return grid.map((row) =>
    row.map((cell) => {
      if (cell) return cell;
      return LETTERS[randomInt(LETTERS.length)];
    }),
  );
}

export function generateWordSearch(concepts: string[]): WordSearchGameData | null {
  const entries = buildEntries(concepts).slice(0, 8);
  if (entries.length < 5) return null;

  const longestWord = Math.max(...entries.map((entry) => entry.term.length));
  const size = Math.max(12, Math.min(18, longestWord + 4));
  const grid = createGrid(size);
  const placements: WordSearchPlacement[] = [];

  const orderedEntries = [...entries].sort((left, right) => right.term.length - left.term.length);

  for (const entry of orderedEntries) {
    let placed = false;

    for (let attempt = 0; attempt < 120 && !placed; attempt += 1) {
      const direction = directions()[randomInt(directions().length)];
      const { row, col } = candidateStarts(size, entry.term.length, direction);

      if (!canPlaceWord(grid, entry.term, row, col, direction)) continue;

      placements.push(placeWord(grid, entry, row, col, direction));
      placed = true;
    }

    if (!placed) {
      return null;
    }
  }

  if (placements.length !== orderedEntries.length) {
    return null;
  }

  return {
    size,
    grid: fillGrid(grid),
    entries: orderedEntries,
    placements,
  };
}

function buildCrosswordEntries(concepts: CrosswordSourceEntry[]) {
  const used = new Set<string>();
  const entries: Array<CrosswordSourceEntry & { term: string }> = [];

  for (const item of concepts) {
    const term = pickSearchTerm(item.concept, used);
    if (!term) continue;
    used.add(term);
    entries.push({
      concept: item.concept,
      clue: item.clue,
      term,
    });
  }

  return entries;
}

function createCrosswordGrid(size: number) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null as string | null));
}

function withinBounds(size: number, row: number, col: number) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

function crosswordDeltas(direction: CrosswordDirection) {
  return direction === 'across' ? [0, 1] : [1, 0];
}

function canPlaceCrosswordWord(
  grid: (string | null)[][],
  term: string,
  row: number,
  col: number,
  direction: CrosswordDirection,
) {
  const size = grid.length;
  const [rowStep, colStep] = crosswordDeltas(direction);
  const beforeRow = row - rowStep;
  const beforeCol = col - colStep;
  const afterRow = row + rowStep * term.length;
  const afterCol = col + colStep * term.length;

  if (withinBounds(size, beforeRow, beforeCol) && grid[beforeRow][beforeCol]) return { ok: false, intersections: 0 };
  if (withinBounds(size, afterRow, afterCol) && grid[afterRow][afterCol]) return { ok: false, intersections: 0 };

  let intersections = 0;

  for (let index = 0; index < term.length; index += 1) {
    const nextRow = row + rowStep * index;
    const nextCol = col + colStep * index;

    if (!withinBounds(size, nextRow, nextCol)) {
      return { ok: false, intersections: 0 };
    }

    const currentCell = grid[nextRow][nextCol];
    if (currentCell && currentCell !== term[index]) {
      return { ok: false, intersections: 0 };
    }

    if (currentCell === term[index]) {
      intersections += 1;
      continue;
    }

    if (direction === 'across') {
      if (
        (withinBounds(size, nextRow - 1, nextCol) && grid[nextRow - 1][nextCol]) ||
        (withinBounds(size, nextRow + 1, nextCol) && grid[nextRow + 1][nextCol])
      ) {
        return { ok: false, intersections: 0 };
      }
    } else {
      if (
        (withinBounds(size, nextRow, nextCol - 1) && grid[nextRow][nextCol - 1]) ||
        (withinBounds(size, nextRow, nextCol + 1) && grid[nextRow][nextCol + 1])
      ) {
        return { ok: false, intersections: 0 };
      }
    }
  }

  return { ok: true, intersections };
}

function placeCrosswordWord(
  grid: (string | null)[][],
  concept: string,
  clue: string,
  term: string,
  row: number,
  col: number,
  direction: CrosswordDirection,
) {
  const [rowStep, colStep] = crosswordDeltas(direction);
  const cells: CrosswordCell[] = [];

  for (let index = 0; index < term.length; index += 1) {
    const nextRow = row + rowStep * index;
    const nextCol = col + colStep * index;
    grid[nextRow][nextCol] = term[index];
    cells.push({ row: nextRow, col: nextCol });
  }

  return {
    concept,
    clue,
    term,
    row,
    col,
    direction,
    cells,
    number: 0,
  };
}

function candidateCrosswordPlacements(
  grid: (string | null)[][],
  placedEntries: Omit<CrosswordEntry, 'number'>[],
  entry: CrosswordSourceEntry & { term: string },
) {
  const candidates: Array<{ row: number; col: number; direction: CrosswordDirection; intersections: number }> = [];

  for (const placed of placedEntries) {
    for (let placedIndex = 0; placedIndex < placed.term.length; placedIndex += 1) {
      for (let termIndex = 0; termIndex < entry.term.length; termIndex += 1) {
        if (placed.term[placedIndex] !== entry.term[termIndex]) continue;

        const crossingCell = placed.cells[placedIndex];
        const direction = placed.direction === 'across' ? 'down' : 'across';
        const row = direction === 'down' ? crossingCell.row - termIndex : crossingCell.row;
        const col = direction === 'across' ? crossingCell.col - termIndex : crossingCell.col;
        const verdict = canPlaceCrosswordWord(grid, entry.term, row, col, direction);

        if (!verdict.ok || verdict.intersections < 1) continue;

        candidates.push({
          row,
          col,
          direction,
          intersections: verdict.intersections,
        });
      }
    }
  }

  return candidates.sort((left, right) => right.intersections - left.intersections);
}

function assignCrosswordNumbers(entries: Omit<CrosswordEntry, 'number'>[]) {
  const orderedStarts = [...new Set(entries.map((entry) => `${entry.row}-${entry.col}`))]
    .map((key) => {
      const [row, col] = key.split('-').map(Number);
      return { key, row, col };
    })
    .sort((left, right) => left.row - right.row || left.col - right.col);

  const numbering = new Map(orderedStarts.map((item, index) => [item.key, index + 1]));

  return entries
    .map((entry) => ({
      ...entry,
      number: numbering.get(`${entry.row}-${entry.col}`) || 0,
    }))
    .sort((left, right) => left.number - right.number || left.direction.localeCompare(right.direction));
}

function trimCrosswordGrid(grid: (string | null)[][], entries: Omit<CrosswordEntry, 'number'>[]) {
  const occupiedCells = entries.flatMap((entry) => entry.cells);
  const minRow = Math.min(...occupiedCells.map((cell) => cell.row));
  const maxRow = Math.max(...occupiedCells.map((cell) => cell.row));
  const minCol = Math.min(...occupiedCells.map((cell) => cell.col));
  const maxCol = Math.max(...occupiedCells.map((cell) => cell.col));

  const trimmedGrid = grid
    .slice(minRow, maxRow + 1)
    .map((row) => row.slice(minCol, maxCol + 1));

  const shiftedEntries = entries.map((entry) => ({
    ...entry,
    row: entry.row - minRow,
    col: entry.col - minCol,
    cells: entry.cells.map((cell) => ({
      row: cell.row - minRow,
      col: cell.col - minCol,
    })),
  }));

  return {
    grid: trimmedGrid,
    entries: shiftedEntries,
    width: maxCol - minCol + 1,
    height: maxRow - minRow + 1,
  };
}

export function generateCrossword(concepts: CrosswordSourceEntry[]): CrosswordGameData | null {
  const preparedEntries = buildCrosswordEntries(concepts).slice(0, 8);
  if (preparedEntries.length < 4) return null;

  const longestWord = Math.max(...preparedEntries.map((entry) => entry.term.length));
  const size = Math.max(11, Math.min(17, longestWord + 6));
  const grid = createCrosswordGrid(size);
  const orderedEntries = [...preparedEntries].sort((left, right) => right.term.length - left.term.length);
  const placedEntries: Omit<CrosswordEntry, 'number'>[] = [];

  const first = orderedEntries[0];
  const firstRow = Math.floor(size / 2);
  const firstCol = Math.max(0, Math.floor((size - first.term.length) / 2));
  placedEntries.push(placeCrosswordWord(grid, first.concept, first.clue, first.term, firstRow, firstCol, 'across'));

  for (const entry of orderedEntries.slice(1)) {
    const candidates = candidateCrosswordPlacements(grid, placedEntries, entry);
    const best = candidates[0];
    if (!best) continue;

    placedEntries.push(
      placeCrosswordWord(grid, entry.concept, entry.clue, entry.term, best.row, best.col, best.direction),
    );
  }

  if (placedEntries.length < 4) return null;

  const trimmed = trimCrosswordGrid(grid, placedEntries);

  return {
    width: trimmed.width,
    height: trimmed.height,
    grid: trimmed.grid,
    entries: assignCrosswordNumbers(trimmed.entries),
  };
}
