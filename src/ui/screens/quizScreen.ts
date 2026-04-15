import type { Question } from '../../domain/types';

export function renderQuizScreen(
  question: Question,
  currentIndex: number,
  total: number,
): string {
  const progress = ((currentIndex + 1) / total) * 100;

  return `
    <div id="quiz-view" class="card fade-in">
      <div class="progress-box">
        <div class="progress-inner" style="width:${progress}%"></div>
      </div>
      <div id="q-meta" style="color:var(--accent);font-size:0.75rem;font-weight:bold;">
        DNA SCANNING: ${currentIndex + 1} / ${total}
      </div>
      <h2 id="q-text" style="font-size:1.15rem;margin:25px 0;min-height:70px;line-height:1.6;">
        ${question.text}
      </h2>
      <div id="options-area">
        <div class="btn-opt" data-option="A">A. ${question.optionA}</div>
        <div class="btn-opt" data-option="B">B. ${question.optionB}</div>
        <div class="btn-opt" data-option="C">C. ${question.optionC}</div>
      </div>
      ${currentIndex > 0 ? `
        <button id="back-btn" style="width:100%;padding:14px;border-radius:20px;background:transparent;border:1px solid #333;color:#666;margin-top:16px;cursor:pointer;font-size:0.85rem;">
          ← 上一题
        </button>` : ''}
    </div>`;
}
