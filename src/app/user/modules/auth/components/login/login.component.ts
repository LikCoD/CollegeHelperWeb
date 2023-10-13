import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { Validators } from '@angular/forms';
import { LoginFormConfig } from '@user/modules/auth/components/login/login.dto';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [translatePrefixProvider('login')],
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
