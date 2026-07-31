export type GrowthLane = "demand" | "partnerships" | "accounts";
export type GrowthFilter = "all" | GrowthLane;

export interface GrowthOpportunity {
  id: string;
  lane: GrowthLane;
  number: string;
  title: string;
  shortTitle: string;
  audience: string;
  promise: string;
  operatingIdea: string;
  discoveryQuestions: readonly string[];
  firstExperiment: string;
  capabilities: readonly string[];
}

export const GROWTH_LANES: readonly {
  id: GrowthLane;
  label: string;
  description: string;
}[] = [
  {
    id: "demand",
    label: "Demand",
    description: "Make high-intent transportation needs easier to find and book.",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    description: "Turn trusted local relationships into repeat referral channels.",
  },
  {
    id: "accounts",
    label: "Accounts",
    description: "Create organized transportation programs for repeat customers.",
  },
] as const;

export const GROWTH_OPPORTUNITIES: readonly GrowthOpportunity[] = [
  {
    id: "airport",
    lane: "demand",
    number: "01",
    title: "Airport Transportation",
    shortTitle: "Airport",
    audience: "Travelers, families, and visiting professionals",
    promise: "A clear, dependable airport-booking path built around scheduled travel.",
    operatingIdea:
      "Collect flight, luggage, party-size, pickup, and timing details in one consistent request instead of reconstructing the trip through messages.",
    discoveryQuestions: [
      "Which airports and service zones are profitable?",
      "How should early, delayed, or changing flights be handled?",
      "Which trip details must be confirmed before acceptance?",
    ],
    firstExperiment:
      "Launch a dedicated airport inquiry path with controlled service areas and manual approval before introducing live pricing.",
    capabilities: ["Flight details", "Scheduled pickup", "Luggage needs", "Return ride"],
  },
  {
    id: "events",
    lane: "demand",
    number: "02",
    title: "Events + Weddings",
    shortTitle: "Events",
    audience: "Couples, planners, venues, and group organizers",
    promise: "Make coordinated transportation feel planned—not improvised.",
    operatingIdea:
      "Package event date, venue, passenger, stop, timing, and return needs into a reviewable request the business can quote intentionally.",
    discoveryQuestions: [
      "Which event sizes and locations fit the current fleet?",
      "When are deposits and final balances required?",
      "How should overtime, waiting, and schedule changes work?",
    ],
    firstExperiment:
      "Create one premium event-transport request with a follow-up checklist and a clear custom-quote expectation.",
    capabilities: ["Group details", "Multiple stops", "Deposits", "Custom timeline"],
  },
  {
    id: "hospitality",
    lane: "partnerships",
    number: "03",
    title: "Hotel + Hospitality Partners",
    shortTitle: "Hotels",
    audience: "Hotels, restaurants, venues, and guest-service teams",
    promise: "Give local partners a dependable way to connect guests with Need A Ride.",
    operatingIdea:
      "Use partner-specific request links or referral identifiers so trips arrive with context and the relationship can be measured over time.",
    discoveryQuestions: [
      "Which existing relationships could become formal partners?",
      "Who is permitted to request or approve a guest ride?",
      "Should the guest or the partner handle payment?",
    ],
    firstExperiment:
      "Pilot a private referral link with one trusted hospitality partner and review the request quality after 30 days.",
    capabilities: ["Partner link", "Referral source", "Guest request", "Relationship history"],
  },
  {
    id: "referrals",
    lane: "partnerships",
    number: "04",
    title: "Local Referral Network",
    shortTitle: "Referrals",
    audience: "Venues, dealerships, offices, and community partners",
    promise: "Make word-of-mouth relationships visible and easier to strengthen.",
    operatingIdea:
      "Attach a simple partner source to each qualified request so Need A Ride can learn which relationships create the right customers.",
    discoveryQuestions: [
      "Which partner categories match the best current rides?",
      "What makes a referral valuable beyond booking volume?",
      "Would recognition, reciprocal promotion, or incentives fit the brand?",
    ],
    firstExperiment:
      "Select three existing relationships, provide distinct referral paths, and compare qualified requests without promising incentives.",
    capabilities: ["Source tracking", "Partner notes", "Qualified leads", "Follow-up rhythm"],
  },
  {
    id: "corporate",
    lane: "accounts",
    number: "05",
    title: "Corporate Transportation Accounts",
    shortTitle: "Corporate",
    audience: "Employers, professional firms, and visiting teams",
    promise: "Move repeat business travel from one-off requests into an organized account.",
    operatingIdea:
      "Give authorized contacts a consistent request process, agreed service rules, ride history, and consolidated billing options.",
    discoveryQuestions: [
      "Which companies already request repeat transportation?",
      "Who can authorize rides and spending?",
      "What billing terms and service expectations are sustainable?",
    ],
    firstExperiment:
      "Design a manual pilot for one company with named requesters, agreed service boundaries, and a monthly ride summary.",
    capabilities: ["Authorized bookers", "Ride history", "Cost centers", "Monthly billing"],
  },
  {
    id: "medical",
    lane: "accounts",
    number: "06",
    title: "Medical + Recurring Rides",
    shortTitle: "Recurring",
    audience: "Patients, families, care teams, and recurring riders",
    promise: "Bring consistency to transportation that happens again and again.",
    operatingIdea:
      "Create repeat schedules, rider preferences, authorized contacts, and clear service boundaries without positioning the company as medical care.",
    discoveryQuestions: [
      "Which recurring ride types fit licensing and operating boundaries?",
      "Who books, receives updates, and pays?",
      "How should missed appointments or schedule changes be handled?",
    ],
    firstExperiment:
      "Pilot one recurring schedule template with explicit non-emergency transportation language and manual approval.",
    capabilities: ["Repeat schedule", "Authorized contact", "Ride preferences", "Account billing"],
  },
] as const;

export function growthLaneLabel(lane: GrowthLane): string {
  return GROWTH_LANES.find((item) => item.id === lane)?.label ?? lane;
}
