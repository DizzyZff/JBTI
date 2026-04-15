import type { UserAnswer, DimensionScores, PersonalityCode, QuizResult } from '../domain/types';
import { questions } from '../data/questions';
import { getPersonalityType } from '../data/personalityTypes';

export function calculateResult(answers: UserAnswer[]): QuizResult {
  const scores: DimensionScores = { B: 0, S: 0, H: 0, F: 0, P: 0, E: 0, D: 0, A: 0 };

  for (const answer of answers) {
    const question = questions[answer.questionIndex];
    const { dimension, weight } = question;
    const poleA = dimension[0] as keyof DimensionScores;
    const poleB = dimension[1] as keyof DimensionScores;
    // Matching the original nudge logic: even index → +0.01 to A side, odd → -0.01
    const nudge = answer.questionIndex % 2 === 0 ? 0.01 : -0.01;

    if (answer.selectedOption === 'A') {
      scores[poleA] += weight;
    } else if (answer.selectedOption === 'B') {
      scores[poleB] += weight;
    } else {
      // Option C splits evenly with the same nudge
      scores[poleA] += weight / 2 + nudge;
      scores[poleB] += weight / 2 - nudge;
    }
  }

  const code: PersonalityCode = [
    scores.B >= scores.S ? 'B' : 'S',
    scores.H >= scores.F ? 'H' : 'F',
    scores.P >= scores.E ? 'P' : 'E',
    scores.D >= scores.A ? 'D' : 'A',
  ].join('') as PersonalityCode;

  return {
    personalityCode: code,
    personalityType: getPersonalityType(code),
    scores,
  };
}
