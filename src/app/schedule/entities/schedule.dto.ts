export type GetScheduleDTO = {
  type: string;
  typeID: string;
  studyPlaceID: string;
  startDate: string;
  endDate: string;
  general: boolean;
} | null;
