import {
  DateRangeFormElementValue,
  FormConfigElement,
} from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';

export interface ScheduleAddLessonFormData {
  subjectID?: string | null;
  teacherID?: string | null;
  groupID?: string | null;
  roomID?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  lessonIndex?: number | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
}

export interface ScheduleAddLessonFormConfig {
  subjectID: FormConfigElement;
  teacherID: FormConfigElement;
  groupID: FormConfigElement;
  roomID: FormConfigElement;
  primaryColor: FormConfigElement;
  secondaryColor: FormConfigElement;
  lessonIndex: FormConfigElement<number>;
  range: FormConfigElement<DateRangeFormElementValue>;
}
