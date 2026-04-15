export function renderWelcomeScreen(): string {
  return `
    <div class="screen welcome-screen fade-in">
      <div class="welcome-content">
        <div class="logo">
          <span class="logo-letters">JBTI</span>
          <div class="logo-tagline">Personality Test</div>
        </div>

        <h1 class="welcome-title">Discover Your Personality Type</h1>

        <p class="welcome-description">
          The JBTI test measures four dimensions of personality — how you
          organise your world, where you draw energy, how you make decisions,
          and how you perceive it all. Answer 20 quick questions and uncover
          which of the <strong>16 personality types</strong> you are.
        </p>

        <div class="dimension-grid">
          <div class="dimension-card">
            <span class="dimension-icon">📋</span>
            <strong>J vs P</strong>
            <span>Judicious · Playful</span>
          </div>
          <div class="dimension-card">
            <span class="dimension-icon">⚡</span>
            <strong>B vs S</strong>
            <span>Bold · Sensitive</span>
          </div>
          <div class="dimension-card">
            <span class="dimension-icon">🧩</span>
            <strong>T vs F</strong>
            <span>Thinking · Feeling</span>
          </div>
          <div class="dimension-card">
            <span class="dimension-icon">🔭</span>
            <strong>I vs R</strong>
            <span>Idealist · Realist</span>
          </div>
        </div>

        <button class="btn btn-primary" id="start-btn">
          Start the Test →
        </button>

        <p class="welcome-note">Takes about 3–5 minutes · No sign-up required</p>
      </div>
    </div>`;
}
