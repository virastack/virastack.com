import "react";

declare module "react" {
  /** Lets `style` set CSS custom properties (`{ "--indent": "1rem" }`) without a cast. */
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
