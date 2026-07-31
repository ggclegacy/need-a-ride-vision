import { GROWTH_OPPORTUNITIES } from "@/components/growth/growth-model";
import {
  ROADMAP_DECISIONS,
  ROADMAP_PHASES,
  roadmapPhaseLabel,
} from "./roadmap-model";
import { RoadmapConceptNote, RoadmapPhaseBadge } from "./RoadmapUI";

interface RoadmapReadinessProps {
  agenda: readonly string[];
  priorityOpportunityIds: readonly string[];
  onBack: () => void;
  onComplete: () => void;
  onToggleAgenda: (id: string) => void;
}

export function RoadmapReadiness({
  agenda,
  priorityOpportunityIds,
  onBack,
  onComplete,
  onToggleAgenda,
}: RoadmapReadinessProps) {
  const priorityOpportunities = GROWTH_OPPORTUNITIES.filter((opportunity) =>
    priorityOpportunityIds.includes(opportunity.id),
  );

  return (
    <div className="roadmap-readiness-view">
      <div className="roadmap-view-heading">
        <div>
          <p>Owner decision gates</p>
          <h3 id="roadmap-view-heading" tabIndex={-1}>
            The roadmap begins with answers.
          </h3>
        </div>
        <RoadmapConceptNote />
      </div>

      <div className="roadmap-readiness-layout">
        <section className="roadmap-decision-panel" aria-labelledby="roadmap-decisions-title">
          <header>
            <div>
              <p>Discovery agenda</p>
              <h4 id="roadmap-decisions-title">Decisions that shape responsible scope</h4>
            </div>
            <span>{String(agenda.length).padStart(2, "0")}</span>
          </header>

          <div className="roadmap-decision-list">
            {ROADMAP_DECISIONS.map((decision) => {
              const selected = agenda.includes(decision.id);
              return (
                <article key={decision.id}>
                  <RoadmapPhaseBadge phase={decision.phase} />
                  <div>
                    <strong>{decision.prompt}</strong>
                    <p>{decision.whyItMatters}</p>
                  </div>
                  <button
                    aria-label={`${selected ? "Remove" : "Add"} “${decision.prompt}” ${selected ? "from" : "to"} the ${roadmapPhaseLabel(decision.phase)} discovery agenda`}
                    aria-pressed={selected}
                    className={selected ? "roadmap-decision-list__selected" : ""}
                    onClick={() => onToggleAgenda(decision.id)}
                    type="button"
                  >
                    <span aria-hidden="true">{selected ? "✓" : "+"}</span>
                    {selected ? "Added" : "Add"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="roadmap-readiness-summary">
          <p>What this roadmap commits to</p>
          <h4>Sequence over false certainty.</h4>
          <ul>
            <li><span>01</span><p><strong>No invented dates</strong>Timing follows discovery, technical review, and owner availability.</p></li>
            <li><span>02</span><p><strong>No premature automation</strong>Operating rules come before workflows are automated.</p></li>
            <li><span>03</span><p><strong>No growth guarantees</strong>Expansion begins as a controlled, measurable pilot.</p></li>
            <li><span>04</span><p><strong>No hidden big-bang launch</strong>Each phase can deliver useful progress and a clear next decision.</p></li>
          </ul>

          <div className="roadmap-readiness-summary__priority">
            <span>Current growth candidates</span>
            {priorityOpportunities.length ? (
              <div>
                {priorityOpportunities.map((opportunity) => (
                  <strong key={opportunity.id}>{opportunity.shortTitle}</strong>
                ))}
              </div>
            ) : (
              <p>To be selected during owner discovery.</p>
            )}
          </div>
        </aside>
      </div>

      <section className="roadmap-sequence-recap" aria-label="Roadmap sequence recap">
        {ROADMAP_PHASES.map((phase, index) => (
          <article key={phase.id}>
            <span>{phase.number}</span>
            <div><strong>{phase.label}</strong><p>{phase.posture}</p></div>
            {index < ROADMAP_PHASES.length - 1 ? <i aria-hidden="true">→</i> : null}
          </article>
        ))}
      </section>

      <div className="roadmap-summary-actions">
        <button className="roadmap-secondary-action" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Return to Roadmap
        </button>
        <button className="roadmap-primary-action" onClick={onComplete} type="button">
          Prepare for Owner Discovery <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
