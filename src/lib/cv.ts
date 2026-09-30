export const cvFilename = 'CV_2026-09-30_Auguste_ALEXANDRE.pdf';

export function getCvPath(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/documents/${cvFilename}`;
}
