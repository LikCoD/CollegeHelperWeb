import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { ControlErrorComponent } from '@shared/modules/ui/components/errors/control-error/control-error.component';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { NgxMaskDirective } from 'ngx-mask';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    PrimaryButtonComponent,
    ControlErrorComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    TranslatePipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends MatFormControlValueAccessorComponent<string> {
  @Input() mask: string | null = null;
  @Input() maskOptions: any = null;
}
