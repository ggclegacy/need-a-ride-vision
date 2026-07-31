export type PlatformModuleId =
  | "driver"
  | "fleet"
  | "dispatch"
  | "customers"
  | "analytics"
  | "future";

export interface PlatformModule {
  id: PlatformModuleId;
  number: string;
  label: string;
  shortLabel: string;
  eyebrow: string;
}

export const PLATFORM_MODULES: readonly PlatformModule[] = [
  {
    id: "driver",
    number: "01",
    label: "Driver App",
    shortLabel: "Driver",
    eyebrow: "The team on the road",
  },
  {
    id: "fleet",
    number: "02",
    label: "Fleet Intelligence",
    shortLabel: "Fleet",
    eyebrow: "Every vehicle ready",
  },
  {
    id: "dispatch",
    number: "03",
    label: "Dispatch Command",
    shortLabel: "Dispatch",
    eyebrow: "The day in motion",
  },
  {
    id: "customers",
    number: "04",
    label: "Customer CRM",
    shortLabel: "Customers",
    eyebrow: "Every relationship remembered",
  },
  {
    id: "analytics",
    number: "05",
    label: "Business Intelligence",
    shortLabel: "Analytics",
    eyebrow: "Decisions with context",
  },
  {
    id: "future",
    number: "06",
    label: "Future Integrations",
    shortLabel: "Future",
    eyebrow: "Designed to keep growing",
  },
] as const;

export type DriverRideState =
  | "Accepted"
  | "En route"
  | "Arrived"
  | "Passenger onboard";

export const DRIVER_RIDE_STATES: readonly DriverRideState[] = [
  "Accepted",
  "En route",
  "Arrived",
  "Passenger onboard",
];

export const DRIVER_SCHEDULE = [
  {
    time: "8:15 AM",
    customer: "Marcus T.",
    route: "Downtown → LFT Airport",
    state: "Current",
  },
  {
    time: "11:00 AM",
    customer: "Cypress Hotel",
    route: "Cypress Hotel → LFT Airport",
    state: "Upcoming",
  },
  {
    time: "1:30 PM",
    customer: "Elena M.",
    route: "Broussard → Youngsville",
    state: "Upcoming",
  },
] as const;

export type FleetState = "Ready" | "Assigned" | "Service due" | "In service";

export interface FleetVehicle {
  id: string;
  name: string;
  descriptor: string;
  plate: string;
  mileage: string;
  driver: string;
  state: FleetState;
  serviceLabel: string;
  serviceProgress: number;
  nextService: string;
  inspection: string;
  registration: string;
  insurance: string;
  history: readonly { date: string; service: string; vendor: string }[];
}

export const FLEET_VEHICLES: readonly FleetVehicle[] = [
  {
    id: "fleet-01",
    name: "Chevrolet Suburban",
    descriptor: "Black · Executive SUV",
    plate: "Concept 01",
    mileage: "48,210 mi",
    driver: "Tasha L.",
    state: "Assigned",
    serviceLabel: "Oil service in 790 mi",
    serviceProgress: 74,
    nextService: "Oil + filter · 49,000 mi",
    inspection: "Pre-shift complete",
    registration: "Review in 68 days",
    insurance: "Review in 42 days",
    history: [
      { date: "Jun 18", service: "Tire rotation", vendor: "Local service partner" },
      { date: "Apr 02", service: "Oil + filter", vendor: "Local service partner" },
    ],
  },
  {
    id: "fleet-02",
    name: "Ford Transit",
    descriptor: "Black · Group transport",
    plate: "Concept 02",
    mileage: "62,440 mi",
    driver: "Michael R.",
    state: "Service due",
    serviceLabel: "Inspection needs review",
    serviceProgress: 92,
    nextService: "Brake inspection · Review now",
    inspection: "Driver note attached",
    registration: "Review in 104 days",
    insurance: "Review in 42 days",
    history: [
      { date: "Jul 09", service: "Driver inspection note", vendor: "Internal record" },
      { date: "May 21", service: "Brake service", vendor: "Local service partner" },
    ],
  },
  {
    id: "fleet-03",
    name: "Chrysler Pacifica",
    descriptor: "Red · Premium passenger",
    plate: "Concept 03",
    mileage: "31,880 mi",
    driver: "Andre B.",
    state: "Ready",
    serviceLabel: "Next service in 2,120 mi",
    serviceProgress: 43,
    nextService: "Oil + tire rotation · 34,000 mi",
    inspection: "Pre-shift complete",
    registration: "Review in 153 days",
    insurance: "Review in 42 days",
    history: [
      { date: "Jul 12", service: "Interior detail", vendor: "Fleet care" },
      { date: "May 30", service: "Oil + filter", vendor: "Local service partner" },
    ],
  },
] as const;

export type DispatchState =
  | "Needs assignment"
  | "Confirmed"
  | "Driver en route"
  | "Passenger onboard";

export interface DispatchRide {
  id: string;
  time: string;
  customer: string;
  route: string;
  driver: string;
  vehicle: string;
  state: DispatchState;
  message: string;
}

export const DISPATCH_RIDES: readonly DispatchRide[] = [
  {
    id: "NAR-2048",
    time: "8:15",
    customer: "Marcus T.",
    route: "Downtown → LFT Airport",
    driver: "Andre B.",
    vehicle: "Pacifica",
    state: "Driver en route",
    message: "Driver departure update ready for customer.",
  },
  {
    id: "NAR-2051",
    time: "9:40",
    customer: "Danielle R.",
    route: "River Ranch → UL Lafayette",
    driver: "Unassigned",
    vehicle: "Not selected",
    state: "Needs assignment",
    message: "Assignment decision needed before confirmation.",
  },
  {
    id: "NAR-2054",
    time: "11:00",
    customer: "Cypress Hotel",
    route: "Cypress Hotel → LFT Airport",
    driver: "Tasha L.",
    vehicle: "Suburban",
    state: "Confirmed",
    message: "Partner booking confirmation prepared.",
  },
  {
    id: "NAR-2057",
    time: "1:30",
    customer: "Elena M.",
    route: "Broussard → Youngsville",
    driver: "Andre B.",
    vehicle: "Pacifica",
    state: "Confirmed",
    message: "Driver reminder scheduled for concept preview.",
  },
] as const;

