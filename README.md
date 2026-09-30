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

Le CV fourni par le proprietaire est disponible au telechargement dans `public/documents/CV_2026-09-26_Auguste_ALEXANDRE.pdf`. Les boutons de l'accueil et de la page CV pointent vers ce fichier. Si le CV est mis a jour, remplacer le PDF et ajuster son nom dans `src/lib/cv.ts` ainsi que les tests qui verifient le telechargement.

## SEO et deploiement GitHub Pages

`PUBLIC_SITE_URL` permet de remplacer le domaine public utilise pour les liens canoniques. Par defaut, le site utilise `https://auguste0904.github.io`.

`BASE_PATH` configure le sous-chemin de deploiement. Il vaut `/portfolio/` par defaut pour GitHub Pages. Pour un depot ou une URL different(e), adaptez-le en conservant les barres initiale et finale :

```sh
PUBLIC_SITE_URL=https://example.github.io BASE_PATH=/nom-du-depot/ npm run build
```

Le workflow `.github/workflows/deploy.yml` construit le site Astro et publie le dossier genere lors d'un `push` sur `master` ou manuellement. Dans GitHub, ouvrez **Settings > Pages** et choisissez **GitHub Actions** comme source. Le site sera disponible a `https://auguste0904.github.io/portfolio/`. Si le nom du depot change, modifiez aussi `BASE_PATH` dans le workflow et la valeur par defaut dans `astro.config.mjs`. La page racine ne contient qu'une redirection vers `/fr/` et est intentionnellement `noindex`.
