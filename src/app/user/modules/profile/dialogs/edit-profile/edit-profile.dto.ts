import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface EditProfileFormData {
  login?: string | null;
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
}

export interface EditProfileFormConfig {
  login: FormConfigElement;
  email: FormConfigElement;
  password: FormConfigElement;
  passwordConfirm: FormConfigElement;
}
