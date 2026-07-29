"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrivalScene } from "@/components/scenes/ArrivalScene";
import { VisionPlaceholderScene } from "@/components/scenes/VisionPlaceholderScene";
import { EnvironmentalBackground } from "@/components/vision/EnvironmentalBackground";
import { SceneTransition } from "@/components/vision/SceneTransition";
import { VisionProgress } from "@/components/vision/VisionProgress";
import { VISION_SCENES } from "@/lib/constants";
import { focusDelay } from "@/lib/motion";

export function VisionExperience() {
  const [activeScene, setActiveScene] = useState(0);
  const arrivalHeading = useRef<HTMLHeadingElement>(null);
  const opportunityHeading = useRef<HTMLHeadingElement>(null);

  const moveToScene = useCallback((nextScene: number) => {
    const boundedScene = Math.max(
      0,
      Math.min(VISION_SCENES.length - 1, nextScene),
    );

    setActiveScene(boundedScene);

    window.setTimeout(() => {
      const heading =
        boundedScene === 0 ? arrivalHeading.current : opportunityHeading.current;
      heading?.focus({ preventScroll: true });
    }, focusDelay);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInteractive =
        target?.matches("button, a, input, textarea, select") ?? false;

      if (isInteractive) {
        return;
      }

      if (event.key === "ArrowRight" && activeScene === 0) {
        event.preventDefault();
        moveToScene(1);
      }

      if (event.key === "ArrowLeft" && activeScene === 1) {
        event.preventDefault();
        moveToScene(0);
      }

      if (event.key === "Home") {
        event.preventDefault();
        moveToScene(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        moveToScene(VISION_SCENES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScene, moveToScene]);

  const scene = VISION_SCENES[activeScene];

  return (
    <main
      className={`vision-experience vision-experience--${scene.id}`}
      aria-label="Need A Ride digital vision experience"
    >
      <EnvironmentalBackground scene={scene.id} />
      <div className="vision-surface" aria-hidden="true" />

      {activeScene > 0 ? (
        <VisionProgress
          current={activeScene + 1}
          total={VISION_SCENES.length}
          onBack={() => moveToScene(activeScene - 1)}
        />
      ) : null}

      <SceneTransition active={activeScene === 0}>
        <ArrivalScene
          active={activeScene === 0}
          headingRef={arrivalHeading}
          onEnter={() => moveToScene(1)}
        />
      </SceneTransition>

      <SceneTransition active={activeScene === 1}>
        <VisionPlaceholderScene
          active={activeScene === 1}
          headingRef={opportunityHeading}
        />
      </SceneTransition>

      <noscript>
        This private concept experience requires JavaScript to present its guided
        scene transitions.
      </noscript>
    </main>
  );
}
