import {
  GROWTH_OPPORTUNITIES,
  growthLaneLabel,
  type GrowthFilter,
  type GrowthOpportunity,
} from "./growth-model";
import {
  GROWTH_FILTERS,
  GrowthConceptNote,
  GrowthLaneBadge,
  ShortlistButton,
} from "./GrowthUI";

interface GrowthPortfolioProps {
  activeFilter: GrowthFilter;
  selected: GrowthOpportunity;
  shortlist: readonly string[];
  onFilterChange: (filter: GrowthFilter) => void;
  onSelect: (id: string) => void;
  onToggleShortlist: (id: string) => void;
}

export function GrowthPortfolio({
  activeFilter,
  selected,
  shortlist,
  onFilterChange,
  onSelect,
  onToggleShortlist,
}: GrowthPortfolioProps) {
  const visibleOpportunities = GROWTH_OPPORTUNITIES.filter(
    (opportunity) => activeFilter === "all" || opportunity.lane === activeFilter,
  );

  return (
    <div className="growth-portfolio-view">
      <div className="growth-view-heading">
        <div>
          <p>Opportunity portfolio</p>
          <h3 id="growth-view-heading" tabIndex={-1}>Growth should be chosen—not guessed.</h3>
        </div>
        <GrowthConceptNote />
      </div>

      <div className="growth-filter-bar" aria-label="Filter growth opportunities">
        {GROWTH_FILTERS.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            className={activeFilter === filter.id ? "growth-filter-bar__active" : ""}
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="growth-portfolio-layout">
        <section className="growth-opportunity-grid" aria-label="Growth opportunity concepts">
          {visibleOpportunities.map((opportunity) => {
            const isSelected = selected.id === opportunity.id;
            const isShortlisted = shortlist.includes(opportunity.id);
            return (
              <article
                className={`growth-opportunity-card ${
                  isSelected ? "growth-opportunity-card--selected" : ""
                }`}
                key={opportunity.id}
              >
                <button
                  aria-pressed={isSelected}
                  className="growth-opportunity-card__select"
                  onClick={() => onSelect(opportunity.id)}
                  type="button"
                >
                  <span className="growth-opportunity-card__number">{opportunity.number}</span>
                  <GrowthLaneBadge lane={opportunity.lane} />
                  <strong>{opportunity.title}</strong>
                  <p>{opportunity.promise}</p>
                  <span className="growth-opportunity-card__open">Explore <i aria-hidden="true">→</i></span>
                </button>
                <ShortlistButton
                  compact
                  onClick={() => onToggleShortlist(opportunity.id)}
                  selected={isShortlisted}
                />
              </article>
            );
          })}
        </section>

        <aside className="growth-opportunity-detail" aria-label={`Details for ${selected.title}`}>
          <div className="growth-opportunity-detail__topline">
            <div>
              <GrowthLaneBadge lane={selected.lane} />
              <span>{selected.number} · {growthLaneLabel(selected.lane)} lane</span>
            </div>
            <ShortlistButton
              onClick={() => onToggleShortlist(selected.id)}
              selected={shortlist.includes(selected.id)}
            />
          </div>

          <h4>{selected.title}</h4>
          <p className="growth-opportunity-detail__audience">For {selected.audience}</p>
          <p className="growth-opportunity-detail__promise">{selected.promise}</p>

          <div className="growth-detail-section">
            <span>How it could work</span>
            <p>{selected.operatingIdea}</p>
          </div>

          <div className="growth-capability-list" aria-label="Possible supporting capabilities">
            {selected.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>

          <div className="growth-detail-section growth-detail-section--questions">
            <span>Questions before recommending it</span>
            <ul>
              {selected.discoveryQuestions.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </div>

          <div className="growth-first-experiment">
            <span>Possible first experiment</span>
            <p>{selected.firstExperiment}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
