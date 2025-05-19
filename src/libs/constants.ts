import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");
export const postsFilePath = path.join(dataDir, "posts.csv");
export const categoriesFilePath = path.join(dataDir, "categories.csv");
export const pagesFilePath = path.join(dataDir, "pages.csv");
export const siteFilePath = path.join(dataDir, "site.json");
