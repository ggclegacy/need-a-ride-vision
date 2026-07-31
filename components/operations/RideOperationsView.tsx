import { useMemo, useState } from "react";
import { ConceptDataNote, OperationsPanel, RideStatusBadge } from "./OperationsUI";
import {
  OPERATIONS_DRIVERS,
  formatOperationsCurrency,
  type OperationsRide,
} from "./operations-model";

type RideFilter = "all" | "attention" | "active";

interface RideOperationsViewProps {
  rides: OperationsRide[];
  selectedRideId: string;
  onAssign: (rideId: string, driver: string) => void;
  onSelectRide: (rideId: string) => void;
  onAdvance: (rideId: string) => void;
}

export function RideOperationsView({
  rides,
  selectedRideId,
  onAssign,
  onSelectRide,
  onAdvance,
}: RideOperationsViewProps) {
  const [filter, setFilter] = useState<RideFilter>("all");
  const selectedRide = rides.find((ride) => ride.id === selectedRideId) ?? rides[0];
  const filteredRides = useMemo(() => {
    if (filter === "attention") {
      return rides.filter((ride) => ride.status === "Needs assignment");
    }
    if (filter === "active") {
      return rides.filter((ride) =>
        ["Driver en route", "Passenger onboard"].includes(ride.status),
      );
    }
    return rides;
  }, [filter, rides]);

  return (
    <div className="operations-view ride-operations-view">
      <div className="operations-view__heading">
        <div>
          <p>Ride operations</p>
          <h3 id="operations-view-heading" tabIndex={-1}>Know what is happening next.</h3>
        </div>
        <ConceptDataNote />
      </div>

      <div className="ride-filter-bar" aria-label="Filter ride schedule">
        {([
          ["all", "All rides"],
          ["attention", "Needs attention"],
          ["active", "In progress"],
        ] as const).map(([value, label]) => (
          <button
            aria-pressed={filter === value}
            className={filter === value ? "ride-filter-bar__active" : ""}
            key={value}
            onClick={() => setFilter(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="ride-operations-layout">
        <OperationsPanel className="ride-board" eyebrow="Concept day board" title="Friday schedule">
          <div className="ride-board__list">
            {filteredRides.length ? filteredRides.map((ride) => (
              <button
                aria-pressed={selectedRide.id === ride.id}
                className={selectedRide.id === ride.id ? "ride-board__ride--selected" : ""}
                key={ride.id}
                onClick={() => onSelectRide(ride.id)}
                type="button"
              >
                <span className="ride-board__time">{ride.time}</span>
                <span className="ride-board__identity">
                  <strong>{ride.customer}</strong>
                  <small>{ride.id} · {ride.category}</small>
                </span>
                <span className="ride-board__driver">
                  <small>Driver</small>
                  <strong>{ride.driver ?? "Unassigned"}</strong>
                </span>
                <RideStatusBadge status={ride.status} />
              </button>
            )) : (
              <p className="operations-empty-state">No rides match this concept filter.</p>
            )}
          </div>
        </OperationsPanel>

        <aside className="ride-detail-panel" aria-label={`Details for ${selectedRide.id}`}>
          <div className="ride-detail-panel__topline">
            <div>
              <span>{selectedRide.id}</span>
              <h4>{selectedRide.customer}</h4>
            </div>
            <RideStatusBadge status={selectedRide.status} />
          </div>

          <div className="ride-detail-route">
            <p><span>Pickup · {selectedRide.time}</span>{selectedRide.pickup}</p>
            <p><span>Destination</span>{selectedRide.destination}</p>
          </div>

          <dl className="ride-detail-facts">
            <div><dt>Trip</dt><dd>{selectedRide.category}</dd></div>
            <div><dt>Payment</dt><dd>{selectedRide.payment}</dd></div>
            <div><dt>Concept fare</dt><dd>{formatOperationsCurrency(selectedRide.amount)}</dd></div>
            <div><dt>Driver</dt><dd>{selectedRide.driver ?? "Needs assignment"}</dd></div>
          </dl>

          {selectedRide.driver ? (
            <button
              className="operations-primary-action"
              disabled={selectedRide.status === "Completed"}
              onClick={() => onAdvance(selectedRide.id)}
              type="button"
            >
              {selectedRide.status === "Completed" ? "Ride completed" : "Advance demo status"}
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <div className="driver-assignment">
              <p>Assign an available driver</p>
              {OPERATIONS_DRIVERS.filter((driver) => driver.status === "Available").map((driver) => (
                <button key={driver.name} onClick={() => onAssign(selectedRide.id, driver.name)} type="button">
                  <span>{driver.initials}</span>
                  <span><strong>{driver.name}</strong><small>{driver.vehicle}</small></span>
                  <span aria-hidden="true">+</span>
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
