#!/usr/bin/env node
/**
 * Runs after `BUILD_TARGET=android vite build`. TanStack Start's SPA mode writes
 * the app shell to dist/client/_shell.html; Capacitor loads dist/client/index.html,
 * so copy it across. Fails loudly (with a directory listing) if the build output
 * isn't what we expect, so a CI log tells us exactly what went wrong.
 */
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "dist", "client");
const shell = join(out, "_shell.html");
const index = join(out, "index.html");

if (!existsSync(out)) {
  console.error("[android] dist/client was not created — the Vite build failed or wrote elsewhere.");
  process.exit(1);
}

if (!existsSync(index)) {
  if (!existsSync(shell)) {
    console.error("[android] Neither index.html nor _shell.html found in dist/client. Contents:");
    console.error(readdirSync(out).join("\n"));
    process.exit(1);
  }
  copyFileSync(shell, index);
  console.log("[android] Copied _shell.html -> index.html");
}

console.log("[android] Web build ready in dist/client");
