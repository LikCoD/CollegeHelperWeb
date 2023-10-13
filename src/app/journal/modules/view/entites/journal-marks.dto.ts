export interface AddMarkDTO {
  mark: string;
  studentID: string;
  lessonID: string;
}

export interface AddAbsenceDTO {
  time: number | null;
  studentID: string;
  lessonID: string;
}
