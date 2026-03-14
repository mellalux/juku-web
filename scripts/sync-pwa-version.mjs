import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const packageJsonPath = path.join(rootDir, "package.json");
const swTemplatePath = path.join(rootDir, "public", "sw.template.js");
const swOutputPath = path.join(rootDir, "public", "sw.js");
const versionOutputPath = path.join(rootDir, "public", "version.json");

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const version = packageJson.version;

if (!version) {
  throw new Error("package.json version is missing");
}

const template = await readFile(swTemplatePath, "utf8");
const serviceWorker = template.replaceAll("__APP_VERSION__", version);
await writeFile(swOutputPath, serviceWorker, "utf8");

const versionPayload = `${JSON.stringify({ version }, null, 2)}\n`;
await writeFile(versionOutputPath, versionPayload, "utf8");

console.log(`[sync-pwa-version] Prepared PWA assets for version ${version}`);
