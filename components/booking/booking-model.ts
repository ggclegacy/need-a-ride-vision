export type RideTiming = "now" | "later";
export type TripType = "one-way" | "round-trip";
export type LuggageOption = "none" | "1-2" | "3-4" | "5+";
export type PassengerOption = 1 | 2 | 3 | 4;

export interface BookingData {
  pickup: string;
  destination: string;
  additionalStop: boolean;
  stopLocation: string;
  rideTiming: RideTiming;
  rideDate: string;
  rideTime: string;
  tripType: TripType;
  returnDate: string;
  returnTime: string;
  passengers: PassengerOption;
  luggage: LuggageOption;
  airportTrip: boolean;
  flightNumber: string;
  specialInstructions: string;
}

export const INITIAL_BOOKING_DATA: BookingData = {
  pickup: "200 Terminal Drive, Lafayette, LA 70508",
  destination: "101 West Vermilion Street, Lafayette, LA 70501",
  additionalStop: false,
  stopLocation: "",
  rideTiming: "now",
  rideDate: "",
  rideTime: "",
  tripType: "one-way",
  returnDate: "",
  returnTime: "",
  passengers: 1,
  luggage: "none",
  airportTrip: false,
  flightNumber: "",
  specialInstructions: "",
};

export const DEMO_LOCATIONS = [
  "101 West Vermilion Street, Lafayette, LA 70501",
  "200 Terminal Drive, Lafayette, LA 70508",
  "UL Lafayette",
  "Youngsville Sports Complex",
  "River Ranch",
  "Broussard",
  "Maurice",
  "Carencro",
] as const;

export function calculateConceptEstimate(data: BookingData): number {
  const passengerAdjustment = Math.max(0, data.passengers - 2) * 4;
  const luggageAdjustment =
    data.luggage === "5+" ? 5 : data.luggage === "3-4" ? 3 : 0;

  return (
    28 +
    passengerAdjustment +
    luggageAdjustment +
    (data.tripType === "round-trip" ? 24 : 0) +
    (data.airportTrip ? 7 : 0) +
    (data.additionalStop ? 6 : 0) +
    (data.rideTiming === "later" ? 2 : 0)
  );
}

export function formatConceptCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: string): string {
  if (!date) {
    return "Date to be selected";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function formatRideTiming(data: BookingData): string {
  if (data.rideTiming === "now") {
    return "Ride now";
  }

  return `${formatDate(data.rideDate)} at ${data.rideTime || "time to be selected"}`;
}

export function formatReturnTiming(data: BookingData): string {
  if (data.tripType === "one-way") {
    return "Not applicable";
  }

  return `${formatDate(data.returnDate)} at ${data.returnTime || "time to be selected"}`;
}

export function passengerLabel(passengers: PassengerOption): string {
  return passengers === 4 ? "4+ passengers" : `${passengers} passenger${passengers === 1 ? "" : "s"}`;
}

export function luggageLabel(luggage: LuggageOption): string {
  const labels: Record<LuggageOption, string> = {
    none: "None",
    "1-2": "1–2 bags",
    "3-4": "3–4 bags",
    "5+": "5+ bags",
  };

  return labels[luggage];
}
