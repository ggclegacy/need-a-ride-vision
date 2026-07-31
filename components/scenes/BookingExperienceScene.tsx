"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { BookingExperience } from "@/components/booking/BookingExperience";
import { OperationsExperience } from "@/components/operations/OperationsExperience";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { SceneShell } from "@/components/vision/SceneShell";

interface BookingExperienceSceneProps {
  active: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

type ExperienceView =
  | "intro"
  | "booking"
  | "pullback"
  | "operations-entry"
  | "operations"
  | "growth";

export function BookingExperienceScene({
  active,
  headingRef,
}: BookingExperienceSceneProps) {
  const [view, setView] = useState<ExperienceView>("intro");
  const internalHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (view === "intro") {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      internalHeading.current?.focus({ preventScroll: true });
    }, 140);

    return () => window.clearTimeout(focusTimer);
  }, [view]);

  if (view === "booking") {
    return (
      <SceneShell className="booking-experience-scene booking-experience-scene--product" labelledBy="booking-product-title">
        <h2 className="visually-hidden" id="booking-product-title" ref={internalHeading} tabIndex={-1}>
          Interactive booking concept
        </h2>
        <BookingExperience onComplete={() => setView("pullback")} />
      </SceneShell>
    );
  }

  if (view === "pullback") {
    return (
      <SceneShell className="booking-experience-scene executive-pullback" labelledBy="pullback-title">
        <div className="executive-pullback__content">
          <p className="eyebrow">One Connected Experience</p>
          <h2 className="scene-title" id="pullback-title" ref={internalHeading} tabIndex={-1}>
            Quote.
            <br />
            Book. Pay.
            <br />
            Confirmed.
          </h2>
          <p className="lead-copy">
            A smoother customer journey on the front end can create a more organized
            operation behind the scenes.
          </p>
          <PremiumButton onClick={() => setView("operations-entry")}>
            See What Happens Behind the Ride
          </PremiumButton>
        </div>
        <div className="executive-pullback__signal" aria-hidden="true">
          <span>Quote</span>
          <span>Book</span>
          <span>Pay</span>
          <span>Confirmed</span>
        </div>
      </SceneShell>
    );
  }

  if (view === "operations") {
    return (
      <SceneShell className="booking-experience-scene operations-experience-scene" labelledBy="operations-product-title">
        <h2 className="visually-hidden" id="operations-product-title" ref={internalHeading} tabIndex={-1}>
          Owner Command Center concept
        </h2>
        <OperationsExperience onComplete={() => setView("growth")} />
      </SceneShell>
    );
  }

  if (view === "growth") {
    return (
      <SceneShell className="booking-experience-scene growth-placeholder" labelledBy="growth-title">
        <div className="growth-placeholder__content">
          <p className="eyebrow">Built for What Comes Next</p>
          <h2 className="scene-title" id="growth-title" ref={internalHeading} tabIndex={-1}>
            From Better Rides
            <br />
            to Bigger Opportunity.
          </h2>
          <p className="lead-copy">
            Partnerships, recurring transportation, business accounts, and new
            service lines can grow from the same connected foundation.
          </p>
          <p className="stage-note">Growth opportunities coming in the next build.</p>
        </div>
        <div className="growth-placeholder__orbit" aria-hidden="true">
          <span>Airport</span>
          <span>Hotels</span>
          <span>Corporate</span>
          <span>Events</span>
        </div>
      </SceneShell>
    );
  }

  if (view === "operations-entry") {
    return (
      <SceneShell className="booking-experience-scene operations-entry" labelledBy="operations-title">
        <div className="operations-entry__content">
          <p className="eyebrow">Behind the Ride</p>
          <h2 className="scene-title" id="operations-title" ref={internalHeading} tabIndex={-1}>
            The Owner
            <br />
            Command Center
          </h2>
          <p className="lead-copy">
            Every quote, booking, payment, customer, and driver — organized in one place.
          </p>
          <PremiumButton onClick={() => setView("operations")}>
            Open the Command Center
          </PremiumButton>
          <p className="booking-entry__note">
            Controlled operations concept · No live bookings, payments, customers, or drivers
          </p>
        </div>
        <div className="operations-entry__preview" aria-hidden="true">
          <div><span /><span /><span /></div>
          <div><span /><span /><span /><span /></div>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell className="booking-experience-scene booking-entry" labelledBy="booking-entry-title">
      <div className="booking-entry__content">
        <p className="eyebrow">The Customer Experience</p>
        <h2
          className="scene-title"
          id="booking-entry-title"
          ref={headingRef}
          tabIndex={active ? -1 : undefined}
        >
          Don’t Just Imagine It.
          <br />
          Experience It.
        </h2>
        <p className="lead-copy">
          A concept of what booking a ride could feel like when every step lives in one
          connected experience.
        </p>
        <PremiumButton onClick={() => setView("booking")}>Start a Booking</PremiumButton>
        <p className="booking-entry__note">
          Controlled local demo · No live fare, map, booking, or payment services
        </p>
      </div>
      <div className="booking-entry__device" aria-hidden="true">
        <div className="booking-entry__device-bar">
          <span />
          <span />
        </div>
        <div className="booking-entry__device-route">
          <span />
          <span />
          <span />
        </div>
        <div className="booking-entry__device-card">
          <span />
          <span />
          <span />
        </div>
      </div>
    </SceneShell>
  );
}
