---
title: Live Intelligence pour Teams
slug: teams-meeting-minutes
summary: Application intégrée à Microsoft Teams pour retrouver les réunions, transformer leurs transcriptions en comptes rendus structurés et interroger leur contenu avec l’IA.
context: Projet développé chez Orange Business autour de Live Intelligence, en reliant Microsoft Teams, Microsoft Graph et des services de modèles de langage.
role: Développeur full-stack.
contributions:
  - Développement d’un parcours de consultation des réunions et de génération de comptes rendus à partir de leurs transcriptions.
  - Intégration d’un assistant conversationnel pour poser des questions sur le contenu d’une réunion.
  - Amélioration de la récupération des transcriptions et de la résilience des appels à Microsoft Graph.
technologies: [C#, ASP.NET Core, React, TypeScript, Microsoft Graph, PostgreSQL]
primaryTechnologies: [csharp, dotnet, react]
outcomes:
  - Les utilisateurs peuvent consulter, relire et partager des comptes rendus depuis leur environnement Microsoft 365.
  - Le chargement différé et les mécanismes de reprise évitent de récupérer inutilement de gros contenus et rendent le parcours plus robuste.
featured: true
logos:
  - src: /images/projects/live-intelligence.png
    alt: Logo Live Intelligence
---

## Parcours utilisateur

Après s’être connecté depuis Teams ou un navigateur, l’utilisateur retrouve ses réunions récentes et choisit celle qu’il souhaite exploiter. L’application récupère sa transcription lorsque celle-ci devient nécessaire, puis un service d’IA produit un compte rendu organisé — par exemple autour des points essentiels, des décisions et des actions à suivre.

Le compte rendu peut être relu, modifié puis partagé avec les outils Microsoft 365 du quotidien : Teams, Outlook, OneNote ou Planner. Un assistant conversationnel — le chat LLM — permet également de poser des questions à partir des échanges transcrits, sans devoir relire toute la réunion.

## Architecture et rôle

L’interface React et TypeScript s’intègre à Teams et s’appuie sur l’authentification Microsoft. Le backend en C# et ASP.NET Core orchestre les appels à Microsoft Graph pour retrouver les réunions et leurs transcriptions, ainsi que les échanges avec les services de langage. Les données applicatives sont gérées avec PostgreSQL.

Mon rôle full-stack m’a amené à intervenir sur ce parcours de bout en bout : interface de consultation, échanges entre le frontend et l’API, et fiabilisation des interactions avec Microsoft Graph.

## Défis techniques et résolutions

### Réduire le travail au chargement de la liste

La liste des réunions n’a pas besoin du texte intégral de chaque transcription. Le récupérer dès l’ouverture de l’application alourdissait pourtant le parcours, même si l’utilisateur ne consultait aucune réunion. La transcription est maintenant chargée à la demande, lorsqu’elle est utile ; les vérifications d’existence sont regroupées lorsque l’API le permet, et les informations réutilisables sont mises en cache par utilisateur.

### Composer avec les limites de Microsoft Graph

La disponibilité de certaines opérations groupées dépend du contexte et de la configuration du tenant. Une réponse d’erreur sur un lot ne doit donc pas faire disparaître toutes les transcriptions : l’application utilise les appels groupés lorsqu’ils sont pris en charge et prévoit un repli automatique vers des appels parallèles lorsque ce n’est pas le cas.

### Ne pas confondre erreur temporaire et absence de transcription

Un échec ponctuel de récupération ne signifie pas qu’une transcription n’existe pas. Pour éviter qu’une réponse vide reste en cache et bloque l’accès, seules les transcriptions récupérées avec succès sont conservées en cache ; une nouvelle tentative reste possible après une erreur transitoire.

### Gérer les fuseaux horaires entre Windows et Linux

Microsoft Graph peut fournir des identifiants de fuseaux horaires Windows, alors que l’application s’exécute aussi dans des conteneurs Linux qui utilisent d’autres identifiants. La conversion de ces identifiants avant leur résolution évite une erreur de fuseau lors du traitement des réunions.

## Ce que j’en retiens

Une fonctionnalité d’IA utile dépend autant de la qualité du parcours et de l’accès fiable aux données que du modèle lui-même. Le chargement à la demande, la gestion des erreurs externes et les comportements de repli sont essentiels pour rendre l’expérience fluide et prévisible.
