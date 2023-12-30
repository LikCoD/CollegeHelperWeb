export interface AddMarkDTO {
  markID: string;
  studentID: string;
  lessonID: string;
}

export interface AddAbsenceDTO {
  time: number | null;
  studentID: string;
  lessonID: string;
}
