# career.yueqiao.dev

Personal portfolio of **Yueqiao Wang** — systems, embedded, and security engineering.
Live at [career.yueqiao.dev](https://career.yueqiao.dev).

Based on the excellent [dillionverma/portfolio](https://github.com/dillionverma/portfolio) template (MIT), customized heavily since.

## Stack

Next.js 14 (static export), React 18, TypeScript, Tailwind CSS, shadcn/ui, Magic UI, Framer Motion. Deployed to GitHub Pages via GitHub Actions.

## Editing content

- Nearly all page content lives in a single file: [`src/data/resume.tsx`](./src/data/resume.tsx)
- Site/socials/nav config: [`src/config/`](./src/config/)
- Images go in `public/` — an image manifest is auto-generated on every dev/build by `scripts/generate-image-manifest.cjs`

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server at localhost:3000 (regenerates the image manifest first via `predev`) |
| `pnpm build` | Production build + static export to `out/` (manifest via `prebuild`) — **see Node note below** |
| `pnpm preview` | Serve the exported `out/` at localhost:4173 (plain http.server; run `build` first) |
| `pnpm lint` | ESLint (`next lint`) |
| `pnpm clean` | Delete `.next/`, `out/`, caches, and `tsconfig.tsbuildinfo` |
| `pnpm generate:image-manifest` | Rebuild `src/generated/image-manifest.json` from `public/` (runs automatically on dev/build) |
| `pnpm generate:og` | Regenerate the static OpenGraph share image `public/og.png` |
| `pnpm generate:icons` | Regenerate `src/app/favicon.ico` + `src/app/apple-icon.png` (YW monogram) |
| `pnpm export:resume-pdfs` | Export every resume `.docx` in `public/` to PDF via Microsoft Word (grant the automation prompt on first run) |

Removed as of Next 14 + `output: "export"`: `build:static` (`next export` no longer
exists as a command) and `start` (`next start` is incompatible with static export —
use `pnpm preview` instead).

> **Node note:** Next 14.2.4's build worker deadlocks on very new Node (observed on
> Node 24.x and 22.22.x — hangs at "Creating an optimized production build" with
> 0% CPU). Node 22.11 builds fine. CI uses `actions/setup-node` with Node 22.

## License

MIT — see [LICENSE](./LICENSE). Template © Dillion Verma; site content © Yueqiao Wang.
