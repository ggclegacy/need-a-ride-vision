import {
  ANALYTICS_METRICS,
  CUSTOMER_PROFILES,
  DESTINATION_TRENDS,
  DISPATCH_RIDES,
  DRIVER_RIDE_STATES,
  DRIVER_SCHEDULE,
  FLEET_VEHICLES,
  FUTURE_INTEGRATIONS,
  UTILIZATION_PREVIEW,
  type DriverRideState,
} from "./platform-model";
import {
  PlatformConceptBadge,
  PlatformPanel,
  PlatformStatusBadge,
  PlatformViewHeading,
} from "./PlatformUI";

export function DriverPlatformView({
  rideState,
  onAdvance,
}: {
  rideState: DriverRideState;
  onAdvance: () => void;
}) {
  const stateIndex = DRIVER_RIDE_STATES.indexOf(rideState);
  const actionLabel = DRIVER_RIDE_STATES[stateIndex + 1] ?? "Ride in progress";

  return (
    <div className="platform-view driver-platform-view">
      <PlatformViewHeading
        copy="One focused mobile workspace for assignments, trip details, updates, and the driver’s day."
        eyebrow="Driver experience"
        title="Everything the driver needs. Nothing they don’t."
      />

      <div className="driver-platform-layout">
        <div className="driver-app-device" aria-label="Driver mobile app concept">
          <div className="driver-app-device__topbar">
            <span>9:41</span>
            <PlatformConceptBadge>Driver app preview</PlatformConceptBadge>
          </div>
          <div className="driver-app-device__welcome">
            <p>Good morning, Andre</p>
            <span>3 rides on today’s schedule</span>
          </div>
          <article className="driver-current-ride">
            <div className="driver-current-ride__status">
              <span><i aria-hidden="true" /> Current assignment</span>
              <strong>{rideState}</strong>
            </div>
            <p className="driver-current-ride__time">8:15 AM <span>NAR-2048</span></p>
            <h4>Marcus T.</h4>
            <div className="driver-route">
              <p><i aria-hidden="true" /><span><small>Pickup</small>Downtown Lafayette</span></p>
              <p><i aria-hidden="true" /><span><small>Destination</small>Lafayette Regional Airport</span></p>
            </div>
            <dl className="driver-ride-facts">
              <div><dt>Passengers</dt><dd>2</dd></div>
              <div><dt>Luggage</dt><dd>2 bags</dd></div>
              <div><dt>Vehicle</dt><dd>Pacifica</dd></div>
            </dl>
            <p className="driver-ride-note"><span>Pickup note</span>Meet at the main entrance. Text on arrival.</p>
            <button
              className="platform-primary-action"
              disabled={stateIndex === DRIVER_RIDE_STATES.length - 1}
              onClick={onAdvance}
              type="button"
            >
              {actionLabel}<span aria-hidden="true">→</span>
            </button>
          </article>
          <nav className="driver-app-device__nav" aria-label="Driver app concept navigation">
            <span className="driver-app-device__nav--active">Today</span>
            <span>Schedule</span>
            <span>Earnings</span>
          </nav>
        </div>

        <div className="driver-platform-support">
          <PlatformPanel eyebrow="Today’s route" title="Driver schedule">
            <ol className="driver-day-schedule">
              {DRIVER_SCHEDULE.map((ride) => (
                <li key={`${ride.time}-${ride.customer}`}>
                  <time>{ride.time}</time>
                  <span><strong>{ride.customer}</strong><small>{ride.route}</small></span>
                  <em>{ride.state}</em>
                </li>
              ))}
            </ol>
          </PlatformPanel>

          <div className="driver-performance-grid">
            <article><span>12</span><p>Concept rides<small>This week</small></p></article>
            <article><span>96%</span><p>On-time preview<small>Illustrative</small></p></article>
            <article><span>$684</span><p>Earnings preview<small>Sample only</small></p></article>
          </div>

          <PlatformPanel eyebrow="Built-in clarity" title="A better handoff from dispatch">
            <div className="driver-handoff-list">
              <span><i aria-hidden="true">01</i> Complete trip details</span>
              <span><i aria-hidden="true">02</i> One-tap ride statuses</span>
              <span><i aria-hidden="true">03</i> Notes, navigation, and contact</span>
              <span><i aria-hidden="true">04</i> Schedule and earnings visibility</span>
            </div>
          </PlatformPanel>
        </div>
      </div>
    </div>
  );
}

