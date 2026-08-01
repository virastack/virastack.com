export type GuideFont = "serif" | "sans" | "mono";

export type GuideStepProps = {
  onNext: () => void;
  isCompleted: boolean;
  isStyled: boolean;
};
