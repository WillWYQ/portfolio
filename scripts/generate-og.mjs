// Generates a static OpenGraph image at public/og.png.
// The site is exported statically (output: "export"), so a dynamic /og route
// handler is silently excluded from the build — link previews need a real file.
// Run: node scripts/generate-og.mjs  (re-run after changing name/headline below)
import { ImageResponse } from "next/og.js";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";

const h = React.createElement;

const NAME = "Yueqiao Wang";
const INITIALS = "YW";
const HEADLINE = "Systems & Embedded Software Engineer";
const SUBLINE =
  "RISC-V microkernel bring-up · VPN tunnel in C · cryogenic instrumentation firmware";
const URL_TEXT = "career.yueqiao.dev";

// A few fixed "stars" to echo the site's dark-mode star field.
const stars = [
  [80, 60], [220, 140], [420, 40], [640, 110], [880, 70], [1080, 150],
  [150, 480], [360, 560], [590, 520], [820, 580], [1020, 470], [1140, 540],
  [500, 300], [980, 300], [60, 300],
].map(([x, y], i) =>
  h("div", {
    key: i,
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: i % 3 === 0 ? 4 : 2,
      height: i % 3 === 0 ? 4 : 2,
      borderRadius: 9999,
      background: "white",
      opacity: i % 2 === 0 ? 0.5 : 0.25,
    },
  }),
);

const image = new ImageResponse(
  h(
    "div",
    {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 35%, #1f2937 100%)",
        color: "white",
        position: "relative",
      },
    },
    ...stars,
    h(
      "div",
      { style: { display: "flex", gap: 16, alignItems: "center" } },
      h(
        "div",
        {
          style: {
            width: 64,
            height: 64,
            borderRadius: 12,
            background: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
          },
        },
        INITIALS,
      ),
      h("div", { style: { fontSize: 30, opacity: 0.9 } }, NAME),
    ),
    h("div", { style: { height: 32 } }),
    h(
      "div",
      { style: { fontSize: 58, fontWeight: 800, lineHeight: 1.1 } },
      HEADLINE,
    ),
    h("div", { style: { height: 20 } }),
    h("div", { style: { fontSize: 26, opacity: 0.8 } }, SUBLINE),
    h("div", { style: { height: 36 } }),
    h("div", { style: { fontSize: 24, opacity: 0.7, color: "#93c5fd" } }, URL_TEXT),
  ),
  { width: 1200, height: 630 },
);

const buf = Buffer.from(await image.arrayBuffer());
const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public/og.png");
writeFileSync(out, buf);
console.log(`wrote ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
