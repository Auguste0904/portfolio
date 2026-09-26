import { describe, expect, it } from 'vitest';

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
