//zod-cli generate

import { DateTime } from 'luxon';
import { Group, Room, Subject, Teacher } from '@shared/entities/types';

export interface Journal {
  rowTitles: JournalRowTitle[];
  cells: JournalCell[];
  dates: JournalDate[];
  info: JournalInfo;
}

export interface JournalDate {
  id?: string;
  date: DateTime;
  typeIDs: string[];
}

export interface JournalRowTitle {
  id?: string;
  title: string;
}

export interface JournalCell {
  entries: JournalCellEntry[];
  point: Point;
}

export interface JournalCellEntry {
  lessonID: string;
  typeID: string;
  marks: Mark[];
  absences: Absence[];
}

export interface Mark {
  id: string;
  markID: string;
  mark: string;
  markWeight: number;
}

export interface Absence {
  id: string;
  time?: number;
}

export interface Point {
  x: number;
  y: number;
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
  subject: Subject;
  group: Group;
  teacher: Teacher;
  room: Room;
  type: JournalType;
  title?: string;
  homework?: string;
  description?: string;
  marks: Mark[];
  absence?: Absence;
}

export interface JournalType {
  id: string;
  availableMarks: Mark[];
  assignedColor: string;
  absenceMark: string;
  showAbsences?: boolean;
  type: string;
}

export interface JournalInfo {
  editable: boolean;
  configs?: JournalDisplayConfig[];
}

export interface JournalDisplayConfig {
  title: string;
  typeIDs: string[];
  markIDs?: string[];
  showAbsences: boolean;
  showLatency: boolean;
  availableMarkIDs?: string[];
}
