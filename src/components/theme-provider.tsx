"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { MotionConfig } from "framer-motion";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      // Dark by default: the star field + nebula layer (the site's strongest
      // visual) only exists in dark mode. Visitors can still toggle light,
      // and their choice persists via next-themes localStorage.
      defaultTheme="dark"
      // No OS following: enableSystem defaults to true in next-themes, which
      // made the site flip light/dark whenever the OS auto appearance
      // (sunset/schedule) switched. Theme is only ever an explicit choice.
      enableSystem={false}
      // Fresh key: an earlier version of the site stored "system" under the
      // default "theme" key; with enableSystem off that stale value would
      // apply a literal `class="system"` (broken light). Ignore it.
      storageKey="portfolio-theme"
      disableTransitionOnChange
      {...props}
    >
      {/* Honor OS-level reduced-motion for all framer-motion animations */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}