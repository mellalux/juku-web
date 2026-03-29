import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectPrecacheUrlsFromDir,
  injectPrecacheUrls
} from "./pwa-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const packageJsonPath = path.join(rootDir, "package.json");
const swTemplatePath = path.join(rootDir, "scripts", "sw.template.js");
const swOutputPath = path.join(distDir, "sw.js");

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const version = packageJson.version;

if (!version) {
  throw new Error("package.json version is missing");
}

const template = await readFile(swTemplatePath, "utf8");
const precacheUrls = await collectPrecacheUrlsFromDir(distDir, {
  exclude: ["sw.js"]
});
const buildId = createHash("sha1")
  .update(precacheUrls.join("|"))
  .digest("hex")
  .slice(0, 10);
const serviceWorker = injectPrecacheUrls(
  template
    .replaceAll("__APP_VERSION__", version)
    .replaceAll("__APP_BUILD_ID__", buildId),
  precacheUrls
);
await writeFile(swOutputPath, serviceWorker, "utf8");

console.log(`[finalize-pwa-build] Wrote dist/sw.js with ${precacheUrls.length} precache entries`);
