import { GROWTH_LANES, GROWTH_OPPORTUNITIES } from "./growth-model";
import { GrowthConceptNote, GrowthLaneBadge } from "./GrowthUI";

interface GrowthSummaryProps {
  shortlist: readonly string[];
  onBack: () => void;
  onComplete: () => void;
  onRemove: (id: string) => void;
}

export function GrowthSummary({
  shortlist,
  onBack,
  onComplete,
  onRemove,
}: GrowthSummaryProps) {
  const selected = GROWTH_OPPORTUNITIES.filter((opportunity) =>
    shortlist.includes(opportunity.id),
  );

  return (
    <div className="growth-summary-view">
      <div className="growth-view-heading">
        <div>
          <p>Discovery shortlist</p>
          <h3 id="growth-view-heading" tabIndex={-1}>
            Turn possibility into the right conversation.
          </h3>
        </div>
        <GrowthConceptNote />
      </div>

      <div className="growth-summary-layout">
        <section className="growth-shortlist-panel" aria-labelledby="growth-shortlist-title">
          <header>
            <div>
              <p>Your concept shortlist</p>
              <h4 id="growth-shortlist-title">
                {selected.length ? `${selected.length} opportunities to evaluate` : "No opportunities selected yet"}
              </h4>
            </div>
            <span>{String(selected.length).padStart(2, "0")}</span>
          </header>

          {selected.length ? (
            <div className="growth-shortlist-items">
              {selected.map((opportunity) => (
                <article key={opportunity.id}>
                  <span className="growth-shortlist-items__number">{opportunity.number}</span>
                  <div>
                    <GrowthLaneBadge lane={opportunity.lane} />
                    <strong>{opportunity.title}</strong>
                    <p>{opportunity.firstExperiment}</p>
                  </div>
                  <button
                    aria-label={`Remove ${opportunity.title} from shortlist`}
                    onClick={() => onRemove(opportunity.id)}
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="growth-shortlist-empty">
              <span aria-hidden="true">◇</span>
              <p>Return to the portfolio and shortlist the opportunities that deserve discovery.</p>
            </div>
          )}
        </section>

        <aside className="growth-decision-framework">
          <p>How to choose what comes first</p>
          <h4>Every opportunity should earn its place.</h4>
          <ol>
            <li><span>01</span><div><strong>Operational fit</strong><p>Can the current team and fleet deliver it consistently?</p></div></li>
            <li><span>02</span><div><strong>Customer evidence</strong><p>Is there real demand or a trusted partner ready to test it?</p></div></li>
            <li><span>03</span><div><strong>Healthy economics</strong><p>Can pricing, timing, and service boundaries support the work?</p></div></li>
            <li><span>04</span><div><strong>Focused experiment</strong><p>What is the smallest responsible way to learn before scaling?</p></div></li>
          </ol>
        </aside>
      </div>

      <div className="growth-lane-summary" aria-label="Growth strategy lanes">
        {GROWTH_LANES.map((lane) => {
          const count = selected.filter((opportunity) => opportunity.lane === lane.id).length;
          return (
            <article key={lane.id}>
              <span>{String(count).padStart(2, "0")}</span>
              <div><strong>{lane.label}</strong><p>{lane.description}</p></div>
            </article>
          );
        })}
      </div>

      <div className="growth-summary-actions">
        <button className="growth-secondary-action" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Refine Shortlist
        </button>
        <button className="growth-primary-action" onClick={onComplete} type="button">
          See the Build Roadmap <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
