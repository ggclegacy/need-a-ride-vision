import { ConceptDataNote, OperationsPanel } from "./OperationsUI";
import { OPERATIONS_CUSTOMERS, OPERATIONS_DRIVERS } from "./operations-model";

export function PeopleOperationsView() {
  return (
    <div className="operations-view people-operations-view">
      <div className="operations-view__heading">
        <div>
          <p>Drivers + customers</p>
          <h3 id="operations-view-heading" tabIndex={-1}>The people behind every ride.</h3>
        </div>
        <ConceptDataNote />
      </div>

      <div className="people-operations-grid">
        <OperationsPanel eyebrow="Team visibility" title="Driver readiness">
          <div className="driver-roster">
            {OPERATIONS_DRIVERS.map((driver) => (
              <article key={driver.name}>
                <span className="driver-roster__avatar">{driver.initials}</span>
                <span className="driver-roster__identity">
                  <strong>{driver.name}</strong>
                  <small>{driver.vehicle}</small>
                </span>
                <span className={`driver-roster__status driver-roster__status--${driver.status.replace(" ", "-")}`}>
                  {driver.status}
                </span>
                <span className="driver-roster__rides">
                  <strong>{driver.rides}</strong>
                  <small>rides</small>
                </span>
              </article>
            ))}
          </div>
        </OperationsPanel>

        <OperationsPanel eyebrow="Relationship context" title="Customers worth knowing">
          <div className="customer-context-list">
            {OPERATIONS_CUSTOMERS.map((customer, index) => (
              <article key={customer.name}>
                <span className="customer-context-list__number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{customer.type}</small>
                  <strong>{customer.name}</strong>
                  <p>{customer.detail}</p>
                </div>
                <span>{customer.value}</span>
              </article>
            ))}
          </div>
        </OperationsPanel>
      </div>

      <div className="people-insight-banner">
        <p>One connected history</p>
        <strong>Fewer details trapped in text threads. More context available when the next ride comes in.</strong>
      </div>
    </div>
  );
}
