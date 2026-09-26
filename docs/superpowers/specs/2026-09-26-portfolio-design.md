# Portfolio Full-Stack - Specification de Conception

## Objectif

Creer un portfolio personnel bilingue francais/anglais qui presente un profil de developpeur full-stack aux PME, startups et ESN. Le site doit remplacer ou completer un CV classique par des preuves concretes : projets, choix techniques, experiences et parcours personnel pertinent.

Le site doit etre creatif et distinctif sans nuire a sa lisibilite, etre rapide sur mobile comme sur ordinateur, et etre heberge gratuitement sur GitHub Pages.

## Perimetre de la premiere version

Le site comprend :

- Une page d'accueil presentant le profil, une selection de projets, un apercu du parcours et des appels au contact.
- Une liste de quatre a six projets et une page detaillee par projet.
- Une page Parcours regroupant les experiences, la formation et les etapes personnelles professionnellement pertinentes.
- Une page CV lisible dans le navigateur avec un lien vers un PDF telechargeable.
- Une page A propos qui presente l'approche de travail et les forces du profil.
- Une page Contact proposant exclusivement email, LinkedIn et GitHub.
- Une version complete en francais et en anglais pour chaque page publique.
- Un deploiement automatise vers GitHub Pages a chaque push sur `main`.

Hors perimetre : formulaire de contact, base de donnees, CMS distant, authentification, analytique ou cookies de suivi, blog et recherche interne.

## Utilisateurs et proposition de valeur

Le public prioritaire est compose de recruteurs et responsables techniques de PME, startups et ESN. La lecture doit permettre de repondre rapidement a trois questions :

1. Quel est le profil et quels types de postes full-stack recherche-t-il ?
2. Qu'a-t-il concretement realise, avec quels compromis et quels resultats ?
3. Comment le contacter ou approfondir son profil technique ?

La valeur principale ne vient pas d'une liste de technologies : chaque projet expose un contexte, une contribution, des decisions techniques et un impact observable.

## Architecture technique

Le site est construit avec Astro et TypeScript, en sortie statique. Astro convient a un site editorial : le contenu est rendu au build et seul le JavaScript necessaire aux interactions ciblees est charge.

Le style repose sur CSS local et des composants Astro. Aucune bibliotheque d'interface ou framework client n'est requis pour la premiere version. Le JavaScript eventuel est limite au menu mobile et a la memorisation de la preference de langue.

Le contenu est gere dans des collections Astro typees, separe du rendu. Les collections couvrent au minimum :

- `projects` : une entree localisee par projet et par langue, avec slug partage, resume, contexte, role, contributions, technologies, resultats, liens et medias optionnels.
- `experience` : experiences, formation et etapes de parcours, avec dates, type, contenu localise et informations optionnelles.
- `pages` : contenus longs localises pour les pages A propos et CV.

Les donnees personnelles et professionnelles definitives ne sont pas inventees. Les fichiers initiaux utilisent des contenus de demonstration explicitement balises afin que leur remplacement soit simple et sans ambiguite.

## Navigation et internationalisation

Les routes francaises utilisent le prefixe `/fr/` et les routes anglaises `/en/`. L'accueil peut rediriger vers `/fr/` ou proposer un choix de langue accessible selon la strategie definie a l'implementation ; le francais est la langue par defaut.

Le selecteur de langue renvoie vers la page equivalente dans l'autre langue si elle existe. Il conserve la preference dans le navigateur, sans empecher la consultation directe d'une URL dans l'autre langue.

La navigation principale comporte : Projets, Parcours, CV, A propos et Contact. Elle est utilisable sans JavaScript. Sur petit ecran, un panneau de navigation accessible est propose, avec fermeture au clavier et focus visible.

## Pages et flux de contenu

### Accueil

L'accueil ouvre sur une proposition de valeur claire de developpeur full-stack et un appel a consulter les projets. Il inclut une selection de projets, un apercu de la timeline et des liens directs de contact.

### Projets

La page de liste affiche quatre a six projets dans une composition visuelle variee. Chaque carte indique le titre, le contexte, les technologies principales et un lien vers l'etude de cas.

Chaque page projet inclut :

- Le besoin ou probleme initial.
- Le contexte et le role tenu.
- La solution et les choix techniques importants.
- Les technologies employees, contextualisees plutot qu'affichees seules.
- Les resultats, limites ou apprentissages.
- Des liens vers GitHub et/ou une demonstration lorsqu'ils peuvent etre rendus publics.

