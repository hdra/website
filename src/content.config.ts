// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blogs" }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
	})
});

export const collections = { blog };
