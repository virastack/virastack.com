import { cn } from "@/lib/utils";

type ClearSpaceFigureProps = {
  /** `icon` is the mark alone, `wordmark` is the mark with the name. */
  variant: "icon" | "wordmark";
  background: "light" | "dark";
  /** Names the figure for assistive technology. */
  label: string;
};

/** Units of the logo files: X is the icon height, 96. */
const X = 96;
/** Clear space is a quarter of X, around the logo and between the mark and the name. */
const SPACE = X / 4;
/** Where the mark's ink ends in the wordmark files (the V plus half of its 5-unit stroke). */
const MARK_END = 88.5;
const WORDMARK_WIDTH = 445.12;

/** Pixels per file unit; the icon is drawn larger than the wordmark so both fit one column. */
const SCALE = { icon: 1.25, wordmark: 0.62 } as const;

const files = {
  icon: { light: "/brand/virastack-icon.svg", dark: "/brand/virastack-icon.svg" },
  wordmark: {
    light: "/brand/virastack-wordmark-light.svg",
    dark: "/brand/virastack-wordmark-dark.svg",
  },
} as const;

/**
 * A logo inside its clear space: dashed outer edge, corner squares and edge bands measure a
 * quarter of X. In the wordmark the same measure is shown between the mark and the name.
 */
export function ClearSpaceFigure({ variant, background, label }: ClearSpaceFigureProps) {
  const s = SCALE[variant];
  const dark = background === "dark";
  const space = SPACE * s;
  const width = (variant === "icon" ? X : WORDMARK_WIDTH) * s;
  const height = X * s;

  const square = "bg-brand-virastack-solid/20";
  const band = "bg-brand-virastack-solid/10";
  const squareStyle = { width: space, height: space };

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-xl border p-8",
        dark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white",
      )}
    >
      <div
        className="relative border border-dashed border-neutral-400/70"
        style={{ padding: space }}
      >
        {/* Edge bands and corner squares of the outer clear space. */}
        <span
          aria-hidden
          className={cn("absolute top-0 right-0 left-0", band)}
          style={{ height: space }}
        />
        <span
          aria-hidden
          className={cn("absolute right-0 bottom-0 left-0", band)}
          style={{ height: space }}
        />
        <span
          aria-hidden
          className={cn("absolute top-0 bottom-0 left-0", band)}
          style={{ width: space }}
        />
        <span
          aria-hidden
          className={cn("absolute top-0 right-0 bottom-0", band)}
          style={{ width: space }}
        />
        {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((place) => (
          <span
            key={place}
            aria-hidden
            className={cn("absolute", place, square)}
            style={squareStyle}
          />
        ))}

        <div className="relative ring-1 ring-brand-virastack-solid" style={{ width, height }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={files[variant][background]}
            alt=""
            width={width}
            height={height}
            className="block h-full w-full"
          />
          {variant === "wordmark" ? (
            <>
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 border-x border-dashed border-brand-virastack-solid",
                  band,
                )}
                style={{ left: MARK_END * s, width: space, height }}
              />
              <span
                aria-hidden
                className={cn("absolute", square)}
                style={{ left: MARK_END * s, width: space, height: space, top: -space }}
              />
              <span
                aria-hidden
                className={cn("absolute", square)}
                style={{ left: MARK_END * s, width: space, height: space, top: height }}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
