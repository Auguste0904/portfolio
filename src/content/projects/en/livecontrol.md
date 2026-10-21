---
title: LiveControl
slug: livecontrol
summary: An access-control and attendance platform designed for events welcoming large numbers of visitors.
context: Developed at Orange Business at the request of the Paris 2024 Olympic Organising Committee (COJO) to manage access to Olympic venues. The solution is now used by major stadiums in France.
role: Full-stack Developer.
contributions:
  - Full-stack development of tools for supervising events, access checks, and attendance.
  - Reviewing scan results and indicators by venue, session, and area.
  - Contributing to ticket-data integrations, alert processing, and live notifications.
technologies: [C#, ASP.NET Core, Angular, TypeScript, SQL Server, MongoDB, RabbitMQ, Redis, Keycloak, SignalR]
primaryTechnologies: [csharp, dotnet, angular]
outcomes:
  - Field teams and operators share a view of access checks and attendance levels.
  - The platform was first deployed for the Paris 2024 Olympic Games and is now used by major stadiums in France.
featured: true
logos:
  - src: /images/entreprises/orange-business.png
    alt: Orange Business logo
  - src: /images/projects/JO-2024.webp
    alt: Paris 2024 Olympic Games logo
---
## LiveControl at a glance

At a large event, teams need to control entry, understand visitor flows, and quickly spot situations that need attention. LiveControl brings this information together to give operators a shared view of real-time attendance, from individual ticket scans to venue-wide indicators.

The platform was developed to help the Paris 2024 Olympic Organising Committee manage access to event venues. It has since been adopted by major stadiums in France.

## Operational workflow

Administrators configure events, sessions, venues, and their control areas. Ticket and accreditation data is integrated into the application, while checks performed on site report their outcome: valid, refused, lost, or already scanned.

Operators then follow scan activity and attendance through views that match the venue’s organisation: by perimeter, access point, area, or ticket type. Alerts highlight configured thresholds and access-control events. Reports can also be generated to share or review results.

LiveControl provides two complementary views of attendance: physical attendance, based on observed entry and exit readings, and logical attendance, compared with expected and presented tickets. This distinction helps teams monitor both people flows and access status by area.

## Architecture and role

The Angular and TypeScript interface serves operators and administrators. A C# and ASP.NET Core API coordinates business workflows and exchanges with field equipment and partner systems. SQL Server and MongoDB support relational and document-oriented persistence needs.

Integration and processing tasks are distributed through RabbitMQ; Redis supports coordination between workers, Keycloak provides authentication, and SignalR delivers notifications. The application is also prepared for containerized deployment with Docker and Kubernetes.

As a full-stack developer, I contributed to operational workflows, monitoring features, and the reliability of communication between the interface, API, and integration services.

## Technical challenges and solutions

### Integrating ticket batches without splitting related updates

An import can contain a large number of tickets, sometimes with multiple records for the same ticket. Arbitrary batching could separate data that needs to be handled consistently. LiveControl groups records by ticket number before building batches, then moves them through an asynchronous workflow that tracks each batch’s state and results.

### Preventing concurrent processing and recovering from errors

In a distributed system, the same event or batch may be requested by multiple workers, and a technical failure can interrupt persistence. Distributed locks and batch-state checks prevent concurrent runs. RabbitMQ orchestrates the processing stages; persistence errors can trigger a bounded retry, while failures and outcomes remain logged.

### Distinguishing people flows from ticket counts

Reader counts alone do not describe attendance: observed entries and exits answer a different question from how many tickets are expected, scanned, or assigned to an area. LiveControl therefore keeps physical and logical attendance calculations separate and organises them around the venue and its access structure.

## What I learned

At a large event, a dashboard is only as useful as the consistency of the data behind it. Batch processing, explicit error tracking, and separate attendance models help turn individual scans into information that event teams can act on.
