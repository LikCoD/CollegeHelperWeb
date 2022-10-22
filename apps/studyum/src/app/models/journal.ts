import { Lesson } from './schedule';
import { StudyPlace } from './general';

export interface JournalInfo {
  editable: boolean;
  studyPlace: StudyPlace;
  group: string;
  teacher: string;
  subject: string;
}

export interface JournalRow {
  id: string;
  subject: string;
  group: string;
  title: string;
  userType: string;
  lessons: Lesson[];
}

export interface Journal {
  dates: Lesson[];
  rows: JournalRow[];
  info: JournalInfo;
}

export interface JournalOption {
  subject: string;
  teacher: string;
  group: string;
  editable: boolean;
}

export interface Mark {
  mark: string;
  studentID: string;
  lessonID?: string;
  studyPlaceID?: string;
  id?: string;
}

export interface Absence {
  time?: string;
  studentID: string;
  lessonID: string;
  studyPlaceID?: string;
  id?: string;
}
