import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Documents exported from Builder6 (scripts/export-cms.mjs). Folder = blog
// (知识库) url; the original document url lives in `slug` because some
// contain "/" or "@" and were made filename-safe.
const resources = defineCollection({
  loader: glob({
    pattern: '[!_]*/*.md',
    base: './content/resources',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    blog: z.string(),
    status: z.enum(['published', 'hidden']).default('published'),
    cover: z.string().optional(),
    created: z.coerce.date(),
    modified: z.coerce.date(),
    b6_id: z.string(),
  }),
});

export const collections = { resources };
