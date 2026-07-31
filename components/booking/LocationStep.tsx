import type { FormEvent } from "react";
import { BookingActions, RouteVisual } from "./BookingUI";
import { DEMO_LOCATIONS, type BookingData } from "./booking-model";

interface LocationStepProps {
  data: BookingData;
  error: string;
  onChange: (updates: Partial<BookingData>) => void;
  onContinue: () => void;
}

export function LocationStep({
  data,
  error,
  onChange,
  onContinue,
}: LocationStepProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <form className="booking-step" onSubmit={handleSubmit}>
      <div className="booking-step__heading">
        <p className="booking-step__eyebrow">Build your route</p>
        <h3 id="booking-step-heading" tabIndex={-1}>
          Where are you going?
        </h3>
        <p>Start with the two places that matter. Add a stop only if you need one.</p>
      </div>

      <div className="location-layout">
        <div className="location-fields">
          <label className="booking-field">
            <span>Pickup location</span>
            <span className="booking-field__input">
              <span className="location-dot location-dot--pickup" aria-hidden="true" />
              <input
                aria-describedby={error ? "location-error" : undefined}
                autoComplete="street-address"
                list="need-a-ride-locations"
                onChange={(event) => onChange({ pickup: event.target.value })}
                placeholder="Enter a pickup area or address"
                value={data.pickup}
              />
            </span>
          </label>

          <label className="booking-field">
            <span>Destination</span>
            <span className="booking-field__input">
              <span className="location-dot location-dot--destination" aria-hidden="true" />
              <input
                aria-describedby={error ? "location-error" : undefined}
                autoComplete="street-address"
                list="need-a-ride-locations"
                onChange={(event) => onChange({ destination: event.target.value })}
                placeholder="Enter a destination"
                value={data.destination}
              />
            </span>
          </label>

          {data.additionalStop ? (
            <label className="booking-field booking-field--revealed">
              <span>Additional stop</span>
              <span className="booking-field__input">
                <span className="location-dot location-dot--stop" aria-hidden="true" />
                <input
                  aria-describedby={error ? "location-error" : undefined}
                  list="need-a-ride-locations"
                  onChange={(event) => onChange({ stopLocation: event.target.value })}
                  placeholder="Enter a stop"
                  value={data.stopLocation}
                />
              </span>
            </label>
          ) : null}

          <button
            className="text-action"
            onClick={() =>
              onChange(
                data.additionalStop
                  ? { additionalStop: false, stopLocation: "" }
                  : { additionalStop: true },
              )
            }
            type="button"
          >
            <span aria-hidden="true">{data.additionalStop ? "−" : "+"}</span>
            {data.additionalStop ? "Remove stop" : "Add stop"}
          </button>

          <p className="field-help">
            Demo suggestions only — custom locations are welcome. No live address search is active.
          </p>
          <datalist id="need-a-ride-locations">
            {DEMO_LOCATIONS.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>

          {error ? (
            <p className="booking-error" id="location-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <RouteVisual
          destination={data.destination}
          pickup={data.pickup}
          stop={data.additionalStop ? data.stopLocation : undefined}
        />
      </div>

      <BookingActions nextLabel="Choose Ride Time" />
    </form>
  );
}
