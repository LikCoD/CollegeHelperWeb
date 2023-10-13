import { z } from 'zod';

export interface StudyPlace {
  id: string;
  name: string;
  lessonTypes: LessonType[];
  absenceMark: string;
  journalColors: JournalColors;
}

const MarkTypeScheme = z.object({
  mark: z.string(),
  workOutTime: z.number(),
});

export const StudyPlaceScheme = z.object({
  id: z.string(),
  name: z.string(),
  absenceMark: z.string(),
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
