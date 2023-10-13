import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface ResetPasswordCodeFormData {
  code?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
}

export interface ResetPasswordCodeFormConfig {
  code: FormConfigElement;
  password: FormConfigElement;
  passwordConfirm: FormConfigElement;
}
