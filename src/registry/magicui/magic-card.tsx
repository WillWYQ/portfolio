"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string;
}

// A lightweight Magic UI–style card with a subtle spotlight and frosted background.
export function MagicCard({
  className,
  gradientClassName,
  children,
  ...props
}: MagicCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl shadow-lg",
        className
      )}
      {...props}
    >
      {/* Glow spotlight that follows the cursor */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          gradientClassName
        )}
        style={{
          background:
            "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15), transparent 40%)",
        }}
      />
      {/* Top sheen and subtle border mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl border border-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

