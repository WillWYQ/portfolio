// src/config/types.ts
import type { ComponentType, SVGProps } from "react";

export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavbarItem = {
  label: string;
  href: string;
  icon: Icon;
};

type SocialBase = { name: string; url: string };
export type SocialNav = SocialBase & { navbar: true; icon: Icon };
export type SocialOther = SocialBase & { navbar: false };
export type Social = SocialNav | SocialOther;

export const isSocialNav = (s: Social): s is SocialNav => s.navbar === true;
