import { DateTime } from 'luxon';
import { z } from 'zod';

export interface ScheduleLesson {
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
  subjectID: string;
  groupID: string;
  teacherID: string;
  roomID: string;
  type?: string;
  title?: string;
  homework?: string;
  description?: string;
  isGeneral?: boolean;
  status?: string;
}

export interface ScheduleInfo {
  studyPlaceInfo: StudyPlaceInfo;
  type: string;
  typeName: string;
  startDate: DateTime;
  endDate: DateTime;

  indexes: number[];
  minLessonIndex: number;
  maxLessonIndex: number;

  daysNumber: number;
}

export interface Schedule {
  lessons: ScheduleLesson[];
  cells: Cell[];
  info: ScheduleInfo;
}

export interface Cell {
  startDate: DateTime;
  endDate: DateTime;
  lessonIndex: number;
  lessons: ScheduleLesson[];
}

export interface StudyPlaceInfo {
  id: string;
  title: string;
}

export const ScheduleSchema = z.object({
  lessons: z
    .array(
      z.object({
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
        subjectID: z.string(),
        groupID: z.string(),
        teacherID: z.string(),
        roomID: z.string(),
        isGeneral: z.boolean(),
        status: z.string(),
      })
    )
    .or(z.null()),
  info: z.object({
    endDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, {zone: 'utc'})),
    startDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, {zone: 'utc'})),
    studyPlaceInfo: z.object({
      id: z.string(),
    }),
    type: z.string(),
    typeName: z.string(),
  }),
});