export function FleetPlatformView({
  selectedVehicleId,
  onSelectVehicle,
}: {
  selectedVehicleId: string;
  onSelectVehicle: (vehicleId: string) => void;
}) {
  const vehicle = FLEET_VEHICLES.find((item) => item.id === selectedVehicleId) ?? FLEET_VEHICLES[0];

  return (
    <div className="platform-view fleet-platform-view">
      <PlatformViewHeading
        copy="A living record for readiness, inspections, service, costs, documents, and every vehicle’s history."
        eyebrow="Fleet intelligence"
        title="Keep the fleet ready before the day gets busy."
      />

      <div className="fleet-card-grid" aria-label="Select a concept fleet vehicle">
        {FLEET_VEHICLES.map((item) => (
          <button
            aria-pressed={vehicle.id === item.id}
            className={vehicle.id === item.id ? "fleet-card fleet-card--selected" : "fleet-card"}
            key={item.id}
            onClick={() => onSelectVehicle(item.id)}
            type="button"
          >
            <span className="fleet-card__vehicle" aria-hidden="true"><i /><i /><i /></span>
            <span className="fleet-card__identity"><strong>{item.name}</strong><small>{item.descriptor}</small></span>
            <PlatformStatusBadge state={item.state} />
            <span className="fleet-card__service">{item.serviceLabel}</span>
          </button>
        ))}
      </div>

      <div className="fleet-detail-layout">
        <PlatformPanel
          action={<PlatformStatusBadge state={vehicle.state} />}
          className="fleet-readiness-panel"
          eyebrow={vehicle.plate}
          title={vehicle.name}
        >
          <div className="fleet-readiness-summary">
            <div>
              <span>Mileage</span><strong>{vehicle.mileage}</strong>
            </div>
            <div>
              <span>Assigned driver</span><strong>{vehicle.driver}</strong>
            </div>
          </div>
          <div className="fleet-service-meter">
            <div><span>Maintenance window</span><strong>{vehicle.serviceLabel}</strong></div>
            <span><i style={{ width: `${vehicle.serviceProgress}%` }} /></span>
          </div>
          <div className="fleet-compliance-grid">
            <article><span>Next service</span><strong>{vehicle.nextService}</strong></article>
            <article><span>Inspection</span><strong>{vehicle.inspection}</strong></article>
            <article><span>Registration</span><strong>{vehicle.registration}</strong></article>
            <article><span>Insurance</span><strong>{vehicle.insurance}</strong></article>
          </div>
        </PlatformPanel>

        <PlatformPanel className="fleet-history-panel" eyebrow="Vehicle record" title="Service history">
          <div className="fleet-history-list">
            {vehicle.history.map((record) => (
              <article key={`${vehicle.id}-${record.date}-${record.service}`}>
                <time>{record.date}</time>
                <span><strong>{record.service}</strong><small>{record.vendor}</small></span>
                <i aria-hidden="true">✓</i>
              </article>
            ))}
          </div>
          <div className="fleet-inspection-preview">
            <span>Digital inspection concept</span>
            <p>Fuel · Tires · Warning lights · Interior · Exterior · Photos</p>
          </div>
        </PlatformPanel>
      </div>
    </div>
  );
}

