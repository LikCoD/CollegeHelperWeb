import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PrimaryButtonComponent } from '@shared/modules/ui/components/buttons/primary-button.component';
import { ControlErrorComponent } from '@shared/modules/ui/components/errors/control-error/control-error.component';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { NgxMaskDirective } from 'ngx-mask';
import { P1Component } from '@ui/text/p1.component';
import { IconComponent } from '@ui/images/icon.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorInputComponent),
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
    P1Component,
    IconComponent,
    TranslatePipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent extends MatFormControlValueAccessorComponent<string> {
  override writeValue(value: string | null): void {
    this.control.setValue(this.formatValue(value));
  }

  private formatValue(value: string | null): string | null {
    if (!value) return null;
    if (!value.startsWith('#') || value.length < 7) return null;
    if (value.length === 9 && value[8] === '0' && value[8] === '0') return null;

    return value.substring(0, 7);
  }
}
