// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { readFile } from "fs/promises";

const site = await readFile("./src/data/site.json", "utf-8");
const { baseUrl } = JSON.parse(site);

export default defineConfig({
  site: baseUrl,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
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
});
