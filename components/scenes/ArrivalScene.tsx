import type { RefObject } from "react";
import { SceneShell } from "@/components/vision/SceneShell";
import { BrandMark } from "@/components/ui/BrandMark";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface ArrivalSceneProps {
  active: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onEnter: () => void;
}

export function ArrivalScene({
  active,
  headingRef,
  onEnter,
}: ArrivalSceneProps) {
  return (
    <SceneShell className="arrival-scene" labelledBy="arrival-title">
      <div className="arrival-content">
        <BrandMark />

        <div className="arrival-copy">
          <p className="eyebrow">Need A Ride LLC</p>
          <h1
            className="display-title"
            id="arrival-title"
            ref={headingRef}
            tabIndex={-1}
          >
            The Next Chapter
            <br />
            of Need A Ride
          </h1>
          <p className="lead-copy">
            A better way to quote, book, pay, operate, and grow.
          </p>
          <p className="arrival-detail">
            A digital vision for a stronger customer experience and a more
            connected operation.
          </p>
        </div>

        <div className="arrival-action">
          <PremiumButton
            onClick={onEnter}
            tabIndex={active ? 0 : -1}
            aria-label="Enter the Need A Ride vision experience"
          >
            Enter the Vision
          </PremiumButton>
          <p className="private-note">Private concept experience</p>
        </div>
      </div>

      <div className="arrival-cue" aria-hidden="true">
        <span>Begin</span>
        <span className="arrival-cue__line" />
      </div>
    </SceneShell>
  );
}