export function DispatchPlatformView({
  selectedRideId,
  onSelectRide,
}: {
  selectedRideId: string;
  onSelectRide: (rideId: string) => void;
}) {
  const selectedRide = DISPATCH_RIDES.find((ride) => ride.id === selectedRideId) ?? DISPATCH_RIDES[0];

  return (
    <div className="platform-view dispatch-platform-view">
      <PlatformViewHeading
        copy="See the schedule, assignments, exceptions, and customer communication in one coordinated operating view."
        eyebrow="Dispatch command center"
        title="Know what is moving—and what needs attention."
      />

      <div className="dispatch-command-layout">
        <PlatformPanel className="dispatch-timeline-panel" eyebrow="Friday · Concept schedule" title="Ride timeline">
          <div className="dispatch-timeline">
            {DISPATCH_RIDES.map((ride) => (
              <button
                aria-pressed={selectedRide.id === ride.id}
                className={selectedRide.id === ride.id ? "dispatch-timeline__selected" : ""}
                key={ride.id}
                onClick={() => onSelectRide(ride.id)}
                type="button"
              >
                <time>{ride.time}</time>
                <span className="dispatch-timeline__line"><i /></span>
                <span className="dispatch-timeline__ride"><strong>{ride.customer}</strong><small>{ride.route}</small></span>
                <span className="dispatch-timeline__driver"><small>Driver</small><strong>{ride.driver}</strong></span>
                <PlatformStatusBadge state={ride.state} />
              </button>
            ))}
          </div>
        </PlatformPanel>

        <aside className="dispatch-detail-panel" aria-label={`Dispatch details for ${selectedRide.id}`}>
          <div className="dispatch-detail-panel__topline">
            <span>{selectedRide.id}</span>
            <PlatformStatusBadge state={selectedRide.state} />
          </div>
          <h4>{selectedRide.customer}</h4>
          <p className="dispatch-detail-panel__route">{selectedRide.route}</p>
          <dl>
            <div><dt>Driver</dt><dd>{selectedRide.driver}</dd></div>
            <div><dt>Vehicle</dt><dd>{selectedRide.vehicle}</dd></div>
            <div><dt>Pickup</dt><dd>{selectedRide.time} AM</dd></div>
          </dl>
          <div className="dispatch-message-preview">
            <span>Communication concept</span>
            <p>{selectedRide.message}</p>
            <small>No message will be sent.</small>
          </div>
          <div className="dispatch-action-row" aria-label="Dispatch concept actions">
            <button type="button">Message driver</button>
            <button type="button">Notify customer</button>
          </div>
        </aside>
      </div>

      <div className="dispatch-signal-strip">
        <span><strong>02</strong> Need assignment</span>
        <span><strong>01</strong> Driver en route</span>
        <span><strong>04</strong> Updates prepared</span>
        <span><strong>00</strong> Live GPS connections</span>
      </div>
    </div>
  );
}

