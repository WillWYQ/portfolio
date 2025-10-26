"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { CoolMode } from "@/components/magicui/cool-mode";
import { SpinningText } from "@/components/magicui/spinning-text";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { socials } from "@/config/site";
import Link from "next/link";
import Markdown from "react-markdown";
import { useEffect, useMemo, useRef, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

type HeroResumeButton = {
  label: string;
  filePath: string;
  downloadName?: string;
  ariaLabel?: string;
};

// —— 类型与工具函数 —— //
type RolesMap = Record<string, { label: string; skills: string[] }>;
type CategoriesMap = Record<string, string[]>;

function dedupe(arr: readonly string[] = []): string[] {
  return Array.from(new Set(arr));
}

// ==============================
//           Page
// ==============================
export default function Page() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const heroResumeButtons =
    ((DATA as unknown as { heroResumeButtons?: HeroResumeButton[] })
      .heroResumeButtons ?? []) as HeroResumeButton[];

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: DATA.name,
            url: DATA.url,
            description: DATA.description,
            sameAs: [
              socials.GitHub.url,
              socials.LinkedIn.url,
              socials.Website.url,
            ],
            author: {
              "@type": "Person",
              name: DATA.name,
              url: DATA.url,
            },
          }),
        }}
      />
      {/* HERO */}
      <section id="hero">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                Available for Work: Globally
              </div>
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-patrick"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap gap-3 pt-2">
                  {heroResumeButtons.map((button, index) => (
                    <a
                      key={`${button.label}-${index}`}
                      href={button.filePath}
                      download={button.downloadName ?? undefined}
                      aria-label={
                        button.ariaLabel ?? `Download ${button.label} resume`
                      }
                      className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                    >
                      {button.label}
                    </a>
                  ))}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <CoolMode>
                <SpinningText
                  text={DATA.avatarStatement}
                  radius={100}
                  speed={14}
                  className="fill-foreground text-foreground/70"
                >
                  <Avatar className="size-28 border">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </SpinningText>
              </CoolMode>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold font-share-tech-mono">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section id="work">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold font-share-tech-mono">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work: any, id: number) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold font-share-tech-mono">Education</h2>
          </BlurFade>
          {DATA.education.map((education: any, id: number) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
                description={
                  <>
                    {education.gpa && <p className="text-sm">GPA: {education.gpa}</p>}
                    {education.honors && <p className="text-sm">Honors: {education.honors}</p>}
                    {education.relatedCourses && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Related Courses:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                          {Object.entries(education.relatedCourses).map(([category, courses]) => (
                            <div key={category} className="text-xs">
                              <h4 className="font-medium text-foreground">{category}</h4>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {(courses as string[]).map((course, index) => (
                                  <li key={index} className="text-muted-foreground">
                                    {course}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                }
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* SKILLS —— 职位画像优先，折叠/滚动优化 —— */}
      <SkillsSection />

      {/* PROJECTS */}
      <section id="projects">
        <div className="mx-auto w-full max-w-5xl space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-share-tech-mono">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple websites to complex web
                  applications. Here are a few of my favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.projects.map((project: any, id: number) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 13 + id * 0.05}>
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  images={project.images}
                  imageFolder={project.imageFolder}
                  video={project.video}
                  links={project.links}
                  onClick={() => {
                    setSelectedProject(project);
                    setOpen(true);
                  }}
                />
              </BlurFade>
            ))}
          </div>
          <ProjectModal
            project={selectedProject}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="text-center mx-auto w-full max-w-4xl space-y-4 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm font-share-tech-mono">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link href={socials.Email.url} className="text-blue-500 hover:underline">
                  with a direct email
                </Link>{" "}
                and I&apos;ll respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>
          Template by{" "}
          <a
            href="https://github.com/dillionverma/portfolio"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-700"
          >
            Dillion Verma
          </a>{" "}
          · Code MIT
        </p>
        <p>Modified & Content © {new Date().getFullYear()} {DATA.name}</p>
      </footer>
    </main>
  );
}

// ==============================
//        Skills Section
// ==============================
function SkillsSection() {
  // 数据源与回退
  const roles = (DATA as any).roles as RolesMap | undefined;
  const categorized = (DATA as any).categorizedSkills as CategoriesMap | undefined;

  // —— 角色画像分支 —— //
  const [selectedRole, setSelectedRole] = useState<"all" | string>("all");
  const roleEntries = useMemo<[string, { label: string; skills: string[] }][]>(
    () => (roles ? Object.entries(roles) : []),
    [roles]
  );
  const roleVisibleSkills = useMemo<string[]>(() => {
    if (selectedRole === "all") return dedupe((DATA as any).skills as string[]);
    const list = roles?.[selectedRole]?.skills ?? [];
    return dedupe(list);
  }, [selectedRole, roles]);


  // —— 分类分支（回退） —— //
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categoryKeys = useMemo<string[]>(
    () => (categorized ? Object.keys(categorized) : []),
    [categorized]
  );
  const categoryVisibleSkills = useMemo<string[]>(() => {
    if (selectedCategory === "all") return dedupe((DATA as any).skills as string[]);
    const list = categorized?.[selectedCategory] ?? [];
    return dedupe(list);
  }, [selectedCategory, categorized]);

  // —— 三态渲染：Roles > categorized > all —— //
  if (roleEntries.length > 0) {
    return (
      <section id="skills">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold font-share-tech-mono">Skills</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a role to see the most relevant skills.
            </p>
          </BlurFade>

          {/* 角色按钮 */}
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRole("all")}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedRole === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                All
              </button>

              {roleEntries.map(([key, role]) => (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedRole === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  aria-label={role.label}
                  title={role.label}
                >
                  {(role as any).label ?? key}
                </button>
              ))}
            </div>
          </BlurFade>

          {/* 技能展示（折叠高度 + 溢出滚动 + 渐隐遮罩） */}
          <CollapsibleBadges skills={roleVisibleSkills} />
        </div>
      </section>
    );
  }

  if (categoryKeys.length > 0) {
    // 回退：按分类渲染（兼容旧数据）
    return (
      <section id="skills">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fallback to categories.
            </p>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                All
              </button>

              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategory === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  title={key}
                >
                  {key}
                </button>
              ))}
            </div>
          </BlurFade>

          <CollapsibleBadges skills={categoryVisibleSkills} />
        </div>
      </section>
    );
  }

  // 最后回退：仅展示全部 skills（同样折叠/滚动）
  const allSkills: string[] = dedupe((DATA as any).skills as string[]);
  return (
    <section id="skills">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Showing all skills (no roles or categories found).
          </p>
        </BlurFade>
        <CollapsibleBadges skills={allSkills} />
      </div>
    </section>
  );
}

