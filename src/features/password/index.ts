// `PasswordDemo` is not re-exported: anything importing this barrel would pull the
// demo onto its page. `ProductHeroDemo` lazy-loads it by path.
export { PasswordLanding } from "@/features/password/components/PasswordLanding";
export { PasswordFeatures } from "@/features/password/components/PasswordFeatures";
