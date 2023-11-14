import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@ui/inputs/text-input/text-input.component';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ItemsSelectComponent } from '@ui/selects/items-select/items-select.component';
import { SearchableSelectComponent } from '@ui/selects/searchable-select/searchable-select.component';
import { AutocompleteTextComponent } from '@ui/selects/autocomplete-text/autocomplete-text.component';
import {
  FormConfig,
  FormConfigElement,
  FormConfigElements,
  FormConfigElementTypes,
} from '@shared/modules/ui/entities/form.config';
import { DateTimeRangePickerComponent } from '@shared/modules/ui/components/pickers/date-time-range-picker/date-time-range-picker.component';
import { DateRangePickerComponent } from '@shared/modules/ui/components/pickers/date-range-picker/date-range-picker.component';
import { NumberInputComponent } from '@ui/inputs/number-input/number-input.component';
import { ColorInputComponent } from '@ui/inputs/color-input/color-input.component';

@Component({
  selector: 'simple-form-config-builder',
  templateUrl: './form-config-builder.component.html',
  styleUrls: ['./form-config-builder.component.scss'],
  imports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    ItemsSelectComponent,
    SearchableSelectComponent,
    AutocompleteTextComponent,
    DateRangePickerComponent,
    DateTimeRangePickerComponent,
    NumberInputComponent,
    ColorInputComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormConfigBuilderComponent<T extends FormConfigElements<T>> {
  @Input({ required: true }) config!: FormConfig<T>;

  formDirective = inject(FormGroupDirective);

  trackBy = (_: number, el: [string, FormConfigElement<any>]) => el[0];

  get formConfigEntries(): [string, FormConfigElement<any>][] {
    return Object.entries(this.config.elements ?? {});
  }

  getControlByName(name: string): FormControl | null {
    return this.formDirective.form.controls[name] as FormControl | null;
  }

  protected readonly Types = FormConfigElementTypes;
}