// ==============================
//     Collapsible Badges
// ==============================
function CollapsibleBadges({ skills }: { skills: string[] }) {
  // 折叠/展开的高度设定（更“松弛”）
  const COLLAPSED_MAX_H_CLASS = "max-h-64 md:max-h-72";     // 折叠高度更宽松 ≈ 12–14 行
  const EXPANDED_MAX_H_CLASS = "max-h-[70vh]";             // 展开后限制到 70vh，避免撑满页面

  const [collapsed, setCollapsed] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  // 检测是否溢出
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const checkOverflow = () => {
      const overflow = el.scrollHeight > el.clientHeight + 4;
      setIsOverflowing(overflow);
      if (!overflow) setAtEnd(true);
      else setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    checkOverflow();
    const onResize = () => checkOverflow();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [skills, collapsed]);

  // 监听滚动，折叠时滚到底部隐藏遮罩
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={[
          // 容器样式：更舒展的间距/留白 + 圆角边框
          "flex flex-wrap gap-2 md:gap-2.5 overflow-auto rounded-lg border bg-muted/30 p-2 md:p-3",
          "transition-[max-height] duration-300",
          collapsed ? COLLAPSED_MAX_H_CLASS : EXPANDED_MAX_H_CLASS,
        ].join(" ")}
        aria-expanded={!collapsed}
      >
        {skills.map((skill, id) => (
          <BlurFade key={String(skill)} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
            <Badge className="px-2.5 py-1 text-xs md:text-sm">{String(skill)}</Badge>
          </BlurFade>
        ))}
      </div>

      {/* 渐隐遮罩：仅在“折叠 + 溢出 + 未滚到底部”时显示 */}
      {collapsed && isOverflowing && !atEnd && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background to-transparent rounded-b-lg" />
      )}

      {/* 展开/收起按钮：仅当溢出时显示 */}
      {isOverflowing && (
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="px-3 py-1.5 text-sm rounded-full transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label={collapsed ? "Show more skills (scroll supported)" : "Show fewer skills"}
          >
            {collapsed ? "Show more" : "Show less"}
          </button>
        </div>
      )}
    </div>
  );
}
