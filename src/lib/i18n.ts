export type Language = "en" | "zh";

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "portfolio-language";

export const LANGUAGE_METADATA: Record<
  Language,
  { label: string; nativeLabel: string; shortLabel: string }
> = {
  en: { label: "English", nativeLabel: "English", shortLabel: "EN" },
  zh: { label: "Chinese", nativeLabel: "中文", shortLabel: "中" },
};

export const SUPPORTED_LANGUAGES: Language[] = ["en", "zh"];

export const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" &&
  (value === "en" || value === "zh");

const COPY = {
  "nav.home": {
    en: "Home",
    zh: "首页",
  },
  "hero.availability": {
    en: "Available for Work: Globally",
    zh: "可接受全球岗位与远程合作",
  },
  "hero.greeting": {
    en: "Hi, I'm {name} 👋",
    zh: "你好，我是{name} 👋",
  },
  "about.heading": {
    en: "About",
    zh: "关于我",
  },
  "work.heading": {
    en: "Work Experience",
    zh: "工作经历",
  },
  "work.subtitle": {
    en: "For each card, you can click to view the details or jump to the corresponding link.",
    zh: "点击每张卡片即可展开详情或跳转到对应链接。",
  },
  "education.heading": {
    en: "Education",
    zh: "教育经历",
  },
  "education.gpa": {
    en: "GPA",
    zh: "绩点",
  },
  "education.honors": {
    en: "Honors",
    zh: "荣誉",
  },
  "education.relatedCourses": {
    en: "Related Courses",
    zh: "相关课程",
  },
  "skills.heading": {
    en: "Skills",
    zh: "技能矩阵",
  },
  "skills.rolesLead": {
    en: "Pick a role to see the most relevant skills.",
    zh: "选择一个角色以查看最匹配的技能。",
  },
  "skills.categoryFallback": {
    en: "Fallback to categories.",
    zh: "按技能类别查看。",
  },
  "skills.allFallback": {
    en: "Showing all skills (no roles or categories found).",
    zh: "展示全部技能（未设置角色/分类）。",
  },
  "skills.showMoreAria": {
    en: "Show more skills (scroll supported)",
    zh: "展开更多技能（支持滚动）",
  },
  "skills.showLessAria": {
    en: "Show fewer skills",
    zh: "收起技能列表",
  },
  "projects.pill": {
    en: "My Projects",
    zh: "项目作品",
  },
  "projects.heading": {
    en: "Check out my latest work",
    zh: "看看我最近的项目",
  },
  "projects.description": {
    en: "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    zh: "我做过不少项目：从轻量网站到复杂系统。这些是我最喜欢、也最具代表性的几个。",
  },
  "projects.cardAria": {
    en: "Open details for {title}",
    zh: "打开{title}的详细信息",
  },
  "projects.modal.close": {
    en: "Close",
    zh: "关闭",
  },
  "projects.modal.previous": {
    en: "Previous media",
    zh: "上一张",
  },
  "projects.modal.next": {
    en: "Next media",
    zh: "下一张",
  },
  "projects.modal.pagination": {
    en: "Go to media {index}",
    zh: "查看第{index}张",
  },
  "contact.pill": {
    en: "Contact",
    zh: "联系我",
  },
  "contact.heading": {
    en: "Get in Touch",
    zh: "保持联系",
  },
  "buttons.all": {
    en: "All",
    zh: "全部",
  },
  "buttons.showMore": {
    en: "Show more",
    zh: "展开更多",
  },
  "buttons.showLess": {
    en: "Show less",
    zh: "收起",
  },
  "footer.templateCredit": {
    en: "Template by {author} · Code MIT",
    zh: "模板来自 {author} · MIT 协议开源",
  },
  "footer.ownership": {
    en: "Modified & Content © {year} {name}",
    zh: "内容与改动 © {year} {name}",
  },
  "modeToggle.label": {
    en: "Theme",
    zh: "主题",
  },
  "languageToggle.label": {
    en: "Language",
    zh: "语言",
  },
  "languageToggle.aria": {
    en: "Switch site language (current: {language})",
    zh: "切换站点语言（当前：{language}）",
  },
  "timeline.present": {
    en: "Present",
    zh: "至今",
  },
} as const satisfies Record<
  string,
  Record<Language, string>
>;

export type CopyKey = keyof typeof COPY;

type ReplacementValues = Record<string, string | number>;

export const translate = (
  language: Language,
  key: CopyKey,
  replacements?: ReplacementValues
): string => {
  const entry = COPY[key];
  if (!entry) return "";

  const template = entry[language] ?? entry[DEFAULT_LANGUAGE] ?? "";
  if (!replacements) return template;

  return template.replace(/\{(\w+)\}/g, (_, token) => {
    const value = replacements[token];
    return value === undefined || value === null ? "" : String(value);
  });
};

export const getLanguageLabel = (
  language: Language,
  { native = false }: { native?: boolean } = {}
) => {
  const meta = LANGUAGE_METADATA[language];
  return native ? meta.nativeLabel : meta.label;
};
