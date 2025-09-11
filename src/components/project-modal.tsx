"use client";

import { useEffect, useRef, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/registry/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Markdown from "react-markdown";
import Link from "next/link";
import { importImagesFromFolder } from "@/lib/utils";

type ProjectLink = { icon: React.ReactNode; type: string; href: string };

export interface ProjectData {
  title: string;
  dates: string;
  description: string;
  longDescription?: string;
  technologies?: readonly string[];
  image?: string;
  images?: readonly string[];
  imageFolder?: string;
  video?: string;
  links?: readonly ProjectLink[];
}

export function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: ProjectData | null;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Mount animations + focus the close button
  useEffect(() => {
    if (!open) return;
    setMounted(true);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  // Build slides from video + images (multi-image support)
  const slides: Array<{ type: "video" | "image"; src: string }> = [];
  if (project?.video) slides.push({ type: "video", src: project.video });
  
  // 优先使用images数组，然后是imageFolder，最后是单个image
  let imgs: string[] = [];
  if (project?.images && project.images.length > 0) {
    imgs = [...project.images];
  } else if (project?.imageFolder) {
    // 使用工具函数从文件夹导入图片
    imgs = importImagesFromFolder(project.imageFolder);
  } else if (project?.image) {
    imgs = [project.image];
  }
  
  for (const src of imgs) slides.push({ type: "image", src });

  const [index, setIndex] = useState(0);
  const count = slides.length;
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  // Auto-play functionality
  useEffect(() => {
    if (!open || count <= 1) return;

    if (autoPlay) {
      autoPlayInterval.current = setInterval(() => {
        setIndex((i) => (i + 1) % count);
      }, 3000); // 每3秒切换一次
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [open, count, autoPlay]);

  // Arrow keys navigate slides
  useEffect(() => {
    if (!open || count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      // 按箭头键时暂停自动播放
      setAutoPlay(false);
      
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count]);

  // 点击导航按钮时暂停自动播放
  const handleManualNavigation = (navigate: () => void) => {
    setAutoPlay(false);
    navigate();
  };

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseMove={() => setAutoPlay(true)}
    >
      {/* Backdrop with frosted blur */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <MagicCard className={`relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col transition-all duration-200 ease-out ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-100 translate-y-2 scale-95"}`}>
        <button
          type="button"
          onClick={onClose}
          ref={closeBtnRef}
          className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close"
        >
          ✕
        </button>

        {count > 0 && (
          <div className="relative w-full">
            {/* Slides */}
            <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden">
              {slides.map((s, i) => (
                <div
                  key={`${s.type}-${s.src}-${i}`}
                  className={`absolute inset-0 transition-opacity duration-300 ${i === index ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={i !== index}
                >
                  {s.type === "video" ? (
                    <video
                      src={s.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <Image
                      src={s.src}
                      alt={`${project.title} media ${i + 1}`}
                      width={1200}
                      height={640}
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Controls */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleManualNavigation(prev)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 px-2 py-1 text-sm"
                  aria-label="Previous media"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => handleManualNavigation(next)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 px-2 py-1 text-sm"
                  aria-label="Next media"
                >
                  ›
                </button>
                <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to media ${i + 1}`}
                      onClick={() => {
                        setAutoPlay(false);
                        setIndex(i);
                      }}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle id="project-modal-title" className="text-xl">{project.title}</CardTitle>
          <time className="text-xs text-muted-foreground">{project.dates}</time>
        </CardHeader>
        <CardContent className="space-y-3 overflow-auto flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-6">
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {project.longDescription || project.description}
          </Markdown>

          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {project.technologies.map((tag) => (
                <Badge key={tag} className="px-2 py-0 text-[10px]" variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
              {project.links.map((link, idx) => (
                <Link key={idx} href={link.href} target="_blank">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </MagicCard>
    </div>
  );
}
