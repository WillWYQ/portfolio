# Role-targeted highlighting — design

## Problem

Visitors to the portfolio (recruiters, hiring managers) have different roles in mind
(systems/kernel, embedded, ML, security, web, etc.), but the page shows everything
at once with no way to surface what's relevant to a specific role. We want to ask
the visitor once what role they're evaluating for, then visually surface the
matching Skills, Projects, and Work Experience content, plus a tailored one-line
hero pitch.

## Non-goals

- No bilingual (EN/ZH) support for this feature. `page.tsx` does not currently use
  the existing `LanguageProvider`/`COPY` i18n scaffold (`useLanguage`/`translate`
  appear nowhere in `page.tsx`, and `LanguageToggle` is never rendered) — the live
  page is English-only today, so this feature stays English-only for consistency.
- No filtering/hiding of content. Non-matching items dim; nothing disappears.
- No new "roles" taxonomy — reuses the existing `DATA.roles` map in `resume.tsx`.

## Architecture

A new React context, `RoleHighlightProvider`, is mounted once in `layout.tsx`
alongside the existing `ThemeProvider`. It owns:

```ts
type RoleHighlightState = {
  selectedRole: string | null;   // a key from DATA.roles, or null
  hasAnswered: boolean;          // has the visitor seen/dismissed the first-visit prompt
};
```

State is persisted to `localStorage["portfolio-target-role"]` as
`{ role: string | null, answered: boolean }`. A `useRoleHighlight()` hook exposes
`{ selectedRole, setSelectedRole(role), skip(), clear() }` to consumers. No prop
drilling — the modal, hero selector, and every highlighted section read this one
context directly.

Because this is a static export (`output: "export"` in `next.config.mjs`), all of
this is client-only. To avoid a hydration flash, the provider only reads
`localStorage` after mount (`useEffect`), matching the existing `mounted` gating
pattern already used in `expandable-project-grid.tsx` for its portal overlay.
Before mount / before the read completes, `hasAnswered` is treated as `true` (so
the modal never flashes on first paint) — it flips to its real value once the
`useEffect` runs, which on a `false` real value opens the modal a frame later.

## Data model changes (`src/data/resume.tsx`)

1. **`roles` map** — add a short `pitch: string` to each of the 10 existing role
   entries (e.g. `SystemsKernelEngineer: { label: "Systems / Kernel", pitch: "I ship kernels, not just apps.", skills: [...] }`).
   Used for the hero blurb line. No other change to this map — it remains the
   single source of truth for role identity, reused as-is by the existing Skills
   section.

2. **`projects` array** — add `roles?: string[]` (role keys) to each of the 18
   entries, hand-tagged from each project's `technologies`/description. This is
   separate from the existing `getCategory()` heuristic in
   `expandable-project-grid.tsx` (which only derives a 7-bucket accent color from
   keywords) — the two are not unified, since `getCategory` serves a different,
   narrower purpose and touching it risks changing card colors.

3. **`work` array** — add `roles?: string[]` to each of the 10 entries, hand-tagged
   from title/department/description. Items with no clear engineering-role fit
   (e.g. "Treasurer", "Archivist") get an empty/omitted `roles` array and simply
   dim like any other non-matching item when a role is selected — this is honest
   and expected, not a bug.

Tagging is applied during implementation using judgment per item; it's editorial
content, not architecture, so it isn't enumerated exhaustively here.

## UI components

**Role picker button set** — defined once (in the new modal component, not in
`resume.tsx`) as two ordered arrays of role keys:

- Primary (6, shown directly): `SystemsKernelEngineer`, `EmbeddedFirmwareEngineer`,
  `ComputerArchitectureRTL`, `NetworkSecurityEngineer`, `DataMLEngineer`,
  `FullStackWebEngineer`.
- More (4, behind a "More roles ▾" expander): `FPGAEngineer`,
  `HPCPerformanceEngineer`, `RoboticsMechatronics`, `DevOpsInfra`.

Both the modal and the hero selector use this same ordered pair so the two UIs
stay visually consistent.

**`role-select-modal.tsx`** (new) — renders only when `!hasAnswered` and the
provider has mounted. A centered dialog (same fixed-overlay + backdrop-blur
pattern as the existing project-grid overlay: `role="dialog"`, `aria-modal`,
Escape-to-dismiss) asking "What role are you hiring for?" with the button set
above and a "Just browsing" skip link. Picking a role calls `setSelectedRole`
(which also sets `hasAnswered = true`); skip calls `skip()` (`hasAnswered = true`,
`selectedRole` stays `null`). Either way the modal never reappears on that
browser.

**`role-hero-selector.tsx`** (new) — always rendered, inline in the Hero section
below the existing "Available for Work: Globally" pill. A row of the same 10
role pills (6 direct + "More ▾") plus a "Clear" action, showing which role (if
any) is currently active. This is the only way to change or clear the selection
after the first visit — it does not reopen the modal.

## Highlight behavior

- **Skills section** (`SkillsSection` in `page.tsx`): its local
  `selectedRole` state (currently hardcoded to default to
  `"SystemsKernelEngineer"`) initializes from the context's `selectedRole`
  instead, and re-syncs via `useEffect` when the context value changes. The user
  can still click a different tab locally afterward without affecting the
  context.
- **Projects** (`ExpandableProjectGrid`): each `WobbleCard`'s existing
  `containerClassName` gets a conditional glow ring
  (`ring-2 ring-indigo-400/60 shadow-[0_0_24px_rgba(99,102,241,0.35)]`) when
  `project.roles?.includes(selectedRole)`, and `opacity-50` on the rest, only
  when `selectedRole` is non-null. No change when `selectedRole` is `null`.
- **Work & Education** (`ResumeCard`): `ResumeCard` currently accepts no
  `className` prop. Add one (merged onto the `Card` via `cn()`, default empty)
  so `page.tsx` can pass the same glow/dim treatment as Projects, keyed off
  `work.roles?.includes(selectedRole)`. Education entries have no `roles` data
  and are therefore never dimmed or highlighted.
- **Hero blurb**: when `selectedRole` is non-null, one additional line renders
  under the existing description, pulled from `DATA.roles[selectedRole].pitch`.
  Nothing renders when `selectedRole` is `null`.

## Edge cases

- No role selected (skipped, or "Clear" clicked): page behaves exactly as it
  does today — no dimming, no extra hero line, Skills section keeps its current
  default tab.
- Selecting a role, then navigating away and back within the same browser:
  `hasAnswered` and `selectedRole` both persist via `localStorage`, so the
  highlight state is restored and the modal does not reappear.
- Private/incognito or blocked `localStorage`: `useEffect` read/write wrapped so
  a throw there simply leaves `hasAnswered` at its initial `true` (modal never
  shown) rather than crashing the page — acceptable default (favors not
  interrupting a visitor whose browser blocks storage, over guaranteeing the
  prompt fires everywhere).
