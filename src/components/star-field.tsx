"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Dark mode: white / blue-white stars. Light mode: soft indigo/violet particles.
const DARK_COLORS = ["#ffffff", "#e8f0ff", "#c7d2ff", "#f0ecff", "#ffe8d0"];
const LIGHT_COLORS = ["#818cf8", "#a5b4fc", "#8b5cf6", "#7dd3fc", "#c4b5fd"];

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const COUNT = isDark ? 220 : 65;

    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * (isDark ? 1.45 : 1.0) + 0.22,
      baseAlpha: isDark
        ? Math.random() * 0.65 + 0.15
        : Math.random() * 0.17 + 0.05,
      twinkleSpeed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.055,
      vy: (Math.random() - 0.5) * 0.042,
      colorIdx: Math.floor(Math.random() * colors.length),
    }));

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        // Wrap-around drift
        s.x = (s.x + s.vx + canvas.width) % canvas.width;
        s.y = (s.y + s.vy + canvas.height) % canvas.height;

        // Twinkle
        const tw = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.phase);
        const alpha = s.baseAlpha * (0.3 + 0.7 * tw);
        const color = colors[s.colorIdx];

        ctx.globalAlpha = alpha;

        // Glow halo for bright dark-mode stars
        if (isDark && s.r > 0.85 && alpha > 0.28) {
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
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
