/** @type {import('knip').KnipConfig} */
const config = {
  entry: [
    "src/app/**/{page,layout,template,default,loading,not-found,error,global-error}.{ts,tsx}",
    "src/app/**/{sitemap,robots,manifest}.{ts,tsx}",
    "src/**/*.test.ts",
    "src/test/server.setup.ts",
    "vitest.config.ts",
  ],
  project: ["src/**/*.{ts,tsx,js,jsx}"],
  ignore: [
    "src/components/ui/**",
    // Shared-layer barrels reserved for Rule-of-Three promotions
    "src/hooks/index.ts",
    "src/schemas/index.ts",
    "src/constants/index.ts",
    "src/features/**/data/index.ts",
    "src/features/**/data/*.data.tsx",
    "src/features/**/schemas/index.ts",
    "src/i18n/routing.ts",
  ],
  ignoreDependencies: [
    "tailwindcss",
    "tw-animate-css",
    // Imported from CSS (knip does not follow it)
    "shadcn",
    // Template stack kept for the Rule-of-Three promotions above
    "@hookform/resolvers",
    "react-markdown",
  ],
  rules: {
    dependencies: "error",
    exports: "warn",
    types: "warn",
    files: "warn",
  },
};

module.exports = config;
