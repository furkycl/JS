JS Modules Blog — Next.js + TypeScript + Tailwind v4

An example-driven learning site that explains modern JavaScript in three tracks: Junior, Mid, and Senior. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

Quick Start
- Requirements: Node.js 18+ (recommended: 20+)
- Steps:
  1) From this directory, run: `npm run dev`
  2) Open `http://localhost:3000` in your browser

Scripts
- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Auto-fix lint issues where possible
- `npm run type-check`: TypeScript type checking (no emit)
- `npm run check`: Lint + type-check

Pages
- `/` — Landing (overview of tracks)
- `/junior` — Junior Level content
- `/mid` — Mid Level content
- `/senior` — Senior Level content

Project Structure (overview)
- `src/app/layout.tsx` — App shell (navigation + footer)
- `src/app/page.tsx` — Home page
- `src/app/{junior|mid|senior}/page.tsx` — Track pages
- `src/components/LevelPage.tsx` — Level page template
- `src/components/ModuleCard.tsx` — Module card + topics
- `src/components/CodeBlock.tsx` — Copyable code block
- `src/content/levels.ts` — All modules/topics content
- `src/app/globals.css` — Tailwind v4 import + globals

Notes
- Tailwind v4 (no `tailwind.config` needed by default)
- Uses system fonts (no remote font fetch during build)
- If dependencies are missing, run `npm install` once

Next Steps (optional)
- Add search/filter by topic
- Add MDX support for rich content
- Add dark mode toggle with persistence

CI
- GitHub Actions workflow runs on pushes/PRs to `main`:
  - Lint, Type-check, and Build using Node from `.nvmrc`.

Health Check
- `GET /api/health` returns `{ ok: true }` for basic uptime checks.

Contributing
- See `CONTRIBUTING.md` for local setup, branching, and PR checklist.

Türkçe (Kısa Özet)
- Projeyi çalıştırmak için: `npm ci` ve ardından `npm run dev`.
- Kod kalitesi komutları: `npm run lint`, `npm run type-check`, `npm run check`.
- Basit sağlık kontrolü: `GET /api/health` (JSON `{ ok: true }`).
- Katkıda bulunmak için `CONTRIBUTING.md` dosyasına göz atın.
