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
      <div style="margin-top:28px;border-top:1px solid #222;padding-top:20px;">
        <p style="color:#555;font-size:0.78rem;margin:0 0 12px;letter-spacing:1px;">
          ADMIN · 导入自定义题库
        </p>
        <label id="upload-label"
          style="display:block;width:100%;box-sizing:border-box;padding:14px;border-radius:20px;background:transparent;border:1px dashed #444;color:#666;font-size:0.85rem;cursor:pointer;text-align:center;">
          📂 选择 quiz.json 文件
          <input id="custom-json-input" type="file" accept=".json,application/json"
            style="display:none;" />
        </label>
        <p id="upload-status" style="color:#555;font-size:0.75rem;margin:8px 0 0;min-height:1.2em;text-align:center;"></p>
      </div>
    </div>`;
}
