import { JournalLesson } from '@journal/modules/view/entites/journal';

export interface JournalAddMarkDialogData {
  lessonID: string;
  studentID: string;
  updateCell: (cell: JournalLesson) => void;
}
