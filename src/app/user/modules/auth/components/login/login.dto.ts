import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface LoginFormData {
  login?: string | null;
  password?: string | null;
}

export interface LoginFormConfig {
  login: FormConfigElement;
  password: FormConfigElement;
}
