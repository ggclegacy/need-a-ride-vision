import type { GrowthFilter, GrowthLane } from "./growth-model";
import { GROWTH_LANES } from "./growth-model";

export const GROWTH_FILTERS: readonly { id: GrowthFilter; label: string }[] = [
  { id: "all", label: "All opportunities" },
  ...GROWTH_LANES.map((lane) => ({ id: lane.id, label: lane.label })),
];

export function GrowthConceptNote() {
  return (
    <p className="growth-concept-note">
      <span aria-hidden="true">◇</span>
      Strategic concepts to evaluate with the owner · No projections or guarantees
    </p>
  );
}

export function GrowthLaneBadge({ lane }: { lane: GrowthLane }) {
  return <span className={`growth-lane-badge growth-lane-badge--${lane}`}>{lane}</span>;
}

export function ShortlistButton({
  selected,
  onClick,
  compact = false,
}: {
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      aria-pressed={selected}
      className={`growth-shortlist-button ${selected ? "growth-shortlist-button--selected" : ""} ${
        compact ? "growth-shortlist-button--compact" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true">{selected ? "✓" : "+"}</span>
      {selected ? "Shortlisted" : "Add to shortlist"}
    </button>
  );
}
