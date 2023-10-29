import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormControlValueAccessorComponent } from '@shared/modules/ui/utils/form/mat-form-control-value-accessor.component';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { map } from 'rxjs';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, TextInputComponent, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent extends MatFormControlValueAccessorComponent<number> {
  override registerOnChange(fn: (v: number | null) => void): void {
    this.changeSubscription = this.control.valueChanges.pipe(map(v => +(v ?? 0))).subscribe(fn);
  }
}
