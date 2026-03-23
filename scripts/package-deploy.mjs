import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const packageJson = JSON.parse(await readFile(path.join(rootDir, "package.json"), "utf8"));
const version = packageJson.version;
const distDir = path.join(rootDir, "dist");
const releaseRoot = path.join(rootDir, "release");
const releaseDir = path.join(releaseRoot, `juku-web-v${version}`);

await rm(releaseDir, { recursive: true, force: true });
await mkdir(releaseDir, { recursive: true });
await cp(distDir, releaseDir, { recursive: true });

const deployNotes = {
  version,
  generatedAt: new Date().toISOString(),
  deployFiles: [
    "index.html",
    "manifest.webmanifest",
    "sw.js",
    "version.json",
    "app-icons/",
    "assets/"
  ],
  productionChecks: [
    "https://juku.mella.ee/manifest.webmanifest",
    "https://juku.mella.ee/sw.js",
    "https://juku.mella.ee/version.json",
    "https://juku.mella.ee/app-icons/icon-192.png",
    "https://juku.mella.ee/app-icons/icon-512.png"
  ]
};

await writeFile(
  path.join(releaseDir, "deploy-info.json"),
  `${JSON.stringify(deployNotes, null, 2)}\n`,
  "utf8"
);

console.log(`[deploy:package] Prepared ${releaseDir}`);
