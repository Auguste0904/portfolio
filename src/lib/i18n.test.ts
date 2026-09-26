import { describe, expect, it } from 'vitest';

import {
  getAlternateLocale,
  getLocalizedPath,
  isLocale,
} from './i18n';

describe('i18n', () => {
  it.each([
    ['fr', true],
    ['en', true],
    ['de', false],
    ['', false],
  ])('isLocale(%j) returns %j', (value, expected) => {
    expect(isLocale(value)).toBe(expected);
  });

  it.each([
    ['fr', 'en'],
    ['en', 'fr'],
  ] as const)('returns %s as the alternate of %s', (locale, alternate) => {
    expect(getAlternateLocale(locale)).toBe(alternate);
  });

  it('creates a trailing-slash English project path', () => {
    expect(getLocalizedPath('en', 'projects')).toBe('/en/projects/');
  });
});
