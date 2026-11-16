import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Docs MDX renders plain HTML elements, styled by
// DocsProse, so no element is overridden here.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
