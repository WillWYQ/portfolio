"use client";

import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// 等价于 framer-motion 内部用的 rootMargin 模板类型
type RootMargin =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`;

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  // 放宽到完整 Variants，更通用
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  // inView=false：直接播放；true：进入视口再播放
  inView?: boolean;
  // ✅ 用我们自定义的 RootMargin，而不是 string
  inViewMargin?: RootMargin;
  blur?: string;
}

const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  // ✅ 四段写法最稳（top right bottom left）
  inViewMargin = "-50px 0px -50px 0px",
  blur = "6px",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant ?? defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;