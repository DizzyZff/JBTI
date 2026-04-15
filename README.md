# JBTI-32 | 本能原力全解析 V4.5

A TypeScript personality test SPA based on the original `JBTI.html`, rebuilt with clean architecture and deployable to GitHub Pages.

## Live Demo

Deploy the `dist/` folder to GitHub Pages (or any static host).

## Personality Dimensions

| Axis | Poles |
|------|-------|
| **B / S** | Bold 宽广 · Sensitive 尖锐 |
| **H / F** | Hard 刚硬 · Fluid 流体 |
| **P / E** | Precise 精准 · Explosive 爆发 |
| **D / A** | Dominant 主导 · Adaptive 适配 |

32 weighted questions → one of **16 personality codes** (e.g. `BHPD`, `SFAE`).

## Architecture

```
src/
├── domain/          # Shared types & interfaces
├── data/            # Questions (32) & personality type definitions (16)
├── services/        # QuizService (state) · resultCalculator (scoring)
└── ui/
    ├── screens/     # welcomeScreen · quizScreen · resultScreen
    └── renderer.ts  # AppRenderer — orchestrates all screens
```

## Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
```

## Deployment (GitHub Pages)

1. Run `npm run build`
2. Push the `dist/` folder contents to your `gh-pages` branch, **or** configure GitHub Pages to serve from the `dist/` folder of this branch.

> `vite.config.ts` sets `base: './'` so all asset paths are relative — no extra configuration needed for subdirectory deployments.
