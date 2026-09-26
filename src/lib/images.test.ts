import { describe, expect, it } from 'vitest';

import { normalizePublicImagePath } from './images';

describe('normalizePublicImagePath', () => {
  it('prefixes a public image path with the deployment base', () => {
    expect(normalizePublicImagePath('/images/projects/atlas.webp', '/portfolio/')).toBe(
      '/portfolio/images/projects/atlas.webp',
    );
  });

  it('does not double-prefix an already base-prefixed path', () => {
    expect(normalizePublicImagePath('/portfolio/images/projects/atlas.webp', '/portfolio/')).toBe(
      '/portfolio/images/projects/atlas.webp',
    );
  });

  it('leaves HTTP(S) image URLs untouched', () => {
    expect(normalizePublicImagePath('https://images.example.com/atlas.webp', '/portfolio/')).toBe(
      'https://images.example.com/atlas.webp',
    );
  });
});
