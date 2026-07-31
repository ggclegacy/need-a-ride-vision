"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookingConfirmationStep } from "./BookingConfirmationStep";
import { BookingProgress } from "./BookingUI";
import { BookingReviewStep } from "./BookingReviewStep";
import { EstimateStep } from "./EstimateStep";
import { LocationStep } from "./LocationStep";
import { PaymentConceptStep } from "./PaymentConceptStep";
import { ScheduleStep } from "./ScheduleStep";
import { TripDetailsStep } from "./TripDetailsStep";
import {
  INITIAL_BOOKING_DATA,
  calculateConceptEstimate,
  type BookingData,
} from "./booking-model";

type BookingScreen =
  | "location"
  | "schedule"
  | "details"
  | "estimate"
  | "review"
  | "payment"
  | "confirmation";

const SCREEN_PROGRESS: Record<BookingScreen, number> = {
  location: 1,
  schedule: 2,
  details: 3,
  estimate: 4,
  review: 4,
  payment: 5,
  confirmation: 6,
};

interface BookingExperienceProps {
  onComplete: () => void;
}

export function BookingExperience({ onComplete }: BookingExperienceProps) {
  const [data, setData] = useState<BookingData>(INITIAL_BOOKING_DATA);
  const [screen, setScreen] = useState<BookingScreen>("location");
  const [error, setError] = useState("");
  const estimate = useMemo(() => calculateConceptEstimate(data), [data]);

  const moveTo = useCallback((nextScreen: BookingScreen) => {
    setError("");
    setScreen(nextScreen);
  }, []);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => {
      document.getElementById("booking-step-heading")?.focus({ preventScroll: true });
    }, 120);

    return () => window.clearTimeout(focusTimer);
  }, [screen]);

  const updateData = (updates: Partial<BookingData>) => {
    setData((current) => ({ ...current, ...updates }));
    setError("");
  };

  const validateLocation = () => {
    if (!data.pickup.trim() || !data.destination.trim()) {
      setError("Enter both a pickup location and destination to continue.");
      return;
    }

    if (data.pickup.trim().toLowerCase() === data.destination.trim().toLowerCase()) {
      setError("Pickup and destination need to be different locations.");
      return;
    }

    if (data.additionalStop && !data.stopLocation.trim()) {
      setError("Enter a stop location or remove the additional stop.");
      return;
    }

    moveTo("schedule");
  };

  const validateSchedule = () => {
    if (data.rideTiming === "later" && (!data.rideDate || !data.rideTime)) {
      setError("Choose both a pickup date and time for a scheduled ride.");
      return;
    }

    if (data.tripType === "round-trip" && (!data.returnDate || !data.returnTime)) {
      setError("Choose both a return date and time for the round trip.");
      return;
    }

    moveTo("details");
  };

  return (
    <div className="booking-product-shell">
      <header className="booking-product-shell__bar">
        <div>
          <span className="booking-product-shell__monogram" aria-hidden="true">NAR</span>
          <p>
            Need A Ride
            <small>Customer booking concept</small>
          </p>
        </div>
        <span className="booking-product-shell__status">
          <span aria-hidden="true" />
          Local Demo
        </span>
      </header>

      <BookingProgress current={SCREEN_PROGRESS[screen]} />

      <div className={`booking-product-shell__content booking-screen--${screen}`}>
        {screen === "location" ? (
          <LocationStep
            data={data}
            error={error}
            onChange={updateData}
            onContinue={validateLocation}
          />
        ) : null}
        {screen === "schedule" ? (
          <ScheduleStep
            data={data}
            error={error}
            onBack={() => moveTo("location")}
            onChange={updateData}
            onContinue={validateSchedule}
          />
        ) : null}
        {screen === "details" ? (
          <TripDetailsStep
            data={data}
            onBack={() => moveTo("schedule")}
            onChange={updateData}
            onContinue={() => moveTo("estimate")}
          />
        ) : null}
        {screen === "estimate" ? (
          <EstimateStep
            data={data}
            estimate={estimate}
            onBack={() => moveTo("details")}
            onContinue={() => moveTo("review")}
          />
        ) : null}
        {screen === "review" ? (
          <BookingReviewStep
            data={data}
            estimate={estimate}
            onContinue={() => moveTo("payment")}
            onEdit={() => moveTo("location")}
          />
        ) : null}
        {screen === "payment" ? (
          <PaymentConceptStep
            estimate={estimate}
            onBack={() => moveTo("review")}
            onComplete={() => moveTo("confirmation")}
          />
        ) : null}
        {screen === "confirmation" ? (
          <BookingConfirmationStep
            data={data}
            estimate={estimate}
            onContinue={onComplete}
          />
        ) : null}
      </div>
    </div>
  );
}
