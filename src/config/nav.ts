// src/config/nav.ts
import { Home, NotebookText } from "lucide-react";
import type { NavbarItem } from "./types";

export const navbar = [
  { label: "Home", href: "/", icon: Home },
  // { label: "Blog", href: "/blog", icon: NotebookText },
] as const satisfies ReadonlyArray<NavbarItem>;
