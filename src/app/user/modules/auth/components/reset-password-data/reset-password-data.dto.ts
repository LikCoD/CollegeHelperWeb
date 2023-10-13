import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface ResetPasswordDataFormData {
  login?: string | null;
  email?: string | null;
}

export interface ResetPasswordDataFormConfig {
  login: FormConfigElement;
  email: FormConfigElement;
}
