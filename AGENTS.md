# Agent Guidelines

**Commands:**
- Dev/build: `npm run dev`, `npm run build`, `npm run preview` (Vite 7.x)
- Lint: `npm run lint` (ESLint on `*.ts`/`*.tsx`)
- Tests: no test framework configured; single-test runs unavailable

**TypeScript/React:**
- TypeScript 5.9.3 strict mode (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`); avoid `any`, prefer explicit types
- React 19.1.1 with `jsx: "react-jsx"` (no default React import); functional components only with hooks
- Import order: React hooks (`import { useState } from "react"`), third-party (react-router-dom@7.x, react-scroll, MUI), local components, assets last
- Components: default exports `export default function ComponentName()`; PascalCase filenames in `src/components/ui/` and `src/pages/`
- Props/state: always define with `interface`/`type`; never untyped props or implicit `any`

**Styling/Layout:**
- Tailwind CSS 4.x utilities (custom colors: primary/secondary/accent in `tailwind.config.js`); MUI available but prefer Tailwind for layout
- Semantic HTML5 (`<main>`, `<section>`, `<nav>`, `<footer>`); small focused components; `.map()` with stable keys (IDs over indexes)

**Other:**
- Assets: import from `src/assets/`; `public/` for static files accessed by URL
- Error handling: validate inputs, wrap async in `try/catch`, surface user-friendly errors
- Formatting: 2-space indent, double quotes, trailing commas, no semicolons
- ESLint: `eslint.config.js` with `typescript-eslint@8.x`, `react-hooks`, `react-refresh`; keep code lint-clean
- File org: UI in `src/components/ui/`, pages in `src/pages/`, styles in `src/App.css`/`src/index.css`
- No Cursor/Copilot rules exist; don't add tooling/config changes unless requested