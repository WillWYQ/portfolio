// src/config/socials.ts
import { Github, Linkedin, Globe, Mail } from "lucide-react";
import type { Social } from "./types";

export const socials = {
  GitHub:   { name: "GitHub",   url: "https://github.com/WillWYQ",              navbar: true,  icon: Github },
  LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/yueqiaowang/", navbar: true,  icon: Linkedin },
  // Points at the personal site — a dock icon that reloads the page it's on helps no one.
  Website:  { name: "Website",  url: "https://willsleep.dev/",                  navbar: true,  icon: Globe },
  // In the dock: email is the primary CTA for recruiters, keep it one click away.
  Email:    { name: "Send Email", url: "mailto:career@yueqiao.dev",             navbar: true,  icon: Mail },
} as const satisfies Record<string, Social>;
