import { getCollection, type CollectionEntry } from 'astro:content';

import type { Locale } from './i18n';

export async function getProjects(locale: Locale): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');

  return projects
    .filter((project) => project.id.startsWith(`${locale}/`))
    .sort((first, second) => {
      if (first.data.featured !== second.data.featured) {
        return Number(second.data.featured) - Number(first.data.featured);
      }

      return first.data.title.localeCompare(second.data.title);
    });
}

export async function getProject(locale: Locale, slug: string): Promise<CollectionEntry<'projects'> | undefined> {
  const projects = await getProjects(locale);

  return projects.find((project) => project.data.slug === slug);
}

export async function getProjectStaticPaths(): Promise<{ params: { locale: Locale; slug: string } }[]> {
  const paths = await Promise.all(
    (['fr', 'en'] as const).map(async (locale) => {
      const projects = await getProjects(locale);

      return projects.map((project) => ({ params: { locale, slug: project.data.slug } }));
    }),
  );

  return paths.flat();
}
