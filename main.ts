// Entry program for makefun-coin-launch-01 (Node 22, standard library only).
//
// The coin itself was launched on pump.fun by the agent; this program's only job
// is to hand the launch receipt to the grader. It reads LAUNCH.json from the
// repository root (the bot directory) and writes an identical copy into the
// output directory, where the gate reads it. It prints nothing on success.
//
// Outside the grader's container, the two directories are given by env vars:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'LAUNCH.json');
const TARGET = join(OUTPUT_DIR, 'LAUNCH.json');

try {
  const receipt = readFileSync(SOURCE, 'utf8');
  // Sanity-check the receipt before handing it on: it must be a JSON object
  // carrying the coin's mint and the create transaction's signature. If it is
  // not, fail loudly instead of delivering a broken file to the gate.
  const parsed: unknown = JSON.parse(receipt);
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).mint !== 'string' ||
    typeof (parsed as Record<string, unknown>).create_signature !== 'string'
  ) {
    throw new Error('LAUNCH.json is not a receipt with mint + create_signature');
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(TARGET, receipt);
} catch (err) {
  console.error(`Could not deliver LAUNCH.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
