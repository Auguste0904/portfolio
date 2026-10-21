---
title: Live Intelligence for Teams
slug: teams-meeting-minutes
summary: An application integrated with Microsoft Teams to find meetings, turn their transcripts into structured minutes, and ask questions about their content with AI.
context: A project developed at Orange Business around Live Intelligence, connecting Microsoft Teams, Microsoft Graph, and language-model services.
role: Full-stack Developer.
contributions:
  - Developed a workflow for reviewing meetings and generating minutes from their transcripts.
  - Integrated a conversational assistant for asking questions about meeting content.
  - Improved transcript retrieval and the resilience of Microsoft Graph calls.
technologies: [C#, ASP.NET Core, React, TypeScript, Microsoft Graph, PostgreSQL]
primaryTechnologies: [csharp, dotnet, react]
outcomes:
  - Users can review, edit, and share meeting minutes from their Microsoft 365 environment.
  - On-demand loading and recovery mechanisms avoid fetching large content unnecessarily and make the workflow more resilient.
featured: true
logos:
  - src: /images/projects/live-intelligence.png
    alt: Live Intelligence logo
---

## User journey

After signing in from Teams or a browser, users can browse recent meetings and select one to work with. The application retrieves its transcript when it is needed, then an AI service creates structured minutes — for example, key points, decisions, and follow-up actions.

Users can review and edit the minutes before sharing them with the Microsoft 365 tools they already use: Teams, Outlook, OneNote, or Planner. The integrated LLM chat can also answer questions based on the transcript, without requiring users to reread the entire meeting.

## Architecture and role

The React and TypeScript interface integrates with Teams and Microsoft authentication. The C# and ASP.NET Core backend coordinates Microsoft Graph calls to find meetings and transcripts, as well as requests to language services. Application data is managed with PostgreSQL.

My full-stack role involved this end-to-end workflow: the meeting interface, communication between the frontend and API, and improving the reliability of Microsoft Graph integrations.

## Technical challenges and solutions

### Keeping the meeting list lightweight

The meeting list does not need the full text of every transcript. Fetching all of them when the app opened added work even when users never opened a meeting. Transcripts are now retrieved on demand, when they are useful; transcript-availability checks are grouped where the API supports it, and reusable information is cached per user.

### Handling Microsoft Graph limitations

Support for some batched operations depends on the request context and tenant configuration. An error in one batch should not make every transcript appear unavailable, so the application uses batched requests when supported and automatically falls back to parallel requests when they are not.

### Distinguishing temporary failures from missing transcripts

A temporary retrieval failure does not mean a transcript is missing. To prevent an empty response from remaining in the cache and blocking access, only successfully retrieved transcripts are cached; a later request can retry after a transient error.

### Reconciling Windows and Linux time zones

Microsoft Graph can return Windows time-zone identifiers, while the application also runs in Linux containers that use different identifiers. Converting the identifiers before resolving them prevents time-zone errors while processing meetings.

## What I learned

A useful AI feature depends as much on the user journey and reliable access to data as it does on the model itself. On-demand loading, handling external errors, and providing fallbacks are essential to making the experience smooth and predictable.
