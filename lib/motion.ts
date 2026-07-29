export const motionDurations = {
  fast: 180,
  medium: 460,
  slow: 820,
  cinematic: 1200,
} as const;

export const motionEasing = {
  standard: [0.22, 1, 0.36, 1],
  cinematic: [0.16, 1, 0.3, 1],
} as const;

export const focusDelay = motionDurations.medium;
