import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface EmailConfirmFormData {
  code?: string | null;
}

export interface EmailConfirmFormConfig {
  code: FormConfigElement;
}
