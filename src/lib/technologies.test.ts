import { describe, expect, it } from 'vitest';

import { getTechnology, getTechnologyLogoPath } from './technologies';

describe('technology registry', () => {
  it('returns a base-path-prefixed local SVG for Angular', () => {
    expect(getTechnologyLogoPath('angular', '/portfolio/')).toBe('/portfolio/images/technologies/angular.svg');
  });

  it('returns undefined for an unregistered technology', () => {
    expect(getTechnology('unknown-tech')).toBeUndefined();
  });
});
