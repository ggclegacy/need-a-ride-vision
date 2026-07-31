"use client";

import { useCallback, useEffect, useState } from "react";
import { MoneyOperationsView } from "./MoneyOperationsView";
import { OperationsOverview } from "./OperationsOverview";
import { OPERATIONS_NAV } from "./OperationsUI";
import { PeopleOperationsView } from "./PeopleOperationsView";
import { RideOperationsView } from "./RideOperationsView";
import {
  INITIAL_OPERATIONS_RIDES,
  nextRideStatus,
  type OperationsRide,
  type OperationsView,
} from "./operations-model";

interface OperationsExperienceProps {
  onComplete: () => void;
}

export function OperationsExperience({ onComplete }: OperationsExperienceProps) {
  const [activeView, setActiveView] = useState<OperationsView>("overview");
  const [rides, setRides] = useState<OperationsRide[]>(INITIAL_OPERATIONS_RIDES);
  const [selectedRideId, setSelectedRideId] = useState(INITIAL_OPERATIONS_RIDES[0].id);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const focusTimer = window.setTimeout(() => {
      document.getElementById("operations-view-heading")?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(focusTimer);
  }, [activeView]);

  const changeView = useCallback((view: OperationsView) => {
    setActiveView(view);
  }, []);

  const openRide = (rideId: string) => {
    setSelectedRideId(rideId);
    setActiveView("rides");
  };

  const assignDriver = (rideId: string, driver: string) => {
    setRides((current) =>
      current.map((ride) =>
        ride.id === rideId
          ? { ...ride, driver, status: "Confirmed" }
          : ride,
      ),
    );
    setAnnouncement(`${driver} assigned to ${rideId}. Concept data updated locally.`);
  };

  const advanceRide = (rideId: string) => {
    const currentRide = rides.find((ride) => ride.id === rideId);
    if (!currentRide) {
      return;
    }

    const updatedStatus = nextRideStatus(currentRide.status);
    setRides((current) =>
      current.map((ride) =>
        ride.id === rideId ? { ...ride, status: updatedStatus } : ride,
      ),
    );
    setAnnouncement(`${rideId} moved to ${updatedStatus}. Concept data updated locally.`);
  };

  return (
    <div className="operations-product-shell">
      <header className="operations-product-shell__header">
        <div className="operations-product-shell__brand">
          <span aria-hidden="true">NAR</span>
          <p>Need A Ride<small>Owner Command Center</small></p>
        </div>
        <div className="operations-product-shell__context">
          <span><i aria-hidden="true" /> Concept preview</span>
          <p>Today<small>Operations snapshot</small></p>
        </div>
      </header>

      <nav className="operations-nav" aria-label="Command center sections">
        {OPERATIONS_NAV.map((item) => (
          <button
            aria-current={activeView === item.id ? "page" : undefined}
            className={activeView === item.id ? "operations-nav__active" : ""}
            key={item.id}
            onClick={() => changeView(item.id)}
            type="button"
          >
            <span className="operations-nav__full">{item.label}</span>
            <span className="operations-nav__short">{item.shortLabel}</span>
          </button>
        ))}
      </nav>

      <div className={`operations-product-shell__content operations-product-view--${activeView}`}>
        {activeView === "overview" ? (
          <OperationsOverview rides={rides} onOpenRide={openRide} onViewChange={changeView} />
        ) : null}
        {activeView === "rides" ? (
          <RideOperationsView
            onAdvance={advanceRide}
            onAssign={assignDriver}
            onSelectRide={setSelectedRideId}
            rides={rides}
            selectedRideId={selectedRideId}
          />
        ) : null}
        {activeView === "people" ? <PeopleOperationsView /> : null}
        {activeView === "money" ? <MoneyOperationsView /> : null}
      </div>

      <footer className="operations-product-shell__footer">
        <p>Explore the concept, then continue to the growth vision.</p>
        <button onClick={onComplete} type="button">
          Continue the Vision <span aria-hidden="true">→</span>
        </button>
      </footer>

      <p className="visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}
