import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PackageManager = "prompt" | "pnpm" | "yarn" | "npm" | "bun";

type PackageManagerState = {
  packageManager: PackageManager;
  setPackageManager: (packageManager: PackageManager) => void;
};

// `skipHydration` keeps the first client render equal to the server HTML;
// `usePackageManager` rehydrates from localStorage after mount.
export const usePackageManagerStore = create<PackageManagerState>()(
  persist(
    (set) => ({
      packageManager: "pnpm",
      setPackageManager: (packageManager) => set({ packageManager }),
    }),
    {
      name: "packageManager",
      partialize: (state) => ({ packageManager: state.packageManager }),
      skipHydration: true,
    },
  ),
);
