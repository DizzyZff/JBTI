import type { QuizResult } from '../../domain/types';

export function renderResultScreen(result: QuizResult): string {
  const { personalityType: pt, personalityCode } = result;
  const accentColor = personalityCode[0] === 'B' ? 'var(--primary)' : '#70a1ff';
  const imagePath = pt.imagePath ?? '';

  return `
    <div id="result-view" class="card fade-in">
      <div id="res-image" class="res-img-container" data-img="${imagePath}" data-fallback="${accentColor}"></div>
      <div style="font-size:1.2rem;color:var(--accent);font-weight:bold;letter-spacing:4px;margin-bottom:5px;">
        SEQUENCE // ${personalityCode}
      </div>
      <h1 style="color:#fff;margin:0 0 20px;font-size:2.4rem;font-weight:900;">${pt.name}</h1>
      <div class="summary-box">
        <strong>原力特质报告：</strong>${pt.summary}
      </div>
      <div>
        <div class="detail-section">
          <div class="section-tag">STRATEGY / 战术坐标</div>
          <p style="margin:5px 0 0;font-size:0.95rem;">${pt.tactics}</p>
        </div>
        <div class="detail-section">
          <div class="section-tag">RHYTHM / 感官律动</div>
          <p style="margin:5px 0 0;font-size:0.95rem;">${pt.rhythm}</p>
        </div>
        <div class="detail-section">
          <div class="section-tag">PSYCHOLOGY / 心理本能</div>
          <p style="margin:5px 0 0;font-size:0.95rem;">${pt.psychology}</p>
        </div>
      </div>
      <button id="retake-btn"
        style="width:100%;padding:18px;border-radius:20px;background:transparent;border:1px solid #444;color:#888;margin-top:25px;cursor:pointer;">
        重新初始化
      </button>
    </div>`;
}
