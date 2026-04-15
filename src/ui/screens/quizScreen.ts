import type { Question } from '../../domain/types';
import { renderProgressBar } from '../components/progressBar';

export function renderQuizScreen(
  question: Question,
  currentIndex: number,
  total: number,
  canGoBack: boolean,
): string {
  return `
    <div class="screen quiz-screen fade-in">
      ${renderProgressBar(currentIndex + 1, total)}

      <div class="question-card">
        <p class="question-text">${question.text}</p>

        <div class="options-list">
          <button class="option-btn" data-option="A">
            <span class="option-label">A</span>
            <span class="option-text">${question.optionA}</span>
          </button>
          <button class="option-btn" data-option="B">
            <span class="option-label">B</span>
            <span class="option-text">${question.optionB}</span>
          </button>
        </div>
      </div>

      <div class="quiz-nav">
        ${canGoBack
          ? `<button class="btn btn-secondary" id="back-btn">← Back</button>`
          : `<span></span>`
        }
      </div>
    </div>`;
}
