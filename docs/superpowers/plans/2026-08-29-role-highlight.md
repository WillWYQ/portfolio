# Role-Targeted Highlighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** On first visit, ask "what role are you hiring for?" and highlight the matching Skills/Projects/Work content plus a tailored hero line, persisted so the prompt never repeats.

**Architecture:** A single `RoleHighlightProvider` React context (mounted in `layout.tsx`) owns `selectedRole`/`hasAnswered`, backed by `localStorage`. A first-visit modal and an always-visible hero pill selector both write to it; `page.tsx`, the project grid, and `ResumeCard` all read from it to add glow/dim classes and a hero pitch line. No new role taxonomy — reuses `DATA.roles` from `resume.tsx`.

**Tech Stack:** Next.js 14.2.4 (static export, `output: "export"`), React 18, TypeScript (strict, `noEmit`), Tailwind CSS, Framer Motion.

## Global Constraints

- This repo has **no test framework** (no jest/vitest/playwright, no `*.test.*` files, no `test` script in `package.json`). Per-task verification uses `npx tsc --noEmit -p tsconfig.json` (fast, already configured with `noEmit: true`) instead of unit tests.
- **Node version matters for running the app, not for `tsc`.** Next 14.2.4 deadlocks on Node ≥22.22 per prior project experience; only Node 22.11.0 (available via `nvm use 22.11.0`) reliably runs `next dev`/`next build` here. `tsc` itself works fine on whatever Node is currently active — don't switch Node versions for the per-task type-check steps.
- **Do not run `next build` per task** — this repo lives on iCloud Drive and a full build can take 10–30+ minutes. `next build` only happens once, in the final end-to-end verification task, and that task is dispatched to a subagent rather than run inline.
- This is a static export (`output: "export"` in `next.config.mjs`) — everything here is client-side only (`"use client"`), no SSR/data-fetching concerns.
- English-only UI copy for this feature — `page.tsx` does not use the existing `LanguageProvider`/`translate()` i18n scaffold (confirmed: no `useLanguage`/`translate` calls in `page.tsx`, `LanguageToggle` is never rendered anywhere) — matching the page's actual current behavior.
- Non-matching content dims, never disappears. `selectedRole === null` means no highlighting at all — the page renders exactly as it does today.

---

## File Structure

**Create:**
- `src/lib/role-highlight.ts` — pure constants/types/localStorage helpers, no React. Isolates storage logic so the provider (below) is pure wiring.
- `src/components/role-highlight-provider.tsx` — the context, `RoleHighlightProvider`, and `useRoleHighlight()` hook.
- `src/components/role-select-modal.tsx` — first-visit modal.
- `src/components/role-hero-selector.tsx` — always-visible hero pill row.

**Modify:**
- `src/app/layout.tsx` — wrap the tree in `RoleHighlightProvider`.
- `src/data/resume.tsx` — add `pitch` to each of the 10 `roles` entries; add `roles?: readonly string[]` to each `work` and `projects` entry.
- `src/components/resume-card.tsx` — add an optional `className` prop, merged onto the `Card`.
- `src/components/expandable-project-grid.tsx` — add `roles?: readonly string[]` to the `ProjectItem` interface; accept the current `selectedRole` and apply conditional glow/dim classes to each `WobbleCard`'s `containerClassName`.
- `src/app/page.tsx` — render `<RoleSelectModal />` and `<RoleHeroSelector />` in the Hero section; render the hero pitch line; wire `SkillsSection`'s initial tab from context; pass `selectedRole`-derived className to each work `ResumeCard`; pass `selectedRole` into `ExpandableProjectGrid`.

---

### Task 1: Role-highlight storage module

**Files:**
- Create: `src/lib/role-highlight.ts`

**Interfaces:**
- Produces: `ROLE_HIGHLIGHT_STORAGE_KEY: string`; `type RoleHighlightStorage = { role: string | null; answered: boolean }`; `readRoleHighlightStorage(): RoleHighlightStorage`; `writeRoleHighlightStorage(state: RoleHighlightStorage): void`; `PRIMARY_ROLE_KEYS: string[]`; `MORE_ROLE_KEYS: string[]`.

