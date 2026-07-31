export const VISION_SCENES = [
  { id: "arrival", label: "Arrival" },
  { id: "customer-experience", label: "Customer Experience" },
] as const;

export type VisionSceneId = (typeof VISION_SCENES)[number]["id"];
