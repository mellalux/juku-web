import { readdir } from "node:fs/promises";
import path from "node:path";

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

async function collectFilesRecursive(dirPath, prefix = "") {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = prefix ? path.join(prefix, entry.name) : entry.name;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFilesRecursive(fullPath, relativePath));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

export async function collectPrecacheUrlsFromDir(dirPath, { exclude = [] } = {}) {
  const excludeSet = new Set(exclude.map((item) => toPosixPath(item)));
  const urls = new Set(["/", "/index.html"]);
  const files = await collectFilesRecursive(dirPath);

  for (const file of files) {
    const normalized = toPosixPath(file);
    if (excludeSet.has(normalized)) continue;
    urls.add(`/${normalized}`);
  }

  return Array.from(urls).sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });
}

export function injectPrecacheUrls(template, urls) {
  return template.replace("__PRECACHE_URLS__", JSON.stringify(urls, null, 2));
}
