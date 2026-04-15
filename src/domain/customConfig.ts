/**
 * Types for the externally-loadable quiz configuration.
 * The application accepts a JSON file matching this schema, enabling admins
 * to define any number of questions, options, dimensions, and result text.
 */

/** A single answer option within a question. */
export interface CustomOption {
  /** Unique identifier within the question (e.g. "a", "b", "c"). */
  id: string;
  /** Display text shown to the user. */
  text: string;
  /**
   * Points added to each dimension letter when this option is chosen.
   * Keys are dimension letters (e.g. "E", "I"); values are point amounts.
   */
  score: Record<string, number>;
}

/** A single question in the quiz. */
export interface CustomQuestion {
  /** 1-based question number. */
  id: number;
  /** Display text for the question. */
  text: string;
  /** Ordered list of answer options (any length ≥ 2). */
  options: CustomOption[];
}

/** One paired dimension (e.g. E vs I in MBTI). */
export interface TypePair {
  /** Identifier for the pair (e.g. "EI", "SN"). */
  id: string;
  /** Letter output when the left side accumulates more points. */
  left: string;
  /** Letter output when the right side accumulates more points. */
  right: string;
}

/** Rule used to resolve a tie within a pair. */
export interface TieBreaker {
  /** "prefer" → always output the specified letter on a tie. */
  mode: 'prefer';
  /** The letter to output on a tie (must be either `left` or `right` of the pair). */
  letter: string;
}

/** Describes how dimension scores are turned into a type code. */
export interface TypeModel {
  /** Ordered list of dimension pairs; the code is assembled left-to-right. */
  pairs: TypePair[];
  /** Optional global tie-breaker applied when a pair's scores are equal. */
  tie_breaker?: TieBreaker;
}

/** Result text shown after the quiz for a specific type code. */
export interface ResultText {
  /** Short label / type name. */
  title: string;
  /** Summary description. */
  summary: string;
  /** Optional tactics / strategy field (shown when present). */
  tactics?: string;
  /** Optional rhythm / sensory field (shown when present). */
  rhythm?: string;
  /** Optional psychology field (shown when present). */
  psychology?: string;
  /** Relative path to a result image (shown when present). */
  imagePath?: string;
}

/** Root structure of the external quiz JSON file. */
export interface QuizConfig {
  /** Schema version number. */
  version: number;
  /** Dimension-pair model used to compute the final type code. */
  type_model: TypeModel;
  /** Ordered list of questions. */
  questions: CustomQuestion[];
  /**
   * Optional per-type result descriptions keyed by the type code string
   * (e.g. "INTJ", "BHPD").  When a code is absent the app shows the code alone.
   */
  result_text?: Record<string, ResultText>;
}

/** The computed result returned after the user completes the quiz. */
export interface CustomQuizResult {
  /** The final type code string assembled from the pairs (e.g. "INTJ"). */
  typeCode: string;
  /** Accumulated raw scores for each dimension letter. */
  scores: Record<string, number>;
  /** Looked-up result text for the type code, if available. */
  resultText?: ResultText;
}

/** A user's answer to one question when using the custom config flow. */
export interface CustomUserAnswer {
  /** Zero-based index into the questions array. */
  questionIndex: number;
  /** The `id` of the chosen option (e.g. "a", "b", "c"). */
  selectedOptionId: string;
}
