type Rgb = [red: number, green: number, blue: number];

function hexToRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function toHsl([red, green, blue]: Rgb): string {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  let hue = 0;
  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }
  hue = (hue * 60 + 360) % 360;

  return `hsl(${round(hue, 1)} ${round(saturation * 100, 1)}% ${round(lightness * 100, 1)}%)`;
}

/** sRGB to OKLCH (Björn Ottosson's OKLab matrices). */
function toOklch(rgb: Rgb): string {
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const r = linear(rgb[0]);
  const g = linear(rgb[1]);
  const b = linear(rgb[2]);

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const chroma = Math.hypot(a, bAxis);
  const hue = chroma < 0.0001 ? 0 : ((Math.atan2(bAxis, a) * 180) / Math.PI + 360) % 360;

  return `oklch(${round(lightness * 100, 1)}% ${round(chroma, 3)} ${round(hue, 1)})`;
}

export type ColorFormat = { label: "HEX" | "RGB" | "HSL" | "OKLCH"; value: string };

/** The same color in every CSS notation; each value is valid CSS. */
export function getColorFormats(hex: string): ColorFormat[] {
  const rgb = hexToRgb(hex);

  return [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.join(" ")})` },
    { label: "HSL", value: toHsl(rgb) },
    { label: "OKLCH", value: toOklch(rgb) },
  ];
}
