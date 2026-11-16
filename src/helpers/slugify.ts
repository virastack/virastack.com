/** Turkish letters with no ASCII base under Unicode decomposition (`ı`), or a locale-bound one (`İ`). */
const TURKISH_LETTERS: Record<string, string> = {
  ı: "i",
  İ: "i",
  ş: "s",
  Ş: "s",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

/**
 * A URL fragment from a title: lowercase ASCII letters and digits joined by single hyphens
 * (`"Adım 1: Projeyi kurun"` → `"adim-1-projeyi-kurun"`). Empty when the title has neither.
 */
export function slugify(text: string): string {
  return text
    .replace(/[ıİşŞğĞüÜöÖçÇ]/g, (letter) => TURKISH_LETTERS[letter] ?? letter)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
