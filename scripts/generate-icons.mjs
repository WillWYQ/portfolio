// Generates the site icons from the same "YW" blue-tile monogram used in
// public/og.png, so tab icon / bookmark / share card read as one brand:
//   src/app/favicon.ico          (32px PNG wrapped in ICO)
//   src/app/apple-icon.png (180px, full-bleed square — iOS rounds it)
// Run: node scripts/generate-icons.mjs   (requires macOS `sips` for resizing)
import { ImageResponse } from "next/og.js";
import { writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import React from "react";

const h = React.createElement;
const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "../src/app");

async function renderTile({ size, radius }) {
  const img = new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3b82f6",
          borderRadius: radius,
          color: "white",
          fontSize: size * 0.44,
          fontWeight: 700,
        },
      },
      "YW",
    ),
    { width: size, height: size },
  );
  return Buffer.from(await img.arrayBuffer());
}

function sipsResize(input, output, px) {
  execFileSync("sips", ["-Z", String(px), input, "--out", output], { stdio: "ignore" });
}

// favicon: rounded tile (transparent corners), 32px, packed as PNG-in-ICO
const rounded512 = await renderTile({ size: 512, radius: 96 });
const tmpRounded = resolve(tmpdir(), "yw-icon-rounded-512.png");
const tmp32 = resolve(tmpdir(), "yw-icon-32.png");
writeFileSync(tmpRounded, rounded512);
sipsResize(tmpRounded, tmp32, 32);
const png32 = await import("node:fs").then((fs) => fs.readFileSync(tmp32));
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // data size
header.writeUInt32LE(22, 18); // data offset
writeFileSync(resolve(appDir, "favicon.ico"), Buffer.concat([header, png32]));

// apple-touch-icon: full-bleed square (iOS applies its own corner mask)
const square512 = await renderTile({ size: 512, radius: 0 });
const tmpSquare = resolve(tmpdir(), "yw-icon-square-512.png");
writeFileSync(tmpSquare, square512);
sipsResize(tmpSquare, resolve(appDir, "apple-icon.png"), 180);

console.log("wrote src/app/favicon.ico and src/app/apple-icon.png");