L'absence d'image, de demonstration ou de depot public est geree explicitement dans la mise en page.

### Parcours, CV et A propos

La page Parcours est une timeline editoriale. Elle peut inclure des evenements personnels uniquement lorsqu'ils expliquent utilement une orientation, une competence ou une etape professionnelle. Elle ne doit pas devenir un journal intime.

La page CV offre une lecture structuree des competences, experiences et formations, plus un lien vers un PDF statique. Le PDF est un fichier fourni par le proprietaire du portfolio.

La page A propos donne du contexte sur l'approche de travail et la trajectoire, en complement du CV sans dupliquer son contenu.

### Contact

La page Contact comporte des liens directs `mailto:`, LinkedIn et GitHub. Aucun formulaire ni service tiers n'est employe.

## Direction visuelle et interactions

L'identite est editoriale, contemporaine et expressive : typographie de grand format, contrastes affirmes, grille asymetrique et details graphiques recurrents evoquant un carnet de parcours. Les choix restent subordonnes a la lisibilite et a la credibilite professionnelle.

Les animations servent la hierarchie de lecture : apparitions courtes et effets de survol non essentiels. Elles sont supprimees ou fortement reduites lorsque `prefers-reduced-motion: reduce` est actif. Aucune information ou action indispensable ne depend d'un survol, d'une animation ou de JavaScript.

La conception est mobile-first. Les mises en page gagnent en densite sur tablette et ordinateur sans compromettre une lecture verticale claire sur mobile.

## Accessibilite, performance et resilience

Le site respecte les principes d'accessibilite suivants :

- Structure HTML semantique avec un titre principal par page et une hierarchie de titres coherente.
- Navigation entiere au clavier, indicateur de focus visible et lien d'evitement vers le contenu principal.
- Contrastes suffisants et libelles explicites pour les liens et controles.
- Textes alternatifs utiles pour les images informatives ; images decoratives ignorees par les lecteurs d'ecran.
- Design adapte aux preferences de mouvement reduit.

La performance repose sur une sortie statique, peu de JavaScript, des polices auto-hebergees en nombre limite et des images optimisees et responsives. Les medias hors ecran sont charges de maniere differee. Le contenu essentiel et les liens de contact restent accessibles sans JavaScript.

Les liens externes sont identifies. Les erreurs de contenu previsibles, comme l'absence de lien de demonstration, sont representees dans les donnees et non masquees par des conditions fragiles dans les composants.

## Deploiement GitHub Pages

Un workflow GitHub Actions est declenche lors des pushes sur `main`, ainsi que manuellement. Il installe les dependances a partir du lockfile, construit le site Astro et publie l'artefact avec les actions GitHub Pages officielles.

La configuration Astro renseigne `site` et `base` pour que les assets et liens fonctionnent sous l'URL de projet GitHub Pages : `https://<utilisateur>.github.io/portfolio/`. Si le depot devient un depot utilisateur `<utilisateur>.github.io`, la valeur de `base` devra etre retiree ou adaptee.

Dans GitHub, la source Pages doit etre configuree sur `GitHub Actions`.

## Verification

Avant publication, l'implementation doit verifier :

- Le lint TypeScript et Astro.
- La construction de production avec les routes francaises et anglaises.
- Les liens internes generes, notamment avec le chemin de base GitHub Pages.
- La navigation au clavier, le menu mobile, le changement de langue et les liens de contact.
- Le rendu aux largeurs mobile et ordinateur.
- L'absence d'erreurs dans la console et l'execution reussie du workflow de deploiement.

Les composants portant une logique de rendu conditionnel ou de routage doivent avoir des tests automatises lorsque l'outillage retenu le permet. Les verifications d'accessibilite et responsive seront completees par une revue manuelle navigateur.

## Criteres d'acceptation

La premiere version est acceptable lorsque :

- Le site est accessible en francais et en anglais sous GitHub Pages.
- Les pages Accueil, Projets, detail de projet, Parcours, CV, A propos et Contact sont presentes dans les deux langues.
- Les projets sont editables sans modifier les composants de rendu.
- La navigation, les contenus principaux et les liens de contact fonctionnent sans JavaScript.
- Le rendu est lisible et agreable sur mobile et ordinateur.
- Le site respecte les exigences d'accessibilite et de mouvement reduit decrites dans cette specification.
- Un push sur `main` declenche une publication GitHub Pages reussie.
