import { describe, expect, it } from 'vitest';

import { getConfiguredContactLinks } from './site';

describe('configured contact links', () => {
  it('omits placeholder and malformed contact values', () => {
    expect(getConfiguredContactLinks({
      email: '[replace-with-contact-email@example.com]',
      phone: '[replace-with-phone-number]',
      location: '',
      github: '[replace-with-github-url]',
      linkedin: 'linkedin.example.com/profile',
    })).toEqual([]);
  });

  it('returns valid email and HTTP(S) contacts with usable hrefs', () => {
    expect(getConfiguredContactLinks({
      email: 'hello@example.com',
      phone: '06 95 51 50 80',
      location: 'Rennes, France',
      github: 'https://github.com/example',
      linkedin: 'http://linkedin.example.com/in/example',
    })).toEqual([
      { label: 'Email', href: 'mailto:hello@example.com' },
      { label: 'Phone', href: 'tel:+33695515080' },
      { label: 'LinkedIn', href: 'http://linkedin.example.com/in/example' },
      { label: 'GitHub', href: 'https://github.com/example' },
    ]);
  });
});
