export type LogoAsset = {
  id: string;
  /** Fixed preview background: the file is made for this background, not for the site theme. */
  background: "light" | "dark";
  /** Public path without extension; `.svg` and `.png` both exist. */
  basePath: string;
  /** Intrinsic size of the SVG, so the preview reserves its space. */
  width: number;
  height: number;
};

export type LogoGroup = {
  id: "icon" | "wordmark" | "mono";
  kind: "icon" | "wordmark";
  assets: readonly [LogoAsset, LogoAsset];
};

const ICON = { width: 96, height: 96 } as const;
const WORDMARK = { width: 445, height: 96 } as const;

function createLogoGroups(dir: string): readonly LogoGroup[] {
  return [
    {
      id: "icon",
      kind: "icon",
      assets: [
        { id: "icon-light", background: "light", basePath: `${dir}/virastack-icon`, ...ICON },
        { id: "icon-dark", background: "dark", basePath: `${dir}/virastack-icon`, ...ICON },
      ],
    },
    {
      id: "wordmark",
      kind: "wordmark",
      assets: [
        {
          id: "wordmark-light",
          background: "light",
          basePath: `${dir}/virastack-wordmark-light`,
          ...WORDMARK,
        },
        {
          id: "wordmark-dark",
          background: "dark",
          basePath: `${dir}/virastack-wordmark-dark`,
          ...WORDMARK,
        },
      ],
    },
    {
      id: "mono",
      kind: "wordmark",
      assets: [
        {
          id: "mono-light",
          background: "light",
          basePath: `${dir}/virastack-mono-black`,
          ...WORDMARK,
        },
        {
          id: "mono-dark",
          background: "dark",
          basePath: `${dir}/virastack-mono-white`,
          ...WORDMARK,
        },
      ],
    },
  ];
}

export const logoGroups = createLogoGroups("/brand");
