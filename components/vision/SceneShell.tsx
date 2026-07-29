import type { HTMLAttributes, ReactNode } from "react";

interface SceneShellProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  labelledBy: string;
}

export function SceneShell({
  children,
  className = "",
  labelledBy,
  ...props
}: SceneShellProps) {
  return (
    <section
      className={`scene-shell ${className}`.trim()}
      aria-labelledby={labelledBy}
      {...props}
    >
      {children}
    </section>
  );
}
