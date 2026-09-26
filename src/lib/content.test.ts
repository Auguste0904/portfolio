import { describe, expect, it } from 'vitest';

import { projectSchema } from '../content.config';

const validProject = {
  title: 'Project',
  slug: 'project',
  summary: 'Project summary.',
  context: 'Project context.',
  role: 'Project role.',
  contributions: ['Project contribution.'],
  technologies: ['TypeScript'],
  outcomes: ['Project outcome.'],
  primaryTechnologies: ['typescript'],
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

  it('rejects a project with no technologies', () => {
    expect(projectSchema.safeParse({ ...validProject, technologies: [] }).success).toBe(false);
  });

  it('rejects a project with no primary technologies', () => {
    expect(projectSchema.safeParse({ ...validProject, primaryTechnologies: [] }).success).toBe(false);
  });

  it('rejects an unregistered primary technology', () => {
    expect(projectSchema.safeParse({ ...validProject, primaryTechnologies: ['unknown'] }).success).toBe(false);
  });

  it('rejects a primary technology missing from technologies', () => {
    expect(projectSchema.safeParse({ ...validProject, primaryTechnologies: ['angular'] }).success).toBe(false);
  });
});
