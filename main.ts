// news-image-20261120 — make.fun entry program (Node 22, standard library only).
//
// The entry image is drawn in code (poster.html, rendered once to entry.png
// with a headless browser) and committed next to this program. The program's
// only job is to place that exact image at /output/entry.png.
//
// Determinism: the program does no I/O besides reading the committed file
// and writing it out, so two runs always produce identical bytes. It uses
// no network at any point.
//
// Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const IMAGE = "entry.png";

// Create the output directory when it is missing, but never remove it:
// the grader mounts /output as a volume, and removing a mount point fails.
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, IMAGE), readFileSync(join(repoDir, IMAGE)));
