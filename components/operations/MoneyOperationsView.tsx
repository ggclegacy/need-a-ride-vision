import { ConceptDataNote, OperationsMetric, OperationsPanel } from "./OperationsUI";
import { CONCEPT_PAYMENTS, formatOperationsCurrency } from "./operations-model";

export function MoneyOperationsView() {
  return (
    <div className="operations-view money-operations-view">
      <div className="operations-view__heading">
        <div>
          <p>Payment visibility</p>
          <h3 id="operations-view-heading" tabIndex={-1}>Know what was paid—and what was not.</h3>
        </div>
        <ConceptDataNote />
      </div>

      <div className="operations-metrics operations-metrics--money">
        <OperationsMetric label="Collected today" note="Fictional concept data" tone="gold" value="$612" />
        <OperationsMetric label="Deposits" note="4 future rides secured" value="$146" />
        <OperationsMetric label="Payment due" note="2 rides need follow-up" tone="red" value="$105" />
        <OperationsMetric label="Average ride" note="Sample reporting" value="$44" />
      </div>

      <div className="money-operations-grid">
        <OperationsPanel eyebrow="Connected transactions" title="Recent payment activity">
          <div className="concept-payment-table" role="table" aria-label="Concept payment activity">
            <div className="concept-payment-table__head" role="row">
              <span role="columnheader">Customer</span>
              <span role="columnheader">Reference</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Amount</span>
            </div>
            {CONCEPT_PAYMENTS.map((payment) => (
              <div className="concept-payment-table__row" key={payment.id} role="row">
                <span role="cell"><strong>{payment.customer}</strong><small>{payment.time}</small></span>
                <span role="cell">{payment.id}</span>
                <span role="cell" className={`concept-payment-status concept-payment-status--${payment.status.toLowerCase()}`}>
                  {payment.status}
                </span>
                <span role="cell">{formatOperationsCurrency(payment.amount)}</span>
              </div>
            ))}
          </div>
        </OperationsPanel>

        <OperationsPanel className="payment-connection-panel" eyebrow="Square vision" title="Booking and payment, together">
          <div className="payment-connection-visual" aria-hidden="true">
            <span>Quote</span><i>→</i><span>Booking</span><i>→</i><span>Payment</span>
          </div>
          <ul>
            <li><span aria-hidden="true">✓</span> See payment status beside every ride</li>
            <li><span aria-hidden="true">✓</span> Separate deposits from paid balances</li>
            <li><span aria-hidden="true">✓</span> Find follow-up needs without searching messages</li>
            <li><span aria-hidden="true">✓</span> Build reporting around actual operations</li>
          </ul>
          <p>No Square API or financial data is connected in this preview.</p>
        </OperationsPanel>
      </div>
    </div>
  );
}
