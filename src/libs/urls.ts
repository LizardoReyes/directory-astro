import type {PostType} from "../types/PostType.ts";
import type {CategoryType} from "../types/CategoryType.ts";
import {getSiteInfo} from "./csv.ts";
import {createSlug} from "./global.ts";

const { baseUrl } = getSiteInfo();

export function createPostUrl(post: PostType | undefined, category: CategoryType | undefined): string {
    if (!post || !category) return "";
    const categorySlug = category.slug || createSlug(category.title)
    const postSlug = post.slug || createSlug(post.title)
    return `${baseUrl}/${categorySlug}/${postSlug}`;
}

export function createCategoryUrl(category: CategoryType | undefined): string {
    if (!category) return "";
    const categorySlug = category.slug || createSlug(category.title)
    return `${baseUrl}/${categorySlug}`;
}

export function createPageUrl(page: string | undefined): string {
    if (!page) return "";
    return `${baseUrl}/${page}`;
}