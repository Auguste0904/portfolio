export function normalizePublicImagePath(image: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const normalizedBase = `/${baseUrl.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
  const normalizedImage = image.replace(/^\/+/, '');

  if (normalizedBase !== '' && (image === normalizedBase || image.startsWith(`${normalizedBase}/`))) {
    return image;
  }

  return `${normalizedBase}/${normalizedImage}`;
}
