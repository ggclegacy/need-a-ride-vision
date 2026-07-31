"use client";

import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { BookingExperience } from "@/components/booking/BookingExperience";
import { GrowthExperience } from "@/components/growth/GrowthExperience";
import { OperationsExperience } from "@/components/operations/OperationsExperience";
import { PlatformExperience } from "@/components/platform/PlatformExperience";
import { RoadmapExperience } from "@/components/roadmap/RoadmapExperience";
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
  | "platform-entry"
  | "platform"
  | "growth-entry"
  | "growth"
  | "roadmap"
  | "next-steps";

export function BookingExperienceScene({
  active,
  headingRef,
}: BookingExperienceSceneProps) {
  const [view, setView] = useState<ExperienceView>("intro");
  const [priorityOpportunityIds, setPriorityOpportunityIds] = useState<readonly string[]>([]);
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
        <OperationsExperience onComplete={() => setView("platform-entry")} />
      </SceneShell>
    );
  }

  if (view === "platform") {
    return (
      <SceneShell className="booking-experience-scene platform-experience-scene" labelledBy="platform-product-title">
        <h2 className="visually-hidden" id="platform-product-title" ref={internalHeading} tabIndex={-1}>
          Operations Platform concept
        </h2>
        <PlatformExperience onComplete={() => setView("growth-entry")} />
      </SceneShell>
    );
  }

  if (view === "growth") {
    return (
      <SceneShell className="booking-experience-scene growth-experience-scene" labelledBy="growth-product-title">
        <h2 className="visually-hidden" id="growth-product-title" ref={internalHeading} tabIndex={-1}>
          Growth Opportunities concept
        </h2>
        <GrowthExperience
          onComplete={(shortlist) => {
            setPriorityOpportunityIds(shortlist);
            setView("roadmap");
          }}
        />
      </SceneShell>
    );
  }

  if (view === "roadmap") {
    return (
      <SceneShell className="booking-experience-scene roadmap-experience-scene" labelledBy="roadmap-product-title">
        <h2 className="visually-hidden" id="roadmap-product-title" ref={internalHeading} tabIndex={-1}>
          Phased build roadmap concept
        </h2>
        <RoadmapExperience
          onComplete={() => setView("next-steps")}
          priorityOpportunityIds={priorityOpportunityIds}
        />
      </SceneShell>
    );
  }

  if (view === "next-steps") {
    return (
      <SceneShell className="booking-experience-scene roadmap-next-steps" labelledBy="next-steps-title">
        <div className="roadmap-next-steps__content">
          <p className="eyebrow">Vision to Action</p>
          <h2 className="scene-title" id="next-steps-title" ref={internalHeading} tabIndex={-1}>
            The Next Step
            <br />
            Is Discovery.
          </h2>
          <p className="lead-copy">
            Confirm the operating truth, decide the first release boundary, and turn
            this vision into a roadmap Need A Ride can own.
          </p>
          <PremiumButton onClick={() => setView("roadmap")}>
            Return to the Roadmap
          </PremiumButton>
          <p className="booking-entry__note">
            Phase 2 owner intake remains a future build · Nothing has been submitted
          </p>
        </div>
        <div className="roadmap-next-steps__signal" aria-hidden="true">
          <span>Discover</span>
          <i />
          <span>Define</span>
          <i />
          <span>Build</span>
        </div>
      </SceneShell>
    );
  }

  if (view === "growth-entry") {
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
          <PremiumButton onClick={() => setView("growth")}>
            Explore Growth Opportunities
          </PremiumButton>
          <p className="booking-entry__note">
            Strategy concepts only · Every opportunity requires owner discovery
          </p>
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

  if (view === "platform-entry") {
    return (
      <SceneShell className="booking-experience-scene platform-entry" labelledBy="platform-entry-title">
        <div className="platform-entry__content">
          <p className="eyebrow">Beyond the Dashboard</p>
          <h2 className="scene-title" id="platform-entry-title" ref={internalHeading} tabIndex={-1}>
            The Operating System
            <br />
            Behind Every Ride.
          </h2>
          <p className="lead-copy">
            Connect the driver, the fleet, dispatch, customer relationships, and
            business intelligence without losing the personal service at the center.
          </p>
          <PremiumButton onClick={() => setView("platform")}>
            Explore the Operations Platform
          </PremiumButton>
          <p className="booking-entry__note">
            Six concept modules · Local sample data only · No live systems connected
          </p>
        </div>
        <div className="platform-entry__constellation" aria-hidden="true">
          <span className="platform-entry__center">NAR</span>
          <i />
          <span>Drivers</span>
          <span>Fleet</span>
          <span>Dispatch</span>
          <span>Customers</span>
          <span>Analytics</span>
          <span>Future</span>
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
