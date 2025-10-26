'use strict';

const fs = require('fs');
const path = require('path');

const SUPPORTED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.svg',
  '.bmp',
]);

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(projectRoot, 'src', 'generated');
const outputPath = path.join(outputDir, 'image-manifest.json');

function walk(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath, baseDir));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
      const relative = path.relative(baseDir, fullPath).split(path.sep).join('/');
      files.push(relative);
    }
  }

  return files;
}

function buildManifest(files) {
  const manifest = {};

  for (const file of files) {
    const dir = path.posix.dirname(file);
    if (dir === '.' || !dir) continue;

    const segments = dir.split('/');
    for (let i = 1; i <= segments.length; i += 1) {
      const key = segments.slice(0, i).join('/');
      if (!manifest[key]) {
        manifest[key] = [];
      }
      manifest[key].push(`/${file}`);
    }
  }

  for (const key of Object.keys(manifest)) {
    manifest[key].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    );
  }

  return manifest;
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.warn('[image-manifest] public directory not found, skipping manifest generation.');
    return;
  }

  const files = walk(publicDir, publicDir);
  const manifest = buildManifest(files);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`[image-manifest] Generated manifest with ${files.length} image(s).`);
}

main();
