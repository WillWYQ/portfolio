"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const STAR_COLORS = ["#ffffff", "#e8f0ff", "#c7d2ff", "#f0ecff", "#ffe8d0"];

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number; // radians/frame — period ~10-35 s at 60 fps
  phase: number;
  vx: number;
  vy: number;
  colorIdx: number;
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (resolvedTheme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduced motion: keep the starry sky but render it as a single static
    // frame (no twinkle, no drift, no rAF loop).
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let redraw: (() => void) | null = null;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Resizing wipes the bitmap; with no animation loop running, repaint once.
      redraw?.();
    };
    setSize();
    window.addEventListener("resize", setSize);

    const stars: Star[] = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.45 + 0.22,
      baseAlpha: Math.random() * 0.65 + 0.15,
      twinkleSpeed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.055,
      vy: (Math.random() - 0.5) * 0.042,
      colorIdx: Math.floor(Math.random() * STAR_COLORS.length),
    }));

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.x = (s.x + s.vx + canvas.width) % canvas.width;
          s.y = (s.y + s.vy + canvas.height) % canvas.height;
        }

        const tw = prefersReducedMotion
          ? 0.65
          : 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.phase);
        const alpha = s.baseAlpha * (0.3 + 0.7 * tw);
        const color = STAR_COLORS[s.colorIdx];

        ctx.globalAlpha = alpha;

        if (s.r > 0.85 && alpha > 0.28) {
          ctx.shadowBlur = s.r * 9;
          ctx.shadowColor = color;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      t++;
      if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) redraw = render;
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [resolvedTheme]);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
