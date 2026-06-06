"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  onClick?: () => void;
}

export function WobbleCard({
  children,
  containerClassName,
  className,
  onClick,
}: WobbleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setMouse({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setMouse({ x: 0, y: 0 });
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "relative",
        onClick && "cursor-pointer",
        containerClassName
      )}
      style={{
        transform: hovering
          ? `perspective(900px) rotateX(${-mouse.y * 8}deg) rotateY(${mouse.x * 8}deg) scale3d(1.02,1.02,1.02)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: hovering ? "transform 0.12s ease" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Mouse-following shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{
          background: hovering
            ? `radial-gradient(circle at ${(mouse.x + 0.5) * 100}% ${(mouse.y + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`
            : "none",
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div className={cn("h-full", className)}>{children}</div>
    </div>
  );
}
