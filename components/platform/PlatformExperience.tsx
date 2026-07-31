"use client";

import { useEffect, useState } from "react";
import {
  CUSTOMER_PROFILES,
  DISPATCH_RIDES,
  DRIVER_RIDE_STATES,
  FLEET_VEHICLES,
  FUTURE_INTEGRATIONS,
  PLATFORM_MODULES,
  type DriverRideState,
  type PlatformModuleId,
} from "./platform-model";
import {
  AnalyticsPlatformView,
  CustomerPlatformView,
  DispatchPlatformView,
  DriverPlatformView,
  FleetPlatformView,
  FuturePlatformView,
} from "./PlatformViews";

export function PlatformExperience({ onComplete }: { onComplete: () => void }) {
  const [activeModule, setActiveModule] = useState<PlatformModuleId>("driver");
  const [driverRideState, setDriverRideState] = useState<DriverRideState>("Accepted");
  const [selectedVehicleId, setSelectedVehicleId] = useState(FLEET_VEHICLES[0].id);
  const [selectedRideId, setSelectedRideId] = useState(DISPATCH_RIDES[0].id);
  const [selectedCustomerId, setSelectedCustomerId] = useState(CUSTOMER_PROFILES[0].id);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState(FUTURE_INTEGRATIONS[0].id);
  const [announcement, setAnnouncement] = useState("");

  const moduleIndex = PLATFORM_MODULES.findIndex((item) => item.id === activeModule);
  const activeModuleDetails = PLATFORM_MODULES[moduleIndex];

  useEffect(() => {
    const focusTimer = window.setTimeout(() => {
      document.getElementById("platform-view-heading")?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(focusTimer);
  }, [activeModule]);

  const changeModule = (moduleId: PlatformModuleId) => {
    setActiveModule(moduleId);
    const nextModule = PLATFORM_MODULES.find((item) => item.id === moduleId);
    setAnnouncement(`${nextModule?.label ?? "Platform"} concept opened.`);
  };

  const advanceDriverRide = () => {
    const currentIndex = DRIVER_RIDE_STATES.indexOf(driverRideState);
    const nextState = DRIVER_RIDE_STATES[currentIndex + 1];
    if (nextState) {
      setDriverRideState(nextState);
      setAnnouncement(`Driver ride moved to ${nextState}. Concept data updated locally.`);
    }
  };

  return (
    <div className="platform-product-shell">
      <header className="platform-product-shell__header">
        <div className="platform-product-shell__brand">
          <span aria-hidden="true">NAR</span>
          <p>Need A Ride<small>Operations Platform Vision</small></p>
        </div>
        <div className="platform-product-shell__context">
          <span>{activeModuleDetails.number} / {String(PLATFORM_MODULES.length).padStart(2, "0")}</span>
          <p>{activeModuleDetails.label}<small>Controlled concept preview</small></p>
        </div>
      </header>

      <nav className="platform-module-nav" aria-label="Operations platform modules">
        {PLATFORM_MODULES.map((item) => (
          <button
            aria-current={activeModule === item.id ? "page" : undefined}
            className={activeModule === item.id ? "platform-module-nav__active" : ""}
            key={item.id}
            onClick={() => changeModule(item.id)}
            type="button"
          >
            <span>{item.number}</span>
            <strong className="platform-module-nav__full">{item.label}</strong>
            <strong className="platform-module-nav__short">{item.shortLabel}</strong>
          </button>
        ))}
      </nav>

      <div className={`platform-product-shell__content platform-product-view--${activeModule}`}>
        {activeModule === "driver" ? (
          <DriverPlatformView onAdvance={advanceDriverRide} rideState={driverRideState} />
        ) : null}
        {activeModule === "fleet" ? (
          <FleetPlatformView onSelectVehicle={setSelectedVehicleId} selectedVehicleId={selectedVehicleId} />
        ) : null}
        {activeModule === "dispatch" ? (
          <DispatchPlatformView onSelectRide={setSelectedRideId} selectedRideId={selectedRideId} />
        ) : null}
        {activeModule === "customers" ? (
          <CustomerPlatformView onSelectCustomer={setSelectedCustomerId} selectedCustomerId={selectedCustomerId} />
        ) : null}
        {activeModule === "analytics" ? <AnalyticsPlatformView /> : null}
        {activeModule === "future" ? (
          <FuturePlatformView
            onSelectIntegration={setSelectedIntegrationId}
            selectedIntegrationId={selectedIntegrationId}
          />
        ) : null}
      </div>

      <footer className="platform-product-shell__footer">
        <p>
          {activeModule === "future"
            ? "Future modules stay behind a clear discovery and readiness gate."
            : `${activeModuleDetails.eyebrow}. Explore every module or continue when ready.`}
        </p>
        {moduleIndex < PLATFORM_MODULES.length - 1 ? (
          <button onClick={() => changeModule(PLATFORM_MODULES[moduleIndex + 1].id)} type="button">
            Next: {PLATFORM_MODULES[moduleIndex + 1].shortLabel}<span aria-hidden="true">→</span>
          </button>
        ) : (
          <button onClick={onComplete} type="button">
            Continue to Growth<span aria-hidden="true">→</span>
          </button>
        )}
      </footer>

      <p className="visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}
