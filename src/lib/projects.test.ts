import { describe, expect, it } from 'vitest';

import { getProject, getProjects, getProjectStaticPaths } from './projects';

describe('project content', () => {
  it('orders featured projects before the remaining projects', async () => {
    const projects = await getProjects('en');

    expect(projects.map((project) => project.data.slug)).toEqual(['atlas', 'signal', 'canvas', 'horizon']);
    expect(projects.filter((project) => project.data.featured).map((project) => project.data.slug)).toEqual(['atlas', 'signal']);
  });

  it('returns undefined for a slug absent from the requested locale', async () => {
    await expect(getProject('fr', 'missing-project')).resolves.toBeUndefined();
  });

  it('returns the project matching a locale and slug', async () => {
    const project = await getProject('fr', 'signal');

    expect(project?.id).toBe('fr/signal');
  });

  it('creates a static path for every project in both locales', async () => {
    await expect(getProjectStaticPaths()).resolves.toEqual([
      { params: { locale: 'fr', slug: 'atlas' } },
      { params: { locale: 'fr', slug: 'signal' } },
      { params: { locale: 'fr', slug: 'canvas' } },
      { params: { locale: 'fr', slug: 'horizon' } },
      { params: { locale: 'en', slug: 'atlas' } },
      { params: { locale: 'en', slug: 'signal' } },
      { params: { locale: 'en', slug: 'canvas' } },
      { params: { locale: 'en', slug: 'horizon' } },
    ]);
  });

  it('keeps the French and English project slug sets in parity', async () => {
    const [frenchProjects, englishProjects] = await Promise.all([getProjects('fr'), getProjects('en')]);

    expect(new Set(frenchProjects.map((project) => project.data.slug))).toEqual(
      new Set(englishProjects.map((project) => project.data.slug)),
    );
  });
});
