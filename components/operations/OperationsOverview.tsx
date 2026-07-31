import {
  ConceptDataNote,
  OperationsMetric,
  OperationsPanel,
  RideStatusBadge,
} from "./OperationsUI";
import {
  formatOperationsCurrency,
  type OperationsRide,
  type OperationsView,
} from "./operations-model";

interface OperationsOverviewProps {
  rides: OperationsRide[];
  onOpenRide: (rideId: string) => void;
  onViewChange: (view: OperationsView) => void;
}

export function OperationsOverview({
  rides,
  onOpenRide,
  onViewChange,
}: OperationsOverviewProps) {
  const needsAttention = rides.filter((ride) => ride.status === "Needs assignment");
  const conceptTotal = rides.reduce((total, ride) => total + ride.amount, 0);

  return (
    <div className="operations-view operations-overview">
      <div className="operations-view__heading">
        <div>
          <p>Owner overview</p>
          <h3 id="operations-view-heading" tabIndex={-1}>
            The whole day, at a glance.
          </h3>
        </div>
        <ConceptDataNote />
      </div>

      <div className="operations-metrics">
        <OperationsMetric label="Rides today" note="5 in this preview" value="08" />
        <OperationsMetric
          label="Needs attention"
          note="Unassigned rides"
          tone="red"
          value={String(needsAttention.length).padStart(2, "0")}
        />
        <OperationsMetric
          label="Concept booked"
          note="Sample ride value"
          tone="gold"
          value={formatOperationsCurrency(conceptTotal)}
        />
        <OperationsMetric label="Active drivers" note="2 available now" value="04" />
      </div>

      <div className="operations-overview__grid">
        <OperationsPanel
          action={
            <button className="operations-link" onClick={() => onViewChange("rides")} type="button">
              View all rides <span aria-hidden="true">→</span>
            </button>
          }
          eyebrow="Today’s movement"
          title="Ride schedule"
        >
          <div className="operations-schedule">
            {rides.slice(0, 4).map((ride) => (
              <button key={ride.id} onClick={() => onOpenRide(ride.id)} type="button">
                <time>{ride.time}</time>
                <span className="operations-schedule__route">
                  <strong>{ride.customer}</strong>
                  <small>{ride.pickup} → {ride.destination}</small>
                </span>
                <RideStatusBadge status={ride.status} />
              </button>
            ))}
          </div>
        </OperationsPanel>

        <OperationsPanel
          action={<span className="operations-panel__count">{needsAttention.length}</span>}
          eyebrow="Owner action queue"
          title="What needs you"
        >
          <div className="owner-action-queue">
            {needsAttention.map((ride) => (
              <button key={ride.id} onClick={() => onOpenRide(ride.id)} type="button">
                <span className="owner-action-queue__icon" aria-hidden="true">!</span>
                <span>
                  <strong>Assign {ride.id}</strong>
                  <small>{ride.time} · {ride.customer}</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
            <button onClick={() => onViewChange("money")} type="button">
              <span className="owner-action-queue__icon owner-action-queue__icon--gold" aria-hidden="true">$</span>
              <span>
                <strong>Review payment due</strong>
                <small>2 sample balances awaiting action</small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </OperationsPanel>
      </div>

      <div className="operations-signal-strip" aria-label="Connected operations benefits">
        <span><strong>01</strong> Every request captured</span>
        <span><strong>02</strong> Every ride visible</span>
        <span><strong>03</strong> Every payment connected</span>
      </div>
    </div>
  );
}
