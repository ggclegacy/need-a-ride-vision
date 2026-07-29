import type { ReactNode } from "react";

interface SceneTransitionProps {
  active: boolean;
  children: ReactNode;
}

export function SceneTransition({
  active,
  children,
}: SceneTransitionProps) {
  return (
    <div
      className={`scene-transition ${
        active ? "scene-transition--active" : ""
      }`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}
