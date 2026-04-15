import { QuizService } from '../services/quizService';
import { calculateResult } from '../services/resultCalculator';
import { renderWelcomeScreen } from './screens/welcomeScreen';
import { renderQuizScreen } from './screens/quizScreen';
import { renderResultScreen } from './screens/resultScreen';
import type { QuizResult } from '../domain/types';

type Screen = 'welcome' | 'quiz' | 'result';

export class AppRenderer {
  private readonly root: HTMLElement;
  private quizService: QuizService;
  private currentScreen: Screen = 'welcome';
  private lastResult: QuizResult | null = null;

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
    this.currentScreen = screen;

    switch (screen) {
      case 'welcome':
        this.root.innerHTML = renderWelcomeScreen();
        this.bindWelcome();
        break;

      case 'quiz':
        this.renderQuiz();
        break;

      case 'result': {
        const answers = this.quizService.getAnswers();
        this.lastResult = calculateResult(answers);
        this.root.innerHTML = renderResultScreen(this.lastResult);
        this.bindResult();
        break;
      }
    }
  }

  private renderQuiz(): void {
    const question = this.quizService.getCurrentQuestion();
    const index = this.quizService.getCurrentIndex();
    const total = this.quizService.getTotalQuestions();
    const canGoBack = index > 0;

    this.root.innerHTML = renderQuizScreen(question, index, total, canGoBack);
    this.bindQuiz();
  }

  // ── Event binding ────────────────────────────────────────────────────────

  private bindWelcome(): void {
    document.getElementById('start-btn')?.addEventListener('click', () => {
      this.quizService.reset();
      this.render('quiz');
    });
  }

  private bindQuiz(): void {
    this.root.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const option = target.dataset['option'] as 'A' | 'B';

        // Visual feedback before advancing
        target.classList.add('selected');

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

    document.getElementById('share-btn')?.addEventListener('click', async () => {
      if (!this.lastResult) return;

      const { code, name } = this.lastResult.personalityType;
      const shareText = `I got ${code} — ${name} on the JBTI Personality Test! 🎉\nTake it here: ${window.location.href}`;

      if (navigator.share) {
        try {
          await navigator.share({ text: shareText, url: window.location.href });
        } catch (_) {
          // User cancelled – that's fine
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareText);
          const btn = document.getElementById('share-btn');
          if (btn) {
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = 'Share Result'; }, 2000);
          }
        } catch (_) {
          alert(shareText);
        }
      }
    });
  }
}
