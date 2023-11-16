import { string, z } from 'zod';

export interface StudyPlace {
  id: string;
  name: string;
  description: string;
  picture: string;
  banner: string;
  address: string;
  phone: string;
  lessonTypes: LessonType[];
  absenceMark: string;
  primaryColorSet: string[];
  secondaryColorSet: string[];
  journalColors: JournalColors;
}

const MarkTypeScheme = z.object({
  mark: z.string(),
  workOutTime: z.number(),
});

export const StudyPlaceScheme = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  banner: z.string(),
  address: z.string(),
  phone: z.string(),
  absenceMark: z.string(),
  primaryColorSet: z.array(string()),
  secondaryColorSet: z.array(string()),
  lessonTypes: z.any(
    z.object({
      type: z.string(),
      assignedColor: z.string(),
      marks: z.array(MarkTypeScheme),
      standaloneMarks: z.array(MarkTypeScheme),
    })
  ),
  journalColors: z.object({
    general: z.string(),
    warning: z.string(),
    danger: z.string(),
  }),
});

export interface MarkType {
  mark: string;
  workOutTime: number;
}

export interface LessonType {
  type: string;
  marks: MarkType[];
  assignedColor: string;
  standaloneMarks: MarkType[];
}

export interface JournalColors {
  general: string;
  warning: string;
  danger: string;
}
