import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { SignUpFormConfig, SignUpFormData } from '@user/modules/auth/components/signup/signup.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [provideTranslationSuffix('signup')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  formConfig: FormConfig<SignUpFormConfig> = {
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
    url: 'api/v1/user/signup',
    method: 'POST',
    subscribe: true,
  };

  proceedValue(value: SignUpFormData): SignUpFormData | null {
    if (value.password !== value.passwordConfirm) return null;
    return value;
  }
}
