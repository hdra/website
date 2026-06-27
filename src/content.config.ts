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
    pattern: "*/index.md",
    base: "./src/content/photography",
    generateId: ({ entry }) => entry.replace("/index.md", ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    // object-position for the listing preview crop. Keywords: top, bottom, left, right, center (combinable e.g. "top left").
    // Percentages: "50% 25%" (x y). Lengths: "0px 100px". Mixed: "50% 30px". Default: "50% 50%" (centered).
    coverPosition: z.string().optional(),
  }),
});

export const collections = { blog, projects, photography };

