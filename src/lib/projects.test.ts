import { describe, expect, it, vi } from 'vitest';

const projects = [
  ['fr', 'teams-meeting-minutes', 'Application Teams de comptes rendus', true],
  ['fr', 'gargantua-onega', 'Gargantua / Onega', true],
  ['fr', 'livecontrol', 'LiveControl', true],
  ['fr', 'mythesis', 'MyThesis', false],
  ['fr', 'opencell-operations', 'Operations OPENCELL', false],
  ['fr', 'cybille-commerce', 'Plateforme e-commerce Cybille', false],
  ['en', 'gargantua-onega', 'Gargantua / Onega', true],
  ['en', 'livecontrol', 'LiveControl', true],
  ['en', 'teams-meeting-minutes', 'Teams meeting-minutes application', true],
  ['en', 'cybille-commerce', 'Cybille e-commerce platform', false],
  ['en', 'mythesis', 'MyThesis', false],
  ['en', 'opencell-operations', 'OPENCELL operations', false],
].map(([locale, slug, title, featured]) => ({
  id: `${locale}/${slug}`,
  collection: 'projects',
  data: {
    title,
    slug,
    summary: 'Representative CV project.',
    context: 'Professional project.',
    role: 'Full-stack Developer.',
    contributions: ['Contributed to application development.'],
    technologies: ['ASP.NET Core'],
    primaryTechnologies: ['dotnet'],
    outcomes: ['Technical details are not published.'],
    featured,
  },
}));

vi.mock('astro:content', () => ({
  getCollection: async () => projects,
}));

import { getProject, getProjects, getProjectStaticPaths } from './projects';

describe('project queries', () => {
  it('orders featured projects before the remaining locale projects', async () => {
    const projects = await getProjects('en');

    expect(projects.map((entry) => entry.data.slug)).toEqual([
      'gargantua-onega',
      'livecontrol',
      'teams-meeting-minutes',
      'cybille-commerce',
      'mythesis',
      'opencell-operations',
    ]);
  });

  it('returns the project matching both the requested locale and slug', async () => {
    await expect(getProject('fr', 'teams-meeting-minutes')).resolves.toMatchObject({ id: 'fr/teams-meeting-minutes' });
  });

  it('returns static paths for every localized project', async () => {
    await expect(getProjectStaticPaths()).resolves.toEqual([
      { params: { locale: 'fr', slug: 'teams-meeting-minutes' } },
      { params: { locale: 'fr', slug: 'gargantua-onega' } },
      { params: { locale: 'fr', slug: 'livecontrol' } },
      { params: { locale: 'fr', slug: 'mythesis' } },
      { params: { locale: 'fr', slug: 'opencell-operations' } },
      { params: { locale: 'fr', slug: 'cybille-commerce' } },
      { params: { locale: 'en', slug: 'gargantua-onega' } },
      { params: { locale: 'en', slug: 'livecontrol' } },
      { params: { locale: 'en', slug: 'teams-meeting-minutes' } },
      { params: { locale: 'en', slug: 'cybille-commerce' } },
      { params: { locale: 'en', slug: 'mythesis' } },
      { params: { locale: 'en', slug: 'opencell-operations' } },
    ]);
  });

  it('keeps the French and English project slugs in parity', async () => {
    const [frenchProjects, englishProjects] = await Promise.all([getProjects('fr'), getProjects('en')]);

    expect(frenchProjects.map((entry) => entry.data.slug).sort()).toEqual(
      englishProjects.map((entry) => entry.data.slug).sort(),
    );
  });
});
