import type { QuizConfig, CustomQuestion, ResultText } from '../domain/customConfig';
import { questions } from '../data/questions';
import { getPersonalityType } from '../data/personalityTypes';
import type { PersonalityCode } from '../domain/types';

// ── Default config (JBTI-32 data in the new format) ──────────────────────────

/**
 * Converts the hardcoded JBTI-32 questions into the portable CustomQuestion
 * format.  Each question's dimension tells us which two letters get the score:
 *   optionA → poleLeft (dimension[0])
 *   optionB → poleRight (dimension[1])
 *   optionC → half-weight to each pole
 */
function buildDefaultQuestions(): CustomQuestion[] {
  return questions.map((q) => {
    const left = q.dimension[0];   // e.g. 'B', 'H', 'P', 'D'
    const right = q.dimension[1];  // e.g. 'S', 'F', 'E', 'A'
    const half = q.weight / 2;
    return {
      id: q.id,
      text: q.text,
      options: [
        { id: 'a', text: q.optionA, score: { [left]: q.weight } },
        { id: 'b', text: q.optionB, score: { [right]: q.weight } },
        { id: 'c', text: q.optionC, score: { [left]: half, [right]: half } },
      ],
    };
  });
}

/**
 * Builds the result_text map for the 16 JBTI-32 personality codes.
 *
 * In the new pair format the PE and DA dimensions output their natural letters
 * (P/E and D/A), whereas the original hardcoded calculator used a quirky
 * cross-mapping (E→'A', A→'E').  The new 4-letter codes are:
 *   old 3rd letter P→P, A→E
 *   old 4th letter D→D, E→A
 */
function buildResultText(): Record<string, ResultText> {
  const result: Record<string, ResultText> = {};

  // Map from new code letter → old code letter so we can look up descriptions.
  const pos3: Record<string, string> = { P: 'P', E: 'A' };  // new P→old P, new E→old A
  const pos4: Record<string, string> = { D: 'D', A: 'E' };  // new D→old D, new A→old E

  for (const b of ['B', 'S'] as const) {
    for (const h of ['H', 'F'] as const) {
      for (const p of ['P', 'E']) {
        for (const d of ['D', 'A']) {
          const newCode = `${b}${h}${p}${d}`;
          const oldCode = `${b}${h}${pos3[p]}${pos4[d]}` as PersonalityCode;
          const pt = getPersonalityType(oldCode);
          result[newCode] = {
            title: pt.name,
            summary: pt.summary,
            tactics: pt.tactics,
            rhythm: pt.rhythm,
            psychology: pt.psychology,
            imagePath: pt.imagePath,
          };
        }
      }
    }
  }

  return result;
}

/** The built-in JBTI-32 config expressed in the portable JSON format. */
function buildDefaultConfig(): QuizConfig {
  return {
    version: 1,
    type_model: {
      pairs: [
        { id: 'BS', left: 'B', right: 'S' },
        { id: 'HF', left: 'H', right: 'F' },
        { id: 'PE', left: 'P', right: 'E' },
        { id: 'DA', left: 'D', right: 'A' },
      ],
      tie_breaker: { mode: 'prefer', letter: 'B' },
    },
    questions: buildDefaultQuestions(),
    result_text: buildResultText(),
  };
}

// ── Active config state ───────────────────────────────────────────────────────

let activeConfig: QuizConfig | null = null;

/**
 * Attempts to fetch `/quiz.json` from the server.
 * Falls back to the built-in JBTI-32 config if the file is missing or invalid.
 */
export async function loadConfig(): Promise<QuizConfig> {
  try {
    const res = await fetch('/quiz.json');
    if (res.ok) {
      const json: QuizConfig = await res.json();
      if (isValidConfig(json)) {
        activeConfig = json;
        return activeConfig;
      }
    }
  } catch {
    // Network error or JSON parse failure — fall through to default.
  }
  activeConfig = buildDefaultConfig();
  return activeConfig;
}

/** Returns the currently active config.  Throws if `loadConfig` was not called first. */
export function getConfig(): QuizConfig {
  if (!activeConfig) {
    // Lazily initialise with the default so callers that forget await still work.
    activeConfig = buildDefaultConfig();
  }
  return activeConfig;
}

/**
 * Replaces the active config (e.g. after the admin uploads a custom JSON file).
 * @throws {Error} if the provided config fails basic validation.
 */
export function setConfig(config: unknown): void {
  if (!isValidConfig(config)) {
    throw new Error('Invalid quiz config: missing required fields.');
  }
  activeConfig = config;
}

// ── Validation ────────────────────────────────────────────────────────────────

function isValidConfig(obj: unknown): obj is QuizConfig {
  if (typeof obj !== 'object' || obj === null) return false;
  const c = obj as Record<string, unknown>;
  if (typeof c['version'] !== 'number') return false;
  if (!c['type_model'] || !Array.isArray((c['type_model'] as Record<string, unknown>)['pairs'])) return false;
  if (!Array.isArray(c['questions']) || (c['questions'] as unknown[]).length === 0) return false;
  return true;
}
