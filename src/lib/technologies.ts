import { normalizePublicImagePath } from './images';
import type { Locale } from './i18n';

export type TechnologyId = 'angular' | 'react' | 'typescript' | 'html' | 'css' | 'csharp' | 'dotnet' | 'python' | 'sql' | 'c' | 'cpp' | 'docker' | 'azure' | 'terraform' | 'kubernetes' | 'bash' | 'opencode' | 'context7' | 'playwright' | 'claude' | 'chatgpt' | 'qwen';

export type Technology = { id: TechnologyId; label: Record<Locale, string>; logo?: string };

const definitions: Technology[] = [
  ['angular', 'Angular', '/images/technologies/Angular_gradient_logo.png'],
  ['react', 'React', '/images/technologies/React-icon.svg.webp'],
  ['typescript', 'TypeScript', '/images/technologies/Typescript_logo_2020.svg.webp'],
  ['html', 'HTML', '/images/technologies/HTML5_logo_and_wordmark.svg.webp'],
  ['css', 'CSS', '/images/technologies/CSS.png'],
  ['csharp', 'C#', '/images/technologies/Logo_C_sharp.svg.webp'],
  ['dotnet', 'ASP.NET Core', '/images/technologies/NET_Core_Logo.svg.webp'],
  ['python', 'Python', '/images/technologies/Python-logo-notext.svg.webp'],
  ['sql', 'SQL', '/images/technologies/SQL.png'],
  ['c', 'C', '/images/technologies/C_Programming_Language.svg.webp'],
  ['cpp', 'C++', '/images/technologies/ISO_C++_Logo.svg.webp'],
  ['docker', 'Docker', '/images/technologies/docker.png'],
  ['azure', 'Azure', '/images/technologies/Microsoft-Azure.png'],
  ['terraform', 'Terraform', '/images/technologies/terraform.png'],
  ['kubernetes', 'Kubernetes', '/images/technologies/kubernetes.png'],
  ['bash', 'Bash'],
  ['claude', 'Claude', '/images/technologies/claude.webp'],
  ['chatgpt', 'ChatGPT', '/images/technologies/ChatGPT.webp'],
  ['qwen', 'Qwen', '/images/technologies/qwen.png'],
  ['opencode', 'OpenCode', '/images/technologies/opencode.webp'],
  ['context7', 'Context7', '/images/technologies/context7.png'],
  ['playwright', 'Playwright', '/images/technologies/playwright.svg'],
].map(([id, label, logo]) => ({ id: id as TechnologyId, label: { fr: label, en: label }, logo }));

export const technologyIds = definitions.map((technology) => technology.id) as [TechnologyId, ...TechnologyId[]];

export function getTechnology(id: string): Technology | undefined { return definitions.find((technology) => technology.id === id); }

export function getTechnologyLogoPath(id: string, basePath: string): string | undefined {
  const logo = getTechnology(id)?.logo;
  return logo ? normalizePublicImagePath(logo, basePath) : undefined;
}
