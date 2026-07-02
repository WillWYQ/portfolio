# 开发计划 (Roadmap)

> 2026-07 站点评审后的遗留优化项。快速项(404 页、深色默认、monogram 图标、
> reduced-motion、死链修复、文案重写、图片压缩等)已全部完成,见 git log
> `62d243f..79fe2d2`。本文档只记录 **中等投入** 和 **大招** 两档,按建议
> 实施顺序排列。
>
> 构建注意事项见 [README](./README.md#build-static-export-to-out):本地必须用
> Node 22.11(更新的 Node 会让 Next 14.2.4 构建死锁)。

---

## 一、中等投入(每项约一个下午)

### 1. 给"哑"卡片补视觉 ⭐ 性价比最高

项目网格里 VPN、Lime ISA、UsedExchange、Job Prediction、ParkSmart、
Personal Website 六张卡片没有任何图,在网格里是纯文字块。

- **VPN Tunnel**:画一张 WireChild 协议时序图(握手 → 虚拟 IP 分配 → 加密数据流
  → keepalive),风格参考现有的 `public/SocketChatProgram/Protocol.png`。
  存放 `public/VPN/`,在 `src/data/resume.tsx` 该项目加 `imageFolder: "VPN"`。
- **Lime ISA**:数据通路/控制器框图 → `public/LimeISA/`。
- **UsedExchange / Job Prediction**:直接截图,两个都有线上站
  (usedexchangeproject.willsleep.dev / jobprediction-project.willsleep.dev)。
- **Personal Website**:架构图(GitHub Pages + Azure VPS + Cloudflare Tunnel)。

**图片规范**(沿用 `0295548` 的经验):照片/截图用 JPEG q82,图表用 PNG,
最长边 ≤1600px;放进 `public/<项目>/` 后 image manifest 会在 build 时自动收录。

**验收**:项目网格滚一屏,每张卡片都有视觉锚点。

### 2. MorpheOS 启动日志动画

在 MorpheOS 项目弹窗(或卡片)里放一段打字机效果的仿 QEMU 串口输出——
对内核岗受众,这比任何粒子特效都对味。

- 简版:新组件 `src/components/boot-log.tsx`,逐行打出
  `OpenSBI v1.4 → MorpheOS booting on hart 0 → trap handler installed → ...`,
  文案风格可直接复用 404 页(`src/app/not-found.tsx`)。
  必须尊重 reduced-motion:开启时整段直接显示,不做打字机。
- 进阶:用 asciinema 录一段真实 QEMU 启动(需要私有 repo 权限,本人有),
  asciinema-player 的 JS/CSS 要 self-host 进 `public/`(静态托管,无 CDN 依赖)。

**验收**:打开 MorpheOS 弹窗能看到"活的"内核启动过程。

### 3. Hero 下方数字战绩条 (stat strip)

一行 `font-share-tech-mono` 等宽字体的量化数据,例如:
`RISC-V microkernel · ±0.5 K @ 77 K · 91% ML accuracy · 16-DPU sweeps`

- 数据加到 `src/data/resume.tsx`(如 `DATA.stats: string[]`),
  渲染在 `src/app/page.tsx` hero 区简历按钮下方。
- 用 BlurFade 包裹,delay 跟现有 hero 动画节奏递增。

**验收**:招聘者 5 秒扫描内能看到 3–4 个量化锚点。

### 4. ⌘K 命令面板

- 用 shadcn/ui 的 Command 组件(基于 cmdk,与现有 UI 栈一致)。
- 动作:跳转 sections(projects / work / contact)、下载三份简历、
  复制邮箱、GitHub/LinkedIn 外链、切换主题。
- 快捷键 ⌘K / Ctrl+K;dock(`src/components/navbar.tsx`)加一个入口图标
  保证可发现性,移动端点同一图标弹出面板。

**验收**:键盘不碰鼠标可以完成"看项目 → 下简历 → 发邮件"全流程。

---

## 二、大招(面试季前值得做)

### 5. 一篇技术长文 ⭐ 对目标受众价值最高

主题建议:**"用 GDB 从寄存器状态定位 RISC-V trap handler 误触发"**
(素材就是简历里那句 root-caused trap handler misfires / PLIC routing errors /
stack corruption——把它展开成 1500+ 字,带真实 GDB transcript 和代码块)。

基建全部现成,流程:
1. 写 `content/<slug>.mdx`(shiki 代码高亮已配好),删掉占位的
   `content/hello-world.mdx`。
2. 恢复 `src/config/nav.ts` 里注释掉的 Blog 入口。
3. 恢复 `src/app/sitemap.ts` 的 blog 路由(文件里留了注释说明怎么恢复)。

**验收**:文章上线、dock 出现 Blog 入口、分享卡片正常;
理想情况配合 MorpheOS 公开镜像/writeup 一起发。

### 6. 中文版 i18n:做完或删掉(二选一)

现状:`src/lib/i18n.ts` 的 COPY 字典、`language-provider.tsx`、
`language-toggle.tsx` 都写了一半但**没有挂载**;`resume.tsx` 里
`RESUME_DATA_MAP` 的 zh 映射的还是英文数据——目前是死代码。

- **投中文岗** → 做完:翻译 `DATA` 全量内容(工作量大头)、把 toggle 挂进
  navbar、加 hreflang/SEO 标记。
- **不投** → 删干净:`i18n.ts`、两个 language 组件、`RESUME_DATA_MAP`,
  `resume.tsx` 直接导出 `DATA`。

**验收**:不存在"点了没反应/一半中文一半英文"的状态。

### 7. 项目弹窗结构化改造

把 `longDescription` 大段散文拆成 design-doc 式结构:

- `resume.tsx` 项目类型加可选字段
  `{ context, decisions: string[], tradeoffs: string[], results: string[] }`;
- `src/components/project-modal.tsx` 按"背景 / 设计决策 / 权衡 / 结果"
  小标题分段渲染,保留 `longDescription` 作为老项目的 fallback;
- 优先给三个旗舰项目(MorpheOS、VPN、Cryo)写结构化内容,其余逐步迁移。

**验收**:工程师打开旗舰项目弹窗,读到的是决策与权衡,不是成就罗列。

---

## 三、承接自评审的站外待办(不动代码,但别忘了)

- [ ] 简历 PDF 化:`pnpm export:resume-pdfs`(需要 Word 授权),
      然后把 `heroResumeButtons` 的 filePath 换成 `.pdf`
- [ ] 修正三份简历 docx:同步"SHA3-256-derived keystream cipher"措辞、
      "Marker Lab" 笔误、70 K vs 77 K(与站点口径统一)
- [ ] 向教授申请 MorpheOS 公开镜像或允许发布 writeup(配合大招 5)
- [ ] 公开 VPN tunnel 代码仓库;调整 GitHub pinned repos
      (置顶 MorpheOS/VPN/CryoMeasureStudioMini,替换纯 Web 项目)
- [ ] GitHub Settings → Pages 勾选 **Enforce HTTPS**
- [ ] 安全岗背书:1–2 篇 picoCTF/HTB writeup(可作为博客第 2、3 篇)

---

*建议节奏:先做 1(补图)+ 3(战绩条)拉满视觉;2(启动动画)+ 4(⌘K)
提升把玩感;5(长文)在投递高峰前完成;6、7 视面试反馈决定优先级。*
