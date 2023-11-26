import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { ResetPasswordDataFormConfig } from '@user/modules/auth/components/reset-password-data/reset-password-data.dto';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-reset-password-data',
  templateUrl: './reset-password-data.component.html',
  styleUrls: ['./reset-password-data.component.scss'],
  providers: [provideTranslationSuffix('resetPassword.data')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordDataComponent {
  formConfig: FormConfig<ResetPasswordDataFormConfig> = {
    elements: {
      login: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'login',
        },
        validators: [Validators.required],
      },
      email: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'email',
        },
        validators: [Validators.required, Validators.email],
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/password/reset/data',
    method: 'POST',
    subscribe: true,
  };
}
