import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Centralized category map: Bulgarian frontmatter -> URL slug
export const CATEGORY_MAP: Record<string, string> = {
  "Десерти": "desserts",
  "Закуски": "breakfast",
  "Напитки": "drinks",
  "Кутия за обяд": "lunchbox",
  "Основни": "main-courses",
  "Разни": "others",
  "Предястия": "starters",
};

// Reverse map for lookup by URL slug: URL slug -> Bulgarian frontmatter
export const REVERSE_CATEGORY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([name, slug]) => [slug, name])
);

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      permalink: z.string(),
      categories: z.array(z.string()).optional(),
      pubDate: z.coerce.date(),
      heroImage: z.optional(image()),
      excerpt: z.string().optional(),
      servings: z.coerce.string().optional(),
      preparation_time: z.coerce.string().optional(),
      cooking_time: z.coerce.string().optional(),
      ingredients: z.array(z.string()).transform((blocks) =>
        blocks.flatMap((block) =>
          block
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
        )
      ).optional(),
      additional_ingredients: z.array(z.string()).transform((blocks) =>
        blocks.flatMap((block) =>
          block
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
        )
      ).optional(),
      additional: z.string().optional(),
    }),
});

export const collections = { blog };
