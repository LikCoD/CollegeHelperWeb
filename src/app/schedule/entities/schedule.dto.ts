export type GetScheduleDTO = {
  type: string;
  typename: string;
  studyPlaceID: string;
  startDate: string;
  endDate: string;
  general: boolean;
} | null;
