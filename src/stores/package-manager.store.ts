import { create } from "zustand";
import { persist } from "zustand/middleware";

export const PACKAGE_MANAGERS = ["prompt", "pnpm", "yarn", "npm", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

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
