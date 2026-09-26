export interface ContactConfig {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export const site: ContactConfig & { name: string } = {
  name: 'Auguste ALEXANDRE',
  email: 'augustealexandre99@gmail.com',
  phone: '06 95 51 50 80',
  location: 'Rennes, France',
  github: 'https://github.com/Auguste0904',
  linkedin: 'https://www.linkedin.com/in/auguste-alexandre-b65b49182/',
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
  const phone = contact.phone.replace(/[\s.-]/g, '');
  const normalizedPhone = /^0[1-9]\d{8}$/.test(phone) ? `+33${phone.slice(1)}` : undefined;
  const links = [
    isValidEmail(contact.email) ? { label: 'Email', href: `mailto:${contact.email}` } : undefined,
    normalizedPhone ? { label: 'Phone', href: `tel:${normalizedPhone}` } : undefined,
    isValidHttpUrl(contact.linkedin) ? { label: 'LinkedIn', href: contact.linkedin } : undefined,
    isValidHttpUrl(contact.github) ? { label: 'GitHub', href: contact.github } : undefined,
  ];

  return links.filter((link): link is { label: string; href: string } => Boolean(link));
}
