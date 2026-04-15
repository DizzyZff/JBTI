import type { QuizConfig, CustomQuestion, CustomUserAnswer } from '../domain/customConfig';
import { getConfig } from './configService';

interface CustomQuizState {
  currentQuestionIndex: number;
  answers: CustomUserAnswer[];
  isComplete: boolean;
}

export class QuizService {
  private state: CustomQuizState;
  private config: QuizConfig;

  constructor(config?: QuizConfig) {
    this.config = config ?? getConfig();
    this.state = { currentQuestionIndex: 0, answers: [], isComplete: false };
  }

  /** Reload the config (e.g. after the admin uploads a new JSON). */
  resetConfig(config?: QuizConfig): void {
    this.config = config ?? getConfig();
    this.reset();
  }

  getCurrentQuestion(): CustomQuestion {
    return this.config.questions[this.state.currentQuestionIndex];
  }

  getTotalQuestions(): number {
    return this.config.questions.length;
  }

  getCurrentIndex(): number {
    return this.state.currentQuestionIndex;
  }

  getAnswers(): CustomUserAnswer[] {
    return [...this.state.answers];
  }

  isComplete(): boolean {
    return this.state.isComplete;
  }

  submitAnswer(selectedOptionId: string): void {
    const answer: CustomUserAnswer = {
      questionIndex: this.state.currentQuestionIndex,
      selectedOptionId,
    };

    const existing = this.state.answers.findIndex(
      (a) => a.questionIndex === this.state.currentQuestionIndex,
    );

    if (existing >= 0) {
      this.state.answers[existing] = answer;
    } else {
      this.state.answers.push(answer);
    }

    const nextIndex = this.state.currentQuestionIndex + 1;
    if (nextIndex >= this.config.questions.length) {
      this.state.isComplete = true;
    } else {
      this.state.currentQuestionIndex = nextIndex;
    }
  }

  goBack(): boolean {
    if (this.state.currentQuestionIndex === 0) return false;
    this.state.isComplete = false;
    this.state.currentQuestionIndex -= 1;
    return true;
  }

  reset(): void {
    this.state = { currentQuestionIndex: 0, answers: [], isComplete: false };
  }
}
