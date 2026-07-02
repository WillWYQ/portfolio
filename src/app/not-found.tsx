"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 404 styled as a RISC-V kernel panic — on brand for a microkernel portfolio.
// Client component so stval can echo the actual missing path after hydration.
export default function NotFound() {
  const [path, setPath] = useState("0x0000000000000404");
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const line = "text-slate-400";
  const ts = "text-slate-600";

  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-2xl overflow-x-auto rounded-lg border border-slate-700/60 bg-[#0a0e14] p-5 font-share-tech-mono text-xs leading-relaxed shadow-[0_0_40px_rgba(99,102,241,0.15)] sm:text-sm">
        <p className="text-slate-500">OpenSBI v1.4 — fw_dynamic @ 0x80000000</p>
        <p className={line}>
          <span className={ts}>[    0.000000]</span> MorpheOS booting on hart 0
        </p>
        <p className={line}>
          <span className={ts}>[    0.000042]</span> route lookup: {path}
        </p>
        <p className="text-amber-400">
          <span className={ts}>[    0.000404]</span> Unhandled trap: load page fault
        </p>
        <p className={line}>
          <span className={ts}>[    0.000405]</span> sepc: 0x0000000000000404  scause: 0xd
        </p>
        <p className={line}>
          <span className={ts}>[    0.000406]</span> stval: {path}
        </p>
        <p className={line}>
          <span className={ts}>[    0.000407]</span> Call trace:
        </p>
        <p className={line}>
          <span className={ts}>[    0.000408]</span>   [&lt;ffffffff80404404&gt;] resolve_route+0x44/0x9c
        </p>
        <p className={line}>
          <span className={ts}>[    0.000409]</span>   [&lt;ffffffff80404448&gt;] vfs_lookup_page+0x1c/0x58
        </p>
        <p className="text-red-400">
          <span className={ts}>[    0.000410]</span> ---[ Kernel panic - not syncing: 404: page not
          found ]---
        </p>
        <p className={line}>
          <span className={ts}>[    0.000411]</span> hart 0 halted. recovery options:
        </p>
        <p className="mt-4 text-emerald-400">
          $ <Link href="/" className="underline decoration-dotted underline-offset-4 hover:text-emerald-300">cd / </Link>
          <span className="text-slate-500"># return to hart 0 (home)</span>
        </p>
        <p className="text-emerald-400">
          $ <Link href="/#projects" className="underline decoration-dotted underline-offset-4 hover:text-emerald-300">dmesg --projects </Link>
          <span className="text-slate-500"># see what actually works</span>
        </p>
        <p className="mt-2 text-emerald-400">
          $ <span className="cursor-blink inline-block h-4 w-2 translate-y-0.5 bg-emerald-400" />
        </p>
      </div>
    </main>
  );
}
