---
title: Gargantua / Onega
slug: gargantua-onega
summary: Two complementary applications connecting day-to-day stock management at catering sites with Convivio’s purchasing and supplier-negotiation workflows.
context: Developed at Orange Business for Convivio. Gargantua supports teams at individual sites; Onega supports purchasing, product and supplier references, and price negotiations.
role: Full-stack Developer.
contributions:
  - Developed ordering, pre-ordering, inventory, receiving, and transfer workflows in Gargantua.
  - Contributed to Onega tools for managing products, suppliers, catalogues, and price negotiations.
  - Connected pre-order workflows between Gargantua and Onega through their APIs.
technologies: [C#, ASP.NET Core, Angular, WPF, SQL Server]
primaryTechnologies: [dotnet, angular]
outcomes:
  - Site teams can track stock and orders while purchasing teams manage suppliers and negotiated prices.
  - Site-level pre-order requirements connect to the purchasing data managed in Onega.
featured: true
logos:
  - src: /images/projects/convivio.png
    alt: Convivio logo
---
## One procurement chain, two applications

In food service, purchasing decisions happen at several levels: site teams need to plan and track local requirements, while purchasing teams manage suppliers, catalogues, prices, and negotiations. Gargantua and Onega cover these two sides of the same process.

Gargantua provides stock management and day-to-day operational tools for Convivio’s catering sites. Onega helps purchasing teams negotiate prices, manage product and supplier references, compare offers, and prepare pre-orders.

## Business workflow

In Gargantua, site teams manage orders, pre-orders, inventory, deliveries, and transfers between sites. They can also handle returns and discrepancies related to invoices or deliveries.

In Onega, buyers organise products by category and price catalogue, manage suppliers, and conduct price negotiations. Iteration history helps them compare price changes and supplier proposals. Pre-orders can then specify products, the sites concerned, and volumes for each period.

The applications are connected through APIs: Gargantua retrieves pre-orders managed by Onega and presents them in the context of a site. This links purchasing decisions to operational needs without conflating the responsibilities of the two tools.

## Architecture and role

Gargantua is a web application built with Angular and TypeScript; Onega is a WPF desktop client. Their C# and ASP.NET Core backends expose business workflows and use SQL Server for data. Gargantua’s Onega API client handles the exchange around pre-orders.

As a full-stack developer, I contributed to the interfaces and services of both applications, as well as to the continuity between site requirements and purchasing workflows.

## Technical challenges and solutions

### Connecting site requirements to central purchasing

A pre-order created for a site needs to use purchasing information while remaining accessible in that site’s context. Instead of duplicating the workflow, Gargantua consumes Onega APIs to retrieve and update pre-orders, with site-specific filters and access checks.

### Keeping supplier negotiations traceable

Comparing offers takes more than displaying a current price: negotiations evolve over multiple iterations, involve several suppliers, and may need to be reviewed later. Onega retains price and history information by supplier and negotiation, and allows results to be filtered or exported to support comparisons.

### Adapting purchasing to different sites and periods

Planned volumes and consumption dates vary by site. Pre-orders therefore organise requirements by period and site; Gargantua displays them in each location’s operational context, while Onega remains the purchasing workflow’s management point.

## What I learned

A coherent business tool does not always need to be a single application. By separating site operations from purchasing management, then connecting them through focused API contracts, each team gets a workflow that fits its role without losing continuity of data.
