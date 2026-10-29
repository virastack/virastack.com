// `MaskDemo` is not re-exported: anything importing this barrel would pull the demo
// (and react-hook-form) onto its page. `ProductHeroDemo` lazy-loads it by path.
export { MaskLanding } from "@/features/mask/components/MaskLanding";
export { MaskFeatures } from "@/features/mask/components/MaskFeatures";
