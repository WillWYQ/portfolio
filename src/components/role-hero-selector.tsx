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
