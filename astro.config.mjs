import { defineConfig } from "astro/config";
import minifyHtml from "astro-minify-html";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { readFileSync } from "fs";

const site = readFileSync("./src/data/site.json", "utf-8");
const { baseUrl } = JSON.parse(site);

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || baseUrl,
  output: "static",
  integrations: [
    minifyHtml({
      minifyOptions: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
      }
    }),
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: baseUrl + "/sitemap.xml",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
