// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/posts",
    generateId: (opts) => {
      const slug = slugger.slug(
        `${formatDate(opts.data.date as Date)}-${opts.data.title}`,
      );
      return slug;
    },
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .transform((tags) => {
        if (tags === undefined) return undefined;
        return Array.isArray(tags) ? tags : [tags];
      }),
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    link: z.string().url().optional(),
  }),
});

const photography = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/photography",
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = { blog, projects, photography };

