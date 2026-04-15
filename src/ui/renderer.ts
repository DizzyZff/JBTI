import { QuizService } from '../services/quizService';
import { calculateResult } from '../services/resultCalculator';
import { renderWelcomeScreen } from './screens/welcomeScreen';
import { renderQuizScreen } from './screens/quizScreen';
import { renderResultScreen } from './screens/resultScreen';

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
    const result = calculateResult(answers);
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
      this.quizService.reset();
      this.render('quiz');
    });
  }

  private bindQuiz(): void {
    this.root.querySelectorAll<HTMLElement>('.btn-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const option = btn.dataset['option'] as 'A' | 'B' | 'C';
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
