import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadSora } from "@remotion/google-fonts/Sora";

export const sora = loadSora("normal", { weights: ["600", "800"], subsets: ["latin"] }).fontFamily;
export const inter = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
}).fontFamily;
export const mono = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily;

export const colors = {
  bg: "#0a0a0a",
  card: "#141414",
  border: "rgba(255,255,255,0.1)",
  fg: "#fafafa",
  muted: "#a3a3a3",
  mask: "#6366f1",
  valid: "#22c55e",
  invalid: "#ef4444",
};