- [ ] **Step 1: Write the module**

```ts
// src/lib/role-highlight.ts
export const ROLE_HIGHLIGHT_STORAGE_KEY = "portfolio-target-role";

export type RoleHighlightStorage = {
  role: string | null;
  answered: boolean;
};

const DEFAULT_STORAGE: RoleHighlightStorage = { role: null, answered: false };

export function readRoleHighlightStorage(): RoleHighlightStorage {
  if (typeof window === "undefined") return DEFAULT_STORAGE;
  try {
    const raw = window.localStorage.getItem(ROLE_HIGHLIGHT_STORAGE_KEY);
    if (!raw) return DEFAULT_STORAGE;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (typeof parsed.role === "string" || parsed.role === null) &&
      typeof parsed.answered === "boolean"
    ) {
      return { role: parsed.role, answered: parsed.answered };
    }
    return DEFAULT_STORAGE;
  } catch {
    return DEFAULT_STORAGE;
  }
}

export function writeRoleHighlightStorage(state: RoleHighlightStorage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      ROLE_HIGHLIGHT_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    // localStorage blocked (private mode, etc.) — highlight state just won't persist.
  }
}

// Order shown in the modal and the hero selector. Kept here (not in resume.tsx)
// because it's presentation ordering, not resume data.
export const PRIMARY_ROLE_KEYS = [
  "SystemsKernelEngineer",
  "EmbeddedFirmwareEngineer",
  "ComputerArchitectureRTL",
  "NetworkSecurityEngineer",
  "DataMLEngineer",
  "FullStackWebEngineer",
] as const;

export const MORE_ROLE_KEYS = [
  "FPGAEngineer",
  "HPCPerformanceEngineer",
  "RoboticsMechatronics",
  "DevOpsInfra",
] as const;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors mentioning `role-highlight.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/role-highlight.ts
git commit -m "feat: add role-highlight storage module and role ordering"
```

---

### Task 2: `RoleHighlightProvider` context

**Files:**
- Create: `src/components/role-highlight-provider.tsx`

**Interfaces:**
- Consumes: `ROLE_HIGHLIGHT_STORAGE_KEY`, `RoleHighlightStorage`, `readRoleHighlightStorage`, `writeRoleHighlightStorage` from `@/lib/role-highlight` (Task 1).
- Produces: `RoleHighlightProvider` (component, wraps `children: React.ReactNode`); `useRoleHighlight(): { selectedRole: string | null; hasAnswered: boolean; selectRole: (role: string) => void; skip: () => void; clear: () => void }`.

- [ ] **Step 1: Write the provider**

```tsx
// src/components/role-highlight-provider.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  readRoleHighlightStorage,
  writeRoleHighlightStorage,
} from "@/lib/role-highlight";

type RoleHighlightContextValue = {
  selectedRole: string | null;
  hasAnswered: boolean;
  selectRole: (role: string) => void;
  skip: () => void;
  clear: () => void;
};

const RoleHighlightContext = createContext<RoleHighlightContextValue | null>(
  null
);

export function RoleHighlightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // Default true so the modal never flashes before we've read localStorage;
  // flips to the real stored value once the effect below runs.
  const [hasAnswered, setHasAnswered] = useState(true);

  useEffect(() => {
    const stored = readRoleHighlightStorage();
    setSelectedRole(stored.role);
    setHasAnswered(stored.answered);
  }, []);

  const selectRole = useCallback((role: string) => {
    setSelectedRole(role);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role, answered: true });
  }, []);

  const skip = useCallback(() => {
    setSelectedRole(null);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role: null, answered: true });
  }, []);

  const clear = useCallback(() => {
    setSelectedRole(null);
    setHasAnswered(true);
    writeRoleHighlightStorage({ role: null, answered: true });
  }, []);

  const value = useMemo(
    () => ({ selectedRole, hasAnswered, selectRole, skip, clear }),
    [selectedRole, hasAnswered, selectRole, skip, clear]
  );

  return (
    <RoleHighlightContext.Provider value={value}>
      {children}
    </RoleHighlightContext.Provider>
  );
}

