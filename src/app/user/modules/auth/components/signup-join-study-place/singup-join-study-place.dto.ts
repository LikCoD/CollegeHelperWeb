import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface SignUpJoinStudyPlaceFormData {
  name?: string | null;
  studyPlaceID?: string | null;
  role?: string | null;
  roleName?: string | null;
}

export interface SignUpJoinStudyPlaceFormConfig {
  name: FormConfigElement;
  studyPlaceID: FormConfigElement;
  role: FormConfigElement;
  roleName: FormConfigElement;
}
