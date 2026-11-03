import { useEffect, useState } from "react";

import { getFeatureFiles } from "@/features/start/api/get-feature-files.api";
import type { RegistryFile } from "@/features/start/schemas/registry-item.schema";
import type { InstallVariant } from "@/features/start/stores/feature-install.store";

type FeatureFilesState = { key: string; files: RegistryFile[] | null; isError: boolean };

/** Loads the module's files for the picked template; a template change drops the old result. */
export function useFeatureFiles(feature: string, variant: InstallVariant) {
  const key = `${feature}-${variant}`;
  const [state, setState] = useState<FeatureFilesState | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getFeatureFiles(feature, variant, controller.signal)
      .then((files) => setState({ key, files, isError: false }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ key, files: null, isError: true });
      });

    return () => controller.abort();
  }, [feature, variant, key]);

  const current = state?.key === key ? state : null;

  return {
    files: current?.files ?? null,
    isError: current?.isError ?? false,
    isLoading: current === null,
  };
}
