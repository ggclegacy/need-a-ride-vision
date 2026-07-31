import type { ReactNode } from "react";
import type { DispatchState, FleetState } from "./platform-model";

export function PlatformConceptBadge({ children = "Concept data" }: { children?: ReactNode }) {
  return (
    <span className="platform-concept-badge">
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export function PlatformPanel({
  children,
  className = "",
  eyebrow,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <section className={`platform-panel ${className}`.trim()}>
      <header className="platform-panel__header">
        <div>
          <p>{eyebrow}</p>
          <h4>{title}</h4>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function PlatformStatusBadge({
  state,
}: {
  state: FleetState | DispatchState | string;
}) {
  const className = state.toLowerCase().replaceAll(" ", "-");
  return <span className={`platform-status platform-status--${className}`}>{state}</span>;
}

export function PlatformViewHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="platform-view-heading">
      <div>
        <p>{eyebrow}</p>
        <h3 id="platform-view-heading" tabIndex={-1}>{title}</h3>
        <span>{copy}</span>
      </div>
      <PlatformConceptBadge />
    </div>
  );
}
