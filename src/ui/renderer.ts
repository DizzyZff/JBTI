import { QuizService } from '../services/quizService';
import { calculateCustomResult } from '../services/customResultCalculator';
import { setConfig, getConfig } from '../services/configService';
import { renderWelcomeScreen } from './screens/welcomeScreen';
import { renderQuizScreen } from './screens/quizScreen';
import { renderResultScreen } from './screens/resultScreen';
import type { QuizConfig } from '../domain/customConfig';

type Screen = 'welcome' | 'quiz' | 'result';

export class AppRenderer {
  private readonly root: HTMLElement;
  private quizService: QuizService;

  constructor(rootId: string) {
    const el = document.getElementById(rootId);
    if (!el) throw new Error(`Root element #${rootId} not found`);
    this.root = el;
    this.quizService = new QuizService();
  }

  start(): void {
    this.render('welcome');
  }

  private render(screen: Screen): void {
    switch (screen) {
      case 'welcome':
        this.root.innerHTML = renderWelcomeScreen();
        this.bindWelcome();
        break;
      case 'quiz':
        this.renderQuiz();
        break;
      case 'result':
        this.renderResult();
        break;
    }
  }

  private renderQuiz(): void {
    const question = this.quizService.getCurrentQuestion();
    const index = this.quizService.getCurrentIndex();
    const total = this.quizService.getTotalQuestions();
    this.root.innerHTML = renderQuizScreen(question, index, total);
    this.bindQuiz();
  }

  private renderResult(): void {
    const answers = this.quizService.getAnswers();
    const config = getConfig();
    const result = calculateCustomResult(answers, config);
    this.root.innerHTML = renderResultScreen(result);
    this.loadResultImage();
    this.bindResult();
    window.scrollTo(0, 0);
  }

  /** Lazy-load the result image and fade it in, matching original shimmer behaviour. */
  private loadResultImage(): void {
    const container = this.root.querySelector<HTMLElement>('#res-image');
    if (!container) return;

    const imgPath = container.dataset['img'] ?? '';
    const fallback = container.dataset['fallback'] ?? 'var(--primary)';

    if (imgPath) {
      const img = new Image();
      img.src = imgPath;
      img.onload = () => {
        container.style.backgroundImage = `url(${imgPath})`;
        container.classList.add('loaded');
      };
      img.onerror = () => {
        container.style.background = `linear-gradient(135deg, #1e1e2e, ${fallback})`;
        container.classList.add('loaded');
      };
    } else {
      container.style.background = `linear-gradient(135deg, #1e1e2e, ${fallback})`;
      container.classList.add('loaded');
    }
  }

  // ── Event binding ────────────────────────────────────────────────────────

  private bindWelcome(): void {
    document.getElementById('start-btn')?.addEventListener('click', () => {
      this.quizService.resetConfig();
      this.render('quiz');
    });

    const fileInput = document.getElementById('custom-json-input') as HTMLInputElement | null;
    const statusEl = document.getElementById('upload-status');

    fileInput?.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json: QuizConfig = JSON.parse(e.target?.result as string);
          setConfig(json);
          this.quizService.resetConfig(json);
          if (statusEl) {
            statusEl.style.color = '#4ade80';
            statusEl.textContent = `✓ 已加载：${json.questions.length} 题 / ${json.type_model.pairs.length} 维度`;
          }
        } catch (err) {
          if (statusEl) {
            statusEl.style.color = 'var(--primary)';
            statusEl.textContent = `✗ 无效文件：${(err as Error).message}`;
          }
        }
        // Reset input so the same file can be re-selected after an error.
        fileInput.value = '';
      };
      reader.readAsText(file);
    });
  }

  private bindQuiz(): void {
    this.root.querySelectorAll<HTMLElement>('.btn-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const option = btn.dataset['option'] as string;
        btn.classList.add('selected');
        setTimeout(() => {
          this.quizService.submitAnswer(option);
          if (this.quizService.isComplete()) {
            this.render('result');
          } else {
            this.render('quiz');
          }
        }, 200);
      });
    });

    document.getElementById('back-btn')?.addEventListener('click', () => {
      this.quizService.goBack();
      this.render('quiz');
    });
  }

  private bindResult(): void {
    document.getElementById('retake-btn')?.addEventListener('click', () => {
      this.quizService.reset();
      this.render('welcome');
    });
  }
}
