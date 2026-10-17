import { z } from "zod";

const academyItemStatusSchema = z.enum(["published", "coming_soon"]);
const academyLessonKindSchema = z.enum(["lesson", "project", "reference"]);

const academyLessonMetaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  status: academyItemStatusSchema,
  kind: academyLessonKindSchema,
});

const academyLessonGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  lessons: z.array(academyLessonMetaSchema).min(1),
});

const academyTrackSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  status: academyItemStatusSchema,
  lessonGroups: z.array(academyLessonGroupSchema).min(1),
});

const academyTrackGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tracks: z.array(academyTrackSchema).min(1),
});

export const academyCurriculumSchema = z.object({
  groups: z.array(academyTrackGroupSchema).min(1),
});

export const academyLessonFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  lastVerified: z.string().min(1),
  translationKey: z.string().min(1),
});
