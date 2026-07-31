import type { FormEvent } from "react";
import { BookingActions, ChoiceGroup } from "./BookingUI";
import type {
  BookingData,
  LuggageOption,
  PassengerOption,
} from "./booking-model";

interface TripDetailsStepProps {
  data: BookingData;
  onBack: () => void;
  onChange: (updates: Partial<BookingData>) => void;
  onContinue: () => void;
}

export function TripDetailsStep({
  data,
  onBack,
  onChange,
  onContinue,
}: TripDetailsStepProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <form className="booking-step" onSubmit={handleSubmit}>
      <div className="booking-step__heading">
        <p className="booking-step__eyebrow">Personalize the ride</p>
        <h3 id="booking-step-heading" tabIndex={-1}>
          Tell us about the trip
        </h3>
        <p>A few details help shape the right ride experience.</p>
      </div>

      <div className="details-grid">
        <ChoiceGroup<PassengerOption>
          choices={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4+", value: 4 },
          ]}
          legend="Passengers"
          name="passengers"
          onChange={(passengers) => onChange({ passengers })}
          value={data.passengers}
        />

        <ChoiceGroup<LuggageOption>
          choices={[
            { label: "None", value: "none" },
            { label: "1–2 bags", value: "1-2" },
            { label: "3–4 bags", value: "3-4" },
            { label: "5+ bags", value: "5+" },
          ]}
          legend="Luggage"
          name="luggage"
          onChange={(luggage) => onChange({ luggage })}
          value={data.luggage}
        />

        <ChoiceGroup<"yes" | "no">
          choices={[
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" },
          ]}
          legend="Airport trip"
          name="airport"
          onChange={(value) => onChange({ airportTrip: value === "yes" })}
          value={data.airportTrip ? "yes" : "no"}
        />

        {data.airportTrip ? (
          <label className="booking-field booking-reveal">
            <span>Flight number <small>Optional</small></span>
            <input
              autoCapitalize="characters"
              onChange={(event) => onChange({ flightNumber: event.target.value })}
              placeholder="Example: AA 2841"
              value={data.flightNumber}
            />
          </label>
        ) : null}

        <ChoiceGroup<"yes" | "no">
          choices={[
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" },
          ]}
          legend="Additional stop"
          name="additional-stop"
          onChange={(value) =>
            onChange(
              value === "yes"
                ? { additionalStop: true }
                : { additionalStop: false, stopLocation: "" },
            )
          }
          value={data.additionalStop ? "yes" : "no"}
        />

        {data.additionalStop ? (
          <label className="booking-field booking-reveal">
            <span>Stop location</span>
            <input
              list="need-a-ride-locations"
              onChange={(event) => onChange({ stopLocation: event.target.value })}
              placeholder="Enter a stop"
              value={data.stopLocation}
            />
          </label>
        ) : null}

        <label className="booking-field details-grid__full">
          <span>Special instructions <small>Optional</small></span>
          <textarea
            maxLength={300}
            onChange={(event) => onChange({ specialInstructions: event.target.value })}
            placeholder="Child seat request, mobility assistance, large luggage, or pickup notes"
            rows={3}
            value={data.specialInstructions}
          />
        </label>
      </div>

      <BookingActions nextLabel="Build My Estimate" onBack={onBack} />
    </form>
  );
}
