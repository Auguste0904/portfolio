---
title: Gargantua / Onega
slug: gargantua-onega
summary: Deux applications complémentaires qui relient la gestion quotidienne des stocks sur les sites de restauration aux achats et négociations fournisseurs de Convivio.
context: Projets développés chez Orange Business pour Convivio. Gargantua accompagne les équipes des sites ; Onega outille les achats, les référentiels produits et fournisseurs, ainsi que les négociations tarifaires.
role: Développeur full-stack.
contributions:
  - Développement de fonctionnalités de commandes, précommandes, inventaires, réceptions et transferts dans Gargantua.
  - Contribution aux outils Onega de gestion des produits, fournisseurs, mercuriales et négociations tarifaires.
  - Mise en place de l’échange des précommandes entre Gargantua et Onega via leurs API.
technologies: [C#, ASP.NET Core, Angular, WPF, SQL Server]
primaryTechnologies: [dotnet, angular]
outcomes:
  - Les sites peuvent suivre leurs stocks et commandes tandis que les équipes achats pilotent les fournisseurs et les prix négociés.
  - Les besoins de précommande par site sont reliés aux données d’achat gérées dans Onega.
featured: true
logos:
  - src: /images/projects/convivio.png
    alt: Logo Convivio
---
## Une chaîne d’approvisionnement, deux outils

Dans la restauration collective, les achats se décident à plusieurs niveaux : les équipes d’un site doivent prévoir et suivre leurs besoins, tandis que les équipes achats gèrent les fournisseurs, les tarifs et les négociations. Gargantua et Onega couvrent ces deux côtés du même processus.

Gargantua fournit aux sites de Convivio les outils de gestion des stocks et des opérations quotidiennes. Onega aide les équipes achats à négocier les prix, administrer les référentiels de produits et de fournisseurs, comparer les propositions et préparer les précommandes.

## Parcours métier

Dans Gargantua, les équipes gèrent les commandes, les précommandes, les inventaires, les réceptions et les transferts entre sites. Elles peuvent aussi traiter les retours et les écarts associés aux factures ou aux livraisons.

Dans Onega, les acheteurs organisent les produits par catégories et mercuriales, suivent les fournisseurs et conduisent les négociations tarifaires. L’historique des itérations aide à comparer l’évolution des prix et les propositions reçues. Les précommandes peuvent ensuite préciser les produits, les sites concernés et les volumes par période.

Les deux applications sont reliées par des API : Gargantua consulte les précommandes gérées par Onega pour les afficher dans le contexte du site. Cela permet de rapprocher les décisions d’achat des besoins opérationnels sans confondre les responsabilités des deux outils.

## Architecture et rôle

Gargantua est une application web construite avec Angular et TypeScript ; Onega est un client de bureau WPF. Leurs backends C# et ASP.NET Core exposent les fonctionnalités métier, et s’appuient sur SQL Server pour les données. Le client API Onega utilisé par le backend Gargantua assure l’échange autour des précommandes.

En tant que développeur full-stack, j’ai contribué aux interfaces et aux services de ces deux applications, ainsi qu’à la continuité entre les besoins des sites et les processus d’achat.

## Défis techniques et solutions

### Relier les besoins des sites aux achats centralisés

Une précommande créée pour un site doit reprendre les informations d’achat tout en restant consultable dans le contexte de ce site. Plutôt que de dupliquer ce parcours, Gargantua consomme les API Onega pour récupérer et mettre à jour les précommandes, avec des filtres et des contrôles d’accès associés au site.

### Conserver une lecture fiable des négociations

Comparer des offres ne se résume pas à afficher un prix courant : les négociations évoluent par itérations, impliquent plusieurs fournisseurs et peuvent être réexaminées plus tard. Onega conserve des informations de prix et d’historique par fournisseur et par négociation, et permet de filtrer ou d’exporter les résultats pour faciliter leur comparaison.

### Adapter les achats à des sites et périodes différents

Les volumes prévus et les dates de consommation varient d’un site à l’autre. Les précommandes structurent donc les besoins par période et par site ; Gargantua les présente dans le contexte opérationnel de chaque établissement, tandis qu’Onega reste le point de gestion du processus d’achat.

## Ce que j’en retiens

La cohérence d’un outil métier ne vient pas nécessairement d’une application unique. En séparant clairement la gestion opérationnelle des sites et le pilotage des achats, puis en reliant les deux par des contrats d’API ciblés, chaque équipe dispose d’un parcours adapté sans perdre la continuité des données.
