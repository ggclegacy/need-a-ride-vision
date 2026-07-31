import { BookingActions, ConceptBadge, SummaryList } from "./BookingUI";
import {
  type BookingData,
  formatConceptCurrency,
  formatReturnTiming,
  formatRideTiming,
  luggageLabel,
  passengerLabel,
} from "./booking-model";

interface BookingReviewStepProps {
  data: BookingData;
  estimate: number;
  onEdit: () => void;
  onContinue: () => void;
}

export function BookingReviewStep({
  data,
  estimate,
  onEdit,
  onContinue,
}: BookingReviewStepProps) {
  return (
    <form
      className="booking-step"
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
    >
      <div className="booking-step__heading">
        <div className="booking-step__eyebrow-row">
          <p className="booking-step__eyebrow">Booking review</p>
          <ConceptBadge />
        </div>
        <h3 id="booking-step-heading" tabIndex={-1}>
          One last look
        </h3>
        <p>Your trip details stay together from quote to payment.</p>
      </div>

      <article className="booking-review-card">
        <div className="booking-review-card__route">
          <p>
            <span>Pickup</span>
            {data.pickup}
          </p>
          <span className="booking-review-card__direction" aria-hidden="true">→</span>
          <p>
            <span>Destination</span>
            {data.destination}
          </p>
        </div>

        <SummaryList
          items={[
            { label: "Date / Time", value: formatRideTiming(data) },
            {
              label: "Trip type",
              value: data.tripType === "round-trip" ? "Round trip" : "One way",
            },
            ...(data.tripType === "round-trip"
              ? [{ label: "Return", value: formatReturnTiming(data) }]
              : []),
            { label: "Passengers", value: passengerLabel(data.passengers) },
            { label: "Luggage", value: luggageLabel(data.luggage) },
            {
              label: "Airport",
              value: data.airportTrip
                ? `Yes${data.flightNumber ? ` · ${data.flightNumber}` : ""}`
                : "No",
            },
            {
              label: "Stop",
              value: data.additionalStop ? data.stopLocation || "To be confirmed" : "None",
            },
            {
              label: "Instructions",
              value: data.specialInstructions || "None added",
            },
          ]}
        />

        <div className="booking-review-card__total">
          <span>Concept estimate</span>
          <strong>{formatConceptCurrency(estimate)}</strong>
        </div>
      </article>

      <BookingActions
        backLabel="Edit Trip"
        nextLabel="Continue to Payment"
        onBack={onEdit}
      />
    </form>
  );
}
