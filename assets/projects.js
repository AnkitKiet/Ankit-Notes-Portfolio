/* global window */

window.PROJECTS_DATA = [
  {
    id: "proj-event-backbone",
    tag: "Eventing",
    meta: "Kafka · Schema",
    title: "Event Backbone",
    summary:
      "Multi-tenant Kafka topic strategy with schema evolution, replay tooling, and consumer isolation for safe backfills.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Keys are a contract. Pick keys that match business invariants; treat re-keying as a migration with tooling.",
      "Schema evolution needs guardrails (compat checks, deprecation windows, and consumer rollout discipline).",
      "Replays must be safe-by-default: scoped, rate-limited, and observable.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Topic strategy + isolation", "Replay tooling and backfill workflows", "Schema compatibility gates"],
  },
  {
    id: "proj-ledger-store",
    tag: "Storage",
    meta: "Cassandra · TTL",
    title: "High-Write Ledger Store",
    summary:
      "Query-first tables, time-bucketing, and repair strategy with guardrails to avoid hotspots and tombstone storms.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Design for reads and keep partitions bounded; predictable queries beat “flexible queries.”",
      "Treat TTL/deletes as performance features; observe tombstones and compaction behavior early.",
      "Operational plan (repairs, backups, compaction choice) is part of delivery, not an afterthought.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Time bucketing + bounded partitions", "Hotspot prevention guardrails", "Repair + observability runbooks"],
  },
  {
    id: "proj-tiered-read",
    tag: "API",
    meta: "Latency · Rate limits",
    title: "Tiered Read Service",
    summary:
      "Multi-layer caching, request coalescing, and circuit breakers designed around SLOs and predictable degradation.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Most outages are feedback loops (stampedes, retries). Break loops with coalescing + budgets.",
      "Degradation should be explicit: fail open/closed per endpoint risk profile.",
      "SLOs decide what to optimize; p99 without error rate context misleads.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Multi-layer cache + coalescing", "Circuit breakers + backpressure", "SLO-aligned alerting"],
  },
  {
    id: "proj-async-enrich",
    tag: "Pipelines",
    meta: "Retries · Idempotency",
    title: "Async Enrichment Pipeline",
    summary:
      "Exactly-once effects via idempotent writes + dedupe keys, with dead-letter workflows and replay-safe processing.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Assume duplicates. Make handlers deterministic and side effects idempotent.",
      "DLQ is a workflow, not a bucket—define who owns it and what “done” means.",
      "Measure lag and saturation; backpressure signals are product signals.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Replay-safe processing", "Idempotency keys + dedupe", "DLQ workflows + metrics"],
  },
  {
    id: "proj-signal-first",
    tag: "Observability",
    meta: "Tracing · SLOs",
    title: "Signal-First Operations",
    summary:
      "Service-level dashboards and alerting based on user impact; “unknown unknowns” reduced with traces and invariants.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Alerts need an action. If there’s no playbook, it’s a dashboard metric.",
      "Tracing is most valuable when it’s tied to incident questions: where is time spent, and why now?",
      "Invariants + audits catch silent data drift that metrics miss.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["User-impact SLIs", "Trace-driven debugging", "Invariant checks + audits"],
  },
  {
    id: "proj-policy-access",
    tag: "Security",
    meta: "AuthZ · Audits",
    title: "Policy-Driven Access",
    summary:
      "Authorization model with audit trails and fail-closed defaults; operationally safe rollouts with feature gates.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Default-deny is easy; making it operable (audits, explanations, safe rollout) is the real work.",
      "Policies need versioning and migration plans—treat policy changes like schema changes.",
      "Build “why was this denied?” into the system to reduce support and incident load.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Audit trails", "Fail-closed defaults", "Safe rollout with feature gates"],
  },
  {
    id: "proj-global-config",
    tag: "Platform",
    meta: "Config · Rollouts",
    title: "Global Configuration Platform",
    summary:
      "Centralized, versioned config service with staged rollouts and automatic safety checks for high-risk changes.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Configuration is production code. Version everything and keep auditable change history.",
      "Progressive rollout and blast-radius control prevents global incidents from single mistakes.",
      "Validation and policy checks should run before publish, not after incidents.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Versioned config", "Progressive rollout", "Pre-publish validation gates"],
  },
  {
    id: "proj-capacity-sim",
    tag: "Performance",
    meta: "Load testing · Forecasting",
    title: "Capacity Simulation Harness",
    summary:
      "Traffic replay and synthetic load framework for validating scaling strategies before peak events.",
    learningsTitle: "What I learned / how I’d do it again",
    learnings: [
      "Peak readiness needs realistic workload shape, not just high QPS tests.",
      "Bottlenecks often hide in dependencies; model downstream limits explicitly.",
      "Capacity plans are more credible when tied to SLO burn and cost envelopes.",
    ],
    highlightsTitle: "System highlights",
    highlights: ["Traffic replay profiles", "Dependency saturation modeling", "SLO + cost-aware capacity reports"],
  },
];

