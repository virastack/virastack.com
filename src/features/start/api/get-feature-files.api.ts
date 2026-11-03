import { api } from "@/lib/api";

import {
  registryItemFilesSchema,
  type RegistryFile,
} from "@/features/start/schemas/registry-item.schema";
import type { InstallVariant } from "@/features/start/stores/feature-install.store";

/** A module's files for one template, read from the registry item `virastack add` installs. */
export async function getFeatureFiles(
  feature: string,
  variant: InstallVariant,
  signal?: AbortSignal,
): Promise<RegistryFile[]> {
  const data = await api.get<unknown>(`/r/${encodeURIComponent(feature)}-${variant}.json`, {
    signal,
  });

  return registryItemFilesSchema.parse(data).files;
}
