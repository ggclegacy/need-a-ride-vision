import type { FormEvent } from "react";
import { BookingActions, ChoiceGroup } from "./BookingUI";
import type { BookingData, RideTiming, TripType } from "./booking-model";

interface ScheduleStepProps {
  data: BookingData;
  error: string;
  onBack: () => void;
  onChange: (updates: Partial<BookingData>) => void;
  onContinue: () => void;
}

export function ScheduleStep({
  data,
  error,
  onBack,
  onChange,
  onContinue,
}: ScheduleStepProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <form className="booking-step" onSubmit={handleSubmit}>
      <div className="booking-step__heading">
        <p className="booking-step__eyebrow">Set the timing</p>
        <h3 id="booking-step-heading" tabIndex={-1}>
          When do you need the ride?
        </h3>
        <p>Choose an immediate pickup or reserve a future time.</p>
      </div>

      <div className="schedule-grid">
        <ChoiceGroup<RideTiming>
          choices={[
            { label: "Ride Now", value: "now" },
            { label: "Schedule Later", value: "later" },
          ]}
          legend="Ride timing"
          name="ride-timing"
          onChange={(rideTiming) => onChange({ rideTiming })}
          value={data.rideTiming}
        />

        {data.rideTiming === "later" ? (
          <div className="date-time-grid booking-reveal">
            <label className="booking-field">
              <span>Pickup date</span>
              <input
                onChange={(event) => onChange({ rideDate: event.target.value })}
                type="date"
                value={data.rideDate}
              />
            </label>
            <label className="booking-field">
              <span>Pickup time</span>
              <input
                onChange={(event) => onChange({ rideTime: event.target.value })}
                type="time"
                value={data.rideTime}
              />
            </label>
          </div>
        ) : (
          <div className="now-callout">
            <span className="now-callout__indicator" aria-hidden="true" />
            <div>
              <strong>Ready when you are</strong>
              <p>This concept would move directly into availability and confirmation.</p>
            </div>
          </div>
        )}

        <ChoiceGroup<TripType>
          choices={[
            { label: "One Way", value: "one-way" },
            { label: "Round Trip", value: "round-trip" },
          ]}
          legend="Trip type"
          name="trip-type"
          onChange={(tripType) => onChange({ tripType })}
          value={data.tripType}
        />

        {data.tripType === "round-trip" ? (
          <div className="date-time-grid booking-reveal">
            <label className="booking-field">
              <span>Return date</span>
              <input
                onChange={(event) => onChange({ returnDate: event.target.value })}
                type="date"
                value={data.returnDate}
              />
            </label>
            <label className="booking-field">
              <span>Return time</span>
              <input
                onChange={(event) => onChange({ returnTime: event.target.value })}
                type="time"
                value={data.returnTime}
              />
            </label>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="booking-error" role="alert">
          {error}
        </p>
      ) : null}

      <BookingActions nextLabel="Add Trip Details" onBack={onBack} />
    </form>
  );
}
