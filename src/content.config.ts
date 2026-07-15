import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
    // Preserve the pre-Content-Layer slugs (path minus extension, no slugification)
    // so existing /posts/<slug> URLs (e.g. css_position) don't change.
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
