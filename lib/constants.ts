export const VISION_SCENES = [
  { id: "arrival", label: "Arrival" },
  { id: "opportunity", label: "The Opportunity" },
] as const;

export type VisionSceneId = (typeof VISION_SCENES)[number]["id"];
