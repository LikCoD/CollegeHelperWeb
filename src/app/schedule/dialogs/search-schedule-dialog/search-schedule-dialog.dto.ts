import { DateRangeFormElementValue, FormConfigElement } from '@shared/modules/ui/entities/form.config';
import { DateTime } from 'luxon';

export interface SearchScheduleFormData {
  studyPlaceID?: string | null;
  type?: string | null;
  typename?: string | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
}

export interface SearchScheduleFormConfig {
  studyPlaceID: FormConfigElement;
  type: FormConfigElement;
  typename: FormConfigElement;
  range: FormConfigElement<DateRangeFormElementValue>;
}
