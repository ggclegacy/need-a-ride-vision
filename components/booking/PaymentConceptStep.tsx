"use client";

import { useEffect, useState } from "react";
import { BookingActions, ConceptBadge } from "./BookingUI";
import { formatConceptCurrency } from "./booking-model";

interface PaymentConceptStepProps {
  estimate: number;
  onBack: () => void;
  onComplete: () => void;
}

type PaymentPhase = "idle" | "securing" | "authorized" | "confirmed";

export function PaymentConceptStep({
  estimate,
  onBack,
  onComplete,
}: PaymentConceptStepProps) {
  const [phase, setPhase] = useState<PaymentPhase>("idle");

  useEffect(() => {
    if (phase === "idle") {
      return;
    }

    const nextTimer = window.setTimeout(() => {
      if (phase === "securing") {
        setPhase("authorized");
        return;
      }

      if (phase === "authorized") {
        setPhase("confirmed");
        return;
      }

      onComplete();
    }, phase === "confirmed" ? 270 : 320);

    return () => {
      window.clearTimeout(nextTimer);
    };
  }, [onComplete, phase]);

  if (phase !== "idle") {
    const status =
      phase === "securing"
        ? "Securing booking"
        : phase === "authorized"
          ? "Payment authorized"
          : "Ride confirmed";

    return (
      <section className="payment-processing" aria-live="assertive" aria-busy="true">
        <div className="payment-processing__mark" aria-hidden="true">
          {phase === "securing" ? "•••" : "✓"}
        </div>
        <ConceptBadge />
        <h3 id="booking-step-heading" tabIndex={-1}>{status}</h3>
        <p>No funds are moving. This is a controlled confirmation preview.</p>
      </section>
    );
  }

  return (
    <form
      className="booking-step payment-step"
      onSubmit={(event) => {
        event.preventDefault();
        setPhase("securing");
      }}
    >
      <div className="booking-step__heading">
        <div className="booking-step__eyebrow-row">
          <p className="booking-step__eyebrow">Booking + Payment</p>
          <ConceptBadge />
        </div>
        <h3 id="booking-step-heading" tabIndex={-1}>
          One connected flow
        </h3>
        <p>A Square-powered payment could complete the same experience.</p>
      </div>

      <div className="payment-layout">
        <div className="payment-methods">
          <fieldset className="payment-method-selector">
            <legend>Payment method</legend>
            <label className="payment-method payment-method--selected">
              <input checked name="payment-method" readOnly type="radio" />
              <span className="payment-method__icon" aria-hidden="true">••••</span>
              <span>
                <strong>Demo Card</strong>
                <small>Selected for this concept</small>
              </span>
              <span className="payment-method__check" aria-hidden="true">✓</span>
            </label>
            <button className="payment-method" disabled type="button">
              <span className="payment-method__icon" aria-hidden="true">A</span>
              <span>
                <strong>Apple Pay</strong>
                <small>Future device-supported option</small>
              </span>
            </button>
            <button className="payment-method" disabled type="button">
              <span className="payment-method__icon" aria-hidden="true">G</span>
              <span>
                <strong>Google Pay</strong>
                <small>Future device-supported option</small>
              </span>
            </button>
          </fieldset>

          <div className="demo-card-fields" aria-describedby="demo-payment-note">
            <label className="booking-field demo-card-fields__number">
              <span>Card number</span>
              <input aria-readonly="true" readOnly value="4242 •••• •••• 4242" />
            </label>
            <label className="booking-field">
              <span>Expiration</span>
              <input aria-readonly="true" readOnly value="12 / 30" />
            </label>
            <label className="booking-field">
              <span>CVV</span>
              <input aria-readonly="true" readOnly value="•••" />
            </label>
            <label className="booking-field">
              <span>ZIP</span>
              <input aria-readonly="true" readOnly value="70501" />
            </label>
          </div>
          <p className="field-help" id="demo-payment-note">
            Controlled display values only. Do not enter real payment information.
          </p>
        </div>

        <aside className="payment-summary">
          <p>Payment summary</p>
          <div>
            <span>Concept Total</span>
            <strong>{formatConceptCurrency(estimate)}</strong>
          </div>
          <p className="payment-summary__note">
            No real taxes or fees are represented. Final pricing would be configured
            during discovery.
          </p>
          <p className="square-concept-note">
            <span aria-hidden="true">□</span>
            Secure payment powered by Square
            <small>Concept Preview — no active integration</small>
          </p>
        </aside>
      </div>

      <p className="no-payment-note">No payment will be processed.</p>
      <BookingActions
        nextLabel="Complete Demo Booking"
        onBack={onBack}
      />
    </form>
  );
}
