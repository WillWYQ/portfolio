"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Badge } from "@/components/ui/badge";
import { cn, importImagesFromFolder } from "@/lib/utils";

type ProjectLink = { icon: React.ReactNode; type: string; href: string };

export interface ProjectItem {
  title: string;
  href?: string;
  dates: string;
  description: string;
  longDescription?: string;
  technologies?: readonly string[];
  image?: string;
  images?: readonly string[];
  imageFolder?: string;
  video?: string;
  links?: readonly ProjectLink[];
  gridSize?: { col: 1 | 2 | 3; row: 1 | 2 };
  active?: boolean;
}

// ─── Category detection ────────────────────────────────────────────
function getCategory(technologies: readonly string[] = []) {
  const t = technologies.map((s) => s.toLowerCase());
  const has = (...kws: string[]) => kws.some((k) => t.some((s) => s.includes(k)));
  if (has("risc-v", "opensbi", "qemu", "c/asm", "openbsi", "morphe")) return "systems";
  if (has("esp32", "arduino", "raspberry", "msp432", "lvgl", "tinyusb", "ads124", "pt1000"))
    return "embedded";
  if (has("verilog", "fpga", "quartus", "modelsim", "isa design", "altera"))
    return "hardware";
  if (has("scikit", "onnx", "pandas", "numpy", "gradient", "pytorch", "ml"))
    return "ml";
  if (has("next", "react", "typescript", "javascript", "vue", "firebase", "tailwind", "node"))
    return "web";
  if (has("tun/tap", "sha3", "vpn", "wireshark", "tcp/udp", "socket"))
    return "security";
  if (has("upimulator", "gem5", "zsim", "dpu", "ramulator")) return "arch";
  return "default";
}

const CATEGORY_ACCENT: Record<string, { grad: string; border: string; badge: string }> = {
  systems:  { grad: "from-indigo-500/10 via-violet-500/5 to-transparent", border: "border-indigo-400/25 dark:border-indigo-500/30", badge: "text-indigo-600 dark:text-indigo-400" },
  embedded: { grad: "from-amber-500/10 via-orange-500/5 to-transparent",  border: "border-amber-400/25 dark:border-amber-500/30",  badge: "text-amber-600 dark:text-amber-400" },
  hardware: { grad: "from-sky-500/10 via-blue-500/5 to-transparent",      border: "border-sky-400/25 dark:border-sky-500/30",      badge: "text-sky-600 dark:text-sky-400" },
  ml:       { grad: "from-cyan-500/10 via-teal-500/5 to-transparent",     border: "border-cyan-400/25 dark:border-cyan-500/30",    badge: "text-cyan-600 dark:text-cyan-400" },
  web:      { grad: "from-emerald-500/10 via-green-500/5 to-transparent", border: "border-emerald-400/25 dark:border-emerald-500/30", badge: "text-emerald-600 dark:text-emerald-400" },
  security: { grad: "from-rose-500/10 via-red-500/5 to-transparent",      border: "border-rose-400/25 dark:border-rose-500/30",    badge: "text-rose-600 dark:text-rose-400" },
  arch:     { grad: "from-blue-500/10 via-indigo-500/5 to-transparent",   border: "border-blue-400/25 dark:border-blue-500/30",    badge: "text-blue-600 dark:text-blue-400" },
  default:  { grad: "from-slate-500/8 to-transparent",                    border: "border-slate-400/20 dark:border-slate-500/25",  badge: "text-slate-600 dark:text-slate-400" },
};

function resolveImages(project: ProjectItem): string[] {
  if (project.images && project.images.length > 0) return [...project.images];
  if (project.imageFolder) return importImagesFromFolder(project.imageFolder);
  if (project.image) return [project.image];
  return [];
}

// ─── Grid card inner content ────────────────────────────────────────
function CardContent({
  project,
  col,
  row,
}: {
  project: ProjectItem;
  col: number;
  row: number;
}) {
  const images = resolveImages(project);
  const displayImage = images[0] ?? null;
  const isWide = col >= 2;
  const isTall = row >= 2;
  const isLarge = isWide && isTall;
  const cat = getCategory(project.technologies);
  const accent = CATEGORY_ACCENT[cat];
  const tagLimit = isLarge ? 6 : isWide || isTall ? 4 : 3;
  const extra = (project.technologies?.length ?? 0) - tagLimit;

  // 2×1: wide but not tall — use side-by-side layout
  const isWideSingle = isWide && !isTall;

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border",
        "bg-white/85 dark:bg-slate-950/70 backdrop-blur-sm",
        accent.border,
        "shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_28px_rgba(0,0,0,0.28)]",
        "transition-shadow duration-300 hover:shadow-[0_4px_32px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_4px_40px_rgba(99,102,241,0.28)]",
        isWideSingle ? "flex flex-row" : "flex flex-col"
      )}
    >
      {/* Category gradient tint */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br pointer-events-none",
          accent.grad
        )}
      />

      {/* Image — tall/large: top strip; wide-single: right panel */}
      {displayImage && (isTall || isLarge) && (
        <div
          className="relative overflow-hidden flex-shrink-0 rounded-t-2xl"
          style={{ height: isLarge ? "54%" : "48%" }}
        >
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
      )}

      {/* Text content */}
      <div className="relative z-10 flex-1 flex flex-col p-3 sm:p-4 min-h-0">
        <div className="flex items-start gap-2 mb-0.5">
          <h3
            className={cn(
              "flex-1 font-bold tracking-tight leading-snug line-clamp-2",
              isLarge
                ? "text-lg sm:text-xl"
                : isWide
                ? "text-base sm:text-lg"
                : "text-sm sm:text-base"
            )}
          >
            {project.title}
          </h3>
          {project.active && (
            <span
              className={cn(
                "flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold mt-0.5",
                accent.badge
              )}
            >
              <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              {isWide ? "Active" : ""}
            </span>
          )}
        </div>

        <time className="text-[10px] text-muted-foreground/60 mb-2">
          {project.dates}
        </time>

        {(isWide || isTall) && (
          <p className="text-xs text-muted-foreground line-clamp-3 flex-1 min-h-0 leading-relaxed">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {project.technologies?.slice(0, tagLimit).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-1.5 py-0 text-[9px] sm:text-[10px] bg-background/60"
            >
              {tag}
            </Badge>
          ))}
          {extra > 0 && (
            <Badge
              variant="secondary"
              className="px-1.5 py-0 text-[9px] sm:text-[10px] bg-background/60"
            >
              +{extra}
            </Badge>
          )}
        </div>
      </div>

      {/* 2×1 wide card: image on the right side, no rounded corners on the left (text side) */}
      {displayImage && isWideSingle && (
        <div className="relative flex-shrink-0 w-[38%] overflow-hidden">
          <Image
            src={displayImage}
            alt={project.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
        </div>
      )}
    </div>
  );
}

