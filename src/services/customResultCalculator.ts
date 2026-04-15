import type { QuizConfig, CustomUserAnswer, CustomQuizResult } from '../domain/customConfig';

/**
 * Calculates the quiz result from a list of user answers and a QuizConfig.
 *
 * Algorithm:
 *  1. For every answer, find the chosen option and add its `score` values to
 *     the running totals.
 *  2. For each dimension pair in `type_model.pairs`, compare the accumulated
 *     score for the `left` letter against the `right` letter.  The higher one
 *     contributes its letter to the type code.  Ties are resolved by the
 *     optional `tie_breaker`.
 *  3. The type code is built by joining the winning letter of each pair in order.
 */
export function calculateCustomResult(
  answers: CustomUserAnswer[],
  config: QuizConfig,
): CustomQuizResult {
  // ── 1. Accumulate scores ──────────────────────────────────────────────────
  const scores: Record<string, number> = {};

  for (const answer of answers) {
    const question = config.questions[answer.questionIndex];
    if (!question) continue;

    const option = question.options.find((o) => o.id === answer.selectedOptionId);
    if (!option) continue;

    for (const [letter, points] of Object.entries(option.score)) {
      scores[letter] = (scores[letter] ?? 0) + points;
    }
  }

  // ── 2. Resolve each pair → winning letter ─────────────────────────────────
  const { pairs, tie_breaker } = config.type_model;

  const codeParts: string[] = pairs.map(({ left, right }) => {
    const leftScore = scores[left] ?? 0;
    const rightScore = scores[right] ?? 0;

    if (leftScore > rightScore) return left;
    if (rightScore > leftScore) return right;

    // Tie — use tie_breaker if defined and applicable to this pair
    if (tie_breaker?.mode === 'prefer') {
      if (tie_breaker.letter === left || tie_breaker.letter === right) {
        return tie_breaker.letter;
      }
    }
    // Default: prefer the left letter
    return left;
  });

  // ── 3. Assemble type code ─────────────────────────────────────────────────
  const typeCode = codeParts.join('');
  const resultText = config.result_text?.[typeCode];

  return { typeCode, scores, resultText };
}
