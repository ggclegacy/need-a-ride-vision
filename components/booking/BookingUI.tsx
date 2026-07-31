import type { ReactNode } from "react";

export function ConceptBadge({ children = "Concept Preview" }: { children?: ReactNode }) {
  return <span className="concept-badge">{children}</span>;
}

export const BOOKING_PROGRESS_STEPS = [
  "Route",
  "Timing",
  "Details",
  "Estimate",
  "Payment",
  "Confirmed",
] as const;

export function BookingProgress({ current }: { current: number }) {
  return (
    <nav className="booking-progress" aria-label="Booking progress">
      <p className="booking-progress__count">
        Step {current} of {BOOKING_PROGRESS_STEPS.length}
        <span>{BOOKING_PROGRESS_STEPS[current - 1]}</span>
      </p>
      <ol className="booking-progress__steps">
        {BOOKING_PROGRESS_STEPS.map((label, index) => {
          const step = index + 1;
          const state =
            step < current ? "complete" : step === current ? "current" : "upcoming";

          return (
            <li
              className={`booking-progress__step booking-progress__step--${state}`}
              key={label}
              aria-current={state === "current" ? "step" : undefined}
            >
              <span className="booking-progress__marker" aria-hidden="true">
                {state === "complete" ? "✓" : step}
              </span>
              <span className="booking-progress__label">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

interface Choice<T extends string | number> {
  label: string;
  value: T;
}

interface ChoiceGroupProps<T extends string | number> {
  legend: string;
  name: string;
  value: T;
  choices: readonly Choice<T>[];
  onChange: (value: T) => void;
}

export function ChoiceGroup<T extends string | number>({
  legend,
  name,
  value,
  choices,
  onChange,
}: ChoiceGroupProps<T>) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      <div className="choice-group__options">
        {choices.map((choice) => (
          <label
            className={`choice-control ${
              choice.value === value ? "choice-control--selected" : ""
            }`}
            key={String(choice.value)}
          >
            <input
              checked={choice.value === value}
              name={name}
              onChange={() => onChange(choice.value)}
              type="radio"
              value={choice.value}
            />
            <span>{choice.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function RouteVisual({
  pickup,
  destination,
  stop,
}: {
  pickup: string;
  destination: string;
  stop?: string;
}) {
  return (
    <div className="route-visual" aria-label="Concept route preview">
      <div className="route-visual__rail" aria-hidden="true">
        <span className="route-visual__node route-visual__node--start" />
        {stop ? <span className="route-visual__node route-visual__node--stop" /> : null}
        <span className="route-visual__car">NAR</span>
        <span className="route-visual__node route-visual__node--end" />
      </div>
      <div className="route-visual__locations">
        <p>
          <span>Pickup</span>
          {pickup || "Your pickup"}
        </p>
        {stop ? (
          <p>
            <span>Stop</span>
            {stop}
          </p>
        ) : null}
        <p>
          <span>Destination</span>
          {destination || "Your destination"}
        </p>
      </div>
      <p className="route-visual__note">Visual route concept — no live map or routing</p>
    </div>
  );
}

export function SummaryList({
  items,
}: {
  items: readonly { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="booking-summary-list">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function BookingActions({
  backLabel = "Back",
  nextLabel,
  onBack,
  disabled = false,
}: {
  backLabel?: string;
  nextLabel: string;
  onBack?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="booking-actions">
      {onBack ? (
        <button className="booking-button booking-button--secondary" onClick={onBack} type="button">
          <span aria-hidden="true">←</span>
          {backLabel}
        </button>
      ) : <span />}
      <button className="booking-button booking-button--primary" disabled={disabled} type="submit">
        {nextLabel}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
