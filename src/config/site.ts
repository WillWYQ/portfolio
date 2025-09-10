// src/config/site.ts
export const site = {
  name: "Yueqiao Wang",
  url: "https://career.yueqiao.dev",
  email: "career@yueqiao.dev",
} as const;

// 统一从这里 re-export，外部只引入一个模块就够了
export { navbar } from "./nav";
export { socials } from "./socials";
export * from "./types";
