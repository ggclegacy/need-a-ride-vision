import type { RoadmapPhaseId } from "./roadmap-model";

export function RoadmapConceptNote() {
  return (
    <p className="roadmap-concept-note">
      <span aria-hidden="true">◇</span>
      Sequence concept · Final scope and timing require owner discovery
    </p>
  );
}

export function RoadmapPhaseBadge({ phase }: { phase: RoadmapPhaseId }) {
  return <span className={`roadmap-phase-badge roadmap-phase-badge--${phase}`}>{phase}</span>;
}
