export function renderWelcomeScreen(): string {
  return `
    <div id="start-view" class="card fade-in">
      <div style="font-size:4rem;margin-bottom:20px;">💠</div>
      <h1 style="letter-spacing:8px;font-weight:900;margin:0;">JBTI-32</h1>
      <p style="color:var(--accent);letter-spacing:4px;font-size:0.8rem;margin-bottom:40px;">
        内核算法 V4.5 | 赛博原力版
      </p>
      <button id="start-btn"
        style="width:100%;padding:20px;border-radius:50px;background:var(--primary);color:#fff;border:none;font-weight:bold;font-size:1.1rem;cursor:pointer;box-shadow:0 12px 24px rgba(255,71,87,0.3);">
        启动原力扫描
      </button>
    </div>`;
}
