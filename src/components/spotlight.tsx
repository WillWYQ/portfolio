"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page spotlight that follows the mouse cursor.
 * Uses direct DOM mutation (no React state) for zero-overhead 60fps tracking.
 * Theme is read from the <html> class on each mousemove — no need for useTheme.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dark = document.documentElement.classList.contains("dark");

      el.style.background = dark
        ? `radial-gradient(700px circle at ${x}px ${y}px,
            rgba(120,119,198,0.13),
            rgba(99,102,241,0.05) 42%,
            transparent 65%)`
        : `radial-gradient(600px circle at ${x}px ${y}px,
            rgba(99,102,241,0.07),
            rgba(139,92,246,0.025) 40%,
            transparent 62%)`;
    };

    // Fade in on first cursor entry
    const onEnter = () => {
      el.style.opacity = "1";
      window.removeEventListener("mouseenter", onEnter);
    };

    el.style.opacity = "0";
    el.style.transition = "opacity 0.8s ease";

    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
