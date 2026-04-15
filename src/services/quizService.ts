import { questions } from '../data/questions';
import type { QuizState, UserAnswer, OptionId, Question } from '../domain/types';

export class QuizService {
  private state: QuizState;

  constructor() {
    this.state = {
      currentQuestionIndex: 0,
      answers: [],
      isComplete: false,
    };
  }

  getCurrentQuestion(): Question {
    return questions[this.state.currentQuestionIndex];
  }

  getTotalQuestions(): number {
    return questions.length;
  }

  getCurrentIndex(): number {
    return this.state.currentQuestionIndex;
  }

  getAnswers(): UserAnswer[] {
    return [...this.state.answers];
  }

  isComplete(): boolean {
    return this.state.isComplete;
  }

  submitAnswer(selectedOption: OptionId): void {
    const question = this.getCurrentQuestion();

    const answer: UserAnswer = {
      questionId: question.id,
      selectedOption,
      dimension: question.dimension,
    };

    const existingIndex = this.state.answers.findIndex(
      (a) => a.questionId === question.id,
    );

    if (existingIndex >= 0) {
      this.state.answers[existingIndex] = answer;
    } else {
      this.state.answers.push(answer);
    }

    const nextIndex = this.state.currentQuestionIndex + 1;
    if (nextIndex >= questions.length) {
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
    this.state = {
      currentQuestionIndex: 0,
      answers: [],
      isComplete: false,
    };
  }
}
