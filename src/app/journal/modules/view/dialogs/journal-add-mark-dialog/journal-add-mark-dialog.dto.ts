import { Absence, JournalCell, Mark } from '@journal/modules/view/entites/journal';

export interface JournalAddMarkDialogData {
  lessonType: string;
  marks: Mark[];
  absence: Absence | null;
  lessonID: string;
  studentID: string;
  updateCell: (cell: JournalCell) => void;
}
