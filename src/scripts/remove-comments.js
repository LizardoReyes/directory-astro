import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const distDir = "./dist";

async function removeHtmlComments(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      await removeHtmlComments(fullPath);
    } else if (file.name.endsWith(".html")) {
      let content = await readFile(fullPath, "utf-8");
      content = content.replace(/<!--[\s\S]*?-->/g, "");
      await writeFile(fullPath, content);
    }
  }
}

await removeHtmlComments(distDir);