export interface CustomerProfile {
  id: string;
  name: string;
  initials: string;
  relationship: string;
  rides: string;
  since: string;
  value: string;
  preferences: readonly string[];
  note: string;
  history: readonly { date: string; route: string; status: string }[];
}

export const CUSTOMER_PROFILES: readonly CustomerProfile[] = [
  {
    id: "customer-01",
    name: "Elena M.",
    initials: "EM",
    relationship: "VIP repeat rider",
    rides: "8 concept rides",
    since: "Customer since 2024",
    value: "Airport + event travel",
    preferences: ["Text updates", "Quiet ride", "Airport traveler"],
    note: "Prefers confirmation the evening before early airport pickups.",
    history: [
      { date: "Jul 18", route: "Broussard → LFT Airport", status: "Completed" },
      { date: "Jun 29", route: "River Ranch → Downtown", status: "Completed" },
    ],
  },
  {
    id: "customer-02",
    name: "Cypress Hotel",
    initials: "CH",
    relationship: "Hospitality partner concept",
    rides: "12 concept rides this month",
    since: "Relationship preview",
    value: "Guest + airport transport",
    preferences: ["Front desk contact", "Monthly summary", "Guest updates"],
    note: "Confirm guest name and responsible payment party before dispatch.",
    history: [
      { date: "Jul 24", route: "Hotel → LFT Airport", status: "Scheduled" },
      { date: "Jul 21", route: "LFT Airport → Hotel", status: "Completed" },
    ],
  },
  {
    id: "customer-03",
    name: "Acadiana Medical",
    initials: "AM",
    relationship: "Business account opportunity",
    rides: "3 concept requests",
    since: "Discovery required",
    value: "Recurring transportation potential",
    preferences: ["Authorized contacts", "Ride approvals", "Consolidated billing"],
    note: "Service boundaries, authorized riders, and billing terms require discovery.",
    history: [
      { date: "Jul 22", route: "Office → Appointment", status: "Quote preview" },
      { date: "Jul 15", route: "Office → Appointment", status: "Quote preview" },
    ],
  },
] as const;

export const ANALYTICS_METRICS = [
  { label: "Concept ride value", value: "$18.4K", trend: "Sample month" },
  { label: "Completed rides", value: "184", trend: "Illustrative only" },
  { label: "Repeat customers", value: "41%", trend: "Concept indicator" },
  { label: "Fleet utilization", value: "68%", trend: "Sample operation" },
] as const;

export const DESTINATION_TRENDS = [
  { label: "Airport", value: 78 },
  { label: "Downtown", value: 62 },
  { label: "Events", value: 48 },
  { label: "Medical", value: 34 },
] as const;

export const UTILIZATION_PREVIEW = [
  { label: "Suburban", value: 82, note: "Executive + airport" },
  { label: "Pacifica", value: 71, note: "Local + event" },
  { label: "Transit", value: 54, note: "Groups + events" },
] as const;

export interface FutureIntegration {
  id: string;
  number: string;
  title: string;
  promise: string;
  unlocks: readonly string[];
  dependency: string;
}

export const FUTURE_INTEGRATIONS: readonly FutureIntegration[] = [
  {
    id: "gps",
    number: "01",
    title: "Live GPS Tracking",
    promise: "Let customers see an assigned driver approach in real time.",
    unlocks: ["Arrival visibility", "Live driver location", "Dispatcher awareness"],
    dependency: "Requires a production driver-location service, privacy rules, and reliable mobile data.",
  },
  {
    id: "flights",
    number: "02",
    title: "Flight Tracking",
    promise: "Adjust airport workflows around delays and changing arrival times.",
    unlocks: ["Delay awareness", "Arrival monitoring", "Smarter pickup timing"],
    dependency: "Requires a live flight-data provider and owner-approved operating rules.",
  },
  {
    id: "ai",
    number: "03",
    title: "AI Operations Assistant",
    promise: "Surface answers, conflicts, and next actions from trusted operating data.",
    unlocks: ["Daily briefings", "Conflict review", "Natural-language reporting"],
    dependency: "Requires clean business data, permission boundaries, and human review.",
  },
  {
    id: "corporate",
    number: "04",
    title: "Corporate Portal",
    promise: "Give approved partners a controlled way to request rides and review billing.",
    unlocks: ["Authorized bookers", "Account history", "Monthly billing"],
    dependency: "Requires account rules, approval roles, service agreements, and billing policy.",
  },
  {
    id: "customer-app",
    number: "05",
    title: "Customer Mobile App",
    promise: "Bring repeat booking, saved places, receipts, and ride updates into one app.",
    unlocks: ["One-tap rebooking", "Saved destinations", "Account preferences"],
    dependency: "Best introduced after the web booking and customer-account foundation proves useful.",
  },
  {
    id: "automation",
    number: "06",
    title: "Advanced Automation",
    promise: "Connect booking, dispatch, payments, reminders, receipts, and follow-up.",
    unlocks: ["Triggered updates", "Exception alerts", "Review follow-up"],
    dependency: "Requires approved message timing, escalation rules, and connected production services.",
  },
] as const;
