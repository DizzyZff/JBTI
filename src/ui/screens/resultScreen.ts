import type { QuizResult } from '../../domain/types';

const dimensionLabels: Record<string, [string, string]> = {
  JP: ['J — Judicious', 'P — Playful'],
  BS: ['B — Bold', 'S — Sensitive'],
  TF: ['T — Thinking', 'F — Feeling'],
  IR: ['I — Idealist', 'R — Realist'],
};

function renderDimensionBar(
  dimension: string,
  score: number,
): string {
  const [labelA, labelB] = dimensionLabels[dimension];
  const dominant = score >= 50 ? labelA : labelB;
  const pct = score >= 50 ? score : 100 - score;

  return `
    <div class="dim-bar">
      <div class="dim-labels">
        <span class="${score >= 50 ? 'dim-dominant' : ''}">${labelA}</span>
        <span class="${score < 50 ? 'dim-dominant' : ''}">${labelB}</span>
      </div>
      <div class="dim-track">
        <div class="dim-fill ${score >= 50 ? 'fill-a' : 'fill-b'}"
             style="width: ${score}%"></div>
      </div>
      <div class="dim-pct">${dominant} · ${pct}%</div>
    </div>`;
}

export function renderResultScreen(result: QuizResult): string {
  const { personalityType: pt, dimensionScores } = result;

  const strengthsList = pt.strengths
    .map((s) => `<li>${s}</li>`)
    .join('');

  const challengesList = pt.challenges
    .map((c) => `<li>${c}</li>`)
    .join('');

  const compatibleList = pt.compatibleWith
    .map((c) => `<span class="compat-badge">${c}</span>`)
    .join('');

  const dimBars = (['JP', 'BS', 'TF', 'IR'] as const)
    .map((d) => renderDimensionBar(d, dimensionScores[d]))
    .join('');

  return `
    <div class="screen result-screen fade-in">
      <div class="result-header">
        <div class="result-emoji">${pt.emoji}</div>
        <div class="result-code">${pt.code}</div>
        <h1 class="result-name">${pt.name}</h1>
        <p class="result-tagline">${pt.tagline}</p>
      </div>

      <div class="result-body">
        <section class="result-section">
          <h2>About you</h2>
          <p>${pt.description}</p>
        </section>

        <section class="result-section">
          <h2>Your dimension scores</h2>
          <div class="dim-bars">${dimBars}</div>
        </section>

        <div class="traits-grid">
          <section class="result-section">
            <h2>✨ Strengths</h2>
            <ul class="trait-list">${strengthsList}</ul>
          </section>
          <section class="result-section">
            <h2>🌱 Challenges</h2>
            <ul class="trait-list">${challengesList}</ul>
          </section>
        </div>

        <section class="result-section">
          <h2>Compatible types</h2>
          <div class="compat-list">${compatibleList}</div>
        </section>

        <div class="result-actions">
          <button class="btn btn-primary" id="share-btn">Share Result</button>
          <button class="btn btn-secondary" id="retake-btn">Retake Test</button>
        </div>
      </div>
    </div>`;
}
