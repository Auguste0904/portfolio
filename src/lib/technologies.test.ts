import { describe, expect, it } from 'vitest';

import { getTechnology, getTechnologyLogoPath } from './technologies';

describe('technology registry', () => {
  it('returns a base-path-prefixed provided image for Angular', () => {
    expect(getTechnologyLogoPath('angular', '/portfolio/')).toBe('/portfolio/images/technologies/Angular_gradient_logo.png');
  });

  it('returns undefined for an unregistered technology', () => {
    expect(getTechnology('unknown-tech')).toBeUndefined();
  });

  it('supports Bash as a text-only technology', () => {
    expect(getTechnology('bash')).toMatchObject({
      id: 'bash',
      label: { fr: 'Bash', en: 'Bash' },
    });
    expect(getTechnologyLogoPath('bash', '/portfolio/')).toBeUndefined();
  });

  it('registers Chrome Dev Tools with its provided logo', () => {
    expect(getTechnology('chrome-dev-tools')).toMatchObject({
      id: 'chrome-dev-tools',
      label: { fr: 'Chrome Dev Tools', en: 'Chrome Dev Tools' },
      logo: '/images/technologies/chrome-dev-tools.png',
    });
    expect(getTechnologyLogoPath('chrome-dev-tools', '/portfolio/')).toBe(
      '/portfolio/images/technologies/chrome-dev-tools.png',
    );
  });
});
