export type RoadmapPhaseId = "foundation" | "operations" | "expansion";

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  unlocks: string;
}

export interface RoadmapPhase {
  id: RoadmapPhaseId;
  number: string;
  label: string;
  posture: string;
  promise: string;
  rationale: string;
  gate: string;
  milestones: readonly RoadmapMilestone[];
}

export interface RoadmapDecision {
  id: string;
  phase: RoadmapPhaseId;
  prompt: string;
  whyItMatters: string;
}

export const ROADMAP_PHASES: readonly RoadmapPhase[] = [
  {
    id: "foundation",
    number: "01",
    label: "Foundation",
    posture: "Build first",
    promise: "Create one dependable customer path and the rules required to run it.",
    rationale:
      "The first release should reduce friction without asking the business to change everything at once. Clear service rules, consistent ride requests, and controlled payments create reliable information for every phase that follows.",
    gate: "The owner approves service boundaries, pricing logic, payment rules, and the minimum information required to accept a ride.",
    milestones: [
      {
        id: "service-blueprint",
        title: "Service Blueprint",
        description:
          "Define service areas, ride types, availability expectations, fare inputs, deposits, cancellations, and the moments that require owner review.",
        capabilities: ["Service rules", "Fare inputs", "Payment policy", "Exception paths"],
        unlocks: "A buildable customer experience based on real operating decisions.",
      },
      {
        id: "booking-core",
        title: "Customer Booking Core",
        description:
          "Turn pickup, destination, timing, rider details, quote review, and confirmation into one clear request-to-book flow.",
        capabilities: ["Ride request", "Quote review", "Trip details", "Confirmation"],
        unlocks: "Consistent booking records instead of fragmented message threads.",
      },
      {
        id: "payment-communication",
        title: "Payment + Communication Setup",
        description:
          "Connect approved Square payment moments and a restrained set of confirmation and status messages after the workflow is agreed.",
        capabilities: ["Square connection", "Deposits", "Receipts", "Message triggers"],
        unlocks: "A customer journey that can close the loop without duplicate follow-up.",
      },
    ],
  },
  {
    id: "operations",
    number: "02",
    label: "Operations",
    posture: "Connect next",
    promise: "Give the owner one operating picture behind every customer ride.",
    rationale:
      "Once incoming ride information is consistent, the operational layer can organize work around it. This phase should replace duplicate tracking carefully, preserve human judgment, and improve visibility before adding automation.",
    gate: "The team can run the daily ride workflow from one agreed source of truth without losing the exceptions that still need human judgment.",
    milestones: [
      {
        id: "system-of-record",
        title: "Ride System of Record",
        description:
          "Organize quotes, accepted rides, customers, payment state, notes, and history around a single ride record.",
        capabilities: ["Ride records", "Customer history", "Payment state", "Search + notes"],
        unlocks: "A reliable operating view that is not reconstructed from memory.",
      },
      {
        id: "dispatch-rhythm",
        title: "Scheduling + Dispatch Rhythm",
        description:
          "Introduce assignment, readiness, status, and attention workflows that match how the owner and drivers actually work.",
        capabilities: ["Schedule board", "Assignments", "Ride status", "Attention queue"],
        unlocks: "Clear responsibility and earlier visibility into service risks.",
      },
      {
        id: "owner-visibility",
        title: "Owner Visibility",
        description:
          "Surface a concise view of today, upcoming demand, outstanding balances, customer patterns, and operational exceptions.",
        capabilities: ["Daily overview", "Exceptions", "Payment visibility", "Basic reporting"],
        unlocks: "Better operating decisions grounded in connected business activity.",
      },
    ],
  },
  {
    id: "expansion",
    number: "03",
    label: "Expansion",
    posture: "Prove before scale",
    promise: "Test the strongest opportunity on top of a stable customer and operating foundation.",
    rationale:
      "Growth should begin with evidence, not a large feature set. The strongest shortlisted opportunity becomes a controlled pilot with explicit service boundaries, a narrow audience, and a clear learning plan.",
    gate: "A pilot has evidence of customer value, operational fit, and healthy economics before the business invests in broader automation or promotion.",
    milestones: [
      {
        id: "pilot-choice",
        title: "Choose One Pilot",
        description:
          "Select the opportunity with the strongest customer evidence, operational fit, and owner confidence—not simply the largest imagined upside.",
        capabilities: ["Discovery evidence", "Pilot boundary", "Success signals", "Stop conditions"],
        unlocks: "A focused experiment the current business can deliver responsibly.",
      },
      {
        id: "channel-workflow",
        title: "Build the Minimum Channel",
        description:
          "Add only the request, partner, account, or recurring-ride capabilities required to operate the chosen pilot.",
        capabilities: ["Focused intake", "Source context", "Service rules", "Manual oversight"],
        unlocks: "Real learning without prematurely building a full growth platform.",
      },
      {
        id: "learn-and-decide",
        title: "Learn, Then Decide",
        description:
          "Review request quality, service reliability, team capacity, customer response, and economics before expanding the pilot.",
        capabilities: ["Pilot review", "Capacity check", "Customer feedback", "Next decision"],
        unlocks: "An evidence-backed decision to refine, scale, pause, or stop.",
      },
    ],
  },
] as const;

export const ROADMAP_DECISIONS: readonly RoadmapDecision[] = [
  {
    id: "service-boundaries",
    phase: "foundation",
    prompt: "Which ride types, service areas, and timing requests belong in the first release?",
    whyItMatters: "Defines what the customer experience can promise safely.",
  },
  {
    id: "pricing-payment",
    phase: "foundation",
    prompt: "Which fares can be estimated, which require review, and when are deposits or balances due?",
    whyItMatters: "Determines the quote, approval, and Square payment flow.",
  },
  {
    id: "team-roles",
    phase: "operations",
    prompt: "Who reviews requests, confirms rides, assigns drivers, and resolves exceptions?",
    whyItMatters: "Prevents software from hiding unclear operating responsibility.",
  },
  {
    id: "source-data",
    phase: "operations",
    prompt: "What current customer, ride, driver, and payment information should be cleaned or carried forward?",
    whyItMatters: "Sets a responsible migration boundary for the system of record.",
  },
  {
    id: "pilot-priority",
    phase: "expansion",
    prompt: "Which shortlisted opportunity has the strongest real-world evidence for a controlled pilot?",
    whyItMatters: "Keeps expansion focused on learning instead of speculation.",
  },
  {
    id: "success-signals",
    phase: "expansion",
    prompt: "What evidence would justify refining, scaling, pausing, or ending the pilot?",
    whyItMatters: "Creates an honest decision before more technology is built.",
  },
] as const;

export function roadmapPhaseLabel(phase: RoadmapPhaseId): string {
  return ROADMAP_PHASES.find((item) => item.id === phase)?.label ?? phase;
}
