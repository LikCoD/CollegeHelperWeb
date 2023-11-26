import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '@ui/errors/control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseSelectComponent } from '@ui/selects/base-select.component';
import { IconComponent } from '@ui/images/icon.component';
import { TranslatePipe } from 'i18n';

@Component({
  selector: 'items-select',
  templateUrl: './items-select.component.html',
  styleUrls: ['./items-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemsSelectComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    ControlErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    IconComponent,
    TranslatePipe,
  ],
  standalone: true,
})
export class ItemsSelectComponent<V> extends BaseSelectComponent<V> {}
