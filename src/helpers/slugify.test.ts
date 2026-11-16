import { describe, expect, it } from "vitest";

import { slugify } from "@/helpers/slugify";

describe("slugify", () => {
  it("joins words with hyphens and drops punctuation", () => {
    expect(slugify("Step 1: Set up the project")).toBe("step-1-set-up-the-project");
    expect(slugify("  When you don't need it?  ")).toBe("when-you-don-t-need-it");
  });

  it("spells Turkish letters in ASCII", () => {
    expect(slugify("Adım 1: Projeyi kurun")).toBe("adim-1-projeyi-kurun");
    expect(slugify("IŞIK")).toBe("isik");
    expect(slugify("İş")).toBe("is");
    expect(slugify("Çağrı öğüt şüphe")).toBe("cagri-ogut-suphe");
  });

  it("strips accents from other Latin letters", () => {
    expect(slugify("Café déjà vu")).toBe("cafe-deja-vu");
  });

  it("keeps the text of code and tags", () => {
    expect(slugify("Next.js <Image>")).toBe("next-js-image");
    expect(slugify("Projeler ve default: false")).toBe("projeler-ve-default-false");
  });

  it("is empty for a title without letters or digits", () => {
    expect(slugify("!?")).toBe("");
    expect(slugify("")).toBe("");
  });
});
