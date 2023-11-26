import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import {
  ResetPasswordCodeFormConfig,
  ResetPasswordCodeFormData,
} from '@user/modules/auth/components/reset-password-code/reset-password-code.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.scss'],
  providers: [provideTranslationSuffix('resetPassword.code')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordCodeComponent {
  formConfig: FormConfig<ResetPasswordCodeFormConfig> = {
    elements: {
      code: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'code',
        },
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      },
      password: {
        type: FormConfigElementTypes.PASSWORD,
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.required, Validators.minLength(8)],
      },
      passwordConfirm: {
        type: FormConfigElementTypes.PASSWORD,
        typeConfig: {
          label: 'passwordConfirm',
        },
        validators: [Validators.required, Validators.minLength(8)],
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/password/reset/code',
    method: 'POST',
    subscribe: true,
  };

  proceedValue(value: ResetPasswordCodeFormData): ResetPasswordCodeFormData | null {
    if (value.password !== value.passwordConfirm) return null;
    return value;
  }
}
