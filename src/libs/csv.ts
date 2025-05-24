import fs from 'node:fs';
import path from "path";
import Papa from "papaparse";
import {createSlug} from "./global";
import type {PostType} from "../types/PostType";
import type {SiteType} from "../types/SiteType";
import {categoriesFilePath, postsFilePath, siteFilePath} from "./constants";
import type {CategoryType} from "../types/CategoryType.ts";

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

export function getPostBySlugAndCategorySlug(
    postSlug: string | undefined,
    categorySlug: string | undefined
): PostType | undefined {
  if (!postSlug || !categorySlug) return;

  const category = getItemBySlug<CategoryType>(categoriesFilePath, categorySlug);
  if (!category) return;

  const allPosts = getAllItems<PostType>(postsFilePath);
  return allPosts.find(
      (p) => (p.slug || createSlug(p.title)) === postSlug && p.category_id === category.id
  );
}

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
  categoryId: string | undefined
): PostType[] {
  const post = getAllItems<PostType>(postsFilePath);
  return post.filter((item) => item.category_id === categoryId);
}

// GET SITE INFO
export function getSiteInfo(): SiteType {
  const file = fs.readFileSync(path.resolve(siteFilePath), 'utf-8');
  return JSON.parse(file);
}