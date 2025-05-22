import fs from 'node:fs';
import path from "path";
import Papa from "papaparse";
import { createSlug } from "./global";
import type { PostType } from "../types/PostType";
import type { SiteType } from "../types/SiteType";
import { siteFilePath } from "./constants";

// Requiere que T tenga al menos un campo 'slug' de tipo string
export type WithSlug = { title: string; slug: string; id?: string, publishedAt: Date };

// GET POSTS
// GET CATEGORIES
// GET PAGES
export function getAllItems<T extends WithSlug>(filePath: string): T[] {
  const file = fs.readFileSync(path.resolve(filePath), "utf-8");
  const { data } = Papa.parse<T>(file, {
    header: true,
    skipEmptyLines: true,
  });
 
  // Ordenar por fecha de publicación
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedData.map((item) => ({
    ...item,
    publishedAt: new Date(item.publishedAt),
  }));
}

// GET POST BY ID
// CATEGORY BY ID
// PAGE BY ID
export function getItemById<T extends WithSlug>(
  filePath: string,
  id: string | undefined
): T | undefined {
  const items = getAllItems<T>(filePath);
  return items.find((item) => item.id === id);
}

// GET POST BY SLUG
// CATEGORY BY SLUG
// PAGE BY SLUG
export function getItemBySlug<T extends WithSlug>(
  filePath: string,
  slug: string | undefined
): T | undefined {
  const items = getAllItems<T>(filePath);
  return items.find(
    (item) => item.slug === slug || createSlug(item.title) === slug
  );
}

// GET CATEGORIES BY POST ID
export function getItemsByCategoryId(
  filePath: string,
  categoryId: string | undefined
): PostType[] {
  const post = getAllItems<PostType>(filePath);
  return post.filter((item) => item.category_id === categoryId);
}

// GET SITE INFO
export function getSiteInfo(): SiteType {
  const file = fs.readFileSync(path.resolve(siteFilePath), 'utf-8');
  const data = JSON.parse(file);
  return data;
}