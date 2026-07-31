import { ConceptBadge, SummaryList } from "./BookingUI";
import {
  type BookingData,
  formatConceptCurrency,
  formatRideTiming,
  passengerLabel,
} from "./booking-model";

const RIDE_STATUSES = [
  "Booked",
  "Confirmed",
  "Driver Assigned",
  "Driver En Route",
  "Passenger Picked Up",
  "Completed",
] as const;

const COMMUNICATION_PREVIEWS = [
  {
    label: "Booking confirmed",
    message: "Your ride is scheduled.",
    channel: "Confirmation",
  },
  {
    label: "Driver assigned",
    message: "You’ll receive driver details before pickup.",
    channel: "Future update",
  },
  {
    label: "Driver arriving",
    message: "Your driver is on the way.",
    channel: "Future update",
  },
  {
    label: "Receipt",
    message: "Payment receipt delivered automatically.",
    channel: "Future update",
  },
] as const;

interface BookingConfirmationStepProps {
  data: BookingData;
  estimate: number;
  onContinue: () => void;
}

export function BookingConfirmationStep({
  data,
  estimate,
  onContinue,
}: BookingConfirmationStepProps) {
  return (
    <section className="booking-step confirmation-step" aria-live="polite">
      <div className="confirmation-hero">
        <span className="confirmation-hero__mark" aria-hidden="true">✓</span>
        <ConceptBadge />
        <h3 id="booking-step-heading" tabIndex={-1}>
          Your Ride Is Confirmed
        </h3>
        <p>From quote to payment to confirmation — all in one connected experience.</p>
      </div>

      <article className="confirmed-ride-card">
        <div className="confirmed-ride-card__header">
          <div>
            <span>Booking</span>
            <strong>NAR-2048</strong>
          </div>
          <p>
            <span aria-hidden="true">✓</span>
            Confirmed
          </p>
        </div>

        <SummaryList
          items={[
            { label: "Pickup", value: data.pickup },
            { label: "Destination", value: data.destination },
            { label: "Date / Time", value: formatRideTiming(data) },
            { label: "Passengers", value: passengerLabel(data.passengers) },
            { label: "Payment", value: "Concept Paid" },
            { label: "Estimated Fare", value: formatConceptCurrency(estimate) },
          ]}
        />

        <div className="ride-status">
          <p>Ride status preview</p>
          <ol>
            {RIDE_STATUSES.map((status, index) => {
              const complete = index < 2;
              return (
                <li className={complete ? "ride-status__complete" : ""} key={status}>
                  <span aria-hidden="true">{complete ? "✓" : index + 1}</span>
                  <div>
                    <strong>{status}</strong>
                    <small>{complete ? "Completed" : "Upcoming"}</small>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </article>

      <div className="communication-preview">
        <div className="communication-preview__heading">
          <p className="booking-step__eyebrow">Automated communication preview</p>
          <h4>Customers always know what comes next.</h4>
          <p>Concept message previews only — nothing has been sent.</p>
        </div>
        <div className="communication-preview__grid">
          {COMMUNICATION_PREVIEWS.map((preview, index) => (
            <article key={preview.label}>
              <span className="communication-preview__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <small>{preview.channel}</small>
              <strong>{preview.label}</strong>
              <p>{preview.message}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="booking-actions booking-actions--confirmation">
        <span />
        <button
          className="booking-button booking-button--primary"
          onClick={onContinue}
          type="button"
        >
          Complete the Experience
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
