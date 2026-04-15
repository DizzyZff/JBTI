/**
 * The four personality dimensions measured by the JBTI-32 test.
 *   BS → B (Bold/宽广)       | S (Sensitive/尖锐)
 *   HF → H (Hard/刚硬)       | F (Fluid/流体)
 *   PE → P (Precise/精准)    | E (Explosive/爆发)
 *   DA → D (Dominant/主导)   | A (Adaptive/适配)
 */
export type Dimension = 'BS' | 'HF' | 'PE' | 'DA';

export type OptionId = 'A' | 'B' | 'C';

export interface Question {
  /** 1-based index */
  id: number;
  text: string;
  dimension: Dimension;
  optionA: string;
  optionB: string;
  optionC: string;
  /** Score weight applied when choosing A or B (C splits evenly). */
  weight: number;
}

export interface DimensionScores {
  B: number;
  S: number;
  H: number;
  F: number;
  P: number;
  E: number;
  D: number;
  A: number;
}

export type PersonalityCode =
  | 'BHPD' | 'BHPE' | 'BHAD' | 'BHAE'
  | 'BFPD' | 'BFPE' | 'BFAD' | 'BFAE'
  | 'SHPD' | 'SHPE' | 'SHAD' | 'SHAE'
  | 'SFPD' | 'SFPE' | 'SFAD' | 'SFAE';

export interface PersonalityType {
  code: PersonalityCode;
  name: string;
  summary: string;
  tactics: string;
  rhythm: string;
  psychology: string;
  /** Relative path to result image, e.g. "img/BHPD.jpg" */
  imagePath: string;
}

export interface UserAnswer {
  questionIndex: number;
  selectedOption: OptionId;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isComplete: boolean;
}

export interface QuizResult {
  personalityCode: PersonalityCode;
  personalityType: PersonalityType;
  scores: DimensionScores;
}
