import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { EmailConfirmFormConfig } from '@user/modules/auth/components/email-confirm/email-confirm.dto';
import { EmailConfirmService } from '@user/modules/auth/components/email-confirm/email-confirm.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormConfig, FormConfigElementTypes } from '@shared/modules/ui/entities/form.config';
import { provideTranslationSuffix } from 'i18n';

@Component({
  selector: 'app-reset-password-code',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
  providers: [provideTranslationSuffix('email.confirm')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailConfirmComponent {
  formConfig: FormConfig<EmailConfirmFormConfig> = {
    elements: {
      code: {
        type: FormConfigElementTypes.TEXT,
        typeConfig: {
          label: 'code',
        },
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      },
    },
  };

  private service = inject(EmailConfirmService);

  options = this.service.formOptions;

  constructor() {
    this.service.sendCode().pipe(takeUntilDestroyed()).subscribe();
  }
}
