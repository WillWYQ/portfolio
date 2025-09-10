// src/config/socials.ts
import { Github, Linkedin, Globe, Mail } from "lucide-react";
import type { Social } from "./types";

export const socials = {
  GitHub:   { name: "GitHub",   url: "https://github.com/WillWYQ",              navbar: true,  icon: Github },
  LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/yueqiaowang/", navbar: true,  icon: Linkedin },
  Website:  { name: "Website",  url: "https://career.yueqiao.dev",              navbar: true,  icon: Globe },
  Email:    { name: "Send Email", url: "mailto:career@wic.monster",             navbar: false }, // 不展示在 dock
} as const satisfies Record<string, Social>;

// 想把邮箱也放到 dock：把上面 Email 改成
// { name: "Email", url: "mailto:career@wic.monster", navbar: true, icon: Mail }
