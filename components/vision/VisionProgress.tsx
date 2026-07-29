import type { CSSProperties } from "react";

interface VisionProgressProps {
  current: number;
  total: number;
  onBack: () => void;
}

type ProgressStyle = CSSProperties & {
  "--progress": string;
};

export function VisionProgress({
  current,
  total,
  onBack,
}: VisionProgressProps) {
  const progress = `${Math.round((current / total) * 100)}%`;

  return (
    <nav className="vision-progress" aria-label="Vision experience navigation">
      <span className="vision-progress__brand">Need A Ride Vision</span>

      <div className="vision-progress__controls">
        <button
          className="vision-progress__back"
          type="button"
          onClick={onBack}
          aria-label="Return to the opening scene"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div
          className="vision-progress__meter"
          aria-label={`Scene ${current} of ${total}`}
        >
          <span className="vision-progress__count" aria-hidden="true">
            <strong>{String(current).padStart(2, "0")}</strong>
            &nbsp;/&nbsp;{String(total).padStart(2, "0")}
          </span>
          <span className="vision-progress__rail" aria-hidden="true">
            <span
              className="vision-progress__fill"
              style={{ "--progress": progress } as ProgressStyle}
            />
          </span>
        </div>
      </div>
    </nav>
  );
}
