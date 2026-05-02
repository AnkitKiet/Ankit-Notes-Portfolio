/* global window */

window.PAPERS_DATA = [
  {
    id: "paper-mapreduce",
    tag: "Distributed systems",
    meta: "Fault tolerance · Data parallelism",
    title: "MapReduce: Simplified Data Processing on Large Clusters",
    summary:
      "A programming model for large-scale batch processing using map + reduce with automatic parallelization and fault tolerance.",
    linkLabel: "Read the paper",
    linkUrl: "https://research.google/pubs/pub62/",
    gistTitle: "My gist / takeaway",
    gist: [
      "The key idea is isolating developer intent (map/reduce) from operational complexity (scheduling, data locality, retries).",
      "Failures are normal; the system makes progress by re-executing tasks and treating outputs as immutable.",
      "The most practical lesson: choose abstractions that constrain the problem space and make “the common case fast.”",
    ],
  },
  {
    id: "paper-dynamo",
    tag: "Storage",
    meta: "Availability · Consistency trade-offs",
    title: "Dynamo: Amazon’s Highly Available Key-value Store",
    summary:
      "Design patterns for highly available storage: consistent hashing, vector clocks, sloppy quorum, and anti-entropy.",
    linkLabel: "Read the paper",
    linkUrl: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
    gistTitle: "My gist / takeaway",
    gist: [
      "Availability is a product decision: accept partial inconsistency, then invest in reconciliation and operability.",
      "Quorums are a tuning knob, not a guarantee—real-world failures break assumptions.",
      "If you go eventual, you need explicit conflict handling paths, not “it probably won’t happen.”",
    ],
  },
  {
    id: "paper-ddia",
    tag: "Architecture",
    meta: "Data systems · Reliability",
    title: "Designing Data-Intensive Applications",
    summary:
      "A practical mental model for data systems: storage engines, replication, partitioning, consistency, and stream processing trade-offs.",
    linkLabel: "Book reference",
    linkUrl: "https://dataintensive.net/",
    gistTitle: "My gist / takeaway",
    gist: [
      "The most useful lens is trade-offs, not silver bullets: consistency, latency, throughput, and operability always interact.",
      "Data models shape system boundaries and team boundaries. Poor modeling leaks complexity everywhere else.",
      "Observability and failure recovery should be considered at design time, not as post-launch hardening.",
    ],
  },
  {
    id: "paper-kafka",
    tag: "Streaming",
    meta: "Logs · Event sourcing",
    title: "Kafka: a Distributed Messaging System for Log Processing",
    summary:
      "Foundational ideas behind log-centric architecture and high-throughput messaging with partitioned ordering semantics.",
    linkLabel: "Read the paper",
    linkUrl: "https://notes.stephenholiday.com/Kafka.pdf",
    gistTitle: "My gist / takeaway",
    gist: [
      "A durable log is more than transport; it becomes a source of truth and replay mechanism for evolution.",
      "Partitioning strategy should follow business invariants to preserve meaningful ordering.",
      "Consumer independence is a superpower for incremental migration and safe reprocessing.",
    ],
  },
];

