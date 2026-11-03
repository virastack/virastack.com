import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InstallFramework = "nextjs" | "tanstack";

type FeatureInstallState = {
  framework: InstallFramework;
  i18n: boolean;
  setFramework: (framework: InstallFramework) => void;
  setI18n: (i18n: boolean) => void;
};

// `skipHydration` keeps the first client render equal to the server HTML;
// `FeatureInstall` rehydrates from localStorage after mount.
export const useFeatureInstallStore = create<FeatureInstallState>()(
  persist(
    (set) => ({
      framework: "nextjs",
      i18n: false,
      setFramework: (framework) => set({ framework }),
      setI18n: (i18n) => set({ i18n }),
    }),
    {
      name: "featureInstall",
      partialize: ({ framework, i18n }) => ({ framework, i18n }),
      skipHydration: true,
    },
  ),
);
