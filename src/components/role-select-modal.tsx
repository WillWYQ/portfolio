// src/components/role-select-modal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRoleHighlight } from "@/components/role-highlight-provider";
import { PRIMARY_ROLE_KEYS, MORE_ROLE_KEYS } from "@/lib/role-highlight";
import { DATA } from "@/data/resume";

export function RoleSelectModal() {
  const { hasAnswered, selectRole, skip } = useRoleHighlight();
  const [mounted, setMounted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (hasAnswered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasAnswered, skip]);

  useEffect(() => {
    if (hasAnswered) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, [hasAnswered]);

  useEffect(() => {
    if (!hasAnswered) firstButtonRef.current?.focus();
  }, [hasAnswered]);

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
          aria-labelledby="role-select-modal-title"
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
              <h2 id="role-select-modal-title" className="text-lg font-bold">What role are you hiring for?</h2>
              <p className="text-sm text-muted-foreground">
                I&apos;ll highlight the skills, projects, and experience most relevant to it.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRIMARY_ROLE_KEYS.map((key, index) => (
                <button
                  key={key}
                  ref={index === 0 ? firstButtonRef : undefined}
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
