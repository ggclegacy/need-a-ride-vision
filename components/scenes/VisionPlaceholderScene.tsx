import type { RefObject } from "react";
import { SceneShell } from "@/components/vision/SceneShell";

interface VisionPlaceholderSceneProps {
  active: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
}

export function VisionPlaceholderScene({
  active,
  headingRef,
}: VisionPlaceholderSceneProps) {
  return (
    <SceneShell className="opportunity-scene" labelledBy="opportunity-title">
      <div className="opportunity-content">
        <div className="opportunity-heading">
          <p className="eyebrow">The Opportunity</p>
          <h2
            className="scene-title"
            id="opportunity-title"
            ref={headingRef}
            tabIndex={active ? -1 : undefined}
          >
            Built for the Way
            <br />
            Need A Ride Is Growing
          </h2>
          <p className="lead-copy">
            The current process helped build the business. The next system can
            make every quote, booking, payment, and ride easier to manage.
          </p>
        </div>

        <div
          className="transformation"
          aria-label="Transformation from manual communication to a connected experience"
        >
          <div className="transformation__node">
            <span className="transformation__number">01</span>
            <span className="transformation__label">
              Manual communication
            </span>
            <span className="transformation__detail">
              Personal service, coordinated one message at a time.
            </span>
          </div>

          <div className="transformation__direction" aria-hidden="true">
            <span>→</span>
          </div>

          <div className="transformation__node transformation__node--connected">
            <span className="transformation__number">02</span>
            <span className="transformation__label">Connected experience</span>
            <span className="transformation__detail">
              One clear path from request to confirmed ride.
            </span>
          </div>
        </div>

        <p className="stage-note">
          Vision experience continues in the next build stage.
        </p>
      </div>
    </SceneShell>
  );
}
