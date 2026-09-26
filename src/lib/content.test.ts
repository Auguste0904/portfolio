import { describe, expect, it } from 'vitest';

import { projectSchema } from '../content.config';

const validProject = {
  title: 'Demo project',
  slug: 'demo-project',
  summary: 'An explicitly marked demonstration project.',
  context: 'Demo context only.',
  role: 'Demo role only.',
  contributions: ['Demo contribution only.'],
  technologies: ['TypeScript'],
  outcomes: ['Demo outcome only.'],
};

describe('project content schema', () => {
  it('accepts a valid project', () => {
    expect(projectSchema.safeParse(validProject).success).toBe(true);
  });

  it.each(['slug', 'technologies'] as const)('rejects a project without %s', (field) => {
    const project = { ...validProject };
    delete project[field];

    expect(projectSchema.safeParse(project).success).toBe(false);
  });
});
