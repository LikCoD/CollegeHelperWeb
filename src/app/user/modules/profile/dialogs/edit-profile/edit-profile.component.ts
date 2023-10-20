import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SubmitOptions } from '@ui/forms/default-form/default-form.component';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { Validators } from '@angular/forms';
import { translatePrefixProvider } from '@translate/translate.prefix-provider';
import { EditProfileService } from '@user/modules/profile/dialogs/edit-profile/edit-profile.service';
import { EditProfileFormConfig } from '@user/modules/profile/dialogs/edit-profile/edit-profile.dto';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [translatePrefixProvider('user.profile.edit')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  private service = inject(EditProfileService);

  formConfig: FormConfig<EditProfileFormConfig> = {
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
        validators: [Validators.minLength(8)],
      },
      passwordConfirm: {
        type: FormConfigElementTypes.PASSWORD,
        typeConfig: {
          label: 'passwordConfirm',
        },
        validators: [Validators.minLength(8)],
      },
    },
    value: this.service.currentProfile$,
  };

  options: SubmitOptions = this.service.updateFormOptions;
}
