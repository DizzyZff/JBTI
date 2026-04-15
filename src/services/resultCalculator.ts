import type { UserAnswer, DimensionScores, PersonalityCode, QuizResult } from '../domain/types';
import { getPersonalityType } from '../data/personalityTypes';
import { questions } from '../data/questions';

function countByDimension(
  answers: UserAnswer[],
  dimension: UserAnswer['dimension'],
): { aCount: number; total: number } {
  const relevant = answers.filter((a) => a.dimension === dimension);
  const aCount = relevant.filter((a) => a.selectedOption === 'A').length;
  return { aCount, total: relevant.length };
}

function scoreToPercent(aCount: number, total: number): number {
  if (total === 0) return 50;
  return Math.round((aCount / total) * 100);
}

export function calculateResult(answers: UserAnswer[]): QuizResult {
  const expectedByDimension = { JP: 0, BS: 0, TF: 0, IR: 0 };
  for (const q of questions) {
    expectedByDimension[q.dimension] += 1;
  }

  const jp = countByDimension(answers, 'JP');
  const bs = countByDimension(answers, 'BS');
  const tf = countByDimension(answers, 'TF');
  const ir = countByDimension(answers, 'IR');

  const dimensionScores: DimensionScores = {
    JP: scoreToPercent(jp.aCount, jp.total), // >50 → J
    BS: scoreToPercent(bs.aCount, bs.total), // >50 → B
    TF: scoreToPercent(tf.aCount, tf.total), // >50 → T
    IR: scoreToPercent(ir.aCount, ir.total), // >50 → I
  };

  const code: PersonalityCode = [
    dimensionScores.JP >= 50 ? 'J' : 'P',
    dimensionScores.BS >= 50 ? 'B' : 'S',
    dimensionScores.TF >= 50 ? 'T' : 'F',
    dimensionScores.IR >= 50 ? 'I' : 'R',
  ].join('') as PersonalityCode;

  return {
    personalityCode: code,
    personalityType: getPersonalityType(code),
    dimensionScores,
  };
}
