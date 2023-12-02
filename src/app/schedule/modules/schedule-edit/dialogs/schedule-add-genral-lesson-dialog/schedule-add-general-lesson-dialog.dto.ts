import {
  DateRangeFormElementValue,
  FormConfigElement,
} from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';
import { Time } from '@shared/modules/ui/components/datetime/time-picker-view/time-picker-view.component';

export interface ScheduleAddGeneralLessonFormData {
  subjectID?: string | null;
  teacherID?: string | null;
  groupID?: string | null;
  roomID?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  lessonIndex?: number | null;
  dayIndex?: number | null;
  startTime?: number | null;
  endTime?: number | null;
}

export interface ScheduleAddGeneralLessonFormConfig {
  subjectID: FormConfigElement;
  teacherID: FormConfigElement;
  groupID: FormConfigElement;
  roomID: FormConfigElement;
  primaryColor: FormConfigElement;
  secondaryColor: FormConfigElement;
  lessonIndex: FormConfigElement<number>;
  dayIndex: FormConfigElement<number>;
  startTimeMinutes: FormConfigElement<number | Time>;
  endTimeMinutes: FormConfigElement<number | Time>;
}
