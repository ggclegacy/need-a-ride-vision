"use client";

import { useEffect, useMemo, useState } from "react";
import { GrowthPortfolio } from "./GrowthPortfolio";
import { GrowthSummary } from "./GrowthSummary";
import {
  GROWTH_OPPORTUNITIES,
  type GrowthFilter,
} from "./growth-model";

interface GrowthExperienceProps {
  onComplete: (shortlist: readonly string[]) => void;
}

type GrowthView = "portfolio" | "summary";

export function GrowthExperience({ onComplete }: GrowthExperienceProps) {
  const [view, setView] = useState<GrowthView>("portfolio");
  const [activeFilter, setActiveFilter] = useState<GrowthFilter>("all");
  const [selectedId, setSelectedId] = useState(GROWTH_OPPORTUNITIES[0].id);
  const [shortlist, setShortlist] = useState<string[]>(["airport", "hospitality"]);
  const [announcement, setAnnouncement] = useState("");

  const selected = useMemo(
    () => GROWTH_OPPORTUNITIES.find((opportunity) => opportunity.id === selectedId) ?? GROWTH_OPPORTUNITIES[0],
    [selectedId],
  );

  useEffect(() => {
    const focusTimer = window.setTimeout(() => {
      document.getElementById("growth-view-heading")?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(focusTimer);
  }, [view]);

  const toggleShortlist = (id: string) => {
    const opportunity = GROWTH_OPPORTUNITIES.find((item) => item.id === id);
    const currentlySelected = shortlist.includes(id);
    setShortlist((current) =>
      currentlySelected ? current.filter((item) => item !== id) : [...current, id],
    );
    setAnnouncement(
      `${opportunity?.title ?? "Opportunity"} ${currentlySelected ? "removed from" : "added to"} the concept shortlist.`,
    );
  };

  const changeFilter = (filter: GrowthFilter) => {
    setActiveFilter(filter);
    if (filter !== "all") {
      const firstInLane = GROWTH_OPPORTUNITIES.find((opportunity) => opportunity.lane === filter);
      if (firstInLane) {
        setSelectedId(firstInLane.id);
      }
    }
  };

  return (
    <div className="growth-product-shell">
      <header className="growth-product-shell__header">
        <div className="growth-product-shell__brand">
          <span aria-hidden="true">NAR</span>
          <p>Need A Ride<small>Growth opportunity studio</small></p>
        </div>
        <div className="growth-product-shell__progress">
          <span>{view === "portfolio" ? "01" : "02"} / 02</span>
          <p>{view === "portfolio" ? "Explore" : "Prioritize"}<small>Strategy concept</small></p>
        </div>
      </header>

      <nav className="growth-product-nav" aria-label="Growth strategy steps">
        <button
          aria-current={view === "portfolio" ? "step" : undefined}
          className={view === "portfolio" ? "growth-product-nav__active" : ""}
          onClick={() => setView("portfolio")}
          type="button"
        >
          <span>01</span> Opportunity Portfolio
        </button>
        <button
          aria-current={view === "summary" ? "step" : undefined}
          className={view === "summary" ? "growth-product-nav__active" : ""}
          onClick={() => setView("summary")}
          type="button"
        >
          <span>02</span> Discovery Shortlist <strong>{shortlist.length}</strong>
        </button>
      </nav>

      <div className={`growth-product-shell__content growth-product-view--${view}`}>
        {view === "portfolio" ? (
          <GrowthPortfolio
            activeFilter={activeFilter}
            onFilterChange={changeFilter}
            onSelect={setSelectedId}
            onToggleShortlist={toggleShortlist}
            selected={selected}
            shortlist={shortlist}
          />
        ) : (
          <GrowthSummary
            onBack={() => setView("portfolio")}
            onComplete={() => onComplete(shortlist)}
            onRemove={toggleShortlist}
            shortlist={shortlist}
          />
        )}
      </div>

      {view === "portfolio" ? (
        <footer className="growth-product-shell__footer">
          <p>{shortlist.length} opportunities currently shortlisted for discovery.</p>
          <button className="growth-primary-action" onClick={() => setView("summary")} type="button">
            Review Shortlist <span aria-hidden="true">→</span>
          </button>
        </footer>
      ) : null}

      <p className="visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}
