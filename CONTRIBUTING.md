Contributing Guide

Thanks for your interest in improving JS Modules Blog!

Prerequisites
- Node.js 18+ (recommended 20, see `.nvmrc`)
- npm 9+

Setup
1) Install deps: `npm ci`
2) Start dev server: `npm run dev`
3) Lint: `npm run lint` (auto-fix: `npm run lint:fix`)
4) Type-check: `npm run type-check`

Branch & Commit
- Create feature branches from `main`: `feat/<short-name>` or `fix/<short-name>`
- Write clear commit messages (imperative): `feat: add search filter`

Code Style
- 2-space indentation, LF line endings (see `.editorconfig`)
- Prefer TypeScript strict types; avoid `any`

PRs
- Ensure CI is green (lint, type-check, build)
- Add screenshots/gifs for UI changes

Issues
- Use templates for bugs/features with clear reproduction steps

