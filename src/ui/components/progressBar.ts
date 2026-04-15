/**
 * Renders a labelled progress bar.
 * @param current  – 1-based current question number
 * @param total    – total number of questions
 */
export function renderProgressBar(current: number, total: number): string {
  const pct = Math.round(((current - 1) / total) * 100);
  return `
    <div class="progress-wrapper" aria-label="Question ${current} of ${total}">
      <div class="progress-label">
        <span>Question ${current} of ${total}</span>
        <span>${pct}% complete</span>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width: ${pct}%"></div>
      </div>
    </div>`;
}
