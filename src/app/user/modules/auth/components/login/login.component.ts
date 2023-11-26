import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import { LoginFormConfig } from '@user/modules/auth/components/login/login.dto';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [provideTranslationSuffix('login')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formConfig: FormConfig<LoginFormConfig> = {
    elements: {
      login: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'login',
        },
        validators: [Validators.required],
      },
      password: {
        type: FormConfigElementTypes.PASSWORD,
        typeConfig: {
          label: 'password',
        },
        validators: [Validators.required],
      },
    },
  };

  options: SubmitOptions = {
    url: 'api/v1/user/login',
    method: 'PUT',
    subscribe: true,
  };
}
