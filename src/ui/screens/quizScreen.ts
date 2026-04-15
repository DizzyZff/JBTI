import type { CustomQuestion, CustomOption } from '../../domain/customConfig';

/** Fisher-Yates shuffle of the answer options. */
function shuffleOptions(options: CustomOption[]): CustomOption[] {
  const arr = [...options];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function renderQuizScreen(
  question: CustomQuestion,
  currentIndex: number,
  total: number,
): string {
  const progress = ((currentIndex + 1) / total) * 100;
  const displayLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const shuffled = shuffleOptions(question.options);
  const optionsHtml = shuffled
    .map(
      (opt, i) =>
        `<div class="btn-opt" data-option="${opt.id}">${displayLabels[i]}. ${opt.text}</div>`,
    )
    .join('\n        ');

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
        ${optionsHtml}
      </div>
      ${currentIndex > 0 ? `
        <button id="back-btn" style="width:100%;padding:14px;border-radius:20px;background:transparent;border:1px solid #333;color:#666;margin-top:16px;cursor:pointer;font-size:0.85rem;">
          ← 上一题
        </button>` : ''}
    </div>`;
}