export function useRoleHighlight(): RoleHighlightContextValue {
  const ctx = useContext(RoleHighlightContext);
  if (!ctx) {
    throw new Error(
      "useRoleHighlight must be used within a RoleHighlightProvider"
    );
  }
  return ctx;
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors mentioning `role-highlight-provider.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/role-highlight-provider.tsx
git commit -m "feat: add RoleHighlightProvider context and useRoleHighlight hook"
```

---

### Task 3: Wrap the app in `RoleHighlightProvider`

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `RoleHighlightProvider` from `@/components/role-highlight-provider` (Task 2).

- [ ] **Step 1: Add the import**

In `src/app/layout.tsx`, add this import alongside the existing ones at the top of the file (after the `StarField` import on line 10):

```tsx
import { RoleHighlightProvider } from "@/components/role-highlight-provider";
```

- [ ] **Step 2: Wrap `{children}`**

`layout.tsx` currently renders (inside `<ThemeProvider>`, around line 171-176):

```tsx
          <div className="relative" style={{ zIndex: 10 }}>
            <TooltipProvider delayDuration={0}>
              {children}
              <Navbar />
            </TooltipProvider>
          </div>
```

Change it to wrap only `{children}` (not `<Navbar />`, which doesn't need role-highlight context) in `RoleHighlightProvider`:

```tsx
          <div className="relative" style={{ zIndex: 10 }}>
            <TooltipProvider delayDuration={0}>
              <RoleHighlightProvider>
                {children}
              </RoleHighlightProvider>
              <Navbar />
            </TooltipProvider>
          </div>
```

Every other line in the file (metadata, fonts, background layers, `StarField`, `Pointer`) stays exactly as-is.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: mount RoleHighlightProvider in root layout"
```

---

### Task 4: Add `pitch` to each role and `roles` tags to work/projects data

**Files:**
- Modify: `src/data/resume.tsx`

**Interfaces:**
- Produces: `DATA.roles[key].pitch: string` for all 10 keys; `DATA.work[i].roles?: readonly string[]`; `DATA.projects[i].roles?: readonly string[]` — role keys reference the same 10 keys as `DATA.roles`.

- [ ] **Step 1: Add `pitch` to each of the 10 `roles` entries**

In the `roles: { ... }` block (starts at `resume.tsx:105`), add a `pitch` field to each entry, right after `label`:

```ts
SystemsKernelEngineer: {
  label: "Systems / Kernel",
  pitch: "I want the bugs where the stack trace ends in assembly.",
  skills: [ /* unchanged */ ],
},
ComputerArchitectureRTL: {
  label: "Computer Architecture / RTL",
  pitch: "I care what happens between the ISA and the transistors.",
  skills: [ /* unchanged */ ],
},
FPGAEngineer: {
  label: "FPGA / Digital Design",
  pitch: "I'll happily trade a compiler for a synthesis tool.",
  skills: [ /* unchanged */ ],
},
EmbeddedFirmwareEngineer: {
  label: "Embedded / Firmware",
  pitch: "If it has a datasheet, I want to read it before I ship it.",
  skills: [ /* unchanged */ ],
},
HPCPerformanceEngineer: {
  label: "HPC / Performance",
  pitch: "I'd rather shave 5% off a hot loop than add a feature.",
  skills: [ /* unchanged */ ],
},
RoboticsMechatronics: {
  label: "Robotics / Mechatronics",
  pitch: "I like problems where the bug might be a loose wire, not just bad code.",
  skills: [ /* unchanged */ ],
},
FullStackWebEngineer: {
  label: "Full-Stack Web",
  pitch: "I can take a project from spec to a browser tab, database-free or not.",
  skills: [ /* unchanged */ ],
},
DevOpsInfra: {
  label: "DevOps / Infra",
  pitch: "I keep my own servers up, so I don't panic when yours goes down.",
  skills: [ /* unchanged */ ],
},
DataMLEngineer: {
  label: "Data / ML",
  pitch: "I want the model that's 91% right, not the one that's 100% overfit.",
  skills: [ /* unchanged */ ],
},
NetworkSecurityEngineer: {
  label: "Network / Security",
  pitch: "I like protocols enough to write my own, replay attacks and all.",
  skills: [ /* unchanged */ ],
},
```

Only add the `pitch` line to each — leave every `label` and `skills` array exactly as they are today.

- [ ] **Step 2: Tag each `work` entry with `roles`**

In the `work: [ ... ]` array (starts at `resume.tsx:198`), add a `roles` field to the entries below (identified by their exact `title`). Leave the other 6 work entries (`Archivist`, `Treasurer`, `CSSE230 Data Structures & Algorithm Analysis — Grader`, `Direct Current Circuits — Lab Assistant`, `Object-Oriented Software Development — TA`) untouched — they have no clear fit with any of the 10 roles, so they intentionally get no `roles` field and will simply dim like any non-matching item.

| `title` | add `roles:` |
|---|---|
| `"Researcher (Continuing Contribution)"` | `["SystemsKernelEngineer"]` |
| `"CSSE332 Operating Systems — Grader"` | `["SystemsKernelEngineer"]` |
| `"Lab Manager & Researcher "` | `["RoboticsMechatronics", "EmbeddedFirmwareEngineer"]` |
| `"ECE312 Communication Networks — Grader"` | `["NetworkSecurityEngineer"]` |
| `"Embedded Systems Development — Teaching Assistant"` | `["EmbeddedFirmwareEngineer"]` |

Example edit for the first row:

```ts
{
  department: "Rose-Hulman Summer Undergraduate Research Fellowships",
  company: "Rose-Hulman Institute of Technology",
  href: "https://www.rose-hulman.edu/",
  badges: ["Research", "Leadership"],
  roles: ["SystemsKernelEngineer"],
  location: "Terre Haute, IN",
  title: "Researcher (Continuing Contribution)",
  // ...rest unchanged
},
```

Apply the same pattern (insert `roles: [...]` after `badges`) to the other four rows in the table.

- [ ] **Step 3: Tag each `projects` entry with `roles`**

In the `projects: [ ... ]` array (starts at `resume.tsx:398`), add a `roles` field to each entry (identified by exact `title`), inserted right after `technologies`:

| `title` | add `roles:` |
|---|---|
| `"MorpheOS — Teaching-Focused RISC-V Microkernel"` | `["SystemsKernelEngineer", "ComputerArchitectureRTL"]` |
| `"VPN Tunnel Program"` | `["NetworkSecurityEngineer", "SystemsKernelEngineer"]` |
| `"Cryogenic Superconducting Film Characterization Apparatus"` | `["EmbeddedFirmwareEngineer"]` |
| `"Processing-in-Memory DPU Scaling"` | `["HPCPerformanceEngineer", "ComputerArchitectureRTL"]` |
| `"Lime ISA — Multi-cycle CPU (RISC-V-like)"` | `["ComputerArchitectureRTL", "FPGAEngineer"]` |
| `"UsedExchange — AI-Assisted Static Marketplace"` | `["FullStackWebEngineer"]` |
| `"Job-Offer Outcome Prediction — ML Pipeline & Browser App"` | `["DataMLEngineer", "FullStackWebEngineer"]` |
| `"OAO Autonomous Vehicle Firmware"` | `["EmbeddedFirmwareEngineer", "RoboticsMechatronics"]` |
| `"Open-Source Educational Robotics"` | `["RoboticsMechatronics", "EmbeddedFirmwareEngineer"]` |
| `"Socket Chat Program"` | `["NetworkSecurityEngineer"]` |
| `"LazyPlant — Embedded Plant Care"` | `["EmbeddedFirmwareEngineer"]` |
| `"EV Battery Pack — Cell Test Automation"` | `["EmbeddedFirmwareEngineer"]` |
| `"Guitar Hero Arcade (FPGA)"` | `["FPGAEngineer"]` |
| `"Genetic Algorithm Simulator"` | *(no `roles` — no clear fit, leave untagged)* |
| `"Personal Website & Services"` | `["DevOpsInfra"]` |
| `"ParkSmart — Campus Parking App"` | `["FullStackWebEngineer"]` |
| `"Model United Nations App (CYMUNC)"` | `["FullStackWebEngineer"]` |
| `"WIC Personal Website & Services"` | `["DevOpsInfra"]` |

Example edit for the first row:

```ts
{
  title: "MorpheOS — Teaching-Focused RISC-V Microkernel",
  href: "#",
  dates: "Jun 2025 – Present",
  active: true,
  gridSize: { col: 2, row: 2 } as const,
  description: /* unchanged */,
  longDescription: /* unchanged */,
  technologies: ["RISC-V", "C/ASM", "OpenSBI", "QEMU", "GDB", "Make"],
  roles: ["SystemsKernelEngineer", "ComputerArchitectureRTL"],
  links: [],
  images: ["/MorpheOS/MorpheOS.jpg", "/MorpheOS/MorpheOSQemu.png"],
  imageFolder: "MorpheOS",
  video: "",
},
```

Apply the same pattern (insert `roles: [...]` after `technologies`) to the other 16 rows in the table (skip `"Genetic Algorithm Simulator"` entirely — no field added).

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors. (`DATA` is declared `as const`, so these are just additional literal fields — no type errors expected.)

- [ ] **Step 5: Commit**

```bash
git add src/data/resume.tsx
git commit -m "feat: tag work/projects with target roles and add hero pitch per role"
```

---

### Task 5: `className` passthrough on `ResumeCard`

**Files:**
- Modify: `src/components/resume-card.tsx`

**Interfaces:**
- Produces: `ResumeCardProps.className?: string`, merged onto the root `Card`'s existing className list.

- [ ] **Step 1: Add the prop and merge it**

In `ResumeCardProps` (around `resume-card.tsx:12`), add:

```ts
interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string | React.ReactNode;
  className?: string;
}
```

Destructure it in the component signature (around `resume-card.tsx:22`):

```ts
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  className,
}: ResumeCardProps) => {
```

Merge it into the existing `Card` className array using the already-imported `cn` helper (around `resume-card.tsx:47`):

```tsx
<Card className={cn(
  "flex p-4",
  "bg-white/85 dark:bg-slate-950/65 backdrop-blur-sm",
  "border border-slate-200/60 dark:border-slate-700/30",
  "shadow-[0_0_22px_rgba(99,102,241,0.07)] dark:shadow-[0_0_28px_rgba(99,102,241,0.20)]",
  "transition-shadow duration-300",
  "hover:shadow-[0_0_28px_rgba(99,102,241,0.13)] dark:hover:shadow-[0_0_36px_rgba(99,102,241,0.32)]",
  className
)}>
```

(Replace the existing `className={[...].join(" ")}` array-join with `cn(...)` — `cn` is already imported at the top of the file — and add `className` as the final argument.)

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/resume-card.tsx
git commit -m "feat: add className passthrough to ResumeCard"
```

---

### Task 6: Highlight support in `ExpandableProjectGrid`

**Files:**
- Modify: `src/components/expandable-project-grid.tsx`

**Interfaces:**
- Consumes: nothing new from other tasks (this task only changes the grid's own props/types).
- Produces: `ProjectItem.roles?: readonly string[]`; `ExpandableProjectGrid` now accepts `selectedRole: string | null` as a prop.

- [ ] **Step 1: Add `roles` to `ProjectItem`**

In the `ProjectItem` interface (`expandable-project-grid.tsx:15-29`), add:

```ts
export interface ProjectItem {
  title: string;
  href?: string;
  dates: string;
  description: string;
  longDescription?: string;
  technologies?: readonly string[];
  roles?: readonly string[];
  image?: string;
  images?: readonly string[];
  imageFolder?: string;
  video?: string;
  links?: readonly ProjectLink[];
  gridSize?: { col: 1 | 2 | 3; row: 1 | 2 };
  active?: boolean;
}
```

- [ ] **Step 2: Accept `selectedRole` and apply conditional classes**

Change the `ExpandableProjectGrid` signature (`expandable-project-grid.tsx:412-416`):

```ts
export function ExpandableProjectGrid({
  projects,
  selectedRole,
}: {
  projects: readonly ProjectItem[];
  selectedRole: string | null;
}) {
```

In the render loop (`expandable-project-grid.tsx:479-496`), compute a match flag and extend `containerClassName`:

```tsx
{projects.map((project) => {
  const col = project.gridSize?.col ?? 1;
  const row = project.gridSize?.row ?? 1;
  const isMatch = selectedRole ? !!project.roles?.includes(selectedRole) : false;
  const isDimmed = selectedRole ? !isMatch : false;

  return (
    <WobbleCard
      key={project.title}
      containerClassName={cn(
        col >= 2 && "sm:col-span-2",
        col >= 3 && "lg:col-span-3",
        row >= 2 && "row-span-2",
        isMatch && "ring-2 ring-indigo-400/60 shadow-[0_0_24px_rgba(99,102,241,0.35)]",
        isDimmed && "opacity-50"
      )}
      onClick={() => setActiveCard(project)}
    >
      <CardContent project={project} col={col} row={row} />
    </WobbleCard>
  );
})}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: a new error at the call site in `page.tsx` (`<ExpandableProjectGrid projects={...} />` missing the now-required `selectedRole` prop) — this is expected and gets fixed in Task 8. Confirm the error is specifically about the missing prop, not something else.

- [ ] **Step 4: Commit**

```bash
git add src/components/expandable-project-grid.tsx
git commit -m "feat: support role-based highlight/dim in ExpandableProjectGrid"
```

---

### Task 7: `RoleSelectModal` (first-visit prompt)

**Files:**
- Create: `src/components/role-select-modal.tsx`

**Interfaces:**
- Consumes: `useRoleHighlight()` from `@/components/role-highlight-provider` (Task 2); `PRIMARY_ROLE_KEYS`, `MORE_ROLE_KEYS` from `@/lib/role-highlight` (Task 1); `DATA.roles` from `@/data/resume` for `label` text.
- Produces: `RoleSelectModal` component, no props — self-contained, reads everything from context/data.

- [ ] **Step 1: Write the component**

```tsx
// src/components/role-select-modal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRoleHighlight } from "@/components/role-highlight-provider";
import { PRIMARY_ROLE_KEYS, MORE_ROLE_KEYS } from "@/lib/role-highlight";
import { DATA } from "@/data/resume";

export function RoleSelectModal() {
  const { hasAnswered, selectRole, skip } = useRoleHighlight();
  const [mounted, setMounted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (hasAnswered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasAnswered, skip]);

  if (!mounted) return null;

  // Matches the `(DATA as any).roles` cast pattern already used in page.tsx's
  // SkillsSection, rather than asserting the `as const` shape directly.
  const roles = (DATA as any).roles as Record<string, { label: string }>;

  const content = (
    <AnimatePresence>
      {!hasAnswered && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="What role are you hiring for?"
        >
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={skip}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200/60 dark:border-slate-700/30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm p-6 space-y-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="space-y-1">
              <h2 className="text-lg font-bold">What role are you hiring for?</h2>
              <p className="text-sm text-muted-foreground">
                I&apos;ll highlight the skills, projects, and experience most relevant to it.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRIMARY_ROLE_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => selectRole(key)}
                  className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {roles[key]?.label ?? key}
                </button>
              ))}
            </div>

            {showMore && (
              <div className="flex flex-wrap gap-2">
                {MORE_ROLE_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => selectRole(key)}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {roles[key]?.label ?? key}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              {!showMore ? (
                <button
                  onClick={() => setShowMore(true)}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                >
                  More roles
                </button>
              ) : (
                <span />
              )}
              <button
                onClick={skip}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Just browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors mentioning `role-select-modal.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/role-select-modal.tsx
git commit -m "feat: add first-visit role-select modal"
```

---

### Task 8: `RoleHeroSelector` and wiring it all into `page.tsx`

**Files:**
- Create: `src/components/role-hero-selector.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `useRoleHighlight()` (Task 2); `PRIMARY_ROLE_KEYS`, `MORE_ROLE_KEYS` (Task 1); `RoleSelectModal` (Task 7); `DATA.roles[key].pitch` and `DATA.roles[key].label` (Task 4); `ExpandableProjectGrid`'s new `selectedRole` prop (Task 6); `ResumeCard`'s new `className` prop (Task 5).

- [ ] **Step 1: Write `RoleHeroSelector`**

```tsx
// src/components/role-hero-selector.tsx
"use client";

import { useState } from "react";
import { useRoleHighlight } from "@/components/role-highlight-provider";
import { PRIMARY_ROLE_KEYS, MORE_ROLE_KEYS } from "@/lib/role-highlight";
import { DATA } from "@/data/resume";

export function RoleHeroSelector() {
  const { selectedRole, selectRole, clear } = useRoleHighlight();
  const [showMore, setShowMore] = useState(false);
  const roles = (DATA as any).roles as Record<string, { label: string }>;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-xs font-medium text-muted-foreground mr-1">
        Highlighting for:
      </span>
      {PRIMARY_ROLE_KEYS.map((key) => (
        <button
          key={key}
          onClick={() => selectRole(key)}
          className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
            selectedRole === key
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {roles[key]?.label ?? key}
        </button>
      ))}
      {showMore &&
        MORE_ROLE_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => selectRole(key)}
            className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
              selectedRole === key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {roles[key]?.label ?? key}
          </button>
        ))}
      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors"
        >
          More ▾
        </button>
      )}
      {selectedRole && (
        <button
          onClick={clear}
          className="px-2.5 py-1 text-xs rounded-full text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          Clear
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Type-check the new file**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no new errors mentioning `role-hero-selector.tsx`.

- [ ] **Step 3: Wire into `page.tsx` — imports**

Add near the top of `src/app/page.tsx`, with the other component imports:

```ts
import { RoleSelectModal } from "@/components/role-select-modal";
import { RoleHeroSelector } from "@/components/role-hero-selector";
import { useRoleHighlight } from "@/components/role-highlight-provider";
```

- [ ] **Step 4: Render the modal and hero selector, add the hero pitch line**

Inside `export default function Page()`, right after `const heroResumeButtons = ...` (`page.tsx:39-41`), add:

```ts
const { selectedRole } = useRoleHighlight();
const rolePitch =
  selectedRole && (DATA as any).roles?.[selectedRole]?.pitch
    ? ((DATA as any).roles[selectedRole].pitch as string)
    : null;
```

Render `<RoleSelectModal />` once near the top of the returned JSX, e.g. immediately after the opening `<main ...>` tag (`page.tsx:44`):

```tsx
<main className="flex flex-col min-h-[100dvh] space-y-10">
  <RoleSelectModal />
  <GoogleAnalytics gaId="G-X4L3QV064E" />
  {/* ...rest unchanged */}
```

Inside the Hero section, directly below the existing description `<BlurFadeText ... text={DATA.description} />` block (`page.tsx:90-96`) and above the `heroResumeButtons` `BlurFade` block, add the pitch line and the selector:

```tsx
{rolePitch && (
  <p className="text-sm font-medium text-foreground/80 pt-1">{rolePitch}</p>
)}
<RoleHeroSelector />
```

- [ ] **Step 5: Wire `SkillsSection`'s initial tab from context**

In `SkillsSection` (`page.tsx:315` onward), change the local state initializer (`page.tsx:322`):

```ts
const { selectedRole: contextRole } = useRoleHighlight();
const [selectedRole, setSelectedRole] = useState<"all" | string>(
  contextRole ?? "SystemsKernelEngineer"
);

useEffect(() => {
  if (contextRole) setSelectedRole(contextRole);
}, [contextRole]);
```

Place this right after the existing `const roles = (DATA as any).roles as RolesMap | undefined;` line, replacing the current `const [selectedRole, setSelectedRole] = useState<"all" | string>("SystemsKernelEngineer");` line entirely. `useEffect` is already imported in `page.tsx` (`page.tsx:15`).

- [ ] **Step 6: Pass `selectedRole`-derived highlight classes to Work `ResumeCard`s**

In the Work Experience section's `.map` (`page.tsx:168-182`), compute the match/dim classes and pass `className`:

```tsx
{DATA.work.map((work: any, id: number) => {
  const isMatch = selectedRole ? !!work.roles?.includes(selectedRole) : false;
  const isDimmed = selectedRole ? !isMatch : false;
  return (
    <BlurFade key={`${work.title}-${work.start}`} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
      <ResumeCard
        key={`${work.title}-${work.start}`}
        logoUrl={work.logoUrl}
        altText={work.company}
        title={work.title}
        subtitle={`${work.department} · ${work.company}`}
        href={work.href}
        badges={work.badges}
        period={`${work.start} - ${work.end ?? "Present"}`}
        description={work.description}
        className={
          isMatch
            ? "ring-2 ring-indigo-400/60 shadow-[0_0_24px_rgba(99,102,241,0.35)]"
            : isDimmed
            ? "opacity-50"
            : undefined
        }
      />
    </BlurFade>
  );
})}
```

Note: `selectedRole` here is the top-level `Page` component's context value from Step 4, not `SkillsSection`'s local state — this `.map` lives directly in `Page`, so it already has access to the `selectedRole` destructured in Step 4.

- [ ] **Step 7: Pass `selectedRole` into `ExpandableProjectGrid`**

In the Projects section (`page.tsx:266`), update the call:

```tsx
<ExpandableProjectGrid projects={DATA.projects as any} selectedRole={selectedRole} />
```

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors. This should also resolve the Task 6 "missing prop" error.

- [ ] **Step 9: Commit**

```bash
git add src/components/role-hero-selector.tsx src/app/page.tsx
git commit -m "feat: wire role-based highlighting into hero, skills, work, and projects"
```

---

### Task 9: End-to-end browser verification (delegated to a subagent)

This repo has no automated UI test suite, and running `next dev`/`next build` requires Node 22.11.0 (the currently-active Node breaks Next 14.2.4). Rather than run this inline, dispatch a subagent to drive the real dev server and confirm the feature works end-to-end.

**Files:** none (verification only, no code changes).

- [ ] **Step 1: Dispatch a verification subagent**

Give the subagent this exact task (note: point it at this plan's actual worktree, not the main checkout):

> In the role-highlight worktree, run `nvm use 22.11.0 && npm run dev` (background it or use a timeout — do not use pnpm, do not run `npm run build`, it's a slow iCloud-backed repo). Open `http://localhost:3000` in a browser and verify:
> 1. With `localStorage` cleared, loading the page shows the "What role are you hiring for?" modal.
> 2. Clicking a primary role (e.g. "Embedded / Firmware") closes the modal, and: the Skills section jumps to that role's tab, at least one Project card gets a visible glow ring while others visibly dim, at least one Work Experience card gets the same glow treatment, and a one-line pitch appears under the hero description.
> 3. Reloading the page does NOT show the modal again (localStorage persisted `hasAnswered`), and the same role stays highlighted.
> 4. In the hero pill row, clicking "More ▾" reveals the 4 secondary roles, and selecting one updates the highlight accordingly.
> 5. Clicking "Clear" in the hero pill row removes all glow/dim styling and the hero pitch line, returning the page to its default appearance.
> 6. With `localStorage` cleared again, clicking "Just browsing" in the modal closes it without highlighting anything, and reloading does not show the modal again.
>
> Report pass/fail for each of the 6 checks, with a screenshot or description of any failure.

- [ ] **Step 2: Fix any reported failures**

If the subagent reports a failure, fix the relevant file from Tasks 1–8, re-run `npx tsc --noEmit -p tsconfig.json`, and re-dispatch verification for the failed check only.

- [ ] **Step 3: Final commit (if fixes were needed)**

```bash
git add -A
git commit -m "fix: address role-highlight verification findings"
```

(Skip this step if Task 9 Step 1 reported all 6 checks passing with no code changes.)
