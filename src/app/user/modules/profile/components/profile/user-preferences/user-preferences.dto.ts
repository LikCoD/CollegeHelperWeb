import { Preferences } from '@shared/entities/preferences';
import { FormConfigElement } from '@shared/modules/ui/entities/form.config';

export interface UserPreferencesFormData extends Preferences {}

export interface UserPreferencesFormConfig {
  theme: FormConfigElement;
  language: FormConfigElement;
  timezone: FormConfigElement;
}
