import { DateTime } from 'luxon';
import { z } from 'zod';

export interface Journal {
  dates: JournalLesson[];
  rows: JournalRow[];
  info: JournalInfo;
}

export interface JournalLesson {
  id?: string;
  studyPlaceID?: string;
  primaryColor: string;
  journalCellColor?: string;
  secondaryColor?: string;
  endDate: DateTime;
  startDate: DateTime;
  lessonIndex: number;
  subject: string;
  group: string;
  teacher: string;
  room: string;
  type?: string;
  title?: string;
  homework?: string;
  description?: string;
  isGeneral?: boolean;
}

export interface JournalRow {
  id: string;
  title: string;
  cells: JournalCell[];
  color: string;
  averageMark: number;
  absencesAmount: number;
  absencesTime: number;
  marksAmount: { [mark: string]: number };
}

export interface JournalCell {
  id?: string;
  type?: string[];
  marks?: Mark[];
  absences?: Absence[];
  journalCellColor?: string;

  point: Point;
  indexes?: JournalCellIndexes;
}

export interface Mark {
  mark: string;
  studentID: string;
  lessonID?: string;
  studyPlaceID?: string;
  id?: string;
}

export interface Absence {
  time?: number;
  studentID: string;
  lessonID: string;
  studyPlaceID?: string;
  id?: string;
}

export interface JournalCellIndexes {
  monthIndex: number;
  dayIndex: number;
  lessonIndex: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface JournalInfo {
  editable: boolean;
  group: string;
  teacher: string;
  subject: string;
  time: DateTime;
}

export const JournalScheme = z.object({
  dates: z.array(
    z
      .object({
        id: z.string(),
        studyPlaceID: z.string(),
        endDate: z
          .string()
          .datetime()
          .transform(dt => DateTime.fromISO(dt)),
        startDate: z
          .string()
          .datetime()
          .transform(dt => DateTime.fromISO(dt)),
        primaryColor: z.string(),
        secondaryColor: z.string(),
        lessonIndex: z.number(),
        subject: z.string(),
        group: z.string(),
        teacher: z.string(),
        room: z.string(),
        isGeneral: z.boolean(),
      })
      .nullish()
  ),
  rows: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      cells: z.array(
        z
          .object({
            id: z.string(),
            type: z.array(z.string()),
            marks: z
              .array(
                z.object({
                  id: z.string(),
                  mark: z.string(),
                  studentID: z.string(),
                  lessonID: z.string(),
                  studyPlaceID: z.string(),
                })
              )
              .nullish(),
            absences: z
              .array(
                z.object({
                  id: z.string(),
                  time: z.number().nullable(),
                  studentID: z.string(),
                  lessonID: z.string(),
                  studyPlaceID: z.string(),
                })
              )
              .nullish(),
            journalCellColor: z.string(),
          })
          .nullish()
      ),
      color: z.string(),
      averageMark: z.number(),
      absencesAmount: z.number(),
      absencesTime: z.number(),
      marksAmount: z.any(),
    })
  ),
  info: z.object({
    editable: z.boolean(),
  }),
});