// ─── Expanded overlay card ─────────────────────────────────────────
function ExpandedCard({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  const images = resolveImages(project);
  const slides: Array<{ type: "video" | "image"; src: string }> = [];
  if (project.video) slides.push({ type: "video", src: project.video });
  for (const src of images) slides.push({ type: "image", src });

  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % count),
    [count]
  );

  useEffect(() => {
    if (count <= 1 || !autoPlay) return;
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % count),
      3000
    );
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [count, autoPlay]);

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { setAutoPlay(false); prev(); }
      if (e.key === "ArrowRight") { setAutoPlay(false); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, prev, next]);

  const cat = getCategory(project.technologies);
  const accent = CATEGORY_ACCENT[cat];

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border",
        "bg-white dark:bg-slate-900",
        accent.border,
        "shadow-2xl max-h-[85vh]"
      )}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-20 rounded-full bg-black/20 hover:bg-black/40 text-white w-8 h-8 flex items-center justify-center text-sm backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Close project detail"
      >
        ✕
      </button>

      {/* Category gradient header strip */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r pointer-events-none",
          cat === "systems"  && "from-indigo-500 to-violet-500",
          cat === "embedded" && "from-amber-500 to-orange-500",
          cat === "hardware" && "from-sky-500 to-blue-500",
          cat === "ml"       && "from-cyan-500 to-teal-500",
          cat === "web"      && "from-emerald-500 to-green-500",
          cat === "security" && "from-rose-500 to-red-500",
          cat === "arch"     && "from-blue-500 to-indigo-500",
          cat === "default"  && "from-slate-400 to-slate-500"
        )}
      />

      {/* Media carousel */}
      {count > 0 && (
        <div className="relative w-full flex-shrink-0">
          <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden bg-muted/30">
            {slides.map((s, i) => (
              <div
                key={`${s.src}-${i}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  i === index ? "opacity-100" : "opacity-0"
                )}
              >
                {s.type === "video" ? (
                  <video
                    src={s.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src={s.src}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                )}
              </div>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => { setAutoPlay(false); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => { setAutoPlay(false); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 w-8 h-8 flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                ›
              </button>
              <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoPlay(false); setIndex(i); }}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    )}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-3 min-h-0">
        <div className={cn("flex items-start justify-between gap-2", count === 0 && "pr-10")}>
          <div>
            <h2 className="text-xl font-bold leading-tight">{project.title}</h2>
            <time className="text-xs text-muted-foreground">{project.dates}</time>
          </div>
          {project.active && (
            <span className={cn("flex items-center gap-1.5 text-xs font-semibold pt-1", accent.badge)}>
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Active
            </span>
          )}
        </div>

        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
          {project.longDescription || project.description}
        </Markdown>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-0 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-1">
            {project.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main grid ────────────────────────────────────────────────────
export function ExpandableProjectGrid({
  projects,
}: {
  projects: readonly ProjectItem[];
}) {
  const [activeCard, setActiveCard] = useState<ProjectItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!activeCard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard]);

  useEffect(() => {
    if (!activeCard) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, [activeCard]);

  const overlay = (
    <AnimatePresence>
      {activeCard && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeCard.title}
        >
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
          />
          <motion.div
            className="relative z-10 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <ExpandedCard
              project={activeCard}
              onClose={() => setActiveCard(null)}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          "gap-4 auto-rows-[200px] [grid-auto-flow:dense]"
        )}
      >
        {projects.map((project) => {
          const col = project.gridSize?.col ?? 1;
          const row = project.gridSize?.row ?? 1;

          return (
            <WobbleCard
              key={project.title}
              containerClassName={cn(
                col >= 2 && "sm:col-span-2",
                col >= 3 && "lg:col-span-3",
                row >= 2 && "row-span-2"
              )}
              onClick={() => setActiveCard(project)}
            >
              <CardContent project={project} col={col} row={row} />
            </WobbleCard>
          );
        })}
      </div>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
