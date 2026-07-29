import type { VisionSceneId } from "@/lib/constants";

interface EnvironmentalBackgroundProps {
  scene: VisionSceneId;
}

export function EnvironmentalBackground({
  scene,
}: EnvironmentalBackgroundProps) {
  return (
    <div className="environment" data-scene={scene} aria-hidden="true">
      <div className="environment__atmosphere environment__atmosphere--one" />
      <div className="environment__atmosphere environment__atmosphere--two" />
      <div className="environment__route environment__route--primary" />
      <div className="environment__route environment__route--secondary" />
      <div className="environment__route-dot" />
      <div className="environment__dust" />
      <div className="environment__grain" />
      <div className="environment__vignette" />
    </div>
  );
}
