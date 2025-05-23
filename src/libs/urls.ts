import type {PostType} from "../types/PostType.ts";
import type {CategoryType} from "../types/CategoryType.ts";
import {getSiteInfo} from "./csv.ts";
import {createSlug} from "./global.ts";

export function createPostUrl(post: PostType | undefined, category: CategoryType | undefined): string {
    if (!post || !category) return "";
    const categorySlug = category.slug || createSlug(category.title)
    const postSlug = post.slug || createSlug(post.title)
    return `/${categorySlug}/${postSlug}`;
}

export function createCategoryUrl(category: CategoryType | undefined): string {
    if (!category) return "";
    const categorySlug = category.slug || createSlug(category.title)
    return `/${categorySlug}`;
}

export function createPageUrl(page: string | undefined): string {
    if (!page) return "";
    return `/${page}`;
}

export function formatContent(content: string | undefined): string {
    if (!content) return "";

    const withLineBreaks = content.replace(/<\/p>/gi, "\n\n");
    const plain = withLineBreaks.replace(/<[^>]*>/g, "").trim();

    return plain.substring(0, 230) + (plain.length > 230 ? "..." : "");
}

export function formatFullContent(content: string | undefined): string {
    if (!content) return "";

    // Insertar salto de línea entre etiquetas de párrafo consecutivas
    const withLineBreaks = content.replace(/<\/p>\s*<p>/gi, "</p><br/><p>");

    return withLineBreaks.trim();
}

