/** @type {import('knip').KnipConfig} */
const config = {
  entry: [
    "src/app/**/{page,layout,template,default,loading,not-found,error,global-error}.{ts,tsx}",
    "src/app/**/{sitemap,robots,manifest}.{ts,tsx}",
    "src/**/*.test.ts",
  ],
  project: ["src/**/*.{ts,tsx,js,jsx}"],
  ignore: ["src/components/ui/**", "src/i18n/routing.ts"],
  ignoreDependencies: [
    "tailwindcss",
    "tw-animate-css",
    // Imported from CSS (knip does not follow it)
    "shadcn",
  ],
  rules: {
    dependencies: "error",
    exports: "warn",
    types: "warn",
    files: "warn",
  },
};

module.exports = config;
