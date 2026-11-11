export type AcademyItemStatus = "published" | "coming_soon";

export type AcademyLessonKind = "lesson" | "project" | "reference";

export type AcademyLessonMeta = {
  slug: string;
  title: string;
  description: string;
  status: AcademyItemStatus;
  kind: AcademyLessonKind;
};

export type AcademyLessonGroup = {
  id: string;
  title: string;
  lessons: readonly AcademyLessonMeta[];
};

export type AcademyTrack = {
  slug: string;
  title: string;
  description: string;
  status: AcademyItemStatus;
  lessonGroups: readonly AcademyLessonGroup[];
};

export type AcademyTrackGroup = {
  id: string;
  title: string;
  tracks: readonly AcademyTrack[];
};

export type AcademyCurriculum = {
  groups: readonly AcademyTrackGroup[];
};

export type AcademyLessonEntry = {
  lesson: AcademyLessonMeta;
  number: number;
};

export type AcademyNumberedLessonGroup = {
  id: string;
  title: string;
  entries: readonly AcademyLessonEntry[];
};

export type AcademyLessonLookup = {
  track: AcademyTrack;
  entry: AcademyLessonEntry;
  previous: AcademyLessonEntry | null;
  next: AcademyLessonEntry | null;
  total: number;
};

export type AcademyQuizQuestion = {
  question: string;
  code?: string;
  lang?: string;
  options: readonly string[];
  answer: number;
  explanation: string;
};

/** A quiz question as the client renders it: the code sample already highlighted. */
export type AcademyQuizItem = Omit<AcademyQuizQuestion, "code" | "lang"> & {
  codeHtml: string | null;
};

export type AcademyLessonFrontmatter = {
  title: string;
  description: string;
  lastVerified: string;
  translationKey: string;
  quiz?: readonly AcademyQuizQuestion[];
};

export type AcademyLessonDocument = {
  frontmatter: AcademyLessonFrontmatter;
  body: string;
  locale: "tr" | "en";
  relativePath: string;
};
