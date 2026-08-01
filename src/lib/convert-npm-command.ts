/**
 * Result of converting an npm command to all package managers.
 */
export type ConvertNpmCommandResult = {
  pnpm: string;
  yarn: string;
  npm: string;
  bun: string;
};

/**
 * Converts a standard npm command into equivalent commands for pnpm, yarn, npm,
 * and bun. The result can be spread directly into `CodeBlockCommand` props.
 *
 * Supported command patterns:
 * - `npm install <pkg>` -> add commands for each manager
 * - `npx create-<name>` -> create commands for each manager
 * - `npm create <name>` -> create commands for each manager
 * - `npx <command>` -> execute commands for each manager
 * - `npm run <script>` -> run commands for each manager
 *
 * Unrecognized commands are returned as-is for all package managers.
 */
export function convertNpmCommand(npmCommand: string): ConvertNpmCommandResult {
  if (npmCommand.startsWith("npm install")) {
    return {
      pnpm: npmCommand.replaceAll("npm install", "pnpm add"),
      yarn: npmCommand.replaceAll("npm install", "yarn add"),
      npm: npmCommand,
      bun: npmCommand.replaceAll("npm install", "bun add"),
    };
  }

  if (npmCommand.startsWith("npx create-")) {
    return {
      pnpm: npmCommand.replace("npx create-", "pnpm create "),
      yarn: npmCommand.replace("npx create-", "yarn create "),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    };
  }

  if (npmCommand.startsWith("npm create")) {
    return {
      pnpm: npmCommand.replace("npm create", "pnpm create"),
      yarn: npmCommand.replace("npm create", "yarn create"),
      npm: npmCommand,
      bun: npmCommand.replace("npm create", "bun create"),
    };
  }

  if (npmCommand.startsWith("npx")) {
    return {
      pnpm: npmCommand.replace("npx", "pnpm dlx"),
      yarn: npmCommand.replace("npx", "yarn dlx"),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    };
  }

  if (npmCommand.startsWith("npm run")) {
    return {
      pnpm: npmCommand.replace("npm run", "pnpm"),
      yarn: npmCommand.replace("npm run", "yarn"),
      npm: npmCommand,
      bun: npmCommand.replace("npm run", "bun"),
    };
  }

  return {
    pnpm: npmCommand,
    yarn: npmCommand,
    npm: npmCommand,
    bun: npmCommand,
  };
}
