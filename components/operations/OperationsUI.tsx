import type { ReactNode } from "react";
import type { OperationsRide, OperationsView } from "./operations-model";

export const OPERATIONS_NAV: readonly {
  id: OperationsView;
  label: string;
  shortLabel: string;
}[] = [
  { id: "overview", label: "Overview", shortLabel: "Home" },
  { id: "rides", label: "Ride Operations", shortLabel: "Rides" },
  { id: "people", label: "People", shortLabel: "People" },
  { id: "money", label: "Payments", shortLabel: "Money" },
];

export function OperationsMetric({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note: string;
  tone?: "neutral" | "gold" | "red";
}) {
  return (
    <article className={`operations-metric operations-metric--${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

export function OperationsPanel({
  title,
  eyebrow,
  action,
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`operations-panel ${className}`.trim()}>
      <header className="operations-panel__header">
        <div>
          {eyebrow ? <p>{eyebrow}</p> : null}
          <h4>{title}</h4>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function RideStatusBadge({ status }: { status: OperationsRide["status"] }) {
  const state =
    status === "Needs assignment"
      ? "attention"
      : status === "Completed"
        ? "complete"
        : "active";

  return (
    <span className={`ride-state-badge ride-state-badge--${state}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

export function ConceptDataNote() {
  return (
    <p className="operations-concept-note">
      <span aria-hidden="true">◇</span>
      Controlled concept data · Nothing shown is connected to live operations
    </p>
  );
}
