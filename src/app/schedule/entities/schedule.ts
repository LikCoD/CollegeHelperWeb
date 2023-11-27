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

export interface ScheduleGeneralLesson {
  id?: string;
  studyPlaceID?: string;
  primaryColor: string;
  secondaryColor?: string;
  endTimeMinutes: DateTime;
  startTimeMinutes: DateTime;
  dayIndex: number;
  lessonIndex: number;
  subject: string;
  group: string;
  teacher: string;
  room: string;
  subjectID: string;
  groupID: string;
  teacherID: string;
  roomID: string;
}

export interface ScheduleInfo {
  studyPlaceInfo: StudyPlaceInfo;
  type: string;
  typeName: string;
  startDate: DateTime;
  endDate: DateTime;
}

export interface GeneralScheduleInfo {
  studyPlaceInfo: StudyPlaceInfo;
  type: string;
  typeName: string;
}

export interface Schedule {
  lessons: ScheduleLesson[];
  info: ScheduleInfo;
}

export interface GeneralSchedule {
  lessons: ScheduleGeneralLesson[];
  info: GeneralScheduleInfo;
}

export interface StudyPlaceInfo {
  id: string;
  title: string;
}

export const ScheduleLessonSchema = z.object({
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
});

export const ScheduleSchema = z.object({
  lessons: z.array(ScheduleLessonSchema).or(z.null()),
  info: z.object({
    endDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, { zone: 'utc' })),
    startDate: z
      .string()
      .datetime()
      .transform(dt => DateTime.fromISO(dt, { zone: 'utc' })),
    studyPlaceInfo: z.object({
      id: z.string(),
    }),
    type: z.string(),
    typeName: z.string(),
  }),
});

export const ScheduleGeneralLessonSchema = z
  .object({
    id: z.string(),
    studyPlaceID: z.string(),
    endTimeMinutes: z.number().transform(dt => DateTime.fromSeconds(dt * 60)),
    startTimeMinutes: z.number().transform(dt => DateTime.fromSeconds(dt * 60)),
    dayIndex: z.number(),
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
  })
  .transform(l => {
    l.startTimeMinutes = l.startTimeMinutes.set({ weekday: l.dayIndex - 1 });
    l.endTimeMinutes = l.endTimeMinutes.set({ weekday: l.dayIndex - 1 });
    return l;
  });

export const GeneralScheduleSchema = z.object({
  lessons: z.array(ScheduleGeneralLessonSchema).or(z.null()),
  info: z.object({
    studyPlaceInfo: z.object({
      id: z.string(),
    }),
    type: z.string(),
    typeName: z.string(),
  }),
});
