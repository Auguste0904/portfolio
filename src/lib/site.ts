export interface ContactConfig {
  email: string;
  github: string;
  linkedin: string;
}

export const site: ContactConfig & { name: string } = {
  name: '[Portfolio demo - replace with owner name]',
  email: '[replace-with-contact-email@example.com]',
  github: '[replace-with-github-url]',
  linkedin: '[replace-with-linkedin-url]',
};

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@\[\]]+@[^\s@\[\]]+\.[^\s@\[\]]+$/.test(value);
}

export function getConfiguredContactLinks(contact: ContactConfig) {
  const links = [
    isValidEmail(contact.email) ? { label: 'Email', href: `mailto:${contact.email}` } : undefined,
    isValidHttpUrl(contact.linkedin) ? { label: 'LinkedIn', href: contact.linkedin } : undefined,
    isValidHttpUrl(contact.github) ? { label: 'GitHub', href: contact.github } : undefined,
  ];

  return links.filter((link): link is { label: string; href: string } => Boolean(link));
}
