"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      // Dark by default: the star field + nebula layer (the site's strongest
      // visual) only exists in dark mode. Visitors can still toggle light,
      // and their choice persists via next-themes localStorage.
      defaultTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}