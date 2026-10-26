import { withUtm } from "@/lib/external-link";

export type AcademyFeaturedAuthor = {
  name: string;
  imageSrc: string;
  initials: string;
  href: string;
};

function authorHref(url: string): string {
  return withUtm(url, "academy");
}

export const ACADEMY_FEATURED_AUTHORS = [
  {
    name: "Kent C. Dodds",
    imageSrc: "/academy/authors/kent-c-dodds.png",
    initials: "KD",
    href: authorHref("https://kentcdodds.com"),
  },
  {
    name: "Addy Osmani",
    imageSrc: "/academy/authors/addy-osmani.png",
    initials: "AO",
    href: authorHref("https://addyosmani.com"),
  },
  {
    name: "Dan Abramov",
    imageSrc: "/academy/authors/dan-abramov.png",
    initials: "DA",
    href: authorHref("https://overreacted.io"),
  },
  {
    name: "Dominik Dorfmeister",
    imageSrc: "/academy/authors/dominik-dorfmeister.png",
    initials: "DD",
    href: authorHref("https://tkdodo.eu"),
  },
  {
    name: "Matt Pocock",
    imageSrc: "/academy/authors/matt-pocock.png",
    initials: "MP",
    href: authorHref("https://www.mattpocock.com"),
  },
] as const satisfies readonly AcademyFeaturedAuthor[];
