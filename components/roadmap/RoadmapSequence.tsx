import { GROWTH_OPPORTUNITIES } from "@/components/growth/growth-model";
import { ROADMAP_PHASES, type RoadmapPhaseId } from "./roadmap-model";
import { RoadmapConceptNote, RoadmapPhaseBadge } from "./RoadmapUI";

interface RoadmapSequenceProps {
  selectedPhaseId: RoadmapPhaseId;
  priorityOpportunityIds: readonly string[];
  onSelectPhase: (phase: RoadmapPhaseId) => void;
}

export function RoadmapSequence({
  selectedPhaseId,
  priorityOpportunityIds,
  onSelectPhase,
}: RoadmapSequenceProps) {
  const selectedPhase =
    ROADMAP_PHASES.find((phase) => phase.id === selectedPhaseId) ?? ROADMAP_PHASES[0];
  const priorityOpportunities = GROWTH_OPPORTUNITIES.filter((opportunity) =>
    priorityOpportunityIds.includes(opportunity.id),
  );

  return (
    <div className="roadmap-sequence-view">
      <div className="roadmap-view-heading">
        <div>
          <p>Phased build sequence</p>
          <h3 id="roadmap-view-heading" tabIndex={-1}>
            Every phase earns the next.
          </h3>
        </div>
        <RoadmapConceptNote />
      </div>

      <ol className="roadmap-phase-track" aria-label="Roadmap phases">
        {ROADMAP_PHASES.map((phase, index) => {
          const selected = phase.id === selectedPhase.id;
          return (
            <li key={phase.id}>
              <button
                aria-pressed={selected}
                className={selected ? "roadmap-phase-track__active" : ""}
                onClick={() => onSelectPhase(phase.id)}
                type="button"
              >
                <span>{phase.number}</span>
                <div>
                  <small>{phase.posture}</small>
                  <strong>{phase.label}</strong>
                  <p>{phase.promise}</p>
                </div>
              </button>
              {index < ROADMAP_PHASES.length - 1 ? <i aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>

      <section className="roadmap-phase-detail" aria-labelledby="roadmap-phase-title">
        <header>
          <div>
            <RoadmapPhaseBadge phase={selectedPhase.id} />
            <span>{selectedPhase.number} · {selectedPhase.posture}</span>
          </div>
          <h4 id="roadmap-phase-title">{selectedPhase.label}</h4>
          <p>{selectedPhase.rationale}</p>
        </header>

        {selectedPhase.id === "expansion" ? (
          <div className="roadmap-priority-bridge">
            <span>Carried forward from your growth shortlist</span>
            {priorityOpportunities.length ? (
              <div>
                {priorityOpportunities.map((opportunity) => (
                  <strong key={opportunity.id}>{opportunity.shortTitle}</strong>
                ))}
              </div>
            ) : (
              <p>No opportunity is preselected. Owner discovery should choose the pilot.</p>
            )}
          </div>
        ) : null}

        <div className="roadmap-milestone-grid">
          {selectedPhase.milestones.map((milestone, index) => (
            <article key={milestone.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h5>{milestone.title}</h5>
              <p>{milestone.description}</p>
              <div aria-label={`Possible ${milestone.title} capabilities`}>
                {milestone.capabilities.map((capability) => (
                  <small key={capability}>{capability}</small>
                ))}
              </div>
              <footer>
                <strong>Unlocks</strong>
                <p>{milestone.unlocks}</p>
              </footer>
            </article>
          ))}
        </div>

        <div className="roadmap-phase-gate">
          <span aria-hidden="true">◆</span>
          <div>
            <strong>Decision gate before {selectedPhase.id === "expansion" ? "scaling" : "moving forward"}</strong>
            <p>{selectedPhase.gate}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
