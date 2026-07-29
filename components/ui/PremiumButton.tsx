import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PremiumButton({
  children,
  className = "",
  type = "button",
  ...props
}: PremiumButtonProps) {
  return (
    <button
      className={`premium-button ${className}`.trim()}
      type={type}
      {...props}
    >
      <span className="premium-button__label">{children}</span>
      <span className="premium-button__icon" aria-hidden="true">
        →
      </span>
    </button>
  );
}
