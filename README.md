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

## Development

```bash
pnpm install
pnpm dev
```

## Build (static export to `out/`)

```bash
pnpm build
```

> **Note:** Next 14.2.4's build worker deadlocks on very new Node (observed on
> Node 24.x and 22.22.x — hangs at "Creating an optimized production build" with
> 0% CPU). Node 22.11 builds fine. CI uses `actions/setup-node` with Node 22.

## Utilities

```bash
pnpm generate:og          # regenerate the static OpenGraph image (public/og.png)
pnpm export:resume-pdfs   # export resume .docx files in public/ to PDF (needs Microsoft Word)
```

## License

MIT — see [LICENSE](./LICENSE). Template © Dillion Verma; site content © Yueqiao Wang.
