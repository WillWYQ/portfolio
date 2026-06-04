"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SpinningTextProps = {
  text: string;
  radius?: number; // in px; determines overall size (diameter = 2 * radius)
  speed?: number; // seconds per rotation
  reverse?: boolean;
  className?: string; // applies to the text color/style
  children?: React.ReactNode; // centered content (e.g., Avatar)
};

export function SpinningText({
  text,
  radius = 80,
  speed = 12,
  reverse = false,
  className,
  children,
}: SpinningTextProps) {
  const id = React.useId();
  const diameter = radius * 2;

  // Repeat text enough times to wrap the circle nicely
  const content = React.useMemo(() => {
    const sep = text.endsWith(" ") ? "" : " ";
    const base = text + sep;
    const circumference = 2 * Math.PI * radius;
    const reps = Math.max(6, Math.ceil(circumference / 80));
    return Array.from({ length: reps }, () => base).join("");
  }, [text, radius]);

  const animationStyle: React.CSSProperties = {
    animation: `${reverse ? "spin-reverse" : "spin"} ${speed}s linear infinite`,
  };

  return (
    <div
      className="relative inline-grid place-items-center overflow-visible"
      style={{ width: diameter, height: diameter }}
    >
      {/* Center content (below text ring) */}
      <div className="absolute inset-0 z-0 grid place-items-center">
        {children}
      </div>

      {/* Circular text (above) */}
      <svg
        // 🔴 关键修复：完全去掉原先写死的 width={diameter} 和 height={diameter}
        // 使用 absolute 并用一个负的 inset（比如 -top-6 -left-6）配合 w-[calc(100%+48px)]
        // 让 SVG 画布在四面八方平铺扩大 24px 的纯空气缓冲区。因为 viewBox 没变，圆形和字体的尺寸完全不变！
        className="absolute -top-6 -left-6 z-10 pointer-events-none overflow-visible"
        viewBox={`0 0 ${diameter} ${diameter}`}
        style={{
          ...animationStyle,
          width: `calc(100% + 48px)`,
          height: `calc(100% + 48px)`,
        }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={`circlePath-${id}`}
            // 🔴 关键修复：一字不差地还原官方原版最完美的数学公式，保证 100% 是个完美的正圆
            d={`M ${radius},${radius} m -${radius - 2},0 a ${radius - 2},${radius - 2} 0 1,1 ${
              (radius - 2) * 2
            },0 a ${radius - 2},${radius - 2} 0 1,1 -${(radius - 2) * 2},0`}
          />
        </defs>
        <text className={cn("text-[10px] md:text-xs tracking-[0.15em]", className)}>
          <textPath href={`#circlePath-${id}`} startOffset="0">
            {content}
          </textPath>
        </text>
      </svg>

      {/* Local keyframes (scoped) */}
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
    </div>
  );
}