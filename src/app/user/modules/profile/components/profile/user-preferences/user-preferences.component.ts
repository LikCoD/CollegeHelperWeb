import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  UserPreferencesFormConfig,
  UserPreferencesFormData,
} from '@user/modules/profile/components/profile/user-preferences/user-preferences.dto';
import { UserPreferencesService } from '@user/modules/profile/components/profile/user-preferences/user-preferences.service';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
  providers: [provideTranslationSuffix('preferences')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreferencesComponent {
  private service = inject(UserPreferencesService);

  options = this.service.updateFormOptions;

  formConfig: FormConfig<UserPreferencesFormConfig, UserPreferencesFormData> = {
    elements: {
      theme: {
        type: FormConfigElementTypes.SELECT,
        typeConfig: {
          label: 'theme',
          items: this.service.themes,
        },
        validators: [Validators.required],
      },
      language: {
        type: FormConfigElementTypes.SELECT,
        typeConfig: {
          label: 'language',
          items: this.service.languages,
        },
        validators: [Validators.required],
      },
      timezone: {
        type: FormConfigElementTypes.SEARCHABLE_SELECT,
        typeConfig: {
          label: 'timezone',
          items: this.service.timezones,
        },
        validators: [Validators.required],
      },
    },
    value: this.service.preferences$,
  };

  onSubmit(value: UserPreferencesFormData): void {
    this.service.updatePreferences(value);
  }
}
