export type OperationsView = "overview" | "rides" | "people" | "money";

export type RideStatus =
  | "Needs assignment"
  | "Confirmed"
  | "Driver en route"
  | "Passenger onboard"
  | "Completed";

export interface OperationsRide {
  id: string;
  time: string;
  customer: string;
  pickup: string;
  destination: string;
  driver: string | null;
  status: RideStatus;
  payment: "Paid" | "Deposit paid" | "Payment due";
  amount: number;
  category: "Airport" | "Local" | "Event" | "Recurring";
}

export interface OperationsDriver {
  name: string;
  initials: string;
  vehicle: string;
  status: "Available" | "On ride" | "Off duty";
  rides: number;
}

export const INITIAL_OPERATIONS_RIDES: OperationsRide[] = [
  {
    id: "NAR-2048",
    time: "8:15 AM",
    customer: "Marcus T.",
    pickup: "Downtown Lafayette",
    destination: "Lafayette Regional Airport",
    driver: "Andre B.",
    status: "Driver en route",
    payment: "Paid",
    amount: 42,
    category: "Airport",
  },
  {
    id: "NAR-2051",
    time: "9:40 AM",
    customer: "Danielle R.",
    pickup: "River Ranch",
    destination: "UL Lafayette",
    driver: null,
    status: "Needs assignment",
    payment: "Deposit paid",
    amount: 34,
    category: "Local",
  },
  {
    id: "NAR-2054",
    time: "11:00 AM",
    customer: "Cypress Hotel",
    pickup: "Cypress Hotel",
    destination: "Lafayette Regional Airport",
    driver: "Tasha L.",
    status: "Confirmed",
    payment: "Payment due",
    amount: 58,
    category: "Recurring",
  },
  {
    id: "NAR-2057",
    time: "1:30 PM",
    customer: "Elena M.",
    pickup: "Broussard",
    destination: "Youngsville Sports Complex",
    driver: "Andre B.",
    status: "Confirmed",
    payment: "Paid",
    amount: 39,
    category: "Event",
  },
  {
    id: "NAR-2060",
    time: "4:45 PM",
    customer: "James P.",
    pickup: "Carencro",
    destination: "Downtown Lafayette",
    driver: null,
    status: "Needs assignment",
    payment: "Payment due",
    amount: 47,
    category: "Local",
  },
];

export const OPERATIONS_DRIVERS: OperationsDriver[] = [
  {
    name: "Andre B.",
    initials: "AB",
    vehicle: "Red Chrysler Pacifica",
    status: "On ride",
    rides: 4,
  },
  {
    name: "Tasha L.",
    initials: "TL",
    vehicle: "Black Chevrolet Suburban",
    status: "Available",
    rides: 3,
  },
  {
    name: "Michael R.",
    initials: "MR",
    vehicle: "Black Ford Transit",
    status: "Available",
    rides: 2,
  },
  {
    name: "Nia C.",
    initials: "NC",
    vehicle: "Silver Toyota Sienna",
    status: "Off duty",
    rides: 0,
  },
];

export const OPERATIONS_CUSTOMERS = [
  {
    name: "Cypress Hotel",
    type: "Hospitality partner",
    detail: "12 rides this month",
    value: "$684 concept value",
  },
  {
    name: "Elena M.",
    type: "Repeat customer",
    detail: "8 completed rides",
    value: "Airport + event travel",
  },
  {
    name: "Acadiana Medical",
    type: "Account opportunity",
    detail: "3 quote requests",
    value: "Recurring ride potential",
  },
] as const;

export const CONCEPT_PAYMENTS = [
  { id: "PAY-8052", customer: "Marcus T.", amount: 42, status: "Paid", time: "7:42 AM" },
  { id: "PAY-8055", customer: "Danielle R.", amount: 17, status: "Deposit", time: "8:10 AM" },
  { id: "PAY-8058", customer: "Elena M.", amount: 39, status: "Paid", time: "8:26 AM" },
  { id: "PAY-8061", customer: "James P.", amount: 47, status: "Due", time: "Awaiting" },
] as const;

export function formatOperationsCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function nextRideStatus(status: RideStatus): RideStatus {
  const sequence: RideStatus[] = [
    "Needs assignment",
    "Confirmed",
    "Driver en route",
    "Passenger onboard",
    "Completed",
  ];
  const currentIndex = sequence.indexOf(status);
  return sequence[Math.min(currentIndex + 1, sequence.length - 1)];
}
