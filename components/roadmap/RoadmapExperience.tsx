"use client";

import { useEffect, useState } from "react";
import { RoadmapReadiness } from "./RoadmapReadiness";
import { RoadmapSequence } from "./RoadmapSequence";
import type { RoadmapPhaseId } from "./roadmap-model";

interface RoadmapExperienceProps {
  priorityOpportunityIds: readonly string[];
  onComplete: () => void;
}

type RoadmapView = "sequence" | "readiness";

export function RoadmapExperience({
  priorityOpportunityIds,
  onComplete,
}: RoadmapExperienceProps) {
  const [view, setView] = useState<RoadmapView>("sequence");
  const [selectedPhaseId, setSelectedPhaseId] = useState<RoadmapPhaseId>("foundation");
  const [agenda, setAgenda] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const focusTimer = window.setTimeout(() => {
      document.getElementById("roadmap-view-heading")?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(focusTimer);
  }, [view]);

  const toggleAgenda = (id: string) => {
    const selected = agenda.includes(id);
    setAgenda((current) =>
      selected ? current.filter((item) => item !== id) : [...current, id],
    );
    setAnnouncement(
      `Discovery question ${selected ? "removed from" : "added to"} the local agenda.`,
    );
  };

  return (
    <div className="roadmap-product-shell">
      <header className="roadmap-product-shell__header">
        <div className="roadmap-product-shell__brand">
          <span aria-hidden="true">NAR</span>
          <p>Need A Ride<small>Phased build roadmap</small></p>
        </div>
        <div className="roadmap-product-shell__progress">
          <span>{view === "sequence" ? "01" : "02"} / 02</span>
          <p>{view === "sequence" ? "Sequence" : "Decide"}<small>Roadmap concept</small></p>
        </div>
      </header>

      <nav className="roadmap-product-nav" aria-label="Roadmap steps">
        <button
          aria-current={view === "sequence" ? "step" : undefined}
          className={view === "sequence" ? "roadmap-product-nav__active" : ""}
          onClick={() => setView("sequence")}
          type="button"
        >
          <span>01</span> Phased Roadmap
        </button>
        <button
          aria-current={view === "readiness" ? "step" : undefined}
          className={view === "readiness" ? "roadmap-product-nav__active" : ""}
          onClick={() => setView("readiness")}
          type="button"
        >
          <span>02</span> Decision Gates <strong>{agenda.length}</strong>
        </button>
      </nav>

      <div className={`roadmap-product-shell__content roadmap-product-view--${view}`}>
        {view === "sequence" ? (
          <RoadmapSequence
            onSelectPhase={setSelectedPhaseId}
            priorityOpportunityIds={priorityOpportunityIds}
            selectedPhaseId={selectedPhaseId}
          />
        ) : (
          <RoadmapReadiness
            agenda={agenda}
            onBack={() => setView("sequence")}
            onComplete={onComplete}
            onToggleAgenda={toggleAgenda}
            priorityOpportunityIds={priorityOpportunityIds}
          />
        )}
      </div>

      {view === "sequence" ? (
        <footer className="roadmap-product-shell__footer">
          <p>Foundation → Operations → Expansion. Sequence is fixed; scope is discovered.</p>
          <button className="roadmap-primary-action" onClick={() => setView("readiness")} type="button">
            Review Decision Gates <span aria-hidden="true">→</span>
          </button>
        </footer>
      ) : null}

      <p className="visually-hidden" aria-live="polite">{announcement}</p>
    </div>
  );
}
