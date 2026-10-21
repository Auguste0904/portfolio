---
title: LiveControl
slug: livecontrol
summary: Plateforme de contrôle d’accès et de suivi de l’affluence conçue pour les événements accueillant un grand nombre de visiteurs.
context: Projet développé chez Orange Business à la demande du Comité d’organisation des Jeux Olympiques 2024 (COJO) pour piloter l’accès aux sites olympiques. La solution est aujourd’hui utilisée par de grands stades en France.
role: Développeur full-stack.
contributions:
  - Développement full-stack d’outils de supervision des événements, des contrôles d’accès et de l’affluence.
  - Consultation des résultats de scan et des indicateurs par site, session et zone.
  - Contribution aux flux d’intégration des billets, au traitement des alertes et aux notifications en direct.
technologies: [C#, ASP.NET Core, Angular, TypeScript, SQL Server, MongoDB, RabbitMQ, Redis, Keycloak, SignalR]
primaryTechnologies: [csharp, dotnet, angular]
outcomes:
  - Les équipes terrain et les opérateurs disposent d’une vue partagée des contrôles et des niveaux de fréquentation.
  - La plateforme est issue du dispositif des Jeux Olympiques de Paris 2024 et est désormais utilisée par de grands stades en France.
featured: true
logos:
  - src: /images/entreprises/orange-business.png
    alt: Logo Orange Business
  - src: /images/projects/JO-2024.webp
    alt: Logo des Jeux Olympiques de Paris 2024
---
## LiveControl en bref

Lors d’un grand événement, les équipes doivent contrôler les entrées, comprendre les flux de visiteurs et repérer rapidement les situations qui demandent une intervention. LiveControl rassemble ces informations pour donner aux opérateurs une lecture commune de l’activité et de l’affluence en temps réel, depuis le scan d’un billet jusqu’aux indicateurs de fréquentation du site.

La plateforme a été développée pour accompagner le Comité d’organisation des Jeux Olympiques de Paris 2024 dans la gestion des accès aux sites. Elle a depuis été reprise par de grands stades en France.

## Parcours de l’exploitation

Les responsables configurent les événements, les sessions, les sites et leurs zones de contrôle. Les données de billets et d’accréditations sont intégrées à l’application, puis les contrôles réalisés sur le terrain remontent leur résultat : billet valide, refusé, perdu ou déjà scanné.

Les opérateurs suivent ensuite les lectures et l’affluence sur des vues adaptées à leur organisation : par périmètre, accès, zone ou type de support. Les alertes signalent notamment les seuils et événements de contrôle configurés. Des rapports peuvent aussi être produits pour partager ou analyser les résultats.

LiveControl distingue deux lectures complémentaires de la fréquentation : l’affluence physique, fondée sur les lectures d’entrées et de sorties, et l’affluence logique, rapprochée des titres attendus et présentés. Cette distinction permet de suivre à la fois les flux de personnes et l’état des accès par zone.

## Architecture et rôle

L’interface Angular et TypeScript s’adresse aux opérateurs et aux administrateurs. Une API C# et ASP.NET Core orchestre les fonctions métier et les échanges avec les équipements et systèmes partenaires. SQL Server et MongoDB répondent aux besoins de persistance relationnelle et documentaire.

Les tâches d’intégration et de traitement sont distribuées avec RabbitMQ ; Redis prend en charge la coordination entre traitements, Keycloak l’authentification et SignalR la diffusion des notifications. L’application est également préparée au déploiement conteneurisé avec Docker et Kubernetes.

En tant que développeur full-stack, j’ai contribué aux parcours d’exploitation, aux fonctionnalités de supervision et à la fiabilisation des échanges entre l’interface, l’API et les services d’intégration.

## Défis techniques et résolutions

### Intégrer des lots de billets sans désordonner les mises à jour

Un import peut contenir un grand nombre de titres, parfois plusieurs informations concernant un même billet. Un découpage arbitraire risquerait de traiter séparément des données qui doivent rester cohérentes. Le traitement regroupe donc les éléments associés à un même numéro de billet avant de constituer des lots, puis les fait progresser dans un workflow asynchrone avec un état et un bilan par lot.

### Éviter les traitements concurrents et reprendre après une erreur

Dans un système distribué, un même événement ou lot peut être sollicité par plusieurs traitements, et une erreur technique peut interrompre son enregistrement. Des verrous distribués et la vérification de l’état du lot évitent les exécutions concurrentes. Les étapes sont orchestrées par RabbitMQ ; les erreurs de persistance peuvent déclencher une reprise bornée, tandis que les échecs et résultats restent journalisés.

### Ne pas confondre passages et titres présentés

Un comptage de lecteurs ne décrit pas à lui seul la fréquentation : les entrées et sorties observées sur le terrain ne répondent pas à la même question que le nombre de billets attendus, scannés ou rattachés à une zone. LiveControl maintient donc des calculs d’affluence physique et logique distincts, organisés selon la structure des sites et des accès.

## Ce que j’en retiens

Sur un événement de grande ampleur, la valeur d’un tableau de bord dépend de la cohérence des données qui l’alimentent. Le traitement par lots, le suivi explicite des erreurs et la distinction entre plusieurs modèles de fréquentation permettent de transformer des scans dispersés en informations directement exploitables par les équipes.
