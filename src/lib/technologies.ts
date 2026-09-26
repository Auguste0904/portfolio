import { normalizePublicImagePath } from './images';
import type { Locale } from './i18n';

export type TechnologyId = 'angular' | 'react' | 'typescript' | 'html' | 'css' | 'csharp' | 'dotnet' | 'python' | 'sql' | 'c' | 'cpp' | 'docker' | 'azure' | 'terraform' | 'kubernetes' | 'bash' | 'opencode' | 'context7' | 'playwright';

export type Technology = { id: TechnologyId; label: Record<Locale, string>; logo?: string };

const definitions: Technology[] = [
  ['angular', 'Angular'], ['react', 'React'], ['typescript', 'TypeScript'], ['html', 'HTML'], ['css', 'CSS'], ['csharp', 'C#'], ['dotnet', 'ASP.NET Core'], ['python', 'Python'], ['sql', 'SQL'], ['c', 'C'], ['cpp', 'C++'], ['docker', 'Docker'], ['azure', 'Azure'], ['terraform', 'Terraform'], ['kubernetes', 'Kubernetes'], ['bash', 'Bash'], ['opencode', 'OpenCode'], ['context7', 'Context7'], ['playwright', 'Playwright'],
].map(([id, label]) => ({ id: id as TechnologyId, label: { fr: label, en: label }, logo: id === 'bash' ? undefined : `/images/technologies/${id}.svg` }));

export const technologyIds = definitions.map((technology) => technology.id) as [TechnologyId, ...TechnologyId[]];

export function getTechnology(id: string): Technology | undefined { return definitions.find((technology) => technology.id === id); }

export function getTechnologyLogoPath(id: string, basePath: string): string | undefined {
  const logo = getTechnology(id)?.logo;
  return logo ? normalizePublicImagePath(logo, basePath) : undefined;
}
