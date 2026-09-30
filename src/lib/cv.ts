export const cvFilename = 'CV_2026-09-26_Auguste_ALEXANDRE.pdf';

export function getCvPath(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/documents/${cvFilename}`;
}
