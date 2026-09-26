import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { getTechnology, technologyIds } from './lib/technologies';

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  context: z.string(),
  role: z.string(),
  contributions: z.array(z.string()),
  technologies: z.array(z.string()).min(1),
  primaryTechnologies: z.array(z.enum(technologyIds)).min(1).max(4),
  outcomes: z.array(z.string()),
  featured: z.boolean().default(false),
  github: z.url().optional(),
  demo: z.url().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
}).superRefine(({ technologies, primaryTechnologies }, context) => {
  for (const technology of primaryTechnologies) {
    const registryTechnology = getTechnology(technology)?.label.en;
    if (!registryTechnology || !technologies.includes(registryTechnology)) {
      context.addIssue({
        code: 'custom',
        message: `Primary technology "${technology}" must be included in technologies.`,
        path: ['primaryTechnologies'],
      });
    }
  }
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: projectSchema,
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['experience', 'education', 'milestone']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { projects, experience, pages };
