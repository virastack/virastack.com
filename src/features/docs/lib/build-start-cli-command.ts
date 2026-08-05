export const START_CLI_TEMPLATES = ["nextjs", "tanstack"] as const;
export const START_CLI_TOOLS = ["mask", "password"] as const;

export type StartCliTemplate = (typeof START_CLI_TEMPLATES)[number];
export type StartCliTool = (typeof START_CLI_TOOLS)[number];

export type StartCliCommandOptions = {
  name: string;
  template: StartCliTemplate | null;
  i18n: boolean | null;
  tools: StartCliTool[];
  turkishPrompts: boolean;
  skipInstall: boolean;
};

/**
 * Builds a `npx virastack@latest` command from UI selections.
 * With no selections, returns the bare interactive install command.
 */
export function buildStartCliCommand(options: StartCliCommandOptions): string {
  const parts = ["npx virastack@latest"];
  const trimmedName = options.name.trim();
  let hasFlags = false;

  if (trimmedName.length > 0) {
    parts.push(trimmedName);
  }

  if (options.template) {
    parts.push(`--template ${options.template}`);
    hasFlags = true;
  }

  if (options.i18n !== null) {
    parts.push(options.i18n ? "--i18n" : "--no-i18n");
    hasFlags = true;
  }

  if (options.tools.length > 0) {
    const orderedTools = START_CLI_TOOLS.filter((tool) => options.tools.includes(tool));
    parts.push(`--tools ${orderedTools.join(",")}`);
    hasFlags = true;
  }

  if (options.turkishPrompts) {
    parts.push("--tr");
    hasFlags = true;
  }

  if (options.skipInstall) {
    parts.push("--skip-install");
    hasFlags = true;
  }

  if (hasFlags) {
    parts.push("--yes");
  }

  return parts.join(" ");
}
