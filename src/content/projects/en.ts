import type { ProjectText } from "./types";

export const en: Record<string, ProjectText> = {
  skyforest: {
    title: "Skyport",
    tagline: "The operations platform that turns Skyforest's drone flights into finished map layers, end to end.",
    summary:
      "Skyforest, a Swedish forestry-tech company, needed drone photogrammetry to flow from the field to published layers without GIS specialists in the loop. I architected the platform and lead the Territorial team that builds and operates it: web app, API, and a distributed processing backend.",
    role: "Lead engineer and architect, Territorial team",
    highlights: [
      "Backend built entirely on n8n workflows and Ordo, the orchestration control plane I created for this project",
      "Photogrammetry runs on a fleet of Windows machines coordinated through MinIO-backed distributed locks with Agisoft process detection",
      "Next.js web app with MapLibre maps for customers, missions, work orders and offline-first data submission",
      "Every mission, customer and processed layer flows through the system with nobody touching a terminal",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Skyforest flies drones over forest estates and delivers orthomosaics, elevation models and derived layers to its customers. The bottleneck was never the flight: it was everything after it. Photo sets had to be moved by hand, processed in desktop software, checked, published to a map server and tracked in spreadsheets, and every step depended on someone who knew GIS.",
          "The goal was a platform where the operations team submits a flight and the finished layers show up, with every job visible and recoverable along the way.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "Skyport is three things: a web app where the team manages customers, missions and work orders and submits new photo sets; an API that owns the domain model and talks to storage; and a processing backend that does the heavy work. The web app is a Next.js application with MapLibre maps, deployed at the edge, with an offline-first submission flow so field data can be staged before a connection is available. A desktop toolkit covers the cases where submitting straight from the machine that holds the photos is faster.",
          "The backend is where most of the engineering went. There is no bespoke job server: every processing step is an n8n workflow, and Ordo sits above n8n as the control plane. Ordo validates every job against executor contracts before it runs, tracks jobs, steps and artifacts as first-class database state, and lets n8n workers claim steps safely. Photogrammetry itself runs in Agisoft Metashape on a fleet of Windows workers. Each worker holds MinIO-backed locks with a TTL, detects a running Agisoft process to avoid double-scheduling, and a reaper workflow renews or releases locks based on whether the owning n8n execution is still alive. Finished rasters are published to GeoServer and become layers the customer can open the next morning.",
        ],
      },
      {
        heading: "Why it mattered",
        body: [
          "Skyport is the project that made Ordo necessary. Pure workflow automation was fine for the individual steps but could not guarantee that a multi-step job would either finish or fail visibly, with its artifacts accounted for. Once that layer existed, the rest of the platform became boring in the best way: the team submits, the fleet processes, the map updates.",
          "Today Skyport runs Skyforest's production photogrammetry pipeline, and Sentinel watches every piece of it, from the n8n workers to GeoServer.",
        ],
      },
    ],
    captions: [
      "Dashboard grouping missions and work orders by customer",
      "Mission view with processed flight coverage on a MapLibre map",
      "Submission flow: select photos, import GPS positions, confirm",
    ],
  },

  "mapping-sdk": {
    title: "MapPrism",
    tagline: "A LiDAR and bathymetry processing platform that turns raw point clouds into web-ready 3D and 2D products automatically.",
    summary:
      "Built for UAI, a hydrographic and topographic survey company, MapPrism takes LAS/LAZ point clouds from multibeam sonar and LiDAR surveys and produces contours, hillshades, colorized DEMs, COPC/EPT tilesets and Potree scenes without anyone touching PDAL or GDAL by hand.",
    role: "Lead engineer and architect, Territorial team",
    highlights: [
      "Fifteen typed executors (reprojection, regridding, colorization, DSM/hillshade, contours, COPC/EPT/Potree, XYZ tiles) implemented as n8n workflows",
      "Eight preset pipelines registered as Ordo recipes, plus custom recipes validated against executor contracts",
      "Adaptive memory management splits huge surveys into power-of-four Entwine subsets and merges them back",
      "A documentation site (VitePress) written for the client's frontend developers and pipeline authors",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Underwater and topographic surveys produce very large point clouds in inconsistent coordinate systems, and each delivery needs the same family of products: a streamable cloud for the browser, a DEM and hillshade, contour lines, sometimes a colorized cloud draped with imagery. Doing that with scripts works until the volume grows and nobody remembers which parameters produced which file.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "The client's frontend submits a job to Ordo with a recipe and the input artifacts. Ordo validates the recipe (every step type must exist, every input and output slot must match its executor contract, every artifact reference must be namespaced and producible), stores the job and its step queue in PostgreSQL, and returns an id. n8n workers poll for pending steps, download the artifact from MinIO, run the tool (PDAL, GDAL, Entwine, PotreeConverter), upload the result and report back. An on_exit webhook fires when the job finishes, success or failure, with the dataset metadata attached.",
          "Recipes are deterministic DAGs: artifacts keep their names through the whole graph, parameters live on the job rather than the recipe, and the same recipe with the same inputs always yields the same products. Presets cover the common paths (dataset inspection, CRS assignment, reprojection, COPC, EPT, Potree, colored hillshade with XYZ tiles, contours as MBTiles and PMTiles) and custom recipes are validated before anything runs.",
        ],
      },
      {
        heading: "Details that took real work",
        body: [
          "Entwine loads an entire dataset into memory while indexing, so the EPT executor estimates point counts with PDAL, computes a safe subset count for the available RAM, rounds up to a power of four and builds and merges the subsets automatically. Reprojection detects invalid embedded CRS metadata and stamps the correct one without moving points. Contour generation outputs both MBTiles and PMTiles with major/minor classification so the web map can style them directly.",
          "The outputs feed a split-view viewer that pairs a Potree 3D scene with a synchronized 2D MapLibre map, which is what the screenshots show. MapPrism is the second production platform running on Ordo, after Skyport.",
        ],
      },
    ],
    captions: [
      "3D bathymetric point cloud next to a 2D map with contours, hillshade, backscatter and side-scan sonar layers",
      "Reservoir survey: colorized point cloud with measurements, synchronized with the 2D bathymetry layer",
      "MapPrism documentation site: API, recipes, executors and preset pipelines",
    ],
  },

  "weather-data-platform": {
    title: "Weather-Data Platform",
    tagline: "Lead engineer for Jane's Weather, an Australian weather-data platform now part of ACM: from building its weather map to running the whole platform with the Territorial team.",
    summary:
      "I joined Jane's Weather as its GIS developer and built the weather map runtime and the data pipelines behind it. When the platform became part of ACM, the engagement grew: today I lead the Territorial team responsible for development, maintenance, DevOps, monitoring and documentation across the entire system.",
    role: "Lead engineer, Territorial team",
    highlights: [
      "Built the weather map runtime (React, MapLibre, PMTiles) and its Argo data-processing workflows: forecast isobands, radar, satellite, warnings and basemaps",
      "Argo Workflows on Kubernetes ingest seven forecast models (GFS, ACCESS-G, GEM, three ECMWF variants, CAMS) plus radar, satellite and warnings feeds",
      "Cloudflare Workers, R2, KV and D1 serve tiles and forecast data at the edge, with Kubernetes APIs behind Kong as fallback",
      "63 synthetic tests in Sentinel verify freshness and health from outside the cluster; a Diátaxis-structured documentation site sourced from code, cluster inventories and a 130-page Confluence export",
    ],
    sections: [
      {
        heading: "The platform",
        body: [
          "Jane's Weather produces forecasts, radar and satellite imagery, and warnings for consumer apps and for clients such as ACM's FarmOnline Weather. Data production runs as Argo Workflows and Kubernetes CronJobs on an OVH cluster in Sydney: GRIB2 model runs are converted to Zarr, radar and Himawari imagery become PMTiles and tile pyramids every five minutes, Bureau of Meteorology warnings are ingested into PostGIS. Delivery is storage-first: frontends resolve versioned artifacts in Cloudflare R2 through Workers, and a data-provider Worker uses D1 and KV for catalog and auth before falling back to the Kubernetes APIs.",
        ],
      },
      {
        heading: "The map",
        body: [
          "My first responsibility was the map. I designed and built the weather map runtime that is now the canonical map experience for the platform and for embedders such as FarmOnline Weather: a React application on MapLibre with PMTiles for basemaps and weather layers, two modes (forecast, timeline-first and model-driven; now, radar-prioritised with satellite, observations and warnings), a shared time-enabled layer abstraction with preloading, and a URL-first embed contract so partner sites can drive mode, model, layers and viewport from query parameters.",
          "The map is only half of it. I also wrote the data-processing side that feeds it: the layer configuration model, the Python scripts that turn Zarr gridded forecasts into PMTiles isobands, and the Argo workflows that publish forecast, radar, Himawari, warnings and basemap artifacts to R2 on schedule, plus the headless capture tool that renders static forecast images for the main site.",
        ],
      },
      {
        heading: "Running the whole platform",
        body: [
          "After the platform moved to ACM and between clouds, the knowledge of how it fit together was spread across repositories, a stale Confluence space and people's heads. The Territorial team took on the whole platform, and I lead that work. We built the documentation program first: a VitePress site organised by system boundary, with every claim sourced from code or live configuration and every gap stated explicitly. That surfaced concrete risks (the development cluster serving production traffic, an ingestion cronjob whose deployed source was a different repository than everyone assumed, credentials with no rotation path) and turned them into tracked issues.",
          "Then monitoring. Argo exit handlers only told us when a pipeline said it failed; nothing verified that artifacts were actually fresh and reachable. We deployed Sentinel with a suite that now covers the edge Workers, the Kubernetes APIs, the BoM proxy, upstream model sources and all three frontends, using independently computed staleness thresholds derived from observed model arrival times rather than the platform's own flags. Day to day the team handles development and maintenance across the APIs and frontends, Kubernetes secrets and rollouts, incident investigation and postmortems (an ECMWF rate limit, a GEM URL migration, a Vercel spend spike, a NaN-corruption crash loop in the consumer API).",
        ],
      },
    ],
    flow: [
      { label: "Weather providers", sub: "NWP models, BoM radar & satellite, warnings" },
      { label: "Argo Workflows", sub: "Kubernetes · GRIB2 → Zarr · PMTiles" },
      { label: "Storage", sub: "Cloudflare R2 · Supabase · OVH S3" },
      { label: "Edge Workers", sub: "KV · D1 · R2-first delivery" },
      { label: "Weather map & clients", sub: "MapLibre runtime · Vercel apps · APIs" },
    ],
  },

  ordo: {
    title: "Ordo",
    tagline: "A contract-driven orchestration control plane for long-running processing jobs, built to sit above n8n.",
    summary:
      "Workflow engines like n8n execute steps well but do not give you a durable, validated model of a multi-step job. Ordo is that missing layer: it validates recipes, enforces input/output contracts between steps, and tracks every job, step and artifact as queryable state. Open source, and the backend of every heavy platform I build.",
    role: "Author and maintainer",
    highlights: [
      "Recipes are deterministic, artifact-based DAGs validated against executor contracts before anything runs",
      "Jobs, steps and artifacts are first-class PostgreSQL state with progress, per-step logs and lifecycle hooks",
      "Deliberately does not execute steps, manage workers or ship a UI: execution belongs to the engine underneath",
      "Runs in production for Skyport and MapPrism; released with semantic versioning, migrations and a Vitest suite",
    ],
    sections: [
      {
        heading: "Why it exists",
        body: [
          "I built Ordo while building Skyport. n8n was excellent at executing steps and integrating systems, but the pipeline kept needing guarantees n8n could not give: that a job's inputs were valid before the first step ran, that step outputs actually matched what the next step expected, that a failed job left a clear trail of what had and had not been produced. I wanted something that could sit above execution, stay simple, and still be strict.",
        ],
      },
      {
        heading: "The model",
        body: [
          "A recipe is a list of steps. Each step names an executor type, maps the executor's input slots to namespaced artifact references (job:<name> for job inputs, step:<id>.<slot> for step outputs) and maps its output slots to artifact names. Executors are rows in a step_executor table declaring what they accept and produce; recipe validation checks that every step type exists, every slot is bound exactly once, every referenced artifact is producible, and no artifact name is reused. Parameters are declared on recipes by key only and supplied per job, so parameter values never affect recipe identity.",
          "Jobs are created from a recipe plus concrete input artifacts, parameters and optional output declarations. Ordo inserts the step queue, exposes progress as a fraction across steps, surfaces the latest per-step log line, and runs an on_exit step after the main graph completes regardless of outcome. Per-step max_concurrency limits how many instances of an executor run at once across all jobs.",
        ],
      },
      {
        heading: "Boundaries and next steps",
        body: [
          "Ordo does not execute steps, manage infrastructure, provide an editor or move files. n8n workers claim steps straight from the database, run the tool, register artifacts and report status; a separate finalizer workflow delivers declared outputs to their final storage path. That direct database contract is pragmatic rather than fundamental, and the roadmap is to decouple it behind queues or APIs so that multiple execution backends can run side by side.",
          "The API is a small TypeScript/Express service on PostgreSQL with migrations applied at startup, released through semantic-release and shipped as a Docker image.",
        ],
      },
    ],
    flow: [
      { label: "Client", sub: "POST /jobs with recipe + artifacts" },
      { label: "Ordo", sub: "validate · store · track state" },
      { label: "n8n workers", sub: "claim step · run tool · register artifact" },
      { label: "Object storage", sub: "MinIO / S3 artifacts" },
      { label: "Finalizer", sub: "deliver outputs · on_exit hook" },
    ],
  },

  sentinel: {
    title: "Sentinel",
    tagline: "A programmable synthetic-monitoring platform: tests as JavaScript, alerts on state change, public status pages, on a 1 GB VPS.",
    summary:
      "Existing uptime monitors either ping URLs from YAML or grow into heavy dashboards. Sentinel runs real JavaScript test functions on a schedule, validates business logic, and alerts through Discord, Slack or webhooks. It watches every platform I run, plus IBGE's national GNSS network.",
    role: "Author and maintainer",
    highlights: [
      "Tests are plain JavaScript with a small ctx API: HTTP, FTP, S3 (hand-rolled SigV4), secrets, assertions and warnings",
      "Three-tier outcomes (pass, warn, fail), failure thresholds, cooldowns and per-event-type channel routing",
      "Public status pages per tag, Prometheus metrics, encrypted secret store and a full MCP server for AI agents",
      "Designed for 1 GB RAM and half a vCPU: batched writes, partitioned tables, pre-aggregated daily stats",
    ],
    sections: [
      {
        heading: "Why another monitor",
        body: [
          "I needed to know a client's pipeline had gone stale before the client did. A 200 response from an API says nothing about whether the forecast behind it is six hours old, or whether a GeoServer layer still has data. Config-driven monitors could not express that; dashboard-first tools could not run hundreds of checks on a small box. Sentinel is the tool I wanted: a test is a function that receives a context and returns true or false, and the platform handles scheduling, retries, alerting and history.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The whole design is driven by one deployment target: a 1 GB, half-vCPU VPS running around 500 tests a minute. A single Fastify process on Node.js schedules tests with jittered intervals, compiles user code once on save, races each run against its timeout, and caps concurrency with a small slot pool. Results are buffered and flushed to PostgreSQL in batches into month-partitioned tables; a daily aggregate table feeds the public status pages so they never touch raw runs. Outbound HTTP goes through Undici with per-host connection pooling. Secrets are AES-256-GCM encrypted at rest and exposed to tests as a synchronous in-memory object.",
          "Notifications are event-driven and fire-and-forget: a test flips to fail only after N consecutive failures, warnings fire on first occurrence with a cooldown, recovery is its own event, and each channel assignment filters which event types it receives. The dashboard is a Next.js app that can be deployed on Cloudflare Pages with only the API and database on the VPS. An MCP server wraps the REST routes in-process, so an AI coding agent can create, run and inspect tests through the same validation and auth.",
        ],
      },
      {
        heading: "In production: the RBMC network",
        body: [
          "The most demanding public deployment monitors RBMC, the Brazilian Network for Continuous Monitoring of GNSS Systems operated by IBGE. RBMC is a network of roughly 150 permanent GNSS stations across Brazil that stream and publish continuous satellite observations. It is the physical realisation of SIRGAS2000, the national geodetic reference frame, and the backbone for precise positioning in the country: post-processed surveys, real-time corrections, rural cadastre georeferencing, engineering monitoring and scientific work all depend on its data being available and current.",
          "The RBMC status page tracks each station individually with 24-hour history, so a surveyor can check whether the station nearest a job site is publishing before heading out. Sentinel also watches the Jane's Weather platform with 63 tests, and every service behind Skyport and MapPrism.",
        ],
      },
    ],
    captions: [
      "Status grid across every environment Sentinel watches, filtered by tag",
      "Test list with outcome, last run, average response time and a 24-hour history sparkline",
      "State-change alerts in Discord: failure with reason and consecutive count, then recovery with downtime",
    ],
  },

  "territorial-invoices": {
    title: "Territorial Invoices",
    tagline: "The system that runs Territorial's billing: calendar-based time tracking, contracts with deterministic billing math, and invoices generated in minutes.",
    summary:
      "Territorial bills several clients against different contract types every month. This internal platform tracks time on a drag-to-create calendar, rolls hours up against contracts and milestones, and generates a full batch of invoices with PDFs. Billing that took an afternoon now takes under fifteen minutes.",
    role: "Author; internal product at Territorial",
    highlights: [
      "Time is logged on a calendar the way you create Google Calendar events: drag, resize, move",
      "Three contract types with pure, testable billing math: hourly, hourly with a base retainer, and hourly with rollover credit",
      "Draft invoices are live projections; issued invoices are immutable snapshots with frozen FX rates and A4 PDFs",
      "An MCP server lets Territorial Assistant register time entries automatically from my own activity",
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Consulting billing is simple until it is not: one client on plain hourly, another on a retainer with overtime, a third on a base that rolls unused hours forward, all in different currencies, all needing a document that looks final. I wanted the whole month to close in minutes and the numbers to be reproducible.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Clients, contracts, projects and milestones form the model; time entries attach to a project and milestone and inherit the contract's rate. The calendar is the fast path for logging, with client, project and milestone filters and project-based colouring. When a period closes, the system computes each contract's billable hours: plain hourly bills what was worked; hourly-with-base bills the floor plus overtime at its own rate; hourly-with-rollover bills the base, defers overage to a one-cycle buffer, and uses carried-in credit to cover shortfalls before expiring it. Every rule is a pure function with worked examples in the docs and tests.",
          "Invoices start as drafts projected live from time entries and become immutable when issued, with lines, totals and the FX rate frozen. PDFs are rendered with Playwright from the same HTML the web app shows, in English or Portuguese, with structured issuer and client addresses and per-currency payment instructions. A dashboard gives hours, revenue, per-client distribution and alerts for orphan entries and base-hours risk.",
        ],
      },
      {
        heading: "Automation and fiscal integration",
        body: [
          "Over time I got lazy about logging, so Territorial Assistant now proposes time entries from git history, Claude Code transcripts and window activity and registers them here through a personal-access-token MCP endpoint, with the same role model as the web app. Fiscal integration with Brazil's NF-e system is in progress: today the platform prepares everything the fiscal system asks for so that issuing the nota is a copy-and-paste task instead of a reconstruction.",
          "The stack is a pnpm monorepo with a Fastify API (Zod validation, Prisma, PostgreSQL) and a Next.js App Router frontend that keeps all business logic on the server.",
        ],
      },
    ],
    captions: [
      "Dashboard: hours, revenue, daily distribution by client and alerts",
      "Calendar time tracking with drag-to-create entries, filtered by client, project and milestone",
    ],
  },

  "territorial-assistant": {
    title: "Territorial Assistant",
    tagline: "A Discord-based daemon that turns my own work activity into approved timesheets and a curated knowledge base of engineering stories.",
    summary:
      "Reconstructing billable time from memory and finding time to write about the work were both chores I kept postponing. This single-process assistant reads ActivityWatch, git, GitHub and Claude Code transcripts, proposes daily timesheets in Discord, and mines the same evidence for stories worth publishing.",
    role: "Author; personal tooling",
    highlights: [
      "One TypeScript process, one Postgres database, one Discord bot; no web UI to maintain",
      "Claude is used for judgement only, never bookkeeping: rules and caches answer first, and calls are gated on spare subscription budget",
      "The timesheet assistant proposes entries per client, learns mapping rules from plain-English corrections, and registers approved days in Territorial Invoices",
      "The marketing assistant extracts and scores stories weekly and drafts posts; confidential client information is excluded by design",
    ],
    sections: [
      {
        heading: "How the timesheet assistant works",
        body: [
          "Every fifteen minutes the daemon ingests window and browser events from ActivityWatch, compacts them into activity blocks and resolves as many as it can with learned rules: this repository is that client, this URL host is that project. Only the ambiguous remainder goes to Claude. Blocks become raw intervals per client, intervals are merged into cognitive sessions with a 15-minute margin and a 45-minute gap tolerance, and each session is enriched with what was actually done using commits and transcripts from that window.",
          "The result is a proposal in a Discord thread, one per day. I answer in plain English (\"S2 is ACM, Maintenance & DevOps milestone\"), the bot revises, learns the rule, and on approval registers one time entry per session and project through the Invoices MCP endpoint. Incomplete days are refused rather than half-registered.",
        ],
      },
      {
        heading: "The marketing assistant",
        body: [
          "The second module treats expertise as the product. It gathers the week's git history, pull requests and transcripts, extracts what happened and what the lesson was, then scores each item as an angle a GIS manager or CTO would care about even without knowing the project. Monday brings a digest of candidates in Discord; I pick and assign each to a blog, the assistant drafts in a thread, opens a pull request against the site on approval, and prepares LinkedIn posts once the article is live. The knowledge base persists between weeks, so low-scoring items can be revived later.",
        ],
      },
      {
        heading: "Design constraints",
        body: [
          "Stages communicate only through the database so any of them can be re-run. Claude is invoked through the local CLI with structured output schemas, no tools and no session persistence, so assistant-generated calls never contaminate the transcripts the assistant later reads. A gate reads the subscription usage endpoint and drains a priority queue only when budget would otherwise go unused: interactive replies first, timesheets second, marketing last.",
        ],
      },
    ],
    captions: [
      "Daily proposal in Discord: sessions per client, unmatched work flagged, plain-English correction",
      "Weekly story digest from the marketing assistant with per-story threads",
    ],
  },

  finances: {
    title: "Finances",
    tagline: "A personal ledger and budgeting app with a Postgres-first architecture: one PostgREST instance, a static frontend, nothing else.",
    summary:
      "After five years as a heavy user of commercial finance apps that kept changing their own structure, I wrote down the requirements I actually had and built the tool myself. It runs on the smallest server I own and doubles as a playground for how thin a backend can get.",
    role: "Author; personal tooling",
    highlights: [
      "PostgreSQL is the backend: PostgREST exposes the schema, auth is a Postgres RPC with hashed tokens and role-based permissions",
      "The React/Vite frontend is static and deploys anywhere (Vercel, Cloudflare, a free-tier VM)",
      "Multi-account ledger, running balances, asset-breakdown history, and yearly budgets with monthly execution tracking",
      "An MCP server exposes the ledger to AI tooling for classification and analysis",
    ],
    sections: [
      {
        heading: "Why I built it",
        body: [
          "Every finance app I used eventually redesigned its data model out from under me: categories merged, budgets became something else, exports stopped matching. I did not want features; I wanted to log transactions the same way for a decade. Having used these tools daily for years, the requirements were unusually clear, so building was cheaper than adapting again.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The design goal was deployability. A single PostgREST process in front of PostgreSQL is the entire backend: tables, views and functions define the API, database roles enforce permissions, and login is a stored procedure that validates a hashed token and mints a JWT. There is no application server to patch or scale. The frontend is a React, Vite, TypeScript and Tailwind app that builds to static files, so it can live on Vercel or Cloudflare while the database sits on a small Oracle free-tier instance. Docker Compose brings the whole thing up locally with no configuration.",
          "Functionally it covers accounts organised by type, a ledger with per-day running totals and export, an asset-breakdown history chart, and budgets planned yearly and executed monthly with minimum, maximum and remaining per category. The MCP server lets an assistant read balances and post transactions directly.",
        ],
      },
    ],
    captions: [
      "Dashboard with account groups, net worth and asset-breakdown history",
      "Ledger with daily running totals, categories and accounts",
      "Accounts overview grouped by type",
      "Budget execution against the yearly plan",
    ],
  },

  "ai-geospatial-query": {
    title: "Natural-Language Geospatial Query Platform",
    tagline: "A product where users ask questions about geographic data in plain English and get answers, charts and maps back, generated by an LLM over PostGIS.",
    summary:
      "Client work under NDA, so names and datasets stay out: a text-to-SQL query engine over multi-jurisdictional public data, the product platform around it (API, web app, SDKs, billing) and the infrastructure it runs on. I led its conception and engineering with the Territorial team.",
    role: "Lead engineer: conception, query engine, product platform and infrastructure, Territorial team",
    note: "Client- and NDA-protected work; the product, client and datasets are intentionally not named.",
    highlights: [
      "Query engine: natural language → schema-aware SQL → validation → PostGIS → natural-language answer, in one call",
      "Two interchangeable LLM backends behind an identical REST interface; schema-block enforcement so a chat can only touch the data sources it was granted",
      "Analytics sandbox: a bounded tool loop for follow-on analysis (ratios, rankings, comparisons), charts, maps and an optional code interpreter",
      "Product platform with organisations, API keys, usage tracking, rate limits, webhooks, subscription billing, TypeScript and Python SDKs, and a docs site",
    ],
    sections: [
      {
        heading: "The query engine",
        body: [
          "The engine is a FastAPI service over PostgreSQL/PostGIS holding public datasets at federal, state and city level: campaign finance, census demographics, business registries and licences, permits, crime, taxes. The hard part of text-to-SQL over data like this is not the model; it is giving the model a schema it can reason about. I designed the data layer: how jurisdictions at different levels relate, how geometries are exposed and simplified, which columns carry meaning, and how all of it is described so the generated SQL is right on the first attempt more often than not. Fuzzy matching on names uses trigram similarity in the database, so misspelled places and candidates still resolve.",
          "A question becomes a SQL candidate, is validated and constrained (schemas are allow-listed per conversation, internal schemas can never be queried), executed, and summarised back into language. The LLM backend is pluggable: one implementation on OpenAI models through LangChain, another on Google's agent framework with Gemini, both behind the same REST contract with conversation history, so comparing providers was configuration rather than a rewrite. An analytics mode adds a bounded agent loop over freshly fetched data with per-query timeouts, retry caps and an end-to-end deadline, producing percentages, rankings, charts and maps.",
        ],
      },
      {
        heading: "The product around it",
        body: [
          "A query engine is not a product. I also led the platform that turns it into one: an Express and PostgreSQL/PostGIS API with a controllers/services/repositories layout, a React web app for chat and conversation management, TypeScript and Python SDKs for programmatic access, organisations and teams, API keys, usage tracking and rate limiting, a webhook system for event notifications, subscription billing through Stripe, and a documentation site.",
        ],
      },
      {
        heading: "Infrastructure",
        body: [
          "Everything runs as Docker Compose stacks behind Traefik, with separate development, beta and production environments, automated image updates, a metrics and BI layer, and Sentinel watching the whole thing. Secrets are scoped per service and loaded from a single environment file so configuration stays readable as the stack grows. Calls that carry customer data to external model endpoints resolve their targets fail-closed: production refuses to run without an explicit endpoint and never falls back to a public one.",
        ],
      },
    ],
    flow: [
      { label: "Question", sub: "plain English, via web app or SDK" },
      { label: "LLM", sub: "schema-aware SQL generation" },
      { label: "Validation", sub: "allow-listed schemas · constrained query" },
      { label: "PostGIS", sub: "spatial execution" },
      { label: "Answer", sub: "text · chart · map · analytics" },
    ],
  },

  "geo360-ladm": {
    title: "Geo360 LADM",
    tagline: "The first land administration system in Brazil built on the ISO 19152 LADM standard, led while I was at Topocart.",
    summary:
      "As technical lead at Topocart, I drove the conception and architecture of Geo360's LADM-compliant module: a cadastral and land-registry system where parties, rights, restrictions and spatial units follow the international model instead of ad-hoc municipal schemas.",
    role: "Technical lead and requirements analyst at Topocart",
    highlights: [
      "ISO 19152 Land Administration Domain Model implemented in PostgreSQL/PostGIS",
      "Rights, restrictions and responsibilities modelled explicitly, linking parties to spatial units",
      "Interoperable by design with municipal tax systems and national land-registry practice",
      "Reference implementation for later cadastral projects in the company",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Brazilian municipalities run multipurpose cadastres on data models that grew organically, which makes exchanging data between the cadastre, the registry and the tax office fragile. LADM gives a standard vocabulary for that problem: parties, basic administrative units, rights, restrictions, responsibilities and spatial units, with versioning built in.",
        ],
      },
      {
        heading: "What I did",
        body: [
          "I led requirements gathering with cadastral and registry stakeholders, designed the conceptual and logical model, and implemented the schema in PostgreSQL/PostGIS, keeping the standard's packages recognisable while accommodating what Brazilian practice actually needs. GeoServer publishes the spatial units to the Geo360 web clients. The work drew on the cadastral data modelling I had published during my master's research and on the LADM literature, and the module became the company's reference for interoperable land administration. Two of my publications came out of Geo360 deployments in Ceará municipalities.",
        ],
      },
    ],
    captions: ["Geo360 cadastral interface"],
  },

  dragonfly: {
    title: "Dragonfly GeoAnalytics",
    tagline: "A geointelligence platform that helps municipalities fight dengue, Zika and chikungunya with drone imagery and case mapping.",
    summary:
      "Dragonflies prey on mosquito larvae; Dragonfly maps breeding sites and disease cases from drone flights so that health teams can see outbreaks as they move. I built the whole ecosystem for a Brazilian engineering company: frontend, two backends, tile server and the GitOps deployment.",
    role: "Full-stack engineer and architect, contracted",
    highlights: [
      "React frontend with Mapbox (react-map-gl), Highcharts dashboards and a dark-mode Chakra UI",
      "Data API in Express and Prisma; authentication service in Django REST Framework with OAuth2",
      "PostGIS with pg_tileserv serving vector tiles (MVT) directly from the database",
      "Deployed for several municipalities through a GitOps pipeline on Docker Swarm with Portainer",
    ],
    sections: [
      {
        heading: "The system",
        body: [
          "Field teams fly drones over neighbourhoods; the platform georeferences potential breeding sites and confirmed cases, aggregates them over time and space, and presents statistics and trends per district. The frontend renders vector tiles served straight from PostGIS through pg_tileserv, which kept the backend small and the maps fast.",
          "I split the backend in two on purpose: a typed data API in Express and Prisma for speed of iteration, and a Django REST Framework service with Django OAuth Toolkit for a robust, standards-based authentication system. A separate mobile module was built as its own project.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "The contract covered design, development, the data-collection methodology and cloud deployment. Everything is containerised and rolled out through an infrastructure-as-code pipeline, so a new municipality is a configuration change rather than a new build.",
        ],
      },
    ],
  },

  "geoserver-mobile-client": {
    title: "GeoServer Mobile Client",
    tagline: "An offline-capable mobile client for GeoServer layers: download, view, edit features and export, built in three weeks.",
    summary:
      "A client already managed its layers in a GeoServer-backed web system but needed field crews to take those layers offline, edit features and add new ones from a phone. Ionic, React, TypeScript and OpenLayers, with GeoServer's REST API as the only backend.",
    role: "Sole developer, at Topocart",
    highlights: [
      "Ionic + React + OpenLayers with full offline interaction: download layers, browse, edit, collect, export GeoJSON",
      "No custom backend: GeoServer REST manages workspaces, stores, layers, users and styles",
      "From requirements to an unlisted Google Play release in three weeks",
      "Published through Ionic Appflow, restricted to the client's authorised users",
    ],
    sections: [
      {
        heading: "Approach",
        body: [
          "Ionic and React gave a responsive mobile UI quickly, and OpenLayers brought the mapping depth the job needed: efficient vector and raster rendering plus drawing tools for complex features. Building directly on GeoServer's REST API meant the app inherited the client's existing users, layers and styles instead of duplicating them.",
        ],
      },
    ],
  },

  "territorial-maps": {
    title: "Territorial Maps",
    tagline: "A SaaS for publishing drone imagery: upload from your computer, get web-ready layers and share instructions for any GIS.",
    summary:
      "Territorial Maps takes raster datasets straight from a user's machine, generates tiles automatically, organises them by project, and produces ready-made instructions for opening the data in ArcGIS Online, QGIS and other clients. No GIS expertise or infrastructure required on the user's side.",
    role: "Lead engineer; Territorial product",
    highlights: [
      "Upload TIF, JPG or PNG; tiling and publishing run automatically in n8n-driven pipelines",
      "Project-based organisation with access tokens for controlled sharing",
      "Generated share instructions per GIS platform so clients can consume layers where they already work",
      "Next.js and MapLibre frontend deployed on Cloudflare",
    ],
    sections: [
      {
        heading: "What it solves",
        body: [
          "Drone operators produce orthomosaics and then spend hours getting them in front of clients: converting formats, building pyramids, hosting tiles, writing instructions. Territorial Maps folds that into upload, wait, share. The processing pipeline and publishing model are the same ones that grew into Skyport, applied to a self-service product.",
        ],
      },
    ],
  },

  "pointcloud-automation": {
    title: "Point Cloud Publishing Automation",
    tagline: "An n8n-based framework that takes raw point clouds to optimised Potree scenes, built as the backend of a SaaS.",
    summary:
      "The first generation of the processing framework that later became MapPrism and part of Skyport: n8n workflows orchestrating PDAL, Entwine and PotreeConverter to classify, compress, tile and describe large point clouds with attention to speed and resource usage.",
    role: "Lead engineer; Territorial product",
    highlights: [
      "End-to-end pipeline from raw LAS/LAZ to Potree, with metadata generation",
      "Queue management for concurrent jobs and resource-aware scheduling",
      "Designed as a backend service for a SaaS front end",
      "The lessons from this framework are what motivated Ordo's contract-driven model",
    ],
    sections: [
      {
        heading: "Notes",
        body: [
          "This was where I learned that workflow automation alone is not an orchestration model. The pipeline worked and processed real data, but tracking which artifact came from which run, and guaranteeing that a chain of steps either completed or failed visibly, needed a layer that n8n did not provide. That gap is what Ordo now fills.",
        ],
      },
    ],
  },

  "geoportal-itabirito": {
    title: "Geoportal Itabirito",
    tagline: "A public WebGIS that consolidates the multipurpose territorial cadastre of Itabirito, Minas Gerais, into one map.",
    summary:
      "Built for the municipality during my research years, the geoportal exposes cadastral, tax and land data through a React and TypeScript web map backed by QGIS Server, keeping the whole stack open source and free of proprietary GIS licences.",
    role: "Developer, GENTE research group at UFV",
    highlights: [
      "React + TypeScript + OpenLayers frontend talking directly to QGIS Server",
      "Open-source stack end to end, no proprietary map server licence",
      "Containerised and deployed with Docker Compose",
      "Still online and serving the municipality",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "The multipurpose territorial cadastre (CTM) is the municipality's base for taxation, planning and land regularisation. Publishing it as a WebGIS lets citizens and departments query parcels and layers without desktop GIS, and QGIS Server let us reuse the same project files the cadastral team already maintained.",
        ],
      },
    ],
  },

  slope: {
    title: "Slope",
    tagline: "Draw a line on a map and get a live elevation profile computed straight from a PostGIS raster.",
    summary:
      "A prototype exploring how far PostGIS can go for interactive analysis without a heavyweight backend: a Next.js map with rlayers, a single API route with raw SQL, and a Plotly chart that updates as you draw.",
    role: "Author; personal R&D",
    highlights: [
      "Reads the raster's native pixel resolution and samples the drawn line at that resolution",
      "Interpolates elevation values from the raster in SQL; no Python, no GDAL service",
      "Parameterised queries, whitelisted table names and a bearer token on the API route",
      "Next.js, React, rlayers (OpenLayers), Plotly and node-postgres",
    ],
    sections: [
      {
        heading: "Why",
        body: [
          "Elevation profiles are a classic GIS task usually solved with a desktop tool or a processing service. I wanted to see whether the database alone could serve them interactively. It can: PostGIS raster functions handle sampling and interpolation fast enough that the profile feels live while the user is still drawing.",
        ],
      },
    ],
    flow: [
      { label: "Draw a line", sub: "rlayers map" },
      { label: "API route", sub: "Next.js · node-postgres" },
      { label: "PostGIS", sub: "sample raster at native resolution" },
      { label: "Profile", sub: "Plotly chart" },
    ],
  },
};