export function CustomerPlatformView({
  selectedCustomerId,
  onSelectCustomer,
}: {
  selectedCustomerId: string;
  onSelectCustomer: (customerId: string) => void;
}) {
  const customer = CUSTOMER_PROFILES.find((item) => item.id === selectedCustomerId) ?? CUSTOMER_PROFILES[0];

  return (
    <div className="platform-view customer-platform-view">
      <PlatformViewHeading
        copy="Give every repeat rider, partner, and potential business account the context personal service deserves."
        eyebrow="Customer CRM"
        title="Remember the relationship—not just the ride."
      />

      <div className="customer-crm-layout">
        <PlatformPanel className="customer-directory-panel" eyebrow="Relationship directory" title="Customers + accounts">
          <div className="customer-directory">
            {CUSTOMER_PROFILES.map((profile) => (
              <button
                aria-pressed={customer.id === profile.id}
                className={customer.id === profile.id ? "customer-directory__selected" : ""}
                key={profile.id}
                onClick={() => onSelectCustomer(profile.id)}
                type="button"
              >
                <span>{profile.initials}</span>
                <span><strong>{profile.name}</strong><small>{profile.relationship}</small></span>
                <i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
        </PlatformPanel>

        <section className="customer-profile-card" aria-label={`Concept profile for ${customer.name}`}>
          <header>
            <span className="customer-profile-card__avatar">{customer.initials}</span>
            <div><p>{customer.relationship}</p><h4>{customer.name}</h4><span>{customer.since}</span></div>
            <PlatformConceptBadge>CRM preview</PlatformConceptBadge>
          </header>
          <div className="customer-profile-stats">
            <article><span>Relationship</span><strong>{customer.rides}</strong></article>
            <article><span>Primary use</span><strong>{customer.value}</strong></article>
          </div>
          <div className="customer-preferences">
            <span>Preferences + account signals</span>
            <div>{customer.preferences.map((preference) => <em key={preference}>{preference}</em>)}</div>
          </div>
          <div className="customer-vip-note"><span>Private service note</span><p>{customer.note}</p></div>
          <div className="customer-ride-history">
            <span>Recent concept activity</span>
            {customer.history.map((ride) => (
              <article key={`${customer.id}-${ride.date}-${ride.route}`}>
                <time>{ride.date}</time><p>{ride.route}</p><strong>{ride.status}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function AnalyticsPlatformView() {
  return (
    <div className="platform-view analytics-platform-view">
      <PlatformViewHeading
        copy="Turn connected ride, customer, driver, vehicle, and payment records into a clearer view of the business."
        eyebrow="Business intelligence"
        title="See where the operation is strongest."
      />

      <div className="analytics-metric-grid">
        {ANALYTICS_METRICS.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.trend}</small>
          </article>
        ))}
      </div>

      <div className="analytics-dashboard-layout">
        <PlatformPanel className="destination-trends-panel" eyebrow="Where demand moves" title="Destination trends">
          <div className="destination-chart" aria-label="Illustrative destination trend chart">
            {DESTINATION_TRENDS.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <span><i style={{ width: `${item.value}%` }} /></span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </PlatformPanel>

        <PlatformPanel className="utilization-panel" eyebrow="Fleet intelligence" title="Vehicle utilization">
          <div className="utilization-list">
            {UTILIZATION_PREVIEW.map((item) => (
              <article key={item.label}>
                <div><strong>{item.label}</strong><small>{item.note}</small></div>
                <span><i style={{ width: `${item.value}%` }} /></span>
                <em>{item.value}%</em>
              </article>
            ))}
          </div>
        </PlatformPanel>
      </div>

      <div className="analytics-insight-strip">
        <article><span>Repeat behavior</span><strong>Airport riders return most often</strong><small>Illustrative insight</small></article>
        <article><span>Peak window</span><strong>Friday · 4 PM–8 PM</strong><small>Sample operating pattern</small></article>
        <article><span>Capacity signal</span><strong>Group vehicle availability</strong><small>Review before event demand</small></article>
      </div>
      <p className="analytics-disclaimer">All values are fictional concept data. Production analytics would reflect verified Need A Ride records only.</p>
    </div>
  );
}

export function FuturePlatformView({
  selectedIntegrationId,
  onSelectIntegration,
}: {
  selectedIntegrationId: string;
  onSelectIntegration: (integrationId: string) => void;
}) {
  const integration = FUTURE_INTEGRATIONS.find((item) => item.id === selectedIntegrationId) ?? FUTURE_INTEGRATIONS[0];

  return (
    <div className="platform-view future-platform-view">
      <PlatformViewHeading
        copy="The first platform can establish the foundation. These integrations can be evaluated as the operation and data mature."
        eyebrow="Future integrations"
        title="Ambitious by design. Practical by sequence."
      />

      <div className="future-platform-layout">
        <div className="future-integration-grid" aria-label="Select a future integration concept">
          {FUTURE_INTEGRATIONS.map((item) => (
            <button
              aria-pressed={integration.id === item.id}
              className={integration.id === item.id ? "future-integration-card future-integration-card--selected" : "future-integration-card"}
              key={item.id}
              onClick={() => onSelectIntegration(item.id)}
              type="button"
            >
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <p>{item.promise}</p>
              <em>Future integration</em>
            </button>
          ))}
        </div>

        <aside className="future-integration-detail" aria-label={`Future integration details for ${integration.title}`}>
          <PlatformConceptBadge>Not in initial launch</PlatformConceptBadge>
          <span className="future-integration-detail__number">{integration.number}</span>
          <p>Future module</p>
          <h4>{integration.title}</h4>
          <strong>{integration.promise}</strong>
          <div>
            <span>Could unlock</span>
            {integration.unlocks.map((item) => <em key={item}>{item}</em>)}
          </div>
          <section>
            <span>What must come first</span>
            <p>{integration.dependency}</p>
          </section>
        </aside>
      </div>

      <div className="future-sequence-strip" aria-label="Future integration sequence">
        <span><strong>01</strong> Build the operating foundation</span>
        <i aria-hidden="true" />
        <span><strong>02</strong> Prove the workflow</span>
        <i aria-hidden="true" />
        <span><strong>03</strong> Connect what creates value</span>
      </div>
    </div>
  );
}
