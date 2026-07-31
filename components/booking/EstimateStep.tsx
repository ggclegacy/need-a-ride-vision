"use client";

import { useEffect, useState } from "react";
import { BookingActions, ConceptBadge, RouteVisual, SummaryList } from "./BookingUI";
import {
  type BookingData,
  formatConceptCurrency,
  formatRideTiming,
  passengerLabel,
} from "./booking-model";

interface EstimateStepProps {
  data: BookingData;
  estimate: number;
  onBack: () => void;
  onContinue: () => void;
}

type EstimatePhase = "building" | "confirmed" | "ready";

export function EstimateStep({
  data,
  estimate,
  onBack,
  onContinue,
}: EstimateStepProps) {
  const [phase, setPhase] = useState<EstimatePhase>("building");

  useEffect(() => {
    const confirmedTimer = window.setTimeout(() => setPhase("confirmed"), 380);
    const readyTimer = window.setTimeout(() => setPhase("ready"), 820);

    return () => {
      window.clearTimeout(confirmedTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  if (phase !== "ready") {
    return (
      <section className="estimate-processing" aria-live="polite" aria-busy="true">
        <div className="estimate-processing__route" aria-hidden="true">
          <span />
        </div>
        <p className="booking-step__eyebrow">Concept estimate</p>
        <h3 id="booking-step-heading" tabIndex={-1}>
          {phase === "building" ? "Building your ride..." : "Trip details confirmed"}
        </h3>
        <p>Using your selections to prepare a controlled demo estimate.</p>
      </section>
    );
  }

  return (
    <form
      className="booking-step estimate-step"
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
    >
      <div className="booking-step__heading" aria-live="polite">
        <p className="booking-step__eyebrow">Your ride, brought together</p>
        <h3 id="booking-step-heading" tabIndex={-1}>
          Review your estimate
        </h3>
        <p>Everything is connected in one clear view.</p>
      </div>

      <div className="estimate-layout">
        <article className="concept-estimate-card">
          <div className="concept-estimate-card__topline">
            <div>
              <p>Concept Estimate</p>
              <strong>{formatConceptCurrency(estimate)}</strong>
            </div>
            <ConceptBadge />
          </div>
          <p className="concept-estimate-card__disclaimer">
            This is fictional demo pricing, not a live quote.
          </p>
          <SummaryList
            items={[
              { label: "Date / Time", value: formatRideTiming(data) },
              { label: "Passengers", value: passengerLabel(data.passengers) },
              {
                label: "Trip type",
                value: data.tripType === "round-trip" ? "Round trip" : "One way",
              },
              { label: "Sample travel time", value: "22 min · concept data" },
              { label: "Sample distance", value: "11.8 mi · concept data" },
            ]}
          />
        </article>

        <RouteVisual
          destination={data.destination}
          pickup={data.pickup}
          stop={data.additionalStop ? data.stopLocation : undefined}
        />
      </div>

      <p className="pricing-note">
        Final pricing rules would be configured around Need A Ride’s actual fare structure
        during discovery.
      </p>

      <BookingActions nextLabel="Review Booking" onBack={onBack} />
    </form>
  );
}
