/** The four personality dimensions measured by the JBTI test. */
export type Dimension = 'JP' | 'BS' | 'TF' | 'IR';

/**
 * Dimension poles:
 *   JP → J (Judicious) | P (Playful)
 *   BS → B (Bold)      | S (Sensitive)
 *   TF → T (Thinking)  | F (Feeling)
 *   IR → I (Idealist)  | R (Realist)
 */
export interface DimensionScores {
  JP: number; // 0–100, higher = more J
  BS: number; // 0–100, higher = more B
  TF: number; // 0–100, higher = more T
  IR: number; // 0–100, higher = more I
}

export type PersonalityCode =
  | 'JBTI' | 'JBTR' | 'JBFI' | 'JBFR'
  | 'JSTI' | 'JSTR' | 'JSFI' | 'JSFR'
  | 'PBTI' | 'PBTR' | 'PBFI' | 'PBFR'
  | 'PSTI' | 'PSTR' | 'PSFI' | 'PSFR';

export type OptionId = 'A' | 'B';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  /** Option A maps to the first pole (J, B, T, I). */
  optionA: string;
  /** Option B maps to the second pole (P, S, F, R). */
  optionB: string;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: OptionId;
  dimension: Dimension;
}

export interface PersonalityType {
  code: PersonalityCode;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
  compatibleWith: PersonalityCode[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isComplete: boolean;
}

export interface QuizResult {
  personalityCode: PersonalityCode;
  personalityType: PersonalityType;
  dimensionScores: DimensionScores;
}
