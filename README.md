# Portfolio

Portfolio statique bilingue (francais/anglais) construit avec Astro et TypeScript strict. Le contenu du depot est volontairement fictif : aucune donnee personnelle reelle n'y est incluse.

## Installation et commandes

```sh
npm install
npm run dev
npm run check
npm run test
npm run test:e2e
npm run test:e2e:base-path
npm run build
```

`npm run dev` et les tests e2e standard definissent `BASE_PATH=/` afin de servir le site a la racine en local. La configuration de production emploie `/portfolio/` par defaut.

## Contenu et placeholders

Les contenus editables sont dans `src/content/` :

- `pages/{fr,en}/` contient les textes de presentation et de CV.
- `projects/{fr,en}/` contient les etudes de cas et leurs metadonnees.
- `experience/{fr,en}/` contient les entrees du parcours.

Chaque valeur `[DEMO]` est un exemple fictif a remplacer. Les liens `[replace-with-contact-email@example.com]`, `[replace-with-linkedin-url]` et `[replace-with-github-url]` sont des placeholders explicites : remplacez-les exclusivement avec les coordonnees approuvees par le proprietaire. Ajoutez les images de projets dans `public/images/projects/`, puis renseignez leurs chemins dans les frontmatters des projets avec un texte alternatif descriptif.

Le lien CV attend le vrai PDF a `public/documents/cv.pdf`. Ce fichier n'est volontairement pas fourni par le depot ; ajoutez uniquement le PDF approuve par le proprietaire avant publication.

## SEO et deploiement GitHub Pages

`PUBLIC_SITE_URL` configure le domaine public utilise pour les liens canoniques. Sa valeur par defaut, `https://portfolio.example.com`, est un placeholder non proprietaire qui doit etre remplace par l'URL finale du site.

`BASE_PATH` configure le sous-chemin de deploiement. Il vaut `/portfolio/` par defaut pour GitHub Pages. Pour un depot ou une URL different(e), adaptez-le en conservant les barres initiale et finale :

```sh
PUBLIC_SITE_URL=https://example.github.io BASE_PATH=/nom-du-depot/ npm run build
```

Le workflow `.github/workflows/deploy.yml` construit puis deploie le site lors d'un `push` sur `main` ou manuellement. Dans GitHub, ouvrez **Settings > Pages**, choisissez **GitHub Actions** comme source, puis definissez `PUBLIC_SITE_URL` comme variable de depot ou d'environnement avec l'URL publique reelle. Si le nom du depot n'est pas `portfolio`, modifiez aussi `BASE_PATH` dans le workflow.
